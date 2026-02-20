"use client"

import { SettingsPage } from "@/components/SettingsPage"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const SETTINGS_PAGE_SOURCE = `import * as React from "react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"

export function SettingsPage() {
    return (
        <div className="min-h-screen w-full bg-background font-sans text-foreground">

            {/* Main Content */}
            <main className="px-8 py-12 lg:px-16 lg:py-16">
                <div className="mx-auto max-w-4xl">
                    <h1 className="text-3xl font-semibold tracking-tight">Settings</h1>

                    {/* Tab Navigation */}
                    <nav className="mt-8 flex space-x-1 border-b border-border pb-px text-sm">
                        <Tab active>Usage</Tab>
                        <Tab>Billing</Tab>
                        <Tab>Team</Tab>
                        <Tab>SMTP</Tab>
                        <Tab>Integrations</Tab>
                        <Tab>Unsubscribe Page</Tab>
                        <Tab>Documents</Tab>
                    </nav>

                    <div className="mt-12 space-y-12">
                        {/* Transactional Section */}
                        <Section
                            title="Transactional"
                            description="Integrate email into your app using the Resend API or SMTP interface."
                            action={<Button className="mt-6 rounded-full bg-foreground text-background hover:bg-foreground/90">Upgrade</Button>}
                        >
                            <div className="space-y-4">
                                <h4 className="text-sm font-medium">Free</h4>
                                <LimitRow label="Monthly limit" value="0 / 3,000" />
                                <LimitRow label="Daily limit" value="0 / 100" />
                            </div>
                        </Section>

                        {/* Marketing Section */}
                        <Section
                            title="Marketing"
                            description="Design and send marketing emails using Broadcasts and Audiences."
                            action={<Button className="mt-6 rounded-full bg-foreground text-background hover:bg-foreground/90">Upgrade</Button>}
                        >
                            <div className="space-y-4">
                                <h4 className="text-sm font-medium">Free</h4>
                                <LimitRow label="Contacts limit" value="0 / 1,000" />
                                <LimitRow label="Segments limit" value="1 / 3" progress={33} />
                                <LimitRow label="Broadcasts limit" value="Unlimited" noRing />
                            </div>
                        </Section>

                        {/* Team Section */}
                        <Section
                            title="Team"
                            description="Understand the quotas and limits for your team."
                        >
                            <div className="space-y-4">
                                <h4 className="text-sm font-medium">Free</h4>
                                <LimitRow label="Domains" value="0 / 1" />
                                <LimitRow label="Rate limit" value="2 req/s" noRing />
                            </div>
                        </Section>

                        {/* Extras Header */}
                        <div className="pt-8">
                            <h2 className="text-2xl font-semibold">Extras</h2>
                        </div>

                        {/* Pay-as-you-go Section */}
                        <Section
                            title="Pay-as-you-go"
                            description="Continue sending and receiving transactional emails beyond your quota."
                        >
                            <div>
                                <h4 className="text-sm font-medium text-foreground">Transactional · $0.90 / Per 1,000 Emails</h4>
                                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                    When enabled, Resend will automatically charge $0.90 for each additional bucket of 1,000 emails.
                                </p>
                                <div className="mt-6">
                                    <Switch className="data-[state=checked]:bg-primary" />
                                </div>
                            </div>
                        </Section>

                        {/* Add-ons Section */}
                        <Section
                            title="Add-ons"
                            description="Get even more of Resend with special add-ons."
                            borderBottom={false}
                        >
                            <div>
                                <h4 className="text-sm font-medium">Dedicated IPs - $30 / Mo</h4>
                                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                    Available to customers sending over 500 emails per day and on a Scale or higher plan.
                                </p>
                                <Button variant="outline" className="mt-6 border-border bg-transparent text-foreground hover:bg-accent">
                                    Request Dedicated IP
                                </Button>
                            </div>
                        </Section>
                    </div>
                </div>
            </main>
        </div>
    )
}

// --- Helper Components ---

function Tab({ children, active }: { children: React.ReactNode, active?: boolean }) {
    return (
        <button className={\`px-3 py-1.5 text-sm font-medium transition-colors rounded-t-md \${active ? 'bg-accent text-foreground' : 'text-muted-foreground hover:text-foreground'}\`}>
            {children}
        </button>
    )
}

function Section({ title, description, action, children, borderBottom = true }: {
    title: string, description: string, action?: React.ReactNode, children: React.ReactNode, borderBottom?: boolean
}) {
    return (
        <div className={\`grid grid-cols-1 md:grid-cols-3 gap-8 pb-12 \${borderBottom ? 'border-b border-border' : ''}\`}>
            <div className="col-span-1">
                <h3 className="text-lg font-medium">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground pr-4 font-normal">{description}</p>
                {action}
            </div>
            <div className="col-span-1 md:col-span-2">
                {children}
            </div>
        </div>
    )
}

function LimitRow({ label, value, progress = 0, noRing = false }: {
    label: string, value: string, progress?: number, noRing?: boolean
}) {
    return (
        <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-3">
                {!noRing && (
                    <div className="relative flex h-4 w-4 items-center justify-center">
                        <svg className="absolute inset-0 h-full w-full -rotate-90 text-accent" viewBox="0 0 36 36">
                            <path strokeDasharray="100, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" stroke="currentColor" strokeWidth="4" fill="none" />
                        </svg>
                        {progress > 0 && (
                            <svg className="absolute inset-0 h-full w-full -rotate-90 text-success" viewBox="0 0 36 36">
                                <path strokeDasharray={\`\${progress}, 100\`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" stroke="currentColor" strokeWidth="4" fill="none" />
                            </svg>
                        )}
                    </div>
                )}
                {noRing && <div className="h-4 w-4" />}
                <span className="text-sm text-muted-foreground">{label}</span>
            </div>
            <span className="text-sm text-foreground">{value}</span>
        </div>
    )
}`

export default function SettingsStyleguidePage() {
    return (
        <div className="p-8 max-w-6xl mx-auto">
            <div className="mb-10">
                <h1 className="text-2xl font-bold">Settings Page</h1>
                <p className="text-sm text-muted-foreground mt-1">
                    A full-page layout example featuring tab navigation, complex form sections, and usage metrics.
                </p>
            </div>

            <div className="space-y-12">
                {/* Preview Section */}
                <section>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold">Preview (Desktop Layout)</h2>
                        <span className="text-xs bg-accent px-2 py-1 rounded text-muted-foreground">Full Height Rendering</span>
                    </div>
                    <div className="border rounded-xl overflow-hidden bg-background shadow-2xl">
                        <SettingsPage />
                    </div>
                </section>

                {/* Documentation Section */}
                <section>
                    <h2 className="text-lg font-semibold mb-4">Usage</h2>
                    <Card>
                        <CardHeader>
                            <CardTitle>Implementation</CardTitle>
                            <CardDescription>How this page is structured using design tokens.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Tabs defaultValue="overview">
                                <TabsList className="mb-4">
                                    <TabsTrigger value="overview">Overview</TabsTrigger>
                                    <TabsTrigger value="code">Code</TabsTrigger>
                                </TabsList>
                                <TabsContent value="overview">
                                    <div className="text-sm text-muted-foreground">
                                        <p>The <code>SettingsPage</code> is a composite component that demonstrates:</p>
                                        <ul className="list-disc list-inside mt-3 space-y-2 text-foreground">
                                            <li><strong>Fluid Layout:</strong> Grid-based sections that adapt to screen size.</li>
                                            <li><strong>Theme Integration:</strong> Uses <code>bg-background</code>, <code>border-border</code>, and <code>text-muted-foreground</code>.</li>
                                            <li><strong>Custom Graphics:</strong> SVG-based progress rings using <code>text-success</code> and <code>text-accent</code>.</li>
                                            <li><strong>Interactive Elements:</strong> shadcn/ui <code>Switch</code> and <code>Button</code> components.</li>
                                        </ul>
                                    </div>
                                </TabsContent>
                                <TabsContent value="code">
                                    <pre className="p-4 rounded-lg bg-muted font-mono text-xs overflow-x-auto whitespace-pre-wrap">
                                        {SETTINGS_PAGE_SOURCE}
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
