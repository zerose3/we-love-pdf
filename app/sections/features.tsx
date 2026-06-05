"use client"

import { motion } from "framer-motion"
import { Shield, Zap, User, Smartphone, Layers, Cloud } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "Secure File Processing",
    description: "Your files are encrypted and automatically deleted after processing. We never store your data.",
  },
  {
    icon: Zap,
    title: "Fast Conversion",
    description: "Powered by high-performance servers. Most conversions complete in under 10 seconds.",
  },
  {
    icon: User,
    title: "No Registration Required",
    description: "Start using our tools immediately. No account creation or email verification needed.",
  },
  {
    icon: Smartphone,
    title: "Mobile Friendly",
    description: "Works perfectly on any device. Use on your phone, tablet, or desktop browser.",
  },
  {
    icon: Layers,
    title: "Batch Processing",
    description: "Process multiple files at once. Save time when working with large document sets.",
  },
  {
    icon: Cloud,
    title: "Cloud Based",
    description: "No software installation needed. Everything runs in your browser with cloud processing.",
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export function Features() {
  return (
    <section className="py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Why Choose Us
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Professional features designed for everyone
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                variants={item}
                className="flex flex-col rounded-2xl border border-border/60 bg-card p-6 shadow-soft hover:shadow-soft-lg transition-shadow"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{feature.title}</h3>
                <p className="mt-2 text-muted-foreground">{feature.description}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}