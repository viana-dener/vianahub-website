import { NextResponse } from "next/server"
import { restoreBackup } from "@/lib/backup"

export async function POST(request: Request) {
  try {
    const { path } = await request.json()

    if (!path) {
      return NextResponse.json({ error: "Caminho do backup não fornecido" }, { status: 400 })
    }

    const result = await restoreBackup(path)

    if (result.success) {
      return NextResponse.json(result)
    } else {
      return NextResponse.json({ error: "Erro ao restaurar backup" }, { status: 500 })
    }
  } catch (error) {
    console.error("Erro ao restaurar backup:", error)
    return NextResponse.json({ error: "Erro ao restaurar backup" }, { status: 500 })
  }
}
