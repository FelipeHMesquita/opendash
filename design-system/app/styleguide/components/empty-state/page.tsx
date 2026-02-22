import { ThemePreview } from "../../_theme-preview"
import { EmptyState } from "@/componentsSugest/EmptyState"

export default function EmptyStatePage() {
    return (
        <ThemePreview>
            <div className="h-[calc(100vh-53px)]">
                <EmptyState />
            </div>
        </ThemePreview>
    )
}
