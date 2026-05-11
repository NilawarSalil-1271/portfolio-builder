import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-black font-sans text-gray-900 dark:text-gray-100">
      {/* Navbar */}
      <header className="w-full px-8 py-6 flex justify-between items-center max-w-7xl mx-auto">
        <div className="text-2xl font-bold tracking-tighter">
          Portfolio<span className="text-blue-600 dark:text-blue-500">Builder</span>
        </div>
        <nav className="flex gap-4">
          <Link
            href="/login"
            className="px-5 py-2.5 text-sm font-medium hover:text-blue-600 transition-colors"
          >
            Log in
          </Link>
          <Link
            href="/register"
            className="px-5 py-2.5 text-sm font-medium bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors shadow-sm"
          >
            Get Started
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 mt-12 mb-24">
        <h1 className="max-w-4xl text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-8">
          Build a professional portfolio in <span className="text-blue-600 dark:text-blue-500 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">minutes.</span>
        </h1>
        <p className="max-w-2xl text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-10 leading-relaxed">
          The easiest way to create, host, and manage your personal brand. Stand out to employers with a stunning, fast, and responsive resume website.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link
            href="/register"
            className="flex items-center justify-center px-8 py-4 text-base font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            Start Building for Free
          </Link>
          <Link
            href="/dashboard"
            className="flex items-center justify-center px-8 py-4 text-base font-medium rounded-full text-gray-700 bg-white dark:text-gray-200 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-all shadow-sm"
          >
            Go to Dashboard
          </Link>
        </div>

        {/* Mockup / Decorative Element */}
        <div className="mt-16 w-full max-w-5xl rounded-2xl bg-white dark:bg-zinc-900 shadow-2xl overflow-hidden border border-gray-200 dark:border-zinc-800 flex flex-col">
          <div className="h-10 bg-gray-100 dark:bg-zinc-800 border-b border-gray-200 dark:border-zinc-700 flex items-center px-4 gap-2">
            <div className="w-3 h-3 rounded-full bg-red-400"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
          </div>
          <div className="h-64 sm:h-96 w-full bg-gray-50 dark:bg-zinc-950 flex items-center justify-center p-8">
            <div className="text-center opacity-50">
              <div className="w-16 h-16 mx-auto rounded-full bg-gray-300 dark:bg-zinc-700 mb-4"></div>
              <div className="w-48 h-4 rounded-full bg-gray-300 dark:bg-zinc-700 mx-auto mb-2"></div>
              <div className="w-32 h-3 rounded-full bg-gray-200 dark:bg-zinc-800 mx-auto"></div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="py-8 text-center text-gray-500 dark:text-gray-400 text-sm border-t border-gray-200 dark:border-zinc-800">
        <p>&copy; {new Date().getFullYear()} PortfolioBuilder. All rights reserved.</p>
      </footer>
    </div>
  );
}
