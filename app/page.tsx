export default function Page() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center justify-center gap-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tighter mb-4">Journal</h1>
            <p className="text-xl text-muted-foreground">
              Welcome to the Journal application
            </p>
          </div>
          
          <div className="grid gap-6 w-full max-w-2xl">
            <a
              href="/current-issue"
              className="block p-6 rounded-lg border border-border bg-card hover:bg-accent transition-colors"
            >
              <h2 className="text-2xl font-semibold mb-2">Current Issue</h2>
              <p className="text-muted-foreground">
                View the latest journal issue
              </p>
            </a>
            
            <a
              href="/archives"
              className="block p-6 rounded-lg border border-border bg-card hover:bg-accent transition-colors"
            >
              <h2 className="text-2xl font-semibold mb-2">Archives</h2>
              <p className="text-muted-foreground">
                Browse past issues and articles
              </p>
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}
