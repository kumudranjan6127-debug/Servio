import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export function Careers() {
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
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">Careers</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          We're not hiring right now, but check back soon for open positions.
        </p>
      </main>
      <Footer />
    </div>
  );
}
