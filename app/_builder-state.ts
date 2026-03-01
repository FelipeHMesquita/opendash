// ─── Constants ────────────────────────────────────────────────────────────────

export const CARD_OVERHEAD = 116

// react-grid-layout constants (Metabase-style)
export const RGL_COLS = 24
export const RGL_ROW_HEIGHT = 60
export const RGL_MARGIN: [number, number] = [6, 6]
export const RGL_PADDING: [number, number] = [6, 6]

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
        title: "Indicadores",
        items: [
            { id: "stat-card", name: "Stat Card", description: "Card com métrica, variação e tendência", importStatement: 'import { StatCardDemo } from "@/componentsSugest/StatCard"', dataType: "{ title: string; value: string; change: string; positive: boolean; description: string }" },
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

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function getDefaultSize(_chartId: string): { w: number; h: number } {
    return { w: 6, h: 4 }
}

export function newId() { return crypto.randomUUID() }

export function newPageId() { return crypto.randomUUID() }

// ─── Canvas item ──────────────────────────────────────────────────────────────

export type CanvasItem = {
    instanceId: string; chartId: string; name: string; description: string
    importStatement: string; dataType: string
    x: number         // column offset (0..RGL_COLS-1)
    y: number         // row offset (in row units)
    w: number         // width in columns
    h: number         // height in row units
}

// ─── Page & State ─────────────────────────────────────────────────────────────

export type PageId = string

export interface Page {
    id: PageId
    label: string
    canvasItems: CanvasItem[]
}

export interface BuilderState {
    pages: Page[]
    activePageId: PageId
}

// ─── Reducer ──────────────────────────────────────────────────────────────────

function updateActivePage(state: BuilderState, updater: (page: Page) => Page): BuilderState {
    let changed = false
    const newPages = state.pages.map(p => {
        if (p.id !== state.activePageId) return p
        const updated = updater(p)
        if (updated !== p) changed = true
        return updated
    })
    if (!changed) return state
    return { ...state, pages: newPages }
}

export type BuilderAction =
    | { type: "ADD_ITEM"; item: CanvasItem }
    | { type: "REMOVE_ITEM"; instanceId: string }
    | { type: "SET_ITEMS"; items: CanvasItem[] }
    | { type: "UPDATE_LAYOUT"; layout: Array<{ i: string; x: number; y: number; w: number; h: number }> }
    | { type: "ADD_PAGE" }
    | { type: "REMOVE_PAGE"; pageId: PageId }
    | { type: "RENAME_PAGE"; pageId: PageId; label: string }
    | { type: "SET_ACTIVE_PAGE"; pageId: PageId }

export function builderReducer(state: BuilderState, action: BuilderAction): BuilderState {
    switch (action.type) {
        case "ADD_ITEM":
            return updateActivePage(state, page => ({
                ...page, canvasItems: [...page.canvasItems, action.item],
            }))
        case "REMOVE_ITEM":
            return updateActivePage(state, page => ({
                ...page,
                canvasItems: page.canvasItems.filter(i => i.instanceId !== action.instanceId),
            }))
        case "SET_ITEMS":
            return updateActivePage(state, page => ({ ...page, canvasItems: action.items }))
        case "UPDATE_LAYOUT":
            return updateActivePage(state, page => {
                let changed = false
                const next = page.canvasItems.map(item => {
                    const l = action.layout.find(li => li.i === item.instanceId)
                    if (!l) return item
                    if (item.x === l.x && item.y === l.y && item.w === l.w && item.h === l.h) return item
                    changed = true
                    return { ...item, x: l.x, y: l.y, w: l.w, h: l.h }
                })
                return changed ? { ...page, canvasItems: next } : page
            })
        case "ADD_PAGE": {
            const id = newPageId()
            const label = `Tab ${state.pages.length + 1}`
            return {
                ...state,
                pages: [...state.pages, { id, label, canvasItems: [] }],
                activePageId: id,
            }
        }
        case "REMOVE_PAGE": {
            if (state.pages.length <= 1) return state
            const filtered = state.pages.filter(p => p.id !== action.pageId)
            const newActive = state.activePageId === action.pageId
                ? filtered[0].id
                : state.activePageId
            return { pages: filtered, activePageId: newActive }
        }
        case "RENAME_PAGE":
            return {
                ...state,
                pages: state.pages.map(p =>
                    p.id === action.pageId ? { ...p, label: action.label } : p
                ),
            }
        case "SET_ACTIVE_PAGE": {
            if (state.activePageId === action.pageId) return state
            if (!state.pages.some(p => p.id === action.pageId)) return state
            return { ...state, activePageId: action.pageId }
        }
        default:
            return state
    }
}

// ─── Initial state factory ────────────────────────────────────────────────────

export function createInitialState(): BuilderState {
    const firstId = newPageId()
    return {
        pages: [{ id: firstId, label: "Dashboard", canvasItems: [] }],
        activePageId: firstId,
    }
}

// ─── RGL migration (colSpan/heightPx → x/y/w/h) ─────────────────────────────

function migrateCanvasItemsToRGL(items: unknown[], oldGridCols: number): CanvasItem[] {
    const scale = RGL_COLS / oldGridCols
    let curX = 0, curY = 0, rowMaxH = 0
    return (items as Record<string, unknown>[]).map(item => {
        const w = Math.min(RGL_COLS, Math.round(((item.colSpan as number) ?? 6) * scale))
        const h = typeof item.h === "number" ? item.h :
            ((item.heightPx as number) > 0
                ? Math.max(1, Math.ceil((item.heightPx as number) / (RGL_ROW_HEIGHT + RGL_MARGIN[1])))
                : 4)
        if (curX + w > RGL_COLS) { curX = 0; curY += rowMaxH; rowMaxH = 0 }
        const x = curX, y = curY
        curX += w; rowMaxH = Math.max(rowMaxH, h)
        return {
            instanceId: item.instanceId as string,
            chartId: item.chartId as string,
            name: item.name as string,
            description: item.description as string,
            importStatement: item.importStatement as string,
            dataType: item.dataType as string,
            x, y, w, h,
        }
    })
}

/** Migrate legacy persisted data — preserves all pages */
export function migrateState(raw: Record<string, unknown>): BuilderState {
    const state = raw as unknown as Record<string, unknown>
    const pages = state.pages as Array<Record<string, unknown>> | undefined

    if (!Array.isArray(pages) || pages.length === 0) return createInitialState()

    function migratePageItems(sourcePage: Record<string, unknown>): CanvasItem[] {
        let items = Array.isArray(sourcePage.canvasItems) ? (sourcePage.canvasItems as unknown[]) : []
        const needsRGL = items.length > 0 &&
            (items[0] as Record<string, unknown>).colSpan !== undefined &&
            (items[0] as Record<string, unknown>).x === undefined
        if (needsRGL) {
            items = migrateCanvasItemsToRGL(items, 12) as unknown[]
        }
        return (items as Record<string, unknown>[]).map(item => ({
            instanceId: (item.instanceId as string) ?? newId(),
            chartId: item.chartId as string,
            name: (item.name as string) ?? "",
            description: (item.description as string) ?? "",
            importStatement: (item.importStatement as string) ?? "",
            dataType: (item.dataType as string) ?? "",
            x: (item.x as number) ?? 0,
            y: (item.y as number) ?? 0,
            w: (item.w as number) ?? 6,
            h: (item.h as number) ?? 4,
        }))
    }

    const migratedPages: Page[] = pages.map(p => ({
        id: (p.id as string) ?? newPageId(),
        label: (p.label as string) ?? "Dashboard",
        canvasItems: migratePageItems(p),
    }))

    const activeId = state.activePageId as string | undefined
    const resolvedActive = (activeId && migratedPages.find(p => p.id === activeId)?.id) ?? migratedPages[0].id

    return { pages: migratedPages, activePageId: resolvedActive }
}
