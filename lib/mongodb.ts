import { MongoClient, type Db } from "mongodb"

const uri = process.env.MONGODB_URI || "mongodb://admin:admin123@localhost:27017/"
const dbName = process.env.MONGODB_DB || "vianahub"

let cachedClient: MongoClient | null = null
let cachedDb: Db | null = null

export async function connectToDatabase(): Promise<{ client: MongoClient; db: Db }> {
  // Se já temos uma conexão, retorne-a
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb }
  }

  // Se não temos uma conexão, crie uma nova
  const client = new MongoClient(uri)
  await client.connect()
  const db = client.db(dbName)

  // Armazene a conexão em cache
  cachedClient = client
  cachedDb = db

  return { client, db }
}
