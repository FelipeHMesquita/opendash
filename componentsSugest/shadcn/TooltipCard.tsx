"use client"

import { Button } from "@/components/ui/button"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

export function TooltipCard() {
    return (
        <div className="w-full p-8">
            <div className="rounded-lg border border-border bg-card p-6 space-y-4">
                <h3 className="text-sm font-semibold text-foreground">Tooltip</h3>
                <p className="text-xs text-muted-foreground">Dicas rápidas ao passar o mouse</p>
                <TooltipProvider>
                    <div className="flex items-center gap-3">
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="outline" size="sm">Salvar</Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p className="text-xs">Salvar alterações (⌘S)</p>
                            </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="outline" size="sm">Exportar</Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p className="text-xs">Exportar como código React</p>
                            </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="outline" size="sm">Preview</Button>
                            </TooltipTrigger>
                            <TooltipContent side="bottom">
                                <p className="text-xs">Visualizar resultado (⌘P)</p>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                </TooltipProvider>
            </div>
        </div>
    )
}
