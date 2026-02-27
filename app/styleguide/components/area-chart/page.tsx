import { ThemePreview } from "../../_theme-preview"
import { AreaSimple, AreaStacked } from "@/componentsSugest/charts/RechartsAreaChart"

export default function AreaChartPage() {
    return (
        <ThemePreview>
            <AreaSimple />
            <AreaStacked />
        </ThemePreview>
    )
}
