"use client"

import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { useLanguage } from "@/domains/shared/contexts/language-context"
import { cn } from "@/lib/utils"

interface ThemeToggleProps {
  isHomePage?: boolean
}

export function ThemeToggle({ isHomePage = false }: ThemeToggleProps) {
  const { setTheme, resolvedTheme } = useTheme()
  const { t } = useLanguage()
  const [mounted, setMounted] = useState(false)

  // Necessário para evitar problemas de hidratação
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="relative">
        <span className="sr-only">{t("theme.toggle")}</span>
      </Button>
    )
  }

  const isLight = resolvedTheme === "light"

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(isLight ? "dark" : "light")}
      className={cn("relative", isHomePage ? "text-white hover:text-white/90" : "")}
      aria-label={t("theme.toggle")}
    >
      <Sun
        className={`h-[1.2rem] w-[1.2rem] transition-all ${isLight ? "scale-100 rotate-0" : "scale-0 -rotate-90"}`}
      />
      <Moon
        className={`absolute h-[1.2rem] w-[1.2rem] transition-all ${
          isLight ? "scale-0 rotate-90" : "scale-100 rotate-0"
        }`}
      />
      <span className="sr-only">{t("theme.toggle")}</span>
    </Button>
  )
}
