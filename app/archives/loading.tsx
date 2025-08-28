export default function Loading() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Archives</h1>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="border rounded-lg p-4 shadow animate-pulse"
          >
            <div className="h-6 bg-gray-300 rounded w-3/4 mb-3"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-40 bg-gray-200 rounded"></div>
            <div className="h-3 bg-gray-200 rounded w-1/3 mt-3"></div>
          </div>
        ))}
      </div>
    </div>
  )
}
