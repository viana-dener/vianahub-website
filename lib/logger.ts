import { connectToDatabase } from "./mongodb"

export enum LogAction {
  CREATE = "create",
  UPDATE = "update",
  DELETE = "delete",
  LOGIN = "login",
  LOGOUT = "logout",
}

export interface LogEntry {
  action: LogAction
  collection: string
  documentId?: string | number
  userId: string
  userName: string
  timestamp: Date
  details?: any
  ipAddress?: string
}

export async function logAction(entry: Omit<LogEntry, "timestamp">) {
  try {
    const { db } = await connectToDatabase()

    const logEntry: LogEntry = {
      ...entry,
      timestamp: new Date(),
    }

    await db.collection("logs").insertOne(logEntry)

    console.log(
      `Log registrado: ${entry.action} em ${entry.collection}${entry.documentId ? ` (ID: ${entry.documentId})` : ""} por ${entry.userName}`,
    )

    return true
  } catch (error) {
    console.error("Erro ao registrar log:", error)
    return false
  }
}

export async function getLogs(filter: Partial<LogEntry> = {}, limit = 100, skip = 0) {
  try {
    const { db } = await connectToDatabase()

    const logs = await db.collection("logs").find(filter).sort({ timestamp: -1 }).skip(skip).limit(limit).toArray()

    return logs
  } catch (error) {
    console.error("Erro ao buscar logs:", error)
    return []
  }
}
