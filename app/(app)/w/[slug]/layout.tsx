"use client"

import * as React from "react"
import Link from "next/link"
import { useParams, useRouter, usePathname } from "next/navigation"
import { useAuth } from "@/app/_auth-context"
import { useData } from "@/app/_data-context"
import { cn } from "@/lib/utils"

export default function WorkspaceLayout({ children }: { children: React.ReactNode }) {
    const params = useParams<{ slug: string }>()
    const pathname = usePathname()
    const router = useRouter()
    const { user, signOut } = useAuth()
    const { adapter, workspaces, activeWorkspace, setActiveWorkspace, projects, refreshProjects } = useData()

    // Resolve workspace from slug
    React.useEffect(() => {
        if (!params.slug) return
        adapter.getWorkspaceBySlug(params.slug).then(ws => {
            if (ws) {
                setActiveWorkspace(ws)
                refreshProjects(ws.id)
            } else {
                router.replace("/")
            }
        })
    }, [params.slug, adapter, setActiveWorkspace, refreshProjects, router])

    // If we're inside /p/[id], render children fullscreen (builder has its own layout)
    const isBuilder = pathname.includes("/p/")
    if (isBuilder) return <>{children}</>

    const handleSignOut = async () => {
        await signOut()
        router.replace("/login")
    }

    return (
        <div className="flex min-h-screen bg-background">
            {/* Sidebar */}
            <aside className="flex w-64 flex-col border-r border-border bg-card">
                {/* Workspace header */}
                <div className="border-b border-border p-4">
                    {workspaces.length > 1 ? (
                        <select
                            value={activeWorkspace?.slug ?? ""}
                            onChange={e => {
                                const ws = workspaces.find(w => w.slug === e.target.value)
                                if (ws) router.push(`/w/${ws.slug}`)
                            }}
                            className="w-full rounded-lg border border-border bg-background px-3 py-1.5 text-sm font-medium text-foreground"
                        >
                            {workspaces.map(ws => (
                                <option key={ws.id} value={ws.slug}>{ws.name}</option>
                            ))}
                        </select>
                    ) : (
                        <p className="text-sm font-semibold text-foreground truncate">
                            {activeWorkspace?.name ?? "Workspace"}
                        </p>
                    )}
                </div>

                {/* Projects list */}
                <div className="flex-1 overflow-y-auto p-3">
                    <p className="mb-2 px-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Projetos
                    </p>
                    {projects.length === 0 ? (
                        <p className="px-2 text-sm text-muted-foreground">Nenhum projeto ainda</p>
                    ) : (
                        <div className="space-y-0.5">
                            {projects.map(proj => (
                                <ProjectRow key={proj.id} project={proj} slug={params.slug} />
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="border-t border-border p-3 space-y-2">
                    <NewProjectButton slug={params.slug} />
                    <div className="flex items-center gap-2 px-2">
                        <div className="flex-1 min-w-0">
                            <p className="truncate text-xs text-muted-foreground">{user?.email}</p>
                        </div>
                        <button
                            onClick={handleSignOut}
                            className="shrink-0 rounded px-2 py-1 text-xs text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                        >
                            Sair
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main content */}
            <main className="flex-1 overflow-auto">
                {children}
            </main>
        </div>
    )
}

function ProjectRow({ project, slug }: { project: import("@/lib/adapters/types").Project; slug: string }) {
    return (
        <Link
            href={`/w/${slug}/p/${project.id}`}
            className={cn(
                "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
                "text-muted-foreground hover:text-foreground hover:bg-muted/50",
            )}
        >
            <svg className="h-4 w-4 shrink-0 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25a2.25 2.25 0 01-2.25-2.25v-2.25z" />
            </svg>
            <span className="truncate">{project.name}</span>
        </Link>
    )
}

function NewProjectButton({ slug }: { slug: string }) {
    const { adapter, activeWorkspace, refreshProjects } = useData()
    const router = useRouter()
    const [creating, setCreating] = React.useState(false)

    const handleCreate = async () => {
        if (!activeWorkspace || creating) return
        setCreating(true)
        try {
            const proj = await adapter.createProject(activeWorkspace.id, "Novo Projeto")
            await refreshProjects(activeWorkspace.id)

            // Get the auto-created dashboard to navigate to it
            const dashboards = await adapter.listDashboards(proj.id)
            if (dashboards.length > 0) {
                router.push(`/w/${slug}/p/${dashboards[0].id}`)
            }
        } finally {
            setCreating(false)
        }
    }

    return (
        <button
            onClick={handleCreate}
            disabled={creating}
            className="flex w-full items-center gap-2 rounded-lg border border-dashed border-border px-3 py-2 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-primary disabled:opacity-50"
        >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            {creating ? "Criando..." : "Novo Projeto"}
        </button>
    )
}
