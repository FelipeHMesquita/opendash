"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
type ContainerConfig = {
    title: string
    bgColor: string
    showBorder: boolean
    borderRadius: number
    showTitle: boolean
    titleAlign: "start" | "center"
}

const BG_COLOR_MAP: Record<string, { bg: string; fg: string }> = {
    primary:     { bg: "bg-primary",     fg: "text-primary-foreground" },
    muted:       { bg: "bg-muted",       fg: "text-muted-foreground" },
    card:        { bg: "bg-card",        fg: "text-card-foreground" },
    accent:      { bg: "bg-accent",      fg: "text-accent-foreground" },
    destructive: { bg: "bg-destructive", fg: "text-destructive-foreground" },
    transparent: { bg: "bg-transparent", fg: "text-foreground" },
}

export function ContainerElement({
    config,
}: {
    config: ContainerConfig
}) {
    const colors = BG_COLOR_MAP[config.bgColor] ?? BG_COLOR_MAP.muted

    return (
        <div
            className={cn(
                "w-full h-full flex flex-col",
                colors.bg,
                config.showBorder && "border border-border",
            )}
            style={{ borderRadius: config.borderRadius }}
        >
            {config.showTitle && (
                <div className={cn(
                    "px-4 pt-3 pb-2",
                    config.titleAlign === "center" ? "text-center" : "text-left",
                )}>
                    <span className={cn("text-xs font-medium", colors.fg)}>
                        {config.title}
                    </span>
                </div>
            )}
            {/* Empty area — grid items overlap visually */}
            <div className="flex-1" />
        </div>
    )
}
