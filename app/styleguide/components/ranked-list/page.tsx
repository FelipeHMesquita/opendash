import { ThemePreview } from "../../_theme-preview"
import { RankedSimple, RankedCategory } from "@/componentsSugest/charts/RechartsRankedList"

export default function RankedListPage() {
    return (
        <ThemePreview>
            <RankedSimple />
            <RankedCategory />
        </ThemePreview>
    )
}
