import * as React from "react"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"

export function GeneralSettings() {
    return (
        <div className="flex min-h-screen w-full bg-background font-sans text-foreground">

            {/* Main Content - Full Width Scrollable */}
            <main className="flex-1 px-8 py-12 lg:px-16 overflow-y-auto">
                <div className="space-y-16 pb-24">

                    {/* Profile Section */}
                    <section>
                        <div className="mb-6">
                            <h2 className="text-base/7 font-semibold text-foreground">Profile</h2>
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
                            <h2 className="text-base/7 font-semibold text-foreground">Bank accounts</h2>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Connect bank accounts to your account.
                            </p>
                        </div>
                        <div className="space-y-0">
                            <SettingsRow label="TD Canada Trust" value="" />
                            <SettingsRow label="Royal Bank of Canada" value="" isLast />
                        </div>
                        <Button variant="link" className="mt-6 h-auto p-0 text-sm font-semibold">
                            + Add another bank
                        </Button>
                    </section>

                    {/* Integrations Section */}
                    <section>
                        <div className="mb-6">
                            <h2 className="text-base/7 font-semibold text-foreground">Integrations</h2>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Connect applications to your account.
                            </p>
                        </div>
                        <div className="space-y-0">
                            <SettingsRow label="QuickBooks" value="" isLast />
                        </div>
                        <Button variant="link" className="mt-6 h-auto p-0 text-sm font-semibold">
                            + Add another application
                        </Button>
                    </section>

                    {/* Language and Dates Section */}
                    <section>
                        <div className="mb-6">
                            <h2 className="text-base/7 font-semibold text-foreground">Language and dates</h2>
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
        <div className={`flex flex-col sm:flex-row sm:items-center justify-between py-5 ${!isLast ? 'border-b border-border' : ''}`}>
            <span className="text-sm font-medium text-muted-foreground sm:w-1/3">{label}</span>
            <span className="mt-1 text-sm text-foreground sm:mt-0 sm:w-1/3">{value}</span>
            <div className="mt-2 sm:mt-0 sm:w-1/3 sm:text-right">
                <Button variant="link" className="h-auto p-0 text-sm font-semibold">
                    Update
                </Button>
            </div>
        </div>
    )
}
