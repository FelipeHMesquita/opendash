import { ThemePreview } from "../../_theme-preview"
import { RadialGauge, RadialMulti, RadialStacked } from "@/componentsSugest/charts/RechartsRadialChart"

export default function RadialChartPage() {
    return (
        <ThemePreview>
            <RadialGauge />
            <RadialMulti />
            <RadialStacked />
        </ThemePreview>
    )
}
