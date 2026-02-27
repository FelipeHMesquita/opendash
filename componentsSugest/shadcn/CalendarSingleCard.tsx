"use client"

import * as React from "react"
import { Calendar } from "@/components/ui/calendar"

export function CalendarSingleCard() {
    const [date, setDate] = React.useState<Date | undefined>(new Date())

    return (
        <div className="w-full p-8">
            <div className="rounded-lg border border-border bg-card p-6 space-y-3">
                <h3 className="text-sm font-medium text-foreground">Calendário — Data única</h3>
                <div className="rounded-lg border border-border bg-card p-4 inline-block">
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
        </div>
    )
}
