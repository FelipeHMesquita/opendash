"use client"

import {
    ResponsiveContainer,
    LineChart as RechartsLineChart,
    Line,
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
    date: string
    sneakers: number
    airmax: number
    running: number
    classics: number
}

const DATA: DataPoint[] = [
    { date: "Seg 16",  sneakers: 1100, airmax: 900, running: 500, classics: 290 },
    { date: "Ter 17",  sneakers: 1050, airmax: 870, running: 480, classics: 310 },
    { date: "Qua 18",  sneakers: 1180, airmax: 920, running: 540, classics: 270 },
    { date: "Qui 19",  sneakers: 1210, airmax: 960, running: 560, classics: 300 },
    { date: "Sex 20",  sneakers: 1160, airmax: 930, running: 510, classics: 320 },
    { date: "Sáb 21",  sneakers: 1090, airmax: 890, running: 490, classics: 280 },
    { date: "Dom 22",  sneakers: 80,   airmax: 60,  running: 30,  classics: 20  },
]

const SERIES = [
    { key: "sneakers", name: "Sneakers Collection", colorIndex: 0 },
    { key: "airmax",   name: "Nike Air Max 2021",   colorIndex: 1 },
    { key: "running",  name: "Running Shoes",        colorIndex: 2 },
    { key: "classics", name: "Classics",             colorIndex: 3 },
]

// ─── Stable references ─────────────────────────────────────────────────────────

const axisStyle = {
    tick: { fill: "var(--muted-foreground)", fontSize: 12 },
    axisLine: { stroke: "var(--border)" },
    tickLine: false as const,
}

const cursorStyle = { stroke: "var(--border)", strokeWidth: 1 }

const yAxisTickFormatter = (v: number) =>
    v >= 1000 ? `${(v / 1000).toFixed(1)}k` : String(v)

// ─── Tooltip ──────────────────────────────────────────────────────────────────

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

function ChartTooltip({ active, payload, label }: CustomTooltipProps) {
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
                            {entry.value.toLocaleString("pt-BR")}
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

export function LineChart() {
    return (
        <div className="w-full p-8">
            <div className="rounded-lg border border-border bg-card p-6">
                <div className="mb-6">
                    <h3 className="text-sm/6 font-semibold text-foreground">
                        Melhores Posts do Blog
                    </h3>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                        Visualizações diárias — últimos 7 dias
                    </p>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                    <RechartsLineChart data={DATA}>
                        <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="var(--border)"
                            vertical={false}
                        />
                        <XAxis dataKey="date" {...axisStyle} />
                        <YAxis {...axisStyle} tickFormatter={yAxisTickFormatter} />
                        <Tooltip
                            content={ChartTooltip}
                            cursor={cursorStyle}
                            isAnimationActive={false}
                        />
                        <Legend content={ChartLegend} />
                        {SERIES.map((s) => (
                            <Line
                                key={s.key}
                                type="monotone"
                                dataKey={s.key}
                                name={s.name}
                                stroke={CHART_COLORS[s.colorIndex]}
                                strokeWidth={2}
                                dot={{ r: 3, fill: CHART_COLORS[s.colorIndex], strokeWidth: 0 }}
                                activeDot={{
                                    r: 5,
                                    fill: CHART_COLORS[s.colorIndex],
                                    stroke: "var(--card)",
                                    strokeWidth: 2,
                                }}
                                isAnimationActive={false}
                            />
                        ))}
                    </RechartsLineChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}
