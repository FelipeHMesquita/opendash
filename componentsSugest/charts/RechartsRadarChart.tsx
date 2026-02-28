"use client"

import {
    ResponsiveContainer,
    RadarChart,
    Radar,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Tooltip,
    Legend,
} from "recharts"
import { COLORS, CHART_WRAPPER_CN, ChartTooltip, ChartLegend } from "./_recharts-shared"

// ─── Data ────────────────────────────────────────────────────────────────────

const DATA = [
    { skill: "Design", desktop: 86, mobile: 65 },
    { skill: "Frontend", desktop: 78, mobile: 90 },
    { skill: "Backend", desktop: 92, mobile: 50 },
    { skill: "DevOps", desktop: 65, mobile: 40 },
    { skill: "Mobile", desktop: 42, mobile: 85 },
    { skill: "QA", desktop: 70, mobile: 60 },
]

const LABELS = { desktop: "Desktop", mobile: "Mobile" }
const LABELS_SINGLE = { desktop: "Pontuação" }

// ─── Simple ──────────────────────────────────────────────────────────────────

export function RadarSimple({ chartHeight }: { chartHeight?: number }) {
    return (
        <div className="w-full p-8">
            <div className="rounded-lg border border-border bg-card p-6 space-y-2">
                <h3 className="text-sm font-semibold text-foreground">Radar Simples</h3>
                <p className="text-xs text-muted-foreground mb-4">Uma série com preenchimento</p>
                <div className={CHART_WRAPPER_CN + " mx-auto aspect-square"} style={{ height: chartHeight ?? 250 }}>
                    <ResponsiveContainer>
                        <RadarChart data={DATA} outerRadius="65%" margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
                            <Tooltip content={<ChartTooltip labels={LABELS_SINGLE} />} />
                            <PolarAngleAxis dataKey="skill" tick={{ fontSize: 12 }} />
                            <PolarGrid />
                            <Radar dataKey="desktop" fill={COLORS[0]} fillOpacity={0.6} stroke={COLORS[0]} />
                        </RadarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    )
}

// ─── Multi-series ────────────────────────────────────────────────────────────

export function RadarMulti({ chartHeight }: { chartHeight?: number }) {
    return (
        <div className="w-full p-8">
            <div className="rounded-lg border border-border bg-card p-6 space-y-2">
                <h3 className="text-sm font-semibold text-foreground">Radar Multi-série</h3>
                <p className="text-xs text-muted-foreground mb-4">Comparação entre duas séries</p>
                <div className={CHART_WRAPPER_CN + " mx-auto aspect-square"} style={{ height: chartHeight ?? 250 }}>
                    <ResponsiveContainer>
                        <RadarChart data={DATA} outerRadius="65%" margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
                            <Tooltip content={<ChartTooltip labels={LABELS} />} />
                            <PolarAngleAxis dataKey="skill" tick={{ fontSize: 12 }} />
                            <PolarGrid />
                            <PolarRadiusAxis angle={60} domain={[0, 100]} />
                            <Legend content={<ChartLegend labels={LABELS} />} />
                            <Radar dataKey="desktop" fill={COLORS[0]} fillOpacity={0.3} stroke={COLORS[0]} strokeWidth={2} />
                            <Radar dataKey="mobile" fill={COLORS[1]} fillOpacity={0.3} stroke={COLORS[1]} strokeWidth={2} />
                        </RadarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    )
}
