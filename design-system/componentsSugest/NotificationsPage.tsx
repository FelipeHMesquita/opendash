"use client"

import * as React from "react"
import { Bell, X, CheckCheck, Info, AlertTriangle, CheckCircle2, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

// ─── Data ────────────────────────────────────────────────────────────────────

const initialNotifications = [
    {
        id: 1, type: "success", read: false,
        icon: CheckCircle2, color: "text-emerald-400",
        title: "Deploy concluído com sucesso",
        description: "A versão 2.4.1 foi publicada em produção sem erros.",
        time: "5 min atrás",
    },
    {
        id: 2, type: "warning", read: false,
        icon: AlertTriangle, color: "text-amber-400",
        title: "Uso próximo do limite",
        description: "Você atingiu 85% do limite de emails do plano Pro.",
        time: "2h atrás",
    },
    {
        id: 3, type: "info", read: false,
        icon: Info, color: "text-blue-400",
        title: "Novo membro na equipe",
        description: "Alice Monteiro aceitou o convite e entrou no workspace.",
        time: "Ontem",
    },
    {
        id: 4, type: "error", read: true,
        icon: AlertCircle, color: "text-rose-400",
        title: "Falha no webhook",
        description: "3 tentativas de entrega para o endpoint falharam.",
        time: "Ontem",
    },
    {
        id: 5, type: "success", read: true,
        icon: CheckCircle2, color: "text-emerald-400",
        title: "Pagamento processado",
        description: "Fatura de novembro no valor de R$ 89,00 paga.",
        time: "2 dias atrás",
    },
]

// ─── Component ───────────────────────────────────────────────────────────────

export function NotificationsPage() {
    const [items, setItems] = React.useState(initialNotifications)
    const unreadCount = items.filter(n => !n.read).length

    function markAllRead() {
        setItems(prev => prev.map(n => ({ ...n, read: true })))
    }

    function dismiss(id: number) {
        setItems(prev => prev.filter(n => n.id !== id))
    }

    return (
        <div className="w-full p-8">

            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <h2 className="text-lg/7 font-semibold text-foreground">Notificações</h2>
                    {unreadCount > 0 && (
                        <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-xs font-semibold text-primary-foreground">
                            {unreadCount}
                        </span>
                    )}
                </div>
                {unreadCount > 0 && (
                    <Button variant="ghost" size="sm" onClick={markAllRead}>
                        <CheckCheck className="h-3.5 w-3.5" />
                        Marcar todas como lidas
                    </Button>
                )}
            </div>

            {/* Empty */}
            {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                        <Bell className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <p className="mt-4 text-sm font-medium text-foreground">Nenhuma notificação</p>
                    <p className="mt-1 text-xs text-muted-foreground">Você está em dia!</p>
                </div>
            ) : (
                <div className="overflow-hidden rounded-lg border border-border bg-card">
                    <div className="divide-y divide-white/5">
                        {items.map(item => {
                            const Icon = item.icon
                            return (
                                <div
                                    key={item.id}
                                    className={cn(
                                        "group flex items-start gap-4 px-5 py-4 transition-colors hover:bg-accent/30",
                                        !item.read && "bg-primary/5"
                                    )}
                                >
                                    {/* Unread dot */}
                                    <div className={cn("mt-2 h-1.5 w-1.5 shrink-0 rounded-full", !item.read ? "bg-primary" : "opacity-0")} />

                                    <Icon className={cn("mt-0.5 h-4 w-4 shrink-0", item.color)} />

                                    <div className="min-w-0 flex-1">
                                        <p className={cn("text-sm font-medium", item.read ? "text-muted-foreground" : "text-foreground")}>
                                            {item.title}
                                        </p>
                                        <p className="mt-0.5 text-xs text-muted-foreground">{item.description}</p>
                                        <p className="mt-1.5 text-xs text-muted-foreground/60">{item.time}</p>
                                    </div>

                                    <Button
                                        variant="ghost"
                                        size="icon-sm"
                                        onClick={() => dismiss(item.id)}
                                        className="mt-0.5 opacity-0 transition-opacity group-hover:opacity-100"
                                    >
                                        <X className="h-3.5 w-3.5" />
                                    </Button>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )}

        </div>
    )
}
