"use client"

import {
    ResponsiveContainer,
    AreaChart as RechartsAreaChart,
    Area,
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
    semana: string
    sessoes: number
    pageviews: number
    conversoes: number
}

const DATA: DataPoint[] = [
    { semana: "Sem 1", sessoes: 4200,  pageviews: 12400, conversoes: 380 },
    { semana: "Sem 2", sessoes: 5100,  pageviews: 15200, conversoes: 420 },
    { semana: "Sem 3", sessoes: 4800,  pageviews: 14100, conversoes: 395 },
    { semana: "Sem 4", sessoes: 6200,  pageviews: 18600, conversoes: 510 },
    { semana: "Sem 5", sessoes: 5900,  pageviews: 17300, conversoes: 480 },
    { semana: "Sem 6", sessoes: 7100,  pageviews: 21500, conversoes: 620 },
    { semana: "Sem 7", sessoes: 6800,  pageviews: 20200, conversoes: 590 },
    { semana: "Sem 8", sessoes: 7900,  pageviews: 24100, conversoes: 710 },
]

const SERIES = [
    { key: "sessoes",    name: "Sessões",    colorIndex: 0 },
    { key: "pageviews",  name: "Pageviews",  colorIndex: 1 },
    { key: "conversoes", name: "Conversões", colorIndex: 4 },
]

// ─── Stable references (defined outside component) ────────────────────────────

const axisStyle = {
    tick: { fill: "var(--muted-foreground)", fontSize: 11 },
    axisLine: { stroke: "var(--border)" },
    tickLine: false as const,
}

const cursorStyle = { stroke: "var(--border)", strokeWidth: 1 }

const yAxisTickFormatter = (v: number) =>
    v >= 1000 ? `${(v / 1000).toFixed(0)}k` : String(v)

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
                        <span className="ml-auto pl-4 text-xs font-medium tabular-nums" style={{ color: "var(--foreground)" }}>
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

export function AreaChart() {
    return (
        <div className="w-full p-8">
            <div className="rounded-lg border border-border bg-card p-6">
                <div className="mb-6">
                    <h3 className="text-sm/6 font-semibold text-foreground">
                        Tráfego do Site
                    </h3>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                        Sessões, pageviews e conversões — últimas 8 semanas
                    </p>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                    <RechartsAreaChart data={DATA}>
                        <defs>
                            {SERIES.map((s) => (
                                <linearGradient
                                    key={s.key}
                                    id={`grad-area-${s.key}`}
                                    x1="0"
                                    y1="0"
                                    x2="0"
                                    y2="1"
                                >
                                    <stop
                                        offset="5%"
                                        stopColor={CHART_COLORS[s.colorIndex]}
                                        stopOpacity={0.2}
                                    />
                                    <stop
                                        offset="95%"
                                        stopColor={CHART_COLORS[s.colorIndex]}
                                        stopOpacity={0.02}
                                    />
                                </linearGradient>
                            ))}
                        </defs>
                        <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="var(--border)"
                            vertical={false}
                        />
                        <XAxis dataKey="semana" {...axisStyle} />
                        <YAxis {...axisStyle} tickFormatter={yAxisTickFormatter} />
                        <Tooltip
                            content={ChartTooltip}
                            cursor={cursorStyle}
                            isAnimationActive={false}
                        />
                        <Legend content={ChartLegend} />
                        {SERIES.map((s) => (
                            <Area
                                key={s.key}
                                type="monotone"
                                dataKey={s.key}
                                name={s.name}
                                stroke={CHART_COLORS[s.colorIndex]}
                                fill={`url(#grad-area-${s.key})`}
                                fillOpacity={1}
                                strokeWidth={2}
                                dot={false}
                                activeDot={{
                                    r: 4,
                                    fill: CHART_COLORS[s.colorIndex],
                                    stroke: "var(--card)",
                                    strokeWidth: 2,
                                }}
                                isAnimationActive={false}
                            />
                        ))}
                    </RechartsAreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}
