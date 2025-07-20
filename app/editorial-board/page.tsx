"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mail, User, Phone } from "lucide-react"
import { supabase } from "@/lib/supabase"
import type { EditorialBoardMember } from "@/lib/supabase"

export default function EditorialBoardPage() {
  const [boardMembers, setBoardMembers] = useState<EditorialBoardMember[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchBoardMembers()
  }, [])

  const fetchBoardMembers = async () => {
    try {
      // Explicitly select columns to ensure consistency, and remove server-side order for resilience
      const { data, error } = await supabase
        .from("editorial_board")
        .select(
          "id, first_name, last_name, email, position, affiliation, expertise_areas, bio, order_position, is_active",
        )
        .eq("is_active", true)

      if (error) {
        console.error("Supabase error:", error)
        setError("Failed to load editorial board from database. Showing default data.")
        setBoardMembers(getMockBoardMembers())
      } else {
        // Sort client-side if order_position is available
        const sortedData = data ? [...data].sort((a, b) => a.order_position - b.order_position) : []
        setBoardMembers(sortedData as EditorialBoardMember[])
      }
    } catch (error) {
      console.error("Error fetching editorial board:", error)
      setError("An unexpected error occurred. Showing default data.")
      setBoardMembers(getMockBoardMembers())
    } finally {
      setLoading(false)
    }
  }

  const getMockBoardMembers = (): EditorialBoardMember[] => [
    {
      id: "1",
      first_name: "Dr. P.",
      last_name: "Surekha",
      email: "principal@svlnsgdc.ac.in",
      position: "Editor-in-Chief & Principal",
      affiliation: "Sri Varaha Lakshmi Narsimha Swami Government Degree College",
      expertise_areas: ["Applied Mathematics", "Mathematics", "Educational Leadership", "Academic Administration", "Higher Education Policy"],
      bio: "Principal and Editor-in-Chief of SVLNS Government Degree College, Bheemunipatnam. Leading the institution with dedication to quality education and social transformation.",
      order_position: 1,
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "2",
      first_name: "Dr. Ch.",
      last_name: "Vishnu Murthy",
      email: "vishnu@svlnsgdc.ac.in",
      position: "Associate Editor - Commerce and Management",
      affiliation: "Department of Commerce, SVLNS GDC",
      expertise_areas: ["Commerce", "Mnagement", "Commerce and Management"],
      bio: "Professor and Head, Department of Commerce. Specializes in Supply chain and interdisciplinary research with focus on coastal environmental studies.",
      order_position: 2,
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "3",
      first_name: "Dr. M.",
      last_name: "Lakshmi",
      email: "lakshmi@svlnsgdc.ac.in",
      position: "Associate Editor - Chemistry",
      affiliation: "Department of Chemistry, SVLNS GDC",
      expertise_areas: ["Analytical Chemistry", "Environmental Chemistry", "Marine Chemistry"],
      bio: "Associate Professor, Department of Chemistry. Expert in analytical and environmental chemistry with special focus on coastal water analysis.",
      order_position: 3,
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "4",
      first_name: "Dr. S.",
      last_name: "Prasad",
      email: "prasad@svlnsgdc.ac.in",
      position: "Associate Editor - Botany",
      affiliation: "Department of Botany, SVLNS GDC",
      expertise_areas: ["Plant Ecology", "Coastal Botany", "Biodiversity Conservation"],
      bio: "Professor, Department of Botany. Research focus on coastal plant ecology and biodiversity conservation in Andhra Pradesh region.",
      order_position: 4,
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "5",
      first_name: "Dr. V.",
      last_name: "Rao",
      email: "vrao@svlnsgdc.ac.in",
      position: "Associate Editor - Zoology",
      affiliation: "Department of Zoology, SVLNS GDC",
      expertise_areas: ["Marine Biology", "Coastal Ecology", "Animal Behavior"],
      bio: "Associate Professor, Department of Zoology. Specializes in marine biology and coastal ecosystem studies with focus on Bay of Bengal marine life.",
      order_position: 5,
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "6",
      first_name: "Dr. G.",
      last_name: "Krishna",
      email: "krishna@svlnsgdc.ac.in",
      position: "Associate Editor - Mathematics",
      affiliation: "Department of Mathematics, SVLNS GDC",
      expertise_areas: ["Applied Mathematics", "Statistics", "Mathematical Modeling"],
      bio: "Professor, Department of Mathematics. Expert in applied mathematics and statistical analysis with applications in environmental and social sciences.",
      order_position: 6,
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "7",
      first_name: "Dr. R.",
      last_name: "Devi",
      email: "rdevi@svlnsgdc.ac.in",
      position: "Associate Editor - English",
      affiliation: "Department of English, SVLNS GDC",
      expertise_areas: ["English Literature", "Linguistics", "Communication Studies"],
      bio: "Associate Professor, Department of English. Research interests in contemporary literature and effective communication in academic writing.",
      order_position: 7,
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "8",
      first_name: "Dr. N.",
      last_name: "Kumar",
      email: "nkumar@svlnsgdc.ac.in",
      position: "Associate Editor - Telugu",
      affiliation: "Department of Telugu, SVLNS GDC",
      expertise_areas: ["Telugu Literature", "Regional Studies", "Cultural Heritage"],
      bio: "Professor, Department of Telugu. Expert in Telugu literature and coastal Andhra Pradesh cultural studies with focus on local traditions.",
      order_position: 8,
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "9",
      first_name: "Dr. P.",
      last_name: "Reddy",
      email: "preddy@svlnsgdc.ac.in",
      position: "Associate Editor - History",
      affiliation: "Department of History, SVLNS GDC",
      expertise_areas: ["Regional History", "Archaeology", "Cultural Studies"],
      bio: "Associate Professor, Department of History. Specializes in regional history of coastal Andhra Pradesh and archaeological studies.",
      order_position: 9,
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "10",
      first_name: "Dr. A.",
      last_name: "Sharma",
      email: "asharma@svlnsgdc.ac.in",
      position: "Associate Editor - Economics",
      affiliation: "Department of Economics, SVLNS GDC",
      expertise_areas: ["Development Economics", "Rural Economics", "Coastal Economy"],
      bio: "Professor, Department of Economics. Focus on development economics and rural studies with emphasis on coastal community development.",
      order_position: 10,
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "11",
      first_name: "Dr. B.",
      last_name: "Murthy",
      email: "bmurthy@svlnsgdc.ac.in",
      position: "Associate Editor - Political Science",
      affiliation: "Department of Political Science, SVLNS GDC",
      expertise_areas: ["Public Administration", "Governance", "Local Government"],
      bio: "Associate Professor, Department of Political Science. Research in governance, public policy, and local government administration.",
      order_position: 11,
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "12",
      first_name: "Dr. L.",
      last_name: "Srinivas",
      email: "lsrinivas@svlnsgdc.ac.in",
      position: "Associate Editor - Commerce",
      affiliation: "Department of Commerce, SVLNS GDC",
      expertise_areas: ["Business Studies", "Financial Management", "Entrepreneurship"],
      bio: "Professor, Department of Commerce. Expert in business studies, financial management, and promoting entrepreneurship in rural areas.",
      order_position: 12,
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "13",
      first_name: "Dr. T.",
      last_name: "Vijaya",
      email: "tvijaya@svlnsgdc.ac.in",
      position: "Associate Editor - Computer Science",
      affiliation: "Department of Computer Science, SVLNS GDC",
      expertise_areas: ["Information Technology", "Digital Systems", "E-Learning"],
      bio: "Assistant Professor, Department of Computer Science. Specializes in IT applications, digital publishing, and e-learning systems.",
      order_position: 13,
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "14",
      first_name: "Dr. K.",
      last_name: "Madhavi",
      email: "kmadhavi@svlnsgdc.ac.in",
      position: "Managing Editor",
      affiliation: "Library & Information Science, SVLNS GDC",
      expertise_areas: ["Library Science", "Information Management", "Research Methodology"],
      bio: "Librarian and Managing Editor. Expert in information management, research methodology, and academic publishing standards.",
      order_position: 14,
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading editorial board...</p>
          </div>
        </div>
      </div>
    )
  }

  const editorInChief = boardMembers.find((member) => member.position.includes("Editor-in-Chief"))
  const associateEditors = boardMembers.filter((member) => member.position.includes("Associate Editor"))
  const managingEditor = boardMembers.find((member) => member.position.includes("Managing Editor"))

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Editorial Board</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Distinguished faculty members from Sri Varaha Lakshmi Narsimha Swami Government Degree College,
            Bheemunipatnam, leading our multidisciplinary journal with expertise across various academic fields.
          </p>
          {error && (
            <div className="mt-4 p-3 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded-lg">{error}</div>
          )}
        </div>

        {/* Editor-in-Chief Section */}
        {editorInChief && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-center mb-8 text-blue-800">Editor-in-Chief</h2>
            <div className="max-w-4xl mx-auto">
              <Card className="border-2 border-blue-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="flex-shrink-0">
                      <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <User className="w-16 h-16 text-white" />
                      </div>
                    </div>
                    <div className="flex-1 text-center md:text-left">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {editorInChief.first_name} {editorInChief.last_name}
                      </h3>
                      <p className="text-lg text-blue-600 font-semibold mb-2">{editorInChief.position}</p>
                      <p className="text-gray-600 mb-4">{editorInChief.affiliation}</p>
                      <p className="text-gray-700 mb-4">{editorInChief.bio}</p>

                      <div className="flex flex-wrap gap-2 mb-4 justify-center md:justify-start">
                        {editorInChief.expertise_areas.map((area, index) => (
                          <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800">
                            {area}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4 text-sm text-gray-600 justify-center md:justify-start">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          <a href={`mailto:${editorInChief.email}`} className="hover:text-blue-600">
                            {editorInChief.email}
                          </a>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          <span>8247685902</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Associate Editors Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-center mb-8 text-green-800">Associate Editors</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {associateEditors.map((member) => (
              <Card
                key={member.id}
                className="border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300 hover:border-green-300"
              >
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center">
                      <User className="w-10 h-10 text-white" />
                    </div>
                  </div>
                  <CardTitle className="text-lg font-bold text-gray-900">
                    {member.first_name} {member.last_name}
                  </CardTitle>
                  <p className="text-green-600 font-semibold">{member.position}</p>
                  <p className="text-sm text-gray-600">{member.affiliation}</p>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-gray-700 mb-4 line-clamp-3">{member.bio}</p>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {member.expertise_areas.map((area, expertiseIndex) => (
                      <Badge key={expertiseIndex} variant="outline" className="text-xs border-green-300 text-green-700">
                        {area}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <Mail className="h-3 w-3" />
                    <a href={`mailto:${member.email}`} className="hover:text-green-600 truncate">
                      {member.email}
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Managing Editor Section */}
        {managingEditor && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-center mb-8 text-purple-800">Managing Editor</h2>
            <div className="max-w-2xl mx-auto">
              <Card className="border-2 border-purple-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                        <User className="w-12 h-12 text-white" />
                      </div>
                    </div>
                    <div className="flex-1 text-center md:text-left">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {managingEditor.first_name} {managingEditor.last_name}
                      </h3>
                      <p className="text-lg text-purple-600 font-semibold mb-2">{managingEditor.position}</p>
                      <p className="text-gray-600 mb-3">{managingEditor.affiliation}</p>
                      <p className="text-gray-700 mb-4">{managingEditor.bio}</p>

                      <div className="flex flex-wrap gap-2 mb-4 justify-center md:justify-start">
                        {managingEditor.expertise_areas.map((area, index) => (
                          <Badge key={index} variant="secondary" className="bg-purple-100 text-purple-800">
                            {area}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-600 justify-center md:justify-start">
                        <Mail className="h-4 w-4" />
                        <a href={`mailto:${managingEditor.email}`} className="hover:text-purple-600">
                          {managingEditor.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        <span>8247685903</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Contact Information */}
        <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Contact Editorial Office</h2>
          <div className="flex flex-col md:flex-row justify-center items-center gap-6">
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              <span>svlns.gdc@gmail.com</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              <span>8247685902</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              <span>8247685903</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
