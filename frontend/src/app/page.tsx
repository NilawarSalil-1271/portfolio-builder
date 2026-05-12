import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black p-8">
      <main className="flex flex-col items-center max-w-3xl text-center space-y-8">
        <h1 className="text-5xl font-bold tracking-tight text-black dark:text-white sm:text-6xl">
          Welcome to StackShow
        </h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400">
          The simplest way to build, host, and share your developer portfolio. Show off your tech stack in minutes.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <Link
            href="/register"
            className="flex items-center justify-center h-12 px-8 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors shadow-lg"
          >
            Get Started
          </Link>
          <Link
            href="/login"
            className="flex items-center justify-center h-12 px-8 rounded-full border border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white font-medium hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
          >
            Sign In
          </Link>
        </div>
      </main>
    </div>
  );
}
