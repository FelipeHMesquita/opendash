"use client"

import * as React from "react"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
type LoginConfig = {
    heading: string
    subtext: string
    subtextLink: string
    emailLabel: string
    passwordLabel: string
    forgotLabel: string
    submitLabel: string
    googleLabel: string
    submitLinkPageId?: string | null
    googleLinkPageId?: string | null
    subtextLinkPageId?: string | null
    forgotLinkPageId?: string | null
}

type LoginPageProps = {
    config?: LoginConfig
}

const defaults: LoginConfig = {
    heading: "Entrar na sua conta",
    subtext: "Não tem uma conta?",
    subtextLink: "Criar conta",
    emailLabel: "Email",
    passwordLabel: "Senha",
    forgotLabel: "Esqueci minha senha",
    submitLabel: "Entrar",
    googleLabel: "Continuar com Google",
}

export function LoginPage({ config }: LoginPageProps = {}) {
    const c = { ...defaults, ...config }
    const [showPassword, setShowPassword] = React.useState(false)

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
                    <div className="space-y-1.5">
                        <Label htmlFor="email">{c.emailLabel}</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="seu@email.com"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="password">{c.passwordLabel}</Label>
                            <Button variant="link" className="h-auto p-0 text-xs text-muted-foreground">
                                {c.forgotLabel}
                            </Button>
                        </div>
                        <div className="relative">
                            <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
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
                    </div>

                    <Button className="w-full">
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
