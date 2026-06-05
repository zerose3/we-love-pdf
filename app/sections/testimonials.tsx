"use client"

import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Marketing Manager",
    content:
      "We Love PDF has completely transformed how our team handles documents. The conversion quality is outstanding and the speed is incredible. We use it daily!",
    rating: 5,
  },
  {
    name: "David Chen",
    role: "Software Engineer",
    content:
      "As a developer, I appreciate the clean UI and fast processing. The batch processing feature saves me hours every week. Highly recommended for anyone working with PDFs.",
    rating: 5,
  },
  {
    name: "Maria Garcia",
    role: "University Student",
    content:
      "The free plan is genuinely useful! I can convert my PDF readings to Word for note-taking without any hassle. The mobile version works great on my phone too.",
    rating: 5,
  },
]

export function Testimonials() {
  return (
    <section className="py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            What Our Users Say
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Trusted by thousands of professionals daily
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Card className="h-full border-border/60">
                <CardContent className="p-6">
                  <Quote className="h-8 w-8 text-primary/20" />
                  <div className="mt-4 flex gap-1">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-primary text-primary"
                      />
                    ))}
                  </div>
                  <p className="mt-4 text-muted-foreground leading-relaxed">
                    {testimonial.content}
                  </p>
                  <div className="mt-6 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}