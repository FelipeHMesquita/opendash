"use client"

import * as React from "react"

// ─── Types ────────────────────────────────────────────────────────────────────

export interface GridConfig {
    maxWidth: number  // 0 = Full (fluido)
}

export interface CartItem {
    id: string
    name: string
    gridConfig: GridConfig
    theme: { name: string; vars: Record<string, string> }
    variant?: string
}

interface CartContextValue {
    items: CartItem[]
    addItem: (item: CartItem) => void
    removeItem: (id: string) => void
    clearCart: () => void
}

// ─── Context ──────────────────────────────────────────────────────────────────

const CartContext = React.createContext<CartContextValue>({
    items: [],
    addItem: () => {},
    removeItem: () => {},
    clearCart: () => {},
})

const STORAGE_KEY = "styleguide_cart"

// ─── Provider ─────────────────────────────────────────────────────────────────

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = React.useState<CartItem[]>([])

    React.useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY)
            if (stored) setItems(JSON.parse(stored))
        } catch {}
    }, [])

    function persist(next: CartItem[]) {
        setItems(next)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    }

    function addItem(item: CartItem) {
        persist([...items.filter((i) => i.id !== item.id), item])
    }

    function removeItem(id: string) {
        persist(items.filter((i) => i.id !== id))
    }

    function clearCart() {
        persist([])
    }

    return (
        <CartContext.Provider value={{ items, addItem, removeItem, clearCart }}>
            {children}
        </CartContext.Provider>
    )
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useCart() {
    return React.useContext(CartContext)
}
