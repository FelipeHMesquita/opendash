# Design Tokens — Referência de Variáveis

---

## O que é necessário para mapear um tema

Para construir um tema completo, duas informações são indispensáveis. O restante pode ser derivado ou inferido.

### O que um print de interface sempre revela

Qualquer screenshot de uma interface contém essas informações de forma legível:

- **Sistema de superfícies** — background, card, muted e accent são as grandes áreas da tela, sempre visíveis
- **Foreground e texto secundário** — texto está sempre presente
- **Bordas e divisores** — aparecem em tabelas, inputs e cards
- **Elevation delta** — a relação de luminosidade entre as camadas é lida visualmente: o quanto o card é mais claro que o background define o caráter do tema

### O que um print pode não mostrar

- **`--primary` (cor de ação)** — só aparece se houver botão CTA, link ativo, item de nav selecionado ou elemento de destaque na tela. Uma tabela sem botões visíveis não fornece essa informação.
- **`--sidebar`** — só se a sidebar estiver no frame
- **`--input`** — só se houver campos de formulário visíveis
- **`--destructive`, `--success`, `--warning`** — só se esses estados estiverem ativos na tela
- **`--chart-*`** — só se houver gráficos no print

### Mínimo necessário para um tema funcional

| Informação | Fonte ideal | Alternativa aceitável |
|---|---|---|
| Sistema de superfícies | Print com cards e background visíveis | Qualquer screenshot de interface |
| Cor de ação (primary) | Print com botão, link ativo ou logo | Hex direto, nome da cor, logo |
| Sidebar | Print com navegação lateral | "Igual ao background" ou derivada |
| Semânticas | Print com alertas/status visíveis | Derivadas por convenção universal |
| Charts | Print com visualizações | Derivadas do primary |

### Regra prática

O sistema de superfícies é sempre extraível de qualquer screenshot. A **cor primária é o único elemento não derivável** — ela não pode ser inferida a partir das superfícies. Se o print não contiver um elemento de ação visível, é necessário alguma referência adicional: um hex, o nome da cor, ou a logo do produto.

Para as variáveis ausentes no print, o padrão é derivar por coerência com o tema: se as superfícies são navy com H 240, sidebar e popovers seguem o mesmo H. Semânticas (destructive, success, warning) permanecem nos valores universais a menos que haja evidência contrária.

---

## Regras Globais Invioláveis

Estas regras se aplicam a **toda a interface** — não apenas a uma camada específica. Nenhum componente, mock ou preview pode violá-las.

### Mínimo tipográfico global

O tamanho mínimo de texto renderizado para o usuário final é `text-xs` (12px). Valores abaixo de 12px (`text-[10px]`, `text-[11px]`, `text-[9px]`) só são permitidos em **chrome de ferramenta** (UI de builder, controles de IDE, badges de status de ferramenta) — nunca em conteúdo que representa a interface do produto.

| Contexto | Mínimo | Justificativa |
|---|---|---|
| Texto de conteúdo (tabelas, cards, listas) | `text-xs` (12px) | Legibilidade baseline |
| Navegação (navbar, sidebar, breadcrumbs) | `text-sm` (14px) | Navegação é funcional, não decorativa |
| Gráficos (eixos, legendas, tooltips) | `text-xs` (12px) | Orientação visual sem competir com dados |
| Chrome de ferramenta (builder, IDE) | sem mínimo | Não é output do produto |

### Valores arbitrários proibidos no output

Nunca usar `text-[Npx]` com valores customizados no output do produto. Apenas as classes da escala Tailwind são permitidas: `text-xs`, `text-sm`, `text-base`, `text-lg`, `text-xl`, etc. Valores como `text-[10px]`, `text-[11px]`, `text-[13px]` indicam que a decisão tipográfica foi feita por "ajuste visual" em vez de por função — isso quebra a coerência do sistema.

### Cores semânticas obrigatórias

Os tokens `--success`, `--destructive`, `--warning`, `--info` existem no globals.css para light e dark mode. Qualquer indicação de estado positivo/negativo/atenção/informação **deve** usar esses tokens — nunca nomes de cor Tailwind.

| Errado | Correto | Quando |
|---|---|---|
| `text-emerald-500`, `bg-emerald-500/10` | `text-success`, `bg-success/10` | Status positivo, "Concluído", online |
| `text-rose-500`, `bg-rose-500/10` | `text-destructive`, `bg-destructive/10` | Erro, alta prioridade, deletar |
| `text-amber-400`, `bg-amber-500/10` | `text-warning`, `bg-warning/10` | Atenção, "Em revisão", prazo |
| `text-blue-400`, `bg-blue-500/10` | `text-info`, `bg-info/10` | Informativo, "Em progresso" |
| `bg-green-500` | `bg-success` | Indicador online |

**Por que:** cores Tailwind hardcoded (`emerald`, `rose`, `amber`, `blue`) não respondem a troca de tema. Os tokens semânticos são calibrados para cada modo (light/dark) e mantêm contraste correto automaticamente.

**Exceção:** cores usadas como identidade visual pura (avatar de departamento, ilustrações decorativas) podem ser hardcoded quando não carregam significado semântico de estado.

### Hierarquia visual nunca invertida

Num par header/body, o header é visualmente **igual ou mais forte** que o body. Nunca menor em tamanho sem compensação.

**Em tabelas:** headers podem ser `text-xs` quando o body é `text-sm`, **apenas se** o header usar `uppercase tracking-wider` para compensar. Sem uppercase, o header deve ser `text-sm font-semibold`.

| Padrão | Header | Body | Válido? |
|---|---|---|---|
| Header uppercase compacto | `text-xs/6 font-semibold uppercase tracking-wider` | `text-sm/6` | Sim |
| Header mesmo nível | `text-sm/6 font-semibold` | `text-sm/6` | Sim |
| Header menor sem compensação | `text-xs/6 font-semibold` (sem uppercase) | `text-sm/6` | **Não** |

### Divisores e bordas por token

Toda borda e divisor usa `border-border` ou `divide-border`. Nunca cores hardcoded.

| Errado | Correto |
|---|---|
| `divide-white/5` | `divide-border` |
| `divide-gray-800` | `divide-border` |
| `border-white/10` | `border-border` |

### Pesos tipográficos do sistema

O sistema usa 3 pesos. Componentes de output não devem usar outros.

| Peso | Classe | Uso |
|---|---|---|
| 400 | `font-normal` | Corpo de texto, dados de tabela, descrições |
| 500 | `font-medium` | Ênfase sutil — item ativo, valor em tabela, nome em lista |
| 600 | `font-semibold` | Títulos, headings, valores de destaque (stat cards), table headers |

`font-bold` (700) só é permitido em elementos decorativos (iniciais de logo/avatar, texto de error page). Nunca em dados, títulos ou navegação.

### Inline styles na escala

Quando uma library (Recharts, etc.) exige `fontSize` como prop numérica, o valor deve pertencer à escala: `12` (text-xs), `14` (text-sm), `16` (text-base), `18` (text-lg), `20` (text-xl).

Valores como `fontSize: 11`, `fontSize: 13`, `fontSize: 15` são proibidos — indicam ajuste visual ad-hoc.

---

## Camada 1 — Superfícies (Canvas)

O "chão" da interface. Define a hierarquia de profundidade entre as camadas visuais.

- `--background`
  - Cor da página. O nível mais baixo da hierarquia — tudo é renderizado sobre ele.

- `--foreground`
  - Cor do texto base. Aplicado sobre `--background`. Sempre neutro (chroma 0) para máxima legibilidade.

- `--card`
  - Superfície elevada. Usada em cards, painéis, seções agrupadas. Deve ser visivelmente mais clara que o background para criar profundidade.

- `--card-foreground`
  - Texto dentro de cards. Geralmente idêntico ao `--foreground`, mas pode ser levemente ajustado se o card tiver tinte.

- `--popover`
  - Superfície flutuante. Usada em dropdowns, tooltips, menus contextuais. Costuma ser igual ao `--card` ou um degrau acima.

- `--popover-foreground`
  - Texto dentro de popovers e dropdowns.

---

## Camada 2 — Controles Interativos

Estados, formulários e feedback de interação.

- `--secondary`
  - Fundo de botões secundários, chips, tags, badges de baixo destaque.

- `--secondary-foreground`
  - Texto sobre elementos secundários.

- `--muted`
  - Fundo de áreas desativadas, código inline, seções de baixo contraste, skeletons.

- `--muted-foreground`
  - A variável mais usada do sistema. Aparece em metadata, labels, textos de suporte, placeholders, timestamps, subtítulos — qualquer texto que não é o principal.

- `--accent`
  - Estado de hover em linhas de tabela, itens de lista, nav items. O "highlight" de interação mais comum.

- `--accent-foreground`
  - Texto e ícones no estado de accent/hover.

- `--border`
  - Divisores, bordas de input, separadores de seção. Em dark mode geralmente usa opacidade (`white/10%`) para se adaptar a qualquer base.

- `--input`
  - Fundo do campo de input. Costuma ser igual ao `--card` ou levemente diferente para distinguir a área editável.

- `--ring`
  - Outline de foco. Aparece ao navegar por teclado ou ao focar em inputs. Deve ser `= --primary` para coerência visual.

---

## Camada 3 — Ação / Marca

A decisão de identidade do produto. Uma única cor que define o caráter visual.

- `--primary`
  - CTA buttons, links, indicadores de progresso, badges de status ativo, ícones de destaque. É a cor da marca no produto.

- `--primary-foreground`
  - Texto e ícones sobre elementos com fundo `--primary`. Geralmente branco ou preto dependendo do L do primary.

---

## Camada 4 — Semântica

Linguagem universal de feedback do sistema. Estável entre temas — não carregam identidade de marca.

- `--destructive`
  - Botões e ações destrutivas (deletar, remover, revogar), alertas de erro crítico.

- `--destructive-foreground`
  - Texto sobre fundo destructive.

- `--success`
  - Confirmações, status de sucesso, badges "ativo", progress completado.

- `--success-foreground`
  - Texto sobre fundo success.

- `--warning`
  - Avisos, estados de atenção, prazos próximos, planos prestes a expirar.

- `--warning-foreground`
  - Texto sobre fundo warning.

- `--info`
  - Banners informativos neutros, dicas, tutoriais inline.

- `--info-foreground`
  - Texto sobre fundo info.

### Anti-patterns — cores semânticas

Nunca usar nomes de cor Tailwind para estados. Os tokens existem no globals.css para light e dark mode. (Ver também: "Regras Globais Invioláveis — Cores semânticas obrigatórias".)

| Estado | Token correto | Erros comuns encontrados |
|---|---|---|
| Sucesso / positivo / online | `text-success`, `bg-success/10` | `emerald-500`, `emerald-400`, `green-500` |
| Erro / destrutivo / alta prioridade | `text-destructive`, `bg-destructive/10` | `rose-500`, `rose-400` |
| Atenção / revisão / prazo | `text-warning`, `bg-warning/10` | `amber-500`, `amber-400` |
| Informativo / em progresso | `text-info`, `bg-info/10` | `blue-500`, `blue-400` |

---

## Camada 5 — Sidebar (Shell de Navegação)

Subsistema independente. A sidebar pode ter elevação e cor de ação próprias, desvinculadas do restante da interface.

- `--sidebar`
  - Background da sidebar. Em dark mode costuma ser um degrau abaixo ou acima do `--background`.

- `--sidebar-foreground`
  - Texto e ícones nos itens de navegação.

- `--sidebar-primary`
  - Cor de destaque do item de navegação ativo. Geralmente igual ao `--primary`.

- `--sidebar-primary-foreground`
  - Texto sobre o item ativo da sidebar.

- `--sidebar-accent`
  - Hover nos itens de navegação. Geralmente igual ao `--accent`.

- `--sidebar-accent-foreground`
  - Texto no estado de hover da sidebar.

- `--sidebar-border`
  - Borda lateral que separa a sidebar do conteúdo principal.

- `--sidebar-ring`
  - Outline de foco dentro da sidebar.

### Tipografia da navegação

A sidebar e a navbar são contextos de leitura rápida — o usuário faz scan, não leitura. Os tamanhos devem ser proporcionais ao conteúdo principal.

| Elemento | Classe | Peso | Cor |
|---|---|---|---|
| Item de nav (navbar/sidebar) | `text-sm` | `font-normal` | `text-muted-foreground` / `text-sidebar-foreground` |
| Item ativo | `text-sm` | `font-medium` | `text-foreground` / `text-sidebar-primary-foreground` |
| Grupo/seção label | `text-xs` | `font-semibold uppercase tracking-wider` | `text-muted-foreground` |
| Logo / nome do app | `text-sm` | `font-semibold` | `text-foreground` |

**Por que `text-sm` e não `text-xs`:** a seção "Tipografia — Escala por Função" define `text-sm` como o nível para "navegação secundária". Itens de sidebar e navbar são navegação funcional — precisam ser lidos sem esforço. `text-xs` (12px) é para captions e metadata, não para elementos clicáveis de navegação.

**Regra de proporção:** se o corpo do conteúdo principal usa `text-sm` (14px), a navegação deve usar no mínimo `text-sm`. Se o corpo usa `text-base` (16px), a navegação pode usar `text-sm`. A navegação nunca deve ser menor que o corpo do conteúdo por mais de um nível da escala.

---

## Camada 6 — Dados (Charts)

Paleta sequencial para visualizações. Pode ser derivada do `--primary` ou completamente editorial.

- `--chart-1`
  - Série principal. Geralmente alinhada ao `--primary` para reforçar a identidade da marca nos dados.

- `--chart-2`
  - Segunda série de dados.

- `--chart-3`
  - Terceira série de dados.

- `--chart-4`
  - Quarta série de dados.

- `--chart-5`
  - Quinta série de dados. As 5 cores devem ter contraste suficiente entre si para serem distinguíveis em gráficos.

### Tipografia dentro de gráficos

Gráficos têm sua própria hierarquia tipográfica interna, aplicando o mesmo princípio de tamanho por função:

| Elemento | Nível | Tamanho | Papel |
|---|---|---|---|
| Labels de eixo (Jan, R$40k, 12am) | caption | `12px` (text-xs) | Orientar a leitura — não competir com os dados |
| Labels de legenda (Receita, Despesas) | caption | `text-xs` | Identificar séries — suporte visual |
| Label do tooltip (nome da série) | caption | `text-xs / muted` | Contexto — não é o dado principal |
| Valor do tooltip | text-sm | `text-sm / semibold` | O dado em si — precisa de hierarquia clara sobre o label |
| Título do card do gráfico | h3 | `text-sm / semibold` | Separar a seção visualmente |
| Subtítulo / período | caption | `text-xs / muted` | Suporte — escopo temporal ou descrição |

**Regra crítica:** usar `font-size` abaixo de `12px` em qualquer elemento de gráfico quebra a escala do sistema. `11px` é um valor rogue que não existe na escala e prejudica a coerência. O mínimo é `text-xs` = 12px. (Esta regra é um caso específico da regra global — ver "Regras Globais Invioláveis" acima.)

**Tamanho carrega impacto, cor carrega significado** — em stat cards, os números grandes são brancos neutros (impacto pelo tamanho). Os indicadores de tendência usam `--success` / `--destructive` (significado pela cor). Os dois não precisam operar juntos no mesmo elemento.

### Coerência entre gráficos e layout de navegação

Quando um gráfico está dentro de um layout com navbar e/ou sidebar, a hierarquia tipográfica precisa funcionar em conjunto. O princípio: navegação e títulos de gráfico compartilham o mesmo nível de tamanho (`text-sm`), diferenciados por **peso** e **cor** — nunca por tamanho.

| Camada | Elemento | Tamanho | Peso | Cor | Papel |
|---|---|---|---|---|---|
| Navegação | Item de nav (navbar/sidebar) | `text-sm` | normal / medium | muted-foreground | Scan rápido |
| Gráfico | Título do card | `text-sm/6` | semibold | foreground | Identificar a seção |
| Gráfico | Subtítulo | `text-xs` | normal | muted-foreground | Contexto temporal |
| Gráfico | Eixos e legendas | `text-xs` / `fontSize: 12` | normal | muted-foreground | Suporte visual |
| Gráfico | Tooltip — label | `text-xs` | medium | muted-foreground | Nome da série |
| Gráfico | Tooltip — valor | `text-sm` | semibold | foreground | Dado principal |

**Por que funciona:** o título do gráfico (`text-sm semibold foreground`) se destaca da navegação (`text-sm normal muted-foreground`) sem precisar ser maior. O peso e a cor criam hierarquia suficiente dentro do mesmo nível de tamanho. Os valores de tooltip seguem a mesma lógica — `text-sm semibold` para o dado primário, `text-xs` para o contexto.

**Regra inviolável:** todos os tooltips de valor em gráficos devem usar `text-sm font-semibold tabular-nums`. Usar `text-xs` para valores de tooltip quebra a hierarquia — o dado principal fica no mesmo nível visual que o label de suporte.

---

## Camada 7 — Overlay e Camadas Modais

Controla o comportamento visual quando superfícies flutuantes (modais, drawers, dialogs) sobrepõem o conteúdo da página. Frequentemente ausente dos sistemas de tokens, mas determinante para a coerência do tema.

- `--overlay`
  - Camada semitransparente aplicada sobre toda a interface quando um modal abre. Escurece o fundo para destacar a superfície flutuante. Não existe como variável no shadcn/ui — está hardcoded como `bg-black/80`. Em temas dark muito escuros, esse valor pode apagar completamente o conteúdo por trás; em temas light, precisa ser mais denso para criar o mesmo efeito de destaque.

- `--popover` (relação com overlay)
  - A superfície do modal precisa ser calibrada em relação ao background **após o overlay ser aplicado**, não ao background limpo. O contraste relevante não é `popover vs. background`, mas `popover vs. background + overlay`.

### O par que importa

```
background normal:           oklch(0.12 0 0)
background + overlay (80%):  oklch(0.02–0.03 0 0)   ← o que o usuário vê
popover (modal):             oklch(0.16–0.18 0 0)   ← precisa contrastar com isso
```

O modal se destaca não por ser mais claro que o fundo original, mas por ser mais claro que o fundo **escurecido**. Isso significa que temas já muito escuros (Dark, `L=0.08`) precisam de overlay menos denso — o fundo já está próximo do preto e não há margem para escurecer mais sem perder a distinção entre planos.

### Regra por base de tema

| Tema base | L background | Overlay recomendado | Efeito |
|---|---|---|---|
| Dark `0.08` | muito escuro | `black/60%` | Overlay leve — fundo já é quase preto |
| Dash / VSCode `0.13–0.15` | mid-dark | `black/75%` | Efeito equilibrado — como nos prints de referência |
| Light `0.98` | claro | `black/80%` | Overlay denso necessário para o modal se destacar |

---

## Tipografia — Escala por Função

A escala tipográfica não é derivada matematicamente. Cada nível existe para cumprir um papel específico no layout. O ponto de ancoragem não é o parágrafo — é o **texto mais frequente da interface**.

Em sistemas SaaS e dashboards, o centro funcional é `text-sm` (13–14px): conteúdo de tabelas, labels de cards, itens de lista. Em sites editoriais, o centro sobe para `text-base` (16px).

### Níveis e funções

- `caption / text-xs`
  - Não deve competir com nenhum outro texto. Existe apenas como suporte: timestamps, footnotes, tooltips, texto de status em badges. Se precisar de atenção, não é caption.

- `text-sm`
  - Leitura sem esforço em contextos densos. O nível padrão de interfaces SaaS — usado em linhas de tabela, corpo de cards, itens de formulário, navegação secundária.

- `text-base`
  - Leitura confortável em parágrafos. Usado em descrições, textos de onboarding, conteúdo de modais, qualquer texto que exige leitura contínua.

- `h3`
  - O menor título que precisa se destacar de um bloco de conteúdo. Título de card, seção interna, grupo de formulário. Deve ser imediatamente distinguível do `text-base` sem precisar de peso extra para funcionar.

- `h2`
  - Título de seção de página. Organiza blocos maiores de conteúdo. Raramente aparece mais de 3–4 vezes por tela.

- `h1`
  - Precisa ser lido antes de qualquer coisa na página. Define o contexto imediato da tela inteira. Geralmente único por view.

- `display`
  - Impacto visual primeiro, leitura depois. Usado em hero sections, empty states com chamada principal, landing pages. Não carrega informação densa — carrega intenção.

### Incrementos por região da escala

Os saltos entre níveis não são uniformes. Variam conforme a região:

| Região | Incremento | Motivo |
|---|---|---|
| caption → xs → sm | 1–2px | Pequenas diferenças já distinguem hierarquia em texto de suporte |
| sm → base → lead | 2–3px | O olho precisa de diferença clara no texto corrido |
| base → h3 → h2 | 4–6px | Headings precisam romper visualmente do conteúdo |
| h2 → h1 → display | 8–16px | Progressão exponencial — cada nível é editorial, não funcional |

### Regra de decisão

Antes de definir um tamanho, pergunte: **o que este texto precisa fazer?**

Se precisa passar despercebido mas estar disponível → `caption / xs`
Se é o texto principal do dado → `text-sm`
Se precisa ser lido com conforto → `text-base`
Se precisa separar visualmente uma seção → `h3` ou acima
Se precisa ser lido primeiro → `h1`
Se é intenção antes de informação → `display`

### Hierarquia em tabelas

Table headers diferenciam-se do body por **peso e cor**, não por tamanho. Se o header for menor que o body, `uppercase tracking-wider` é obrigatório para compensar.

| Elemento | Classe | Lógica |
|---|---|---|
| Header (compacto) | `text-xs/6 font-semibold uppercase tracking-wider text-muted-foreground` | Menor que body → uppercase compensa |
| Header (mesmo nível) | `text-sm/6 font-semibold text-muted-foreground` | Mesmo tamanho → peso diferencia |
| Body (primário) | `text-sm/6 font-medium text-foreground` | Dado principal |
| Body (secundário) | `text-sm/6 text-muted-foreground` | Dado de suporte |
| Body (caption) | `text-xs/6 text-muted-foreground` | Timestamp, metadata |

---

## Temas Superficiais vs. Autônomos

### O que os temas atuais definem (12 variáveis)

Os temas em `_themes.ts` cobrem apenas a Camada 1 e partes das Camadas 2 e 3:

```
--background        --foreground
--card              --card-foreground
--muted             --muted-foreground
--accent            --accent-foreground
--border
--primary           --primary-foreground
--ring
```

### O que acontece com as variáveis não cobertas

Quando você troca de tema, `applyTheme()` aplica apenas as variáveis que o tema define. Tudo o que não foi sobrescrito permanece com o valor do `globals.css`. Isso cria comportamentos diferentes dependendo do componente:

**Componentes que respondem corretamente ao tema:**
- Qualquer superfície que usa `bg-background`, `bg-card`, `bg-muted`, `bg-accent`
- Texto que usa `text-foreground`, `text-muted-foreground`
- Botões primários (`bg-primary`)
- Bordas (`border-border`)

**Componentes que ficam "presos" no valor do globals.css:**
- Dropdowns, tooltips e command palettes → usam `--popover`, que não é sobrescrito
- A sidebar inteira → usa `--sidebar` e variantes, nenhuma coberta
- Campos de input → usam `--input`, não coberto
- Botões secundários → usam `--secondary`, não coberto
- Badges e alertas semânticos → usam `--success`, `--warning`, `--info`, não cobertos

### Temas superficiais (12 vars) — quando funcionam bem

Quando a interface visualizada é composta principalmente de cards, tabelas e gráficos sobre o background, as 12 variáveis são suficientes. A mudança de tema é visível e expressiva sem inconsistências aparentes.

Exemplos de uso aceitável: dashboards analytics, páginas de conteúdo, galeria de componentes.

### Temas autônomos (35 vars) — quando são necessários

Quando a interface inclui sidebar de navegação, formulários com inputs, dropdowns frequentes ou estados semânticos proeminentes, as variáveis não cobertas ficam visualmente desconexas do tema.

Para temas completamente autônomos, cada objeto de tema precisa definir todas as 35 variáveis — ou o sistema de aplicação precisa resetar os valores não cobertos para um padrão derivado automaticamente do tema.

### Curadoria de temas — regra de não-conflito semântico

Os temas parciais (12 vars) controlam `--primary` mas **não** controlam as cores semânticas (`--success`, `--warning`, `--info`, `--destructive`), que são fixas no globals.css. Isso cria uma restrição: o `--primary` de cada tema não pode cair na mesma faixa de hue de uma cor semântica, ou o sistema perde significado.

| Cor semântica | Hue | Zona proibida para --primary |
|---|---|---|
| `--success` | H 142 (verde) | H 120–165 |
| `--warning` | H 71 (âmbar) | H 50–90 |
| `--info` | H 245 (azul) | Tolerável — primary e info operam em contextos distintos (ação vs. estado) |
| `--destructive` | H 25 (vermelho) | H 10–40 |

**Temas ativos (7):** Light, Dark, Graphite, Midnight, Amethyst, Ocean, VSCode — todos com --primary fora das zonas proibidas.

**Regra para novos temas:** antes de adicionar um tema, verificar que o hue do --primary não cai em nenhuma zona proibida. Se cair, o tema cria confusão visual entre ações primárias e estados semânticos (ex: botão primary indistinguível de badge success).
