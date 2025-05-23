import type React from "react"
import { AdminSidebar } from "@/domains/admin/components/admin-sidebar"
import { AdminHeader } from "@/domains/admin/components/admin-header"
import { AdminAuthProvider } from "@/domains/admin/contexts/admin-auth-context"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminAuthProvider>
      <div className="min-h-screen flex flex-col md:flex-row bg-muted/30">
        <AdminSidebar />
        <div className="flex-1 flex flex-col">
          <AdminHeader />
          <main className="flex-1 p-6 overflow-auto">{children}</main>
        </div>
      </div>
    </AdminAuthProvider>
  )
}
