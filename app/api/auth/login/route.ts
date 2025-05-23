import { NextResponse } from "next/server";
import { SignJWT } from "jose";
import { connectToDatabase } from "@/lib/mongodb";
import { compare } from "bcryptjs";
import { logAction, LogAction } from "@/lib/logger";

// Chave secreta para assinar os tokens JWT
const JWT_SECRET = process.env.JWT_SECRET || "seu-segredo-super-secreto";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Validar dados
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email e senha são obrigatórios" },
        { status: 400 }
      );
    }

    // Conectar ao banco de dados
    const { db } = await connectToDatabase();

    // Buscar usuário pelo email
    const user = await db.collection("users").findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: "Credenciais inválidas" },
        { status: 401 }
      );
    }

    // Verificar senha
    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      return NextResponse.json(
        { error: "Credenciais inválidas" },
        { status: 401 }
      );
    }

    // Verificar se o usuário está ativo
    if (!user.active) {
      return NextResponse.json(
        { error: "Usuário desativado" },
        { status: 403 }
      );
    }

    // Gerar token JWT
    const token = await new SignJWT({
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      role: user.role,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("24h")
      .sign(new TextEncoder().encode(JWT_SECRET));

    // Registrar login no log
    await logAction({
      action: LogAction.LOGIN,
      collection: "users",
      documentId: user._id.toString(),
      userId: user._id.toString(),
      userName: user.name,
      details: { email: user.email },
    });

    return NextResponse.json({
      token,
      user: {
        id: user._id.toString(),
        email: user.email,
        name: user.name,
        role: user.role,
        avatar: user.avatar || "/placeholder.svg?height=40&width=40",
      },
    });
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    return NextResponse.json({ error: "Erro ao fazer login" }, { status: 500 });
  }
}
