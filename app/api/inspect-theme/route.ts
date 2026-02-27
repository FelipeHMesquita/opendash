import Anthropic from "@anthropic-ai/sdk"
import { generateLayout } from "@/lib/generateLayout"

export async function POST(req: Request) {
    // Check API key before doing anything — avoids module-level crash
    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) {
        return Response.json(
            { error: "ANTHROPIC_API_KEY não configurada. Crie um arquivo .env.local com a chave." },
            { status: 503 }
        )
    }

    const form = await req.formData()
    const logo = form.get("logo") as File | null
    const screenshots = form.getAll("screenshots") as File[]

    const files = [...(logo ? [logo] : []), ...screenshots]
    if (files.length === 0) {
        return Response.json({ error: "Envie ao menos uma imagem" }, { status: 400 })
    }

    // Convert files to base64 image blocks for Claude
    const imageBlocks = await Promise.all(
        files.map(async (file) => {
            const buffer = await file.arrayBuffer()
            const base64 = Buffer.from(buffer).toString("base64")
            let mediaType = file.type as "image/png" | "image/jpeg" | "image/gif" | "image/webp"
            if (!["image/png", "image/jpeg", "image/gif", "image/webp"].includes(file.type)) {
                mediaType = "image/png"
            }
            return {
                type: "image" as const,
                source: { type: "base64" as const, media_type: mediaType, data: base64 },
            }
        })
    )

    try {
        const client = new Anthropic({ apiKey })

        const msg = await client.messages.create({
            model: "claude-sonnet-4-6",
            max_tokens: 20,
            messages: [
                {
                    role: "user",
                    content: [
                        ...imageBlocks,
                        {
                            type: "text",
                            text: "Analise as imagens. Se houver logo, identifique a cor primária/dominante da marca. Se houver prints de interface, identifique a cor usada nos botões, links e elementos de destaque. Responda APENAS com um hex color no formato #RRGGBB. Sem mais nada.",
                        },
                    ],
                },
            ],
        })

        const raw = (msg.content[0] as { type: string; text: string }).text.trim()
        const match = raw.match(/#[0-9A-Fa-f]{6}/)
        const hex = match ? match[0] : raw

        if (!/^#[0-9A-Fa-f]{6}$/i.test(hex)) {
            return Response.json(
                { error: "Não foi possível extrair a cor primária das imagens enviadas" },
                { status: 422 }
            )
        }

        const layout = generateLayout(hex, "")
        return Response.json({ hex, cssVars: layout.cssVars, themeName: layout.themeName })

    } catch (err) {
        const message = err instanceof Error ? err.message : "Erro desconhecido"
        return Response.json({ error: `Erro ao chamar Claude API: ${message}` }, { status: 500 })
    }
}
