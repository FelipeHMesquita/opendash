"use client"

import * as React from "react"
import { useAuth } from "@/app/_auth-context"
import { DataProvider } from "@/app/_data-context"
import { useRouter } from "next/navigation"

export default function AppLayout({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAuth()
    const router = useRouter()

    React.useEffect(() => {
        if (!loading && !user) router.replace("/login")
    }, [user, loading, router])

    if (loading || !user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-muted-foreground border-t-transparent" />
            </div>
        )
    }

    return (
        <DataProvider>
            {children}
        </DataProvider>
    )
}
