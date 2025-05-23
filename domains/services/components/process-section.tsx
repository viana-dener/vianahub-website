"use client"

import { motion } from "framer-motion"
import { SectionHeading } from "@/domains/shared/components/ui/section-heading"
import { useLanguage } from "@/domains/shared/contexts/language-context"

export function ProcessSection() {
  const { language } = useLanguage()

  const steps = [
    {
      number: "01",
      title: language === "en" ? "Requirements Analysis" : "Análise de Requisitos",
      description:
        language === "en"
          ? "We begin by understanding your specific needs and objectives."
          : "Começamos por compreender as suas necessidades e objetivos específicos.",
    },
    {
      number: "02",
      title: language === "en" ? "Solution Design" : "Design da Solução",
      description:
        language === "en"
          ? "Our team develops a tailored solution designed to address your challenges."
          : "A nossa equipa desenvolve uma solução personalizada para resolver os seus desafios.",
    },
    {
      number: "03",
      title: language === "en" ? "Implementation" : "Implementação",
      description:
        language === "en"
          ? "We implement the solution with careful attention to detail and quality."
          : "Implementamos a solução com cuidadosa atenção aos detalhes e à qualidade.",
    },
    {
      number: "04",
      title: language === "en" ? "Testing & Deployment" : "Testes e Implementação",
      description:
        language === "en"
          ? "Rigorous testing ensures the solution meets all requirements before deployment."
          : "Testes rigorosos garantem que a solução atende a todos os requisitos antes da implementação.",
    },
    {
      number: "05",
      title: language === "en" ? "Ongoing Support" : "Suporte Contínuo",
      description:
        language === "en"
          ? "We provide continuous support and maintenance to ensure optimal performance."
          : "Fornecemos suporte e manutenção contínuos para garantir um desempenho ideal.",
    },
  ]

  return (
    <section className="py-16 bg-muted/30">
      <div className="container">
        <SectionHeading
          title={language === "en" ? "Our Process" : "Nosso Processo"}
          subtitle={
            language === "en"
              ? "How we work to deliver exceptional results"
              : "Como trabalhamos para entregar resultados excepcionais"
          }
        />

        <div className="relative mt-16">
          {/* Process line */}
          <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-1 bg-primary/20 md:-translate-x-px hidden md:block" />

          <div className="space-y-12 md:space-y-0">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative grid md:grid-cols-2 gap-8 items-center mb-12"
              >
                <div className={`${index % 2 === 0 ? "md:text-right" : "md:order-2"}`}>
                  <div className="flex items-center md:justify-end gap-4 mb-4">
                    <div className="flex items-center justify-center w-14 h-14 rounded-full bg-primary text-primary-foreground text-xl font-bold">
                      {step.number}
                    </div>
                    <h3 className="text-2xl font-bold md:hidden">{step.title}</h3>
                  </div>
                  <h3 className="text-2xl font-bold hidden md:block mb-4">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>

                <div className={`${index % 2 === 0 ? "md:order-2" : ""} hidden md:block`}>
                  {/* Process dot */}
                  <div className="absolute left-1/2 top-14 w-6 h-6 rounded-full bg-primary -translate-x-1/2 -translate-y-1/2" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
