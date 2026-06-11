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

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return { statusCode: 500, body: JSON.stringify({ error: 'GROQ_API_KEY não configurada.' }) };
  }

  let body;
  try {
    body = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Body inválido.' }) };
  }

  const { reportType = 'executive', objective = 'executive', period = '', audience = '', sources = [] } = body;

  const specialist = SPECIALIST_PROMPTS[reportType] || SPECIALIST_PROMPTS.executive;
  const objectiveLabel = OBJECTIVE_LABELS[objective] || 'Relatório Executivo';

  const sourcesText = sources.map((s, i) =>
    `--- Fonte ${i + 1}: ${s.name} (${s.type}) ---\n${s.content}`
  ).join('\n\n');

  const userMessage = `
TIPO DE RELATÓRIO: ${specialist.area}
OBJETIVO: ${objectiveLabel}
PÚBLICO-ALVO: ${audience || 'Não informado'}
PERÍODO: ${period || 'Não informado'}

=== DADOS FORNECIDOS ===
${sourcesText || 'Nenhuma fonte enviada — faça uma análise geral com base no contexto.'}

=== INSTRUÇÃO ===
Produza uma análise especializada completa. Responda SOMENTE com JSON válido no formato abaixo:
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

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: specialist.prompt },
          { role: 'user', content: userMessage },
        ],
        temperature: 0.3,
        response_format: { type: 'json_object' },
        max_tokens: 4096,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      return { statusCode: 502, body: JSON.stringify({ error: `Groq error: ${err}` }) };
    }

    const data = await response.json();
    const content = JSON.parse(data.choices[0].message.content);

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({
        ...content,
        specialist_name: specialist.name,
        specialist_area: specialist.area,
        report_type: reportType,
        objective: objectiveLabel,
        period,
        audience,
        generated_at: new Date().toISOString(),
      }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: `Erro interno: ${err.message}` }),
    };
  }
};
