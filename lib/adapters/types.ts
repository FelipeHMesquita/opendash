import type { BuilderState } from "@/app/_builder-state"

// ─── Domain entities ─────────────────────────────────────────────────────────

export interface User {
    id: string
    email: string
    displayName?: string
    createdAt: string
}

export interface Workspace {
    id: string
    name: string
    slug: string
    ownerId: string
    createdAt: string
}

export interface WorkspaceMember {
    workspaceId: string
    userId: string
    role: "owner" | "admin" | "member"
    createdAt: string
}

export interface Project {
    id: string
    workspaceId: string
    name: string
    description?: string
    createdAt: string
    updatedAt: string
}

export interface DashboardData {
    builder: BuilderState
    ui: {
        activeTheme: string
        showNavbar?: boolean
        showSidebar?: boolean
        mockSidebarOpen?: boolean
        mockSidebarWidth?: number
        showRightSidebar?: boolean
        mockRightSidebarOpen?: boolean
        mockRightSidebarWidth?: number
        gridOpacity: number
        padV: number
        padH: number
        deviceId: string
        useCompactor?: boolean
        contentMinHeight?: number
        contentWidth?: number
    }
}

export interface Dashboard {
    id: string
    projectId: string
    name: string
    data: DashboardData
    createdAt: string
    updatedAt: string
}

export interface UserPreferences {
    userId: string
    selectedComponents: string[]
    styleguideTheme?: string
}

// ─── Auth Adapter ────────────────────────────────────────────────────────────

export interface AuthAdapter {
    getUser(): Promise<User | null>
    signUp(email: string, password: string, displayName?: string): Promise<User>
    signIn(email: string, password: string): Promise<User>
    signOut(): Promise<void>
    onAuthStateChange(cb: (user: User | null) => void): () => void
}

// ─── Data Adapter ────────────────────────────────────────────────────────────

export interface DataAdapter {
    // Workspaces
    listWorkspaces(): Promise<Workspace[]>
    getWorkspace(id: string): Promise<Workspace | null>
    getWorkspaceBySlug(slug: string): Promise<Workspace | null>
    createWorkspace(name: string, slug: string): Promise<Workspace>
    updateWorkspace(id: string, patch: Partial<Pick<Workspace, "name" | "slug">>): Promise<Workspace>
    deleteWorkspace(id: string): Promise<void>

    // Projects
    listProjects(workspaceId: string): Promise<Project[]>
    getProject(id: string): Promise<Project | null>
    createProject(workspaceId: string, name: string, description?: string): Promise<Project>
    updateProject(id: string, patch: Partial<Pick<Project, "name" | "description">>): Promise<Project>
    deleteProject(id: string): Promise<void>

    // Dashboards
    listDashboards(projectId: string): Promise<Dashboard[]>
    getDashboard(id: string): Promise<Dashboard | null>
    createDashboard(projectId: string, name: string, data?: DashboardData): Promise<Dashboard>
    updateDashboard(id: string, patch: { name?: string; data?: DashboardData }): Promise<Dashboard>
    deleteDashboard(id: string): Promise<void>

    // User preferences
    getPreferences(userId: string): Promise<UserPreferences | null>
    updatePreferences(userId: string, patch: Partial<Omit<UserPreferences, "userId">>): Promise<UserPreferences>
}
