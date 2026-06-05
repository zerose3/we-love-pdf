"use client"

import { Accordion } from "@/components/ui/accordion"

const faqItems = [
  {
    title: "Is We Love PDF completely free to use?",
    content:
      "Yes! Our core tools are free with a daily limit of 5 files. For unlimited access and larger file sizes, you can upgrade to our Pro plan at any time.",
  },
  {
    title: "Are my files secure when uploaded?",
    content:
      "Absolutely. We use SSL encryption for all file transfers. Your files are processed in secure cloud environments and automatically deleted from our servers after 1 hour. We never share or store your documents permanently.",
  },
  {
    title: "How long are files stored on your servers?",
    content:
      "Files are automatically deleted 1 hour after processing. We recommend downloading your converted files immediately. For Pro users, we offer extended storage options up to 24 hours.",
  },
  {
    title: "What file formats are supported?",
    content:
      "We support PDF, Word (DOC, DOCX), Excel (XLS, XLSX), PowerPoint (PPT, PPTX), JPG, PNG, and many more formats. Our tools handle cross-conversion between all these formats seamlessly.",
  },
  {
    title: "Do I need to create an account?",
    content:
      "No account is required for free users. Simply visit the tool you need and start processing files immediately. Pro users will need an account to manage their subscription and access premium features.",
  },
]

export function FAQ() {
  return (
    <section id="faq" className="py-20 lg:py-32 bg-muted/50">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Everything you need to know about our service
          </p>
        </div>

        <Accordion items={faqItems} />
      </div>
    </section>
  )
}