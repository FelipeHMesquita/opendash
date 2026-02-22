"use client"

import * as React from "react"
import { Plus, MoreHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

// ─── Data ────────────────────────────────────────────────────────────────────

const columns = [
    {
        id: "todo", title: "A fazer",
        color: "bg-muted text-muted-foreground",
        cards: [
            { id: "t1", title: "Redesign onboarding flow",       priority: "Alta",  tag: "Design" },
            { id: "t2", title: "Atualizar documentação da API",   priority: "Média", tag: "Docs"   },
            { id: "t3", title: "Implementar modo offline",        priority: "Baixa", tag: "Dev"    },
        ],
    },
    {
        id: "inprogress", title: "Em progresso",
        color: "bg-blue-500/10 text-blue-400",
        cards: [
            { id: "p1", title: "Dashboard de analytics v2",      priority: "Alta",  tag: "Dev"    },
            { id: "p2", title: "Testes de integração",           priority: "Alta",  tag: "QA"     },
        ],
    },
    {
        id: "review", title: "Revisão",
        color: "bg-amber-500/10 text-amber-400",
        cards: [
            { id: "r1", title: "Migração para PostgreSQL 16",    priority: "Alta",  tag: "Infra"  },
            { id: "r2", title: "Novo componente de upload",      priority: "Média", tag: "Design" },
        ],
    },
    {
        id: "done", title: "Concluído",
        color: "bg-emerald-500/10 text-emerald-400",
        cards: [
            { id: "d1", title: "Configurar CI/CD pipeline",      priority: "Alta",  tag: "Infra"  },
            { id: "d2", title: "Refactor auth module",           priority: "Alta",  tag: "Dev"    },
            { id: "d3", title: "Dark mode support",              priority: "Média", tag: "Design" },
        ],
    },
]

const priorityColors: Record<string, string> = {
    "Alta":  "text-rose-400",
    "Média": "text-amber-400",
    "Baixa": "text-muted-foreground",
}

const tagColors: Record<string, string> = {
    "Design": "bg-purple-500/10 text-purple-400",
    "Dev":    "bg-blue-500/10 text-blue-400",
    "QA":     "bg-amber-500/10 text-amber-400",
    "Docs":   "bg-muted text-muted-foreground",
    "Infra":  "bg-emerald-500/10 text-emerald-400",
}

// ─── Component ───────────────────────────────────────────────────────────────

export function KanbanBoard() {
    return (
        <div className="w-full overflow-x-auto p-8">
            {/* w-max fixes the wrapper to exactly the board's content width
                so justify-between places the button at the last column's right edge */}
            <div className="w-max">

            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h2 className="text-lg/7 font-semibold text-foreground">Board de projetos</h2>
                    <p className="text-sm/6 text-muted-foreground">Sprint atual · 10 tarefas</p>
                </div>
                <Button>
                    <Plus className="h-4 w-4" />
                    Nova tarefa
                </Button>
            </div>

            {/* Board */}
            <div className="flex gap-4 pb-4">
                {columns.map(col => (
                    <div key={col.id} className="flex w-72 shrink-0 flex-col gap-3">

                        {/* Column header */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className={cn("rounded-full px-2 py-0.5 text-xs font-medium", col.color)}>
                                    {col.title}
                                </span>
                                <span className="text-xs text-muted-foreground">{col.cards.length}</span>
                            </div>
                            <Button variant="ghost" size="icon-sm">
                                <Plus className="h-3.5 w-3.5" />
                            </Button>
                        </div>

                        {/* Cards */}
                        <div className="flex flex-col gap-2">
                            {col.cards.map(card => (
                                <div
                                    key={card.id}
                                    className="group cursor-pointer rounded-lg border border-border bg-card p-4 transition-colors hover:bg-accent/30"
                                >
                                    <div className="flex items-start justify-between gap-2">
                                        <p className="text-sm font-medium leading-snug text-foreground">{card.title}</p>
                                        <Button variant="ghost" size="icon-sm" className="shrink-0 opacity-0 transition-opacity group-hover:opacity-100">
                                            <MoreHorizontal className="h-3.5 w-3.5" />
                                        </Button>
                                    </div>
                                    <div className="mt-3 flex items-center justify-between">
                                        <span className={cn("rounded-full px-2 py-0.5 text-xs font-medium", tagColors[card.tag])}>
                                            {card.tag}
                                        </span>
                                        <span className={cn("text-xs font-medium", priorityColors[card.priority])}>
                                            {card.priority}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                ))}
            </div>

            </div>{/* end min-w-max */}
        </div>
    )
}
