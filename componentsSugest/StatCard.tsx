import * as React from "react"
import { TrendingUp, TrendingDown } from "lucide-react"
import { cn } from "@/lib/utils"

// ─── Primitive ────────────────────────────────────────────────────────────────

type StatCardProps = {
    title: string
    value: string
    change: string
    positive: boolean
    description?: string
}

export function StatCard({ title, value, change, positive, description }: StatCardProps) {
    return (
        <div className="rounded-lg border border-border bg-card p-6">
            <div className="flex items-center justify-between">
                <p className="text-sm/6 font-medium text-muted-foreground">{title}</p>
                <span className={cn(
                    "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
                    positive ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
                )}>
                    {positive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    {change}
                </span>
            </div>
            <div className="mt-4 border-t border-border pt-4">
                <p className="text-3xl/8 font-semibold tracking-tight text-foreground">{value}</p>
                {description && (
                    <p className="mt-1 text-xs text-muted-foreground">{description}</p>
                )}
            </div>
        </div>
    )
}

// ─── Page demo ────────────────────────────────────────────────────────────────

const cards = [
    { title: "Receita Total",   value: "$48,295",  change: "+12.5%", positive: true,  description: "vs. mês anterior" },
    { title: "Usuários Ativos", value: "3,842",    change: "+8.1%",  positive: true,  description: "nos últimos 30 dias" },
    { title: "Taxa de Churn",   value: "2.4%",     change: "+0.3%",  positive: false, description: "aumento preocupante" },
    { title: "MRR",             value: "$9,240",   change: "+5.2%",  positive: true,  description: "receita recorrente" },
]

export function StatCardDemo() {
    return (
        <div className="w-full p-8">
            <div className="mb-6">
                <h2 className="text-lg/7 font-semibold text-foreground">Métricas principais</h2>
                <p className="text-sm/6 text-muted-foreground">Últimos 30 dias</p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
                {cards.map(card => (
                    <StatCard key={card.title} {...card} />
                ))}
            </div>
        </div>
    )
}
