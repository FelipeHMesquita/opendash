"use client"

import * as React from "react"
import type { Page, PageId } from "./_builder-state"

export type BuilderPageContextValue = {
    pages: Page[]
    activePageId: PageId
}

export const BuilderPageContext = React.createContext<BuilderPageContextValue | null>(null)

export function useBuilderPage() {
    return React.useContext(BuilderPageContext)
}
