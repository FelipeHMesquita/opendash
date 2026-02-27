"use client"

import * as React from "react"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function LoginPage() {
    const [showPassword, setShowPassword] = React.useState(false)

    return (
        <div className="flex h-full w-full items-center justify-center bg-background px-4">
            <div className="w-full max-w-sm">

                {/* Logo */}
                <div className="mb-8 flex justify-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
                        <span className="text-sm font-bold text-primary-foreground">C</span>
                    </div>
                </div>

                {/* Heading */}
                <div className="mb-8 text-center">
                    <h1 className="text-xl font-semibold text-foreground">Entrar na sua conta</h1>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Não tem uma conta?{" "}
                        <Button variant="link" className="h-auto p-0 text-sm font-medium">
                            Criar conta
                        </Button>
                    </p>
                </div>

                {/* Form */}
                <div className="space-y-4">
                    <div className="space-y-1.5">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="seu@email.com"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="password">Senha</Label>
                            <Button variant="link" className="h-auto p-0 text-xs text-muted-foreground">
                                Esqueci minha senha
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
                        Entrar
                    </Button>

                    <div className="relative flex items-center gap-3">
                        <div className="flex-1 border-t border-border" />
                        <span className="text-xs text-muted-foreground">ou</span>
                        <div className="flex-1 border-t border-border" />
                    </div>

                    <Button variant="outline" className="w-full">
                        Continuar com Google
                    </Button>
                </div>

            </div>
        </div>
    )
}
