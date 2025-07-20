import { ArticleViewer } from "@/components/articles/article-viewer"
import { notFound } from "next/navigation"

interface ArticlePageProps {
  params: {
    id: string
  }
}

export default function ArticlePage({ params }: ArticlePageProps) {
  if (!params.id) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <ArticleViewer articleId={params.id} />
      </div>
    </div>
  )
}
