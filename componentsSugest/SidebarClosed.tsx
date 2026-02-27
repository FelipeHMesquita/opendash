"use client"

import * as React from "react"
import {
    House, BarChart2, LayoutGrid, Archive, Clock, Users2,
    LifeBuoy, Settings,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navIcons = [House, BarChart2, LayoutGrid, Archive, Clock, Users2]

export function SidebarClosed() {
    return (
        <aside className="flex h-full w-14 flex-col border-r border-border bg-background">

            {/* Logo — h-14 matches topbar height so borders align */}
            <div className="flex h-14 shrink-0 items-center justify-center border-b border-border">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
                    <span className="text-xs font-bold text-primary-foreground">O</span>
                </div>
            </div>

            {/* Nav icons */}
            <nav className="flex flex-1 flex-col items-center gap-1 px-2 py-2">
                {navIcons.map((Icon, i) => (
                    <Button
                        key={i}
                        variant="ghost"
                        size="icon"
                        className={cn(
                            i === 0 ? "bg-accent text-foreground" : "text-muted-foreground"
                        )}
                    >
                        <Icon className="h-4 w-4" />
                    </Button>
                ))}
            </nav>

            {/* Bottom: support + settings + avatar */}
            <div className="flex flex-col items-center gap-1 border-t border-border px-2 pt-3 pb-2">
                <Button variant="ghost" size="icon" className="text-muted-foreground">
                    <LifeBuoy className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="text-muted-foreground">
                    <Settings className="h-4 w-4" />
                </Button>
                <div className="relative mt-1 mb-1">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src="https://github.com/shadcn.png" alt="Olivia Rhye" />
                        <AvatarFallback>OR</AvatarFallback>
                    </Avatar>
                    <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-success ring-2 ring-background" />
                </div>
            </div>
        </aside>
    )
}
