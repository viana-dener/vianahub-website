"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAdminAuth } from "@/domains/admin/contexts/admin-auth-context"
import { Users, MessageSquare, Eye, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function AdminDashboard() {
  const { user } = useAdminAuth()

  if (!user) return null

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Bem-vindo(a) de volta, {user.name}! Aqui está um resumo do seu site.</p>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="analytics">Análises</TabsTrigger>
          <TabsTrigger value="reports">Relatórios</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Visitantes</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,324</div>
                <p className="text-xs text-muted-foreground">+12.5% em relação ao mês passado</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Usuários</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">+2 novos usuários esta semana</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Mensagens</CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">3 novas mensagens hoje</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Conversas de Chat</CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">42</div>
                <p className="text-xs text-muted-foreground">+18% em relação à semana passada</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Atividade Recente</CardTitle>
                <CardDescription>Últimas ações realizadas no sistema</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-b pb-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Nova mensagem de contato</p>
                      <p className="text-sm text-muted-foreground">De: maria@exemplo.com</p>
                    </div>
                    <p className="text-sm text-muted-foreground">Há 10 minutos</p>
                  </div>
                </div>
                <div className="border-b pb-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Conteúdo atualizado</p>
                      <p className="text-sm text-muted-foreground">Página: Serviços</p>
                    </div>
                    <p className="text-sm text-muted-foreground">Há 2 horas</p>
                  </div>
                </div>
                <div className="border-b pb-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Novo usuário registrado</p>
                      <p className="text-sm text-muted-foreground">Usuário: joao@vianahub.pt</p>
                    </div>
                    <p className="text-sm text-muted-foreground">Há 1 dia</p>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Configurações atualizadas</p>
                      <p className="text-sm text-muted-foreground">Por: Administrador</p>
                    </div>
                    <p className="text-sm text-muted-foreground">Há 2 dias</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Ações Rápidas</CardTitle>
                <CardDescription>Acesse rapidamente as principais funcionalidades</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full justify-between" asChild>
                  <Link href="/admin/messages">
                    Ver mensagens
                    <ArrowUpRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
                <Button className="w-full justify-between" asChild>
                  <Link href="/admin/users">
                    Gerenciar usuários
                    <ArrowUpRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
                <Button className="w-full justify-between" asChild>
                  <Link href="/admin/content">
                    Editar conteúdo
                    <ArrowUpRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
                <Button className="w-full justify-between" asChild>
                  <Link href="/admin/chatbot">
                    Configurar chatbot
                    <ArrowUpRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Análises</CardTitle>
              <CardDescription>Visualize estatísticas detalhadas do seu site</CardDescription>
            </CardHeader>
            <CardContent className="h-96 flex items-center justify-center">
              <p className="text-muted-foreground">Gráficos de análise serão exibidos aqui</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Relatórios</CardTitle>
              <CardDescription>Acesse e exporte relatórios detalhados</CardDescription>
            </CardHeader>
            <CardContent className="h-96 flex items-center justify-center">
              <p className="text-muted-foreground">Relatórios serão exibidos aqui</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
