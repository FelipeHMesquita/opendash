import * as React from "react"
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

// Example data based on the design
const users = [
    {
        name: "Lindsay Walton",
        title: "Front-end Developer",
        email: "lindsay.walton@example.com",
        role: "Member",
    },
    {
        name: "Courtney Henry",
        title: "Designer",
        email: "courtney.henry@example.com",
        role: "Admin",
    },
    {
        name: "Tom Cook",
        title: "Director of Product",
        email: "tom.cook@example.com",
        role: "Member",
    },
    {
        name: "Whitney Francis",
        title: "Copywriter",
        email: "whitney.francis@example.com",
        role: "Admin",
    },
    {
        name: "Leonard Krasner",
        title: "Senior Designer",
        email: "leonard.krasner@example.com",
        role: "Owner",
    },
    {
        name: "Floyd Miles",
        title: "Principal Designer",
        email: "floyd.miles@example.com",
        role: "Member",
    },
]

export function UsersTable() {
    return (
        <div className="w-full bg-background p-8 font-sans text-foreground">
            {/* Header and Button */}
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-semibold text-foreground">Users</h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                        A list of all the users in your account including their name, title, email and role.
                    </p>
                </div>
                <Button className="bg-primary font-semibold hover:bg-primary/90">
                    Add user
                </Button>
            </div>

            {/* Table Container */}
            <div className="rounded-lg border border-border bg-card overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="border-border hover:bg-transparent">
                            <TableHead className="font-semibold text-muted-foreground">Name</TableHead>
                            <TableHead className="font-semibold text-muted-foreground">Title</TableHead>
                            <TableHead className="font-semibold text-muted-foreground">Email</TableHead>
                            <TableHead className="font-semibold text-muted-foreground">Role</TableHead>
                            <TableHead className="text-right"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow
                                key={user.email}
                                className="border-border transition-colors hover:bg-accent/50"
                            >
                                <TableCell className="font-medium text-foreground">
                                    {user.name}
                                </TableCell>
                                <TableCell className="text-muted-foreground">
                                    {user.title}
                                </TableCell>
                                <TableCell className="text-muted-foreground">
                                    {user.email}
                                </TableCell>
                                <TableCell className="text-muted-foreground">
                                    {user.role}
                                </TableCell>
                                <TableCell className="text-right font-medium">
                                    <button className="text-primary hover:text-primary/80 hover:underline">
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
