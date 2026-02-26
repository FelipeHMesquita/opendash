"use client"

import * as React from "react"
import { FlaskConical, X, Plus, ImageIcon, Loader2, Check } from "lucide-react"

// ─── Types ────────────────────────────────────────────────────────────────────

interface InspectResult {
    hex: string
    themeName: string
}

// ─── Component ────────────────────────────────────────────────────────────────

export function ThemeInspectorButton({ label, className: btnClassName }: { label?: string; className?: string } = {}) {
    const [open, setOpen] = React.useState(false)
    const [logo, setLogo] = React.useState<File | null>(null)
    const [screenshots, setScreenshots] = React.useState<File[]>([])
    const [loading, setLoading] = React.useState(false)
    const [result, setResult] = React.useState<InspectResult | null>(null)
    const [error, setError] = React.useState<string | null>(null)
    const [isDragging, setIsDragging] = React.useState(false)

    const logoInputRef = React.useRef<HTMLInputElement>(null)
    const screenshotsInputRef = React.useRef<HTMLInputElement>(null)

    // Reset state when opening
    function handleOpen() {
        setResult(null)
        setError(null)
        setOpen(true)
    }

    function handleClose() {
        setOpen(false)
        setLoading(false)
    }

    function handleLogoChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0] ?? null
        setLogo(file)
        e.target.value = ""
    }

    function handleScreenshotsChange(e: React.ChangeEvent<HTMLInputElement>) {
        const files = Array.from(e.target.files ?? [])
        setScreenshots(prev => [...prev, ...files])
        e.target.value = ""
    }

    function removeScreenshot(index: number) {
        setScreenshots(prev => prev.filter((_, i) => i !== index))
    }

    function handleDragOver(e: React.DragEvent) {
        e.preventDefault()
        setIsDragging(true)
    }

    function handleDragLeave() {
        setIsDragging(false)
    }

    function handleDrop(e: React.DragEvent) {
        e.preventDefault()
        setIsDragging(false)
        const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith("image/"))
        setScreenshots(prev => [...prev, ...files])
    }

    async function handleSubmit() {
        if (screenshots.length === 0 && !logo) return
        setLoading(true)
        setError(null)

        const form = new FormData()
        if (logo) form.append("logo", logo)
        screenshots.forEach(f => form.append("screenshots", f))

        try {
            const res = await fetch("/api/inspect-theme", { method: "POST", body: form })

            // Guard: response might not be JSON (e.g. Next.js 500 HTML page)
            const contentType = res.headers.get("content-type") ?? ""
            if (!contentType.includes("application/json")) {
                setError(`Erro do servidor (${res.status}). Verifique se ANTHROPIC_API_KEY está configurada no .env.local.`)
                setLoading(false)
                return
            }

            const data = await res.json()

            if (!res.ok) {
                setError(data.error ?? "Erro ao analisar imagens")
                setLoading(false)
                return
            }

            // Apply CSS vars to root
            Object.entries(data.cssVars as Record<string, string>).forEach(([k, v]) => {
                document.documentElement.style.setProperty(k, v)
            })

            // Persist + notify ThemePreview
            localStorage.setItem("styleguide_inspected_vars", JSON.stringify(data.cssVars))
            window.dispatchEvent(new CustomEvent("theme-inspected", { detail: data }))

            setResult({ hex: data.hex, themeName: data.themeName })
        } catch (err) {
            const msg = err instanceof Error ? err.message : ""
            setError(msg || "Erro inesperado. Verifique o console para detalhes.")
        } finally {
            setLoading(false)
        }
    }

    const canSubmit = (screenshots.length > 0 || logo !== null) && !loading

    return (
        <>
            {/* Flask trigger button */}
            <button
                onClick={handleOpen}
                title="Inspecionar tema a partir de imagens"
                className={btnClassName ?? "inline-flex items-center justify-center rounded p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"}
            >
                <FlaskConical className="h-4 w-4" />
                {label && <span className="ml-1.5">{label}</span>}
            </button>

            {/* Modal */}
            {open && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
                    onClick={(e) => e.target === e.currentTarget && handleClose()}
                >
                    <div className="w-[480px] max-w-[90vw] rounded-lg border border-border bg-card shadow-xl">

                        {/* Header */}
                        <div className="flex items-center justify-between border-b border-border px-5 py-4">
                            <div className="flex items-center gap-2">
                                <FlaskConical className="h-4 w-4 text-primary" />
                                <span className="text-sm font-semibold text-foreground">Inspetor de Tema</span>
                            </div>
                            <button
                                onClick={handleClose}
                                className="inline-flex items-center justify-center rounded p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="space-y-5 p-5">

                            {result ? (
                                /* ── Success state ── */
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 rounded-lg border border-border bg-muted/40 p-4">
                                        <div
                                            className="h-10 w-10 shrink-0 rounded-full border border-border/50 shadow-sm"
                                            style={{ background: result.hex }}
                                        />
                                        <div>
                                            <div className="flex items-center gap-1.5">
                                                <Check className="h-3.5 w-3.5 text-emerald-400" />
                                                <span className="text-sm font-medium text-foreground">{result.themeName}</span>
                                            </div>
                                            <p className="mt-0.5 font-mono text-xs text-muted-foreground">{result.hex}</p>
                                        </div>
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        Todos os componentes foram atualizados com as cores extraídas. Use o seletor de tema no topbar para alternar entre Light, Dark e este tema.
                                    </p>
                                </div>
                            ) : (
                                /* ── Upload state ── */
                                <>
                                    <p className="text-xs text-muted-foreground">
                                        Envie prints de uma interface como inspiração. O sistema extrai a cor primária e gera os design tokens automaticamente.
                                    </p>

                                    {/* Logo input */}
                                    <div className="space-y-1.5">
                                        <span className="text-xs font-medium text-foreground">Logo da marca <span className="text-muted-foreground">(opcional)</span></span>
                                        {logo ? (
                                            <div className="flex items-center gap-2.5 rounded border border-border bg-muted/30 p-2.5">
                                                <img
                                                    src={URL.createObjectURL(logo)}
                                                    alt=""
                                                    className="h-8 w-8 rounded object-contain"
                                                />
                                                <span className="flex-1 truncate text-xs text-foreground">{logo.name}</span>
                                                <button
                                                    onClick={() => setLogo(null)}
                                                    className="shrink-0 text-muted-foreground hover:text-foreground"
                                                >
                                                    <X className="h-3.5 w-3.5" />
                                                </button>
                                            </div>
                                        ) : (
                                            <button
                                                onClick={() => logoInputRef.current?.click()}
                                                className="flex w-full items-center gap-2 rounded border border-dashed border-border px-4 py-2.5 text-xs text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                                            >
                                                <Plus className="h-3.5 w-3.5" />
                                                Enviar logo (PNG, SVG, JPG)
                                            </button>
                                        )}
                                        <input
                                            ref={logoInputRef}
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={handleLogoChange}
                                        />
                                    </div>

                                    {/* Screenshots dropzone */}
                                    <div className="space-y-1.5">
                                        <span className="text-xs font-medium text-foreground">Prints da interface</span>
                                        <div
                                            onDragOver={handleDragOver}
                                            onDragLeave={handleDragLeave}
                                            onDrop={handleDrop}
                                            onClick={() => screenshotsInputRef.current?.click()}
                                            className={`flex min-h-[108px] cursor-pointer flex-col items-center justify-center gap-2 rounded border-2 border-dashed p-6 text-xs transition-colors ${
                                                isDragging
                                                    ? "border-primary bg-primary/5 text-primary"
                                                    : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                                            }`}
                                        >
                                            <ImageIcon className="h-6 w-6 opacity-40" />
                                            <span>Arraste prints ou clique para selecionar</span>
                                            <span className="text-[10px] opacity-60">PNG, JPG, WEBP · múltiplos arquivos</span>
                                        </div>
                                        <input
                                            ref={screenshotsInputRef}
                                            type="file"
                                            accept="image/*"
                                            multiple
                                            className="hidden"
                                            onChange={handleScreenshotsChange}
                                        />

                                        {/* Thumbnails */}
                                        {screenshots.length > 0 && (
                                            <div className="flex flex-wrap gap-1.5 pt-1">
                                                {screenshots.map((f, i) => (
                                                    <div
                                                        key={i}
                                                        className="group relative h-12 w-12 overflow-hidden rounded border border-border"
                                                    >
                                                        <img
                                                            src={URL.createObjectURL(f)}
                                                            alt=""
                                                            className="h-full w-full object-cover"
                                                        />
                                                        <button
                                                            onClick={(e) => { e.stopPropagation(); removeScreenshot(i) }}
                                                            className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center bg-black/60 text-white opacity-0 transition-opacity group-hover:opacity-100"
                                                        >
                                                            <X className="h-2.5 w-2.5" />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    {/* Error */}
                                    {error && (
                                        <p className="rounded border border-rose-500/20 bg-rose-500/10 px-3 py-2 text-xs text-rose-400">
                                            {error}
                                        </p>
                                    )}
                                </>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-end gap-2 border-t border-border px-5 py-4">
                            {result ? (
                                <>
                                    <button
                                        onClick={() => setResult(null)}
                                        className="rounded border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
                                    >
                                        Inspecionar novamente
                                    </button>
                                    <button
                                        onClick={handleClose}
                                        className="rounded bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition-opacity hover:opacity-90"
                                    >
                                        Fechar
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button
                                        onClick={handleClose}
                                        className="rounded border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        onClick={handleSubmit}
                                        disabled={!canSubmit}
                                        className="inline-flex items-center gap-1.5 rounded bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
                                    >
                                        {loading && <Loader2 className="h-3 w-3 animate-spin" />}
                                        {loading ? "Analisando..." : "Analisar"}
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
