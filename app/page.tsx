import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, BookOpen, Users, Zap } from 'lucide-react'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Navigation */}
      <nav className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-4xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-slate-900">SVLNS Journal</div>
            <div className="flex gap-4">
              <Link href="/current-issue">
                <Button variant="ghost">Current Issue</Button>
              </Link>
              <Link href="/archives">
                <Button variant="ghost">Archives</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-5xl font-bold tracking-tight text-slate-900 sm:text-6xl">
            SVLNS Journal
          </h1>
          <p className="mt-6 text-xl text-slate-600">
            A scientific journal application
          </p>
          
          {/* View Journal Info Button */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/current-issue">
              <Button size="lg" className="gap-2">
                View Journal Info <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="rounded-lg bg-white p-6 shadow-sm border border-slate-200">
            <BookOpen className="w-8 h-8 text-blue-600 mb-4" />
            <h3 className="text-lg font-semibold text-slate-900">Current Issue</h3>
            <p className="mt-2 text-slate-600">
              Read the latest published articles and research papers.
            </p>
          </div>
          
          <div className="rounded-lg bg-white p-6 shadow-sm border border-slate-200">
            <Users className="w-8 h-8 text-blue-600 mb-4" />
            <h3 className="text-lg font-semibold text-slate-900">Archives</h3>
            <p className="mt-2 text-slate-600">
              Browse our complete collection of past issues and articles.
            </p>
          </div>
          
          <div className="rounded-lg bg-white p-6 shadow-sm border border-slate-200">
            <Zap className="w-8 h-8 text-blue-600 mb-4" />
            <h3 className="text-lg font-semibold text-slate-900">Peer Review</h3>
            <p className="mt-2 text-slate-600">
              Quality-assured research through rigorous peer review process.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-8">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-slate-600">
            &copy; 2026 SVLNS Journal. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  )
}
