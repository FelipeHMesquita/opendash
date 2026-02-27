"use client"

import * as React from "react"
import { Info, AlertCircle, Rocket, Bell, Zap, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarBadge, AvatarGroup, AvatarGroupCount } from "@/components/ui/avatar"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

// ─── Section wrapper ──────────────────────────────────────────────────────────

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <section className="space-y-4">
            <h3 className="text-xs/6 font-medium uppercase tracking-widest text-muted-foreground/70">
                {title}
            </h3>
            {children}
        </section>
    )
}

// ─── Component ───────────────────────────────────────────────────────────────

export function UIShowcase() {
    const [sw1, setSw1] = React.useState(true)
    const [sw2, setSw2] = React.useState(false)
    const [radio, setRadio] = React.useState("b")

    return (
        <div className="w-full p-8 space-y-10">

            {/* Header */}
            <div>
                <h2 className="text-lg/7 font-semibold text-foreground">Galeria de componentes</h2>
                <p className="text-sm/6 text-muted-foreground">Todos os primitivos do design system aplicados ao tema.</p>
            </div>

            {/* ── Button ── */}
            <Section title="Button — variantes e tamanhos">
                <div className="flex flex-wrap items-center gap-3">
                    <Button>Default</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="destructive">Destructive</Button>
                    <Button variant="link">Link</Button>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                    <Button size="lg"><Rocket />Large</Button>
                    <Button size="default">Default</Button>
                    <Button size="sm">Small</Button>
                    <Button size="xs">XSmall</Button>
                    <Button size="icon"><Bell /></Button>
                    <Button size="icon-sm" variant="outline"><Star /></Button>
                    <Button disabled>Disabled</Button>
                </div>
            </Section>

            {/* ── Badge ── */}
            <Section title="Badge — variantes">
                <div className="flex flex-wrap items-center gap-2">
                    <Badge>Default</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="outline">Outline</Badge>
                    <Badge variant="destructive">Destructive</Badge>
                    <Badge variant="ghost">Ghost</Badge>
                    <Badge className="bg-success/10 text-success border-success/20">Ativo</Badge>
                    <Badge className="bg-warning/10 text-warning border-warning/20">Pendente</Badge>
                    <Badge className="bg-info/10 text-info border-info/20">
                        <Zap className="size-3" />
                        Pro
                    </Badge>
                </div>
            </Section>

            {/* ── Alert ── */}
            <Section title="Alert">
                <Alert>
                    <Info />
                    <AlertTitle>Informação</AlertTitle>
                    <AlertDescription>
                        Sua conta está configurada e pronta para uso. Explore todas as funcionalidades disponíveis.
                    </AlertDescription>
                </Alert>
                <Alert variant="destructive">
                    <AlertCircle />
                    <AlertTitle>Erro de autenticação</AlertTitle>
                    <AlertDescription>
                        Não foi possível verificar suas credenciais. Tente novamente ou redefina sua senha.
                    </AlertDescription>
                </Alert>
            </Section>

            {/* ── Avatar ── */}
            <Section title="Avatar — tamanhos, badge e grupo">
                <div className="flex flex-wrap items-center gap-6">
                    {/* Sizes */}
                    <div className="flex items-end gap-3">
                        {(["sm", "default", "lg"] as const).map(size => (
                            <Avatar key={size} size={size}>
                                <AvatarFallback>AB</AvatarFallback>
                            </Avatar>
                        ))}
                    </div>

                    {/* With online badge */}
                    <Avatar size="lg">
                        <AvatarFallback>CM</AvatarFallback>
                        <AvatarBadge className="bg-success" />
                    </Avatar>

                    {/* Group */}
                    <AvatarGroup>
                        {["AL", "BK", "CS", "DM"].map(i => (
                            <Avatar key={i} size="default">
                                <AvatarFallback>{i}</AvatarFallback>
                            </Avatar>
                        ))}
                        <AvatarGroupCount>+5</AvatarGroupCount>
                    </AvatarGroup>
                </div>
            </Section>

            {/* ── Input & Label ── */}
            <Section title="Input & Label">
                <div className="grid max-w-lg grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="show-name">Nome</Label>
                        <Input id="show-name" placeholder="Felipe Mesquita" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="show-email">Email</Label>
                        <Input id="show-email" type="email" placeholder="felipe@empresa.com" />
                    </div>
                    <div className="col-span-2 space-y-2">
                        <Label htmlFor="show-disabled">Campo desabilitado</Label>
                        <Input id="show-disabled" disabled value="Não editável" />
                    </div>
                </div>
            </Section>

            {/* ── Switch ── */}
            <Section title="Switch">
                <div className="flex flex-col gap-3 max-w-xs">
                    {[
                        { id: "sw1", label: "Notificações ativas", checked: sw1, onChange: setSw1 },
                        { id: "sw2", label: "Modo manutenção",    checked: sw2, onChange: setSw2 },
                    ].map(s => (
                        <div key={s.id} className="flex items-center justify-between">
                            <Label htmlFor={s.id} className="font-normal">{s.label}</Label>
                            <Switch id={s.id} checked={s.checked} onCheckedChange={s.onChange} />
                        </div>
                    ))}
                </div>
            </Section>

            {/* ── Radio ── */}
            <Section title="RadioGroup">
                <RadioGroup value={radio} onValueChange={setRadio} className="max-w-xs gap-2">
                    {[
                        { value: "a", label: "Plano Starter — R$ 0/mês" },
                        { value: "b", label: "Plano Pro — R$ 89/mês"    },
                        { value: "c", label: "Plano Enterprise — Custom" },
                    ].map(opt => (
                        <div key={opt.value} className="flex items-center gap-3">
                            <RadioGroupItem value={opt.value} id={`r-${opt.value}`} />
                            <Label htmlFor={`r-${opt.value}`} className="font-normal cursor-pointer">
                                {opt.label}
                            </Label>
                        </div>
                    ))}
                </RadioGroup>
            </Section>

            {/* ── Tabs ── */}
            <Section title="Tabs — default e line">
                <div className="space-y-6">
                    <Tabs defaultValue="tab1">
                        <TabsList>
                            <TabsTrigger value="tab1">Visão geral</TabsTrigger>
                            <TabsTrigger value="tab2">Análise</TabsTrigger>
                            <TabsTrigger value="tab3">Relatórios</TabsTrigger>
                        </TabsList>
                        <TabsContent value="tab1">
                            <p className="text-sm text-muted-foreground pt-2">Conteúdo da aba Visão geral.</p>
                        </TabsContent>
                        <TabsContent value="tab2">
                            <p className="text-sm text-muted-foreground pt-2">Conteúdo da aba Análise.</p>
                        </TabsContent>
                        <TabsContent value="tab3">
                            <p className="text-sm text-muted-foreground pt-2">Conteúdo da aba Relatórios.</p>
                        </TabsContent>
                    </Tabs>

                    <Tabs defaultValue="tab1">
                        <TabsList variant="line">
                            <TabsTrigger value="tab1">Visão geral</TabsTrigger>
                            <TabsTrigger value="tab2">Análise</TabsTrigger>
                            <TabsTrigger value="tab3">Relatórios</TabsTrigger>
                        </TabsList>
                        <TabsContent value="tab1">
                            <p className="text-sm text-muted-foreground pt-2">Variante line — sem fundo no container.</p>
                        </TabsContent>
                        <TabsContent value="tab2">
                            <p className="text-sm text-muted-foreground pt-2">Conteúdo da aba Análise.</p>
                        </TabsContent>
                        <TabsContent value="tab3">
                            <p className="text-sm text-muted-foreground pt-2">Conteúdo da aba Relatórios.</p>
                        </TabsContent>
                    </Tabs>
                </div>
            </Section>

            {/* ── Card ── */}
            <Section title="Card">
                <div className="grid max-w-2xl grid-cols-2 gap-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Card padrão</CardTitle>
                            <CardDescription>Com header, título e descrição.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">Conteúdo do card. Pode incluir qualquer elemento.</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Com badge no header</CardTitle>
                            <CardDescription>Usando Badge como complemento visual.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">Status</span>
                                <Badge className="bg-success/10 text-success border-success/20">Ativo</Badge>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">Plano</span>
                                <Badge variant="outline">Pro</Badge>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </Section>

        </div>
    )
}
