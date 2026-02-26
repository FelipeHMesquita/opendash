"use client"

import * as React from "react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

// ─── Data ────────────────────────────────────────────────────────────────────

const users = [
    { name: "Lindsay Walton",  title: "Front-end Developer",  email: "lindsay.walton@example.com",  role: "Member" },
    { name: "Courtney Henry",  title: "Designer",             email: "courtney.henry@example.com",  role: "Admin"  },
    { name: "Tom Cook",        title: "Director of Product",  email: "tom.cook@example.com",        role: "Member" },
    { name: "Whitney Francis", title: "Copywriter",           email: "whitney.francis@example.com", role: "Admin"  },
    { name: "Leonard Krasner", title: "Senior Designer",      email: "leonard.krasner@example.com", role: "Owner"  },
    { name: "Floyd Miles",     title: "Principal Designer",   email: "floyd.miles@example.com",     role: "Member" },
]

// ─── Component ───────────────────────────────────────────────────────────────

export function UsersTable() {
    return (
        <div className="w-full p-8">

            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h2 className="text-lg/7 font-semibold text-foreground">Users</h2>
                    <p className="mt-1 text-sm/6 text-muted-foreground">
                        A list of all the users in your account including their name, title, email and role.
                    </p>
                </div>
                <button className="inline-flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90">
                    Add user
                </button>
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-lg border border-border bg-card">
                <Table>
                    <TableHeader>
                        <TableRow className="border-border hover:bg-transparent">
                            <TableHead className="px-3 py-4 text-xs/6 font-semibold uppercase tracking-wider text-muted-foreground">Name</TableHead>
                            <TableHead className="px-3 py-4 text-xs/6 font-semibold uppercase tracking-wider text-muted-foreground">Title</TableHead>
                            <TableHead className="px-3 py-4 text-xs/6 font-semibold uppercase tracking-wider text-muted-foreground">Email</TableHead>
                            <TableHead className="px-3 py-4 text-xs/6 font-semibold uppercase tracking-wider text-muted-foreground">Role</TableHead>
                            <TableHead className="px-3 py-4 text-right" />
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow
                                key={user.email}
                                className="border-border transition-colors hover:bg-accent/50"
                            >
                                <TableCell className="px-3 py-5 text-sm/6 font-medium text-foreground">
                                    {user.name}
                                </TableCell>
                                <TableCell className="px-3 py-5 text-sm/6 text-muted-foreground">
                                    {user.title}
                                </TableCell>
                                <TableCell className="px-3 py-5 text-sm/6 text-muted-foreground">
                                    {user.email}
                                </TableCell>
                                <TableCell className="px-3 py-5 text-sm/6 text-muted-foreground">
                                    {user.role}
                                </TableCell>
                                <TableCell className="px-3 py-5 text-right">
                                    <button className="text-sm/6 font-medium text-primary hover:underline">
                                        Edit
                                    </button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

        </div>
    )
}
