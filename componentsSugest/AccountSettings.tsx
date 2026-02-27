import * as React from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function AccountSettings() {
    return (
        <div className="flex min-h-screen w-full flex-col bg-background font-sans text-foreground">

            {/* Top Navigation & Search */}
            <header className="border-b border-border px-8 py-4 shrink-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-10">
                <div className="flex flex-col gap-6">
                    <div className="relative w-full max-w-md text-muted-foreground focus-within:text-foreground transition-colors">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
                        <Input
                            type="text"
                            placeholder="Search"
                            className="border-none bg-transparent pl-10 text-sm shadow-none focus-visible:ring-0 placeholder:text-muted-foreground/60"
                        />
                    </div>

                    <nav className="flex gap-6 text-sm font-medium">
                        <a href="#" className="border-b-2 border-primary pb-2 text-primary">Account</a>
                        <a href="#" className="border-b-2 border-transparent pb-2 text-muted-foreground hover:text-foreground transition-colors">Notifications</a>
                        <a href="#" className="border-b-2 border-transparent pb-2 text-muted-foreground hover:text-foreground transition-colors">Billing</a>
                        <a href="#" className="border-b-2 border-transparent pb-2 text-muted-foreground hover:text-foreground transition-colors">Teams</a>
                        <a href="#" className="border-b-2 border-transparent pb-2 text-muted-foreground hover:text-foreground transition-colors">Integrations</a>
                    </nav>
                </div>
            </header>

            {/* Main Content - Internal Scroll only here */}
            <main className="flex-1 px-8 py-12">
                <div className="space-y-16 pb-24">

                    {/* Section: Personal Information */}
                    <section className="grid grid-cols-1 gap-8 border-b border-border pb-12 md:grid-cols-3">
                        <div className="col-span-1">
                            <h2 className="text-base/7 font-semibold text-foreground">Personal Information</h2>
                            <p className="mt-1 text-sm text-muted-foreground leading-relaxed pr-4">
                                Use a permanent address where you can receive mail.
                            </p>
                        </div>

                        <div className="col-span-2 space-y-6">
                            {/* Avatar Row */}
                            <div className="flex items-center gap-6">
                                <Avatar className="h-16 w-16 rounded-md">
                                    <AvatarImage src="https://github.com/shadcn.png" alt="Profile picture" />
                                    <AvatarFallback className="rounded-md">TC</AvatarFallback>
                                </Avatar>
                                <div>
                                    <Button variant="secondary" className="border border-border">
                                        Change avatar
                                    </Button>
                                    <p className="mt-2 text-xs text-muted-foreground">JPG, GIF or PNG. 1MB max.</p>
                                </div>
                            </div>

                            {/* Name Row */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="first-name">First name</Label>
                                    <Input id="first-name" className="border-border bg-card" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="last-name">Last name</Label>
                                    <Input id="last-name" className="border-border bg-card" />
                                </div>
                            </div>

                            {/* Email */}
                            <div className="space-y-2">
                                <Label htmlFor="email">Email address</Label>
                                <Input id="email" className="border-border bg-card" />
                            </div>

                            {/* Username */}
                            <div className="space-y-2">
                                <Label htmlFor="username">Username</Label>
                                <div className="flex rounded-md border border-border bg-card focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background transition-colors">
                                    <span className="flex items-center px-3 text-sm text-muted-foreground border-r border-border bg-muted">example.com/</span>
                                    <input
                                        id="username"
                                        type="text"
                                        placeholder="janesmith"
                                        className="flex-1 bg-transparent py-2 px-3 text-sm text-foreground focus:outline-none placeholder:text-muted-foreground/40"
                                    />
                                </div>
                            </div>

                            {/* Timezone */}
                            <div className="space-y-2">
                                <Label htmlFor="timezone">Timezone</Label>
                                <div className="relative">
                                    <select
                                        id="timezone"
                                        className="w-full rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background appearance-none transition-colors"
                                    >
                                        <option>Pacific Standard Time</option>
                                        <option>Eastern Standard Time</option>
                                        <option>Greenwich Mean Time</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-muted-foreground">
                                        <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-2">
                                <Button className="px-6">Save</Button>
                            </div>
                        </div>
                    </section>

                    {/* Section: Change Password */}
                    <section className="grid grid-cols-1 gap-8 border-b border-border pb-12 md:grid-cols-3">
                        <div className="col-span-1">
                            <h2 className="text-base/7 font-semibold text-foreground">Change password</h2>
                            <p className="mt-1 text-sm text-muted-foreground leading-relaxed pr-4">
                                Update your password associated with your account.
                            </p>
                        </div>

                        <div className="col-span-2 space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="current-password">Current password</Label>
                                <Input id="current-password" type="password" className="border-border bg-card" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="new-password">New password</Label>
                                <Input id="new-password" type="password" className="border-border bg-card" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="confirm-password">Confirm password</Label>
                                <Input id="confirm-password" type="password" className="border-border bg-card" />
                            </div>

                            <div className="pt-2">
                                <Button className="px-6">Save</Button>
                            </div>
                        </div>
                    </section>

                    {/* Section: Log out other sessions */}
                    <section className="grid grid-cols-1 gap-8 border-b border-border pb-12 md:grid-cols-3">
                        <div className="col-span-1">
                            <h2 className="text-base/7 font-semibold text-foreground">Log out other sessions</h2>
                            <p className="mt-1 text-sm text-muted-foreground leading-relaxed pr-4">
                                Please enter your password to confirm you would like to log out of your other sessions across all of your devices.
                            </p>
                        </div>

                        <div className="col-span-2 space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="session-password">Your password</Label>
                                <Input id="session-password" type="password" className="border-border bg-card" />
                            </div>

                            <div className="pt-2">
                                <Button>Log out other sessions</Button>
                            </div>
                        </div>
                    </section>

                    {/* Section: Delete account */}
                    <section className="grid grid-cols-1 gap-8 pb-12 md:grid-cols-3">
                        <div className="col-span-1">
                            <h2 className="text-base/7 font-semibold text-destructive">Delete account</h2>
                            <p className="mt-1 text-sm text-muted-foreground leading-relaxed pr-4">
                                No longer want to use our service? You can delete your account here. This action is not reversible. All information related to this account will be deleted permanently.
                            </p>
                        </div>

                        <div className="col-span-2 flex items-start">
                            <Button variant="destructive">
                                Yes, delete my account
                            </Button>
                        </div>
                    </section>

                </div>
            </main>
        </div>
    )
}
