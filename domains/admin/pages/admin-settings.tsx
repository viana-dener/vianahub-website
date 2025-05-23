"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Globe, Mail, MessageCircle, Shield, Smartphone, Save, RefreshCw } from "lucide-react"

export function AdminSettings() {
  const [isSaving, setIsSaving] = useState(false)

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
        <h1 className="text-3xl font-bold tracking-tight">Configurações</h1>
        <p className="text-muted-foreground">Gerencie as configurações do seu site e sistema administrativo</p>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general" className="flex items-center">
            <Globe className="h-4 w-4 mr-2" />
            Geral
          </TabsTrigger>
          <TabsTrigger value="email" className="flex items-center">
            <Mail className="h-4 w-4 mr-2" />
            Email
          </TabsTrigger>
          <TabsTrigger value="chatbot" className="flex items-center">
            <MessageCircle className="h-4 w-4 mr-2" />
            Chatbot
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center">
            <Shield className="h-4 w-4 mr-2" />
            Segurança
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center">
            <Smartphone className="h-4 w-4 mr-2" />
            Aparência
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Configurações Gerais</CardTitle>
              <CardDescription>Configure as informações básicas do seu site</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="site-name">Nome do Site</Label>
                <Input id="site-name" defaultValue="VianaHub" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="site-description">Descrição do Site</Label>
                <Textarea
                  id="site-description"
                  defaultValue="VianaHub - Soluções inovadoras em sistemas e engenharia"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contact-email">Email de Contato</Label>
                  <Input id="contact-email" type="email" defaultValue="info@vianahub.pt" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-phone">Telefone de Contato</Label>
                  <Input id="contact-phone" defaultValue="+351 123 456 789" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Endereço</Label>
                <Textarea
                  id="address"
                  defaultValue="Rua da Bandeira 123, 4900-001 Viana do Castelo, Portugal"
                  rows={2}
                />
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="maintenance-mode">Modo de Manutenção</Label>
                  <Switch id="maintenance-mode" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Quando ativado, o site exibirá uma página de manutenção para os visitantes
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
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
                    Salvar Alterações
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="email">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Email</CardTitle>
              <CardDescription>Configure as opções de envio de email do sistema</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="smtp-host">Servidor SMTP</Label>
                <Input id="smtp-host" defaultValue="smtp.vianahub.pt" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="smtp-port">Porta SMTP</Label>
                  <Input id="smtp-port" defaultValue="587" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtp-security">Segurança</Label>
                  <Select defaultValue="tls">
                    <SelectTrigger id="smtp-security">
                      <SelectValue placeholder="Selecione uma opção" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Nenhuma</SelectItem>
                      <SelectItem value="ssl">SSL</SelectItem>
                      <SelectItem value="tls">TLS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="smtp-username">Usuário SMTP</Label>
                  <Input id="smtp-username" defaultValue="no-reply@vianahub.pt" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtp-password">Senha SMTP</Label>
                  <Input id="smtp-password" type="password" defaultValue="********" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="from-email">Email de Origem</Label>
                <Input id="from-email" defaultValue="no-reply@vianahub.pt" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="from-name">Nome de Origem</Label>
                <Input id="from-name" defaultValue="VianaHub" />
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-notifications">Notificações por Email</Label>
                  <Switch id="email-notifications" defaultChecked />
                </div>
                <p className="text-sm text-muted-foreground">
                  Receba notificações por email quando novas mensagens forem enviadas
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
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
                    Salvar Alterações
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="chatbot">
          <Card>
            <CardHeader>
              <CardTitle>Configurações do Chatbot</CardTitle>
              <CardDescription>Configure as opções do chatbot do seu site</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="chatbot-enabled">Ativar Chatbot</Label>
                  <Switch id="chatbot-enabled" defaultChecked />
                </div>
                <p className="text-sm text-muted-foreground">Exibir o chatbot para os visitantes do site</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="chatbot-name">Nome do Chatbot</Label>
                <Input id="chatbot-name" defaultValue="VianaBot" />
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
                <Label htmlFor="offline-message">Mensagem Offline</Label>
                <Textarea
                  id="offline-message"
                  defaultValue="No momento não estamos online. Por favor, deixe uma mensagem e entraremos em contato em breve."
                  rows={3}
                />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="chatbot-model">Modelo de IA</Label>
                <Select defaultValue="gpt-4o">
                  <SelectTrigger id="chatbot-model">
                    <SelectValue placeholder="Selecione um modelo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gpt-4o">GPT-4o</SelectItem>
                    <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                    <SelectItem value="claude-3">Claude 3</SelectItem>
                  </SelectContent>
                </Select>
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
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
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
                    Salvar Alterações
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Segurança</CardTitle>
              <CardDescription>Configure as opções de segurança do sistema</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="two-factor">Autenticação de Dois Fatores</Label>
                  <Switch id="two-factor" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Exigir autenticação de dois fatores para todos os usuários administrativos
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password-policy">Política de Senhas</Label>
                <Select defaultValue="strong">
                  <SelectTrigger id="password-policy">
                    <SelectValue placeholder="Selecione uma política" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">Básica (mínimo 8 caracteres)</SelectItem>
                    <SelectItem value="medium">Média (letras e números)</SelectItem>
                    <SelectItem value="strong">Forte (letras, números e símbolos)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="session-timeout">Tempo Limite da Sessão (minutos)</Label>
                <Input id="session-timeout" type="number" defaultValue="30" />
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="captcha">CAPTCHA no Formulário de Contato</Label>
                  <Switch id="captcha" defaultChecked />
                </div>
                <p className="text-sm text-muted-foreground">
                  Adicionar CAPTCHA ao formulário de contato para prevenir spam
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="ip-blocking">Bloqueio de IP</Label>
                  <Switch id="ip-blocking" defaultChecked />
                </div>
                <p className="text-sm text-muted-foreground">
                  Bloquear IPs após múltiplas tentativas de login malsucedidas
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
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
                    Salvar Alterações
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Aparência</CardTitle>
              <CardDescription>Personalize a aparência do seu site</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="primary-color">Cor Primária</Label>
                <div className="flex items-center gap-2">
                  <Input id="primary-color" defaultValue="#F97316" />
                  <div className="w-10 h-10 rounded-md bg-primary" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="default-theme">Tema Padrão</Label>
                <Select defaultValue="light">
                  <SelectTrigger id="default-theme">
                    <SelectValue placeholder="Selecione um tema" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Claro</SelectItem>
                    <SelectItem value="dark">Escuro</SelectItem>
                    <SelectItem value="system">Sistema</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="theme-toggle">Alternador de Tema</Label>
                  <Switch id="theme-toggle" defaultChecked />
                </div>
                <p className="text-sm text-muted-foreground">
                  Permitir que os usuários alternem entre temas claro e escuro
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="font-family">Família de Fontes</Label>
                <Select defaultValue="inter">
                  <SelectTrigger id="font-family">
                    <SelectValue placeholder="Selecione uma fonte" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="inter">Inter</SelectItem>
                    <SelectItem value="roboto">Roboto</SelectItem>
                    <SelectItem value="poppins">Poppins</SelectItem>
                    <SelectItem value="montserrat">Montserrat</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="animations">Animações</Label>
                  <Switch id="animations" defaultChecked />
                </div>
                <p className="text-sm text-muted-foreground">Ativar animações e transições no site</p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
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
                    Salvar Alterações
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
