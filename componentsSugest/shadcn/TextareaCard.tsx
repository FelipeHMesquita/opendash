"use client"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function TextareaCard() {
    return (
        <div className="w-full p-8">
            <div className="rounded-lg border border-border bg-card p-6 space-y-4">
                <h3 className="text-sm font-semibold text-foreground">Textarea</h3>
                <div className="space-y-2">
                    <Label className="text-sm">Mensagem</Label>
                    <Textarea placeholder="Escreva sua mensagem aqui..." className="min-h-[80px]" />
                </div>
                <Button size="sm">Enviar</Button>
            </div>
        </div>
    )
}
