"use client";

import React, { useState } from "react";
import StitchNavbar from "@/components/StitchNavbar";
import { useTheme } from "@/context/ThemeContext";
import { PROJECTS, Project } from "@/data/portfolioData";
import { ExternalLink, Github, Code2, Sparkles, Filter, CheckCircle2 } from "lucide-react";

export default function WorkPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [selectedCat, setSelectedCat] = useState("All");

  const categories = ["All", "Full-Stack", "Real-time", "Web Apps"];
  const filtered =
    selectedCat === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === selectedCat);

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
            <Code2 size={13} />
            <span>Portfolio Projects</span>
          </div>
          <h1
            className={`text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
            Featured Engineering Work
          </h1>
          <p
            className={`text-sm sm:text-base mt-2 max-w-xl mx-auto font-light ${
              isDark ? "text-slate-400" : "text-slate-600"
            }`}
          >
            Real-time collaborative workspaces, SaaS financial tools, culinary video platforms, and academic question engines.
          </p>

          {/* Filter Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                  selectedCat === cat
                    ? isDark
                      ? "bg-purple-600 text-white shadow-md shadow-purple-950/50"
                      : "bg-slate-900 text-white"
                    : isDark
                    ? "bg-white/[0.05] hover:bg-white/[0.1] text-slate-300"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((project) => (
            <div
              key={project.id}
              className={`p-6 sm:p-7 rounded-3xl border transition-all duration-300 flex flex-col justify-between backdrop-blur-xl relative overflow-hidden ${
                isDark
                  ? "bg-[#161126]/85 border-white/10 hover:border-purple-400/50 shadow-2xl"
                  : "bg-white/85 border-slate-200 hover:border-purple-300 shadow-md hover:shadow-lg"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`text-[11px] font-mono uppercase px-2.5 py-0.5 rounded-full ${
                      isDark
                        ? "bg-purple-900/40 text-purple-300 border border-purple-500/30"
                        : "bg-purple-50 text-purple-700 border border-purple-200"
                    }`}
                  >
                    {project.category}
                  </span>
                  {project.metrics && (
                    <span className="text-[11px] font-mono text-emerald-400 font-semibold">
                      {project.metrics}
                    </span>
                  )}
                </div>

                <h2
                  className={`text-2xl font-bold tracking-tight mb-1.5 ${
                    isDark ? "text-white" : "text-slate-900"
                  }`}
                >
                  {project.title}
                </h2>
                <p className="text-xs text-purple-400 font-mono mb-3">
                  {project.subtitle}
                </p>

                <p
                  className={`text-sm leading-relaxed mb-4 font-light ${
                    isDark ? "text-slate-300" : "text-slate-600"
                  }`}
                >
                  {project.longDescription || project.description}
                </p>

                {/* Key Features */}
                {project.features && (
                  <div className="space-y-1.5 mb-5">
                    {project.features.slice(0, 3).map((feat, idx) => (
                      <div
                        key={idx}
                        className={`text-xs flex items-start gap-2 ${
                          isDark ? "text-slate-400" : "text-slate-600"
                        }`}
                      >
                        <CheckCircle2 size={13} className="text-purple-400 mt-0.5 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-md ${
                        isDark
                          ? "bg-white/[0.04] text-slate-300 border border-white/5"
                          : "bg-slate-100 text-slate-700 border border-slate-200"
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3 pt-3 border-t border-white/10">
                  {project.liveUrl && project.liveUrl !== project.githubUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-lg shadow-purple-950/40 transition-all active:scale-95"
                    >
                      <span>Live Demo</span>
                      <ExternalLink size={12} />
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium border transition-all active:scale-95 ${
                        isDark
                          ? "bg-white/[0.05] hover:bg-white/[0.1] text-slate-200 border-white/10"
                          : "bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-200"
                      }`}
                    >
                      <Github size={13} />
                      <span>GitHub</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer
        className={`relative z-10 w-full py-6 text-center text-xs transition-colors ${
          isDark ? "text-slate-500" : "text-slate-400"
        }`}
      >
        <p>© 2026 Adan Adeel • Projects &amp; Systems.</p>
      </footer>
    </div>
  );
}
