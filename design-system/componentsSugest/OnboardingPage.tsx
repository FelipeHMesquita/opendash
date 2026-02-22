"use client"

import * as React from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// ─── Data ────────────────────────────────────────────────────────────────────

const steps = [
    { id: 1, title: "Crie sua conta",         description: "Configure suas informações básicas" },
    { id: 2, title: "Configure o workspace",  description: "Personalize sua experiência"        },
    { id: 3, title: "Convide sua equipe",     description: "Colabore com seus colegas"          },
    { id: 4, title: "Pronto para começar",    description: "Explore todas as funcionalidades"   },
]

// ─── Component ───────────────────────────────────────────────────────────────

export function OnboardingPage() {
    const [currentStep, setCurrentStep] = React.useState(2)

    return (
        <div className="flex h-full w-full bg-background">

            {/* Left — steps sidebar */}
            <div className="hidden w-72 shrink-0 flex-col border-r border-border bg-card p-8 lg:flex">
                <div className="mb-10">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                        <span className="text-xs font-bold text-primary-foreground">C</span>
                    </div>
                    <h2 className="mt-6 text-sm font-semibold text-foreground">Configuração inicial</h2>
                    <p className="mt-1 text-xs text-muted-foreground">Complete as etapas para começar</p>
                </div>

                <nav className="flex flex-col gap-1">
                    {steps.map(step => {
                        const done = step.id < currentStep
                        const active = step.id === currentStep
                        return (
                            <Button
                                key={step.id}
                                variant="ghost"
                                onClick={() => setCurrentStep(step.id)}
                                className={cn(
                                    "h-auto justify-start gap-3 px-3 py-2.5 text-left",
                                    active ? "bg-accent hover:bg-accent" : ""
                                )}
                            >
                                <div className={cn(
                                    "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
                                    done   ? "bg-emerald-500 text-white" :
                                    active ? "bg-primary text-primary-foreground" :
                                             "border border-border text-muted-foreground"
                                )}>
                                    {done ? <Check className="h-3 w-3" /> : step.id}
                                </div>
                                <p className={cn("text-sm font-medium", active ? "text-foreground" : "text-muted-foreground")}>
                                    {step.title}
                                </p>
                            </Button>
                        )
                    })}
                </nav>

                {/* Progress */}
                <div className="mt-auto">
                    <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                        <div
                            className="h-full rounded-full bg-primary transition-all"
                            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
                        />
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">Etapa {currentStep} de {steps.length}</p>
                </div>
            </div>

            {/* Right — step content */}
            <main className="flex flex-1 flex-col items-center justify-center px-6 py-12">
                <div className="w-full max-w-lg space-y-6">

                    {currentStep === 1 && (
                        <>
                            <div>
                                <h1 className="text-2xl font-semibold text-foreground">Crie sua conta</h1>
                                <p className="mt-2 text-sm text-muted-foreground">Preencha suas informações básicas para começar.</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                {["Nome", "Sobrenome"].map(f => (
                                    <div key={f} className="space-y-1.5">
                                        <Label>{f}</Label>
                                        <Input />
                                    </div>
                                ))}
                            </div>
                            <div className="space-y-1.5">
                                <Label htmlFor="email">Email profissional</Label>
                                <Input id="email" type="email" placeholder="felipe@empresa.com" />
                            </div>
                        </>
                    )}

                    {currentStep === 2 && (
                        <>
                            <div>
                                <h1 className="text-2xl font-semibold text-foreground">Configure o workspace</h1>
                                <p className="mt-2 text-sm text-muted-foreground">Personalize como sua equipe vai usar a plataforma.</p>
                            </div>
                            <div className="space-y-1.5">
                                <Label htmlFor="workspace">Nome do workspace</Label>
                                <Input id="workspace" placeholder="Minha empresa" />
                            </div>
                            <div className="space-y-2">
                                <Label>Tipo de uso</Label>
                                {["Empresa B2B", "E-commerce", "SaaS / Software", "Agência"].map(opt => (
                                    <label key={opt} className="flex cursor-pointer items-center gap-3 rounded-md border border-border bg-card px-4 py-3 transition-colors hover:bg-accent">
                                        <input type="radio" name="type" className="accent-primary" />
                                        <span className="text-sm text-foreground">{opt}</span>
                                    </label>
                                ))}
                            </div>
                        </>
                    )}

                    {currentStep === 3 && (
                        <>
                            <div>
                                <h1 className="text-2xl font-semibold text-foreground">Convide sua equipe</h1>
                                <p className="mt-2 text-sm text-muted-foreground">Adicione o email dos seus colegas para colaborar.</p>
                            </div>
                            <div className="space-y-3">
                                {[1, 2, 3].map(i => (
                                    <Input key={i} type="email" placeholder={`email${i}@exemplo.com`} />
                                ))}
                            </div>
                        </>
                    )}

                    {currentStep === 4 && (
                        <>
                            <div>
                                <h1 className="text-2xl font-semibold text-foreground">Tudo pronto!</h1>
                                <p className="mt-2 text-sm text-muted-foreground">Seu workspace está configurado. Explore a plataforma.</p>
                            </div>
                            <div className="flex h-24 items-center justify-center rounded-lg border border-emerald-500/20 bg-emerald-500/5">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500">
                                        <Check className="h-4 w-4 text-white" />
                                    </div>
                                    <p className="text-sm font-medium text-foreground">Workspace criado com sucesso</p>
                                </div>
                            </div>
                        </>
                    )}

                    {/* Navigation */}
                    <div className="flex items-center justify-between pt-2">
                        <Button
                            variant="ghost"
                            onClick={() => setCurrentStep(v => Math.max(1, v - 1))}
                            disabled={currentStep === 1}
                            className="text-muted-foreground"
                        >
                            Voltar
                        </Button>
                        <Button
                            onClick={() => setCurrentStep(v => Math.min(steps.length, v + 1))}
                        >
                            {currentStep === steps.length ? "Ir para o painel" : "Próximo"}
                        </Button>
                    </div>

                </div>
            </main>
        </div>
    )
}
