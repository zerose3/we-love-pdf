"use client"

import { useState, useCallback } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Download, Loader2, FileType, FileText, CheckCircle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { UploadArea } from "@/components/upload-area"

interface FileStatus {
  file: File
  status: "pending" | "converting" | "done" | "error"
  message?: string
}

export default function WordToPDFPage() {
  const [files, setFiles] = useState<File[]>([])
  const [fileStatuses, setFileStatuses] = useState<FileStatus[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFilesSelected = useCallback((newFiles: File[]) => {
    const validFiles = newFiles.filter((f) => {
      const ext = f.name.toLowerCase()
      return ext.endsWith(".docx") || ext.endsWith(".doc")
    })

    if (validFiles.length !== newFiles.length) {
      setError("Beberapa file ditolak. Hanya .docx/.doc yang diterima.")
    } else {
      setError(null)
    }

    setFiles((prev) => {
      const combined = [...prev, ...validFiles]
      return combined.slice(0, 20) // max 20
    })
    setFileStatuses((prev) => [
      ...prev,
      ...validFiles.map((f) => ({ file: f, status: "pending" as const })),
    ])
  }, [])

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
    setFileStatuses((prev) => prev.filter((_, i) => i !== index))
    setError(null)
  }

  const convertFile = async (file: File, index: number) => {
    setFileStatuses((prev) =>
      prev.map((fs, i) => (i === index ? { ...fs, status: "converting" } : fs))
    )

    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/convert-word", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (!response.ok || data.error) {
        throw new Error(data.error || "Gagal konversi")
      }

      // Download PDF
      const pdfResponse = await fetch(data.url)
      const pdfBlob = await pdfResponse.blob()
      const url = URL.createObjectURL(pdfBlob)

      const link = document.createElement("a")
      link.href = url
      link.download = data.fileName || file.name.replace(/\.docx?$/i, ".pdf")
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)

      setFileStatuses((prev) =>
        prev.map((fs, i) => (i === index ? { ...fs, status: "done" } : fs))
      )
    } catch (err: any) {
      console.error("Convert error:", err)
      setFileStatuses((prev) =>
        prev.map((fs, i) =>
          i === index ? { ...fs, status: "error", message: err?.message } : fs
        )
      )
    }
  }

  const handleConvertAll = async () => {
    if (files.length === 0) {
      setError("Upload file Word terlebih dahulu.")
      return
    }

    setLoading(true)
    setError(null)

    for (let i = 0; i < files.length; i++) {
      await convertFile(files[i], i)
    }

    setLoading(false)
  }

  const allDone = fileStatuses.length > 0 && fileStatuses.every((fs) => fs.status === "done")

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
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-600 mb-4">
            <FileType className="h-8 w-8" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Word to PDF</h1>
          <p className="mt-2 text-muted-foreground">
            Konversi hingga 20 file Word (.docx) ke PDF sekaligus.
          </p>
        </motion.div>

        <div className="space-y-6">
          <UploadArea
            multiple
            maxFiles={20}
            maxSizeMB={500}
            accept=".docx,.doc"
            files={files}
            onFilesSelected={handleFilesSelected}
            onRemoveFile={removeFile}
          />

          {files.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-3"
            >
              <div className="flex items-center justify-between rounded-xl border border-border bg-muted/50 p-4">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-blue-600" />
                  <span className="text-sm font-medium">
                    {files.length} file dipilih
                  </span>
                </div>
                <Button
                  onClick={handleConvertAll}
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
                      Convert All
                    </>
                  )}
                </Button>
              </div>

              {fileStatuses.length > 0 && (
                <div className="space-y-2">
                  {fileStatuses.map((fs, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-lg border border-border bg-card p-3 text-sm"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <FileText className="h-4 w-4 shrink-0 text-muted-foreground" />
                        <span className="truncate max-w-[200px] sm:max-w-xs">
                          {fs.file.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        {fs.status === "pending" && (
                          <span className="text-xs text-muted-foreground">Menunggu</span>
                        )}
                        {fs.status === "converting" && (
                          <Loader2 className="h-4 w-4 animate-spin text-primary" />
                        )}
                        {fs.status === "done" && (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        )}
                        {fs.status === "error" && (
                          <span className="text-xs text-red-500">Gagal</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {allDone && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-600 dark:border-green-900 dark:bg-green-950 dark:text-green-400"
                >
                  Semua file berhasil dikonversi! PDF otomatis di-download.
                </motion.div>
              )}
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
        </div>
      </div>
    </div>
  )
}