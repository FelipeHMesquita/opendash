"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import type { ShapeConfig, ItemConfig } from "@/app/_builder-state"
import { SHAPE_ICON_LIST } from "@/componentsSugest/ShapeElement"
import { icons } from "lucide-react"

// ─── Inline SVG icons ────────────────────────────────────────────────────────

const CloseIcon = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
)
const LinkIcon = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M9 17H7A5 5 0 0 1 7 7h2M15 7h2a5 5 0 0 1 0 10h-2M8 12h8" /></svg>
)
const UnlinkIcon = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M9 17H7A5 5 0 0 1 7 7h2M15 7h2a5 5 0 0 1 0 10h-2" /></svg>
)

// ─── Background color options ────────────────────────────────────────────────

const BG_OPTIONS = [
    { value: "primary",     label: "Primary" },
    { value: "muted",       label: "Muted" },
    { value: "card",        label: "Card" },
    { value: "accent",      label: "Accent" },
    { value: "destructive", label: "Destructive" },
    { value: "transparent", label: "Transparente" },
] as const

// ─── Alignment grid ─────────────────────────────────────────────────────────

function AlignmentGrid({
    alignH, alignV, onChange,
}: {
    alignH: string; alignV: string
    onChange: (h: string, v: string) => void
}) {
    const positions = ["start", "center", "end"] as const
    return (
        <div className="inline-grid grid-cols-3 gap-0.5 p-1 rounded border border-border bg-muted/30">
            {positions.map(v =>
                positions.map(h => (
                    <button
                        key={`${v}-${h}`}
                        onClick={() => onChange(h, v)}
                        className={cn(
                            "w-5 h-5 rounded-sm flex items-center justify-center transition-colors",
                            alignH === h && alignV === v
                                ? "bg-primary"
                                : "bg-muted-foreground/10 hover:bg-muted-foreground/20",
                        )}
                    >
                        <div className={cn(
                            "w-1.5 h-1.5 rounded-full",
                            alignH === h && alignV === v
                                ? "bg-primary-foreground"
                                : "bg-muted-foreground/40",
                        )} />
                    </button>
                ))
            )}
        </div>
    )
}

// ─── Icon picker grid ────────────────────────────────────────────────────────

export function IconPicker({
    current, onSelect,
}: {
    current: string; onSelect: (icon: string) => void
}) {
    const [search, setSearch] = React.useState("")
    const filtered = SHAPE_ICON_LIST.filter(name =>
        name.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div>
            <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Buscar ícone..."
                className="w-full h-7 rounded border border-border bg-background px-2 text-xs text-foreground placeholder:text-muted-foreground mb-2 outline-none focus:ring-1 focus:ring-primary"
            />
            <div className="grid grid-cols-6 gap-1 max-h-32 overflow-y-auto">
                {filtered.map(name => {
                    const Icon = icons[name as keyof typeof icons]
                    if (!Icon) return null
                    const key = name.charAt(0).toLowerCase() + name.slice(1)
                    return (
                        <button
                            key={name}
                            onClick={() => onSelect(key)}
                            className={cn(
                                "flex h-7 w-7 items-center justify-center rounded transition-colors",
                                current === key
                                    ? "bg-primary/10 text-primary border border-primary"
                                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50 border border-transparent",
                            )}
                            title={name}
                        >
                            <Icon size={14} />
                        </button>
                    )
                })}
            </div>
        </div>
    )
}

// ─── Padding controls (Figma-style) ─────────────────────────────────────────

function PaddingControls({
    config, onChange,
}: {
    config: ShapeConfig
    onChange: (partial: Partial<ShapeConfig>) => void
}) {
    const linked = config.paddingLinked

    function handleUnified(val: number) {
        onChange({ paddingTop: val, paddingRight: val, paddingBottom: val, paddingLeft: val })
    }

    function toggleLinked() {
        if (!linked) {
            // Linking: set all to the max of current values
            const val = Math.max(config.paddingTop, config.paddingRight, config.paddingBottom, config.paddingLeft)
            onChange({ paddingLinked: true, paddingTop: val, paddingRight: val, paddingBottom: val, paddingLeft: val })
        } else {
            onChange({ paddingLinked: false })
        }
    }

    return (
        <div className="space-y-1.5">
            <div className="flex items-center gap-2">
                <button
                    onClick={toggleLinked}
                    className={cn(
                        "flex h-5 w-5 items-center justify-center rounded transition-colors",
                        linked ? "text-primary" : "text-muted-foreground hover:text-foreground",
                    )}
                    title={linked ? "Destravar lados" : "Travar lados"}
                >
                    {linked ? <LinkIcon /> : <UnlinkIcon />}
                </button>
                {linked ? (
                    <div className="flex items-center gap-1.5">
                        <input
                            type="range" min={0} max={48} step={4}
                            value={config.paddingTop}
                            onChange={e => handleUnified(Number(e.target.value))}
                            className="w-20 h-1 accent-primary"
                        />
                        <span className="text-[10px] text-muted-foreground tabular-nums w-6 text-right">{config.paddingTop}</span>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-[10px]">
                        {(["paddingTop", "paddingRight", "paddingBottom", "paddingLeft"] as const).map(side => (
                            <label key={side} className="flex items-center gap-1 text-muted-foreground">
                                <span className="w-3">{side === "paddingTop" ? "T" : side === "paddingRight" ? "R" : side === "paddingBottom" ? "B" : "L"}</span>
                                <input
                                    type="number" min={0} max={48} step={4}
                                    value={config[side]}
                                    onChange={e => onChange({ [side]: Number(e.target.value) })}
                                    className="w-10 h-5 rounded border border-border bg-background px-1 text-[10px] text-foreground text-center outline-none focus:ring-1 focus:ring-primary"
                                />
                            </label>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

// ─── Main popover ────────────────────────────────────────────────────────────

export function ShapeConfigPopover({
    config, onChange, onClose,
}: {
    config: ShapeConfig
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
                <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">Configurar forma</span>
                <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
                    <CloseIcon />
                </button>
            </div>

            {/* Icon picker */}
            <div>
                <label className="text-[10px] font-medium text-muted-foreground mb-1 block">Ícone</label>
                <IconPicker current={config.icon} onSelect={icon => onChange({ icon })} />
            </div>

            {/* Alignment */}
            <div>
                <label className="text-[10px] font-medium text-muted-foreground mb-1 block">Alinhamento</label>
                <AlignmentGrid
                    alignH={config.alignH}
                    alignV={config.alignV}
                    onChange={(h, v) => onChange({ alignH: h as ShapeConfig["alignH"], alignV: v as ShapeConfig["alignV"] })}
                />
            </div>

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

            {/* Padding */}
            <div>
                <label className="text-[10px] font-medium text-muted-foreground mb-1 block">Padding</label>
                <PaddingControls config={config} onChange={onChange} />
            </div>
        </div>
    )
}
