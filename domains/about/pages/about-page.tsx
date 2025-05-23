"use client"

import { SiteHeader } from "@/domains/shared/components/layout/site-header"
import { SiteFooter } from "@/domains/shared/components/layout/site-footer"
import { AboutHero } from "@/domains/about/components/about-hero"
import { MissionVision } from "@/domains/about/components/mission-vision"
import { TeamSection } from "@/domains/about/components/team-section"
import { HistorySection } from "@/domains/about/components/history-section"
import { PartnerSection } from "@/domains/about/components/partner-section"

export function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <AboutHero />
        <MissionVision />
        <TeamSection />
        <HistorySection />
        <PartnerSection />
      </main>
      <SiteFooter />
    </>
  )
}
