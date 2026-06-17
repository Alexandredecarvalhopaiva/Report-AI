# Report AI — Kit de Identidade Visual

Identidade do Report AI: estética de **cordel nordestino / xilogravura** (sol nascente, ornamentos
editoriais, textura artesanal) aplicada a um produto **SaaS de relatórios com IA** — limpa, moderna e
escalável. Símbolo = um *documento de relatório* com sol, gráficos de barras, linha e pizza.

## Paleta

| Cor | Hex | Uso |
| --- | --- | --- |
| Tinta (preto) | `#1B1A17` | Traços, "Report", texto |
| Creme / papel | `#F6F0E4` | Fundo do papel, superfícies |
| Creme profundo | `#EFE6D4` | Tiles, cartões, fundos secundários |
| Dobra (sombra) | `#E7D7BC` | Detalhe do canto dobrado |
| Terracota / laranja queimado | `#BF5A30` | "AI", sol, fatia do gráfico, acentos |

## Tipografia

- **Marca "Report AI"** — serifada, peso bold. Referência: **Georgia** (usada nos arquivos por ser
  universal). Upgrade recomendado para produção: **Playfair Display** (700) ou **Lora** (700).
  Sempre "Report" em tinta `#1B1A17` e "AI" em terracota `#BF5A30`.
- **Tagline / labels** — sans-serif, caixa alta, espaçada. Referência: **Helvetica Neue / Arial bold**,
  `letter-spacing ~3px`. Upgrade: **Inter** ou **Archivo**.

## Arquivos

| Arquivo (SVG + PNG) | Quando usar |
| --- | --- |
| `report-ai-logo` | Logo principal (vertical). Capa, apresentações, áreas amplas. |
| `report-ai-logo-horizontal` | Cabeçalhos, e-mail, assinaturas, faixas largas. |
| `report-ai-isotipo` | Só o símbolo. Avatar, redes sociais, marca d'água. |
| `report-ai-dashboard` | Lockup compacto para navbar/topo de dashboard (altura ~32–40px). |
| `report-ai-logo-mono` | Versão monocromática (1 cor) — impressão P&B, gravação, fax, carimbo. |
| `report-ai-app-icon` (+ `apple-touch-icon`, `icon-192`, `icon-512`) | Ícone de app / PWA. Tile creme arredondado. |
| `report-ai-favicon` (+ `favicon-16/32/48`) | Favicon do navegador (símbolo simplificado). |

SVG = fonte vetorial (escala infinita, editável). PNG = fundo transparente, alta resolução, prontos pra uso.

## Regras de uso

- **Área de proteção:** mantenha em volta da marca um espaço livre ≥ a altura do "R" de "Report".
- **Tamanho mínimo:** logo horizontal ≥ 120px de largura; isotipo ≥ 24px; favicon usa a versão simplificada.
- **Fundo escuro:** use a versão monocromática invertida (cores claras) — posso gerar sob demanda.
- **Não faça:** distorcer, trocar as cores, adicionar sombra/gradiente, girar, ou inverter "Report"/"AI".

Gerado a partir de `report-ai-isotipo.svg` (símbolo-fonte). Para re-exportar PNGs: `node export.js`.
