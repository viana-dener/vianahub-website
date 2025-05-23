import { connectToDatabase } from "./mongodb"

// Interface para o status de publicação
export interface PublishStatus {
  isDraft: boolean
  publishedVersion: number | null
  currentVersion: number
  scheduledPublish: Date | null
}

// Função para obter a versão de preview de um documento
export async function getPreviewVersion(collection: string, id: number) {
  try {
    const { db } = await connectToDatabase()

    const document = await db.collection(`${collection}_drafts`).findOne({ originalId: id })

    if (!document) {
      // Se não houver versão de rascunho, retornar a versão publicada
      return await db.collection(collection).findOne({ id })
    }

    return document
  } catch (error) {
    console.error(`Erro ao obter versão de preview para ${collection}:${id}:`, error)
    return null
  }
}

// Função para salvar uma versão de preview
export async function savePreviewVersion(collection: string, id: number, data: any) {
  try {
    const { db } = await connectToDatabase()

    // Verificar se já existe uma versão de rascunho
    const existingDraft = await db.collection(`${collection}_drafts`).findOne({ originalId: id })

    if (existingDraft) {
      // Atualizar o rascunho existente
      await db.collection(`${collection}_drafts`).updateOne(
        { originalId: id },
        {
          $set: {
            ...data,
            updatedAt: new Date(),
          },
        },
      )
    } else {
      // Criar um novo rascunho
      await db.collection(`${collection}_drafts`).insertOne({
        ...data,
        originalId: id,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    }

    return {
      success: true,
      id,
      collection,
    }
  } catch (error) {
    console.error(`Erro ao salvar versão de preview para ${collection}:${id}:`, error)
    return {
      success: false,
      error,
    }
  }
}

// Função para publicar uma versão de preview
export async function publishPreviewVersion(collection: string, id: number) {
  try {
    const { db } = await connectToDatabase()

    // Obter a versão de rascunho
    const draft = await db.collection(`${collection}_drafts`).findOne({ originalId: id })

    if (!draft) {
      throw new Error(`Nenhum rascunho encontrado para ${collection}:${id}`)
    }

    // Remover campos específicos do rascunho
    const { _id, originalId, ...draftData } = draft

    // Atualizar o documento publicado
    await db.collection(collection).updateOne(
      { id },
      {
        $set: {
          ...draftData,
          updatedAt: new Date(),
        },
      },
    )

    // Remover o rascunho
    await db.collection(`${collection}_drafts`).deleteOne({ originalId: id })

    return {
      success: true,
      id,
      collection,
    }
  } catch (error) {
    console.error(`Erro ao publicar versão de preview para ${collection}:${id}:`, error)
    return {
      success: false,
      error,
    }
  }
}

// Função para descartar uma versão de preview
export async function discardPreviewVersion(collection: string, id: number) {
  try {
    const { db } = await connectToDatabase()

    // Remover o rascunho
    const result = await db.collection(`${collection}_drafts`).deleteOne({ originalId: id })

    if (result.deletedCount === 0) {
      throw new Error(`Nenhum rascunho encontrado para ${collection}:${id}`)
    }

    return {
      success: true,
      id,
      collection,
    }
  } catch (error) {
    console.error(`Erro ao descartar versão de preview para ${collection}:${id}:`, error)
    return {
      success: false,
      error,
    }
  }
}
