import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export function Blog() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-indigo-600 dark:text-indigo-400 hover:underline mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">Blog</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Articles, tips, and insights on web design and development. Posts coming soon.
        </p>
      </main>
      <Footer />
    </div>
  );
}
