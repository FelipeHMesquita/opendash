"use client"

import * as React from "react"
import { useAuth } from "./_auth-context"
import { useRouter } from "next/navigation"
import { getDataAdapter } from "@/lib/adapters"
import { migrateState } from "./_builder-state"
import type { DashboardData } from "@/lib/adapters/types"

/**
 * Root page — redirects based on auth state.
 * - Not authenticated → /login
 * - Authenticated → /w/[slug] (first workspace)
 * - Also handles legacy localStorage migration on first visit
 */
export default function RootRedirect() {
    const { user, loading } = useAuth()
    const router = useRouter()
    const migratedRef = React.useRef(false)

    React.useEffect(() => {
        if (loading) return
        if (!user) { router.replace("/login"); return }

        // User is authenticated — find their workspace and redirect
        const adapter = getDataAdapter()
        adapter.listWorkspaces().then(async workspaces => {
            if (workspaces.length === 0) return

            const ws = workspaces[0]

            // Try legacy data migration once
            if (!migratedRef.current) {
                migratedRef.current = true
                await migrateLegacy(adapter, ws.id, user.id)
            }

            router.replace(`/w/${ws.slug}`)
        })
    }, [user, loading, router])

    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-muted-foreground border-t-transparent" />
        </div>
    )
}

async function migrateLegacy(
    adapter: import("@/lib/adapters/types").DataAdapter,
    workspaceId: string,
    userId: string,
): Promise<void> {
    if (typeof window === "undefined") return

    const LEGACY_KEY = "builder_project"
    const LEGACY_SELECTED = "builder_selected_components"

    const raw = localStorage.getItem(LEGACY_KEY)
    if (!raw) return

    // Already migrated?
    if (localStorage.getItem(`${LEGACY_KEY}_migrated`)) return

    try {
        const parsed = JSON.parse(raw)
        const builder = migrateState(parsed.builder ?? parsed)
        const data: DashboardData = { builder, ui: parsed.ui ?? {} }

        // Check if workspace already has projects
        const existing = await adapter.listProjects(workspaceId)
        if (existing.length > 0) return

        const project = await adapter.createProject(workspaceId, "Meu Projeto", "Importado do localStorage")
        const dashboards = await adapter.listDashboards(project.id)
        if (dashboards.length > 0) {
            await adapter.updateDashboard(dashboards[0].id, { data })
        }

        // Migrate selected components
        const selectedRaw = localStorage.getItem(LEGACY_SELECTED)
        if (selectedRaw) {
            try {
                const selected = JSON.parse(selectedRaw) as string[]
                if (Array.isArray(selected) && selected.length > 0) {
                    await adapter.updatePreferences(userId, { selectedComponents: selected })
                }
            } catch { /* ignore */ }
        }

        localStorage.setItem(`${LEGACY_KEY}_migrated`, "true")
    } catch { /* ignore migration errors */ }
}
