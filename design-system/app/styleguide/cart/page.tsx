"use client"

import * as React from "react"
import Link from "next/link"
import { useCart } from "../_cart-context"

export default function CartPage() {
    const { items, removeItem, clearCart } = useCart()

    if (items.length === 0) {
        return (
            <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                    <BagIcon className="h-7 w-7 text-muted-foreground" />
                </div>
                <div>
                    <p className="text-sm font-medium text-foreground">Carrinho vazio</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                        Adicione componentes pelo botão "Adicionar" no topbar de cada página.
                    </p>
                </div>
                <Link
                    href="/styleguide"
                    className="mt-2 inline-flex items-center rounded border border-border px-4 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                    Voltar ao styleguide
                </Link>
            </div>
        )
    }

    return (
        <div className="mx-auto max-w-3xl px-6 py-10">
            {/* Header */}
            <div className="mb-8 flex items-start justify-between">
                <div>
                    <h1 className="text-lg font-semibold text-foreground">Carrinho</h1>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                        {items.length} {items.length === 1 ? "componente selecionado" : "componentes selecionados"}
                    </p>
                </div>
                <button
                    onClick={clearCart}
                    className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                    Limpar tudo
                </button>
            </div>

            {/* Items list */}
            <div className="flex flex-col gap-3">
                {items.map((item) => (
                    <div
                        key={item.id}
                        className="flex items-center justify-between rounded-lg border border-border bg-card px-5 py-4"
                    >
                        <div className="flex flex-col gap-1">
                            <span className="text-sm font-medium text-foreground">{item.name}</span>
                            <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                <span>
                                    {item.gridConfig.maxWidth === 0 ? "Full width" : `${item.gridConfig.maxWidth}px`}
                                </span>
                                <span className="text-border">·</span>
                                <span>{item.theme?.name ?? "Light"}</span>
                                {item.variant && item.variant !== "Default" && (
                                    <>
                                        <span className="text-border">·</span>
                                        <span>{item.variant}</span>
                                    </>
                                )}
                            </div>
                        </div>
                        <button
                            onClick={() => removeItem(item.id)}
                            className="ml-4 shrink-0 text-xs text-muted-foreground transition-colors hover:text-foreground"
                            aria-label={`Remover ${item.name}`}
                        >
                            Remover
                        </button>
                    </div>
                ))}
            </div>

            {/* Footer actions */}
            <div className="mt-8 flex items-center justify-between">
                <Link
                    href="/styleguide"
                    className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                    ← Continuar navegando
                </Link>
                <Link
                    href="/styleguide/export"
                    className="inline-flex items-center rounded-md bg-primary px-5 py-2 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                >
                    Avançar para exportação →
                </Link>
            </div>
        </div>
    )
}

function BagIcon({ className }: { className?: string }) {
    return (
        <svg
            className={className}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
            <line x1="3" x2="21" y1="6" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
    )
}
