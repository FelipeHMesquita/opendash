"use client"

import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarTrigger,
    MenubarSub,
    MenubarSubContent,
    MenubarSubTrigger,
} from "@/components/ui/menubar"

export function MenubarCard() {
    return (
        <div className="w-full p-8">
            <div className="rounded-lg border border-border bg-card p-6 space-y-3">
                <h3 className="text-sm font-semibold text-foreground">Menubar</h3>
                <p className="text-xs text-muted-foreground">Barra de menus estilo desktop</p>
                <Menubar>
                    <MenubarMenu>
                        <MenubarTrigger className="text-xs">Arquivo</MenubarTrigger>
                        <MenubarContent>
                            <MenubarItem>Novo <MenubarShortcut>⌘N</MenubarShortcut></MenubarItem>
                            <MenubarItem>Abrir <MenubarShortcut>⌘O</MenubarShortcut></MenubarItem>
                            <MenubarSeparator />
                            <MenubarItem>Salvar <MenubarShortcut>⌘S</MenubarShortcut></MenubarItem>
                            <MenubarSub>
                                <MenubarSubTrigger>Exportar</MenubarSubTrigger>
                                <MenubarSubContent>
                                    <MenubarItem>JSON</MenubarItem>
                                    <MenubarItem>CSV</MenubarItem>
                                    <MenubarItem>PDF</MenubarItem>
                                </MenubarSubContent>
                            </MenubarSub>
                        </MenubarContent>
                    </MenubarMenu>
                    <MenubarMenu>
                        <MenubarTrigger className="text-xs">Editar</MenubarTrigger>
                        <MenubarContent>
                            <MenubarItem>Desfazer <MenubarShortcut>⌘Z</MenubarShortcut></MenubarItem>
                            <MenubarItem>Refazer <MenubarShortcut>⇧⌘Z</MenubarShortcut></MenubarItem>
                            <MenubarSeparator />
                            <MenubarItem>Recortar</MenubarItem>
                            <MenubarItem>Copiar</MenubarItem>
                            <MenubarItem>Colar</MenubarItem>
                        </MenubarContent>
                    </MenubarMenu>
                    <MenubarMenu>
                        <MenubarTrigger className="text-xs">Ver</MenubarTrigger>
                        <MenubarContent>
                            <MenubarItem>Zoom In <MenubarShortcut>⌘+</MenubarShortcut></MenubarItem>
                            <MenubarItem>Zoom Out <MenubarShortcut>⌘-</MenubarShortcut></MenubarItem>
                            <MenubarSeparator />
                            <MenubarItem>Fullscreen</MenubarItem>
                        </MenubarContent>
                    </MenubarMenu>
                </Menubar>
            </div>
        </div>
    )
}
