"use client"

import { SectionHeading } from "@/domains/shared/components/ui/section-heading"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { motion } from "framer-motion"
import { useLanguage } from "@/domains/shared/contexts/language-context"

export function FaqSection() {
  const { language } = useLanguage()

  const faqs = [
    {
      question:
        language === "en" ? "What types of businesses do you work with?" : "Com que tipos de empresas trabalham?",
      answer:
        language === "en"
          ? "We work with businesses of all sizes, from startups to large enterprises, across various industries including manufacturing, healthcare, finance, and retail."
          : "Trabalhamos com empresas de todos os tamanhos, desde startups até grandes empresas, em vários setores, incluindo manufatura, saúde, finanças e retalho.",
    },
    {
      question: language === "en" ? "How long does a typical project take?" : "Quanto tempo demora um projeto típico?",
      answer:
        language === "en"
          ? "Project timelines vary depending on complexity and scope. A simple web application might take 4-8 weeks, while a comprehensive enterprise system could take several months. We'll provide a detailed timeline during our initial consultation."
          : "Os prazos dos projetos variam dependendo da complexidade e do escopo. Uma aplicação web simples pode levar 4-8 semanas, enquanto um sistema empresarial abrangente pode levar vários meses. Forneceremos um cronograma detalhado durante a nossa consulta inicial.",
    },
    {
      question:
        language === "en"
          ? "Do you provide ongoing maintenance and support?"
          : "Fornecem manutenção e suporte contínuos?",
      answer:
        language === "en"
          ? "Yes, we offer comprehensive maintenance and support packages to ensure your systems continue to operate optimally. Our support team is available 24/7 to address any issues that may arise."
          : "Sim, oferecemos pacotes abrangentes de manutenção e suporte para garantir que os seus sistemas continuem a funcionar de forma ideal. A nossa equipa de suporte está disponível 24/7 para resolver quaisquer problemas que possam surgir.",
    },
    {
      question:
        language === "en"
          ? "Can you integrate with our existing systems?"
          : "Podem integrar com os nossos sistemas existentes?",
      answer:
        language === "en"
          ? "Absolutely. We specialize in system integration and can seamlessly connect new solutions with your existing infrastructure, ensuring data flows smoothly across your organization."
          : "Absolutamente. Somos especializados em integração de sistemas e podemos conectar perfeitamente novas soluções com a sua infraestrutura existente, garantindo que os dados fluam sem problemas em toda a sua organização.",
    },
  ]

  return (
    <section className="py-16 bg-muted/30">
      <div className="container">
        <SectionHeading
          title={language === "en" ? "Frequently Asked Questions" : "Perguntas Frequentes"}
          subtitle={
            language === "en"
              ? "Find answers to common questions about our services"
              : "Encontre respostas para perguntas comuns sobre os nossos serviços"
          }
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto mt-12"
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}
