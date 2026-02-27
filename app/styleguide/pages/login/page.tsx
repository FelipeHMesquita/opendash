import { ThemePreview } from "../../_theme-preview"
import { LoginPage } from "@/componentsSugest/LoginPage"

export default function LoginStyleguide() {
    return (
        <ThemePreview>
            <div className="h-[calc(100vh-53px)]">
                <LoginPage />
            </div>
        </ThemePreview>
    )
}
