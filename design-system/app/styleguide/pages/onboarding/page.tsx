import { ThemePreview } from "../../_theme-preview"
import { OnboardingPage } from "@/componentsSugest/OnboardingPage"

export default function OnboardingStyleguide() {
    return (
        <ThemePreview>
            <div className="h-[calc(100vh-53px)]">
                <OnboardingPage />
            </div>
        </ThemePreview>
    )
}
