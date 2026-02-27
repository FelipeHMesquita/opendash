import type {
    AuthAdapter, DataAdapter, User, Workspace,
    Project, Dashboard, DashboardData, UserPreferences,
} from "./types"
import { supabase } from "../supabase"

// ─── Helpers ─────────────────────────────────────────────────────────────────

function mapUser(sbUser: { id: string; email?: string; user_metadata?: Record<string, unknown>; created_at?: string }): User {
    return {
        id: sbUser.id,
        email: sbUser.email ?? "",
        displayName: (sbUser.user_metadata?.full_name as string) ?? (sbUser.user_metadata?.display_name as string),
        createdAt: sbUser.created_at ?? new Date().toISOString(),
    }
}

// snake_case → camelCase mapping
function mapWorkspace(row: Record<string, unknown>): Workspace {
    return {
        id: row.id as string,
        name: row.name as string,
        slug: row.slug as string,
        ownerId: row.owner_id as string,
        createdAt: row.created_at as string,
    }
}

function mapProject(row: Record<string, unknown>): Project {
    return {
        id: row.id as string,
        workspaceId: row.workspace_id as string,
        name: row.name as string,
        description: (row.description as string) ?? undefined,
        createdAt: row.created_at as string,
        updatedAt: row.updated_at as string ?? row.created_at as string,
    }
}

function mapDashboard(row: Record<string, unknown>): Dashboard {
    return {
        id: row.id as string,
        projectId: row.project_id as string,
        name: row.name as string,
        data: (row.data as DashboardData) ?? { builder: { pages: [], activePageId: "", navbarItems: [], sidebarItems: [], rightSidebarItems: [] }, ui: {} },
        createdAt: row.created_at as string,
        updatedAt: (row.updated_at as string) ?? (row.created_at as string),
    }
}

// ─── Auth Adapter ────────────────────────────────────────────────────────────

export class SupabaseAuthAdapter implements AuthAdapter {
    async getUser(): Promise<User | null> {
        const { data: { user } } = await supabase.auth.getUser()
        return user ? mapUser(user) : null
    }

    async signUp(email: string, password: string, displayName?: string): Promise<User> {
        const { data, error } = await supabase.auth.signUp({
            email, password,
            options: { data: { full_name: displayName } },
        })
        if (error) throw new Error(error.message)
        if (!data.user) throw new Error("Erro ao criar conta")

        // Auto-create default workspace
        const slug = email.split("@")[0].toLowerCase().replace(/[^a-z0-9]/g, "-")
        await supabase.from("workspaces").insert({ name: "Meu Workspace", slug, owner_id: data.user.id })
        // The trigger should auto-insert workspace_members

        return mapUser(data.user)
    }

    async signIn(email: string, password: string): Promise<User> {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw new Error(error.message)
        return mapUser(data.user)
    }

    async signOut(): Promise<void> {
        await supabase.auth.signOut()
    }

    onAuthStateChange(cb: (user: User | null) => void): () => void {
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            cb(session?.user ? mapUser(session.user) : null)
        })
        return () => subscription.unsubscribe()
    }
}

// ─── Data Adapter ────────────────────────────────────────────────────────────

export class SupabaseDataAdapter implements DataAdapter {

    // ── Workspaces ────────────────────────────────────────────────────────────

    async listWorkspaces(): Promise<Workspace[]> {
        const { data, error } = await supabase.from("workspaces").select("*")
        if (error) throw new Error(error.message)
        return (data ?? []).map(mapWorkspace)
    }

    async getWorkspace(id: string): Promise<Workspace | null> {
        const { data, error } = await supabase.from("workspaces").select("*").eq("id", id).maybeSingle()
        if (error) throw new Error(error.message)
        return data ? mapWorkspace(data) : null
    }

    async getWorkspaceBySlug(slug: string): Promise<Workspace | null> {
        const { data, error } = await supabase.from("workspaces").select("*").eq("slug", slug).maybeSingle()
        if (error) throw new Error(error.message)
        return data ? mapWorkspace(data) : null
    }

    async createWorkspace(name: string, slug: string): Promise<Workspace> {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) throw new Error("Não autenticado")
        const { data, error } = await supabase.from("workspaces")
            .insert({ name, slug, owner_id: user.id })
            .select().single()
        if (error) throw new Error(error.message)
        return mapWorkspace(data)
    }

    async updateWorkspace(id: string, patch: Partial<Pick<Workspace, "name" | "slug">>): Promise<Workspace> {
        const { data, error } = await supabase.from("workspaces")
            .update(patch).eq("id", id).select().single()
        if (error) throw new Error(error.message)
        return mapWorkspace(data)
    }

    async deleteWorkspace(id: string): Promise<void> {
        const { error } = await supabase.from("workspaces").delete().eq("id", id)
        if (error) throw new Error(error.message)
    }

    // ── Projects ──────────────────────────────────────────────────────────────

    async listProjects(workspaceId: string): Promise<Project[]> {
        const { data, error } = await supabase.from("projects")
            .select("*").eq("workspace_id", workspaceId).order("created_at", { ascending: false })
        if (error) throw new Error(error.message)
        return (data ?? []).map(mapProject)
    }

    async getProject(id: string): Promise<Project | null> {
        const { data, error } = await supabase.from("projects").select("*").eq("id", id).maybeSingle()
        if (error) throw new Error(error.message)
        return data ? mapProject(data) : null
    }

    async createProject(workspaceId: string, name: string, description?: string): Promise<Project> {
        const { data, error } = await supabase.from("projects")
            .insert({ workspace_id: workspaceId, name, description })
            .select().single()
        if (error) throw new Error(error.message)

        // Auto-create default dashboard
        await supabase.from("dashboards").insert({
            project_id: data.id, name: "Dashboard",
            data: { builder: { pages: [], activePageId: "", navbarItems: [], sidebarItems: [], rightSidebarItems: [] }, ui: {} },
        })

        return mapProject(data)
    }

    async updateProject(id: string, patch: Partial<Pick<Project, "name" | "description">>): Promise<Project> {
        const { data, error } = await supabase.from("projects")
            .update({ ...patch, updated_at: new Date().toISOString() })
            .eq("id", id).select().single()
        if (error) throw new Error(error.message)
        return mapProject(data)
    }

    async deleteProject(id: string): Promise<void> {
        const { error } = await supabase.from("projects").delete().eq("id", id)
        if (error) throw new Error(error.message)
    }

    // ── Dashboards ────────────────────────────────────────────────────────────

    async listDashboards(projectId: string): Promise<Dashboard[]> {
        const { data, error } = await supabase.from("dashboards")
            .select("*").eq("project_id", projectId).order("updated_at", { ascending: false })
        if (error) throw new Error(error.message)
        return (data ?? []).map(mapDashboard)
    }

    async getDashboard(id: string): Promise<Dashboard | null> {
        const { data, error } = await supabase.from("dashboards").select("*").eq("id", id).maybeSingle()
        if (error) throw new Error(error.message)
        return data ? mapDashboard(data) : null
    }

    async createDashboard(projectId: string, name: string, data?: DashboardData): Promise<Dashboard> {
        const payload = {
            project_id: projectId, name,
            data: data ?? { builder: { pages: [], activePageId: "", navbarItems: [], sidebarItems: [], rightSidebarItems: [] }, ui: {} },
        }
        const { data: row, error } = await supabase.from("dashboards").insert(payload).select().single()
        if (error) throw new Error(error.message)
        return mapDashboard(row)
    }

    async updateDashboard(id: string, patch: { name?: string; data?: DashboardData }): Promise<Dashboard> {
        const update: Record<string, unknown> = { updated_at: new Date().toISOString() }
        if (patch.name !== undefined) update.name = patch.name
        if (patch.data !== undefined) update.data = patch.data

        const { data, error } = await supabase.from("dashboards")
            .update(update).eq("id", id).select().single()
        if (error) throw new Error(error.message)
        return mapDashboard(data)
    }

    async deleteDashboard(id: string): Promise<void> {
        const { error } = await supabase.from("dashboards").delete().eq("id", id)
        if (error) throw new Error(error.message)
    }

    // ── Preferences ───────────────────────────────────────────────────────────

    async getPreferences(userId: string): Promise<UserPreferences | null> {
        const { data, error } = await supabase.from("user_preferences")
            .select("*").eq("user_id", userId).maybeSingle()
        if (error) throw new Error(error.message)
        if (!data) return null
        return {
            userId: data.user_id as string,
            selectedComponents: (data.selected_components as string[]) ?? [],
            styleguideTheme: data.styleguide_theme as string | undefined,
        }
    }

    async updatePreferences(userId: string, patch: Partial<Omit<UserPreferences, "userId">>): Promise<UserPreferences> {
        const update: Record<string, unknown> = { user_id: userId, updated_at: new Date().toISOString() }
        if (patch.selectedComponents !== undefined) update.selected_components = patch.selectedComponents
        if (patch.styleguideTheme !== undefined) update.styleguide_theme = patch.styleguideTheme

        const { data, error } = await supabase.from("user_preferences")
            .upsert(update, { onConflict: "user_id" })
            .select().single()
        if (error) throw new Error(error.message)
        return {
            userId: data.user_id as string,
            selectedComponents: (data.selected_components as string[]) ?? [],
            styleguideTheme: data.styleguide_theme as string | undefined,
        }
    }
}
