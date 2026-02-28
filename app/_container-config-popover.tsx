"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import type { ContainerConfig, ItemConfig } from "@/app/_builder-state"

const CloseIcon = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
)

const BG_OPTIONS = [
    { value: "primary",     label: "Primary" },
    { value: "muted",       label: "Muted" },
    { value: "card",        label: "Card" },
    { value: "accent",      label: "Accent" },
    { value: "destructive", label: "Destructive" },
    { value: "transparent", label: "Transparente" },
] as const

export function ContainerConfigPopover({
    config, onChange, onClose,
}: {
    config: ContainerConfig
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
                <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">Configurar Container</span>
                <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors"><CloseIcon /></button>
            </div>

            {/* Title */}
            <div>
                <label className="text-[10px] font-medium text-muted-foreground mb-1 block">Título</label>
                <input
                    value={config.title}
                    onChange={e => onChange({ title: e.target.value })}
                    className="w-full h-7 rounded border border-border bg-background px-2 text-xs text-foreground outline-none focus:ring-1 focus:ring-primary"
                />
            </div>

            {/* Show title toggle */}
            <div className="flex items-center justify-between">
                <label className="text-[10px] font-medium text-muted-foreground">Exibir título</label>
                <button
                    onClick={() => onChange({ showTitle: !config.showTitle })}
                    className={cn(
                        "relative w-7 h-4 rounded-full transition-colors",
                        config.showTitle ? "bg-primary" : "bg-muted",
                    )}
                >
                    <span className={cn(
                        "absolute top-0.5 w-3 h-3 rounded-full bg-white shadow transition-transform",
                        config.showTitle ? "translate-x-3.5" : "translate-x-0.5",
                    )} />
                </button>
            </div>

            {/* Title alignment */}
            {config.showTitle && (
                <div>
                    <label className="text-[10px] font-medium text-muted-foreground mb-1 block">Alinhamento título</label>
                    <div className="flex gap-1">
                        {(["start", "center"] as const).map(align => (
                            <button
                                key={align}
                                onClick={() => onChange({ titleAlign: align })}
                                className={cn(
                                    "px-2 py-0.5 rounded text-[10px] transition-colors",
                                    config.titleAlign === align
                                        ? "bg-primary/10 text-primary border border-primary font-medium"
                                        : "text-muted-foreground hover:text-foreground border border-border",
                                )}
                            >
                                {align === "start" ? "Esquerda" : "Centro"}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Background */}
            <div>
                <label className="text-[10px] font-medium text-muted-foreground mb-1 block">Fundo</label>
                <div className="flex flex-wrap gap-1">
                    {BG_OPTIONS.map(opt => (
                        <button
                            key={opt.value}
                            onClick={() => onChange({ bgColor: opt.value })}
                            className={cn(
                                "px-2 py-0.5 rounded text-[10px] transition-colors",
                                config.bgColor === opt.value
                                    ? "bg-primary/10 text-primary border border-primary font-medium"
                                    : "text-muted-foreground hover:text-foreground border border-border hover:bg-muted/50",
                            )}
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Border */}
            <div className="flex items-center justify-between">
                <label className="text-[10px] font-medium text-muted-foreground">Borda</label>
                <button
                    onClick={() => onChange({ showBorder: !config.showBorder })}
                    className={cn(
                        "relative w-7 h-4 rounded-full transition-colors",
                        config.showBorder ? "bg-primary" : "bg-muted",
                    )}
                >
                    <span className={cn(
                        "absolute top-0.5 w-3 h-3 rounded-full bg-white shadow transition-transform",
                        config.showBorder ? "translate-x-3.5" : "translate-x-0.5",
                    )} />
                </button>
            </div>

            {/* Border radius */}
            <div>
                <label className="text-[10px] font-medium text-muted-foreground mb-1 block">Raio</label>
                <div className="flex items-center gap-1.5">
                    <input
                        type="range" min={0} max={24} step={2}
                        value={config.borderRadius}
                        onChange={e => onChange({ borderRadius: Number(e.target.value) })}
                        className="w-20 h-1 accent-primary"
                    />
                    <span className="text-[10px] text-muted-foreground tabular-nums w-6 text-right">{config.borderRadius}</span>
                </div>
            </div>
        </div>
    )
}
