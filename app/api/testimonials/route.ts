import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import { logAction, LogAction } from "@/lib/logger"

export async function GET() {
  try {
    const { db } = await connectToDatabase()

    const testimonials = await db.collection("testimonials").find({ active: true }).sort({ id: 1 }).toArray()

    return NextResponse.json(testimonials)
  } catch (error) {
    console.error("Erro ao buscar testemunhos:", error)
    return NextResponse.json({ error: "Erro ao buscar testemunhos" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { db } = await connectToDatabase()
    const data = await request.json()

    // Extrair informações do usuário do cabeçalho de autorização
    const authHeader = request.headers.get("authorization")
    const token = authHeader?.split(" ")[1]

    // Em produção, você decodificaria o token JWT para obter as informações do usuário
    // Para simplificar, vamos usar valores fixos
    const userId = "1"
    const userName = "Administrador"

    // Validar dados
    if (!data.name || !data.testimonial) {
      return NextResponse.json({ error: "Dados incompletos" }, { status: 400 })
    }

    // Obter o maior ID atual
    const maxIdDoc = await db.collection("testimonials").find().sort({ id: -1 }).limit(1).toArray()

    const nextId = maxIdDoc.length > 0 ? maxIdDoc[0].id + 1 : 1

    // Preparar o documento a ser inserido
    const newTestimonial = {
      ...data,
      id: nextId,
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    // Inserir o novo testemunho
    const result = await db.collection("testimonials").insertOne(newTestimonial)

    // Registrar a ação no log
    await logAction({
      action: LogAction.CREATE,
      collection: "testimonials",
      documentId: nextId,
      userId,
      userName,
      details: { name: data.name },
    })

    return NextResponse.json(
      {
        ...newTestimonial,
        _id: result.insertedId,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Erro ao adicionar testemunho:", error)
    return NextResponse.json({ error: "Erro ao adicionar testemunho" }, { status: 500 })
  }
}
