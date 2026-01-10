import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admin Portal - SVLNS GDC Journal",
  description: "Administrative interface for managing the SVLNS GDC Multidisciplinary Journal",
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Portal</h1>
              <p className="text-sm text-gray-600">SVLNS GDC Multidisciplinary Journal Management</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">Administrator</p>
                <p className="text-xs text-gray-500">svlns.gdc@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {children}
    </div>
  )
}
