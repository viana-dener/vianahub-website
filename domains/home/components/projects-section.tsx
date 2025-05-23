"use client"

import { motion } from "framer-motion"
import { SectionHeading } from "@/domains/shared/components/ui/section-heading"
import { Card, CardContent } from "@/components/ui/card"
import { useState, useEffect } from "react"

interface Project {
  id: number
  title: {
    pt: string
    en: string
  }
  description: {
    pt: string
    en: string
  }
  image: string
  active: boolean
  order: number
}

export function ProjectsSection() {
  const [mounted, setMounted] = useState(false)
  const [language, setLanguage] = useState<"pt" | "en">("pt")
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Buscar projetos do banco de dados
  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch("/api/projects")

        if (!response.ok) {
          throw new Error("Falha ao buscar projetos")
        }

        const data = await response.json()
        setProjects(data)
        setIsLoading(false)
      } catch (err) {
        console.error("Erro ao buscar projetos:", err)
        setError("Não foi possível carregar os projetos. Por favor, tente novamente mais tarde.")
        setIsLoading(false)
      }
    }

    fetchProjects()
  }, [])

  // Handle mounting and language detection
  useEffect(() => {
    setMounted(true)

    // Try to get language from localStorage
    try {
      const savedLanguage = localStorage.getItem("vianahub-language") as "pt" | "en"
      if (savedLanguage && (savedLanguage === "pt" || savedLanguage === "en")) {
        setLanguage(savedLanguage)
      }
    } catch (error) {
      // Fallback to Portuguese if there's any error
      setLanguage("pt")
    }
  }, [])

  if (!mounted) {
    return null
  }

  // Renderizar estado de carregamento
  if (isLoading) {
    return (
      <section className="py-24">
        <div className="container">
          <SectionHeading
            title={language === "en" ? "Recent Projects" : "Projetos Recentes"}
            subtitle={language === "en" ? "Loading projects..." : "Carregando projetos..."}
          />
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
      </section>
    )
  }

  // Renderizar mensagem de erro
  if (error || projects.length === 0) {
    return (
      <section className="py-24">
        <div className="container">
          <SectionHeading
            title={language === "en" ? "Recent Projects" : "Projetos Recentes"}
            subtitle={
              error ||
              (language === "en" ? "No projects available at the moment." : "Não há projetos disponíveis no momento.")
            }
          />
        </div>
      </section>
    )
  }

  return (
    <section className="py-24">
      <div className="container">
        <SectionHeading
          title={language === "en" ? "Recent Projects" : "Projetos Recentes"}
          subtitle={
            language === "en"
              ? "Take a look at some of our successful implementations"
              : "Conheça algumas das nossas implementações bem-sucedidas"
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow duration-300">
                <div className="aspect-video relative bg-white">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title[language]}
                    className="object-contain w-full h-full p-4"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">{project.title[language]}</h3>
                  <p className="text-muted-foreground">{project.description[language]}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
