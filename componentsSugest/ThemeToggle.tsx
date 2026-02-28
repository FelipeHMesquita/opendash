"use client"

import * as React from "react"
import { Sun, Moon } from "lucide-react"
import { cn } from "@/lib/utils"
import type { ThemeToggleConfig } from "@/app/_builder-state"

type ThemeToggleProps = {
    config?: ThemeToggleConfig
}

const sizeMap = {
    sm:      { track: "h-7 w-12", thumb: "h-5 w-5", icon: 12, on: "translateX(20px)", off: "translateX(2px)" },
    default: { track: "h-9 w-16", thumb: "h-7 w-7", icon: 16, on: "translateX(28px)", off: "translateX(2px)" },
    lg:      { track: "h-11 w-20", thumb: "h-9 w-9", icon: 20, on: "translateX(36px)", off: "translateX(2px)" },
}

export function ThemeToggle({ config }: ThemeToggleProps = {}) {
    const size = config?.size ?? "default"
    const s = sizeMap[size]

    // Detect dark mode by reading computed CSS variable from closest ancestor
    const ref = React.useRef<HTMLDivElement>(null)
    const [isDark, setIsDark] = React.useState(false)

    React.useEffect(() => {
        if (!ref.current) return
        const el = ref.current.closest("[style]") ?? document.documentElement
        const bg = getComputedStyle(el).getPropertyValue("--background").trim()
        // HSL format: "H S% L%" — dark if lightness < 50
        if (bg) {
            const parts = bg.split(/\s+/)
            const lightness = parseFloat(parts[parts.length - 1])
            setIsDark(lightness < 50)
        }
    })

    return (
        <div ref={ref} className="w-full h-full flex items-center justify-center p-4">
            <button
                className={cn(
                    "relative inline-flex rounded-full border border-border bg-muted transition-colors",
                    s.track,
                )}
                onClick={() => setIsDark(d => !d)}
            >
                <span
                    className={cn(
                        "absolute top-[3px] rounded-full bg-background shadow-sm transition-transform duration-200 flex items-center justify-center text-foreground",
                        s.thumb,
                    )}
                    style={{ transform: isDark ? s.on : s.off }}
                >
                    {isDark ? <Moon size={s.icon} /> : <Sun size={s.icon} />}
                </span>
            </button>
        </div>
    )
}
