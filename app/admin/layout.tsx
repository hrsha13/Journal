import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SVLNS GDC Multidisciplinary Journal",
  description: "A peer-reviewed, open-access journal",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50`}>
        {/* No navigation */}
        <main>{children}</main>
      </body>
    </html>
  )
}
