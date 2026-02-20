import * as React from "react"
import {
    House, BarChart2, LayoutGrid, Archive, Clock, Users2,
    LifeBuoy, Settings
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const navIcons = [House, BarChart2, LayoutGrid, Archive, Clock, Users2]

export function SidebarClosed() {
    return (
        <aside className="flex h-full w-14 flex-col border-r border-border bg-background py-3">

            {/* Logo / Avatar */}
            <div className="flex justify-center px-3 pb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
                    <span className="text-xs font-bold text-primary-foreground">O</span>
                </div>
            </div>

            {/* Nav icons */}
            <nav className="flex flex-1 flex-col items-center gap-1 px-2">
                {navIcons.map((Icon, i) => (
                    <button
                        key={i}
                        className={`flex h-9 w-9 items-center justify-center rounded-md transition-colors ${i === 0
                                ? "bg-accent text-foreground"
                                : "text-muted-foreground hover:bg-accent hover:text-foreground"
                            }`}
                    >
                        <Icon className="h-4 w-4" />
                    </button>
                ))}
            </nav>

            {/* Bottom: support, settings, user */}
            <div className="flex flex-col items-center gap-1 border-t border-border px-2 pt-3">
                <button className="flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
                    <LifeBuoy className="h-4 w-4" />
                </button>
                <button className="flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
                    <Settings className="h-4 w-4" />
                </button>
                <div className="relative mt-1">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src="https://github.com/shadcn.png" alt="Olivia Rhye" />
                        <AvatarFallback>OR</AvatarFallback>
                    </Avatar>
                    <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-background" />
                </div>
            </div>
        </aside>
    )
}
