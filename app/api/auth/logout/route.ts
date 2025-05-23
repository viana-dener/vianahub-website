import { NextResponse } from "next/server"
import { verifyJWT } from "@/lib/auth"
import { logAction, LogAction } from "@/lib/logger"

export async function POST(request: Request) {
  try {
    // Obter o token do cabeçalho Authorization
    const authHeader = request.headers.get("authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
    }

    const token = authHeader.split(" ")[1]
    const payload = await verifyJWT(token)

    if (!payload) {
      return NextResponse.json({ error: "Token inválido" }, { status: 401 })
    }

    // Registrar logout no log
    await logAction({
      action: LogAction.LOGOUT,
      collection: "users",
      documentId: payload.id as string,
      userId: payload.id as string,
      userName: payload.name as string,
      details: { email: payload.email },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Erro ao fazer logout:", error)
    return NextResponse.json({ error: "Erro ao fazer logout" }, { status: 500 })
  }
}
