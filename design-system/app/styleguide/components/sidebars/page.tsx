"use client"

import { SidebarClosed } from "@/components/SidebarClosed"
import { SidebarOpen } from "@/components/SidebarOpen"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const SIDEBAR_CLOSED_SOURCE = `import * as React from "react"
import {
    House, BarChart2, LayoutGrid, Archive, Clock, Users2,
    LifeBuoy, Settings
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const navIcons = [House, BarChart2, LayoutGrid, Archive, Clock, Users2]

export function SidebarClosed() {
    return (
        <aside className="flex h-full w-14 flex-col border-r border-border bg-background py-3">

            {/* Logo */}
            <div className="flex justify-center px-3 pb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
                    <span className="text-xs font-bold text-primary-foreground">O</span>
                </div>
            </div>

            {/* Nav icons — h-9 */}
            <nav className="flex flex-1 flex-col items-center gap-1 px-2">
                {navIcons.map((Icon, i) => (
                    <button
                        key={i}
                        className={\`flex h-9 w-9 items-center justify-center rounded-md transition-colors \${
                            i === 0
                                ? "bg-accent text-foreground"
                                : "text-muted-foreground hover:bg-accent hover:text-foreground"
                        }\`}
                    >
                        <Icon className="h-4 w-4" />
                    </button>
                ))}
            </nav>

            {/* Bottom */}
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
}`

const SIDEBAR_OPEN_SOURCE = `import * as React from "react"
import { LifeBuoy, Settings, LogOut } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const submenuItems = [
    { label: "Overview",             active: true,  badge: null },
    { label: "Notifications",        active: false, badge: "10" },
    { label: "Analytics",            active: false, badge: null },
    { label: "Saved reports",        active: false, badge: null },
    { label: "Scheduled reports",    active: false, badge: null },
    { label: "User reports",         active: false, badge: null },
    { label: "Manage notifications", active: false, badge: null },
]

export function SidebarOpen() {
    return (
        <aside className="flex h-full w-52 flex-col border border-border bg-background">

            {/* Section label */}
            <div className="px-4 py-3">
                <span className="text-sm font-semibold text-primary">Dashboard</span>
            </div>

            {/* Submenu — h-9 matches SidebarClosed icon items */}
            <nav className="flex flex-1 flex-col gap-0.5 px-2">
                {submenuItems.map((item) => (
                    <button
                        key={item.label}
                        className={\`flex h-9 w-full items-center justify-between rounded-md px-3 text-sm transition-colors \${
                            item.active
                                ? "bg-accent font-medium text-foreground"
                                : "text-muted-foreground hover:bg-accent hover:text-foreground"
                        }\`}
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
                        <LifeBuoy className="h-4 w-4 shrink-0" /><span>Support</span>
                    </button>
                    <button className="flex h-9 items-center gap-3 rounded-md px-3 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
                        <Settings className="h-4 w-4 shrink-0" /><span>Settings</span>
                    </button>
                </div>
                <div className="flex items-center gap-3 border-t border-border px-4 py-3">
                    <div className="relative shrink-0">
                        <Avatar className="h-8 w-8">
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>OR</AvatarFallback>
                        </Avatar>
                        <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-background" />
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col">
                        <span className="truncate text-sm font-medium text-foreground">Olivia Rhye</span>
                        <span className="truncate text-xs text-muted-foreground">olivia@untitledui.com</span>
                    </div>
                    <button className="text-muted-foreground hover:text-foreground">
                        <LogOut className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </aside>
    )
}`

export default function SidebarsStyleguidePage() {
    return (
        <div className="p-8 max-w-6xl mx-auto">
            <div className="mb-10">
                <h1 className="text-2xl font-bold">Sidebars</h1>
                <p className="text-sm text-muted-foreground mt-1">
                    Two sidebar variants — closed (icon-only) and open (expanded panel only). Items share the same <code>h-9</code> height.
                </p>
            </div>

            <div className="space-y-12">
                {/* Preview: both with 50px gap */}
                <section>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold">Preview</h2>
                        <span className="text-xs bg-accent px-2 py-1 rounded text-muted-foreground">Closed · Open</span>
                    </div>
                    <div className="rounded-xl bg-muted/40 border border-border p-8 shadow-inner">
                        <div className="flex items-start gap-[50px]" style={{ height: 560 }}>
                            <SidebarClosed />
                            <SidebarOpen />
                        </div>
                    </div>
                </section>

                {/* Docs */}
                <section>
                    <h2 className="text-lg font-semibold mb-4">Usage</h2>
                    <Card>
                        <CardHeader>
                            <CardTitle>Components</CardTitle>
                            <CardDescription>Both sidebars are independent — select the tab to see each component&apos;s code.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Tabs defaultValue="closed">
                                <TabsList className="mb-4">
                                    <TabsTrigger value="closed">SidebarClosed</TabsTrigger>
                                    <TabsTrigger value="open">SidebarOpen</TabsTrigger>
                                </TabsList>
                                <TabsContent value="closed">
                                    <pre className="p-4 rounded-lg bg-muted font-mono text-xs overflow-x-auto whitespace-pre-wrap">
                                        {SIDEBAR_CLOSED_SOURCE}
                                    </pre>
                                </TabsContent>
                                <TabsContent value="open">
                                    <pre className="p-4 rounded-lg bg-muted font-mono text-xs overflow-x-auto whitespace-pre-wrap">
                                        {SIDEBAR_OPEN_SOURCE}
                                    </pre>
                                </TabsContent>
                            </Tabs>
                        </CardContent>
                    </Card>
                </section>
            </div>
        </div>
    )
}
