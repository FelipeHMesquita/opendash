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
