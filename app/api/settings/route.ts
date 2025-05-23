import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"

export async function GET() {
  try {
    const { db } = await connectToDatabase()

    const settings = await db.collection("settings").findOne({ active: true })

    if (!settings) {
      return NextResponse.json({ error: "Configurações não encontradas" }, { status: 404 })
    }

    return NextResponse.json(settings)
  } catch (error) {
    console.error("Erro ao buscar configurações:", error)
    return NextResponse.json({ error: "Erro ao buscar configurações" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const { db } = await connectToDatabase()
    const data = await request.json()

    // Validar dados
    if (!data.siteName) {
      return NextResponse.json({ error: "Dados incompletos" }, { status: 400 })
    }

    // Atualizar configurações
    const result = await db.collection("settings").updateOne(
      { active: true },
      {
        $set: {
          ...data,
          updatedAt: new Date(),
        },
      },
      { upsert: true },
    )

    return NextResponse.json({
      success: true,
      modifiedCount: result.modifiedCount,
      upsertedId: result.upsertedId,
    })
  } catch (error) {
    console.error("Erro ao atualizar configurações:", error)
    return NextResponse.json({ error: "Erro ao atualizar configurações" }, { status: 500 })
  }
}
