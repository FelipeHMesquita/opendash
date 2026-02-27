"use client"

import * as React from "react"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
    BreadcrumbEllipsis,
} from "@/components/ui/breadcrumb"
import { useBuilderPage } from "@/app/_builder-page-context"
import type { Page, PageId } from "@/app/_builder-state"

// ── Compute ancestor chain from flat pages array ─────────────────────────────

function getAncestorChain(pages: Page[], pageId: PageId): { id: PageId; label: string }[] {
    const chain: { id: PageId; label: string }[] = []
    let cur: Page | undefined = pages.find(p => p.id === pageId)
    while (cur) {
        chain.unshift({ id: cur.id, label: cur.label })
        cur = cur.parentId ? pages.find(p => p.id === cur!.parentId) : undefined
    }
    return chain
}

// ── Fallback for styleguide (no context) ─────────────────────────────────────

const STATIC_CRUMBS = [
    { id: "1", label: "Home" },
    { id: "2", label: "Workspace" },
    { id: "3", label: "Projetos" },
    { id: "4", label: "Dashboard Analytics" },
]

const MAX_VISIBLE = 4

export function BuilderBreadcrumb() {
    const ctx = useBuilderPage()

    const crumbs = ctx
        ? getAncestorChain(ctx.pages, ctx.activePageId)
        : STATIC_CRUMBS

    // If only one level (root page), still show it
    if (crumbs.length === 0) return null

    // For long chains (>MAX_VISIBLE): root + ... + last 2
    const useEllipsis = crumbs.length > MAX_VISIBLE
    const visible = useEllipsis
        ? [crumbs[0], ...crumbs.slice(-2)]
        : crumbs

    return (
        <div className="w-full p-8">
            <div className="rounded-lg border border-border bg-card p-6">
                <Breadcrumb>
                    <BreadcrumbList>
                        {visible.map((crumb, i) => {
                            const isLast = i === visible.length - 1
                            const showEllipsis = useEllipsis && i === 0

                            return (
                                <React.Fragment key={crumb.id}>
                                    <BreadcrumbItem>
                                        {isLast ? (
                                            <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                                        ) : (
                                            <BreadcrumbLink href="#">{crumb.label}</BreadcrumbLink>
                                        )}
                                    </BreadcrumbItem>

                                    {showEllipsis && (
                                        <>
                                            <BreadcrumbSeparator />
                                            <BreadcrumbItem>
                                                <BreadcrumbEllipsis />
                                            </BreadcrumbItem>
                                        </>
                                    )}

                                    {!isLast && <BreadcrumbSeparator />}
                                </React.Fragment>
                            )
                        })}
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
        </div>
    )
}
