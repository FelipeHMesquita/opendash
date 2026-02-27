"use client"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu"
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuSeparator,
    ContextMenuShortcut,
    ContextMenuTrigger,
    ContextMenuSub,
    ContextMenuSubContent,
    ContextMenuSubTrigger,
} from "@/components/ui/context-menu"
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
import { Button } from "@/components/ui/button"

// ─── Menu Demo ──────────────────────────────────────────────────────────────

export function MenuDemo() {
    return (
        <div className="w-full p-8">
            <div className="mb-6">
                <h2 className="text-lg font-semibold text-foreground">Menus</h2>
                <p className="text-sm text-muted-foreground">Dropdown, context menu e menubar para ações e navegação</p>
            </div>

            <div className="grid grid-cols-3 gap-6 max-w-4xl">
                {/* Dropdown Menu */}
                <div className="rounded-lg border border-border bg-card p-6 space-y-3">
                    <h3 className="text-sm font-semibold text-foreground">Dropdown Menu</h3>
                    <p className="text-xs text-muted-foreground">Menu de ações em botão</p>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">Ações</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-48">
                            <DropdownMenuLabel>Projeto</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                Editar <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                Duplicar <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
                            </DropdownMenuItem>
                            <DropdownMenuSub>
                                <DropdownMenuSubTrigger>Mover para</DropdownMenuSubTrigger>
                                <DropdownMenuSubContent>
                                    <DropdownMenuItem>Workspace A</DropdownMenuItem>
                                    <DropdownMenuItem>Workspace B</DropdownMenuItem>
                                </DropdownMenuSubContent>
                            </DropdownMenuSub>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                                Excluir <DropdownMenuShortcut>⌫</DropdownMenuShortcut>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                {/* Context Menu */}
                <div className="rounded-lg border border-border bg-card p-6 space-y-3">
                    <h3 className="text-sm font-semibold text-foreground">Context Menu</h3>
                    <p className="text-xs text-muted-foreground">Clique com botão direito abaixo</p>
                    <ContextMenu>
                        <ContextMenuTrigger className="flex h-24 w-full items-center justify-center rounded-md border border-dashed border-border text-xs text-muted-foreground select-none">
                            Clique direito aqui
                        </ContextMenuTrigger>
                        <ContextMenuContent className="w-48">
                            <ContextMenuItem>
                                Copiar <ContextMenuShortcut>⌘C</ContextMenuShortcut>
                            </ContextMenuItem>
                            <ContextMenuItem>
                                Colar <ContextMenuShortcut>⌘V</ContextMenuShortcut>
                            </ContextMenuItem>
                            <ContextMenuSub>
                                <ContextMenuSubTrigger>Inserir</ContextMenuSubTrigger>
                                <ContextMenuSubContent>
                                    <ContextMenuItem>Gráfico</ContextMenuItem>
                                    <ContextMenuItem>Tabela</ContextMenuItem>
                                    <ContextMenuItem>Card</ContextMenuItem>
                                </ContextMenuSubContent>
                            </ContextMenuSub>
                            <ContextMenuSeparator />
                            <ContextMenuItem className="text-destructive">Remover</ContextMenuItem>
                        </ContextMenuContent>
                    </ContextMenu>
                </div>

                {/* Menubar */}
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
        </div>
    )
}
