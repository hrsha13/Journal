"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Download, Eye, Calendar, BookOpen, Sparkles } from "lucide-react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import type { Database } from "@/lib/database.types"; // adjust type import if needed

type Issue = Database["public"]["Tables"]["issues"]["Row"];
type Article = Database["public"]["Tables"]["articles"]["Row"];

export default function ArchivesPage() {
  const supabase = createClientComponentClient<Database>();

  const [issues, setIssues] = useState<Issue[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredIssues, setFilteredIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState("all");
  const [selectedSubject, setSelectedSubject] = useState("all");

  useEffect(() => {
    fetchArchiveData();
  }, []);

  useEffect(() => {
    let filtered = issues;

    if (searchTerm) {
      filtered = filtered.filter(
        (issue) =>
          issue.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          issue.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedYear !== "all") {
      filtered = filtered.filter((issue) => issue.year?.toString() === selectedYear);
    }

    setFilteredIssues(filtered);
  }, [searchTerm, selectedYear, issues]);

  const fetchArchiveData = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log("Fetching issues...");
      const { data: issuesData, error: issuesError } = await supabase
        .from("issues")
        .select("*")
        .eq("status", "published")
        .order("year", { ascending: false })
        .order("volume", { ascending: false })
        .order("issue_number", { ascending: false });

      if (issuesError) {
        console.error("Issues fetch error:", issuesError);
        setError("Failed to load issues from database.");
        return;
      }

      setIssues(issuesData || []);
      setFilteredIssues(issuesData || []);

      console.log("Fetching articles...");
      const { data: articlesData, error: articlesError } = await supabase
        .from("articles")
        .select("*") // keep simple, add relations later if needed
        .eq("status", "published")
        .order("publication_date", { ascending: false });

      if (articlesError) {
        console.error("Articles fetch error:", articlesError);
      } else {
        setArticles(articlesData || []);
      }
    } catch (error) {
      console.error("Unexpected fetch error:", error);
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const years = Array.from(new Set(issues.map((issue) => issue.year))).sort((a, b) => Number(b) - Number(a));
  const subjects = Array.from(new Set(articles.map((article) => article.subject_area))).sort();

  if (loading) {
    return null; // handled by loading.tsx
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <Button onClick={fetchArchiveData}>Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent">
            Journal Archives
          </h1>
          <p className="text-xl text-gray-700">
            Complete collection of published issues and articles with full-text access
          </p>
        </div>

        {/* Search and Filter */}
        <Card className="mb-8 border-0 shadow-xl bg-white/90 backdrop-blur">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center space-x-2">
              <Search className="h-6 w-6" />
              <span>Search Archives</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-3 gap-4">
              <Input
                placeholder="Search issues, articles, authors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border-purple-200 focus:border-purple-500"
              />
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="border-purple-200 focus:border-purple-500">
                  <SelectValue placeholder="Select Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Years</SelectItem>
                  {years.map((year) => (
                    <SelectItem key={year} value={String(year)}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger className="border-purple-200 focus:border-purple-500">
                  <SelectValue placeholder="Subject Area" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subjects</SelectItem>
                  {subjects.map((subject) => (
                    <SelectItem key={subject || "none"} value={subject || ""}>
                      {subject || "Unknown"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Render Issues */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
            Published Issues
          </h2>
          {filteredIssues.length === 0 ? (
            <Card className="text-center p-8">
              <p className="text-gray-600">No issues found matching your criteria.</p>
            </Card>
          ) : (
            filteredIssues.map((issue) => (
              <Card
                key={issue.id}
                className="hover:shadow-2xl transition-all duration-300 border-0 bg-gradient-to-r from-orange-50 to-pink-50 mb-6"
              >
                <CardHeader className="bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-t-lg">
                  <CardTitle className="text-xl">
                    Volume {issue.volume}, Issue {issue.issue_number} ({issue.year})
                  </CardTitle>
                  <CardDescription className="text-orange-100">{issue.title}</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  {issue.description && <p className="text-gray-700 mb-4">{issue.description}</p>}
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-orange-500" />
                      <span>Published: {new Date(issue.publication_date).toLocaleDateString()}</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <BookOpen className="h-4 w-4 text-pink-500" />
                      <span>{issue.article_count} Articles</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            ))
          )}
        </section>
      </div>
    </div>
  );
}
