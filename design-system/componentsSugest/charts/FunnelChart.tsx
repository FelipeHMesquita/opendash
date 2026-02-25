"use client"

import * as React from "react"

// ─── Data ──────────────────────────────────────────────────────────────────────

type FunnelStage = {
    name: string
    value: number
}

const DATA: FunnelStage[] = [
    { name: "Visitantes",    value: 10000 },
    { name: "Leads",         value:  6200 },
    { name: "Qualificados",  value:  3400 },
    { name: "Propostas",     value:  1800 },
    { name: "Fechamentos",   value:   820 },
]

// ─── Helpers ───────────────────────────────────────────────────────────────────

function fmtK(v: number): string {
    if (v >= 1000) {
        const k = v / 1000
        return k % 1 === 0 ? `${k}k` : `${k.toFixed(1).replace(/\.0$/, "")}k`
    }
    return String(v)
}

// ─── Component ─────────────────────────────────────────────────────────────────

export function FunnelChart({ chartHeight = 300 }: { chartHeight?: number }) {
    const containerRef = React.useRef<HTMLDivElement>(null)
    const [width, setWidth] = React.useState(600)

    React.useEffect(() => {
        const el = containerRef.current
        if (!el) return
        const ro = new ResizeObserver((entries) => {
            setWidth(entries[0].contentRect.width)
        })
        ro.observe(el)
        return () => ro.disconnect()
    }, [])

    const maxValue = DATA[0].value
    const finalConv = ((DATA[DATA.length - 1].value / maxValue) * 100).toFixed(1)

    // Layout constants
    const PAD    = { top: 40, right: 56, bottom: 40, left: 8 }
    const chartH = Math.max(100, chartHeight - PAD.top - PAD.bottom)
    const totalH = PAD.top + chartH + PAD.bottom
    const chartW = width - PAD.left - PAD.right
    const N      = DATA.length
    const slotW  = chartW / N
    const barW   = slotW * 0.55
    const bottomY = PAD.top + chartH

    // Precompute bar geometry
    const bars = DATA.map((stage, i) => {
        const barHeight = (stage.value / maxValue) * chartH
        const barX      = PAD.left + i * slotW + (slotW - barW) / 2
        const barY      = bottomY - barHeight
        return { barX, barY, barHeight, stage }
    })

    // Y-axis ticks (0, 25%, 50%, 75%, 100% of maxValue)
    const yTicks = [0, 0.25, 0.5, 0.75, 1].map((pct) => ({
        value: Math.round(maxValue * pct),
        y: bottomY - pct * chartH,
    }))

    return (
        <div className="w-full p-8">
            <div className="rounded-lg border border-border bg-card p-6">

                {/* Header */}
                <div className="mb-6 flex items-start justify-between">
                    <div>
                        <h3 className="text-sm/6 font-semibold text-foreground">
                            Funil de Conversão
                        </h3>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                            Visitantes → Fechamentos — Nov 2024
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-lg font-semibold text-foreground">{finalConv}%</p>
                        <p className="text-xs text-muted-foreground">conversão total</p>
                    </div>
                </div>

                {/* Chart */}
                <div ref={containerRef} className="w-full">
                    <svg
                        width={width}
                        height={totalH}
                        style={{ overflow: "visible" }}
                    >
                        {/* Dashed grid lines */}
                        {yTicks.map((tick) => (
                            <line
                                key={tick.value}
                                x1={PAD.left}
                                x2={width - PAD.right}
                                y1={tick.y}
                                y2={tick.y}
                                stroke="var(--border)"
                                strokeWidth={1}
                                strokeDasharray="4 4"
                            />
                        ))}

                        {/* Connectors (trapezoids between bars) */}
                        {bars.slice(0, -1).map((b, i) => {
                            const next = bars[i + 1]
                            const points = [
                                `${b.barX + barW},${b.barY}`,
                                `${next.barX},${next.barY}`,
                                `${next.barX},${bottomY}`,
                                `${b.barX + barW},${bottomY}`,
                            ].join(" ")

                            // Break percentage
                            const dropPct = (((b.stage.value - next.stage.value) / b.stage.value) * 100).toFixed(0)
                            const labelX = (b.barX + barW + next.barX) / 2
                            const labelY = b.barY + (next.barY - b.barY) / 2 + 12

                            return (
                                <g key={i}>
                                    <polygon
                                        points={points}
                                        fill="var(--color-chart-1)"
                                        opacity={0.18}
                                    />
                                    {/* Break % label */}
                                    <text
                                        x={labelX}
                                        y={labelY}
                                        textAnchor="middle"
                                        fontSize={12}
                                        fill="var(--muted-foreground)"
                                    >
                                        ↓ {dropPct}%
                                    </text>
                                </g>
                            )
                        })}

                        {/* Bars */}
                        {bars.map(({ barX, barY, barHeight, stage }) => (
                            <rect
                                key={stage.name}
                                x={barX}
                                y={barY}
                                width={barW}
                                height={barHeight}
                                rx={3}
                                fill="var(--color-chart-1)"
                            />
                        ))}

                        {/* Value labels on top of bars */}
                        {bars.map(({ barX, barY, stage }) => (
                            <text
                                key={stage.name}
                                x={barX + barW / 2}
                                y={barY - 8}
                                textAnchor="middle"
                                fontSize={12}
                                fontWeight={600}
                                fill="var(--foreground)"
                            >
                                {fmtK(stage.value)}
                            </text>
                        ))}

                        {/* X-axis labels */}
                        {bars.map(({ barX, stage }) => (
                            <text
                                key={stage.name}
                                x={barX + barW / 2}
                                y={bottomY + 18}
                                textAnchor="middle"
                                fontSize={12}
                                fill="var(--muted-foreground)"
                            >
                                {stage.name}
                            </text>
                        ))}

                        {/* Y-axis ticks (right side) */}
                        {yTicks.map((tick) => (
                            <text
                                key={tick.value}
                                x={width - PAD.right + 8}
                                y={tick.y + 4}
                                fontSize={12}
                                fill="var(--muted-foreground)"
                            >
                                {fmtK(tick.value)}
                            </text>
                        ))}
                    </svg>
                </div>
            </div>
        </div>
    )
}
