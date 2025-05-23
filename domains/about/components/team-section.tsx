"use client"

import { motion } from "framer-motion"
import { Linkedin, Mail } from "lucide-react"
import { SectionHeading } from "@/domains/shared/components/ui/section-heading"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/domains/shared/contexts/language-context"

export function TeamSection() {
  const { language } = useLanguage()

  const team = [
    {
      name: language === "en" ? "João Silva" : "João Silva",
      position: language === "en" ? "CEO & Founder" : "CEO & Fundador",
      bio:
        language === "en"
          ? "With over 15 years of experience in systems engineering."
          : "Com mais de 15 anos de experiência em engenharia de sistemas.",
      image: "/placeholder.svg?height=400&width=400",
    },
    {
      name: language === "en" ? "Ana Oliveira" : "Ana Oliveira",
      position: language === "en" ? "CTO" : "CTO",
      bio:
        language === "en"
          ? "Expert in software development and system architecture."
          : "Especialista em desenvolvimento de software e arquitetura de sistemas.",
      image: "/placeholder.svg?height=400&width=400",
    },
    {
      name: language === "en" ? "Pedro Santos" : "Pedro Santos",
      position: language === "en" ? "Lead Engineer" : "Engenheiro Chefe",
      bio:
        language === "en"
          ? "Specialized in IoT solutions and embedded systems."
          : "Especializado em soluções IoT e sistemas embarcados.",
      image: "/placeholder.svg?height=400&width=400",
    },
    {
      name: language === "en" ? "Maria Costa" : "Maria Costa",
      position: language === "en" ? "Project Manager" : "Gestora de Projetos",
      bio:
        language === "en"
          ? "Ensures projects are delivered on time and within budget."
          : "Garante que os projetos são entregues no prazo e dentro do orçamento.",
      image: "/placeholder.svg?height=400&width=400",
    },
  ]

  return (
    <section className="py-16 bg-muted/30">
      <div className="container">
        <SectionHeading
          title={language === "en" ? "Our Team" : "Nossa Equipa"}
          subtitle={
            language === "en"
              ? "Meet the professionals behind VianaHub"
              : "Conheça os profissionais por trás da VianaHub"
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-lg aspect-square mb-4">
                <img
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="flex gap-2">
                    <Button size="icon" variant="secondary" className="rounded-full">
                      <Linkedin className="h-5 w-5" />
                      <span className="sr-only">LinkedIn profile</span>
                    </Button>
                    <Button size="icon" variant="secondary" className="rounded-full">
                      <Mail className="h-5 w-5" />
                      <span className="sr-only">Email</span>
                    </Button>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-primary font-medium mb-2">{member.position}</p>
              <p className="text-sm text-muted-foreground">{member.bio}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
