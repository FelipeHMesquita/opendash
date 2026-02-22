import { NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export async function GET(request: NextRequest) {
    const file = request.nextUrl.searchParams.get("file")

    if (!file) {
        return NextResponse.json({ error: "Missing file param" }, { status: 400 })
    }

    // Prevent path traversal — only allow plain component names
    if (!/^[A-Za-z0-9_-]+$/.test(file)) {
        return NextResponse.json({ error: "Invalid file name" }, { status: 400 })
    }

    const filePath = path.join(process.cwd(), "componentsSugest", `${file}.tsx`)

    try {
        const source = fs.readFileSync(filePath, "utf-8")
        return NextResponse.json({ source })
    } catch {
        return NextResponse.json({ error: `File not found: ${file}.tsx` }, { status: 404 })
    }
}
