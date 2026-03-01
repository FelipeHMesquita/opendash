"use client"

import * as React from "react"
import { createPortal } from "react-dom"
import Link from "next/link"
import ReactGridLayout, { verticalCompactor, noCompactor, cloneLayoutItem, type LayoutItem, type Layout as RGLLayout } from "react-grid-layout"
import { cn } from "@/lib/utils"
import { useParams } from "next/navigation"
import { useData } from "@/app/_data-context"
import type { DashboardData } from "@/lib/adapters/types"
import { themes, type ThemeName, ALL_THEMES, THEME_SWATCHES } from "@/app/styleguide/_themes"
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
    PALETTE_SECTIONS, CHART_PALETTE, type ChartPaletteEntry, type PaletteEntry,
    getDefaultSize, getSelectedComponents,
    type CanvasItem, type Page, type PageId,
    RGL_COLS, RGL_ROW_HEIGHT, RGL_MARGIN,
    newId,
    builderReducer, createInitialState, migrateState, type BuilderAction,
} from "@/app/_builder-state"

// ─── Persistence (via adapter) ────────────────────────────────────────────────

interface SavedData {
    builder: import("@/app/_builder-state").BuilderState
    ui: DashboardData["ui"]
}

// ─── Undo / Redo history wrapper ──────────────────────────────────────────────

const HISTORY_LIMIT = 50

interface HistoryState {
    current: import("@/app/_builder-state").BuilderState
    past: import("@/app/_builder-state").BuilderState[]
    future: import("@/app/_builder-state").BuilderState[]
}

type HistoryAction = BuilderAction | { type: "UNDO" } | { type: "REDO" }

function historyReducer(history: HistoryState, action: HistoryAction): HistoryState {
    if (action.type === "UNDO") {
        if (history.past.length === 0) return history
        const prev = history.past[history.past.length - 1]
        return { current: prev, past: history.past.slice(0, -1), future: [history.current, ...history.future] }
    }
    if (action.type === "REDO") {
        if (history.future.length === 0) return history
        const next = history.future[0]
        return { current: next, past: [...history.past, history.current], future: history.future.slice(1) }
    }
    const next = builderReducer(history.current, action)
    if (next === history.current) return history
    return {
        current: next,
        past: [...history.past.slice(-HISTORY_LIMIT + 1), history.current],
        future: [],
    }
}

// ─── Component map (React refs stay in client module) ──────────────────────
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

// ─── Theme helper ──────────────────────────────────────────────────────────────

const THEME_VAR_KEYS = Object.keys(themes["Dark"])

const BUILDER_CHROME_VARS: Record<string, string> = {
    "--background":         "oklch(0.13 0 0)",
    "--foreground":         "oklch(0.97 0 0)",
    "--card":               "oklch(0.16 0 0)",
    "--card-foreground":    "oklch(0.97 0 0)",
    "--muted":              "oklch(0.21 0 0)",
    "--muted-foreground":   "oklch(0.60 0 0)",
    "--accent":             "oklch(0.23 0 0)",
    "--accent-foreground":  "oklch(0.97 0 0)",
    "--border":             "oklch(1 0 0 / 10%)",
    "--input":              "oklch(1 0 0 / 15%)",
    "--popover":            "oklch(0.18 0 0)",
    "--popover-foreground": "oklch(0.97 0 0)",
}

function forceBuilderDark() {
    const el = document.documentElement
    el.classList.add("dark")
    THEME_VAR_KEYS.forEach(k => el.style.removeProperty(k))
    Object.entries(BUILDER_CHROME_VARS).forEach(([k, v]) => el.style.setProperty(k, v))
}

function getThemeVars(name: string): Record<string, string> {
    if (name === "Custom" || !(ALL_THEMES as string[]).includes(name)) return {}
    return themes[name as Exclude<ThemeName, "Custom">]
}

// ─── Icons ────────────────────────────────────────────────────────────────────

function GripIcon() { return <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor"><circle cx="4" cy="3" r="1"/><circle cx="8" cy="3" r="1"/><circle cx="4" cy="6" r="1"/><circle cx="8" cy="6" r="1"/><circle cx="4" cy="9" r="1"/><circle cx="8" cy="9" r="1"/></svg> }
function PlusIcon() { return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5v14"/></svg> }
function XIcon() { return <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg> }
function BackIcon() { return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg> }
function PlayIcon() { return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3"/></svg> }
function ExitFullscreenIcon() { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 3v3a2 2 0 0 1-2 2H3M21 8h-3a2 2 0 0 1-2-2V3M3 16h3a2 2 0 0 1 2 2v3M16 21v-3a2 2 0 0 1 2-2h3"/></svg> }
function UndoIcon() { return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 7v6h6"/><path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6.69 3L3 13"/></svg> }
function RedoIcon() { return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 7v6h-6"/><path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6.69 3L21 13"/></svg> }
function GridIcon() { return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z"/></svg> }
function CellsIcon() { return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="6" height="6" rx="1"/><rect x="9" y="2" width="6" height="6" rx="1"/><rect x="16" y="2" width="6" height="6" rx="1"/><rect x="2" y="9" width="6" height="6" rx="1"/><rect x="9" y="9" width="6" height="6" rx="1"/><rect x="16" y="9" width="6" height="6" rx="1"/><rect x="2" y="16" width="6" height="6" rx="1"/><rect x="9" y="16" width="6" height="6" rx="1"/><rect x="16" y="16" width="6" height="6" rx="1"/></svg> }
function DesktopIcon() { return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg> }
function TabletIcon() { return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="2" width="16" height="20" rx="2"/><circle cx="12" cy="18" r="1" fill="currentColor" stroke="none"/></svg> }
function MobileIcon() { return <svg width="11" height="13" viewBox="0 0 20 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="1" width="16" height="22" rx="3"/><circle cx="10" cy="19.5" r="1" fill="currentColor" stroke="none"/></svg> }
function ChevronDownSmIcon() { return <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6"/></svg> }
function CompactIcon() { return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v6M12 22v-6"/><path d="M4 12h16"/><path d="M8 5l4-3 4 3"/><path d="M8 19l4 3 4-3"/></svg> }
function ShareIcon() { return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98"/></svg> }
function EyeIcon() { return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg> }
function StarIcon() { return <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> }

function DeviceIconFor({ icon }: { icon: string }) {
    if (icon === "tablet") return <TabletIcon />
    if (icon === "mobile") return <MobileIcon />
    return <DesktopIcon />
}

function DeviceDropdown({ deviceId, onSelect }: { deviceId: DeviceId; onSelect: (id: DeviceId) => void }) {
    const [open, setOpen] = React.useState(false)
    const ref = React.useRef<HTMLDivElement>(null)
    const btnRef = React.useRef<HTMLButtonElement>(null)
    const [pos, setPos] = React.useState<{ top: number; left: number } | null>(null)
    const active = DEVICE_PRESETS.find(d => d.id === deviceId) ?? DEVICE_PRESETS[0]

    React.useEffect(() => {
        if (!open) return
        function handleClick(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
        }
        document.addEventListener("mousedown", handleClick)
        return () => document.removeEventListener("mousedown", handleClick)
    }, [open])

    function toggle() {
        if (!open && btnRef.current) {
            const rect = btnRef.current.getBoundingClientRect()
            setPos({ top: rect.bottom + 4, left: rect.left })
        }
        setOpen(v => !v)
    }

    return (
        <div ref={ref} className="shrink-0 px-2">
            <button
                ref={btnRef}
                onClick={toggle}
                className={cn(
                    "flex items-center gap-1.5 px-2 py-1 rounded transition-colors",
                    open ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground",
                )}
            >
                <DeviceIconFor icon={active.icon} />
                <span>{active.label}</span>
                {active.width > 0 && <span className="text-[10px] text-muted-foreground/60">{active.width}px</span>}
                <ChevronDownSmIcon />
            </button>
            {open && pos && (
                <div
                    className="fixed z-50 min-w-[180px] rounded-lg border border-border bg-card shadow-xl py-1"
                    style={{ top: pos.top, left: pos.left }}
                >
                    {DEVICE_PRESETS.map(d => (
                        <button
                            key={d.id}
                            onClick={() => { onSelect(d.id); setOpen(false) }}
                            className={cn(
                                "flex items-center gap-2.5 w-full px-3 py-1.5 text-xs transition-colors",
                                d.id === deviceId
                                    ? "bg-primary/10 text-primary font-medium"
                                    : "text-foreground hover:bg-muted",
                            )}
                        >
                            <DeviceIconFor icon={d.icon} />
                            <span className="flex-1 text-left">{d.label}</span>
                            <span className="text-[10px] text-muted-foreground/50 tabular-nums">
                                {d.width > 0 ? `${d.width}px` : "Auto"}
                            </span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}

function ComponentIcon({ id }: { id: string }) {
    const map: Record<string, React.ReactNode> = {
        "bar-grouped":     <svg width="14" height="12" viewBox="0 0 16 14" fill="currentColor"><rect x="0" y="8" width="3" height="6" rx=".5"/><rect x="4.5" y="4" width="3" height="10" rx=".5"/><rect x="9" y="1" width="3" height="13" rx=".5"/><rect x="13" y="5" width="3" height="9" rx=".5"/></svg>,
        "bar-stacked":     <svg width="14" height="12" viewBox="0 0 16 14" fill="currentColor"><rect x="0" y="8" width="3" height="6" rx=".5"/><rect x="4.5" y="4" width="3" height="10" rx=".5"/><rect x="9" y="1" width="3" height="13" rx=".5"/><rect x="13" y="5" width="3" height="9" rx=".5"/></svg>,
        "bar-horizontal":  <svg width="12" height="14" viewBox="0 0 14 16" fill="currentColor"><rect y="0" height="3" width="11" rx=".5"/><rect y="4.5" height="3" width="14" rx=".5"/><rect y="9" height="3" width="7" rx=".5"/><rect y="13" height="3" width="10" rx=".5"/></svg>,
        "area-simple":     <svg width="14" height="12" viewBox="0 0 16 12" fill="none"><path d="M0 10 L3 6 L6 8 L10 3 L13 5 L16 2 L16 12 L0 12 Z" fill="currentColor" fillOpacity=".3"/><polyline points="0,10 3,6 6,8 10,3 13,5 16,2" stroke="currentColor" strokeWidth="1.5"/></svg>,
        "area-stacked":    <svg width="14" height="12" viewBox="0 0 16 12" fill="none"><path d="M0 10 L3 6 L6 8 L10 3 L13 5 L16 2 L16 12 L0 12 Z" fill="currentColor" fillOpacity=".3"/><polyline points="0,10 3,6 6,8 10,3 13,5 16,2" stroke="currentColor" strokeWidth="1.5"/></svg>,
        "line-simple":     <svg width="14" height="12" viewBox="0 0 16 12" fill="none"><polyline points="0,10 4,5 8,7 12,2 16,5" stroke="currentColor" strokeWidth="1.5"/><polyline points="0,8 4,9 8,5 12,6 16,3" stroke="currentColor" strokeWidth="1.5" strokeOpacity=".45"/></svg>,
        "line-multi":      <svg width="14" height="12" viewBox="0 0 16 12" fill="none"><polyline points="0,10 4,5 8,7 12,2 16,5" stroke="currentColor" strokeWidth="1.5"/><polyline points="0,8 4,9 8,5 12,6 16,3" stroke="currentColor" strokeWidth="1.5" strokeOpacity=".45"/></svg>,
        "pie-simple":      <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.5"/><path d="M7 1 A6 6 0 0 1 12.2 4 L7 7 Z" fill="currentColor" fillOpacity=".4"/></svg>,
        "pie-donut":       <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.5"/><circle cx="7" cy="7" r="3" stroke="currentColor" strokeWidth="1.5"/><path d="M7 1 A6 6 0 0 1 12.2 4 L9.6 5.5 A3 3 0 0 0 7 4 Z" fill="currentColor" fillOpacity=".4"/></svg>,
        "pie-separated":   <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.5"/><path d="M7 1 A6 6 0 0 1 12.2 4 L7 7 Z" fill="currentColor" fillOpacity=".4"/></svg>,
        "radar-simple":    <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><polygon points="7,1 12,4 12,10 7,13 2,10 2,4" stroke="currentColor" strokeWidth="1.2"/><polygon points="7,3 10,5 10,9 7,11 4,9 4,5" fill="currentColor" fillOpacity=".2"/></svg>,
        "radar-multi":     <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><polygon points="7,1 12,4 12,10 7,13 2,10 2,4" stroke="currentColor" strokeWidth="1.2"/><polygon points="7,3 10,5 10,9 7,11 4,9 4,5" fill="currentColor" fillOpacity=".2"/></svg>,
        "radial-gauge":    <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M2 10 A6 6 0 1 1 12 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>,
        "radial-multi":    <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5"/><circle cx="7" cy="7" r="3" stroke="currentColor" strokeWidth="1.5" strokeOpacity=".5"/></svg>,
        "radial-stacked":  <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M2 10 A6 6 0 1 1 12 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>,
        "ranked-simple":   <svg width="14" height="12" viewBox="0 0 16 12" fill="currentColor"><rect x="0" y="0" width="3" height="3" rx=".5"/><rect x="4.5" y=".5" width="11.5" height="2" rx=".5"/><rect x="0" y="4.5" width="3" height="3" rx=".5"/><rect x="4.5" y="5" width="9" height="2" rx=".5"/><rect x="0" y="9" width="3" height="3" rx=".5"/><rect x="4.5" y="9.5" width="6" height="2" rx=".5"/></svg>,
        "ranked-category": <svg width="14" height="12" viewBox="0 0 16 12" fill="currentColor"><rect x="0" y="0" width="3" height="3" rx=".5"/><rect x="4.5" y=".5" width="11.5" height="2" rx=".5"/><rect x="0" y="4.5" width="3" height="3" rx=".5"/><rect x="4.5" y="5" width="9" height="2" rx=".5"/><rect x="0" y="9" width="3" height="3" rx=".5"/><rect x="4.5" y="9.5" width="6" height="2" rx=".5"/></svg>,
        "funnel-sales":    <svg width="14" height="12" viewBox="0 0 16 14" fill="currentColor"><path d="M0 0 H16 L11 5 H5 Z" fillOpacity=".9"/><path d="M5 6 H11 L9 10 H7 Z" fillOpacity=".65"/><path d="M7 11 H9 L8.5 14 H7.5 Z" fillOpacity=".4"/></svg>,
        "funnel-marketing":<svg width="14" height="12" viewBox="0 0 16 14" fill="currentColor"><path d="M0 0 H16 L11 5 H5 Z" fillOpacity=".9"/><path d="M5 6 H11 L9 10 H7 Z" fillOpacity=".65"/><path d="M7 11 H9 L8.5 14 H7.5 Z" fillOpacity=".4"/></svg>,
    }
    return <span className="text-muted-foreground flex items-center justify-center w-4 shrink-0">{map[id] ?? <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>}</span>
}

// ─── Grid & Cells SVG backgrounds ───────────────────────────────────────────

function buildGridLinesSvg(contentWidth: number, strokeColor: string): string {
    const [mx] = RGL_MARGIN
    const cellW = (contentWidth - (RGL_COLS - 1) * mx) / RGL_COLS
    const lines: string[] = []
    for (let i = 0; i <= RGL_COLS; i++) {
        const x = i * (cellW + mx) - mx / 2
        lines.push(`<line x1='${x}' y1='0' x2='${x}' y2='1' stroke='${strokeColor}' stroke-width='0.5'/>`)
    }
    return `url("data:image/svg+xml,${encodeURIComponent(
        `<svg xmlns='http://www.w3.org/2000/svg' width='${contentWidth}' height='1'>${lines.join("")}</svg>`
    )}")`
}

function buildCellsSvg(contentWidth: number, strokeColor: string): string {
    const [mx, my] = RGL_MARGIN
    const cellW = (contentWidth - (RGL_COLS - 1) * mx) / RGL_COLS
    const rowH = RGL_ROW_HEIGHT + my
    const rects = Array.from({ length: RGL_COLS }, (_, i) => {
        const x = i * (cellW + mx)
        return `<rect x='${x}' y='0' width='${cellW}' height='${RGL_ROW_HEIGHT}' rx='3' fill='none' stroke='${strokeColor}' stroke-width='1'/>`
    }).join("")
    return `url("data:image/svg+xml,${encodeURIComponent(
        `<svg xmlns='http://www.w3.org/2000/svg' width='${contentWidth}' height='${rowH}'>${rects}</svg>`
    )}")`
}

let _pendingDrop: { chartId: string; w: number; h: number } | null = null

// ─── Palette item ──────────────────────────────────────────────────────────────

function ChevronDownIcon({ open }: { open: boolean }) {
    return <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={cn("transition-transform duration-150", open ? "" : "-rotate-90")}><path d="M6 9l6 6 6-6"/></svg>
}

function SidebarItem({ chart, onAdd, themeStyle }: { chart: ChartPaletteEntry; onAdd: () => void; themeStyle: React.CSSProperties }) {
    const [showPreview, setShowPreview] = React.useState(false)
    const [pos, setPos] = React.useState<{ top: number; left: number } | null>(null)
    const eyeRef = React.useRef<HTMLButtonElement>(null)
    const Component = CHART_COMPONENTS[chart.id]

    function openPreview() {
        const rect = eyeRef.current?.getBoundingClientRect()
        if (!rect) return
        const top = Math.max(8, Math.min(rect.top - 80, window.innerHeight - 340))
        const left = rect.right + 12
        setPos({ top, left })
        setShowPreview(true)
    }

    return (
        <>
            <div
                draggable
                unselectable="on"
                onDragStart={(e) => {
                    e.dataTransfer.setData("text/plain", chart.id)
                    const sz = getDefaultSize(chart.id)
                    _pendingDrop = { chartId: chart.id, w: sz.w, h: sz.h }
                }}
                className="group relative flex items-center gap-2.5 rounded-md border border-border bg-background px-3 py-2 cursor-grab active:cursor-grabbing transition-opacity select-none"
            >
                <ComponentIcon id={chart.id} />
                <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium text-foreground leading-snug">{chart.name}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5 leading-tight truncate">{chart.description}</p>
                </div>
                <div className="shrink-0 flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-all">
                    {Component && (
                        <button ref={eyeRef}
                            onMouseEnter={openPreview}
                            onMouseLeave={() => setShowPreview(false)}
                            onClick={e => e.stopPropagation()}
                            className="flex h-5 w-5 items-center justify-center rounded border border-border text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-colors">
                            <EyeIcon />
                        </button>
                    )}
                    <button onClick={e => { e.stopPropagation(); onAdd() }}
                        className="flex h-5 w-5 items-center justify-center rounded border border-border text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-colors">
                        <PlusIcon />
                    </button>
                </div>
            </div>
            {showPreview && pos && Component && createPortal(
                <div className="fixed z-50 pointer-events-none" style={{ top: pos.top, left: pos.left }}>
                    <div className="w-[480px] rounded-xl border border-border bg-black p-10 shadow-2xl overflow-hidden">
                        <div className="[&>*:first-child]:!p-0 [&>*:first-child]:!rounded-lg" style={themeStyle}>
                            <Component />
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </>
    )
}

function PaletteSidebar({ onAdd, themeStyle, selectedIds }: { onAdd: (chartId: string) => void; themeStyle: React.CSSProperties; selectedIds: string[] }) {
    const [openSections, setOpenSections] = React.useState<Record<string, boolean>>(() =>
        Object.fromEntries(PALETTE_SECTIONS.map((s, i) => [s.title, i < 3]))
    )
    const [selectedOpen, setSelectedOpen] = React.useState(true)
    const toggle = (title: string) => setOpenSections(prev => ({ ...prev, [title]: !prev[title] }))

    const selectedGroups = React.useMemo(() => {
        if (selectedIds.length === 0) return []
        const groups: { title: string; items: PaletteEntry[] }[] = []
        for (const section of PALETTE_SECTIONS) {
            const matched = section.items.filter(item => selectedIds.includes(item.id))
            if (matched.length > 0) groups.push({ title: section.title, items: matched })
        }
        return groups
    }, [selectedIds])

    const totalSelected = selectedGroups.reduce((sum, g) => sum + g.items.length, 0)

    return (
        <aside className={cn("w-56 shrink-0 flex flex-col border-r border-border bg-card overflow-y-auto", "[&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[var(--border)]")}>
            <div className="px-4 py-3 border-b border-border shrink-0">
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">Gráficos</p>
                <p className="text-[10px] text-muted-foreground/50 mt-0.5">{CHART_PALETTE.length} disponíveis</p>
            </div>
            <div className="flex flex-col py-1">
                {totalSelected > 0 && (
                    <div className="mb-1">
                        <button
                            onClick={() => setSelectedOpen(prev => !prev)}
                            className="flex items-center gap-2 w-full px-4 py-2 text-left rounded-sm transition-colors border-primary bg-primary/10"
                        >
                            <ChevronDownIcon open={selectedOpen} />
                            <StarIcon />
                            <span className="text-[10px] font-semibold text-primary uppercase tracking-wider flex-1">Selecionados</span>
                            <span className="text-[9px] text-primary/60 tabular-nums">{totalSelected}</span>
                        </button>
                        {selectedOpen && (
                            <div className="px-2 pb-2">
                                {selectedGroups.map(group => (
                                    <div key={`sel-${group.title}`}>
                                        <p className="text-[10px] uppercase tracking-wider font-medium text-primary/70 px-2 pt-2 pb-1">{group.title}</p>
                                        <div className="flex flex-col gap-1">
                                            {group.items.map(chart => (
                                                <SidebarItem key={`sel-${chart.id}`} chart={chart} onAdd={() => onAdd(chart.id)} themeStyle={themeStyle} />
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                        <div className="mx-3 border-b border-primary/20" />
                    </div>
                )}

                {PALETTE_SECTIONS.map(section => (
                    <div key={section.title}>
                        <button
                            onClick={() => toggle(section.title)}
                            className="flex items-center gap-2 w-full px-4 py-2 text-left hover:bg-muted/50 transition-colors"
                        >
                            <ChevronDownIcon open={!!openSections[section.title]} />
                            <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider flex-1">{section.title}</span>
                            <span className="text-[9px] text-muted-foreground/40 tabular-nums">{section.items.length}</span>
                        </button>
                        {openSections[section.title] && (
                            <div className="flex flex-col gap-1 px-2 pb-2">
                                {section.items.map(chart => (
                                    <SidebarItem key={chart.id} chart={chart} onAdd={() => onAdd(chart.id)} themeStyle={themeStyle} />
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <div className="mt-auto border-t border-border px-4 py-3">
                <p className="text-[10px] text-muted-foreground leading-relaxed">Arraste para o canvas ou clique em <strong>+</strong></p>
            </div>
        </aside>
    )
}

// ─── Canvas card (RGL child) ────────────────────────────────────────────────

function RGLCanvasCard({ item, onRemove }: { item: CanvasItem; onRemove: () => void }) {
    const Component = CHART_COMPONENTS[item.chartId]
    const totalPx = item.h * RGL_ROW_HEIGHT + (item.h - 1) * RGL_MARGIN[1]
    const chartHeight = Math.max(80, totalPx - CARD_OVERHEAD)

    return (
        <div className="relative group h-full">
            <div className="card-inner [&>*:first-child]:!p-0">
                {Component && React.createElement(
                    Component as React.ComponentType<{ chartHeight?: number }>,
                    { chartHeight }
                )}
            </div>

            <div className="absolute top-3 right-8 z-20 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                <div className="card-drag-handle flex h-6 w-6 items-center justify-center rounded bg-card/90 backdrop-blur-sm border border-border/60 cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground shadow-sm pointer-events-auto">
                    <GripIcon />
                </div>
                <span className="flex h-6 items-center px-1.5 rounded bg-card/90 backdrop-blur-sm border border-border/60 text-[10px] tabular-nums text-muted-foreground shadow-sm select-none">
                    {item.w}&times;{item.h}
                </span>
                <button onClick={onRemove}
                    className="flex h-6 w-6 items-center justify-center rounded bg-card/90 backdrop-blur-sm border border-border/60 text-muted-foreground hover:text-foreground shadow-sm transition-colors pointer-events-auto"
                    title="Remover">
                    <XIcon />
                </button>
            </div>
        </div>
    )
}

// ─── Preview card (RGL child, no controls) ──────────────────────────────────

function RGLPreviewCard({ item }: { item: CanvasItem }) {
    const Component = CHART_COMPONENTS[item.chartId]
    const totalPx = item.h * RGL_ROW_HEIGHT + (item.h - 1) * RGL_MARGIN[1]
    const chartHeight = Math.max(80, totalPx - CARD_OVERHEAD)

    return (
        <div className="relative h-full">
            <div className="card-inner [&>*:first-child]:!p-0">
                {Component && React.createElement(
                    Component as React.ComponentType<{ chartHeight?: number }>,
                    { chartHeight }
                )}
            </div>
        </div>
    )
}

// ─── Tab bar ─────────────────────────────────────────────────────────────────

function TabBar({
    pages, activePageId, dispatch, readOnly,
}: {
    pages: Page[]
    activePageId: PageId
    dispatch: React.Dispatch<BuilderAction>
    readOnly?: boolean
}) {
    const [editingId, setEditingId] = React.useState<PageId | null>(null)
    const [editValue, setEditValue] = React.useState("")
    const inputRef = React.useRef<HTMLInputElement>(null)

    function startRename(page: Page) {
        if (readOnly) return
        setEditingId(page.id)
        setEditValue(page.label)
        setTimeout(() => inputRef.current?.select(), 0)
    }

    function commitRename() {
        if (editingId && editValue.trim()) {
            dispatch({ type: "RENAME_PAGE", pageId: editingId, label: editValue.trim() })
        }
        setEditingId(null)
    }

    return (
        <div className="shrink-0 flex items-center border-b border-border bg-card/40 px-4 h-9 gap-1 overflow-x-auto">
            {pages.map(page => (
                <button
                    key={page.id}
                    onClick={() => dispatch({ type: "SET_ACTIVE_PAGE", pageId: page.id })}
                    onDoubleClick={() => startRename(page)}
                    className={cn(
                        "group relative flex items-center gap-1.5 px-3 h-full text-xs transition-colors shrink-0",
                        page.id === activePageId
                            ? "border-b-2 border-primary text-primary font-medium"
                            : "text-muted-foreground hover:text-foreground",
                    )}
                >
                    {editingId === page.id ? (
                        <input
                            ref={inputRef}
                            value={editValue}
                            onChange={e => setEditValue(e.target.value)}
                            onBlur={commitRename}
                            onKeyDown={e => {
                                if (e.key === "Enter") commitRename()
                                if (e.key === "Escape") setEditingId(null)
                            }}
                            className="w-20 bg-transparent border-b border-primary text-xs outline-none"
                            autoFocus
                        />
                    ) : (
                        <span>{page.label}</span>
                    )}
                    {!readOnly && pages.length > 1 && (
                        <span
                            onClick={e => {
                                e.stopPropagation()
                                dispatch({ type: "REMOVE_PAGE", pageId: page.id })
                            }}
                            className="ml-0.5 opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-foreground transition-opacity cursor-pointer"
                        >
                            <XIcon />
                        </span>
                    )}
                </button>
            ))}
            {!readOnly && (
                <button
                    onClick={() => dispatch({ type: "ADD_PAGE" })}
                    className="flex items-center justify-center h-6 w-6 rounded text-muted-foreground hover:text-foreground hover:bg-muted transition-colors shrink-0 ml-1"
                    title="Adicionar aba"
                >
                    <PlusIcon />
                </button>
            )}
        </div>
    )
}

// ─── Main page ─────────────────────────────────────────────────────────────────

export default function DashboardBuilderPage() {
    const params = useParams<{ slug: string; id: string }>()
    const { loadDashboard, saveDashboard, flushSave } = useData()
    const [saved, setSaved] = React.useState<SavedData | null>(null)
    const [loading, setLoading] = React.useState(true)
    const dashboardIdRef = React.useRef(params.id)

    React.useEffect(() => {
        dashboardIdRef.current = params.id
        loadDashboard(params.id).then(dash => {
            if (dash?.data?.builder) {
                const builder = migrateState(dash.data.builder as unknown as Record<string, unknown>)
                setSaved({ builder, ui: dash.data.ui })
            }
            setLoading(false)
        })
    }, [params.id, loadDashboard])

    React.useEffect(() => () => { flushSave() }, [flushSave])

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-muted-foreground border-t-transparent" />
            </div>
        )
    }

    return (
        <DashboardBuilderInner
            initialData={saved}
            dashboardId={dashboardIdRef.current}
            workspaceSlug={params.slug}
            onSave={(data: DashboardData) => saveDashboard(dashboardIdRef.current, data)}
            flushSave={flushSave}
        />
    )
}

// ─── Mini input helper (must be outside component to keep stable reference) ──
function NumInput({ value, onChange, min = 0, max = 999, step = 4, w = "w-14" }: { value: number; onChange: (v: number) => void; min?: number; max?: number; step?: number; w?: string }) {
    const [draft, setDraft] = React.useState(String(value))
    const prevValue = React.useRef(value)
    if (prevValue.current !== value) { prevValue.current = value; setDraft(String(value)) }
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const raw = e.target.value
        setDraft(raw)
        const n = Number(raw)
        if (raw !== "" && !isNaN(n)) {
            onChange(Math.max(min, Math.min(max, n)))
        }
    }
    function commit() {
        const n = Number(draft)
        if (draft === "" || isNaN(n)) { setDraft(String(value)); return }
        const clamped = Math.max(min, Math.min(max, n))
        onChange(clamped)
        setDraft(String(clamped))
    }
    return <input type="number" min={min} max={max} step={step} value={draft}
        onChange={handleChange}
        onBlur={commit}
        onKeyDown={e => { if (e.key === "Enter") { commit(); (e.target as HTMLInputElement).blur() } }}
        className={cn("h-5 rounded border border-border bg-background px-1.5 text-[10px] text-foreground text-center", w)} />
}

function DashboardBuilderInner({
    initialData, dashboardId, workspaceSlug, onSave, flushSave,
}: {
    initialData: SavedData | null
    dashboardId: string
    workspaceSlug: string
    onSave: (data: DashboardData) => void
    flushSave: () => Promise<void>
}) {
    const saved = initialData

    const [history, historyDispatch] = React.useReducer(historyReducer, undefined, (): HistoryState => ({
        current: saved?.builder ?? createInitialState(),
        past: [],
        future: [],
    }))
    const state = history.current
    const dispatch = historyDispatch as React.Dispatch<BuilderAction>
    const activePage = state.pages.find(p => p.id === state.activePageId) ?? state.pages[0]
    const canvasItems = activePage.canvasItems
    const canUndo = history.past.length > 0
    const canRedo = history.future.length > 0

    // ── Transient UI state ───────────────────────────────────────────────────
    const [shareCopied,        setShareCopied]        = React.useState(false)
    const [activeTheme,        setActiveTheme]        = React.useState(saved?.ui.activeTheme ?? "Light")
    const [previewMode,        setPreviewMode]        = React.useState(false)

    const totalComponents = canvasItems.length
    const allComponents = state.pages.reduce((sum, p) => sum + p.canvasItems.length, 0)

    React.useEffect(() => {
        forceBuilderDark()
        function onInspected(e: Event) {
            const detail = (e as CustomEvent).detail
            if (detail?.themeName) setActiveTheme(detail.themeName)
            forceBuilderDark()
        }
        window.addEventListener("theme-inspected", onInspected)
        return () => window.removeEventListener("theme-inspected", onInspected)
    }, [])

    React.useEffect(() => {
        function handler(e: KeyboardEvent) {
            if ((e.ctrlKey || e.metaKey) && e.key === "z") {
                e.preventDefault()
                historyDispatch({ type: e.shiftKey ? "REDO" : "UNDO" })
            }
        }
        document.addEventListener("keydown", handler)
        return () => document.removeEventListener("keydown", handler)
    }, [])

    React.useEffect(() => {
        if (!previewMode) return
        const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setPreviewMode(false) }
        document.addEventListener("keydown", handler)
        return () => document.removeEventListener("keydown", handler)
    }, [previewMode])

    // Selected components (synced from styleguide)
    const [selectedIds, setSelectedIds] = React.useState<string[]>(() => getSelectedComponents())
    React.useEffect(() => {
        function handleFocus() { setSelectedIds(getSelectedComponents()) }
        window.addEventListener("focus", handleFocus)
        return () => window.removeEventListener("focus", handleFocus)
    }, [])

    // Grid & Cells
    const [showGrid,    setShowGrid]    = React.useState(false)
    const [showCells,   setShowCells]   = React.useState(false)
    const [gridOpacity, setGridOpacity] = React.useState(saved?.ui.gridOpacity ?? 20)

    // Compactor
    const [useCompactor, setUseCompactor] = React.useState(saved?.ui.useCompactor ?? true)

    // Content margins
    const [padV, setPadV] = React.useState(saved?.ui.padV ?? 24)
    const [padH, setPadH] = React.useState(saved?.ui.padH ?? 24)

    // Content min-height (free positioning)
    const [contentMinHeight, setContentMinHeight] = React.useState(saved?.ui.contentMinHeight ?? 0)

    // Device / frame
    const [deviceId, setDeviceId] = React.useState<DeviceId>((saved?.ui.deviceId as DeviceId) ?? "desktop")
    const [contentWidth, setContentWidth] = React.useState(saved?.ui.contentWidth ?? 0)
    const devicePresetWidth = DEVICE_PRESETS.find(d => d.id === deviceId)?.width ?? 0
    const frameWidth = contentWidth > 0 ? contentWidth : devicePresetWidth

    function handleDeviceSelect(id: DeviceId) {
        setDeviceId(id)
        setContentWidth(DEVICE_PRESETS.find(d => d.id === id)?.width ?? 0)
    }

    // ── Auto-save via adapter (debounced inside DataProvider) ──────────────
    React.useEffect(() => {
        onSave({
            builder: state,
            ui: {
                activeTheme,
                showNavbar: false, showSidebar: false, mockSidebarOpen: false, mockSidebarWidth: 192,
                gridOpacity, padV, padH, deviceId, useCompactor, contentMinHeight, contentWidth,
            },
        })
    }, [state, activeTheme, gridOpacity, padV, padH, deviceId, useCompactor, contentMinHeight, contentWidth, onSave])

    // Container width for RGL
    const contentRef = React.useRef<HTMLDivElement>(null)
    const roRef = React.useRef<ResizeObserver | null>(null)
    const [containerWidth, setContainerWidth] = React.useState(900)
    const setContentRef = React.useCallback((el: HTMLDivElement | null) => {
        if (roRef.current) roRef.current.disconnect()
        contentRef.current = el
        if (el) {
            roRef.current = new ResizeObserver(([e]) => setContainerWidth(e.contentRect.width))
            roRef.current.observe(el)
        }
    }, [])
    React.useEffect(() => () => { roRef.current?.disconnect() }, [])

    const rglLayout: RGLLayout = React.useMemo(
        () => canvasItems.map(item => cloneLayoutItem({ i: item.instanceId, x: item.x, y: item.y, w: item.w, h: item.h })),
        [canvasItems],
    )

    const droppingItem: LayoutItem = React.useMemo(
        () => ({ i: "__dropping__", x: 0, y: 0, w: _pendingDrop?.w ?? 6, h: _pendingDrop?.h ?? 4 }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [_pendingDrop?.w, _pendingDrop?.h],
    )

    const rglGridConfig = React.useMemo(
        () => ({ cols: RGL_COLS, rowHeight: RGL_ROW_HEIGHT, margin: RGL_MARGIN, containerPadding: [0, 0] as [number, number], maxRows: Infinity }),
        [],
    )
    const rglDragConfig = React.useMemo(
        () => ({ enabled: true, bounded: false, handle: ".card-drag-handle", threshold: 3 }),
        [],
    )
    const rglDragDisabled = React.useMemo(
        () => ({ enabled: false, bounded: false, threshold: 3 }),
        [],
    )
    const rglResizeConfig = React.useMemo(
        () => ({ enabled: true, handles: ["se"] as const }),
        [],
    )
    const rglResizeDisabled = React.useMemo(
        () => ({ enabled: false, handles: ["se"] as const }),
        [],
    )
    const rglDropConfig = React.useMemo(
        () => ({ enabled: true, defaultItem: { w: droppingItem.w, h: droppingItem.h } }),
        [droppingItem.w, droppingItem.h],
    )
    const rglCompactor = React.useMemo(
        () => useCompactor ? verticalCompactor : noCompactor,
        [useCompactor],
    )
    const rglStyle = React.useMemo(
        () => contentMinHeight > 0 ? { minHeight: contentMinHeight } : undefined,
        [contentMinHeight],
    )

    const contentWrapperStyle = React.useMemo(() => {
        const s: React.CSSProperties = {
            padding: `${padV}px ${padH}px`,
        }
        const stroke = `oklch(0.62 0.22 284 / ${gridOpacity}%)`
        const layers: string[] = []
        if (showGrid && containerWidth > 0) layers.push(buildGridLinesSvg(containerWidth, stroke))
        if (showCells && containerWidth > 0) layers.push(buildCellsSvg(containerWidth, stroke))
        if (layers.length > 0) {
            s.backgroundImage = layers.join(", ")
            s.backgroundRepeat = "repeat-y"
            s.backgroundOrigin = "content-box"
            s.backgroundClip = "content-box"
            s.backgroundAttachment = "local"
        }
        return s
    }, [padV, padH, gridOpacity, showGrid, showCells, containerWidth])

    const themeStyle = React.useMemo(() => {
        if (activeTheme === "Custom") {
            try {
                const raw = localStorage.getItem("styleguide_inspected_vars")
                if (raw) return JSON.parse(raw) as React.CSSProperties
            } catch { /* ignore */ }
        }
        return getThemeVars(activeTheme) as React.CSSProperties
    }, [activeTheme])

    function handleThemeChange(name: string) {
        setActiveTheme(name)
    }

    function addChart(chartId: string) {
        const entry = CHART_PALETTE.find(c => c.id === chartId); if (!entry) return
        const { w, h } = getDefaultSize(chartId)
        const y = canvasItems.reduce((max, item) => Math.max(max, item.y + item.h), 0)
        dispatch({ type: "ADD_ITEM", item: {
            instanceId: newId(), chartId: entry.id, name: entry.name,
            description: entry.description, importStatement: entry.importStatement,
            dataType: entry.dataType, x: 0, y, w, h,
        }})
    }

    function removeItem(instanceId: string) { dispatch({ type: "REMOVE_ITEM", instanceId }) }

    const handleDragStop = React.useCallback(
        (layout: RGLLayout) => {
            dispatch({ type: "UPDATE_LAYOUT", layout: layout.map(l => ({ i: l.i, x: l.x, y: l.y, w: l.w, h: l.h })) })
        }, [],
    )
    const handleResizeStop = React.useCallback(
        (layout: RGLLayout) => {
            dispatch({ type: "UPDATE_LAYOUT", layout: layout.map(l => ({ i: l.i, x: l.x, y: l.y, w: l.w, h: l.h })) })
        }, [],
    )

    const handleDrop = React.useCallback((_layout: RGLLayout, layoutItem: LayoutItem | undefined, e: Event) => {
        if (!layoutItem) return
        const chartId = (e as DragEvent).dataTransfer?.getData("text/plain")
        if (!chartId) return
        const entry = CHART_PALETTE.find(c => c.id === chartId)
        if (!entry) return
        dispatch({ type: "ADD_ITEM", item: {
            instanceId: newId(), chartId, name: entry.name,
            description: entry.description, importStatement: entry.importStatement,
            dataType: entry.dataType,
            x: layoutItem.x, y: layoutItem.y,
            w: layoutItem.w, h: layoutItem.h,
        }})
        const positionUpdates = _layout
            .filter(l => l.i !== "__dropping-elem__" && l.i !== "__dropping__")
            .map(l => ({ i: l.i, x: l.x, y: l.y, w: l.w, h: l.h }))
        if (positionUpdates.length > 0) {
            dispatch({ type: "UPDATE_LAYOUT", layout: positionUpdates })
        }
        _pendingDrop = null
    }, [])

    const handleDropDragOver = React.useCallback((_e: React.DragEvent) => {
        if (!_pendingDrop) return undefined
        return { w: _pendingDrop.w, h: _pendingDrop.h }
    }, [])

    // ─── Height drag handle ─────────────────────────────────────────────────────
    const startHeightDrag = React.useCallback((e: React.PointerEvent) => {
        e.preventDefault()
        const startY = e.clientY
        const startH = contentMinHeight || (contentRef.current?.scrollHeight ?? 0)
        const onMove = (ev: PointerEvent) => {
            const delta = ev.clientY - startY
            setContentMinHeight(Math.max(0, Math.round((startH + delta) / 60) * 60))
        }
        const onUp = () => { window.removeEventListener("pointermove", onMove); window.removeEventListener("pointerup", onUp) }
        window.addEventListener("pointermove", onMove)
        window.addEventListener("pointerup", onUp)
    }, [contentMinHeight])

    // ── Preview Mode ──────────────────────────────────────────────────────────
    if (previewMode) {
        return (
            <div className="flex h-screen flex-col overflow-hidden bg-muted/30" style={themeStyle as React.CSSProperties}>
                <div className="flex-1 overflow-y-auto flex justify-center">
                    <div
                        className={cn("bg-background min-h-full flex flex-col", frameWidth > 0 ? "border-x border-border" : "w-full")}
                        style={{ ...(frameWidth > 0 ? { width: frameWidth } : {}) }}
                    >
                        {state.pages.length > 1 && (
                            <TabBar pages={state.pages} activePageId={state.activePageId} dispatch={dispatch} readOnly />
                        )}
                        <div
                            ref={setContentRef}
                            className={cn("flex-1 min-w-0", "[&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[var(--border)]")}
                            style={{ padding: `${padV}px ${padH}px` }}
                        >
                            <ReactGridLayout
                                width={containerWidth}
                                layout={rglLayout}
                                gridConfig={rglGridConfig}
                                dragConfig={rglDragDisabled}
                                resizeConfig={rglResizeDisabled}
                                compactor={rglCompactor}
                                style={rglStyle}
                            >
                                {canvasItems.map(item => (
                                    <div key={item.instanceId} className="h-full">
                                        <RGLPreviewCard item={item} />
                                    </div>
                                ))}
                            </ReactGridLayout>
                        </div>
                    </div>
                </div>

                <button
                    onClick={() => setPreviewMode(false)}
                    className="fixed top-4 right-4 z-50 flex items-center gap-2 px-3 py-2 rounded-lg bg-card/80 backdrop-blur-sm border border-border shadow-lg text-xs text-muted-foreground hover:text-foreground hover:bg-card transition-all opacity-40 hover:opacity-100"
                    title="Sair do Preview (Esc)"
                >
                    <ExitFullscreenIcon />
                    <span>Sair</span>
                </button>
            </div>
        )
    }

    return (
        <div className="flex h-screen flex-col overflow-hidden bg-background text-foreground">

            {/* ── Header ─────────────────────────────────────────────────────── */}
            <header className="shrink-0 flex items-center gap-4 border-b border-border bg-card px-6 h-12">
                <div className="flex items-center gap-3 shrink-0">
                    <span className="text-sm font-semibold tracking-tight">OpenDash</span>
                    <span className="rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-medium text-primary leading-none">Beta</span>
                    <div className="h-4 w-px bg-border" />
                    <button onClick={() => historyDispatch({ type: "UNDO" })} disabled={!canUndo} title="Desfazer (Ctrl+Z)"
                        className={cn("flex h-6 w-6 items-center justify-center rounded transition-colors", canUndo ? "text-muted-foreground hover:text-foreground hover:bg-muted" : "text-muted-foreground/25 cursor-not-allowed")}>
                        <UndoIcon />
                    </button>
                    <button onClick={() => historyDispatch({ type: "REDO" })} disabled={!canRedo} title="Refazer (Ctrl+Shift+Z)"
                        className={cn("flex h-6 w-6 items-center justify-center rounded transition-colors", canRedo ? "text-muted-foreground hover:text-foreground hover:bg-muted" : "text-muted-foreground/25 cursor-not-allowed")}>
                        <RedoIcon />
                    </button>
                </div>
                <div className="flex-1" />
                <div className="flex items-center gap-3 shrink-0">
                    <Link href={`/w/${workspaceSlug}`}
                        className="flex items-center gap-1.5 rounded border border-border px-3 py-1 text-xs font-medium text-muted-foreground transition-colors hover:border-primary hover:text-primary">
                        <BackIcon /> Projetos
                    </Link>
                    <button onClick={() => setPreviewMode(true)} disabled={allComponents === 0}
                        className={cn("flex items-center gap-1.5 rounded border px-3 py-1 text-xs font-medium transition-colors",
                            allComponents === 0 ? "border-border text-muted-foreground/40 cursor-not-allowed"
                            : "border-primary bg-primary/10 text-primary hover:bg-primary/20")}>
                        <PlayIcon /> Preview
                    </button>
                    <button
                        onClick={async () => {
                            await flushSave()
                            const url = `${window.location.origin}/view/${dashboardId}`
                            await navigator.clipboard.writeText(url)
                            setShareCopied(true)
                            setTimeout(() => setShareCopied(false), 2000)
                        }}
                        disabled={allComponents === 0}
                        className={cn("flex items-center gap-1.5 rounded border px-3 py-1 text-xs font-medium transition-colors",
                            allComponents === 0 ? "border-border text-muted-foreground/40 cursor-not-allowed"
                            : shareCopied ? "border-primary bg-primary/10 text-primary"
                            : "border-border text-muted-foreground hover:border-primary hover:text-primary")}
                    >
                        <ShareIcon /> {shareCopied ? "Link copiado!" : "Compartilhar"}
                    </button>
                </div>
            </header>

            {/* ── Controls bar ────────────────────────────────────────────────── */}
            <div className="shrink-0 flex items-center border-b border-border bg-card/60 px-4 h-9 text-xs gap-1 overflow-x-auto">

                {/* Grid & Cells */}
                <div className="flex items-center gap-2 pr-3 shrink-0">
                    <button onClick={() => setShowGrid(v => !v)} className={cn("flex items-center gap-1.5 transition-colors", showGrid ? "text-primary" : "text-muted-foreground hover:text-foreground")}>
                        <GridIcon /> Grid
                    </button>
                    <button onClick={() => setShowCells(v => !v)} className={cn("flex items-center gap-1.5 transition-colors", showCells ? "text-primary" : "text-muted-foreground hover:text-foreground")}>
                        <CellsIcon /> Cells
                    </button>
                    <span className="text-muted-foreground/40 text-[10px]">{RGL_COLS}col</span>
                    {(showGrid || showCells) && <>
                        <span className="text-muted-foreground/40">·</span>
                        <input type="range" min={5} max={60} value={gridOpacity} onChange={e => setGridOpacity(Number(e.target.value))} className="w-12 h-1 accent-primary" />
                        <span className="w-7 text-muted-foreground tabular-nums">{gridOpacity}%</span>
                    </>}
                </div>

                {/* Compactor */}
                <button onClick={() => setUseCompactor((v: boolean) => !v)} className={cn("flex items-center gap-1.5 transition-colors shrink-0 px-2", useCompactor ? "text-primary" : "text-muted-foreground hover:text-foreground")}>
                    <CompactIcon /> Compactar
                </button>

                <div className="h-4 w-px bg-border mx-1 shrink-0" />

                {/* Margins */}
                <div className="flex items-center gap-2 px-2 shrink-0">
                    <span className="text-muted-foreground">Margem</span>
                    <span className="text-muted-foreground/60 text-[10px]">V</span>
                    <NumInput value={padV} onChange={setPadV} min={0} max={120} step={4} w="w-12" />
                    <span className="text-muted-foreground/60 text-[10px]">H</span>
                    <NumInput value={padH} onChange={setPadH} min={0} max={120} step={4} w="w-12" />
                    <span className="text-muted-foreground/60">px</span>
                </div>

                {/* Content height */}
                <div className="flex items-center gap-2 px-2 shrink-0">
                    <span className="text-muted-foreground">Altura</span>
                    <NumInput value={contentMinHeight} onChange={setContentMinHeight} min={0} max={5000} step={60} w="w-14" />
                    <span className="text-muted-foreground/60">px</span>
                </div>

                <div className="h-4 w-px bg-border mx-1 shrink-0" />

                {/* Theme */}
                <div className="flex items-center gap-1.5 px-2 shrink-0">
                    {ALL_THEMES.map(name => (
                        <button key={name} title={name} onClick={() => handleThemeChange(name)}
                            className={cn("h-3.5 w-3.5 rounded-full border transition-all", activeTheme === name ? "scale-125 ring-2 ring-offset-1 ring-offset-card ring-primary border-transparent" : "border-border/50 opacity-70 hover:opacity-100 hover:scale-110")}
                            style={{ background: THEME_SWATCHES[name] }} />
                    ))}
                </div>

                <div className="h-4 w-px bg-border mx-1 shrink-0" />

                {/* Device */}
                <DeviceDropdown deviceId={deviceId} onSelect={handleDeviceSelect} />

                <div className="h-4 w-px bg-border mx-1 shrink-0" />

                {/* Content width */}
                <div className="flex items-center gap-1.5 shrink-0">
                    <span className="text-[11px] text-muted-foreground">Largura</span>
                    <NumInput value={contentWidth} onChange={setContentWidth} min={0} max={3000} step={10} w="w-16" />
                    <span className="text-[11px] text-muted-foreground/60">px</span>
                </div>
            </div>

            {/* ── Builder body ────────────────────────────────────────────────── */}
            <div className="relative flex flex-1 overflow-hidden">

                {/* Component palette */}
                <PaletteSidebar onAdd={addChart} themeStyle={themeStyle} selectedIds={selectedIds} />

                {/* Stage */}
                <div className="flex-1 overflow-hidden flex flex-col p-8 gap-4 bg-white/[.02] [background-image:radial-gradient(oklch(1_0_0/0.12)_0.75px,transparent_0.75px)] [background-size:16px_16px]">
                    {(() => {
                        const screenContent = (
                            <div ref={setContentRef} className={cn("flex-1 min-w-0 overflow-y-auto", "[&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[var(--border)]")} style={contentWrapperStyle}>
                                {canvasItems.length === 0 ? (
                                    <div className="flex flex-col flex-1 min-h-96">
                                        <div className="flex flex-col items-center justify-center flex-1 w-full rounded-lg border-[3px] border-dashed border-border/50">
                                            <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-muted text-muted-foreground"><GridIcon /></div>
                                            <p className="text-sm font-medium text-muted-foreground">Comece o layout</p>
                                            <p className="mt-1 text-xs text-muted-foreground/50">Arraste gráficos da sidebar ou clique em <span className="inline-flex items-center"><PlusIcon /></span></p>
                                        </div>
                                    </div>
                                ) : (<>
                                    <ReactGridLayout
                                        width={containerWidth}
                                        layout={rglLayout}
                                        gridConfig={rglGridConfig}
                                        dragConfig={rglDragConfig}
                                        resizeConfig={rglResizeConfig}
                                        dropConfig={rglDropConfig}
                                        droppingItem={droppingItem}
                                        compactor={rglCompactor}
                                        style={rglStyle}
                                        onDragStop={handleDragStop}
                                        onResizeStop={handleResizeStop}
                                        onDrop={handleDrop}
                                        onDropDragOver={handleDropDragOver}
                                    >
                                        {canvasItems.map(item => (
                                            <div key={item.instanceId} className="h-full">
                                                <RGLCanvasCard
                                                    item={item}
                                                    onRemove={() => removeItem(item.instanceId)}
                                                />
                                            </div>
                                        ))}
                                    </ReactGridLayout>
                                    {!useCompactor && (
                                        <div
                                            className="mx-auto mt-2 mb-4 flex h-3 w-24 cursor-row-resize items-center justify-center rounded-full bg-border/50 hover:bg-border transition-colors"
                                            onPointerDown={startHeightDrag}
                                        >
                                            <div className="h-px w-10 bg-muted-foreground/30" />
                                        </div>
                                    )}
                                </>)}
                            </div>
                        )

                        const tabBar = (
                            <TabBar pages={state.pages} activePageId={state.activePageId} dispatch={dispatch} />
                        )

                        if (frameWidth > 0) {
                            return (
                                <div
                                    className="flex-1 min-h-0 mx-auto bg-background overflow-hidden flex flex-col rounded-xl border border-border shadow-lg"
                                    style={{ ...themeStyle, width: frameWidth }}
                                >
                                    {tabBar}
                                    {screenContent}
                                </div>
                            )
                        }

                        return (
                            <div
                                className="flex-1 min-h-0 mx-auto bg-background overflow-hidden flex flex-col border border-border shadow-lg"
                                style={{ ...themeStyle, width: "100%" }}
                            >
                                {tabBar}
                                {screenContent}
                            </div>
                        )
                    })()}

                </div>
            </div>
        </div>
    )
}
