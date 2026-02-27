"use client"

import * as React from "react"
import { Progress } from "@/components/ui/progress"

export function ProgressCard() {
    const [progress, setProgress] = React.useState(45)

    React.useEffect(() => {
        const t = setInterval(() => setProgress(v => v >= 100 ? 0 : v + 5), 800)
        return () => clearInterval(t)
    }, [])

    return (
        <div className="w-full p-8">
            <div className="rounded-lg border border-border bg-card p-6 space-y-4">
                <h3 className="text-sm font-semibold text-foreground">Progress</h3>
                <div className="space-y-3">
                    <div className="space-y-1.5">
                        <div className="flex justify-between text-xs">
                            <span className="text-muted-foreground">Upload</span>
                            <span className="text-foreground tabular-nums">{progress}%</span>
                        </div>
                        <Progress value={progress} />
                    </div>
                    <div className="space-y-1.5">
                        <div className="flex justify-between text-xs">
                            <span className="text-muted-foreground">Armazenamento</span>
                            <span className="text-foreground">7.2 / 10 GB</span>
                        </div>
                        <Progress value={72} />
                    </div>
                </div>
            </div>
        </div>
    )
}
