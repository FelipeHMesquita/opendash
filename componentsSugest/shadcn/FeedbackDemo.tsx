"use client"

import * as React from "react"
import { Skeleton } from "@/components/ui/skeleton"
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

// ─── Feedback & Overlays Demo ───────────────────────────────────────────────

export function FeedbackDemo() {
    return (
        <div className="w-full p-8">
            <div className="mb-6">
                <h2 className="text-lg font-semibold text-foreground">Feedback & Overlays</h2>
                <p className="text-sm text-muted-foreground">Skeletons, tooltips, hover cards e popovers</p>
            </div>

            <div className="grid grid-cols-2 gap-6 max-w-3xl">
                {/* Skeleton */}
                <div className="rounded-lg border border-border bg-card p-6 space-y-4">
                    <h3 className="text-sm font-semibold text-foreground">Skeleton</h3>
                    <p className="text-xs text-muted-foreground">Placeholders de carregamento</p>
                    <div className="space-y-4">
                        {/* Card skeleton */}
                        <div className="flex items-center space-x-4">
                            <Skeleton className="h-10 w-10 rounded-full" />
                            <div className="space-y-2">
                                <Skeleton className="h-3 w-32" />
                                <Skeleton className="h-3 w-24" />
                            </div>
                        </div>
                        {/* Table skeleton */}
                        <div className="space-y-2">
                            <Skeleton className="h-8 w-full" />
                            <Skeleton className="h-6 w-full" />
                            <Skeleton className="h-6 w-full" />
                            <Skeleton className="h-6 w-3/4" />
                        </div>
                    </div>
                </div>

                {/* Tooltip */}
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

                {/* Hover Card */}
                <div className="rounded-lg border border-border bg-card p-6 space-y-4">
                    <h3 className="text-sm font-semibold text-foreground">Hover Card</h3>
                    <p className="text-xs text-muted-foreground">Informações ao passar sobre um elemento</p>
                    <div className="flex items-center gap-3">
                        {[
                            { name: "Felipe M.", role: "Owner", initials: "FM" },
                            { name: "Ana S.", role: "Admin", initials: "AS" },
                            { name: "Carlos R.", role: "Member", initials: "CR" },
                        ].map((user) => (
                            <HoverCard key={user.name}>
                                <HoverCardTrigger asChild>
                                    <button className="flex items-center gap-2 rounded-md px-2 py-1 hover:bg-muted transition-colors">
                                        <Avatar className="h-7 w-7">
                                            <AvatarFallback className="text-[10px] bg-primary/10 text-primary">
                                                {user.initials}
                                            </AvatarFallback>
                                        </Avatar>
                                        <span className="text-xs text-foreground">{user.name}</span>
                                    </button>
                                </HoverCardTrigger>
                                <HoverCardContent className="w-56">
                                    <div className="flex items-start gap-3">
                                        <Avatar className="h-9 w-9">
                                            <AvatarFallback className="bg-primary/10 text-primary text-xs">
                                                {user.initials}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <h4 className="text-sm font-semibold">{user.name}</h4>
                                            <Badge variant="secondary" className="mt-1 text-[10px]">{user.role}</Badge>
                                            <p className="mt-2 text-xs text-muted-foreground">
                                                Membro desde Jan 2026
                                            </p>
                                        </div>
                                    </div>
                                </HoverCardContent>
                            </HoverCard>
                        ))}
                    </div>
                </div>

                {/* Popover */}
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
                                        <Label htmlFor="width" className="text-xs">Largura</Label>
                                        <Input id="width" defaultValue="100%" className="col-span-2 h-7 text-xs" />
                                    </div>
                                    <div className="grid grid-cols-3 items-center gap-4">
                                        <Label htmlFor="height" className="text-xs">Altura</Label>
                                        <Input id="height" defaultValue="auto" className="col-span-2 h-7 text-xs" />
                                    </div>
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
        </div>
    )
}
