"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, User, Building2, BookOpen, Search, GraduationCap, Award } from "lucide-react"

interface Faculty {
  id: string
  first_name: string
  last_name: string
  email: string
  department: string
  position: string
  expertise_areas: string[]
  research_interests: string
  publications_count: number
  experience_years: number
  phone?: string
  office_location?: string
}

export default function FacultyResearchPage() {
  const [faculty, setFaculty] = useState<Faculty[]>([])
  const [filteredFaculty, setFilteredFaculty] = useState<Faculty[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("all")

  useEffect(() => {
    // Mock data for faculty research profiles
    const mockFaculty: Faculty[] = [
      {
        id: "1",
        first_name: "Dr. P.",
        last_name: "Surekha",
        email: "principal@svlnsgdc.ac.in",
        department: "Administration",
        position: "Principal",
        expertise_areas: ["Mathematics", "Academic Administration", "Higher Education Policy"],
        research_interests:
          "Educational policy development, institutional governance, and quality assurance in higher education. Focus on rural education development and community engagement.",
        publications_count: 25,
        experience_years: 20,
        phone: "8247685902",
        office_location: "Principal's Office",
      },
      {
        id: "2",
        first_name: "Dr. K.",
        last_name: "Ramesh",
        email: "ramesh@svlnsgdc.ac.in",
        department: "Physics",
        position: "Professor & Head",
        expertise_areas: ["Applied Physics", "Condensed Matter Physics", "Materials Science"],
        research_interests:
          "Nanomaterials synthesis and characterization, semiconductor physics, and renewable energy applications. Special focus on solar cell materials and coastal environmental physics.",
        publications_count: 42,
        experience_years: 18,
        office_location: "Physics Department, Room 201",
      },
      {
        id: "3",
        first_name: "Dr. M.",
        last_name: "Lakshmi",
        email: "lakshmi@svlnsgdc.ac.in",
        department: "Chemistry",
        position: "Associate Professor",
        expertise_areas: ["Analytical Chemistry", "Environmental Chemistry", "Marine Chemistry"],
        research_interests:
          "Water quality analysis of coastal regions, heavy metal contamination studies, and development of eco-friendly analytical methods. Research on Bay of Bengal water chemistry.",
        publications_count: 38,
        experience_years: 15,
        office_location: "Chemistry Lab, Block A",
      },
      {
        id: "4",
        first_name: "Dr. S.",
        last_name: "Prasad",
        email: "prasad@svlnsgdc.ac.in",
        department: "Botany",
        position: "Professor",
        expertise_areas: ["Plant Ecology", "Coastal Botany", "Biodiversity Conservation"],
        research_interests:
          "Coastal vegetation studies, mangrove ecosystem conservation, and plant adaptation mechanisms in saline environments. Focus on indigenous plant species of Andhra Pradesh coast.",
        publications_count: 35,
        experience_years: 16,
        office_location: "Botany Department, Herbarium",
      },
      {
        id: "5",
        first_name: "Dr. V.",
        last_name: "Rao",
        email: "vrao@svlnsgdc.ac.in",
        department: "Zoology",
        position: "Associate Professor",
        expertise_areas: ["Marine Biology", "Coastal Ecology", "Fisheries Science"],
        research_interests:
          "Marine biodiversity of Bay of Bengal, fish population dynamics, and impact of climate change on coastal marine ecosystems. Collaborative research with local fishing communities.",
        publications_count: 31,
        experience_years: 14,
        office_location: "Zoology Lab, Block B",
      },
      {
        id: "6",
        first_name: "Dr. G.",
        last_name: "Krishna",
        email: "krishna@svlnsgdc.ac.in",
        department: "Mathematics",
        position: "Professor",
        expertise_areas: ["Applied Mathematics", "Statistics", "Mathematical Modeling"],
        research_interests:
          "Statistical analysis of environmental data, mathematical modeling of coastal processes, and operations research applications in rural development projects.",
        publications_count: 28,
        experience_years: 17,
        office_location: "Mathematics Department, Room 105",
      },
      {
        id: "7",
        first_name: "Dr. R.",
        last_name: "Devi",
        email: "rdevi@svlnsgdc.ac.in",
        department: "English",
        position: "Associate Professor",
        expertise_areas: ["English Literature", "Linguistics", "Communication Studies"],
        research_interests:
          "Contemporary Indian English literature, sociolinguistics of coastal communities, and effective communication strategies in multilingual academic environments.",
        publications_count: 22,
        experience_years: 12,
        office_location: "English Department, Room 301",
      },
      {
        id: "8",
        first_name: "Dr. N.",
        last_name: "Kumar",
        email: "nkumar@svlnsgdc.ac.in",
        department: "Telugu",
        position: "Professor",
        expertise_areas: ["Telugu Literature", "Regional Studies", "Cultural Heritage"],
        research_interests:
          "Classical and modern Telugu literature, oral traditions of coastal Andhra Pradesh, and preservation of regional cultural heritage through digital documentation.",
        publications_count: 33,
        experience_years: 19,
        office_location: "Telugu Department, Room 205",
      },
      {
        id: "9",
        first_name: "Dr. P.",
        last_name: "Reddy",
        email: "preddy@svlnsgdc.ac.in",
        department: "History",
        position: "Associate Professor",
        expertise_areas: ["Regional History", "Archaeology", "Cultural Studies"],
        research_interests:
          "Historical significance of Bheemunipatnam port, archaeological studies of coastal Andhra Pradesh, and documentation of local historical monuments and traditions.",
        publications_count: 26,
        experience_years: 13,
        office_location: "History Department, Room 102",
      },
      {
        id: "10",
        first_name: "Dr. A.",
        last_name: "Sharma",
        email: "asharma@svlnsgdc.ac.in",
        department: "Economics",
        position: "Professor",
        expertise_areas: ["Development Economics", "Rural Economics", "Coastal Economy"],
        research_interests:
          "Economic development of coastal communities, impact of fishing industry on local economy, and sustainable development models for rural areas.",
        publications_count: 29,
        experience_years: 15,
        office_location: "Economics Department, Room 203",
      },
      {
        id: "11",
        first_name: "Dr. B.",
        last_name: "Murthy",
        email: "bmurthy@svlnsgdc.ac.in",
        department: "Political Science",
        position: "Associate Professor",
        expertise_areas: ["Public Administration", "Governance", "Local Government"],
        research_interests:
          "Local governance systems, panchayati raj institutions, and public policy implementation in rural and coastal areas of Andhra Pradesh.",
        publications_count: 24,
        experience_years: 11,
        office_location: "Political Science Department, Room 304",
      },
      {
        id: "12",
        first_name: "Dr. L.",
        last_name: "Srinivas",
        email: "lsrinivas@svlnsgdc.ac.in",
        department: "Commerce",
        position: "Professor",
        expertise_areas: ["Business Studies", "Financial Management", "Entrepreneurship"],
        research_interests:
          "Small business development in rural areas, microfinance impact studies, and promoting entrepreneurship among coastal communities.",
        publications_count: 27,
        experience_years: 14,
        office_location: "Commerce Department, Room 401",
      },
      {
        id: "13",
        first_name: "Dr. T.",
        last_name: "Vijaya",
        email: "tvijaya@svlnsgdc.ac.in",
        department: "Computer Science",
        position: "Assistant Professor",
        expertise_areas: ["Information Technology", "Digital Systems", "E-Learning"],
        research_interests:
          "Digital literacy in rural areas, e-learning platform development, and IT applications in education and local governance.",
        publications_count: 18,
        experience_years: 8,
        office_location: "Computer Lab, Block C",
      },
      {
        id: "14",
        first_name: "Dr. K.",
        last_name: "Madhavi",
        email: "kmadhavi@svlnsgdc.ac.in",
        department: "Library Science",
        position: "Librarian",
        expertise_areas: ["Library Science", "Information Management", "Digital Archives"],
        research_interests:
          "Digital preservation of local historical documents, information literacy programs, and development of institutional repositories for academic research.",
        publications_count: 21,
        experience_years: 12,
        office_location: "Central Library",
      },
    ]

    setFaculty(mockFaculty)
    setFilteredFaculty(mockFaculty)
    setLoading(false)
  }, [])

  useEffect(() => {
    let filtered = faculty

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (member) =>
          member.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          member.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          member.expertise_areas.some((area) => area.toLowerCase().includes(searchTerm.toLowerCase())) ||
          member.research_interests.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Filter by department
    if (selectedDepartment !== "all") {
      filtered = filtered.filter((member) => member.department === selectedDepartment)
    }

    setFilteredFaculty(filtered)
  }, [searchTerm, selectedDepartment, faculty])

  const departments = Array.from(new Set(faculty.map((member) => member.department)))
  const totalPublications = faculty.reduce((sum, member) => sum + member.publications_count, 0)
  const averageExperience = Math.round(
    faculty.reduce((sum, member) => sum + member.experience_years, 0) / faculty.length,
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading faculty research profiles...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Faculty Research Profiles</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the diverse research expertise and scholarly contributions of our distinguished faculty members at
            Sri Varaha Lakshmi Narsimha Swami Government Degree College.
          </p>
        </div>

        {/* Research Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="text-center border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <GraduationCap className="w-8 h-8 mx-auto mb-2" />
              <p className="text-3xl font-bold">{faculty.length}</p>
              <p className="text-blue-100">Faculty Members</p>
            </CardContent>
          </Card>
          <Card className="text-center border-0 shadow-lg bg-gradient-to-br from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <BookOpen className="w-8 h-8 mx-auto mb-2" />
              <p className="text-3xl font-bold">{totalPublications}</p>
              <p className="text-green-100">Total Publications</p>
            </CardContent>
          </Card>
          <Card className="text-center border-0 shadow-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <Building2 className="w-8 h-8 mx-auto mb-2" />
              <p className="text-3xl font-bold">{departments.length}</p>
              <p className="text-purple-100">Departments</p>
            </CardContent>
          </Card>
          <Card className="text-center border-0 shadow-lg bg-gradient-to-br from-orange-500 to-orange-600 text-white">
            <CardContent className="p-6">
              <Award className="w-8 h-8 mx-auto mb-2" />
              <p className="text-3xl font-bold">{averageExperience}</p>
              <p className="text-orange-100">Avg. Experience (Years)</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search by name, expertise, or research interests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
            <SelectTrigger className="w-full md:w-64">
              <SelectValue placeholder="Filter by department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              {departments.map((dept) => (
                <SelectItem key={dept} value={dept}>
                  {dept}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Faculty Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredFaculty.map((member) => (
            <Card key={member.id} className="hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-semibold text-gray-900">
                      {member.first_name} {member.last_name}
                    </CardTitle>
                    <p className="text-sm font-medium text-blue-600">{member.position}</p>
                    <p className="text-sm text-gray-600">{member.department}</p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Experience and Publications */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-2 bg-blue-50 rounded-lg">
                    <p className="text-lg font-bold text-blue-600">{member.experience_years}</p>
                    <p className="text-xs text-gray-600">Years Exp.</p>
                  </div>
                  <div className="text-center p-2 bg-green-50 rounded-lg">
                    <p className="text-lg font-bold text-green-600">{member.publications_count}</p>
                    <p className="text-xs text-gray-600">Publications</p>
                  </div>
                </div>

                {/* Expertise Areas */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <BookOpen className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">Expertise</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {member.expertise_areas.map((area, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-xs bg-blue-100 text-blue-800 hover:bg-blue-200"
                      >
                        {area}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Research Interests */}
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-700">Research Interests</h4>
                  <p className="text-sm text-gray-600 leading-relaxed line-clamp-4">{member.research_interests}</p>
                </div>

                {/* Contact */}
                <div className="pt-2 border-t border-gray-100 space-y-2">
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <a
                      href={`mailto:${member.email}`}
                      className="text-sm text-blue-600 hover:text-blue-800 transition-colors truncate"
                    >
                      {member.email}
                    </a>
                  </div>
                  {member.office_location && (
                    <div className="flex items-center space-x-2">
                      <Building2 className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">{member.office_location}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredFaculty.length === 0 && (
          <div className="text-center py-12">
            <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No faculty members found</h3>
            <p className="text-gray-500">Try adjusting your search criteria or filters.</p>
          </div>
        )}

        {/* Research Collaboration */}
        <div className="mt-16">
          <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-purple-50">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Research Collaboration</h2>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Interested in collaborating with our faculty members? Our researchers are actively engaged in
                interdisciplinary projects and welcome collaboration opportunities with academic institutions, research
                organizations, and industry partners.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:svlns.gdc@gmail.com"
                  className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  Contact for Collaboration
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <Building2 className="w-4 h-4" />
                  Visit Contact Page
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
