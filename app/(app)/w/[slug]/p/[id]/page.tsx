"use client"

import * as React from "react"
import { createPortal } from "react-dom"
import Link from "next/link"
import {
    DndContext, PointerSensor, useSensor, useSensors,
    type DragEndEvent,
} from "@dnd-kit/core"
import { SortableContext, useSortable, horizontalListSortingStrategy, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
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
import { AccordionDemo, CollapsibleDemo } from "@/componentsSugest/shadcn/AccordionDemo"
import { CarouselDemo } from "@/componentsSugest/shadcn/CarouselDemo"
import { ResizableDemo } from "@/componentsSugest/shadcn/ResizableDemo"
// Individual shadcn components
import { BuilderBreadcrumb } from "@/componentsSugest/shadcn/BuilderBreadcrumb"
import { PaginationCard } from "@/componentsSugest/shadcn/PaginationCard"
import { SeparatorCard } from "@/componentsSugest/shadcn/SeparatorCard"
import { DialogCard } from "@/componentsSugest/shadcn/DialogCard"
import { AlertDialogCard } from "@/componentsSugest/shadcn/AlertDialogCard"
import { DrawerCard } from "@/componentsSugest/shadcn/DrawerCard"
import { SheetCard } from "@/componentsSugest/shadcn/SheetCard"
import { SkeletonCard } from "@/componentsSugest/shadcn/SkeletonCard"
import { TooltipCard } from "@/componentsSugest/shadcn/TooltipCard"
import { HoverCardCard } from "@/componentsSugest/shadcn/HoverCardCard"
import { PopoverCard } from "@/componentsSugest/shadcn/PopoverCard"
import { ProgressCard } from "@/componentsSugest/shadcn/ProgressCard"
import { CheckboxCard } from "@/componentsSugest/shadcn/CheckboxCard"
import { SelectCard } from "@/componentsSugest/shadcn/SelectCard"
import { SliderCard } from "@/componentsSugest/shadcn/SliderCard"
import { ToggleCard } from "@/componentsSugest/shadcn/ToggleCard"
import { SwitchCard } from "@/componentsSugest/shadcn/SwitchCard"
import { InputOtpCard } from "@/componentsSugest/shadcn/InputOtpCard"
import { TextareaCard } from "@/componentsSugest/shadcn/TextareaCard"
import { DropdownMenuCard } from "@/componentsSugest/shadcn/DropdownMenuCard"
import { ContextMenuCard } from "@/componentsSugest/shadcn/ContextMenuCard"
import { MenubarCard } from "@/componentsSugest/shadcn/MenubarCard"
import { CalendarSingleCard } from "@/componentsSugest/shadcn/CalendarSingleCard"
import { CalendarRangeCard } from "@/componentsSugest/shadcn/CalendarRangeCard"
import { ShapeElement } from "@/componentsSugest/ShapeElement"
import { CardShapeElement } from "@/componentsSugest/CardShapeElement"
import { ContainerElement } from "@/componentsSugest/ContainerElement"
import { ButtonShowcase } from "@/componentsSugest/ButtonShowcase"
import { AvatarShowcase } from "@/componentsSugest/AvatarShowcase"
import { ThemeToggle } from "@/componentsSugest/ThemeToggle"
import { ShapeConfigPopover } from "@/app/_shape-config-popover"
import { CardShapeConfigPopover } from "@/app/_card-shape-config-popover"
import { LoginConfigPopover } from "@/app/_login-config-popover"
import { SignUpConfigPopover } from "@/app/_signup-config-popover"
import { StatCardConfigPopover } from "@/app/_statcard-config-popover"
import { KanbanConfigPopover } from "@/app/_kanban-config-popover"
import { ContainerConfigPopover } from "@/app/_container-config-popover"
import { ButtonConfigPopover } from "@/app/_button-config-popover"
import { AvatarConfigPopover } from "@/app/_avatar-config-popover"
import {
    CARD_OVERHEAD, DEVICE_PRESETS, type DeviceId,
    PALETTE_SECTIONS, CHART_PALETTE, type ChartPaletteEntry, type PaletteEntry,
    isLayoutComponent, isShapeItem, DEFAULT_SHAPE_CONFIG, type ShapeConfig,
    isCardShapeItem, DEFAULT_CARD_SHAPE_CONFIG, type CardShapeConfig, type ItemConfig,
    isLoginItem, DEFAULT_LOGIN_CONFIG, type LoginConfig,
    isSignUpItem, DEFAULT_SIGNUP_CONFIG, type SignUpConfig,
    isStatCardItem, DEFAULT_STAT_CARD_CONFIG, type StatCardConfig,
    isKanbanItem, DEFAULT_KANBAN_CONFIG, type KanbanConfig,
    isContainerItem, DEFAULT_CONTAINER_CONFIG, type ContainerConfig,
    isButtonItem, DEFAULT_BUTTON_CONFIG, type ButtonConfig,
    isAvatarItem, DEFAULT_AVATAR_CONFIG, type AvatarConfig,
    isThemeToggleItem, DEFAULT_THEME_TOGGLE_CONFIG, type ThemeToggleConfig,
    isConfigurableItem, getDefaultConfig, skipCardInner, getDefaultSize,
    type NavItem, getSelectedComponents,
    type CanvasItem, type Page, type PageId, type ResolvedLayout,
    RGL_COLS, RGL_ROW_HEIGHT, RGL_MARGIN,
    newId, newPageId,
    builderReducer, createInitialState, migrateState, type BuilderAction,
    buildTree, flattenTree, resolveLayout, pageHasLayoutOverride,
} from "@/app/_builder-state"
import { BuilderPageContext } from "@/app/_builder-page-context"
import { PageConfigSidebar } from "@/app/_page-config-sidebar"
import { generateExportText as generateExportTextFull, type ExportParams } from "@/app/_export-generator"
import { ThemeInspectorButton } from "@/app/styleguide/_theme-inspector"

// ─── Persistence (via adapter) ────────────────────────────────────────────────

// Loaded once by DashboardBuilderPage, passed as prop to DashboardBuilderInner
interface SavedData {
    builder: import("@/app/_builder-state").BuilderState
    ui: DashboardData["ui"]
}

// ─── Undo / Redo history wrapper ──────────────────────────────────────────────

const HISTORY_LIMIT = 50
// Actions that should NOT create a history entry (pure navigation, no data change)
const SKIP_HISTORY: Set<string> = new Set(["SET_ACTIVE_PAGE"])

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
    if (SKIP_HISTORY.has(action.type)) return { ...history, current: next }
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
    "dash-card-list": DashCardList, "chart-card": ChartCard,
    "data-table": DataTable, "users-table": UsersTable,
    "navbar-comp": NavbarComponent, "sidebar-comp": SidebarOpen,
    "activity-feed": ActivityFeed, "command-palette": CommandPalette, "empty-state": EmptyState,
    "form-page": FormPage, "team-page": TeamPage,
    "onboarding-page": OnboardingPage,
    "settings-page": SettingsPage, "account-settings": AccountSettings, "general-settings": GeneralSettings,
    "billing-page": BillingPage, "notifications-page": NotificationsPage, "error-page": ErrorPage,
    // Containers
    "accordion-demo": AccordionDemo, "collapsible-demo": CollapsibleDemo,
    "carousel-demo": CarouselDemo, "resizable-demo": ResizableDemo,
    // Navegação
    "builder-breadcrumb": BuilderBreadcrumb, "pagination-card": PaginationCard, "separator-card": SeparatorCard,
    // Overlays
    "dialog-card": DialogCard, "alert-dialog-card": AlertDialogCard, "drawer-card": DrawerCard, "sheet-card": SheetCard,
    // Feedback
    "skeleton-card": SkeletonCard, "tooltip-card": TooltipCard, "hover-card-card": HoverCardCard, "popover-card": PopoverCard, "progress-card": ProgressCard,
    // Controles
    "checkbox-card": CheckboxCard, "select-card": SelectCard, "slider-card": SliderCard, "toggle-card": ToggleCard,
    "switch-card": SwitchCard, "input-otp-card": InputOtpCard, "textarea-card": TextareaCard,
    // Menus
    "dropdown-menu-card": DropdownMenuCard, "context-menu-card": ContextMenuCard, "menubar-card": MenubarCard,
    // Data
    "calendar-single": CalendarSingleCard, "calendar-range": CalendarRangeCard,
}

// ─── Theme helper ──────────────────────────────────────────────────────────────

/** All CSS variable keys that themes define — used to clear stale inline styles */
const THEME_VAR_KEYS = Object.keys(themes["Dark"])

/** Builder chrome surface vars — lifted Graphite-level tones instead of near-black */
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

/** Force builder chrome to always be dark mode with lifted surfaces */
function forceBuilderDark() {
    const el = document.documentElement
    el.classList.add("dark")
    // Clear any theme inline vars first, then apply chrome surfaces
    THEME_VAR_KEYS.forEach(k => el.style.removeProperty(k))
    Object.entries(BUILDER_CHROME_VARS).forEach(([k, v]) => el.style.setProperty(k, v))
}

/** Get CSS variables for a theme (to apply as inline styles on the device frame) */
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
function CopyIcon() { return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> }
function GridIcon() { return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z"/></svg> }
function CellsIcon() { return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="6" height="6" rx="1"/><rect x="9" y="2" width="6" height="6" rx="1"/><rect x="16" y="2" width="6" height="6" rx="1"/><rect x="2" y="9" width="6" height="6" rx="1"/><rect x="9" y="9" width="6" height="6" rx="1"/><rect x="16" y="9" width="6" height="6" rx="1"/><rect x="2" y="16" width="6" height="6" rx="1"/><rect x="9" y="16" width="6" height="6" rx="1"/><rect x="16" y="16" width="6" height="6" rx="1"/></svg> }
function NavbarIcon() { return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/></svg> }
function SidebarIcon() { return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18"/></svg> }
function SidebarRightIcon() { return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M15 3v18"/></svg> }
function DesktopIcon() { return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg> }
function TabletIcon() { return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="2" width="16" height="20" rx="2"/><circle cx="12" cy="18" r="1" fill="currentColor" stroke="none"/></svg> }
function MobileIcon() { return <svg width="11" height="13" viewBox="0 0 20 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="1" width="16" height="22" rx="3"/><circle cx="10" cy="19.5" r="1" fill="currentColor" stroke="none"/></svg> }
function LinkIcon() { return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg> }
function ChevronDownSmIcon() { return <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6"/></svg> }
function ChevronLeftIcon() { return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg> }
function ChevronRightIcon() { return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg> }
function SitemapIcon() { return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="6" y="2" width="12" height="5" rx="1"/><rect x="1" y="17" width="8" height="5" rx="1"/><rect x="15" y="17" width="8" height="5" rx="1"/><path d="M12 7v4M5 17v-2a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v2"/></svg> }
function BookOpenIcon() { return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg> }
function CompactIcon() { return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v6M12 22v-6"/><path d="M4 12h16"/><path d="M8 5l4-3 4 3"/><path d="M8 19l4 3 4-3"/></svg> }
function EyeIcon() { return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg> }
function SettingsIcon() { return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg> }
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
        // Charts — Bar
        "bar-grouped":     <svg width="14" height="12" viewBox="0 0 16 14" fill="currentColor"><rect x="0" y="8" width="3" height="6" rx=".5"/><rect x="4.5" y="4" width="3" height="10" rx=".5"/><rect x="9" y="1" width="3" height="13" rx=".5"/><rect x="13" y="5" width="3" height="9" rx=".5"/></svg>,
        "bar-stacked":     <svg width="14" height="12" viewBox="0 0 16 14" fill="currentColor"><rect x="0" y="8" width="3" height="6" rx=".5"/><rect x="4.5" y="4" width="3" height="10" rx=".5"/><rect x="9" y="1" width="3" height="13" rx=".5"/><rect x="13" y="5" width="3" height="9" rx=".5"/></svg>,
        "bar-horizontal":  <svg width="12" height="14" viewBox="0 0 14 16" fill="currentColor"><rect y="0" height="3" width="11" rx=".5"/><rect y="4.5" height="3" width="14" rx=".5"/><rect y="9" height="3" width="7" rx=".5"/><rect y="13" height="3" width="10" rx=".5"/></svg>,
        // Charts — Area
        "area-simple":     <svg width="14" height="12" viewBox="0 0 16 12" fill="none"><path d="M0 10 L3 6 L6 8 L10 3 L13 5 L16 2 L16 12 L0 12 Z" fill="currentColor" fillOpacity=".3"/><polyline points="0,10 3,6 6,8 10,3 13,5 16,2" stroke="currentColor" strokeWidth="1.5"/></svg>,
        "area-stacked":    <svg width="14" height="12" viewBox="0 0 16 12" fill="none"><path d="M0 10 L3 6 L6 8 L10 3 L13 5 L16 2 L16 12 L0 12 Z" fill="currentColor" fillOpacity=".3"/><polyline points="0,10 3,6 6,8 10,3 13,5 16,2" stroke="currentColor" strokeWidth="1.5"/></svg>,
        // Charts — Line
        "line-simple":     <svg width="14" height="12" viewBox="0 0 16 12" fill="none"><polyline points="0,10 4,5 8,7 12,2 16,5" stroke="currentColor" strokeWidth="1.5"/><polyline points="0,8 4,9 8,5 12,6 16,3" stroke="currentColor" strokeWidth="1.5" strokeOpacity=".45"/></svg>,
        "line-multi":      <svg width="14" height="12" viewBox="0 0 16 12" fill="none"><polyline points="0,10 4,5 8,7 12,2 16,5" stroke="currentColor" strokeWidth="1.5"/><polyline points="0,8 4,9 8,5 12,6 16,3" stroke="currentColor" strokeWidth="1.5" strokeOpacity=".45"/></svg>,
        // Charts — Pie
        "pie-simple":      <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.5"/><path d="M7 1 A6 6 0 0 1 12.2 4 L7 7 Z" fill="currentColor" fillOpacity=".4"/></svg>,
        "pie-donut":       <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.5"/><circle cx="7" cy="7" r="3" stroke="currentColor" strokeWidth="1.5"/><path d="M7 1 A6 6 0 0 1 12.2 4 L9.6 5.5 A3 3 0 0 0 7 4 Z" fill="currentColor" fillOpacity=".4"/></svg>,
        "pie-separated":   <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.5"/><path d="M7 1 A6 6 0 0 1 12.2 4 L7 7 Z" fill="currentColor" fillOpacity=".4"/></svg>,
        // Charts — Radar
        "radar-simple":    <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><polygon points="7,1 12,4 12,10 7,13 2,10 2,4" stroke="currentColor" strokeWidth="1.2"/><polygon points="7,3 10,5 10,9 7,11 4,9 4,5" fill="currentColor" fillOpacity=".2"/></svg>,
        "radar-multi":     <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><polygon points="7,1 12,4 12,10 7,13 2,10 2,4" stroke="currentColor" strokeWidth="1.2"/><polygon points="7,3 10,5 10,9 7,11 4,9 4,5" fill="currentColor" fillOpacity=".2"/></svg>,
        // Charts — Radial
        "radial-gauge":    <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M2 10 A6 6 0 1 1 12 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>,
        "radial-multi":    <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5"/><circle cx="7" cy="7" r="3" stroke="currentColor" strokeWidth="1.5" strokeOpacity=".5"/></svg>,
        "radial-stacked":  <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M2 10 A6 6 0 1 1 12 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>,
        // Charts — Ranked
        "ranked-simple":   <svg width="14" height="12" viewBox="0 0 16 12" fill="currentColor"><rect x="0" y="0" width="3" height="3" rx=".5"/><rect x="4.5" y=".5" width="11.5" height="2" rx=".5"/><rect x="0" y="4.5" width="3" height="3" rx=".5"/><rect x="4.5" y="5" width="9" height="2" rx=".5"/><rect x="0" y="9" width="3" height="3" rx=".5"/><rect x="4.5" y="9.5" width="6" height="2" rx=".5"/></svg>,
        "ranked-category": <svg width="14" height="12" viewBox="0 0 16 12" fill="currentColor"><rect x="0" y="0" width="3" height="3" rx=".5"/><rect x="4.5" y=".5" width="11.5" height="2" rx=".5"/><rect x="0" y="4.5" width="3" height="3" rx=".5"/><rect x="4.5" y="5" width="9" height="2" rx=".5"/><rect x="0" y="9" width="3" height="3" rx=".5"/><rect x="4.5" y="9.5" width="6" height="2" rx=".5"/></svg>,
        // Charts — Funnel
        "funnel-sales":    <svg width="14" height="12" viewBox="0 0 16 14" fill="currentColor"><path d="M0 0 H16 L11 5 H5 Z" fillOpacity=".9"/><path d="M5 6 H11 L9 10 H7 Z" fillOpacity=".65"/><path d="M7 11 H9 L8.5 14 H7.5 Z" fillOpacity=".4"/></svg>,
        "funnel-marketing":<svg width="14" height="12" viewBox="0 0 16 14" fill="currentColor"><path d="M0 0 H16 L11 5 H5 Z" fillOpacity=".9"/><path d="M5 6 H11 L9 10 H7 Z" fillOpacity=".65"/><path d="M7 11 H9 L8.5 14 H7.5 Z" fillOpacity=".4"/></svg>,
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
        // Formas
        "shape":             <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="12" cy="12" r="4" fill="currentColor" fillOpacity=".3"/></svg>,
        "card-shape":        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><rect x="6" y="6" width="5" height="5" rx="1" fill="currentColor" fillOpacity=".3"/><path d="M6 15h12M6 18h8"/></svg>,
        "container":         <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="3" strokeDasharray="4 2"/><path d="M6 6h12M6 10h8" strokeWidth="1.5"/></svg>,
        // Botões
        "button-single":     <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="8" width="18" height="8" rx="2"/><path d="M8 12h8"/></svg>,
        // Usuários
        "avatar-single":     <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 1 0-16 0"/></svg>,
        // Theme Toggle
        "theme-toggle":      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>,
    }
    return <span className="text-muted-foreground flex items-center justify-center w-4 shrink-0">{map[id] ?? <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>}</span>
}

// ─── Nav link popover ─────────────────────────────────────────────────────────

function NavLinkPopover({
    anchorRef, pages, currentPageId, onLink, onRemove, onClose, mode = "edit",
}: {
    anchorRef: React.RefObject<HTMLElement | null>
    pages: Page[]
    currentPageId: PageId | null
    onLink: (pageId: PageId) => void
    onRemove?: () => void
    onClose: () => void
    mode?: "add" | "edit"
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
            <p className="px-3 pb-1.5 text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
                {mode === "add" ? "Selecionar página" : "Vincular a"}
            </p>
            <div className="max-h-48 overflow-y-auto">
                {renderNodes(tree)}
            </div>
            {mode === "edit" && onRemove && (
                <>
                    <div className="my-1.5 border-t border-border" />
                    <button
                        onClick={() => { onRemove(); onClose() }}
                        className="flex items-center gap-2 w-full px-3 py-1.5 text-xs text-destructive hover:bg-destructive/10 rounded transition-colors"
                    >
                        <XIcon /> Remover link
                    </button>
                </>
            )}
        </div>
    )
}

// ─── Mock navbar ───────────────────────────────────────────────────────────────

function SortableNavItem({
    item, pages, editingId, editValue, popoverId,
    onSetEditingId, onSetEditValue, onCommitEdit, onSetPopoverId,
    onNavigate, onUpdateItem, onRemoveItem,
}: {
    item: NavItem; pages: Page[]
    editingId: string | null; editValue: string; popoverId: string | null
    onSetEditingId: (id: string | null) => void; onSetEditValue: (v: string) => void
    onCommitEdit: (id: string) => void; onSetPopoverId: (id: string | null) => void
    onNavigate: (pageId: PageId) => void
    onUpdateItem: (itemId: string, label?: string, targetPageId?: PageId | null) => void
    onRemoveItem: (itemId: string) => void
}) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: item.id })
    const itemRef = React.useRef<HTMLDivElement | null>(null)
    const style: React.CSSProperties = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.4 : 1,
    }
    return (
        <div ref={node => { setNodeRef(node); itemRef.current = node }} style={style} className="relative group/nav">
            {editingId === item.id ? (
                <input
                    autoFocus
                    value={editValue}
                    onChange={e => onSetEditValue(e.target.value)}
                    onBlur={() => onCommitEdit(item.id)}
                    onKeyDown={e => { if (e.key === "Enter") onCommitEdit(item.id); if (e.key === "Escape") onSetEditingId(null) }}
                    className="px-3 py-1 rounded text-sm bg-muted border border-border text-foreground outline-none w-24"
                />
            ) : (
                <div className="flex items-center">
                    <button
                        {...attributes} {...listeners}
                        onClick={() => {
                            if (item.targetPageId && popoverId !== item.id) { onNavigate(item.targetPageId); return }
                            onSetPopoverId(popoverId === item.id ? null : item.id)
                        }}
                        onDoubleClick={() => { onSetEditingId(item.id); onSetEditValue(item.label) }}
                        className={cn(
                            "flex items-center gap-1.5 px-3 py-1 rounded text-sm transition-colors select-none cursor-grab active:cursor-grabbing",
                            item.targetPageId
                                ? "text-muted-foreground hover:text-foreground"
                                : "text-muted-foreground/40 hover:text-muted-foreground/70",
                        )}
                        title={item.targetPageId ? `Navega para: ${pages.find(p => p.id === item.targetPageId)?.label}` : "Clique para vincular"}
                    >
                        {item.targetPageId && <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />}
                        {item.label}
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); onRemoveItem(item.id) }}
                        className="flex h-4 w-4 items-center justify-center rounded opacity-0 group-hover/nav:opacity-100 text-muted-foreground/40 hover:text-destructive transition-all"
                        title="Remover"
                    >
                        <XIcon />
                    </button>
                </div>
            )}
            {popoverId === item.id && (
                <NavLinkPopover
                    anchorRef={itemRef}
                    pages={pages}
                    currentPageId={item.targetPageId}
                    onLink={(pageId) => onUpdateItem(item.id, undefined, pageId)}
                    onRemove={() => onRemoveItem(item.id)}
                    onClose={() => onSetPopoverId(null)}
                    mode="edit"
                />
            )}
        </div>
    )
}

function MockNavbar({
    pages, items, onNavigate, onAddItem, onUpdateItem, onRemoveItem, onReorderItem,
}: {
    pages: Page[]
    items: NavItem[]
    onNavigate: (pageId: PageId) => void
    onAddItem: (item: NavItem) => void
    onUpdateItem: (itemId: string, label?: string, targetPageId?: PageId | null) => void
    onRemoveItem: (itemId: string) => void
    onReorderItem: (activeId: string, overId: string) => void
}) {
    const [popoverId, setPopoverId] = React.useState<string | null>(null)
    const [addPopover, setAddPopover] = React.useState(false)
    const [editingId, setEditingId] = React.useState<string | null>(null)
    const [editValue, setEditValue] = React.useState("")
    const addRef = React.useRef<HTMLButtonElement | null>(null)
    const navDndId = React.useId()
    const navSensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }))

    function commitEdit(id: string) {
        const trimmed = editValue.trim()
        if (trimmed && trimmed !== items.find(i => i.id === id)?.label) {
            onUpdateItem(id, trimmed)
        }
        setEditingId(null)
    }

    function handleNavDragEnd(e: DragEndEvent) {
        const { active, over } = e
        if (over && String(active.id) !== String(over.id)) {
            onReorderItem(String(active.id), String(over.id))
        }
    }

    return (
        <div className="shrink-0 h-12 bg-card border-b border-border flex items-center gap-5 px-5">
            <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded bg-primary/60 shrink-0" />
                <div className="w-20 h-2 rounded-full bg-muted-foreground/15" />
            </div>
            <DndContext id={navDndId} sensors={navSensors} onDragEnd={handleNavDragEnd}>
                <SortableContext items={items.map(i => i.id)} strategy={horizontalListSortingStrategy}>
                    <div className="flex items-center gap-1">
                        {items.map(item => (
                            <SortableNavItem
                                key={item.id} item={item} pages={pages}
                                editingId={editingId} editValue={editValue} popoverId={popoverId}
                                onSetEditingId={setEditingId} onSetEditValue={setEditValue}
                                onCommitEdit={commitEdit} onSetPopoverId={setPopoverId}
                                onNavigate={onNavigate} onUpdateItem={onUpdateItem} onRemoveItem={onRemoveItem}
                            />
                        ))}
                        {/* Add link button */}
                        <div className="relative">
                            <button
                                ref={addRef}
                                onClick={() => setAddPopover(v => !v)}
                                className="flex items-center gap-1 px-3 py-1 rounded text-sm text-muted-foreground/50 hover:text-primary border border-dashed border-muted-foreground/20 hover:border-primary/40 transition-colors"
                            >
                                <PlusIcon /> link
                            </button>
                            {addPopover && (
                                <NavLinkPopover
                                    anchorRef={addRef}
                                    pages={pages}
                                    currentPageId={null}
                                    onLink={(pageId) => {
                                        const page = pages.find(p => p.id === pageId)
                                        onAddItem({ id: newId(), label: page?.label ?? "link", targetPageId: pageId })
                                    }}
                                    onClose={() => setAddPopover(false)}
                                    mode="add"
                                />
                            )}
                        </div>
                    </div>
                </SortableContext>
            </DndContext>
            <div className="ml-auto flex items-center gap-2">
                <div className="w-20 h-5 rounded bg-muted" />
                <div className="w-7 h-7 rounded-full bg-muted" />
            </div>
        </div>
    )
}

// ─── Mock sidebar (collapsible + variable width) ───────────────────────────────

function SortableSidebarItem({
    item, pages, width, editingId, editValue, popoverId,
    onSetEditingId, onSetEditValue, onCommitEdit, onSetPopoverId,
    onNavigate, onUpdateItem, onRemoveItem,
}: {
    item: NavItem; pages: Page[]; width: number
    editingId: string | null; editValue: string; popoverId: string | null
    onSetEditingId: (id: string | null) => void; onSetEditValue: (v: string) => void
    onCommitEdit: (id: string) => void; onSetPopoverId: (id: string | null) => void
    onNavigate: (pageId: PageId) => void
    onUpdateItem: (itemId: string, label?: string, targetPageId?: PageId | null) => void
    onRemoveItem: (itemId: string) => void
}) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: item.id })
    const itemRef = React.useRef<HTMLDivElement | null>(null)
    const style: React.CSSProperties = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.4 : 1,
    }
    return (
        <div ref={node => { setNodeRef(node); itemRef.current = node }} style={style} className="relative group/side">
            {editingId === item.id ? (
                <div className="mx-2 px-3 py-1.5" style={{ width: `calc(100% - 16px)` }}>
                    <input
                        autoFocus
                        value={editValue}
                        onChange={e => onSetEditValue(e.target.value)}
                        onBlur={() => onCommitEdit(item.id)}
                        onKeyDown={e => { if (e.key === "Enter") onCommitEdit(item.id); if (e.key === "Escape") onSetEditingId(null) }}
                        className="w-full px-2 py-0.5 rounded text-sm bg-muted border border-border text-foreground outline-none"
                    />
                </div>
            ) : (
                <div className="flex items-center">
                    <button
                        {...attributes} {...listeners}
                        onClick={() => {
                            if (item.targetPageId && popoverId !== item.id) { onNavigate(item.targetPageId); return }
                            onSetPopoverId(popoverId === item.id ? null : item.id)
                        }}
                        onDoubleClick={() => { onSetEditingId(item.id); onSetEditValue(item.label) }}
                        className={cn(
                            "flex items-center gap-2.5 flex-1 mx-2 px-3 py-1.5 rounded-md select-none transition-colors text-left cursor-grab active:cursor-grabbing",
                            item.targetPageId
                                ? "bg-primary/10"
                                : "hover:bg-muted/50",
                        )}
                        title={item.targetPageId ? `Navega para: ${pages.find(p => p.id === item.targetPageId)?.label}` : "Clique para vincular"}
                    >
                        <div className={cn("w-3 h-3 rounded-sm shrink-0", item.targetPageId ? "bg-primary/60" : "bg-muted-foreground/15")} />
                        <span className={cn("text-sm truncate", item.targetPageId ? "text-primary font-medium" : "text-muted-foreground/40")}>{item.label}</span>
                        {item.targetPageId && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary shrink-0" />}
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); onRemoveItem(item.id) }}
                        className="flex h-4 w-4 items-center justify-center rounded mr-2 opacity-0 group-hover/side:opacity-100 text-muted-foreground/40 hover:text-destructive transition-all shrink-0"
                        title="Remover"
                    >
                        <XIcon />
                    </button>
                </div>
            )}
            {popoverId === item.id && (
                <NavLinkPopover
                    anchorRef={itemRef}
                    pages={pages}
                    currentPageId={item.targetPageId}
                    onLink={(pageId) => onUpdateItem(item.id, undefined, pageId)}
                    onRemove={() => onRemoveItem(item.id)}
                    onClose={() => onSetPopoverId(null)}
                    mode="edit"
                />
            )}
        </div>
    )
}

function MockSidebar({
    isOpen, onToggle, width, pages, items, onNavigate, onAddItem, onUpdateItem, onRemoveItem, onReorderItem, side = "left",
}: {
    isOpen: boolean; onToggle: () => void; width: number
    pages: Page[]; items: NavItem[]
    onNavigate: (pageId: PageId) => void
    onAddItem: (item: NavItem) => void
    onUpdateItem: (itemId: string, label?: string, targetPageId?: PageId | null) => void
    onRemoveItem: (itemId: string) => void
    onReorderItem: (activeId: string, overId: string) => void
    side?: "left" | "right"
}) {
    const [popoverId, setPopoverId] = React.useState<string | null>(null)
    const [addPopover, setAddPopover] = React.useState(false)
    const [editingId, setEditingId] = React.useState<string | null>(null)
    const [editValue, setEditValue] = React.useState("")
    const addRef = React.useRef<HTMLButtonElement | null>(null)
    const sidebarDndId = React.useId()
    const sidebarSensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }))

    function commitEdit(id: string) {
        const trimmed = editValue.trim()
        if (trimmed && trimmed !== items.find(i => i.id === id)?.label) {
            onUpdateItem(id, trimmed)
        }
        setEditingId(null)
    }

    function handleSidebarDragEnd(e: DragEndEvent) {
        const { active, over } = e
        if (over && String(active.id) !== String(over.id)) {
            onReorderItem(String(active.id), String(over.id))
        }
    }

    const borderClass = side === "left" ? "border-r border-border" : "border-l border-border"

    if (!isOpen) {
        return (
            <div className={cn("shrink-0 w-10 bg-card flex flex-col items-center pt-2 gap-2", borderClass)}>
                <button onClick={onToggle} className="flex h-6 w-6 items-center justify-center rounded text-muted-foreground/40 hover:text-muted-foreground hover:bg-muted transition-colors" title="Expandir">
                    {side === "left" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </button>
                {items.map(item => (
                    <div key={item.id} className={cn("w-5 h-5 rounded-sm relative", item.targetPageId ? "bg-primary/40" : "bg-muted-foreground/10")}>
                        {item.targetPageId && <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-primary" />}
                    </div>
                ))}
                <button
                    onClick={() => setAddPopover(v => !v)}
                    className="w-5 h-5 rounded-sm flex items-center justify-center text-muted-foreground/30 hover:text-primary hover:bg-muted transition-colors"
                    title="Adicionar link"
                >
                    <PlusIcon />
                </button>
            </div>
        )
    }
    return (
        <div className={cn("shrink-0 bg-card flex flex-col py-2 gap-0.5 overflow-y-auto", borderClass, "[&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[var(--border)]")} style={{ width }}>
            <div className={cn("flex items-center px-2 mb-1", side === "left" ? "justify-end" : "justify-start")}>
                <button onClick={onToggle} className="flex h-5 w-5 items-center justify-center rounded text-muted-foreground/40 hover:text-muted-foreground hover:bg-muted transition-colors" title="Recolher">
                    {side === "left" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </button>
            </div>
            <DndContext id={sidebarDndId} sensors={sidebarSensors} onDragEnd={handleSidebarDragEnd}>
                <SortableContext items={items.map(i => i.id)} strategy={verticalListSortingStrategy}>
                    {items.map(item => (
                        <SortableSidebarItem
                            key={item.id} item={item} pages={pages} width={width}
                            editingId={editingId} editValue={editValue} popoverId={popoverId}
                            onSetEditingId={setEditingId} onSetEditValue={setEditValue}
                            onCommitEdit={commitEdit} onSetPopoverId={setPopoverId}
                            onNavigate={onNavigate} onUpdateItem={onUpdateItem} onRemoveItem={onRemoveItem}
                        />
                    ))}
                </SortableContext>
            </DndContext>
            {/* Add link button */}
            <div className="relative mx-2 mt-1">
                <button
                    ref={addRef}
                    onClick={() => setAddPopover(v => !v)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm text-muted-foreground/40 hover:text-primary transition-colors"
                >
                    <PlusIcon /> adicionar link
                </button>
                {addPopover && (
                    <NavLinkPopover
                        anchorRef={addRef}
                        pages={pages}
                        currentPageId={null}
                        onLink={(pageId) => {
                            const page = pages.find(p => p.id === pageId)
                            onAddItem({ id: newId(), label: page?.label ?? "link", targetPageId: pageId })
                        }}
                        onClose={() => setAddPopover(false)}
                        mode="add"
                    />
                )}
            </div>
        </div>
    )
}

// ─── Grid & Cells SVG backgrounds ───────────────────────────────────────────

/** Column guides: vertical lines only (Figma-style) — contentWidth = container minus padding */
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

/** Cell outlines: one rect per grid cell — contentWidth = container minus padding */
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

// Module-level ref for pending palette drop (browser dataTransfer not readable during dragover)
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

    // Group selected items by their original category
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
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">Componentes</p>
                <p className="text-[10px] text-muted-foreground/50 mt-0.5">{CHART_PALETTE.length} disponíveis</p>
            </div>
            <div className="flex flex-col py-1">
                {/* Selected components section */}
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

                {/* Regular sections */}
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

function RGLCanvasCard({
    item, onRemove, onLink, onConfigChange, pages,
}: {
    item: CanvasItem; onRemove: () => void
    onLink: (instanceId: string, targetPageId: PageId | null) => void
    onConfigChange?: (instanceId: string, config: Partial<ItemConfig>) => void
    pages: Page[]
}) {
    const cardRef = React.useRef<HTMLDivElement | null>(null)
    const [showLinkPopover, setShowLinkPopover] = React.useState(false)
    const [showConfigPopover, setShowConfigPopover] = React.useState(false)

    const layout = isLayoutComponent(item.chartId)
    const configurable = isConfigurableItem(item.chartId)
    const noCardInner = skipCardInner(item.chartId)
    const Component = configurable ? null : CHART_COMPONENTS[item.chartId]
    const totalPx = item.h * RGL_ROW_HEIGHT + (item.h - 1) * RGL_MARGIN[1]
    const chartHeight = Math.max(80, totalPx - CARD_OVERHEAD)

    // Render the correct configurable component based on chartId
    function renderConfigurable() {
        const cid = item.chartId
        if (isShapeItem(cid)) return <ShapeElement config={(item.config as ShapeConfig) ?? DEFAULT_SHAPE_CONFIG} chartHeight={totalPx} />
        if (isCardShapeItem(cid)) return <CardShapeElement config={(item.config as CardShapeConfig) ?? DEFAULT_CARD_SHAPE_CONFIG} chartHeight={totalPx} />
        if (isContainerItem(cid)) return <ContainerElement config={(item.config as ContainerConfig) ?? DEFAULT_CONTAINER_CONFIG} />
        if (isLoginItem(cid)) return <LoginPage config={(item.config as LoginConfig) ?? DEFAULT_LOGIN_CONFIG} />
        if (isSignUpItem(cid)) return <SignUpPage config={(item.config as SignUpConfig) ?? DEFAULT_SIGNUP_CONFIG} />
        if (isStatCardItem(cid)) return <StatCardDemo config={(item.config as StatCardConfig) ?? DEFAULT_STAT_CARD_CONFIG} />
        if (isKanbanItem(cid)) return <KanbanBoard config={(item.config as KanbanConfig) ?? DEFAULT_KANBAN_CONFIG} />
        if (isButtonItem(cid)) return <ButtonShowcase config={(item.config as ButtonConfig) ?? DEFAULT_BUTTON_CONFIG} />
        if (isAvatarItem(cid)) return <AvatarShowcase config={(item.config as AvatarConfig) ?? DEFAULT_AVATAR_CONFIG} />
        if (isThemeToggleItem(cid)) return <ThemeToggle config={(item.config as ThemeToggleConfig) ?? DEFAULT_THEME_TOGGLE_CONFIG} />
        return null
    }

    // Render the correct config popover
    function renderConfigPopover() {
        if (!showConfigPopover || !onConfigChange) return null
        const close = () => setShowConfigPopover(false)
        const change = (partial: Partial<ItemConfig>) => onConfigChange(item.instanceId, partial)
        const cid = item.chartId
        if (isShapeItem(cid)) return <ShapeConfigPopover config={(item.config as ShapeConfig) ?? DEFAULT_SHAPE_CONFIG} onChange={change} onClose={close} />
        if (isCardShapeItem(cid)) return <CardShapeConfigPopover config={(item.config as CardShapeConfig) ?? DEFAULT_CARD_SHAPE_CONFIG} onChange={change} onClose={close} />
        if (isContainerItem(cid)) return <ContainerConfigPopover config={(item.config as ContainerConfig) ?? DEFAULT_CONTAINER_CONFIG} onChange={change} onClose={close} />
        if (isLoginItem(cid)) return <LoginConfigPopover config={(item.config as LoginConfig) ?? DEFAULT_LOGIN_CONFIG} onChange={change} onClose={close} pages={pages} />
        if (isSignUpItem(cid)) return <SignUpConfigPopover config={(item.config as SignUpConfig) ?? DEFAULT_SIGNUP_CONFIG} onChange={change} onClose={close} pages={pages} />
        if (isStatCardItem(cid)) return <StatCardConfigPopover config={(item.config as StatCardConfig) ?? DEFAULT_STAT_CARD_CONFIG} onChange={change} onClose={close} />
        if (isKanbanItem(cid)) return <KanbanConfigPopover config={(item.config as KanbanConfig) ?? DEFAULT_KANBAN_CONFIG} onChange={change} onClose={close} />
        if (isButtonItem(cid)) return <ButtonConfigPopover config={(item.config as ButtonConfig) ?? DEFAULT_BUTTON_CONFIG} onChange={change} onClose={close} pages={pages} />
        if (isAvatarItem(cid)) return <AvatarConfigPopover config={(item.config as AvatarConfig) ?? DEFAULT_AVATAR_CONFIG} onChange={change} onClose={close} />
        return null
    }

    return (
        <div ref={cardRef} className="relative group h-full">
            {/* Render: configurable components or standard chart */}
            {configurable ? (
                noCardInner ? (
                    <div className="h-full overflow-hidden">{renderConfigurable()}</div>
                ) : (
                    <div className="card-inner [&>*:first-child]:!p-0">{renderConfigurable()}</div>
                )
            ) : (
                <div className="card-inner [&>*:first-child]:!p-0">
                    {Component && React.createElement(
                        Component as React.ComponentType<{ chartHeight?: number }>,
                        { chartHeight }
                    )}
                </div>
            )}

            {/* Drag handle + controls overlay */}
            <div className="absolute top-3 right-8 z-20 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                <div className="card-drag-handle flex h-6 w-6 items-center justify-center rounded bg-card/90 backdrop-blur-sm border border-border/60 cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground shadow-sm pointer-events-auto">
                    <GripIcon />
                </div>
                {configurable && (
                    <button onClick={() => { setShowConfigPopover(v => !v); setShowLinkPopover(false) }}
                        className={cn(
                            "flex h-6 w-6 items-center justify-center rounded bg-card/90 backdrop-blur-sm border border-border/60 shadow-sm transition-colors pointer-events-auto",
                            showConfigPopover ? "text-primary" : "text-muted-foreground hover:text-foreground",
                        )}
                        title="Configurar">
                        <SettingsIcon />
                    </button>
                )}
                <button onClick={() => { setShowLinkPopover(v => !v); setShowConfigPopover(false) }}
                    className={cn(
                        "flex h-6 w-6 items-center justify-center rounded bg-card/90 backdrop-blur-sm border border-border/60 shadow-sm transition-colors pointer-events-auto",
                        item.targetPageId ? "text-primary" : "text-muted-foreground hover:text-foreground",
                    )}
                    title={item.targetPageId ? `Link: ${pages.find(p => p.id === item.targetPageId)?.label ?? "?"}` : "Vincular a página"}>
                    <LinkIcon />
                </button>
                <span className="flex h-6 items-center px-1.5 rounded bg-card/90 backdrop-blur-sm border border-border/60 text-[10px] tabular-nums text-muted-foreground shadow-sm select-none">
                    {layout ? "Full width" : <>{item.w}&times;{item.h}</>}
                </span>
                <button onClick={onRemove}
                    className="flex h-6 w-6 items-center justify-center rounded bg-card/90 backdrop-blur-sm border border-border/60 text-muted-foreground hover:text-foreground shadow-sm transition-colors pointer-events-auto"
                    title="Remover">
                    <XIcon />
                </button>
            </div>

            {/* Config popover */}
            {renderConfigPopover()}

            {/* Link popover */}
            {showLinkPopover && (
                <div className="absolute top-12 right-8 z-30">
                    <NavLinkPopover
                        anchorRef={cardRef}
                        pages={pages}
                        currentPageId={item.targetPageId ?? null}
                        onLink={(pageId) => { onLink(item.instanceId, pageId); setShowLinkPopover(false) }}
                        onRemove={() => { onLink(item.instanceId, null); setShowLinkPopover(false) }}
                        onClose={() => setShowLinkPopover(false)}
                        mode={item.targetPageId ? "edit" : "add"}
                    />
                </div>
            )}

            {/* Link indicator */}
            {item.targetPageId && (
                <div className="absolute bottom-2 left-3 z-20 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none">
                    <LinkIcon />
                    <span className="text-[10px] text-primary/70">{pages.find(p => p.id === item.targetPageId)?.label}</span>
                </div>
            )}
        </div>
    )
}

// ─── Preview card (RGL child, no controls) ──────────────────────────────────

function RGLPreviewCard({ item, onNavigate }: {
    item: CanvasItem
    onNavigate?: (pageId: PageId) => void
}) {
    const linked = !!item.targetPageId
    const configurable = isConfigurableItem(item.chartId)
    const noCardInner = skipCardInner(item.chartId)
    const Component = configurable ? null : CHART_COMPONENTS[item.chartId]
    const totalPx = item.h * RGL_ROW_HEIGHT + (item.h - 1) * RGL_MARGIN[1]
    const chartHeight = Math.max(80, totalPx - CARD_OVERHEAD)

    function renderConfigurable() {
        const cid = item.chartId
        if (isShapeItem(cid)) return <ShapeElement config={(item.config as ShapeConfig) ?? DEFAULT_SHAPE_CONFIG} chartHeight={totalPx} />
        if (isCardShapeItem(cid)) return <CardShapeElement config={(item.config as CardShapeConfig) ?? DEFAULT_CARD_SHAPE_CONFIG} chartHeight={totalPx} />
        if (isContainerItem(cid)) return <ContainerElement config={(item.config as ContainerConfig) ?? DEFAULT_CONTAINER_CONFIG} />
        if (isLoginItem(cid)) return <LoginPage config={(item.config as LoginConfig) ?? DEFAULT_LOGIN_CONFIG} />
        if (isSignUpItem(cid)) return <SignUpPage config={(item.config as SignUpConfig) ?? DEFAULT_SIGNUP_CONFIG} />
        if (isStatCardItem(cid)) return <StatCardDemo config={(item.config as StatCardConfig) ?? DEFAULT_STAT_CARD_CONFIG} />
        if (isKanbanItem(cid)) return <KanbanBoard config={(item.config as KanbanConfig) ?? DEFAULT_KANBAN_CONFIG} />
        if (isButtonItem(cid)) return <ButtonShowcase config={(item.config as ButtonConfig) ?? DEFAULT_BUTTON_CONFIG} />
        if (isAvatarItem(cid)) return <AvatarShowcase config={(item.config as AvatarConfig) ?? DEFAULT_AVATAR_CONFIG} />
        if (isThemeToggleItem(cid)) return <ThemeToggle config={(item.config as ThemeToggleConfig) ?? DEFAULT_THEME_TOGGLE_CONFIG} />
        return null
    }

    return (
        <div
            className={cn("relative h-full", linked && "cursor-pointer")}
            onClick={linked && item.targetPageId ? () => onNavigate?.(item.targetPageId!) : undefined}
        >
            {configurable ? (
                noCardInner ? (
                    <div className={cn("h-full overflow-hidden", linked && "hover:ring-2 hover:ring-primary/30")}>{renderConfigurable()}</div>
                ) : (
                    <div className={cn("card-inner [&>*:first-child]:!p-0", linked && "hover:ring-2 hover:ring-primary/30")}>{renderConfigurable()}</div>
                )
            ) : (
                <div className={cn("card-inner [&>*:first-child]:!p-0", linked && "hover:ring-2 hover:ring-primary/30")}>
                    {Component && React.createElement(
                        Component as React.ComponentType<{ chartHeight?: number }>,
                        { chartHeight }
                    )}
                </div>
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

    // Flush pending saves on unmount
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
        />
    )
}

function DashboardBuilderInner({
    initialData, dashboardId, workspaceSlug, onSave,
}: {
    initialData: SavedData | null
    dashboardId: string
    workspaceSlug: string
    onSave: (data: DashboardData) => void
}) {
    const saved = initialData

    // ── Builder state with undo/redo ────────────────────────────────────────
    const [history, historyDispatch] = React.useReducer(historyReducer, undefined, (): HistoryState => ({
        current: saved?.builder ?? createInitialState(),
        past: [],
        future: [],
    }))
    const state = history.current
    const dispatch = historyDispatch as React.Dispatch<BuilderAction>
    const activePageMatch = state.pages.find(p => p.id === state.activePageId)
    const activePage = activePageMatch ?? state.pages[0]
    const canvasItems = activePage.canvasItems
    const canUndo = history.past.length > 0
    const canRedo = history.future.length > 0

    // Sync stale activePageId so dispatches (ADD_ITEM etc.) hit the right page
    React.useEffect(() => {
        if (!activePageMatch && state.pages.length > 0) {
            dispatch({ type: "SET_ACTIVE_PAGE", pageId: state.pages[0].id })
        }
    }, [activePageMatch, state.pages, dispatch])

    // ── Transient UI state ───────────────────────────────────────────────────
    const [copied,             setCopied]             = React.useState(false)
    const [activeTheme,        setActiveTheme]        = React.useState(saved?.ui.activeTheme ?? "Light")
    const [showPageConfig,     setShowPageConfig]     = React.useState(false)
    const [previewMode,        setPreviewMode]        = React.useState(false)

    const totalComponents = state.pages.reduce((sum, p) => sum + p.canvasItems.length, 0)

    // Force builder chrome to always be dark mode (also re-run after theme inspector sets root vars)
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
    const [showRightSidebar,       setShowRightSidebar]       = React.useState(saved?.ui.showRightSidebar ?? false)
    const [mockRightSidebarOpen,   setMockRightSidebarOpen]   = React.useState(saved?.ui.mockRightSidebarOpen ?? true)
    const [mockRightSidebarWidth,  setMockRightSidebarWidth]  = React.useState(saved?.ui.mockRightSidebarWidth ?? 192)

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
    const frameWidth = DEVICE_PRESETS.find(d => d.id === deviceId)?.width ?? 0

    // ── Resolved layout (inheritance) ────────────────────────────────────────
    const rootLayout: ResolvedLayout = React.useMemo(() => ({
        showNavbar, showSidebar, showRightSidebar,
        sidebarWidth: mockSidebarWidth, sidebarOpen: mockSidebarOpen,
        rightSidebarWidth: mockRightSidebarWidth, rightSidebarOpen: mockRightSidebarOpen,
        navbarItems: state.navbarItems, sidebarItems: state.sidebarItems, rightSidebarItems: state.rightSidebarItems,
        padV, padH,
    }), [showNavbar, showSidebar, showRightSidebar, mockSidebarWidth, mockSidebarOpen, mockRightSidebarWidth, mockRightSidebarOpen, state.navbarItems, state.sidebarItems, state.rightSidebarItems, padV, padH])

    const activeLayout = React.useMemo(
        () => resolveLayout(state.pages, state.activePageId, rootLayout),
        [state.pages, state.activePageId, rootLayout],
    )

    // Which pageId to pass for per-page nav edits (undefined = global)
    const navEditPageId = (target: "navbarItems" | "sidebarItems" | "rightSidebarItems") =>
        activePage?.layout?.[target] !== undefined ? state.activePageId : undefined

    // ── Auto-save via adapter (debounced inside DataProvider) ──────────────
    React.useEffect(() => {
        onSave({
            builder: state,
            ui: {
                activeTheme,
                showNavbar, showSidebar, mockSidebarOpen, mockSidebarWidth,
                showRightSidebar, mockRightSidebarOpen, mockRightSidebarWidth,
                gridOpacity, padV, padH, deviceId, useCompactor, contentMinHeight,
            },
        })
    }, [state, activeTheme, showNavbar, showSidebar, mockSidebarOpen, mockSidebarWidth, showRightSidebar, mockRightSidebarOpen, mockRightSidebarWidth, gridOpacity, padV, padH, deviceId, useCompactor, contentMinHeight, onSave])

    // Container width for RGL — shared between editor and preview via callback ref
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

    // RGL layout array (derived from canvasItems)
    // cloneLayoutItem produces 16-field items matching RGL's internal structure,
    // so fast-equals deepEqual comparison inside RGL returns true when values match.
    const rglLayout: RGLLayout = React.useMemo(
        () => canvasItems.map(item => cloneLayoutItem({ i: item.instanceId, x: item.x, y: item.y, w: item.w, h: item.h })),
        [canvasItems],
    )

    // Dropping item dimensions for RGL (read from _pendingDrop)
    const droppingItem: LayoutItem = React.useMemo(
        () => ({ i: "__dropping__", x: 0, y: 0, w: _pendingDrop?.w ?? 6, h: _pendingDrop?.h ?? 4 }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [_pendingDrop?.w, _pendingDrop?.h],
    )

    // ─── Memoized RGL config objects (prevents infinite useEffect loop) ──────
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

    // Content wrapper style: CSS padding (replaces RGL containerPadding) + grid/cells background
    const contentWrapperStyle = React.useMemo(() => {
        const s: React.CSSProperties = {
            padding: `${activeLayout.padV}px ${activeLayout.padH}px`,
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
    }, [activeLayout.padV, activeLayout.padH, gridOpacity, showGrid, showCells, containerWidth])

    // Theme vars applied as inline styles on the device frame (not on root)
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
        const config = getDefaultConfig(chartId)
        const newItem: CanvasItem = {
            instanceId: newId(), chartId: entry.id, name: entry.name,
            description: entry.description, importStatement: entry.importStatement,
            dataType: entry.dataType,
            x: 0, y, w, h,
            ...(config && { config }),
        }
        dispatch({ type: "ADD_ITEM", item: newItem })
    }

    function removeItem(instanceId: string) { dispatch({ type: "REMOVE_ITEM", instanceId }) }

    // Terminal events: sync layout only when user interaction ends (not on every internal RGL state change).
    // This breaks the feedback loop that caused "Maximum update depth exceeded".
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
        const config = getDefaultConfig(chartId)
        dispatch({ type: "ADD_ITEM", item: {
            instanceId: newId(), chartId, name: entry.name,
            description: entry.description, importStatement: entry.importStatement,
            dataType: entry.dataType,
            x: layoutItem.x, y: layoutItem.y,
            w: layoutItem.w, h: layoutItem.h,
            ...(config && { config }),
        }})
        // Sync existing items' positions (compaction may have shifted them during drop)
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

    function handleExport() {
        const exportParams: ExportParams = {
            pages: state.pages, navbarItems: state.navbarItems, sidebarItems: state.sidebarItems, rightSidebarItems: state.rightSidebarItems,
            themeName: activeTheme, padV, padH,
            showNavbar, showSidebar, mockSidebarWidth, mockSidebarOpen,
            showRightSidebar, mockRightSidebarWidth, mockRightSidebarOpen,
        }
        const text = generateExportTextFull(exportParams)
        navigator.clipboard.writeText(text).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000) })
    }

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

    // ─── Mini input helper ──────────────────────────────────────────────────────
    function NumInput({ value, onChange, min = 0, max = 999, step = 4, w = "w-14" }: { value: number; onChange: (v: number) => void; min?: number; max?: number; step?: number; w?: string }) {
        return <input type="number" min={min} max={max} step={step} value={value}
            onChange={e => onChange(Math.max(min, Math.min(max, Number(e.target.value))))}
            className={cn("h-5 rounded border border-border bg-background px-1.5 text-[10px] text-foreground text-center", w)} />
    }

    // ── Preview Mode ──────────────────────────────────────────────────────────
    if (previewMode) {
        return (
            <div className="flex h-screen flex-col overflow-hidden bg-background text-foreground" style={themeStyle as React.CSSProperties}>
                {/* Navbar */}
                {showNavbar && (
                    <div className="shrink-0 h-12 bg-card border-b border-border flex items-center gap-5 px-5">
                        <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded bg-primary/60 shrink-0" />
                            <div className="w-20 h-2 rounded-full bg-muted-foreground/15" />
                        </div>
                        <div className="flex items-center gap-1">
                            {state.navbarItems.map(item => (
                                <button key={item.id}
                                    onClick={() => item.targetPageId && dispatch({ type: "SET_ACTIVE_PAGE", pageId: item.targetPageId })}
                                    className={cn(
                                        "flex items-center gap-1.5 px-3 py-1 rounded text-sm transition-colors select-none",
                                        item.targetPageId
                                            ? item.targetPageId === state.activePageId
                                                ? "text-foreground font-medium bg-muted"
                                                : "text-muted-foreground hover:text-foreground hover:bg-muted/50 cursor-pointer"
                                            : "text-muted-foreground/30 cursor-default",
                                    )}
                                >
                                    {item.label}
                                </button>
                            ))}
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
                        <div className={cn("shrink-0 bg-card border-r border-border flex flex-col py-2 gap-0.5 overflow-y-auto", "[&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[var(--border)]")} style={{ width: mockSidebarWidth }}>
                            <div className="px-3 mb-2">
                                <div className="flex items-center gap-2 px-2 py-1.5">
                                    <div className="w-4 h-4 rounded bg-primary/60 shrink-0" />
                                    <div className="w-16 h-2 rounded-full bg-muted-foreground/15" />
                                </div>
                            </div>
                            {state.sidebarItems.map(item => {
                                const isActive = item.targetPageId === state.activePageId
                                return (
                                    <button key={item.id}
                                        onClick={() => item.targetPageId && dispatch({ type: "SET_ACTIVE_PAGE", pageId: item.targetPageId })}
                                        className={cn(
                                            "flex items-center gap-2.5 mx-2 px-3 py-1.5 rounded-md select-none transition-colors text-left text-sm",
                                            item.targetPageId
                                                ? isActive
                                                    ? "bg-primary/10 text-foreground font-medium"
                                                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50 cursor-pointer"
                                                : "text-muted-foreground/30 cursor-default",
                                        )}
                                    >
                                        <div className={cn("w-3 h-3 rounded-sm shrink-0", item.targetPageId ? isActive ? "bg-primary" : "bg-primary/40" : "bg-muted-foreground/10")} />
                                        {item.label}
                                    </button>
                                )
                            })}
                        </div>
                    )}

                    {/* Content */}
                    <div ref={setContentRef} className={cn("flex-1 overflow-y-auto bg-background", "[&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[var(--border)]")} style={{ padding: `${activeLayout.padV}px ${activeLayout.padH}px` }}>
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
                                    <RGLPreviewCard item={item} onNavigate={(pageId) => dispatch({ type: "SET_ACTIVE_PAGE", pageId })} />
                                </div>
                            ))}
                        </ReactGridLayout>
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
                <div className="flex-1" />
                <div className="flex items-center gap-3 shrink-0">
                    <Link href={`/w/${workspaceSlug}`}
                        className="flex items-center gap-1.5 rounded border border-border px-3 py-1 text-xs font-medium text-muted-foreground transition-colors hover:border-primary hover:text-primary">
                        <BackIcon /> Projetos
                    </Link>
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

                {/* Layout mocks */}
                <div className="flex items-center gap-2 px-2 shrink-0">
                    <button onClick={() => setShowNavbar(v => !v)} className={cn("flex items-center gap-1.5 transition-colors", showNavbar ? "text-primary" : "text-muted-foreground hover:text-foreground")}>
                        <NavbarIcon /> Navbar
                    </button>
                    <button onClick={() => setShowSidebar(v => !v)} className={cn("flex items-center gap-1.5 transition-colors", showSidebar ? "text-primary" : "text-muted-foreground hover:text-foreground")}>
                        <SidebarIcon /> Sidebar
                    </button>
                    <button onClick={() => setShowRightSidebar(v => !v)} className={cn("flex items-center gap-1.5 transition-colors", showRightSidebar ? "text-primary" : "text-muted-foreground hover:text-foreground")}>
                        <SidebarRightIcon /> Sidebar
                    </button>
                    {(showSidebar || showRightSidebar) && <>
                        <span className="text-muted-foreground/40">·</span>
                        <span className="text-muted-foreground">Largura</span>
                        {showSidebar && <NumInput value={mockSidebarWidth} onChange={setMockSidebarWidth} min={80} max={400} step={8} w="w-14" />}
                        {showRightSidebar && <NumInput value={mockRightSidebarWidth} onChange={setMockRightSidebarWidth} min={80} max={400} step={8} w="w-14" />}
                        <span className="text-muted-foreground/60">px</span>
                    </>}
                </div>

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
                <DeviceDropdown deviceId={deviceId} onSelect={setDeviceId} />
            </div>

            {/* ── Page tabs (visible when >1 page) ──────────────────────────── */}
            {state.pages.length > 1 && (
                <div className="shrink-0 flex items-center border-b border-border bg-card/40 px-4 mt-[5px] h-8 gap-1 overflow-x-auto">
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
                                        ? "border border-primary border-b-transparent bg-primary/10 text-primary font-medium -mb-px"
                                        : "border border-border border-b-transparent -mb-px text-muted-foreground hover:text-foreground hover:bg-muted/50",
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
            <div className="relative flex flex-1 overflow-hidden">
              <BuilderPageContext.Provider value={{ pages: state.pages, activePageId: state.activePageId }}>

                    {/* Component palette */}
                    <PaletteSidebar onAdd={addChart} themeStyle={themeStyle} selectedIds={selectedIds} />

                    {/* Stage */}
                    <div className="flex-1 overflow-hidden flex flex-col p-8 gap-4 bg-white/[.02] [background-image:radial-gradient(oklch(1_0_0/0.12)_0.75px,transparent_0.75px)] [background-size:16px_16px]">
                        {(() => {
                            // Shared screen content (uses resolved activeLayout for inheritance)
                            const screenContent = (
                                <>
                                    {activeLayout.showNavbar && (
                                        <MockNavbar
                                            pages={state.pages}
                                            items={activeLayout.navbarItems}
                                            onNavigate={(pageId) => dispatch({ type: "SET_ACTIVE_PAGE", pageId })}
                                            onAddItem={(item) => dispatch({ type: "ADD_NAV_ITEM", target: "navbar", item, pageId: navEditPageId("navbarItems") })}
                                            onUpdateItem={(itemId, label, targetPageId) => dispatch({ type: "UPDATE_NAV_ITEM", target: "navbar", itemId, label, targetPageId, pageId: navEditPageId("navbarItems") })}
                                            onRemoveItem={(itemId) => dispatch({ type: "REMOVE_NAV_ITEM", target: "navbar", itemId, pageId: navEditPageId("navbarItems") })}
                                            onReorderItem={(activeId, overId) => dispatch({ type: "REORDER_NAV_ITEM", target: "navbar", activeId, overId, pageId: navEditPageId("navbarItems") })}
                                        />
                                    )}
                                    <div className="flex flex-1 min-h-0 overflow-hidden">
                                        {activeLayout.showSidebar && (
                                            <MockSidebar
                                                isOpen={activeLayout.sidebarOpen}
                                                onToggle={() => setMockSidebarOpen(v => !v)}
                                                width={activeLayout.sidebarWidth}
                                                pages={state.pages}
                                                items={activeLayout.sidebarItems}
                                                onNavigate={(pageId) => dispatch({ type: "SET_ACTIVE_PAGE", pageId })}
                                                onAddItem={(item) => dispatch({ type: "ADD_NAV_ITEM", target: "sidebar", item, pageId: navEditPageId("sidebarItems") })}
                                                onUpdateItem={(itemId, label, targetPageId) => dispatch({ type: "UPDATE_NAV_ITEM", target: "sidebar", itemId, label, targetPageId, pageId: navEditPageId("sidebarItems") })}
                                                onRemoveItem={(itemId) => dispatch({ type: "REMOVE_NAV_ITEM", target: "sidebar", itemId, pageId: navEditPageId("sidebarItems") })}
                                                onReorderItem={(activeId, overId) => dispatch({ type: "REORDER_NAV_ITEM", target: "sidebar", activeId, overId, pageId: navEditPageId("sidebarItems") })}
                                            />
                                        )}
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
                                                                onLink={(instanceId, targetPageId) => dispatch({ type: "LINK_ITEM", instanceId, targetPageId })}
                                                                onConfigChange={(instanceId, config) => dispatch({ type: "UPDATE_ITEM_CONFIG", instanceId, config })}
                                                                pages={state.pages}
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
                                        {activeLayout.showRightSidebar && (
                                            <MockSidebar
                                                isOpen={activeLayout.rightSidebarOpen}
                                                onToggle={() => setMockRightSidebarOpen(v => !v)}
                                                width={activeLayout.rightSidebarWidth}
                                                pages={state.pages}
                                                items={activeLayout.rightSidebarItems}
                                                onNavigate={(pageId) => dispatch({ type: "SET_ACTIVE_PAGE", pageId })}
                                                onAddItem={(item) => dispatch({ type: "ADD_NAV_ITEM", target: "right-sidebar", item, pageId: navEditPageId("rightSidebarItems") })}
                                                onUpdateItem={(itemId, label, targetPageId) => dispatch({ type: "UPDATE_NAV_ITEM", target: "right-sidebar", itemId, label, targetPageId, pageId: navEditPageId("rightSidebarItems") })}
                                                onRemoveItem={(itemId) => dispatch({ type: "REMOVE_NAV_ITEM", target: "right-sidebar", itemId, pageId: navEditPageId("rightSidebarItems") })}
                                                onReorderItem={(activeId, overId) => dispatch({ type: "REORDER_NAV_ITEM", target: "right-sidebar", activeId, overId, pageId: navEditPageId("rightSidebarItems") })}
                                                side="right"
                                            />
                                        )}
                                    </div>
                                </>
                            )

                            if (frameWidth > 0) {
                                // ── Tablet / Mobile — bordered frame ──
                                return (
                                    <div
                                        className="flex-1 min-h-0 mx-auto bg-background overflow-hidden flex flex-col rounded-xl border border-border shadow-lg"
                                        style={{ ...themeStyle, width: frameWidth }}
                                    >
                                        {screenContent}
                                    </div>
                                )
                            }

                            // ── Desktop full-width — no frame ──
                            return (
                                <div
                                    className="flex-1 min-h-0 mx-auto bg-background overflow-hidden flex flex-col border border-border shadow-lg"
                                    style={{ ...themeStyle, width: "100%" }}
                                >
                                    {screenContent}
                                </div>
                            )
                        })()}

                    </div>

              </BuilderPageContext.Provider>

                {/* Page config sidebar (overlay) */}
                {showPageConfig && (
                    <div className="absolute top-0 right-0 bottom-0 z-30 shadow-xl">
                        <PageConfigSidebar
                            pages={state.pages}
                            activePageId={state.activePageId}
                            dispatch={dispatch}
                            onClose={() => setShowPageConfig(false)}
                            rootLayout={rootLayout}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}
