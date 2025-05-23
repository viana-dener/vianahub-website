import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { db } = await connectToDatabase()
    const id = Number.parseInt(params.id)

    if (isNaN(id)) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 })
    }

    const testimonial = await db.collection("testimonials").findOne({ id })

    if (!testimonial) {
      return NextResponse.json({ error: "Testemunho não encontrado" }, { status: 404 })
    }

    return NextResponse.json(testimonial)
  } catch (error) {
    console.error("Erro ao buscar testemunho:", error)
    return NextResponse.json({ error: "Erro ao buscar testemunho" }, { status: 500 })
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
    if (!data.name || !data.testimonial) {
      return NextResponse.json({ error: "Dados incompletos" }, { status: 400 })
    }

    // Atualizar o testemunho
    const result = await db.collection("testimonials").updateOne(
      { id },
      {
        $set: {
          ...data,
          updatedAt: new Date(),
        },
      },
    )

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Testemunho não encontrado" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      modifiedCount: result.modifiedCount,
    })
  } catch (error) {
    console.error("Erro ao atualizar testemunho:", error)
    return NextResponse.json({ error: "Erro ao atualizar testemunho" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const { db } = await connectToDatabase()
    const id = Number.parseInt(params.id)

    if (isNaN(id)) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 })
    }

    const result = await db.collection("testimonials").deleteOne({ id })

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Testemunho não encontrado" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      deletedCount: result.deletedCount,
    })
  } catch (error) {
    console.error("Erro ao excluir testemunho:", error)
    return NextResponse.json({ error: "Erro ao excluir testemunho" }, { status: 500 })
  }
}
