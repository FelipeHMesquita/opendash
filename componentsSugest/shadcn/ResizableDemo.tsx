"use client"

import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

// ─── Resizable Panels Demo ──────────────────────────────────────────────────

const MAIL_ITEMS = [
    { from: "Ana Santos", subject: "Revisão do dashboard Q1", preview: "Olá! Finalizei a revisão dos indicadores...", time: "09:42", unread: true },
    { from: "Carlos R.", subject: "Deploy produção", preview: "O deploy foi realizado com sucesso. Todos os...", time: "08:15", unread: true },
    { from: "Maria Lima", subject: "Reunião de sprint", preview: "Confirmo a reunião para amanhã às 10h...", time: "Ontem", unread: false },
    { from: "João Pedro", subject: "Bug report #234", preview: "Identificamos um problema no filtro de datas...", time: "Ontem", unread: false },
    { from: "Equipe Design", subject: "Novo kit de ícones", preview: "Acabamos de atualizar a biblioteca de ícones...", time: "Seg", unread: false },
    { from: "RH", subject: "Atualização de benefícios", preview: "Informamos que a partir de março...", time: "Seg", unread: false },
    { from: "Suporte", subject: "Ticket #891 resolvido", preview: "O problema relatado foi resolvido. Caso...", time: "Sex", unread: false },
]

const TAG_LIST = Array.from({ length: 30 }, (_, i) => `Tag ${i + 1}`)

export function ResizableDemo() {
    return (
        <div className="w-full p-8">
            <div className="mb-6">
                <h2 className="text-lg font-semibold text-foreground">Resizable & Scroll Area</h2>
                <p className="text-sm text-muted-foreground">Painéis redimensionáveis e áreas de scroll customizadas</p>
            </div>

            <div className="max-w-4xl space-y-8">
                {/* Mail-like layout */}
                <div className="rounded-lg border border-border bg-card overflow-hidden">
                    <ResizablePanelGroup orientation="horizontal" className="min-h-[400px]">
                        <ResizablePanel defaultSize={25} minSize={15}>
                            <div className="flex flex-col h-full">
                                <div className="px-4 py-3 border-b border-border">
                                    <h3 className="text-sm font-semibold text-foreground">Inbox</h3>
                                    <p className="text-xs text-muted-foreground">7 mensagens, 2 não lidas</p>
                                </div>
                                <ScrollArea className="flex-1">
                                    <div className="p-2">
                                        {MAIL_ITEMS.map((mail, i) => (
                                            <button
                                                key={i}
                                                className="w-full text-left rounded-md px-3 py-2.5 hover:bg-muted/50 transition-colors space-y-1"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <span className={`text-xs ${mail.unread ? "font-semibold text-foreground" : "text-muted-foreground"}`}>
                                                        {mail.from}
                                                    </span>
                                                    <span className="text-xs text-muted-foreground">{mail.time}</span>
                                                </div>
                                                <p className={`text-xs ${mail.unread ? "font-medium text-foreground" : "text-muted-foreground"}`}>
                                                    {mail.subject}
                                                </p>
                                                <p className="text-xs text-muted-foreground/60 line-clamp-1">{mail.preview}</p>
                                            </button>
                                        ))}
                                    </div>
                                </ScrollArea>
                            </div>
                        </ResizablePanel>

                        <ResizableHandle withHandle />

                        <ResizablePanel defaultSize={50}>
                            <div className="flex flex-col h-full">
                                <div className="px-4 py-3 border-b border-border">
                                    <h3 className="text-sm font-semibold text-foreground">Revisão do dashboard Q1</h3>
                                    <p className="text-xs text-muted-foreground">De: Ana Santos · 09:42</p>
                                </div>
                                <ScrollArea className="flex-1 p-4">
                                    <div className="text-sm text-muted-foreground leading-relaxed space-y-3">
                                        <p>Olá!</p>
                                        <p>Finalizei a revisão dos indicadores do dashboard do Q1. Aqui estão os pontos principais:</p>
                                        <ul className="list-disc pl-5 space-y-1">
                                            <li>Receita cresceu 23% comparado ao Q4</li>
                                            <li>Taxa de churn reduziu para 2.1%</li>
                                            <li>NPS subiu de 72 para 81</li>
                                            <li>Custo de aquisição reduziu 15%</li>
                                        </ul>
                                        <p>Sugiro adicionar um gráfico de tendência para os próximos meses. Podemos discutir na reunião de amanhã.</p>
                                        <p>Abs,<br />Ana</p>
                                    </div>
                                </ScrollArea>
                            </div>
                        </ResizablePanel>

                        <ResizableHandle withHandle />

                        <ResizablePanel defaultSize={25} minSize={15}>
                            <div className="flex flex-col h-full">
                                <div className="px-4 py-3 border-b border-border">
                                    <h3 className="text-sm font-semibold text-foreground">Tags</h3>
                                </div>
                                <ScrollArea className="flex-1">
                                    <div className="p-4">
                                        {TAG_LIST.map((tag) => (
                                            <div key={tag}>
                                                <div className="text-xs py-2 text-muted-foreground">{tag}</div>
                                                <Separator />
                                            </div>
                                        ))}
                                    </div>
                                </ScrollArea>
                            </div>
                        </ResizablePanel>
                    </ResizablePanelGroup>
                </div>
            </div>
        </div>
    )
}
