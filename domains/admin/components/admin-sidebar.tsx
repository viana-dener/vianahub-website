"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Users, FileText, Settings, MessageSquare, MessageCircle, LogOut, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useAdminAuth } from "@/domains/admin/contexts/admin-auth-context"
import { useState } from "react"

interface SidebarItem {
  title: string
  href: string
  icon: React.ReactNode
}

export function AdminSidebar() {
  const { logout, user } = useAdminAuth()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const sidebarItems: SidebarItem[] = [
    {
      title: "Dashboard",
      href: "/admin",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      title: "Usuários",
      href: "/admin/users",
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: "Mensagens",
      href: "/admin/messages",
      icon: <MessageSquare className="h-5 w-5" />,
    },
    {
      title: "Conteúdo",
      href: "/admin/content",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      title: "Chatbot",
      href: "/admin/chatbot",
      icon: <MessageCircle className="h-5 w-5" />,
    },
    {
      title: "Configurações",
      href: "/admin/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ]

  if (!user) return null

  return (
    <>
      {/* Mobile toggle */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-card border-r transform transition-transform duration-200 ease-in-out md:relative md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 border-b">
            <Link href="/admin" className="flex items-center space-x-2">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/VianaHub-Circle256v3-7CB3K8u7IkbBXODqsDPFrRU6k3irmM.png"
                alt="VianaHub Logo"
                className="h-8 w-auto"
              />
              <span className="text-xl font-bold">Admin</span>
            </Link>
          </div>

          <nav className="flex-1 p-4 space-y-1 overflow-auto">
            {sidebarItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center space-x-2 px-3 py-2 rounded-md transition-colors",
                  pathname === item.href ? "bg-primary text-primary-foreground" : "hover:bg-muted",
                )}
                onClick={() => setIsOpen(false)}
              >
                {item.icon}
                <span>{item.title}</span>
              </Link>
            ))}
          </nav>

          <div className="p-4 border-t">
            <Button
              variant="ghost"
              className="w-full justify-start text-muted-foreground hover:text-foreground"
              onClick={logout}
            >
              <LogOut className="h-5 w-5 mr-2" />
              <span>Sair</span>
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
