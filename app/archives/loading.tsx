"use client"

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent animate-pulse">
            Loading Current Issue...
          </h1>
          <p className="text-xl text-gray-700">Please wait while we fetch the latest articles</p>
        </div>

        {/* Spinner */}
        <div className="flex flex-col items-center justify-center py-20">
          <div className="animate-spin rounded-full h-14 w-14 border-b-2 border-blue-600"></div>
          <p className="mt-6 text-gray-600 text-lg">Fetching data from the journal database</p>
        </div>

        {/* Skeleton Cards */}
        <div className="space-y-6 mt-12">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-40 bg-white/80 backdrop-blur rounded-xl shadow animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    </div>
  )
}
