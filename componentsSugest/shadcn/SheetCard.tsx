"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

export function SheetCard() {
    return (
        <div className="w-full p-8">
            <div className="rounded-lg border border-border bg-card p-6 space-y-3">
                <h3 className="text-sm font-semibold text-foreground">Sheet</h3>
                <p className="text-xs text-muted-foreground">Painel lateral para detalhes e configurações</p>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="sm">Abrir Sheet</Button>
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle>Configurações do Workspace</SheetTitle>
                            <SheetDescription>Edite as configurações do seu workspace aqui.</SheetDescription>
                        </SheetHeader>
                        <div className="grid gap-4 py-4">
                            <div className="space-y-2">
                                <Label className="text-sm">Nome</Label>
                                <Input defaultValue="Meu Workspace" />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-sm">Slug</Label>
                                <Input defaultValue="meu-workspace" />
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </div>
    )
}
