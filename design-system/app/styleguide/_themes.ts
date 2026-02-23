// ─── Theme types & data ───────────────────────────────────────────────────────
// Shared between _theme-preview.tsx (UI) and export/page.tsx (code generation)

export type ThemeName = "Light" | "Dark" | "Graphite" | "Midnight" | "Amethyst" | "Forest" | "Custom"

export const ALL_THEMES: Exclude<ThemeName, "Custom">[] = ["Light", "Dark", "Graphite", "Midnight", "Amethyst", "Forest"]

export const DARK_SHARED: Record<string, string> = {
    "--foreground":         "oklch(0.97 0 0)",
    "--card-foreground":    "oklch(0.97 0 0)",
    "--muted-foreground":   "oklch(0.60 0 0)",
    "--accent-foreground":  "oklch(0.97 0 0)",
    "--primary":            "oklch(0.62 0.22 250)",
    "--primary-foreground": "oklch(1 0 0)",
    "--ring":               "oklch(0.62 0.22 250)",
}

export const themes: Record<Exclude<ThemeName, "Custom">, Record<string, string>> = {
    "Light": {
        "--background":         "oklch(0.98 0 0)",
        "--foreground":         "oklch(0.13 0 0)",
        "--card":               "oklch(1.00 0 0)",
        "--card-foreground":    "oklch(0.13 0 0)",
        "--muted":              "oklch(0.96 0 0)",
        "--muted-foreground":   "oklch(0.52 0 0)",
        "--border":             "oklch(0 0 0 / 8%)",
        "--accent":             "oklch(0.96 0 0)",
        "--accent-foreground":  "oklch(0.13 0 0)",
        "--primary":            "oklch(0.30 0.18 250)",
        "--primary-foreground": "oklch(1 0 0)",
        "--ring":               "oklch(0.30 0.18 250)",
    },
    "Dark": {
        ...DARK_SHARED,
        "--background": "oklch(0.08 0 0)",
        "--card":       "oklch(0.12 0 0)",
        "--muted":      "oklch(0.18 0 0)",
        "--accent":     "oklch(0.20 0 0)",
        "--border":     "oklch(1 0 0 / 10%)",
    },
    "Graphite": {
        ...DARK_SHARED,
        "--background": "oklch(0.13 0 0)",
        "--card":       "oklch(0.16 0 0)",
        "--muted":      "oklch(0.21 0 0)",
        "--accent":     "oklch(0.23 0 0)",
        "--border":     "oklch(1 0 0 / 8%)",
    },
    "Midnight": {
        ...DARK_SHARED,
        "--background": "oklch(0.09 0.025 230)",
        "--card":       "oklch(0.13 0.018 230)",
        "--muted":      "oklch(0.19 0.014 230)",
        "--accent":     "oklch(0.22 0.014 230)",
        "--border":     "oklch(1 0 0 / 10%)",
    },
    "Amethyst": {
        ...DARK_SHARED,
        "--background": "oklch(0.08 0.012 284)",
        "--card":       "oklch(0.12 0.009 284)",
        "--muted":      "oklch(0.18 0.007 284)",
        "--accent":     "oklch(0.21 0.007 284)",
        "--border":     "oklch(1 0 0 / 10%)",
    },
    "Forest": {
        ...DARK_SHARED,
        "--background": "oklch(0.08 0.015 160)",
        "--card":       "oklch(0.12 0.012 160)",
        "--muted":      "oklch(0.17 0.010 160)",
        "--accent":     "oklch(0.21 0.010 160)",
        "--border":     "oklch(1 0 0 / 10%)",
    },
}

export const THEME_SWATCHES: Record<Exclude<ThemeName, "Custom">, string> = {
    "Light":    "oklch(0.88 0 0)",
    "Dark":     "oklch(0.25 0 0)",
    "Graphite": "oklch(0.38 0 0)",
    "Midnight": "oklch(0.40 0.10 230)",
    "Amethyst": "oklch(0.38 0.09 284)",
    "Forest":   "oklch(0.35 0.09 160)",
}
