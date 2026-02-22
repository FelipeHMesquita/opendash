"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { generateLayout } from "@/lib/generateLayout"

// ─── Dark Neutro theme applied inline ────────────────────────────────────────

const theme: React.CSSProperties = {
    "--background":        "oklch(0.08 0 0)",
    "--foreground":        "oklch(0.97 0 0)",
    "--card":              "oklch(0.12 0 0)",
    "--card-foreground":   "oklch(0.97 0 0)",
    "--muted":             "oklch(0.18 0 0)",
    "--muted-foreground":  "oklch(0.60 0 0)",
    "--border":            "oklch(1 0 0 / 10%)",
    "--accent":            "oklch(0.20 0 0)",
    "--accent-foreground": "oklch(0.97 0 0)",
    "--primary":           "oklch(0.62 0.22 284)",
    "--primary-foreground":"oklch(1 0 0)",
    "--ring":              "oklch(0.62 0.22 284)",
} as React.CSSProperties

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CiteriiUIHome() {
    const router = useRouter()
    const [hex, setHex] = React.useState("#6366F1")
    const [description, setDescription] = React.useState("")
    const [loading, setLoading] = React.useState(false)
    const [hexError, setHexError] = React.useState("")

    function isValidHex(h: string) {
        return /^#[0-9A-Fa-f]{6}$/.test(h)
    }

    function handleHexInput(v: string) {
        const val = v.startsWith("#") ? v : "#" + v
        setHex(val)
        setHexError(val.length === 7 && !isValidHex(val) ? "Hex inválido" : "")
    }

    function handleColorPicker(v: string) {
        setHex(v)
        setHexError("")
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        if (!isValidHex(hex)) {
            setHexError("Informe um hex válido — ex: #3B82F6")
            return
        }
        if (!description.trim()) return

        setLoading(true)
        const config = generateLayout(hex, description)
        sessionStorage.setItem("citerii_layout", JSON.stringify(config))
        router.push("/preview")
    }

    const previewColor = isValidHex(hex) ? hex : "#555"

    return (
        <div
            className="min-h-screen bg-background text-foreground font-sans"
            style={theme}
        >
            <div className="flex min-h-screen flex-col items-center justify-center px-4 py-16">
                <div className="w-full max-w-lg">

                    {/* Brand */}
                    <div className="mb-10 text-center">
                        <h1 className="text-xl font-semibold tracking-tight text-foreground">
                            Citerii UI
                        </h1>
                        <p className="mt-3 text-sm/6 text-muted-foreground">
                            Informe a cor da sua marca e descreva o produto.<br />
                            Receba um layout completo gerado a partir da sua identidade visual.
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-3">

                        {/* Color input */}
                        <div className="rounded-lg border border-border bg-card p-5">
                            <label className="block text-xs/6 font-medium text-muted-foreground mb-3">
                                Cor dominante da marca
                            </label>
                            <div className="flex items-center gap-3">
                                {/* Live color preview swatch */}
                                <div
                                    className="h-10 w-10 shrink-0 rounded-md border border-border transition-colors"
                                    style={{ background: previewColor }}
                                />
                                {/* Hex text input */}
                                <input
                                    type="text"
                                    value={hex}
                                    onChange={(e) => handleHexInput(e.target.value)}
                                    placeholder="#3B82F6"
                                    maxLength={7}
                                    className="flex-1 rounded-md border border-border bg-background px-3 py-2 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                                />
                                {/* Native color picker */}
                                <input
                                    type="color"
                                    value={isValidHex(hex) ? hex : "#000000"}
                                    onChange={(e) => handleColorPicker(e.target.value)}
                                    className="h-10 w-10 shrink-0 cursor-pointer rounded-md border border-border bg-background p-0.5"
                                    title="Abrir color picker"
                                />
                            </div>
                            {hexError && (
                                <p className="mt-2 text-xs text-red-400">{hexError}</p>
                            )}
                        </div>

                        {/* Description input */}
                        <div className="rounded-lg border border-border bg-card p-5">
                            <label className="block text-xs/6 font-medium text-muted-foreground mb-3">
                                O que será essa ferramenta?
                            </label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Ex: Plataforma de analytics para times de marketing. Os usuários acompanham métricas de campanha e gerenciam membros da equipe."
                                rows={4}
                                className="w-full resize-none rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring"
                            />
                            <p className="mt-2 text-xs text-muted-foreground">
                                Descreva o tipo de dado que será gerenciado — dashboard, usuários, configurações…
                            </p>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading || !description.trim()}
                            className="w-full rounded-md bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {loading ? "Gerando layout…" : "Gerar layout"}
                        </button>

                    </form>

                    {/* Footer link to styleguide */}
                    <p className="mt-8 text-center text-xs text-muted-foreground">
                        <a
                            href="/styleguide"
                            className="hover:text-foreground transition-colors"
                        >
                            Ver styleguide →
                        </a>
                    </p>
                </div>
            </div>
        </div>
    )
}
