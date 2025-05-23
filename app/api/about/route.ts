import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"

export async function GET() {
  try {
    const { db } = await connectToDatabase()

    const aboutInfo = await db.collection("about").findOne({ active: true })

    if (!aboutInfo) {
      return NextResponse.json({ error: "Informações sobre a empresa não encontradas" }, { status: 404 })
    }

    return NextResponse.json(aboutInfo)
  } catch (error) {
    console.error("Erro ao buscar informações sobre a empresa:", error)
    return NextResponse.json({ error: "Erro ao buscar informações sobre a empresa" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const { db } = await connectToDatabase()
    const data = await request.json()

    // Validar dados
    if (!data.mission || !data.vision || !data.values) {
      return NextResponse.json({ error: "Dados incompletos" }, { status: 400 })
    }

    // Atualizar informações sobre a empresa
    const result = await db.collection("about").updateOne(
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
    console.error("Erro ao atualizar informações sobre a empresa:", error)
    return NextResponse.json({ error: "Erro ao atualizar informações sobre a empresa" }, { status: 500 })
  }
}
