"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

export function DialogCard() {
    return (
        <div className="w-full p-8">
            <div className="rounded-lg border border-border bg-card p-6 space-y-3">
                <h3 className="text-sm font-semibold text-foreground">Dialog</h3>
                <p className="text-xs text-muted-foreground">Modal centralizado para formulários e confirmações</p>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline" size="sm">Abrir Dialog</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Criar projeto</DialogTitle>
                            <DialogDescription>
                                Preencha os dados do novo projeto. Clique em salvar quando terminar.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="dialog-name" className="text-right text-sm">Nome</Label>
                                <Input id="dialog-name" defaultValue="Meu Projeto" className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="dialog-desc" className="text-right text-sm">Descrição</Label>
                                <Input id="dialog-desc" placeholder="Opcional" className="col-span-3" />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button size="sm">Salvar</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}
