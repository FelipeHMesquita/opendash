import { ThemePreview } from "../../_theme-preview"
import { SignUpPage } from "@/componentsSugest/SignUpPage"

export default function SignUpStyleguide() {
    return (
        <ThemePreview>
            <div className="h-[calc(100vh-53px)]">
                <SignUpPage />
            </div>
        </ThemePreview>
    )
}
