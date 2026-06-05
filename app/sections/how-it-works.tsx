"use client"

import { motion } from "framer-motion"
import { Upload, Cog, Download } from "lucide-react"

const steps = [
  {
    icon: Upload,
    title: "Upload File",
    description: "Select or drag & drop your PDF file into the upload area. We support all PDF formats up to 50MB.",
  },
  {
    icon: Cog,
    title: "Process Automatically",
    description: "Our servers process your file instantly using advanced algorithms. No manual configuration needed.",
  },
  {
    icon: Download,
    title: "Download Result",
    description: "Get your converted or edited file in seconds. Download directly to your device.",
  },
]

export function HowItWorks() {
  return (
    <section className="py-20 lg:py-32 bg-muted/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Three simple steps to get your PDF tasks done
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="relative flex flex-col items-center text-center"
              >
                {index < 2 && (
                  <div className="hidden md:block absolute top-12 left-[60%] w-full h-[2px] bg-gradient-to-r from-border to-transparent" />
                )}
                <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-soft">
                  <Icon className="h-10 w-10" />
                </div>
                <div className="mt-6 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                  {index + 1}
                </div>
                <h3 className="mt-4 text-xl font-semibold">{step.title}</h3>
                <p className="mt-2 text-muted-foreground">{step.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}