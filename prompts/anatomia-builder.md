# Anatomia do Dashboard Builder

Referência visual e nomenclatura de todas as partes da ferramenta.
Arquivo principal: `app/(app)/w/[slug]/p/[id]/page.tsx`

> **Regra:** Sempre que uma nova área, componente ou seção do builder for criada ou renomeada, atualize o glossário no final deste documento e o diagrama ASCII correspondente.

---

## Visão geral (ASCII)

```
┌─────────────────────────────────────────────────────────┐
│  HEADER  (48px)                                         │
├─────────────────────────────────────────────────────────┤
│  BARRA DE CONTROLES  (36px)                             │
├─────────────────────────────────────────────────────────┤
│  ABAS DE PÁGINA  (32px, opcional — só >1 página)        │
├──────────────┬──────────────────────────────────────────┤
│              │  PALCO                                    │
│   PALETA     │  (fundo pontilhado, padding 32px)        │
│   (224px)    │                                          │
│              │  ┌────────────────────────────────────┐  │
│  Componentes │  │  MOLDURA DO DISPOSITIVO            │  │
│  disponíveis │  │  ┌─────────────────────────────┐   │  │
│  para        │  │  │ NAVBAR MOCK (opc.) 48px     │   │  │
│  arrastar    │  │  ├──────┬──────────────┬───────┤   │  │
│              │  │  │SIDE  │  ÁREA DE     │ SIDE  │   │  │
│              │  │  │BAR   │  CONTEÚDO    │ BAR   │   │  │
│              │  │  │MOCK  │              │ MOCK  │   │  │
│              │  │  │(opc.)│  ReactGrid   │(opc.) │   │  │
│              │  │  │      │  Layout      │       │   │  │
│              │  │  │      │  ┌────┐┌───┐ │       │   │  │
│              │  │  │      │  │CARD││CAR│ │       │   │  │
│              │  │  │      │  └────┘└───┘ │       │   │  │
│              │  │  │      │  ┌─────────┐ │       │   │  │
│              │  │  │      │  │  CARD   │ │       │   │  │
│              │  │  │      │  └─────────┘ │       │   │  │
│              │  │  └──────┴──────────────┴───────┘   │  │
│              │  └────────────────────────────────────┘  │
│              │                                          │
│              │          (SIDEBAR DE PÁGINAS — overlay)   │
└──────────────┴──────────────────────────────────────────┘
```

---

## 1. HEADER

| Prop | Valor |
|------|-------|
| Altura | `h-12` = **48px** |
| Fundo | `bg-card` |
| Borda | `border-b border-border` |

Barra fixa no topo. Contém:
- **Esquerda:** Logo "Citerii" + badge "Beta" + botões Undo/Redo
- **Centro:** espaçador flex
- **Direita:** link "Projetos", link "Styleguide", botão "Sua marca" (Theme Inspector), botão "Páginas" (abre Sidebar de Páginas), contagem de componentes, "Copiar referência", botão "Preview"

---

## 2. BARRA DE CONTROLES

| Prop | Valor |
|------|-------|
| Altura | `h-9` = **36px** |
| Fundo | `bg-card/60` (semi-transparente) |
| Overflow | `overflow-x-auto` (rola horizontal) |

Grupos separados por divisores verticais (`h-4 w-px bg-border`):

1. **Grid** — Toggle on/off + label "24col" + slider de opacidade
2. **Layout Mocks** — Toggle Navbar / Sidebar esq. / Sidebar dir. + inputs de largura (px)
3. **Margem** — Inputs numéricos V (vertical) e H (horizontal) em px
4. **Tema** — Swatches circulares coloridos (um por tema)
5. **Dispositivo** — Dropdown: Desktop (100%) / Tablet (768px) / Mobile (390px)

---

## 3. ABAS DE PÁGINA

| Prop | Valor |
|------|-------|
| Altura | `h-8` = **32px** |
| Visível quando | `state.pages.length > 1` |
| Fundo | `bg-card/40` |

Cada aba:
- **Ativa:** `border-primary bg-primary/10 text-primary font-medium` com `-mb-px` (conecta à borda inferior)
- **Inativa:** `border-border text-muted-foreground`

---

## 4. PALETA

| Prop | Valor |
|------|-------|
| Largura | `w-56` = **224px** fixa |
| Fundo | `bg-card` |
| Borda | `border-r border-border` |
| Scroll | `overflow-y-auto` com scrollbar customizado |

Painel lateral esquerdo, fora do Palco. Contém seções colapsáveis de componentes.

### 4a. ITEM DA PALETA

Cada componente listado na Paleta. Usa **HTML5 `draggable`** nativo (não dnd-kit).

```
┌──────────────────────────┐
│ [ícone]  Nome            │  cursor: grab
│          Descrição curta │  border border-border bg-background
│                 [eye][+] │  botões visíveis no hover
└──────────────────────────┘
```

Ao iniciar o drag: grava `_pendingDrop = { chartId, w, h }` (variável module-level) e `dataTransfer.setData("text/plain", chartId)`. O RGL lê essas informações via `onDropDragOver` e `onDrop`.

---

## 5. PALCO

| Prop | Valor |
|------|-------|
| Flex | `flex-1` (ocupa todo espaço restante) |
| Padding | `p-8` = **32px** em todos os lados |
| Gap | `gap-4` = **16px** |
| Fundo | `bg-white/[.02]` + padrão de pontos radial (16x16px) |

Área cinza escura com textura pontilhada que envolve a Moldura do Dispositivo. Funciona como "mesa de trabalho" onde o dispositivo simulado flutua.

---

## 6. MOLDURA DO DISPOSITIVO

Container que simula a tela do dispositivo. Recebe as CSS vars do tema selecionado via `style={themeStyle}`.

| Modo | Largura | Bordas |
|------|---------|--------|
| Desktop | `width: 100%` | `border border-border shadow-lg` (sem arredondamento) |
| Tablet | `width: 768px` | `rounded-xl border border-border shadow-lg` |
| Mobile | `width: 390px` | `rounded-xl border border-border shadow-lg` |

Fundo: `bg-background` (do tema aplicado).

---

## 7. NAVBAR MOCK

| Prop | Valor |
|------|-------|
| Altura | `h-12` = **48px** |
| Fundo | `bg-card border-b border-border` |
| Visível quando | `activeLayout.showNavbar === true` |

Barra no topo da Moldura. Contém:
- Logo placeholder (quadrado + barra)
- Itens de navegação (reordenáveis via dnd-kit, editáveis por double-click, vinculáveis a páginas)
- Botão "+ link" para adicionar item
- Área mock de usuário (retângulo + círculo)

Cada item de nav usa `useSortable` do dnd-kit com `horizontalListSortingStrategy`.

---

## 8. SIDEBAR MOCK (esquerda e/ou direita)

| Prop | Valor |
|------|-------|
| Largura | Configurável, default **192px** |
| Fundo | `bg-card` |
| Borda | `border-r` (esq.) ou `border-l` (dir.) |
| Colapsável | Sim — estado mínimo: **40px** com ícones |

Painel vertical dentro da Moldura. Contém:
- Botão expandir/recolher (chevron)
- Itens de navegação (reordenáveis via dnd-kit com `verticalListSortingStrategy`)
- Botão "+ adicionar link"

---

## 9. ÁREA DE CONTEÚDO

| Prop | Valor |
|------|-------|
| Flex | `flex-1 min-w-0` |
| Scroll | `overflow-y-auto` |
| Ref | `contentRef` (usado para medir `containerWidth`) |

Container que abriga o ReactGridLayout ou o estado vazio. É a parte central da Moldura, entre as Sidebars.

### Fundo SVG (Grid Metabase)

Quando "Grid" está ligado, aplica-se `background-image` com SVG inline gerado por `buildGridSvg()`:
- **24 retângulos** por linha (um por coluna), stroke-only, sem fill
- Cor: `oklch(0.62 0.22 284 / {opacity}%)` (roxo primário com opacidade configurável)
- Repete verticalmente (`background-repeat: repeat-y`)
- Altura de cada "faixa": **66px** (60px conteúdo + 6px gap)

### Estado Vazio

Quando não há cards no canvas:
- Caixa tracejada centralizada (`border-[3px] border-dashed border-border/50`)
- Ícone de grid + texto "Comece o layout" + instrução para arrastar ou clicar +

---

## 10. REACTGRIDLAYOUT (o grid em si)

| Config | Valor |
|--------|-------|
| `cols` | **24** colunas |
| `rowHeight` | **60px** por unidade de linha |
| `margin` | **[6, 6]** — 6px gap horizontal e vertical entre cards |
| `containerPadding` | **[padH, padV]** — default [24, 24] px |
| `compactor` | `verticalCompactor` — compacta itens para cima |
| `dragConfig.handle` | `.card-drag-handle` — só arrasta pelo grip |
| `dragConfig.threshold` | **3px** mínimo antes de iniciar drag |
| `resizeConfig.handles` | **["se"]** — só canto inferior-direito |
| `dropConfig.enabled` | `true` — aceita drops da Paleta |

### Lógica de Drag

1. **Drag interno (reposicionar):** O usuário clica no grip (`.card-drag-handle`) dentro de um Card. Após mover 3px, o RGL assume o controle, movendo o card com CSS transforms. Ao soltar, `onLayoutChange` dispara com o layout atualizado → `dispatch({ type: "UPDATE_LAYOUT", layout })`.

2. **Drag externo (da Paleta):** O usuário arrasta um Item da Paleta (HTML5 `draggable`). Ao entrar na Área de Conteúdo, o RGL mostra um placeholder. `onDropDragOver` retorna as dimensões de `_pendingDrop`. Ao soltar, `onDrop` lê `chartId` do `dataTransfer`, cria um novo `CanvasItem` na posição onde soltou, e limpa `_pendingDrop`.

3. **Resize:** O RGL exibe um handle triangular no canto SE (definido no CSS global: `.react-resizable-handle-se`). Ao arrastar, o item redimensiona em unidades de grid (snap automático). `onLayoutChange` persiste as novas dimensões.

4. **Compactação:** `verticalCompactor` garante que não há espaços vazios — itens são empurrados para cima automaticamente.

### Unidades do Grid

- **Posição** (`x`, `y`): em unidades de grid. `x` vai de 0 a 23 (24 colunas). `y` incrementa em linhas de 60px.
- **Tamanho** (`w`, `h`): em unidades de grid. `w=24` = largura total. `h=4` = 4x60 + 3x6 = **258px** de altura.
- **Fórmula de altura em pixels:** `totalPx = h * 60 + (h - 1) * 6`

---

## 11. CARD

Cada item dentro do ReactGridLayout. Estrutura de 2 camadas:

```
.react-grid-item          <-- RGL wrapper (overflow: visible, para handle aparecer fora)
  |-- .card-inner          <-- Borda visual (overflow: hidden, rounded-lg, bg-card, shadow)
  |     |-- Componente     <-- O chart/componente renderizado ([&>*:first-child]:!p-0)
  |-- Controles (absolute) <-- Visíveis no hover (opacity-0 -> opacity-100)
  |     |-- .card-drag-handle  <-- Grip icon (cursor: grab)
  |     |-- Botão link         <-- Vincular a página
  |     |-- Badge dimensão     <-- "6x4" ou "Full width"
  |     |-- Botão remover      <-- X
  |-- Link indicator (absolute bottom-left, hover only)
  |-- Link popover (absolute, condicional)
```

### Altura do chart dentro do Card

```typescript
const totalPx = item.h * RGL_ROW_HEIGHT + (item.h - 1) * RGL_MARGIN[1]
const chartHeight = Math.max(80, totalPx - CARD_OVERHEAD)  // CARD_OVERHEAD = 116px
```

### CSS do Card (globals.css)

```css
.react-grid-item { overflow: visible !important; }

.card-inner {
  height: 100%; overflow: hidden;
  border-radius: 0.5rem;
  border: 1px solid var(--border);
  background: var(--card);
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
}
.react-grid-item:hover > .card-inner {
  box-shadow: 0 4px 12px rgba(0,0,0,0.12);
}

/* Handle de resize — triângulo no canto SE */
.react-resizable-handle-se {
  bottom: -4px !important; right: -4px !important;
  width: 16px !important; height: 16px !important;
  opacity: 0; /* aparece no hover do item */
}
```

---

## 12. SIDEBAR DE PÁGINAS

| Prop | Valor |
|------|-------|
| Posição | `absolute top-0 right-0 bottom-0 z-30` |
| Sombra | `shadow-xl` |
| Visível quando | Botão "Páginas" no Header está ativo |

Overlay que aparece por cima do Palco, no lado direito. Gerencia a árvore de páginas (sitemap), configurações de layout por página, e overrides de herança.

Arquivo: `app/_page-config-sidebar.tsx`

---

## 13. MODO PREVIEW

Ativado pelo botão "Preview" no Header. Substitui toda a UI do builder por uma visualização limpa:

- Mesmo ReactGridLayout, mas com `dragConfig.enabled: false` e `resizeConfig.enabled: false`
- Sem Paleta, sem Barra de Controles, sem Header do builder
- Navbar e Sidebars funcionais (clicáveis para navegar entre páginas)
- Botão "Sair" flutuante no canto superior direito (`fixed top-4 right-4 z-50`)
- Tecla **Escape** também sai do preview

---

## Glossário

> **Manter atualizado:** ao criar ou renomear qualquer área do builder, adicione ou edite a entrada correspondente aqui.

| Nome | O que é |
|------|---------|
| **Header** | Barra superior com branding, undo/redo, links, export, preview |
| **Barra de Controles** | Controles de grid, mocks, margem, tema, dispositivo |
| **Abas de Página** | Tabs para alternar entre páginas (visível se >1) |
| **Paleta** | Painel esquerdo com componentes arrastáveis |
| **Item da Paleta** | Um componente individual na Paleta |
| **Palco** | Área central com fundo pontilhado, envolve a Moldura |
| **Moldura do Dispositivo** | Frame que simula desktop/tablet/mobile |
| **Navbar Mock** | Barra de navegação horizontal simulada (dentro da Moldura) |
| **Sidebar Mock** | Painel lateral simulado, esq. ou dir. (dentro da Moldura) |
| **Área de Conteúdo** | Região scrollável entre as sidebars, contém o RGL |
| **Grid SVG** | Fundo visual Metabase-style com retângulos por coluna |
| **ReactGridLayout** | O grid de 24 colunas que posiciona os Cards |
| **Card** | Um componente no canvas (2 camadas: `.react-grid-item` + `.card-inner`) |
| **Grip / Drag Handle** | Ícone de arrastar dentro do Card (`.card-drag-handle`) |
| **Handle de Resize** | Triângulo no canto SE do Card |
| **Sidebar de Páginas** | Overlay direito para gerenciar sitemap e overrides |
| **Modo Preview** | Visualização limpa sem controles de edição |
