"use client"

// ─── Colors ────────────────────────────────────────────────────────────────────

const CHART_COLORS = [
    "var(--color-chart-1)",
    "var(--color-chart-2)",
    "var(--color-chart-3)",
    "var(--color-chart-4)",
    "var(--color-chart-5)",
]

// ─── Data ──────────────────────────────────────────────────────────────────────

type RankedItem = {
    rank: number
    name: string
    category: string
    value: number
}

const DATA: RankedItem[] = [
    { rank: 1,   name: "Sneakers Collection",   category: "screen_view", value: 13136 },
    { rank: 2,   name: "Nike Air Max 2021",      category: "screen_view", value:  9648 },
    { rank: 3,   name: "Sneakers",               category: "screen_view", value:  7352 },
    { rank: 4,   name: "Running Shoes",           category: "screen_view", value:  5230 },
    { rank: 5,   name: "Nike Air Max 2021 Details", category: "screen_view", value: 5020 },
    { rank: 6,   name: "Classics Collection",    category: "screen_view", value:  4180 },
    { rank: 7,   name: "Sport Edition",          category: "screen_view", value:  3740 },
]

const MAX_VALUE = DATA[0].value

// ─── Row ───────────────────────────────────────────────────────────────────────

function RankedRow({ item, index }: { item: RankedItem; index: number }) {
    const barWidth = Math.round((item.value / MAX_VALUE) * 100)
    const color = CHART_COLORS[index % CHART_COLORS.length]

    return (
        <div className="group flex items-start gap-3 rounded-md px-3 py-2.5 transition-colors hover:bg-muted/40">
            {/* Rank badge */}
            <div
                className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded text-xs font-semibold"
                style={{ backgroundColor: `${color}20`, color }}
            >
                {item.rank}
            </div>

            {/* Name + category + bar */}
            <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-2">
                    <span className="truncate text-xs font-medium text-foreground">{item.name}</span>
                    <span className="shrink-0 text-xs font-medium tabular-nums" style={{ color: "var(--foreground)" }}>
                        {item.value.toLocaleString("pt-BR")}
                    </span>
                </div>
                <p className="mb-1.5 text-xs text-muted-foreground">{item.category}</p>
                {/* Progress bar */}
                <div className="h-0.5 w-full overflow-hidden rounded-full bg-muted">
                    <div
                        className="h-full rounded-full"
                        style={{ width: `${barWidth}%`, backgroundColor: color }}
                    />
                </div>
            </div>
        </div>
    )
}

// ─── Component ─────────────────────────────────────────────────────────────────

export function RankedList() {
    return (
        <div className="w-full p-8">
            <div className="rounded-lg border border-border bg-card p-6">
                <div className="mb-6">
                    <h3 className="text-sm/6 font-semibold text-foreground">
                        Produtos Mais Populares
                    </h3>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                        Visualizações por produto — últimos 30 dias
                    </p>
                </div>
                <div className="flex flex-col -mx-3">
                    {DATA.map((item, i) => (
                        <RankedRow key={item.rank} item={item} index={i} />
                    ))}
                </div>
            </div>
        </div>
    )
}
