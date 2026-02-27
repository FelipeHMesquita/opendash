import { ThemePreview } from "../../_theme-preview"
import { PieSimple, PieDonut, PieSeparated } from "@/componentsSugest/charts/RechartsPieChart"

export default function PieChartPage() {
    return (
        <ThemePreview>
            <PieSimple />
            <PieDonut />
            <PieSeparated />
        </ThemePreview>
    )
}
