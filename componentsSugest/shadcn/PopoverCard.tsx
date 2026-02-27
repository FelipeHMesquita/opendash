"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

export function PopoverCard() {
    return (
        <div className="w-full p-8">
            <div className="rounded-lg border border-border bg-card p-6 space-y-4">
                <h3 className="text-sm font-semibold text-foreground">Popover</h3>
                <p className="text-xs text-muted-foreground">Conteúdo flutuante interativo</p>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="outline" size="sm">Configurações rápidas</Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-64">
                        <div className="grid gap-4">
                            <div className="space-y-2">
                                <h4 className="text-sm font-semibold">Dimensões</h4>
                                <p className="text-xs text-muted-foreground">Defina as dimensões do componente</p>
                            </div>
                            <div className="grid gap-2">
                                <div className="grid grid-cols-3 items-center gap-4">
                                    <Label htmlFor="pop-width" className="text-xs">Largura</Label>
                                    <Input id="pop-width" defaultValue="100%" className="col-span-2 h-7 text-xs" />
                                </div>
                                <div className="grid grid-cols-3 items-center gap-4">
                                    <Label htmlFor="pop-height" className="text-xs">Altura</Label>
                                    <Input id="pop-height" defaultValue="auto" className="col-span-2 h-7 text-xs" />
                                </div>
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    )
}
