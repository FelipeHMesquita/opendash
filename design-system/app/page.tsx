"use client"

import * as React from "react"
import Link from "next/link"
import {
    DndContext, DragOverlay, PointerSensor, useSensor, useSensors,
    useDroppable, useDraggable, type DragStartEvent, type DragEndEvent, type DragOverEvent,
} from "@dnd-kit/core"
import { SortableContext, useSortable, rectSortingStrategy, arrayMove } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { cn } from "@/lib/utils"
import { themes, type ThemeName, ALL_THEMES, THEME_SWATCHES } from "./styleguide/_themes"
import { ColumnChart, ColumnChartV2 } from "@/componentsSugest/charts/ColumnChart"
import { HorizontalBarChart } from "@/componentsSugest/charts/HorizontalBarChart"
import { AreaChart } from "@/componentsSugest/charts/AreaChart"
import { LineChart } from "@/componentsSugest/charts/LineChart"
import { DonutChart } from "@/componentsSugest/charts/DonutChart"
import { RankedList } from "@/componentsSugest/charts/RankedList"
import { FunnelChart } from "@/componentsSugest/charts/FunnelChart"
import { DashCardList } from "@/componentsSugest/DashCardList"
import { DataTable } from "@/componentsSugest/DataTable"
import { StatCardDemo } from "@/componentsSugest/StatCard"
import { ChartCard } from "@/componentsSugest/ChartCard"
import { KanbanBoard } from "@/componentsSugest/KanbanBoard"
import { ActivityFeed } from "@/componentsSugest/ActivityFeed"
import { CommandPalette } from "@/componentsSugest/CommandPalette"
import { EmptyState } from "@/componentsSugest/EmptyState"
import { FormPage } from "@/componentsSugest/FormPage"
import { TeamPage } from "@/componentsSugest/TeamPage"
import { UsersTable } from "@/componentsSugest/UsersTable"
import { Navbar as NavbarComponent } from "@/componentsSugest/Navbar"
import { SidebarOpen } from "@/componentsSugest/SidebarOpen"
import { LoginPage } from "@/componentsSugest/LoginPage"
import { SignUpPage } from "@/componentsSugest/SignUpPage"
import { OnboardingPage } from "@/componentsSugest/OnboardingPage"
import { SettingsPage } from "@/componentsSugest/SettingsPage"
import { AccountSettings } from "@/componentsSugest/AccountSettings"
import { GeneralSettings } from "@/componentsSugest/GeneralSettings"
import { BillingPage } from "@/componentsSugest/BillingPage"
import { NotificationsPage } from "@/componentsSugest/NotificationsPage"
import { ErrorPage } from "@/componentsSugest/ErrorPage"
import {
    CARD_OVERHEAD, DEVICE_PRESETS, type DeviceId,
    PALETTE_SECTIONS, CHART_PALETTE, type ChartPaletteEntry, type PaletteEntry,
    isLayoutComponent, MOCK_NAVBAR_ITEMS, MOCK_SIDEBAR_ITEMS,
    type CanvasItem, type Page, type NavLink, type PageId,
    computeRows, snapColSpan, snapHeight, newId, newPageId,
    builderReducer, createInitialState, type BuilderAction,
    buildTree, flattenTree,
} from "./_builder-state"
import { PageConfigSidebar } from "./_page-config-sidebar"
import { generateExportText as generateExportTextFull, type ExportParams } from "./_export-generator"
import { ThemeInspectorButton } from "./styleguide/_theme-inspector"

// ─── Persistence ──────────────────────────────────────────────────────────────

const BUILDER_STORAGE_KEY = "builder_project"

interface PersistedState {
    builder: import("./_builder-state").BuilderState
    ui: {
        activeTheme: string; globalVariantLabel: string
        showNavbar: boolean; showSidebar: boolean; mockSidebarOpen: boolean; mockSidebarWidth: number
        gridCols: number; gridGap: number; gridOpacity: number; padV: number; padH: number
        deviceId: DeviceId
    }
}

function loadPersisted(): PersistedState | null {
    if (typeof window === "undefined") return null
    try {
        const raw = localStorage.getItem(BUILDER_STORAGE_KEY)
        if (!raw) return null
        return JSON.parse(raw) as PersistedState
    } catch { return null }
}

function savePersisted(data: PersistedState) {
    try { localStorage.setItem(BUILDER_STORAGE_KEY, JSON.stringify(data)) } catch { /* quota */ }
}

// ─── Undo / Redo history wrapper ──────────────────────────────────────────────

const HISTORY_LIMIT = 50
// Actions that should NOT create a history entry (pure navigation, no data change)
const SKIP_HISTORY: Set<string> = new Set(["SET_ACTIVE_PAGE"])

interface HistoryState {
    current: import("./_builder-state").BuilderState
    past: import("./_builder-state").BuilderState[]
    future: import("./_builder-state").BuilderState[]
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
    if (SKIP_HISTORY.has(action.type)) return { ...history, current: next }
    return {
        current: next,
        past: [...history.past.slice(-HISTORY_LIMIT + 1), history.current],
        future: [],
    }
}

// ─── Variants (component references stay here — can't be in pure module) ─────

type VariantEntry = { label: string; component: React.ComponentType; importStatement?: string }
const CHART_VARIANTS_LOCAL: Record<string, VariantEntry[]> = {
    "column-chart": [
        { label: "Default",       component: ColumnChart },
        { label: "Typography v2", component: ColumnChartV2, importStatement: 'import { ColumnChartV2 } from "@/componentsSugest/charts/ColumnChart"' },
    ],
}
const ALL_VARIANT_LABELS: string[] = Array.from(new Set(Object.values(CHART_VARIANTS_LOCAL).flatMap(vs => vs.map(v => v.label))))
// ─── Component map (React refs stay in client module) ──────────────────────
const CHART_COMPONENTS: Record<string, React.ComponentType> = {
    "column-chart": ColumnChart, "bar-chart": HorizontalBarChart, "area-chart": AreaChart,
    "line-chart": LineChart, "pie-chart": DonutChart, "ranked-list": RankedList, "funnel-chart": FunnelChart,
    "dash-card-list": DashCardList, "stat-cards": StatCardDemo, "chart-card": ChartCard,
    "data-table": DataTable, "users-table": UsersTable,
    "navbar-comp": NavbarComponent, "sidebar-comp": SidebarOpen,
    "kanban-board": KanbanBoard, "activity-feed": ActivityFeed, "command-palette": CommandPalette, "empty-state": EmptyState,
    "form-page": FormPage, "team-page": TeamPage,
    "login-page": LoginPage, "signup-page": SignUpPage, "onboarding-page": OnboardingPage,
    "settings-page": SettingsPage, "account-settings": AccountSettings, "general-settings": GeneralSettings,
    "billing-page": BillingPage, "notifications-page": NotificationsPage, "error-page": ErrorPage,
}

// ─── Theme helper ──────────────────────────────────────────────────────────────

function applyTheme(name: string) {
    const vars = name !== "Custom" && (ALL_THEMES as string[]).includes(name)
        ? themes[name as Exclude<ThemeName, "Custom">] : null
    if (!vars) return
    Object.entries(vars).forEach(([k, v]) => document.documentElement.style.setProperty(k, v))
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
function CopyIcon() { return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> }
function GridIcon() { return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z"/></svg> }
function NavbarIcon() { return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/></svg> }
function SidebarIcon() { return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18"/></svg> }
function DesktopIcon() { return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg> }
function TabletIcon() { return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="2" width="16" height="20" rx="2"/><circle cx="12" cy="18" r="1" fill="currentColor" stroke="none"/></svg> }
function MobileIcon() { return <svg width="11" height="13" viewBox="0 0 20 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="1" width="16" height="22" rx="3"/><circle cx="10" cy="19.5" r="1" fill="currentColor" stroke="none"/></svg> }
function ChevronDownSmIcon() { return <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6"/></svg> }
function ChevronLeftIcon() { return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg> }
function ChevronRightIcon() { return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg> }
function SitemapIcon() { return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="6" y="2" width="12" height="5" rx="1"/><rect x="1" y="17" width="8" height="5" rx="1"/><rect x="15" y="17" width="8" height="5" rx="1"/><path d="M12 7v4M5 17v-2a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v2"/></svg> }
function BookOpenIcon() { return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg> }

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
        // Charts
        "column-chart": <svg width="14" height="12" viewBox="0 0 16 14" fill="currentColor"><rect x="0" y="8" width="3" height="6" rx=".5"/><rect x="4.5" y="4" width="3" height="10" rx=".5"/><rect x="9" y="1" width="3" height="13" rx=".5"/><rect x="13" y="5" width="3" height="9" rx=".5"/></svg>,
        "bar-chart":    <svg width="12" height="14" viewBox="0 0 14 16" fill="currentColor"><rect y="0" height="3" width="11" rx=".5"/><rect y="4.5" height="3" width="14" rx=".5"/><rect y="9" height="3" width="7" rx=".5"/><rect y="13" height="3" width="10" rx=".5"/></svg>,
        "area-chart":   <svg width="14" height="12" viewBox="0 0 16 12" fill="none"><path d="M0 10 L3 6 L6 8 L10 3 L13 5 L16 2 L16 12 L0 12 Z" fill="currentColor" fillOpacity=".3"/><polyline points="0,10 3,6 6,8 10,3 13,5 16,2" stroke="currentColor" strokeWidth="1.5"/></svg>,
        "line-chart":   <svg width="14" height="12" viewBox="0 0 16 12" fill="none"><polyline points="0,10 4,5 8,7 12,2 16,5" stroke="currentColor" strokeWidth="1.5"/><polyline points="0,8 4,9 8,5 12,6 16,3" stroke="currentColor" strokeWidth="1.5" strokeOpacity=".45"/></svg>,
        "pie-chart":    <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.5"/><circle cx="7" cy="7" r="3" stroke="currentColor" strokeWidth="1.5"/><path d="M7 1 A6 6 0 0 1 12.2 4 L9.6 5.5 A3 3 0 0 0 7 4 Z" fill="currentColor" fillOpacity=".4"/></svg>,
        "ranked-list":  <svg width="14" height="12" viewBox="0 0 16 12" fill="currentColor"><rect x="0" y="0" width="3" height="3" rx=".5"/><rect x="4.5" y=".5" width="11.5" height="2" rx=".5"/><rect x="0" y="4.5" width="3" height="3" rx=".5"/><rect x="4.5" y="5" width="9" height="2" rx=".5"/><rect x="0" y="9" width="3" height="3" rx=".5"/><rect x="4.5" y="9.5" width="6" height="2" rx=".5"/></svg>,
        "funnel-chart": <svg width="14" height="12" viewBox="0 0 16 14" fill="currentColor"><path d="M0 0 H16 L11 5 H5 Z" fillOpacity=".9"/><path d="M5 6 H11 L9 10 H7 Z" fillOpacity=".65"/><path d="M7 11 H9 L8.5 14 H7.5 Z" fillOpacity=".4"/></svg>,
        // Cards & Metrics
        "dash-card-list": <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="18" height="7" rx="1"/></svg>,
        "stat-cards":     <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 3h5v5M8 3H3v5M16 21h5v-5M8 21H3v-5"/><path d="M12 8v8M8 12h8" strokeWidth="1.5"/></svg>,
        "chart-card":     <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><polyline points="7,15 10,11 13,13 17,9"/></svg>,
        // Tables
        "data-table":   <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M3 15h18M9 3v18"/></svg>,
        "users-table":  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
        // Layout
        "navbar-comp":  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/></svg>,
        "sidebar-comp": <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18"/></svg>,
        // Interaction
        "kanban-board":    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="5" height="14" rx="1"/><rect x="10" y="3" width="5" height="10" rx="1"/><rect x="17" y="3" width="5" height="18" rx="1"/></svg>,
        "activity-feed":   <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M2 12h4M18 12h4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>,
        "command-palette": <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/></svg>,
        "empty-state":     <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" strokeDasharray="4 2"/><path d="M9 12h6M12 9v6" strokeWidth="1.5"/></svg>,
        // Forms
        "form-page":  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
        "team-page":  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><circle cx="19" cy="7" r="3"/><path d="M23 21v-2a3 3 0 0 0-2-2.83"/></svg>,
        // Pages (generic)
        "login-page":        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M15 12H3"/></svg>,
        "signup-page":       <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>,
        "onboarding-page":   <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
        "settings-page":     <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
        "account-settings":  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
        "general-settings":  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/></svg>,
        "billing-page":      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>,
        "notifications-page":<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
        "error-page":        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>,
    }
    return <span className="text-muted-foreground flex items-center justify-center w-4 shrink-0">{map[id] ?? <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>}</span>
}

// ─── Nav link popover ─────────────────────────────────────────────────────────

function NavLinkPopover({
    anchorRef, pages, currentPageId, onLink, onUnlink, onClose,
}: {
    anchorRef: React.RefObject<HTMLElement | null>
    pages: Page[]
    currentPageId: PageId | null
    onLink: (pageId: PageId) => void
    onUnlink: () => void
    onClose: () => void
}) {
    const popoverRef = React.useRef<HTMLDivElement>(null)
    const tree = React.useMemo(() => buildTree(pages), [pages])

    React.useEffect(() => {
        function handleClick(e: MouseEvent) {
            if (popoverRef.current && !popoverRef.current.contains(e.target as Node) &&
                anchorRef.current && !anchorRef.current.contains(e.target as Node)) {
                onClose()
            }
        }
        document.addEventListener("mousedown", handleClick)
        return () => document.removeEventListener("mousedown", handleClick)
    }, [onClose, anchorRef])

    function renderNodes(nodes: ReturnType<typeof buildTree>, depth = 0): React.ReactNode {
        return nodes.map(node => (
            <React.Fragment key={node.id}>
                <button
                    onClick={() => { onLink(node.id); onClose() }}
                    className={cn(
                        "flex items-center gap-2 w-full text-left px-3 py-1.5 text-xs rounded transition-colors",
                        node.id === currentPageId
                            ? "bg-primary/10 text-primary font-medium"
                            : "text-foreground hover:bg-muted",
                    )}
                    style={{ paddingLeft: depth * 16 + 12 }}
                >
                    {node.id === currentPageId && (
                        <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    )}
                    {node.label}
                </button>
                {node.children.length > 0 && renderNodes(node.children, depth + 1)}
            </React.Fragment>
        ))
    }

    return (
        <div
            ref={popoverRef}
            className="absolute z-50 mt-1 w-52 rounded-lg border border-border bg-card shadow-xl py-2"
        >
            <p className="px-3 pb-1.5 text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">Vincular a</p>
            <div className="max-h-48 overflow-y-auto">
                {renderNodes(tree)}
            </div>
            {currentPageId && (
                <>
                    <div className="my-1.5 border-t border-border" />
                    <button
                        onClick={() => { onUnlink(); onClose() }}
                        className="flex items-center gap-2 w-full px-3 py-1.5 text-xs text-destructive hover:bg-destructive/10 rounded transition-colors"
                    >
                        <XIcon /> Remover vínculo
                    </button>
                </>
            )}
        </div>
    )
}

// ─── Mock navbar ───────────────────────────────────────────────────────────────

function MockNavbar({
    pages, navLinks, onNavigate, onLinkItem,
}: {
    pages: Page[]
    navLinks: NavLink[]
    onNavigate: (pageId: PageId) => void
    onLinkItem: (label: string, pageId: PageId | null) => void
}) {
    const [popoverLabel, setPopoverLabel] = React.useState<string | null>(null)
    const itemRefs = React.useRef<Record<string, HTMLDivElement | null>>({})

    function getLinkedPageId(label: string): PageId | null {
        return navLinks.find(l => l.sourceType === "mock-navbar" && l.sourceItemLabel === label)?.targetPageId ?? null
    }

    return (
        <div className="shrink-0 h-12 bg-card border-b border-border flex items-center gap-5 px-5">
            <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded bg-primary/60 shrink-0" />
                <div className="w-20 h-2 rounded-full bg-muted-foreground/15" />
            </div>
            <div className="flex items-center gap-1">
                {MOCK_NAVBAR_ITEMS.map(label => {
                    const linked = getLinkedPageId(label)
                    return (
                        <div key={label} className="relative" ref={el => { itemRefs.current[label] = el }}>
                            <button
                                onClick={() => {
                                    if (pages.length <= 1 && !linked) return
                                    if (linked && popoverLabel !== label) { onNavigate(linked); return }
                                    setPopoverLabel(prev => prev === label ? null : label)
                                }}
                                className={cn(
                                    "flex items-center gap-1.5 px-3 py-1 rounded text-[10px] transition-colors select-none",
                                    linked
                                        ? "text-muted-foreground hover:text-foreground cursor-pointer"
                                        : pages.length > 1
                                            ? "text-muted-foreground/40 hover:text-muted-foreground/70 cursor-pointer"
                                            : "text-muted-foreground/40 cursor-default",
                                )}
                                title={linked ? `Navega para: ${pages.find(p => p.id === linked)?.label}` : pages.length > 1 ? "Clique para vincular" : undefined}
                            >
                                {linked && <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />}
                                {label}
                            </button>
                            {popoverLabel === label && pages.length > 1 && (
                                <NavLinkPopover
                                    anchorRef={{ current: itemRefs.current[label] ?? null }}
                                    pages={pages}
                                    currentPageId={linked}
                                    onLink={(pageId) => onLinkItem(label, pageId)}
                                    onUnlink={() => onLinkItem(label, null)}
                                    onClose={() => setPopoverLabel(null)}
                                />
                            )}
                        </div>
                    )
                })}
            </div>
            <div className="ml-auto flex items-center gap-2">
                <div className="w-20 h-5 rounded bg-muted" />
                <div className="w-7 h-7 rounded-full bg-muted" />
            </div>
        </div>
    )
}

// ─── Mock sidebar (collapsible + variable width) ───────────────────────────────

function MockSidebar({
    isOpen, onToggle, width, pages, navLinks, onNavigate, onLinkItem,
}: {
    isOpen: boolean; onToggle: () => void; width: number
    pages: Page[]; navLinks: NavLink[]
    onNavigate: (pageId: PageId) => void
    onLinkItem: (label: string, pageId: PageId | null) => void
}) {
    const [popoverLabel, setPopoverLabel] = React.useState<string | null>(null)
    const itemRefs = React.useRef<Record<string, HTMLDivElement | null>>({})

    function getLinkedPageId(label: string): PageId | null {
        return navLinks.find(l => l.sourceType === "mock-sidebar" && l.sourceItemLabel === label)?.targetPageId ?? null
    }

    if (!isOpen) {
        return (
            <div className="shrink-0 w-10 bg-card border-r border-border flex flex-col items-center pt-2 gap-2">
                <button onClick={onToggle} className="flex h-6 w-6 items-center justify-center rounded text-muted-foreground/40 hover:text-muted-foreground hover:bg-muted transition-colors" title="Expandir">
                    <ChevronRightIcon />
                </button>
                {MOCK_SIDEBAR_ITEMS.map((label, i) => {
                    const linked = getLinkedPageId(label)
                    return (
                        <div key={i} className={cn("w-5 h-5 rounded-sm relative", linked ? "bg-primary/40" : "bg-muted-foreground/10")}>
                            {linked && <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-primary" />}
                        </div>
                    )
                })}
            </div>
        )
    }
    return (
        <div className="shrink-0 bg-card border-r border-border flex flex-col py-2 gap-0.5 overflow-hidden" style={{ width }}>
            <div className="flex items-center justify-end px-2 mb-1">
                <button onClick={onToggle} className="flex h-5 w-5 items-center justify-center rounded text-muted-foreground/40 hover:text-muted-foreground hover:bg-muted transition-colors" title="Recolher">
                    <ChevronLeftIcon />
                </button>
            </div>
            {MOCK_SIDEBAR_ITEMS.map((label) => {
                const linked = getLinkedPageId(label)
                return (
                    <div key={label} className="relative" ref={el => { itemRefs.current[label] = el }}>
                        <button
                            onClick={() => {
                                if (pages.length <= 1 && !linked) return
                                if (linked && popoverLabel !== label) { onNavigate(linked); return }
                                setPopoverLabel(prev => prev === label ? null : label)
                            }}
                            className={cn(
                                "flex items-center gap-2.5 w-full mx-2 px-3 py-1.5 rounded-md select-none transition-colors text-left",
                                linked
                                    ? "bg-primary/10 cursor-pointer"
                                    : pages.length > 1
                                        ? "hover:bg-muted/50 cursor-pointer"
                                        : "cursor-default",
                            )}
                            style={{ width: `calc(100% - 16px)` }}
                            title={linked ? `Navega para: ${pages.find(p => p.id === linked)?.label}` : pages.length > 1 ? "Clique para vincular" : undefined}
                        >
                            <div className={cn("w-3 h-3 rounded-sm shrink-0", linked ? "bg-primary/60" : "bg-muted-foreground/15")} />
                            <span className={cn("text-xs truncate", linked ? "text-primary font-medium" : "text-muted-foreground/40")}>{label}</span>
                            {linked && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary shrink-0" />}
                        </button>
                        {popoverLabel === label && pages.length > 1 && (
                            <NavLinkPopover
                                anchorRef={{ current: itemRefs.current[label] ?? null }}
                                pages={pages}
                                currentPageId={linked}
                                onLink={(pageId) => onLinkItem(label, pageId)}
                                onUnlink={() => onLinkItem(label, null)}
                                onClose={() => setPopoverLabel(null)}
                            />
                        )}
                    </div>
                )
            })}
        </div>
    )
}

// ─── Reference blocks ──────────────────────────────────────────────────────────

function ReferenceBlocks({ cols, opacity, blockSize, padV, padH, gap }: { cols: number; opacity: number; blockSize: number; padV: number; padH: number; gap: number }) {
    const rows = 12
    return (
        <div className="absolute inset-0 pointer-events-none z-10" style={{ paddingTop: padV, paddingBottom: padV, paddingLeft: padH, paddingRight: padH }}>
            <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gridAutoRows: blockSize, gap, opacity: opacity / 100 }}>
                {Array.from({ length: cols * rows }).map((_, i) => (
                    <div key={i} style={{ background: "var(--primary)", borderRadius: 3, opacity: 0.18 }} />
                ))}
            </div>
        </div>
    )
}

// ─── Palette item ──────────────────────────────────────────────────────────────

function ChevronDownIcon({ open }: { open: boolean }) {
    return <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={cn("transition-transform duration-150", open ? "" : "-rotate-90")}><path d="M6 9l6 6 6-6"/></svg>
}

function SidebarItem({ chart, onAdd }: { chart: ChartPaletteEntry; onAdd: () => void }) {
    const { attributes, listeners, setNodeRef, isDragging } = useDraggable({ id: `sidebar-${chart.id}`, data: { type: "sidebar", chartId: chart.id } })
    return (
        <div ref={setNodeRef} {...listeners} {...attributes}
            className={cn("group relative flex items-center gap-2.5 rounded-md border border-border bg-background px-3 py-2 cursor-grab active:cursor-grabbing transition-opacity select-none", isDragging && "opacity-40")}>
            <ComponentIcon id={chart.id} />
            <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-foreground leading-snug">{chart.name}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5 leading-tight truncate">{chart.description}</p>
            </div>
            <button onClick={e => { e.stopPropagation(); onAdd() }}
                className="shrink-0 opacity-0 group-hover:opacity-100 flex h-5 w-5 items-center justify-center rounded border border-border text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-all">
                <PlusIcon />
            </button>
        </div>
    )
}

function PaletteSidebar({ onAdd }: { onAdd: (chartId: string) => void }) {
    const [openSections, setOpenSections] = React.useState<Record<string, boolean>>(() =>
        Object.fromEntries(PALETTE_SECTIONS.map((s, i) => [s.title, i < 3]))
    )
    const toggle = (title: string) => setOpenSections(prev => ({ ...prev, [title]: !prev[title] }))

    return (
        <aside className={cn("w-56 shrink-0 flex flex-col border-r border-border bg-card overflow-y-auto", "[&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[var(--border)]")}>
            <div className="px-4 py-3 border-b border-border shrink-0">
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">Componentes</p>
                <p className="text-[10px] text-muted-foreground/50 mt-0.5">{CHART_PALETTE.length} disponíveis</p>
            </div>
            <div className="flex flex-col py-1">
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
                                    <SidebarItem key={chart.id} chart={chart} onAdd={() => onAdd(chart.id)} />
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

// ─── Canvas card ───────────────────────────────────────────────────────────────

function CanvasCard({
    item, index, onRemove, globalVariantLabel, onResize, blockSize, gridCols, gap, suppressTransform,
}: {
    item: CanvasItem; index: number; onRemove: () => void
    globalVariantLabel: string
    onResize: (id: string, patch: Partial<Pick<CanvasItem, "colSpan" | "heightPx">>) => void
    blockSize: number; gridCols: number; gap: number; suppressTransform?: boolean
}) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: item.instanceId })
    const cardRef = React.useRef<HTMLDivElement | null>(null)

    const layout = isLayoutComponent(item.chartId)
    const variants = CHART_VARIANTS_LOCAL[item.chartId] ?? []
    const Component = variants.find(v => v.label === globalVariantLabel)?.component ?? CHART_COMPONENTS[item.chartId]
    // When a fixed height is set, calculate the inner chart area height so recharts can resize
    const chartHeight = item.heightPx > 0 ? Math.max(80, item.heightPx - CARD_OVERHEAD) : undefined

    const dndStyle: React.CSSProperties = {
        transform: suppressTransform ? undefined : CSS.Transform.toString(transform),
        transition: suppressTransform ? "none" : transition,
        gridColumn: `span ${Math.min(item.colSpan, gridCols)}`,
        // Fix vertical resize: alignSelf: start prevents grid row-stretch from overriding height
        alignSelf: "start",
        height: item.heightPx > 0 ? item.heightPx : undefined,
        overflow: "hidden",
        minWidth: 0,
    }

    function startWidthResize(e: React.MouseEvent) {
        e.preventDefault(); e.stopPropagation()
        const startX = e.clientX
        const startSpan = item.colSpan
        const startPx = startSpan * blockSize + (startSpan - 1) * gap
        const onMove = (ev: MouseEvent) => {
            const newSpan = snapColSpan(startPx + (ev.clientX - startX), blockSize, gridCols, gap)
            if (newSpan !== item.colSpan) onResize(item.instanceId, { colSpan: newSpan })
        }
        const onUp = () => { document.removeEventListener("mousemove", onMove); document.removeEventListener("mouseup", onUp) }
        document.addEventListener("mousemove", onMove); document.addEventListener("mouseup", onUp)
    }

    function startHeightResize(e: React.MouseEvent) {
        e.preventDefault(); e.stopPropagation()
        const startY = e.clientY
        const startH = item.heightPx > 0 ? item.heightPx : (cardRef.current?.offsetHeight ?? 300)
        const onMove = (ev: MouseEvent) => {
            const newH = snapHeight(startH + (ev.clientY - startY), blockSize, gap)
            onResize(item.instanceId, { heightPx: newH })
        }
        const onUp = () => { document.removeEventListener("mousemove", onMove); document.removeEventListener("mouseup", onUp) }
        document.addEventListener("mousemove", onMove); document.addEventListener("mouseup", onUp)
    }

    function startCornerResize(e: React.MouseEvent) {
        e.preventDefault(); e.stopPropagation()
        const startX = e.clientX, startY = e.clientY
        const startSpan = item.colSpan
        const startPx = startSpan * blockSize + (startSpan - 1) * gap
        const startH = item.heightPx > 0 ? item.heightPx : (cardRef.current?.offsetHeight ?? 300)
        const onMove = (ev: MouseEvent) => {
            onResize(item.instanceId, {
                colSpan: snapColSpan(startPx + (ev.clientX - startX), blockSize, gridCols, gap),
                heightPx: snapHeight(startH + (ev.clientY - startY), blockSize, gap),
            })
        }
        const onUp = () => { document.removeEventListener("mousemove", onMove); document.removeEventListener("mouseup", onUp) }
        document.addEventListener("mousemove", onMove); document.addEventListener("mouseup", onUp)
    }

    return (
        <div
            ref={node => { setNodeRef(node); cardRef.current = node }}
            style={dndStyle}
            className={cn("relative group [&>*:first-child]:!p-0", isDragging && "opacity-40")}
        >
            {Component && React.createElement(
                Component as React.ComponentType<{ chartHeight?: number }>,
                chartHeight !== undefined ? { chartHeight } : {}
            )}

            {/* Controls overlay */}
            <div className="absolute top-4 right-10 z-20 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none group-hover:pointer-events-auto">
                <div {...attributes} {...listeners}
                    className="flex h-6 w-6 items-center justify-center rounded bg-card/90 backdrop-blur-sm border border-border/60 cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground shadow-sm">
                    <GripIcon />
                </div>
                <span className="flex h-6 items-center px-1.5 rounded bg-card/90 backdrop-blur-sm border border-border/60 text-[10px] tabular-nums text-muted-foreground shadow-sm select-none">
                    {layout ? "Full width" : <>{item.colSpan}/{gridCols}{item.heightPx > 0 ? ` · ${item.heightPx}px` : ""}</>}
                </span>
                <button onClick={onRemove}
                    className="flex h-6 w-6 items-center justify-center rounded bg-card/90 backdrop-blur-sm border border-border/60 text-muted-foreground hover:text-foreground shadow-sm transition-colors"
                    title="Remover">
                    <XIcon />
                </button>
            </div>

            {/* Resize handles — hidden for layout components */}
            {!layout && <>
                <div onMouseDown={startWidthResize}
                    className="absolute right-0 top-0 bottom-0 w-3 cursor-ew-resize z-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-1 h-10 rounded-full bg-primary/40 hover:bg-primary/80 transition-colors" />
                </div>
                <div onMouseDown={startHeightResize}
                    className="absolute bottom-0 left-0 right-2 h-3 cursor-ns-resize z-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="h-1 w-10 rounded-full bg-primary/40 hover:bg-primary/80 transition-colors" />
                </div>
                <div onMouseDown={startCornerResize}
                    className="absolute bottom-0 right-0 w-5 h-5 cursor-nwse-resize z-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-end p-1">
                    <div className="w-2.5 h-2.5 rounded-sm bg-primary/60 hover:bg-primary transition-colors" />
                </div>
            </>}
        </div>
    )
}

// ─── Preview card (no DnD, no resize, no controls) ──────────────────────────

function PreviewCard({ item, globalVariantLabel, gridCols }: {
    item: CanvasItem; globalVariantLabel: string; gridCols: number
}) {
    const layout = isLayoutComponent(item.chartId)
    const variants = CHART_VARIANTS_LOCAL[item.chartId] ?? []
    const Component = variants.find(v => v.label === globalVariantLabel)?.component ?? CHART_COMPONENTS[item.chartId]
    const chartHeight = item.heightPx > 0 ? Math.max(80, item.heightPx - CARD_OVERHEAD) : undefined

    return (
        <div
            style={{
                gridColumn: `span ${Math.min(item.colSpan, gridCols)}`,
                alignSelf: "start",
                height: item.heightPx > 0 ? item.heightPx : undefined,
                overflow: "hidden",
                minWidth: 0,
            }}
            className="[&>*:first-child]:!p-0"
        >
            {Component && React.createElement(
                Component as React.ComponentType<{ chartHeight?: number }>,
                chartHeight !== undefined ? { chartHeight } : {}
            )}
        </div>
    )
}

// ─── Placeholder card ─────────────────────────────────────────────────────

function PlaceholderCard({ colSpan, heightPx, gridCols }: { colSpan: number; heightPx: number; gridCols: number }) {
    return (
        <div
            style={{
                gridColumn: `span ${Math.min(colSpan, gridCols)}`,
                height: heightPx > 0 ? heightPx : 200,
                alignSelf: "start",
                minWidth: 0,
            }}
            className="rounded-lg border-2 border-dashed border-primary/40 bg-primary/5 flex items-center justify-center transition-all duration-200"
        >
            <span className="text-xs text-primary/50 font-medium select-none">
                {colSpan}/{gridCols}
            </span>
        </div>
    )
}

// ─── Content drop zone ─────────────────────────────────────────────────────────

function ContentDropZone({
    children, isEmpty, showGrid, gridCols, gridOpacity, blockSize, padV, padH, gap, hasDragPlaceholder,
}: {
    children: React.ReactNode; isEmpty: boolean; showGrid: boolean
    gridCols: number; gridOpacity: number; blockSize: number; padV: number; padH: number; gap: number
    hasDragPlaceholder?: boolean
}) {
    const { isOver, setNodeRef } = useDroppable({ id: "canvas" })
    const showEmptyState = isEmpty && !hasDragPlaceholder
    return (
        <div ref={setNodeRef} className="flex-1 relative">
            {showGrid && <ReferenceBlocks cols={gridCols} opacity={gridOpacity} blockSize={blockSize} padV={padV} padH={padH} gap={gap} />}
            {showEmptyState ? (
                <div className="flex items-center justify-center min-h-96" style={{ paddingTop: padV, paddingBottom: padV, paddingLeft: padH, paddingRight: padH }}>
                    <div className={cn("text-center px-12 py-16 rounded-xl border-2 border-dashed transition-colors w-full", isOver ? "border-primary/60 bg-primary/5" : "border-border/40")}>
                        <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-muted text-muted-foreground"><GridIcon /></div>
                        <p className="text-sm font-medium text-muted-foreground">Comece o layout</p>
                        <p className="mt-1 text-xs text-muted-foreground/50">Arraste gráficos da sidebar ou clique em <span className="inline-flex items-center"><PlusIcon /></span></p>
                    </div>
                </div>
            ) : (
                <div
                    className={cn("relative z-20 transition-colors", isOver && !hasDragPlaceholder && "ring-2 ring-inset ring-primary/20")}
                    style={{ display: "grid", gridTemplateColumns: `repeat(${gridCols}, 1fr)`, gap, paddingTop: padV, paddingBottom: padV, paddingLeft: padH, paddingRight: padH }}
                >
                    {children}
                </div>
            )}
        </div>
    )
}

// ─── Main page ─────────────────────────────────────────────────────────────────

export default function DashboardBuilderPage() {
    // ── Load persisted data once ─────────────────────────────────────────────
    const persistedRef = React.useRef(loadPersisted())
    const saved = persistedRef.current

    // ── Builder state with undo/redo ────────────────────────────────────────
    const [history, historyDispatch] = React.useReducer(historyReducer, undefined, (): HistoryState => ({
        current: saved?.builder ?? createInitialState(),
        past: [],
        future: [],
    }))
    const state = history.current
    const dispatch = historyDispatch as React.Dispatch<BuilderAction>
    const activePage = state.pages.find(p => p.id === state.activePageId)!
    const canvasItems = activePage.canvasItems
    const canUndo = history.past.length > 0
    const canRedo = history.future.length > 0

    // ── Transient UI state ───────────────────────────────────────────────────
    const [dragActiveId,       setDragActiveId]       = React.useState<string | null>(null)
    const [ghostColSpan,       setGhostColSpan]       = React.useState(1)
    const [dropIndicator,      setDropIndicator]      = React.useState<{ insertIdx: number; colSpan: number; heightPx: number } | null>(null)
    const [copied,             setCopied]             = React.useState(false)
    const [activeTheme,        setActiveTheme]        = React.useState(saved?.ui.activeTheme ?? "Light")
    const [globalVariantLabel, setGlobalVariantLabel] = React.useState(saved?.ui.globalVariantLabel ?? "Default")
    const [showPageConfig,     setShowPageConfig]     = React.useState(false)
    const [previewMode,        setPreviewMode]        = React.useState(false)

    const totalComponents = state.pages.reduce((sum, p) => sum + p.canvasItems.length, 0)

    // Apply persisted theme on mount
    React.useEffect(() => { if (saved?.ui.activeTheme) applyTheme(saved.ui.activeTheme) }, []) // eslint-disable-line react-hooks/exhaustive-deps

    // Undo/Redo keyboard shortcuts (Ctrl+Z / Ctrl+Shift+Z)
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

    // Exit preview with Escape
    React.useEffect(() => {
        if (!previewMode) return
        const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setPreviewMode(false) }
        document.addEventListener("keydown", handler)
        return () => document.removeEventListener("keydown", handler)
    }, [previewMode])

    // Layout mocks
    const [showNavbar,        setShowNavbar]        = React.useState(saved?.ui.showNavbar ?? false)
    const [showSidebar,       setShowSidebar]       = React.useState(saved?.ui.showSidebar ?? false)
    const [mockSidebarOpen,   setMockSidebarOpen]   = React.useState(saved?.ui.mockSidebarOpen ?? true)
    const [mockSidebarWidth,  setMockSidebarWidth]  = React.useState(saved?.ui.mockSidebarWidth ?? 192)

    // Grid
    const [showGrid,    setShowGrid]    = React.useState(false)
    const [gridCols,    setGridCols]    = React.useState(saved?.ui.gridCols ?? 12)
    const [gridGap,     setGridGap]     = React.useState(saved?.ui.gridGap ?? 32)
    const [gridOpacity, setGridOpacity] = React.useState(saved?.ui.gridOpacity ?? 20)

    // Content margins
    const [padV, setPadV] = React.useState(saved?.ui.padV ?? 24)
    const [padH, setPadH] = React.useState(saved?.ui.padH ?? 24)

    // Device / frame
    const [deviceId, setDeviceId] = React.useState<DeviceId>(saved?.ui.deviceId ?? "desktop")
    const frameWidth = DEVICE_PRESETS.find(d => d.id === deviceId)?.width ?? 0

    // ── Auto-save to localStorage (debounced) ────────────────────────────────
    React.useEffect(() => {
        const timer = setTimeout(() => {
            savePersisted({
                builder: state,
                ui: {
                    activeTheme, globalVariantLabel,
                    showNavbar, showSidebar, mockSidebarOpen, mockSidebarWidth,
                    gridCols, gridGap, gridOpacity, padV, padH, deviceId,
                },
            })
        }, 500)
        return () => clearTimeout(timer)
    }, [state, activeTheme, globalVariantLabel, showNavbar, showSidebar, mockSidebarOpen, mockSidebarWidth, gridCols, gridGap, gridOpacity, padV, padH, deviceId])

    // Container width for snap calculations
    const contentRef = React.useRef<HTMLDivElement>(null)
    const [containerWidth, setContainerWidth] = React.useState(900)
    React.useEffect(() => {
        const el = contentRef.current; if (!el) return
        const ro = new ResizeObserver(([e]) => setContainerWidth(e.contentRect.width))
        ro.observe(el); return () => ro.disconnect()
    }, [])

    const blockSize = Math.max(20, (containerWidth - 2 * padH - (gridCols - 1) * gridGap) / gridCols)

    const displayItems = React.useMemo(() => {
        if (!dragActiveId) return canvasItems

        const id = dragActiveId
        // Sidebar drag → inject placeholder at insertIdx
        if (id.startsWith("sidebar-") && dropIndicator) {
            const placeholder: CanvasItem = {
                instanceId: "__drop_placeholder__",
                chartId: "", name: "", description: "",
                importStatement: "", dataType: "",
                colSpan: dropIndicator.colSpan,
                heightPx: dropIndicator.heightPx,
            }
            const result = [...canvasItems]
            result.splice(dropIndicator.insertIdx, 0, placeholder)
            return result
        }

        // Canvas reorder → arrayMove to show predicted order
        if (!id.startsWith("sidebar-") && dropIndicator) {
            const activeIdx = canvasItems.findIndex(i => i.instanceId === id)
            if (activeIdx === -1) return canvasItems
            return arrayMove(canvasItems, activeIdx, dropIndicator.insertIdx)
        }

        return canvasItems
    }, [canvasItems, dragActiveId, dropIndicator])

    React.useEffect(() => {
        try { const s = localStorage.getItem("styleguide_theme") ?? "Light"; setActiveTheme(s); applyTheme(s) } catch {}
    }, [])

    // Keep layout components at full width when grid columns change
    React.useEffect(() => {
        dispatch({ type: "SYNC_LAYOUT_COLS", gridCols })
    }, [gridCols])

    const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }))

    function handleThemeChange(name: string) {
        setActiveTheme(name); applyTheme(name)
        try { localStorage.setItem("styleguide_theme", name) } catch {}
    }

    function addChart(chartId: string, insertBeforeId?: string | null, colSpan?: number) {
        const entry = CHART_PALETTE.find(c => c.id === chartId); if (!entry) return
        const layout = isLayoutComponent(chartId)
        const defaultColSpan = layout ? gridCols : (colSpan ?? Math.min(6, gridCols))
        const defaultHeightPx = layout ? 0 : Math.round(3 * blockSize + 2 * gridGap)
        const newItem: CanvasItem = {
            instanceId: newId(), chartId: entry.id, name: entry.name,
            description: entry.description, importStatement: entry.importStatement,
            dataType: entry.dataType, colSpan: defaultColSpan, heightPx: defaultHeightPx,
        }
        dispatch({ type: "ADD_ITEM", item: newItem, insertBeforeId: insertBeforeId ?? undefined })
    }

    function removeItem(instanceId: string) { dispatch({ type: "REMOVE_ITEM", instanceId }) }

    function resizeItem(instanceId: string, patch: Partial<Pick<CanvasItem, "colSpan" | "heightPx">>) {
        dispatch({ type: "RESIZE_ITEM", instanceId, patch, gridCols })
    }

    function handleDragStart(e: DragStartEvent) {
        const id = String(e.active.id)
        setDragActiveId(id)
        setDropIndicator(null)
        if (id.startsWith("sidebar-")) {
            setGhostColSpan(Math.min(6, gridCols))
        } else {
            const item = canvasItems.find(i => i.instanceId === id)
            setGhostColSpan(item?.colSpan ?? Math.min(6, gridCols))
        }
    }

    function handleDragOver({ over, active }: DragOverEvent) {
        const id = String(active.id)
        const defaultSpan = Math.min(6, gridCols)
        const defaultHeight = Math.round(3 * blockSize + 2 * gridGap)

        // ── Sidebar item ──────────────────────────────────────────────────────
        if (id.startsWith("sidebar-")) {
            if (!over || String(over.id) === "canvas") {
                setGhostColSpan(defaultSpan)
                // Canvas empty or hovering general area → append at end
                setDropIndicator({ insertIdx: canvasItems.length, colSpan: defaultSpan, heightPx: defaultHeight })
                return
            }
            const overIdx = canvasItems.findIndex(i => i.instanceId === String(over.id))
            if (overIdx === -1) {
                setGhostColSpan(defaultSpan)
                setDropIndicator({ insertIdx: canvasItems.length, colSpan: defaultSpan, heightPx: defaultHeight })
                return
            }
            const rows = computeRows(canvasItems, gridCols)
            const targetRow = rows[overIdx]
            const usedInRow = canvasItems.reduce((sum, item, i) =>
                rows[i] === targetRow ? sum + item.colSpan : sum, 0)
            const available = gridCols - usedInRow
            const colSpan = Math.max(1, Math.min(defaultSpan, available > 0 ? available : defaultSpan))
            setGhostColSpan(colSpan)
            setDropIndicator({ insertIdx: overIdx, colSpan, heightPx: defaultHeight })
            return
        }

        // ── Canvas reorder ────────────────────────────────────────────────────
        const activeItem = canvasItems.find(i => i.instanceId === id)
        if (!activeItem) return
        if (!over || String(over.id) === "canvas") {
            setGhostColSpan(activeItem.colSpan)
            setDropIndicator(null)
            return
        }
        const activeIdx = canvasItems.findIndex(i => i.instanceId === id)
        const overIdx = canvasItems.findIndex(i => i.instanceId === String(over.id))
        if (overIdx === -1) {
            setGhostColSpan(activeItem.colSpan)
            setDropIndicator(null)
            return
        }
        const reordered = arrayMove(canvasItems, activeIdx, overIdx)
        const rows = computeRows(reordered, gridCols)
        const targetRow = rows[overIdx]
        const usedInRow = reordered.reduce((sum, item, i) =>
            (i !== overIdx && rows[i] === targetRow) ? sum + item.colSpan : sum, 0)
        const colSpan = Math.max(1, Math.min(activeItem.colSpan, gridCols - usedInRow))
        setGhostColSpan(colSpan)
        setDropIndicator({ insertIdx: overIdx, colSpan, heightPx: activeItem.heightPx })
    }

    function handleDragEnd(e: DragEndEvent) {
        const { active, over } = e
        const indicator = dropIndicator
        setDragActiveId(null)
        setDropIndicator(null)
        if (!over) return
        const a = String(active.id)
        if (a.startsWith("sidebar-")) {
            const chartId = a.replace("sidebar-", "")
            if (indicator) {
                const entry = CHART_PALETTE.find(c => c.id === chartId)
                if (!entry) return
                const layout = isLayoutComponent(chartId)
                const colSpan = layout ? gridCols : indicator.colSpan
                const defaultHeight = layout ? 0 : Math.round(3 * blockSize + 2 * gridGap)
                const newItem: CanvasItem = {
                    instanceId: newId(), chartId: entry.id, name: entry.name,
                    description: entry.description, importStatement: entry.importStatement,
                    dataType: entry.dataType, colSpan, heightPx: defaultHeight,
                }
                dispatch({ type: "SPLICE_ITEM", item: newItem, insertIdx: indicator.insertIdx })
            } else {
                addChart(chartId, String(over.id) !== "canvas" ? String(over.id) : null, ghostColSpan)
            }
            return
        }
        const o = String(over.id)
        if (a !== o) dispatch({ type: "REORDER_ITEMS", activeId: a, overId: o })
    }

    function handleExport() {
        // Build variant map (label + optional import override) for the export generator
        const chartVariants: Record<string, { label: string; importStatement?: string }[]> = {}
        for (const [id, vs] of Object.entries(CHART_VARIANTS_LOCAL)) {
            chartVariants[id] = vs.map(v => ({ label: v.label, importStatement: v.importStatement }))
        }
        const exportParams: ExportParams = {
            pages: state.pages, navLinks: state.navLinks,
            themeName: activeTheme, globalVariantLabel, gridCols, gridGap, padV, padH,
            showNavbar, showSidebar, mockSidebarWidth, mockSidebarOpen,
            chartVariants,
        }
        const text = generateExportTextFull(exportParams)
        navigator.clipboard.writeText(text).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000) })
    }

    const activeSidebar = dragActiveId?.startsWith("sidebar-") ? CHART_PALETTE.find(c => `sidebar-${c.id}` === dragActiveId) : null
    const activeCanvas  = dragActiveId && !dragActiveId.startsWith("sidebar-") ? canvasItems.find(i => i.instanceId === dragActiveId) : null

    // ─── Mini input helper ──────────────────────────────────────────────────────
    function NumInput({ value, onChange, min = 0, max = 999, step = 4, w = "w-14" }: { value: number; onChange: (v: number) => void; min?: number; max?: number; step?: number; w?: string }) {
        return <input type="number" min={min} max={max} step={step} value={value}
            onChange={e => onChange(Math.max(min, Math.min(max, Number(e.target.value))))}
            className={cn("h-5 rounded border border-border bg-background px-1.5 text-[10px] text-foreground text-center", w)} />
    }

    // ── Preview Mode ──────────────────────────────────────────────────────────
    if (previewMode) {
        return (
            <div className="flex h-screen flex-col overflow-hidden bg-background text-foreground">
                {/* Navbar */}
                {showNavbar && (
                    <div className="shrink-0 h-12 bg-card border-b border-border flex items-center gap-5 px-5">
                        <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded bg-primary/60 shrink-0" />
                            <div className="w-20 h-2 rounded-full bg-muted-foreground/15" />
                        </div>
                        <div className="flex items-center gap-1">
                            {MOCK_NAVBAR_ITEMS.map(label => {
                                const linked = state.navLinks.find(l => l.sourceType === "mock-navbar" && l.sourceItemLabel === label)?.targetPageId ?? null
                                return (
                                    <button key={label}
                                        onClick={() => linked && dispatch({ type: "SET_ACTIVE_PAGE", pageId: linked })}
                                        className={cn(
                                            "flex items-center gap-1.5 px-3 py-1 rounded text-[11px] transition-colors select-none",
                                            linked
                                                ? linked === state.activePageId
                                                    ? "text-foreground font-medium bg-muted"
                                                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50 cursor-pointer"
                                                : "text-muted-foreground/30 cursor-default",
                                        )}
                                    >
                                        {label}
                                    </button>
                                )
                            })}
                        </div>
                        <div className="ml-auto flex items-center gap-2">
                            <div className="w-20 h-5 rounded bg-muted" />
                            <div className="w-7 h-7 rounded-full bg-muted" />
                        </div>
                    </div>
                )}

                <div className="flex flex-1 overflow-hidden">
                    {/* Sidebar */}
                    {showSidebar && (
                        <div className="shrink-0 bg-card border-r border-border flex flex-col py-2 gap-0.5 overflow-y-auto" style={{ width: mockSidebarWidth }}>
                            <div className="px-3 mb-2">
                                <div className="flex items-center gap-2 px-2 py-1.5">
                                    <div className="w-4 h-4 rounded bg-primary/60 shrink-0" />
                                    <div className="w-16 h-2 rounded-full bg-muted-foreground/15" />
                                </div>
                            </div>
                            {MOCK_SIDEBAR_ITEMS.map(label => {
                                const linked = state.navLinks.find(l => l.sourceType === "mock-sidebar" && l.sourceItemLabel === label)?.targetPageId ?? null
                                const isActive = linked === state.activePageId
                                return (
                                    <button key={label}
                                        onClick={() => linked && dispatch({ type: "SET_ACTIVE_PAGE", pageId: linked })}
                                        className={cn(
                                            "flex items-center gap-2.5 mx-2 px-3 py-1.5 rounded-md select-none transition-colors text-left text-xs",
                                            linked
                                                ? isActive
                                                    ? "bg-primary/10 text-foreground font-medium"
                                                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50 cursor-pointer"
                                                : "text-muted-foreground/30 cursor-default",
                                        )}
                                    >
                                        <div className={cn("w-3 h-3 rounded-sm shrink-0", linked ? isActive ? "bg-primary" : "bg-primary/40" : "bg-muted-foreground/10")} />
                                        {label}
                                    </button>
                                )
                            })}
                        </div>
                    )}

                    {/* Content */}
                    <div className="flex-1 overflow-auto bg-background">
                        <div
                            style={{ display: "grid", gridTemplateColumns: `repeat(${gridCols}, 1fr)`, gap: gridGap, paddingTop: padV, paddingBottom: padV, paddingLeft: padH, paddingRight: padH }}
                        >
                            {canvasItems.map(item => (
                                <PreviewCard key={item.instanceId} item={item} globalVariantLabel={globalVariantLabel} gridCols={gridCols} />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Exit preview button */}
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
                    <span className="text-sm font-semibold tracking-tight">Citerii</span>
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
                <div className="flex-1 flex items-center justify-center gap-1.5">
                    {ALL_THEMES.map(name => (
                        <button key={name} title={name} onClick={() => handleThemeChange(name)}
                            className={cn("h-4 w-4 rounded-full border transition-all", activeTheme === name ? "scale-125 ring-2 ring-offset-1 ring-offset-background ring-primary border-transparent" : "border-border/50 opacity-70 hover:opacity-100 hover:scale-110")}
                            style={{ background: THEME_SWATCHES[name] }} />
                    ))}
                </div>
                <div className="flex items-center gap-3 shrink-0">
                    <Link href="/styleguide"
                        className="flex items-center gap-1.5 rounded border border-border px-3 py-1 text-xs font-medium text-muted-foreground transition-colors hover:border-primary hover:text-primary">
                        <BookOpenIcon /> Styleguide
                    </Link>
                    <ThemeInspectorButton label="Sua marca" className="flex items-center gap-1.5 rounded border border-border px-3 py-1 text-xs font-medium text-muted-foreground transition-colors hover:border-primary hover:text-primary" />
                    <div className="h-4 w-px bg-border" />
                    <button onClick={() => setShowPageConfig(v => !v)}
                        className={cn("flex items-center gap-1.5 rounded border px-3 py-1 text-xs font-medium transition-colors",
                            showPageConfig ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:border-primary hover:text-primary")}>
                        <SitemapIcon /> Páginas
                        {state.pages.length > 1 && <span className="ml-0.5 rounded-full bg-primary/15 px-1.5 text-[10px] tabular-nums text-primary">{state.pages.length}</span>}
                    </button>
                    <div className="h-4 w-px bg-border" />
                    {totalComponents > 0 && <span className="text-xs text-muted-foreground">{totalComponents} {totalComponents === 1 ? "componente" : "componentes"}</span>}
                    <div className="h-4 w-px bg-border" />
                    <button onClick={handleExport} disabled={totalComponents === 0}
                        className={cn("flex items-center gap-1.5 rounded border px-3 py-1 text-xs font-medium transition-colors",
                            totalComponents === 0 ? "border-border text-muted-foreground/40 cursor-not-allowed"
                            : copied ? "border-primary bg-primary/10 text-primary"
                            : "border-border text-muted-foreground hover:border-primary hover:text-primary")}>
                        <CopyIcon /> {copied ? "Copiado!" : "Copiar referência"}
                    </button>
                    <button onClick={() => setPreviewMode(true)} disabled={totalComponents === 0}
                        className={cn("flex items-center gap-1.5 rounded border px-3 py-1 text-xs font-medium transition-colors",
                            totalComponents === 0 ? "border-border text-muted-foreground/40 cursor-not-allowed"
                            : "border-primary bg-primary/10 text-primary hover:bg-primary/20")}>
                        <PlayIcon /> Preview
                    </button>
                </div>
            </header>

            {/* ── Controls bar ────────────────────────────────────────────────── */}
            <div className="shrink-0 flex items-center border-b border-border bg-card/60 px-4 h-9 text-xs gap-1 overflow-x-auto">

                {/* Grid */}
                <div className="flex items-center gap-2 pr-3 shrink-0">
                    <button onClick={() => setShowGrid(v => !v)} className={cn("flex items-center gap-1.5 transition-colors", showGrid ? "text-primary" : "text-muted-foreground hover:text-foreground")}>
                        <GridIcon /> Grid
                    </button>
                    {showGrid && <>
                        <span className="text-muted-foreground/40">·</span>
                        <span className="text-muted-foreground">Cols</span>
                        <select value={gridCols} onChange={e => setGridCols(Number(e.target.value))} className="h-5 rounded border border-border bg-background px-1 text-[10px] text-foreground">
                            {[4,6,8,10,12,16].map(v => <option key={v} value={v}>{v}</option>)}
                        </select>
                        <span className="text-muted-foreground/40">·</span>
                        <span className="text-muted-foreground">Gap</span>
                        <NumInput value={gridGap} onChange={setGridGap} min={0} max={80} step={4} w="w-12" />
                        <span className="text-muted-foreground/60">px</span>
                        <span className="text-muted-foreground/40">·</span>
                        <input type="range" min={5} max={60} value={gridOpacity} onChange={e => setGridOpacity(Number(e.target.value))} className="w-12 h-1 accent-primary" />
                        <span className="w-7 text-muted-foreground tabular-nums">{gridOpacity}%</span>
                    </>}
                </div>

                <div className="h-4 w-px bg-border mx-1 shrink-0" />

                {/* Layout mocks */}
                <div className="flex items-center gap-2 px-2 shrink-0">
                    <button onClick={() => setShowNavbar(v => !v)} className={cn("flex items-center gap-1.5 transition-colors", showNavbar ? "text-primary" : "text-muted-foreground hover:text-foreground")}>
                        <NavbarIcon /> Navbar
                    </button>
                    <button onClick={() => setShowSidebar(v => !v)} className={cn("flex items-center gap-1.5 transition-colors", showSidebar ? "text-primary" : "text-muted-foreground hover:text-foreground")}>
                        <SidebarIcon /> Sidebar
                    </button>
                    {showSidebar && <>
                        <span className="text-muted-foreground/40">·</span>
                        <span className="text-muted-foreground">Largura</span>
                        <NumInput value={mockSidebarWidth} onChange={setMockSidebarWidth} min={80} max={400} step={8} w="w-14" />
                        <span className="text-muted-foreground/60">px</span>
                    </>}
                </div>

                <div className="h-4 w-px bg-border mx-1 shrink-0" />

                {/* Global variant */}
                {ALL_VARIANT_LABELS.length > 1 && <>
                    <div className="flex items-center gap-2 px-2 shrink-0">
                        <span className="text-muted-foreground">Variação</span>
                        {ALL_VARIANT_LABELS.map(label => (
                            <button key={label} onClick={() => setGlobalVariantLabel(label)}
                                className={cn("px-2 py-0.5 rounded transition-colors", globalVariantLabel === label ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:text-foreground")}>
                                {label}
                            </button>
                        ))}
                    </div>
                    <div className="h-4 w-px bg-border mx-1 shrink-0" />
                </>}

                {/* Margins */}
                <div className="flex items-center gap-2 px-2 shrink-0">
                    <span className="text-muted-foreground">Margem</span>
                    <span className="text-muted-foreground/60 text-[10px]">V</span>
                    <NumInput value={padV} onChange={setPadV} min={0} max={120} step={4} w="w-12" />
                    <span className="text-muted-foreground/60 text-[10px]">H</span>
                    <NumInput value={padH} onChange={setPadH} min={0} max={120} step={4} w="w-12" />
                    <span className="text-muted-foreground/60">px</span>
                </div>

                <div className="h-4 w-px bg-border mx-1 shrink-0" />

                {/* Device */}
                <DeviceDropdown deviceId={deviceId} onSelect={setDeviceId} />
            </div>

            {/* ── Page tabs (visible when >1 page) ──────────────────────────── */}
            {state.pages.length > 1 && (
                <div className="shrink-0 flex items-center border-b border-border bg-card/40 px-4 h-8 gap-0.5 overflow-x-auto">
                    {state.pages.map(page => {
                        const isActive = page.id === state.activePageId
                        const parent = page.parentId ? state.pages.find(p => p.id === page.parentId) : null
                        return (
                            <button
                                key={page.id}
                                onClick={() => dispatch({ type: "SET_ACTIVE_PAGE", pageId: page.id })}
                                className={cn(
                                    "flex items-center gap-1 px-3 py-1 rounded-t text-xs transition-colors shrink-0",
                                    isActive
                                        ? "bg-background text-foreground font-medium border border-border border-b-transparent -mb-px"
                                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                                )}
                            >
                                {parent && <span className="text-muted-foreground/40 text-[10px]">{parent.label} ›</span>}
                                {page.label}
                            </button>
                        )
                    })}
                </div>
            )}

            {/* ── Builder body ────────────────────────────────────────────────── */}
            <div className="flex flex-1 overflow-hidden">
                <DndContext sensors={sensors} onDragStart={handleDragStart} onDragOver={handleDragOver} onDragEnd={handleDragEnd}>

                    {/* Component palette */}
                    <PaletteSidebar onAdd={addChart} />

                    {/* Stage */}
                    <div className="flex-1 overflow-auto bg-muted/30 p-8">
                        {(() => {
                            // Shared screen content
                            const screenContent = (
                                <>
                                    {showNavbar && (
                                        <MockNavbar
                                            pages={state.pages}
                                            navLinks={state.navLinks}
                                            onNavigate={(pageId) => dispatch({ type: "SET_ACTIVE_PAGE", pageId })}
                                            onLinkItem={(label, pageId) => {
                                                if (pageId) dispatch({ type: "SET_NAV_LINK", link: { sourceType: "mock-navbar", sourceItemLabel: label, targetPageId: pageId } })
                                                else dispatch({ type: "REMOVE_NAV_LINK", sourceType: "mock-navbar", sourceItemLabel: label })
                                            }}
                                        />
                                    )}
                                    <div className="flex flex-1">
                                        {showSidebar && (
                                            <MockSidebar
                                                isOpen={mockSidebarOpen}
                                                onToggle={() => setMockSidebarOpen(v => !v)}
                                                width={mockSidebarWidth}
                                                pages={state.pages}
                                                navLinks={state.navLinks}
                                                onNavigate={(pageId) => dispatch({ type: "SET_ACTIVE_PAGE", pageId })}
                                                onLinkItem={(label, pageId) => {
                                                    if (pageId) dispatch({ type: "SET_NAV_LINK", link: { sourceType: "mock-sidebar", sourceItemLabel: label, targetPageId: pageId } })
                                                    else dispatch({ type: "REMOVE_NAV_LINK", sourceType: "mock-sidebar", sourceItemLabel: label })
                                                }}
                                            />
                                        )}
                                        <div ref={contentRef} className="flex-1 min-w-0">
                                            <SortableContext items={canvasItems.map(i => i.instanceId)} strategy={rectSortingStrategy}>
                                                <ContentDropZone isEmpty={canvasItems.length === 0} hasDragPlaceholder={!!dropIndicator} showGrid={showGrid} gridCols={gridCols} gridOpacity={gridOpacity} blockSize={blockSize} padV={padV} padH={padH} gap={gridGap}>
                                                    {displayItems.map((item, idx) => {
                                                        if (item.instanceId === "__drop_placeholder__") {
                                                            return <PlaceholderCard key="placeholder" colSpan={item.colSpan} heightPx={item.heightPx} gridCols={gridCols} />
                                                        }
                                                        return (
                                                            <CanvasCard key={item.instanceId} item={item} index={idx}
                                                                onRemove={() => removeItem(item.instanceId)}
                                                                globalVariantLabel={globalVariantLabel}
                                                                onResize={resizeItem} blockSize={blockSize} gridCols={gridCols} gap={gridGap}
                                                                suppressTransform={!!dropIndicator} />
                                                        )
                                                    })}
                                                </ContentDropZone>
                                            </SortableContext>
                                        </div>
                                    </div>
                                </>
                            )

                            if (frameWidth > 0) {
                                // ── Tablet / Mobile — bordered frame ──
                                return (
                                    <div
                                        className="mx-auto bg-background overflow-hidden flex flex-col rounded-xl border border-border"
                                        style={{ width: frameWidth, minHeight: 480 }}
                                    >
                                        {screenContent}
                                    </div>
                                )
                            }

                            // ── Desktop full-width — no frame ──
                            return (
                                <div
                                    className="mx-auto bg-background overflow-hidden flex flex-col border border-border"
                                    style={{ width: "100%", minHeight: "100%" }}
                                >
                                    {screenContent}
                                </div>
                            )
                        })()}

                        {canvasItems.length > 0 && (
                            <div className="mx-auto mt-4 rounded-lg border border-border bg-card px-4 py-3 text-xs" style={{ width: frameWidth > 0 ? frameWidth : "100%" }}>
                                <p className="font-medium text-foreground mb-0.5">Como usar a referência exportada</p>
                                <p className="text-muted-foreground leading-relaxed">Clique em <strong>Copiar referência</strong> e cole em uma conversa com IA. O documento inclui tema, componentes, colunas e formatos de dados.</p>
                            </div>
                        )}
                    </div>

                    <DragOverlay dropAnimation={null}>
                        {(activeSidebar || activeCanvas) && (() => {
                            const chartId = activeSidebar ? activeSidebar.id : activeCanvas!.chartId
                            const name = activeSidebar ? activeSidebar.name : activeCanvas!.name
                            return (
                                <div
                                    style={{ width: 200, pointerEvents: "none" }}
                                    className="rounded-lg bg-card border border-border shadow-2xl ring-2 ring-primary/60 px-4 py-3 flex items-center gap-2"
                                >
                                    <ComponentIcon id={chartId} />
                                    <span className="text-xs font-medium text-foreground truncate">{name}</span>
                                </div>
                            )
                        })()}
                    </DragOverlay>
                </DndContext>

                {/* Page config sidebar (outside canvas DndContext) */}
                {showPageConfig && (
                    <PageConfigSidebar
                        pages={state.pages}
                        activePageId={state.activePageId}
                        navLinks={state.navLinks}
                        dispatch={dispatch}
                        onClose={() => setShowPageConfig(false)}
                    />
                )}
            </div>
        </div>
    )
}
