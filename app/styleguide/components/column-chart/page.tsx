import { ThemePreview } from "../../_theme-preview"
import { BarGrouped, BarStacked } from "@/componentsSugest/charts/RechartsBarChart"

export default function ColumnChartPage() {
    return (
        <ThemePreview>
            <BarGrouped />
            <BarStacked />
        </ThemePreview>
    )
}
