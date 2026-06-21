const SPECIALIST_PROMPTS = {
  financial: {
    name: 'Especialista Financeiro',
    area: 'Finanças e Controladoria',
    prompt: `Você é o Especialista Financeiro do Report AI. Analise receitas, despesas, margens, fluxo de caixa, inadimplência e sustentabilidade financeira. Use linguagem executiva, objetiva e prudente. Não afirme lucro ou prejuízo sem base nos dados.`
  },
  hr: {
    name: 'Especialista em RH',
    area: 'Gestão de Pessoas',
    prompt: `Você é o Especialista em RH do Report AI. Analise turnover, absenteísmo, produtividade, admissões, desligamentos e indicadores de pessoas. Seja cuidadoso e baseado em dados, evitando julgamentos individuais.`
  },
  commercial: {
    name: 'Especialista Comercial',
    area: 'Vendas e Funil Comercial',
    prompt: `Você é o Especialista Comercial do Report AI. Analise vendas, funil, conversão, ticket médio, metas, propostas, clientes e canais. Ajude a identificar onde vender mais e reduzir perdas no funil.`
  },
  operational: {
    name: 'Especialista Operacional',
    area: 'Operações e Processos',
    prompt: `Você é o Especialista Operacional do Report AI. Analise eficiência, gargalos, demanda, tempo de atendimento, falhas e produtividade. Seja direto e técnico, orientado a ações corretivas.`
  },
  events: {
    name: 'Especialista em Eventos',
    area: 'Gestão de Eventos',
    prompt: `Você é o Especialista em Eventos do Report AI. Analise público cadastrado, esperado e presente, taxas de comparecimento, horários de pico, pontos de entrada e gargalos operacionais.`
  },
  marketing: {
    name: 'Especialista em Marketing',
    area: 'Marketing Digital e Performance',
    prompt: `Você é o Especialista em Marketing do Report AI. Analise campanhas, CAC, ROI, leads, conversão, engajamento e canais digitais. Conecte visibilidade com impacto comercial real.`
  },
  customer_service: {
    name: 'Especialista em Atendimento',
    area: 'Suporte e Experiência do Cliente',
    prompt: `Você é o Especialista em Atendimento ao Cliente do Report AI. Analise chamados, SLA, tempo de resposta, satisfação, reincidência e desempenho da equipe.`
  },
  productivity: {
    name: 'Especialista em Produtividade',
    area: 'Desempenho Operacional',
    prompt: `Você é o Especialista em Produtividade do Report AI. Analise metas, entregas, tarefas concluídas, tempo de execução, gargalos, retrabalho e capacidade produtiva.`
  },
  engineering: {
    name: 'Especialista em Engenharia',
    area: 'Construção Civil e Projetos',
    prompt: `Você é o Especialista em Engenharia e Obras do Report AI. Analise avanço físico-financeiro, cronograma, custos, desvios e riscos de prazo. Use linguagem técnica e comparativa.`
  },
  security: {
    name: 'Especialista em Segurança',
    area: 'Controle de Acesso e Segurança',
    prompt: `Você é o Especialista em Segurança do Report AI. Analise acessos autorizados/negados, tentativas suspeitas, dispositivos, anomalias e falhas de autenticação. Seja técnico e rastreável.`
  },
  educational: {
    name: 'Especialista Educacional',
    area: 'Educação e Pedagogia',
    prompt: `Você é o Especialista Educacional do Report AI. Analise frequência, desempenho acadêmico, evasão, notas, participação e indicadores pedagógicos. Adote abordagem preventiva.`
  },
  executive: {
    name: 'Analista Executivo',
    area: 'Gestão Estratégica',
    prompt: `Você é o Analista Executivo do Report AI. Crie uma análise estratégica resumida para diretoria, focando em KPIs, riscos, oportunidades e decisões imediatas.`
  }
};

const OBJECTIVE_LABELS = {
  executive: 'Relatório Executivo',
  technical: 'Relatório Técnico',
  managerial: 'Relatório Gerencial',
  client: 'Relatório para Cliente',
  board: 'Relatório para Diretoria',
  audit: 'Relatório de Auditoria',
};

module.exports = async (req, res) => {
  // Controle de origem: por padrão só mesma origem; defina ALLOWED_ORIGINS (CSV) na Vercel p/ liberar outras.
  const reqOrigin = req.headers.origin || '';
  const reqHost = req.headers.host || '';
  const allowList = (process.env.ALLOWED_ORIGINS || '').split(',').map((s) => s.trim()).filter(Boolean);
  const sameOrigin = !reqOrigin || reqOrigin === `https://${reqHost}` || reqOrigin === `http://${reqHost}`;
  const originAllowed = sameOrigin || allowList.includes(reqOrigin);
  if (reqOrigin && originAllowed) res.setHeader('Access-Control-Allow-Origin', reqOrigin);
  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (!originAllowed) return res.status(403).json({ error: 'Origem não autorizada.' });

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'GEMINI_API_KEY não configurada.' });
  const model = process.env.GEMINI_MODEL || 'gemini-2.5-flash';

  const { reportType = 'executive', objective = 'executive', period = '', audience = '', sources = [] } = req.body || {};

  // Limite de payload (sources carregam base64 de PDFs/imagens) — evita abuso e custo excessivo.
  const payloadChars = (sources || []).reduce((n, s) => n + ((s && s.data && s.data.length) || 0) + ((s && s.content && s.content.length) || 0), 0);
  if (payloadChars > 6000000) return res.status(413).json({ error: 'Conteúdo muito grande para análise. Reduza o tamanho ou a quantidade de arquivos.' });

  // Defesa em profundidade: não emitir relatório sem nenhum dado real (mesmo que a validação do cliente seja burlada).
  const usableSources = (sources || []).filter((s) => (s && s.data && s.mimeType) || (s && typeof s.content === 'string' && s.content.trim().length));
  if (!usableSources.length) return res.status(400).json({ error: 'Nenhum arquivo com dados válidos foi enviado. Anexe um arquivo com informações para gerar o relatório.' });

  const specialist = SPECIALIST_PROMPTS[reportType] || SPECIALIST_PROMPTS.executive;
  const objectiveLabel = OBJECTIVE_LABELS[objective] || 'Relatório Executivo';

  const textSources = sources.filter(s => s.content);
  const binarySources = sources.filter(s => s.data && s.mimeType);

  const sourcesText = textSources.map((s, i) =>
    `--- Fonte ${i + 1}: ${s.name} (${s.type}) ---\n${s.content}`
  ).join('\n\n');

  const userMessage = `
TIPO DE RELATÓRIO: ${specialist.area}
OBJETIVO: ${objectiveLabel}
PÚBLICO-ALVO: ${audience || 'Não informado'}
PERÍODO: ${period || 'Não informado'}

=== DADOS FORNECIDOS ===
${sourcesText || (binarySources.length ? '(Documentos e imagens anexados abaixo para análise.)' : 'Nenhuma fonte enviada — faça uma análise geral com base no contexto.')}

=== INSTRUÇÃO ===
Baseie-se SOMENTE nos dados fornecidos acima. NÃO invente números, nomes, datas ou fatos que não estejam nos dados — se alguma informação não constar, escreva "não informado" em vez de supor. Produza uma análise especializada completa. Responda SOMENTE com JSON válido no formato abaixo:
{
  "title": "Título do relatório",
  "executive_summary": "Resumo executivo em 3-5 parágrafos",
  "main_indicators": [
    {"name": "Nome do indicador", "value": "Valor ou status", "interpretation": "O que significa"}
  ],
  "chart_insights": [
    {"type": "Tipo de dado analisado", "insight": "Interpretação especializada"}
  ],
  "attention_points": ["Ponto de atenção 1", "Ponto de atenção 2"],
  "inconsistencies": ["Inconsistência identificada, se houver"],
  "recommendations": ["Recomendação prática 1", "Recomendação prática 2"],
  "confidence_score": 8.5,
  "confidence_interpretation": "Justificativa do score",
  "conclusion": "Conclusão final do relatório"
}
`.trim();

  // Monta as partes multimodais: texto + PDFs/imagens (base64) lidos diretamente pela IA
  const parts = [{ text: userMessage }];
  for (const b of binarySources) {
    parts.push({ inline_data: { mime_type: b.mimeType, data: b.data } });
  }

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const geminiBody = JSON.stringify({
    system_instruction: { parts: [{ text: specialist.prompt }] },
    contents: [{ role: 'user', parts }],
    generationConfig: {
      temperature: 0.3,
      maxOutputTokens: 8192,
      responseMimeType: 'application/json',
      thinkingConfig: { thinkingBudget: 0 },
    },
  });

  try {
    // Até 3 tentativas — 503 (sobrecarga) e 429 (limite) são transitórios no Gemini.
    let response = null;
    let lastStatus = 0;
    for (let attempt = 0; attempt < 3; attempt++) {
      response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
        { method: 'POST', headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey }, body: geminiBody }
      );
      if (response.ok) break;
      lastStatus = response.status;
      if ((response.status === 503 || response.status === 429) && attempt < 2) {
        await sleep(900 * (attempt + 1));
        continue;
      }
      break;
    }

    if (!response.ok) {
      if (lastStatus === 503) return res.status(503).json({ error: 'A IA está com alta demanda neste momento. Aguarde alguns segundos e tente gerar de novo.' });
      if (lastStatus === 429) return res.status(429).json({ error: 'Muitas solicitações agora. Aguarde um instante e tente novamente.' });
      if (lastStatus === 400 || lastStatus === 401 || lastStatus === 403) return res.status(502).json({ error: 'O serviço de IA está indisponível no momento. Tente novamente mais tarde.' });
      return res.status(502).json({ error: 'Não foi possível gerar o relatório agora. Tente novamente em instantes.' });
    }

    const data = await response.json();
    const cand = data.candidates && data.candidates[0];
    const finishReason = cand && cand.finishReason;
    const text = ((cand && cand.content && cand.content.parts) || [])
      .map(p => p.text).filter(Boolean).join('');
    if (!text) {
      if (data.promptFeedback && data.promptFeedback.blockReason) {
        return res.status(422).json({ error: 'A IA não pôde analisar este conteúdo por políticas de segurança. Tente com outros dados.' });
      }
      return res.status(502).json({ error: 'A IA não retornou um resultado. Tente gerar novamente.' });
    }

    // Remove cercas de markdown (```json ... ```), caso a IA as inclua
    const cleaned = text.trim().replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '');

    let content;
    try { content = JSON.parse(cleaned); }
    catch {
      if (finishReason === 'MAX_TOKENS') {
        return res.status(502).json({ error: 'O relatório ficou grande demais e veio incompleto. Reduza os dados enviados e tente de novo.' });
      }
      return res.status(502).json({ error: 'Não foi possível interpretar a resposta da IA. Tente gerar novamente.' });
    }

    return res.status(200).json({
      ...content,
      specialist_name: specialist.name,
      specialist_area: specialist.area,
      report_type: reportType,
      objective: objectiveLabel,
      period,
      audience,
      generated_at: new Date().toISOString(),
    });
  } catch (err) {
    return res.status(502).json({ error: 'Não foi possível gerar o relatório agora. Tente novamente em instantes.' });
  }
};
