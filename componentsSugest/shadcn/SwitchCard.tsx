"use client"

import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

const ITEMS = [
    { label: "Modo escuro", checked: true },
    { label: "Notificações", checked: true },
    { label: "Marketing emails", checked: false },
    { label: "Analytics", checked: true },
]

export function SwitchCard() {
    return (
        <div className="w-full p-8">
            <div className="rounded-lg border border-border bg-card p-6 space-y-4">
                <h3 className="text-sm font-semibold text-foreground">Switch</h3>
                <div className="space-y-3">
                    {ITEMS.map((item) => (
                        <div key={item.label} className="flex items-center justify-between">
                            <Label className="text-sm font-normal">{item.label}</Label>
                            <Switch defaultChecked={item.checked} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
