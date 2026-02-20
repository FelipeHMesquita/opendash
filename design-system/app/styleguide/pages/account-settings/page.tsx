"use client"

import { AccountSettings } from "@/components/AccountSettings"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const ACCOUNT_SETTINGS_SOURCE = `import * as React from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function AccountSettings() {
    return (
        <div className="flex h-screen w-full flex-col overflow-hidden bg-background font-sans text-foreground">

            {/* Top Navigation & Search - Fixed */}
            <header className="border-b border-border px-8 py-4 shrink-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-10">
                <div className="flex max-w-5xl flex-col gap-6">
                    <div className="relative w-full max-w-md text-muted-foreground focus-within:text-foreground transition-colors">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
                        <Input
                            type="text"
                            placeholder="Search"
                            className="border-none bg-transparent pl-10 text-sm shadow-none focus-visible:ring-0 placeholder:text-muted-foreground/60"
                        />
                    </div>

                    <nav className="flex gap-6 text-sm font-medium">
                        <a href="#" className="border-b-2 border-primary pb-2 text-primary">Account</a>
                        <a href="#" className="border-b-2 border-transparent pb-2 text-muted-foreground hover:text-foreground transition-colors">Notifications</a>
                        <a href="#" className="border-b-2 border-transparent pb-2 text-muted-foreground hover:text-foreground transition-colors">Billing</a>
                        <a href="#" className="border-b-2 border-transparent pb-2 text-muted-foreground hover:text-foreground transition-colors">Teams</a>
                        <a href="#" className="border-b-2 border-transparent pb-2 text-muted-foreground hover:text-foreground transition-colors">Integrations</a>
                    </nav>
                </div>
            </header>

            {/* Main Content - Internal Scroll only here */}
            <main className="flex-1 overflow-y-auto px-8 py-12">
                <div className="space-y-16 pb-24">

                    {/* Section: Personal Information */}
                    <section className="grid grid-cols-1 gap-8 border-b border-border pb-12 md:grid-cols-3">
                        <div className="col-span-1">
                            <h2 className="text-lg font-semibold">Personal Information</h2>
                            <p className="mt-1 text-sm text-muted-foreground leading-relaxed pr-4">
                                Use a permanent address where you can receive mail.
                            </p>
                        </div>

                        <div className="col-span-2 space-y-6 max-w-2xl">
                            <div className="flex items-center gap-6">
                                <Avatar className="h-16 w-16 rounded-md">
                                    <AvatarImage src="https://github.com/shadcn.png" alt="Profile picture" />
                                    <AvatarFallback className="rounded-md">TC</AvatarFallback>
                                </Avatar>
                                <div>
                                    <Button variant="secondary" className="border border-border">Change avatar</Button>
                                    <p className="mt-2 text-xs text-muted-foreground">JPG, GIF or PNG. 1MB max.</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-foreground">First name</label>
                                    <Input className="border-border bg-card text-foreground focus-visible:ring-primary" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-foreground">Last name</label>
                                    <Input className="border-border bg-card text-foreground focus-visible:ring-primary" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground">Email address</label>
                                <Input className="border-border bg-card text-foreground focus-visible:ring-primary" />
                            </div>

                            <div className="pt-2">
                                <Button className="font-semibold px-6 transition-all hover:scale-[1.02] active:scale-[0.98]">Save</Button>
                            </div>
                        </div>
                    </section>

                    {/* Section: Change Password */}
                    <section className="grid grid-cols-1 gap-8 border-b border-border pb-12 md:grid-cols-3">
                        <div className="col-span-1">
                            <h2 className="text-lg font-semibold">Change password</h2>
                            <p className="mt-1 text-sm text-muted-foreground leading-relaxed pr-4">
                                Update your password associated with your account.
                            </p>
                        </div>
                        <div className="col-span-2 space-y-6 max-w-2xl">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground">Current password</label>
                                <Input type="password" className="border-border bg-card text-foreground focus-visible:ring-primary" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground">New password</label>
                                <Input type="password" className="border-border bg-card text-foreground focus-visible:ring-primary" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground">Confirm password</label>
                                <Input type="password" className="border-border bg-card text-foreground focus-visible:ring-primary" />
                            </div>
                            <div className="pt-2">
                                <Button className="font-semibold px-6 transition-all hover:scale-[1.02] active:scale-[0.98]">Save</Button>
                            </div>
                        </div>
                    </section>

                    {/* Section: Log out other sessions */}
                    <section className="grid grid-cols-1 gap-8 border-b border-border pb-12 md:grid-cols-3">
                        <div className="col-span-1">
                            <h2 className="text-lg font-semibold">Log out other sessions</h2>
                            <p className="mt-1 text-sm text-muted-foreground leading-relaxed pr-4">
                                Please enter your password to confirm you would like to log out of your other sessions.
                            </p>
                        </div>
                        <div className="col-span-2 space-y-6 max-w-2xl">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Your password</label>
                                <Input type="password" className="border-border bg-card text-foreground focus-visible:ring-primary" />
                            </div>
                            <div className="pt-2">
                                <Button className="font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]">Log out other sessions</Button>
                            </div>
                        </div>
                    </section>

                    {/* Section: Delete account */}
                    <section className="grid grid-cols-1 gap-8 pb-12 md:grid-cols-3">
                        <div className="col-span-1">
                            <h2 className="text-lg font-semibold text-destructive">Delete account</h2>
                            <p className="mt-1 text-sm text-muted-foreground leading-relaxed pr-4">
                                No longer want to use our service? This action is not reversible.
                            </p>
                        </div>
                        <div className="col-span-2 flex items-start max-w-2xl">
                            <Button variant="destructive" className="font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]">
                                Yes, delete my account
                            </Button>
                        </div>
                    </section>

                </div>
            </main>
        </div>
    )
}`

export default function AccountSettingsStyleguidePage() {
    return (
        <div className="p-8 max-w-6xl mx-auto">
            <div className="mb-10">
                <h1 className="text-2xl font-bold">Account Settings</h1>
                <p className="text-sm text-muted-foreground mt-1">
                    Full-page settings layout with a fixed top navigation, search bar, and multiple form sections.
                </p>
            </div>

            <div className="space-y-12">
                {/* Preview Section */}
                <section>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold">Preview</h2>
                        <span className="text-xs bg-accent px-2 py-1 rounded text-muted-foreground">Page Layout</span>
                    </div>
                    <div className="border rounded-xl overflow-hidden bg-background shadow-2xl">
                        <AccountSettings />
                    </div>
                </section>

                {/* Documentation Section */}
                <section>
                    <h2 className="text-lg font-semibold mb-4">Usage</h2>
                    <Card>
                        <CardHeader>
                            <CardTitle>Structure</CardTitle>
                            <CardDescription>Composition of the AccountSettings page.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Tabs defaultValue="overview">
                                <TabsList className="mb-4">
                                    <TabsTrigger value="overview">Overview</TabsTrigger>
                                    <TabsTrigger value="code">Code</TabsTrigger>
                                </TabsList>
                                <TabsContent value="overview">
                                    <div className="text-sm text-muted-foreground">
                                        <p>The <code>AccountSettings</code> component demonstrates:</p>
                                        <ul className="list-disc list-inside mt-3 space-y-2 text-foreground">
                                            <li><strong>Fixed Header:</strong> Sticky top nav with search and tab menu.</li>
                                            <li><strong>Internal Scroll:</strong> Only the main area scrolls, header stays fixed.</li>
                                            <li><strong>Grid Sections:</strong> 3-column grid with description on the left and form on the right.</li>
                                            <li><strong>Danger Zone:</strong> Destructive button using <code>variant="destructive"</code>.</li>
                                        </ul>
                                    </div>
                                </TabsContent>
                                <TabsContent value="code">
                                    <pre className="p-4 rounded-lg bg-muted font-mono text-xs overflow-x-auto whitespace-pre-wrap">
                                        {ACCOUNT_SETTINGS_SOURCE}
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
