"use client"

import * as React from "react"
import { PanelLeftOpen } from "lucide-react"
import { ThemePreview } from "../../_theme-preview"
import { SidebarClosed } from "@/componentsSugest/SidebarClosed"
import { SidebarOpen } from "@/componentsSugest/SidebarOpen"

export default function SidebarsStyleguidePage() {
    const [open, setOpen] = React.useState(true)

    return (
        <ThemePreview>
            <div className="p-6">
                {/* Screen simulation frame */}
                <div
                    className="overflow-hidden rounded-xl border border-border shadow-sm"
                    style={{ height: 600 }}
                >
                    <div className="flex h-full">

                        {/* Sidebar */}
                        {open
                            ? <SidebarOpen onCollapse={() => setOpen(false)} />
                            : <SidebarClosed />
                        }

                        {/* Content area */}
                        <div className="flex flex-1 flex-col bg-background">

                            {/* Topbar — h-14 aligns with sidebar header */}
                            <div className="flex h-14 shrink-0 items-center gap-3 border-b border-border px-4">
                                {/* Expand button — only visible when sidebar is closed */}
                                {!open && (
                                    <button
                                        onClick={() => setOpen(true)}
                                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                                    >
                                        <PanelLeftOpen className="h-4 w-4" />
                                    </button>
                                )}
                                <div className="h-3 w-36 rounded-full bg-muted" />
                                <div className="flex-1" />
                                <div className="h-7 w-7 rounded-full bg-muted" />
                                <div className="h-7 w-7 rounded-full bg-muted" />
                            </div>

                            {/* Page content skeleton */}
                            <div className="flex flex-1 flex-col gap-5 overflow-hidden p-6">
                                <div className="flex flex-col gap-1.5">
                                    <div className="h-4 w-44 rounded-full bg-muted" />
                                    <div className="h-3 w-64 rounded-full bg-muted/60" />
                                </div>
                                <div className="flex gap-4">
                                    {[0, 1, 2].map((i) => (
                                        <div
                                            key={i}
                                            className="flex-1 rounded-lg border border-border bg-card"
                                            style={{ height: 96 }}
                                        />
                                    ))}
                                </div>
                                <div className="flex-1 rounded-lg border border-border bg-card" />
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </ThemePreview>
    )
}
