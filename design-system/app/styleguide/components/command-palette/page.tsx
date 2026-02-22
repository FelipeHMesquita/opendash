import { ThemePreview } from "../../_theme-preview"
import { CommandPalette } from "@/componentsSugest/CommandPalette"

export default function CommandPalettePage() {
    return (
        <ThemePreview>
            <div className="h-[calc(100vh-53px)]">
                <CommandPalette />
            </div>
        </ThemePreview>
    )
}
