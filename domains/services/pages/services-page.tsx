"use client"

import { SiteHeader } from "@/domains/shared/components/layout/site-header"
import { SiteFooter } from "@/domains/shared/components/layout/site-footer"
import { ServicesHero } from "@/domains/services/components/services-hero"
import { ServicesList } from "@/domains/services/components/services-list"
import { ProcessSection } from "@/domains/services/components/process-section"
import { TechnologiesSection } from "@/domains/services/components/technologies-section"
import { FaqSection } from "@/domains/services/components/faq-section"
import { ServicesCta } from "@/domains/services/components/services-cta"

export function ServicesPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <ServicesHero />
        <ServicesList />
        <ProcessSection />
        <TechnologiesSection />
        <FaqSection />
        <ServicesCta />
      </main>
      <SiteFooter />
    </>
  )
}
