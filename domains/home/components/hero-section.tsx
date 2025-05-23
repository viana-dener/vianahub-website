"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useLanguage } from "@/domains/shared/contexts/language-context"
import { useEffect, useRef } from "react"

export function HeroSection() {
  const { language, t } = useLanguage()
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    // Garantir que o vídeo seja reproduzido automaticamente
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.error("Erro ao reproduzir vídeo automaticamente:", error)
      })
    }
  }, [])

  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Vídeo de fundo */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          src="/videos/home.mp4"
        >
          <source src="/videos/home.mp4" type="video/mp4" />
          Seu navegador não suporta vídeos HTML5.
        </video>
        {/* Overlay para melhorar a legibilidade do texto */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="container relative z-10 py-20">
        <div className="grid grid-cols-1 gap-12 items-center max-w-3xl mx-auto">
          <div className="space-y-8 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white drop-shadow-md">
                {language === "pt" ? (
                  <>
                    Soluções <span className="text-primary">Inovadoras</span> em Sistemas e Engenharia
                  </>
                ) : (
                  <>
                    <span className="text-primary">Innovative</span> Solutions in Systems and Engineering
                  </>
                )}
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-white drop-shadow-md"
            >
              {t("home.hero.subtitle")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button size="lg" className="group bg-primary hover:bg-primary/90 text-white" asChild>
                <Link href={language === "en" ? "/services" : "/servicos"}>
                  {t("home.hero.cta")}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10" asChild>
                <Link href={language === "en" ? "/contact" : "/contacto"}>{t("home.hero.secondary")}</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
