"use client"

import * as React from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import type { AvatarConfig } from "@/app/_builder-state"

type AvatarShowcaseProps = {
    config?: AvatarConfig
}

const defaults: AvatarConfig = {
    name: "João Silva",
    role: "Designer",
    size: "default",
    showName: true,
    showRole: true,
}

function getInitials(name: string): string {
    return name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map(w => w[0].toUpperCase())
        .join("")
}

export function AvatarShowcase({ config }: AvatarShowcaseProps = {}) {
    const c = { ...defaults, ...config }
    const initials = getInitials(c.name)

    return (
        <div className="w-full h-full flex items-center justify-center gap-3 p-4">
            <Avatar size={c.size}>
                <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            {c.showName && (
                <div>
                    <p className="text-sm font-medium text-foreground">{c.name}</p>
                    {c.showRole && (
                        <p className="text-xs text-muted-foreground">{c.role}</p>
                    )}
                </div>
            )}
        </div>
    )
}
