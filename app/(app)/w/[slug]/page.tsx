"use client"

import * as React from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useData } from "@/app/_data-context"

export default function WorkspaceHome() {
    const params = useParams<{ slug: string }>()
    const router = useRouter()
    const { adapter, activeWorkspace, projects, refreshProjects } = useData()
    const [creating, setCreating] = React.useState(false)

    const handleCreate = async () => {
        if (!activeWorkspace || creating) return
        setCreating(true)
        try {
            const proj = await adapter.createProject(activeWorkspace.id, "Novo Projeto")
            await refreshProjects(activeWorkspace.id)
            const dashboards = await adapter.listDashboards(proj.id)
            if (dashboards.length > 0) {
                router.push(`/w/${params.slug}/p/${dashboards[0].id}`)
            }
        } finally {
            setCreating(false)
        }
    }

    const handleDelete = async (projectId: string) => {
        if (!activeWorkspace) return
        await adapter.deleteProject(projectId)
        await refreshProjects(activeWorkspace.id)
    }

    return (
        <div className="p-8">
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-foreground">
                        {activeWorkspace?.name ?? "Workspace"}
                    </h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        {projects.length === 0
                            ? "Crie seu primeiro projeto para começar"
                            : `${projects.length} projeto${projects.length !== 1 ? "s" : ""}`}
                    </p>
                </div>
                <button
                    onClick={handleCreate}
                    disabled={creating}
                    className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
                >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    {creating ? "Criando..." : "Novo Projeto"}
                </button>
            </div>

            {projects.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-border py-16">
                    <svg className="mb-4 h-12 w-12 text-muted-foreground/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25a2.25 2.25 0 01-2.25-2.25v-2.25z" />
                    </svg>
                    <p className="mb-1 text-sm font-medium text-foreground">Nenhum projeto</p>
                    <p className="mb-6 text-sm text-muted-foreground">Crie um projeto para começar a montar dashboards</p>
                    <button
                        onClick={handleCreate}
                        disabled={creating}
                        className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
                    >
                        {creating ? "Criando..." : "Criar primeiro projeto"}
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {projects.map(proj => (
                        <ProjectCard
                            key={proj.id}
                            project={proj}
                            slug={params.slug}
                            onDelete={() => handleDelete(proj.id)}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

function ProjectCard({
    project, slug, onDelete,
}: {
    project: import("@/lib/adapters/types").Project
    slug: string
    onDelete: () => void
}) {
    const { adapter } = useData()
    const [dashboardId, setDashboardId] = React.useState<string | null>(null)

    React.useEffect(() => {
        adapter.listDashboards(project.id).then(ds => {
            if (ds.length > 0) setDashboardId(ds[0].id)
        })
    }, [project.id, adapter])

    const href = dashboardId ? `/w/${slug}/p/${dashboardId}` : "#"
    const date = new Date(project.createdAt).toLocaleDateString("pt-BR", {
        day: "2-digit", month: "short", year: "numeric",
    })

    return (
        <div className="group relative rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/50">
            <Link href={href} className="absolute inset-0 z-10" />
            <div className="mb-3 flex items-start justify-between">
                <div className="rounded-lg bg-muted/50 p-2">
                    <svg className="h-5 w-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25a2.25 2.25 0 01-2.25-2.25v-2.25z" />
                    </svg>
                </div>
                <button
                    onClick={e => { e.preventDefault(); e.stopPropagation(); onDelete() }}
                    className="relative z-20 rounded p-1 text-muted-foreground opacity-0 transition-all hover:bg-destructive/10 hover:text-destructive group-hover:opacity-100"
                    title="Excluir projeto"
                >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                </button>
            </div>
            <h3 className="text-sm font-medium text-foreground">{project.name}</h3>
            {project.description && (
                <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{project.description}</p>
            )}
            <p className="mt-3 text-xs text-muted-foreground">{date}</p>
        </div>
    )
}
