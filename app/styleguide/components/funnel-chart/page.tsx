import { ThemePreview } from "../../_theme-preview"
import { FunnelSales, FunnelMarketing } from "@/componentsSugest/charts/RechartsFunnelChart"

export default function FunnelChartPage() {
    return (
        <ThemePreview>
            <FunnelSales />
            <FunnelMarketing />
        </ThemePreview>
    )
}
