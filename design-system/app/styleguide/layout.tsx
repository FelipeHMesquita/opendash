"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { navigation } from "./navigation"

export default function StyleguideLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname()

    return (
        <div className="flex min-h-screen">
            {/* Sidebar - Fixed */}
            <aside className="w-60 border-r bg-card p-5 flex flex-col gap-6 fixed top-0 left-0 h-screen overflow-y-auto">
                <div className="pt-1">
                    <Link href="/styleguide" className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-primary" />
                        <span className="text-sm font-semibold tracking-tight">Design System</span>
                    </Link>
                </div>

                <nav className="flex flex-col gap-5">
                    {navigation.map((section) => (
                        <div key={section.title}>
                            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 px-3">
                                {section.title}
                            </h3>
                            <ul className="flex flex-col gap-0.5">
                                {section.items.map((item) => (
                                    <li key={item.href}>
                                        <Link
                                            href={item.href}
                                            className={cn(
                                                "block px-3 py-1.5 rounded-md text-sm transition-colors",
                                                pathname === item.href
                                                    ? "bg-primary text-primary-foreground font-medium"
                                                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                                            )}
                                        >
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </nav>
            </aside>

            {/* Main content - offset by sidebar width */}
            <main className="flex-1 ml-60 overflow-auto">
                {children}
            </main>
        </div>
    )
}
