"use client"

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

// ─── Carousel Demo ──────────────────────────────────────────────────────────

const FEATURE_CARDS = [
    { title: "Dashboard Builder", desc: "Crie layouts customizados com drag-and-drop", icon: "grid" },
    { title: "Temas Dinâmicos", desc: "Alterne entre temas escuros e claros", icon: "palette" },
    { title: "Multi-Tenancy", desc: "Workspaces isolados com permissões", icon: "users" },
    { title: "Exportação", desc: "Exporte código React pronto para uso", icon: "code" },
    { title: "Charts", desc: "Gráficos interativos com Recharts", icon: "chart" },
    { title: "Preview Mode", desc: "Visualize o resultado final em tempo real", icon: "eye" },
]

const ICONS: Record<string, React.ReactNode> = {
    grid: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z" /></svg>,
    palette: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="8" r="2" fill="currentColor" /><circle cx="8" cy="14" r="2" fill="currentColor" /><circle cx="16" cy="14" r="2" fill="currentColor" /></svg>,
    users: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
    code: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>,
    chart: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3v18h18" /><path d="M18 17V9" /><path d="M13 17V5" /><path d="M8 17v-3" /></svg>,
    eye: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>,
}

export function CarouselDemo() {
    return (
        <div className="w-full p-8">
            <div className="mb-6">
                <h2 className="text-lg font-semibold text-foreground">Carousel</h2>
                <p className="text-sm text-muted-foreground">Navegação horizontal entre cards de conteúdo</p>
            </div>

            <div className="mx-auto max-w-3xl">
                <Carousel opts={{ align: "start", loop: true }} className="w-full">
                    <CarouselContent className="-ml-4">
                        {FEATURE_CARDS.map((card, i) => (
                            <CarouselItem key={i} className="pl-4 basis-1/3">
                                <div className="rounded-lg border border-border bg-card p-6 h-full">
                                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                        {ICONS[card.icon]}
                                    </div>
                                    <h3 className="text-sm font-semibold text-foreground">{card.title}</h3>
                                    <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">{card.desc}</p>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
        </div>
    )
}
