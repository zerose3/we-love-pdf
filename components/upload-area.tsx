"use client"

import { useCallback, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Upload, File, X, FileText } from "lucide-react"
import { cn } from "@/lib/utils"

interface UploadAreaProps {
  accept?: string
  multiple?: boolean
  maxFiles?: number
  maxSizeMB?: number
  onFilesSelected: (files: File[]) => void
  files: File[]
  onRemoveFile?: (index: number) => void
}

export function UploadArea({
  accept = ".pdf",
  multiple = false,
  maxFiles = 10,
  maxSizeMB = 50,
  onFilesSelected,
  files,
  onRemoveFile,
}: UploadAreaProps) {
  const [isDragOver, setIsDragOver] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFiles = useCallback(
    (fileList: FileList | null) => {
      setError(null)
      if (!fileList) return

      const newFiles = Array.from(fileList)
      const validFiles: File[] = []

      for (const file of newFiles) {
        if (file.size > maxSizeMB * 1024 * 1024) {
          setError(`File ${file.name} terlalu besar. Maksimal ${maxSizeMB}MB.`)
          continue
        }
        validFiles.push(file)
      }

      if (!multiple) {
        onFilesSelected(validFiles.slice(0, 1))
      } else {
        const total = files.length + validFiles.length
        if (total > maxFiles) {
          setError(`Maksimal ${maxFiles} file.`)
          onFilesSelected([...files, ...validFiles.slice(0, maxFiles - files.length)])
        } else {
          onFilesSelected([...files, ...validFiles])
        }
      }
    },
    [files, maxFiles, maxSizeMB, multiple, onFilesSelected]
  )

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const onDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragOver(false)
      handleFiles(e.dataTransfer.files)
    },
    [handleFiles]
  )

  return (
    <div className="w-full">
      <div
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={cn(
          "relative rounded-2xl border-2 border-dashed p-10 transition-all cursor-pointer text-center",
          isDragOver
            ? "border-primary bg-primary/5"
            : "border-border bg-muted/50 hover:border-primary/50 hover:bg-muted"
        )}
      >
        <input
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={(e) => handleFiles(e.target.files)}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div className="flex flex-col items-center gap-3 pointer-events-none">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Upload className="h-7 w-7" />
          </div>
          <div>
            <p className="font-medium text-foreground">
              Drag & drop file di sini
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              atau klik untuk browse (max {maxSizeMB}MB)
            </p>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-3 text-sm text-red-500"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>

      {files.length > 0 && (
        <div className="mt-6 space-y-2">
          {files.map((file, index) => (
            <motion.div
              key={`${file.name}-${index}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center justify-between rounded-xl border border-border bg-card p-3"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <FileText className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-foreground truncate max-w-[200px] sm:max-w-xs">
                    {file.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              {onRemoveFile && (
                <button
                  onClick={() => onRemoveFile(index)}
                  className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}