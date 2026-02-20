"use client"

import { UsersTable } from "@/components/UsersTable"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const USERS_TABLE_SOURCE = `import * as React from "react"
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
    { name: "Lindsay Walton", title: "Front-end Developer", email: "lindsay.walton@example.com", role: "Member" },
    { name: "Courtney Henry", title: "Designer", email: "courtney.henry@example.com", role: "Admin" },
    { name: "Tom Cook", title: "Director of Product", email: "tom.cook@example.com", role: "Member" },
    { name: "Whitney Francis", title: "Copywriter", email: "whitney.francis@example.com", role: "Admin" },
    { name: "Leonard Krasner", title: "Senior Designer", email: "leonard.krasner@example.com", role: "Owner" },
    { name: "Floyd Miles", title: "Principal Designer", email: "floyd.miles@example.com", role: "Member" },
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
                                <TableCell className="font-medium text-foreground">{user.name}</TableCell>
                                <TableCell className="text-muted-foreground">{user.title}</TableCell>
                                <TableCell className="text-muted-foreground">{user.email}</TableCell>
                                <TableCell className="text-muted-foreground">{user.role}</TableCell>
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
}`

export default function UsersTableStyleguidePage() {
    return (
        <div className="p-8 max-w-6xl mx-auto">
            <div className="mb-10">
                <h1 className="text-2xl font-bold">Users Table</h1>
                <p className="text-sm text-muted-foreground mt-1">
                    A data table component for displaying team members with sortable columns and row actions.
                </p>
            </div>

            <div className="space-y-12">
                {/* Preview Section */}
                <section>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold">Preview</h2>
                        <span className="text-xs bg-accent px-2 py-1 rounded text-muted-foreground">Component</span>
                    </div>
                    <div className="border rounded-xl overflow-hidden bg-background shadow-2xl">
                        <UsersTable />
                    </div>
                </section>

                {/* Documentation Section */}
                <section>
                    <h2 className="text-lg font-semibold mb-4">Usage</h2>
                    <Card>
                        <CardHeader>
                            <CardTitle>Structure</CardTitle>
                            <CardDescription>Composition of the UsersTable component.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Tabs defaultValue="overview">
                                <TabsList className="mb-4">
                                    <TabsTrigger value="overview">Overview</TabsTrigger>
                                    <TabsTrigger value="code">Code</TabsTrigger>
                                </TabsList>
                                <TabsContent value="overview">
                                    <div className="text-sm text-muted-foreground">
                                        <p>The <code>UsersTable</code> component demonstrates:</p>
                                        <ul className="list-disc list-inside mt-3 space-y-2 text-foreground">
                                            <li><strong>shadcn/ui Table:</strong> Semantic table with header, body and rows.</li>
                                            <li><strong>Design Tokens:</strong> <code>bg-card</code>, <code>border-border</code>, <code>hover:bg-accent/50</code>.</li>
                                            <li><strong>Row Actions:</strong> Inline edit link using <code>text-primary</code>.</li>
                                            <li><strong>Data Mapping:</strong> Renders from a local data array.</li>
                                        </ul>
                                    </div>
                                </TabsContent>
                                <TabsContent value="code">
                                    <pre className="p-4 rounded-lg bg-muted font-mono text-xs overflow-x-auto whitespace-pre-wrap">
                                        {USERS_TABLE_SOURCE}
                                    </pre>
                                </TabsContent>
                            </Tabs>
                        </CardContent>
                    </Card>
                </section>
            </div>
        </div>
    )
}
