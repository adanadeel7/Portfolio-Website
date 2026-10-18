"use client";

import React from "react";
import StitchNavbar from "@/components/StitchNavbar";
import { useTheme } from "@/context/ThemeContext";
import { PERSONAL_INFO, EXPERIENCE, PROJECTS, TECH_SKILLS } from "@/data/portfolioData";
import { FileText, Download, Mail, ExternalLink, GraduationCap, Briefcase, Code2, CheckCircle2 } from "lucide-react";

export default function ResumePage() {
  const { theme } = useTheme();
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

      <main className="relative z-10 flex-1 max-w-4xl mx-auto px-4 sm:px-6 pt-6 pb-20 w-full space-y-10">
        {/* Header Section */}
        <div className="text-center">
          <div
            className={`inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase px-3.5 py-1.5 rounded-full w-fit mb-3 ${
              isDark
                ? "bg-[#1f1638] text-purple-300 border border-purple-500/30"
                : "bg-purple-50 text-purple-700 border border-purple-200"
            }`}
          >
            <FileText size={13} />
            <span>Curriculum Vitae</span>
          </div>
          <h1
            className={`text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
            Resume &amp; Credentials
          </h1>
          <p
            className={`text-sm sm:text-base mt-2 max-w-xl mx-auto font-light ${
              isDark ? "text-slate-400" : "text-slate-600"
            }`}
          >
            Summary of engineering experience, production projects, education, and technical competencies.
          </p>

          {/* Action Download Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
            <a
              href="/resume.pdf"
              download="Adan_Adeel_Resume.pdf"
              className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-lg shadow-purple-950/40 transition-all active:scale-95 flex items-center gap-2"
            >
              <Download size={14} />
              <span>Download Resume (PDF)</span>
            </a>

            <a
              href={`mailto:${PERSONAL_INFO.email}?subject=Resume%20Request%20-%20Adan%20Adeel`}
              className={`px-5 py-2.5 rounded-xl text-xs font-medium border transition-all active:scale-95 flex items-center gap-2 ${
                isDark
                  ? "bg-white/[0.05] hover:bg-white/[0.1] text-slate-200 border-white/10"
                  : "bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-200"
              }`}
            >
              <Mail size={14} />
              <span>Request Updated Copy</span>
            </a>
          </div>
        </div>

        {/* Structured Resume Preview Card */}
        <div
          className={`p-7 sm:p-10 rounded-3xl border backdrop-blur-xl space-y-8 ${
            isDark
              ? "bg-[#161126]/90 border-white/10 shadow-2xl"
              : "bg-white/90 border-slate-200 shadow-xl"
          }`}
        >
          {/* Header Summary */}
          <div className="border-b border-white/10 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className={`text-2xl font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
                {PERSONAL_INFO.name}
              </h2>
              <p className="text-sm text-purple-400 font-mono mt-0.5">
                {PERSONAL_INFO.role}
              </p>
              <p className={`text-xs mt-1 ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                {PERSONAL_INFO.location} • {PERSONAL_INFO.email}
              </p>
            </div>
            <div className="text-xs font-mono text-right sm:text-right">
              <p className="text-emerald-400 font-semibold">{PERSONAL_INFO.status}</p>
              <p className={isDark ? "text-slate-500" : "text-slate-400"}>Class of 2029</p>
            </div>
          </div>

          {/* Education */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <GraduationCap size={16} className="text-purple-400" />
              <h3 className={`text-base font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
                Education
              </h3>
            </div>
            <div
              className={`p-4 rounded-2xl border ${
                isDark ? "bg-white/[0.02] border-white/5" : "bg-slate-50 border-slate-200"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1">
                <span className={`text-sm font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>
                  Bachelor of Science in Computer Science
                </span>
                <span className="text-xs font-mono text-purple-400">2025 – 2029 (Expected)</span>
              </div>
              <p className={`text-xs ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                Focus: AI Engineering, Distributed Systems, Data Structures &amp; Algorithms, OS Internals.
              </p>
            </div>
          </div>

          {/* Experience */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Briefcase size={16} className="text-purple-400" />
              <h3 className={`text-base font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
                Experience
              </h3>
            </div>
            <div className="space-y-3">
              {EXPERIENCE.map((exp, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl border ${
                    isDark ? "bg-white/[0.02] border-white/5" : "bg-slate-50 border-slate-200"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1">
                    <span className={`text-sm font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>
                      {exp.role} — <span className="text-purple-400">{exp.company}</span>
                    </span>
                    <span className="text-xs font-mono text-purple-400">{exp.year}</span>
                  </div>
                  <p className={`text-xs mb-2 ${isDark ? "text-slate-300" : "text-slate-600"}`}>
                    {exp.description}
                  </p>
                  <ul className="space-y-1">
                    {exp.highlights.map((h, hIdx) => (
                      <li key={hIdx} className={`text-xs flex items-start gap-1.5 ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                        <span className="text-purple-400">•</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Projects */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Code2 size={16} className="text-purple-400" />
              <h3 className={`text-base font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
                Core Projects
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PROJECTS.map((proj) => (
                <div
                  key={proj.id}
                  className={`p-4 rounded-2xl border ${
                    isDark ? "bg-white/[0.02] border-white/5" : "bg-slate-50 border-slate-200"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-sm font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
                      {proj.title}
                    </span>
                    <span className="text-[10px] font-mono text-purple-400">
                      {proj.category}
                    </span>
                  </div>
                  <p className={`text-xs line-clamp-2 mb-2 font-light ${isDark ? "text-slate-300" : "text-slate-600"}`}>
                    {proj.description}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {proj.tags.slice(0, 3).map((t, i) => (
                      <span key={i} className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${isDark ? "bg-white/5 text-slate-400" : "bg-slate-200 text-slate-700"}`}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <footer
        className={`relative z-10 w-full py-6 text-center text-xs transition-colors ${
          isDark ? "text-slate-500" : "text-slate-400"
        }`}
      >
        <p>© 2026 Adan Adeel • Resume &amp; Credentials.</p>
      </footer>
    </div>
  );
}
