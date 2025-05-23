"use client"

import { SiteHeader } from "@/domains/shared/components/layout/site-header"
import { SiteFooter } from "@/domains/shared/components/layout/site-footer"
import { HeroSection } from "@/domains/home/components/hero-section"
import { ServicesSection } from "@/domains/home/components/services-section"
import { AboutSection } from "@/domains/home/components/about-section"
import { ProjectsSection } from "@/domains/home/components/projects-section"
import { CtaSection } from "@/domains/home/components/cta-section"
import { TestimonialsSection } from "@/domains/home/components/testimonials-section"

export function HomePage() {
  return (
    <>
      <SiteHeader />
      <main className="overflow-hidden">
        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <ProjectsSection />
        <CtaSection />
        <TestimonialsSection />
      </main>
      <SiteFooter />
    </>
  )
}
