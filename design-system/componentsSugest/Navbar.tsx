import * as React from "react"
import { Bell, Waves } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

export function Navbar() {
    return (
        <header className="flex h-16 w-full items-center border-b border-border bg-background px-4 md:px-8">
            {/* Logo Area */}
            <div className="flex items-center text-primary">
                <Waves className="h-8 w-8" />
            </div>

            {/* Navigation Links */}
            <nav className="ml-8 flex h-full items-center gap-6">
                <a
                    href="#"
                    className="flex h-full items-center border-b-2 border-primary px-1 text-sm font-medium text-foreground"
                >
                    Dashboard
                </a>
                <a
                    href="#"
                    className="flex h-full items-center border-b-2 border-transparent px-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                    Team
                </a>
                <a
                    href="#"
                    className="flex h-full items-center border-b-2 border-transparent px-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                    Projects
                </a>
                <a
                    href="#"
                    className="flex h-full items-center border-b-2 border-transparent px-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                    Calendar
                </a>
            </nav>

            {/* Right Icons and Profile */}
            <div className="ml-auto flex items-center gap-4">
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                    <Bell className="h-5 w-5" />
                    <span className="sr-only">Notifications</span>
                </Button>

                <Avatar className="h-8 w-8 cursor-pointer border border-border">
                    <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                    <AvatarFallback>US</AvatarFallback>
                </Avatar>
            </div>
        </header>
    )
}
