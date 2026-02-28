"use client"

import * as React from "react"
import { Plus, MoreHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import type { KanbanConfig, KanbanColumn } from "@/app/_builder-state"

// ─── Color mapping ──────────────────────────────────────────────────────────

const COL_COLOR_MAP: Record<string, string> = {
    muted:       "bg-muted text-muted-foreground",
    info:        "bg-info/10 text-info",
    warning:     "bg-warning/10 text-warning",
    success:     "bg-success/10 text-success",
    destructive: "bg-destructive/10 text-destructive",
}

// ─── Sample cards per column (placeholder data) ──────────────────────────────

const sampleCards: Record<string, { id: string; title: string; tag: string }[]> = {
    "col-1": [
        { id: "s1", title: "Redesign onboarding flow", tag: "Design" },
        { id: "s2", title: "Atualizar documentação", tag: "Docs" },
    ],
    "col-2": [
        { id: "s3", title: "Dashboard de analytics v2", tag: "Dev" },
        { id: "s4", title: "Testes de integração", tag: "QA" },
    ],
    "col-3": [
        { id: "s5", title: "Configurar CI/CD pipeline", tag: "Infra" },
        { id: "s6", title: "Dark mode support", tag: "Design" },
    ],
}

const defaultSample = [
    { id: "d1", title: "Tarefa exemplo", tag: "Geral" },
    { id: "d2", title: "Outra tarefa", tag: "Dev" },
]

const tagColors: Record<string, string> = {
    "Design": "bg-purple-500/10 text-purple-400",
    "Dev":    "bg-info/10 text-info",
    "QA":     "bg-warning/10 text-warning",
    "Docs":   "bg-muted text-muted-foreground",
    "Infra":  "bg-success/10 text-success",
    "Geral":  "bg-muted text-muted-foreground",
}

// ─── Default config ──────────────────────────────────────────────────────────

const defaultColumns: KanbanColumn[] = [
    { id: "col-1", title: "A fazer", color: "muted" },
    { id: "col-2", title: "Em progresso", color: "info" },
    { id: "col-3", title: "Revisão", color: "warning" },
    { id: "col-4", title: "Concluído", color: "success" },
]

// ─── Component ───────────────────────────────────────────────────────────────

type KanbanBoardProps = {
    config?: KanbanConfig
}

export function KanbanBoard({ config }: KanbanBoardProps = {}) {
    const columns = config?.columns ?? defaultColumns

    return (
        <div className="w-full overflow-x-auto p-8">
            <div className="w-max">

                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h2 className="text-lg/7 font-semibold text-foreground">Board de projetos</h2>
                        <p className="text-sm/6 text-muted-foreground">Sprint atual</p>
                    </div>
                    <Button>
                        <Plus className="h-4 w-4" />
                        Nova tarefa
                    </Button>
                </div>

                {/* Board */}
                <div className="flex gap-4 pb-4">
                    {columns.map(col => {
                        const cards = sampleCards[col.id] ?? defaultSample
                        const colorClass = COL_COLOR_MAP[col.color] ?? COL_COLOR_MAP.muted

                        return (
                            <div key={col.id} className="flex w-72 shrink-0 flex-col gap-3">

                                {/* Column header */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <span className={cn("rounded-full px-2 py-0.5 text-xs font-medium", colorClass)}>
                                            {col.title}
                                        </span>
                                        <span className="text-xs text-muted-foreground">{cards.length}</span>
                                    </div>
                                    <Button variant="ghost" size="icon-sm">
                                        <Plus className="h-3.5 w-3.5" />
                                    </Button>
                                </div>

                                {/* Cards */}
                                <div className="flex flex-col gap-2">
                                    {cards.map(card => (
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
                                            <div className="mt-3 flex items-center">
                                                <span className={cn("rounded-full px-2 py-0.5 text-xs font-medium", tagColors[card.tag] ?? tagColors.Geral)}>
                                                    {card.tag}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                            </div>
                        )
                    })}
                </div>

            </div>
        </div>
    )
}
