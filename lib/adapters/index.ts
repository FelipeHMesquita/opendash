import type { AuthAdapter, DataAdapter } from "./types"

let _auth: AuthAdapter | null = null
let _data: DataAdapter | null = null

const isSupabase = () => process.env.NEXT_PUBLIC_ADAPTER === "supabase"

export function getAuthAdapter(): AuthAdapter {
    if (_auth) return _auth
    if (isSupabase()) {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const { SupabaseAuthAdapter } = require("./supabase-adapter")
        _auth = new SupabaseAuthAdapter() as AuthAdapter
    } else {
        const { LocalAuthAdapter } = require("./local-adapter") as typeof import("./local-adapter")
        _auth = new LocalAuthAdapter()
    }
    return _auth!
}

export function getDataAdapter(): DataAdapter {
    if (_data) return _data
    if (isSupabase()) {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const { SupabaseDataAdapter } = require("./supabase-adapter")
        _data = new SupabaseDataAdapter() as DataAdapter
    } else {
        const { LocalDataAdapter } = require("./local-adapter") as typeof import("./local-adapter")
        _data = new LocalDataAdapter()
    }
    return _data!
}

export type {
    AuthAdapter, DataAdapter,
    User, Workspace, WorkspaceMember, Project,
    Dashboard, DashboardData, UserPreferences,
} from "./types"
