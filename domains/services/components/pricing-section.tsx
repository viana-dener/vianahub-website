"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { SectionHeading } from "@/domains/shared/components/ui/section-heading"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const plans = [
  {
    name: "Starter",
    price: "€499",
    description: "Perfect for small businesses just getting started.",
    features: [
      "Business needs assessment",
      "Basic market analysis",
      "1 recruitment campaign",
      "Monthly check-in",
      "Email support",
    ],
    popular: false,
  },
  {
    name: "Growth",
    price: "€999",
    description: "Ideal for growing businesses with specific needs.",
    features: [
      "Comprehensive business analysis",
      "Detailed growth strategy",
      "3 recruitment campaigns",
      "Bi-weekly check-ins",
      "Priority email & phone support",
      "1 training workshop",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Tailored solutions for established businesses.",
    features: [
      "Full-scale business consulting",
      "Ongoing recruitment support",
      "Weekly strategy meetings",
      "Dedicated account manager",
      "24/7 priority support",
      "Unlimited training workshops",
      "Custom reporting",
    ],
    popular: false,
  },
]

export function PricingSection() {
  return (
    <section className="py-16">
      <div className="container">
        <SectionHeading
          title="Pricing Plans"
          subtitle="Flexible options designed to meet the needs of businesses at every stage of growth."
        />

        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex"
            >
              <Card
                className={`flex flex-col w-full border-muted-foreground/20 ${
                  plan.popular ? "border-primary shadow-lg shadow-primary/10 relative" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                    POPULAR
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="mt-4 mb-2">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.price !== "Custom" && <span className="text-muted-foreground ml-1">/month</span>}
                  </div>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" variant={plan.popular ? "default" : "outline"}>
                    Get Started
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground">
            Need a custom solution?{" "}
            <a href="/contact" className="text-primary font-medium hover:underline">
              Contact us
            </a>{" "}
            for a personalized quote.
          </p>
        </div>
      </div>
    </section>
  )
}
