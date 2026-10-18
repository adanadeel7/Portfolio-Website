"use client";

import React, { useState } from "react";
import StitchNavbar from "@/components/StitchNavbar";
import StitchAIConsole from "@/components/StitchAIConsole";

export default function Home() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [activeTab, setActiveTab] = useState("home");

  const isDark = theme === "dark";

  return (
    <div
      className={`min-h-screen relative overflow-x-hidden flex flex-col justify-between transition-colors duration-300 ${
        isDark ? "bg-[#0d0a1a] text-slate-100" : "bg-[#fbfcfe] text-slate-800"
      }`}
      style={{
        backgroundImage: isDark
          ? "radial-gradient(rgba(147, 130, 180, 0.22) 1.25px, transparent 1.25px)"
          : "radial-gradient(rgba(148, 163, 184, 0.32) 1.25px, transparent 1.25px)",
        backgroundSize: "26px 26px",
      }}
    >
      {/* Ambient background glow layer */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 transition-all duration-700"
        style={{
          background: isDark
            ? "radial-gradient(circle at 50% 32%, rgba(147, 51, 234, 0.18) 0%, rgba(219, 39, 119, 0.12) 28%, rgba(13, 10, 26, 0) 70%)"
            : "radial-gradient(circle at 50% 38%, rgba(219, 234, 254, 0.5) 0%, rgba(243, 232, 255, 0.35) 30%, rgba(251, 252, 254, 0) 70%)",
        }}
      />

      {/* Floating Pill Top Navigation */}
      <StitchNavbar
        theme={theme}
        onToggleTheme={() => setTheme(isDark ? "light" : "dark")}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        isStandalone={true}
      />

      {/* Main Hero & AI Interactive Chat Console */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-start pt-4 pb-12 px-4 sm:px-6 w-full max-w-5xl mx-auto">
        <StitchAIConsole
          theme={theme}
          onThemeToggle={() => setTheme(isDark ? "light" : "dark")}
        />
      </main>

      {/* Minimal Modern Footer */}
      <footer
        className={`relative z-10 w-full py-6 text-center text-xs transition-colors ${
          isDark ? "text-slate-500" : "text-slate-400"
        }`}
      >
        <p>© 2026 Adan Adeel. Crafted with precision & clarity • Inspired by Claude & Stitch.</p>
      </footer>
    </div>
  );
}
