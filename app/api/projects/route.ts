import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"

export async function GET() {
  try {
    const { db } = await connectToDatabase()

    const projects = await db.collection("projects").find({ active: true }).sort({ order: 1 }).toArray()

    return NextResponse.json(projects)
  } catch (error) {
    console.error("Erro ao buscar projetos:", error)
    return NextResponse.json({ error: "Erro ao buscar projetos" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { db } = await connectToDatabase()
    const data = await request.json()

    // Validar dados
    if (!data.title || !data.description) {
      return NextResponse.json({ error: "Dados incompletos" }, { status: 400 })
    }

    // Obter o maior ID atual
    const maxIdDoc = await db.collection("projects").find().sort({ id: -1 }).limit(1).toArray()

    const nextId = maxIdDoc.length > 0 ? maxIdDoc[0].id + 1 : 1

    // Obter a maior ordem atual
    const maxOrderDoc = await db.collection("projects").find().sort({ order: -1 }).limit(1).toArray()

    const nextOrder = maxOrderDoc.length > 0 ? maxOrderDoc[0].order + 1 : 1

    // Preparar o documento a ser inserido
    const newProject = {
      ...data,
      id: nextId,
      order: data.order || nextOrder,
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    // Inserir o novo projeto
    const result = await db.collection("projects").insertOne(newProject)

    return NextResponse.json(
      {
        ...newProject,
        _id: result.insertedId,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Erro ao adicionar projeto:", error)
    return NextResponse.json({ error: "Erro ao adicionar projeto" }, { status: 500 })
  }
}
