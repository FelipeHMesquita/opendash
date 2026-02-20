import * as React from "react"
import {
    House, BarChart2, LayoutGrid, Archive, Clock, Users2,
    LifeBuoy, Settings, LogOut
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const submenuItems = [
    { label: "Overview", active: true, badge: null },
    { label: "Notifications", active: false, badge: "10" },
    { label: "Analytics", active: false, badge: null },
    { label: "Saved reports", active: false, badge: null },
    { label: "Scheduled reports", active: false, badge: null },
    { label: "User reports", active: false, badge: null },
    { label: "Manage notifications", active: false, badge: null },
]

export function SidebarOpen() {
    return (
        <aside className="flex h-full w-52 flex-col border border-border bg-background">

            {/* Section label */}
            <div className="px-4 py-3">
                <span className="text-sm font-semibold text-primary">Dashboard</span>
            </div>

            {/* Submenu — h-9 to match SidebarClosed icon items */}
            <nav className="flex flex-1 flex-col gap-0.5 px-2">
                {submenuItems.map((item) => (
                    <button
                        key={item.label}
                        className={`flex h-9 w-full items-center justify-between rounded-md px-3 text-sm transition-colors ${item.active
                                ? "bg-accent font-medium text-foreground"
                                : "text-muted-foreground hover:bg-accent hover:text-foreground"
                            }`}
                    >
                        <span>{item.label}</span>
                        {item.badge && (
                            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-muted px-1.5 text-xs font-medium text-muted-foreground">
                                {item.badge}
                            </span>
                        )}
                    </button>
                ))}
            </nav>

            {/* Bottom: support + settings + user info */}
            <div className="border-t border-border">
                <div className="flex flex-col px-2 py-1 gap-0.5">
                    <button className="flex h-9 items-center gap-3 rounded-md px-3 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
                        <LifeBuoy className="h-4 w-4 shrink-0" />
                        <span>Support</span>
                    </button>
                    <button className="flex h-9 items-center gap-3 rounded-md px-3 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
                        <Settings className="h-4 w-4 shrink-0" />
                        <span>Settings</span>
                    </button>
                </div>

                {/* User info */}
                <div className="flex items-center gap-3 border-t border-border px-4 py-3">
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
                    <button className="text-muted-foreground transition-colors hover:text-foreground">
                        <LogOut className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </aside>
    )
}
