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
    buildTree, flattenTree, type TreeNode, newPageId, newId,
} from "./_builder-state"

// ─── Icons ──────────────────────────────────────────────────────────────────

function PlusSmIcon() { return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5v14"/></svg> }
function TrashIcon() { return <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg> }
function SubPageIcon() { return <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/><rect x="3" y="3" width="18" height="18" rx="2" strokeOpacity=".3"/></svg> }
function GripVertIcon() { return <svg width="10" height="10" viewBox="0 0 12 12" fill="currentColor"><circle cx="4" cy="2" r="1"/><circle cx="8" cy="2" r="1"/><circle cx="4" cy="6" r="1"/><circle cx="8" cy="6" r="1"/><circle cx="4" cy="10" r="1"/><circle cx="8" cy="10" r="1"/></svg> }
function ChevronDownSm({ open }: { open: boolean }) { return <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={cn("transition-transform duration-150 shrink-0", open ? "" : "-rotate-90")}><path d="M6 9l6 6 6-6"/></svg> }
function CloseIcon() { return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg> }

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
    pages, activePageId, navbarItems, sidebarItems, dispatch, onClose,
}: {
    pages: Page[]
    activePageId: PageId
    navbarItems: NavItem[]
    sidebarItems: NavItem[]
    dispatch: React.Dispatch<BuilderAction>
    onClose: () => void
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

    return (
        <aside className={cn("w-72 shrink-0 flex flex-col border-l border-border bg-card overflow-y-auto", "[&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[var(--border)]")}>
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

            {/* Nav links section */}
            <NavLinksSection pages={pages} navbarItems={navbarItems} sidebarItems={sidebarItems} dispatch={dispatch} />
        </aside>
    )
}

// ─── Navigation links section ───────────────────────────────────────────────

function NavLinksSection({
    pages, navbarItems, sidebarItems, dispatch,
}: {
    pages: Page[]; navbarItems: NavItem[]; sidebarItems: NavItem[]; dispatch: React.Dispatch<BuilderAction>
}) {
    return (
        <div className="border-t border-border px-4 py-3 shrink-0">
            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-3">Navegação</p>

            <div className="space-y-3">
                <NavLinkGroup
                    title="Navbar"
                    target="navbar"
                    items={navbarItems}
                    pages={pages}
                    dispatch={dispatch}
                />
                <NavLinkGroup
                    title="Sidebar"
                    target="sidebar"
                    items={sidebarItems}
                    pages={pages}
                    dispatch={dispatch}
                />
            </div>
        </div>
    )
}

function NavLinkGroup({
    title, target, items, pages, dispatch,
}: {
    title: string
    target: "navbar" | "sidebar"
    items: NavItem[]
    pages: Page[]
    dispatch: React.Dispatch<BuilderAction>
}) {
    return (
        <div>
            <p className="text-[10px] text-muted-foreground/60 mb-1.5">{title}</p>
            <div className="space-y-1">
                {items.map(item => (
                    <div key={item.id} className="flex items-center gap-2">
                        <span className="text-[10px] text-muted-foreground w-20 truncate shrink-0">{item.label}</span>
                        <select
                            value={item.targetPageId ?? ""}
                            onChange={e => {
                                const pageId = e.target.value || null
                                dispatch({ type: "UPDATE_NAV_ITEM", target, itemId: item.id, targetPageId: pageId })
                            }}
                            className={cn(
                                "flex-1 h-5 rounded border bg-background px-1 text-[10px] outline-none transition-colors",
                                item.targetPageId ? "border-primary/30 text-foreground" : "border-border text-muted-foreground/50",
                            )}
                        >
                            <option value="">— nenhum —</option>
                            {pages.map(p => (
                                <option key={p.id} value={p.id}>{p.label}</option>
                            ))}
                        </select>
                        <button
                            onClick={() => dispatch({ type: "REMOVE_NAV_ITEM", target, itemId: item.id })}
                            className="shrink-0 flex h-4 w-4 items-center justify-center rounded text-muted-foreground/40 hover:text-destructive transition-colors"
                            title="Remover"
                        >
                            <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
                        </button>
                    </div>
                ))}
                <button
                    onClick={() => dispatch({ type: "ADD_NAV_ITEM", target, item: { id: newId(), label: target === "navbar" ? "navlink" : "sidelink", targetPageId: null } })}
                    className="flex items-center gap-1 text-[10px] text-muted-foreground/40 hover:text-primary transition-colors mt-1"
                >
                    <PlusSmIcon /> adicionar
                </button>
            </div>
        </div>
    )
}
