"use client"

import { useState, useCallback } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Split, Loader2, FileText } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { UploadArea } from "@/components/upload-area"
import { splitPDF, downloadFile } from "@/lib/pdf-utils"
import { PDFDocument } from "pdf-lib"

function parsePageRanges(input: string, totalPages: number): number[] {
  const pages = new Set<number>()
  const parts = input.split(",").map((p) => p.trim()).filter(Boolean)

  for (const part of parts) {
    if (part.includes("-")) {
      const [startStr, endStr] = part.split("-")
      const start = parseInt(startStr, 10)
      const end = parseInt(endStr, 10)

      if (!isNaN(start) && !isNaN(end)) {
        for (let i = start; i <= end; i++) {
          if (i >= 1 && i <= totalPages) pages.add(i)
        }
      }
    } else {
      const num = parseInt(part, 10)
      if (!isNaN(num) && num >= 1 && num <= totalPages) {
        pages.add(num)
      }
    }
  }

  return Array.from(pages).sort((a, b) => a - b)
}

export default function SplitPDFPage() {
  const [file, setFile] = useState<File | null>(null)
  const [totalPages, setTotalPages] = useState(0)
  const [pageInput, setPageInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleFilesSelected = useCallback(async (files: File[]) => {
    if (files.length > 0) {
      const selectedFile = files[0]
      setFile(selectedFile)
      setError(null)
      setSuccess(false)
      setPageInput("")

      try {
        const arrayBuffer = await selectedFile.arrayBuffer()
        const pdf = await PDFDocument.load(arrayBuffer)
        setTotalPages(pdf.getPageCount())
      } catch {
        setError("Gagal membaca PDF. Pastikan file valid.")
        setTotalPages(0)
      }
    }
  }, [])

  const handleRemoveFile = useCallback(() => {
    setFile(null)
    setTotalPages(0)
    setPageInput("")
    setError(null)
    setSuccess(false)
  }, [])

  const handleSplit = async () => {
    if (!file || totalPages === 0) {
      setError("Upload PDF terlebih dahulu.")
      return
    }

    if (!pageInput.trim()) {
      setError("Masukkan halaman yang ingin diambil.")
      return
    }

    const pagesToKeep = parsePageRanges(pageInput, totalPages)

    if (pagesToKeep.length === 0) {
      setError("Format halaman tidak valid.")
      return
    }

    if (pagesToKeep.length === totalPages) {
      setError("Semua halaman dipilih. Tidak perlu split.")
      return
    }

    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const result = await splitPDF(file, pagesToKeep)
      downloadFile(result, "split.pdf")
      setSuccess(true)
    } catch (err) {
      setError("Gagal memisahkan PDF. Coba lagi.")
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
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-600 mb-4">
            <Split className="h-8 w-8" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Split PDF</h1>
          <p className="mt-2 text-muted-foreground">
            Ambil halaman tertentu dari PDF dan buat file baru.
          </p>
        </motion.div>

        <div className="space-y-6">
          <UploadArea
            multiple={false}
            maxFiles={1}
            maxSizeMB={50}
            accept=".pdf"
            files={file ? [file] : []}
            onFilesSelected={handleFilesSelected}
            onRemoveFile={handleRemoveFile}
          />

          {file && totalPages > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-xl border border-border bg-card p-6 space-y-4"
            >
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">
                  Total halaman: {totalPages}
                </span>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Halaman yang ingin diambil
                </label>
                <input
                  type="text"
                  value={pageInput}
                  onChange={(e) => setPageInput(e.target.value)}
                  placeholder="Contoh: 1-3, 5, 7-9"
                  className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <p className="text-xs text-muted-foreground">
                  Gunakan tanda hubung untuk range dan koma untuk memisahkan.
                </p>
              </div>

              <Button
                onClick={handleSplit}
                disabled={loading}
                className="w-full bg-primary hover:bg-primary-hover"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Memproses...
                  </>
                ) : (
                  <>
                    <Split className="mr-2 h-4 w-4" />
                    Split PDF
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
              PDF berhasil dipisahkan! File otomatis di-download.
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}