"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { CheckCircle } from "lucide-react"
import { SectionHeading } from "@/domains/shared/components/ui/section-heading"
import { useLanguage } from "@/domains/shared/contexts/language-context"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface AboutInfo {
  mission: {
    pt: string
    en: string
  }
  vision: {
    pt: string
    en: string
  }
  values: {
    pt: string[]
    en: string[]
  }
  active: boolean
}

export function AboutSection() {
  const { language, t } = useLanguage()
  const [aboutInfo, setAboutInfo] = useState<AboutInfo | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Buscar informações sobre a empresa do banco de dados
  useEffect(() => {
    async function fetchAboutInfo() {
      try {
        const response = await fetch("/api/about")

        if (!response.ok) {
          throw new Error("Falha ao buscar informações sobre a empresa")
        }

        const data = await response.json()
        setAboutInfo(data)
        setIsLoading(false)
      } catch (err) {
        console.error("Erro ao buscar informações sobre a empresa:", err)
        setError("Não foi possível carregar as informações sobre a empresa. Por favor, tente novamente mais tarde.")
        setIsLoading(false)
      }
    }

    fetchAboutInfo()
  }, [])

  // Valores padrão caso não consiga carregar do banco
  const defaultValues = [
    t("about.values.innovation"),
    t("about.values.quality"),
    t("about.values.integrity"),
    t("about.values.collaboration"),
  ]

  // Valores a serem exibidos (do banco ou padrão)
  const values = aboutInfo?.values[language as keyof typeof aboutInfo.values] || defaultValues

  return (
    <section id="about" className="py-24">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative aspect-square rounded-lg overflow-hidden shadow-xl">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/VianaHub-Circle256v3-7CB3K8u7IkbBXODqsDPFrRU6k3irmM.png"
                alt="VianaHub Logo"
                className="object-contain w-full h-full p-8"
              />
            </div>
          </motion.div>

          <div>
            <SectionHeading title={t("about.title")} subtitle={t("about.subtitle")} alignment="left" className="mb-8" />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-xl font-bold mb-2">{t("about.mission.title")}</h3>
                <p className="text-muted-foreground">
                  {isLoading
                    ? "Carregando..."
                    : aboutInfo?.mission[language as keyof typeof aboutInfo.mission] || t("about.mission.description")}
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-2">{t("about.vision.title")}</h3>
                <p className="text-muted-foreground">
                  {isLoading
                    ? "Carregando..."
                    : aboutInfo?.vision[language as keyof typeof aboutInfo.vision] || t("about.vision.description")}
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-2">{t("about.values.title")}</h3>
                <ul className="space-y-2">
                  {values.map((value, index) => (
                    <motion.li
                      key={value}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.1 * index }}
                      className="flex items-center gap-3"
                    >
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                      <span>{value}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="pt-4">
                <Button asChild>
                  <Link href={language === "en" ? "/about" : "/sobre"}>
                    {language === "en" ? "Learn More About Us" : "Saiba Mais Sobre Nós"}
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
