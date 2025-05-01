// app/page.tsx
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            AuthFlow
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-md mx-auto">
            Secure authentication system with modern features
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl space-y-6">
          <div className="grid grid-cols-1 gap-4">
            <Link
              href="/register"
              className="flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-all transform hover:-translate-y-0.5"
            >
              <span className="font-semibold">Get Started</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
            
            <div className="flex items-center space-x-4">
              <span className="flex-1 border-t border-gray-200 dark:border-gray-600"></span>
              <span className="text-gray-400 text-sm">or</span>
              <span className="flex-1 border-t border-gray-200 dark:border-gray-600"></span>
            </div>

            <div className="flex justify-center space-x-4">
              <Link
                href="/login"
                className="px-6 py-2 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                Login
              </Link>
              {/* <Link
                href="/profile"
                className="px-6 py-2 border-2 border-purple-600 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
              >
                Profile
              </Link> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}