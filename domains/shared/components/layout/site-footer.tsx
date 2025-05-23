"use client"

import Link from "next/link"
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react"
import { useLanguage } from "@/domains/shared/contexts/language-context"

export function SiteFooter() {
  const { language, t } = useLanguage()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-muted py-12">
      <div className="container grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <div className="flex items-center">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/VianaHub-Circle256v3-7CB3K8u7IkbBXODqsDPFrRU6k3irmM.png"
              alt="VianaHub Logo"
              className="h-16 w-auto"
            />
          </div>
          <p className="text-sm text-muted-foreground">VianaHub - Sistemas e Engenharia</p>
          <div className="flex space-x-4">
            <Link href="https://facebook.com" className="text-muted-foreground hover:text-primary transition-colors">
              <Facebook className="h-5 w-5" />
              <span className="sr-only">Facebook</span>
            </Link>
            <Link href="https://instagram.com" className="text-muted-foreground hover:text-primary transition-colors">
              <Instagram className="h-5 w-5" />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link href="https://linkedin.com" className="text-muted-foreground hover:text-primary transition-colors">
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Link>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-bold">{t("nav.home")}</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                {t("nav.home")}
              </Link>
            </li>
            <li>
              <Link
                href={language === "en" ? "/about" : "/sobre"}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {t("nav.about")}
              </Link>
            </li>
            <li>
              <Link
                href={language === "en" ? "/services" : "/servicos"}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {t("nav.services")}
              </Link>
            </li>
            <li>
              <Link
                href={language === "en" ? "/contact" : "/contacto"}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {t("nav.contact")}
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-bold">{t("services.title")}</h3>
          <ul className="space-y-2">
            <li>
              <Link
                href={language === "en" ? "/services#development" : "/servicos#development"}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {t("services.development.title")}
              </Link>
            </li>
            <li>
              <Link
                href={language === "en" ? "/services#consulting" : "/servicos#consulting"}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {t("services.consulting.title")}
              </Link>
            </li>
            <li>
              <Link
                href={language === "en" ? "/services#engineering" : "/servicos#engineering"}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {t("services.engineering.title")}
              </Link>
            </li>
            <li>
              <Link
                href={language === "en" ? "/services#support" : "/servicos#support"}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {t("services.support.title")}
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-bold">{t("contact.title")}</h3>
          <ul className="space-y-3">
            <li className="flex items-start space-x-2">
              <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <span className="text-sm text-muted-foreground">Viana do Castelo, Portugal</span>
            </li>
            <li className="flex items-center space-x-2">
              <Phone className="h-5 w-5 text-primary shrink-0" />
              <span className="text-sm text-muted-foreground">+351 123 456 789</span>
            </li>
            <li className="flex items-center space-x-2">
              <Mail className="h-5 w-5 text-primary shrink-0" />
              <span className="text-sm text-muted-foreground">info@vianahub.pt</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="container mt-8 pt-8 border-t">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} VianaHub. {t("footer.rights")}
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="/privacy" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              {t("footer.privacy")}
            </Link>
            <Link href="/terms" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              {t("footer.terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
