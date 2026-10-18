import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0d0a1a] text-slate-100 flex flex-col items-center justify-center p-6 text-center font-sans">
      <h1 className="text-6xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
        404
      </h1>
      <h2 className="text-xl font-semibold mb-2">Page Not Found</h2>
      <p className="text-sm text-slate-400 mb-6 max-w-sm">
        The page you are looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="px-5 py-2.5 rounded-full bg-purple-600 hover:bg-purple-500 text-white text-xs font-medium transition-all shadow-lg shadow-purple-900/40"
      >
        Return to Portfolio
      </Link>
    </div>
  );
}
