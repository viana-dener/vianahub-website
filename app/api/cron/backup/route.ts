import { NextResponse } from "next/server"
import { createBackup } from "@/lib/backup"

// Executar a cada dia às 3h da manhã
export const config = {
  runtime: "nodejs",
  schedule: "0 3 * * *",
}

export async function GET() {
  try {
    const result = await createBackup()

    if (result.success) {
      return NextResponse.json(result)
    } else {
      return NextResponse.json({ error: "Erro ao criar backup automático" }, { status: 500 })
    }
  } catch (error) {
    console.error("Erro ao criar backup automático:", error)
    return NextResponse.json({ error: "Erro ao criar backup automático" }, { status: 500 })
  }
}
