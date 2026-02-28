"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import type { ButtonConfig, ItemConfig, Page } from "@/app/_builder-state"

const CloseIcon = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
)

const VARIANT_OPTIONS = [
    { value: "default",     label: "Default" },
    { value: "destructive", label: "Destructive" },
    { value: "outline",     label: "Outline" },
    { value: "secondary",   label: "Secondary" },
    { value: "ghost",       label: "Ghost" },
] as const

const SIZE_OPTIONS = [
    { value: "sm",      label: "SM" },
    { value: "default", label: "MD" },
    { value: "lg",      label: "LG" },
] as const

export function ButtonConfigPopover({
    config, onChange, onClose, pages,
}: {
    config: ButtonConfig
    onChange: (partial: Partial<ItemConfig>) => void
    onClose: () => void
    pages: Page[]
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
                <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">Configurar Botão</span>
                <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors"><CloseIcon /></button>
            </div>

            {/* Label */}
            <div>
                <label className="text-[10px] font-medium text-muted-foreground mb-1 block">Texto</label>
                <input
                    value={config.label}
                    onChange={e => onChange({ label: e.target.value })}
                    className="w-full h-7 rounded border border-border bg-background px-2 text-xs text-foreground outline-none focus:ring-1 focus:ring-primary"
                />
            </div>

            {/* Variant */}
            <div>
                <label className="text-[10px] font-medium text-muted-foreground mb-1 block">Variante</label>
                <div className="flex flex-wrap gap-1">
                    {VARIANT_OPTIONS.map(opt => (
                        <button
                            key={opt.value}
                            onClick={() => onChange({ variant: opt.value })}
                            className={cn(
                                "px-2 py-0.5 rounded text-[10px] transition-colors",
                                config.variant === opt.value
                                    ? "bg-primary/10 text-primary border border-primary font-medium"
                                    : "text-muted-foreground hover:text-foreground border border-border hover:bg-muted/50",
                            )}
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Size */}
            <div>
                <label className="text-[10px] font-medium text-muted-foreground mb-1 block">Tamanho</label>
                <div className="flex gap-1">
                    {SIZE_OPTIONS.map(opt => (
                        <button
                            key={opt.value}
                            onClick={() => onChange({ size: opt.value })}
                            className={cn(
                                "px-2 py-0.5 rounded text-[10px] transition-colors",
                                config.size === opt.value
                                    ? "bg-primary/10 text-primary border border-primary font-medium"
                                    : "text-muted-foreground hover:text-foreground border border-border hover:bg-muted/50",
                            )}
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Link to page */}
            <div>
                <label className="text-[10px] font-medium text-muted-foreground mb-1 block">Link → Página</label>
                <select
                    value={config.linkPageId ?? ""}
                    onChange={e => onChange({ linkPageId: e.target.value || null })}
                    className="w-full h-7 rounded border border-border bg-background px-2 text-xs text-foreground outline-none focus:ring-1 focus:ring-primary"
                >
                    <option value="">Nenhuma</option>
                    {pages.map(p => <option key={p.id} value={p.id}>{p.label}</option>)}
                </select>
            </div>
        </div>
    )
}
