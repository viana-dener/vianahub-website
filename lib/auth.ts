import { type NextRequest, NextResponse } from "next/server"
import { jwtVerify } from "jose"

// Chave secreta para assinar os tokens JWT
const JWT_SECRET = process.env.JWT_SECRET || "seu-segredo-super-secreto"

// Função para verificar o token JWT
export async function verifyJWT(token: string) {
  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(JWT_SECRET))
    return payload
  } catch (error) {
    return null
  }
}

// Middleware para proteger rotas de API
export async function authMiddleware(request: NextRequest) {
  // Verificar se é uma requisição de leitura (GET)
  if (request.method === "GET") {
    return NextResponse.next()
  }

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

  // Verificar se o usuário tem permissão de administrador
  if (payload.role !== "admin") {
    return NextResponse.json({ error: "Permissão negada" }, { status: 403 })
  }

  return NextResponse.next()
}
