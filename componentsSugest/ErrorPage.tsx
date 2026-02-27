export function ErrorPage() {
    return (
        <div className="flex min-h-screen w-full flex-col items-center justify-center bg-background px-4 text-center">
            <p className="select-none text-8xl font-bold text-muted-foreground/20">404</p>
            <h1 className="mt-4 text-2xl font-semibold text-foreground">Página não encontrada</h1>
            <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                A página que você procura não existe ou foi movida. Verifique o endereço ou volte ao início.
            </p>
            <div className="mt-8 flex items-center gap-3">
                <button
                    onClick={() => window.history.back()}
                    className="rounded-md border border-border bg-transparent px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent"
                >
                    Voltar
                </button>
                <button className="rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90">
                    Ir para o início
                </button>
            </div>
        </div>
    )
}
