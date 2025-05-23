"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MoreHorizontal, Search, Eye, Trash, Mail, MessageCircle, CheckCircle, Clock } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface MessageData {
  id: string
  name: string
  email: string
  subject: string
  message: string
  date: string
  status: "read" | "unread" | "replied"
  type: "contact" | "chat"
}

export function AdminMessages() {
  const [searchTerm, setSearchTerm] = useState("")

  // Dados de exemplo
  const messages: MessageData[] = [
    {
      id: "1",
      name: "João Silva",
      email: "joao@exemplo.com",
      subject: "Orçamento para projeto",
      message: "Olá, gostaria de solicitar um orçamento para desenvolvimento de um sistema de gestão...",
      date: "Hoje, 10:30",
      status: "unread",
      type: "contact",
    },
    {
      id: "2",
      name: "Maria Costa",
      email: "maria@exemplo.com",
      subject: "Dúvida sobre serviços",
      message: "Bom dia, gostaria de saber mais detalhes sobre os serviços de consultoria em TI...",
      date: "Ontem, 15:45",
      status: "read",
      type: "contact",
    },
    {
      id: "3",
      name: "Pedro Santos",
      email: "pedro@exemplo.com",
      subject: "Suporte técnico",
      message: "Estou enfrentando problemas com o sistema que vocês desenvolveram...",
      date: "22/05/2023, 09:15",
      status: "replied",
      type: "contact",
    },
    {
      id: "4",
      name: "Ana Oliveira",
      email: "ana@exemplo.com",
      subject: "Conversa de chat",
      message: "Olá, gostaria de saber mais sobre os serviços de desenvolvimento web...",
      date: "Hoje, 11:20",
      status: "unread",
      type: "chat",
    },
    {
      id: "5",
      name: "Carlos Mendes",
      email: "carlos@exemplo.com",
      subject: "Conversa de chat",
      message: "Preciso de ajuda com um problema no meu site...",
      date: "Ontem, 14:30",
      status: "replied",
      type: "chat",
    },
  ]

  const filteredMessages = (type: string) => {
    return messages
      .filter((message) => message.type === type)
      .filter(
        (message) =>
          message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          message.subject.toLowerCase().includes(searchTerm.toLowerCase()),
      )
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "read":
        return <Eye className="h-4 w-4 text-blue-500" />
      case "unread":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "replied":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "read":
        return (
          <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20">
            lida
          </Badge>
        )
      case "unread":
        return (
          <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
            não lida
          </Badge>
        )
      case "replied":
        return (
          <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
            respondida
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Mensagens</h1>
        <p className="text-muted-foreground">Gerencie as mensagens recebidas pelo formulário de contato e chatbot</p>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar mensagens..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="contact" className="space-y-4">
        <TabsList>
          <TabsTrigger value="contact" className="flex items-center">
            <Mail className="h-4 w-4 mr-2" />
            Formulário de Contato
          </TabsTrigger>
          <TabsTrigger value="chat" className="flex items-center">
            <MessageCircle className="h-4 w-4 mr-2" />
            Conversas de Chat
          </TabsTrigger>
        </TabsList>

        <TabsContent value="contact">
          <Card>
            <CardHeader>
              <CardTitle>Mensagens do Formulário de Contato</CardTitle>
              <CardDescription>Gerencie as mensagens recebidas através do formulário de contato</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Remetente</TableHead>
                      <TableHead>Assunto</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredMessages("contact").length > 0 ? (
                      filteredMessages("contact").map((message) => (
                        <TableRow key={message.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{message.name}</p>
                              <p className="text-sm text-muted-foreground">{message.email}</p>
                            </div>
                          </TableCell>
                          <TableCell>{message.subject}</TableCell>
                          <TableCell>{message.date}</TableCell>
                          <TableCell>{getStatusBadge(message.status)}</TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Abrir menu</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Ações</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                  <Eye className="h-4 w-4 mr-2" />
                                  Ver detalhes
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                  Marcar como respondida
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Trash className="h-4 w-4 mr-2" />
                                  Excluir
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                          Nenhuma mensagem encontrada
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="chat">
          <Card>
            <CardHeader>
              <CardTitle>Conversas de Chat</CardTitle>
              <CardDescription>Gerencie as conversas iniciadas através do chatbot</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Usuário</TableHead>
                      <TableHead>Última mensagem</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredMessages("chat").length > 0 ? (
                      filteredMessages("chat").map((message) => (
                        <TableRow key={message.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{message.name}</p>
                              <p className="text-sm text-muted-foreground">{message.email}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <p className="truncate max-w-[300px]">{message.message}</p>
                          </TableCell>
                          <TableCell>{message.date}</TableCell>
                          <TableCell>{getStatusBadge(message.status)}</TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Abrir menu</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Ações</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                  <Eye className="h-4 w-4 mr-2" />
                                  Ver conversa
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <MessageCircle className="h-4 w-4 mr-2" />
                                  Continuar conversa
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Trash className="h-4 w-4 mr-2" />
                                  Excluir
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                          Nenhuma conversa de chat encontrada
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
