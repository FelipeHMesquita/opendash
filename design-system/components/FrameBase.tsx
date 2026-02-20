"use client"

import * as React from "react"
import { PanelLeftClose, PanelLeftOpen } from "lucide-react"

export function FrameBase() {
    const [sidebarOpen, setSidebarOpen] = React.useState(true)

    return (
        <div className="flex h-screen w-full flex-col overflow-hidden bg-background text-foreground font-sans">

            {/* ── Topbar ── */}
            <header className="h-10 w-full shrink-0 border-b border-border" />

            {/* ── Body ── */}
            <div className="flex flex-1 overflow-hidden">

                {/* ── Sidebar ── */}
                <aside
                    className={`flex shrink-0 flex-col border-r border-border bg-background transition-all duration-200 ease-in-out ${sidebarOpen ? "w-56" : "w-12"
                        }`}
                />

                {/* ── Content Area ── */}
                <main className="relative flex-1 overflow-y-auto">
                    {/* Toggle button — top-left of content zone */}
                    <button
                        onClick={() => setSidebarOpen((v) => !v)}
                        aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
                        className="absolute left-3 top-3 flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                    >
                        {sidebarOpen
                            ? <PanelLeftClose className="h-4 w-4" />
                            : <PanelLeftOpen className="h-4 w-4" />
                        }
                    </button>
                </main>
            </div>
        </div>
    )
}
