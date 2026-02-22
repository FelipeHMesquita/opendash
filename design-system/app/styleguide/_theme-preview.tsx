"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { SidebarOpen } from "@/componentsSugest/SidebarOpen"
import { useCart } from "./_cart-context"
import { useSidebar } from "./_sidebar-context"

// ─── Themes ───────────────────────────────────────────────────────────────────

type ThemeName = "Light" | "Dark" | "Custom"

const themes: Record<"Light" | "Dark", Record<string, string>> = {
    "Light": {
        "--background":         "oklch(0.98 0 0)",
        "--foreground":         "oklch(0.13 0 0)",
        "--card":               "oklch(1.00 0 0)",
        "--card-foreground":    "oklch(0.13 0 0)",
        "--muted":              "oklch(0.96 0 0)",
        "--muted-foreground":   "oklch(0.52 0 0)",
        "--border":             "oklch(0 0 0 / 8%)",
        "--accent":             "oklch(0.96 0 0)",
        "--accent-foreground":  "oklch(0.13 0 0)",
        "--primary":            "oklch(0.30 0.18 250)",
        "--primary-foreground": "oklch(1 0 0)",
        "--ring":               "oklch(0.30 0.18 250)",
    },
    "Dark": {
        "--background":         "oklch(0.08 0 0)",
        "--foreground":         "oklch(0.97 0 0)",
        "--card":               "oklch(0.12 0 0)",
        "--card-foreground":    "oklch(0.97 0 0)",
        "--muted":              "oklch(0.18 0 0)",
        "--muted-foreground":   "oklch(0.60 0 0)",
        "--border":             "oklch(1 0 0 / 10%)",
        "--accent":             "oklch(0.20 0 0)",
        "--accent-foreground":  "oklch(0.97 0 0)",
        "--primary":            "oklch(0.62 0.22 250)",
        "--primary-foreground": "oklch(1 0 0)",
        "--ring":               "oklch(0.62 0.22 250)",
    },
}

const STORAGE_KEY = "styleguide_theme"
const STORAGE_KEY_INSPECTED = "styleguide_inspected_vars"
const GRID_STORAGE_KEY = "styleguide_grid"

function applyTheme(name: ThemeName, customVars?: Record<string, string>) {
    const root = document.documentElement
    if (name === "Custom" && customVars) {
        Object.entries(customVars).forEach(([key, value]) => root.style.setProperty(key, value))
        return
    }
    const vars = themes[name as "Light" | "Dark"]
    if (!vars) return
    Object.entries(vars).forEach(([key, value]) => root.style.setProperty(key, value))
}

// ─── Grid controls config ─────────────────────────────────────────────────────

const WIDTH_OPTIONS = [
    { label: "Full",   value: 0    },
    { label: "1920",   value: 1920 },
    { label: "1440",   value: 1440 },
    { label: "1280",   value: 1280 },
    { label: "1024",   value: 1024 },
    { label: "768",    value: 768  },
    { label: "640",    value: 640  },
]

// ─── Icons ────────────────────────────────────────────────────────────────────

function PanelLeftIcon() {
    return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="M9 3v18" />
        </svg>
    )
}

function BagIcon({ className }: { className?: string }) {
    return (
        <svg
            className={className}
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
            <line x1="3" x2="21" y1="6" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
    )
}

// ─── Component ────────────────────────────────────────────────────────────────

export function ThemePreview({
    children,
    frame = false,
}: {
    children: React.ReactNode
    frame?: boolean
}) {
    const pathname = usePathname()
    const { items, addItem } = useCart()
    const { collapsed, toggle } = useSidebar()

    const slug = pathname.split("/").at(-1) ?? ""
    const componentName = slug
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ")

    const [activeTheme, setActiveTheme] = React.useState<ThemeName>("Light")
    const [customVars, setCustomVars] = React.useState<Record<string, string> | null>(null)
    const [maxWidth, setMaxWidth] = React.useState(0)
    const [appliedGrid, setAppliedGrid] = React.useState({ maxWidth: 0 })
    const [justAdded, setJustAdded] = React.useState(false)

    const gridSaveReady = React.useRef(false)

    React.useEffect(() => {
        // Check for inspected vars first — they take priority
        try {
            const inspected = localStorage.getItem(STORAGE_KEY_INSPECTED)
            if (inspected) {
                const vars = JSON.parse(inspected) as Record<string, string>
                setCustomVars(vars)
                setActiveTheme("Custom")
                applyTheme("Custom", vars)
            } else {
                const stored = localStorage.getItem(STORAGE_KEY) as ThemeName | null
                const initial = stored === "Light" || stored === "Dark" ? stored : "Light"
                setActiveTheme(initial)
                applyTheme(initial)
            }
        } catch {
            applyTheme("Light")
        }

        try {
            const g = JSON.parse(localStorage.getItem(GRID_STORAGE_KEY) ?? "null")
            if (g && typeof g.maxWidth === "number") setMaxWidth(g.maxWidth)
        } catch {}
    }, [])

    React.useEffect(() => {
        if (!gridSaveReady.current) { gridSaveReady.current = true; return }
        localStorage.setItem(GRID_STORAGE_KEY, JSON.stringify({ maxWidth }))
    }, [maxWidth])

    React.useEffect(() => {
        function onInspected(e: Event) {
            const { cssVars } = (e as CustomEvent).detail as { cssVars: Record<string, string> }
            setCustomVars(cssVars)
            setActiveTheme("Custom")
        }
        window.addEventListener("theme-inspected", onInspected)
        return () => window.removeEventListener("theme-inspected", onInspected)
    }, [])

    function handleThemeChange(name: ThemeName) {
        setActiveTheme(name)
        localStorage.setItem(STORAGE_KEY, name)
        applyTheme(name, name === "Custom" ? customVars ?? undefined : undefined)
    }

    function handleApply() {
        setAppliedGrid({ maxWidth })
    }

    function handleAddToCart() {
        if (!slug) return
        addItem({ id: slug, name: componentName, gridConfig: appliedGrid })
        setJustAdded(true)
        setTimeout(() => setJustAdded(false), 1500)
    }

    const isInCart = items.some((i) => i.id === slug)

    const controlsBar = (
        <div className="sticky top-0 z-40 shrink-0 flex items-center gap-4 border-b border-border bg-card px-6 py-2.5">

            {/* Sidebar toggle — first item */}
            <button
                onClick={toggle}
                title={collapsed ? "Abrir sidebar" : "Fechar sidebar"}
                className={cn(
                    "inline-flex items-center justify-center w-7 h-7 rounded border transition-colors",
                    collapsed
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border text-muted-foreground hover:text-foreground"
                )}
            >
                <PanelLeftIcon />
            </button>

            <div className="h-4 w-px bg-border" />

            {/* Theme toggle — Light, Dark, and Custom (when inspected) */}
            <div className="flex overflow-hidden rounded border border-border">
                {(customVars ? ["Light", "Dark", "Custom"] as ThemeName[] : ["Light", "Dark"] as ThemeName[]).map((name, i) => (
                    <button
                        key={name}
                        onClick={() => handleThemeChange(name)}
                        className={cn(
                            "px-3 py-1 text-xs font-medium transition-colors",
                            i > 0 && "border-l border-border",
                            activeTheme === name
                                ? "bg-primary/10 text-primary"
                                : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                        )}
                    >
                        {name}
                    </button>
                ))}
            </div>

            <div className="h-4 w-px bg-border" />

            {/* Content area width */}
            <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Content area</span>
                <select
                    value={maxWidth}
                    onChange={(e) => setMaxWidth(Number(e.target.value))}
                    className="rounded border border-border bg-background px-2 py-1 text-xs text-foreground focus:outline-none"
                >
                    {WIDTH_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                </select>
            </div>

            {/* Salvar config para o carrinho */}
            <button
                onClick={handleApply}
                title="Salva as configurações atuais para exportação"
                className="inline-flex items-center rounded border border-border px-3 py-1 text-xs font-medium text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            >
                Salvar
            </button>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Add to cart button */}
            {slug && (
                <button
                    onClick={handleAddToCart}
                    className={cn(
                        "inline-flex items-center gap-1.5 rounded border px-3 py-1 text-xs font-medium transition-colors",
                        justAdded
                            ? "border-primary bg-primary/10 text-primary"
                            : isInCart
                                ? "border-primary/50 bg-primary/5 text-primary/80 hover:bg-primary/10"
                                : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                    )}
                >
                    <BagIcon />
                    {justAdded ? "Adicionado!" : isInCart ? "Atualizar" : "Adicionar"}
                </button>
            )}

            {/* Cart icon with item count badge */}
            <Link
                href="/styleguide/cart"
                className="relative inline-flex items-center justify-center w-8 h-8 rounded border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
            >
                <BagIcon />
                {items.length > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold text-primary-foreground">
                        {items.length}
                    </span>
                )}
            </Link>
        </div>
    )

    // Content area: max-width constrains the component to the specified content area width.
    // Centering simulates how the component sits inside a product layout (sidebar + content area).
    const content = (
        <div
            style={{
                width: "100%",
                maxWidth: maxWidth === 0 ? "none" : `${maxWidth}px`,
                marginLeft: "auto",
                marginRight: "auto",
            }}
        >
            {children}
        </div>
    )

    if (frame) {
        return (
            <div className="flex h-screen flex-col overflow-hidden">
                {controlsBar}
                <div className="flex flex-1 overflow-hidden">
                    <SidebarOpen />
                    <main className="flex-1 overflow-y-auto">
                        {content}
                    </main>
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col">
            {controlsBar}
            {content}
        </div>
    )
}
