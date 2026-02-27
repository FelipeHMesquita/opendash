"use client"

import {
    ResponsiveContainer,
    RadialBarChart,
    RadialBar,
    PolarRadiusAxis,
    Tooltip,
    Label,
} from "recharts"
import { COLORS, CHART_WRAPPER_CN, ChartTooltip } from "./_recharts-shared"

// ─── Data ────────────────────────────────────────────────────────────────────

const DATA_SINGLE = [
    { name: "Progresso", value: 73, fill: COLORS[0] },
]

const DATA_MULTI = [
    { name: "Chrome", value: 275, fill: COLORS[0] },
    { name: "Safari", value: 200, fill: COLORS[1] },
    { name: "Firefox", value: 187, fill: COLORS[2] },
    { name: "Edge", value: 173, fill: COLORS[3] },
]

const DATA_STACKED = [{ month: "jan", desktop: 1260, mobile: 570 }]

// ─── Gauge ───────────────────────────────────────────────────────────────────

export function RadialGauge() {
    return (
        <div className="w-full p-8">
            <div className="rounded-lg border border-border bg-card p-6 space-y-2">
                <h3 className="text-sm font-semibold text-foreground">Gauge</h3>
                <p className="text-xs text-muted-foreground mb-4">Métrica única</p>
                <div className={`${CHART_WRAPPER_CN} mx-auto aspect-square h-[200px]`}>
                    <ResponsiveContainer>
                        <RadialBarChart data={DATA_SINGLE} startAngle={180} endAngle={0} innerRadius={80} outerRadius={130}>
                            <Tooltip content={<ChartTooltip hideLabel />} />
                            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                                <Label
                                    content={({ viewBox }) => {
                                        if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                            return (
                                                <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                                                    <tspan x={viewBox.cx} y={(viewBox.cy || 0) - 8} className="fill-foreground text-3xl font-semibold">
                                                        73%
                                                    </tspan>
                                                    <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 16} className="fill-muted-foreground text-sm">
                                                        Completo
                                                    </tspan>
                                                </text>
                                            )
                                        }
                                    }}
                                />
                            </PolarRadiusAxis>
                            <RadialBar dataKey="value" background cornerRadius={10} />
                        </RadialBarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    )
}

// ─── Multi ───────────────────────────────────────────────────────────────────

export function RadialMulti() {
    return (
        <div className="w-full p-8">
            <div className="rounded-lg border border-border bg-card p-6 space-y-2">
                <h3 className="text-sm font-semibold text-foreground">Multi-série</h3>
                <p className="text-xs text-muted-foreground mb-4">Barras radiais múltiplas</p>
                <div className={`${CHART_WRAPPER_CN} mx-auto aspect-square h-[200px]`}>
                    <ResponsiveContainer>
                        <RadialBarChart data={DATA_MULTI} innerRadius={30} outerRadius={100}>
                            <Tooltip content={<ChartTooltip />} />
                            <RadialBar dataKey="value" background />
                        </RadialBarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    )
}

// ─── Stacked ─────────────────────────────────────────────────────────────────

export function RadialStacked() {
    return (
        <div className="w-full p-8">
            <div className="rounded-lg border border-border bg-card p-6 space-y-2">
                <h3 className="text-sm font-semibold text-foreground">Stacked</h3>
                <p className="text-xs text-muted-foreground mb-4">Duas séries sobrepostas</p>
                <div className={`${CHART_WRAPPER_CN} mx-auto aspect-square h-[200px]`}>
                    <ResponsiveContainer>
                        <RadialBarChart data={DATA_STACKED} endAngle={180} innerRadius={80} outerRadius={130}>
                            <Tooltip content={<ChartTooltip hideLabel />} />
                            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                                <Label
                                    content={({ viewBox }) => {
                                        if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                            return (
                                                <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                                                    <tspan x={viewBox.cx} y={(viewBox.cy || 0) - 8} className="fill-foreground text-2xl font-semibold">
                                                        1.830
                                                    </tspan>
                                                    <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 16} className="fill-muted-foreground text-sm">
                                                        Visitantes
                                                    </tspan>
                                                </text>
                                            )
                                        }
                                    }}
                                />
                            </PolarRadiusAxis>
                            <RadialBar dataKey="desktop" stackId="a" cornerRadius={5} fill={COLORS[0]} className="stroke-transparent stroke-2" />
                            <RadialBar dataKey="mobile" stackId="a" cornerRadius={5} fill={COLORS[1]} className="stroke-transparent stroke-2" />
                        </RadialBarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    )
}
