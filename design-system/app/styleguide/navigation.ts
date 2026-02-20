export interface NavItem {
    name: string
    href: string
}

export interface NavSection {
    title: string
    items: NavItem[]
}

export const navigation: NavSection[] = [
    {
        title: "Foundation",
        items: [
            { name: "Design Tokens", href: "/styleguide" },
        ]
    },
    {
        title: "Components",
        items: [
            { name: "Navbar", href: "/styleguide/components/navbar" },
            { name: "Users Table", href: "/styleguide/components/users-table" },
            { name: "Sidebars", href: "/styleguide/components/sidebars" },
        ]
    },
    {
        title: "Pages",
        items: [
            { name: "Settings", href: "/styleguide/pages/settings" },
            { name: "General Settings", href: "/styleguide/pages/general-settings" },
            { name: "Account Settings", href: "/styleguide/pages/account-settings" },
        ]
    },
    {
        title: "Frames",
        items: [
            { name: "Frame Base", href: "/styleguide/frames/frame-base" },
        ]
    }
]
