"use client"

import * as React from "react"
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
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
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
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

// ─── Dialog Demo ─────────────────────────────────────────────────────────────

export function DialogDemo() {
    return (
        <div className="w-full p-8">
            <div className="mb-6">
                <h2 className="text-lg font-semibold text-foreground">Dialog & Overlays</h2>
                <p className="text-sm text-muted-foreground">Modais, drawers e sheets para interações contextuais</p>
            </div>

            <div className="grid grid-cols-2 gap-6 max-w-2xl">
                {/* Dialog */}
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
                                    <Label htmlFor="name" className="text-right text-sm">Nome</Label>
                                    <Input id="name" defaultValue="Meu Projeto" className="col-span-3" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="desc" className="text-right text-sm">Descrição</Label>
                                    <Input id="desc" placeholder="Opcional" className="col-span-3" />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button size="sm">Salvar</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Alert Dialog */}
                <div className="rounded-lg border border-border bg-card p-6 space-y-3">
                    <h3 className="text-sm font-semibold text-foreground">Alert Dialog</h3>
                    <p className="text-xs text-muted-foreground">Confirmação para ações destrutivas</p>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="destructive" size="sm">Excluir projeto</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Esta ação não pode ser desfeita. O projeto e todos os dashboards serão permanentemente excluídos.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                                    Excluir
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>

                {/* Drawer */}
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

                {/* Sheet */}
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
        </div>
    )
}
