"use client"

import { motion } from "framer-motion"
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Linkedin } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { useLanguage } from "@/domains/shared/contexts/language-context"

export function ContactInfo() {
  const { t } = useLanguage()

  const contactInfo = [
    {
      icon: <MapPin className="h-5 w-5 text-primary" />,
      title: t("contact.info.address"),
      details: ["Rua da Bandeira 123", "4900-001 Viana do Castelo", "Portugal"],
    },
    {
      icon: <Phone className="h-5 w-5 text-primary" />,
      title: t("contact.info.phone"),
      details: ["+351 123 456 789", "+351 987 654 321"],
    },
    {
      icon: <Mail className="h-5 w-5 text-primary" />,
      title: t("contact.info.email"),
      details: ["info@vianahub.pt", "support@vianahub.pt"],
    },
    {
      icon: <Clock className="h-5 w-5 text-primary" />,
      title: t("contact.info.hours"),
      details: ["Segunda - Sexta: 9:00 - 18:00", "Sábado: 10:00 - 14:00", "Domingo: Fechado"],
    },
  ]

  const socialLinks = [
    { icon: <Facebook className="h-5 w-5" />, href: "https://facebook.com", label: "Facebook" },
    { icon: <Instagram className="h-5 w-5" />, href: "https://instagram.com", label: "Instagram" },
    { icon: <Linkedin className="h-5 w-5" />, href: "https://linkedin.com", label: "LinkedIn" },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>{t("contact.info.title")}</CardTitle>
          <CardDescription>{t("contact.info.subtitle")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {contactInfo.map((item, index) => (
            <div key={item.title} className="flex gap-4">
              <div className="mt-1">{item.icon}</div>
              <div>
                <h3 className="font-medium mb-1">{item.title}</h3>
                {item.details.map((detail, i) => (
                  <p key={i} className="text-muted-foreground">
                    {detail}
                  </p>
                ))}
              </div>
            </div>
          ))}

          <div className="pt-4 border-t">
            <h3 className="font-medium mb-3">{t("contact.info.social")}</h3>
            <div className="flex gap-4">
              {socialLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="bg-muted hover:bg-primary hover:text-primary-foreground transition-colors duration-300 h-10 w-10 rounded-full flex items-center justify-center"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.icon}
                  <span className="sr-only">{link.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
