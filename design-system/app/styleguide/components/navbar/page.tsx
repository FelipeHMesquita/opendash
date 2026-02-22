import { ThemePreview } from "../../_theme-preview"
import { Navbar } from "@/componentsSugest/Navbar"

export default function NavbarStyleguidePage() {
    return (
        <ThemePreview>
            <div className="p-6">
                {/* Screen simulation frame */}
                <div
                    className="overflow-hidden rounded-xl border border-border shadow-sm"
                    style={{ height: 600 }}
                >
                    <div className="flex h-full flex-col bg-background">

                        {/* Navbar */}
                        <Navbar />

                        {/* Page content skeleton */}
                        <div className="flex flex-1 flex-col gap-5 overflow-hidden p-6">
                            <div className="flex flex-col gap-1.5">
                                <div className="h-4 w-44 rounded-full bg-muted" />
                                <div className="h-3 w-64 rounded-full bg-muted/60" />
                            </div>
                            <div className="flex gap-4">
                                {[0, 1, 2].map((i) => (
                                    <div
                                        key={i}
                                        className="flex-1 rounded-lg border border-border bg-card"
                                        style={{ height: 96 }}
                                    />
                                ))}
                            </div>
                            <div className="flex-1 rounded-lg border border-border bg-card" />
                        </div>

                    </div>
                </div>
            </div>
        </ThemePreview>
    )
}
