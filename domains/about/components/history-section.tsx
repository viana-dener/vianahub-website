"use client"

import { motion } from "framer-motion"
import { SectionHeading } from "@/domains/shared/components/ui/section-heading"
import { useLanguage } from "@/domains/shared/contexts/language-context"

export function HistorySection() {
  const { language } = useLanguage()

  const milestones = [
    {
      year: "2010",
      title: language === "en" ? "VianaHub Founded" : "Fundação da VianaHub",
      description:
        language === "en"
          ? "VianaHub was established with a focus on systems engineering."
          : "A VianaHub foi estabelecida com foco em engenharia de sistemas.",
    },
    {
      year: "2013",
      title: language === "en" ? "First Major Project" : "Primeiro Grande Projeto",
      description:
        language === "en"
          ? "Completed our first enterprise-level system implementation."
          : "Concluímos a nossa primeira implementação de sistema de nível empresarial.",
    },
    {
      year: "2016",
      title: language === "en" ? "Expanded Services" : "Expansão de Serviços",
      description:
        language === "en"
          ? "Added software development and IT consulting to our service offerings."
          : "Adicionamos desenvolvimento de software e consultoria em TI à nossa oferta de serviços.",
    },
    {
      year: "2019",
      title: language === "en" ? "IoT Solutions" : "Soluções IoT",
      description:
        language === "en"
          ? "Began developing Internet of Things solutions for industrial clients."
          : "Começamos a desenvolver soluções de Internet das Coisas para clientes industriais.",
    },
    {
      year: "2022",
      title: language === "en" ? "International Expansion" : "Expansão Internacional",
      description:
        language === "en"
          ? "Started working with clients across Europe."
          : "Começamos a trabalhar com clientes em toda a Europa.",
    },
  ]

  return (
    <section className="py-16">
      <div className="container">
        <SectionHeading
          title={language === "en" ? "Our History" : "Nossa História"}
          subtitle={
            language === "en" ? "The journey of VianaHub through the years" : "A jornada da VianaHub ao longo dos anos"
          }
        />

        <div className="relative max-w-4xl mx-auto mt-16">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

          {milestones.map((milestone, index) => (
            <motion.div
              key={milestone.year}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 ${
                index % 2 === 0 ? "md:text-right" : "md:flex-row-reverse"
              }`}
            >
              <div className={`${index % 2 === 0 ? "md:text-right" : "md:order-2"}`}>
                <div className="bg-primary text-primary-foreground inline-block px-4 py-1 rounded-full text-sm font-medium mb-2">
                  {milestone.year}
                </div>
                <h3 className="text-xl font-semibold mb-2">{milestone.title}</h3>
                <p className="text-muted-foreground">{milestone.description}</p>
              </div>

              <div className={index % 2 === 0 ? "md:order-2" : ""}>
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 top-0 w-6 h-6 rounded-full bg-primary -translate-x-1/2 md:-translate-x-3 -translate-y-1" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
