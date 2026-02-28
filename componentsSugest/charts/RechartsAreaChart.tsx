"use client"

import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from "recharts"
import { COLORS, CHART_WRAPPER_CN, AXIS_PROPS, ChartTooltip, ChartLegend } from "./_recharts-shared"

// ─── Data ────────────────────────────────────────────────────────────────────

const DATA = [
    { month: "Jan", desktop: 186, mobile: 80 },
    { month: "Fev", desktop: 305, mobile: 200 },
    { month: "Mar", desktop: 237, mobile: 120 },
    { month: "Abr", desktop: 73, mobile: 190 },
    { month: "Mai", desktop: 209, mobile: 130 },
    { month: "Jun", desktop: 214, mobile: 140 },
]

const DATA_STACKED = [
    { month: "Jan", desktop: 186, mobile: 80, tablet: 45 },
    { month: "Fev", desktop: 305, mobile: 200, tablet: 90 },
    { month: "Mar", desktop: 237, mobile: 120, tablet: 65 },
    { month: "Abr", desktop: 73, mobile: 190, tablet: 110 },
    { month: "Mai", desktop: 209, mobile: 130, tablet: 80 },
    { month: "Jun", desktop: 214, mobile: 140, tablet: 95 },
]

const LABELS = { desktop: "Desktop", mobile: "Mobile" }
const LABELS_STACKED = { desktop: "Desktop", mobile: "Mobile", tablet: "Tablet" }

// ─── Simple ──────────────────────────────────────────────────────────────────

export function AreaSimple({ chartHeight }: { chartHeight?: number }) {
    return (
        <div className="w-full p-8">
            <div className="rounded-lg border border-border bg-card p-6 space-y-2">
                <h3 className="text-sm font-semibold text-foreground">Área Simples</h3>
                <p className="text-xs text-muted-foreground mb-4">Duas séries com gradiente e legenda</p>
                <div className={CHART_WRAPPER_CN + " w-full"} style={{ height: chartHeight ?? 250 }}>
                    <ResponsiveContainer>
                        <AreaChart data={DATA}>
                            <CartesianGrid vertical={false} />
                            <XAxis dataKey="month" {...AXIS_PROPS} />
                            <YAxis {...AXIS_PROPS} />
                            <Tooltip content={<ChartTooltip labels={LABELS} />} />
                            <Legend content={<ChartLegend labels={LABELS} />} />
                            <defs>
                                <linearGradient id="rc-fillDesktop" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={COLORS[0]} stopOpacity={0.8} />
                                    <stop offset="95%" stopColor={COLORS[0]} stopOpacity={0.1} />
                                </linearGradient>
                                <linearGradient id="rc-fillMobile" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={COLORS[1]} stopOpacity={0.8} />
                                    <stop offset="95%" stopColor={COLORS[1]} stopOpacity={0.1} />
                                </linearGradient>
                            </defs>
                            <Area type="natural" dataKey="mobile" fill="url(#rc-fillMobile)" stroke={COLORS[1]} stackId="a" />
                            <Area type="natural" dataKey="desktop" fill="url(#rc-fillDesktop)" stroke={COLORS[0]} stackId="a" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    )
}

// ─── Stacked ─────────────────────────────────────────────────────────────────

export function AreaStacked({ chartHeight }: { chartHeight?: number }) {
    return (
        <div className="w-full p-8">
            <div className="rounded-lg border border-border bg-card p-6 space-y-2">
                <h3 className="text-sm font-semibold text-foreground">Área Stacked</h3>
                <p className="text-xs text-muted-foreground mb-4">Três séries empilhadas com curva linear</p>
                <div className={CHART_WRAPPER_CN + " w-full"} style={{ height: chartHeight ?? 250 }}>
                    <ResponsiveContainer>
                        <AreaChart data={DATA_STACKED}>
                            <CartesianGrid vertical={false} />
                            <XAxis dataKey="month" {...AXIS_PROPS} />
                            <YAxis {...AXIS_PROPS} />
                            <Tooltip content={<ChartTooltip labels={LABELS_STACKED} />} />
                            <Legend content={<ChartLegend labels={LABELS_STACKED} />} />
                            <Area type="monotone" dataKey="tablet" fill={COLORS[2]} stroke={COLORS[2]} fillOpacity={0.4} stackId="a" />
                            <Area type="monotone" dataKey="mobile" fill={COLORS[1]} stroke={COLORS[1]} fillOpacity={0.4} stackId="a" />
                            <Area type="monotone" dataKey="desktop" fill={COLORS[0]} stroke={COLORS[0]} fillOpacity={0.4} stackId="a" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    )
}
