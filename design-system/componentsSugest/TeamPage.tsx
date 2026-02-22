"use client"

import * as React from "react"
import { UserPlus, Mail, MoreHorizontal, Users } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarBadge, AvatarGroup, AvatarGroupCount } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

// ─── Data ────────────────────────────────────────────────────────────────────

const members = [
    { name: "Alice Monteiro",   role: "Product Designer",   dept: "Design",      online: true,  initials: "AM" },
    { name: "Bruno Costa",      role: "Frontend Engineer",  dept: "Engenharia",  online: true,  initials: "BC" },
    { name: "Carla Souza",      role: "Product Manager",    dept: "Produto",     online: false, initials: "CS" },
    { name: "Diego Lima",       role: "Backend Engineer",   dept: "Engenharia",  online: true,  initials: "DL" },
    { name: "Elena Park",       role: "Data Analyst",       dept: "Dados",       online: false, initials: "EP" },
    { name: "Felipe Rocha",     role: "DevOps Engineer",    dept: "Infra",       online: true,  initials: "FR" },
    { name: "Gabriela Nunes",   role: "UX Researcher",      dept: "Design",      online: false, initials: "GN" },
    { name: "Hugo Ferreira",    role: "QA Engineer",        dept: "Engenharia",  online: true,  initials: "HF" },
]

const deptStyles: Record<string, string> = {
    "Design":     "bg-violet-500/15 text-violet-400 border-violet-500/20",
    "Engenharia": "bg-blue-500/15 text-blue-400 border-blue-500/20",
    "Produto":    "bg-amber-500/15 text-amber-400 border-amber-500/20",
    "Dados":      "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
    "Infra":      "bg-rose-500/15 text-rose-400 border-rose-500/20",
}

// ─── Component ───────────────────────────────────────────────────────────────

export function TeamPage() {
    const onlineCount = members.filter(m => m.online).length

    return (
        <div className="w-full p-6">

            {/* Header */}
            <div className="mb-8 flex items-start justify-between">
                <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                        <h2 className="text-lg/7 font-semibold text-foreground">Time</h2>
                        <div className="flex items-center gap-3 mt-0.5">
                            <span className="text-sm text-muted-foreground">{members.length} membros</span>
                            <span className="flex items-center gap-1.5 text-sm text-emerald-400">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                                {onlineCount} online
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    {/* Avatar group preview */}
                    <AvatarGroup>
                        {members.slice(0, 4).map(m => (
                            <Avatar key={m.name} size="sm">
                                <AvatarFallback>{m.initials}</AvatarFallback>
                            </Avatar>
                        ))}
                        <AvatarGroupCount className="size-6 text-xs">
                            +{members.length - 4}
                        </AvatarGroupCount>
                    </AvatarGroup>
                    <Button size="sm">
                        <UserPlus />
                        Convidar
                    </Button>
                </div>
            </div>

            {/* Grid */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {members.map(member => (
                    <Card key={member.name} className="transition-colors duration-150 hover:bg-white/5">
                        <CardContent className="flex flex-col items-center gap-3 pt-6 pb-5 text-center">

                            {/* Avatar */}
                            <Avatar size="lg">
                                <AvatarFallback className="text-sm">{member.initials}</AvatarFallback>
                                {member.online && (
                                    <AvatarBadge className="bg-emerald-500 border-card" />
                                )}
                            </Avatar>

                            {/* Info */}
                            <div className="space-y-0.5">
                                <p className="text-sm font-semibold text-foreground">{member.name}</p>
                                <p className="text-xs text-muted-foreground">{member.role}</p>
                            </div>

                            {/* Dept badge */}
                            <Badge variant="outline" className={deptStyles[member.dept]}>
                                {member.dept}
                            </Badge>

                            {/* Actions */}
                            <div className="flex w-full items-center gap-2 pt-1">
                                <Button variant="outline" size="sm" className="flex-1">
                                    <Mail />
                                    Email
                                </Button>
                                <Button variant="ghost" size="icon-sm">
                                    <MoreHorizontal />
                                </Button>
                            </div>

                        </CardContent>
                    </Card>
                ))}
            </div>

        </div>
    )
}
