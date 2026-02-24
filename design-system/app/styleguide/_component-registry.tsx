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
import { ColumnChart, ColumnChartV2 } from "@/componentsSugest/charts/ColumnChart"
import { HorizontalBarChart } from "@/componentsSugest/charts/HorizontalBarChart"
import { DonutChart } from "@/componentsSugest/charts/DonutChart"
import { AreaChart } from "@/componentsSugest/charts/AreaChart"
import { LineChart } from "@/componentsSugest/charts/LineChart"
import { RankedList } from "@/componentsSugest/charts/RankedList"
import { FunnelChart } from "@/componentsSugest/charts/FunnelChart"

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
    "column-chart": {
        name: "Column Chart",
        importStatement: 'import { ColumnChart } from "@/componentsSugest/charts/ColumnChart"',
        element: <ColumnChart />,
        variants: [
            { label: "Default",       element: <ColumnChart /> },
            { label: "Typography v2", element: <ColumnChartV2 />, importStatement: 'import { ColumnChartV2 } from "@/componentsSugest/charts/ColumnChart"' },
        ],
    },
    "bar-chart": {
        name: "Bar Chart",
        importStatement: 'import { HorizontalBarChart } from "@/componentsSugest/charts/HorizontalBarChart"',
        element: <HorizontalBarChart />,
        variants: [{ label: "Default", element: <HorizontalBarChart /> }],
    },
    "pie-chart": {
        name: "Pie Chart",
        importStatement: 'import { DonutChart } from "@/componentsSugest/charts/DonutChart"',
        element: <DonutChart />,
        variants: [{ label: "Default", element: <DonutChart /> }],
    },
    "area-chart": {
        name: "Area Chart",
        importStatement: 'import { AreaChart } from "@/componentsSugest/charts/AreaChart"',
        element: <AreaChart />,
        variants: [{ label: "Default", element: <AreaChart /> }],
    },
    "line-chart": {
        name: "Line Chart",
        importStatement: 'import { LineChart } from "@/componentsSugest/charts/LineChart"',
        element: <LineChart />,
        variants: [{ label: "Default", element: <LineChart /> }],
    },
    "ranked-list": {
        name: "Ranked List",
        importStatement: 'import { RankedList } from "@/componentsSugest/charts/RankedList"',
        element: <RankedList />,
        variants: [{ label: "Default", element: <RankedList /> }],
    },
    "funnel-chart": {
        name: "Funnel Chart",
        importStatement: 'import { FunnelChart } from "@/componentsSugest/charts/FunnelChart"',
        element: <FunnelChart />,
        variants: [{ label: "Default", element: <FunnelChart /> }],
    },
}
