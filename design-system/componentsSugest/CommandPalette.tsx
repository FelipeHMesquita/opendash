"use client"

import * as React from "react"
import { Search, FileText, Settings, Users, BarChart2, Command, ArrowRight, Bell } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

// ─── Data ────────────────────────────────────────────────────────────────────

const items = [
    { icon: BarChart2, label: "Dashboard",          category: "Páginas", shortcut: "G D" },
    { icon: Users,     label: "Usuários",           category: "Páginas", shortcut: "G U" },
    { icon: Settings,  label: "Configurações",      category: "Páginas", shortcut: "G S" },
    { icon: FileText,  label: "Relatórios",         category: "Páginas", shortcut: "G R" },
    { icon: Bell,      label: "Notificações",       category: "Páginas", shortcut: null  },
    { icon: Users,     label: "Convidar membro",    category: "Ações",   shortcut: null  },
    { icon: FileText,  label: "Exportar relatório", category: "Ações",   shortcut: null  },
    { icon: Settings,  label: "Abrir configurações",category: "Ações",   shortcut: null  },
]

// ─── Component ───────────────────────────────────────────────────────────────

export function CommandPalette() {
    const [open, setOpen] = React.useState(false)
    const [query, setQuery] = React.useState("")
    const [activeIndex, setActiveIndex] = React.useState(0)

    const filtered = items.filter(i =>
        i.label.toLowerCase().includes(query.toLowerCase())
    )

    React.useEffect(() => {
        function onKey(e: KeyboardEvent) {
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault()
                setOpen(v => !v)
            }
            if (e.key === "Escape") setOpen(false)
            if (e.key === "ArrowDown") setActiveIndex(v => Math.min(v + 1, filtered.length - 1))
            if (e.key === "ArrowUp") setActiveIndex(v => Math.max(v - 1, 0))
        }
        window.addEventListener("keydown", onKey)
        return () => window.removeEventListener("keydown", onKey)
    }, [filtered.length])

    return (
        <div className="flex h-full w-full flex-col items-center justify-center gap-6 bg-background p-8">

            {/* Intro */}
            <div className="text-center">
                <h2 className="text-lg/7 font-semibold text-foreground">Command Palette</h2>
                <p className="mt-1 text-sm text-muted-foreground">Pressione ⌘K ou clique para abrir</p>
            </div>

            {/* Trigger */}
            <Button
                variant="outline"
                onClick={() => setOpen(true)}
                className="flex w-full max-w-sm items-center gap-3 px-4 py-3 h-auto text-muted-foreground justify-start"
            >
                <Search className="h-4 w-4" />
                <span className="flex-1 text-left text-sm">Buscar páginas e ações…</span>
                <kbd className="flex items-center gap-1 rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-xs text-muted-foreground">
                    <Command className="h-3 w-3" />K
                </kbd>
            </Button>

            {/* Overlay */}
            {open && (
                <div className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-[20vh]">
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setOpen(false)} />

                    {/* Dialog */}
                    <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-xl border border-border bg-card shadow-2xl">

                        {/* Input */}
                        <div className="flex items-center gap-3 border-b border-border px-4 py-3">
                            <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
                            <input
                                autoFocus
                                type="text"
                                value={query}
                                onChange={e => { setQuery(e.target.value); setActiveIndex(0) }}
                                placeholder="Buscar páginas, ações…"
                                className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                            />
                            <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-xs text-muted-foreground">Esc</kbd>
                        </div>

                        {/* Results */}
                        <div className="max-h-72 overflow-y-auto p-2">
                            {filtered.length === 0 ? (
                                <p className="py-6 text-center text-sm text-muted-foreground">Nenhum resultado</p>
                            ) : (
                                filtered.map((item, i) => {
                                    const Icon = item.icon
                                    return (
                                        <Button
                                            key={i}
                                            variant="ghost"
                                            onMouseEnter={() => setActiveIndex(i)}
                                            className={cn(
                                                "w-full justify-start gap-3 h-auto px-3 py-2.5",
                                                i === activeIndex ? "bg-accent hover:bg-accent" : ""
                                            )}
                                        >
                                            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-border bg-background">
                                                <Icon className="h-3.5 w-3.5 text-muted-foreground" />
                                            </div>
                                            <div className="min-w-0 flex-1 text-left">
                                                <span className="text-sm text-foreground">{item.label}</span>
                                                <span className="ml-2 text-xs text-muted-foreground">{item.category}</span>
                                            </div>
                                            {item.shortcut && (
                                                <kbd className="font-mono text-xs text-muted-foreground">{item.shortcut}</kbd>
                                            )}
                                            <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
                                        </Button>
                                    )
                                })
                            )}
                        </div>

                        {/* Footer hints */}
                        <div className="flex items-center gap-4 border-t border-border px-4 py-2.5">
                            {[["↑↓", "navegar"], ["↵", "selecionar"], ["Esc", "fechar"]].map(([key, label]) => (
                                <span key={key} className="flex items-center gap-1 text-xs text-muted-foreground">
                                    <kbd className="rounded border border-border bg-muted px-1 font-mono text-xs">{key}</kbd>
                                    {label}
                                </span>
                            ))}
                        </div>

                    </div>
                </div>
            )}

        </div>
    )
}
