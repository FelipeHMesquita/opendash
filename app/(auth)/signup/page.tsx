"use client"

import * as React from "react"
import Link from "next/link"
import { useAuth } from "@/app/_auth-context"
import { useRouter } from "next/navigation"

export default function SignupPage() {
    const { signUp } = useAuth()
    const router = useRouter()
    const [name, setName] = React.useState("")
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [confirm, setConfirm] = React.useState("")
    const [error, setError] = React.useState("")
    const [loading, setLoading] = React.useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")

        if (password !== confirm) {
            setError("As senhas não coincidem")
            return
        }
        if (password.length < 6) {
            setError("A senha deve ter pelo menos 6 caracteres")
            return
        }

        setLoading(true)
        try {
            await signUp(email, password, name || undefined)
            router.replace("/")
        } catch (err) {
            setError(err instanceof Error ? err.message : "Erro ao criar conta")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="rounded-xl border border-border bg-card p-8 shadow-lg">
            <div className="mb-6 text-center">
                <h1 className="text-xl font-semibold text-foreground">Criar conta</h1>
                <p className="mt-1 text-sm text-muted-foreground">
                    Comece a montar seus dashboards
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-foreground">
                        Nome
                    </label>
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        placeholder="Seu nome"
                    />
                </div>

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
                        placeholder="Mínimo 6 caracteres"
                    />
                </div>

                <div>
                    <label htmlFor="confirm" className="mb-1.5 block text-sm font-medium text-foreground">
                        Confirmar senha
                    </label>
                    <input
                        id="confirm"
                        type="password"
                        required
                        value={confirm}
                        onChange={e => setConfirm(e.target.value)}
                        className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        placeholder="Repita a senha"
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
                    {loading ? "Criando..." : "Criar conta"}
                </button>
            </form>

            <p className="mt-6 text-center text-sm text-muted-foreground">
                Já tem conta?{" "}
                <Link href="/login" className="font-medium text-primary hover:underline">
                    Entrar
                </Link>
            </p>
        </div>
    )
}
