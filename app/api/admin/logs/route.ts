import { NextResponse } from "next/server"
import { getLogs } from "@/lib/logger"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = Number.parseInt(searchParams.get("limit") || "100")
    const skip = Number.parseInt(searchParams.get("skip") || "0")
    const action = searchParams.get("action")
    const collection = searchParams.get("collection")
    const userId = searchParams.get("userId")

    const filter: any = {}

    if (action) filter.action = action
    if (collection) filter.collection = collection
    if (userId) filter.userId = userId

    const logs = await getLogs(filter, limit, skip)

    return NextResponse.json(logs)
  } catch (error) {
    console.error("Erro ao buscar logs:", error)
    return NextResponse.json({ error: "Erro ao buscar logs" }, { status: 500 })
  }
}
