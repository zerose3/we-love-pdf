"use client"

import { motion } from "framer-motion"
import {
  FileText,
  FileImage,
  Image,
  Minimize,
  Combine,
  Split,
  RotateCw,
  Scan,
  FileSpreadsheet,
  Table,
  Presentation,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

const tools = [
  {
    id: "pdf-to-word",
    title: "PDF to Word",
    description: "Convert PDF to editable Word documents",
    icon: FileText,
    color: "bg-blue-500/10 text-blue-600",
    href: "#",
    comingSoon: true,
  },
  {
    id: "word-to-pdf",
    title: "Word to PDF",
    description: "Convert Word docs to PDF format",
    icon: FileText,
    color: "bg-blue-500/10 text-blue-600",
    href: "/tools/word-to-pdf",
    comingSoon: false,
  },
  {
    id: "pdf-to-jpg",
    title: "PDF to JPG",
    description: "Convert PDF pages to images",
    icon: FileImage,
    color: "bg-purple-500/10 text-purple-600",
    href: "#",
    comingSoon: true,
  },
  {
    id: "jpg-to-pdf",
    title: "JPG to PDF",
    description: "Combine images into a PDF",
    icon: Image,
    color: "bg-purple-500/10 text-purple-600",
    href: "/tools/jpg-to-pdf",
    comingSoon: false,
  },
  {
    id: "compress",
    title: "Compress PDF",
    description: "Reduce PDF file size easily",
    icon: Minimize,
    color: "bg-green-500/10 text-green-600",
    href: "#",
    comingSoon: true,
  },
  {
    id: "merge",
    title: "Merge PDF",
    description: "Combine multiple PDFs into one",
    icon: Combine,
    color: "bg-orange-500/10 text-orange-600",
    href: "/tools/merge",
    comingSoon: false,
  },
  {
    id: "split",
    title: "Split PDF",
    description: "Extract pages from PDF",
    icon: Split,
    color: "bg-orange-500/10 text-orange-600",
    href: "/tools/split",
    comingSoon: false,
  },
  {
    id: "rotate",
    title: "Rotate PDF",
    description: "Rotate PDF pages online",
    icon: RotateCw,
    color: "bg-yellow-500/10 text-yellow-600",
    href: "/tools/rotate",
    comingSoon: false,
  },
  {
    id: "ocr",
    title: "OCR PDF",
    description: "Extract text from scanned PDFs",
    icon: Scan,
    color: "bg-indigo-500/10 text-indigo-600",
    href: "#",
    comingSoon: true,
  },
  {
    id: "pdf-to-excel",
    title: "PDF to Excel",
    description: "Convert PDF tables to Excel",
    icon: FileSpreadsheet,
    color: "bg-emerald-500/10 text-emerald-600",
    href: "#",
    comingSoon: true,
  },
  {
    id: "excel-to-pdf",
    title: "Excel to PDF",
    description: "Convert spreadsheets to PDF",
    icon: Table,
    color: "bg-emerald-500/10 text-emerald-600",
    href: "#",
    comingSoon: true,
  },
  {
    id: "pdf-to-ppt",
    title: "PDF to PowerPoint",
    description: "Convert PDF to presentations",
    icon: Presentation,
    color: "bg-red-500/10 text-red-600",
    href: "#",
    comingSoon: true,
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export function Tools() {
  return (
    <section id="tools" className="py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Our PDF Tools
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Everything you need to work with PDFs, all in one place
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {tools.map((tool) => (
            <motion.div key={tool.id} variants={item}>
              <Link href={tool.href}>
                <Card className="h-full transition-all hover:shadow-lg hover:border-primary">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-lg ${tool.color}`}>
                        <tool.icon className="w-6 h-6" />
                      </div>
                      {tool.comingSoon && (
                        <span className="text-xs font-semibold px-2 py-1 bg-muted text-muted-foreground rounded-full">
                          Coming Soon
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{tool.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {tool.description}
                    </p>
                    <div className="flex items-center text-sm font-medium text-primary">
                      Learn more <ArrowRight className="w-4 h-4 ml-2" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}