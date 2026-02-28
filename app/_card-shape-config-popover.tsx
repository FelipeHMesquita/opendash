"use client"

import * as React from "react"
import type { CardShapeConfig, ItemConfig } from "@/app/_builder-state"
import { IconPicker } from "@/app/_shape-config-popover"

// ─── Inline SVG icons ────────────────────────────────────────────────────────

const CloseIcon = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
)

// ─── Main popover ────────────────────────────────────────────────────────────

export function CardShapeConfigPopover({
    config, onChange, onClose,
}: {
    config: CardShapeConfig
    onChange: (partial: Partial<ItemConfig>) => void
    onClose: () => void
}) {
    const popoverRef = React.useRef<HTMLDivElement>(null)

    React.useEffect(() => {
        function handleClick(e: MouseEvent) {
            if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
                onClose()
            }
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
            {/* Header */}
            <div className="flex items-center justify-between">
                <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">Configurar card</span>
                <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
                    <CloseIcon />
                </button>
            </div>

            {/* Icon picker */}
            <div>
                <label className="text-[10px] font-medium text-muted-foreground mb-1 block">Ícone</label>
                <IconPicker current={config.icon} onSelect={icon => onChange({ icon })} />
            </div>

            {/* Title */}
            <div>
                <label className="text-[10px] font-medium text-muted-foreground mb-1 block">Título</label>
                <input
                    value={config.title}
                    onChange={e => onChange({ title: e.target.value })}
                    className="w-full h-7 rounded border border-border bg-background px-2 text-xs text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-primary"
                    placeholder="Título do card"
                />
            </div>

            {/* Description */}
            <div>
                <label className="text-[10px] font-medium text-muted-foreground mb-1 block">Descrição</label>
                <textarea
                    value={config.description}
                    onChange={e => onChange({ description: e.target.value })}
                    rows={2}
                    className="w-full rounded border border-border bg-background px-2 py-1.5 text-xs text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-primary resize-none"
                    placeholder="Descrição do card"
                />
            </div>
        </div>
    )
}
