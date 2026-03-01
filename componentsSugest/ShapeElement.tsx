"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
type ShapeConfig = {
    icon: string
    alignH: "start" | "center" | "end"
    alignV: "start" | "center" | "end"
    paddingTop: number
    paddingRight: number
    paddingBottom: number
    paddingLeft: number
    paddingLinked: boolean
    bgColor: string
    borderRadius: number
    showBorder: boolean
}
import { icons } from "lucide-react"

// Curated icon subset for the picker
export const SHAPE_ICON_LIST = [
    "Square", "Circle", "Triangle", "Star", "Heart", "Zap", "Shield",
    "Flag", "Bookmark", "Award", "Target", "Hexagon", "Octagon", "Diamond",
    "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight",
    "Check", "X", "Plus", "Minus", "AlertTriangle", "Info", "CircleHelp",
    "Home", "User", "Users", "Settings", "Search", "Bell", "Mail",
    "Phone", "MapPin", "Calendar", "Clock", "Eye", "Lock", "Unlock",
    "Download", "Upload", "Share", "Link", "ExternalLink",
    "File", "Folder", "Image", "Camera", "Video", "Music",
    "Sun", "Moon", "Cloud", "Droplets", "Flame", "Leaf",
    "TrendingUp", "TrendingDown", "BarChart2", "PieChart", "Activity",
    "DollarSign", "CreditCard", "ShoppingCart", "Package", "Gift",
    "Smile", "Frown", "ThumbsUp", "ThumbsDown", "MessageCircle",
    "Code", "Terminal", "Database", "Globe", "Wifi", "Cpu",
] as const

const BG_COLOR_MAP: Record<string, { bg: string; fg: string }> = {
    primary:      { bg: "bg-primary",      fg: "text-primary-foreground" },
    muted:        { bg: "bg-muted",        fg: "text-muted-foreground" },
    card:         { bg: "bg-card",         fg: "text-card-foreground" },
    accent:       { bg: "bg-accent",       fg: "text-accent-foreground" },
    destructive:  { bg: "bg-destructive",  fg: "text-destructive-foreground" },
    transparent:  { bg: "bg-transparent",  fg: "text-foreground" },
}

export function ShapeElement({
    config,
    chartHeight,
}: {
    config: ShapeConfig
    chartHeight?: number
}) {
    const iconName = config.icon.charAt(0).toUpperCase() + config.icon.slice(1)
    const IconComponent = icons[iconName as keyof typeof icons]

    const colors = BG_COLOR_MAP[config.bgColor] ?? BG_COLOR_MAP.primary

    // Icon size: scale relative to available space
    const availableH = (chartHeight ?? 120) - config.paddingTop - config.paddingBottom
    const availableW = 999 // width isn't known at render, let CSS handle it
    const iconSize = Math.max(16, Math.min(availableH * 0.6, 64))

    return (
        <div
            className={cn(
                "w-full h-full flex",
                config.alignV === "start" ? "items-start" : config.alignV === "end" ? "items-end" : "items-center",
                config.alignH === "start" ? "justify-start" : config.alignH === "end" ? "justify-end" : "justify-center",
                colors.bg, colors.fg,
                config.showBorder && "border border-border",
            )}
            style={{
                paddingTop: config.paddingTop,
                paddingRight: config.paddingRight,
                paddingBottom: config.paddingBottom,
                paddingLeft: config.paddingLeft,
                borderRadius: config.borderRadius,
            }}
        >
            {IconComponent && <IconComponent size={iconSize} />}
        </div>
    )
}
