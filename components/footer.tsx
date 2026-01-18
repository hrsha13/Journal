import Link from 'next/link'
import { Mail, Phone, MapPin } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">SVLNS Journal</h3>
            <p className="text-sm">
              A peer-reviewed, open-access journal dedicated to advancing multidisciplinary research.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/archives" className="hover:text-white transition-colors">
                  Archives
                </Link>
              </li>
              <li>
                <Link href="/submit" className="hover:text-white transition-colors">
                  Submit Article
                </Link>
              </li>
              <li>
                <Link href="/editorial-board" className="hover:text-white transition-colors">
                  Editorial Board
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4 className="text-white font-bold mb-4">Policies</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/submission-guidelines" className="hover:text-white transition-colors">
                  Submission Guidelines
                </Link>
              </li>
              <li>
                <Link href="/review-policy" className="hover:text-white transition-colors">
                  Review Policy
                </Link>
              </li>
              <li>
                <Link href="/ethics" className="hover:text-white transition-colors">
                  Ethics
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Mail size={16} />
                <a href="mailto:svlns.gdc@gmail.com" className="hover:text-white transition-colors">
                  svlns.gdc@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} />
                <a href="tel:+918247685902" className="hover:text-white transition-colors">
                  +91-8247-685902
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5" />
                <span>Bheemunipatnam, Visakhapatnam</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm">
            <p>&copy; {currentYear} SVLNS GDC Multidisciplinary Journal. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link href="/about" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/contact" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
