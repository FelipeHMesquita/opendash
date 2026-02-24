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

**Regra crítica:** usar `font-size` abaixo de `12px` em qualquer elemento de gráfico quebra a escala do sistema. `11px` é um valor rogue que não existe na escala e prejudica a coerência. O mínimo é `text-xs` = 12px.

**Tamanho carrega impacto, cor carrega significado** — em stat cards, os números grandes são brancos neutros (impacto pelo tamanho). Os indicadores de tendência usam `--success` / `--destructive` (significado pela cor). Os dois não precisam operar juntos no mesmo elemento.

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

Quando a interface inclui sidebar de navegação, formulários com inputs, dropdowns frequentes ou estados semânticos proeminentes, as variáveis não cobertas ficam visualmente desconexas do tema. Um tema "Ember" (laranja quente) com sidebar branca do globals.css é inconsistente.

Para temas completamente autônomos, cada objeto de tema precisa definir todas as 35 variáveis — ou o sistema de aplicação precisa resetar os valores não cobertos para um padrão derivado automaticamente do tema.
