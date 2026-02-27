"use client"

import * as React from "react"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

export function SliderCard() {
    const [val, setVal] = React.useState([65])

    return (
        <div className="w-full p-8">
            <div className="rounded-lg border border-border bg-card p-6 space-y-4">
                <h3 className="text-sm font-semibold text-foreground">Slider</h3>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label className="text-sm">Volume</Label>
                            <span className="text-xs text-muted-foreground tabular-nums">{val[0]}%</span>
                        </div>
                        <Slider value={val} onValueChange={setVal} max={100} step={1} />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-sm">Range</Label>
                        <Slider defaultValue={[20, 80]} max={100} step={5} />
                    </div>
                </div>
            </div>
        </div>
    )
}
