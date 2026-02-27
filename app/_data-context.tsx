"use client"

import * as React from "react"
import type { DataAdapter, Workspace, Project, Dashboard, DashboardData, UserPreferences } from "@/lib/adapters/types"
import { getDataAdapter } from "@/lib/adapters"
import { useAuth } from "./_auth-context"

interface DataContextValue {
    adapter: DataAdapter
    // Workspace
    workspaces: Workspace[]
    activeWorkspace: Workspace | null
    setActiveWorkspace: (ws: Workspace | null) => void
    refreshWorkspaces: () => Promise<void>
    // Projects
    projects: Project[]
    refreshProjects: (workspaceId: string) => Promise<void>
    // Dashboard save/load
    loadDashboard: (id: string) => Promise<Dashboard | null>
    saveDashboard: (id: string, data: DashboardData) => void
    flushSave: () => Promise<void>
    // Preferences
    preferences: UserPreferences | null
    updatePreferences: (patch: Partial<Omit<UserPreferences, "userId">>) => Promise<void>
}

const DataContext = React.createContext<DataContextValue | null>(null)

const SAVE_DEBOUNCE_MS = 500

export function DataProvider({ children }: { children: React.ReactNode }) {
    const { user } = useAuth()
    const adapterRef = React.useRef<DataAdapter | null>(null)
    if (!adapterRef.current && typeof window !== "undefined") {
        adapterRef.current = getDataAdapter()
    }

    const [workspaces, setWorkspaces] = React.useState<Workspace[]>([])
    const [activeWorkspace, setActiveWorkspace] = React.useState<Workspace | null>(null)
    const [projects, setProjects] = React.useState<Project[]>([])
    const [preferences, setPreferences] = React.useState<UserPreferences | null>(null)

    // Debounced save state
    const pendingSaveRef = React.useRef<{ id: string; data: DashboardData } | null>(null)
    const saveTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

    const adapter = adapterRef.current!

    // Load workspaces when user changes
    React.useEffect(() => {
        if (!user || !adapter) return
        adapter.listWorkspaces().then(setWorkspaces)
        adapter.getPreferences(user.id).then(setPreferences)
    }, [user, adapter])

    const refreshWorkspaces = React.useCallback(async () => {
        if (!adapter) return
        const ws = await adapter.listWorkspaces()
        setWorkspaces(ws)
    }, [adapter])

    const refreshProjects = React.useCallback(async (workspaceId: string) => {
        if (!adapter) return
        const ps = await adapter.listProjects(workspaceId)
        setProjects(ps)
    }, [adapter])

    const loadDashboard = React.useCallback(async (id: string): Promise<Dashboard | null> => {
        if (!adapter) return null
        return adapter.getDashboard(id)
    }, [adapter])

    // Debounced save
    const doFlush = React.useCallback(async () => {
        const pending = pendingSaveRef.current
        if (!pending || !adapter) return
        pendingSaveRef.current = null
        try {
            await adapter.updateDashboard(pending.id, { data: pending.data })
        } catch {
            // Restore pending data so next flush can retry
            if (!pendingSaveRef.current) pendingSaveRef.current = pending
        }
    }, [adapter])

    const saveDashboard = React.useCallback((id: string, data: DashboardData) => {
        pendingSaveRef.current = { id, data }
        if (saveTimerRef.current) clearTimeout(saveTimerRef.current)
        saveTimerRef.current = setTimeout(() => { doFlush() }, SAVE_DEBOUNCE_MS)
    }, [doFlush])

    const flushSave = React.useCallback(async () => {
        if (saveTimerRef.current) {
            clearTimeout(saveTimerRef.current)
            saveTimerRef.current = null
        }
        await doFlush()
    }, [doFlush])

    // Flush on unmount and beforeunload
    React.useEffect(() => {
        const handleUnload = () => {
            const pending = pendingSaveRef.current
            if (!pending || !adapter) return
            // Synchronous fallback: write to localStorage directly as emergency save
            try {
                const all = JSON.parse(localStorage.getItem("mt_dashboards") || "{}")
                if (all[pending.id]) {
                    all[pending.id].data = pending.data
                    all[pending.id].updatedAt = new Date().toISOString()
                    localStorage.setItem("mt_dashboards", JSON.stringify(all))
                }
            } catch { /* best effort */ }
        }
        window.addEventListener("beforeunload", handleUnload)
        return () => {
            window.removeEventListener("beforeunload", handleUnload)
            doFlush()
        }
    }, [doFlush, adapter])

    const updatePreferences = React.useCallback(async (patch: Partial<Omit<UserPreferences, "userId">>) => {
        if (!user || !adapter) return
        const updated = await adapter.updatePreferences(user.id, patch)
        setPreferences(updated)
    }, [user, adapter])

    const value = React.useMemo<DataContextValue>(() => ({
        adapter,
        workspaces, activeWorkspace, setActiveWorkspace, refreshWorkspaces,
        projects, refreshProjects,
        loadDashboard, saveDashboard, flushSave,
        preferences, updatePreferences,
    }), [
        adapter,
        workspaces, activeWorkspace, refreshWorkspaces,
        projects, refreshProjects,
        loadDashboard, saveDashboard, flushSave,
        preferences, updatePreferences,
    ])

    return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

export function useData(): DataContextValue {
    const ctx = React.useContext(DataContext)
    if (!ctx) throw new Error("useData deve ser usado dentro de DataProvider")
    return ctx
}
