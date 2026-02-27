"use client"

import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export function SelectCard() {
    return (
        <div className="w-full p-8">
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
        </div>
    )
}
