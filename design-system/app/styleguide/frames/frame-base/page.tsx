"use client"

import { FrameBase } from "@/components/FrameBase"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const FRAME_BASE_SOURCE = `"use client"

import * as React from "react"
import { PanelLeftClose, PanelLeftOpen } from "lucide-react"

export function FrameBase() {
    const [sidebarOpen, setSidebarOpen] = React.useState(true)

    return (
        <div className="flex h-screen w-full flex-col overflow-hidden bg-background text-foreground font-sans">

            {/* ── Topbar ── */}
            <header className="flex h-10 w-full shrink-0 items-center border-b border-border px-3">
                <button
                    onClick={() => setSidebarOpen((v) => !v)}
                    aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
                    className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                    {sidebarOpen
                        ? <PanelLeftClose className="h-4 w-4" />
                        : <PanelLeftOpen className="h-4 w-4" />
                    }
                </button>
            </header>

            {/* ── Body ── */}
            <div className="flex flex-1 overflow-hidden">

                {/* ── Sidebar ── */}
                <aside
                    className={\`flex shrink-0 flex-col border-r border-border bg-background transition-all duration-200 ease-in-out \${
                        sidebarOpen ? "w-56" : "w-0 overflow-hidden border-r-0"
                    }\`}
                />

                {/* ── Content Area ── */}
                <main className="flex-1 overflow-y-auto" />
            </div>
        </div>
    )
}`

export default function FrameBaseStyleguidePage() {
    return (
        <div className="p-8 max-w-6xl mx-auto">
            <div className="mb-10">
                <h1 className="text-2xl font-bold">Frame Base</h1>
                <p className="text-sm text-muted-foreground mt-1">
                    Structural skeleton layout with topbar, collapsible sidebar, and content area. Use as a base for new page designs.
                </p>
            </div>

            <div className="space-y-12">
                {/* Preview Section */}
                <section>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold">Preview</h2>
                        <span className="text-xs bg-accent px-2 py-1 rounded text-muted-foreground">Interactive · try the toggle</span>
                    </div>
                    <div className="border rounded-xl overflow-hidden bg-background shadow-2xl h-[480px]">
                        <FrameBase />
                    </div>
                </section>

                {/* Docs Section */}
                <section>
                    <h2 className="text-lg font-semibold mb-4">Usage</h2>
                    <Card>
                        <CardHeader>
                            <CardTitle>Structure</CardTitle>
                            <CardDescription>A minimal layout frame — add your content inside each zone.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Tabs defaultValue="overview">
                                <TabsList className="mb-4">
                                    <TabsTrigger value="overview">Overview</TabsTrigger>
                                    <TabsTrigger value="code">Code</TabsTrigger>
                                </TabsList>
                                <TabsContent value="overview">
                                    <div className="text-sm text-muted-foreground space-y-4">
                                        <p>The <code>FrameBase</code> component provides three structural zones:</p>
                                        <div className="grid grid-cols-3 gap-4 mt-4">
                                            <div className="rounded-lg border border-border p-4">
                                                <p className="font-medium text-foreground mb-1">Topbar</p>
                                                <p className="text-xs">Fixed <code>h-10</code> header with <code>border-b</code>. Contains the collapse toggle button.</p>
                                            </div>
                                            <div className="rounded-lg border border-border p-4">
                                                <p className="font-medium text-foreground mb-1">Sidebar</p>
                                                <p className="text-xs">Collapsible <code>w-56</code> panel with <code>border-r</code>. Animates to <code>w-0</code> when closed.</p>
                                            </div>
                                            <div className="rounded-lg border border-border p-4">
                                                <p className="font-medium text-foreground mb-1">Content Area</p>
                                                <p className="text-xs"><code>flex-1</code> scrollable main zone. Place your page content here.</p>
                                            </div>
                                        </div>
                                    </div>
                                </TabsContent>
                                <TabsContent value="code">
                                    <pre className="p-4 rounded-lg bg-muted font-mono text-xs overflow-x-auto whitespace-pre-wrap">
                                        {FRAME_BASE_SOURCE}
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
