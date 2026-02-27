"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

const ITEMS = [
    { label: "Notificações por email", checked: true },
    { label: "Notificações push", checked: false },
    { label: "Resumo semanal", checked: false },
    { label: "Alertas de segurança", checked: true },
]

export function CheckboxCard() {
    return (
        <div className="w-full p-8">
            <div className="rounded-lg border border-border bg-card p-6 space-y-4">
                <h3 className="text-sm font-semibold text-foreground">Checkbox</h3>
                <div className="space-y-3">
                    {ITEMS.map((item) => (
                        <div key={item.label} className="flex items-center space-x-2">
                            <Checkbox id={`cb-${item.label}`} defaultChecked={item.checked} />
                            <Label htmlFor={`cb-${item.label}`} className="text-sm font-normal">{item.label}</Label>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
