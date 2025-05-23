"use client"

import { motion } from "framer-motion"
import { Compass, Eye } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/domains/shared/contexts/language-context"

export function MissionVision() {
  const { t } = useLanguage()

  return (
    <section className="py-16">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="h-full">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3 mb-2">
                  <Compass className="h-8 w-8 text-primary" />
                  <CardTitle className="text-2xl">{t("about.mission.title")}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{t("about.mission.description")}</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="h-full">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3 mb-2">
                  <Eye className="h-8 w-8 text-primary" />
                  <CardTitle className="text-2xl">{t("about.vision.title")}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{t("about.vision.description")}</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
