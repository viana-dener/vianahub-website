"use client"

import { motion } from "framer-motion"
import { SectionHeading } from "@/domains/shared/components/ui/section-heading"
import { useLanguage } from "@/domains/shared/contexts/language-context"

export function TechnologiesSection() {
  const { language } = useLanguage()

  const technologies = [
    { name: "React", logo: "/placeholder.svg?height=80&width=80" },
    { name: "Node.js", logo: "/placeholder.svg?height=80&width=80" },
    { name: "Python", logo: "/placeholder.svg?height=80&width=80" },
    { name: "AWS", logo: "/placeholder.svg?height=80&width=80" },
    { name: "Azure", logo: "/placeholder.svg?height=80&width=80" },
    { name: "Docker", logo: "/placeholder.svg?height=80&width=80" },
    { name: "Kubernetes", logo: "/placeholder.svg?height=80&width=80" },
    { name: "MongoDB", logo: "/placeholder.svg?height=80&width=80" },
    { name: "PostgreSQL", logo: "/placeholder.svg?height=80&width=80" },
    { name: "TensorFlow", logo: "/placeholder.svg?height=80&width=80" },
  ]

  return (
    <section className="py-16">
      <div className="container">
        <SectionHeading
          title={language === "en" ? "Technologies We Use" : "Tecnologias que Utilizamos"}
          subtitle={
            language === "en"
              ? "We leverage cutting-edge technologies to deliver the best solutions"
              : "Utilizamos tecnologias de ponta para entregar as melhores soluções"
          }
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 mt-12">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-card hover:bg-accent transition-colors duration-300 rounded-lg p-6 flex flex-col items-center justify-center text-center"
            >
              <img src={tech.logo || "/placeholder.svg"} alt={tech.name} className="h-16 w-16 mb-4" />
              <span className="font-medium">{tech.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
