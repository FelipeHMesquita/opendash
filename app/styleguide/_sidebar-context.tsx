"use client"

import * as React from "react"

interface SidebarContextValue {
    collapsed: boolean
    toggle: () => void
}

const SidebarContext = React.createContext<SidebarContextValue>({
    collapsed: false,
    toggle: () => {},
})

const STORAGE_KEY = "styleguide_sidebar"

export function SidebarProvider({ children }: { children: React.ReactNode }) {
    const [collapsed, setCollapsed] = React.useState(false)

    React.useEffect(() => {
        if (localStorage.getItem(STORAGE_KEY) === "1") setCollapsed(true)
    }, [])

    function toggle() {
        setCollapsed((prev) => {
            const next = !prev
            localStorage.setItem(STORAGE_KEY, next ? "1" : "0")
            return next
        })
    }

    return (
        <SidebarContext.Provider value={{ collapsed, toggle }}>
            {children}
        </SidebarContext.Provider>
    )
}

export function useSidebar() {
    return React.useContext(SidebarContext)
}
