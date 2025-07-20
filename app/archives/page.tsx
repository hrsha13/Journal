import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Download, Eye, Calendar, BookOpen, Sparkles } from "lucide-react"

const archiveData = [
  {
    volume: 1,
    issue: 1,
    year: 2024,
    title: "Inaugural Issue: Foundations of Multidisciplinary Research",
    publishDate: "March 2024",
    articles: 11,
    pages: "1-156",
    specialIssue: true,
    coverImage: "/placeholder.svg?height=200&width=150",
  },
]

const featuredArticles = [
  {
    title: "Multidisciplinary Research: Bridging Academic Boundaries in the 21st Century",
    authors: "Dr. Rajesh Kumar Sharma, Dr. Priya Patel",
    volume: 1,
    issue: 1,
    pages: "1-18",
    doi: "10.1234/svlns.2024.1.1.001",
    abstract:
      "This foundational article explores the importance of multidisciplinary research approaches in addressing complex contemporary challenges...",
    keywords: ["Multidisciplinary Research", "Academic Collaboration", "Research Methodology", "Higher Education"],
  },
  {
    title: "Coastal Andhra Pradesh: Environmental and Social Dynamics",
    authors: "Dr. Sunita Rao, Dr. Venkata Rao",
    volume: 1,
    issue: 1,
    pages: "19-35",
    doi: "10.1234/svlns.2024.1.1.002",
    abstract:
      "An comprehensive analysis of the environmental and social factors shaping coastal Andhra Pradesh, with focus on Bheemunipatanam region...",
    keywords: ["Coastal Studies", "Environmental Science", "Social Dynamics", "Andhra Pradesh"],
  },
  {
    title: "Educational Innovation in Government Degree Colleges: A Case Study",
    authors: "Dr. Krishna Murthy, Dr. Lakshmi Devi",
    volume: 1,
    issue: 1,
    pages: "36-52",
    doi: "10.1234/svlns.2024.1.1.003",
    abstract:
      "This study examines innovative educational practices in government degree colleges, drawing insights from SVLNS GDC's experience...",
    keywords: ["Educational Innovation", "Government Colleges", "Higher Education", "Teaching Methods"],
  },
]

export default function ArchivesPage() {
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
          <Badge className="mt-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0">
            🎉 Inaugural Issue Available
          </Badge>
        </div>

        {/* Search and Filter Section */}
        <Card className="mb-8 border-0 shadow-xl bg-white/90 backdrop-blur">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center space-x-2">
              <Search className="h-6 w-6" />
              <span>Search Archives</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <Input
                  placeholder="Search articles, authors, keywords..."
                  className="w-full border-purple-200 focus:border-purple-500"
                />
              </div>
              <Select>
                <SelectTrigger className="border-purple-200 focus:border-purple-500">
                  <SelectValue placeholder="Select Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="all">All Years</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="border-purple-200 focus:border-purple-500">
                  <SelectValue placeholder="Subject Area" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subjects</SelectItem>
                  <SelectItem value="sciences">Sciences</SelectItem>
                  <SelectItem value="social">Social Sciences</SelectItem>
                  <SelectItem value="humanities">Humanities</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="mt-4">
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Published Issues */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
            Published Issues
          </h2>
          <div className="grid md:grid-cols-1 gap-6">
            {archiveData.map((issue, index) => (
              <Card
                key={index}
                className="hover:shadow-2xl transition-all duration-300 border-0 bg-gradient-to-r from-orange-50 to-pink-50"
              >
                <CardHeader className="bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-t-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl text-white">
                        Volume {issue.volume}, Issue {issue.issue} ({issue.year})
                      </CardTitle>
                      <CardDescription className="text-orange-100 text-base font-medium mt-1">
                        {issue.title}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      {issue.specialIssue && (
                        <Badge className="bg-yellow-400 text-yellow-900 border-0">Special Issue</Badge>
                      )}
                      <Badge className="bg-green-400 text-green-900 border-0">
                        <Sparkles className="h-3 w-3 mr-1" />
                        First Issue
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex space-x-4">
                    <img
                      src={issue.coverImage || "/placeholder.svg"}
                      alt={`Volume ${issue.volume} Issue ${issue.issue} Cover`}
                      className="w-20 h-28 object-cover rounded border-2 border-orange-200"
                    />
                    <div className="flex-1">
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-orange-500" />
                          <span>Published: {issue.publishDate}</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <BookOpen className="h-4 w-4 text-pink-500" />
                          <span>{issue.articles} Articles</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <span className="text-gray-600">Pages: {issue.pages}</span>
                        </li>
                      </ul>
                      <div className="mt-4 flex space-x-2">
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View Issue
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-orange-500 text-orange-600 hover:bg-orange-50 bg-transparent"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download PDF
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Featured Articles */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Featured Articles from Inaugural Issue
          </h2>
          <div className="space-y-6">
            {featuredArticles.map((article, index) => (
              <Card
                key={index}
                className="hover:shadow-xl transition-all duration-300 border-0 bg-white/90 backdrop-blur"
              >
                <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-lg">
                  <CardTitle className="text-lg leading-tight text-white">{article.title}</CardTitle>
                  <CardDescription className="text-blue-100">
                    <span className="font-medium">{article.authors}</span>
                    <br />
                    <span className="text-sm">
                      Vol. {article.volume}, Issue {article.issue}, pp. {article.pages} | DOI: {article.doi}
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
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-purple-500 text-purple-600 hover:bg-purple-50 bg-transparent"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download PDF
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Archive Statistics */}
        <Card className="mb-8 border-0 shadow-xl bg-gradient-to-r from-green-50 to-blue-50">
          <CardHeader className="bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-t-lg">
            <CardTitle>Archive Statistics</CardTitle>
            <CardDescription className="text-green-100">
              Overview of published content and journal metrics
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">1</div>
                <div className="text-sm text-gray-600">Issue Published</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">11</div>
                <div className="text-sm text-gray-600">Total Articles</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">156</div>
                <div className="text-sm text-gray-600">Total Pages</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">18</div>
                <div className="text-sm text-gray-600">Contributing Authors</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Archival Policy */}
        <Card className="border-0 shadow-xl bg-white/90 backdrop-blur">
          <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-t-lg">
            <CardTitle>Archival Policy</CardTitle>
            <CardDescription className="text-indigo-100">
              Long-term preservation and access to published content
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3 text-indigo-700">Digital Preservation</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Permanent digital archiving in multiple formats</li>
                  <li>• Regular backup and migration procedures</li>
                  <li>• Integration with national repositories</li>
                  <li>• LOCKSS (Lots of Copies Keep Stuff Safe) participation</li>
                  <li>• DOI assignment for permanent identification</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-purple-700">Access Guarantee</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Perpetual open access to all published content</li>
                  <li>• No paywall or subscription barriers</li>
                  <li>• Multiple download formats (PDF, HTML, XML)</li>
                  <li>• Mobile-friendly responsive design</li>
                  <li>• Search engine optimization for discoverability</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
