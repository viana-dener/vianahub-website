"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import type React from "react"
import { useToast } from "@/hooks/use-toast"

interface AdminUser {
  id: string
  name: string
  email: string
  role: "admin" | "editor"
  avatar?: string
}

interface AdminAuthContextType {
  user: AdminUser | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  token: string | null
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined)

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()
  const { toast } = useToast()

  // Verificar autenticação ao carregar
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Verificar se há um token no localStorage
        const storedToken = localStorage.getItem("admin-token")
        const storedUser = localStorage.getItem("admin-user")

        if (storedToken && storedUser) {
          setToken(storedToken)
          setUser(JSON.parse(storedUser))
        } else if (pathname !== "/admin/login") {
          router.push("/admin/login")
        }
      } catch (error) {
        console.error("Erro ao verificar autenticação:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [pathname, router])

  // Função de login
  const login = async (email: string, password: string) => {
    setIsLoading(true)

    try {
      // Fazer requisição para a API de login
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Credenciais inválidas")
      }

      const data = await response.json()

      setUser(data.user)
      setToken(data.token)
      localStorage.setItem("admin-user", JSON.stringify(data.user))
      localStorage.setItem("admin-token", data.token)

      toast({
        title: "Login realizado com sucesso",
        description: `Bem-vindo(a), ${data.user.name}!`,
      })

      router.push("/admin")
    } catch (error) {
      console.error("Erro ao fazer login:", error)

      toast({
        title: "Erro ao fazer login",
        description: error instanceof Error ? error.message : "Credenciais inválidas",
        variant: "destructive",
      })

      throw error
    } finally {
      setIsLoading(false)
    }
  }

  // Função de logout
  const logout = async () => {
    try {
      // Opcional: Registrar logout na API
      if (token) {
        await fetch("/api/auth/logout", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).catch((err) => console.error("Erro ao registrar logout:", err))
      }
    } finally {
      setUser(null)
      setToken(null)
      localStorage.removeItem("admin-user")
      localStorage.removeItem("admin-token")

      toast({
        title: "Logout realizado com sucesso",
        description: "Você foi desconectado do sistema.",
      })

      router.push("/admin/login")
    }
  }

  return (
    <AdminAuthContext.Provider value={{ user, isLoading, login, logout, token }}>{children}</AdminAuthContext.Provider>
  )
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext)
  if (context === undefined) {
    throw new Error("useAdminAuth deve ser usado dentro de um AdminAuthProvider")
  }
  return context
}
