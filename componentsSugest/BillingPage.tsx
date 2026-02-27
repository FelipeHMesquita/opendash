"use client"

import * as React from "react"
import { Check, CreditCard, Download } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

// ─── Data ────────────────────────────────────────────────────────────────────

const plans = [
    {
        name: "Free",
        price: "R$ 0",
        description: "Para começar",
        current: false,
        features: ["3.000 emails/mês", "1 domínio", "2 req/s", "Suporte por email"],
    },
    {
        name: "Pro",
        price: "R$ 89",
        description: "Para equipes em crescimento",
        current: true,
        features: ["50.000 emails/mês", "5 domínios", "10 req/s", "Suporte prioritário", "Analytics avançado"],
    },
    {
        name: "Scale",
        price: "R$ 299",
        description: "Para grandes volumes",
        current: false,
        features: ["500.000 emails/mês", "Domínios ilimitados", "50 req/s", "Suporte dedicado", "IPs dedicados", "SLA 99.9%"],
    },
]

const invoices = [
    { id: "INV-2024-012", date: "1 Dez, 2024",  amount: "R$ 89,00", status: "Pago" },
    { id: "INV-2024-011", date: "1 Nov, 2024",  amount: "R$ 89,00", status: "Pago" },
    { id: "INV-2024-010", date: "1 Out, 2024",  amount: "R$ 89,00", status: "Pago" },
    { id: "INV-2024-009", date: "1 Set, 2024",  amount: "R$ 89,00", status: "Pago" },
]

// ─── Component ───────────────────────────────────────────────────────────────

export function BillingPage() {
    return (
        <div className="w-full space-y-10 p-8">

            {/* Header */}
            <div>
                <h2 className="text-lg/7 font-semibold text-foreground">Cobrança</h2>
                <p className="text-sm/6 text-muted-foreground">Gerencie seu plano e histórico de pagamentos.</p>
            </div>

            {/* Plans */}
            <section className="space-y-4">
                <h3 className="text-sm font-semibold text-foreground">Planos</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    {plans.map(plan => (
                        <div
                            key={plan.name}
                            className={cn(
                                "rounded-lg border bg-card p-6",
                                plan.current ? "border-primary ring-1 ring-primary/20" : "border-border"
                            )}
                        >
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-sm font-semibold text-foreground">{plan.name}</p>
                                    <p className="mt-0.5 text-xs text-muted-foreground">{plan.description}</p>
                                </div>
                                {plan.current && (
                                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                                        Atual
                                    </span>
                                )}
                            </div>
                            <p className="mt-4 text-2xl font-semibold text-foreground">
                                {plan.price}
                                <span className="text-sm font-normal text-muted-foreground">/mês</span>
                            </p>
                            <ul className="mt-4 space-y-2">
                                {plan.features.map(f => (
                                    <li key={f} className="flex items-center gap-2 text-xs text-muted-foreground">
                                        <Check className="h-3.5 w-3.5 shrink-0 text-success" />
                                        {f}
                                    </li>
                                ))}
                            </ul>
                            <Button
                                disabled={plan.current}
                                variant={plan.current ? "secondary" : "default"}
                                className="mt-6 w-full"
                            >
                                {plan.current ? "Plano atual" : "Fazer upgrade"}
                            </Button>
                        </div>
                    ))}
                </div>
            </section>

            {/* Payment method */}
            <section className="space-y-4">
                <h3 className="text-sm font-semibold text-foreground">Método de pagamento</h3>
                <div className="flex items-center justify-between rounded-lg border border-border bg-card px-5 py-4">
                    <div className="flex items-center gap-4">
                        <div className="flex h-9 w-14 items-center justify-center rounded-md border border-border bg-muted">
                            <CreditCard className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-foreground">•••• •••• •••• 4242</p>
                            <p className="text-xs text-muted-foreground">Expira 12/2027</p>
                        </div>
                    </div>
                    <Button variant="link" size="sm" className="h-auto p-0">Atualizar</Button>
                </div>
            </section>

            {/* Invoices */}
            <section className="space-y-4">
                <h3 className="text-sm font-semibold text-foreground">Histórico de cobranças</h3>
                <div className="overflow-hidden rounded-lg border border-border bg-card">
                    <div className="divide-y divide-border">
                        {invoices.map(inv => (
                            <div key={inv.id} className="flex items-center justify-between px-5 py-4 transition-colors hover:bg-accent/30">
                                <div>
                                    <p className="text-sm font-medium text-foreground">{inv.id}</p>
                                    <p className="text-xs text-muted-foreground">{inv.date}</p>
                                </div>
                                <div className="flex items-center gap-6">
                                    <span className="text-sm text-foreground">{inv.amount}</span>
                                    <span className="rounded-full bg-success/10 px-2 py-0.5 text-xs font-medium text-success">{inv.status}</span>
                                    <Button variant="ghost" size="icon-sm">
                                        <Download className="h-3.5 w-3.5" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

        </div>
    )
}
