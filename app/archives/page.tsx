"use client"

import { useEffect, useState } from "react"
import { supabase, Issue } from "@/lib/supabase"

export default function ArchivesPage() {
  const [issues, setIssues] = useState<Issue[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchIssues() {
      try {
        const { data, error } = await supabase
          .from("issues")
          .select("*")
          .order("year", { ascending: false })
          .order("volume", { ascending: false })

        if (error) throw error
        setIssues(data || [])
      } catch (err: any) {
        console.error("Error fetching issues:", err.message)
        setError("Failed to load archives. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchIssues()
  }, [])

  if (loading) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Archives</h1>
        <p>Loading archives...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Archives</h1>
        <p className="text-red-500">{error}</p>
      </div>
    )
  }

  if (issues.length === 0) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Archives</h1>
        <p>No published issues found.</p>
      </div>
    )
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Archives</h1>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {issues.map((issue) => (
          <div
            key={issue.id}
            className="border rounded-lg p-4 shadow hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold">
              Volume {issue.volume}, Issue {issue.issue_number} ({issue.year})
            </h2>
            {issue.title && (
              <p className="text-gray-600 mt-1">{issue.title}</p>
            )}
            {issue.cover_image_url && (
              <img
                src={issue.cover_image_url}
                alt={`${issue.title} cover`}
                className="mt-3 rounded"
              />
            )}
            <p className="text-sm text-gray-500 mt-2">
              Published: {new Date(issue.publication_date).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
