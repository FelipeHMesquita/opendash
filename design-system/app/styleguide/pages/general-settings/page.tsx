"use client"

import { GeneralSettings } from "@/components/GeneralSettings"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const GENERAL_SETTINGS_SOURCE = `import * as React from "react"
import { Switch } from "@/components/ui/switch"

export function GeneralSettings() {
    return (
        <div className="flex min-h-screen w-full bg-background font-sans text-foreground">

            {/* Main Content - Full Width Scrollable */}
            <main className="flex-1 px-8 py-12 lg:px-16 overflow-y-auto">
                <div className="max-w-3xl mx-auto space-y-16 pb-24">

                    {/* Profile Section */}
                    <section>
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold">Profile</h2>
                            <p className="mt-1 text-sm text-muted-foreground">
                                This information will be displayed publicly so be careful what you share.
                            </p>
                        </div>
                        <div className="space-y-0">
                            <SettingsRow label="Full name" value="Tom Cook" />
                            <SettingsRow label="Email address" value="tom.cook@example.com" />
                            <SettingsRow label="Title" value="Human Resources Manager" isLast />
                        </div>
                    </section>

                    {/* Bank Accounts Section */}
                    <section>
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold">Bank accounts</h2>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Connect bank accounts to your account.
                            </p>
                        </div>
                        <div className="space-y-0">
                            <SettingsRow label="TD Canada Trust" value="" />
                            <SettingsRow label="Royal Bank of Canada" value="" isLast />
                        </div>
                        <button className="mt-6 text-sm font-semibold text-primary hover:text-primary/80 transition-colors">
                            + Add another bank
                        </button>
                    </section>

                    {/* Integrations Section */}
                    <section>
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold">Integrations</h2>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Connect applications to your account.
                            </p>
                        </div>
                        <div className="space-y-0">
                            <SettingsRow label="QuickBooks" value="" isLast />
                        </div>
                        <button className="mt-6 text-sm font-semibold text-primary hover:text-primary/80 transition-colors">
                            + Add another application
                        </button>
                    </section>

                    {/* Language and Dates Section */}
                    <section>
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold">Language and dates</h2>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Choose what language and date format to use throughout your account.
                            </p>
                        </div>
                        <div className="space-y-0">
                            <SettingsRow label="Language" value="English" />
                            <SettingsRow label="Date format" value="DD-MM-YYYY" />

                            {/* Toggle Row */}
                            <div className="flex items-center justify-between py-5 transition-colors">
                                <span className="text-sm font-medium text-muted-foreground">Automatic timezone</span>
                                <Switch
                                    defaultChecked
                                    className="data-[state=checked]:bg-primary"
                                />
                            </div>
                        </div>
                    </section>

                </div>
            </main>
        </div>
    )
}

// --- Helper Components ---

function SettingsRow({
    label,
    value,
    isLast = false
}: {
    label: string,
    value: string,
    isLast?: boolean
}) {
    return (
        <div className={\`flex flex-col sm:flex-row sm:items-center justify-between py-5 \${!isLast ? 'border-b border-border' : ''}\`}>
            <span className="text-sm font-medium text-muted-foreground sm:w-1/3">{label}</span>
            <span className="mt-1 text-sm text-foreground sm:mt-0 sm:w-1/3">{value}</span>
            <div className="mt-2 sm:mt-0 sm:w-1/3 sm:text-right">
                <button className="text-sm font-semibold text-primary hover:text-primary/80 hover:underline transition-colors">
                    Update
                </button>
            </div>
        </div>
    )
}`

export default function GeneralSettingsStyleguidePage() {
    return (
        <div className="p-8 max-w-6xl mx-auto">
            <div className="mb-10">
                <h1 className="text-2xl font-bold">General Settings</h1>
                <p className="text-sm text-muted-foreground mt-1">
                    A profile settings layout with row-based forms and toggle switches.
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
                        <GeneralSettings />
                    </div>
                </section>

                {/* Documentation Section */}
                <section>
                    <h2 className="text-lg font-semibold mb-4">Usage</h2>
                    <Card>
                        <CardHeader>
                            <CardTitle>Structure</CardTitle>
                            <CardDescription>Composition of the GeneralSettings page.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Tabs defaultValue="overview">
                                <TabsList className="mb-4">
                                    <TabsTrigger value="overview">Overview</TabsTrigger>
                                    <TabsTrigger value="code">Code</TabsTrigger>
                                </TabsList>
                                <TabsContent value="overview">
                                    <div className="text-sm text-muted-foreground">
                                        <p>The <code>GeneralSettings</code> component demonstrates:</p>
                                        <ul className="list-disc list-inside mt-3 space-y-2 text-foreground">
                                            <li><strong>Row-based Forms:</strong> Clean borders and spacing for editable fields.</li>
                                            <li><strong>Primary Actions:</strong> <code>text-primary</code> for "Update" and "Add" actions.</li>
                                            <li><strong>Toggle States:</strong> shadcn/ui Switch integrated into the UI.</li>
                                            <li><strong>Full-width Layout:</strong> Content centered with <code>max-w-3xl</code>.</li>
                                        </ul>
                                    </div>
                                </TabsContent>
                                <TabsContent value="code">
                                    <pre className="p-4 rounded-lg bg-muted font-mono text-xs overflow-x-auto whitespace-pre-wrap">
                                        {GENERAL_SETTINGS_SOURCE}
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
