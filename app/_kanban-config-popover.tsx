"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import type { KanbanConfig, KanbanColumn, ItemConfig } from "@/app/_builder-state"

const CloseIcon = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
)
const PlusIcon = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
)
const TrashIcon = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" /></svg>
)

const COLOR_OPTIONS = [
    { value: "muted",       label: "Muted" },
    { value: "info",        label: "Info" },
    { value: "warning",     label: "Warning" },
    { value: "success",     label: "Success" },
    { value: "destructive", label: "Destructive" },
] as const

export function KanbanConfigPopover({
    config, onChange, onClose,
}: {
    config: KanbanConfig
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

    function updateColumn(index: number, partial: Partial<KanbanColumn>) {
        const columns = config.columns.map((col, i) =>
            i === index ? { ...col, ...partial } : col
        )
        onChange({ columns })
    }

    function addColumn() {
        const id = `col-${Date.now()}`
        onChange({ columns: [...config.columns, { id, title: "Nova lista", color: "muted" }] })
    }

    function removeColumn(index: number) {
        if (config.columns.length <= 1) return
        onChange({ columns: config.columns.filter((_, i) => i !== index) })
    }

    return (
        <div
            ref={popoverRef}
            className="absolute z-50 top-12 right-8 w-64 rounded-lg border border-border bg-card shadow-xl p-3 space-y-3 max-h-[70vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
        >
            <div className="flex items-center justify-between">
                <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">Configurar Kanban</span>
                <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors"><CloseIcon /></button>
            </div>

            <div className="space-y-3">
                {config.columns.map((col, i) => (
                    <div key={col.id} className="space-y-1.5 border-b border-border pb-3 last:border-0 last:pb-0">
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] font-medium text-muted-foreground">Coluna {i + 1}</span>
                            {config.columns.length > 1 && (
                                <button onClick={() => removeColumn(i)} className="text-muted-foreground hover:text-destructive transition-colors">
                                    <TrashIcon />
                                </button>
                            )}
                        </div>
                        <input
                            value={col.title}
                            onChange={e => updateColumn(i, { title: e.target.value })}
                            className="w-full h-7 rounded border border-border bg-background px-2 text-xs text-foreground outline-none focus:ring-1 focus:ring-primary"
                            placeholder="Título da coluna"
                        />
                        <div className="flex flex-wrap gap-1">
                            {COLOR_OPTIONS.map(opt => (
                                <button
                                    key={opt.value}
                                    onClick={() => updateColumn(i, { color: opt.value })}
                                    className={cn(
                                        "px-2 py-0.5 rounded text-[10px] transition-colors",
                                        col.color === opt.value
                                            ? "bg-primary/10 text-primary border border-primary font-medium"
                                            : "text-muted-foreground hover:text-foreground border border-border hover:bg-muted/50",
                                    )}
                                >
                                    {opt.label}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <button
                onClick={addColumn}
                className="w-full flex items-center justify-center gap-1.5 h-7 rounded border border-dashed border-border text-[10px] text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
            >
                <PlusIcon /> Adicionar coluna
            </button>
        </div>
    )
}
