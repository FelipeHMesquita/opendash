import { arrayMove } from "@dnd-kit/sortable"

// ─── Constants ────────────────────────────────────────────────────────────────

export const CARD_OVERHEAD = 116

export const DEVICE_PRESETS = [
    { id: "desktop", label: "Desktop", width: 0,   icon: "desktop" },
    { id: "tablet",  label: "Tablet",  width: 768, icon: "tablet"  },
    { id: "mobile",  label: "Mobile",  width: 390, icon: "mobile"  },
] as const
export type DeviceId = (typeof DEVICE_PRESETS)[number]["id"]

// ─── Palette types ────────────────────────────────────────────────────────────

export type PaletteEntry = {
    id: string; name: string; description: string; importStatement: string; dataType: string
}

export const PALETTE_SECTIONS: { title: string; items: PaletteEntry[] }[] = [
    {
        title: "Gráficos",
        items: [
            // Bar
            { id: "bar-grouped",     name: "Bar Grouped",      description: "Barras verticais agrupadas",            importStatement: 'import { BarGrouped } from "@/componentsSugest/charts/RechartsBarChart"',        dataType: "{ month: string; desktop: number; mobile: number }[]" },
            { id: "bar-stacked",     name: "Bar Stacked",      description: "Barras verticais empilhadas",           importStatement: 'import { BarStacked } from "@/componentsSugest/charts/RechartsBarChart"',        dataType: "{ month: string; desktop: number; mobile: number }[]" },
            { id: "bar-horizontal",  name: "Bar Horizontal",   description: "Barras horizontais por categoria",      importStatement: 'import { BarHorizontal } from "@/componentsSugest/charts/RechartsBarChart"',     dataType: "{ browser: string; visitors: number }[]" },
            // Area
            { id: "area-simple",     name: "Area Simple",      description: "Área com gradiente e legenda",          importStatement: 'import { AreaSimple } from "@/componentsSugest/charts/RechartsAreaChart"',       dataType: "{ month: string; desktop: number; mobile: number }[]" },
            { id: "area-stacked",    name: "Area Stacked",     description: "Área empilhada com 3 séries",           importStatement: 'import { AreaStacked } from "@/componentsSugest/charts/RechartsAreaChart"',      dataType: "{ month: string; desktop: number; mobile: number; tablet: number }[]" },
            // Line
            { id: "line-simple",     name: "Line Simple",      description: "Linha simples com dots",                importStatement: 'import { LineSimple } from "@/componentsSugest/charts/RechartsLineChart"',      dataType: "{ month: string; desktop: number; mobile: number }[]" },
            { id: "line-multi",      name: "Line Multi",       description: "Múltiplas linhas com estilos variados", importStatement: 'import { LineMulti } from "@/componentsSugest/charts/RechartsLineChart"',       dataType: "{ month: string; desktop: number; mobile: number; tablet: number }[]" },
            // Pie
            { id: "pie-simple",      name: "Pie",              description: "Pizza por navegador",                   importStatement: 'import { PieSimple } from "@/componentsSugest/charts/RechartsPieChart"',        dataType: "{ browser: string; visitors: number }[]" },
            { id: "pie-donut",       name: "Donut",            description: "Donut com total no centro",             importStatement: 'import { PieDonut } from "@/componentsSugest/charts/RechartsPieChart"',         dataType: "{ browser: string; visitors: number }[]" },
            { id: "pie-separated",   name: "Pie Separated",    description: "Pizza com fatias espaçadas",            importStatement: 'import { PieSeparated } from "@/componentsSugest/charts/RechartsPieChart"',     dataType: "{ browser: string; visitors: number }[]" },
            // Radar
            { id: "radar-simple",    name: "Radar Simple",     description: "Radar com uma série",                   importStatement: 'import { RadarSimple } from "@/componentsSugest/charts/RechartsRadarChart"',    dataType: "{ skill: string; desktop: number }[]" },
            { id: "radar-multi",     name: "Radar Multi",      description: "Radar comparativo com duas séries",     importStatement: 'import { RadarMulti } from "@/componentsSugest/charts/RechartsRadarChart"',     dataType: "{ skill: string; desktop: number; mobile: number }[]" },
            // Radial
            { id: "radial-gauge",    name: "Radial Gauge",     description: "Gauge com métrica central",             importStatement: 'import { RadialGauge } from "@/componentsSugest/charts/RechartsRadialChart"',   dataType: "{ name: string; value: number }[]" },
            { id: "radial-multi",    name: "Radial Multi",     description: "Barras radiais múltiplas",              importStatement: 'import { RadialMulti } from "@/componentsSugest/charts/RechartsRadialChart"',   dataType: "{ name: string; value: number }[]" },
            { id: "radial-stacked",  name: "Radial Stacked",   description: "Radial com séries sobrepostas",         importStatement: 'import { RadialStacked } from "@/componentsSugest/charts/RechartsRadialChart"', dataType: "{ month: string; desktop: number; mobile: number }[]" },
            // Ranked
            { id: "ranked-simple",   name: "Ranked Simple",    description: "Ranking com barras horizontais",        importStatement: 'import { RankedSimple } from "@/componentsSugest/charts/RechartsRankedList"',   dataType: "{ name: string; value: number }[]" },
            { id: "ranked-category", name: "Ranked Category",  description: "Ranking com cores por categoria",       importStatement: 'import { RankedCategory } from "@/componentsSugest/charts/RechartsRankedList"', dataType: "{ name: string; category: string; value: number }[]" },
            // Funnel
            { id: "funnel-sales",    name: "Funnel Sales",     description: "Funil de vendas com conectores",        importStatement: 'import { FunnelSales } from "@/componentsSugest/charts/RechartsFunnelChart"',   dataType: "{ name: string; value: number }[]" },
            { id: "funnel-marketing",name: "Funnel Marketing", description: "Funil de marketing com conectores",     importStatement: 'import { FunnelMarketing } from "@/componentsSugest/charts/RechartsFunnelChart"',dataType: "{ name: string; value: number }[]" },
        ],
    },
    {
        title: "Cards & Métricas",
        items: [
            { id: "dash-card-list", name: "Dash Card List", description: "Cards de métricas com tabela resumida",    importStatement: 'import { DashCardList } from "@/componentsSugest/DashCardList"',   dataType: "{ stats: { title: string; value: string; change: string; positive: boolean }[]; orders: { id: string; date: string; customer: string; event: string; amount: string }[] }" },
            { id: "stat-cards",     name: "Stat Cards",     description: "KPIs com variação e ícone",               importStatement: 'import { StatCardDemo } from "@/componentsSugest/StatCard"',       dataType: "{ title: string; value: string; change: string; positive: boolean; description?: string }[]" },
            { id: "chart-card",     name: "Chart Card",     description: "Card com mini gráfico embutido",           importStatement: 'import { ChartCard } from "@/componentsSugest/ChartCard"',         dataType: "{ weekly: { label: string; value: number }[]; monthly: { label: string; value: number }[] }" },
        ],
    },
    {
        title: "Tabelas",
        items: [
            { id: "data-table",   name: "Data Table",   description: "Tabela de dados com ordenação e filtros", importStatement: 'import { DataTable } from "@/componentsSugest/DataTable"',     dataType: "{ id: string; name: string; status: string; priority: string; owner: string; updated: string }[]" },
            { id: "users-table",  name: "Users Table",  description: "Lista de usuários com avatar e ações",    importStatement: 'import { UsersTable } from "@/componentsSugest/UsersTable"',   dataType: "{ name: string; title: string; email: string; role: string }[]" },
        ],
    },
    {
        title: "Layout",
        items: [
            { id: "navbar-comp",    name: "Navbar",      description: "Barra de navegação superior",             importStatement: 'import { Navbar } from "@/componentsSugest/Navbar"',             dataType: "Componente full-page (sem data props)" },
            { id: "sidebar-comp",   name: "Sidebar",     description: "Barra lateral de navegação",              importStatement: 'import { SidebarOpen } from "@/componentsSugest/SidebarOpen"',   dataType: "Componente full-page (sem data props)" },
        ],
    },
    {
        title: "Interação",
        items: [
            { id: "kanban-board",     name: "Kanban Board",     description: "Quadro de tarefas estilo kanban",        importStatement: 'import { KanbanBoard } from "@/componentsSugest/KanbanBoard"',         dataType: "{ id: string; title: string; color: string; cards: { id: string; title: string; priority: string; tag: string }[] }[]" },
            { id: "activity-feed",    name: "Activity Feed",    description: "Feed de atividades recentes",            importStatement: 'import { ActivityFeed } from "@/componentsSugest/ActivityFeed"',       dataType: "{ id: number; group: string; icon: string; color: string; title: string; description: string; time: string }[]" },
            { id: "command-palette",  name: "Command Palette",  description: "Paleta de comandos estilo ⌘K",           importStatement: 'import { CommandPalette } from "@/componentsSugest/CommandPalette"', dataType: "{ icon: string; label: string; category: string; shortcut: string | null }[]" },
            { id: "empty-state",      name: "Empty State",      description: "Estado vazio com ilustração e CTA",      importStatement: 'import { EmptyState } from "@/componentsSugest/EmptyState"',         dataType: "{ icon?: string; title: string; description: string; ctaLabel: string }" },
        ],
    },
    {
        title: "Formulários",
        items: [
            { id: "form-page",   name: "Form Page",   description: "Formulário completo com validação",    importStatement: 'import { FormPage } from "@/componentsSugest/FormPage"',     dataType: "Componente full-page (sem data props)" },
            { id: "team-page",   name: "Team Page",   description: "Página de equipe com cards de membros", importStatement: 'import { TeamPage } from "@/componentsSugest/TeamPage"',     dataType: "{ name: string; role: string; dept: string; online: boolean; initials: string }[]" },
        ],
    },
    {
        title: "Páginas",
        items: [
            { id: "login-page",       name: "Login",              description: "Página de autenticação",                importStatement: 'import { LoginPage } from "@/componentsSugest/LoginPage"',                 dataType: "Componente full-page (sem data props)" },
            { id: "signup-page",       name: "Sign Up",            description: "Página de cadastro",                    importStatement: 'import { SignUpPage } from "@/componentsSugest/SignUpPage"',               dataType: "Componente full-page (sem data props)" },
            { id: "onboarding-page",   name: "Onboarding",         description: "Fluxo de boas-vindas",                  importStatement: 'import { OnboardingPage } from "@/componentsSugest/OnboardingPage"',       dataType: "Componente full-page (sem data props)" },
            { id: "settings-page",     name: "Settings",           description: "Página de configurações",               importStatement: 'import { SettingsPage } from "@/componentsSugest/SettingsPage"',           dataType: "Componente full-page (sem data props)" },
            { id: "account-settings",  name: "Account Settings",   description: "Configurações de conta",                importStatement: 'import { AccountSettings } from "@/componentsSugest/AccountSettings"',     dataType: "Componente full-page (sem data props)" },
            { id: "general-settings",  name: "General Settings",   description: "Configurações gerais",                  importStatement: 'import { GeneralSettings } from "@/componentsSugest/GeneralSettings"',     dataType: "Componente full-page (sem data props)" },
            { id: "billing-page",      name: "Billing",            description: "Página de cobrança e planos",           importStatement: 'import { BillingPage } from "@/componentsSugest/BillingPage"',             dataType: "Componente full-page (sem data props)" },
            { id: "notifications-page",name: "Notifications",      description: "Central de notificações",               importStatement: 'import { NotificationsPage } from "@/componentsSugest/NotificationsPage"', dataType: "{ id: number; type: string; read: boolean; icon: string; color: string; title: string; description: string; time: string }[]" },
            { id: "error-page",        name: "Error",              description: "Página de erro (404/500)",              importStatement: 'import { ErrorPage } from "@/componentsSugest/ErrorPage"',                 dataType: "Componente full-page (sem data props)" },
        ],
    },
    {
        title: "Navegação",
        items: [
            { id: "builder-breadcrumb",  name: "Breadcrumb",       description: "Hierarquia dinâmica (auto do sitemap)",   importStatement: 'import { BuilderBreadcrumb } from "@/componentsSugest/shadcn/BuilderBreadcrumb"', dataType: "Componente (sem data props)" },
            { id: "pagination-card",     name: "Pagination",       description: "Paginação com números e setas",          importStatement: 'import { PaginationCard } from "@/componentsSugest/shadcn/PaginationCard"',       dataType: "Componente (sem data props)" },
            { id: "separator-card",      name: "Separator",        description: "Divisor horizontal e vertical",           importStatement: 'import { SeparatorCard } from "@/componentsSugest/shadcn/SeparatorCard"',         dataType: "Componente (sem data props)" },
        ],
    },
    {
        title: "Overlays",
        items: [
            { id: "dialog-card",         name: "Dialog",           description: "Modal para formulários e confirmações",   importStatement: 'import { DialogCard } from "@/componentsSugest/shadcn/DialogCard"',               dataType: "Componente (sem data props)" },
            { id: "alert-dialog-card",   name: "Alert Dialog",     description: "Confirmação para ações destrutivas",      importStatement: 'import { AlertDialogCard } from "@/componentsSugest/shadcn/AlertDialogCard"',     dataType: "Componente (sem data props)" },
            { id: "drawer-card",         name: "Drawer",           description: "Painel deslizante inferior",              importStatement: 'import { DrawerCard } from "@/componentsSugest/shadcn/DrawerCard"',               dataType: "Componente (sem data props)" },
            { id: "sheet-card",          name: "Sheet",            description: "Painel lateral para detalhes",            importStatement: 'import { SheetCard } from "@/componentsSugest/shadcn/SheetCard"',                 dataType: "Componente (sem data props)" },
        ],
    },
    {
        title: "Feedback",
        items: [
            { id: "skeleton-card",       name: "Skeleton",         description: "Placeholders de carregamento",            importStatement: 'import { SkeletonCard } from "@/componentsSugest/shadcn/SkeletonCard"',           dataType: "Componente (sem data props)" },
            { id: "tooltip-card",        name: "Tooltip",          description: "Dicas rápidas ao passar o mouse",         importStatement: 'import { TooltipCard } from "@/componentsSugest/shadcn/TooltipCard"',             dataType: "Componente (sem data props)" },
            { id: "hover-card-card",     name: "Hover Card",       description: "Info expandida ao hover",                 importStatement: 'import { HoverCardCard } from "@/componentsSugest/shadcn/HoverCardCard"',         dataType: "Componente (sem data props)" },
            { id: "popover-card",        name: "Popover",          description: "Conteúdo flutuante interativo",           importStatement: 'import { PopoverCard } from "@/componentsSugest/shadcn/PopoverCard"',             dataType: "Componente (sem data props)" },
            { id: "progress-card",       name: "Progress",         description: "Barra de progresso animada",              importStatement: 'import { ProgressCard } from "@/componentsSugest/shadcn/ProgressCard"',           dataType: "Componente (sem data props)" },
        ],
    },
    {
        title: "Controles",
        items: [
            { id: "checkbox-card",       name: "Checkbox",         description: "Grupo de checkboxes de notificação",      importStatement: 'import { CheckboxCard } from "@/componentsSugest/shadcn/CheckboxCard"',           dataType: "Componente (sem data props)" },
            { id: "select-card",         name: "Select",           description: "Dropdowns de timezone e idioma",          importStatement: 'import { SelectCard } from "@/componentsSugest/shadcn/SelectCard"',               dataType: "Componente (sem data props)" },
            { id: "slider-card",         name: "Slider",           description: "Slider de volume e range",                importStatement: 'import { SliderCard } from "@/componentsSugest/shadcn/SliderCard"',               dataType: "Componente (sem data props)" },
            { id: "toggle-card",         name: "Toggle",           description: "Toggle group e botões alternáveis",       importStatement: 'import { ToggleCard } from "@/componentsSugest/shadcn/ToggleCard"',               dataType: "Componente (sem data props)" },
            { id: "switch-card",         name: "Switch",           description: "Switches on/off de preferências",         importStatement: 'import { SwitchCard } from "@/componentsSugest/shadcn/SwitchCard"',               dataType: "Componente (sem data props)" },
            { id: "input-otp-card",      name: "Input OTP",        description: "Campo de código de verificação",          importStatement: 'import { InputOtpCard } from "@/componentsSugest/shadcn/InputOtpCard"',           dataType: "Componente (sem data props)" },
            { id: "textarea-card",       name: "Textarea",         description: "Área de texto com envio",                 importStatement: 'import { TextareaCard } from "@/componentsSugest/shadcn/TextareaCard"',           dataType: "Componente (sem data props)" },
        ],
    },
    {
        title: "Menus",
        items: [
            { id: "dropdown-menu-card",  name: "Dropdown Menu",    description: "Menu de ações com atalhos",               importStatement: 'import { DropdownMenuCard } from "@/componentsSugest/shadcn/DropdownMenuCard"',   dataType: "Componente (sem data props)" },
            { id: "context-menu-card",   name: "Context Menu",     description: "Menu de clique direito",                  importStatement: 'import { ContextMenuCard } from "@/componentsSugest/shadcn/ContextMenuCard"',     dataType: "Componente (sem data props)" },
            { id: "menubar-card",        name: "Menubar",          description: "Barra de menus estilo desktop",           importStatement: 'import { MenubarCard } from "@/componentsSugest/shadcn/MenubarCard"',             dataType: "Componente (sem data props)" },
        ],
    },
    {
        title: "Data",
        items: [
            { id: "calendar-single",     name: "Calendar",         description: "Seleção de data única",                   importStatement: 'import { CalendarSingleCard } from "@/componentsSugest/shadcn/CalendarSingleCard"', dataType: "Componente (sem data props)" },
            { id: "calendar-range",      name: "Calendar Range",   description: "Seleção de intervalo de datas",           importStatement: 'import { CalendarRangeCard } from "@/componentsSugest/shadcn/CalendarRangeCard"', dataType: "Componente (sem data props)" },
        ],
    },
    {
        title: "Containers",
        items: [
            { id: "accordion-demo",      name: "Accordion",        description: "FAQ e seções expansíveis",               importStatement: 'import { AccordionDemo } from "@/componentsSugest/shadcn/AccordionDemo"',         dataType: "Componente (sem data props)" },
            { id: "collapsible-demo",     name: "Collapsible",      description: "Blocos de conteúdo retráteis",           importStatement: 'import { CollapsibleDemo } from "@/componentsSugest/shadcn/AccordionDemo"',       dataType: "Componente (sem data props)" },
            { id: "carousel-demo",        name: "Carousel",         description: "Navegação horizontal entre cards",       importStatement: 'import { CarouselDemo } from "@/componentsSugest/shadcn/CarouselDemo"',           dataType: "Componente (sem data props)" },
            { id: "resizable-demo",       name: "Resizable",        description: "Painéis redimensionáveis e scroll area", importStatement: 'import { ResizableDemo } from "@/componentsSugest/shadcn/ResizableDemo"',         dataType: "Componente (sem data props)" },
        ],
    },
]

export const CHART_PALETTE = PALETTE_SECTIONS.flatMap(s => s.items)
export type ChartPaletteEntry = PaletteEntry

// ─── Selected components (shared between styleguide & builder) ───────────────

const SELECTED_KEY = "builder_selected_components"

export function getSelectedComponents(): string[] {
    if (typeof window === "undefined") return []
    try { return JSON.parse(localStorage.getItem(SELECTED_KEY) || "[]") }
    catch { return [] }
}

export function toggleSelectedComponent(id: string): string[] {
    const current = getSelectedComponents()
    const next = current.includes(id) ? current.filter(x => x !== id) : [...current, id]
    localStorage.setItem(SELECTED_KEY, JSON.stringify(next))
    return next
}

// ─── Layout components (full-width, no resize) ──────────────────────────────

export const LAYOUT_IDS = new Set(["navbar-comp", "sidebar-comp"])
export function isLayoutComponent(chartId: string) { return LAYOUT_IDS.has(chartId) }

// ─── Navigation items ────────────────────────────────────────────────────────

export interface NavItem {
    id: string
    label: string
    targetPageId: PageId | null
}

// ─── Canvas item ──────────────────────────────────────────────────────────────

export type CanvasItem = {
    instanceId: string; chartId: string; name: string; description: string
    importStatement: string; dataType: string
    colSpan: number   // 1..gridCols
    heightPx: number  // 0 = auto
    targetPageId?: PageId | null  // link to another page (navigation on click)
}

// ─── Page & Navigation types ──────────────────────────────────────────────────

export type PageId = string

export interface PageLayout {
    showNavbar?: boolean
    showSidebar?: boolean
    showRightSidebar?: boolean
    sidebarWidth?: number
    sidebarOpen?: boolean
    rightSidebarWidth?: number
    rightSidebarOpen?: boolean
    navbarItems?: NavItem[]
    sidebarItems?: NavItem[]
    rightSidebarItems?: NavItem[]
    gridCols?: number
    gridGap?: number
    padV?: number
    padH?: number
}

export interface ResolvedLayout {
    showNavbar: boolean
    showSidebar: boolean
    showRightSidebar: boolean
    sidebarWidth: number
    sidebarOpen: boolean
    rightSidebarWidth: number
    rightSidebarOpen: boolean
    navbarItems: NavItem[]
    sidebarItems: NavItem[]
    rightSidebarItems: NavItem[]
    gridCols: number
    gridGap: number
    padV: number
    padH: number
}

export interface Page {
    id: PageId
    parentId: PageId | null
    label: string
    canvasItems: CanvasItem[]
    layout?: PageLayout
}

export interface TreeNode extends Page {
    children: TreeNode[]
    depth: number
}

// ─── Layout resolution (inheritance) ─────────────────────────────────────────

export function resolveLayout(
    pages: Page[],
    activePageId: PageId,
    rootLayout: ResolvedLayout,
): ResolvedLayout {
    const chain: Page[] = []
    let cur: Page | undefined = pages.find(p => p.id === activePageId)
    while (cur) {
        chain.unshift(cur)
        cur = cur.parentId ? pages.find(p => p.id === cur!.parentId) : undefined
    }

    const resolved = { ...rootLayout }

    for (const page of chain) {
        if (!page.layout) continue
        const L = page.layout
        if (L.showNavbar !== undefined) resolved.showNavbar = L.showNavbar
        if (L.showSidebar !== undefined) resolved.showSidebar = L.showSidebar
        if (L.showRightSidebar !== undefined) resolved.showRightSidebar = L.showRightSidebar
        if (L.sidebarWidth !== undefined) resolved.sidebarWidth = L.sidebarWidth
        if (L.sidebarOpen !== undefined) resolved.sidebarOpen = L.sidebarOpen
        if (L.rightSidebarWidth !== undefined) resolved.rightSidebarWidth = L.rightSidebarWidth
        if (L.rightSidebarOpen !== undefined) resolved.rightSidebarOpen = L.rightSidebarOpen
        if (L.navbarItems !== undefined) resolved.navbarItems = L.navbarItems
        if (L.sidebarItems !== undefined) resolved.sidebarItems = L.sidebarItems
        if (L.rightSidebarItems !== undefined) resolved.rightSidebarItems = L.rightSidebarItems
        if (L.gridCols !== undefined) resolved.gridCols = L.gridCols
        if (L.gridGap !== undefined) resolved.gridGap = L.gridGap
        if (L.padV !== undefined) resolved.padV = L.padV
        if (L.padH !== undefined) resolved.padH = L.padH
    }

    return resolved
}

export function pageHasLayoutOverride(page: Page): boolean {
    return page.layout !== undefined && Object.keys(page.layout).length > 0
}

// ─── Builder State ────────────────────────────────────────────────────────────

export type NavTarget = "navbar" | "sidebar" | "right-sidebar"

export interface BuilderState {
    pages: Page[]
    activePageId: PageId
    navbarItems: NavItem[]
    sidebarItems: NavItem[]
    rightSidebarItems: NavItem[]
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function navTargetKey(target: NavTarget): "navbarItems" | "sidebarItems" | "rightSidebarItems" {
    if (target === "navbar") return "navbarItems"
    if (target === "right-sidebar") return "rightSidebarItems"
    return "sidebarItems"
}

/** Apply a nav-items transform at the page-layout level (if pageId) or global level. */
function withNavItems(
    state: BuilderState,
    target: NavTarget,
    pageId: PageId | undefined,
    updater: (items: NavItem[]) => NavItem[],
): BuilderState {
    const key = navTargetKey(target)
    if (pageId) {
        return {
            ...state,
            pages: state.pages.map(p => {
                if (p.id !== pageId) return p
                const current = (p.layout?.[key] as NavItem[] | undefined) ?? state[key]
                return { ...p, layout: { ...p.layout, [key]: updater(current) } }
            }),
        }
    }
    return { ...state, [key]: updater(state[key]) }
}

export function newId() { return crypto.randomUUID() }

export function newPageId() { return crypto.randomUUID() }

export function computeRows(items: CanvasItem[], gridCols: number): number[] {
    const rows: number[] = []
    let used = 0, row = 0
    for (const item of items) {
        if (used + item.colSpan > gridCols) { row++; used = 0 }
        rows.push(row)
        used += item.colSpan
    }
    return rows
}

export function snapColSpan(targetPx: number, blockSize: number, maxCols: number, gap: number): number {
    // Use floor so the card only grows when the cursor fully reaches the next column edge
    const span = Math.floor(targetPx / (blockSize + gap)) + 1
    return Math.max(1, Math.min(maxCols, span))
}

export function snapHeight(targetPx: number, blockSize: number, gridGap: number): number {
    if (targetPx < blockSize * 0.4) return 0
    const rowStride = blockSize + gridGap
    const rows = Math.max(1, Math.round((targetPx + gridGap) / rowStride))
    return Math.round(rows * blockSize + (rows - 1) * gridGap)
}

export function applyWidthResize(items: CanvasItem[], idx: number, newSpan: number, gridCols: number): CanvasItem[] {
    const clamped = Math.max(1, Math.min(newSpan, gridCols))
    const rows = computeRows(items, gridCols)
    const myRow = rows[idx]
    const nextIdx = rows.findIndex((r, i) => r === myRow && i > idx)
    return items.map((item, i) => {
        if (i === idx) return { ...item, colSpan: clamped }
        if (i === nextIdx) {
            const delta = clamped - items[idx].colSpan
            return { ...item, colSpan: Math.max(1, item.colSpan - delta) }
        }
        return item
    })
}

/** Build tree structure from flat pages array */
export function buildTree(pages: Page[]): TreeNode[] {
    function getChildren(parentId: PageId | null, depth: number): TreeNode[] {
        return pages
            .filter(p => p.parentId === parentId)
            .map(p => ({ ...p, depth, children: getChildren(p.id, depth + 1) }))
    }
    return getChildren(null, 0)
}

/** Flatten tree for display (depth-first) */
export function flattenTree(nodes: TreeNode[]): TreeNode[] {
    const result: TreeNode[] = []
    function walk(list: TreeNode[]) {
        for (const node of list) {
            result.push(node)
            walk(node.children)
        }
    }
    walk(nodes)
    return result
}

/** Get all descendant IDs (for cascade delete) */
function getDescendantIds(pages: Page[], pageId: PageId): PageId[] {
    const ids: PageId[] = []
    function collect(pid: PageId) {
        for (const p of pages) {
            if (p.parentId === pid) { ids.push(p.id); collect(p.id) }
        }
    }
    collect(pageId)
    return ids
}

// ─── Reducer ──────────────────────────────────────────────────────────────────

function updateActivePage(state: BuilderState, updater: (page: Page) => Page): BuilderState {
    return {
        ...state,
        pages: state.pages.map(p => p.id === state.activePageId ? updater(p) : p),
    }
}

export type BuilderAction =
    // Pages
    | { type: "ADD_PAGE"; parentId: PageId | null; label: string }
    | { type: "REMOVE_PAGE"; pageId: PageId }
    | { type: "RENAME_PAGE"; pageId: PageId; label: string }
    | { type: "REORDER_PAGE"; pageId: PageId; direction: "up" | "down" }
    | { type: "SET_ACTIVE_PAGE"; pageId: PageId }
    // Canvas items (operates on active page)
    | { type: "ADD_ITEM"; item: CanvasItem; insertBeforeId?: string }
    | { type: "REMOVE_ITEM"; instanceId: string }
    | { type: "RESIZE_ITEM"; instanceId: string; patch: Partial<Pick<CanvasItem, "colSpan" | "heightPx">>; gridCols: number }
    | { type: "REORDER_ITEMS"; activeId: string; overId: string }
    | { type: "SPLICE_ITEM"; item: CanvasItem; insertIdx: number }
    | { type: "SET_ITEMS"; items: CanvasItem[] }
    | { type: "SYNC_LAYOUT_COLS"; gridCols: number }
    // Canvas item link
    | { type: "LINK_ITEM"; instanceId: string; targetPageId: PageId | null }
    // Nav items (pageId → edit page.layout; omit → edit global)
    | { type: "ADD_NAV_ITEM"; target: NavTarget; item: NavItem; pageId?: PageId }
    | { type: "REMOVE_NAV_ITEM"; target: NavTarget; itemId: string; pageId?: PageId }
    | { type: "UPDATE_NAV_ITEM"; target: NavTarget; itemId: string; label?: string; targetPageId?: PageId | null; pageId?: PageId }
    | { type: "REORDER_NAV_ITEM"; target: NavTarget; activeId: string; overId: string; pageId?: PageId }
    // Page layout overrides
    | { type: "SET_PAGE_LAYOUT"; pageId: PageId; layout: Partial<PageLayout> }
    | { type: "CLEAR_PAGE_LAYOUT_FIELD"; pageId: PageId; field: keyof PageLayout }

export function builderReducer(state: BuilderState, action: BuilderAction): BuilderState {
    switch (action.type) {
        // ── Pages ────────────────────────────────────────────────────────────
        case "ADD_PAGE": {
            const id = newPageId()
            return {
                ...state,
                pages: [...state.pages, { id, parentId: action.parentId, label: action.label, canvasItems: [] }],
            }
        }
        case "REMOVE_PAGE": {
            const toRemove = new Set([action.pageId, ...getDescendantIds(state.pages, action.pageId)])
            const clearTarget = (items: NavItem[]) =>
                items.map(i => toRemove.has(i.targetPageId!) ? { ...i, targetPageId: null } : i)
            const clearCanvasLinks = (items: CanvasItem[]) =>
                items.map(i => i.targetPageId && toRemove.has(i.targetPageId) ? { ...i, targetPageId: null } : i)
            const filtered = state.pages.filter(p => !toRemove.has(p.id)).map(p => {
                const cleanedCanvas = clearCanvasLinks(p.canvasItems)
                const canvasChanged = cleanedCanvas !== p.canvasItems
                if (!p.layout && !canvasChanged) return p
                const patch: Partial<PageLayout> = {}
                if (p.layout?.navbarItems) patch.navbarItems = clearTarget(p.layout.navbarItems)
                if (p.layout?.sidebarItems) patch.sidebarItems = clearTarget(p.layout.sidebarItems)
                if (p.layout?.rightSidebarItems) patch.rightSidebarItems = clearTarget(p.layout.rightSidebarItems)
                const layoutChanged = Object.keys(patch).length > 0
                if (!canvasChanged && !layoutChanged) return p
                return {
                    ...p,
                    ...(canvasChanged && { canvasItems: cleanedCanvas }),
                    ...(layoutChanged && { layout: { ...p.layout, ...patch } }),
                }
            })
            if (filtered.length === 0) return state
            return {
                ...state,
                pages: filtered,
                activePageId: toRemove.has(state.activePageId) ? filtered[0].id : state.activePageId,
                navbarItems: clearTarget(state.navbarItems),
                sidebarItems: clearTarget(state.sidebarItems),
                rightSidebarItems: clearTarget(state.rightSidebarItems),
            }
        }
        case "RENAME_PAGE": {
            const syncNav = (items: NavItem[]) =>
                items.map(i => i.targetPageId === action.pageId ? { ...i, label: action.label } : i)
            const syncPageLayout = (p: Page): Page => {
                if (!p.layout) return p
                const patch: Partial<PageLayout> = {}
                if (p.layout.navbarItems) patch.navbarItems = syncNav(p.layout.navbarItems)
                if (p.layout.sidebarItems) patch.sidebarItems = syncNav(p.layout.sidebarItems)
                if (p.layout.rightSidebarItems) patch.rightSidebarItems = syncNav(p.layout.rightSidebarItems)
                return Object.keys(patch).length > 0 ? { ...p, layout: { ...p.layout, ...patch } } : p
            }
            return {
                ...state,
                pages: state.pages.map(p => {
                    let updated = p.id === action.pageId ? { ...p, label: action.label } : p
                    return syncPageLayout(updated)
                }),
                navbarItems: syncNav(state.navbarItems),
                sidebarItems: syncNav(state.sidebarItems),
                rightSidebarItems: syncNav(state.rightSidebarItems),
            }
        }
        case "REORDER_PAGE": {
            // Reorder among siblings (same parentId)
            const page = state.pages.find(p => p.id === action.pageId)
            if (!page) return state
            const siblings = state.pages.filter(p => p.parentId === page.parentId)
            const sibIdx = siblings.findIndex(s => s.id === action.pageId)
            const targetIdx = action.direction === "up" ? sibIdx - 1 : sibIdx + 1
            if (targetIdx < 0 || targetIdx >= siblings.length) return state
            const reordered = arrayMove(siblings, sibIdx, targetIdx)
            // Rebuild pages: non-siblings stay in place, siblings get new order
            const siblingIds = new Set(siblings.map(s => s.id))
            const result: Page[] = []
            let sibCursor = 0
            for (const p of state.pages) {
                if (siblingIds.has(p.id)) {
                    result.push(reordered[sibCursor++])
                } else {
                    result.push(p)
                }
            }
            return { ...state, pages: result }
        }
        case "SET_ACTIVE_PAGE":
            return { ...state, activePageId: action.pageId }

        // ── Canvas items (active page) ──────────────────────────────────────
        case "ADD_ITEM":
            return updateActivePage(state, page => {
                if (action.insertBeforeId) {
                    const idx = page.canvasItems.findIndex(i => i.instanceId === action.insertBeforeId)
                    if (idx === -1) return { ...page, canvasItems: [...page.canvasItems, action.item] }
                    return { ...page, canvasItems: [...page.canvasItems.slice(0, idx), action.item, ...page.canvasItems.slice(idx)] }
                }
                return { ...page, canvasItems: [...page.canvasItems, action.item] }
            })
        case "REMOVE_ITEM":
            return updateActivePage(state, page => ({
                ...page,
                canvasItems: page.canvasItems.filter(i => i.instanceId !== action.instanceId),
            }))
        case "RESIZE_ITEM":
            return updateActivePage(state, page => {
                const idx = page.canvasItems.findIndex(i => i.instanceId === action.instanceId)
                if (idx === -1) return page
                if (isLayoutComponent(page.canvasItems[idx].chartId)) return page
                let items = page.canvasItems
                if (action.patch.colSpan !== undefined) items = applyWidthResize(items, idx, action.patch.colSpan, action.gridCols)
                if (action.patch.heightPx !== undefined) items = items.map((i, ii) => ii === idx ? { ...i, heightPx: action.patch.heightPx! } : i)
                return { ...page, canvasItems: items }
            })
        case "REORDER_ITEMS":
            return updateActivePage(state, page => {
                const oi = page.canvasItems.findIndex(i => i.instanceId === action.activeId)
                const ni = page.canvasItems.findIndex(i => i.instanceId === action.overId)
                if (oi === -1 || ni === -1) return page
                return { ...page, canvasItems: arrayMove(page.canvasItems, oi, ni) }
            })
        case "SPLICE_ITEM":
            return updateActivePage(state, page => {
                const items = [...page.canvasItems]
                items.splice(action.insertIdx, 0, action.item)
                return { ...page, canvasItems: items }
            })
        case "SET_ITEMS":
            return updateActivePage(state, page => ({ ...page, canvasItems: action.items }))
        case "SYNC_LAYOUT_COLS":
            return {
                ...state,
                pages: state.pages.map(page => {
                    const needsUpdate = page.canvasItems.some(i =>
                        isLayoutComponent(i.chartId) ? i.colSpan !== action.gridCols : i.colSpan > action.gridCols
                    )
                    if (!needsUpdate) return page
                    return {
                        ...page,
                        canvasItems: page.canvasItems.map(i => {
                            if (isLayoutComponent(i.chartId)) return { ...i, colSpan: action.gridCols }
                            if (i.colSpan > action.gridCols) return { ...i, colSpan: action.gridCols }
                            return i
                        }),
                    }
                }),
            }

        // ── Canvas item link ────────────────────────────────────────────────
        case "LINK_ITEM":
            return updateActivePage(state, page => ({
                ...page,
                canvasItems: page.canvasItems.map(i =>
                    i.instanceId === action.instanceId
                        ? { ...i, targetPageId: action.targetPageId || null }
                        : i
                ),
            }))

        // ── Nav items (global or per-page layout) ──────────────────────────
        case "ADD_NAV_ITEM":
            return withNavItems(state, action.target, action.pageId, items => [...items, action.item])

        case "REMOVE_NAV_ITEM":
            return withNavItems(state, action.target, action.pageId, items => items.filter(i => i.id !== action.itemId))

        case "UPDATE_NAV_ITEM": {
            let result = withNavItems(state, action.target, action.pageId, items =>
                items.map(i =>
                    i.id !== action.itemId ? i : {
                        ...i,
                        ...(action.label !== undefined && { label: action.label }),
                        ...(action.targetPageId !== undefined && { targetPageId: action.targetPageId }),
                    }
                )
            )
            // Propagate label rename to linked page
            if (action.label !== undefined) {
                const key = navTargetKey(action.target)
                const source = action.pageId
                    ? result.pages.find(p => p.id === action.pageId)?.layout?.[key] as NavItem[] | undefined
                    : result[key]
                const navItem = source?.find(i => i.id === action.itemId)
                if (navItem?.targetPageId) {
                    result = { ...result, pages: result.pages.map(p => p.id === navItem.targetPageId ? { ...p, label: action.label! } : p) }
                }
            }
            return result
        }

        case "REORDER_NAV_ITEM":
            return withNavItems(state, action.target, action.pageId, items => {
                const oi = items.findIndex(i => i.id === action.activeId)
                const ni = items.findIndex(i => i.id === action.overId)
                if (oi === -1 || ni === -1) return items
                return arrayMove(items, oi, ni)
            })

        // ── Page layout overrides ─────────────────────────────────────────────
        case "SET_PAGE_LAYOUT": {
            return {
                ...state,
                pages: state.pages.map(p =>
                    p.id === action.pageId
                        ? { ...p, layout: { ...p.layout, ...action.layout } }
                        : p
                ),
            }
        }

        case "CLEAR_PAGE_LAYOUT_FIELD": {
            return {
                ...state,
                pages: state.pages.map(p => {
                    if (p.id !== action.pageId || !p.layout) return p
                    const { [action.field]: _, ...rest } = p.layout
                    const hasFields = Object.keys(rest).length > 0
                    return { ...p, layout: hasFields ? rest : undefined }
                }),
            }
        }

        default:
            return state
    }
}

// ─── Initial state factory ────────────────────────────────────────────────────

export function createInitialState(): BuilderState {
    const firstId = newPageId()
    return {
        pages: [{ id: firstId, parentId: null, label: "Página 1", canvasItems: [] }],
        activePageId: firstId,
        navbarItems: [],
        sidebarItems: [],
        rightSidebarItems: [],
    }
}

/** Migrate legacy persisted data (navLinks → navbarItems/sidebarItems) */
export function migrateState(raw: Record<string, unknown>): BuilderState {
    const state = raw as unknown as BuilderState
    // Ensure pages array is valid
    if (!Array.isArray(state.pages) || state.pages.length === 0) return createInitialState()
    // Fix stale activePageId
    const validActiveId = state.pages.some(p => p.id === state.activePageId)
        ? state.activePageId
        : state.pages[0].id
    // Already migrated
    if (Array.isArray(state.navbarItems)) {
        // Ensure rightSidebarItems exists (added later)
        if (!Array.isArray(state.rightSidebarItems)) return { ...state, activePageId: validActiveId, rightSidebarItems: [] }
        return validActiveId !== state.activePageId ? { ...state, activePageId: validActiveId } : state
    }
    // Legacy format: navLinks array
    const legacyLinks = (raw as { navLinks?: { sourceType: string; sourceItemLabel: string; targetPageId: string }[] }).navLinks
    const navbarItems: NavItem[] = []
    const sidebarItems: NavItem[] = []
    if (Array.isArray(legacyLinks)) {
        for (const l of legacyLinks) {
            const item: NavItem = { id: newId(), label: l.sourceItemLabel, targetPageId: l.targetPageId }
            if (l.sourceType === "mock-navbar") navbarItems.push(item)
            else sidebarItems.push(item)
        }
    }
    // No default items — user adds links via "+ adicionar link"
    return {
        pages: state.pages,
        activePageId: validActiveId,
        navbarItems,
        sidebarItems,
        rightSidebarItems: [],
    }
}
