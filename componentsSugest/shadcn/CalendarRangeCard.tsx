"use client"

import * as React from "react"
import { Calendar } from "@/components/ui/calendar"

export function CalendarRangeCard() {
    const [range, setRange] = React.useState<{ from: Date; to?: Date } | undefined>({
        from: new Date(2026, 1, 10),
        to: new Date(2026, 1, 20),
    })

    return (
        <div className="w-full p-8">
            <div className="rounded-lg border border-border bg-card p-6 space-y-3">
                <h3 className="text-sm font-medium text-foreground">Calendário — Intervalo</h3>
                <div className="rounded-lg border border-border bg-card p-4 inline-block">
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
    )
}
