import { createClient } from "@/lib/supabase/server";

interface Article {
  id: string;
  title: string;
  content: string;
  published_at: string;
}

export default async function CurrentIssuePage() {
  const supabase = await createClient();

  // Fetch current issue
  const { data: articles, error } = await supabase
    .from("articles")
    .select("*")
    .order("published_at", { ascending: false })
    .limit(10);

  if (error) {
    console.error("Error fetching articles:", error);
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold tracking-tighter mb-8">Current Issue</h1>

        {articles && articles.length > 0 ? (
          <div className="grid gap-6">
            {articles.map((article: Article) => (
              <article
                key={article.id}
                className="p-6 rounded-lg border border-border bg-card hover:bg-accent transition-colors"
              >
                <h2 className="text-2xl font-semibold mb-2">{article.title}</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  {new Date(article.published_at).toLocaleDateString()}
                </p>
                <p className="text-foreground">{article.content}</p>
              </article>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No articles available.</p>
        )}

        <div className="mt-8">
          <a
            href="/"
            className="inline-block px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
          >
            Back to Home
          </a>
        </div>
      </div>
    </main>
  );
}
