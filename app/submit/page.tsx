"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Mail, Send, FileText, User, Building } from "lucide-react"

export default function SubmitPage() {
  const [formData, setFormData] = useState({
    title: "",
    authors: "",
    affiliation: "",
    email: "",
    phone: "",
    articleType: "",
    subjectArea: "",
    abstract: "",
    keywords: "",
    coverLetter: "",
    funding: "",
    conflicts: "",
    ethics: false,
    originality: false,
    copyright: false,
  })

  const generateEmail = () => {
    const subject = `Manuscript Submission - ${formData.title || "[Your Title]"}`
    const body = `Dear Editorial Team,

I am submitting my manuscript titled "${formData.title}" for consideration in the SVLNS GDC Multidisciplinary Journal.

MANUSCRIPT DETAILS:
Title: ${formData.title}
Article Type: ${formData.articleType}
Subject Area: ${formData.subjectArea}
Keywords: ${formData.keywords}

AUTHOR INFORMATION:
Authors: ${formData.authors}
Corresponding Author Email: ${formData.email}
Phone: ${formData.phone}
Institutional Affiliation: ${formData.affiliation}

ABSTRACT:
${formData.abstract}

COVER LETTER:
${formData.coverLetter}

FUNDING INFORMATION:
${formData.funding || "No funding received"}

CONFLICT OF INTEREST:
${formData.conflicts || "No conflicts of interest to declare"}

DECLARATIONS:
☑ I confirm this work is original and has not been published elsewhere
☑ I agree to transfer copyright to the journal upon acceptance
☑ Ethics approval obtained where applicable

Please find attached:
- Complete manuscript file
- All figures and tables
- Supplementary materials (if any)

I look forward to your response.

Best regards,
${formData.authors.split(",")[0] || "[Your Name]"}
${formData.affiliation}
${formData.email}`

    const mailtoLink = `mailto:svlns.gdc@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.open(mailtoLink)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Submit Your Manuscript</h1>
          <p className="text-xl text-gray-600">Complete the form below to generate a professional submission email</p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-6 w-6 text-blue-600" />
              <span>Manuscript Information</span>
            </CardTitle>
            <CardDescription>Provide details about your manuscript and research</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="title">Manuscript Title *</Label>
              <Input
                id="title"
                placeholder="Enter the complete title of your manuscript"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="articleType">Article Type *</Label>
                <Select onValueChange={(value) => setFormData({ ...formData, articleType: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select article type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="research">Research Article</SelectItem>
                    <SelectItem value="review">Review Article</SelectItem>
                    <SelectItem value="short">Short Communication</SelectItem>
                    <SelectItem value="case">Case Study</SelectItem>
                    <SelectItem value="editorial">Editorial</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="subjectArea">Subject Area *</Label>
                <Select onValueChange={(value) => setFormData({ ...formData, subjectArea: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select subject area" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="physics">Physics</SelectItem>
                    <SelectItem value="chemistry">Chemistry</SelectItem>
                    <SelectItem value="biology">Biology</SelectItem>
                    <SelectItem value="mathematics">Mathematics</SelectItem>
                    <SelectItem value="computer-science">Computer Science</SelectItem>
                    <SelectItem value="psychology">Psychology</SelectItem>
                    <SelectItem value="sociology">Sociology</SelectItem>
                    <SelectItem value="economics">Economics</SelectItem>
                    <SelectItem value="political-science">Political Science</SelectItem>
                    <SelectItem value="literature">Literature</SelectItem>
                    <SelectItem value="philosophy">Philosophy</SelectItem>
                    <SelectItem value="history">History</SelectItem>
                    <SelectItem value="environmental">Environmental Studies</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="social-development">Social Development</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="abstract">Abstract *</Label>
              <Textarea
                id="abstract"
                placeholder="Provide a comprehensive abstract (250-350 words)"
                rows={6}
                value={formData.abstract}
                onChange={(e) => setFormData({ ...formData, abstract: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="keywords">Keywords *</Label>
              <Input
                id="keywords"
                placeholder="Enter 5-7 keywords separated by commas"
                value={formData.keywords}
                onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                required
              />
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="h-6 w-6 text-green-600" />
              <span>Author Information</span>
            </CardTitle>
            <CardDescription>Provide details about all authors and corresponding author</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="authors">All Authors *</Label>
              <Input
                id="authors"
                placeholder="List all authors (e.g., John Smith, Jane Doe, Robert Johnson)"
                value={formData.authors}
                onChange={(e) => setFormData({ ...formData, authors: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="affiliation">Institutional Affiliation *</Label>
              <Input
                id="affiliation"
                placeholder="Your institution/organization name"
                value={formData.affiliation}
                onChange={(e) => setFormData({ ...formData, affiliation: e.target.value })}
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Corresponding Author Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@institution.edu"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+91-XXX-XXX-XXXX"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Building className="h-6 w-6 text-purple-600" />
              <span>Additional Information</span>
            </CardTitle>
            <CardDescription>Cover letter, funding, and other relevant information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="coverLetter">Cover Letter *</Label>
              <Textarea
                id="coverLetter"
                placeholder="Explain the significance of your work, its contribution to the field, and why it should be published in our journal"
                rows={5}
                value={formData.coverLetter}
                onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="funding">Funding Information</Label>
              <Textarea
                id="funding"
                placeholder="List any funding sources, grant numbers, or write 'No funding received'"
                rows={3}
                value={formData.funding}
                onChange={(e) => setFormData({ ...formData, funding: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="conflicts">Conflict of Interest Statement</Label>
              <Textarea
                id="conflicts"
                placeholder="Declare any conflicts of interest or write 'No conflicts of interest to declare'"
                rows={3}
                value={formData.conflicts}
                onChange={(e) => setFormData({ ...formData, conflicts: e.target.value })}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Declarations and Agreements</CardTitle>
            <CardDescription>Please confirm the following statements by checking the boxes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start space-x-3">
              <Checkbox
                id="originality"
                checked={formData.originality}
                onCheckedChange={(checked) => setFormData({ ...formData, originality: checked as boolean })}
                required
              />
              <Label htmlFor="originality" className="text-sm leading-relaxed">
                I confirm that this work is original, has not been published elsewhere, and is not under consideration
                by any other journal. All sources have been properly cited and acknowledged.
              </Label>
            </div>

            <div className="flex items-start space-x-3">
              <Checkbox
                id="copyright"
                checked={formData.copyright}
                onCheckedChange={(checked) => setFormData({ ...formData, copyright: checked as boolean })}
                required
              />
              <Label htmlFor="copyright" className="text-sm leading-relaxed">
                I agree to transfer copyright to SVLNS GDC Multidisciplinary Journal upon acceptance of the manuscript
                for publication, understanding that the work will be published under open access terms.
              </Label>
            </div>

            <div className="flex items-start space-x-3">
              <Checkbox
                id="ethics"
                checked={formData.ethics}
                onCheckedChange={(checked) => setFormData({ ...formData, ethics: checked as boolean })}
              />
              <Label htmlFor="ethics" className="text-sm leading-relaxed">
                Where applicable, I confirm that this research has received appropriate ethics approval and complies
                with institutional and national guidelines for research involving human subjects or animals.
              </Label>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8 border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-blue-800">
              <Mail className="h-6 w-6" />
              <span>Generate Submission Email</span>
            </CardTitle>
            <CardDescription className="text-blue-700">
              Click the button below to generate a professional submission email with all your information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-blue-800">
                This will open your email client with a pre-filled message containing all the information you've
                provided. You'll need to attach your manuscript file and any supplementary materials before sending.
              </p>
              <div className="flex gap-4">
                <Button
                  onClick={generateEmail}
                  disabled={
                    !formData.title ||
                    !formData.authors ||
                    !formData.email ||
                    !formData.abstract ||
                    !formData.originality ||
                    !formData.copyright
                  }
                  className="flex-1"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Generate Submission Email
                </Button>
                <Button variant="outline" asChild>
                  <a href="mailto:svlns.gdc@gmail.com">Email Directly</a>
                </Button>
              </div>
              <p className="text-xs text-blue-600">
                <strong>Submission Email:</strong> svlns.gdc@gmail.com
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>What to Attach</CardTitle>
            <CardDescription>Remember to attach these files to your submission email</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Required Attachments</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Complete manuscript file (.docx or .pdf)</li>
                  <li>• All figures and tables (high resolution)</li>
                  <li>• Author declaration form (if available)</li>
                  <li>• Copyright transfer agreement (if available)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Optional Attachments</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Supplementary materials</li>
                  <li>• Ethics approval certificate</li>
                  <li>• Data availability statement</li>
                  <li>• Suggested reviewers list</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
