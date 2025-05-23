import { connectToDatabase } from "./mongodb"
import fs from "fs"
import path from "path"
import { exec } from "child_process"
import util from "util"

const execPromise = util.promisify(exec)

export async function createBackup() {
  try {
    const timestamp = new Date().toISOString().replace(/:/g, "-")
    const backupDir = path.join(process.cwd(), "backups")

    // Criar diretório de backup se não existir
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true })
    }

    const backupPath = path.join(backupDir, `backup-${timestamp}.json`)

    const { db } = await connectToDatabase()

    // Obter todas as coleções
    const collections = await db.listCollections().toArray()

    const backup: Record<string, any[]> = {}

    // Exportar dados de cada coleção
    for (const collection of collections) {
      const collectionName = collection.name
      const data = await db.collection(collectionName).find({}).toArray()

      // Remover o campo _id para facilitar a restauração
      const cleanData = data.map((item) => {
        const { _id, ...rest } = item
        return rest
      })

      backup[collectionName] = cleanData
    }

    // Salvar o backup como JSON
    fs.writeFileSync(backupPath, JSON.stringify(backup, null, 2))

    console.log(`Backup criado com sucesso: ${backupPath}`)

    // Opcional: Fazer upload do backup para um serviço de armazenamento em nuvem
    // await uploadToCloud(backupPath)

    return {
      success: true,
      path: backupPath,
      timestamp,
    }
  } catch (error) {
    console.error("Erro ao criar backup:", error)
    return {
      success: false,
      error,
    }
  }
}

export async function restoreBackup(backupPath: string) {
  try {
    // Verificar se o arquivo existe
    if (!fs.existsSync(backupPath)) {
      throw new Error(`Arquivo de backup não encontrado: ${backupPath}`)
    }

    // Ler o arquivo de backup
    const backupData = JSON.parse(fs.readFileSync(backupPath, "utf8"))

    const { db } = await connectToDatabase()

    // Restaurar cada coleção
    for (const [collectionName, data] of Object.entries(backupData)) {
      if (Array.isArray(data) && data.length > 0) {
        // Limpar a coleção antes de restaurar
        await db.collection(collectionName).deleteMany({})

        // Inserir os dados do backup
        if (data.length > 0) {
          await db.collection(collectionName).insertMany(data as any[])
        }

        console.log(`Coleção ${collectionName} restaurada com ${data.length} documentos`)
      }
    }

    return {
      success: true,
      collections: Object.keys(backupData),
    }
  } catch (error) {
    console.error("Erro ao restaurar backup:", error)
    return {
      success: false,
      error,
    }
  }
}

// Função para listar backups disponíveis
export function listBackups() {
  try {
    const backupDir = path.join(process.cwd(), "backups")

    if (!fs.existsSync(backupDir)) {
      return []
    }

    const files = fs
      .readdirSync(backupDir)
      .filter((file) => file.startsWith("backup-") && file.endsWith(".json"))
      .map((file) => {
        const filePath = path.join(backupDir, file)
        const stats = fs.statSync(filePath)

        return {
          filename: file,
          path: filePath,
          size: stats.size,
          createdAt: stats.birthtime,
        }
      })
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())

    return files
  } catch (error) {
    console.error("Erro ao listar backups:", error)
    return []
  }
}
