"use client"

import * as React from "react"
import { Calendar } from "@/components/ui/calendar"

// ─── Calendar Demo ──────────────────────────────────────────────────────────

export function CalendarDemo() {
    const [date, setDate] = React.useState<Date | undefined>(new Date())
    const [range, setRange] = React.useState<{ from: Date; to?: Date } | undefined>({
        from: new Date(2026, 1, 10),
        to: new Date(2026, 1, 20),
    })

    return (
        <div className="w-full p-8">
            <div className="mb-6">
                <h2 className="text-lg font-semibold text-foreground">Calendar</h2>
                <p className="text-sm text-muted-foreground">Seleção de datas com visualização mensal</p>
            </div>

            <div className="flex flex-wrap gap-8">
                {/* Single date */}
                <div className="space-y-3">
                    <p className="text-sm font-medium text-foreground">Data única</p>
                    <div className="rounded-lg border border-border bg-card p-4">
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            className="rounded-md"
                        />
                    </div>
                    {date && (
                        <p className="text-xs text-muted-foreground">
                            Selecionado: {date.toLocaleDateString("pt-BR")}
                        </p>
                    )}
                </div>

                {/* Date range */}
                <div className="space-y-3">
                    <p className="text-sm font-medium text-foreground">Intervalo de datas</p>
                    <div className="rounded-lg border border-border bg-card p-4">
                        <Calendar
                            mode="range"
                            selected={range}
                            onSelect={(r) => setRange(r as { from: Date; to?: Date } | undefined)}
                            numberOfMonths={2}
                            className="rounded-md"
                        />
                    </div>
                    {range?.from && (
                        <p className="text-xs text-muted-foreground">
                            {range.from.toLocaleDateString("pt-BR")}
                            {range.to ? ` — ${range.to.toLocaleDateString("pt-BR")}` : " — selecione a data final"}
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}
