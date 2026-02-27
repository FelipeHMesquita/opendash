"use client"

import * as React from "react"

// ─── Data ──────────────────────────────────────────────────────────────────────

type FunnelStage = { name: string; value: number }

const DATA: FunnelStage[] = [
    { name: "Visitantes", value: 10000 },
    { name: "Leads", value: 6200 },
    { name: "Qualificados", value: 3400 },
    { name: "Propostas", value: 1800 },
    { name: "Fechamentos", value: 820 },
]

const DATA_MARKETING: FunnelStage[] = [
    { name: "Impressões", value: 48000 },
    { name: "Cliques", value: 12400 },
    { name: "Cadastros", value: 3600 },
    { name: "Compras", value: 920 },
]

// ─── Helpers ───────────────────────────────────────────────────────────────────

function fmtK(v: number): string {
    if (v >= 1000) {
        const k = v / 1000
        return k % 1 === 0 ? `${k}k` : `${k.toFixed(1).replace(/\.0$/, "")}k`
    }
    return String(v)
}

// ─── Funnel SVG (reusable) ─────────────────────────────────────────────────────

function FunnelSVG({ data, chartHeight = 260 }: { data: FunnelStage[]; chartHeight?: number }) {
    const containerRef = React.useRef<HTMLDivElement>(null)
    const [width, setWidth] = React.useState(500)

    React.useEffect(() => {
        const el = containerRef.current
        if (!el) return
        const ro = new ResizeObserver((entries) => {
            setWidth(entries[0].contentRect.width)
        })
        ro.observe(el)
        return () => ro.disconnect()
    }, [])

    const maxValue = data[0].value
    const finalConv = ((data[data.length - 1].value / maxValue) * 100).toFixed(1)

    const PAD = { top: 36, right: 56, bottom: 36, left: 8 }
    const chartH = Math.max(100, chartHeight - PAD.top - PAD.bottom)
    const totalH = PAD.top + chartH + PAD.bottom
    const chartW = width - PAD.left - PAD.right
    const N = data.length
    const slotW = chartW / N
    const barW = slotW * 0.55
    const bottomY = PAD.top + chartH

    const bars = data.map((stage, i) => {
        const barHeight = (stage.value / maxValue) * chartH
        const barX = PAD.left + i * slotW + (slotW - barW) / 2
        const barY = bottomY - barHeight
        return { barX, barY, barHeight, stage }
    })

    const yTicks = [0, 0.25, 0.5, 0.75, 1].map((pct) => ({
        value: Math.round(maxValue * pct),
        y: bottomY - pct * chartH,
    }))

    return (
        <div>
            <div className="mb-4 flex items-start justify-between">
                <div>
                    <p className="text-xs text-muted-foreground">
                        {data[0].name} → {data[data.length - 1].name}
                    </p>
                </div>
                <div className="text-right">
                    <p className="text-lg font-semibold text-foreground">{finalConv}%</p>
                    <p className="text-xs text-muted-foreground">conversão total</p>
                </div>
            </div>

            <div ref={containerRef} className="w-full">
                <svg width={width} height={totalH} style={{ overflow: "visible" }}>
                    {/* Grid lines */}
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

                    {/* Connectors (trapezoids) */}
                    {bars.slice(0, -1).map((b, i) => {
                        const next = bars[i + 1]
                        const points = [
                            `${b.barX + barW},${b.barY}`,
                            `${next.barX},${next.barY}`,
                            `${next.barX},${bottomY}`,
                            `${b.barX + barW},${bottomY}`,
                        ].join(" ")
                        const dropPct = (((b.stage.value - next.stage.value) / b.stage.value) * 100).toFixed(0)
                        const labelX = (b.barX + barW + next.barX) / 2
                        const labelY = b.barY + (next.barY - b.barY) / 2 + 12

                        return (
                            <g key={i}>
                                <polygon points={points} fill="var(--color-chart-1)" opacity={0.18} />
                                <text x={labelX} y={labelY} textAnchor="middle" fontSize={12} fill="var(--muted-foreground)">
                                    ↓ {dropPct}%
                                </text>
                            </g>
                        )
                    })}

                    {/* Bars */}
                    {bars.map(({ barX, barY, barHeight, stage }) => (
                        <rect key={stage.name} x={barX} y={barY} width={barW} height={barHeight} rx={3} fill="var(--color-chart-1)" />
                    ))}

                    {/* Value labels */}
                    {bars.map(({ barX, barY, stage }) => (
                        <text key={stage.name} x={barX + barW / 2} y={barY - 8} textAnchor="middle" fontSize={12} fontWeight={600} fill="var(--foreground)">
                            {fmtK(stage.value)}
                        </text>
                    ))}

                    {/* X-axis labels */}
                    {bars.map(({ barX, stage }) => (
                        <text key={stage.name} x={barX + barW / 2} y={bottomY + 18} textAnchor="middle" fontSize={12} fill="var(--muted-foreground)">
                            {stage.name}
                        </text>
                    ))}

                    {/* Y-axis ticks (right) */}
                    {yTicks.map((tick) => (
                        <text key={tick.value} x={width - PAD.right + 8} y={tick.y + 4} fontSize={12} fill="var(--muted-foreground)">
                            {fmtK(tick.value)}
                        </text>
                    ))}
                </svg>
            </div>
        </div>
    )
}

// ─── Sales Funnel ────────────────────────────────────────────────────────────

export function FunnelSales({ chartHeight }: { chartHeight?: number }) {
    return (
        <div className="w-full p-8">
            <div className="rounded-lg border border-border bg-card p-6 space-y-2">
                <h3 className="text-sm font-semibold text-foreground">Funil de vendas</h3>
                <FunnelSVG data={DATA} chartHeight={chartHeight} />
            </div>
        </div>
    )
}

// ─── Marketing Funnel ────────────────────────────────────────────────────────

export function FunnelMarketing({ chartHeight }: { chartHeight?: number }) {
    return (
        <div className="w-full p-8">
            <div className="rounded-lg border border-border bg-card p-6 space-y-2">
                <h3 className="text-sm font-semibold text-foreground">Funil de marketing</h3>
                <FunnelSVG data={DATA_MARKETING} chartHeight={chartHeight} />
            </div>
        </div>
    )
}
