import { PDFDocument, degrees } from "pdf-lib"

export async function mergePDFs(files: File[]): Promise<Uint8Array> {
  const mergedPdf = await PDFDocument.create()

  for (const file of files) {
    const arrayBuffer = await file.arrayBuffer()
    const pdf = await PDFDocument.load(arrayBuffer)
    const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices())
    copiedPages.forEach((page) => mergedPdf.addPage(page))
  }

  return await mergedPdf.save()
}

export async function splitPDF(file: File, pagesToKeep: number[]): Promise<Uint8Array> {
  const arrayBuffer = await file.arrayBuffer()
  const pdf = await PDFDocument.load(arrayBuffer)
  const newPdf = await PDFDocument.create()

  const indices = pagesToKeep.map((p) => p - 1)
  const copiedPages = await newPdf.copyPages(pdf, indices)
  copiedPages.forEach((page) => newPdf.addPage(page))

  return await newPdf.save()
}

export async function rotatePDF(
  file: File,
  rotations: { pageIndex: number; degrees: number }[]
): Promise<Uint8Array> {
  const arrayBuffer = await file.arrayBuffer()
  const pdf = await PDFDocument.load(arrayBuffer)

  rotations.forEach(({ pageIndex, degrees: deg }) => {
    const page = pdf.getPage(pageIndex)
    page.setRotation(degrees(deg))
  })

  return await pdf.save()
}

export function downloadFile(data: Uint8Array, filename: string) {
const blob = new Blob([data as unknown as BlobPart], { type: "application/pdf" })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}