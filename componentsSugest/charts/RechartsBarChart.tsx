"use client"

import {
    ResponsiveContainer,
    BarChart,
    Bar,
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

const DATA_HORIZONTAL = [
    { browser: "Chrome", visitors: 275, fill: COLORS[0] },
    { browser: "Safari", visitors: 200, fill: COLORS[1] },
    { browser: "Firefox", visitors: 187, fill: COLORS[2] },
    { browser: "Edge", visitors: 173, fill: COLORS[3] },
    { browser: "Outros", visitors: 90, fill: COLORS[4] },
]

const LABELS = { desktop: "Desktop", mobile: "Mobile" }
const LABELS_HORIZONTAL = { visitors: "Visitantes" }

// ─── Vertical Grouped ────────────────────────────────────────────────────────

export function BarGrouped() {
    return (
        <div className="w-full p-8">
            <div className="rounded-lg border border-border bg-card p-6 space-y-2">
                <h3 className="text-sm font-semibold text-foreground">Vertical — Grouped</h3>
                <p className="text-xs text-muted-foreground mb-4">Duas séries lado a lado com legenda</p>
                <div className={`${CHART_WRAPPER_CN} h-[250px] w-full`}>
                    <ResponsiveContainer>
                        <BarChart data={DATA}>
                            <CartesianGrid vertical={false} />
                            <XAxis dataKey="month" {...AXIS_PROPS} />
                            <YAxis {...AXIS_PROPS} />
                            <Tooltip content={<ChartTooltip labels={LABELS} />} />
                            <Legend content={<ChartLegend labels={LABELS} />} />
                            <Bar dataKey="desktop" fill={COLORS[0]} radius={4} />
                            <Bar dataKey="mobile" fill={COLORS[1]} radius={4} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    )
}

// ─── Vertical Stacked ────────────────────────────────────────────────────────

export function BarStacked() {
    return (
        <div className="w-full p-8">
            <div className="rounded-lg border border-border bg-card p-6 space-y-2">
                <h3 className="text-sm font-semibold text-foreground">Vertical — Stacked</h3>
                <p className="text-xs text-muted-foreground mb-4">Séries empilhadas</p>
                <div className={`${CHART_WRAPPER_CN} h-[250px] w-full`}>
                    <ResponsiveContainer>
                        <BarChart data={DATA}>
                            <CartesianGrid vertical={false} />
                            <XAxis dataKey="month" {...AXIS_PROPS} />
                            <YAxis {...AXIS_PROPS} />
                            <Tooltip content={<ChartTooltip hideLabel labels={LABELS} />} />
                            <Legend content={<ChartLegend labels={LABELS} />} />
                            <Bar dataKey="desktop" fill={COLORS[0]} radius={[0, 0, 4, 4]} stackId="a" />
                            <Bar dataKey="mobile" fill={COLORS[1]} radius={[4, 4, 0, 0]} stackId="a" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    )
}

// ─── Horizontal ──────────────────────────────────────────────────────────────

export function BarHorizontal() {
    return (
        <div className="w-full p-8">
            <div className="rounded-lg border border-border bg-card p-6 space-y-2">
                <h3 className="text-sm font-semibold text-foreground">Horizontal</h3>
                <p className="text-xs text-muted-foreground mb-4">Barras horizontais com cores por categoria</p>
                <div className={`${CHART_WRAPPER_CN} h-[250px] w-full`}>
                    <ResponsiveContainer>
                        <BarChart data={DATA_HORIZONTAL} layout="vertical">
                            <CartesianGrid horizontal={false} />
                            <YAxis dataKey="browser" type="category" {...AXIS_PROPS} tickMargin={10} />
                            <XAxis type="number" hide />
                            <Tooltip content={<ChartTooltip hideLabel labels={LABELS_HORIZONTAL} />} />
                            <Bar dataKey="visitors" radius={5} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    )
}
