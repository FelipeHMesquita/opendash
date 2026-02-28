import * as React from "react"
import { TrendingUp, TrendingDown } from "lucide-react"
import { cn } from "@/lib/utils"
import type { StatCardConfig } from "@/app/_builder-state"

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

// ─── Demo (single card, config-aware) ────────────────────────────────────────

type StatCardDemoProps = {
    config?: StatCardConfig
}

export function StatCardDemo({ config }: StatCardDemoProps = {}) {
    const c = config ?? {
        title: "Receita Total",
        value: "$48,295",
        change: "+12.5%",
        positive: true,
        description: "vs. mês anterior",
    }

    return (
        <div className="w-full p-8">
            <StatCard
                title={c.title}
                value={c.value}
                change={c.change}
                positive={c.positive}
                description={c.description}
            />
        </div>
    )
}
