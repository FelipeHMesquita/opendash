"use client"

import * as React from "react"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { SignUpConfig } from "@/app/_builder-state"

type SignUpPageProps = {
    config?: SignUpConfig
}

// ─── Password strength ────────────────────────────────────────────────────────

function getStrength(password: string): { score: number; label: string; color: string } {
    if (!password) return { score: 0, label: "", color: "" }
    let score = 0
    if (password.length >= 8)  score++
    if (password.length >= 12) score++
    if (/[A-Z]/.test(password)) score++
    if (/[0-9]/.test(password)) score++
    if (/[^A-Za-z0-9]/.test(password)) score++

    if (score <= 1) return { score: 1, label: "Fraca",  color: "bg-destructive" }
    if (score <= 3) return { score: 3, label: "Média",  color: "bg-warning" }
    return              { score: 5, label: "Forte",  color: "bg-success" }
}

// ─── Defaults ─────────────────────────────────────────────────────────────────

const defaults: SignUpConfig = {
    heading: "Criar sua conta",
    subtext: "Já tem uma conta?",
    subtextLink: "Entrar",
    nameLabel: "Nome completo",
    emailLabel: "Email",
    passwordLabel: "Senha",
    termsText: "Concordo com os",
    termsLink: "Termos de uso",
    privacyLink: "Política de privacidade",
    submitLabel: "Criar conta",
    googleLabel: "Continuar com Google",
}

// ─── Component ────────────────────────────────────────────────────────────────

export function SignUpPage({ config }: SignUpPageProps = {}) {
    const c = { ...defaults, ...config }
    const [showPassword, setShowPassword] = React.useState(false)
    const [password, setPassword] = React.useState("")
    const [agreed, setAgreed] = React.useState(false)

    const strength = getStrength(password)

    return (
        <div className="w-full p-8">
            <div className="w-full max-w-sm mx-auto space-y-4">

                {/* Heading */}
                <div className="text-center">
                    <h1 className="text-xl font-semibold text-foreground">{c.heading}</h1>
                    <p className="mt-2 text-sm text-muted-foreground">
                        {c.subtext}{" "}
                        <Button variant="link" className="h-auto p-0 text-sm font-medium">
                            {c.subtextLink}
                        </Button>
                    </p>
                </div>

                {/* Form */}
                <div className="space-y-4">

                    {/* Name */}
                    <div className="space-y-1.5">
                        <Label htmlFor="name">{c.nameLabel}</Label>
                        <Input
                            id="name"
                            type="text"
                            placeholder="João da Silva"
                        />
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                        <Label htmlFor="email">{c.emailLabel}</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="seu@email.com"
                        />
                    </div>

                    {/* Password + strength */}
                    <div className="space-y-1.5">
                        <Label htmlFor="password">{c.passwordLabel}</Label>
                        <div className="relative">
                            <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Mín. 8 caracteres"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="pr-10"
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon-sm"
                                onClick={() => setShowPassword(v => !v)}
                                className="absolute right-1.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                            >
                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button>
                        </div>

                        {/* Strength indicator */}
                        {password.length > 0 && (
                            <div className="space-y-1">
                                <div className="flex gap-1">
                                    {[1, 2, 3, 4, 5].map((step) => (
                                        <div
                                            key={step}
                                            className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                                                step <= strength.score ? strength.color : "bg-muted"
                                            }`}
                                        />
                                    ))}
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Força da senha: <span className="font-medium text-foreground">{strength.label}</span>
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Terms */}
                    <div className="flex items-start gap-2.5 pt-1">
                        <input
                            id="terms"
                            type="checkbox"
                            checked={agreed}
                            onChange={(e) => setAgreed(e.target.checked)}
                            className="mt-0.5 h-4 w-4 shrink-0 rounded border-border accent-primary"
                        />
                        <Label htmlFor="terms" className="text-xs font-normal leading-relaxed text-muted-foreground cursor-pointer">
                            {c.termsText}{" "}
                            <Button variant="link" className="h-auto p-0 text-xs font-medium">
                                {c.termsLink}
                            </Button>{" "}
                            e a{" "}
                            <Button variant="link" className="h-auto p-0 text-xs font-medium">
                                {c.privacyLink}
                            </Button>
                        </Label>
                    </div>

                    {/* Submit */}
                    <Button className="w-full" disabled={!agreed}>
                        {c.submitLabel}
                    </Button>

                    <div className="relative flex items-center gap-3">
                        <div className="flex-1 border-t border-border" />
                        <span className="text-xs text-muted-foreground">ou</span>
                        <div className="flex-1 border-t border-border" />
                    </div>

                    <Button variant="outline" className="w-full">
                        {c.googleLabel}
                    </Button>
                </div>

            </div>
        </div>
    )
}
