"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"

export default function LoadingIssuePage() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate fetch or use real fetch
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading current issue...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-lg font-medium text-gray-700">Data loaded successfully!</p>
    </div>
  )
}
