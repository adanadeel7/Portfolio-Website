"use client";

import React from "react";
import StitchNavbar from "@/components/StitchNavbar";
import { useTheme } from "@/context/ThemeContext";
import { PERSONAL_INFO, EXPERIENCE } from "@/data/portfolioData";
import { User, MapPin, GraduationCap, Briefcase, Sparkles, Mail, Github, Linkedin, Twitter } from "lucide-react";

export default function AboutPage() {
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

      <main className="relative z-10 flex-1 max-w-4xl mx-auto px-4 sm:px-6 pt-6 pb-20 w-full space-y-12">
        {/* Intro Hero */}
        <div className="text-center">
          <div
            className={`inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase px-3.5 py-1.5 rounded-full w-fit mb-3 ${
              isDark
                ? "bg-[#1f1638] text-purple-300 border border-purple-500/30"
                : "bg-purple-50 text-purple-700 border border-purple-200"
            }`}
          >
            <User size={13} />
            <span>Profile &amp; Biography</span>
          </div>
          <h1
            className={`text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
            About Adan Adeel
          </h1>
          <p
            className={`text-sm sm:text-base mt-2 max-w-xl mx-auto font-light ${
              isDark ? "text-slate-400" : "text-slate-600"
            }`}
          >
            Computer Science undergraduate &amp; aspiring AI Engineer from Pakistan.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mt-4 text-xs font-mono">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border ${
                isDark
                  ? "bg-white/[0.04] text-purple-300 border-white/10"
                  : "bg-slate-100 text-slate-700 border-slate-200"
              }`}
            >
              <MapPin size={12} />
              <span>{PERSONAL_INFO.location}</span>
            </span>
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border ${
                isDark
                  ? "bg-white/[0.04] text-purple-300 border-white/10"
                  : "bg-slate-100 text-slate-700 border-slate-200"
              }`}
            >
              <GraduationCap size={12} />
              <span>BS Computer Science (Class of 2029)</span>
            </span>
          </div>
        </div>

        {/* Bio Card */}
        <div
          className={`p-7 sm:p-9 rounded-3xl border backdrop-blur-xl ${
            isDark
              ? "bg-[#161126]/85 border-white/10 shadow-2xl text-slate-200"
              : "bg-white/90 border-slate-200 shadow-xl text-slate-700"
          }`}
        >
          <h2
            className={`text-xl font-bold tracking-tight mb-4 ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
            Who I Am &amp; What Drives Me
          </h2>
          <div className="space-y-4 text-sm sm:text-base leading-relaxed font-light">
            <p>
              Hi! I&apos;m <strong className={isDark ? "text-white font-semibold" : "text-slate-900 font-semibold"}>Adan Adeel</strong>, an AI Engineer and Full-Stack Developer with 1+ year of freelance engineering experience. Currently pursuing my Bachelor of Science in Computer Science in Pakistan (Class of 2029).
            </p>
            <p>
              My focus is bridging high-performance web engineering (MERN stack, real-time WebSockets, PostgreSQL) with modern Artificial Intelligence models and reliable DevOps pipelines. Over the past year, I have designed and delivered production SaaS software, multi-user real-time collaborative workspaces like <strong className={isDark ? "text-purple-300 font-medium" : "text-purple-700 font-medium"}>HyperCode</strong>, invoice generation tools (<strong className={isDark ? "text-purple-300 font-medium" : "text-purple-700 font-medium"}>Equinox</strong>), student LMS portals (<strong className={isDark ? "text-purple-300 font-medium" : "text-purple-700 font-medium"}>EduPulse LMS</strong>), culinary video platforms (<strong className={isDark ? "text-purple-300 font-medium" : "text-purple-700 font-medium"}>CraveReels</strong>), and academic repositories (<strong className={isDark ? "text-purple-300 font-medium" : "text-purple-700 font-medium"}>Question Bank</strong>).
            </p>
            <p>
              I am passionate about clean, decoupled software architectures, low-latency concurrent systems, and building AI-driven user experiences that solve real problems.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 pt-6 border-t border-white/10">
            {PERSONAL_INFO.stats.map((stat, idx) => (
              <div
                key={idx}
                className={`p-3.5 rounded-2xl border text-center ${
                  isDark
                    ? "bg-white/[0.03] border-white/5"
                    : "bg-slate-50 border-slate-200"
                }`}
              >
                <div
                  className={`text-2xl sm:text-3xl font-extrabold ${
                    isDark ? "text-white" : "text-slate-900"
                  }`}
                >
                  {stat.value}
                </div>
                <div
                  className={`text-[11px] font-mono uppercase mt-1 ${
                    isDark ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Experience Timeline */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <Briefcase size={16} className="text-purple-400" />
            <h2
              className={`text-2xl font-bold tracking-tight ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              Journey &amp; Track Record
            </h2>
          </div>

          <div className="space-y-4">
            {EXPERIENCE.map((exp, idx) => (
              <div
                key={idx}
                className={`p-6 rounded-2xl border backdrop-blur-md ${
                  isDark
                    ? "bg-[#161126]/80 border-white/10"
                    : "bg-white/85 border-slate-200 shadow-sm"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                  <h3
                    className={`text-base font-bold ${
                      isDark ? "text-white" : "text-slate-900"
                    }`}
                  >
                    {exp.role}{" "}
                    <span className="text-purple-400 font-medium">@ {exp.company}</span>
                  </h3>
                  <span
                    className={`text-xs font-mono px-2.5 py-0.5 rounded-full w-fit ${
                      isDark
                        ? "bg-purple-950/60 text-purple-300 border border-purple-500/30"
                        : "bg-purple-50 text-purple-700 border border-purple-200"
                    }`}
                  >
                    {exp.year}
                  </span>
                </div>
                <p
                  className={`text-xs sm:text-sm mb-3 font-light ${
                    isDark ? "text-slate-300" : "text-slate-600"
                  }`}
                >
                  {exp.description}
                </p>
                <ul className="space-y-1">
                  {exp.highlights.map((h, hIdx) => (
                    <li
                      key={hIdx}
                      className={`text-xs flex items-start gap-2 ${
                        isDark ? "text-slate-400" : "text-slate-600"
                      }`}
                    >
                      <span className="text-purple-400 mt-0.5">•</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer
        className={`relative z-10 w-full py-6 text-center text-xs transition-colors ${
          isDark ? "text-slate-500" : "text-slate-400"
        }`}
      >
      </footer>
    </div>
  );
}
