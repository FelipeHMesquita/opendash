"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import type { AvatarConfig, ItemConfig } from "@/app/_builder-state"

const CloseIcon = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
)

const SIZE_OPTIONS = [
    { value: "sm",      label: "SM" },
    { value: "default", label: "MD" },
    { value: "lg",      label: "LG" },
] as const

export function AvatarConfigPopover({
    config, onChange, onClose,
}: {
    config: AvatarConfig
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
                <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">Configurar Avatar</span>
                <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors"><CloseIcon /></button>
            </div>

            {/* Name */}
            <div>
                <label className="text-[10px] font-medium text-muted-foreground mb-1 block">Nome</label>
                <input
                    value={config.name}
                    onChange={e => onChange({ name: e.target.value })}
                    className="w-full h-7 rounded border border-border bg-background px-2 text-xs text-foreground outline-none focus:ring-1 focus:ring-primary"
                />
            </div>

            {/* Role */}
            <div>
                <label className="text-[10px] font-medium text-muted-foreground mb-1 block">Cargo</label>
                <input
                    value={config.role}
                    onChange={e => onChange({ role: e.target.value })}
                    className="w-full h-7 rounded border border-border bg-background px-2 text-xs text-foreground outline-none focus:ring-1 focus:ring-primary"
                />
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

            {/* Show name toggle */}
            <div className="flex items-center justify-between">
                <label className="text-[10px] font-medium text-muted-foreground">Exibir nome</label>
                <button
                    onClick={() => onChange({ showName: !config.showName })}
                    className={cn(
                        "relative w-7 h-4 rounded-full transition-colors",
                        config.showName ? "bg-primary" : "bg-muted",
                    )}
                >
                    <span className={cn(
                        "absolute top-0.5 w-3 h-3 rounded-full bg-white shadow transition-transform",
                        config.showName ? "translate-x-3.5" : "translate-x-0.5",
                    )} />
                </button>
            </div>

            {/* Show role toggle */}
            <div className="flex items-center justify-between">
                <label className="text-[10px] font-medium text-muted-foreground">Exibir cargo</label>
                <button
                    onClick={() => onChange({ showRole: !config.showRole })}
                    className={cn(
                        "relative w-7 h-4 rounded-full transition-colors",
                        config.showRole ? "bg-primary" : "bg-muted",
                    )}
                >
                    <span className={cn(
                        "absolute top-0.5 w-3 h-3 rounded-full bg-white shadow transition-transform",
                        config.showRole ? "translate-x-3.5" : "translate-x-0.5",
                    )} />
                </button>
            </div>
        </div>
    )
}
