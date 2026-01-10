import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
// Import with fallbacks or conditionals
import dynamic from "next/dynamic"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SVLNS GDC Multidisciplinary Journal",
  description:
    "A peer-reviewed, open-access journal dedicated to advancing multidisciplinary research and fostering academic excellence across diverse fields of study.",
  generator: 'v0.dev'
}

// Dynamically import components with fallbacks
const Navigation = dynamic(
  () => import("@/components/navigation").catch(() => () => (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-900">SVLNS GDC Journal</h1>
      </div>
    </header>
  )),
  { ssr: false }
)

const Footer = dynamic(
  () => import("@/components/footer").catch(() => () => (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p>© {new Date().getFullYear()} SVLNS GDC Multidisciplinary Journal</p>
      </div>
    </footer>
  )),
  { ssr: false }
)

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <Navigation />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
