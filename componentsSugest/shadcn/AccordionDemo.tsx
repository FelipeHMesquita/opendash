"use client"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import * as React from "react"

// ─── Accordion Demo ──────────────────────────────────────────────────────────

const FAQ_ITEMS = [
    {
        q: "Como faço para alterar meu plano?",
        a: "Acesse Configurações > Faturamento e selecione o novo plano desejado. A mudança será aplicada no próximo ciclo de cobrança.",
    },
    {
        q: "Posso exportar meus dados?",
        a: "Sim, em Configurações > Dados você encontra a opção de exportar todos os seus projetos em formato JSON ou CSV.",
    },
    {
        q: "Qual o limite de membros por workspace?",
        a: "O plano Free permite até 3 membros. Planos Pro e Enterprise não possuem limite de membros.",
    },
    {
        q: "Como funciona o sistema de permissões?",
        a: "Cada membro pode ter role de Owner, Admin ou Member. Admins podem gerenciar projetos e membros. Members podem editar dashboards.",
    },
    {
        q: "Os dados são criptografados?",
        a: "Sim, todos os dados são criptografados em trânsito (TLS 1.3) e em repouso (AES-256). As senhas utilizam bcrypt com salt.",
    },
]

export function AccordionDemo() {
    return (
        <div className="w-full p-8">
            <div className="mx-auto max-w-2xl">
                <div className="mb-6">
                    <h2 className="text-lg font-semibold text-foreground">Perguntas frequentes</h2>
                    <p className="text-sm text-muted-foreground">Encontre respostas para as dúvidas mais comuns</p>
                </div>
                <Accordion type="single" collapsible className="w-full">
                    {FAQ_ITEMS.map((item, i) => (
                        <AccordionItem key={i} value={`item-${i}`}>
                            <AccordionTrigger className="text-sm text-left">{item.q}</AccordionTrigger>
                            <AccordionContent className="text-sm text-muted-foreground">
                                {item.a}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </div>
    )
}

// ─── Collapsible Demo ────────────────────────────────────────────────────────

const CHANGELOG = [
    { version: "2.4.0", date: "27 Fev 2026", changes: ["Multi-tenancy com workspaces", "Adapter pattern local/Supabase", "Canvas items clicáveis"] },
    { version: "2.3.0", date: "20 Fev 2026", changes: ["Layout inheritance entre páginas", "Right sidebar configurável", "Export com parâmetros"] },
    { version: "2.2.0", date: "10 Fev 2026", changes: ["Dashboard builder multi-página", "Undo/Redo com histórico", "Preview mode fullscreen"] },
]

export function CollapsibleDemo() {
    const [openItems, setOpenItems] = React.useState<Set<number>>(new Set([0]))

    return (
        <div className="w-full p-8">
            <div className="mx-auto max-w-2xl">
                <div className="mb-6">
                    <h2 className="text-lg font-semibold text-foreground">Changelog</h2>
                    <p className="text-sm text-muted-foreground">Histórico de atualizações da plataforma</p>
                </div>
                <div className="space-y-3">
                    {CHANGELOG.map((release, i) => (
                        <Collapsible
                            key={i}
                            open={openItems.has(i)}
                            onOpenChange={(open) => {
                                setOpenItems(prev => {
                                    const next = new Set(prev)
                                    open ? next.add(i) : next.delete(i)
                                    return next
                                })
                            }}
                        >
                            <div className="rounded-lg border border-border bg-card">
                                <CollapsibleTrigger className="flex w-full items-center justify-between px-4 py-3 text-sm font-medium text-foreground hover:bg-muted/50 transition-colors rounded-lg">
                                    <span className="flex items-center gap-3">
                                        <span className="rounded bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                                            v{release.version}
                                        </span>
                                        {release.date}
                                    </span>
                                    <span className="text-xs text-muted-foreground">
                                        {release.changes.length} mudanças
                                    </span>
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                    <div className="border-t border-border px-4 py-3">
                                        <ul className="space-y-1.5">
                                            {release.changes.map((change, j) => (
                                                <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                                                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
                                                    {change}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </CollapsibleContent>
                            </div>
                        </Collapsible>
                    ))}
                </div>
            </div>
        </div>
    )
}
