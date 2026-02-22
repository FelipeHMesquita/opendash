"use client"

import * as React from "react"
import {
    House, BarChart2, LayoutGrid, Archive, Clock, Users2,
    LifeBuoy, Settings, LogOut, PanelLeftClose,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navItems = [
    { label: "Item 1", Icon: House,       active: true  },
    { label: "Item 2", Icon: BarChart2,   active: false },
    { label: "Item 3", Icon: LayoutGrid,  active: false },
    { label: "Item 4", Icon: Archive,     active: false },
    { label: "Item 5", Icon: Clock,       active: false },
    { label: "Item 6", Icon: Users2,      active: false },
]

export function SidebarOpen({ onCollapse }: { onCollapse?: () => void }) {
    return (
        <aside className="flex h-full w-52 flex-col border-r border-border bg-background">

            {/* Header — h-14 matches topbar height so borders align */}
            <div className="flex h-14 shrink-0 items-center gap-2 border-b border-border px-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary">
                    <span className="text-xs font-bold text-primary-foreground">O</span>
                </div>
                <span className="flex-1 text-sm font-semibold text-primary">Dashboard</span>
                <Button variant="ghost" size="icon-sm" onClick={onCollapse}>
                    <PanelLeftClose className="h-4 w-4" />
                </Button>
            </div>

            {/* Nav items */}
            <nav className="flex flex-1 flex-col gap-0.5 px-2 py-2">
                {navItems.map((item) => (
                    <Button
                        key={item.label}
                        variant="ghost"
                        className={cn(
                            "w-full justify-start gap-3 h-9 px-3 text-sm",
                            item.active
                                ? "bg-accent font-medium text-foreground"
                                : "text-muted-foreground"
                        )}
                    >
                        <item.Icon className="h-4 w-4 shrink-0" />
                        <span>{item.label}</span>
                    </Button>
                ))}
            </nav>

            {/* Bottom: support + settings + avatar — mirrors SidebarClosed */}
            <div className="flex flex-col border-t border-border px-2 pt-3 pb-2 gap-1">
                <Button variant="ghost" className="w-full justify-start gap-3 h-9 px-3 text-sm text-muted-foreground">
                    <LifeBuoy className="h-4 w-4 shrink-0" />
                    <span>Support</span>
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-3 h-9 px-3 text-sm text-muted-foreground">
                    <Settings className="h-4 w-4 shrink-0" />
                    <span>Settings</span>
                </Button>
                <div className="mt-1 mb-1 flex items-center gap-3 px-3">
                    <div className="relative shrink-0">
                        <Avatar className="h-8 w-8">
                            <AvatarImage src="https://github.com/shadcn.png" alt="Olivia Rhye" />
                            <AvatarFallback>OR</AvatarFallback>
                        </Avatar>
                        <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-background" />
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col">
                        <span className="truncate text-sm font-medium text-foreground">Olivia Rhye</span>
                        <span className="truncate text-xs text-muted-foreground">olivia@untitledui.com</span>
                    </div>
                    <Button variant="ghost" size="icon-sm">
                        <LogOut className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </aside>
    )
}
