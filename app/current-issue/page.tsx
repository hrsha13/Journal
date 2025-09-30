"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabase"
import { Download, Eye, Calendar, BookOpen, Users, ExternalLink } from "lucide-react"
import Link from "next/link"

export default function CurrentIssuePage() {
  const [currentIssue, setCurrentIssue] = useState<any | null>(null)
  const [articles, setArticles] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchCurrentIssue()
  }, [])

  const fetchCurrentIssue = async () => {
    try {
      // Get the latest published issue
      const { data: issueData, error: issueError } = await supabase
        .from("issues")
        .select("*")
        .eq("status", "published")
        .order("year", { ascending: false })
        .order("volume", { ascending: false })
        .order("issue_number", { ascending: false })
        .limit(1)
        .single()

      if (issueError) {
        console.error("Issue error:", issueError)
        setError("Failed to load current issue")
        return
      }

      setCurrentIssue(issueData)

      // Get articles for this issue
      const { data: articlesData, error: articlesError } = await supabase
        .from("articles")
        .select("*,primary_author:authors(first_name,last_name,affiliation)") // <- no spaces inside ()
        .eq("status", "published")
        .eq("volume", issueData.volume)
        .eq("issue", issueData.issue_number)
        .order("pages")

      if (articlesError) {
        console.error("Articles error:", articlesError)
        setError("Failed to load articles")
        return
      }

      setArticles(articlesData || [])
    } catch (err) {
      console.error("Error fetching current issue:", err)
      setError("An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading current issue...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error || !currentIssue) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4 py-8">
          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-6">
              <p className="text-red-600">{error || "No current issue found"}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Current Issue</h1>
          <p className="text-xl text-gray-600">
            Volume {currentIssue.volume}, Issue {currentIssue.issue_number} - {currentIssue.year}
          </p>
        </div>

        {/* Issue Information */}
        <Card className="mb-8 border-0 shadow-xl bg-gradient-to-r from-blue-50 to-purple-50">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
            <div className="text-center">
              <CardTitle className="text-2xl mb-2">{currentIssue.title}</CardTitle>
              <CardDescription className="text-blue-100 text-lg">{currentIssue.description}</CardDescription>
              <div className="flex justify-center gap-4 mt-4">
                <Badge className="bg-white text-blue-600">Volume {currentIssue.volume}</Badge>
                <Badge className="bg-white text-blue-600">Issue {currentIssue.issue_number}</Badge>
                <Badge className="bg-white text-blue-600">{currentIssue.year}</Badge>
                {currentIssue.is_special_issue && (
                  <Badge className="bg-yellow-400 text-yellow-900">Special Issue</Badge>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="flex items-center justify-center space-x-2">
                <Calendar className="h-5 w-5 text-blue-600" />
                <span>Published: {new Date(currentIssue.publication_date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <BookOpen className="h-5 w-5 text-green-600" />
                <span>{currentIssue.article_count} Articles</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Users className="h-5 w-5 text-purple-600" />
                <span>Pages: {currentIssue.total_pages}</span>
              </div>
            </div>
            <div className="mt-6 text-center">
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                <Download className="h-4 w-4 mr-2" />
                Download Complete Issue PDF
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Articles List */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Articles in This Issue</h2>

          {articles.length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-gray-600">No articles found for this issue.</p>
              </CardContent>
            </Card>
          ) : (
            articles.map((article, index) => (
              <Card
                key={article.id}
                className="hover:shadow-xl transition-all duration-300 border-0 bg-white/90 backdrop-blur"
              >
                <CardHeader className="bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-t-lg">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-lg leading-tight text-white mb-2">{article.title}</CardTitle>
                      <CardDescription className="text-green-100">
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
                          Pages {article.pages} | DOI: {article.doi || "Pending"}
                        </span>
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Badge className="bg-blue-100 text-blue-800 text-xs">
                        {article.article_type.replace("_", " ")}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Abstract</h4>
                    <p className="text-sm text-gray-700 line-clamp-3">{article.abstract}</p>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-sm font-medium text-gray-700">Keywords:</span>
                    {article.keywords.map((keyword, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs border-green-300 text-green-700">
                        {keyword}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white"
                      asChild
                    >
                      <Link href={`/article/${article.id}`}>
                        <Eye className="h-4 w-4 mr-2" />
                        Read Full Text
                      </Link>
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-blue-500 text-blue-600 hover:bg-blue-50 bg-transparent"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download PDF
                    </Button>
                    {article.github_content_url && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-gray-500 text-gray-600 hover:bg-gray-50 bg-transparent"
                        onClick={() => window.open(article.github_content_url, "_blank")}
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View Source
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Issue Statistics */}
        <Card className="mt-12 border-0 shadow-xl bg-gradient-to-r from-purple-50 to-pink-50">
          <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-lg">
            <CardTitle>Issue Statistics</CardTitle>
            <CardDescription className="text-purple-100">Overview of this issue's content and metrics</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">{articles.length}</div>
                <div className="text-sm text-gray-600">Total Articles</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-600 mb-2">
                  {articles.filter((a) => a.article_type === "research_article").length}
                </div>
                <div className="text-sm text-gray-600">Research Articles</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {articles.reduce((sum, article) => sum + (article.download_count || 0), 0)}
                </div>
                <div className="text-sm text-gray-600">Total Downloads</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {new Set(articles.map((a) => a.subject_area)).size}
                </div>
                <div className="text-sm text-gray-600">Subject Areas</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
