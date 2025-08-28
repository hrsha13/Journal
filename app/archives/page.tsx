"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

interface Issue {
  id: string
  volume: number
  issue_number: number
  year: number
  title: string
  description?: string
  publication_date: string
  is_special_issue: boolean
  special_issue_theme?: string
  cover_image_url?: string
  status: "draft" | "published" | "archived"
  article_count: number
  total_pages?: string
}

export default function ArchivesPage() {
  const [issues, setIssues] = useState<Issue[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const { data, error } = await supabase
          .from("issues")
          .select("*")
          .order("year", { ascending: false })
          .order("issue_number", { ascending: false })

        if (error) throw error
        setIssues(data || [])
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchIssues()
  }, [])

  if (loading) return <Loading />
  if (error) return <div className="text-red-600">Error: {error}</div>

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Archives</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {issues.map((issue) => (
          <div key={issue.id} className="border rounded-lg p-4 shadow">
            {issue.cover_image_url && (
              <img
                src={issue.cover_image_url}
                alt={issue.title}
                className="w-full h-48 object-cover rounded"
              />
            )}
            <h2 className="text-xl font-semibold mt-4">{issue.title}</h2>
            <p className="text-gray-600">
              Volume {issue.volume}, Issue {issue.issue_number} ({issue.year})
            </p>
            {issue.description && (
              <p className="mt-2 text-gray-700">{issue.description}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function Loading() {
  return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
    </div>
  )
}
