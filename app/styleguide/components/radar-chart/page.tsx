import { ThemePreview } from "../../_theme-preview"
import { RadarSimple, RadarMulti } from "@/componentsSugest/charts/RechartsRadarChart"

export default function RadarChartPage() {
    return (
        <ThemePreview>
            <RadarSimple />
            <RadarMulti />
        </ThemePreview>
    )
}
