"use client"

import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
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
    name: string
    value: number
}

const DATA: DataPoint[] = [
    { name: "Produto A", value: 4200 },
    { name: "Produto B", value: 3100 },
    { name: "Produto C", value: 2400 },
    { name: "Produto D", value: 1800 },
    { name: "Outros",    value: 900  },
]

const TOTAL = DATA.reduce((s, d) => s + d.value, 0)

// ─── Tooltip (memoized — only re-renders when active/payload change) ───────────

type TooltipPayloadItem = {
    name: string
    value: number
    color: string
}

type CustomTooltipProps = {
    active?: boolean
    payload?: TooltipPayloadItem[]
}

function PieTooltip({ active, payload }: CustomTooltipProps) {
    if (!active || !payload?.length) return null
    const entry = payload[0]
    const pct = ((entry.value / TOTAL) * 100).toFixed(1)
    return (
        <div
            className="rounded px-3 py-2 shadow-lg"
            style={{ background: "var(--accent)", border: "1px solid var(--border)" }}
        >
            <div className="flex items-center gap-2">
                <span
                    className="h-2 w-2 shrink-0 rounded-full"
                    style={{ backgroundColor: entry.color }}
                />
                <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>{entry.name}</span>
                <span className="ml-auto pl-4 text-sm font-semibold tabular-nums" style={{ color: "var(--foreground)" }}>
                    {entry.value.toLocaleString("pt-BR")}{" "}
                    <span className="text-xs font-normal" style={{ color: "var(--muted-foreground)" }}>({pct}%)</span>
                </span>
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

export function DonutChart({ chartHeight = 300 }: { chartHeight?: number }) {
    return (
        <div className="w-full p-8">
            <div className="rounded-lg border border-border bg-card p-6">
                <div className="mb-6">
                    <h3 className="text-sm/6 font-semibold text-foreground">
                        Receita por Produto
                    </h3>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                        Distribuição — Nov 2024
                    </p>
                </div>
                <ResponsiveContainer width="100%" height={chartHeight}>
                    <PieChart>
                        <text
                            x="50%"
                            y="44%"
                            textAnchor="middle"
                            dominantBaseline="middle"
                            style={{
                                fontSize: 24,
                                fontWeight: 600,
                                fill: "var(--foreground)",
                            }}
                        >
                            {TOTAL.toLocaleString("pt-BR")}
                        </text>
                        <text
                            x="50%"
                            y="56%"
                            textAnchor="middle"
                            dominantBaseline="middle"
                            style={{
                                fontSize: 12,
                                fill: "var(--muted-foreground)",
                            }}
                        >
                            Total
                        </text>
                        <Pie
                            data={DATA}
                            cx="50%"
                            cy="50%"
                            innerRadius={70}
                            outerRadius={110}
                            paddingAngle={2}
                            dataKey="value"
                            isAnimationActive={false}
                        >
                            {DATA.map((_, i) => (
                                <Cell
                                    key={i}
                                    fill={CHART_COLORS[i % CHART_COLORS.length]}
                                />
                            ))}
                        </Pie>
                        <Tooltip
                            content={PieTooltip}
                            isAnimationActive={false}
                        />
                        <Legend content={ChartLegend} />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}
