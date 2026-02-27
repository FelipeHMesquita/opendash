"use client"

import * as React from "react"
import { useAuth } from "@/app/_auth-context"
import { useRouter } from "next/navigation"

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAuth()
    const router = useRouter()

    React.useEffect(() => {
        if (!loading && user) router.replace("/")
    }, [user, loading, router])

    if (loading || user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-muted-foreground border-t-transparent" />
            </div>
        )
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
            <div className="w-full max-w-sm">
                {children}
            </div>
        </div>
    )
}
