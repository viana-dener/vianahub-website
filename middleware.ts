import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { authMiddleware } from "./lib/auth"

export async function middleware(request: NextRequest) {
  // Verificar se a rota é uma rota de API protegida
  if (request.nextUrl.pathname.startsWith("/api/") && !request.nextUrl.pathname.startsWith("/api/auth/")) {
    return authMiddleware(request)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/api/:path*"],
}
