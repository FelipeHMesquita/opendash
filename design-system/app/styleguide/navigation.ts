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
            { name: "Design Tokens",  href: "/styleguide" },
            { name: "UI Showcase",    href: "/styleguide/components/ui-showcase" },
        ]
    },
    {
        title: "Components",
        items: [
            { name: "Navbar",           href: "/styleguide/components/navbar" },
            { name: "Sidebars",         href: "/styleguide/components/sidebars" },
            { name: "Dash Card List",   href: "/styleguide/components/dash-card-list" },
            { name: "Data Table",       href: "/styleguide/components/data-table" },
            { name: "Stat Cards",       href: "/styleguide/components/stat-cards" },
            { name: "Chart Card",       href: "/styleguide/components/chart-card" },
            { name: "Kanban Board",     href: "/styleguide/components/kanban-board" },
            { name: "Activity Feed",    href: "/styleguide/components/activity-feed" },
            { name: "Command Palette",  href: "/styleguide/components/command-palette" },
            { name: "Empty State",      href: "/styleguide/components/empty-state" },
        ]
    },
    {
        title: "Charts",
        items: [
            { name: "Column Chart", href: "/styleguide/components/column-chart" },
            { name: "Bar Chart",    href: "/styleguide/components/bar-chart"    },
            { name: "Pie Chart",    href: "/styleguide/components/pie-chart"    },
            { name: "Area Chart",   href: "/styleguide/components/area-chart"   },
            { name: "Line Chart",   href: "/styleguide/components/line-chart"   },
            { name: "Ranked List",  href: "/styleguide/components/ranked-list"  },
            { name: "Funnel Chart", href: "/styleguide/components/funnel-chart" },
        ]
    },
    {
        title: "Forms & People",
        items: [
            { name: "Form Page",    href: "/styleguide/components/form-page" },
            { name: "Team Page",    href: "/styleguide/components/team-page" },
            { name: "Users Table",  href: "/styleguide/components/users-table" },
        ]
    },
    {
        title: "Pages",
        items: [
            { name: "Login",             href: "/styleguide/pages/login" },
            { name: "Sign Up",           href: "/styleguide/pages/signup" },
            { name: "Onboarding",        href: "/styleguide/pages/onboarding" },
            { name: "Settings",          href: "/styleguide/pages/settings" },
            { name: "Account Settings",  href: "/styleguide/pages/account-settings" },
            { name: "General Settings",  href: "/styleguide/pages/general-settings" },
            { name: "Billing",           href: "/styleguide/pages/billing" },
            { name: "Notifications",     href: "/styleguide/pages/notifications" },
        ]
    },
]
