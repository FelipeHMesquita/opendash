"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import type { LayoutConfig, MainComponent } from "@/lib/generateLayout"
import { DashCardList }       from "@/componentsSugest/DashCardList"
import { UsersTable }         from "@/componentsSugest/UsersTable"
import { SettingsPage }       from "@/componentsSugest/SettingsPage"
import { AccountSettings }    from "@/componentsSugest/AccountSettings"
import { GeneralSettings }    from "@/componentsSugest/GeneralSettings"
import { LoginPage }          from "@/componentsSugest/LoginPage"
import { DataTable }          from "@/componentsSugest/DataTable"
import { StatCardDemo }       from "@/componentsSugest/StatCard"
import { ChartCard }          from "@/componentsSugest/ChartCard"
import { OnboardingPage }     from "@/componentsSugest/OnboardingPage"
import { BillingPage }        from "@/componentsSugest/BillingPage"
import { ActivityFeed }       from "@/componentsSugest/ActivityFeed"
import { NotificationsPage }  from "@/componentsSugest/NotificationsPage"
import { ErrorPage }          from "@/componentsSugest/ErrorPage"
import { KanbanBoard }        from "@/componentsSugest/KanbanBoard"
import { CommandPalette }     from "@/componentsSugest/CommandPalette"
import { EmptyState }         from "@/componentsSugest/EmptyState"
import { FormPage }           from "@/componentsSugest/FormPage"
import { TeamPage }           from "@/componentsSugest/TeamPage"
import { UIShowcase }         from "@/componentsSugest/UIShowcase"
import { SidebarOpen }        from "@/componentsSugest/SidebarOpen"

// ─── Component registry ────────────────────────────────────────────────────────

function MainContent({ component }: { component: MainComponent }) {
    switch (component) {
        case "UsersTable":        return <UsersTable />
        case "SettingsPage":      return <SettingsPage />
        case "AccountSettings":   return <AccountSettings />
        case "GeneralSettings":   return <GeneralSettings />
        case "LoginPage":         return <LoginPage />
        case "DataTable":         return <DataTable />
        case "StatCardDemo":      return <StatCardDemo />
        case "ChartCard":         return <ChartCard />
        case "OnboardingPage":    return <OnboardingPage />
        case "BillingPage":       return <BillingPage />
        case "ActivityFeed":      return <ActivityFeed />
        case "NotificationsPage": return <NotificationsPage />
        case "ErrorPage":         return <ErrorPage />
        case "KanbanBoard":       return <KanbanBoard />
        case "CommandPalette":    return <CommandPalette />
        case "EmptyState":        return <EmptyState />
        case "FormPage":          return <FormPage />
        case "TeamPage":          return <TeamPage />
        case "UIShowcase":        return <UIShowcase />
        default:                  return <DashCardList />
    }
}

// Components that render their own full-page layout (no sidebar needed)
const fullPageComponents: MainComponent[] = ["LoginPage", "OnboardingPage", "ErrorPage"]

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PreviewPage() {
    const router = useRouter()
    const [config, setConfig] = React.useState<LayoutConfig | null>(null)

    React.useEffect(() => {
        const stored = sessionStorage.getItem("citerii_layout")
        if (!stored) { router.push("/"); return }
        setConfig(JSON.parse(stored))
    }, [router])

    if (!config) return null

    const isFullPage = fullPageComponents.includes(config.mainComponent)

    return (
        <div
            className="flex h-screen flex-col overflow-hidden bg-background text-foreground font-sans"
            style={config.cssVars as React.CSSProperties}
        >
            {/* ── Topbar ── */}
            <header className="flex h-10 shrink-0 items-center justify-between border-b border-border px-4">
                <button
                    onClick={() => router.push("/")}
                    className="flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                    ← Voltar
                </button>

                <div className="flex items-center gap-3">
                    <span className="text-xs font-medium text-muted-foreground">
                        {config.themeName}
                    </span>
                    <div
                        className="h-4 w-4 rounded-full border border-white/20"
                        style={{ background: config.primaryHex }}
                    />
                </div>
            </header>

            {/* ── Body ── */}
            {isFullPage ? (
                <main className="flex-1 overflow-y-auto pb-16">
                    <MainContent component={config.mainComponent} />
                </main>
            ) : (
                <div className="flex flex-1 overflow-hidden">
                    <SidebarOpen />
                    <main className="flex-1 overflow-y-auto pb-16">
                        <MainContent component={config.mainComponent} />
                    </main>
                </div>
            )}

            {/* ── Rationale bar ── */}
            <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card px-6 py-3">
                <p className="text-xs/6 text-muted-foreground">
                    <span className="font-medium text-foreground">Sugestão: </span>
                    {config.rationale}
                </p>
            </div>
        </div>
    )
}
