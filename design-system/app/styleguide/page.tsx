"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

// ─── Types ────────────────────────────────────────────────────────────────────
interface ColorSwatch {
    name: string
    variable: string
    textVariable?: string
}

// ─── Color Data ───────────────────────────────────────────────────────────────
const semanticColors: ColorSwatch[] = [
    { name: "Background", variable: "--background", textVariable: "--foreground" },
    { name: "Foreground", variable: "--foreground" },
    { name: "Card", variable: "--card", textVariable: "--card-foreground" },
    { name: "Primary", variable: "--primary", textVariable: "--primary-foreground" },
    { name: "Secondary", variable: "--secondary", textVariable: "--secondary-foreground" },
    { name: "Muted", variable: "--muted", textVariable: "--muted-foreground" },
    { name: "Accent", variable: "--accent", textVariable: "--accent-foreground" },
    { name: "Destructive", variable: "--destructive", textVariable: "--destructive-foreground" },
    { name: "Border", variable: "--border" },
    { name: "Ring", variable: "--ring" },
]

const statusColors: ColorSwatch[] = [
    { name: "Success", variable: "--success", textVariable: "--success-foreground" },
    { name: "Warning", variable: "--warning", textVariable: "--warning-foreground" },
    { name: "Info", variable: "--info", textVariable: "--info-foreground" },
    { name: "Destructive", variable: "--destructive", textVariable: "--destructive-foreground" },
]

const chartColors: ColorSwatch[] = [
    { name: "Chart 1", variable: "--chart-1" },
    { name: "Chart 2", variable: "--chart-2" },
    { name: "Chart 3", variable: "--chart-3" },
    { name: "Chart 4", variable: "--chart-4" },
    { name: "Chart 5", variable: "--chart-5" },
]

const purpleScale = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]
const greyScale = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]

const radiusValues = [
    { name: "sm", value: "calc(var(--radius) - 2px)", label: "4px" },
    { name: "md", value: "var(--radius)", label: "6px" },
    { name: "lg", value: "calc(var(--radius) + 4px)", label: "10px" },
    { name: "xl", value: "calc(var(--radius) + 8px)", label: "14px" },
    { name: "2xl", value: "calc(var(--radius) + 16px)", label: "22px" },
    { name: "full", value: "9999px", label: "Full/Pill" },
]

const shadowValues = [
    { name: "sm", shadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)" },
    { name: "md", shadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)" },
    { name: "lg", shadow: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)" },
    { name: "xl", shadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" },
]

// ─── Sub-components ───────────────────────────────────────────────────────────
function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <section className="mb-12">
            <h2 className="text-lg font-semibold mb-1">{title}</h2>
            <div className="h-px bg-border mb-6" />
            {children}
        </section>
    )
}

function ColorCard({ swatch }: { swatch: ColorSwatch }) {
    return (
        <div className="flex flex-col gap-1.5">
            <div
                className="h-14 w-full rounded-md border border-border/50"
                style={{ background: `var(${swatch.variable})` }}
            />
            <div>
                <p className="text-xs font-medium text-foreground">{swatch.name}</p>
                <p className="text-[11px] font-mono text-muted-foreground">{swatch.variable}</p>
            </div>
        </div>
    )
}

function ScaleRow({ label, scale, cssPrefix }: { label: string; scale: number[]; cssPrefix: string }) {
    return (
        <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">{label}</p>
            <div className="flex gap-1">
                {scale.map((step) => (
                    <div key={step} className="flex-1 flex flex-col gap-1">
                        <div
                            className="h-10 rounded"
                            style={{ background: `var(--${cssPrefix}-${step})` }}
                        />
                        <p className="text-[10px] font-mono text-center text-muted-foreground">{step}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function StyleguidePage() {
    const [darkMode, setDarkMode] = useState(false)

    const toggleDark = () => {
        setDarkMode(!darkMode)
        document.documentElement.classList.toggle("dark")
    }

    return (
        <div className="p-8 max-w-5xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-10">
                <div>
                    <h1 className="text-2xl font-bold">Design Tokens</h1>
                    <p className="text-sm text-muted-foreground mt-1">
                        Extracted from design — Purple minimal dark SaaS system
                    </p>
                </div>
                <Button variant="outline" size="sm" onClick={toggleDark}>
                    {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
                </Button>
            </div>

            {/* ── Design Summary Banner ── */}
            <Card className="mb-10">
                <CardHeader className="pb-3">
                    <CardTitle className="text-base">Design Summary</CardTitle>
                    <CardDescription>Token overview for this design system</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                            <span className="text-muted-foreground text-xs uppercase tracking-wide font-semibold">Primary Color</span>
                            <p className="mt-1 font-medium flex items-center gap-2">
                                <span className="w-4 h-4 rounded-full inline-block" style={{ background: "var(--primary)" }} />
                                Purple (#7C3AED-ish)
                            </p>
                        </div>
                        <div>
                            <span className="text-muted-foreground text-xs uppercase tracking-wide font-semibold">Font</span>
                            <p className="mt-1 font-medium">Inter</p>
                        </div>
                        <div>
                            <span className="text-muted-foreground text-xs uppercase tracking-wide font-semibold">Border Radius</span>
                            <p className="mt-1 font-medium">6px — Sharp/minimal</p>
                        </div>
                        <div>
                            <span className="text-muted-foreground text-xs uppercase tracking-wide font-semibold">Style</span>
                            <p className="mt-1 font-medium">Modern minimal dark SaaS</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* ── Semantic Colors ── */}
            <Section title="Semantic Colors">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                    {semanticColors.map((swatch) => (
                        <ColorCard key={swatch.variable} swatch={swatch} />
                    ))}
                </div>
            </Section>

            {/* ── Color Scales ── */}
            <Section title="Color Scales">
                <div className="flex flex-col gap-6">
                    <ScaleRow label="Purple (Primary)" scale={purpleScale} cssPrefix="purple" />
                    <ScaleRow label="Grey (Neutral)" scale={greyScale} cssPrefix="grey" />
                </div>
            </Section>

            {/* ── Status / Semantic ── */}
            <Section title="Status Colors">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {statusColors.map((swatch) => (
                        <ColorCard key={swatch.name} swatch={swatch} />
                    ))}
                </div>
            </Section>

            {/* ── Chart Colors ── */}
            <Section title="Chart Colors">
                <div className="flex gap-3">
                    {chartColors.map((swatch) => (
                        <div key={swatch.variable} className="flex-1 flex flex-col gap-1.5">
                            <div
                                className="h-12 rounded-md"
                                style={{ background: `var(${swatch.variable})` }}
                            />
                            <p className="text-[11px] font-mono text-muted-foreground text-center">{swatch.name}</p>
                        </div>
                    ))}
                </div>
            </Section>

            {/* ── Typography ── */}
            <Section title="Typography">
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">text-4xl / 700</span>
                        <p className="text-4xl font-bold">The quick brown fox</p>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">text-3xl / 700</span>
                        <p className="text-3xl font-bold">The quick brown fox</p>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">text-2xl / 600</span>
                        <p className="text-2xl font-semibold">The quick brown fox</p>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">text-xl / 600</span>
                        <p className="text-xl font-semibold">The quick brown fox jumps over the lazy dog</p>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">text-lg / 500</span>
                        <p className="text-lg font-medium">The quick brown fox jumps over the lazy dog</p>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">text-base / 400</span>
                        <p className="text-base">The quick brown fox jumps over the lazy dog. Body text at base size for reading.</p>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">text-sm / 400</span>
                        <p className="text-sm">The quick brown fox jumps over the lazy dog. Small text used in UI labels and captions.</p>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">text-xs / muted</span>
                        <p className="text-xs text-muted-foreground">The quick brown fox jumps over the lazy dog. Extra small, muted, for hint text and metadata.</p>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">font-mono</span>
                        <p className="font-mono text-sm">const designSystem = {"{ primary: 'oklch(0.62 0.22 284)' }"}</p>
                    </div>
                </div>
            </Section>

            {/* ── Border Radius ── */}
            <Section title="Border Radius">
                <div className="flex flex-wrap gap-4">
                    {radiusValues.map(({ name, value, label }) => (
                        <div key={name} className="flex flex-col items-center gap-2">
                            <div
                                className="w-16 h-16 bg-primary/20 border-2 border-primary"
                                style={{ borderRadius: value }}
                            />
                            <div className="text-center">
                                <p className="text-xs font-medium">{name}</p>
                                <p className="text-[10px] font-mono text-muted-foreground">{label}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </Section>

            {/* ── Shadows ── */}
            <Section title="Shadows">
                <div className="flex flex-wrap gap-6">
                    {shadowValues.map(({ name, shadow }) => (
                        <div key={name} className="flex flex-col items-center gap-3">
                            <div
                                className="w-20 h-20 bg-card rounded-md"
                                style={{ boxShadow: shadow }}
                            />
                            <p className="text-xs font-mono text-muted-foreground">shadow-{name}</p>
                        </div>
                    ))}
                </div>
            </Section>

            {/* ── Components ── */}
            <Section title="Components">
                {/* Buttons */}
                <div className="mb-8">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">Button</h3>
                    <div className="flex flex-wrap gap-3">
                        <Button>Default</Button>
                        <Button variant="secondary">Secondary</Button>
                        <Button variant="outline">Outline</Button>
                        <Button variant="ghost">Ghost</Button>
                        <Button variant="destructive">Destructive</Button>
                        <Button variant="link">Link</Button>
                        <Button disabled>Disabled</Button>
                    </div>
                    <div className="flex flex-wrap gap-3 mt-3">
                        <Button size="sm">Small</Button>
                        <Button size="default">Default</Button>
                        <Button size="lg">Large</Button>
                    </div>
                </div>

                {/* Badges */}
                <div className="mb-8">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">Badge</h3>
                    <div className="flex flex-wrap gap-3">
                        <Badge>Default</Badge>
                        <Badge variant="secondary">Secondary</Badge>
                        <Badge variant="outline">Outline</Badge>
                        <Badge variant="destructive">Destructive</Badge>
                    </div>
                </div>

                {/* Alerts */}
                <div className="mb-8">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">Alert</h3>
                    <div className="flex flex-col gap-3">
                        <Alert>
                            <AlertTitle>Default Alert</AlertTitle>
                            <AlertDescription>
                                This is a default informational alert using the design system tokens.
                            </AlertDescription>
                        </Alert>
                        <Alert variant="destructive">
                            <AlertTitle>Destructive Alert</AlertTitle>
                            <AlertDescription>
                                Something went wrong. Please try again or contact support.
                            </AlertDescription>
                        </Alert>
                    </div>
                </div>

                {/* Cards */}
                <div className="mb-8">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">Card</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Emails Sent</CardTitle>
                                <CardDescription>Total this month</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-3xl font-bold">12,483</p>
                                <p className="text-xs text-muted-foreground mt-1">↑ 12% from last month</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Deliverability</CardTitle>
                                <CardDescription>Average rate</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-3xl font-bold">99.2%</p>
                                <p className="text-xs text-muted-foreground mt-1">Excellent performance</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Bounce Rate</CardTitle>
                                <CardDescription>Last 30 days</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-3xl font-bold">0.4%</p>
                                <p className="text-xs text-muted-foreground mt-1">Below industry average</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Radio Group */}
                <div className="mb-8">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">Radio Group</h3>
                    <RadioGroup defaultValue="option-one" className="flex flex-col gap-2">
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="option-one" id="option-one" />
                            <Label htmlFor="option-one">Free plan — 3,000 emails/month</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="option-two" id="option-two" />
                            <Label htmlFor="option-two">Pro plan — 50,000 emails/month</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="option-three" id="option-three" />
                            <Label htmlFor="option-three">Enterprise — unlimited</Label>
                        </div>
                    </RadioGroup>
                </div>
            </Section>

            {/* Footer */}
            <div className="border-t pt-6 mt-4 flex items-center justify-between">
                <p className="text-xs text-muted-foreground">
                    Design System · Built with shadcn/ui + Tailwind CSS v4
                </p>
                <Badge variant="outline" className="text-xs font-mono">v1.0.0</Badge>
            </div>
        </div>
    )
}
