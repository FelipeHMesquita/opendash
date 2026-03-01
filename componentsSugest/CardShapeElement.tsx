"use client"

import * as React from "react"
type CardShapeConfig = {
    icon: string
    title: string
    description: string
}
import { icons } from "lucide-react"

export function CardShapeElement({
    config,
    chartHeight,
}: {
    config: CardShapeConfig
    chartHeight?: number
}) {
    // Resolve icon: try PascalCase lookup
    const iconName = config.icon.charAt(0).toUpperCase() + config.icon.slice(1)
    const IconComponent = icons[iconName as keyof typeof icons]

    return (
        <div className="w-full h-full flex flex-col justify-center p-5">
            <div className="mb-3">
                <div className="inline-flex rounded-lg bg-primary/10 p-2">
                    {IconComponent ? (
                        <IconComponent size={20} className="text-primary" />
                    ) : (
                        <div className="w-5 h-5" />
                    )}
                </div>
            </div>
            <h3 className="text-sm font-medium text-foreground leading-snug">
                {config.title}
            </h3>
            {config.description && (
                <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                    {config.description}
                </p>
            )}
        </div>
    )
}
