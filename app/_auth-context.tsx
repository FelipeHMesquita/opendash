"use client"

import * as React from "react"
import type { User, AuthAdapter } from "@/lib/adapters/types"
import { getAuthAdapter } from "@/lib/adapters"

interface AuthContextValue {
    user: User | null
    loading: boolean
    signIn: (email: string, password: string) => Promise<void>
    signUp: (email: string, password: string, displayName?: string) => Promise<void>
    signOut: () => Promise<void>
}

const AuthContext = React.createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = React.useState<User | null>(null)
    const [loading, setLoading] = React.useState(true)
    const adapterRef = React.useRef<AuthAdapter | null>(null)

    if (!adapterRef.current && typeof window !== "undefined") {
        adapterRef.current = getAuthAdapter()
    }

    React.useEffect(() => {
        const adapter = adapterRef.current
        if (!adapter) { setLoading(false); return }
        adapter.getUser().then(u => { setUser(u); setLoading(false) })
        const unsub = adapter.onAuthStateChange(setUser)
        return unsub
    }, [])

    const signIn = React.useCallback(async (email: string, password: string) => {
        const adapter = adapterRef.current
        if (!adapter) throw new Error("Adapter não inicializado")
        const u = await adapter.signIn(email, password)
        setUser(u)
    }, [])

    const signUp = React.useCallback(async (email: string, password: string, displayName?: string) => {
        const adapter = adapterRef.current
        if (!adapter) throw new Error("Adapter não inicializado")
        const u = await adapter.signUp(email, password, displayName)
        setUser(u)
    }, [])

    const signOut = React.useCallback(async () => {
        const adapter = adapterRef.current
        if (!adapter) return
        await adapter.signOut()
        setUser(null)
    }, [])

    const value = React.useMemo<AuthContextValue>(
        () => ({ user, loading, signIn, signUp, signOut }),
        [user, loading, signIn, signUp, signOut],
    )

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextValue {
    const ctx = React.useContext(AuthContext)
    if (!ctx) throw new Error("useAuth deve ser usado dentro de AuthProvider")
    return ctx
}
