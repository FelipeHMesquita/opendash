import type {
    AuthAdapter, DataAdapter, User, Workspace, WorkspaceMember,
    Project, Dashboard, DashboardData, UserPreferences,
} from "./types"

// ─── Storage helpers ─────────────────────────────────────────────────────────

const KEYS = {
    session: "mt_session",
    users: "mt_users",
    workspaces: "mt_workspaces",
    members: "mt_members",
    projects: "mt_projects",
    dashboards: "mt_dashboards",
    preferences: "mt_preferences",
} as const

type StoredUser = User & { passwordHash: string }

function read<T>(key: string, fallback: T): T {
    if (typeof window === "undefined") return fallback
    try {
        const raw = localStorage.getItem(key)
        return raw ? (JSON.parse(raw) as T) : fallback
    } catch { return fallback }
}

function write(key: string, value: unknown) {
    try { localStorage.setItem(key, JSON.stringify(value)) } catch { /* quota */ }
}

function uid(): string { return crypto.randomUUID() }
function now(): string { return new Date().toISOString() }

function toSlug(name: string): string {
    return name
        .toLowerCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "")
        || "workspace"
}

async function hashPassword(password: string): Promise<string> {
    const data = new TextEncoder().encode(password)
    const buf = await crypto.subtle.digest("SHA-256", data)
    return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("")
}

// ─── Auth Adapter ────────────────────────────────────────────────────────────

const AUTH_CHANNEL = "mt_auth_channel"

export class LocalAuthAdapter implements AuthAdapter {
    private channel: BroadcastChannel | null = null
    private listeners = new Set<(user: User | null) => void>()

    constructor() {
        if (typeof window !== "undefined" && typeof BroadcastChannel !== "undefined") {
            this.channel = new BroadcastChannel(AUTH_CHANNEL)
            this.channel.onmessage = (e) => {
                const user = e.data as User | null
                this.listeners.forEach(cb => cb(user))
            }
        }
    }

    async getUser(): Promise<User | null> {
        return read<User | null>(KEYS.session, null)
    }

    async signUp(email: string, password: string, displayName?: string): Promise<User> {
        const users = read<Record<string, StoredUser>>(KEYS.users, {})

        // Check if email already exists
        const existing = Object.values(users).find(u => u.email === email)
        if (existing) throw new Error("Email já cadastrado")

        const hash = await hashPassword(password)
        const id = uid()
        const user: StoredUser = {
            id, email,
            displayName: displayName || email.split("@")[0],
            createdAt: now(),
            passwordHash: hash,
        }
        users[id] = user
        write(KEYS.users, users)

        // Auto-create default workspace
        const wsName = "Meu Workspace"
        const wsSlug = toSlug(wsName)
        const wsId = uid()
        const workspaces = read<Record<string, Workspace>>(KEYS.workspaces, {})
        workspaces[wsId] = { id: wsId, name: wsName, slug: wsSlug, ownerId: id, createdAt: now() }
        write(KEYS.workspaces, workspaces)

        // Add as owner member
        const members = read<WorkspaceMember[]>(KEYS.members, [])
        members.push({ workspaceId: wsId, userId: id, role: "owner", createdAt: now() })
        write(KEYS.members, members)

        // Store session
        const sessionUser: User = { id, email, displayName: user.displayName, createdAt: user.createdAt }
        write(KEYS.session, sessionUser)
        this.broadcast(sessionUser)

        return sessionUser
    }

    async signIn(email: string, password: string): Promise<User> {
        const users = read<Record<string, StoredUser>>(KEYS.users, {})
        const user = Object.values(users).find(u => u.email === email)
        if (!user) throw new Error("Credenciais inválidas")

        const hash = await hashPassword(password)
        if (hash !== user.passwordHash) throw new Error("Credenciais inválidas")

        const sessionUser: User = { id: user.id, email: user.email, displayName: user.displayName, createdAt: user.createdAt }
        write(KEYS.session, sessionUser)
        this.broadcast(sessionUser)
        return sessionUser
    }

    async signOut(): Promise<void> {
        localStorage.removeItem(KEYS.session)
        this.broadcast(null)
    }

    onAuthStateChange(cb: (user: User | null) => void): () => void {
        this.listeners.add(cb)
        return () => { this.listeners.delete(cb) }
    }

    private broadcast(user: User | null) {
        this.listeners.forEach(cb => cb(user))
        this.channel?.postMessage(user)
    }
}

// ─── Data Adapter ────────────────────────────────────────────────────────────

export class LocalDataAdapter implements DataAdapter {
    private getCurrentUserId(): string {
        const user = read<User | null>(KEYS.session, null)
        if (!user) throw new Error("Não autenticado")
        return user.id
    }

    private getMyWorkspaceIds(): string[] {
        const userId = this.getCurrentUserId()
        const members = read<WorkspaceMember[]>(KEYS.members, [])
        return members.filter(m => m.userId === userId).map(m => m.workspaceId)
    }

    // ── Workspaces ────────────────────────────────────────────────────────────

    async listWorkspaces(): Promise<Workspace[]> {
        const ids = this.getMyWorkspaceIds()
        const all = read<Record<string, Workspace>>(KEYS.workspaces, {})
        return ids.map(id => all[id]).filter(Boolean)
    }

    async getWorkspace(id: string): Promise<Workspace | null> {
        const ids = this.getMyWorkspaceIds()
        if (!ids.includes(id)) return null
        const all = read<Record<string, Workspace>>(KEYS.workspaces, {})
        return all[id] ?? null
    }

    async getWorkspaceBySlug(slug: string): Promise<Workspace | null> {
        const ids = this.getMyWorkspaceIds()
        const all = read<Record<string, Workspace>>(KEYS.workspaces, {})
        return Object.values(all).find(w => w.slug === slug && ids.includes(w.id)) ?? null
    }

    async createWorkspace(name: string, slug: string): Promise<Workspace> {
        const userId = this.getCurrentUserId()
        const id = uid()
        const ws: Workspace = { id, name, slug: toSlug(slug), ownerId: userId, createdAt: now() }

        const all = read<Record<string, Workspace>>(KEYS.workspaces, {})
        // Ensure slug uniqueness
        const slugExists = Object.values(all).some(w => w.slug === ws.slug)
        if (slugExists) ws.slug = `${ws.slug}-${id.slice(0, 4)}`
        all[id] = ws
        write(KEYS.workspaces, all)

        // Add creator as owner
        const members = read<WorkspaceMember[]>(KEYS.members, [])
        members.push({ workspaceId: id, userId, role: "owner", createdAt: now() })
        write(KEYS.members, members)

        return ws
    }

    async updateWorkspace(id: string, patch: Partial<Pick<Workspace, "name" | "slug">>): Promise<Workspace> {
        const all = read<Record<string, Workspace>>(KEYS.workspaces, {})
        const ws = all[id]
        if (!ws) throw new Error("Workspace não encontrado")
        if (patch.name !== undefined) ws.name = patch.name
        if (patch.slug !== undefined) ws.slug = toSlug(patch.slug)
        all[id] = ws
        write(KEYS.workspaces, all)
        return ws
    }

    async deleteWorkspace(id: string): Promise<void> {
        const all = read<Record<string, Workspace>>(KEYS.workspaces, {})
        delete all[id]
        write(KEYS.workspaces, all)

        // Cascade: remove members
        const members = read<WorkspaceMember[]>(KEYS.members, [])
        write(KEYS.members, members.filter(m => m.workspaceId !== id))

        // Cascade: remove projects and their dashboards
        const projects = read<Record<string, Project>>(KEYS.projects, {})
        const dashboards = read<Record<string, Dashboard>>(KEYS.dashboards, {})
        const projectIds = Object.values(projects).filter(p => p.workspaceId === id).map(p => p.id)
        for (const pid of projectIds) delete projects[pid]
        for (const [did, d] of Object.entries(dashboards)) {
            if (projectIds.includes(d.projectId)) delete dashboards[did]
        }
        write(KEYS.projects, projects)
        write(KEYS.dashboards, dashboards)
    }

    // ── Projects ──────────────────────────────────────────────────────────────

    async listProjects(workspaceId: string): Promise<Project[]> {
        const wsIds = this.getMyWorkspaceIds()
        if (!wsIds.includes(workspaceId)) return []
        const all = read<Record<string, Project>>(KEYS.projects, {})
        return Object.values(all)
            .filter(p => p.workspaceId === workspaceId)
            .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    }

    async getProject(id: string): Promise<Project | null> {
        const all = read<Record<string, Project>>(KEYS.projects, {})
        const proj = all[id]
        if (!proj) return null
        const wsIds = this.getMyWorkspaceIds()
        if (!wsIds.includes(proj.workspaceId)) return null
        return proj
    }

    async createProject(workspaceId: string, name: string, description?: string): Promise<Project> {
        const id = uid()
        const ts = now()
        const proj: Project = { id, workspaceId, name, description, createdAt: ts, updatedAt: ts }
        const all = read<Record<string, Project>>(KEYS.projects, {})
        all[id] = proj
        write(KEYS.projects, all)

        // Auto-create a default dashboard
        const dashId = uid()
        const dashboards = read<Record<string, Dashboard>>(KEYS.dashboards, {})
        dashboards[dashId] = {
            id: dashId, projectId: id, name: "Dashboard",
            data: { builder: { pages: [], activePageId: "" }, ui: {} as DashboardData["ui"] },
            createdAt: ts, updatedAt: ts,
        }
        write(KEYS.dashboards, dashboards)

        return proj
    }

    async updateProject(id: string, patch: Partial<Pick<Project, "name" | "description">>): Promise<Project> {
        const all = read<Record<string, Project>>(KEYS.projects, {})
        const proj = all[id]
        if (!proj) throw new Error("Projeto não encontrado")
        if (patch.name !== undefined) proj.name = patch.name
        if (patch.description !== undefined) proj.description = patch.description
        proj.updatedAt = now()
        all[id] = proj
        write(KEYS.projects, all)
        return proj
    }

    async deleteProject(id: string): Promise<void> {
        const projects = read<Record<string, Project>>(KEYS.projects, {})
        delete projects[id]
        write(KEYS.projects, projects)

        // Cascade: remove dashboards
        const dashboards = read<Record<string, Dashboard>>(KEYS.dashboards, {})
        for (const [did, d] of Object.entries(dashboards)) {
            if (d.projectId === id) delete dashboards[did]
        }
        write(KEYS.dashboards, dashboards)
    }

    // ── Dashboards ────────────────────────────────────────────────────────────

    async listDashboards(projectId: string): Promise<Dashboard[]> {
        const all = read<Record<string, Dashboard>>(KEYS.dashboards, {})
        return Object.values(all)
            .filter(d => d.projectId === projectId)
            .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
    }

    async getDashboard(id: string): Promise<Dashboard | null> {
        const all = read<Record<string, Dashboard>>(KEYS.dashboards, {})
        return all[id] ?? null
    }

    async createDashboard(projectId: string, name: string, data?: DashboardData): Promise<Dashboard> {
        const id = uid()
        const ts = now()
        const dash: Dashboard = {
            id, projectId, name,
            data: data ?? { builder: { pages: [], activePageId: "" }, ui: {} as DashboardData["ui"] },
            createdAt: ts, updatedAt: ts,
        }
        const all = read<Record<string, Dashboard>>(KEYS.dashboards, {})
        all[id] = dash
        write(KEYS.dashboards, all)
        return dash
    }

    async updateDashboard(id: string, patch: { name?: string; data?: DashboardData }): Promise<Dashboard> {
        const all = read<Record<string, Dashboard>>(KEYS.dashboards, {})
        let dash = all[id]
        if (!dash) {
            // Upsert: create if not found (handles race conditions and direct URL access)
            const ts = now()
            dash = {
                id, projectId: "", name: patch.name ?? "Dashboard",
                data: patch.data ?? { builder: { pages: [], activePageId: "" }, ui: {} as DashboardData["ui"] },
                createdAt: ts, updatedAt: ts,
            }
        }
        if (patch.name !== undefined) dash.name = patch.name
        if (patch.data !== undefined) dash.data = patch.data
        dash.updatedAt = now()
        all[id] = dash
        write(KEYS.dashboards, all)
        return dash
    }

    async deleteDashboard(id: string): Promise<void> {
        const all = read<Record<string, Dashboard>>(KEYS.dashboards, {})
        delete all[id]
        write(KEYS.dashboards, all)
    }

    // ── Preferences ───────────────────────────────────────────────────────────

    async getPreferences(userId: string): Promise<UserPreferences | null> {
        const all = read<Record<string, UserPreferences>>(KEYS.preferences, {})
        return all[userId] ?? null
    }

    async updatePreferences(userId: string, patch: Partial<Omit<UserPreferences, "userId">>): Promise<UserPreferences> {
        const all = read<Record<string, UserPreferences>>(KEYS.preferences, {})
        const existing = all[userId] ?? { userId, selectedComponents: [] }
        const updated = { ...existing, ...patch }
        all[userId] = updated
        write(KEYS.preferences, all)
        return updated
    }
}
