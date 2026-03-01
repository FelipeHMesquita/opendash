"use client"

import * as React from "react"
import { useParams } from "next/navigation"
import ReactGridLayout, { verticalCompactor, noCompactor } from "react-grid-layout"
import { cn } from "@/lib/utils"
import { getDataAdapter } from "@/lib/adapters"
import type { DashboardData } from "@/lib/adapters/types"
import { themes, type ThemeName, ALL_THEMES } from "@/app/styleguide/_themes"
import { BarGrouped, BarStacked, BarHorizontal } from "@/componentsSugest/charts/RechartsBarChart"
import { AreaSimple, AreaStacked } from "@/componentsSugest/charts/RechartsAreaChart"
import { LineSimple, LineMulti } from "@/componentsSugest/charts/RechartsLineChart"
import { PieSimple, PieDonut, PieSeparated } from "@/componentsSugest/charts/RechartsPieChart"
import { RadarSimple, RadarMulti } from "@/componentsSugest/charts/RechartsRadarChart"
import { RadialGauge, RadialMulti, RadialStacked } from "@/componentsSugest/charts/RechartsRadialChart"
import { RankedSimple, RankedCategory } from "@/componentsSugest/charts/RechartsRankedList"
import { FunnelSales, FunnelMarketing } from "@/componentsSugest/charts/RechartsFunnelChart"
import { StatCardDemo } from "@/componentsSugest/StatCard"
import {
    CARD_OVERHEAD, DEVICE_PRESETS, type DeviceId,
    type CanvasItem, type Page, type PageId,
    RGL_COLS, RGL_ROW_HEIGHT, RGL_MARGIN,
    migrateState, type BuilderState,
} from "@/app/_builder-state"

// ─── Chart registry (same as builder) ─────────────────────────────────────────

const CHART_COMPONENTS: Record<string, React.ComponentType> = {
    "bar-grouped": BarGrouped, "bar-stacked": BarStacked, "bar-horizontal": BarHorizontal,
    "area-simple": AreaSimple, "area-stacked": AreaStacked,
    "line-simple": LineSimple, "line-multi": LineMulti,
    "pie-simple": PieSimple, "pie-donut": PieDonut, "pie-separated": PieSeparated,
    "radar-simple": RadarSimple, "radar-multi": RadarMulti,
    "radial-gauge": RadialGauge, "radial-multi": RadialMulti, "radial-stacked": RadialStacked,
    "ranked-simple": RankedSimple, "ranked-category": RankedCategory,
    "funnel-sales": FunnelSales, "funnel-marketing": FunnelMarketing,
    "stat-card": StatCardDemo,
}

// ─── Theme helper ─────────────────────────────────────────────────────────────

function getThemeVars(name: string): Record<string, string> {
    if (name === "Custom" || !(ALL_THEMES as string[]).includes(name)) return {}
    return themes[name as Exclude<ThemeName, "Custom">]
}

// ─── Preview card ─────────────────────────────────────────────────────────────

function PreviewCard({ item }: { item: CanvasItem }) {
    const Component = CHART_COMPONENTS[item.chartId]
    const totalPx = item.h * RGL_ROW_HEIGHT + (item.h - 1) * RGL_MARGIN[1]
    const chartHeight = Math.max(80, totalPx - CARD_OVERHEAD)

    return (
        <div className="relative h-full">
            <div className="[&>*:first-child]:!p-0">
                {Component && React.createElement(
                    Component as React.ComponentType<{ chartHeight?: number }>,
                    { chartHeight }
                )}
            </div>
        </div>
    )
}

// ─── Main view page ───────────────────────────────────────────────────────────

export default function DashboardViewPage() {
    const params = useParams<{ id: string }>()
    const [data, setData] = React.useState<DashboardData | null>(null)
    const [loading, setLoading] = React.useState(true)
    const [error, setError] = React.useState<string | null>(null)

    React.useEffect(() => {
        const adapter = getDataAdapter()
        adapter.getDashboard(params.id).then(dash => {
            if (!dash) { setError("Dashboard não encontrado"); setLoading(false); return }
            setData(dash.data)
            setLoading(false)
        }).catch(() => {
            setError("Erro ao carregar dashboard")
            setLoading(false)
        })
    }, [params.id])

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-muted-foreground border-t-transparent" />
            </div>
        )
    }

    if (error || !data) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
                <p className="text-sm text-muted-foreground">{error ?? "Dashboard não encontrado"}</p>
            </div>
        )
    }

    return <DashboardView data={data} />
}

function DashboardView({ data }: { data: DashboardData }) {
    const { builder: rawBuilder, ui } = data

    // Migrate if needed
    const builderState = React.useMemo<BuilderState>(() => {
        try { return migrateState(rawBuilder as unknown as Record<string, unknown>) }
        catch { return { pages: [], activePageId: "" } }
    }, [rawBuilder])

    const [activePageId, setActivePageId] = React.useState(builderState.activePageId)

    const activePage = builderState.pages.find(p => p.id === activePageId) ?? builderState.pages[0]
    const canvasItems = activePage?.canvasItems ?? []

    // UI settings
    const themeName = ui.activeTheme ?? "Light"
    const themeVars = getThemeVars(themeName)
    const themeStyle = Object.keys(themeVars).length > 0 ? themeVars : undefined
    const padV = ui.padV ?? 24
    const padH = ui.padH ?? 24
    const useCompactor = ui.useCompactor ?? true
    const contentMinHeight = ui.contentMinHeight ?? 0
    const deviceId = (ui.deviceId as DeviceId) ?? "desktop"
    const contentWidth = ui.contentWidth ?? 0
    const devicePresetWidth = DEVICE_PRESETS.find(d => d.id === deviceId)?.width ?? 0
    const frameWidth = contentWidth > 0 ? contentWidth : devicePresetWidth

    // Container width measurement
    const contentRef = React.useRef<HTMLDivElement>(null)
    const roRef = React.useRef<ResizeObserver | null>(null)
    const [containerWidth, setContainerWidth] = React.useState(900)
    const setContentRef = React.useCallback((el: HTMLDivElement | null) => {
        if (roRef.current) roRef.current.disconnect()
        if (!el) return
        contentRef.current = el
        roRef.current = new ResizeObserver(entries => {
            for (const entry of entries) {
                const w = entry.contentRect.width
                if (w > 0) setContainerWidth(w)
            }
        })
        roRef.current.observe(el)
        const initial = el.getBoundingClientRect().width
        if (initial > 0) setContainerWidth(initial)
    }, [])

    // RGL config
    const rglGridConfig = React.useMemo(() => ({
        cols: RGL_COLS, rowHeight: RGL_ROW_HEIGHT,
        margin: RGL_MARGIN as [number, number],
        containerPadding: [0, 0] as [number, number],
    }), [])

    const rglDisabled = React.useMemo(() => ({
        enabled: false as const,
    }), [])

    const rglCompactor = React.useMemo(() =>
        useCompactor ? verticalCompactor : noCompactor
    , [useCompactor])

    const rglLayout = React.useMemo(() =>
        canvasItems.map(item => ({
            i: item.instanceId,
            x: item.x, y: item.y,
            w: item.w, h: item.h,
            minW: 2, minH: 1,
        }))
    , [canvasItems])

    const rglStyle = React.useMemo(() =>
        !useCompactor && contentMinHeight > 0
            ? { minHeight: contentMinHeight }
            : undefined
    , [useCompactor, contentMinHeight])

    return (
        <div className="flex h-screen flex-col overflow-hidden bg-muted/30 text-foreground" style={themeStyle as React.CSSProperties}>
            <div className="flex-1 overflow-y-auto flex justify-center">
                <div
                    className={cn(
                        "bg-background min-h-full flex flex-col",
                        frameWidth > 0 ? "border-x border-border" : "w-full",
                    )}
                    style={{ ...(frameWidth > 0 ? { width: frameWidth } : {}) }}
                >
                    {builderState.pages.length > 1 && (
                        <div className="shrink-0 flex items-center border-b border-border bg-card/40 px-4 h-9 gap-1 overflow-x-auto">
                            {builderState.pages.map(page => (
                                <button
                                    key={page.id}
                                    onClick={() => setActivePageId(page.id)}
                                    className={cn(
                                        "px-3 h-full text-xs transition-colors shrink-0",
                                        page.id === activePageId
                                            ? "border-b-2 border-primary text-primary font-medium"
                                            : "text-muted-foreground hover:text-foreground",
                                    )}
                                >
                                    {page.label}
                                </button>
                            ))}
                        </div>
                    )}
                    <div
                        ref={setContentRef}
                        className={cn(
                            "flex-1 min-w-0",
                            "[&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[var(--border)]",
                        )}
                        style={{ padding: `${padV}px ${padH}px` }}
                    >
                        {canvasItems.length === 0 ? (
                            <div className="flex items-center justify-center min-h-96 text-sm text-muted-foreground">
                                Nenhum componente nesta aba
                            </div>
                        ) : (
                            <ReactGridLayout
                                width={containerWidth}
                                layout={rglLayout}
                                gridConfig={rglGridConfig}
                                dragConfig={rglDisabled}
                                resizeConfig={rglDisabled}
                                compactor={rglCompactor}
                                style={rglStyle}
                            >
                                {canvasItems.map(item => (
                                    <div key={item.instanceId} className="h-full">
                                        <PreviewCard item={item} />
                                    </div>
                                ))}
                            </ReactGridLayout>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
