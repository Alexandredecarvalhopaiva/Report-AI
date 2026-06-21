// Etapa "Validação dos Arquivos" — barreira de segurança ANTES da geração do relatório.
// Decide se os arquivos enviados contêm dados operacionais reais e suficientes para o
// tipo de relatório escolhido. NÃO gera relatório — só classifica e orienta.

const REPORT_AREAS = {
  financial: 'Finanças e Controladoria',
  hr: 'Gestão de Pessoas',
  commercial: 'Vendas e Funil Comercial',
  operational: 'Operações e Processos',
  events: 'Gestão de Eventos',
  marketing: 'Marketing Digital e Performance',
  customer_service: 'Suporte e Experiência do Cliente',
  productivity: 'Desempenho Operacional',
  engineering: 'Construção Civil e Projetos',
  security: 'Controle de Acesso e Segurança',
  educational: 'Educação e Pedagogia',
  executive: 'Gestão Estratégica',
};

// Confiança mínima (0–1) na LEITURA/EXTRAÇÃO de dados utilizáveis para liberar a geração.
const MIN_CONFIDENCE = 0.6;

const STATUS_VALUES = ['valid', 'unrelated', 'insufficient_data', 'unreadable', 'corrupted'];

module.exports = async (req, res) => {
  // Mesma trava de origem do gerador.
  const reqOrigin = req.headers.origin || '';
  const reqHost = req.headers.host || '';
  const allowList = (process.env.ALLOWED_ORIGINS || '').split(',').map((s) => s.trim()).filter(Boolean);
  const sameOrigin = !reqOrigin || reqOrigin === `https://${reqHost}` || reqOrigin === `http://${reqHost}`;
  const originAllowed = sameOrigin || allowList.includes(reqOrigin);
  if (reqOrigin && originAllowed) res.setHeader('Access-Control-Allow-Origin', reqOrigin);
  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Cache-Control', 'no-store');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (!originAllowed) return res.status(403).json({ error: 'Origem não autorizada.' });

  const { reportType = 'executive', objective = 'executive', sources = [] } = req.body || {};
  const area = REPORT_AREAS[reportType] || REPORT_AREAS.executive;

  // ── Casos determinísticos: NÃO gastam chamada de IA ──
  // "usable" precisa ser o mesmo critério que a IA realmente enxerga (texto, OU binário COM mimeType).
  // Senão um arquivo binário sem mimeType passaria o curto-circuito mas nunca seria analisado.
  const usable = (sources || []).filter((s) => (s && s.data && s.mimeType) || (s && typeof s.content === 'string' && s.content.trim().length));
  if (!sources || !sources.length) {
    return res.status(200).json(buildResult({
      is_valid: false, status: 'no_file', confidence: 0,
      reason: 'Nenhum arquivo foi anexado.', missing_fields: [],
      suggested_action: 'Anexe pelo menos um dashboard, PDF, imagem, planilha ou documento com dados do evento.',
      content_identified: false, minimum_data: false, coherent: false,
    }));
  }
  if (!usable.length) {
    return res.status(200).json(buildResult({
      is_valid: false, status: 'corrupted', confidence: 0,
      reason: 'Os arquivos enviados não puderam ser lidos (vazios, corrompidos ou em formato inválido).',
      missing_fields: [],
      suggested_action: 'Verifique se o documento não está corrompido e use formatos aceitos (PDF, PNG, JPG, XLSX ou CSV).',
      content_identified: false, minimum_data: false, coherent: false,
    }));
  }

  // Limite de payload (igual ao gerador).
  const payloadChars = usable.reduce((n, s) => n + ((s.data && s.data.length) || 0) + ((s.content && s.content.length) || 0), 0);
  if (payloadChars > 6000000) return res.status(413).json({ error: 'Conteúdo muito grande para validar. Reduza o tamanho ou a quantidade de arquivos.' });

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'GEMINI_API_KEY não configurada.' });
  const model = process.env.GEMINI_MODEL || 'gemini-2.5-flash';

  // ── Monta as partes multimodais (texto já extraído + PDFs/imagens em base64) ──
  const textSources = usable.filter((s) => s.content);
  const binarySources = usable.filter((s) => s.data && s.mimeType);
  const hasBinary = binarySources.length > 0;

  const sourcesText = textSources.map((s, i) =>
    `--- Fonte ${i + 1}: ${s.name} (${s.type}) ---\n${String(s.content).slice(0, 8000)}`
  ).join('\n\n');

  const systemPrompt = `Você é o módulo de VALIDAÇÃO DE ARQUIVOS do Report AI. Sua única função é decidir se os arquivos enviados contêm dados operacionais REAIS e SUFICIENTES para produzir um relatório da área "${area}". Você NÃO escreve o relatório.

Princípios:
- "confidence" (0 a 1) = sua confiança de que conseguiu LER e EXTRAIR dados operacionais utilizáveis dos arquivos. NÃO é certeza genérica. Use baixo (≤0.4) quando o conteúdo é ilegível, vazio, aleatório ou sem dados; alto (≥0.7) quando há tabelas, indicadores, métricas, listas ou registros claros.
- COERÊNCIA é TOLERANTE: o conteúdo só precisa PLAUSIVELMENTE se relacionar com a área "${area}". Um dashboard ou planilha operacional genérica costuma servir para vários tipos — só marque incoerente quando claramente não tiver relação (ex.: foto de paisagem, meme, selfie, documento pessoal para um relatório financeiro).
- Seja RIGOROSO apenas contra: arquivos sem nexo, imagens aleatórias/prints sem dados, documentos vazios, conteúdo ilegível e materiais sem QUALQUER indicador operacional.
- NÃO invente dados. Baseie-se somente no que está nos arquivos.
- "unreadable" (ilegível/baixa qualidade) só se aplica a IMAGENS e PDFs. Fontes de texto (CSV, XLSX, TXT, JSON, Word) já vêm extraídas — nunca as classifique como ilegíveis.`;

  const userMessage = `TIPO DE RELATÓRIO (área): ${area}

ARQUIVOS RECEBIDOS:
${sourcesText || '(sem fontes de texto)'}
${hasBinary ? `\n[${binarySources.length} arquivo(s) binário(s) anexado(s) abaixo para análise: ${binarySources.map((b) => b.name).join(', ')}]` : ''}

Avalie e responda SOMENTE com JSON válido neste formato:
{
  "status": "valid | unrelated | insufficient_data | unreadable | corrupted",
  "confidence": 0.0,
  "content_identified": true,
  "minimum_data": true,
  "coherent": true,
  "reason": "frase curta e objetiva em português explicando a decisão",
  "missing_fields": ["campos/dados mínimos que faltam, se houver"],
  "suggested_action": "orientação prática do que o usuário deve enviar ou preencher"
}

Significado dos status:
- "valid": há dados suficientes e coerentes para gerar o relatório.
- "unrelated": o conteúdo não tem relação com a área "${area}".
- "insufficient_data": há algum conteúdo, mas faltam dados mínimos para uma análise confiável (liste em missing_fields).
- "unreadable": imagem/PDF ilegível, incompleto ou de baixa qualidade.
- "corrupted": não foi possível interpretar o arquivo.

Campos mínimos típicos para análise operacional/eventos: nome do evento, data/período, total de acessos ou passagens, público esperado/cadastrado, indicadores do dashboard, gráficos de fluxo/ocupação, listas, métodos de acesso, tabelas/planilhas com dados.`;

  const parts = [{ text: userMessage }];
  for (const b of binarySources) parts.push({ inline_data: { mime_type: b.mimeType, data: b.data } });

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const geminiBody = JSON.stringify({
    system_instruction: { parts: [{ text: systemPrompt }] },
    contents: [{ role: 'user', parts }],
    generationConfig: {
      temperature: 0.1,
      maxOutputTokens: 1024,
      responseMimeType: 'application/json',
      thinkingConfig: { thinkingBudget: 0 },
    },
  });

  try {
    let response = null;
    let lastStatus = 0;
    for (let attempt = 0; attempt < 3; attempt++) {
      response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
        { method: 'POST', headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey }, body: geminiBody }
      );
      if (response.ok) break;
      lastStatus = response.status;
      if ((response.status === 503 || response.status === 429) && attempt < 2) { await sleep(900 * (attempt + 1)); continue; }
      break;
    }

    if (!response.ok) {
      if (lastStatus === 503) return res.status(503).json({ error: 'A IA está com alta demanda neste momento. Aguarde alguns segundos e tente novamente.' });
      if (lastStatus === 429) return res.status(429).json({ error: 'Muitas solicitações agora. Aguarde um instante e tente novamente.' });
      return res.status(502).json({ error: 'Não foi possível validar o arquivo agora. Tente novamente em instantes.' });
    }

    const data = await response.json();
    const cand = data.candidates && data.candidates[0];
    const text = ((cand && cand.content && cand.content.parts) || []).map((p) => p.text).filter(Boolean).join('');
    if (!text) {
      if (data.promptFeedback && data.promptFeedback.blockReason) {
        // Conteúdo bloqueado por política costuma indicar material sem nexo com o relatório.
        return res.status(200).json(buildResult({
          is_valid: false, status: 'unrelated', confidence: 0.2,
          reason: 'O conteúdo enviado não pôde ser analisado para este tipo de relatório.',
          missing_fields: [], suggested_action: 'Envie um arquivo com dados operacionais, indicadores, gráficos, tabelas ou informações do evento.',
          content_identified: false, minimum_data: false, coherent: false,
        }));
      }
      return res.status(502).json({ error: 'A IA não retornou um resultado de validação. Tente novamente.' });
    }

    const cleaned = text.trim().replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '');
    let v;
    try { v = JSON.parse(cleaned); } catch {
      return res.status(502).json({ error: 'Não foi possível interpretar a validação. Tente novamente.' });
    }

    // ── Normaliza + aplica a barreira de confiança no servidor (não burlável) ──
    let status = STATUS_VALUES.includes(v.status) ? v.status : 'insufficient_data';
    let confidence = Number(v.confidence);
    if (!isFinite(confidence)) confidence = 0;
    confidence = Math.max(0, Math.min(1, confidence));

    const contentIdentified = v.content_identified !== false;
    const minimumData = v.minimum_data !== false;
    const coherent = v.coherent !== false;

    // is_valid final exige status valid + checklist ok + confiança no limiar.
    let isValid = status === 'valid' && contentIdentified && minimumData && coherent && confidence >= MIN_CONFIDENCE;

    // Se a IA disse "valid" mas a confiança ficou abaixo do limiar, rebaixa para revisão.
    if (status === 'valid' && !isValid) status = 'insufficient_data';

    return res.status(200).json(buildResult({
      is_valid: isValid,
      status,
      confidence,
      reason: typeof v.reason === 'string' ? v.reason : '',
      missing_fields: Array.isArray(v.missing_fields) ? v.missing_fields.filter((x) => typeof x === 'string').slice(0, 10) : [],
      suggested_action: typeof v.suggested_action === 'string' ? v.suggested_action : '',
      content_identified: contentIdentified,
      minimum_data: minimumData,
      coherent,
    }));
  } catch (err) {
    return res.status(502).json({ error: 'Não foi possível validar o arquivo agora. Tente novamente em instantes.' });
  }
};

// Garante a forma do resultado e injeta o limiar usado.
function buildResult(r) {
  return {
    is_valid: !!r.is_valid,
    status: r.status,
    confidence: typeof r.confidence === 'number' ? Math.round(r.confidence * 100) / 100 : 0,
    reason: r.reason || '',
    missing_fields: r.missing_fields || [],
    suggested_action: r.suggested_action || '',
    checklist: {
      content_identified: !!r.content_identified,
      minimum_data: !!r.minimum_data,
      coherent: !!r.coherent,
    },
    min_confidence: MIN_CONFIDENCE,
  };
}
