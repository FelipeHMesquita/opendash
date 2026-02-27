// ─── Component metadata for comprehensive export ────────────────────────────
// Mock data, schemas, features, chart color mappings, and states per component.

export interface ComponentMeta {
    dataTypeSchema: string
    mockData: unknown
    features: string[]
    chartColorMapping?: Record<string, string>
    states: {
        loading: string
        empty: string
        error: string
        hover: string
    }
    icons?: string[]
}

export const COMPONENT_METADATA: Record<string, ComponentMeta> = {
    // ─── Charts ──────────────────────────────────────────────────────────────

    "bar-grouped": {
        dataTypeSchema: "{ month: string; desktop: number; mobile: number }[]",
        mockData: [
            { month: "Jan", desktop: 186, mobile: 80 },
            { month: "Fev", desktop: 305, mobile: 200 },
            { month: "Mar", desktop: 237, mobile: 120 },
            { month: "Abr", desktop: 73, mobile: 190 },
            { month: "Mai", desktop: 209, mobile: 130 },
            { month: "Jun", desktop: 214, mobile: 140 },
        ],
        features: ["barras agrupadas lado a lado", "legenda", "tooltip"],
        chartColorMapping: { desktop: "--chart-1", mobile: "--chart-2" },
        states: { loading: "Skeleton h-[250px]", empty: "Sem dados", error: "Banner destructive", hover: "Tooltip" },
    },

    "bar-stacked": {
        dataTypeSchema: "{ month: string; desktop: number; mobile: number }[]",
        mockData: [
            { month: "Jan", desktop: 186, mobile: 80 },
            { month: "Fev", desktop: 305, mobile: 200 },
            { month: "Mar", desktop: 237, mobile: 120 },
            { month: "Abr", desktop: 73, mobile: 190 },
            { month: "Mai", desktop: 209, mobile: 130 },
            { month: "Jun", desktop: 214, mobile: 140 },
        ],
        features: ["barras empilhadas", "stackId", "legenda"],
        chartColorMapping: { desktop: "--chart-1", mobile: "--chart-2" },
        states: { loading: "Skeleton h-[250px]", empty: "Sem dados", error: "Banner destructive", hover: "Tooltip" },
    },

    "bar-horizontal": {
        dataTypeSchema: "{ browser: string; visitors: number }[]",
        mockData: [
            { browser: "Chrome", visitors: 275 },
            { browser: "Safari", visitors: 200 },
            { browser: "Firefox", visitors: 187 },
            { browser: "Edge", visitors: 173 },
            { browser: "Outros", visitors: 90 },
        ],
        features: ["layout vertical (horizontal bars)", "cores por categoria"],
        chartColorMapping: { visitors: "--chart-[1..5]" },
        states: { loading: "Skeleton h-[250px]", empty: "Sem dados", error: "Banner destructive", hover: "Tooltip" },
    },

    "area-simple": {
        dataTypeSchema: "{ month: string; desktop: number; mobile: number }[]",
        mockData: [
            { month: "Jan", desktop: 186, mobile: 80 },
            { month: "Fev", desktop: 305, mobile: 200 },
            { month: "Mar", desktop: 237, mobile: 120 },
            { month: "Abr", desktop: 73, mobile: 190 },
            { month: "Mai", desktop: 209, mobile: 130 },
            { month: "Jun", desktop: 214, mobile: 140 },
        ],
        features: ["gradiente fill", "duas séries", "legenda"],
        chartColorMapping: { desktop: "--chart-1", mobile: "--chart-2" },
        states: { loading: "Skeleton h-[250px]", empty: "Sem dados", error: "Banner destructive", hover: "Tooltip" },
    },

    "area-stacked": {
        dataTypeSchema: "{ month: string; desktop: number; mobile: number; tablet: number }[]",
        mockData: [
            { month: "Jan", desktop: 186, mobile: 80, tablet: 45 },
            { month: "Fev", desktop: 305, mobile: 200, tablet: 90 },
            { month: "Mar", desktop: 237, mobile: 120, tablet: 65 },
            { month: "Abr", desktop: 73, mobile: 190, tablet: 110 },
            { month: "Mai", desktop: 209, mobile: 130, tablet: 80 },
            { month: "Jun", desktop: 214, mobile: 140, tablet: 95 },
        ],
        features: ["3 séries empilhadas", "curva monotone", "legenda"],
        chartColorMapping: { desktop: "--chart-1", mobile: "--chart-2", tablet: "--chart-3" },
        states: { loading: "Skeleton h-[250px]", empty: "Sem dados", error: "Banner destructive", hover: "Tooltip" },
    },

    "line-simple": {
        dataTypeSchema: "{ month: string; desktop: number; mobile: number }[]",
        mockData: [
            { month: "Jan", desktop: 186, mobile: 80 },
            { month: "Fev", desktop: 305, mobile: 200 },
            { month: "Mar", desktop: 237, mobile: 120 },
            { month: "Abr", desktop: 73, mobile: 190 },
            { month: "Mai", desktop: 209, mobile: 130 },
            { month: "Jun", desktop: 214, mobile: 140 },
        ],
        features: ["duas linhas com dots", "legenda"],
        chartColorMapping: { desktop: "--chart-1", mobile: "--chart-2" },
        states: { loading: "Skeleton h-[250px]", empty: "Sem dados", error: "Banner destructive", hover: "Tooltip" },
    },

    "line-multi": {
        dataTypeSchema: "{ month: string; desktop: number; mobile: number; tablet: number }[]",
        mockData: [
            { month: "Jan", desktop: 186, mobile: 80, tablet: 120 },
            { month: "Fev", desktop: 305, mobile: 200, tablet: 180 },
            { month: "Mar", desktop: 237, mobile: 120, tablet: 150 },
            { month: "Abr", desktop: 73, mobile: 190, tablet: 90 },
            { month: "Mai", desktop: 209, mobile: 130, tablet: 170 },
            { month: "Jun", desktop: 214, mobile: 140, tablet: 160 },
        ],
        features: ["3 séries com estilos variados", "dash, natural curve"],
        chartColorMapping: { desktop: "--chart-1", mobile: "--chart-2", tablet: "--chart-3" },
        states: { loading: "Skeleton h-[250px]", empty: "Sem dados", error: "Banner destructive", hover: "Tooltip" },
    },

    "pie-simple": {
        dataTypeSchema: "{ browser: string; visitors: number }[]",
        mockData: [
            { browser: "Chrome", visitors: 275 },
            { browser: "Safari", visitors: 200 },
            { browser: "Firefox", visitors: 187 },
            { browser: "Edge", visitors: 173 },
            { browser: "Outros", visitors: 90 },
        ],
        features: ["pizza completa", "legenda"],
        chartColorMapping: { Chrome: "--chart-1", Safari: "--chart-2", Firefox: "--chart-3", Edge: "--chart-4", Outros: "--chart-5" },
        states: { loading: "Skeleton circular", empty: "Sem dados", error: "Banner destructive", hover: "Tooltip" },
    },

    "pie-donut": {
        dataTypeSchema: "{ browser: string; visitors: number }[]",
        mockData: [
            { browser: "Chrome", visitors: 275 },
            { browser: "Safari", visitors: 200 },
            { browser: "Firefox", visitors: 187 },
            { browser: "Edge", visitors: 173 },
            { browser: "Outros", visitors: 90 },
        ],
        features: ["donut com innerRadius", "label central com total", "legenda"],
        chartColorMapping: { Chrome: "--chart-1", Safari: "--chart-2", Firefox: "--chart-3", Edge: "--chart-4", Outros: "--chart-5" },
        states: { loading: "Skeleton circular", empty: "Sem dados", error: "Banner destructive", hover: "Tooltip" },
    },

    "pie-separated": {
        dataTypeSchema: "{ browser: string; visitors: number }[]",
        mockData: [
            { browser: "Chrome", visitors: 275 },
            { browser: "Safari", visitors: 200 },
            { browser: "Firefox", visitors: 187 },
            { browser: "Edge", visitors: 173 },
            { browser: "Outros", visitors: 90 },
        ],
        features: ["paddingAngle entre fatias", "innerRadius", "legenda"],
        chartColorMapping: { Chrome: "--chart-1", Safari: "--chart-2", Firefox: "--chart-3", Edge: "--chart-4", Outros: "--chart-5" },
        states: { loading: "Skeleton circular", empty: "Sem dados", error: "Banner destructive", hover: "Tooltip" },
    },

    "radar-simple": {
        dataTypeSchema: "{ skill: string; desktop: number }[]",
        mockData: [
            { skill: "Design", desktop: 86 },
            { skill: "Frontend", desktop: 78 },
            { skill: "Backend", desktop: 92 },
            { skill: "DevOps", desktop: 65 },
            { skill: "Mobile", desktop: 42 },
            { skill: "QA", desktop: 70 },
        ],
        features: ["uma série com preenchimento", "PolarGrid"],
        chartColorMapping: { desktop: "--chart-1" },
        states: { loading: "Skeleton h-[250px]", empty: "Sem dados", error: "Banner destructive", hover: "Tooltip" },
    },

    "radar-multi": {
        dataTypeSchema: "{ skill: string; desktop: number; mobile: number }[]",
        mockData: [
            { skill: "Design", desktop: 86, mobile: 65 },
            { skill: "Frontend", desktop: 78, mobile: 90 },
            { skill: "Backend", desktop: 92, mobile: 50 },
            { skill: "DevOps", desktop: 65, mobile: 40 },
            { skill: "Mobile", desktop: 42, mobile: 85 },
            { skill: "QA", desktop: 70, mobile: 60 },
        ],
        features: ["duas séries sobrepostas", "PolarRadiusAxis", "legenda"],
        chartColorMapping: { desktop: "--chart-1", mobile: "--chart-2" },
        states: { loading: "Skeleton h-[250px]", empty: "Sem dados", error: "Banner destructive", hover: "Tooltip" },
    },

    "radial-gauge": {
        dataTypeSchema: "{ name: string; value: number }[]",
        mockData: [{ name: "Progresso", value: 73 }],
        features: ["gauge semicircular", "label central (73%)", "background track"],
        chartColorMapping: { value: "--chart-1" },
        states: { loading: "Skeleton circular", empty: "Sem dados", error: "Banner destructive", hover: "Tooltip" },
    },

    "radial-multi": {
        dataTypeSchema: "{ name: string; value: number }[]",
        mockData: [
            { name: "Chrome", value: 275 },
            { name: "Safari", value: 200 },
            { name: "Firefox", value: 187 },
            { name: "Edge", value: 173 },
        ],
        features: ["múltiplas barras radiais", "background"],
        chartColorMapping: { Chrome: "--chart-1", Safari: "--chart-2", Firefox: "--chart-3", Edge: "--chart-4" },
        states: { loading: "Skeleton circular", empty: "Sem dados", error: "Banner destructive", hover: "Tooltip" },
    },

    "radial-stacked": {
        dataTypeSchema: "{ month: string; desktop: number; mobile: number }[]",
        mockData: [{ month: "jan", desktop: 1260, mobile: 570 }],
        features: ["duas séries sobrepostas stackId", "label central (1.830)"],
        chartColorMapping: { desktop: "--chart-1", mobile: "--chart-2" },
        states: { loading: "Skeleton circular", empty: "Sem dados", error: "Banner destructive", hover: "Tooltip" },
    },

    "ranked-simple": {
        dataTypeSchema: "{ name: string; value: number }[]",
        mockData: [
            { name: "Produto A", value: 4820 },
            { name: "Produto B", value: 3650 },
            { name: "Produto C", value: 2980 },
            { name: "Produto D", value: 2150 },
            { name: "Produto E", value: 1740 },
            { name: "Produto F", value: 1320 },
            { name: "Produto G", value: 980 },
        ],
        features: ["barras horizontais ordenadas", "cores cíclicas"],
        chartColorMapping: { "por índice": "--chart-[1..5] cíclico" },
        states: { loading: "Skeleton h-[300px]", empty: "Sem dados", error: "Banner destructive", hover: "Tooltip" },
    },

    "ranked-category": {
        dataTypeSchema: "{ name: string; category: string; value: number }[]",
        mockData: [
            { name: "Produto A", category: "SaaS", value: 4820 },
            { name: "Produto B", category: "E-commerce", value: 3650 },
            { name: "Produto C", category: "SaaS", value: 2980 },
            { name: "Produto D", category: "Marketplace", value: 2150 },
            { name: "Produto E", category: "E-commerce", value: 1740 },
        ],
        features: ["barras horizontais", "cores por categoria", "legenda de categorias"],
        chartColorMapping: { SaaS: "--chart-1", "E-commerce": "--chart-2", Marketplace: "--chart-3" },
        states: { loading: "Skeleton h-[300px]", empty: "Sem dados", error: "Banner destructive", hover: "Tooltip" },
    },

    "funnel-sales": {
        dataTypeSchema: "{ name: string; value: number }[]",
        mockData: [
            { name: "Visitantes", value: 10000 },
            { name: "Leads", value: 6200 },
            { name: "Qualificados", value: 3400 },
            { name: "Propostas", value: 1800 },
            { name: "Fechamentos", value: 820 },
        ],
        features: ["SVG custom", "conectores trapezoidais", "drop % labels", "conversão total"],
        chartColorMapping: { barras: "--chart-1", conectores: "--chart-1 opacity 0.18" },
        states: { loading: "Skeleton decrescente", empty: "Sem dados", error: "Banner destructive", hover: "Labels drop %" },
    },

    "funnel-marketing": {
        dataTypeSchema: "{ name: string; value: number }[]",
        mockData: [
            { name: "Impressões", value: 48000 },
            { name: "Cliques", value: 12400 },
            { name: "Cadastros", value: 3600 },
            { name: "Compras", value: 920 },
        ],
        features: ["SVG custom", "conectores trapezoidais", "drop % labels", "conversão total"],
        chartColorMapping: { barras: "--chart-1", conectores: "--chart-1 opacity 0.18" },
        states: { loading: "Skeleton decrescente", empty: "Sem dados", error: "Banner destructive", hover: "Labels drop %" },
    },

    // ─── Cards & Métricas ────────────────────────────────────────────────────

    "dash-card-list": {
        dataTypeSchema: "{ stats: { title: string; value: string; change: string; positive: boolean }[]; orders: { id: string; date: string; customer: string; event: string; amount: string }[]; periods: string[] }",
        mockData: {
            stats: [
                { title: "Total Revenue",       value: "$2.6M",   change: "+4.5%",  positive: true  },
                { title: "Average Order Value", value: "$455",    change: "-0.5%",  positive: false },
                { title: "Tickets Sold",        value: "5,888",   change: "+4.5%",  positive: true  },
                { title: "Pageviews",           value: "823,067", change: "+21.2%", positive: true  },
            ],
            orders: [
                { id: "#3000", date: "May 9, 2024",  customer: "Leslie Alexander", event: "Bear Hug: Live in Concert", amount: "$80.00"  },
                { id: "#3001", date: "May 5, 2024",  customer: "Michael Foster",   event: "Six Fingers — DJ Set",      amount: "$299.00" },
                { id: "#3002", date: "May 3, 2024",  customer: "Dries Vincent",    event: "We All Look The Same",      amount: "$150.00" },
                { id: "#3003", date: "Apr 28, 2024", customer: "Lindsay Walton",   event: "Bear Hug: Live in Concert", amount: "$80.00"  },
                { id: "#3004", date: "Apr 25, 2024", customer: "Courtney Henry",   event: "Viking People",             amount: "$114.99" },
                { id: "#3005", date: "Apr 18, 2024", customer: "Tom Cook",         event: "Six Fingers — DJ Set",      amount: "$299.00" },
            ],
            periods: ["Last week", "Last two weeks", "Last month", "Last quarter"],
        },
        features: ["period selector dropdown", "stat cards grid (4 colunas)", "orders table com hover", "trend badges (emerald/rose)"],
        states: {
            loading: "Skeleton cards (h-24 bg-muted animate-pulse) + skeleton table rows",
            empty: "Cards com valor '—' + tabela 'Nenhum pedido encontrado'",
            error: "Banner inline com borda destructive",
            hover: "hover:bg-accent/50 nas table rows",
        },
        icons: ["TrendingUp", "TrendingDown"],
    },

    "stat-cards": {
        dataTypeSchema: "{ title: string; value: string; change: string; positive: boolean; description?: string }[]",
        mockData: [
            { title: "Receita Total",   value: "$48,295", change: "+12.5%", positive: true,  description: "vs. mês anterior"      },
            { title: "Usuários Ativos", value: "3,842",   change: "+8.1%",  positive: true,  description: "nos últimos 30 dias"   },
            { title: "Taxa de Churn",   value: "2.4%",    change: "+0.3%",  positive: false, description: "aumento preocupante"   },
            { title: "MRR",             value: "$9,240",  change: "+5.2%",  positive: true,  description: "receita recorrente"    },
        ],
        features: ["grid responsivo (1 col → 2 col → 4 col)", "trend badges (emerald/rose)", "description opcional"],
        states: {
            loading: "Skeleton cards (h-24 bg-muted animate-pulse rounded)",
            empty: "Cards com valor '—'",
            error: "Banner inline com borda destructive",
            hover: "Sem hover interativo (display only)",
        },
        icons: ["TrendingUp", "TrendingDown"],
    },

    "chart-card": {
        dataTypeSchema: "{ weekly: { label: string; value: number }[]; monthly: { label: string; value: number }[] }",
        mockData: {
            weekly: [
                { label: "Seg", value: 65 }, { label: "Ter", value: 78 },
                { label: "Qua", value: 52 }, { label: "Qui", value: 89 },
                { label: "Sex", value: 94 }, { label: "Sab", value: 43 },
                { label: "Dom", value: 38 },
            ],
            monthly: [
                { label: "Jan", value: 42 }, { label: "Fev", value: 58 },
                { label: "Mar", value: 71 }, { label: "Abr", value: 63 },
                { label: "Mai", value: 85 }, { label: "Jun", value: 79 },
                { label: "Jul", value: 92 }, { label: "Ago", value: 88 },
                { label: "Set", value: 95 }, { label: "Out", value: 78 },
                { label: "Nov", value: 82 }, { label: "Dez", value: 97 },
            ],
        },
        features: ["period toggle (week/month)", "CSS bar chart (sem Recharts)", "cálculo de média", "tooltip on hover por barra"],
        chartColorMapping: { "barras": "--primary (via bg-primary)", "hover": "--primary/40" },
        states: {
            loading: "Skeleton bars (bg-muted animate-pulse)",
            empty: "Barras com height 0",
            error: "Banner inline com borda destructive",
            hover: "hover:bg-primary/40 nas barras + group-hover tooltip",
        },
    },

    // ─── Tabelas ─────────────────────────────────────────────────────────────

    "data-table": {
        dataTypeSchema: "{ id: string; name: string; status: string; priority: string; owner: string; updated: string }[]",
        mockData: [
            { id: "PRJ-001", name: "Website Redesign",   status: "Em progresso", priority: "Alta",  owner: "Alice M.",  updated: "Hoje"   },
            { id: "PRJ-002", name: "Mobile App v2",       status: "Revisão",      priority: "Alta",  owner: "Bob K.",    updated: "Ontem"  },
            { id: "PRJ-003", name: "API Integration",     status: "Em progresso", priority: "Média", owner: "Carlos S.", updated: "3 dias" },
            { id: "PRJ-004", name: "Design System",       status: "Concluído",    priority: "Baixa", owner: "Diana F.",  updated: "1 sem." },
            { id: "PRJ-005", name: "Analytics Dashboard", status: "Backlog",      priority: "Média", owner: "Eve P.",    updated: "2 sem." },
            { id: "PRJ-006", name: "User Research",       status: "Em progresso", priority: "Alta",  owner: "Frank L.",  updated: "3 sem." },
            { id: "PRJ-007", name: "Performance Audit",   status: "Backlog",      priority: "Baixa", owner: "Grace W.",  updated: "1 mês"  },
            { id: "PRJ-008", name: "Security Review",     status: "Revisão",      priority: "Alta",  owner: "Henry C.",  updated: "1 mês"  },
        ],
        features: ["search/filter por nome e owner", "checkbox multi-select", "bulk delete", "paginação (3 páginas)", "botão 'New project'", "status badges coloridos", "priority badges coloridos"],
        states: {
            loading: "Skeleton table rows (h-10 bg-muted animate-pulse)",
            empty: "Tabela com mensagem 'Nenhum projeto encontrado'",
            error: "Banner inline com borda destructive",
            hover: "hover:bg-accent/50 nas rows; bg-primary/5 na row selecionada",
        },
        icons: ["Search", "Filter", "Plus", "MoreHorizontal", "ChevronLeft", "ChevronRight", "Trash2"],
    },

    "users-table": {
        dataTypeSchema: "{ name: string; title: string; email: string; role: string }[]",
        mockData: [
            { name: "Lindsay Walton",  title: "Front-end Developer",  email: "lindsay.walton@example.com",  role: "Member" },
            { name: "Courtney Henry",  title: "Designer",             email: "courtney.henry@example.com",  role: "Admin"  },
            { name: "Tom Cook",        title: "Director of Product",  email: "tom.cook@example.com",        role: "Member" },
            { name: "Whitney Francis", title: "Copywriter",           email: "whitney.francis@example.com", role: "Admin"  },
            { name: "Leonard Krasner", title: "Senior Designer",      email: "leonard.krasner@example.com", role: "Owner"  },
            { name: "Floyd Miles",     title: "Principal Designer",   email: "floyd.miles@example.com",     role: "Member" },
        ],
        features: ["avatars com iniciais", "botão 'Add user'", "link 'Edit' por row", "role display"],
        states: {
            loading: "Skeleton table rows com avatar placeholder",
            empty: "Tabela com mensagem 'Nenhum usuário encontrado'",
            error: "Banner inline com borda destructive",
            hover: "hover:bg-accent/50 nas rows; hover:underline no Edit",
        },
    },

    // ─── Layout ──────────────────────────────────────────────────────────────

    "navbar-comp": {
        dataTypeSchema: "Componente full-page (sem data props)",
        mockData: { navLinks: ["Dashboard", "Team", "Projects", "Calendar"], logo: "Waves icon (lucide-react)" },
        features: ["logo à esquerda", "nav links com active state", "notification bell", "avatar à direita", "altura fixa h-16 (64px)", "padding responsivo px-4 md:px-8"],
        states: {
            loading: "Skeleton bar (h-16 bg-muted animate-pulse)",
            empty: "N/A (sempre tem conteúdo)",
            error: "N/A",
            hover: "Link ativo: border-b-2 border-primary; inativo: hover:text-foreground transition-colors",
        },
        icons: ["Bell", "Waves"],
    },

    "sidebar-comp": {
        dataTypeSchema: "Componente full-page (sem data props)",
        mockData: {
            navItems: [
                { label: "Item 1", icon: "House",      active: true  },
                { label: "Item 2", icon: "BarChart2",  active: false },
                { label: "Item 3", icon: "LayoutGrid", active: false },
                { label: "Item 4", icon: "Archive",    active: false },
                { label: "Item 5", icon: "Clock",      active: false },
                { label: "Item 6", icon: "Users2",     active: false },
            ],
            bottomItems: ["Support (LifeBuoy)", "Settings", "User profile + Logout"],
        },
        features: ["collapse/expand (onCollapse prop)", "nav items com ícone", "active state highlight", "seção inferior (support, settings, logout)", "avatar com status online (green dot)", "largura w-52 (208px)"],
        states: {
            loading: "Skeleton sidebar (w-52 bg-muted animate-pulse)",
            empty: "N/A (sempre tem conteúdo)",
            error: "N/A",
            hover: "Item ativo: bg-accent font-medium; inativo: text-muted-foreground hover:text-foreground",
        },
        icons: ["House", "BarChart2", "LayoutGrid", "Archive", "Clock", "Users2", "LifeBuoy", "Settings", "LogOut", "PanelLeftClose"],
    },

    // ─── Interação ───────────────────────────────────────────────────────────

    "kanban-board": {
        dataTypeSchema: "{ id: string; title: string; color: string; cards: { id: string; title: string; priority: string; tag: string }[] }[]",
        mockData: [
            {
                id: "todo", title: "A fazer", color: "bg-muted text-muted-foreground",
                cards: [
                    { id: "t1", title: "Redesign onboarding flow",     priority: "Alta",  tag: "Design" },
                    { id: "t2", title: "Atualizar documentação da API", priority: "Média", tag: "Docs"   },
                    { id: "t3", title: "Implementar modo offline",      priority: "Baixa", tag: "Dev"    },
                ],
            },
            {
                id: "inprogress", title: "Em progresso", color: "bg-blue-500/10 text-blue-400",
                cards: [
                    { id: "p1", title: "Dashboard de analytics v2", priority: "Alta", tag: "Dev" },
                    { id: "p2", title: "Testes de integração",      priority: "Alta", tag: "QA"  },
                ],
            },
            {
                id: "review", title: "Revisão", color: "bg-amber-500/10 text-amber-400",
                cards: [
                    { id: "r1", title: "Migração para PostgreSQL 16", priority: "Alta",  tag: "Infra"  },
                    { id: "r2", title: "Novo componente de upload",   priority: "Média", tag: "Design" },
                ],
            },
            {
                id: "done", title: "Concluído", color: "bg-emerald-500/10 text-emerald-400",
                cards: [
                    { id: "d1", title: "Configurar CI/CD pipeline", priority: "Alta",  tag: "Infra"  },
                    { id: "d2", title: "Refactor auth module",      priority: "Alta",  tag: "Dev"    },
                    { id: "d3", title: "Dark mode support",         priority: "Média", tag: "Design" },
                ],
            },
        ],
        features: ["4 colunas kanban", "card count por coluna", "add card button por coluna", "botão 'Nova tarefa'", "horizontal scroll", "priority badges (rose/amber/muted)", "tag badges coloridos"],
        states: {
            loading: "Skeleton colunas (h-full bg-muted animate-pulse)",
            empty: "Coluna com mensagem 'Sem tarefas'",
            error: "Banner inline com borda destructive",
            hover: "Card hover: hover:bg-accent/30; more button: opacity-0 group-hover:opacity-100",
        },
        icons: ["Plus", "MoreHorizontal"],
    },

    "activity-feed": {
        dataTypeSchema: "{ id: number; group: string; icon: string; color: string; title: string; description: string; time: string }[]",
        mockData: [
            { id: 1, group: "Hoje",        icon: "UserPlus",     color: "bg-blue-500/10 text-blue-400",       title: "Novo usuário adicionado",  description: "Alice Monteiro foi convidada para o workspace",         time: "Agora mesmo"   },
            { id: 2, group: "Hoje",        icon: "CheckCircle2", color: "bg-emerald-500/10 text-emerald-400", title: "Deploy concluído",          description: "Versão 2.4.1 publicada em produção sem erros",         time: "42 min atrás"  },
            { id: 3, group: "Hoje",        icon: "FileText",     color: "bg-muted text-muted-foreground",     title: "Relatório exportado",       description: "Relatório mensal de outubro gerado por Carlos S.",      time: "3h atrás"      },
            { id: 4, group: "Ontem",       icon: "Settings",     color: "bg-amber-500/10 text-amber-400",     title: "Configurações alteradas",   description: "Limite de rate limit atualizado para 20 req/s",         time: "Ontem, 14:22"  },
            { id: 5, group: "Ontem",       icon: "CreditCard",   color: "bg-emerald-500/10 text-emerald-400", title: "Pagamento processado",      description: "Fatura #INV-2024-011 de R$ 89,00 paga com sucesso",     time: "Ontem, 09:00"  },
            { id: 6, group: "Mais antigo", icon: "AlertCircle",  color: "bg-rose-500/10 text-rose-400",       title: "Limite próximo",            description: "Uso de emails chegou a 85% do limite mensal",           time: "01 Nov, 11:15" },
        ],
        features: ["agrupamento temporal (Hoje/Ontem/Mais antigo)", "ícone + cor por tipo de atividade", "botão 'Ver tudo'", "descrição truncada"],
        states: {
            loading: "Skeleton rows com ícone placeholder",
            empty: "Feed vazio com 'Nenhuma atividade recente'",
            error: "Banner inline com borda destructive",
            hover: "hover:bg-accent/30 nas rows",
        },
        icons: ["UserPlus", "FileText", "Settings", "CreditCard", "AlertCircle", "CheckCircle2"],
    },

    "command-palette": {
        dataTypeSchema: "{ icon: string; label: string; category: string; shortcut: string | null }[]",
        mockData: [
            { icon: "BarChart2", label: "Dashboard",          category: "Páginas", shortcut: "G D" },
            { icon: "Users",     label: "Usuários",           category: "Páginas", shortcut: "G U" },
            { icon: "Settings",  label: "Configurações",      category: "Páginas", shortcut: "G S" },
            { icon: "FileText",  label: "Relatórios",         category: "Páginas", shortcut: "G R" },
            { icon: "Bell",      label: "Notificações",       category: "Páginas", shortcut: null  },
            { icon: "Users",     label: "Convidar membro",    category: "Ações",   shortcut: null  },
            { icon: "FileText",  label: "Exportar relatório", category: "Ações",   shortcut: null  },
            { icon: "Settings",  label: "Abrir configurações",category: "Ações",   shortcut: null  },
        ],
        features: ["⌘K toggle", "Escape fecha", "arrow keys navigation", "search filtering", "category grouping", "keyboard shortcut display", "backdrop blur overlay"],
        states: {
            loading: "N/A (abre instantaneamente)",
            empty: "'Nenhum resultado' quando busca não retorna",
            error: "N/A",
            hover: "Active item: bg-accent; backdrop: bg-background/80 backdrop-blur-sm",
        },
        icons: ["Search", "FileText", "Settings", "Users", "BarChart2", "Command", "ArrowRight", "Bell"],
    },

    "empty-state": {
        dataTypeSchema: "{ icon?: string; title: string; description: string; ctaLabel: string }",
        mockData: { icon: "Inbox", title: "Nenhum item encontrado", description: "Comece criando seu primeiro item.", ctaLabel: "Criar primeiro item" },
        features: ["ícone central em círculo muted", "título + descrição", "CTA button"],
        states: {
            loading: "N/A",
            empty: "Este é o próprio estado vazio",
            error: "N/A",
            hover: "CTA button hover padrão",
        },
        icons: ["Inbox"],
    },

    // ─── Formulários ─────────────────────────────────────────────────────────

    "form-page": {
        dataTypeSchema: "Componente full-page (sem data props)",
        mockData: {
            feedbackOptions: [
                { value: "excelente", label: "Excelente — superou as expectativas" },
                { value: "bom",       label: "Bom — atende bem as necessidades"   },
                { value: "regular",   label: "Regular — pode melhorar"            },
                { value: "ruim",      label: "Ruim — não atendeu as expectativas" },
            ],
            preferences: [
                { id: "newsletter", label: "Newsletter semanal",      desc: "Novidades, conteúdos e atualizações da plataforma." },
                { id: "releases",   label: "Atualizações de produto", desc: "Seja o primeiro a saber sobre novos recursos lançados." },
                { id: "security",   label: "Alertas de segurança",    desc: "Notificações importantes sobre sua conta." },
            ],
        },
        features: ["tabs (Contato/Feedback/Preferências)", "form de contato (name, email, subject, message)", "RadioGroup feedback", "Switch toggles preferências", "Card-based layout"],
        states: {
            loading: "Skeleton form fields",
            empty: "N/A (formulário sempre visível)",
            error: "Validação inline nos campos",
            hover: "focus-visible:ring-2 focus-visible:ring-primary nos inputs",
        },
        icons: ["Send"],
    },

    "team-page": {
        dataTypeSchema: "{ name: string; role: string; dept: string; online: boolean; initials: string }[]",
        mockData: [
            { name: "Alice Monteiro",  role: "Product Designer",  dept: "Design",     online: true,  initials: "AM" },
            { name: "Bruno Costa",     role: "Frontend Engineer", dept: "Engenharia", online: true,  initials: "BC" },
            { name: "Carla Souza",     role: "Product Manager",   dept: "Produto",    online: false, initials: "CS" },
            { name: "Diego Lima",      role: "Backend Engineer",  dept: "Engenharia", online: true,  initials: "DL" },
            { name: "Elena Park",      role: "Data Analyst",      dept: "Dados",      online: false, initials: "EP" },
            { name: "Felipe Rocha",    role: "DevOps Engineer",   dept: "Infra",      online: true,  initials: "FR" },
            { name: "Gabriela Nunes",  role: "UX Researcher",     dept: "Design",     online: false, initials: "GN" },
            { name: "Hugo Ferreira",   role: "QA Engineer",       dept: "Engenharia", online: true,  initials: "HF" },
        ],
        features: ["avatar group preview (+N count)", "online count", "member cards grid", "dept badges coloridos", "email button por card", "invite button", "more actions menu"],
        states: {
            loading: "Skeleton cards com avatar placeholder",
            empty: "Grid vazio com 'Nenhum membro' + convite CTA",
            error: "Banner inline com borda destructive",
            hover: "Card hover: hover:bg-white/5",
        },
        icons: ["UserPlus", "Mail", "MoreHorizontal", "Users"],
    },

    // ─── Páginas ─────────────────────────────────────────────────────────────

    "login-page": {
        dataTypeSchema: "Componente full-page (sem data props)",
        mockData: null,
        features: ["email + password login", "show/hide password toggle", "'Esqueci minha senha' link", "'Criar conta' link", "Google OAuth button", "divider 'ou'"],
        states: {
            loading: "N/A (formulário estático)",
            empty: "N/A",
            error: "Validação inline nos campos de login",
            hover: "Eye/EyeOff toggle; button hover padrão",
        },
        icons: ["Eye", "EyeOff"],
    },

    "signup-page": {
        dataTypeSchema: "Componente full-page (sem data props)",
        mockData: null,
        features: ["name + email + password form", "password strength indicator (5 steps)", "terms checkbox", "submit disabled quando não agreed", "Google OAuth", "show/hide password toggle"],
        states: {
            loading: "N/A (formulário estático)",
            empty: "N/A",
            error: "Validação inline + strength bar (Fraca: rose, Média: amber, Forte: emerald)",
            hover: "Eye/EyeOff toggle; submit disabled={!agreed}",
        },
        icons: ["Eye", "EyeOff"],
    },

    "onboarding-page": {
        dataTypeSchema: "Componente full-page (sem data props)",
        mockData: {
            steps: [
                { id: 1, title: "Crie sua conta",        description: "Configure suas informações básicas" },
                { id: 2, title: "Configure o workspace",  description: "Personalize sua experiência"       },
                { id: 3, title: "Convide sua equipe",     description: "Colabore com seus colegas"         },
                { id: 4, title: "Pronto para começar",    description: "Explore todas as funcionalidades"  },
            ],
            workspaceOptions: ["Empresa B2B", "E-commerce", "SaaS / Software", "Agência"],
        },
        features: ["multi-step wizard (4 steps)", "sidebar step navigation", "progress bar", "back/next navigation", "radio selection (workspace type)", "email invite fields", "completion indicator"],
        states: {
            loading: "N/A",
            empty: "N/A",
            error: "N/A",
            hover: "Done step: bg-emerald-500 + Check; active: bg-primary; future: border-border text-muted-foreground",
        },
        icons: ["Check"],
    },

    "settings-page": {
        dataTypeSchema: "Componente full-page (sem data props)",
        mockData: {
            tabs: ["Usage", "Billing", "Team", "SMTP", "Integrations", "Unsubscribe Page", "Documents"],
            limits: {
                transactional: { monthly: "0 / 3,000", daily: "0 / 100" },
                marketing: { contacts: "0 / 1,000", segments: "1 / 3", broadcasts: "Unlimited" },
                team: { domains: "0 / 1", rateLimit: "2 req/s" },
            },
            pricing: { payAsYouGo: "$0.90 / Per 1,000 Emails", dedicatedIPs: "$30 / Mo" },
        },
        features: ["7 tabs", "sections com 1/3 + 2/3 grid", "circular progress indicators (SVG)", "Switch toggle", "upgrade CTA"],
        states: {
            loading: "Skeleton sections",
            empty: "Sections com valores zerados",
            error: "N/A",
            hover: "Tab ativa: bg-accent text-foreground; inativa: text-muted-foreground",
        },
    },

    "account-settings": {
        dataTypeSchema: "Componente full-page (sem data props)",
        mockData: {
            tabs: ["Account", "Notifications", "Billing", "Teams", "Integrations"],
            sections: ["Personal Info", "Change Password", "Log Out Sessions", "Delete Account"],
        },
        features: ["search bar no header", "5 tab links", "avatar upload", "first/last name fields", "email + username", "timezone select", "password change (3 fields)", "session logout", "account deletion"],
        states: {
            loading: "Skeleton form fields",
            empty: "N/A",
            error: "Delete account title: text-destructive",
            hover: "Tab ativa: border-b-2 border-primary; backdrop-blur header",
        },
        icons: ["Search"],
    },

    "general-settings": {
        dataTypeSchema: "Componente full-page (sem data props)",
        mockData: {
            profile: { fullName: "Tom Cook", email: "tom.cook@example.com", title: "Human Resources Manager" },
            bankAccounts: ["TD Canada Trust", "Royal Bank of Canada"],
            integrations: ["QuickBooks"],
            language: { language: "English", dateFormat: "DD-MM-YYYY", automaticTimezone: true },
        },
        features: ["4 sections (Profile, Bank, Integrations, Language)", "per-row 'Update' link", "'Add another' links", "automatic timezone Switch toggle"],
        states: {
            loading: "Skeleton rows",
            empty: "N/A",
            error: "N/A",
            hover: "Row borders condicionais",
        },
    },

    "billing-page": {
        dataTypeSchema: "Componente full-page (sem data props)",
        mockData: {
            plans: [
                { name: "Free",  price: "R$ 0",   description: "Para começar",               current: false, features: ["3.000 emails/mês", "1 domínio", "2 req/s", "Suporte por email"] },
                { name: "Pro",   price: "R$ 89",  description: "Para equipes em crescimento", current: true,  features: ["50.000 emails/mês", "5 domínios", "10 req/s", "Suporte prioritário", "Analytics avançado"] },
                { name: "Scale", price: "R$ 299", description: "Para grandes volumes",        current: false, features: ["500.000 emails/mês", "Domínios ilimitados", "50 req/s", "Suporte dedicado", "IPs dedicados", "SLA 99.9%"] },
            ],
            invoices: [
                { id: "INV-2024-012", date: "1 Dez, 2024", amount: "R$ 89,00", status: "Pago" },
                { id: "INV-2024-011", date: "1 Nov, 2024", amount: "R$ 89,00", status: "Pago" },
                { id: "INV-2024-010", date: "1 Out, 2024", amount: "R$ 89,00", status: "Pago" },
                { id: "INV-2024-009", date: "1 Set, 2024", amount: "R$ 89,00", status: "Pago" },
            ],
        },
        features: ["plan comparison grid (3 plans)", "current plan badge", "feature list com checkmarks", "payment method card (masked)", "invoice history com download", "upgrade CTA buttons"],
        states: {
            loading: "Skeleton plan cards + invoice rows",
            empty: "N/A",
            error: "N/A",
            hover: "Current plan: border-primary ring-1; invoice row: hover:bg-accent/30; paid badge: bg-emerald-500/10",
        },
        icons: ["Check", "CreditCard", "Download"],
    },

    "notifications-page": {
        dataTypeSchema: "{ id: number; type: string; read: boolean; icon: string; color: string; title: string; description: string; time: string }[]",
        mockData: [
            { id: 1, type: "success", read: false, icon: "CheckCircle2", color: "text-emerald-400", title: "Deploy concluído com sucesso",  description: "A versão 2.4.1 foi publicada em produção sem erros.", time: "5 min atrás"  },
            { id: 2, type: "warning", read: false, icon: "AlertTriangle", color: "text-amber-400",  title: "Uso próximo do limite",         description: "Você atingiu 85% do limite de emails do plano Pro.",  time: "2h atrás"     },
            { id: 3, type: "info",    read: false, icon: "Info",          color: "text-blue-400",   title: "Novo membro na equipe",          description: "Alice Monteiro aceitou o convite e entrou no workspace.", time: "Ontem"    },
            { id: 4, type: "error",   read: true,  icon: "AlertCircle",   color: "text-rose-400",   title: "Falha no webhook",               description: "3 tentativas de entrega para o endpoint falharam.",   time: "Ontem"        },
            { id: 5, type: "success", read: true,  icon: "CheckCircle2",  color: "text-emerald-400", title: "Pagamento processado",          description: "Fatura de novembro no valor de R$ 89,00 paga.",       time: "2 dias atrás" },
        ],
        features: ["unread count badge", "'marcar tudo como lido' bulk action", "dismiss individual", "empty state quando tudo dismissado", "read/unread visual distinction"],
        states: {
            loading: "Skeleton notification rows",
            empty: "Bell icon + 'Nenhuma notificação' + 'Você está em dia!'",
            error: "N/A",
            hover: "Unread row: bg-primary/5; dismiss button: opacity-0 group-hover:opacity-100; row: hover:bg-accent/30",
        },
        icons: ["Bell", "X", "CheckCheck", "Info", "AlertTriangle", "CheckCircle2", "AlertCircle"],
    },

    "error-page": {
        dataTypeSchema: "Componente full-page (sem data props)",
        mockData: null,
        features: ["404 error code display (text-8xl)", "'Voltar' (history.back())", "'Ir para o início' CTA"],
        states: {
            loading: "N/A",
            empty: "Este é o próprio estado de erro",
            error: "Este é o próprio estado de erro",
            hover: "Back button: hover:bg-accent; CTA: hover:bg-primary/90",
        },
    },
}
