# Acesse Report AI

Gerador inteligente de relatorios operacionais para eventos, criado para transformar dados de controle de acesso, reconhecimento facial, listas, portoes, dispositivos, dashboards e anexos em documentos profissionais, auditaveis e prontos para entrega ao produtor ou contratante.

O objetivo do produto nao e apenas gerar um PDF. A proposta e entregar uma camada completa de prestacao de contas operacional:

- relatorio executivo;
- analise critica dos indicadores;
- auditoria automatica de inconsistencias;
- score de confiabilidade;
- central de anexos;
- versionamento;
- exportacao profissional.

## Problema Resolvido

Em operacoes de eventos, o dashboard ja mostra dados em tempo real, mas o cliente final geralmente precisa de um documento formal no pos-evento. Sem uma ferramenta dedicada, esse trabalho exige copiar numeros, interpretar graficos, inserir imagens, escrever conclusoes, revisar calculos e conferir se os dados fazem sentido.

O Acesse Report AI reduz esse trabalho manual ao consolidar as informacoes do evento em um fluxo guiado, com validacoes automaticas antes da entrega final.

## Proposta do Produto

O Acesse Report AI transforma automaticamente dados operacionais em relatorios profissionais de eventos. A plataforma foi pensada para interpretar informacoes como:

- publico cadastrado;
- publico esperado;
- total de acessos;
- acessos unicos;
- ocupacao estimada;
- ausentes;
- horarios de pico;
- entradas por dia;
- entradas por horario;
- metodos de acesso;
- portoes utilizados;
- equipamentos utilizados;
- status de dispositivos;
- anexos e evidencias operacionais.

## Fluxo Principal do MVP

O prototipo implementa o fluxo central do produto em sete telas:

1. Login com Gmail ou credenciais demonstrativas.
2. Lista de eventos com relatorio.
3. Cadastro operacional do evento.
4. Upload de arquivos e imagens.
5. Previa dos dados extraidos.
6. Auditoria e nota do relatorio.
7. Geracao, exportacao e versionamento.

## Funcionalidades Implementadas

### 1. Login Demonstrativo

O sistema possui uma tela de acesso interno com login por e-mail/senha e botao demonstrativo de Google.

Credenciais de teste:

- Super Admin: `alexandre_cp@hotmail.com` / `Ms@12345`
- Super Admin: `admin@ms.com` / `Mserv@2026`
- Supervisor: `supervisor@ms.com` / `Equipe@2026`

### 2. Modulo Acesse Report AI

O menu interno possui a area `Report AI`, acessivel pela rota:

```text
#painel/relatorios
```

Esse modulo concentra o fluxo de geracao de relatorios operacionais.

### 3. Lista de Eventos

A tela de eventos mostra os relatorios cadastrados, com:

- nome do evento;
- periodo;
- cliente/contratante;
- total de acessos;
- status do relatorio;
- score de confiabilidade.

O prototipo ja vem com um evento demonstrativo chamado `Pre-Junino`.

### 4. Cadastro do Evento

O cadastro operacional armazena os principais dados necessarios para a capa, metodologia e rastreabilidade do relatorio:

- nome do evento;
- cliente ou contratante;
- empresa responsavel;
- CNPJ;
- local;
- data inicial;
- data final;
- quantidade de dias;
- agendas vinculadas;
- portoes utilizados;
- equipamentos utilizados;
- metodo principal de acesso;
- responsavel tecnico.

### 5. Importacao e Central de Anexos

O MVP permite registrar anexos relacionados ao evento, simulando a central de evidencias do produto.

Tipos aceitos no formulario:

- PDF;
- PNG;
- JPG/JPEG;
- CSV;
- XLS/XLSX.

Cada anexo possui:

- nome do arquivo;
- tipo;
- relacao com o evento;
- tipo de fonte;
- descricao;
- usuario responsavel;
- data de upload.

Exemplos de relacao com o evento:

- Dashboard principal;
- Exportacao analitica;
- Evidencia operacional;
- Foto de equipamento;
- Documento do cliente.

### 6. Previa dos Dados Extraidos

Antes de gerar o texto final, os indicadores ficam estruturados em campos editaveis:

- publico cadastrado;
- publico esperado;
- total de acessos;
- acessos unicos;
- ocupacao informada;
- ausentes informados;
- horario de pico;
- entradas no pico;
- velocidade no pico;
- acessos por reconhecimento facial;
- acessos por QR/cartao;
- acessos por outros metodos;
- acessos por dia.

Essa tela representa a etapa em que a IA, futuramente, lera PDFs, imagens, planilhas ou APIs e convertera tudo em dados estruturados.

### 7. Auditoria Inteligente

A auditoria verifica automaticamente se os principais numeros fazem sentido antes da entrega final.

Validacoes presentes no prototipo:

- completude das informacoes obrigatorias;
- total global versus soma dos acessos por dia;
- calculo de ocupacao;
- calculo de ausentes;
- soma dos metodos de acesso;
- fechamento de credenciamento;
- existencia de anexos;
- rastreabilidade das fontes;
- observacoes sobre dispositivos;
- existencia de recomendacoes finais.

No evento demonstrativo `Pre-Junino`, a auditoria detecta uma inconsistencia proposital:

```text
Total geral informado: 2.019
Acessos do dia 23/05: 1.048
Acessos do dia 24/05: 1.262
Soma dos dias: 2.310
```

Como a soma dos dias nao fecha com o total geral, o relatorio recebe status `Com inconsistencia`.

### 8. Score de Confiabilidade

O sistema calcula uma nota de 0 a 10 para o relatorio.

Essa nota nao avalia se o evento foi bom ou ruim. Ela avalia se o relatorio esta completo, coerente e seguro para envio.

O score considera:

- informacoes obrigatorias;
- coerencia matematica;
- fechamento de metodos de acesso;
- qualidade dos anexos;
- rastreabilidade;
- recomendacoes operacionais;
- observacoes de dispositivos.

Exemplo do prototipo:

```text
Score: 7,9/10
Status: Com inconsistencia
```

### 9. Geracao de Relatorio

A tela de geracao permite escolher o tipo de relatorio:

- Relatorio Basico;
- Relatorio Detalhado;
- Relatorio Personalizado.

Tambem permite definir observacoes finais e selecionar formatos de exportacao:

- PDF;
- Word;
- Google Sheets.

No prototipo, a exportacao e simulada por interface. A estrutura ja esta preparada para uma futura integracao real com geradores de PDF, DOCX e planilhas.

### 10. Previa Executiva

O sistema monta uma previa executiva com:

- nome do evento;
- periodo;
- total de acessos;
- publico cadastrado;
- ocupacao;
- horario de pico;
- metodo principal;
- soma por dia;
- score de confiabilidade;
- recomendacoes finais.

### 11. Versionamento

Cada geracao cria uma nova versao do relatorio.

Exemplos:

- `v1.0` - gerado automaticamente;
- `v1.1` - nova versao com auditoria;
- `v1.2` - ajustes posteriores;
- `v2.0` - versao aprovada para envio.

Cada versao registra:

- numero da versao;
- status;
- score;
- usuario criador;
- data;
- descricao das alteracoes;
- nomes simulados dos arquivos exportados.

Status disponiveis no fluxo:

- Rascunho;
- Em revisao;
- Com inconsistencia;
- Aprovado;
- Enviado ao cliente;
- Arquivado.

## Tipos de Relatorio Planejados

### Relatorio Basico

Modelo para entrega rapida ao produtor.

Estrutura sugerida:

- capa;
- resumo executivo;
- indicadores principais;
- imagem ou grafico principal do dashboard;
- conclusao objetiva;
- observacoes e recomendacoes.

Ideal para documentos de 2 a 5 paginas.

### Relatorio Detalhado

Modelo para prestacao de contas completa.

Estrutura sugerida:

- capa institucional;
- dados da empresa responsavel;
- dados do contratante;
- dados do evento;
- metodologia da coleta;
- resumo executivo;
- indicadores globais;
- indicadores por dia;
- fluxo por horario;
- fluxo por portao;
- pessoas por lista/tag;
- capacidade por lista;
- credenciamento;
- metodos de acesso;
- notificacoes por canal;
- status dos dispositivos;
- acessos ou recusas relevantes;
- inconsistencias encontradas;
- nota de qualidade;
- recomendacoes operacionais;
- anexos.

Ideal para documentos de 8 a 20 paginas, dependendo do evento.

## Regras de Validacao Recomendadas

O produto foi pensado para aplicar regras como:

```text
Total global = soma dos acessos por dia
Ocupacao = acessos unicos / publico esperado
Ausentes = publico esperado - acessos unicos
Metodos de acesso = reconhecimento facial + QR/cartao + outros
Credenciamento = com foto + sem foto
Notificacoes = entregues + falhas
```

Quando houver diferenca entre acesso unico e passagem total, o sistema deve destacar isso no relatorio em vez de tratar automaticamente como erro.

## Arquitetura Recomendada Para Evolucao

O MVP atual e um prototipo estatico em HTML, CSS e JavaScript. Para a versao de produto, a arquitetura recomendada e:

| Camada | Sugestao |
| --- | --- |
| Frontend | React ou Next.js |
| Backend | FastAPI, NestJS ou Node.js |
| Banco de dados | PostgreSQL |
| Fila de processamento | Celery, Redis Queue ou BullMQ |
| Arquivos | S3, Cloudflare R2 ou Google Cloud Storage |
| Autenticacao | Google OAuth, Auth.js ou Firebase Auth |
| IA | Modelo multimodal para imagem/PDF + modelo textual para redacao |
| PDF | WeasyPrint, ReportLab ou Puppeteer |
| Word | python-docx ou docxtpl |
| Planilhas | Google Sheets API |
| Logs | Tabela de auditoria e monitoramento |

## Modelo de Dados Planejado

Entidades principais:

- `companies`
- `users`
- `events`
- `event_days`
- `attachments`
- `metrics`
- `reports`
- `report_versions`
- `quality_checks`

Essas entidades permitem evoluir o prototipo para uma plataforma com usuarios, empresas, eventos, anexos, indicadores, auditorias, versoes e arquivos gerados.

## Como Abrir o Projeto

Como o projeto e estatico, basta abrir o arquivo:

```text
index.html
```

Ou iniciar um servidor local:

```bash
python3 -m http.server 4173
```

Depois acesse:

```text
http://localhost:4173
```

## Estrutura do Projeto

```text
.
├── index.html
├── styles.css
├── app.js
├── assets/
├── README.md
├── netlify.toml
├── robots.txt
└── sitemap.xml
```

## Tecnologias do Prototipo

- HTML5;
- CSS3 responsivo;
- JavaScript puro;
- localStorage para persistencia demonstrativa;
- interface com login, painel interno, auditoria e versionamento simulados.

## Persistencia dos Dados

Os dados do prototipo ficam salvos no `localStorage` do navegador.

Isso significa que:

- nao ha backend real nesta versao;
- nao ha banco de dados externo;
- uploads sao registrados como metadados demonstrativos;
- exportacoes sao simuladas pela interface.

## Diferencial Comercial

O Acesse Report AI pode ser vendido como uma extensao premium para operacoes de controle de acesso:

```text
Além de controlar o acesso em tempo real, entregamos ao produtor uma prestacao de contas profissional, auditavel e pronta para apresentacao.
```

Formatos comerciais possiveis:

- cobranca por evento;
- plano mensal para produtores recorrentes;
- plano enterprise para grandes eventos;
- personalizacao por cliente;
- integracao direta com dashboard, API ou banco interno.

## Status Atual

Este repositorio contem um prototipo funcional do MVP visual e operacional, com foco em:

- demonstrar o fluxo do produto;
- validar a experiencia de uso;
- apresentar a proposta comercial;
- simular auditoria automatica;
- simular geracao e versionamento de relatorios.

As proximas etapas recomendadas sao:

- integrar leitura real de PDF, imagem e planilhas;
- conectar com API ou banco do sistema Acesse;
- gerar PDF real;
- gerar DOCX real;
- integrar Google Sheets;
- implementar Google OAuth real;
- criar backend com banco de dados;
- registrar logs de auditoria por usuario.
