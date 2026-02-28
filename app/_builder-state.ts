import { arrayMove } from "@dnd-kit/sortable"

// ─── Constants ────────────────────────────────────────────────────────────────

export const CARD_OVERHEAD = 116

// react-grid-layout constants (Metabase-style)
export const RGL_COLS = 24
export const RGL_ROW_HEIGHT = 60
export const RGL_MARGIN: [number, number] = [6, 6]
export const RGL_PADDING: [number, number] = [6, 6]

export const DEVICE_PRESETS = [
    { id: "desktop", label: "Desktop", width: 0,   icon: "desktop" },
    { id: "tablet",  label: "Tablet",  width: 768, icon: "tablet"  },
    { id: "mobile",  label: "Mobile",  width: 390, icon: "mobile"  },
] as const
export type DeviceId = (typeof DEVICE_PRESETS)[number]["id"]

// ─── Palette types ────────────────────────────────────────────────────────────

export type PaletteEntry = {
    id: string; name: string; description: string; importStatement: string; dataType: string
}

export const PALETTE_SECTIONS: { title: string; items: PaletteEntry[] }[] = [
    {
        title: "Gráficos",
        items: [
            // Bar
            { id: "bar-grouped",     name: "Bar Grouped",      description: "Barras verticais agrupadas",            importStatement: 'import { BarGrouped } from "@/componentsSugest/charts/RechartsBarChart"',        dataType: "{ month: string; desktop: number; mobile: number }[]" },
            { id: "bar-stacked",     name: "Bar Stacked",      description: "Barras verticais empilhadas",           importStatement: 'import { BarStacked } from "@/componentsSugest/charts/RechartsBarChart"',        dataType: "{ month: string; desktop: number; mobile: number }[]" },
            { id: "bar-horizontal",  name: "Bar Horizontal",   description: "Barras horizontais por categoria",      importStatement: 'import { BarHorizontal } from "@/componentsSugest/charts/RechartsBarChart"',     dataType: "{ browser: string; visitors: number }[]" },
            // Area
            { id: "area-simple",     name: "Area Simple",      description: "Área com gradiente e legenda",          importStatement: 'import { AreaSimple } from "@/componentsSugest/charts/RechartsAreaChart"',       dataType: "{ month: string; desktop: number; mobile: number }[]" },
            { id: "area-stacked",    name: "Area Stacked",     description: "Área empilhada com 3 séries",           importStatement: 'import { AreaStacked } from "@/componentsSugest/charts/RechartsAreaChart"',      dataType: "{ month: string; desktop: number; mobile: number; tablet: number }[]" },
            // Line
            { id: "line-simple",     name: "Line Simple",      description: "Linha simples com dots",                importStatement: 'import { LineSimple } from "@/componentsSugest/charts/RechartsLineChart"',      dataType: "{ month: string; desktop: number; mobile: number }[]" },
            { id: "line-multi",      name: "Line Multi",       description: "Múltiplas linhas com estilos variados", importStatement: 'import { LineMulti } from "@/componentsSugest/charts/RechartsLineChart"',       dataType: "{ month: string; desktop: number; mobile: number; tablet: number }[]" },
            // Pie
            { id: "pie-simple",      name: "Pie",              description: "Pizza por navegador",                   importStatement: 'import { PieSimple } from "@/componentsSugest/charts/RechartsPieChart"',        dataType: "{ browser: string; visitors: number }[]" },
            { id: "pie-donut",       name: "Donut",            description: "Donut com total no centro",             importStatement: 'import { PieDonut } from "@/componentsSugest/charts/RechartsPieChart"',         dataType: "{ browser: string; visitors: number }[]" },
            { id: "pie-separated",   name: "Pie Separated",    description: "Pizza com fatias espaçadas",            importStatement: 'import { PieSeparated } from "@/componentsSugest/charts/RechartsPieChart"',     dataType: "{ browser: string; visitors: number }[]" },
            // Radar
            { id: "radar-simple",    name: "Radar Simple",     description: "Radar com uma série",                   importStatement: 'import { RadarSimple } from "@/componentsSugest/charts/RechartsRadarChart"',    dataType: "{ skill: string; desktop: number }[]" },
            { id: "radar-multi",     name: "Radar Multi",      description: "Radar comparativo com duas séries",     importStatement: 'import { RadarMulti } from "@/componentsSugest/charts/RechartsRadarChart"',     dataType: "{ skill: string; desktop: number; mobile: number }[]" },
            // Radial
            { id: "radial-gauge",    name: "Radial Gauge",     description: "Gauge com métrica central",             importStatement: 'import { RadialGauge } from "@/componentsSugest/charts/RechartsRadialChart"',   dataType: "{ name: string; value: number }[]" },
            { id: "radial-multi",    name: "Radial Multi",     description: "Barras radiais múltiplas",              importStatement: 'import { RadialMulti } from "@/componentsSugest/charts/RechartsRadialChart"',   dataType: "{ name: string; value: number }[]" },
            { id: "radial-stacked",  name: "Radial Stacked",   description: "Radial com séries sobrepostas",         importStatement: 'import { RadialStacked } from "@/componentsSugest/charts/RechartsRadialChart"', dataType: "{ month: string; desktop: number; mobile: number }[]" },
            // Ranked
            { id: "ranked-simple",   name: "Ranked Simple",    description: "Ranking com barras horizontais",        importStatement: 'import { RankedSimple } from "@/componentsSugest/charts/RechartsRankedList"',   dataType: "{ name: string; value: number }[]" },
            { id: "ranked-category", name: "Ranked Category",  description: "Ranking com cores por categoria",       importStatement: 'import { RankedCategory } from "@/componentsSugest/charts/RechartsRankedList"', dataType: "{ name: string; category: string; value: number }[]" },
            // Funnel
            { id: "funnel-sales",    name: "Funnel Sales",     description: "Funil de vendas com conectores",        importStatement: 'import { FunnelSales } from "@/componentsSugest/charts/RechartsFunnelChart"',   dataType: "{ name: string; value: number }[]" },
            { id: "funnel-marketing",name: "Funnel Marketing", description: "Funil de marketing com conectores",     importStatement: 'import { FunnelMarketing } from "@/componentsSugest/charts/RechartsFunnelChart"',dataType: "{ name: string; value: number }[]" },
        ],
    },
    {
        title: "Cards & Métricas",
        items: [
            { id: "dash-card-list", name: "Dash Card List", description: "Cards de métricas com tabela resumida",    importStatement: 'import { DashCardList } from "@/componentsSugest/DashCardList"',   dataType: "{ stats: { title: string; value: string; change: string; positive: boolean }[]; orders: { id: string; date: string; customer: string; event: string; amount: string }[] }" },
            { id: "stat-cards",     name: "Stat Cards",     description: "KPIs com variação e ícone",               importStatement: 'import { StatCardDemo } from "@/componentsSugest/StatCard"',       dataType: "{ title: string; value: string; change: string; positive: boolean; description?: string }[]" },
            { id: "chart-card",     name: "Chart Card",     description: "Card com mini gráfico embutido",           importStatement: 'import { ChartCard } from "@/componentsSugest/ChartCard"',         dataType: "{ weekly: { label: string; value: number }[]; monthly: { label: string; value: number }[] }" },
        ],
    },
    {
        title: "Tabelas",
        items: [
            { id: "data-table",   name: "Data Table",   description: "Tabela de dados com ordenação e filtros", importStatement: 'import { DataTable } from "@/componentsSugest/DataTable"',     dataType: "{ id: string; name: string; status: string; priority: string; owner: string; updated: string }[]" },
            { id: "users-table",  name: "Users Table",  description: "Lista de usuários com avatar e ações",    importStatement: 'import { UsersTable } from "@/componentsSugest/UsersTable"',   dataType: "{ name: string; title: string; email: string; role: string }[]" },
        ],
    },
    {
        title: "Layout",
        items: [
            { id: "navbar-comp",    name: "Navbar",      description: "Barra de navegação superior",             importStatement: 'import { Navbar } from "@/componentsSugest/Navbar"',             dataType: "Componente full-page (sem data props)" },
            { id: "sidebar-comp",   name: "Sidebar",     description: "Barra lateral de navegação",              importStatement: 'import { SidebarOpen } from "@/componentsSugest/SidebarOpen"',   dataType: "Componente full-page (sem data props)" },
        ],
    },
    {
        title: "Interação",
        items: [
            { id: "kanban-board",     name: "Kanban Board",     description: "Quadro de tarefas estilo kanban",        importStatement: 'import { KanbanBoard } from "@/componentsSugest/KanbanBoard"',         dataType: "{ id: string; title: string; color: string; cards: { id: string; title: string; priority: string; tag: string }[] }[]" },
            { id: "activity-feed",    name: "Activity Feed",    description: "Feed de atividades recentes",            importStatement: 'import { ActivityFeed } from "@/componentsSugest/ActivityFeed"',       dataType: "{ id: number; group: string; icon: string; color: string; title: string; description: string; time: string }[]" },
            { id: "command-palette",  name: "Command Palette",  description: "Paleta de comandos estilo ⌘K",           importStatement: 'import { CommandPalette } from "@/componentsSugest/CommandPalette"', dataType: "{ icon: string; label: string; category: string; shortcut: string | null }[]" },
            { id: "empty-state",      name: "Empty State",      description: "Estado vazio com ilustração e CTA",      importStatement: 'import { EmptyState } from "@/componentsSugest/EmptyState"',         dataType: "{ icon?: string; title: string; description: string; ctaLabel: string }" },
        ],
    },
    {
        title: "Formulários",
        items: [
            { id: "form-page",   name: "Form Page",   description: "Formulário completo com validação",    importStatement: 'import { FormPage } from "@/componentsSugest/FormPage"',     dataType: "Componente full-page (sem data props)" },
            { id: "team-page",   name: "Team Page",   description: "Página de equipe com cards de membros", importStatement: 'import { TeamPage } from "@/componentsSugest/TeamPage"',     dataType: "{ name: string; role: string; dept: string; online: boolean; initials: string }[]" },
        ],
    },
    {
        title: "Páginas",
        items: [
            { id: "login-page",       name: "Login",              description: "Página de autenticação",                importStatement: 'import { LoginPage } from "@/componentsSugest/LoginPage"',                 dataType: "Componente full-page (sem data props)" },
            { id: "signup-page",       name: "Sign Up",            description: "Página de cadastro",                    importStatement: 'import { SignUpPage } from "@/componentsSugest/SignUpPage"',               dataType: "Componente full-page (sem data props)" },
            { id: "onboarding-page",   name: "Onboarding",         description: "Fluxo de boas-vindas",                  importStatement: 'import { OnboardingPage } from "@/componentsSugest/OnboardingPage"',       dataType: "Componente full-page (sem data props)" },
            { id: "settings-page",     name: "Settings",           description: "Página de configurações",               importStatement: 'import { SettingsPage } from "@/componentsSugest/SettingsPage"',           dataType: "Componente full-page (sem data props)" },
            { id: "account-settings",  name: "Account Settings",   description: "Configurações de conta",                importStatement: 'import { AccountSettings } from "@/componentsSugest/AccountSettings"',     dataType: "Componente full-page (sem data props)" },
            { id: "general-settings",  name: "General Settings",   description: "Configurações gerais",                  importStatement: 'import { GeneralSettings } from "@/componentsSugest/GeneralSettings"',     dataType: "Componente full-page (sem data props)" },
            { id: "billing-page",      name: "Billing",            description: "Página de cobrança e planos",           importStatement: 'import { BillingPage } from "@/componentsSugest/BillingPage"',             dataType: "Componente full-page (sem data props)" },
            { id: "notifications-page",name: "Notifications",      description: "Central de notificações",               importStatement: 'import { NotificationsPage } from "@/componentsSugest/NotificationsPage"', dataType: "{ id: number; type: string; read: boolean; icon: string; color: string; title: string; description: string; time: string }[]" },
            { id: "error-page",        name: "Error",              description: "Página de erro (404/500)",              importStatement: 'import { ErrorPage } from "@/componentsSugest/ErrorPage"',                 dataType: "Componente full-page (sem data props)" },
        ],
    },
    {
        title: "Navegação",
        items: [
            { id: "builder-breadcrumb",  name: "Breadcrumb",       description: "Hierarquia dinâmica (auto do sitemap)",   importStatement: 'import { BuilderBreadcrumb } from "@/componentsSugest/shadcn/BuilderBreadcrumb"', dataType: "Componente (sem data props)" },
            { id: "pagination-card",     name: "Pagination",       description: "Paginação com números e setas",          importStatement: 'import { PaginationCard } from "@/componentsSugest/shadcn/PaginationCard"',       dataType: "Componente (sem data props)" },
            { id: "separator-card",      name: "Separator",        description: "Divisor horizontal e vertical",           importStatement: 'import { SeparatorCard } from "@/componentsSugest/shadcn/SeparatorCard"',         dataType: "Componente (sem data props)" },
        ],
    },
    {
        title: "Overlays",
        items: [
            { id: "dialog-card",         name: "Dialog",           description: "Modal para formulários e confirmações",   importStatement: 'import { DialogCard } from "@/componentsSugest/shadcn/DialogCard"',               dataType: "Componente (sem data props)" },
            { id: "alert-dialog-card",   name: "Alert Dialog",     description: "Confirmação para ações destrutivas",      importStatement: 'import { AlertDialogCard } from "@/componentsSugest/shadcn/AlertDialogCard"',     dataType: "Componente (sem data props)" },
            { id: "drawer-card",         name: "Drawer",           description: "Painel deslizante inferior",              importStatement: 'import { DrawerCard } from "@/componentsSugest/shadcn/DrawerCard"',               dataType: "Componente (sem data props)" },
            { id: "sheet-card",          name: "Sheet",            description: "Painel lateral para detalhes",            importStatement: 'import { SheetCard } from "@/componentsSugest/shadcn/SheetCard"',                 dataType: "Componente (sem data props)" },
        ],
    },
    {
        title: "Feedback",
        items: [
            { id: "skeleton-card",       name: "Skeleton",         description: "Placeholders de carregamento",            importStatement: 'import { SkeletonCard } from "@/componentsSugest/shadcn/SkeletonCard"',           dataType: "Componente (sem data props)" },
            { id: "tooltip-card",        name: "Tooltip",          description: "Dicas rápidas ao passar o mouse",         importStatement: 'import { TooltipCard } from "@/componentsSugest/shadcn/TooltipCard"',             dataType: "Componente (sem data props)" },
            { id: "hover-card-card",     name: "Hover Card",       description: "Info expandida ao hover",                 importStatement: 'import { HoverCardCard } from "@/componentsSugest/shadcn/HoverCardCard"',         dataType: "Componente (sem data props)" },
            { id: "popover-card",        name: "Popover",          description: "Conteúdo flutuante interativo",           importStatement: 'import { PopoverCard } from "@/componentsSugest/shadcn/PopoverCard"',             dataType: "Componente (sem data props)" },
            { id: "progress-card",       name: "Progress",         description: "Barra de progresso animada",              importStatement: 'import { ProgressCard } from "@/componentsSugest/shadcn/ProgressCard"',           dataType: "Componente (sem data props)" },
        ],
    },
    {
        title: "Controles",
        items: [
            { id: "checkbox-card",       name: "Checkbox",         description: "Grupo de checkboxes de notificação",      importStatement: 'import { CheckboxCard } from "@/componentsSugest/shadcn/CheckboxCard"',           dataType: "Componente (sem data props)" },
            { id: "select-card",         name: "Select",           description: "Dropdowns de timezone e idioma",          importStatement: 'import { SelectCard } from "@/componentsSugest/shadcn/SelectCard"',               dataType: "Componente (sem data props)" },
            { id: "slider-card",         name: "Slider",           description: "Slider de volume e range",                importStatement: 'import { SliderCard } from "@/componentsSugest/shadcn/SliderCard"',               dataType: "Componente (sem data props)" },
            { id: "toggle-card",         name: "Toggle",           description: "Toggle group e botões alternáveis",       importStatement: 'import { ToggleCard } from "@/componentsSugest/shadcn/ToggleCard"',               dataType: "Componente (sem data props)" },
            { id: "switch-card",         name: "Switch",           description: "Switches on/off de preferências",         importStatement: 'import { SwitchCard } from "@/componentsSugest/shadcn/SwitchCard"',               dataType: "Componente (sem data props)" },
            { id: "input-otp-card",      name: "Input OTP",        description: "Campo de código de verificação",          importStatement: 'import { InputOtpCard } from "@/componentsSugest/shadcn/InputOtpCard"',           dataType: "Componente (sem data props)" },
            { id: "textarea-card",       name: "Textarea",         description: "Área de texto com envio",                 importStatement: 'import { TextareaCard } from "@/componentsSugest/shadcn/TextareaCard"',           dataType: "Componente (sem data props)" },
            { id: "theme-toggle",        name: "Theme Toggle",     description: "Toggle dark/light mode",                  importStatement: '// Theme Toggle (built-in)',                                                       dataType: "Componente configurável" },
        ],
    },
    {
        title: "Menus",
        items: [
            { id: "dropdown-menu-card",  name: "Dropdown Menu",    description: "Menu de ações com atalhos",               importStatement: 'import { DropdownMenuCard } from "@/componentsSugest/shadcn/DropdownMenuCard"',   dataType: "Componente (sem data props)" },
            { id: "context-menu-card",   name: "Context Menu",     description: "Menu de clique direito",                  importStatement: 'import { ContextMenuCard } from "@/componentsSugest/shadcn/ContextMenuCard"',     dataType: "Componente (sem data props)" },
            { id: "menubar-card",        name: "Menubar",          description: "Barra de menus estilo desktop",           importStatement: 'import { MenubarCard } from "@/componentsSugest/shadcn/MenubarCard"',             dataType: "Componente (sem data props)" },
        ],
    },
    {
        title: "Data",
        items: [
            { id: "calendar-single",     name: "Calendar",         description: "Seleção de data única",                   importStatement: 'import { CalendarSingleCard } from "@/componentsSugest/shadcn/CalendarSingleCard"', dataType: "Componente (sem data props)" },
            { id: "calendar-range",      name: "Calendar Range",   description: "Seleção de intervalo de datas",           importStatement: 'import { CalendarRangeCard } from "@/componentsSugest/shadcn/CalendarRangeCard"', dataType: "Componente (sem data props)" },
        ],
    },
    {
        title: "Containers",
        items: [
            { id: "accordion-demo",      name: "Accordion",        description: "FAQ e seções expansíveis",               importStatement: 'import { AccordionDemo } from "@/componentsSugest/shadcn/AccordionDemo"',         dataType: "Componente (sem data props)" },
            { id: "collapsible-demo",     name: "Collapsible",      description: "Blocos de conteúdo retráteis",           importStatement: 'import { CollapsibleDemo } from "@/componentsSugest/shadcn/AccordionDemo"',       dataType: "Componente (sem data props)" },
            { id: "carousel-demo",        name: "Carousel",         description: "Navegação horizontal entre cards",       importStatement: 'import { CarouselDemo } from "@/componentsSugest/shadcn/CarouselDemo"',           dataType: "Componente (sem data props)" },
            { id: "resizable-demo",       name: "Resizable",        description: "Painéis redimensionáveis e scroll area", importStatement: 'import { ResizableDemo } from "@/componentsSugest/shadcn/ResizableDemo"',         dataType: "Componente (sem data props)" },
        ],
    },
    {
        title: "Botões",
        items: [
            { id: "button-single", name: "Botão", description: "Botão com variantes semânticas", importStatement: '// Button (built-in)', dataType: "Componente configurável" },
        ],
    },
    {
        title: "Usuários",
        items: [
            { id: "avatar-single", name: "Avatar", description: "Avatar com nome e cargo", importStatement: '// Avatar (built-in)', dataType: "Componente configurável" },
        ],
    },
    {
        title: "Formas",
        items: [
            { id: "shape", name: "Shape", description: "Forma com ícone configurável", importStatement: '// Shape (built-in)', dataType: "Componente configurável" },
            { id: "card-shape", name: "Card Shape", description: "Card com ícone, título e descrição", importStatement: '// Card Shape (built-in)', dataType: "Componente configurável" },
            { id: "container", name: "Container", description: "Container visual para agrupamento", importStatement: '// Container (built-in)', dataType: "Componente configurável" },
        ],
    },
]

export const CHART_PALETTE = PALETTE_SECTIONS.flatMap(s => s.items)
export type ChartPaletteEntry = PaletteEntry

// ─── Selected components (shared between styleguide & builder) ───────────────

const SELECTED_KEY = "builder_selected_components"

export function getSelectedComponents(): string[] {
    if (typeof window === "undefined") return []
    try { return JSON.parse(localStorage.getItem(SELECTED_KEY) || "[]") }
    catch { return [] }
}

export function toggleSelectedComponent(id: string): string[] {
    const current = getSelectedComponents()
    const next = current.includes(id) ? current.filter(x => x !== id) : [...current, id]
    localStorage.setItem(SELECTED_KEY, JSON.stringify(next))
    return next
}

// ─── Layout components (full-width, no resize) ──────────────────────────────

export const LAYOUT_IDS = new Set(["navbar-comp", "sidebar-comp"])
export function isLayoutComponent(chartId: string) { return LAYOUT_IDS.has(chartId) }

// ─── Navigation items ────────────────────────────────────────────────────────

export interface NavItem {
    id: string
    label: string
    targetPageId: PageId | null
}

// ─── Shape config ────────────────────────────────────────────────────────────

export type ShapeConfig = {
    icon: string
    alignH: "start" | "center" | "end"
    alignV: "start" | "center" | "end"
    paddingTop: number
    paddingRight: number
    paddingBottom: number
    paddingLeft: number
    paddingLinked: boolean
    bgColor: string
    borderRadius: number
    showBorder: boolean
}

// ─── Card Shape config ───────────────────────────────────────────────────────

export type CardShapeConfig = {
    icon: string
    title: string
    description: string
}

// ─── Login config ────────────────────────────────────────────────────────────

export type LoginConfig = {
    heading: string
    subtext: string
    subtextLink: string
    emailLabel: string
    passwordLabel: string
    forgotLabel: string
    submitLabel: string
    googleLabel: string
    submitLinkPageId?: string | null
    googleLinkPageId?: string | null
    subtextLinkPageId?: string | null
    forgotLinkPageId?: string | null
}

// ─── SignUp config ───────────────────────────────────────────────────────────

export type SignUpConfig = {
    heading: string
    subtext: string
    subtextLink: string
    nameLabel: string
    emailLabel: string
    passwordLabel: string
    termsText: string
    termsLink: string
    privacyLink: string
    submitLabel: string
    googleLabel: string
    submitLinkPageId?: string | null
    googleLinkPageId?: string | null
    subtextLinkPageId?: string | null
}

// ─── StatCard config ─────────────────────────────────────────────────────────

export type StatCardConfig = {
    title: string
    value: string
    change: string
    positive: boolean
    description: string
}

// ─── Kanban config ───────────────────────────────────────────────────────────

export type KanbanColumn = { id: string; title: string; color: string }

export type KanbanConfig = {
    columns: KanbanColumn[]
}

// ─── Container config ────────────────────────────────────────────────────────

export type ContainerConfig = {
    title: string
    bgColor: string
    showBorder: boolean
    borderRadius: number
    showTitle: boolean
    titleAlign: "start" | "center"
}

// ─── Button config ───────────────────────────────────────────────────────────

export type ButtonConfig = {
    label: string
    variant: "default" | "destructive" | "outline" | "secondary" | "ghost"
    size: "default" | "sm" | "lg"
    linkPageId?: string | null
}

// ─── Avatar config ───────────────────────────────────────────────────────────

export type AvatarConfig = {
    name: string
    role: string
    size: "sm" | "default" | "lg"
    showName: boolean
    showRole: boolean
}

// ─── ThemeToggle config ──────────────────────────────────────────────────────

export type ThemeToggleConfig = {
    size: "sm" | "default" | "lg"
}

// ─── ItemConfig union ────────────────────────────────────────────────────────

export type ItemConfig =
    | ShapeConfig
    | CardShapeConfig
    | LoginConfig
    | SignUpConfig
    | StatCardConfig
    | KanbanConfig
    | ContainerConfig
    | ButtonConfig
    | AvatarConfig
    | ThemeToggleConfig

// ─── Defaults ────────────────────────────────────────────────────────────────

export const DEFAULT_SHAPE_CONFIG: ShapeConfig = {
    icon: "square", alignH: "center", alignV: "center",
    paddingTop: 12, paddingRight: 12, paddingBottom: 12, paddingLeft: 12,
    paddingLinked: true,
    bgColor: "primary", borderRadius: 8, showBorder: false,
}

export const DEFAULT_CARD_SHAPE_CONFIG: CardShapeConfig = {
    icon: "layoutGrid",
    title: "Novo Projeto",
    description: "Descrição do projeto",
}

export const DEFAULT_LOGIN_CONFIG: LoginConfig = {
    heading: "Entrar na sua conta",
    subtext: "Não tem uma conta?",
    subtextLink: "Criar conta",
    emailLabel: "Email",
    passwordLabel: "Senha",
    forgotLabel: "Esqueci minha senha",
    submitLabel: "Entrar",
    googleLabel: "Continuar com Google",
}

export const DEFAULT_SIGNUP_CONFIG: SignUpConfig = {
    heading: "Criar sua conta",
    subtext: "Já tem uma conta?",
    subtextLink: "Entrar",
    nameLabel: "Nome completo",
    emailLabel: "Email",
    passwordLabel: "Senha",
    termsText: "Concordo com os",
    termsLink: "Termos de uso",
    privacyLink: "Política de privacidade",
    submitLabel: "Criar conta",
    googleLabel: "Continuar com Google",
}

export const DEFAULT_STAT_CARD_CONFIG: StatCardConfig = {
    title: "Receita Total",
    value: "$48,295",
    change: "+12.5%",
    positive: true,
    description: "vs. mês anterior",
}

export const DEFAULT_KANBAN_CONFIG: KanbanConfig = {
    columns: [
        { id: "col-1", title: "A fazer", color: "muted" },
        { id: "col-2", title: "Em progresso", color: "info" },
        { id: "col-3", title: "Concluído", color: "success" },
    ],
}

export const DEFAULT_CONTAINER_CONFIG: ContainerConfig = {
    title: "Container",
    bgColor: "muted",
    showBorder: true,
    borderRadius: 8,
    showTitle: true,
    titleAlign: "start",
}

export const DEFAULT_BUTTON_CONFIG: ButtonConfig = {
    label: "Botão",
    variant: "default",
    size: "default",
}

export const DEFAULT_AVATAR_CONFIG: AvatarConfig = {
    name: "João Silva",
    role: "Designer",
    size: "default",
    showName: true,
    showRole: true,
}

export const DEFAULT_THEME_TOGGLE_CONFIG: ThemeToggleConfig = {
    size: "default",
}

// ─── Item type helpers ───────────────────────────────────────────────────────

export const SHAPE_IDS = new Set(["shape"])
export function isShapeItem(chartId: string) { return SHAPE_IDS.has(chartId) }

export const CARD_SHAPE_IDS = new Set(["card-shape"])
export function isCardShapeItem(chartId: string) { return CARD_SHAPE_IDS.has(chartId) }

export const LOGIN_IDS = new Set(["login-page"])
export function isLoginItem(chartId: string) { return LOGIN_IDS.has(chartId) }

export const SIGNUP_IDS = new Set(["signup-page"])
export function isSignUpItem(chartId: string) { return SIGNUP_IDS.has(chartId) }

export const STAT_CARD_IDS = new Set(["stat-cards"])
export function isStatCardItem(chartId: string) { return STAT_CARD_IDS.has(chartId) }

export const KANBAN_IDS = new Set(["kanban-board"])
export function isKanbanItem(chartId: string) { return KANBAN_IDS.has(chartId) }

export const CONTAINER_IDS = new Set(["container"])
export function isContainerItem(chartId: string) { return CONTAINER_IDS.has(chartId) }

export const BUTTON_IDS = new Set(["button-single"])
export function isButtonItem(chartId: string) { return BUTTON_IDS.has(chartId) }

export const AVATAR_IDS = new Set(["avatar-single"])
export function isAvatarItem(chartId: string) { return AVATAR_IDS.has(chartId) }

export const THEME_TOGGLE_IDS = new Set(["theme-toggle"])
export function isThemeToggleItem(chartId: string) { return THEME_TOGGLE_IDS.has(chartId) }

/** True if the item has a per-item config popover */
export function isConfigurableItem(chartId: string): boolean {
    return isShapeItem(chartId) || isCardShapeItem(chartId) ||
        isLoginItem(chartId) || isSignUpItem(chartId) ||
        isStatCardItem(chartId) || isKanbanItem(chartId) ||
        isContainerItem(chartId) || isButtonItem(chartId) ||
        isAvatarItem(chartId) || isThemeToggleItem(chartId)
}

/** Returns the default config for a configurable item, or undefined */
export function getDefaultConfig(chartId: string): ItemConfig | undefined {
    if (isShapeItem(chartId)) return { ...DEFAULT_SHAPE_CONFIG }
    if (isCardShapeItem(chartId)) return { ...DEFAULT_CARD_SHAPE_CONFIG }
    if (isLoginItem(chartId)) return { ...DEFAULT_LOGIN_CONFIG }
    if (isSignUpItem(chartId)) return { ...DEFAULT_SIGNUP_CONFIG }
    if (isStatCardItem(chartId)) return { ...DEFAULT_STAT_CARD_CONFIG }
    if (isKanbanItem(chartId)) return { ...DEFAULT_KANBAN_CONFIG }
    if (isContainerItem(chartId)) return { ...DEFAULT_CONTAINER_CONFIG }
    if (isButtonItem(chartId)) return { ...DEFAULT_BUTTON_CONFIG }
    if (isAvatarItem(chartId)) return { ...DEFAULT_AVATAR_CONFIG }
    if (isThemeToggleItem(chartId)) return { ...DEFAULT_THEME_TOGGLE_CONFIG }
    return undefined
}

/** Items that skip the card-inner wrapper (own background) */
export function skipCardInner(chartId: string): boolean {
    return isShapeItem(chartId) || isContainerItem(chartId) ||
        isButtonItem(chartId) || isAvatarItem(chartId) || isThemeToggleItem(chartId)
}

/** Default grid size for a given chart type */
export function getDefaultSize(chartId: string): { w: number; h: number } {
    if (isShapeItem(chartId)) return { w: 2, h: 2 }
    if (isContainerItem(chartId)) return { w: 12, h: 6 }
    if (isKanbanItem(chartId)) return { w: 24, h: 6 }
    if (isButtonItem(chartId) || isAvatarItem(chartId) || isThemeToggleItem(chartId)) return { w: 4, h: 2 }
    if (isLayoutComponent(chartId)) return { w: RGL_COLS, h: 4 }
    return { w: 6, h: 4 }
}

// ─── Canvas item ──────────────────────────────────────────────────────────────

export type CanvasItem = {
    instanceId: string; chartId: string; name: string; description: string
    importStatement: string; dataType: string
    x: number         // column offset (0..RGL_COLS-1)
    y: number         // row offset (in row units)
    w: number         // width in columns
    h: number         // height in row units
    targetPageId?: PageId | null  // link to another page (navigation on click)
    config?: ItemConfig            // per-item configuration (shapes, etc.)
}

// ─── Page & Navigation types ──────────────────────────────────────────────────

export type PageId = string

export interface PageLayout {
    showNavbar?: boolean
    showSidebar?: boolean
    showRightSidebar?: boolean
    sidebarWidth?: number
    sidebarOpen?: boolean
    rightSidebarWidth?: number
    rightSidebarOpen?: boolean
    navbarItems?: NavItem[]
    sidebarItems?: NavItem[]
    rightSidebarItems?: NavItem[]
    padV?: number
    padH?: number
}

export interface ResolvedLayout {
    showNavbar: boolean
    showSidebar: boolean
    showRightSidebar: boolean
    sidebarWidth: number
    sidebarOpen: boolean
    rightSidebarWidth: number
    rightSidebarOpen: boolean
    navbarItems: NavItem[]
    sidebarItems: NavItem[]
    rightSidebarItems: NavItem[]
    padV: number
    padH: number
}

export interface Page {
    id: PageId
    parentId: PageId | null
    label: string
    canvasItems: CanvasItem[]
    layout?: PageLayout
}

export interface TreeNode extends Page {
    children: TreeNode[]
    depth: number
}

// ─── Layout resolution (inheritance) ─────────────────────────────────────────

export function resolveLayout(
    pages: Page[],
    activePageId: PageId,
    rootLayout: ResolvedLayout,
): ResolvedLayout {
    const chain: Page[] = []
    let cur: Page | undefined = pages.find(p => p.id === activePageId)
    while (cur) {
        chain.unshift(cur)
        cur = cur.parentId ? pages.find(p => p.id === cur!.parentId) : undefined
    }

    const resolved = { ...rootLayout }

    for (const page of chain) {
        if (!page.layout) continue
        const L = page.layout
        if (L.showNavbar !== undefined) resolved.showNavbar = L.showNavbar
        if (L.showSidebar !== undefined) resolved.showSidebar = L.showSidebar
        if (L.showRightSidebar !== undefined) resolved.showRightSidebar = L.showRightSidebar
        if (L.sidebarWidth !== undefined) resolved.sidebarWidth = L.sidebarWidth
        if (L.sidebarOpen !== undefined) resolved.sidebarOpen = L.sidebarOpen
        if (L.rightSidebarWidth !== undefined) resolved.rightSidebarWidth = L.rightSidebarWidth
        if (L.rightSidebarOpen !== undefined) resolved.rightSidebarOpen = L.rightSidebarOpen
        if (L.navbarItems !== undefined) resolved.navbarItems = L.navbarItems
        if (L.sidebarItems !== undefined) resolved.sidebarItems = L.sidebarItems
        if (L.rightSidebarItems !== undefined) resolved.rightSidebarItems = L.rightSidebarItems
        if (L.padV !== undefined) resolved.padV = L.padV
        if (L.padH !== undefined) resolved.padH = L.padH
    }

    return resolved
}

export function pageHasLayoutOverride(page: Page): boolean {
    return page.layout !== undefined && Object.keys(page.layout).length > 0
}

// ─── Builder State ────────────────────────────────────────────────────────────

export type NavTarget = "navbar" | "sidebar" | "right-sidebar"

export interface BuilderState {
    pages: Page[]
    activePageId: PageId
    navbarItems: NavItem[]
    sidebarItems: NavItem[]
    rightSidebarItems: NavItem[]
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function navTargetKey(target: NavTarget): "navbarItems" | "sidebarItems" | "rightSidebarItems" {
    if (target === "navbar") return "navbarItems"
    if (target === "right-sidebar") return "rightSidebarItems"
    return "sidebarItems"
}

/** Apply a nav-items transform at the page-layout level (if pageId) or global level. */
function withNavItems(
    state: BuilderState,
    target: NavTarget,
    pageId: PageId | undefined,
    updater: (items: NavItem[]) => NavItem[],
): BuilderState {
    const key = navTargetKey(target)
    if (pageId) {
        return {
            ...state,
            pages: state.pages.map(p => {
                if (p.id !== pageId) return p
                const current = (p.layout?.[key] as NavItem[] | undefined) ?? state[key]
                return { ...p, layout: { ...p.layout, [key]: updater(current) } }
            }),
        }
    }
    return { ...state, [key]: updater(state[key]) }
}

export function newId() { return crypto.randomUUID() }

export function newPageId() { return crypto.randomUUID() }

/** Build tree structure from flat pages array */
export function buildTree(pages: Page[]): TreeNode[] {
    function getChildren(parentId: PageId | null, depth: number): TreeNode[] {
        return pages
            .filter(p => p.parentId === parentId)
            .map(p => ({ ...p, depth, children: getChildren(p.id, depth + 1) }))
    }
    return getChildren(null, 0)
}

/** Flatten tree for display (depth-first) */
export function flattenTree(nodes: TreeNode[]): TreeNode[] {
    const result: TreeNode[] = []
    function walk(list: TreeNode[]) {
        for (const node of list) {
            result.push(node)
            walk(node.children)
        }
    }
    walk(nodes)
    return result
}

/** Get all descendant IDs (for cascade delete) */
function getDescendantIds(pages: Page[], pageId: PageId): PageId[] {
    const ids: PageId[] = []
    function collect(pid: PageId) {
        for (const p of pages) {
            if (p.parentId === pid) { ids.push(p.id); collect(p.id) }
        }
    }
    collect(pageId)
    return ids
}

// ─── Reducer ──────────────────────────────────────────────────────────────────

function updateActivePage(state: BuilderState, updater: (page: Page) => Page): BuilderState {
    let changed = false
    const newPages = state.pages.map(p => {
        if (p.id !== state.activePageId) return p
        const updated = updater(p)
        if (updated !== p) changed = true
        return updated
    })
    if (!changed) return state
    return { ...state, pages: newPages }
}

export type BuilderAction =
    // Pages
    | { type: "ADD_PAGE"; parentId: PageId | null; label: string }
    | { type: "REMOVE_PAGE"; pageId: PageId }
    | { type: "RENAME_PAGE"; pageId: PageId; label: string }
    | { type: "REORDER_PAGE"; pageId: PageId; direction: "up" | "down" }
    | { type: "SET_ACTIVE_PAGE"; pageId: PageId }
    // Canvas items (operates on active page)
    | { type: "ADD_ITEM"; item: CanvasItem }
    | { type: "REMOVE_ITEM"; instanceId: string }
    | { type: "SET_ITEMS"; items: CanvasItem[] }
    | { type: "UPDATE_LAYOUT"; layout: Array<{ i: string; x: number; y: number; w: number; h: number }> }
    // Canvas item link & config
    | { type: "LINK_ITEM"; instanceId: string; targetPageId: PageId | null }
    | { type: "UPDATE_ITEM_CONFIG"; instanceId: string; config: Partial<ItemConfig> }
    // Nav items (pageId → edit page.layout; omit → edit global)
    | { type: "ADD_NAV_ITEM"; target: NavTarget; item: NavItem; pageId?: PageId }
    | { type: "REMOVE_NAV_ITEM"; target: NavTarget; itemId: string; pageId?: PageId }
    | { type: "UPDATE_NAV_ITEM"; target: NavTarget; itemId: string; label?: string; targetPageId?: PageId | null; pageId?: PageId }
    | { type: "REORDER_NAV_ITEM"; target: NavTarget; activeId: string; overId: string; pageId?: PageId }
    // Page layout overrides
    | { type: "SET_PAGE_LAYOUT"; pageId: PageId; layout: Partial<PageLayout> }
    | { type: "CLEAR_PAGE_LAYOUT_FIELD"; pageId: PageId; field: keyof PageLayout }

export function builderReducer(state: BuilderState, action: BuilderAction): BuilderState {
    switch (action.type) {
        // ── Pages ────────────────────────────────────────────────────────────
        case "ADD_PAGE": {
            const id = newPageId()
            return {
                ...state,
                pages: [...state.pages, { id, parentId: action.parentId, label: action.label, canvasItems: [] }],
            }
        }
        case "REMOVE_PAGE": {
            const toRemove = new Set([action.pageId, ...getDescendantIds(state.pages, action.pageId)])
            const clearTarget = (items: NavItem[]) =>
                items.map(i => toRemove.has(i.targetPageId!) ? { ...i, targetPageId: null } : i)
            const clearCanvasLinks = (items: CanvasItem[]) =>
                items.map(i => i.targetPageId && toRemove.has(i.targetPageId) ? { ...i, targetPageId: null } : i)
            const filtered = state.pages.filter(p => !toRemove.has(p.id)).map(p => {
                const cleanedCanvas = clearCanvasLinks(p.canvasItems)
                const canvasChanged = cleanedCanvas !== p.canvasItems
                if (!p.layout && !canvasChanged) return p
                const patch: Partial<PageLayout> = {}
                if (p.layout?.navbarItems) patch.navbarItems = clearTarget(p.layout.navbarItems)
                if (p.layout?.sidebarItems) patch.sidebarItems = clearTarget(p.layout.sidebarItems)
                if (p.layout?.rightSidebarItems) patch.rightSidebarItems = clearTarget(p.layout.rightSidebarItems)
                const layoutChanged = Object.keys(patch).length > 0
                if (!canvasChanged && !layoutChanged) return p
                return {
                    ...p,
                    ...(canvasChanged && { canvasItems: cleanedCanvas }),
                    ...(layoutChanged && { layout: { ...p.layout, ...patch } }),
                }
            })
            if (filtered.length === 0) return state
            return {
                ...state,
                pages: filtered,
                activePageId: toRemove.has(state.activePageId) ? filtered[0].id : state.activePageId,
                navbarItems: clearTarget(state.navbarItems),
                sidebarItems: clearTarget(state.sidebarItems),
                rightSidebarItems: clearTarget(state.rightSidebarItems),
            }
        }
        case "RENAME_PAGE": {
            const syncNav = (items: NavItem[]) =>
                items.map(i => i.targetPageId === action.pageId ? { ...i, label: action.label } : i)
            const syncPageLayout = (p: Page): Page => {
                if (!p.layout) return p
                const patch: Partial<PageLayout> = {}
                if (p.layout.navbarItems) patch.navbarItems = syncNav(p.layout.navbarItems)
                if (p.layout.sidebarItems) patch.sidebarItems = syncNav(p.layout.sidebarItems)
                if (p.layout.rightSidebarItems) patch.rightSidebarItems = syncNav(p.layout.rightSidebarItems)
                return Object.keys(patch).length > 0 ? { ...p, layout: { ...p.layout, ...patch } } : p
            }
            return {
                ...state,
                pages: state.pages.map(p => {
                    let updated = p.id === action.pageId ? { ...p, label: action.label } : p
                    return syncPageLayout(updated)
                }),
                navbarItems: syncNav(state.navbarItems),
                sidebarItems: syncNav(state.sidebarItems),
                rightSidebarItems: syncNav(state.rightSidebarItems),
            }
        }
        case "REORDER_PAGE": {
            // Reorder among siblings (same parentId)
            const page = state.pages.find(p => p.id === action.pageId)
            if (!page) return state
            const siblings = state.pages.filter(p => p.parentId === page.parentId)
            const sibIdx = siblings.findIndex(s => s.id === action.pageId)
            const targetIdx = action.direction === "up" ? sibIdx - 1 : sibIdx + 1
            if (targetIdx < 0 || targetIdx >= siblings.length) return state
            const reordered = arrayMove(siblings, sibIdx, targetIdx)
            // Rebuild pages: non-siblings stay in place, siblings get new order
            const siblingIds = new Set(siblings.map(s => s.id))
            const result: Page[] = []
            let sibCursor = 0
            for (const p of state.pages) {
                if (siblingIds.has(p.id)) {
                    result.push(reordered[sibCursor++])
                } else {
                    result.push(p)
                }
            }
            return { ...state, pages: result }
        }
        case "SET_ACTIVE_PAGE":
            return { ...state, activePageId: action.pageId }

        // ── Canvas items (active page) ──────────────────────────────────────
        case "ADD_ITEM":
            return updateActivePage(state, page => ({
                ...page, canvasItems: [...page.canvasItems, action.item],
            }))
        case "REMOVE_ITEM":
            return updateActivePage(state, page => ({
                ...page,
                canvasItems: page.canvasItems.filter(i => i.instanceId !== action.instanceId),
            }))
        case "SET_ITEMS":
            return updateActivePage(state, page => ({ ...page, canvasItems: action.items }))
        case "UPDATE_LAYOUT":
            return updateActivePage(state, page => {
                let changed = false
                const next = page.canvasItems.map(item => {
                    const l = action.layout.find(li => li.i === item.instanceId)
                    if (!l) return item
                    if (item.x === l.x && item.y === l.y && item.w === l.w && item.h === l.h) return item
                    changed = true
                    return { ...item, x: l.x, y: l.y, w: l.w, h: l.h }
                })
                return changed ? { ...page, canvasItems: next } : page
            })

        // ── Canvas item link & config ─────────────────────────────────────
        case "LINK_ITEM":
            return updateActivePage(state, page => ({
                ...page,
                canvasItems: page.canvasItems.map(i =>
                    i.instanceId === action.instanceId
                        ? { ...i, targetPageId: action.targetPageId || null }
                        : i
                ),
            }))
        case "UPDATE_ITEM_CONFIG":
            return updateActivePage(state, page => ({
                ...page,
                canvasItems: page.canvasItems.map(i =>
                    i.instanceId === action.instanceId
                        ? { ...i, config: { ...i.config, ...action.config } as ItemConfig }
                        : i
                ),
            }))

        // ── Nav items (global or per-page layout) ──────────────────────────
        case "ADD_NAV_ITEM":
            return withNavItems(state, action.target, action.pageId, items => [...items, action.item])

        case "REMOVE_NAV_ITEM":
            return withNavItems(state, action.target, action.pageId, items => items.filter(i => i.id !== action.itemId))

        case "UPDATE_NAV_ITEM": {
            let result = withNavItems(state, action.target, action.pageId, items =>
                items.map(i =>
                    i.id !== action.itemId ? i : {
                        ...i,
                        ...(action.label !== undefined && { label: action.label }),
                        ...(action.targetPageId !== undefined && { targetPageId: action.targetPageId }),
                    }
                )
            )
            // Propagate label rename to linked page
            if (action.label !== undefined) {
                const key = navTargetKey(action.target)
                const source = action.pageId
                    ? result.pages.find(p => p.id === action.pageId)?.layout?.[key] as NavItem[] | undefined
                    : result[key]
                const navItem = source?.find(i => i.id === action.itemId)
                if (navItem?.targetPageId) {
                    result = { ...result, pages: result.pages.map(p => p.id === navItem.targetPageId ? { ...p, label: action.label! } : p) }
                }
            }
            return result
        }

        case "REORDER_NAV_ITEM":
            return withNavItems(state, action.target, action.pageId, items => {
                const oi = items.findIndex(i => i.id === action.activeId)
                const ni = items.findIndex(i => i.id === action.overId)
                if (oi === -1 || ni === -1) return items
                return arrayMove(items, oi, ni)
            })

        // ── Page layout overrides ─────────────────────────────────────────────
        case "SET_PAGE_LAYOUT": {
            return {
                ...state,
                pages: state.pages.map(p =>
                    p.id === action.pageId
                        ? { ...p, layout: { ...p.layout, ...action.layout } }
                        : p
                ),
            }
        }

        case "CLEAR_PAGE_LAYOUT_FIELD": {
            return {
                ...state,
                pages: state.pages.map(p => {
                    if (p.id !== action.pageId || !p.layout) return p
                    const { [action.field]: _, ...rest } = p.layout
                    const hasFields = Object.keys(rest).length > 0
                    return { ...p, layout: hasFields ? rest : undefined }
                }),
            }
        }

        default:
            return state
    }
}

// ─── Initial state factory ────────────────────────────────────────────────────

export function createInitialState(): BuilderState {
    const firstId = newPageId()
    return {
        pages: [{ id: firstId, parentId: null, label: "Página 1", canvasItems: [] }],
        activePageId: firstId,
        navbarItems: [],
        sidebarItems: [],
        rightSidebarItems: [],
    }
}

// ─── RGL migration (colSpan/heightPx → x/y/w/h) ─────────────────────────────

function migrateCanvasItemsToRGL(items: unknown[], oldGridCols: number): CanvasItem[] {
    const scale = RGL_COLS / oldGridCols
    let curX = 0, curY = 0, rowMaxH = 0
    return (items as Record<string, unknown>[]).map(item => {
        const w = Math.min(RGL_COLS, Math.round(((item.colSpan as number) ?? 6) * scale))
        const h = typeof item.h === "number" ? item.h :
            ((item.heightPx as number) > 0
                ? Math.max(1, Math.ceil((item.heightPx as number) / (RGL_ROW_HEIGHT + RGL_MARGIN[1])))
                : 4)
        if (curX + w > RGL_COLS) { curX = 0; curY += rowMaxH; rowMaxH = 0 }
        const x = curX, y = curY
        curX += w; rowMaxH = Math.max(rowMaxH, h)
        return {
            instanceId: item.instanceId as string,
            chartId: item.chartId as string,
            name: item.name as string,
            description: item.description as string,
            importStatement: item.importStatement as string,
            dataType: item.dataType as string,
            x, y, w, h,
            ...(item.targetPageId != null && { targetPageId: item.targetPageId as PageId }),
        }
    })
}

/** Migrate legacy persisted data */
export function migrateState(raw: Record<string, unknown>): BuilderState {
    const state = raw as unknown as BuilderState
    // Ensure pages array is valid
    if (!Array.isArray(state.pages) || state.pages.length === 0) return createInitialState()
    // Fix stale activePageId
    const validActiveId = state.pages.some(p => p.id === state.activePageId)
        ? state.activePageId
        : state.pages[0].id
    // Already migrated to navbarItems format
    if (Array.isArray(state.navbarItems)) {
        // Ensure rightSidebarItems exists (added later)
        let result = state
        if (!Array.isArray(state.rightSidebarItems)) result = { ...result, rightSidebarItems: [] }
        if (validActiveId !== result.activePageId) result = { ...result, activePageId: validActiveId }
        // Migrate canvas items from colSpan/heightPx to x/y/w/h
        const needsRGL = result.pages.some(p =>
            p.canvasItems.length > 0 &&
            (p.canvasItems[0] as Record<string, unknown>).colSpan !== undefined &&
            (p.canvasItems[0] as Record<string, unknown>).x === undefined
        )
        if (needsRGL) {
            const oldGridCols = 12 // default from previous version
            result = {
                ...result,
                pages: result.pages.map(p => ({
                    ...p,
                    canvasItems: p.canvasItems.length > 0
                        ? migrateCanvasItemsToRGL(p.canvasItems as unknown[], oldGridCols)
                        : p.canvasItems,
                })),
            }
        }
        return result
    }
    // Legacy format: navLinks array
    const legacyLinks = (raw as { navLinks?: { sourceType: string; sourceItemLabel: string; targetPageId: string }[] }).navLinks
    const navbarItems: NavItem[] = []
    const sidebarItems: NavItem[] = []
    if (Array.isArray(legacyLinks)) {
        for (const l of legacyLinks) {
            const item: NavItem = { id: newId(), label: l.sourceItemLabel, targetPageId: l.targetPageId }
            if (l.sourceType === "mock-navbar") navbarItems.push(item)
            else sidebarItems.push(item)
        }
    }
    return {
        pages: state.pages.map(p => ({
            ...p,
            canvasItems: p.canvasItems.length > 0
                ? migrateCanvasItemsToRGL(p.canvasItems as unknown[], 12)
                : p.canvasItems,
        })),
        activePageId: validActiveId,
        navbarItems,
        sidebarItems,
        rightSidebarItems: [],
    }
}
