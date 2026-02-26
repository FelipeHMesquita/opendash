"use client"

import * as React from "react"
import { TrendingDown, TrendingUp } from "lucide-react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// ─── Data ────────────────────────────────────────────────────────────────────

const stats = [
    { title: "Total Revenue",       value: "$2.6M",    change: "+4.5%",  positive: true  },
    { title: "Average Order Value", value: "$455",     change: "-0.5%",  positive: false },
    { title: "Tickets Sold",        value: "5,888",    change: "+4.5%",  positive: true  },
    { title: "Pageviews",           value: "823,067",  change: "+21.2%", positive: true  },
]

const orders = [
    { id: "#3000", date: "May 9, 2024",  customer: "Leslie Alexander", event: "Bear Hug: Live in Concert", amount: "$80.00"  },
    { id: "#3001", date: "May 5, 2024",  customer: "Michael Foster",   event: "Six Fingers — DJ Set",      amount: "$299.00" },
    { id: "#3002", date: "May 3, 2024",  customer: "Dries Vincent",    event: "We All Look The Same",      amount: "$150.00" },
    { id: "#3003", date: "Apr 28, 2024", customer: "Lindsay Walton",   event: "Bear Hug: Live in Concert", amount: "$80.00"  },
    { id: "#3004", date: "Apr 25, 2024", customer: "Courtney Henry",   event: "Viking People",             amount: "$114.99" },
    { id: "#3005", date: "Apr 18, 2024", customer: "Tom Cook",         event: "Six Fingers — DJ Set",      amount: "$299.00" },
]

const periods = ["Last week", "Last two weeks", "Last month", "Last quarter"]

// ─── Component ───────────────────────────────────────────────────────────────

export function DashCardList() {
    const [period, setPeriod] = React.useState("Last month")

    return (
        <div className="w-full space-y-8 p-8">

            {/* Header */}
            <div>
                <h1 className="text-lg/7 font-semibold text-foreground">
                    Good afternoon, Erica
                </h1>
                <div className="mt-6 flex items-center justify-between">
                    <h2 className="text-base/7 font-semibold text-foreground">Overview</h2>
                    <select
                        value={period}
                        onChange={(e) => setPeriod(e.target.value)}
                        className="rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    >
                        {periods.map((p) => (
                            <option key={p}>{p}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
                {stats.map((stat) => (
                    <div
                        key={stat.title}
                        className="rounded-lg border border-border bg-card p-6"
                    >
                        <div className="flex items-center justify-between">
                            <p className="text-sm/6 font-medium text-muted-foreground">
                                {stat.title}
                            </p>
                            <span
                                className={cn(
                                    "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
                                    stat.positive
                                        ? "bg-success/10 text-success"
                                        : "bg-destructive/10 text-destructive"
                                )}
                            >
                                {stat.positive ? (
                                    <TrendingUp className="h-3 w-3" />
                                ) : (
                                    <TrendingDown className="h-3 w-3" />
                                )}
                                {stat.change}
                            </span>
                        </div>
                        <div className="mt-4 border-t border-border pt-4">
                            <p className="text-3xl/8 font-semibold tracking-tight text-foreground">
                                {stat.value}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Orders Table */}
            <div>
                <h2 className="text-base/7 font-semibold text-foreground">Recent orders</h2>
                <div className="mt-6 overflow-hidden rounded-lg border border-border bg-card">
                    <Table>
                        <TableHeader>
                            <TableRow className="border-border hover:bg-transparent">
                                <TableHead className="py-4 text-xs/6 font-semibold uppercase tracking-wider text-muted-foreground">
                                    Order number
                                </TableHead>
                                <TableHead className="py-4 text-xs/6 font-semibold uppercase tracking-wider text-muted-foreground">
                                    Purchase date
                                </TableHead>
                                <TableHead className="py-4 text-xs/6 font-semibold uppercase tracking-wider text-muted-foreground">
                                    Customer
                                </TableHead>
                                <TableHead className="py-4 text-xs/6 font-semibold uppercase tracking-wider text-muted-foreground">
                                    Event
                                </TableHead>
                                <TableHead className="py-4 text-right text-xs/6 font-semibold text-muted-foreground">
                                    Amount
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {orders.map((order) => (
                                <TableRow
                                    key={order.id}
                                    className="border-border transition-colors hover:bg-accent/50"
                                >
                                    <TableCell className="py-5 text-sm/6 font-medium text-primary">
                                        <Button variant="link" className="h-auto p-0 text-sm/6 font-medium">
                                            {order.id}
                                        </Button>
                                    </TableCell>
                                    <TableCell className="py-5 text-sm/6 text-muted-foreground">
                                        {order.date}
                                    </TableCell>
                                    <TableCell className="py-5 text-sm/6 font-medium text-foreground">
                                        {order.customer}
                                    </TableCell>
                                    <TableCell className="py-5 text-sm/6 text-muted-foreground">
                                        {order.event}
                                    </TableCell>
                                    <TableCell className="py-5 text-right text-sm/6 font-medium text-foreground">
                                        {order.amount}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>

        </div>
    )
}
