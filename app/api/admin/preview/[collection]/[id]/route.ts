import { NextResponse } from "next/server"
import { getPreviewVersion, savePreviewVersion, publishPreviewVersion, discardPreviewVersion } from "@/lib/preview"

// Obter versão de preview
export async function GET(request: Request, { params }: { params: { collection: string; id: string } }) {
  try {
    const { collection, id } = params
    const numericId = Number.parseInt(id)

    if (isNaN(numericId)) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 })
    }

    const previewVersion = await getPreviewVersion(collection, numericId)

    if (!previewVersion) {
      return NextResponse.json({ error: "Versão de preview não encontrada" }, { status: 404 })
    }

    return NextResponse.json(previewVersion)
  } catch (error) {
    console.error("Erro ao obter versão de preview:", error)
    return NextResponse.json({ error: "Erro ao obter versão de preview" }, { status: 500 })
  }
}

// Salvar versão de preview
export async function POST(request: Request, { params }: { params: { collection: string; id: string } }) {
  try {
    const { collection, id } = params
    const numericId = Number.parseInt(id)
    const data = await request.json()

    if (isNaN(numericId)) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 })
    }

    const result = await savePreviewVersion(collection, numericId, data)

    if (result.success) {
      return NextResponse.json(result)
    } else {
      return NextResponse.json({ error: "Erro ao salvar versão de preview" }, { status: 500 })
    }
  } catch (error) {
    console.error("Erro ao salvar versão de preview:", error)
    return NextResponse.json({ error: "Erro ao salvar versão de preview" }, { status: 500 })
  }
}

// Publicar versão de preview
export async function PUT(request: Request, { params }: { params: { collection: string; id: string } }) {
  try {
    const { collection, id } = params
    const numericId = Number.parseInt(id)

    if (isNaN(numericId)) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 })
    }

    const result = await publishPreviewVersion(collection, numericId)

    if (result.success) {
      return NextResponse.json(result)
    } else {
      return NextResponse.json({ error: "Erro ao publicar versão de preview" }, { status: 500 })
    }
  } catch (error) {
    console.error("Erro ao publicar versão de preview:", error)
    return NextResponse.json({ error: "Erro ao publicar versão de preview" }, { status: 500 })
  }
}

// Descartar versão de preview
export async function DELETE(request: Request, { params }: { params: { collection: string; id: string } }) {
  try {
    const { collection, id } = params
    const numericId = Number.parseInt(id)

    if (isNaN(numericId)) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 })
    }

    const result = await discardPreviewVersion(collection, numericId)

    if (result.success) {
      return NextResponse.json(result)
    } else {
      return NextResponse.json({ error: "Erro ao descartar versão de preview" }, { status: 500 })
    }
  } catch (error) {
    console.error("Erro ao descartar versão de preview:", error)
    return NextResponse.json({ error: "Erro ao descartar versão de preview" }, { status: 500 })
  }
}
