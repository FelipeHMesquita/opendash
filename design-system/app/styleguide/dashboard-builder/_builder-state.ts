import { arrayMove } from "@dnd-kit/sortable"

// ─── Constants ────────────────────────────────────────────────────────────────

export const CARD_OVERHEAD = 116

export const DEVICE_PRESETS = [
    { id: "desktop", label: "Desktop", width: 0   },
    { id: "tablet",  label: "Tablet",  width: 768 },
    { id: "mobile",  label: "Mobile",  width: 390 },
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
            { id: "column-chart",  name: "Column Chart",  description: "Comparativo mensal em barras verticais",  importStatement: 'import { ColumnChart } from "@/componentsSugest/charts/ColumnChart"',          dataType: "{ month: string; receita: number; despesas: number; lucro: number }[]" },
            { id: "bar-chart",     name: "Bar Chart",     description: "Performance horizontal por categoria",   importStatement: 'import { HorizontalBarChart } from "@/componentsSugest/charts/HorizontalBarChart"', dataType: "{ area: string; realizado: number; meta: number }[]" },
            { id: "area-chart",    name: "Area Chart",    description: "Tendência com volume ao longo do tempo", importStatement: 'import { AreaChart } from "@/componentsSugest/charts/AreaChart"',              dataType: "{ semana: string; sessoes: number; pageviews: number; conversoes: number }[]" },
            { id: "line-chart",    name: "Line Chart",    description: "Evolução de múltiplas séries temporais", importStatement: 'import { LineChart } from "@/componentsSugest/charts/LineChart"',              dataType: "{ date: string; [serie: string]: number }[]" },
            { id: "pie-chart",     name: "Donut Chart",   description: "Distribuição proporcional de categorias",importStatement: 'import { DonutChart } from "@/componentsSugest/charts/DonutChart"',            dataType: "{ name: string; value: number }[]" },
            { id: "ranked-list",   name: "Ranked List",   description: "Ranking com barras de progresso relativo",importStatement: 'import { RankedList } from "@/componentsSugest/charts/RankedList"',          dataType: "{ rank: number; name: string; category: string; value: number }[]" },
            { id: "funnel-chart",  name: "Funnel Chart",  description: "Funil de conversão por etapa",           importStatement: 'import { FunnelChart } from "@/componentsSugest/charts/FunnelChart"',          dataType: "{ name: string; value: number }[]" },
        ],
    },
    {
        title: "Cards & Métricas",
        items: [
            { id: "dash-card-list", name: "Dash Card List", description: "Cards de métricas com tabela resumida",    importStatement: 'import { DashCardList } from "@/componentsSugest/DashCardList"',   dataType: "Dashboard cards + table" },
            { id: "stat-cards",     name: "Stat Cards",     description: "KPIs com variação e ícone",               importStatement: 'import { StatCardDemo } from "@/componentsSugest/StatCard"',       dataType: "{ label: string; value: string; change: number }[]" },
            { id: "chart-card",     name: "Chart Card",     description: "Card com mini gráfico embutido",           importStatement: 'import { ChartCard } from "@/componentsSugest/ChartCard"',         dataType: "Metric card with sparkline" },
        ],
    },
    {
        title: "Tabelas",
        items: [
            { id: "data-table",   name: "Data Table",   description: "Tabela de dados com ordenação e filtros", importStatement: 'import { DataTable } from "@/componentsSugest/DataTable"',     dataType: "Sortable data table" },
            { id: "users-table",  name: "Users Table",  description: "Lista de usuários com avatar e ações",    importStatement: 'import { UsersTable } from "@/componentsSugest/UsersTable"',   dataType: "User management table" },
        ],
    },
    {
        title: "Layout",
        items: [
            { id: "navbar-comp",    name: "Navbar",      description: "Barra de navegação superior",             importStatement: 'import { Navbar } from "@/componentsSugest/Navbar"',             dataType: "Navigation bar" },
            { id: "sidebar-comp",   name: "Sidebar",     description: "Barra lateral de navegação",              importStatement: 'import { SidebarOpen } from "@/componentsSugest/SidebarOpen"',   dataType: "Sidebar navigation" },
        ],
    },
    {
        title: "Interação",
        items: [
            { id: "kanban-board",     name: "Kanban Board",     description: "Quadro de tarefas estilo kanban",        importStatement: 'import { KanbanBoard } from "@/componentsSugest/KanbanBoard"',         dataType: "Task board columns" },
            { id: "activity-feed",    name: "Activity Feed",    description: "Feed de atividades recentes",            importStatement: 'import { ActivityFeed } from "@/componentsSugest/ActivityFeed"',       dataType: "Activity log entries" },
            { id: "command-palette",  name: "Command Palette",  description: "Paleta de comandos estilo ⌘K",           importStatement: 'import { CommandPalette } from "@/componentsSugest/CommandPalette"', dataType: "Command search dialog" },
            { id: "empty-state",      name: "Empty State",      description: "Estado vazio com ilustração e CTA",      importStatement: 'import { EmptyState } from "@/componentsSugest/EmptyState"',         dataType: "Empty state placeholder" },
        ],
    },
    {
        title: "Formulários",
        items: [
            { id: "form-page",   name: "Form Page",   description: "Formulário completo com validação",    importStatement: 'import { FormPage } from "@/componentsSugest/FormPage"',     dataType: "Form with validation" },
            { id: "team-page",   name: "Team Page",   description: "Página de equipe com cards de membros", importStatement: 'import { TeamPage } from "@/componentsSugest/TeamPage"',     dataType: "Team member cards" },
        ],
    },
    {
        title: "Páginas",
        items: [
            { id: "login-page",       name: "Login",              description: "Página de autenticação",                importStatement: 'import { LoginPage } from "@/componentsSugest/LoginPage"',                 dataType: "Auth page" },
            { id: "signup-page",       name: "Sign Up",            description: "Página de cadastro",                    importStatement: 'import { SignUpPage } from "@/componentsSugest/SignUpPage"',               dataType: "Registration page" },
            { id: "onboarding-page",   name: "Onboarding",         description: "Fluxo de boas-vindas",                  importStatement: 'import { OnboardingPage } from "@/componentsSugest/OnboardingPage"',       dataType: "Onboarding flow" },
            { id: "settings-page",     name: "Settings",           description: "Página de configurações",               importStatement: 'import { SettingsPage } from "@/componentsSugest/SettingsPage"',           dataType: "Settings layout" },
            { id: "account-settings",  name: "Account Settings",   description: "Configurações de conta",                importStatement: 'import { AccountSettings } from "@/componentsSugest/AccountSettings"',     dataType: "Account settings" },
            { id: "general-settings",  name: "General Settings",   description: "Configurações gerais",                  importStatement: 'import { GeneralSettings } from "@/componentsSugest/GeneralSettings"',     dataType: "General settings" },
            { id: "billing-page",      name: "Billing",            description: "Página de cobrança e planos",           importStatement: 'import { BillingPage } from "@/componentsSugest/BillingPage"',             dataType: "Billing layout" },
            { id: "notifications-page",name: "Notifications",      description: "Central de notificações",               importStatement: 'import { NotificationsPage } from "@/componentsSugest/NotificationsPage"', dataType: "Notifications" },
            { id: "error-page",        name: "Error",              description: "Página de erro (404/500)",              importStatement: 'import { ErrorPage } from "@/componentsSugest/ErrorPage"',                 dataType: "Error page" },
        ],
    },
]

export const CHART_PALETTE = PALETTE_SECTIONS.flatMap(s => s.items)
export type ChartPaletteEntry = PaletteEntry

// ─── Layout components (full-width, no resize) ──────────────────────────────

export const LAYOUT_IDS = new Set(["navbar-comp", "sidebar-comp"])
export function isLayoutComponent(chartId: string) { return LAYOUT_IDS.has(chartId) }

// ─── Mock navigation item labels ──────────────────────────────────────────────

export const MOCK_NAVBAR_ITEMS = ["Dashboard", "Relatórios", "Vendas", "Config"]
export const MOCK_SIDEBAR_ITEMS = ["Início", "Dashboard", "Análises", "Relatórios", "Usuários", "Produtos", "Config."]

// ─── Canvas item ──────────────────────────────────────────────────────────────

export type CanvasItem = {
    instanceId: string; chartId: string; name: string; description: string
    importStatement: string; dataType: string
    colSpan: number   // 1..gridCols
    heightPx: number  // 0 = auto
}

// ─── Page & Navigation types ──────────────────────────────────────────────────

export type PageId = string

export interface Page {
    id: PageId
    parentId: PageId | null
    label: string
    canvasItems: CanvasItem[]
}

export interface NavLink {
    sourceType: "mock-navbar" | "mock-sidebar"
    sourceItemLabel: string
    targetPageId: PageId
}

export interface TreeNode extends Page {
    children: TreeNode[]
    depth: number
}

// ─── Builder State ────────────────────────────────────────────────────────────

export interface BuilderState {
    pages: Page[]
    activePageId: PageId
    navLinks: NavLink[]
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

let counter = 0
export function newId() { return `inst_${++counter}_${Date.now()}` }

export function newPageId() { return `page_${++counter}_${Date.now()}` }

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
    let best = 1, bestDist = Infinity
    for (let n = 1; n <= maxCols; n++) {
        const w = n * blockSize + (n - 1) * gap
        const d = Math.abs(w - targetPx)
        if (d < bestDist) { bestDist = d; best = n }
    }
    return best
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
    // Nav links
    | { type: "SET_NAV_LINK"; link: NavLink }
    | { type: "REMOVE_NAV_LINK"; sourceType: NavLink["sourceType"]; sourceItemLabel: string }

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
            const filtered = state.pages.filter(p => !toRemove.has(p.id))
            if (filtered.length === 0) return state  // prevent deleting all pages
            return {
                ...state,
                pages: filtered,
                activePageId: toRemove.has(state.activePageId) ? filtered[0].id : state.activePageId,
                navLinks: state.navLinks.filter(l => !toRemove.has(l.targetPageId)),
            }
        }
        case "RENAME_PAGE":
            return {
                ...state,
                pages: state.pages.map(p => p.id === action.pageId ? { ...p, label: action.label } : p),
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
                    const needsUpdate = page.canvasItems.some(i => isLayoutComponent(i.chartId) && i.colSpan !== action.gridCols)
                    if (!needsUpdate) return page
                    return { ...page, canvasItems: page.canvasItems.map(i => isLayoutComponent(i.chartId) ? { ...i, colSpan: action.gridCols } : i) }
                }),
            }

        // ── Nav links ────────────────────────────────────────────────────────
        case "SET_NAV_LINK": {
            const filtered = state.navLinks.filter(l =>
                !(l.sourceType === action.link.sourceType && l.sourceItemLabel === action.link.sourceItemLabel)
            )
            return { ...state, navLinks: [...filtered, action.link] }
        }
        case "REMOVE_NAV_LINK":
            return {
                ...state,
                navLinks: state.navLinks.filter(l =>
                    !(l.sourceType === action.sourceType && l.sourceItemLabel === action.sourceItemLabel)
                ),
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
        navLinks: [],
    }
}
