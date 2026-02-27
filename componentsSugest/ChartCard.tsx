"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

// ─── Data ────────────────────────────────────────────────────────────────────

const weeklyData = [
    { label: "Seg", value: 65 }, { label: "Ter", value: 78 },
    { label: "Qua", value: 52 }, { label: "Qui", value: 89 },
    { label: "Sex", value: 94 }, { label: "Sáb", value: 43 },
    { label: "Dom", value: 38 },
]

const monthlyData = [
    { label: "Jan", value: 42 }, { label: "Fev", value: 58 },
    { label: "Mar", value: 71 }, { label: "Abr", value: 63 },
    { label: "Mai", value: 85 }, { label: "Jun", value: 79 },
    { label: "Jul", value: 92 }, { label: "Ago", value: 88 },
    { label: "Set", value: 95 }, { label: "Out", value: 78 },
    { label: "Nov", value: 82 }, { label: "Dez", value: 97 },
]

type Period = "week" | "month"

// ─── Component ───────────────────────────────────────────────────────────────

export function ChartCard() {
    const [period, setPeriod] = React.useState<Period>("month")
    const data = period === "week" ? weeklyData : monthlyData
    const max = Math.max(...data.map(d => d.value))
    const avg = Math.round(data.reduce((s, d) => s + d.value, 0) / data.length)

    return (
        <div className="w-full p-8">
            <div className="rounded-lg border border-border bg-card p-6">

                {/* Header */}
                <div className="mb-6 flex items-start justify-between">
                    <div>
                        <h3 className="text-sm/6 font-semibold text-foreground">Visitas por período</h3>
                        <p className="mt-0.5 text-xs text-muted-foreground">Comparativo de tráfego</p>
                    </div>
                    <div className="flex items-center gap-0.5 rounded-md border border-border p-0.5">
                        {(["week", "month"] as Period[]).map(p => (
                            <Button
                                key={p}
                                variant="ghost"
                                onClick={() => setPeriod(p)}
                                className={cn(
                                    "h-auto px-3 py-1 text-xs font-medium",
                                    period === p
                                        ? "bg-accent text-foreground hover:bg-accent"
                                        : "text-muted-foreground"
                                )}
                            >
                                {p === "week" ? "Semana" : "Mês"}
                            </Button>
                        ))}
                    </div>
                </div>

                {/* Bar chart */}
                <div className="flex h-40 items-end gap-1.5">
                    {data.map((d, i) => (
                        <div key={i} className="group flex flex-1 flex-col items-center gap-1.5">
                            <div
                                className="relative w-full rounded-sm bg-primary/20 transition-colors hover:bg-primary/40"
                                style={{ height: `${(d.value / max) * 100}%` }}
                            >
                                {/* Top accent */}
                                <div className="absolute left-0 right-0 top-0 h-1 rounded-t-sm bg-primary opacity-80" />
                                {/* Tooltip */}
                                <div className="absolute -top-8 left-1/2 hidden -translate-x-1/2 items-center justify-center whitespace-nowrap rounded border border-border bg-card px-2 py-1 text-xs font-medium text-foreground shadow-lg group-hover:flex z-10">
                                    {d.value}%
                                </div>
                            </div>
                            <span className="text-xs text-muted-foreground">{d.label}</span>
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                    <p className="text-2xl/8 font-semibold text-foreground">
                        {avg}%
                        <span className="ml-2 text-sm font-normal text-muted-foreground">média</span>
                    </p>
                    <span className="text-xs text-success">+12.4% vs período anterior</span>
                </div>

            </div>
        </div>
    )
}
