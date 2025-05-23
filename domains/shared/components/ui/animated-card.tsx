"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface AnimatedCardProps {
  title: string
  description?: string
  icon?: React.ReactNode
  footer?: React.ReactNode
  className?: string
  children?: React.ReactNode
  delay?: number
}

export function AnimatedCard({ title, description, icon, footer, className, children, delay = 0 }: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: delay }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <Card className={cn("h-full", className)}>
        <CardHeader>
          {icon && <div className="mb-2 text-primary">{icon}</div>}
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
        {children && <CardContent>{children}</CardContent>}
        {footer && <CardFooter>{footer}</CardFooter>}
      </Card>
    </motion.div>
  )
}
