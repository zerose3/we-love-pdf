import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File | null

    if (!file) {
      return NextResponse.json(
        { error: "File tidak ditemukan" },
        { status: 400 }
      )
    }

    const apiKey = process.env.PDFCO_API_KEY || "wirabintang966@gmail.com_C7oohG0dHpSVdlieYbICOU1uVATw2oXWdghdnDNJckrOBj57mL6w5Xi3UAOMczjY"

    // Step 1: Upload file ke pdf.co untuk dapat temporary URL
    const uploadFormData = new FormData()
    uploadFormData.append("file", file)

    const uploadResponse = await fetch(
      "https://api.pdf.co/v1/file/upload",
      {
        method: "POST",
        headers: {
          "x-api-key": apiKey,
        },
        body: uploadFormData,
      }
    )

    const uploadData = await uploadResponse.json()

    if (uploadData.error || !uploadData.url) {
      return NextResponse.json(
        { error: uploadData.message || "Gagal upload file ke pdf.co" },
        { status: 500 }
      )
    }

    const tempFileUrl = uploadData.url

    // Step 2: Convert DOC to PDF pakai temporary URL
    const convertResponse = await fetch(
      "https://api.pdf.co/v1/pdf/convert/from/doc",
      {
        method: "POST",
        headers: {
          "x-api-key": apiKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: tempFileUrl,
          async: false,
        }),
      }
    )

    const convertData = await convertResponse.json()

    if (convertData.error || !convertData.url) {
      return NextResponse.json(
        { error: convertData.message || "Gagal konversi di pdf.co" },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      url: convertData.url,
      fileName: convertData.name || "converted.pdf",
    })
  } catch (err: any) {
    console.error("API Error:", err)
    return NextResponse.json(
      { error: err?.message || "Server error" },
      { status: 500 }
    )
  }
}