import { NextResponse } from "next/server"
import { createBackup, listBackups } from "@/lib/backup"

export async function GET() {
  try {
    const backups = listBackups()
    return NextResponse.json(backups)
  } catch (error) {
    console.error("Erro ao listar backups:", error)
    return NextResponse.json({ error: "Erro ao listar backups" }, { status: 500 })
  }
}

export async function POST() {
  try {
    const result = await createBackup()

    if (result.success) {
      return NextResponse.json(result)
    } else {
      return NextResponse.json({ error: "Erro ao criar backup" }, { status: 500 })
    }
  } catch (error) {
    console.error("Erro ao criar backup:", error)
    return NextResponse.json({ error: "Erro ao criar backup" }, { status: 500 })
  }
}
