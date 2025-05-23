"use client"

import { SiteHeader } from "@/domains/shared/components/layout/site-header"
import { SiteFooter } from "@/domains/shared/components/layout/site-footer"
import { ContactHero } from "@/domains/contact/components/contact-hero"
import { ContactForm } from "@/domains/contact/components/contact-form"
import { ContactInfo } from "@/domains/contact/components/contact-info"
import { MapSection } from "@/domains/contact/components/map-section"

export function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <ContactHero />
        <div className="py-16">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12">
              <ContactForm />
              <ContactInfo />
            </div>
          </div>
        </div>
        <MapSection />
      </main>
      <SiteFooter />
    </>
  )
}
