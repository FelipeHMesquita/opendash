"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import type { StatCardConfig, ItemConfig } from "@/app/_builder-state"

const CloseIcon = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
)

export function StatCardConfigPopover({
    config, onChange, onClose,
}: {
    config: StatCardConfig
    onChange: (partial: Partial<ItemConfig>) => void
    onClose: () => void
}) {
    const popoverRef = React.useRef<HTMLDivElement>(null)

    React.useEffect(() => {
        function handleClick(e: MouseEvent) {
            if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) onClose()
        }
        document.addEventListener("mousedown", handleClick)
        return () => document.removeEventListener("mousedown", handleClick)
    }, [onClose])

    return (
        <div
            ref={popoverRef}
            className="absolute z-50 top-12 right-8 w-56 rounded-lg border border-border bg-card shadow-xl p-3 space-y-3"
            onClick={e => e.stopPropagation()}
        >
            <div className="flex items-center justify-between">
                <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">Configurar Stat Card</span>
                <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors"><CloseIcon /></button>
            </div>

            <div>
                <label className="text-[10px] font-medium text-muted-foreground mb-1 block">Título</label>
                <input value={config.title} onChange={e => onChange({ title: e.target.value })}
                    className="w-full h-7 rounded border border-border bg-background px-2 text-xs text-foreground outline-none focus:ring-1 focus:ring-primary" />
            </div>

            <div>
                <label className="text-[10px] font-medium text-muted-foreground mb-1 block">Valor</label>
                <input value={config.value} onChange={e => onChange({ value: e.target.value })}
                    className="w-full h-7 rounded border border-border bg-background px-2 text-xs text-foreground outline-none focus:ring-1 focus:ring-primary" />
            </div>

            <div>
                <label className="text-[10px] font-medium text-muted-foreground mb-1 block">Variação</label>
                <input value={config.change} onChange={e => onChange({ change: e.target.value })}
                    className="w-full h-7 rounded border border-border bg-background px-2 text-xs text-foreground outline-none focus:ring-1 focus:ring-primary" />
            </div>

            <div>
                <label className="text-[10px] font-medium text-muted-foreground mb-1 block">Descrição</label>
                <input value={config.description} onChange={e => onChange({ description: e.target.value })}
                    className="w-full h-7 rounded border border-border bg-background px-2 text-xs text-foreground outline-none focus:ring-1 focus:ring-primary" />
            </div>

            {/* Positive/negative toggle */}
            <div className="flex items-center justify-between">
                <label className="text-[10px] font-medium text-muted-foreground">Positivo</label>
                <button
                    onClick={() => onChange({ positive: !config.positive })}
                    className={cn(
                        "relative w-7 h-4 rounded-full transition-colors",
                        config.positive ? "bg-success" : "bg-destructive",
                    )}
                >
                    <span className={cn(
                        "absolute top-0.5 w-3 h-3 rounded-full bg-white shadow transition-transform",
                        config.positive ? "translate-x-3.5" : "translate-x-0.5",
                    )} />
                </button>
            </div>
        </div>
    )
}
