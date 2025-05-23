"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Globe } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/domains/shared/components/theme/theme-toggle"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/domains/shared/contexts/language-context"

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const { language, setLanguage, t } = useLanguage()

  const isHomePage = pathname === "/"

  const getLocalizedPath = (path: string) => {
    // Handle English paths
    if (language === "en") {
      if (path === "/") return "/"
      if (path === "/sobre") return "/about"
      if (path === "/servicos") return "/services"
      if (path === "/contacto") return "/contact"

      // Handle English to Portuguese
      if (path === "/about") return "/about"
      if (path === "/services") return "/services"
      if (path === "/contact") return "/contact"
    } else {
      // Handle Portuguese paths
      if (path === "/") return "/"
      if (path === "/sobre") return "/sobre"
      if (path === "/servicos") return "/servicos"
      if (path === "/contacto") return "/contacto"

      // Handle English to Portuguese
      if (path === "/about") return "/sobre"
      if (path === "/services") return "/servicos"
      if (path === "/contact") return "/contacto"
    }
    return path
  }

  const navItems = [
    { name: t("nav.home"), href: "/" },
    { name: t("nav.about"), href: language === "en" ? "/about" : "/sobre" },
    { name: t("nav.services"), href: language === "en" ? "/services" : "/servicos" },
    { name: t("nav.contact"), href: language === "en" ? "/contact" : "/contacto" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        scrolled || isOpen ? "bg-background/80 backdrop-blur-md shadow-md" : "bg-transparent",
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/VianaHub-Circle256v3-7CB3K8u7IkbBXODqsDPFrRU6k3irmM.png"
              alt="VianaHub Logo"
              className="h-12 w-auto"
            />
          </motion.div>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item, index) => (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Link
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors",
                  pathname === item.href
                    ? "text-primary font-semibold" // Sempre laranja quando selecionado
                    : isHomePage
                      ? "text-white/90 hover:text-primary" // Branco com hover laranja na home
                      : "text-foreground/80 hover:text-primary", // Cor padrão com hover laranja nas outras páginas
                )}
              >
                {item.name}
              </Link>
            </motion.div>
          ))}

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setLanguage(language === "pt" ? "en" : "pt")}
            className={cn("relative", isHomePage && !scrolled && !isOpen ? "text-white hover:text-white/90" : "")}
            aria-label={t("language.toggle")}
          >
            <Globe className="h-[1.2rem] w-[1.2rem]" />
            <span className="sr-only">{t("language.toggle")}</span>
          </Button>

          <ThemeToggle isHomePage={isHomePage && !scrolled && !isOpen} />
        </nav>

        <div className="flex md:hidden items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setLanguage(language === "pt" ? "en" : "pt")}
            className={cn("relative", isHomePage && !scrolled && !isOpen ? "text-white hover:text-white/90" : "")}
            aria-label={t("language.toggle")}
          >
            <Globe className="h-[1.2rem] w-[1.2rem]" />
            <span className="sr-only">{t("language.toggle")}</span>
          </Button>

          <ThemeToggle isHomePage={isHomePage && !scrolled && !isOpen} />

          <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-background/95 backdrop-blur-sm"
          >
            <div className="container py-4 space-y-4">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "block py-2 text-base font-medium transition-colors",
                      pathname === item.href
                        ? "text-primary font-semibold" // Sempre laranja quando selecionado
                        : isHomePage
                          ? "text-white/90 hover:text-primary" // Branco com hover laranja na home
                          : "text-foreground/80 hover:text-primary", // Cor padrão com hover laranja nas outras páginas
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
