"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useLanguage } from "@/domains/shared/contexts/language-context"

export function CtaSection() {
  const { language } = useLanguage()

  return (
    <section className="py-24 bg-muted/30">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-primary/10 border border-primary/20 rounded-lg p-8 md:p-12 text-center max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {language === "en" ? "Ready to transform your business?" : "Pronto para transformar o seu negócio?"}
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            {language === "en"
              ? "Let's discuss how our solutions can help you achieve your goals and overcome challenges."
              : "Vamos discutir como as nossas soluções podem ajudá-lo a atingir os seus objetivos e superar desafios."}
          </p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Button size="lg" asChild>
              <Link href={language === "en" ? "/contact" : "/contacto"} className="group">
                {language === "en" ? "Contact Us" : "Contacte-nos"}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href={language === "en" ? "/services" : "/servicos"}>
                {language === "en" ? "Explore Services" : "Explorar Serviços"}
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
