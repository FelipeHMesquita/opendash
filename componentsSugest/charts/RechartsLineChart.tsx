"use client"

import {
    ResponsiveContainer,
    LineChart,
    Line,
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

const DATA_MULTI = [
    { month: "Jan", desktop: 186, mobile: 80, tablet: 120 },
    { month: "Fev", desktop: 305, mobile: 200, tablet: 180 },
    { month: "Mar", desktop: 237, mobile: 120, tablet: 150 },
    { month: "Abr", desktop: 73, mobile: 190, tablet: 90 },
    { month: "Mai", desktop: 209, mobile: 130, tablet: 170 },
    { month: "Jun", desktop: 214, mobile: 140, tablet: 160 },
]

const LABELS = { desktop: "Desktop", mobile: "Mobile" }
const LABELS_MULTI = { desktop: "Desktop", mobile: "Mobile", tablet: "Tablet" }

// ─── Simple ──────────────────────────────────────────────────────────────────

export function LineSimple({ chartHeight }: { chartHeight?: number }) {
    return (
        <div className="w-full p-8">
            <div className="rounded-lg border border-border bg-card p-6 space-y-2">
                <h3 className="text-sm font-semibold text-foreground">Linha Simples</h3>
                <p className="text-xs text-muted-foreground mb-4">Duas séries com dots</p>
                <div className={CHART_WRAPPER_CN + " w-full"} style={{ height: chartHeight ?? 250 }}>
                    <ResponsiveContainer>
                        <LineChart data={DATA}>
                            <CartesianGrid vertical={false} />
                            <XAxis dataKey="month" {...AXIS_PROPS} />
                            <YAxis {...AXIS_PROPS} />
                            <Tooltip content={<ChartTooltip labels={LABELS} />} />
                            <Legend content={<ChartLegend labels={LABELS} />} />
                            <Line type="monotone" dataKey="desktop" stroke={COLORS[0]} strokeWidth={2} dot={{ r: 4 }} />
                            <Line type="monotone" dataKey="mobile" stroke={COLORS[1]} strokeWidth={2} dot={{ r: 4 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    )
}

// ─── Multi-series ────────────────────────────────────────────────────────────

export function LineMulti({ chartHeight }: { chartHeight?: number }) {
    return (
        <div className="w-full p-8">
            <div className="rounded-lg border border-border bg-card p-6 space-y-2">
                <h3 className="text-sm font-semibold text-foreground">Linha Multi-série</h3>
                <p className="text-xs text-muted-foreground mb-4">Três séries com estilos variados</p>
                <div className={CHART_WRAPPER_CN + " w-full"} style={{ height: chartHeight ?? 250 }}>
                    <ResponsiveContainer>
                        <LineChart data={DATA_MULTI}>
                            <CartesianGrid vertical={false} />
                            <XAxis dataKey="month" {...AXIS_PROPS} />
                            <YAxis {...AXIS_PROPS} />
                            <Tooltip content={<ChartTooltip labels={LABELS_MULTI} />} />
                            <Legend content={<ChartLegend labels={LABELS_MULTI} />} />
                            <Line type="monotone" dataKey="desktop" stroke={COLORS[0]} strokeWidth={2} />
                            <Line type="monotone" dataKey="mobile" stroke={COLORS[1]} strokeWidth={2} strokeDasharray="5 5" />
                            <Line type="natural" dataKey="tablet" stroke={COLORS[2]} strokeWidth={2} dot={false} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    )
}
