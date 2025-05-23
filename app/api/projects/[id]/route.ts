import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { db } = await connectToDatabase()
    const id = Number.parseInt(params.id)

    if (isNaN(id)) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 })
    }

    const project = await db.collection("projects").findOne({ id })

    if (!project) {
      return NextResponse.json({ error: "Projeto não encontrado" }, { status: 404 })
    }

    return NextResponse.json(project)
  } catch (error) {
    console.error("Erro ao buscar projeto:", error)
    return NextResponse.json({ error: "Erro ao buscar projeto" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { db } = await connectToDatabase()
    const id = Number.parseInt(params.id)
    const data = await request.json()

    if (isNaN(id)) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 })
    }

    // Validar dados
    if (!data.title || !data.description) {
      return NextResponse.json({ error: "Dados incompletos" }, { status: 400 })
    }

    // Atualizar o projeto
    const result = await db.collection("projects").updateOne(
      { id },
      {
        $set: {
          ...data,
          updatedAt: new Date(),
        },
      },
    )

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Projeto não encontrado" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      modifiedCount: result.modifiedCount,
    })
  } catch (error) {
    console.error("Erro ao atualizar projeto:", error)
    return NextResponse.json({ error: "Erro ao atualizar projeto" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const { db } = await connectToDatabase()
    const id = Number.parseInt(params.id)

    if (isNaN(id)) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 })
    }

    const result = await db.collection("projects").deleteOne({ id })

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Projeto não encontrado" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      deletedCount: result.deletedCount,
    })
  } catch (error) {
    console.error("Erro ao excluir projeto:", error)
    return NextResponse.json({ error: "Erro ao excluir projeto" }, { status: 500 })
  }
}
