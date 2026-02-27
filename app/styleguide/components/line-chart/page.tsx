import { ThemePreview } from "../../_theme-preview"
import { LineSimple, LineMulti } from "@/componentsSugest/charts/RechartsLineChart"

export default function LineChartPage() {
    return (
        <ThemePreview>
            <LineSimple />
            <LineMulti />
        </ThemePreview>
    )
}
