"use client"

import { Separator } from "@/components/ui/separator"

export function SeparatorCard() {
    return (
        <div className="w-full p-8">
            <div className="rounded-lg border border-border bg-card p-6 space-y-4">
                <h3 className="text-sm font-semibold text-foreground">Separator</h3>
                <div className="space-y-4">
                    <div>
                        <h4 className="text-sm font-medium text-foreground">Seção Principal</h4>
                        <p className="text-xs text-muted-foreground">Conteúdo da primeira seção</p>
                    </div>
                    <Separator />
                    <div>
                        <h4 className="text-sm font-medium text-foreground">Seção Secundária</h4>
                        <p className="text-xs text-muted-foreground">Conteúdo da segunda seção</p>
                    </div>
                    <Separator />
                    <div className="flex h-5 items-center space-x-4 text-sm">
                        <span className="text-muted-foreground">Blog</span>
                        <Separator orientation="vertical" />
                        <span className="text-muted-foreground">Docs</span>
                        <Separator orientation="vertical" />
                        <span className="text-muted-foreground">API</span>
                        <Separator orientation="vertical" />
                        <span className="text-muted-foreground">Suporte</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
