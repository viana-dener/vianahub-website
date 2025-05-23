"use client"

import { useState, useEffect } from "react"
import { Code, Database, Server, Headphones } from "lucide-react"
import { SectionHeading } from "@/domains/shared/components/ui/section-heading"
import { AnimatedCard } from "@/domains/shared/components/ui/animated-card"
import { useLanguage } from "@/domains/shared/contexts/language-context"

interface Service {
  id: number
  title: {
    pt: string
    en: string
  }
  description: {
    pt: string
    en: string
  }
  icon: string
  active: boolean
  order: number
}

export function ServicesSection() {
  const { t, language } = useLanguage()
  const [services, setServices] = useState<Service[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Buscar serviços do banco de dados
  useEffect(() => {
    async function fetchServices() {
      try {
        const response = await fetch("/api/services")

        if (!response.ok) {
          throw new Error("Falha ao buscar serviços")
        }

        const data = await response.json()
        setServices(data)
        setIsLoading(false)
      } catch (err) {
        console.error("Erro ao buscar serviços:", err)
        setError("Não foi possível carregar os serviços. Por favor, tente novamente mais tarde.")
        setIsLoading(false)
      }
    }

    fetchServices()
  }, [])

  // Função para renderizar o ícone correto
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case "Code":
        return <Code className="h-10 w-10" />
      case "Database":
        return <Database className="h-10 w-10" />
      case "Server":
        return <Server className="h-10 w-10" />
      case "Headphones":
        return <Headphones className="h-10 w-10" />
      default:
        return <Code className="h-10 w-10" />
    }
  }

  // Renderizar estado de carregamento
  if (isLoading) {
    return (
      <section id="services" className="py-24 bg-muted/30">
        <div className="container">
          <SectionHeading title={t("services.title")} subtitle={t("services.subtitle")} />
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
      </section>
    )
  }

  // Renderizar mensagem de erro
  if (error || services.length === 0) {
    return (
      <section id="services" className="py-24 bg-muted/30">
        <div className="container">
          <SectionHeading
            title={t("services.title")}
            subtitle={
              error ||
              (language === "pt" ? "Não há serviços disponíveis no momento." : "No services available at the moment.")
            }
          />
        </div>
      </section>
    )
  }

  return (
    <section id="services" className="py-24 bg-muted/30">
      <div className="container">
        <SectionHeading title={t("services.title")} subtitle={t("services.subtitle")} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <AnimatedCard
              key={service.id}
              title={service.title[language as keyof typeof service.title]}
              description={service.description[language as keyof typeof service.description]}
              icon={renderIcon(service.icon)}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
