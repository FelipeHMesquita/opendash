"use client"

import * as React from "react"
import { Send } from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

// ─── Component ───────────────────────────────────────────────────────────────

export function FormPage() {
    const [newsletter, setNewsletter] = React.useState(true)
    const [releases, setReleases] = React.useState(false)
    const [security, setSecurity] = React.useState(true)

    return (
        <div className="w-full p-6">

            {/* Header */}
            <div className="mb-6">
                <h2 className="text-lg/7 font-semibold text-foreground">Contato & Preferências</h2>
                <p className="text-sm/6 text-muted-foreground">Envie uma mensagem ou ajuste suas preferências de comunicação.</p>
            </div>

            <Tabs defaultValue="contato">
                <TabsList className="mb-6">
                    <TabsTrigger value="contato">Contato</TabsTrigger>
                    <TabsTrigger value="feedback">Feedback</TabsTrigger>
                    <TabsTrigger value="preferencias">Preferências</TabsTrigger>
                </TabsList>

                {/* ── Contato ── */}
                <TabsContent value="contato">
                    <Card>
                        <CardHeader>
                            <CardTitle>Envie uma mensagem</CardTitle>
                            <CardDescription>Responderemos em até 24 horas úteis.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Nome</Label>
                                    <Input id="name" placeholder="Seu nome" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" type="email" placeholder="email@empresa.com" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="subject">Assunto</Label>
                                <Input id="subject" placeholder="Como podemos ajudar?" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="message">Mensagem</Label>
                                <textarea
                                    id="message"
                                    rows={5}
                                    placeholder="Descreva sua dúvida ou solicitação..."
                                    className="w-full rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background resize-none"
                                />
                            </div>
                        </CardContent>
                        <CardFooter className="justify-end">
                            <Button>
                                <Send />
                                Enviar mensagem
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>

                {/* ── Feedback ── */}
                <TabsContent value="feedback">
                    <Card>
                        <CardHeader>
                            <CardTitle>Avalie sua experiência</CardTitle>
                            <CardDescription>Sua opinião nos ajuda a melhorar a plataforma.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-3">
                                <Label>Como você classifica a plataforma?</Label>
                                <RadioGroup defaultValue="bom" className="gap-2">
                                    {[
                                        { value: "excelente", label: "Excelente — superou as expectativas" },
                                        { value: "bom",       label: "Bom — atende bem às necessidades"   },
                                        { value: "regular",   label: "Regular — pode melhorar"            },
                                        { value: "ruim",      label: "Ruim — não atendeu as expectativas" },
                                    ].map(opt => (
                                        <div key={opt.value} className="flex items-center gap-3">
                                            <RadioGroupItem value={opt.value} id={opt.value} />
                                            <Label htmlFor={opt.value} className="font-normal cursor-pointer">
                                                {opt.label}
                                            </Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="comments">O que poderíamos melhorar?</Label>
                                <textarea
                                    id="comments"
                                    rows={4}
                                    placeholder="Sua sugestão..."
                                    className="w-full rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background resize-none"
                                />
                            </div>
                        </CardContent>
                        <CardFooter className="justify-end">
                            <Button>
                                <Send />
                                Enviar feedback
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>

                {/* ── Preferências ── */}
                <TabsContent value="preferencias">
                    <Card>
                        <CardHeader>
                            <CardTitle>Preferências de comunicação</CardTitle>
                            <CardDescription>Escolha quais notificações você quer receber por email.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="divide-y divide-border">
                                {[
                                    {
                                        id: "newsletter",
                                        label: "Newsletter semanal",
                                        desc: "Novidades, conteúdos e atualizações da plataforma.",
                                        checked: newsletter,
                                        onChange: setNewsletter,
                                    },
                                    {
                                        id: "releases",
                                        label: "Atualizações de produto",
                                        desc: "Seja o primeiro a saber sobre novos recursos lançados.",
                                        checked: releases,
                                        onChange: setReleases,
                                    },
                                    {
                                        id: "security",
                                        label: "Alertas de segurança",
                                        desc: "Notificações importantes sobre sua conta.",
                                        checked: security,
                                        onChange: setSecurity,
                                    },
                                ].map(pref => (
                                    <div key={pref.id} className="flex items-start justify-between gap-4 py-4">
                                        <div className="space-y-0.5">
                                            <p className="text-sm font-medium text-foreground">{pref.label}</p>
                                            <p className="text-xs text-muted-foreground">{pref.desc}</p>
                                        </div>
                                        <Switch
                                            checked={pref.checked}
                                            onCheckedChange={pref.onChange}
                                        />
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                        <CardFooter className="justify-end">
                            <Button>Salvar preferências</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>

        </div>
    )
}
