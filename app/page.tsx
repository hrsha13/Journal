export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to SVLNS Journal</h1>
        <p className="text-lg text-muted-foreground mb-8">A scientific journal application</p>
        <a
          href="/journal-info"
          className="inline-block px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
        >
          View Journal Info
        </a>
      </div>
    </main>
  )
}
