"use client"

import { useEffect, useState } from "react"
import { createBrowserClient } from "@supabase/ssr"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface JournalSettings {
  issn: string
  journal_name: string
  journal_description: string
}

export default function JournalInfoPage() {
  const [journalData, setJournalData] = useState<JournalSettings | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchJournalSettings = async () => {
      try {
        const supabase = createBrowserClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        )

        const { data, error } = await supabase.from("journal_settings").select("setting_key, setting_value")

        if (error) throw error

        const settings: JournalSettings = {
          issn: "",
          journal_name: "",
          journal_description: "",
        }

        data?.forEach((item) => {
          if (item.setting_key === "issn") settings.issn = item.setting_value
          if (item.setting_key === "journal_name") settings.journal_name = item.setting_value
          if (item.setting_key === "journal_description") settings.journal_description = item.setting_value
        })

        setJournalData(settings)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load journal settings")
      } finally {
        setLoading(false)
      }
    }

    fetchJournalSettings()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Loading journal information...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-destructive">Error: {error}</p>
      </div>
    )
  }

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Journal Information</h1>
          <p className="text-muted-foreground mt-2">Official details and metadata</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Journal Name</CardTitle>
              <CardDescription>Official publication title</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-xl font-semibold">{journalData?.journal_name || "N/A"}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">ISSN</CardTitle>
              <CardDescription>International Standard Serial Number</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-xl font-semibold font-mono">{journalData?.issn || "N/A"}</p>
              <p className="text-sm text-muted-foreground mt-2">Print/Online identifier for the journal</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>About This Journal</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground leading-relaxed">
              {journalData?.journal_description || "No description available"}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
