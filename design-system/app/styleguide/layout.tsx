"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { navigation } from "./navigation"
import { CartProvider } from "./_cart-context"
import { SidebarProvider, useSidebar } from "./_sidebar-context"
import { ThemeInspectorButton } from "./_theme-inspector"

export default function StyleguideLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <SidebarProvider>
            <LayoutInner>{children}</LayoutInner>
        </SidebarProvider>
    )
}

function LayoutInner({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const { collapsed } = useSidebar()

    return (
        <div className="grid min-h-screen grid-cols-[auto_1fr] bg-background text-foreground">
            {/* Nav sidebar */}
            <aside
                className={cn(
                    "sticky top-0 h-screen bg-card flex flex-col gap-6",
                    "transition-[width,padding,border-width,opacity] duration-200 ease-in-out",
                    "[&::-webkit-scrollbar]:w-1",
                    "[&::-webkit-scrollbar-track]:bg-transparent",
                    "[&::-webkit-scrollbar-thumb]:rounded-full",
                    "[&::-webkit-scrollbar-thumb]:bg-[var(--border)]",
                    collapsed
                        ? "w-0 p-0 overflow-hidden border-r-0 opacity-0 pointer-events-none"
                        : "w-60 p-5 overflow-y-auto border-r border-border opacity-100"
                )}
            >
                <div className="pt-1 shrink-0 flex items-center justify-between gap-2">
                    <Link href="/styleguide" className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-primary" />
                        <span className="text-sm font-semibold tracking-tight whitespace-nowrap">Design System</span>
                    </Link>
                    <ThemeInspectorButton />
                </div>

                <nav className="flex flex-1 flex-col gap-5">
                    {navigation.map((section) => (
                        <div key={section.title}>
                            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 px-3 whitespace-nowrap">
                                {section.title}
                            </h3>
                            <ul className="flex flex-col gap-0.5">
                                {section.items.map((item) => (
                                    <li key={item.href}>
                                        <Link
                                            href={item.href}
                                            className={cn(
                                                "block px-3 py-1.5 rounded-md text-sm transition-colors whitespace-nowrap",
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

            {/* Main content */}
            <main className="min-w-0 overflow-auto">
                <CartProvider>
                    {children}
                </CartProvider>
            </main>
        </div>
    )
}
