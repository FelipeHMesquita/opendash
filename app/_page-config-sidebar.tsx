"use client"

import * as React from "react"
import {
    DndContext, PointerSensor, useSensor, useSensors, type DragEndEvent,
} from "@dnd-kit/core"
import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { cn } from "@/lib/utils"
import {
    type Page, type PageId, type NavItem, type BuilderAction,
    type PageLayout, type ResolvedLayout, resolveLayout, pageHasLayoutOverride,
    buildTree, flattenTree, type TreeNode, newPageId, newId,
} from "./_builder-state"

// ─── Icons ──────────────────────────────────────────────────────────────────

function PlusSmIcon() { return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5v14"/></svg> }
function TrashIcon() { return <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg> }
function SubPageIcon() { return <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/><rect x="3" y="3" width="18" height="18" rx="2" strokeOpacity=".3"/></svg> }
function GripVertIcon() { return <svg width="10" height="10" viewBox="0 0 12 12" fill="currentColor"><circle cx="4" cy="2" r="1"/><circle cx="8" cy="2" r="1"/><circle cx="4" cy="6" r="1"/><circle cx="8" cy="6" r="1"/><circle cx="4" cy="10" r="1"/><circle cx="8" cy="10" r="1"/></svg> }
function ChevronDownSm({ open }: { open: boolean }) { return <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={cn("transition-transform duration-150 shrink-0", open ? "" : "-rotate-90")}><path d="M6 9l6 6 6-6"/></svg> }
function CloseIcon() { return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg> }
function LayoutIcon() { return <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg> }
function CheckIcon() { return <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg> }

// ─── Layout overrides panel ─────────────────────────────────────────────────

type OverrideField = "showNavbar" | "showSidebar" | "showRightSidebar" | "sidebarItems" | "rightSidebarItems" | "navbarItems" | "padV" | "padH" | "sidebarWidth" | "rightSidebarWidth"

const OVERRIDE_GROUPS: { label: string; fields: { key: OverrideField; label: string }[] }[] = [
    {
        label: "Visibilidade",
        fields: [
            { key: "showNavbar", label: "Navbar" },
            { key: "showSidebar", label: "Sidebar esquerda" },
            { key: "showRightSidebar", label: "Sidebar direita" },
        ],
    },
    {
        label: "Navegação",
        fields: [
            { key: "navbarItems", label: "Links navbar" },
            { key: "sidebarItems", label: "Links sidebar esq." },
            { key: "rightSidebarItems", label: "Links sidebar dir." },
        ],
    },
    {
        label: "Grid",
        fields: [
            { key: "padV", label: "Padding vertical" },
            { key: "padH", label: "Padding horizontal" },
        ],
    },
    {
        label: "Largura sidebars",
        fields: [
            { key: "sidebarWidth", label: "Sidebar esquerda" },
            { key: "rightSidebarWidth", label: "Sidebar direita" },
        ],
    },
]

function LayoutOverridesPanel({
    page, pages, dispatch, rootLayout,
}: {
    page: Page; pages: Page[]; dispatch: React.Dispatch<BuilderAction>; rootLayout: ResolvedLayout
}) {
    const layout = page.layout ?? {}
    const resolved = resolveLayout(pages, page.id, rootLayout)

    function isOverridden(field: OverrideField): boolean {
        return layout[field] !== undefined
    }

    function toggleOverride(field: OverrideField) {
        if (isOverridden(field)) {
            dispatch({ type: "CLEAR_PAGE_LAYOUT_FIELD", pageId: page.id, field })
        } else {
            // Copy current resolved value as the starting override
            const val = resolved[field]
            dispatch({ type: "SET_PAGE_LAYOUT", pageId: page.id, layout: { [field]: val } as Partial<PageLayout> })
        }
    }

    function setField(field: OverrideField, value: unknown) {
        dispatch({ type: "SET_PAGE_LAYOUT", pageId: page.id, layout: { [field]: value } as Partial<PageLayout> })
    }

    function addNavItem(field: "navbarItems" | "sidebarItems" | "rightSidebarItems") {
        const current = (layout[field] as NavItem[] | undefined) ?? resolved[field]
        const item: NavItem = { id: newId(), label: `Link ${current.length + 1}`, targetPageId: null }
        setField(field, [...current, item])
    }

    function removeNavItem(field: "navbarItems" | "sidebarItems" | "rightSidebarItems", itemId: string) {
        const current = (layout[field] as NavItem[] | undefined) ?? resolved[field]
        setField(field, current.filter(i => i.id !== itemId))
    }

    function updateNavItemLabel(field: "navbarItems" | "sidebarItems" | "rightSidebarItems", itemId: string, label: string) {
        const current = (layout[field] as NavItem[] | undefined) ?? resolved[field]
        setField(field, current.map(i => i.id === itemId ? { ...i, label } : i))
    }

    function updateNavItemTarget(field: "navbarItems" | "sidebarItems" | "rightSidebarItems", itemId: string, targetPageId: PageId | null) {
        const current = (layout[field] as NavItem[] | undefined) ?? resolved[field]
        setField(field, current.map(i => i.id === itemId ? { ...i, targetPageId } : i))
    }

    function renderField(field: OverrideField) {
        const active = isOverridden(field)
        const value = active ? layout[field] : resolved[field]

        // Boolean fields (visibility toggles)
        if (field === "showNavbar" || field === "showSidebar" || field === "showRightSidebar") {
            if (!active) return <span className="text-[10px] text-muted-foreground/50">{(value as boolean) ? "visível" : "oculto"}</span>
            return (
                <button
                    onClick={() => setField(field, !(value as boolean))}
                    className={cn("text-[10px] rounded px-1.5 py-0.5 border transition-colors",
                        (value as boolean) ? "border-primary/40 bg-primary/10 text-primary" : "border-border text-muted-foreground"
                    )}
                >
                    {(value as boolean) ? "visível" : "oculto"}
                </button>
            )
        }

        // Number fields (grid, padding, sidebar width)
        if (field === "padV" || field === "padH" || field === "sidebarWidth" || field === "rightSidebarWidth") {
            if (!active) return <span className="text-[10px] text-muted-foreground/50">{String(value)}</span>
            const min = field.includes("Width") ? 80 : 0
            const max = field.includes("Width") ? 400 : 999
            const step = 4
            return (
                <input type="number" min={min} max={max} step={step} value={value as number}
                    onChange={e => setField(field, Math.max(min, Math.min(max, Number(e.target.value))))}
                    className="h-5 w-14 rounded border border-border bg-background px-1.5 text-[10px] text-foreground text-center"
                />
            )
        }

        // Nav item list fields
        if (field === "navbarItems" || field === "sidebarItems" || field === "rightSidebarItems") {
            const items = (active ? layout[field] : resolved[field]) as NavItem[]
            if (!active) return <span className="text-[10px] text-muted-foreground/50">{items.length} links</span>
            return (
                <div className="flex flex-col gap-1 mt-1">
                    {items.map(item => (
                        <div key={item.id} className="flex items-center gap-1 group/nav">
                            <input
                                value={item.label}
                                onChange={e => updateNavItemLabel(field, item.id, e.target.value)}
                                className="flex-1 min-w-0 h-5 px-1.5 rounded border border-border bg-background text-[10px] text-foreground"
                            />
                            <select
                                value={item.targetPageId ?? ""}
                                onChange={e => updateNavItemTarget(field, item.id, e.target.value || null)}
                                className="h-5 w-20 rounded border border-border bg-background px-0.5 text-[10px] text-foreground truncate"
                            >
                                <option value="">—</option>
                                {pages.map(p => <option key={p.id} value={p.id}>{p.label}</option>)}
                            </select>
                            <button onClick={() => removeNavItem(field, item.id)}
                                className="shrink-0 h-5 w-5 flex items-center justify-center rounded text-muted-foreground/50 hover:text-destructive transition-colors opacity-0 group-hover/nav:opacity-100">
                                <CloseIcon />
                            </button>
                        </div>
                    ))}
                    <button onClick={() => addNavItem(field)}
                        className="flex items-center gap-1 text-[10px] text-muted-foreground hover:text-foreground transition-colors px-1">
                        <PlusSmIcon /> adicionar
                    </button>
                </div>
            )
        }

        return null
    }

    // Find which ancestor provides the layout this page inherits from
    const inheritLabel = React.useMemo(() => {
        let cur = page.parentId ? pages.find(p => p.id === page.parentId) : null
        while (cur) {
            if (cur.layout && Object.keys(cur.layout).length > 0) return cur.label
            cur = cur.parentId ? pages.find(p => p.id === cur!.parentId) : null
        }
        return "raiz (global)"
    }, [page, pages])

    return (
        <div className="px-3 py-3">
            <div className="flex items-center gap-2 mb-3">
                <LayoutIcon />
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest flex-1">Layout: {page.label}</p>
            </div>
            <p className="text-[10px] text-muted-foreground/50 mb-3">Herda de: {inheritLabel}</p>

            {OVERRIDE_GROUPS.map(group => (
                <div key={group.label} className="mb-3">
                    <p className="text-[9px] font-semibold text-muted-foreground/60 uppercase tracking-wider mb-1.5">{group.label}</p>
                    {group.fields.map(({ key, label }) => (
                        <div key={key} className="mb-2">
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => toggleOverride(key)}
                                    className={cn(
                                        "shrink-0 flex h-3.5 w-3.5 items-center justify-center rounded-sm border transition-colors",
                                        isOverridden(key)
                                            ? "border-primary bg-primary text-primary-foreground"
                                            : "border-border text-transparent hover:border-muted-foreground"
                                    )}
                                >
                                    {isOverridden(key) && <CheckIcon />}
                                </button>
                                <span className={cn("text-[10px] flex-1", isOverridden(key) ? "text-foreground font-medium" : "text-muted-foreground")}>{label}</span>
                                {renderField(key)}
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}

// ─── Sortable page row ──────────────────────────────────────────────────────

function SortablePageRow({
    page, isActive, hasChildren, isExpanded, onToggleExpand, onSelect, onRename, onRemove, onAddChild, depth, isOnly,
}: {
    page: Page; isActive: boolean; hasChildren: boolean; isExpanded: boolean
    onToggleExpand: () => void; onSelect: () => void
    onRename: (label: string) => void; onRemove: () => void; onAddChild: () => void
    depth: number; isOnly: boolean
}) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: page.id })
    const [editing, setEditing] = React.useState(false)
    const [editValue, setEditValue] = React.useState(page.label)
    const inputRef = React.useRef<HTMLInputElement>(null)

    React.useEffect(() => { if (editing) inputRef.current?.select() }, [editing])

    const style: React.CSSProperties = {
        transform: CSS.Transform.toString(transform),
        transition,
        paddingLeft: depth * 24 + 8,
    }

    function commitRename() {
        const trimmed = editValue.trim()
        if (trimmed && trimmed !== page.label) onRename(trimmed)
        else setEditValue(page.label)
        setEditing(false)
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={cn(
                "group flex items-center gap-1.5 py-1.5 pr-2 rounded-md transition-colors relative",
                isDragging && "opacity-40",
                isActive ? "bg-primary/10" : "hover:bg-muted/50",
            )}
        >
            {/* Tree connector lines */}
            {depth > 0 && (
                <div className="absolute top-0 bottom-0" style={{ left: depth * 24 - 4 }}>
                    <div className="absolute top-0 bottom-1/2 w-px bg-border" />
                    <div className="absolute top-1/2 left-0 w-3 h-px bg-border" />
                </div>
            )}

            {/* Drag handle */}
            <div {...attributes} {...listeners} className="shrink-0 cursor-grab active:cursor-grabbing text-muted-foreground/40 hover:text-muted-foreground">
                <GripVertIcon />
            </div>

            {/* Expand toggle (only if has children) */}
            {hasChildren ? (
                <button onClick={onToggleExpand} className="shrink-0 text-muted-foreground hover:text-foreground">
                    <ChevronDownSm open={isExpanded} />
                </button>
            ) : (
                <span className="w-[10px] shrink-0" />
            )}

            {/* Label / input */}
            {editing ? (
                <input
                    ref={inputRef}
                    value={editValue}
                    onChange={e => setEditValue(e.target.value)}
                    onBlur={commitRename}
                    onKeyDown={e => { if (e.key === "Enter") commitRename(); if (e.key === "Escape") { setEditValue(page.label); setEditing(false) } }}
                    className="flex-1 min-w-0 h-6 px-1.5 rounded border border-primary/40 bg-background text-xs text-foreground outline-none"
                />
            ) : (
                <button
                    onClick={onSelect}
                    onDoubleClick={() => setEditing(true)}
                    className={cn(
                        "flex-1 min-w-0 text-left text-xs truncate rounded px-1.5 py-0.5 border transition-colors",
                        isActive
                            ? "border-primary/30 text-foreground font-medium"
                            : "border-transparent text-muted-foreground hover:text-foreground",
                    )}
                >
                    {page.label}
                </button>
            )}

            {/* Layout override indicator */}
            {pageHasLayoutOverride(page) && (
                <span className="shrink-0 text-primary/60" title="Layout override ativo">
                    <LayoutIcon />
                </span>
            )}

            {/* Action buttons (hover) */}
            <div className="shrink-0 flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={onAddChild} title="Adicionar sub-página"
                    className="flex h-5 w-5 items-center justify-center rounded text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                    <SubPageIcon />
                </button>
                {!isOnly && (
                    <button onClick={onRemove} title="Remover página"
                        className="flex h-5 w-5 items-center justify-center rounded text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors">
                        <TrashIcon />
                    </button>
                )}
            </div>
        </div>
    )
}

// ─── Main sidebar component ─────────────────────────────────────────────────

export function PageConfigSidebar({
    pages, activePageId, dispatch, onClose, rootLayout,
}: {
    pages: Page[]
    activePageId: PageId
    dispatch: React.Dispatch<BuilderAction>
    onClose: () => void
    rootLayout: ResolvedLayout
}) {
    const [expandedIds, setExpandedIds] = React.useState<Set<PageId>>(() => new Set(pages.map(p => p.id)))
    const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }))

    // Build tree and flatten for rendering
    const tree = React.useMemo(() => buildTree(pages), [pages])
    const flatNodes = React.useMemo(() => {
        // Only include children of expanded nodes
        const result: TreeNode[] = []
        function walk(nodes: TreeNode[]) {
            for (const node of nodes) {
                result.push(node)
                if (expandedIds.has(node.id)) walk(node.children)
            }
        }
        walk(tree)
        return result
    }, [tree, expandedIds])

    function toggleExpand(id: PageId) {
        setExpandedIds(prev => {
            const next = new Set(prev)
            if (next.has(id)) next.delete(id); else next.add(id)
            return next
        })
    }

    function handleDragEnd(e: DragEndEvent) {
        const { active, over } = e
        if (!over || active.id === over.id) return
        const activeId = String(active.id)
        const overId = String(over.id)
        // Only reorder if same parent
        const activePage = pages.find(p => p.id === activeId)
        const overPage = pages.find(p => p.id === overId)
        if (!activePage || !overPage || activePage.parentId !== overPage.parentId) return
        dispatch({ type: "REORDER_PAGE", pageId: activeId, direction: "up" }) // simplified — use actual position
    }

    function addRootPage() {
        const count = pages.filter(p => p.parentId === null).length
        dispatch({ type: "ADD_PAGE", parentId: null, label: `Página ${count + 1}` })
    }

    function addChildPage(parentId: PageId) {
        const parent = pages.find(p => p.id === parentId)
        const childCount = pages.filter(p => p.parentId === parentId).length
        const label = parent ? `${parent.label}.${childCount + 1}` : `Sub-página ${childCount + 1}`
        dispatch({ type: "ADD_PAGE", parentId, label })
        setExpandedIds(prev => new Set([...prev, parentId]))
    }

    // Gather siblings for each sortable context group
    const sortableIds = flatNodes.map(n => n.id)
    const activePage = pages.find(p => p.id === activePageId)

    return (
        <aside className={cn("w-72 h-full shrink-0 flex flex-col border-l border-border bg-card overflow-y-auto", "[&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[var(--border)]")}>
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border shrink-0">
                <div>
                    <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">Sitemap</p>
                    <p className="text-[10px] text-muted-foreground/50 mt-0.5">{pages.length} {pages.length === 1 ? "página" : "páginas"}</p>
                </div>
                <button onClick={onClose}
                    className="flex h-6 w-6 items-center justify-center rounded text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                    <CloseIcon />
                </button>
            </div>

            {/* Tree */}
            <div className={cn("flex-1 overflow-y-auto py-2 px-1", "[&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[var(--border)]")}>
                <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
                    <SortableContext items={sortableIds} strategy={verticalListSortingStrategy}>
                        {flatNodes.map(node => {
                            const hasChildren = pages.some(p => p.parentId === node.id)
                            return (
                                <SortablePageRow
                                    key={node.id}
                                    page={node}
                                    isActive={node.id === activePageId}
                                    hasChildren={hasChildren}
                                    isExpanded={expandedIds.has(node.id)}
                                    onToggleExpand={() => toggleExpand(node.id)}
                                    onSelect={() => dispatch({ type: "SET_ACTIVE_PAGE", pageId: node.id })}
                                    onRename={label => dispatch({ type: "RENAME_PAGE", pageId: node.id, label })}
                                    onRemove={() => dispatch({ type: "REMOVE_PAGE", pageId: node.id })}
                                    onAddChild={() => addChildPage(node.id)}
                                    depth={node.depth}
                                    isOnly={pages.length <= 1}
                                />
                            )
                        })}
                    </SortableContext>
                </DndContext>
            </div>

            {/* Add root page */}
            <div className="border-t border-border px-3 py-3 shrink-0">
                <button
                    onClick={addRootPage}
                    className="flex items-center gap-2 w-full px-3 py-2 rounded-md border border-dashed border-border text-xs text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
                >
                    <PlusSmIcon />
                    <span>Nova página</span>
                </button>
            </div>

            {/* Layout overrides for active page */}
            {activePage && (
                <div className="border-t border-border shrink-0">
                    <LayoutOverridesPanel page={activePage} pages={pages} dispatch={dispatch} rootLayout={rootLayout} />
                </div>
            )}

        </aside>
    )
}
