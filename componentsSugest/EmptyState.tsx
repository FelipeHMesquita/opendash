import * as React from "react"
import { Inbox } from "lucide-react"
import { Button } from "@/components/ui/button"

export function EmptyState() {
    return (
        <div className="flex h-full w-full flex-col items-center justify-center bg-background px-4 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted">
                <Inbox className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="mt-5 text-base font-semibold text-foreground">Nenhum item encontrado</h3>
            <p className="mt-2 text-sm text-muted-foreground max-w-xs">
                Você ainda não tem nada aqui. Comece criando um novo item para aparecer nesta lista.
            </p>
            <Button className="mt-6">Criar primeiro item</Button>
        </div>
    )
}
