// ─── Comprehensive export generator ──────────────────────────────────────────
// Generates a complete design specification in Markdown format (8 sections).

import { type Page, type NavItem, buildTree, DEVICE_PRESETS } from "./_builder-state"
import { themes, type ThemeName, ALL_THEMES } from "./styleguide/_themes"
import {
    TYPOGRAPHY_TOKENS, SPACING_SCALE, RADIUS_TOKENS, SHADOW_TOKENS,
    CHART_COLOR_SEMANTICS, CHART_STYLING_TOKENS, GLOBAL_CSS_VARS,
    DEFAULT_SIDEBAR_ICONS, DEFAULT_NAVBAR_ICONS,
    NAVBAR_HEIGHT_PX,
} from "./_export-tokens"
import { COMPONENT_METADATA } from "./_component-metadata"

// ─── Params ──────────────────────────────────────────────────────────────────

export interface ExportParams {
    pages: Page[]
    navbarItems: NavItem[]
    sidebarItems: NavItem[]
    themeName: string
    gridCols: number
    gridGap: number
    padV: number
    padH: number
    showNavbar: boolean
    showSidebar: boolean
    mockSidebarWidth: number
    mockSidebarOpen: boolean
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function slugify(label: string): string {
    return label.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")
}

function fullPath(page: Page, pages: Page[]): string {
    const segments: string[] = []
    let current: Page | undefined = page
    while (current) {
        segments.unshift(slugify(current.label))
        current = pages.find(p => p.id === current!.parentId)
    }
    return "/" + segments.join("/")
}

// ─── Section 1: Tokens de Tema ───────────────────────────────────────────────

function generateThemeTokensSection(params: ExportParams): string {
    const { themeName } = params
    const lines: string[] = ["## 1. Tokens de Tema"]

    // 1.1 Cores
    lines.push("", "### 1.1 Cores (CSS Variables)")

    // Theme-specific vars
    const themeVars = themeName !== "Custom" && (ALL_THEMES as string[]).includes(themeName)
        ? themes[themeName as Exclude<ThemeName, "Custom">] : null

    if (themeVars) {
        lines.push("", "**Tema selecionado:** " + themeName)
        lines.push("```css")
        for (const [k, v] of Object.entries(themeVars)) {
            lines.push(`${k}: ${v};`)
        }
        lines.push("```")
    } else {
        lines.push("", `**Tema:** ${themeName} (custom — variáveis definidas pelo usuário)`)
    }

    // Global vars (chart, sidebar, semantic, extra)
    lines.push("", "**Variáveis globais (não variam por tema):**")
    for (const [group, vars] of Object.entries(GLOBAL_CSS_VARS)) {
        lines.push(`", "#### ${group.charAt(0).toUpperCase() + group.slice(1)}`)
        lines.push("```css")
        for (const v of vars) lines.push(v + ";")
        lines.push("```")
    }

    // 1.2 Tipografia
    lines.push("", "### 1.2 Tipografia")
    lines.push(`- Font sans: \`${TYPOGRAPHY_TOKENS.fontFamily.sans}\``)
    lines.push(`- Font mono: \`${TYPOGRAPHY_TOKENS.fontFamily.mono}\``)
    lines.push("", "**Escala de tamanhos:**")
    for (const [name, value] of Object.entries(TYPOGRAPHY_TOKENS.sizes)) {
        lines.push(`- ${name}: ${value}`)
    }
    lines.push("", "**Pesos:**")
    for (const [name, value] of Object.entries(TYPOGRAPHY_TOKENS.weights)) {
        lines.push(`- ${name}: ${value}`)
    }
    lines.push("", "**Line-heights:**")
    for (const [name, value] of Object.entries(TYPOGRAPHY_TOKENS.lineHeights)) {
        lines.push(`- ${name}: ${value}`)
    }

    // 1.3 Espaçamento
    lines.push("", "### 1.3 Espaçamento (base 4px)")
    lines.push("```")
    for (const s of SPACING_SCALE) {
        lines.push(`spacing-${s.key}: ${s.px}px`)
    }
    lines.push("```")

    // 1.4 Border Radius
    lines.push("", "### 1.4 Border Radius")
    for (const [name, value] of Object.entries(RADIUS_TOKENS)) {
        lines.push(`- ${name}: ${value}`)
    }

    // 1.5 Sombras
    lines.push("", "### 1.5 Sombras / Elevações")
    for (const [name, value] of Object.entries(SHADOW_TOKENS)) {
        lines.push(`- ${name}: \`${value}\``)
    }

    // 1.6 Breakpoints
    lines.push("", "### 1.6 Breakpoints")
    for (const d of DEVICE_PRESETS) {
        lines.push(`- ${d.label}: ${d.width === 0 ? "full width" : d.width + "px"}`)
    }

    return lines.join("\n")
}

// ─── Section 2: Layout Global ────────────────────────────────────────────────

function generateLayoutSection(params: ExportParams): string {
    const { showNavbar, showSidebar, mockSidebarWidth, mockSidebarOpen, gridCols, gridGap, padV, padH } = params
    const lines: string[] = ["## 2. Layout Global"]

    lines.push("", "### Navbar")
    lines.push(`- Visível: ${showNavbar ? "sim" : "não"}`)
    if (showNavbar) lines.push(`- Altura: ${NAVBAR_HEIGHT_PX}px (h-16)`)

    lines.push("", "### Sidebar")
    lines.push(`- Visível: ${showSidebar ? "sim" : "não"}`)
    if (showSidebar) {
        lines.push(`- Largura: ${mockSidebarWidth}px`)
        lines.push(`- Colapsável: sim`)
        lines.push(`- Estado inicial: ${mockSidebarOpen ? "expandida" : "colapsada"}`)
    }

    lines.push("", "### Grid")
    lines.push(`- Colunas: ${gridCols}`)
    lines.push(`- Gap: ${gridGap}px`)
    lines.push(`- Padding vertical: ${padV}px`)
    lines.push(`- Padding horizontal: ${padH}px`)

    lines.push("", "### Variação Responsiva (recomendação)")
    lines.push(`- Desktop: ${gridCols} colunas, gap ${gridGap}px`)
    const tabletCols = Math.min(gridCols, 6)
    lines.push(`- Tablet (768px): ${tabletCols} colunas, componentes > ${tabletCols}col → full-width`)
    lines.push(`- Mobile (390px): 1 coluna, todos os componentes em stack vertical`)

    return lines.join("\n")
}

// ─── Section 3: Sitemap e Rotas ──────────────────────────────────────────────

function generateSitemapSection(params: ExportParams): string {
    const { pages } = params
    const lines: string[] = ["## 3. Sitemap e Rotas"]
    const tree = buildTree(pages)

    lines.push("")
    lines.push("```")
    function printTree(nodes: ReturnType<typeof buildTree>, indent = "") {
        for (const node of nodes) {
            const path = fullPath(node, pages)
            lines.push(`${indent}${path} — ${node.label}`)
            if (node.children.length > 0) printTree(node.children, indent + "  ")
        }
    }
    printTree(tree)
    lines.push("```")

    if (pages.length > 1) {
        lines.push("", "**Estrutura Next.js App Router:**")
        lines.push("```")
        for (const page of pages) {
            const path = fullPath(page, pages)
            lines.push(`app${path}/page.tsx`)
        }
        lines.push("```")
    }

    return lines.join("\n")
}

// ─── Section 4: Componentes por Página ───────────────────────────────────────

function generateComponentsSection(params: ExportParams): string {
    const { pages, gridCols } = params
    const lines: string[] = ["## 4. Componentes por Página"]

    pages.forEach(page => {
        lines.push("", `### ${page.label}`)

        if (page.canvasItems.length === 0) {
            lines.push("- (sem componentes)")
            return
        }

        page.canvasItems.forEach((item, i) => {
            lines.push("", `#### ${i + 1}. ${item.name}`)
            lines.push(`- Import: \`${item.importStatement}\``)
            lines.push(`- Largura: ${item.colSpan}/${gridCols} colunas`)
            if (item.heightPx > 0) lines.push(`- Altura: ${item.heightPx}px`)
            lines.push(`- Schema: \`${item.dataType}\``)

            // Mock data from metadata
            const meta = COMPONENT_METADATA[item.chartId]
            if (meta?.mockData) {
                lines.push("- Mock data:")
                lines.push("```json")
                lines.push(JSON.stringify(meta.mockData, null, 2))
                lines.push("```")
            }

            // Features
            if (meta?.features.length) {
                lines.push(`- Features: ${meta.features.join(", ")}`)
            }
        })
    })

    return lines.join("\n")
}

// ─── Section 5: Paleta dos Gráficos ─────────────────────────────────────────

function generateChartPaletteSection(params: ExportParams): string {
    const { pages } = params
    const lines: string[] = ["## 5. Paleta dos Gráficos"]

    // 5.1 Cores das séries
    lines.push("", "### 5.1 Cores das Séries")
    lines.push("```css")
    for (const c of CHART_COLOR_SEMANTICS) {
        lines.push(`${c.variable}: ${c.lightValue}; /* ${c.label} — ${c.semantic} */`)
    }
    lines.push("```")

    // 5.2 Mapeamento série→cor por componente
    const chartIds = new Set<string>()
    for (const page of pages) {
        for (const item of page.canvasItems) {
            const meta = COMPONENT_METADATA[item.chartId]
            if (meta?.chartColorMapping) chartIds.add(item.chartId)
        }
    }

    if (chartIds.size > 0) {
        lines.push("", "### 5.2 Mapeamento Série → Cor")
        for (const chartId of chartIds) {
            const meta = COMPONENT_METADATA[chartId]!
            lines.push("", `**${chartId}:**`)
            for (const [series, color] of Object.entries(meta.chartColorMapping!)) {
                lines.push(`- ${series} → ${color}`)
            }
        }
    }

    // 5.3 Styling
    lines.push("", "### 5.3 Estilo dos Gráficos")
    const st = CHART_STYLING_TOKENS
    lines.push(`- Eixo tick: cor ${st.axisTick.color}, tamanho ${st.axisTick.fontSize}`)
    lines.push(`- Eixo linha: cor ${st.axisLine.color}`)
    lines.push(`- Grid lines: cor ${st.gridLines.color}, estilo ${st.gridLines.style}, vertical ${st.gridLines.vertical}`)
    lines.push(`- Tooltip: bg ${st.tooltip.background}, border ${st.tooltip.border}, label ${st.tooltip.labelColor} (${st.tooltip.labelSize}), valor ${st.tooltip.valueColor} (${st.tooltip.valueSize})`)
    lines.push(`- Cursor bar: ${st.cursor.bar.color} opacity ${st.cursor.bar.fillOpacity}`)
    lines.push(`- Cursor line: ${st.cursor.line.color} width ${st.cursor.line.strokeWidth}`)
    lines.push(`- Legenda: dot ${st.legend.dotSize}, label ${st.legend.labelSize} ${st.legend.labelColor}, posição ${st.legend.position}`)
    lines.push(`- Animações: ${st.animations}`)

    // 5.4 Gradientes
    lines.push("", "### 5.4 Gradientes")
    const grad = st.gradients.area
    lines.push(`- Area chart: ${grad.type}`)
    for (const stop of grad.stops) {
        lines.push(`  - offset ${stop.offset}: opacity ${stop.stopOpacity}`)
    }

    return lines.join("\n")
}

// ─── Section 6: Navegação ────────────────────────────────────────────────────

function generateNavigationSection(params: ExportParams): string {
    const { navbarItems, sidebarItems, pages, showNavbar, showSidebar } = params
    const lines: string[] = ["## 6. Navegação"]

    lines.push("", `- Biblioteca de ícones: **lucide-react**`)

    // Navbar links
    if (showNavbar) {
        lines.push("", "### Navbar")
        for (const item of navbarItems) {
            const target = item.targetPageId ? pages.find(p => p.id === item.targetPageId) : null
            const route = target ? fullPath(target, pages) : "(sem link)"
            const icon = DEFAULT_NAVBAR_ICONS[item.label] ?? "—"
            lines.push(`- "${item.label}" → ${route} | ícone: ${icon}`)
        }
    }

    // Sidebar links
    if (showSidebar) {
        lines.push("", "### Sidebar")
        for (const item of sidebarItems) {
            const target = item.targetPageId ? pages.find(p => p.id === item.targetPageId) : null
            const route = target ? fullPath(target, pages) : "(sem link)"
            const icon = DEFAULT_SIDEBAR_ICONS[item.label] ?? "—"
            lines.push(`- "${item.label}" → ${route} | ícone: ${icon}`)
        }
    }

    return lines.join("\n")
}

// ─── Section 7: Estados dos Componentes ──────────────────────────────────────

function generateComponentStatesSection(params: ExportParams): string {
    const { pages } = params
    const lines: string[] = ["## 7. Estados dos Componentes"]

    // Padrão global
    lines.push("", "### Padrão Global")
    lines.push("- **Loading:** Skeleton com shimmer (`bg-muted animate-pulse rounded`)")
    lines.push("- **Empty:** Componente EmptyState (ícone Inbox + título + descrição + CTA)")
    lines.push("- **Error:** Borda `destructive` + mensagem inline, ou `ErrorPage` dedicada")
    lines.push("- **Hover:** `bg-accent/50` com `transition-colors`")
    lines.push("- **Focus:** Outline com `var(--ring)` / `ring-offset`")
    lines.push("- **Active/Selected:** `bg-primary/5` ou `bg-accent`")

    // Per-component
    const usedIds = new Set<string>()
    for (const page of pages) {
        for (const item of page.canvasItems) usedIds.add(item.chartId)
    }

    if (usedIds.size > 0) {
        lines.push("", "### Por Componente Usado")
        for (const chartId of usedIds) {
            const meta = COMPONENT_METADATA[chartId]
            if (!meta) continue
            lines.push("", `**${chartId}:**`)
            lines.push(`- Loading: ${meta.states.loading}`)
            lines.push(`- Empty: ${meta.states.empty}`)
            lines.push(`- Error: ${meta.states.error}`)
            lines.push(`- Hover: ${meta.states.hover}`)
        }
    }

    return lines.join("\n")
}

// ─── Section 8: Assets ───────────────────────────────────────────────────────

function generateAssetsSection(params: ExportParams): string {
    const { pages } = params
    const lines: string[] = ["## 8. Assets"]

    // Logo
    lines.push("", "### Logo")
    lines.push("- Navbar: Placeholder (lucide-react `Waves` icon, cor: `var(--primary)`)")
    lines.push("- Sidebar: Iniciais em badge circular (`bg-primary`, `text-primary-foreground`)")
    lines.push("- Variantes claro/escuro: Herdam cores do tema automaticamente via CSS vars")
    lines.push("- **Recomendação:** Substituir por SVG da marca em produção")

    // Ícones
    lines.push("", "### Ícones")
    lines.push("- Biblioteca: **lucide-react** (MIT license)")

    // Collect unique icons from used components
    const allIcons = new Set<string>()
    for (const page of pages) {
        for (const item of page.canvasItems) {
            const meta = COMPONENT_METADATA[item.chartId]
            if (meta?.icons) meta.icons.forEach(i => allIcons.add(i))
        }
    }

    if (allIcons.size > 0) {
        lines.push(`- Ícones usados nos componentes: \`${Array.from(allIcons).sort().join("`, `")}\``)
    }

    return lines.join("\n")
}

// ─── Instructions ────────────────────────────────────────────────────────────

function generateInstructions(params: ExportParams): string {
    const { pages, navbarItems, sidebarItems } = params
    const lines: string[] = ["## Instruções para Implementação"]

    const hasLinks = navbarItems.some(i => i.targetPageId) || sidebarItems.some(i => i.targetPageId)
    lines.push("")
    lines.push("- Framework: **Next.js App Router** (TypeScript)")
    lines.push("- Cada página é uma route em `app/`")
    if (pages.length > 1) lines.push("- A hierarquia do sitemap define o nesting de routes")
    if (hasLinks) lines.push("- Use o mapa de navegação (seção 6) para `<Link>` reais")
    lines.push("- Substitua o mock data (seção 4) pelos dados reais da aplicação")
    lines.push("- Aplique as CSS variables do tema (seção 1) em `:root`")
    lines.push("- Use os tokens de espaçamento, tipografia e radius conforme documentado")
    lines.push("- Para gráficos, use `recharts` com os tokens de estilo da seção 5")
    lines.push("- Implemente os estados (loading/empty/error) conforme seção 7")
    lines.push("- Substitua o logo placeholder por SVG da marca real")

    return lines.join("\n")
}

// ─── Main export function ────────────────────────────────────────────────────

export function generateExportText(params: ExportParams): string {
    const sections = [
        `# Especificação do Dashboard — ${params.themeName}`,
        `Gerado pelo Dashboard Builder`,
        "",
        generateThemeTokensSection(params),
        generateLayoutSection(params),
        generateSitemapSection(params),
        generateComponentsSection(params),
        generateChartPaletteSection(params),
        generateNavigationSection(params),
        generateComponentStatesSection(params),
        generateAssetsSection(params),
        generateInstructions(params),
    ]

    return sections.join("\n\n---\n\n")
}
