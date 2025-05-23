"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { MessageSquare, Plus, Trash, Save, RefreshCw, Edit, Database, Bot, Settings } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Separator } from "@/components/ui/separator"

interface TrainingData {
  id: string
  question: string
  answer: string
}

export function AdminChatbot() {
  const [isSaving, setIsSaving] = useState(false)
  const [trainingData, setTrainingData] = useState<TrainingData[]>([
    {
      id: "1",
      question: "Quais são os serviços oferecidos pela VianaHub?",
      answer:
        "A VianaHub oferece serviços de desenvolvimento de software, consultoria em TI, engenharia de sistemas e suporte técnico. Nosso objetivo é fornecer soluções tecnológicas inovadoras que impulsionem o sucesso dos nossos clientes.",
    },
    {
      id: "2",
      question: "Onde a VianaHub está localizada?",
      answer:
        "A VianaHub está localizada em Viana do Castelo, Portugal. Nossa sede fica na Rua da Bandeira 123, 4900-001 Viana do Castelo.",
    },
    {
      id: "3",
      question: "Como posso solicitar um orçamento?",
      answer:
        "Você pode solicitar um orçamento através do nosso formulário de contato no site, enviando um email para info@vianahub.pt ou ligando para +351 123 456 789. Teremos prazer em discutir seu projeto e fornecer um orçamento personalizado.",
    },
  ])

  const handleSave = () => {
    setIsSaving(true)
    // Simular salvamento
    setTimeout(() => {
      setIsSaving(false)
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Configuração do Chatbot</h1>
        <p className="text-muted-foreground">Configure e treine o chatbot do seu site</p>
      </div>

      <Tabs defaultValue="training" className="space-y-4">
        <TabsList>
          <TabsTrigger value="training" className="flex items-center">
            <Database className="h-4 w-4 mr-2" />
            Base de Conhecimento
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center">
            <Settings className="h-4 w-4 mr-2" />
            Configurações
          </TabsTrigger>
          <TabsTrigger value="preview" className="flex items-center">
            <Bot className="h-4 w-4 mr-2" />
            Visualização
          </TabsTrigger>
        </TabsList>

        <TabsContent value="training">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle>Base de Conhecimento</CardTitle>
                <CardDescription>Adicione perguntas e respostas para treinar o chatbot</CardDescription>
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Nova Entrada
              </Button>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[40%]">Pergunta</TableHead>
                      <TableHead className="w-[50%]">Resposta</TableHead>
                      <TableHead className="w-[10%]">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {trainingData.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="align-top">
                          <div className="font-medium">{item.question}</div>
                        </TableCell>
                        <TableCell className="align-top">
                          <div className="text-sm">{item.answer}</div>
                        </TableCell>
                        <TableCell className="align-top">
                          <div className="flex space-x-1">
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Editar</span>
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Trash className="h-4 w-4" />
                              <span className="sr-only">Excluir</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="mt-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="new-question">Nova Pergunta</Label>
                  <Input id="new-question" placeholder="Digite uma pergunta frequente..." />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="new-answer">Resposta</Label>
                  <Textarea id="new-answer" placeholder="Digite a resposta para a pergunta..." rows={4} />
                </div>

                <div className="flex justify-end">
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar à Base de Conhecimento
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Configurações do Chatbot</CardTitle>
              <CardDescription>Personalize o comportamento e aparência do chatbot</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="bot-name">Nome do Chatbot</Label>
                <Input id="bot-name" defaultValue="VianaBot" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="welcome-message">Mensagem de Boas-vindas</Label>
                <Textarea
                  id="welcome-message"
                  defaultValue="Olá! Sou o assistente virtual da VianaHub. Como posso ajudar você hoje?"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fallback-message">Mensagem de Fallback</Label>
                <Textarea
                  id="fallback-message"
                  defaultValue="Desculpe, não entendi sua pergunta. Poderia reformulá-la ou perguntar algo diferente?"
                  rows={3}
                />
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="chatbot-active">Ativar Chatbot</Label>
                  <Switch id="chatbot-active" defaultChecked />
                </div>
                <p className="text-sm text-muted-foreground">Exibir o chatbot para os visitantes do site</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="auto-open">Abrir Automaticamente</Label>
                  <Switch id="auto-open" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Abrir o chatbot automaticamente após 30 segundos na página
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="human-handoff">Transferência para Humano</Label>
                  <Switch id="human-handoff" defaultChecked />
                </div>
                <p className="text-sm text-muted-foreground">
                  Permitir que o chatbot transfira a conversa para um atendente humano quando necessário
                </p>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline">Cancelar</Button>
                <Button onClick={handleSave} disabled={isSaving}>
                  {isSaving ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Salvando...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Salvar Configurações
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preview">
          <Card>
            <CardHeader>
              <CardTitle>Visualização do Chatbot</CardTitle>
              <CardDescription>Veja como o chatbot aparecerá para os visitantes do site</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg p-4 h-[500px] flex flex-col">
                <div className="bg-primary text-primary-foreground p-3 rounded-t-lg flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2" />
                  <span className="font-medium">VianaBot</span>
                </div>

                <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-muted/30">
                  <div className="flex flex-col max-w-[80%]">
                    <div className="bg-primary/10 rounded-lg p-3 inline-block">
                      <p className="text-sm">Olá! Sou o assistente virtual da VianaHub. Como posso ajudar você hoje?</p>
                    </div>
                    <span className="text-xs text-muted-foreground mt-1">VianaBot, 10:30</span>
                  </div>

                  <div className="flex flex-col items-end max-w-[80%] ml-auto">
                    <div className="bg-primary text-primary-foreground rounded-lg p-3 inline-block">
                      <p className="text-sm">Quais serviços vocês oferecem?</p>
                    </div>
                    <span className="text-xs text-muted-foreground mt-1">Você, 10:31</span>
                  </div>

                  <div className="flex flex-col max-w-[80%]">
                    <div className="bg-primary/10 rounded-lg p-3 inline-block">
                      <p className="text-sm">
                        A VianaHub oferece serviços de desenvolvimento de software, consultoria em TI, engenharia de
                        sistemas e suporte técnico. Nosso objetivo é fornecer soluções tecnológicas inovadoras que
                        impulsionem o sucesso dos nossos clientes.
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground mt-1">VianaBot, 10:31</span>
                  </div>
                </div>

                <div className="p-3 border-t flex">
                  <Input placeholder="Digite sua mensagem..." className="mr-2" />
                  <Button size="sm">Enviar</Button>
                </div>
              </div>

              <div className="mt-4 flex justify-center">
                <p className="text-sm text-muted-foreground">
                  Esta é uma visualização do chatbot. As interações aqui não são reais.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
