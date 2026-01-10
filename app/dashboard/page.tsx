"use client"

import { useEffect, useState } from "react"
import { createBrowserClient } from "@supabase/ssr"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface JournalSettings {
  issn?: string
  journal_name?: string
  journal_description?: string
}

export default function DashboardPage() {
  const [settings, setSettings] = useState<JournalSettings | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const supabase = createBrowserClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        )

        const { data, error } = await supabase.from("journal_settings").select("setting_key, setting_value")

        if (error) throw error

        const journalSettings: JournalSettings = {}
        data?.forEach((item) => {
          if (item.setting_key === "issn") journalSettings.issn = item.setting_value
          if (item.setting_key === "journal_name") journalSettings.journal_name = item.setting_value
          if (item.setting_key === "journal_description") journalSettings.journal_description = item.setting_value
        })

        setSettings(journalSettings)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load settings")
      } finally {
        setLoading(false)
      }
    }

    fetchSettings()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Loading journal settings...</p>
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
    <div className="container max-w-6xl mx-auto py-8 px-4">
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Journal Dashboard</h1>
          <p className="text-muted-foreground mt-2">View and manage your journal settings</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* ISSN Card */}
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle className="text-base">ISSN</CardTitle>
              <CardDescription>International Standard Serial Number</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {settings?.issn ? (
                <>
                  <Badge variant="outline" className="font-mono text-lg py-2 px-3">
                    {settings.issn}
                  </Badge>
                  <p className="text-xs text-muted-foreground">Active ISSN assigned to your journal</p>
                </>
              ) : (
                <p className="text-muted-foreground">No ISSN assigned</p>
              )}
            </CardContent>
          </Card>

          {/* Journal Name Card */}
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle className="text-base">Journal Name</CardTitle>
              <CardDescription>Official title</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-semibold">{settings?.journal_name || "Not set"}</p>
            </CardContent>
          </Card>

          {/* Status Card */}
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle className="text-base">Status</CardTitle>
              <CardDescription>Publication status</CardDescription>
            </CardHeader>
            <CardContent>
              <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">Active</Badge>
            </CardContent>
          </Card>
        </div>

        {/* Description Card */}
        {settings?.journal_description && (
          <Card>
            <CardHeader>
              <CardTitle>About This Journal</CardTitle>
              <CardDescription>Journal description and details</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-foreground leading-relaxed">{settings.journal_description}</p>
            </CardContent>
          </Card>
        )}

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Journal Information</CardTitle>
            <CardDescription>Complete metadata</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">ISSN Number</p>
                <p className="font-mono text-lg">{settings?.issn || "Not assigned"}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Journal Title</p>
                <p className="text-lg">{settings?.journal_name || "Not set"}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
