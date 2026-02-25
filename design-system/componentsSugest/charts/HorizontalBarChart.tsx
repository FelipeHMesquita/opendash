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

// ─── Colors ────────────────────────────────────────────────────────────────────

const CHART_COLORS = [
    "var(--color-chart-1)",
    "var(--color-chart-2)",
    "var(--color-chart-3)",
    "var(--color-chart-4)",
    "var(--color-chart-5)",
]

// ─── Data ──────────────────────────────────────────────────────────────────────

type DataPoint = {
    area: string
    realizado: number
    meta: number
}

const DATA: DataPoint[] = [
    { area: "Vendas",     realizado: 85, meta: 100 },
    { area: "Marketing",  realizado: 72, meta: 90  },
    { area: "Suporte",    realizado: 91, meta: 95  },
    { area: "Produto",    realizado: 68, meta: 80  },
    { area: "Engenharia", realizado: 94, meta: 100 },
    { area: "Design",     realizado: 78, meta: 85  },
]

// ─── Stable references (defined outside component) ────────────────────────────

const cursorStyle = { fill: "var(--border)", fillOpacity: 0.5 }

const xAxisProps = {
    type: "number" as const,
    domain: [0, 100] as [number, number],
    tick: { fill: "var(--muted-foreground)", fontSize: 12 },
    axisLine: { stroke: "var(--border)" },
    tickLine: false as const,
    tickFormatter: (v: number) => `${v}%`,
}

const yAxisProps = {
    type: "category" as const,
    dataKey: "area",
    width: 90,
    tick: { fill: "var(--muted-foreground)", fontSize: 12 },
    axisLine: false as const,
    tickLine: false as const,
}

// ─── Tooltip (memoized — only re-renders when active/payload/label change) ─────

type TooltipPayloadItem = {
    name: string
    value: number
    color: string
}

type CustomTooltipProps = {
    active?: boolean
    payload?: TooltipPayloadItem[]
    label?: string
}

function ChartTooltip({
    active,
    payload,
    label,
}: CustomTooltipProps) {
    if (!active || !payload?.length) return null
    return (
        <div
            className="rounded px-3 py-2 shadow-lg"
            style={{ background: "var(--accent)", border: "1px solid var(--border)" }}
        >
            {label && (
                <p className="mb-1.5 text-xs font-medium" style={{ color: "var(--muted-foreground)" }}>{label}</p>
            )}
            <div className="flex flex-col gap-1">
                {payload.map((entry) => (
                    <div key={entry.name} className="flex items-center gap-2">
                        <span
                            className="h-2 w-2 shrink-0 rounded-full"
                            style={{ backgroundColor: entry.color }}
                        />
                        <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>{entry.name}</span>
                        <span className="ml-auto pl-4 text-sm font-semibold tabular-nums" style={{ color: "var(--foreground)" }}>
                            {entry.value}%
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}

// ─── Legend ────────────────────────────────────────────────────────────────────

type LegendPayloadItem = {
    value: string
    color: string
}

type CustomLegendProps = {
    payload?: LegendPayloadItem[]
}

function ChartLegend({ payload }: CustomLegendProps) {
    if (!payload?.length) return null
    return (
        <div className="mt-3 flex flex-wrap items-center justify-center gap-4">
            {payload.map((entry) => (
                <div key={entry.value} className="flex items-center gap-1.5">
                    <span
                        className="h-2 w-2 shrink-0 rounded-full"
                        style={{ backgroundColor: entry.color }}
                    />
                    <span className="text-xs text-muted-foreground">{entry.value}</span>
                </div>
            ))}
        </div>
    )
}

// ─── Component ─────────────────────────────────────────────────────────────────

export function HorizontalBarChart({ chartHeight = 300 }: { chartHeight?: number }) {
    return (
        <div className="w-full p-8">
            <div className="rounded-lg border border-border bg-card p-6">
                <div className="mb-6">
                    <h3 className="text-sm/6 font-semibold text-foreground">
                        Performance por Área
                    </h3>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                        Realizado vs. Meta — Nov 2024
                    </p>
                </div>
                <ResponsiveContainer width="100%" height={chartHeight}>
                    <BarChart
                        layout="vertical"
                        data={DATA}
                        barGap={4}
                        barCategoryGap="45%"
                    >
                        <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="var(--border)"
                            horizontal={false}
                        />
                        <XAxis {...xAxisProps} />
                        <YAxis {...yAxisProps} />
                        <Tooltip
                            content={ChartTooltip}
                            cursor={cursorStyle}
                            isAnimationActive={false}
                        />
                        <Legend content={ChartLegend} />
                        <Bar
                            dataKey="realizado"
                            name="Realizado"
                            fill={CHART_COLORS[0]}
                            radius={[0, 3, 3, 0]}
                            barSize={16}
                            isAnimationActive={false}
                        />
                        <Bar
                            dataKey="meta"
                            name="Meta"
                            fill={CHART_COLORS[4]}
                            radius={[0, 3, 3, 0]}
                            barSize={16}
                            isAnimationActive={false}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}
