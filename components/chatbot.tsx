"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Loader2, MessageSquare, Send, X, User, Bot } from "lucide-react"
import { useChat } from "ai/react"
import { useLanguage } from "@/domains/shared/contexts/language-context"

interface Message {
  id: string
  role: "user" | "assistant" | "system"
  content: string
  createdAt?: Date
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { language } = useLanguage()

  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({
    api: "/api/chat",
    initialMessages: [
      {
        id: "welcome-message",
        role: "assistant",
        content:
          language === "pt"
            ? "Olá! Sou o assistente virtual da VianaHub. Como posso ajudar você hoje?"
            : "Hello! I'm VianaHub's virtual assistant. How can I help you today?",
      },
    ],
  })

  // Evitar hidratação
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Rolar para a mensagem mais recente
  useEffect(() => {
    if (messagesEndRef.current && isOpen) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages, isOpen])

  if (!isMounted) return null

  const toggleChat = () => {
    setIsOpen(!isOpen)
  }

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (input.trim()) {
      handleSubmit(e)
    }
  }

  return (
    <>
      {/* Botão do chat */}
      <Button onClick={toggleChat} className="fixed bottom-4 right-4 rounded-full w-14 h-14 shadow-lg z-50" size="icon">
        {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
      </Button>

      {/* Janela do chat */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 right-4 w-[350px] h-[500px] bg-card border rounded-lg shadow-xl flex flex-col z-50 overflow-hidden"
          >
            {/* Cabeçalho */}
            <div className="bg-primary text-primary-foreground p-3 flex items-center">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="VianaBot" />
                <AvatarFallback>
                  <Bot className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="font-medium">VianaBot</h3>
                <p className="text-xs opacity-80">{language === "pt" ? "Assistente Virtual" : "Virtual Assistant"}</p>
              </div>
              <Button variant="ghost" size="icon" onClick={toggleChat} className="text-primary-foreground">
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Mensagens */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`flex max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                    <div className="flex-shrink-0 mr-2">
                      <Avatar className="h-8 w-8">
                        {message.role === "user" ? (
                          <>
                            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                            <AvatarFallback>
                              <User className="h-4 w-4" />
                            </AvatarFallback>
                          </>
                        ) : (
                          <>
                            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="VianaBot" />
                            <AvatarFallback>
                              <Bot className="h-4 w-4" />
                            </AvatarFallback>
                          </>
                        )}
                      </Avatar>
                    </div>
                    <div
                      className={`rounded-lg p-3 ${
                        message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    </div>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex max-w-[80%]">
                    <div className="flex-shrink-0 mr-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder.svg?height=32&width=32" alt="VianaBot" />
                        <AvatarFallback>
                          <Bot className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="rounded-lg p-3 bg-muted">
                      <Loader2 className="h-4 w-4 animate-spin" />
                    </div>
                  </div>
                </div>
              )}

              {error && (
                <div className="p-3 text-sm text-red-500 bg-red-100 rounded-lg">
                  {language === "pt"
                    ? "Ocorreu um erro. Por favor, tente novamente."
                    : "An error occurred. Please try again."}
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Formulário de entrada */}
            <form onSubmit={handleFormSubmit} className="p-3 border-t flex">
              <Input
                value={input}
                onChange={handleInputChange}
                placeholder={language === "pt" ? "Digite sua mensagem..." : "Type your message..."}
                className="mr-2"
                disabled={isLoading}
              />
              <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
