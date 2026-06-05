"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for occasional use",
    features: [
      "5 files per day",
      "Max 10 MB per file",
      "Standard conversion speed",
      "Basic tools access",
      "Email support",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    price: "$9",
    period: "/month",
    description: "For power users and professionals",
    features: [
      "Unlimited conversions",
      "Large files up to 500 MB",
      "Faster processing speed",
      "All premium tools",
      "Priority support",
      "Batch processing",
      "No ads",
    ],
    cta: "Upgrade to Pro",
    popular: true,
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="py-20 lg:py-32 bg-muted/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Simple Pricing
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Choose the plan that works for you
          </p>
        </div>

        <div className="mx-auto grid max-w-4xl grid-cols-1 md:grid-cols-2 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Card
                className={`relative h-full flex flex-col ${
                  plan.popular
                    ? "border-primary shadow-soft-lg"
                    : "border-border/60"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-bold text-white">
                    MOST POPULAR
                  </div>
                )}
                <CardHeader className="text-center pb-2">
                  <CardTitle className="text-lg font-medium text-muted-foreground">
                    {plan.name}
                  </CardTitle>
                  <div className="mt-2 flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {plan.description}
                  </p>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <ul className="mt-4 space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="h-5 w-5 shrink-0 text-primary" />
                        <span className="text-sm text-muted-foreground">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`mt-8 w-full ${
                      plan.popular
                        ? "bg-primary hover:bg-primary-hover"
                        : "bg-foreground hover:bg-foreground/90"
                    }`}
                    size="lg"
                  >
                    {plan.cta}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}