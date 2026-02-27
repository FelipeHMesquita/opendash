"use client"

import type { TooltipProps } from "recharts"

// ─── Colors ──────────────────────────────────────────────────────────────────

export const COLORS = [
    "var(--color-chart-1)",
    "var(--color-chart-2)",
    "var(--color-chart-3)",
    "var(--color-chart-4)",
    "var(--color-chart-5)",
]

// ─── Wrapper className (replicates ChartContainer global selectors) ──────────

export const CHART_WRAPPER_CN =
    "[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border flex justify-center text-xs [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-hidden [&_.recharts-sector]:outline-hidden [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-surface]:outline-hidden"

// ─── Axis defaults ───────────────────────────────────────────────────────────

export const AXIS_PROPS = {
    tickLine: false as const,
    axisLine: false as const,
    tickMargin: 8,
    tick: { fontSize: 12 },
}

// ─── Tooltip (same style as custom charts: AreaChart, ColumnChart, etc.) ─────

type LabelMap = Record<string, string>

interface SharedTooltipProps {
    hideLabel?: boolean
    labels?: LabelMap
}

export function ChartTooltip({
    active,
    payload,
    label,
    hideLabel,
    labels,
}: TooltipProps<number, string> & SharedTooltipProps) {
    if (!active || !payload?.length) return null

    return (
        <div
            className="rounded px-3 py-2 shadow-lg"
            style={{ background: "var(--accent)", border: "1px solid var(--border)" }}
        >
            {!hideLabel && label && (
                <p className="mb-1.5 text-xs font-medium" style={{ color: "var(--muted-foreground)" }}>{label}</p>
            )}
            <div className="flex flex-col gap-1">
                {payload
                    .filter((item) => item.type !== "none")
                    .map((item) => (
                        <div key={item.dataKey ?? item.name} className="flex items-center gap-2">
                            <span
                                className="h-2 w-2 shrink-0 rounded-full"
                                style={{ backgroundColor: item.color || (item.payload as Record<string, string>)?.fill }}
                            />
                            <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                                {labels?.[item.dataKey as string] ?? item.name}
                            </span>
                            {item.value != null && (
                                <span className="ml-auto pl-4 text-sm font-semibold tabular-nums" style={{ color: "var(--foreground)" }}>
                                    {item.value.toLocaleString("pt-BR")}
                                </span>
                            )}
                        </div>
                    ))}
            </div>
        </div>
    )
}

// ─── Legend (same style as custom charts) ─────────────────────────────────────

interface LegendPayload {
    value: string
    color: string
    dataKey?: string
    type?: string
}

interface SharedLegendProps {
    payload?: LegendPayload[]
    labels?: LabelMap
}

export function ChartLegend({ payload, labels }: SharedLegendProps) {
    if (!payload?.length) return null

    return (
        <div className="mt-3 flex flex-wrap items-center justify-center gap-4">
            {payload
                .filter((item) => item.type !== "none")
                .map((item) => (
                    <div key={item.value} className="flex items-center gap-1.5">
                        <span
                            className="h-2 w-2 shrink-0 rounded-full"
                            style={{ backgroundColor: item.color }}
                        />
                        <span className="text-xs text-muted-foreground">
                            {labels?.[item.dataKey ?? item.value] ?? item.value}
                        </span>
                    </div>
                ))}
        </div>
    )
}
