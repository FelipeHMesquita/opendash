import * as React from "react"
import { UserPlus, FileText, Settings, CreditCard, AlertCircle, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

// ─── Data ────────────────────────────────────────────────────────────────────

const activities = [
    {
        id: 1, group: "Hoje",
        icon: UserPlus, color: "bg-info/10 text-info",
        title: "Novo usuário adicionado",
        description: "Alice Monteiro foi convidada para o workspace",
        time: "Agora mesmo",
    },
    {
        id: 2, group: "Hoje",
        icon: CheckCircle2, color: "bg-success/10 text-success",
        title: "Deploy concluído",
        description: "Versão 2.4.1 publicada em produção sem erros",
        time: "42 min atrás",
    },
    {
        id: 3, group: "Hoje",
        icon: FileText, color: "bg-muted text-muted-foreground",
        title: "Relatório exportado",
        description: "Relatório mensal de outubro gerado por Carlos S.",
        time: "3h atrás",
    },
    {
        id: 4, group: "Ontem",
        icon: Settings, color: "bg-warning/10 text-warning",
        title: "Configurações alteradas",
        description: "Limite de rate limit atualizado para 20 req/s",
        time: "Ontem, 14:22",
    },
    {
        id: 5, group: "Ontem",
        icon: CreditCard, color: "bg-success/10 text-success",
        title: "Pagamento processado",
        description: "Fatura #INV-2024-011 de R$ 89,00 paga com sucesso",
        time: "Ontem, 09:00",
    },
    {
        id: 6, group: "Mais antigo",
        icon: AlertCircle, color: "bg-destructive/10 text-destructive",
        title: "Limite próximo",
        description: "Uso de emails chegou a 85% do limite mensal",
        time: "01 Nov, 11:15",
    },
]

const groups = ["Hoje", "Ontem", "Mais antigo"]

// ─── Component ───────────────────────────────────────────────────────────────

export function ActivityFeed() {
    return (
        <div className="w-full p-8">

            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h2 className="text-lg/7 font-semibold text-foreground">Atividade recente</h2>
                    <p className="text-sm/6 text-muted-foreground">Histórico de eventos do workspace</p>
                </div>
                <Button variant="ghost" size="sm">Ver tudo</Button>
            </div>

            <div className="space-y-6">
                {groups.map(group => {
                    const items = activities.filter(a => a.group === group)
                    if (!items.length) return null
                    return (
                        <div key={group}>
                            <p className="mb-3 text-xs font-medium text-muted-foreground">{group}</p>
                            <div className="overflow-hidden rounded-lg border border-border bg-card">
                                <div className="divide-y divide-border">
                                    {items.map(item => {
                                        const Icon = item.icon
                                        return (
                                            <div key={item.id} className="flex items-start gap-4 px-5 py-4 transition-colors hover:bg-accent/30">
                                                <div className={cn("mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full", item.color)}>
                                                    <Icon className="h-4 w-4" />
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <p className="text-sm font-medium text-foreground">{item.title}</p>
                                                    <p className="mt-0.5 truncate text-xs text-muted-foreground">{item.description}</p>
                                                </div>
                                                <span className="shrink-0 text-xs text-muted-foreground">{item.time}</span>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

        </div>
    )
}
