// ─── Static design tokens for comprehensive export ──────────────────────────

// ─── Typography ──────────────────────────────────────────────────────────────

export const TYPOGRAPHY_TOKENS = {
    fontFamily: {
        sans: "Inter, ui-sans-serif, system-ui, -apple-system, sans-serif",
        mono: "Geist Mono, ui-monospace, SFMono-Regular, monospace",
    },
    sizes: {
        xs:   "12px / 0.75rem",
        sm:   "14px / 0.875rem",
        base: "16px / 1rem",
        lg:   "18px / 1.125rem",
        xl:   "20px / 1.25rem",
        "2xl":"24px / 1.5rem",
        "3xl":"30px / 1.875rem",
    },
    weights: {
        normal:   400,
        medium:   500,
        semibold: 600,
        bold:     700,
    },
    lineHeights: {
        tight:   1.25,
        snug:    1.375,
        normal:  1.5,
        relaxed: 1.625,
    },
} as const

// ─── Spacing ─────────────────────────────────────────────────────────────────

export const SPACING_SCALE = [
    { key: "0",    px: 0  },
    { key: "0.5",  px: 2  },
    { key: "1",    px: 4  },
    { key: "1.5",  px: 6  },
    { key: "2",    px: 8  },
    { key: "3",    px: 12 },
    { key: "4",    px: 16 },
    { key: "5",    px: 20 },
    { key: "6",    px: 24 },
    { key: "8",    px: 32 },
    { key: "10",   px: 40 },
    { key: "12",   px: 48 },
    { key: "16",   px: 64 },
] as const

// ─── Border Radius ───────────────────────────────────────────────────────────

export const RADIUS_TOKENS = {
    sm:   "calc(var(--radius) - 2px)  → 4px",
    md:   "var(--radius)              → 6px",
    lg:   "calc(var(--radius) + 4px)  → 10px",
    xl:   "calc(var(--radius) + 8px)  → 14px",
    "2xl":"calc(var(--radius) + 16px) → 22px",
    full: "9999px",
} as const

// ─── Shadows / Elevation ─────────────────────────────────────────────────────

export const SHADOW_TOKENS = {
    sm:  "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    md:  "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    lg:  "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    xl:  "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
    surfaceElevation: "background → card → accent → popover (progressão de luminosidade OKLCH)",
} as const

// ─── Chart Color Semantics ───────────────────────────────────────────────────

export const CHART_COLOR_SEMANTICS = [
    { variable: "--chart-1", semantic: "primary-series",     label: "Purple",  lightValue: "oklch(0.62 0.22 284)", darkValue: "oklch(0.62 0.22 284)" },
    { variable: "--chart-2", semantic: "secondary-series",   label: "Emerald", lightValue: "oklch(0.70 0.17 163)", darkValue: "oklch(0.70 0.17 163)" },
    { variable: "--chart-3", semantic: "tertiary-series",    label: "Red",     lightValue: "oklch(0.65 0.24 16)",  darkValue: "oklch(0.65 0.24 16)"  },
    { variable: "--chart-4", semantic: "quaternary-series",  label: "Amber",   lightValue: "oklch(0.83 0.19 84)",  darkValue: "oklch(0.83 0.19 84)"  },
    { variable: "--chart-5", semantic: "quinary-series",     label: "Blue",    lightValue: "oklch(0.60 0.19 230)", darkValue: "oklch(0.60 0.19 230)" },
] as const

// ─── Chart Styling Tokens ────────────────────────────────────────────────────

export const CHART_STYLING_TOKENS = {
    axisTick: { color: "var(--muted-foreground)", fontSize: "12px" },
    axisLine: { color: "var(--border)" },
    gridLines: { color: "var(--border)", style: "dashed (strokeDasharray 3 3)", vertical: false },
    tooltip: {
        background: "var(--accent)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius)",
        labelColor: "var(--muted-foreground)",
        labelSize: "text-xs (12px)",
        valueColor: "var(--foreground)",
        valueSize: "text-sm font-semibold (14px 600)",
    },
    cursor: {
        bar:  { color: "var(--border)", fillOpacity: 0.5 },
        line: { color: "var(--border)", strokeWidth: 1 },
    },
    legend: {
        dotSize: "8px (h-2 w-2 rounded-full)",
        labelSize: "text-xs (12px)",
        labelColor: "var(--muted-foreground)",
        position: "bottom-center",
    },
    gradients: {
        area: {
            type: "linearGradient vertical",
            stops: [
                { offset: "5%",  stopOpacity: 0.2  },
                { offset: "95%", stopOpacity: 0.02 },
            ],
        },
    },
    animations: "disabled (isAnimationActive={false})",
} as const

// ─── Global CSS Variables (não variam por tema) ──────────────────────────────

export const GLOBAL_CSS_VARS = {
    chart: [
        "--chart-1: oklch(0.62 0.22 284)",
        "--chart-2: oklch(0.70 0.17 163)",
        "--chart-3: oklch(0.65 0.24 16)",
        "--chart-4: oklch(0.83 0.19 84)",
        "--chart-5: oklch(0.60 0.19 230)",
    ],
    sidebar: [
        "--sidebar: oklch(0.97 0 0)",
        "--sidebar-foreground: oklch(0.13 0 0)",
        "--sidebar-primary: oklch(0.62 0.22 284)",
        "--sidebar-primary-foreground: oklch(1 0 0)",
        "--sidebar-accent: oklch(0.93 0 0)",
        "--sidebar-accent-foreground: oklch(0.13 0 0)",
        "--sidebar-border: oklch(0.9 0 0)",
        "--sidebar-ring: oklch(0.62 0.22 284)",
    ],
    semantic: [
        "--success: oklch(0.65 0.18 142)",
        "--success-foreground: oklch(1 0 0)",
        "--warning: oklch(0.77 0.18 71)",
        "--warning-foreground: oklch(0.13 0 0)",
        "--info: oklch(0.62 0.20 245)",
        "--info-foreground: oklch(1 0 0)",
    ],
    extra: [
        "--secondary: oklch(0.96 0 0)",
        "--secondary-foreground: oklch(0.13 0 0)",
        "--destructive: oklch(0.58 0.245 27)",
        "--destructive-foreground: oklch(1 0 0)",
        "--popover: oklch(1 0 0)",
        "--popover-foreground: oklch(0.13 0 0)",
        "--input: oklch(0.88 0 0)",
    ],
    radius: [
        "--radius: 0.375rem (6px)",
    ],
} as const

// ─── Default Sidebar Icons ───────────────────────────────────────────────────

export const DEFAULT_SIDEBAR_ICONS: Record<string, string> = {
    "Início":      "House",
    "Dashboard":   "BarChart2",
    "Análises":    "LayoutGrid",
    "Relatórios":  "Archive",
    "Usuários":    "Users2",
    "Produtos":    "Package",
    "Config.":     "Settings",
}

export const DEFAULT_NAVBAR_ICONS: Record<string, string> = {
    "Dashboard":   "LayoutDashboard",
    "Relatórios":  "FileText",
    "Vendas":      "ShoppingCart",
    "Config":      "Settings",
}

// ─── Layout Constants ────────────────────────────────────────────────────────

export const NAVBAR_HEIGHT_PX = 64
export const SIDEBAR_DEFAULT_WIDTH_PX = 192
export const SIDEBAR_COLLAPSED_WIDTH_PX = 56
