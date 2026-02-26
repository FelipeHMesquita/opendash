"use client"

import * as React from "react"
import { Search, Filter, Plus, MoreHorizontal, ChevronLeft, ChevronRight, Trash2 } from "lucide-react"
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

// ─── Data ────────────────────────────────────────────────────────────────────

const projects = [
    { id: "PRJ-001", name: "Website Redesign",      status: "Em progresso", priority: "Alta",  owner: "Alice M.",   updated: "Hoje"   },
    { id: "PRJ-002", name: "Mobile App v2",          status: "Revisão",      priority: "Alta",  owner: "Bob K.",     updated: "Ontem"  },
    { id: "PRJ-003", name: "API Integration",        status: "Em progresso", priority: "Média", owner: "Carlos S.",  updated: "3 dias" },
    { id: "PRJ-004", name: "Design System",          status: "Concluído",    priority: "Baixa", owner: "Diana F.",   updated: "1 sem." },
    { id: "PRJ-005", name: "Analytics Dashboard",    status: "Backlog",      priority: "Média", owner: "Eve P.",     updated: "2 sem." },
    { id: "PRJ-006", name: "User Research",          status: "Em progresso", priority: "Alta",  owner: "Frank L.",   updated: "3 sem." },
    { id: "PRJ-007", name: "Performance Audit",      status: "Backlog",      priority: "Baixa", owner: "Grace W.",   updated: "1 mês"  },
    { id: "PRJ-008", name: "Security Review",        status: "Revisão",      priority: "Alta",  owner: "Henry C.",   updated: "1 mês"  },
]

// Uniform badge pattern for all categorical columns — design-rules §9
const statusBadge: Record<string, string> = {
    "Em progresso": "bg-info/10 text-info",
    "Revisão":      "bg-warning/10 text-warning",
    "Concluído":    "bg-success/10 text-success",
    "Backlog":      "bg-muted text-muted-foreground",
}

const priorityBadge: Record<string, string> = {
    "Alta":  "bg-destructive/10 text-destructive",
    "Média": "bg-warning/10 text-warning",
    "Baixa": "bg-success/10 text-success",
}

// ─── Component ───────────────────────────────────────────────────────────────

export function DataTable() {
    const [selected, setSelected] = React.useState<string[]>([])
    const [search, setSearch] = React.useState("")

    const filtered = projects.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.owner.toLowerCase().includes(search.toLowerCase())
    )

    const allSelected = filtered.length > 0 && filtered.every(p => selected.includes(p.id))

    function toggleAll() {
        setSelected(allSelected ? [] : filtered.map(p => p.id))
    }

    function toggleOne(id: string) {
        setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
    }

    return (
        <div className="w-full p-8">

            {/*
              Zona 1 — Cabeçalho unificado: título + botão + toolbar
              mb-6 separa toda a zona do conteúdo — design-rules §9
            */}
            <div className="mb-6">

                {/* Título + ação primária */}
                <div className="mb-4 flex items-center justify-between">
                    <div>
                        <h2 className="text-lg/7 font-semibold text-foreground">Projetos</h2>
                        <p className="text-sm/6 text-muted-foreground">{projects.length} projetos no total</p>
                    </div>
                    <Button>
                        <Plus className="h-4 w-4" />
                        Novo projeto
                    </Button>
                </div>

                {/* Toolbar — mesma superfície bg-background em todos os elementos — design-rules §9 */}
                <div className="flex items-center gap-3">
                    <div className="relative max-w-sm flex-1">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            type="text"
                            placeholder="Buscar projetos..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="pl-9"
                        />
                    </div>
                    <Button variant="outline">
                        <Filter className="h-4 w-4" />
                        Filtrar
                    </Button>
                    {selected.length > 0 && (
                        <div className="ml-auto flex items-center gap-2">
                            <span className="text-xs/6 text-muted-foreground">{selected.length} selecionado(s)</span>
                            <Button
                                size="sm"
                                className="border border-destructive/30 bg-destructive/10 text-destructive hover:bg-destructive/20 hover:text-destructive"
                                variant="ghost"
                            >
                                <Trash2 className="h-3.5 w-3.5" />
                                Excluir
                            </Button>
                        </div>
                    )}
                </div>

            </div>

            {/* Zona 2 — Conteúdo: tabela fluida */}
            <div className="overflow-hidden rounded-lg border border-border bg-card">
                <Table>
                    <TableHeader>
                        <TableRow className="border-border hover:bg-transparent">
                            <TableHead className="w-10 px-3 py-4">
                                <input
                                    type="checkbox"
                                    checked={allSelected}
                                    onChange={toggleAll}
                                    className="rounded border-border accent-primary"
                                />
                            </TableHead>
                            <TableHead className="px-3 py-4 text-xs/6 font-semibold uppercase tracking-wider text-muted-foreground">Projeto</TableHead>
                            <TableHead className="px-3 py-4 text-xs/6 font-semibold uppercase tracking-wider text-muted-foreground">Status</TableHead>
                            <TableHead className="px-3 py-4 text-xs/6 font-semibold uppercase tracking-wider text-muted-foreground">Prioridade</TableHead>
                            <TableHead className="px-3 py-4 text-xs/6 font-semibold uppercase tracking-wider text-muted-foreground">Responsável</TableHead>
                            <TableHead className="px-3 py-4 text-xs/6 font-semibold uppercase tracking-wider text-muted-foreground">Atualizado</TableHead>
                            <TableHead className="w-10 px-3 py-4" />
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filtered.map(project => (
                            <TableRow
                                key={project.id}
                                className={cn(
                                    "border-border transition-colors hover:bg-accent/50",
                                    selected.includes(project.id) && "bg-primary/5"
                                )}
                            >
                                {/* align-top obrigatório — célula "Projeto" tem duas linhas — design-rules §9 */}
                                <TableCell className="w-10 px-3 py-5 align-top">
                                    <input
                                        type="checkbox"
                                        checked={selected.includes(project.id)}
                                        onChange={() => toggleOne(project.id)}
                                        className="rounded border-border accent-primary"
                                    />
                                </TableCell>
                                <TableCell className="px-3 py-5 align-top">
                                    <p className="text-sm/6 font-medium text-foreground">{project.name}</p>
                                    <p className="text-xs/6 text-muted-foreground">{project.id}</p>
                                </TableCell>
                                <TableCell className="px-3 py-5 align-top">
                                    <span className={cn("inline-flex items-center rounded-full px-2 py-0.5 text-xs/4 font-medium", statusBadge[project.status])}>
                                        {project.status}
                                    </span>
                                </TableCell>
                                <TableCell className="px-3 py-5 align-top">
                                    {/* Badge — mesmo padrão do status, não texto colorido solto — design-rules §9 */}
                                    <span className={cn("inline-flex items-center rounded-full px-2 py-0.5 text-xs/4 font-medium", priorityBadge[project.priority])}>
                                        {project.priority}
                                    </span>
                                </TableCell>
                                <TableCell className="px-3 py-5 align-top text-sm/6 text-muted-foreground">{project.owner}</TableCell>
                                <TableCell className="px-3 py-5 align-top text-sm/6 text-muted-foreground">{project.updated}</TableCell>
                                <TableCell className="w-10 px-3 py-5 align-top">
                                    <Button variant="ghost" size="icon-sm">
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Zona 3 — Rodapé: paginação subordinada ao conteúdo */}
            <div className="mt-4 flex items-center justify-between">
                <p className="text-xs/6 text-muted-foreground">
                    Mostrando <span className="font-medium text-foreground">{filtered.length}</span> de{" "}
                    <span className="font-medium text-foreground">{projects.length}</span> projetos
                </p>
                <div className="flex items-center gap-1">
                    <Button variant="outline" size="icon" disabled className="h-8 w-8">
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button className="h-8 min-w-8 px-2.5 text-xs/6">1</Button>
                    <Button variant="outline" className="h-8 min-w-8 px-2.5 text-xs/6 text-muted-foreground">2</Button>
                    <Button variant="outline" className="h-8 min-w-8 px-2.5 text-xs/6 text-muted-foreground">3</Button>
                    <Button variant="outline" size="icon" className="h-8 w-8">
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>

        </div>
    )
}
