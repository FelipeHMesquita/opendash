"use client"

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

export function ContextMenuCard() {
    return (
        <div className="w-full p-8">
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
        </div>
    )
}
