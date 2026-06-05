"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Merge, Download, Loader2, FileText } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { UploadArea } from "@/components/upload-area"
import { mergePDFs, downloadFile } from "@/lib/pdf-utils"

export default function MergePDFPage() {
  const [files, setFiles] = useState<File[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleMerge = async () => {
    if (files.length < 2) {
      setError("Minimal 2 file PDF untuk digabung.")
      return
    }

    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      console.log("Starting merge with files:", files.map(f => f.name))
      const merged = await mergePDFs(files)
      console.log("Merge successful, size:", merged.length)
      downloadFile(merged, "merged.pdf")
      setSuccess(true)
    } catch (err: any) {
      console.error("Merge error:", err)
      const errorMessage = err?.message || "Unknown error"
      setError(`Gagal menggabungkan PDF: ${errorMessage}`)
    } finally {
      setLoading(false)
    }
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
    setError(null)
    setSuccess(false)
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
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-4">
            <Merge className="h-8 w-8" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Merge PDF</h1>
          <p className="mt-2 text-muted-foreground">
            Gabungkan beberapa file PDF menjadi satu.
          </p>
        </motion.div>

        <div className="space-y-6">
          <UploadArea
            multiple
            maxFiles={10}
            maxSizeMB={50}
            accept=".pdf"
            files={files}
            onFilesSelected={setFiles}
            onRemoveFile={removeFile}
          />

          {files.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-between rounded-xl border border-border bg-muted/50 p-4"
            >
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">
                  {files.length} file dipilih
                </span>
              </div>
              <Button
                onClick={handleMerge}
                disabled={loading || files.length < 2}
                className="bg-primary hover:bg-primary-hover"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Menggabungkan...
                  </>
                ) : (
                  <>
                    <Merge className="mr-2 h-4 w-4" />
                    Merge PDF
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
              PDF berhasil digabung! File otomatis di-download.
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}