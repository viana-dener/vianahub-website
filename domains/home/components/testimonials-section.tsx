"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react"
import { SectionHeading } from "@/domains/shared/components/ui/section-heading"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface Testimonial {
  id: number
  name: string
  position: string
  company: string
  image: string
  rating: number
  testimonial: {
    pt: string
    en: string
  }
  active: boolean
}

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0)
  const [autoplay, setAutoplay] = useState(true)
  const [mounted, setMounted] = useState(false)
  const [language, setLanguage] = useState<"pt" | "en">("pt")
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Buscar testemunhos do banco de dados
  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const response = await fetch("/api/testimonials")

        if (!response.ok) {
          throw new Error("Falha ao buscar testemunhos")
        }

        const data = await response.json()
        setTestimonials(data)
        setIsLoading(false)
      } catch (err) {
        console.error("Erro ao buscar testemunhos:", err)
        setError("Não foi possível carregar os testemunhos. Por favor, tente novamente mais tarde.")
        setIsLoading(false)
      }
    }

    fetchTestimonials()
  }, [])

  // Handle mounting and language detection
  useEffect(() => {
    setMounted(true)

    // Try to get language from context or localStorage
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

  useEffect(() => {
    if (!autoplay || !mounted || testimonials.length === 0) return

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length)
    }, 11000)

    return () => clearInterval(interval)
  }, [autoplay, mounted, testimonials.length])

  const next = () => {
    if (testimonials.length === 0) return
    setAutoplay(false)
    setCurrent((prev) => (prev + 1) % testimonials.length)
  }

  const prev = () => {
    if (testimonials.length === 0) return
    setAutoplay(false)
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const goToSlide = (index: number) => {
    if (testimonials.length === 0) return
    setAutoplay(false)
    setCurrent(index)
  }

  if (!mounted) {
    return null
  }

  // Renderizar estado de carregamento
  if (isLoading) {
    return (
      <section className="py-24 bg-gradient-to-br from-muted/30 to-muted/10 relative overflow-hidden">
        <div className="container relative">
          <SectionHeading
            title={language === "pt" ? "O que nossos clientes dizem" : "What our clients say"}
            subtitle={language === "pt" ? "Carregando testemunhos..." : "Loading testimonials..."}
          />
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
      </section>
    )
  }

  // Renderizar mensagem de erro
  if (error || testimonials.length === 0) {
    return (
      <section className="py-24 bg-gradient-to-br from-muted/30 to-muted/10 relative overflow-hidden">
        <div className="container relative">
          <SectionHeading
            title={language === "pt" ? "O que nossos clientes dizem" : "What our clients say"}
            subtitle={
              error ||
              (language === "pt"
                ? "Não há testemunhos disponíveis no momento."
                : "No testimonials available at the moment.")
            }
          />
        </div>
      </section>
    )
  }

  const currentTestimonial = testimonials[current]

  return (
    <section className="py-24 bg-gradient-to-br from-muted/30 to-muted/10 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] dark:opacity-[0.05]" />

      <div className="container relative">
        <SectionHeading
          title={language === "pt" ? "O que nossos clientes dizem" : "What our clients say"}
          subtitle={
            language === "pt"
              ? "Conheça as experiências de quem confia na VianaHub para transformar seus negócios"
              : "Discover the experiences of those who trust VianaHub to transform their businesses"
          }
        />

        <div className="relative max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="bg-card rounded-2xl p-8 md:p-12 shadow-xl relative overflow-hidden"
            >
              {/* Quote decoration */}
              <Quote className="absolute text-primary/10 h-32 w-32 -top-6 -left-6 rotate-180" />

              <div className="relative z-10">
                <div className="grid md:grid-cols-[auto_1fr] gap-8 items-center">
                  {/* Profile section */}
                  <div className="flex flex-col items-center text-center md:items-start md:text-left">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="relative mb-4"
                    >
                      <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-primary/20 shadow-lg">
                        <img
                          src={currentTestimonial.image || "/placeholder.svg"}
                          alt={currentTestimonial.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {/* Orange accent */}
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                        <Quote className="w-4 h-4 text-primary-foreground" />
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      <h3 className="text-xl font-bold mb-1">{currentTestimonial.name}</h3>
                      <p className="text-primary font-medium mb-1">{currentTestimonial.position}</p>
                      <p className="text-sm text-muted-foreground mb-3">{currentTestimonial.company}</p>

                      {/* Rating stars */}
                      <div className="flex justify-center md:justify-start gap-1">
                        {[...Array(currentTestimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                        ))}
                      </div>
                    </motion.div>
                  </div>

                  {/* Testimonial content */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex-1"
                  >
                    <blockquote className="text-lg md:text-xl leading-relaxed text-foreground/90 italic">
                      "{currentTestimonial.testimonial[language]}"
                    </blockquote>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation arrows */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between pointer-events-none">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full bg-background/80 backdrop-blur-sm shadow-lg pointer-events-auto -translate-x-1/2 hover:bg-background/90"
              onClick={prev}
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Testemunho anterior</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full bg-background/80 backdrop-blur-sm shadow-lg pointer-events-auto translate-x-1/2 hover:bg-background/90"
              onClick={next}
            >
              <ChevronRight className="h-5 w-5" />
              <span className="sr-only">Próximo testemunho</span>
            </Button>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center mt-8 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={cn(
                  "w-3 h-3 rounded-full transition-all duration-300",
                  current === index ? "bg-primary w-8" : "bg-primary/30 hover:bg-primary/50",
                )}
                aria-label={`Ir para testemunho ${index + 1}`}
              />
            ))}
          </div>

          {/* Testimonial counter */}
          <div className="text-center mt-4">
            <span className="text-sm text-muted-foreground">
              {current + 1} / {testimonials.length}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
