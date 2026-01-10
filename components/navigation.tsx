export function Navigation() {
  return (
    <div className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <a href="/" className="flex items-center space-x-3 py-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">SJ</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg text-gray-800 leading-tight">SVLNS GDC</span>
              <span className="text-xs text-purple-600 leading-tight">Multidisciplinary Journal</span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="/" className="text-gray-700 hover:text-purple-600 text-sm">Home</a>
            <a href="/submit" className="text-gray-700 hover:text-purple-600 text-sm">Submit</a>
            <a href="/current-issue" className="text-gray-700 hover:text-purple-600 text-sm">Current Issue</a>
            <a href="/archives" className="text-gray-700 hover:text-purple-600 text-sm">Archives</a>
            <a href="/editorial-board" className="text-gray-700 hover:text-purple-600 text-sm">Editorial Board</a>
            <a href="/submission-guidelines" className="text-gray-700 hover:text-purple-600 text-sm">Guidelines</a>
            <a href="/about" className="text-gray-700 hover:text-purple-600 text-sm">About</a>
            <a href="/contact" className="text-gray-700 hover:text-purple-600 text-sm">Contact</a>
          </div>

          {/* Mobile menu placeholder */}
          <div className="md:hidden">
            <span className="text-gray-700">Menu</span>
          </div>
        </div>
      </div>
    </div>
  )
}
