import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/navbar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "We Love PDF - All Your PDF Tools in One Place",
  description:
    "Convert, Compress, Merge, Split and Edit PDF files online for free. Fast, secure, and easy to use PDF tools.",
  keywords: [
    "PDF converter",
    "PDF tools",
    "PDF to Word",
    "PDF compressor",
    "merge PDF",
    "split PDF",
    "online PDF editor",
  ],
  authors: [{ name: "We Love PDF" }],
  openGraph: {
    title: "We Love PDF - All Your PDF Tools in One Place",
    description: "Free online PDF tools for conversion, compression, merging and more.",
    type: "website",
  },
  icons: {
    icon: "/logo.jpg",
    shortcut: "/logo.jpg",
    apple: "/logo.jpg",
  },
}


export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}