"use client"

import { useState, useCallback } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Image, Download, Loader2, FileText } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { UploadArea } from "@/components/upload-area"
import { downloadFile } from "@/lib/pdf-utils"
import { PDFDocument } from "pdf-lib"

export default function JpgToPdfPage() {
  const [files, setFiles] = useState<File[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleFilesSelected = useCallback((newFiles: File[]) => {
    const imageFiles = newFiles.filter(
      (f) =>
        f.type === "image/jpeg" || f.type === "image/png" || f.type === "image/jpg"
    )
    if (imageFiles.length !== newFiles.length) {
      setError("Hanya file JPG/PNG yang diterima.")
    }
    setFiles(imageFiles)
    setSuccess(false)
  }, [])

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
    setError(null)
    setSuccess(false)
  }

  const handleConvert = async () => {
    if (files.length === 0) {
      setError("Upload gambar terlebih dahulu.")
      return
    }

    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const pdfDoc = await PDFDocument.create()

      for (const file of files) {
        const arrayBuffer = await file.arrayBuffer()
        const uint8Array = new Uint8Array(arrayBuffer)

        let embeddedImage
        if (file.type === "image/png") {
          embeddedImage = await pdfDoc.embedPng(uint8Array)
        } else {
          embeddedImage = await pdfDoc.embedJpg(uint8Array)
        }

        const { width, height } = embeddedImage.size()
        const page = pdfDoc.addPage([width, height])

        page.drawImage(embeddedImage, {
          x: 0,
          y: 0,
          width,
          height,
        })
      }

      const pdfBytes = await pdfDoc.save()
      downloadFile(pdfBytes, "images.pdf")
      setSuccess(true)
    } catch (err) {
      setError("Gagal mengkonversi gambar. Coba lagi.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Home
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-500/10 text-purple-600 mb-4">
            <Image className="h-8 w-8" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">JPG to PDF</h1>
          <p className="mt-2 text-muted-foreground">
            Gabungkan gambar JPG/PNG menjadi file PDF.
          </p>
        </motion.div>

        <div className="space-y-6">
          <UploadArea
            multiple
            maxFiles={20}
            maxSizeMB={10}
            accept="image/jpeg,image/png,image/jpg"
            files={files}
            onFilesSelected={handleFilesSelected}
            onRemoveFile={removeFile}
          />

          {files.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-between rounded-xl border border-border bg-muted/50 p-4"
            >
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-purple-600" />
                <span className="text-sm font-medium">
                  {files.length} gambar dipilih
                </span>
              </div>
              <Button
                onClick={handleConvert}
                disabled={loading}
                className="bg-primary hover:bg-primary-hover"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Mengkonversi...
                  </>
                ) : (
                  <>
                    <Download className="mr-2 h-4 w-4" />
                    Convert to PDF
                  </>
                )}
              </Button>
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600 dark:border-red-900 dark:bg-red-950 dark:text-red-400"
            >
              {error}
            </motion.div>
          )}

          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-600 dark:border-green-900 dark:bg-green-950 dark:text-green-400"
            >
              PDF berhasil dibuat! File otomatis di-download.
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}