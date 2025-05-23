"use client"

import { motion } from "framer-motion"
import { Code, Database, Server, Headphones, ArrowRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/domains/shared/contexts/language-context"

export function ServicesList() {
  const { t } = useLanguage()

  const services = [
    {
      id: "development",
      title: t("services.development.title"),
      description: t("services.development.description"),
      icon: <Code className="h-12 w-12" />,
      features: ["Web Applications", "Mobile Applications", "Desktop Software", "API Development", "Database Design"],
    },
    {
      id: "consulting",
      title: t("services.consulting.title"),
      description: t("services.consulting.description"),
      icon: <Database className="h-12 w-12" />,
      features: [
        "IT Strategy",
        "System Architecture",
        "Technology Selection",
        "Process Optimization",
        "Digital Transformation",
      ],
    },
    {
      id: "engineering",
      title: t("services.engineering.title"),
      description: t("services.engineering.description"),
      icon: <Server className="h-12 w-12" />,
      features: [
        "System Design",
        "IoT Solutions",
        "Embedded Systems",
        "Industrial Automation",
        "Network Infrastructure",
      ],
    },
    {
      id: "support",
      title: t("services.support.title"),
      description: t("services.support.description"),
      icon: <Headphones className="h-12 w-12" />,
      features: [
        "24/7 Technical Support",
        "System Maintenance",
        "Performance Monitoring",
        "Security Updates",
        "User Training",
      ],
    },
  ]

  return (
    <section className="py-16">
      <div className="container">
        <div className="grid gap-8 mt-12">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              id={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <Card className="overflow-hidden border-muted-foreground/20">
                <div className="grid md:grid-cols-[1fr_2fr] h-full">
                  <CardHeader className="bg-muted/50 flex flex-col items-center justify-center text-center p-8">
                    <div className="text-primary mb-4">{service.icon}</div>
                    <CardTitle className="text-2xl">{service.title}</CardTitle>
                    <CardDescription className="mt-2">{service.description}</CardDescription>
                  </CardHeader>
                  <div>
                    <CardContent className="p-8">
                      <h4 className="text-lg font-medium mb-4">Key Features:</h4>
                      <ul className="space-y-2">
                        {service.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-2">
                            <ArrowRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
