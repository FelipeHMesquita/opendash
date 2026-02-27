"use client"

import * as React from "react"
import Link from "next/link"
import { useAuth } from "@/app/_auth-context"
import { useRouter } from "next/navigation"

export default function LoginPage() {
    const { signIn } = useAuth()
    const router = useRouter()
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [error, setError] = React.useState("")
    const [loading, setLoading] = React.useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        setLoading(true)
        try {
            await signIn(email, password)
            router.replace("/")
        } catch (err) {
            setError(err instanceof Error ? err.message : "Erro ao fazer login")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="rounded-xl border border-border bg-card p-8 shadow-lg">
            <div className="mb-6 text-center">
                <h1 className="text-xl font-semibold text-foreground">Entrar</h1>
                <p className="mt-1 text-sm text-muted-foreground">
                    Acesse seu workspace
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-foreground">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        required
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        placeholder="seu@email.com"
                    />
                </div>

                <div>
                    <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-foreground">
                        Senha
                    </label>
                    <input
                        id="password"
                        type="password"
                        required
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        placeholder="Sua senha"
                    />
                </div>

                {error && (
                    <p className="text-sm text-destructive">{error}</p>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
                >
                    {loading ? "Entrando..." : "Entrar"}
                </button>
            </form>

            <p className="mt-6 text-center text-sm text-muted-foreground">
                Não tem conta?{" "}
                <Link href="/signup" className="font-medium text-primary hover:underline">
                    Criar conta
                </Link>
            </p>
        </div>
    )
}
