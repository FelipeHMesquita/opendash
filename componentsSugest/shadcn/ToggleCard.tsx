"use client"

import { Label } from "@/components/ui/label"
import { Toggle } from "@/components/ui/toggle"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

export function ToggleCard() {
    return (
        <div className="w-full p-8">
            <div className="rounded-lg border border-border bg-card p-6 space-y-4">
                <h3 className="text-sm font-semibold text-foreground">Toggle</h3>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label className="text-sm">Formato</Label>
                        <ToggleGroup type="single" defaultValue="grid" variant="outline">
                            <ToggleGroupItem value="grid" className="text-xs">Grid</ToggleGroupItem>
                            <ToggleGroupItem value="list" className="text-xs">Lista</ToggleGroupItem>
                            <ToggleGroupItem value="board" className="text-xs">Board</ToggleGroupItem>
                        </ToggleGroup>
                    </div>
                    <div className="flex items-center gap-3">
                        <Toggle variant="outline" size="sm" className="text-xs">Bold</Toggle>
                        <Toggle variant="outline" size="sm" className="text-xs">Italic</Toggle>
                        <Toggle variant="outline" size="sm" className="text-xs" defaultPressed>Underline</Toggle>
                    </div>
                </div>
            </div>
        </div>
    )
}
