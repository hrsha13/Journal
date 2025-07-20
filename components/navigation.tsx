"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, BookOpen } from "lucide-react"

const navigationItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "College Info", href: "/college-info" },
  { name: "Faculty Research", href: "/faculty-research" },
  { name: "Editorial Board", href: "/editorial-board" },
  { name: "Submission Guidelines", href: "/submission-guidelines" },
  { name: "Review Policy", href: "/review-policy" },
  { name: "Archives", href: "/archives" },
  { name: "Ethics & Policies", href: "/ethics" },
  { name: "Contact", href: "/contact" },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2 py-2">
            <div className="flex items-center space-x-2 p-2">
              <BookOpen className="h-6 w-6 text-purple-600" />
              <span className="font-bold text-lg text-gray-800">SVLNS GDC Journal</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-600 hover:text-purple-600 transition-colors text-sm font-medium hover:scale-105 transform duration-200"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="text-purple-600">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-gradient-to-b from-blue-50 to-purple-50">
              <div className="flex flex-col space-y-4 mt-8">
                {navigationItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-gray-700 hover:text-purple-600 transition-colors font-medium p-2 rounded-lg hover:bg-white/50"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}
