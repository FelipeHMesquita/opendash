"use client"

import * as React from "react"
import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Label,
} from "recharts"
import { COLORS, CHART_WRAPPER_CN, ChartTooltip } from "./_recharts-shared"

// ─── Data ────────────────────────────────────────────────────────────────────

const DATA_PIE = [
    { browser: "Chrome", visitors: 275, fill: COLORS[0] },
    { browser: "Safari", visitors: 200, fill: COLORS[1] },
    { browser: "Firefox", visitors: 187, fill: COLORS[2] },
    { browser: "Edge", visitors: 173, fill: COLORS[3] },
    { browser: "Outros", visitors: 90, fill: COLORS[4] },
]

// ─── Shared legend ───────────────────────────────────────────────────────────

function PieLegend({ data }: { data: typeof DATA_PIE }) {
    return (
        <div className="flex items-center justify-center gap-4 pt-3">
            {data.map((item) => (
                <div key={item.browser} className="flex items-center gap-1.5">
                    <div className="h-2 w-2 shrink-0 rounded-[2px]" style={{ backgroundColor: item.fill }} />
                    <span className="text-xs">{item.browser}</span>
                </div>
            ))}
        </div>
    )
}

// ─── Pie ─────────────────────────────────────────────────────────────────────

export function PieSimple() {
    return (
        <div className="w-full p-8">
            <div className="rounded-lg border border-border bg-card p-6 space-y-2">
                <h3 className="text-sm font-semibold text-foreground">Pie</h3>
                <p className="text-xs text-muted-foreground mb-4">Distribuição por navegador</p>
                <div className={`${CHART_WRAPPER_CN} mx-auto aspect-square h-[250px]`}>
                    <ResponsiveContainer>
                        <PieChart>
                            <Tooltip content={<ChartTooltip hideLabel />} />
                            <Pie data={DATA_PIE} dataKey="visitors" nameKey="browser">
                                {DATA_PIE.map((entry) => (
                                    <Cell key={entry.browser} fill={entry.fill} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <PieLegend data={DATA_PIE} />
            </div>
        </div>
    )
}

// ─── Donut with label ────────────────────────────────────────────────────────

export function PieDonut() {
    const totalVisitors = React.useMemo(
        () => DATA_PIE.reduce((acc, curr) => acc + curr.visitors, 0),
        []
    )

    return (
        <div className="w-full p-8">
            <div className="rounded-lg border border-border bg-card p-6 space-y-2">
                <h3 className="text-sm font-semibold text-foreground">Donut com Label</h3>
                <p className="text-xs text-muted-foreground mb-4">Total no centro</p>
                <div className={`${CHART_WRAPPER_CN} mx-auto aspect-square h-[250px]`}>
                    <ResponsiveContainer>
                        <PieChart>
                            <Tooltip content={<ChartTooltip hideLabel />} />
                            <Pie data={DATA_PIE} dataKey="visitors" nameKey="browser" innerRadius={60} strokeWidth={5}>
                                {DATA_PIE.map((entry) => (
                                    <Cell key={entry.browser} fill={entry.fill} />
                                ))}
                                <Label
                                    content={({ viewBox }) => {
                                        if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                            return (
                                                <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                                                    <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-3xl font-semibold">
                                                        {totalVisitors.toLocaleString()}
                                                    </tspan>
                                                    <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground text-sm">
                                                        Visitantes
                                                    </tspan>
                                                </text>
                                            )
                                        }
                                    }}
                                />
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <PieLegend data={DATA_PIE} />
            </div>
        </div>
    )
}

// ─── Separated ───────────────────────────────────────────────────────────────

export function PieSeparated() {
    return (
        <div className="w-full p-8">
            <div className="rounded-lg border border-border bg-card p-6 space-y-2">
                <h3 className="text-sm font-semibold text-foreground">Pie Separado</h3>
                <p className="text-xs text-muted-foreground mb-4">Fatias com espaçamento</p>
                <div className={`${CHART_WRAPPER_CN} mx-auto aspect-square h-[250px]`}>
                    <ResponsiveContainer>
                        <PieChart>
                            <Tooltip content={<ChartTooltip hideLabel />} />
                            <Pie data={DATA_PIE} dataKey="visitors" nameKey="browser" paddingAngle={4} innerRadius={40}>
                                {DATA_PIE.map((entry) => (
                                    <Cell key={entry.browser} fill={entry.fill} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <PieLegend data={DATA_PIE} />
            </div>
        </div>
    )
}
