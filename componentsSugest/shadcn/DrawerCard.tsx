"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"

export function DrawerCard() {
    return (
        <div className="w-full p-8">
            <div className="rounded-lg border border-border bg-card p-6 space-y-3">
                <h3 className="text-sm font-semibold text-foreground">Drawer</h3>
                <p className="text-xs text-muted-foreground">Painel deslizante inferior para mobile</p>
                <Drawer>
                    <DrawerTrigger asChild>
                        <Button variant="outline" size="sm">Abrir Drawer</Button>
                    </DrawerTrigger>
                    <DrawerContent>
                        <div className="mx-auto w-full max-w-sm">
                            <DrawerHeader>
                                <DrawerTitle>Filtros</DrawerTitle>
                                <DrawerDescription>Selecione os filtros para refinar os resultados</DrawerDescription>
                            </DrawerHeader>
                            <div className="px-4 space-y-4">
                                <div className="space-y-2">
                                    <Label className="text-sm">Período</Label>
                                    <Input type="date" />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-sm">Status</Label>
                                    <Input placeholder="Todos" />
                                </div>
                            </div>
                            <DrawerFooter>
                                <Button size="sm">Aplicar</Button>
                                <DrawerClose asChild>
                                    <Button variant="outline" size="sm">Cancelar</Button>
                                </DrawerClose>
                            </DrawerFooter>
                        </div>
                    </DrawerContent>
                </Drawer>
            </div>
        </div>
    )
}
