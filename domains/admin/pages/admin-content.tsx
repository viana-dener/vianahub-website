"use client"

import { ContentManager } from "@/domains/admin/components/content-manager"

export function AdminContent() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Gerenciador de Conteúdo</h1>
        <p className="text-muted-foreground">Gerencie o conteúdo dinâmico do seu site</p>
      </div>

      <ContentManager />
    </div>
  )
}
