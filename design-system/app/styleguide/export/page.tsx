"use client"

import * as React from "react"
import Link from "next/link"
import { ChevronDown, Copy, Check, Loader2 } from "lucide-react"
import { useCart } from "../_cart-context"
import { componentRegistry } from "../_component-registry"

// ─── Theme block builder ──────────────────────────────────────────────────────

function buildThemeBlock(name: string, vars: Record<string, string>): string {
    const lines = Object.entries(vars)
        .map(([k, v]) => `  ${k}: ${v};`)
        .join("\n")
    return `/* Theme: ${name} */\n:root {\n${lines}\n}`
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Extract all component filenames from an importStatement */
function extractFilenames(importStatement: string): string[] {
    const matches = [...importStatement.matchAll(/@\/componentsSugest\/([^\s"']+)/g)]
    return matches.map((m) => m[1])
}

/** Fetch source for one or more files, joining them with a separator */
async function fetchSources(filenames: string[]): Promise<string> {
    const parts = await Promise.all(
        filenames.map(async (file) => {
            const res = await fetch(`/api/component-source?file=${file}`)
            if (!res.ok) return `// Source not available for ${file}.tsx`
            const data = await res.json()
            return filenames.length > 1
                ? `// ── ${file}.tsx ${"─".repeat(Math.max(0, 56 - file.length))}\n\n${data.source}`
                : data.source
        })
    )
    return parts.join("\n\n")
}

/**
 * Build a usage snippet showing how to import and wrap the component
 * with the content area width that was configured during preview.
 */
function buildUsageSnippet(importStatement: string, maxWidth: number): string {
    const imports = importStatement.split("\n").flatMap(line => {
        const m = line.match(/import \{ (\w+) \} from "@\/componentsSugest\/([^\s"']+)"/)
        return m ? [{ name: m[1], file: m[2] }] : []
    })

    const importLines = imports.map(i => `import { ${i.name} } from "./${i.file}"`).join("\n")
    const jsxLines = imports.map(i => `      <${i.name} />`).join("\n")

    if (maxWidth === 0) {
        // Full width — no wrapper needed
        const jsx = imports.length === 1
            ? `  return <${imports[0].name} />`
            : `  return (\n    <>\n${jsxLines}\n    </>`
        return `${importLines}\n\nexport default function Page() {\n${jsx}\n}`
    }

    return `${importLines}\n\nexport default function Page() {\n  return (\n    <div style={{ maxWidth: "${maxWidth}px", margin: "0 auto" }}>\n${jsxLines}\n    </div>\n  )\n}`
}

// ─── Copy button ─────────────────────────────────────────────────────────────

function CopyButton({ text }: { text: string }) {
    const [copied, setCopied] = React.useState(false)

    function handleCopy() {
        navigator.clipboard.writeText(text).then(() => {
            setCopied(true)
            setTimeout(() => setCopied(false), 1500)
        })
    }

    return (
        <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        >
            {copied
                ? <Check className="h-3.5 w-3.5 text-emerald-400" />
                : <Copy className="h-3.5 w-3.5" />
            }
            {copied ? "Copiado" : "Copiar"}
        </button>
    )
}

// ─── Code block ──────────────────────────────────────────────────────────────

function CodeBlock({ label, code }: { label: string; code: string }) {
    return (
        <div className="border-t border-border">
            <div className="flex items-center justify-between border-b border-border bg-muted/40 px-5 py-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {label}
                </span>
                <CopyButton text={code} />
            </div>
            <pre className="overflow-x-auto bg-muted px-5 py-4 text-xs leading-relaxed text-foreground">
                <code>{code}</code>
            </pre>
        </div>
    )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ExportPage() {
    const { items, clearCart } = useCart()
    const [openIds, setOpenIds] = React.useState<Set<string>>(new Set())
    const [sources, setSources] = React.useState<Record<string, string>>({})
    const [loadingIds, setLoadingIds] = React.useState<Set<string>>(new Set())

    function toggle(id: string, importStatement: string) {
        setOpenIds((prev) => {
            const next = new Set(prev)
            if (next.has(id)) {
                next.delete(id)
            } else {
                next.add(id)
                if (!sources[id]) {
                    setLoadingIds((l) => new Set([...l, id]))
                    const filenames = extractFilenames(importStatement)
                    fetchSources(filenames).then((source) => {
                        setSources((s) => ({ ...s, [id]: source }))
                        setLoadingIds((l) => {
                            const next2 = new Set(l)
                            next2.delete(id)
                            return next2
                        })
                    })
                }
            }
            return next
        })
    }

    if (items.length === 0) {
        return (
            <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
                <p className="text-sm font-medium text-foreground">Nenhum componente selecionado</p>
                <p className="text-xs text-muted-foreground">
                    Volte ao carrinho e adicione componentes antes de exportar.
                </p>
                <Link
                    href="/styleguide/cart"
                    className="inline-flex items-center rounded border border-border px-4 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                    ← Voltar ao carrinho
                </Link>
            </div>
        )
    }

    const uniqueSpecs = Array.from(
        new Map(items.map((item) => [`${item.gridConfig.maxWidth ?? 0}`, item.gridConfig])).values()
    )

    // Deduplicate themes by name, preserving first-seen order
    const uniqueThemes = Array.from(
        new Map(
            items
                .filter((item) => item.theme)
                .map((item) => [item.theme.name, item.theme])
        ).values()
    )

    return (
        <div className="mx-auto max-w-4xl px-6 py-10">

            {/* Header */}
            <div className="mb-6 flex items-start justify-between">
                <div>
                    <h1 className="text-lg/7 font-semibold text-foreground">Exportação</h1>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                        {items.length} {items.length === 1 ? "componente" : "componentes"} · clique para ver o código
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Link
                        href="/styleguide/cart"
                        className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                    >
                        ← Editar seleção
                    </Link>
                    <button
                        onClick={clearCart}
                        className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                    >
                        Limpar
                    </button>
                </div>
            </div>

            {/* Theme tokens */}
            {uniqueThemes.length > 0 && (
                <div className="mb-6 overflow-hidden rounded-lg border border-border">
                    {uniqueThemes.map((t) => (
                        <CodeBlock
                            key={t.name}
                            label={`globals.css · tema ${t.name}`}
                            code={buildThemeBlock(t.name, t.vars)}
                        />
                    ))}
                </div>
            )}

            {/* Grid specs banner */}
            <div className="mb-8 rounded-lg border border-amber-200 bg-amber-50 px-5 py-4 dark:border-amber-900/50 dark:bg-amber-950/30">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                    Especificações de grid — configure no seu projeto
                </p>
                <p className="mb-3 text-xs text-amber-700/80 dark:text-amber-400/80">
                    Para que os componentes se comportem corretamente, seu sistema de layout deve respeitar
                    as seguintes configurações de grid:
                </p>
                <div className="flex flex-col gap-2">
                    {uniqueSpecs.map((spec, i) => (
                        <span key={i} className="w-fit rounded bg-amber-100 px-2 py-0.5 font-mono text-xs text-amber-800 dark:bg-amber-900/50 dark:text-amber-300">
                            {(spec.maxWidth ?? 0) === 0
                                ? "content area livre (Full)"
                                : `content area ${spec.maxWidth}px`}
                        </span>
                    ))}
                </div>
            </div>

            {/* Component list */}
            <div className="flex flex-col divide-y divide-border overflow-hidden rounded-lg border border-border">
                {items.map((item) => {
                    const entry = componentRegistry[item.id]
                    const { maxWidth = 0 } = item.gridConfig
                    const isOpen = openIds.has(item.id)
                    const isLoading = loadingIds.has(item.id)
                    const source = sources[item.id]
                    const importStatement = entry?.importStatement ?? ""
                    const usageSnippet = buildUsageSnippet(importStatement, maxWidth)

                    return (
                        <div key={item.id} className="bg-card">
                            {/* Row */}
                            <button
                                onClick={() => toggle(item.id, importStatement)}
                                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-accent/40"
                            >
                                <div className="flex items-center gap-3 min-w-0">
                                    <span className="text-sm font-medium text-foreground truncate">{item.name}</span>
                                    <span className="shrink-0 rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                                        {maxWidth === 0 ? "Full" : `${maxWidth}px`}
                                    </span>
                                </div>
                                {isLoading
                                    ? <Loader2 className="h-4 w-4 shrink-0 animate-spin text-muted-foreground" />
                                    : <ChevronDown className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                                }
                            </button>

                            {/* Expanded: usage + source */}
                            {isOpen && (
                                <>
                                    <CodeBlock
                                        label={`Uso · content area ${maxWidth === 0 ? "Full" : `${maxWidth}px`}`}
                                        code={usageSnippet}
                                    />
                                    {source && (
                                        <CodeBlock
                                            label="Código fonte"
                                            code={source}
                                        />
                                    )}
                                    {!source && !isLoading && (
                                        <div className="border-t border-border px-5 py-4">
                                            <p className="text-xs text-muted-foreground">Código fonte não disponível.</p>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
