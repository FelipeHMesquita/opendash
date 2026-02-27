import * as React from "react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"

export function SettingsPage() {
    return (
        <div className="min-h-screen w-full bg-background font-sans text-foreground">

            {/* Main Content */}
            <main className="px-8 py-12 lg:px-16 lg:py-16">
                <div>
                    <h1 className="text-lg/7 font-semibold text-foreground">Settings</h1>

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
                            action={<Button className="mt-6">Upgrade</Button>}
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
                            action={<Button className="mt-6">Upgrade</Button>}
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
                            <h2 className="text-base/7 font-semibold text-foreground">Extras</h2>
                        </div>

                        {/* Pay-as-you-go Section */}
                        <Section
                            title="Pay-as-you-go"
                            description="Continue sending and receiving transactional emails beyond your quota."
                        >
                            <div>
                                <h4 className="text-sm font-medium text-foreground">Transactional · $0.90 / Per 1,000 Emails</h4>
                                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                    When enabled, you will continue sending and receiving transactional emails beyond your quota. Resend will automatically charge $0.90 for each additional bucket of 1,000 emails.
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
                                    Available to customers sending over 500 emails per day and on a Scale or higher plan. Resend will provision, warm up, monitor and auto-scale the dedicated IP to ensure consistent deliverability and performance.
                                </p>
                                <Button variant="outline" className="mt-6">
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
        <Button
            variant="ghost"
            className={cn(
                "rounded-t-md px-3 py-1.5 text-sm font-medium h-auto",
                active ? "bg-accent text-foreground" : "text-muted-foreground"
            )}
        >
            {children}
        </Button>
    )
}

function Section({ title, description, action, children, borderBottom = true }: { title: string, description: string, action?: React.ReactNode, children: React.ReactNode, borderBottom?: boolean }) {
    return (
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 pb-12 ${borderBottom ? 'border-b border-border' : ''}`}>
            <div className="col-span-1">
                <h3 className="text-sm/6 font-semibold text-foreground">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground pr-4 font-normal">{description}</p>
                {action}
            </div>
            <div className="col-span-1 md:col-span-2">
                {children}
            </div>
        </div>
    )
}

function LimitRow({ label, value, progress = 0, noRing = false }: { label: string, value: string, progress?: number, noRing?: boolean }) {
    return (
        <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-3">
                {!noRing && (
                    <div className="relative flex h-4 w-4 items-center justify-center">
                        {/* Background circle */}
                        <svg className="absolute inset-0 h-full w-full -rotate-90 text-accent" viewBox="0 0 36 36">
                            <path strokeDasharray="100, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" stroke="currentColor" strokeWidth="4" fill="none" />
                        </svg>
                        {/* Progress circle (Success/Primary color) */}
                        {progress > 0 && (
                            <svg className="absolute inset-0 h-full w-full -rotate-90 text-success" viewBox="0 0 36 36">
                                <path strokeDasharray={`${progress}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" stroke="currentColor" strokeWidth="4" fill="none" />
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
}
