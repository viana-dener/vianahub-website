"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useLanguage } from "@/domains/shared/contexts/language-context"

export function ServicesCta() {
  const { language } = useLanguage()

  return (
    <section className="py-24">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-primary/10 border border-primary/20 rounded-lg p-8 md:p-12 text-center max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {language === "en" ? "Ready to start your project?" : "Pronto para iniciar o seu projeto?"}
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            {language === "en"
              ? "Contact us today to discuss how we can help you achieve your technology goals."
              : "Contacte-nos hoje para discutir como podemos ajudá-lo a atingir os seus objetivos tecnológicos."}
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
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
