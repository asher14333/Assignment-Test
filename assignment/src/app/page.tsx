// app/page.tsx
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 px-6">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold">Welcome to AuthApp</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Simple authentication with Next.js, sessions, and local data.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mt-6">
          <Link
            href="/register"
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
          >
            Register
          </Link>
          <Link
            href="/login"
            className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 transition"
          >
            Login
          </Link>
          <Link
            href="/profile"
            className="bg-purple-600 text-white px-5 py-2 rounded hover:bg-purple-700 transition"
          >
            View Profile
          </Link>
        </div>
      </div>
    </div>
  );
}
