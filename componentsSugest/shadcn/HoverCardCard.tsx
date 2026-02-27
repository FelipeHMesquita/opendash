"use client"

import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const USERS = [
    { name: "Felipe M.", role: "Owner", initials: "FM" },
    { name: "Ana S.", role: "Admin", initials: "AS" },
    { name: "Carlos R.", role: "Member", initials: "CR" },
]

export function HoverCardCard() {
    return (
        <div className="w-full p-8">
            <div className="rounded-lg border border-border bg-card p-6 space-y-4">
                <h3 className="text-sm font-semibold text-foreground">Hover Card</h3>
                <p className="text-xs text-muted-foreground">Informações ao passar sobre um elemento</p>
                <div className="flex items-center gap-3">
                    {USERS.map((user) => (
                        <HoverCard key={user.name}>
                            <HoverCardTrigger asChild>
                                <button className="flex items-center gap-2 rounded-md px-2 py-1 hover:bg-muted transition-colors">
                                    <Avatar className="h-7 w-7">
                                        <AvatarFallback className="text-[10px] bg-primary/10 text-primary">
                                            {user.initials}
                                        </AvatarFallback>
                                    </Avatar>
                                    <span className="text-xs text-foreground">{user.name}</span>
                                </button>
                            </HoverCardTrigger>
                            <HoverCardContent className="w-56">
                                <div className="flex items-start gap-3">
                                    <Avatar className="h-9 w-9">
                                        <AvatarFallback className="bg-primary/10 text-primary text-xs">
                                            {user.initials}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h4 className="text-sm font-semibold">{user.name}</h4>
                                        <Badge variant="secondary" className="mt-1 text-[10px]">{user.role}</Badge>
                                        <p className="mt-2 text-xs text-muted-foreground">
                                            Membro desde Jan 2026
                                        </p>
                                    </div>
                                </div>
                            </HoverCardContent>
                        </HoverCard>
                    ))}
                </div>
            </div>
        </div>
    )
}
