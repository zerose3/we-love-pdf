"use client"

import { useState, useCallback } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, RotateCw, RotateCcw, ArrowDown, Download, Loader2 } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { UploadArea } from "@/components/upload-area"
import { rotatePDF, downloadFile } from "@/lib/pdf-utils"
import { PDFDocument } from "pdf-lib"

export default function RotatePDFPage() {
  const [file, setFile] = useState<File | null>(null)
  const [totalPages, setTotalPages] = useState(0)
  const [rotations, setRotations] = useState<Record<number, number>>({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleFilesSelected = useCallback(async (files: File[]) => {
    if (files.length > 0) {
      const selectedFile = files[0]
      setFile(selectedFile)
      setError(null)
      setSuccess(false)
      setRotations({})

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
    setRotations({})
    setError(null)
    setSuccess(false)
  }, [])

  const rotatePage = (pageIndex: number, deg: number) => {
    setRotations((prev) => ({
      ...prev,
      [pageIndex]: ((prev[pageIndex] || 0) + deg) % 360,
    }))
  }

  const handleRotate = async () => {
    if (!file || totalPages === 0) {
      setError("Upload PDF terlebih dahulu.")
      return
    }

    const rotationEntries = Object.entries(rotations)
      .filter(([_, deg]) => deg !== 0)
      .map(([pageIndex, degrees]) => ({
        pageIndex: parseInt(pageIndex, 10),
        degrees,
      }))

    if (rotationEntries.length === 0) {
      setError("Pilih halaman dan rotasi terlebih dahulu.")
      return
    }

    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const result = await rotatePDF(file, rotationEntries)
      downloadFile(result, "rotated.pdf")
      setSuccess(true)
    } catch (err) {
      setError("Gagal memutar PDF. Coba lagi.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
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
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-500/10 text-yellow-600 mb-4">
            <RotateCw className="h-8 w-8" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Rotate PDF</h1>
          <p className="mt-2 text-muted-foreground">
            Putar halaman PDF sesuai kebutuhan.
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
              className="space-y-4"
            >
              <div className="text-sm font-medium text-center text-muted-foreground">
                Total halaman: {totalPages}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {Array.from({ length: totalPages }).map((_, index) => {
                  const currentRotation = rotations[index] || 0
                  return (
                    <div
                      key={index}
                      className="rounded-xl border border-border bg-card p-4 text-center space-y-3"
                    >
                      <div className="text-xs font-medium text-muted-foreground">
                        Halaman {index + 1}
                      </div>
                      <div
                        className="mx-auto flex h-16 w-12 items-center justify-center rounded border border-border bg-muted text-muted-foreground"
                        style={{ transform: `rotate(${currentRotation}deg)` }}
                      >
                        <span className="text-xs font-bold">{index + 1}</span>
                      </div>
                      <div className="flex justify-center gap-1">
                        <button
                          onClick={() => rotatePage(index, -90)}
                          className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                          title="Rotate 90° CCW"
                        >
                          <RotateCcw className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => rotatePage(index, 180)}
                          className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                          title="Rotate 180°"
                        >
                          <ArrowDown className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => rotatePage(index, 90)}
                          className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                          title="Rotate 90° CW"
                        >
                          <RotateCw className="h-4 w-4" />
                        </button>
                      </div>
                      {currentRotation !== 0 && (
                        <div className="text-xs text-primary font-medium">
                          {currentRotation}°
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>

              <Button
                onClick={handleRotate}
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
                    <Download className="mr-2 h-4 w-4" />
                    Apply & Download
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
              PDF berhasil diputar! File otomatis di-download.
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}