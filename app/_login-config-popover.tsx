"use client"

import * as React from "react"
import type { LoginConfig, ItemConfig, Page } from "@/app/_builder-state"

const CloseIcon = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
)

export function LoginConfigPopover({
    config, onChange, onClose, pages,
}: {
    config: LoginConfig
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
            className="absolute z-50 top-12 right-8 w-64 rounded-lg border border-border bg-card shadow-xl p-3 space-y-3 max-h-[70vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
        >
            <div className="flex items-center justify-between">
                <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">Configurar Login</span>
                <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors"><CloseIcon /></button>
            </div>

            {/* Texts */}
            <div className="space-y-2">
                <label className="text-[10px] font-medium text-muted-foreground mb-1 block">Título</label>
                <input value={config.heading} onChange={e => onChange({ heading: e.target.value })}
                    className="w-full h-7 rounded border border-border bg-background px-2 text-xs text-foreground outline-none focus:ring-1 focus:ring-primary" />

                <label className="text-[10px] font-medium text-muted-foreground mb-1 block">Subtexto</label>
                <input value={config.subtext} onChange={e => onChange({ subtext: e.target.value })}
                    className="w-full h-7 rounded border border-border bg-background px-2 text-xs text-foreground outline-none focus:ring-1 focus:ring-primary" />

                <label className="text-[10px] font-medium text-muted-foreground mb-1 block">Link do subtexto</label>
                <input value={config.subtextLink} onChange={e => onChange({ subtextLink: e.target.value })}
                    className="w-full h-7 rounded border border-border bg-background px-2 text-xs text-foreground outline-none focus:ring-1 focus:ring-primary" />

                <label className="text-[10px] font-medium text-muted-foreground mb-1 block">Label Email</label>
                <input value={config.emailLabel} onChange={e => onChange({ emailLabel: e.target.value })}
                    className="w-full h-7 rounded border border-border bg-background px-2 text-xs text-foreground outline-none focus:ring-1 focus:ring-primary" />

                <label className="text-[10px] font-medium text-muted-foreground mb-1 block">Label Senha</label>
                <input value={config.passwordLabel} onChange={e => onChange({ passwordLabel: e.target.value })}
                    className="w-full h-7 rounded border border-border bg-background px-2 text-xs text-foreground outline-none focus:ring-1 focus:ring-primary" />

                <label className="text-[10px] font-medium text-muted-foreground mb-1 block">Label Esqueci</label>
                <input value={config.forgotLabel} onChange={e => onChange({ forgotLabel: e.target.value })}
                    className="w-full h-7 rounded border border-border bg-background px-2 text-xs text-foreground outline-none focus:ring-1 focus:ring-primary" />

                <label className="text-[10px] font-medium text-muted-foreground mb-1 block">Botão principal</label>
                <input value={config.submitLabel} onChange={e => onChange({ submitLabel: e.target.value })}
                    className="w-full h-7 rounded border border-border bg-background px-2 text-xs text-foreground outline-none focus:ring-1 focus:ring-primary" />

                <label className="text-[10px] font-medium text-muted-foreground mb-1 block">Botão Google</label>
                <input value={config.googleLabel} onChange={e => onChange({ googleLabel: e.target.value })}
                    className="w-full h-7 rounded border border-border bg-background px-2 text-xs text-foreground outline-none focus:ring-1 focus:ring-primary" />
            </div>

            {/* Button links */}
            <div className="space-y-2 border-t border-border pt-3">
                <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">Links dos botões</span>

                <label className="text-[10px] font-medium text-muted-foreground mb-1 block">Botão Entrar → Página</label>
                <select value={config.submitLinkPageId ?? ""} onChange={e => onChange({ submitLinkPageId: e.target.value || null })}
                    className="w-full h-7 rounded border border-border bg-background px-2 text-xs text-foreground outline-none focus:ring-1 focus:ring-primary">
                    <option value="">Nenhuma</option>
                    {pages.map(p => <option key={p.id} value={p.id}>{p.label}</option>)}
                </select>

                <label className="text-[10px] font-medium text-muted-foreground mb-1 block">Botão Google → Página</label>
                <select value={config.googleLinkPageId ?? ""} onChange={e => onChange({ googleLinkPageId: e.target.value || null })}
                    className="w-full h-7 rounded border border-border bg-background px-2 text-xs text-foreground outline-none focus:ring-1 focus:ring-primary">
                    <option value="">Nenhuma</option>
                    {pages.map(p => <option key={p.id} value={p.id}>{p.label}</option>)}
                </select>

                <label className="text-[10px] font-medium text-muted-foreground mb-1 block">Criar conta → Página</label>
                <select value={config.subtextLinkPageId ?? ""} onChange={e => onChange({ subtextLinkPageId: e.target.value || null })}
                    className="w-full h-7 rounded border border-border bg-background px-2 text-xs text-foreground outline-none focus:ring-1 focus:ring-primary">
                    <option value="">Nenhuma</option>
                    {pages.map(p => <option key={p.id} value={p.id}>{p.label}</option>)}
                </select>

                <label className="text-[10px] font-medium text-muted-foreground mb-1 block">Esqueci senha → Página</label>
                <select value={config.forgotLinkPageId ?? ""} onChange={e => onChange({ forgotLinkPageId: e.target.value || null })}
                    className="w-full h-7 rounded border border-border bg-background px-2 text-xs text-foreground outline-none focus:ring-1 focus:ring-primary">
                    <option value="">Nenhuma</option>
                    {pages.map(p => <option key={p.id} value={p.id}>{p.label}</option>)}
                </select>
            </div>
        </div>
    )
}
