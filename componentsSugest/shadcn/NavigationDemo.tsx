"use client"

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { Separator } from "@/components/ui/separator"

// ─── Navigation Demo ────────────────────────────────────────────────────────

export function NavigationDemo() {
    return (
        <div className="w-full p-8">
            <div className="mb-6">
                <h2 className="text-lg font-semibold text-foreground">Navegação</h2>
                <p className="text-sm text-muted-foreground">Breadcrumbs, paginação e separadores</p>
            </div>

            <div className="max-w-3xl space-y-8">
                {/* Breadcrumb */}
                <div className="rounded-lg border border-border bg-card p-6 space-y-4">
                    <h3 className="text-sm font-semibold text-foreground">Breadcrumb</h3>
                    <div className="space-y-4">
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbLink href="#">Home</BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbLink href="#">Workspace</BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbLink href="#">Projetos</BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>Dashboard Analytics</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>

                        <Separator />

                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbLink href="#">Configurações</BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>Conta</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </div>

                {/* Pagination */}
                <div className="rounded-lg border border-border bg-card p-6 space-y-4">
                    <h3 className="text-sm font-semibold text-foreground">Pagination</h3>
                    <div className="space-y-6">
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious href="#" />
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink href="#">1</PaginationLink>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink href="#" isActive>2</PaginationLink>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink href="#">3</PaginationLink>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationEllipsis />
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink href="#">12</PaginationLink>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationNext href="#" />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>

                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span>Mostrando 11-20 de 120 resultados</span>
                            <Pagination>
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious href="#" />
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationNext href="#" />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        </div>
                    </div>
                </div>

                {/* Separator showcase */}
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
        </div>
    )
}
