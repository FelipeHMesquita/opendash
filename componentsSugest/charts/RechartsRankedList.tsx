"use client"

import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Cell,
} from "recharts"
import { COLORS, CHART_WRAPPER_CN, AXIS_PROPS, ChartTooltip } from "./_recharts-shared"

// ─── Data ────────────────────────────────────────────────────────────────────

const DATA = [
    { name: "Produto A", category: "SaaS", value: 4820 },
    { name: "Produto B", category: "E-commerce", value: 3650 },
    { name: "Produto C", category: "SaaS", value: 2980 },
    { name: "Produto D", category: "Marketplace", value: 2150 },
    { name: "Produto E", category: "E-commerce", value: 1740 },
    { name: "Produto F", category: "SaaS", value: 1320 },
    { name: "Produto G", category: "Marketplace", value: 980 },
]

const LABELS = { value: "Receita" }

// ─── Simple ranked ───────────────────────────────────────────────────────────

export function RankedSimple({ chartHeight }: { chartHeight?: number }) {
    return (
        <div className="w-full p-8">
            <div className="rounded-lg border border-border bg-card p-6 space-y-2">
                <h3 className="text-sm font-semibold text-foreground">Ranking simples</h3>
                <p className="text-xs text-muted-foreground mb-4">Barras ordenadas por valor decrescente</p>
                <div className={CHART_WRAPPER_CN + " w-full"} style={{ height: chartHeight ?? 300 }}>
                    <ResponsiveContainer>
                        <BarChart data={DATA} layout="vertical" margin={{ left: 20 }}>
                            <CartesianGrid horizontal={false} />
                            <YAxis dataKey="name" type="category" {...AXIS_PROPS} width={80} />
                            <XAxis type="number" {...AXIS_PROPS} />
                            <Tooltip content={<ChartTooltip labels={LABELS} />} />
                            <Bar dataKey="value" radius={4}>
                                {DATA.map((_, i) => (
                                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    )
}

// ─── With category colors ────────────────────────────────────────────────────

export function RankedCategory({ chartHeight }: { chartHeight?: number }) {
    return (
        <div className="w-full p-8">
            <div className="rounded-lg border border-border bg-card p-6 space-y-2">
                <h3 className="text-sm font-semibold text-foreground">Por categoria</h3>
                <p className="text-xs text-muted-foreground mb-4">Cores agrupadas por categoria</p>
                <div className={CHART_WRAPPER_CN + " w-full"} style={{ height: chartHeight ?? 300 }}>
                    <ResponsiveContainer>
                        <BarChart data={DATA} layout="vertical" margin={{ left: 20 }}>
                            <CartesianGrid horizontal={false} />
                            <YAxis dataKey="name" type="category" {...AXIS_PROPS} width={80} />
                            <XAxis type="number" {...AXIS_PROPS} />
                            <Tooltip content={<ChartTooltip labels={LABELS} />} />
                            <Bar dataKey="value" radius={4}>
                                {DATA.map((entry, i) => {
                                    const colorMap: Record<string, string> = { SaaS: COLORS[0], "E-commerce": COLORS[1], Marketplace: COLORS[2] }
                                    return <Cell key={i} fill={colorMap[entry.category] ?? COLORS[3]} />
                                })}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-4 mt-3">
                    {[{ label: "SaaS", color: COLORS[0] }, { label: "E-commerce", color: COLORS[1] }, { label: "Marketplace", color: COLORS[2] }].map(item => (
                        <div key={item.label} className="flex items-center gap-1.5">
                            <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: item.color }} />
                            <span className="text-xs text-muted-foreground">{item.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
