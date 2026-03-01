"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
type ButtonConfig = {
    label: string
    variant: "default" | "destructive" | "outline" | "secondary" | "ghost"
    size: "default" | "sm" | "lg"
    linkPageId?: string | null
}

type ButtonShowcaseProps = {
    config?: ButtonConfig
}

const defaults: ButtonConfig = {
    label: "Botão",
    variant: "default",
    size: "default",
}

export function ButtonShowcase({ config }: ButtonShowcaseProps = {}) {
    const c = { ...defaults, ...config }

    return (
        <div className="w-full h-full flex items-center justify-center p-4">
            <Button variant={c.variant} size={c.size}>
                {c.label}
            </Button>
        </div>
    )
}
