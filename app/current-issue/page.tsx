"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download, Eye, Calendar, BookOpen, Users, Sparkles } from "lucide-react"
import { supabase } from "@/lib/supabase"
import type { Issue, Article } from "@/lib/supabase"

export default function CurrentIssuePage() {
  const [currentIssue, setCurrentIssue] = useState<Issue | null>(null)
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [journalName, setJournalName] = useState<string>("SVLNS GDC Multidisciplinary Journal")
  const [journalTagline, setJournalTagline] = useState<string>("")

  useEffect(() => {
    fetchCurrentIssue()
  }, [])

  const fetchCurrentIssue = async () => {
    try {
      setLoading(true)
      setError(null)

      // Fetch settings first to allow explicit overrides
      const { data: settingsData, error: settingsError } = await supabase.from("journal_settings").select("*")

      let overrideVolume: number | undefined
      let overrideIssue: number | undefined

      if (!settingsError && settingsData) {
        const getVal = (k: string) => {
          if (!settingsData || settingsData.length === 0) return undefined
          const first = settingsData[0] as any
          // Handle key/value row schema: (setting_key, setting_value) OR (key, value)
          if (first && (("setting_key" in first && "setting_value" in first) || ("key" in first && "value" in first))) {
            const keyField = "setting_key" in first ? "setting_key" : "key" in first ? "key" : "setting_key"
            const valField = "setting_value" in first ? "setting_value" : "value" in first ? "value" : "setting_value"
            const row = (settingsData as any[]).find((s) => String(s?.[keyField] ?? "").toLowerCase() === k)
            return row?.[valField]
          }
          // Handle single-row schema: columns like journal_name, tagline, etc.
          return (first as any)?.[k]
        }

        const name = getVal("journal_name") || getVal("name") || getVal("title")
        const tagline = getVal("tagline") || getVal("subtitle") || getVal("description")
        if (name && typeof name === "string") setJournalName(name)
        if (tagline && typeof tagline === "string") setJournalTagline(tagline)

        // Optional current issue overrides via settings
        const volStr = getVal("current_volume") || getVal("currentvolume")
        const issStr = getVal("current_issue_number") || getVal("current_issue") || getVal("currentissue")
        if (volStr && !isNaN(Number.parseInt(volStr))) overrideVolume = Number.parseInt(volStr)
        if (issStr && !isNaN(Number.parseInt(issStr))) overrideIssue = Number.parseInt(issStr)

        console.log("[v0] Settings override parsed:", {
          overrideVolume,
          overrideIssue,
          name,
          tagline,
          rawSettingsCount: settingsData.length,
        })
      }

      let issueQuery = supabase.from("issues").select("*")

      if (overrideVolume !== undefined && overrideIssue !== undefined) {
        // If explicit override is configured, fetch that exact record
        issueQuery = issueQuery.eq("volume", overrideVolume).eq("issue_number", overrideIssue).limit(1)
      } else {
        // Otherwise, pick the latest "published" with robust filter + NULLS LAST ordering
        issueQuery = issueQuery
          .or("status.is.null,status.eq.published,status.eq.Published") // case variants + legacy NULL
          .order("year", { ascending: false, nullsFirst: false })
          .order("volume", { ascending: false, nullsFirst: false })
          .order("issue_number", { ascending: false, nullsFirst: false })
          .order("created_at", { ascending: false, nullsFirst: false })
          .limit(1)
      }

      const { data: issueData, error: issueError } = await issueQuery.single()

      if (issueError) {
        console.log("[v0] Issue query error:", issueError)
        setError("Failed to load current issue")
        return
      }

      console.log("[v0] Current issue fetched:", {
        id: issueData?.id,
        volume: issueData?.volume,
        issue: issueData?.issue_number,
        year: issueData?.year,
        status: issueData?.status,
      })

      setCurrentIssue(issueData)

      // Fetch published articles for the selected issue
      const { data: articlesData, error: articlesError } = await supabase
        .from("articles")
        .select(
          `
            *,
            primary_author:authors(first_name,last_name,affiliation)
          `,
        )
        .or("status.is.null,status.eq.published,status.eq.Published")
        .eq("volume", issueData.volume)
        .eq("issue", issueData.issue_number)
        .order("pages", { ascending: true, nullsFirst: false })

      if (articlesError) {
        console.log("[v0] Articles query error:", articlesError)
        setError("Failed to load articles")
        return
      }

      console.log("[v0] Articles fetched:", {
        count: articlesData?.length ?? 0,
        first: articlesData?.[0]?.id,
      })

      setArticles(articlesData || [])
    } catch (error) {
      console.log("[v0] Fetch unexpected error:", (error as any)?.message || error)
      setError("An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }

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

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <Button onClick={fetchCurrentIssue}>Try Again</Button>
          </div>
        </div>
      </div>
    )
  }

  if (!currentIssue) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <p className="text-gray-600">No current issue available</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent">
            Current Issue
          </h1>
          <p className="text-xl text-gray-700">
            Latest published articles from {journalName}
            {journalTagline ? ` — ${journalTagline}` : ""}
          </p>
        </div>

        <Card className="mb-8 border-0 shadow-xl bg-gradient-to-r from-orange-50 to-pink-50">
          <CardHeader className="bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-t-lg">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl text-white">
                  Volume {currentIssue.volume}, Issue {currentIssue.issue_number} ({currentIssue.year})
                </CardTitle>
                <CardDescription className="text-orange-100 text-lg font-medium mt-2">
                  {currentIssue.title}
                </CardDescription>
              </div>
              <div className="flex gap-2">
                {currentIssue.is_special_issue && (
                  <Badge className="bg-yellow-400 text-yellow-900 border-0">Special Issue</Badge>
                )}
                <Badge className="bg-green-400 text-green-900 border-0">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Current
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex items-center space-x-3">
                <Calendar className="h-6 w-6 text-orange-500" />
                <div>
                  <p className="text-sm text-gray-600">Published</p>
                  <p className="font-semibold">
                    {currentIssue.publication_date
                      ? new Date(currentIssue.publication_date).toLocaleDateString()
                      : "TBD"}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <BookOpen className="h-6 w-6 text-pink-500" />
                <div>
                  <p className="text-sm text-gray-600">Articles</p>
                  <p className="font-semibold">{currentIssue.article_count}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Users className="h-6 w-6 text-purple-500" />
                <div>
                  <p className="text-sm text-gray-600">Pages</p>
                  <p className="font-semibold">{currentIssue.total_pages || "TBD"}</p>
                </div>
              </div>
            </div>
            {currentIssue.description && (
              <div className="mt-4">
                <p className="text-gray-700">{currentIssue.description}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <section>
          <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Published Articles
          </h2>

          {articles.length === 0 ? (
            <Card className="text-center p-8">
              <p className="text-gray-600">No articles available for this issue yet.</p>
            </Card>
          ) : (
            <div className="space-y-6">
              {articles.map((article, index) => (
                <Card
                  key={article.id}
                  className="hover:shadow-xl transition-all duration-300 border-0 bg-white/90 backdrop-blur"
                >
                  <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-lg">
                    <CardTitle className="text-lg leading-tight text-white">{article.title}</CardTitle>
                    <CardDescription className="text-blue-100">
                      <span className="font-medium">
                        {article.primary_author
                          ? `${article.primary_author.first_name} ${article.primary_author.last_name}`
                          : "Unknown Author"}
                      </span>
                      {article.co_authors && article.co_authors.length > 0 && (
                        <span>, {article.co_authors.map((author: any) => author.name).join(", ")}</span>
                      )}
                      <br />
                      <span className="text-sm">
                        {article.pages && `pp. ${article.pages}`}
                        {article.doi && ` | DOI: ${article.doi}`}
                      </span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <p className="text-sm text-gray-700 mb-4 line-clamp-3">{article.abstract}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {article.keywords.map((keyword, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs border-purple-300 text-purple-700">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Read Full Text
                      </Button>

                      {article.manuscript_file_url && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-purple-500 text-purple-600 hover:bg-purple-50 bg-transparent"
                          onClick={() => window.open(article.manuscript_file_url, "_blank")}
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download PDF
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
