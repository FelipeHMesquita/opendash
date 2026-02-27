"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"
import { Toggle } from "@/components/ui/toggle"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Switch } from "@/components/ui/switch"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
    InputOTPSeparator,
} from "@/components/ui/input-otp"
import { Progress } from "@/components/ui/progress"

// ─── Form Controls Demo ─────────────────────────────────────────────────────

export function FormControlsDemo() {
    const [sliderVal, setSliderVal] = React.useState([65])
    const [progress, setProgress] = React.useState(45)

    React.useEffect(() => {
        const t = setInterval(() => setProgress(v => v >= 100 ? 0 : v + 5), 800)
        return () => clearInterval(t)
    }, [])

    return (
        <div className="w-full p-8">
            <div className="mb-6">
                <h2 className="text-lg font-semibold text-foreground">Controles de Formulário</h2>
                <p className="text-sm text-muted-foreground">Inputs, selects, toggles e controles interativos</p>
            </div>

            <div className="grid grid-cols-2 gap-6 max-w-3xl">
                {/* Checkbox group */}
                <div className="rounded-lg border border-border bg-card p-6 space-y-4">
                    <h3 className="text-sm font-semibold text-foreground">Checkbox</h3>
                    <div className="space-y-3">
                        {["Notificações por email", "Notificações push", "Resumo semanal", "Alertas de segurança"].map((label) => (
                            <div key={label} className="flex items-center space-x-2">
                                <Checkbox id={label} defaultChecked={label.includes("email") || label.includes("segurança")} />
                                <Label htmlFor={label} className="text-sm font-normal">{label}</Label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Select */}
                <div className="rounded-lg border border-border bg-card p-6 space-y-4">
                    <h3 className="text-sm font-semibold text-foreground">Select</h3>
                    <div className="space-y-3">
                        <div className="space-y-2">
                            <Label className="text-sm">Timezone</Label>
                            <Select defaultValue="america-sp">
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecione o fuso" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="america-sp">América/São Paulo (GMT-3)</SelectItem>
                                    <SelectItem value="america-ny">América/New York (GMT-5)</SelectItem>
                                    <SelectItem value="europe-london">Europa/Londres (GMT+0)</SelectItem>
                                    <SelectItem value="asia-tokyo">Ásia/Tóquio (GMT+9)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label className="text-sm">Idioma</Label>
                            <Select defaultValue="pt-br">
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="pt-br">Português (BR)</SelectItem>
                                    <SelectItem value="en">English</SelectItem>
                                    <SelectItem value="es">Español</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

                {/* Slider */}
                <div className="rounded-lg border border-border bg-card p-6 space-y-4">
                    <h3 className="text-sm font-semibold text-foreground">Slider</h3>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label className="text-sm">Volume</Label>
                                <span className="text-xs text-muted-foreground tabular-nums">{sliderVal[0]}%</span>
                            </div>
                            <Slider value={sliderVal} onValueChange={setSliderVal} max={100} step={1} />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-sm">Range</Label>
                            <Slider defaultValue={[20, 80]} max={100} step={5} />
                        </div>
                    </div>
                </div>

                {/* Toggle & Toggle Group */}
                <div className="rounded-lg border border-border bg-card p-6 space-y-4">
                    <h3 className="text-sm font-semibold text-foreground">Toggle</h3>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label className="text-sm">Formato</Label>
                            <ToggleGroup type="single" defaultValue="grid" variant="outline">
                                <ToggleGroupItem value="grid" className="text-xs">Grid</ToggleGroupItem>
                                <ToggleGroupItem value="list" className="text-xs">Lista</ToggleGroupItem>
                                <ToggleGroupItem value="board" className="text-xs">Board</ToggleGroupItem>
                            </ToggleGroup>
                        </div>
                        <div className="flex items-center gap-3">
                            <Toggle variant="outline" size="sm" className="text-xs">Bold</Toggle>
                            <Toggle variant="outline" size="sm" className="text-xs">Italic</Toggle>
                            <Toggle variant="outline" size="sm" className="text-xs" defaultPressed>Underline</Toggle>
                        </div>
                    </div>
                </div>

                {/* Input OTP */}
                <div className="rounded-lg border border-border bg-card p-6 space-y-4">
                    <h3 className="text-sm font-semibold text-foreground">Input OTP</h3>
                    <p className="text-xs text-muted-foreground">Código de verificação enviado para seu email</p>
                    <InputOTP maxLength={6}>
                        <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                        </InputOTPGroup>
                    </InputOTP>
                </div>

                {/* Textarea */}
                <div className="rounded-lg border border-border bg-card p-6 space-y-4">
                    <h3 className="text-sm font-semibold text-foreground">Textarea</h3>
                    <div className="space-y-2">
                        <Label className="text-sm">Mensagem</Label>
                        <Textarea placeholder="Escreva sua mensagem aqui..." className="min-h-[80px]" />
                    </div>
                    <Button size="sm">Enviar</Button>
                </div>

                {/* Progress */}
                <div className="rounded-lg border border-border bg-card p-6 space-y-4">
                    <h3 className="text-sm font-semibold text-foreground">Progress</h3>
                    <div className="space-y-3">
                        <div className="space-y-1.5">
                            <div className="flex justify-between text-xs">
                                <span className="text-muted-foreground">Upload</span>
                                <span className="text-foreground tabular-nums">{progress}%</span>
                            </div>
                            <Progress value={progress} />
                        </div>
                        <div className="space-y-1.5">
                            <div className="flex justify-between text-xs">
                                <span className="text-muted-foreground">Armazenamento</span>
                                <span className="text-foreground">7.2 / 10 GB</span>
                            </div>
                            <Progress value={72} />
                        </div>
                    </div>
                </div>

                {/* Switch */}
                <div className="rounded-lg border border-border bg-card p-6 space-y-4">
                    <h3 className="text-sm font-semibold text-foreground">Switch</h3>
                    <div className="space-y-3">
                        {[
                            { label: "Modo escuro", defaultChecked: true },
                            { label: "Notificações", defaultChecked: true },
                            { label: "Marketing emails", defaultChecked: false },
                            { label: "Analytics", defaultChecked: true },
                        ].map((item) => (
                            <div key={item.label} className="flex items-center justify-between">
                                <Label className="text-sm font-normal">{item.label}</Label>
                                <Switch defaultChecked={item.defaultChecked} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
