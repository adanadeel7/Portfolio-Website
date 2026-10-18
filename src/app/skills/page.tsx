"use client";

import React, { useState } from "react";
import StitchNavbar from "@/components/StitchNavbar";
import { useTheme } from "@/context/ThemeContext";
import { TECH_SKILLS } from "@/data/portfolioData";
import { Code2, Sparkles, Database, Terminal, Cpu } from "lucide-react";

export default function SkillsPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [selectedGroup, setSelectedGroup] = useState<string>("All");

  const groups = ["All", "MERN & Web", "AI & Languages", "DevOps & Databases"];
  const filteredSkills =
    selectedGroup === "All"
      ? TECH_SKILLS
      : TECH_SKILLS.filter((s) => s.category === selectedGroup);

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
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 transition-all duration-700"
        style={{
          background: isDark
            ? "radial-gradient(circle at 50% 25%, rgba(147, 51, 234, 0.16) 0%, rgba(219, 39, 119, 0.1) 30%, rgba(13, 10, 26, 0) 70%)"
            : "radial-gradient(circle at 50% 25%, rgba(219, 234, 254, 0.5) 0%, rgba(243, 232, 255, 0.35) 30%, rgba(251, 252, 254, 0) 70%)",
        }}
      />

      <StitchNavbar />

      <main className="relative z-10 flex-1 max-w-5xl mx-auto px-4 sm:px-6 pt-6 pb-20 w-full">
        {/* Header Section */}
        <div className="text-center mb-10">
          <div
            className={`inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase px-3.5 py-1.5 rounded-full w-fit mb-3 ${
              isDark
                ? "bg-[#1f1638] text-purple-300 border border-purple-500/30"
                : "bg-purple-50 text-purple-700 border border-purple-200"
            }`}
          >
            <Sparkles size={13} />
            <span>Technical Capabilities</span>
          </div>
          <h1
            className={`text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
            Skills &amp; Technologies
          </h1>
          <p
            className={`text-sm sm:text-base mt-2 max-w-xl mx-auto font-light ${
              isDark ? "text-slate-400" : "text-slate-600"
            }`}
          >
            MERN stack, real-time WebSockets, PostgreSQL relational models, AI foundations, and DevOps pipelines.
          </p>

          {/* Group Filter Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            {groups.map((group) => (
              <button
                key={group}
                onClick={() => setSelectedGroup(group)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                  selectedGroup === group
                    ? isDark
                      ? "bg-purple-600 text-white shadow-md shadow-purple-950/50"
                      : "bg-slate-900 text-white"
                    : isDark
                    ? "bg-white/[0.05] hover:bg-white/[0.1] text-slate-300"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                }`}
              >
                {group}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredSkills.map((skill, idx) => (
            <div
              key={idx}
              className={`p-5 rounded-2xl border transition-all backdrop-blur-xl ${
                isDark
                  ? "bg-[#161126]/85 border-white/10 hover:border-purple-400/40 shadow-xl"
                  : "bg-white/85 border-slate-200 hover:border-purple-300 shadow-md"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span
                  className={`text-base font-bold ${
                    isDark ? "text-white" : "text-slate-900"
                  }`}
                >
                  {skill.name}
                </span>
                <span className="text-xs font-mono font-bold text-purple-400">
                  {skill.level}%
                </span>
              </div>

              <div
                className={`w-full h-2 rounded-full overflow-hidden mb-3 ${
                  isDark ? "bg-white/10" : "bg-slate-200"
                }`}
              >
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-700"
                  style={{ width: `${skill.level}%` }}
                />
              </div>

              <p
                className={`text-xs leading-relaxed font-light ${
                  isDark ? "text-slate-300" : "text-slate-600"
                }`}
              >
                {skill.description}
              </p>

              <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between text-[11px] font-mono">
                <span className={isDark ? "text-purple-300/80" : "text-purple-600"}>
                  {skill.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer
        className={`relative z-10 w-full py-6 text-center text-xs transition-colors ${
          isDark ? "text-slate-500" : "text-slate-400"
        }`}
      >
        <p>© 2026 Adan Adeel • Technical Arsenal.</p>
      </footer>
    </div>
  );
}
