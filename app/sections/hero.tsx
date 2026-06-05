"use client"

import { motion } from "framer-motion"
import { FileUp, ArrowRight, FileText, Shield, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Hero() {
  const scrollToTools = () => {
    const toolsSection = document.getElementById("tools")
    if (toolsSection) {
      toolsSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="relative overflow-hidden pt-20 pb-12 sm:pt-28 sm:pb-16 lg:pt-36 lg:pb-24">
      {/* Background Gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[90vw] max-w-[800px] h-[400px] sm:h-[600px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[70vw] max-w-[600px] h-[300px] sm:h-[400px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-muted px-3 py-1.5 sm:px-4 text-xs sm:text-sm font-medium text-foreground mb-6 sm:mb-8"
          >
            <Zap className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
            <span>Free, Fast & Secure PDF Tools</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="max-w-4xl text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground"
          >
            All Your PDF Tools in{" "}
            <span className="text-primary">One Place</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 sm:mt-6 max-w-2xl text-base sm:text-lg text-muted-foreground px-4 sm:px-0"
          >
            Convert, Compress, Merge, Split and Edit PDF files online for free.
            No installation required. Works on all devices.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto px-4 sm:px-0"
          >
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary-hover text-white px-6 sm:px-8 w-full sm:w-auto"
              onClick={scrollToTools}
            >
              <FileUp className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              Select PDF File
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="w-full sm:w-auto"
              onClick={scrollToTools}
            >
              Explore Tools
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </motion.div>

          {/* Upload Area */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 sm:mt-16 w-full max-w-2xl px-4 sm:px-0"
          >
            <div 
              className="group relative rounded-2xl border-2 border-dashed border-border bg-muted/50 p-6 sm:p-12 transition-colors hover:border-primary/50 hover:bg-muted cursor-pointer"
              onClick={scrollToTools}
            >
	              <div className="flex flex-col items-center gap-3 sm:gap-4">
                <div className="flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform group-hover:scale-110">
                  <FileText className="h-6 w-6 sm:h-8 sm:w-8" />
                </div>
                <div className="text-center">
                  <p className="font-medium text-foreground text-sm sm:text-base">
                    Drag & drop your PDF here
                  </p>
                  <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
                    or click to browse files (max 50 MB)
                  </p>
                </div>
                <div className="flex items-center gap-4 sm:gap-6 mt-1 sm:mt-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Shield className="h-3 w-3" /> Secure
                  </span>
                  <span className="flex items-center gap-1">
                    <Zap className="h-3 w-3" /> Fast
                  </span>
                  <span>Free</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}