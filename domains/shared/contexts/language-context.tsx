"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "pt" | "en"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  pt: {
    // Header
    "nav.home": "Início",
    "nav.about": "Sobre",
    "nav.services": "Serviços",
    "nav.contact": "Contacto",
    "theme.toggle": "Alternar tema",
    "language.toggle": "Mudar idioma",

    // Home
    "home.hero.title": "Soluções Inovadoras em Sistemas e Engenharia",
    "home.hero.subtitle": "Transformamos ideias em soluções tecnológicas de excelência",
    "home.hero.cta": "Conhecer Serviços",
    "home.hero.secondary": "Contacte-nos",

    // Services
    "services.title": "Os Nossos Serviços",
    "services.subtitle": "Oferecemos uma gama completa de serviços para atender às necessidades do seu negócio",
    "services.development.title": "Desenvolvimento de Software",
    "services.development.description":
      "Criamos soluções personalizadas para atender às necessidades específicas do seu negócio",
    "services.consulting.title": "Consultoria em TI",
    "services.consulting.description": "Aconselhamento especializado para otimizar os seus processos tecnológicos",
    "services.engineering.title": "Engenharia de Sistemas",
    "services.engineering.description": "Projetamos e implementamos sistemas robustos e escaláveis",
    "services.support.title": "Suporte Técnico",
    "services.support.description": "Assistência contínua para garantir o funcionamento ideal dos seus sistemas",

    // About
    "about.title": "Sobre a VianaHub",
    "about.subtitle": "Dedicados à excelência em sistemas e engenharia desde 2010",
    "about.mission.title": "A Nossa Missão",
    "about.mission.description":
      "Fornecer soluções tecnológicas inovadoras que impulsionem o sucesso dos nossos clientes",
    "about.vision.title": "A Nossa Visão",
    "about.vision.description": "Ser referência em excelência e inovação no setor de tecnologia em Portugal",
    "about.values.title": "Os Nossos Valores",
    "about.values.innovation": "Inovação",
    "about.values.quality": "Qualidade",
    "about.values.integrity": "Integridade",
    "about.values.collaboration": "Colaboração",

    // Contact
    "contact.title": "Entre em Contacto",
    "contact.subtitle": "Estamos disponíveis para responder a todas as suas questões",
    "contact.form.name": "Nome",
    "contact.form.email": "Email",
    "contact.form.subject": "Assunto",
    "contact.form.message": "Mensagem",
    "contact.form.submit": "Enviar Mensagem",
    "contact.form.success": "Mensagem Enviada!",
    "contact.form.success.message": "Obrigado pelo seu contacto. Responderemos em breve.",
    "contact.form.another": "Enviar Outra Mensagem",
    "contact.info.title": "Informações de Contacto",
    "contact.info.subtitle": "Várias formas de entrar em contacto com a nossa equipa",
    "contact.info.address": "Morada",
    "contact.info.phone": "Telefone",
    "contact.info.email": "Email",
    "contact.info.hours": "Horário de Funcionamento",
    "contact.info.social": "Siga-nos",

    // Footer
    "footer.rights": "Todos os direitos reservados",
    "footer.privacy": "Política de Privacidade",
    "footer.terms": "Termos de Serviço",
  },
  en: {
    // Header
    "nav.home": "Home",
    "nav.about": "About",
    "nav.services": "Services",
    "nav.contact": "Contact",
    "theme.toggle": "Toggle theme",
    "language.toggle": "Change language",

    // Home
    "home.hero.title": "Innovative Solutions in Systems and Engineering",
    "home.hero.subtitle": "We transform ideas into excellent technological solutions",
    "home.hero.cta": "Explore Services",
    "home.hero.secondary": "Contact Us",

    // Services
    "services.title": "Our Services",
    "services.subtitle": "We offer a complete range of services to meet your business needs",
    "services.development.title": "Software Development",
    "services.development.description": "We create customized solutions to meet the specific needs of your business",
    "services.consulting.title": "IT Consulting",
    "services.consulting.description": "Expert advice to optimize your technological processes",
    "services.engineering.title": "Systems Engineering",
    "services.engineering.description": "We design and implement robust and scalable systems",
    "services.support.title": "Technical Support",
    "services.support.description": "Continuous assistance to ensure optimal operation of your systems",

    // About
    "about.title": "About VianaHub",
    "about.subtitle": "Dedicated to excellence in systems and engineering since 2010",
    "about.mission.title": "Our Mission",
    "about.mission.description": "To provide innovative technological solutions that drive our clients' success",
    "about.vision.title": "Our Vision",
    "about.vision.description": "To be a reference in excellence and innovation in the technology sector in Portugal",
    "about.values.title": "Our Values",
    "about.values.innovation": "Innovation",
    "about.values.quality": "Quality",
    "about.values.integrity": "Integrity",
    "about.values.collaboration": "Collaboration",

    // Contact
    "contact.title": "Get in Touch",
    "contact.subtitle": "We are available to answer all your questions",
    "contact.form.name": "Name",
    "contact.form.email": "Email",
    "contact.form.subject": "Subject",
    "contact.form.message": "Message",
    "contact.form.submit": "Send Message",
    "contact.form.success": "Message Sent!",
    "contact.form.success.message": "Thank you for reaching out. We'll get back to you soon.",
    "contact.form.another": "Send Another Message",
    "contact.info.title": "Contact Information",
    "contact.info.subtitle": "Multiple ways to get in touch with our team",
    "contact.info.address": "Address",
    "contact.info.phone": "Phone",
    "contact.info.email": "Email",
    "contact.info.hours": "Business Hours",
    "contact.info.social": "Follow Us",

    // Footer
    "footer.rights": "All rights reserved",
    "footer.privacy": "Privacy Policy",
    "footer.terms": "Terms of Service",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

interface LanguageProviderProps {
  children: React.ReactNode
  defaultLanguage?: Language
}

export function LanguageProvider({ children, defaultLanguage = "pt" }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>(defaultLanguage)
  const [mounted, setMounted] = useState(false)

  // Apenas execute o código do lado do cliente após a montagem
  useEffect(() => {
    setMounted(true)
    const savedLanguage = localStorage.getItem("vianahub-language") as Language
    if (savedLanguage && (savedLanguage === "pt" || savedLanguage === "en")) {
      setLanguage(savedLanguage)
    }
  }, [])

  // Salvar a preferência de idioma quando mudar
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("vianahub-language", language)
    }
  }, [language, mounted])

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
