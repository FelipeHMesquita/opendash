"use client"

import { Navbar } from "@/components/Navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const NAVBAR_SOURCE = `import * as React from "react"
import { Bell, Waves } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

export function Navbar() {
    return (
        <header className="flex h-16 w-full items-center border-b border-border bg-background px-4 md:px-8">
            {/* Logo Area */}
            <div className="flex items-center text-primary">
                <Waves className="h-8 w-8" />
            </div>

            {/* Navigation Links */}
            <nav className="ml-8 flex h-full items-center gap-6">
                <a
                    href="#"
                    className="flex h-full items-center border-b-2 border-primary px-1 text-sm font-medium text-foreground"
                >
                    Dashboard
                </a>
                <a
                    href="#"
                    className="flex h-full items-center border-b-2 border-transparent px-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                    Team
                </a>
                <a
                    href="#"
                    className="flex h-full items-center border-b-2 border-transparent px-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                    Projects
                </a>
                <a
                    href="#"
                    className="flex h-full items-center border-b-2 border-transparent px-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                    Calendar
                </a>
            </nav>

            {/* Right Icons and Profile */}
            <div className="ml-auto flex items-center gap-4">
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                    <Bell className="h-5 w-5" />
                    <span className="sr-only">Notifications</span>
                </Button>

                <Avatar className="h-8 w-8 cursor-pointer border border-border">
                    <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                    <AvatarFallback>US</AvatarFallback>
                </Avatar>
            </div>
        </header>
    )
}`

export default function NavbarStyleguidePage() {
    return (
        <div className="p-8 max-w-6xl mx-auto">
            <div className="mb-10">
                <h1 className="text-2xl font-bold">Navbar</h1>
                <p className="text-sm text-muted-foreground mt-1">
                    Top navigation bar with logo, links, notification bell and user avatar.
                </p>
            </div>

            <div className="space-y-12">
                {/* Preview Section */}
                <section>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold">Preview</h2>
                        <span className="text-xs bg-accent px-2 py-1 rounded text-muted-foreground">Component</span>
                    </div>
                    <div className="border rounded-xl overflow-hidden bg-background shadow-2xl">
                        <Navbar />
                    </div>
                </section>

                {/* Documentation Section */}
                <section>
                    <h2 className="text-lg font-semibold mb-4">Usage</h2>
                    <Card>
                        <CardHeader>
                            <CardTitle>Structure</CardTitle>
                            <CardDescription>Composition of the Navbar component.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Tabs defaultValue="overview">
                                <TabsList className="mb-4">
                                    <TabsTrigger value="overview">Overview</TabsTrigger>
                                    <TabsTrigger value="code">Code</TabsTrigger>
                                </TabsList>
                                <TabsContent value="overview">
                                    <div className="text-sm text-muted-foreground">
                                        <p>The <code>Navbar</code> component demonstrates:</p>
                                        <ul className="list-disc list-inside mt-3 space-y-2 text-foreground">
                                            <li><strong>Active Link State:</strong> Bottom border accent on the active nav item.</li>
                                            <li><strong>Design Tokens:</strong> Uses <code>border-primary</code>, <code>text-muted-foreground</code>, <code>bg-background</code>.</li>
                                            <li><strong>Icon Button:</strong> Ghost variant with accessibility <code>sr-only</code> label.</li>
                                            <li><strong>Avatar:</strong> shadcn/ui Avatar with image and fallback.</li>
                                        </ul>
                                    </div>
                                </TabsContent>
                                <TabsContent value="code">
                                    <pre className="p-4 rounded-lg bg-muted font-mono text-xs overflow-x-auto whitespace-pre-wrap">
                                        {NAVBAR_SOURCE}
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
