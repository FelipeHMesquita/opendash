"use client"

import * as React from "react"
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
import { Navbar } from "@/componentsSugest/Navbar"
import { SidebarClosed } from "@/componentsSugest/SidebarClosed"
import { SidebarOpen } from "@/componentsSugest/SidebarOpen"
import { UIShowcase } from "@/componentsSugest/UIShowcase"
import { LoginPage } from "@/componentsSugest/LoginPage"
import { SignUpPage } from "@/componentsSugest/SignUpPage"
import { OnboardingPage } from "@/componentsSugest/OnboardingPage"
import { SettingsPage } from "@/componentsSugest/SettingsPage"
import { AccountSettings } from "@/componentsSugest/AccountSettings"
import { GeneralSettings } from "@/componentsSugest/GeneralSettings"
import { BillingPage } from "@/componentsSugest/BillingPage"
import { NotificationsPage } from "@/componentsSugest/NotificationsPage"
import { ErrorPage } from "@/componentsSugest/ErrorPage"
import { FrameBase } from "@/componentsSugest/FrameBase"
import { AccordionDemo, CollapsibleDemo } from "@/componentsSugest/shadcn/AccordionDemo"
import { CalendarDemo } from "@/componentsSugest/shadcn/CalendarDemo"
import { CarouselDemo } from "@/componentsSugest/shadcn/CarouselDemo"
import { DialogDemo } from "@/componentsSugest/shadcn/DialogDemo"
import { FormControlsDemo } from "@/componentsSugest/shadcn/FormControlsDemo"
import { MenuDemo } from "@/componentsSugest/shadcn/MenuDemo"
import { NavigationDemo } from "@/componentsSugest/shadcn/NavigationDemo"
import { FeedbackDemo } from "@/componentsSugest/shadcn/FeedbackDemo"
import { ResizableDemo } from "@/componentsSugest/shadcn/ResizableDemo"
import { BreadcrumbDemo } from "@/componentsSugest/shadcn/BreadcrumbDemo"
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
import { BarGrouped, BarStacked, BarHorizontal } from "@/componentsSugest/charts/RechartsBarChart"
import { AreaSimple, AreaStacked } from "@/componentsSugest/charts/RechartsAreaChart"
import { LineSimple, LineMulti } from "@/componentsSugest/charts/RechartsLineChart"
import { PieSimple, PieDonut, PieSeparated } from "@/componentsSugest/charts/RechartsPieChart"
import { RadarSimple, RadarMulti } from "@/componentsSugest/charts/RechartsRadarChart"
import { RadialGauge, RadialMulti, RadialStacked } from "@/componentsSugest/charts/RechartsRadialChart"
import { RankedSimple, RankedCategory } from "@/componentsSugest/charts/RechartsRankedList"
import { FunnelSales, FunnelMarketing } from "@/componentsSugest/charts/RechartsFunnelChart"

export interface VariantEntry {
    label: string
    element: React.ReactNode
    importStatement?: string  // fallback para entry.importStatement se omitido
}

export interface RegistryEntry {
    name: string
    importStatement: string
    element: React.ReactNode
    variants?: VariantEntry[]
}

export const componentRegistry: Record<string, RegistryEntry> = {
    "dash-card-list": {
        name: "Dash Card List",
        importStatement: 'import { DashCardList } from "@/componentsSugest/DashCardList"',
        element: <DashCardList />,
    },
    "data-table": {
        name: "Data Table",
        importStatement: 'import { DataTable } from "@/componentsSugest/DataTable"',
        element: <DataTable />,
    },
    "stat-cards": {
        name: "Stat Cards",
        importStatement: 'import { StatCardDemo } from "@/componentsSugest/StatCard"',
        element: <StatCardDemo />,
    },
    "chart-card": {
        name: "Chart Card",
        importStatement: 'import { ChartCard } from "@/componentsSugest/ChartCard"',
        element: <ChartCard />,
    },
    "kanban-board": {
        name: "Kanban Board",
        importStatement: 'import { KanbanBoard } from "@/componentsSugest/KanbanBoard"',
        element: <KanbanBoard />,
    },
    "activity-feed": {
        name: "Activity Feed",
        importStatement: 'import { ActivityFeed } from "@/componentsSugest/ActivityFeed"',
        element: <ActivityFeed />,
    },
    "command-palette": {
        name: "Command Palette",
        importStatement: 'import { CommandPalette } from "@/componentsSugest/CommandPalette"',
        element: <CommandPalette />,
    },
    "empty-state": {
        name: "Empty State",
        importStatement: 'import { EmptyState } from "@/componentsSugest/EmptyState"',
        element: <EmptyState />,
    },
    "form-page": {
        name: "Form Page",
        importStatement: 'import { FormPage } from "@/componentsSugest/FormPage"',
        element: <FormPage />,
    },
    "team-page": {
        name: "Team Page",
        importStatement: 'import { TeamPage } from "@/componentsSugest/TeamPage"',
        element: <TeamPage />,
    },
    "users-table": {
        name: "Users Table",
        importStatement: 'import { UsersTable } from "@/componentsSugest/UsersTable"',
        element: <UsersTable />,
    },
    "navbar": {
        name: "Navbar",
        importStatement: 'import { Navbar } from "@/componentsSugest/Navbar"',
        element: <Navbar />,
    },
    "sidebars": {
        name: "Sidebars",
        importStatement: 'import { SidebarClosed } from "@/componentsSugest/SidebarClosed"\nimport { SidebarOpen } from "@/componentsSugest/SidebarOpen"',
        element: (
            <div className="flex" style={{ height: 480 }}>
                <SidebarClosed />
                <SidebarOpen />
            </div>
        ),
    },
    "ui-showcase": {
        name: "UI Showcase",
        importStatement: 'import { UIShowcase } from "@/componentsSugest/UIShowcase"',
        element: <UIShowcase />,
    },
    "login": {
        name: "Login",
        importStatement: 'import { LoginPage } from "@/componentsSugest/LoginPage"',
        element: <LoginPage />,
    },
    "signup": {
        name: "Sign Up",
        importStatement: 'import { SignUpPage } from "@/componentsSugest/SignUpPage"',
        element: <SignUpPage />,
    },
    "onboarding": {
        name: "Onboarding",
        importStatement: 'import { OnboardingPage } from "@/componentsSugest/OnboardingPage"',
        element: <OnboardingPage />,
    },
    "settings": {
        name: "Settings",
        importStatement: 'import { SettingsPage } from "@/componentsSugest/SettingsPage"',
        element: <SettingsPage />,
    },
    "account-settings": {
        name: "Account Settings",
        importStatement: 'import { AccountSettings } from "@/componentsSugest/AccountSettings"',
        element: <AccountSettings />,
    },
    "general-settings": {
        name: "General Settings",
        importStatement: 'import { GeneralSettings } from "@/componentsSugest/GeneralSettings"',
        element: <GeneralSettings />,
    },
    "billing": {
        name: "Billing",
        importStatement: 'import { BillingPage } from "@/componentsSugest/BillingPage"',
        element: <BillingPage />,
    },
    "notifications": {
        name: "Notifications",
        importStatement: 'import { NotificationsPage } from "@/componentsSugest/NotificationsPage"',
        element: <NotificationsPage />,
    },
    "error": {
        name: "Error",
        importStatement: 'import { ErrorPage } from "@/componentsSugest/ErrorPage"',
        element: <ErrorPage />,
    },
    "frame-base": {
        name: "Frame Base",
        importStatement: 'import { FrameBase } from "@/componentsSugest/FrameBase"',
        element: <FrameBase />,
    },
    // ── shadcn/ui ─────────────────────────────────────────────────────────────
    "accordion-demo": {
        name: "Accordion",
        importStatement: 'import { AccordionDemo } from "@/componentsSugest/shadcn/AccordionDemo"',
        element: <AccordionDemo />,
    },
    "collapsible-demo": {
        name: "Collapsible",
        importStatement: 'import { CollapsibleDemo } from "@/componentsSugest/shadcn/AccordionDemo"',
        element: <CollapsibleDemo />,
    },
    "calendar-demo": {
        name: "Calendar",
        importStatement: 'import { CalendarDemo } from "@/componentsSugest/shadcn/CalendarDemo"',
        element: <CalendarDemo />,
    },
    "carousel-demo": {
        name: "Carousel",
        importStatement: 'import { CarouselDemo } from "@/componentsSugest/shadcn/CarouselDemo"',
        element: <CarouselDemo />,
    },
    "dialog-demo": {
        name: "Dialogs & Sheets",
        importStatement: 'import { DialogDemo } from "@/componentsSugest/shadcn/DialogDemo"',
        element: <DialogDemo />,
    },
    "form-controls-demo": {
        name: "Form Controls",
        importStatement: 'import { FormControlsDemo } from "@/componentsSugest/shadcn/FormControlsDemo"',
        element: <FormControlsDemo />,
    },
    "menu-demo": {
        name: "Menus",
        importStatement: 'import { MenuDemo } from "@/componentsSugest/shadcn/MenuDemo"',
        element: <MenuDemo />,
    },
    "navigation-demo": {
        name: "Navigation",
        importStatement: 'import { NavigationDemo } from "@/componentsSugest/shadcn/NavigationDemo"',
        element: <NavigationDemo />,
    },
    "feedback-demo": {
        name: "Feedback",
        importStatement: 'import { FeedbackDemo } from "@/componentsSugest/shadcn/FeedbackDemo"',
        element: <FeedbackDemo />,
    },
    "resizable-demo": {
        name: "Resizable",
        importStatement: 'import { ResizableDemo } from "@/componentsSugest/shadcn/ResizableDemo"',
        element: <ResizableDemo />,
    },
    "breadcrumb-demo": {
        name: "Breadcrumb",
        importStatement: 'import { BreadcrumbDemo } from "@/componentsSugest/shadcn/BreadcrumbDemo"',
        element: <BreadcrumbDemo />,
    },
    // ── Individual shadcn components ──────────────────────────────────────────
    "builder-breadcrumb": {
        name: "Breadcrumb (dinâmico)",
        importStatement: 'import { BuilderBreadcrumb } from "@/componentsSugest/shadcn/BuilderBreadcrumb"',
        element: <BuilderBreadcrumb />,
    },
    "pagination-card": {
        name: "Pagination",
        importStatement: 'import { PaginationCard } from "@/componentsSugest/shadcn/PaginationCard"',
        element: <PaginationCard />,
    },
    "separator-card": {
        name: "Separator",
        importStatement: 'import { SeparatorCard } from "@/componentsSugest/shadcn/SeparatorCard"',
        element: <SeparatorCard />,
    },
    "dialog-card": {
        name: "Dialog",
        importStatement: 'import { DialogCard } from "@/componentsSugest/shadcn/DialogCard"',
        element: <DialogCard />,
    },
    "alert-dialog-card": {
        name: "Alert Dialog",
        importStatement: 'import { AlertDialogCard } from "@/componentsSugest/shadcn/AlertDialogCard"',
        element: <AlertDialogCard />,
    },
    "drawer-card": {
        name: "Drawer",
        importStatement: 'import { DrawerCard } from "@/componentsSugest/shadcn/DrawerCard"',
        element: <DrawerCard />,
    },
    "sheet-card": {
        name: "Sheet",
        importStatement: 'import { SheetCard } from "@/componentsSugest/shadcn/SheetCard"',
        element: <SheetCard />,
    },
    "skeleton-card": {
        name: "Skeleton",
        importStatement: 'import { SkeletonCard } from "@/componentsSugest/shadcn/SkeletonCard"',
        element: <SkeletonCard />,
    },
    "tooltip-card": {
        name: "Tooltip",
        importStatement: 'import { TooltipCard } from "@/componentsSugest/shadcn/TooltipCard"',
        element: <TooltipCard />,
    },
    "hover-card-card": {
        name: "Hover Card",
        importStatement: 'import { HoverCardCard } from "@/componentsSugest/shadcn/HoverCardCard"',
        element: <HoverCardCard />,
    },
    "popover-card": {
        name: "Popover",
        importStatement: 'import { PopoverCard } from "@/componentsSugest/shadcn/PopoverCard"',
        element: <PopoverCard />,
    },
    "progress-card": {
        name: "Progress",
        importStatement: 'import { ProgressCard } from "@/componentsSugest/shadcn/ProgressCard"',
        element: <ProgressCard />,
    },
    "checkbox-card": {
        name: "Checkbox",
        importStatement: 'import { CheckboxCard } from "@/componentsSugest/shadcn/CheckboxCard"',
        element: <CheckboxCard />,
    },
    "select-card": {
        name: "Select",
        importStatement: 'import { SelectCard } from "@/componentsSugest/shadcn/SelectCard"',
        element: <SelectCard />,
    },
    "slider-card": {
        name: "Slider",
        importStatement: 'import { SliderCard } from "@/componentsSugest/shadcn/SliderCard"',
        element: <SliderCard />,
    },
    "toggle-card": {
        name: "Toggle",
        importStatement: 'import { ToggleCard } from "@/componentsSugest/shadcn/ToggleCard"',
        element: <ToggleCard />,
    },
    "switch-card": {
        name: "Switch",
        importStatement: 'import { SwitchCard } from "@/componentsSugest/shadcn/SwitchCard"',
        element: <SwitchCard />,
    },
    "input-otp-card": {
        name: "Input OTP",
        importStatement: 'import { InputOtpCard } from "@/componentsSugest/shadcn/InputOtpCard"',
        element: <InputOtpCard />,
    },
    "textarea-card": {
        name: "Textarea",
        importStatement: 'import { TextareaCard } from "@/componentsSugest/shadcn/TextareaCard"',
        element: <TextareaCard />,
    },
    "dropdown-menu-card": {
        name: "Dropdown Menu",
        importStatement: 'import { DropdownMenuCard } from "@/componentsSugest/shadcn/DropdownMenuCard"',
        element: <DropdownMenuCard />,
    },
    "context-menu-card": {
        name: "Context Menu",
        importStatement: 'import { ContextMenuCard } from "@/componentsSugest/shadcn/ContextMenuCard"',
        element: <ContextMenuCard />,
    },
    "menubar-card": {
        name: "Menubar",
        importStatement: 'import { MenubarCard } from "@/componentsSugest/shadcn/MenubarCard"',
        element: <MenubarCard />,
    },
    "calendar-single": {
        name: "Calendar",
        importStatement: 'import { CalendarSingleCard } from "@/componentsSugest/shadcn/CalendarSingleCard"',
        element: <CalendarSingleCard />,
    },
    "calendar-range": {
        name: "Calendar Range",
        importStatement: 'import { CalendarRangeCard } from "@/componentsSugest/shadcn/CalendarRangeCard"',
        element: <CalendarRangeCard />,
    },
    // ── Charts (Recharts) ──────────────────────────────────────────────────────
    "bar-grouped": {
        name: "Bar Grouped",
        importStatement: 'import { BarGrouped } from "@/componentsSugest/charts/RechartsBarChart"',
        element: <BarGrouped />,
    },
    "bar-stacked": {
        name: "Bar Stacked",
        importStatement: 'import { BarStacked } from "@/componentsSugest/charts/RechartsBarChart"',
        element: <BarStacked />,
    },
    "bar-horizontal": {
        name: "Bar Horizontal",
        importStatement: 'import { BarHorizontal } from "@/componentsSugest/charts/RechartsBarChart"',
        element: <BarHorizontal />,
    },
    "area-simple": {
        name: "Area Simple",
        importStatement: 'import { AreaSimple } from "@/componentsSugest/charts/RechartsAreaChart"',
        element: <AreaSimple />,
    },
    "area-stacked": {
        name: "Area Stacked",
        importStatement: 'import { AreaStacked } from "@/componentsSugest/charts/RechartsAreaChart"',
        element: <AreaStacked />,
    },
    "line-simple": {
        name: "Line Simple",
        importStatement: 'import { LineSimple } from "@/componentsSugest/charts/RechartsLineChart"',
        element: <LineSimple />,
    },
    "line-multi": {
        name: "Line Multi",
        importStatement: 'import { LineMulti } from "@/componentsSugest/charts/RechartsLineChart"',
        element: <LineMulti />,
    },
    "pie-simple": {
        name: "Pie",
        importStatement: 'import { PieSimple } from "@/componentsSugest/charts/RechartsPieChart"',
        element: <PieSimple />,
    },
    "pie-donut": {
        name: "Donut",
        importStatement: 'import { PieDonut } from "@/componentsSugest/charts/RechartsPieChart"',
        element: <PieDonut />,
    },
    "pie-separated": {
        name: "Pie Separated",
        importStatement: 'import { PieSeparated } from "@/componentsSugest/charts/RechartsPieChart"',
        element: <PieSeparated />,
    },
    "radar-simple": {
        name: "Radar Simple",
        importStatement: 'import { RadarSimple } from "@/componentsSugest/charts/RechartsRadarChart"',
        element: <RadarSimple />,
    },
    "radar-multi": {
        name: "Radar Multi",
        importStatement: 'import { RadarMulti } from "@/componentsSugest/charts/RechartsRadarChart"',
        element: <RadarMulti />,
    },
    "radial-gauge": {
        name: "Radial Gauge",
        importStatement: 'import { RadialGauge } from "@/componentsSugest/charts/RechartsRadialChart"',
        element: <RadialGauge />,
    },
    "radial-multi": {
        name: "Radial Multi",
        importStatement: 'import { RadialMulti } from "@/componentsSugest/charts/RechartsRadialChart"',
        element: <RadialMulti />,
    },
    "radial-stacked": {
        name: "Radial Stacked",
        importStatement: 'import { RadialStacked } from "@/componentsSugest/charts/RechartsRadialChart"',
        element: <RadialStacked />,
    },
    "ranked-simple": {
        name: "Ranked Simple",
        importStatement: 'import { RankedSimple } from "@/componentsSugest/charts/RechartsRankedList"',
        element: <RankedSimple />,
    },
    "ranked-category": {
        name: "Ranked Category",
        importStatement: 'import { RankedCategory } from "@/componentsSugest/charts/RechartsRankedList"',
        element: <RankedCategory />,
    },
    "funnel-sales": {
        name: "Funnel Sales",
        importStatement: 'import { FunnelSales } from "@/componentsSugest/charts/RechartsFunnelChart"',
        element: <FunnelSales />,
    },
    "funnel-marketing": {
        name: "Funnel Marketing",
        importStatement: 'import { FunnelMarketing } from "@/componentsSugest/charts/RechartsFunnelChart"',
        element: <FunnelMarketing />,
    },
}
