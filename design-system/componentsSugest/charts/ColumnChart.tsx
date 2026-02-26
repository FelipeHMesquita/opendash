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
    month: string
    receita: number
    despesas: number
    lucro: number
}

const DATA: DataPoint[] = [
    { month: "Jan", receita: 42000, despesas: 28000, lucro: 14000 },
    { month: "Fev", receita: 51000, despesas: 31000, lucro: 20000 },
    { month: "Mar", receita: 47000, despesas: 29000, lucro: 18000 },
    { month: "Abr", receita: 63000, despesas: 35000, lucro: 28000 },
    { month: "Mai", receita: 58000, despesas: 33000, lucro: 25000 },
    { month: "Jun", receita: 72000, despesas: 38000, lucro: 34000 },
]

// ─── Axis style (stable reference — defined outside component) ─────────────────

const axisStyle = {
    tick: { fill: "var(--muted-foreground)", fontSize: 12 },
    axisLine: { stroke: "var(--border)" },
    tickLine: false as const,
}

// v2: fontSize 10 — menor e mais discreto que o default, eixos orientam sem competir com os dados
const axisStyleV2 = {
    tick: { fill: "var(--muted-foreground)", fontSize: 10, fontWeight: 500 },
    axisLine: { stroke: "var(--border)", strokeOpacity: 0.5 },
    tickLine: false as const,
}

const cursorStyle = { fill: "var(--border)", fillOpacity: 0.5 }

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
                            R${(entry.value / 1000).toFixed(0)}k
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

// ─── Tooltip v2 — label xs/muted, valor sm/foreground (hierarquia por função) ──

function ChartTooltipV2({ active, payload, label }: CustomTooltipProps) {
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
                            R${(entry.value / 1000).toFixed(0)}k
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}

// ─── Component ─────────────────────────────────────────────────────────────────

export function ColumnChart({ chartHeight = 300 }: { chartHeight?: number }) {
    return (
        <div className="w-full p-8">
            <div className="rounded-lg border border-border bg-card p-6">
                <div className="mb-6">
                    <h3 className="text-sm/6 font-semibold text-foreground">
                        Receita, Despesas e Lucro
                    </h3>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                        Comparativo mensal — 2024
                    </p>
                </div>
                <ResponsiveContainer width="100%" height={chartHeight}>
                    <BarChart data={DATA} barCategoryGap="20%" barGap={4}>
                        <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="var(--border)"
                            vertical={false}
                        />
                        <XAxis dataKey="month" {...axisStyle} />
                        <YAxis
                            {...axisStyle}
                            tickFormatter={(v) => `R$${(v / 1000).toFixed(0)}k`}
                        />
                        <Tooltip
                            content={ChartTooltip}
                            cursor={cursorStyle}
                            isAnimationActive={false}
                        />
                        <Legend content={ChartLegend} />
                        <Bar
                            dataKey="receita"
                            name="Receita"
                            fill={CHART_COLORS[0]}
                            radius={[3, 3, 0, 0]}
                            isAnimationActive={false}
                        />
                        <Bar
                            dataKey="despesas"
                            name="Despesas"
                            fill={CHART_COLORS[1]}
                            radius={[3, 3, 0, 0]}
                            isAnimationActive={false}
                        />
                        <Bar
                            dataKey="lucro"
                            name="Lucro"
                            fill={CHART_COLORS[2]}
                            radius={[3, 3, 0, 0]}
                            isAnimationActive={false}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

// ─── ColumnChartV2 — tipografia calibrada por função ──────────────────────────
// Diferenças em relação ao default:
//   · axisStyleV2: fontSize 12 (text-xs = caption, orientar sem competir)
//   · ChartTooltipV2: label xs/muted + valor sm/semibold (hierarquia clara no hover)

export function ColumnChartV2({ chartHeight = 300 }: { chartHeight?: number }) {
    return (
        <div className="w-full p-8">
            <div className="rounded-lg border border-border bg-card p-6">
                <div className="mb-6">
                    <h3 className="text-sm/6 font-semibold text-foreground">
                        Receita, Despesas e Lucro
                    </h3>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                        Comparativo mensal — 2024
                    </p>
                </div>
                <ResponsiveContainer width="100%" height={chartHeight}>
                    <BarChart data={DATA} barCategoryGap="20%" barGap={4}>
                        <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="var(--border)"
                            vertical={false}
                        />
                        <XAxis dataKey="month" {...axisStyleV2} />
                        <YAxis
                            {...axisStyleV2}
                            tickFormatter={(v) => `R$${(v / 1000).toFixed(0)}k`}
                        />
                        <Tooltip
                            content={ChartTooltipV2}
                            cursor={cursorStyle}
                            isAnimationActive={false}
                        />
                        <Legend content={ChartLegend} />
                        <Bar
                            dataKey="receita"
                            name="Receita"
                            fill={CHART_COLORS[0]}
                            radius={[3, 3, 0, 0]}
                            isAnimationActive={false}
                        />
                        <Bar
                            dataKey="despesas"
                            name="Despesas"
                            fill={CHART_COLORS[1]}
                            radius={[3, 3, 0, 0]}
                            isAnimationActive={false}
                        />
                        <Bar
                            dataKey="lucro"
                            name="Lucro"
                            fill={CHART_COLORS[2]}
                            radius={[3, 3, 0, 0]}
                            isAnimationActive={false}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}
