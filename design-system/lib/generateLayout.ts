// ─── Types ───────────────────────────────────────────────────────────────────

export type MainComponent =
    | "DashCardList"
    | "UsersTable"
    | "SettingsPage"
    | "AccountSettings"
    | "GeneralSettings"
    | "LoginPage"
    | "DataTable"
    | "StatCardDemo"
    | "ChartCard"
    | "OnboardingPage"
    | "BillingPage"
    | "ActivityFeed"
    | "NotificationsPage"
    | "ErrorPage"
    | "KanbanBoard"
    | "CommandPalette"
    | "EmptyState"
    | "FormPage"
    | "TeamPage"
    | "UIShowcase"

export type LayoutConfig = {
    themeName: string
    hue: number
    cssVars: Record<string, string>
    mainComponent: MainComponent
    rationale: string
    primaryHex: string
    hasTint: boolean
}

// ─── Hex → HSL ───────────────────────────────────────────────────────────────

function hexToHsl(hex: string): { h: number; s: number; l: number } | null {
    const clean = hex.replace("#", "")
    if (clean.length !== 6) return null

    const r = parseInt(clean.slice(0, 2), 16) / 255
    const g = parseInt(clean.slice(2, 4), 16) / 255
    const b = parseInt(clean.slice(4, 6), 16) / 255

    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    const l = (max + min) / 2

    if (max === min) return { h: 0, s: 0, l }

    const d = max - min
    const s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

    let h = 0
    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6
    else if (max === g) h = ((b - r) / d + 2) / 6
    else h = ((r - g) / d + 4) / 6

    return { h: Math.round(h * 360), s, l }
}

// ─── Primary values by hue ───────────────────────────────────────────────────

function getPrimaryL(h: number): number {
    if (h >= 50 && h <= 100) return 0.72   // yellow/orange
    if (h >= 130 && h <= 165) return 0.65  // green
    return 0.62
}

function getPrimaryC(h: number): number {
    if (h >= 50 && h <= 100) return 0.18
    if (h >= 130 && h <= 165) return 0.20
    return 0.22
}

// ─── Component selection ──────────────────────────────────────────────────────

function selectMainComponent(description: string): MainComponent {
    const d = description.toLowerCase()

    if (/login|auth|entrar|sign.?in|acesso|senha/.test(d))                        return "LoginPage"
    if (/onboard|começar|primeiros passos|welcome|boas.?vinda/.test(d))           return "OnboardingPage"
    if (/billing|cobran|pagamento|plano|preço|fatura|invoice/.test(d))            return "BillingPage"
    if (/kanban|board|sprint|pipeline|funil|tarefa|task/.test(d))                 return "KanbanBoard"
    if (/atividade|activity|log|histórico|evento|timeline/.test(d))               return "ActivityFeed"
    if (/notific|alerta|alert/.test(d))                                           return "NotificationsPage"
    if (/erro|error|404|não encontr/.test(d))                                     return "ErrorPage"
    if (/chart|gráfico|grafico|visual|trend/.test(d))                             return "ChartCard"
    if (/métrica|metrica|kpi|stat|número|number/.test(d))                         return "StatCardDemo"
    if (/command|palette|busca rápida|quick search/.test(d))                      return "CommandPalette"
    if (/vazio|empty|sem dado|sem item|nenhum/.test(d))                           return "EmptyState"
    if (/componente|primitivo|ui kit|biblioteca|design token|galeria|showcase/.test(d)) return "UIShowcase"
    if (/formulário|formulario|form|contato|feedback|cadastro|registro/.test(d))  return "FormPage"
    if (/squad|colaborador|cards de time|perfil de equipe/.test(d))               return "TeamPage"
    if (/project|projeto/.test(d))                                                return "DataTable"
    if (/user|usuário|team|equipe|member|membro/.test(d))                         return "UsersTable"
    if (/setting|configuração|config|account|conta|perfil|profile/.test(d))       return "SettingsPage"

    return "DashCardList"
}

// ─── Theme name ───────────────────────────────────────────────────────────────

function getThemeName(h: number, hasTint: boolean): string {
    if (!hasTint) return "Dark Neutro"
    if (h >= 220 && h <= 265) return "Dark Navy"
    if (h >= 265 && h <= 300) return "Dark Slate"
    if (h >= 10  && h <= 45)  return "Dark Ember"
    if (h >= 130 && h <= 165) return "Dark Forest"
    if (h >= 300 && h <= 340) return "Dark Rose"
    return `Dark ${h}°`
}

// ─── Component labels ─────────────────────────────────────────────────────────

const componentLabels: Record<MainComponent, string> = {
    DashCardList:      "dashboard com cards de métricas e tabela de pedidos",
    UsersTable:        "tabela de usuários com ações inline",
    SettingsPage:      "página de configurações com abas e seções",
    AccountSettings:   "configurações de conta com formulários",
    GeneralSettings:   "configurações gerais com linhas editáveis",
    LoginPage:         "tela de autenticação com email e senha",
    DataTable:         "tabela de dados avançada com filtros, busca e paginação",
    StatCardDemo:      "painel de cards de métricas principais",
    ChartCard:         "card com gráfico de barras e comparativo por período",
    OnboardingPage:    "fluxo de onboarding em múltiplas etapas",
    BillingPage:       "página de cobrança com planos e histórico de faturas",
    ActivityFeed:      "feed de atividades e eventos recentes do workspace",
    NotificationsPage: "central de notificações com status de leitura",
    ErrorPage:         "página de erro 404",
    KanbanBoard:       "board kanban com colunas de status e cards de tarefa",
    CommandPalette:    "command palette com busca rápida de páginas e ações",
    EmptyState:        "estado vazio com call-to-action para primeiro item",
    FormPage:          "formulário com abas de contato, feedback e preferências usando primitivos do design system",
    TeamPage:          "grid de cards de membros da equipe com avatares, badges de departamento e ações",
    UIShowcase:        "galeria completa de todos os primitivos do design system: Button, Badge, Alert, Avatar, Input, Switch, Tabs e Card",
}

// ─── Main export ──────────────────────────────────────────────────────────────

export function generateLayout(hex: string, description: string): LayoutConfig {
    const hsl = hexToHsl(hex)

    let oklchH = 0
    let hasTint = false

    if (hsl) {
        oklchH = hsl.h
        hasTint = hsl.s > 0.08
    }

    const primL = getPrimaryL(oklchH)
    const primC = getPrimaryC(oklchH)
    const surfC = hasTint ? 0.015 : 0

    const cssVars: Record<string, string> = {
        "--background":         `oklch(0.08 ${surfC} ${oklchH})`,
        "--foreground":         `oklch(0.97 0 0)`,
        "--card":               `oklch(0.12 ${surfC} ${oklchH})`,
        "--card-foreground":    `oklch(0.97 0 0)`,
        "--muted":              `oklch(0.18 0 0)`,
        "--muted-foreground":   `oklch(0.60 0 0)`,
        "--border":             `oklch(1 0 0 / 10%)`,
        "--accent":             `oklch(0.20 ${surfC} ${oklchH})`,
        "--accent-foreground":  `oklch(0.97 0 0)`,
        "--primary":            `oklch(${primL} ${primC} ${oklchH})`,
        "--primary-foreground": `oklch(1 0 0)`,
        "--ring":               `oklch(${primL} ${primC} ${oklchH})`,
    }

    const mainComponent = selectMainComponent(description)
    const themeName = getThemeName(oklchH, hasTint)

    const tintNote = hasTint
        ? `As superfícies recebem o H ${oklchH}° da marca com chroma baixo (0.015), mantendo coerência sem saturar o fundo.`
        : "A cor da marca é usada apenas no primary e nos elementos de ação — as superfícies ficam neutras."

    const rationale = `Layout de ${componentLabels[mainComponent]}. ${tintNote}`

    return { themeName, hue: oklchH, cssVars, mainComponent, rationale, primaryHex: hex, hasTint }
}
