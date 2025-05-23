"use client"

import { motion } from "framer-motion"
import { SectionHeading } from "@/domains/shared/components/ui/section-heading"
import { useLanguage } from "@/domains/shared/contexts/language-context"

export function PartnerSection() {
  const { language } = useLanguage()

  const partners = [
    { name: "TechViana", logo: "/placeholder.svg?height=100&width=200" },
    { name: "Minho University", logo: "/placeholder.svg?height=100&width=200" },
    { name: "Viana Municipality", logo: "/placeholder.svg?height=100&width=200" },
    { name: "Innovation Hub", logo: "/placeholder.svg?height=100&width=200" },
    { name: "Startup Viana", logo: "/placeholder.svg?height=100&width=200" },
    { name: "Tech Association", logo: "/placeholder.svg?height=100&width=200" },
  ]

  return (
    <section className="py-16 bg-muted/30">
      <div className="container">
        <SectionHeading
          title={language === "en" ? "Our Partners" : "Nossos Parceiros"}
          subtitle={
            language === "en" ? "We collaborate with leading organizations" : "Colaboramos com organizações líderes"
          }
        />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mt-12">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-card hover:bg-accent transition-colors duration-300 rounded-lg p-6 flex items-center justify-center h-32"
            >
              <img src={partner.logo || "/placeholder.svg"} alt={partner.name} className="max-h-16 max-w-full" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
