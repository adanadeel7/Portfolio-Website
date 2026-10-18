"use client";

import React, { useState } from "react";
import StitchNavbar from "@/components/StitchNavbar";
import { useTheme } from "@/context/ThemeContext";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { Mail, Copy, CheckCircle2, Github, Linkedin, Twitter, MapPin, Send, MessageSquare } from "lucide-react";

export default function ContactPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [copied, setCopied] = useState(false);
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formMsg, setFormMsg] = useState("");

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailto = `mailto:${PERSONAL_INFO.email}?subject=Project%20Inquiry%20from%20${encodeURIComponent(
      formName
    )}&body=${encodeURIComponent(`Name: ${formName}\nEmail: ${formEmail}\n\nMessage:\n${formMsg}`)}`;
    window.location.href = mailto;
  };

  const socials = [
    { label: "GitHub", href: PERSONAL_INFO.github, icon: <Github size={16} />, handle: "@adanadeel7" },
    { label: "LinkedIn", href: PERSONAL_INFO.linkedin, icon: <Linkedin size={16} />, handle: "adanadeel" },
    { label: "Twitter / X", href: PERSONAL_INFO.twitter, icon: <Twitter size={16} />, handle: "@adancode" },
  ];

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
            <Mail size={13} />
            <span>Get In Touch</span>
          </div>
          <h1
            className={`text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
            Let&apos;s Build Together
          </h1>
          <p
            className={`text-sm sm:text-base mt-2 max-w-xl mx-auto font-light ${
              isDark ? "text-slate-400" : "text-slate-600"
            }`}
          >
            Open to AI engineering internships, freelance full-stack contracts, and high-impact distributed collaborations.
          </p>

          <div className="flex items-center justify-center gap-2 mt-3 text-xs font-mono text-purple-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Currently Open for Opportunities</span>
          </div>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column: Direct Info & Socials */}
          <div className="space-y-4">
            {/* Email Card */}
            <div
              className={`p-6 rounded-3xl border backdrop-blur-xl ${
                isDark
                  ? "bg-[#161126]/85 border-white/10 shadow-2xl"
                  : "bg-white/85 border-slate-200 shadow-md"
              }`}
            >
              <h2
                className={`text-lg font-bold mb-2 ${
                  isDark ? "text-white" : "text-slate-900"
                }`}
              >
                Direct Email
              </h2>
              <p
                className={`text-xs font-mono mb-4 break-all ${
                  isDark ? "text-purple-300" : "text-purple-700"
                }`}
              >
                {PERSONAL_INFO.email}
              </p>

              <div className="flex flex-wrap gap-2">
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-lg shadow-purple-950/40 transition-all active:scale-95 flex items-center gap-1.5"
                >
                  <Send size={13} />
                  <span>Send Message</span>
                </a>

                <button
                  onClick={handleCopyEmail}
                  className={`px-4 py-2 rounded-xl text-xs font-medium border transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer ${
                    isDark
                      ? "bg-white/[0.05] hover:bg-white/[0.1] text-slate-200 border-white/10"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-200"
                  }`}
                >
                  {copied ? <CheckCircle2 size={13} className="text-emerald-400" /> : <Copy size={13} />}
                  <span>{copied ? "Copied!" : "Copy Email"}</span>
                </button>
              </div>
            </div>

            {/* Location & Timezone Card */}
            <div
              className={`p-6 rounded-3xl border backdrop-blur-xl flex items-center gap-4 ${
                isDark
                  ? "bg-[#161126]/85 border-white/10 shadow-2xl"
                  : "bg-white/85 border-slate-200 shadow-md"
              }`}
            >
              <div className="w-12 h-12 rounded-2xl bg-purple-600/20 text-purple-400 flex items-center justify-center shrink-0">
                <MapPin size={22} />
              </div>
              <div>
                <h3 className={`text-sm font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
                  Location &amp; Timezone
                </h3>
                <p className={`text-xs mt-0.5 ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                  {PERSONAL_INFO.location}
                </p>
                <p className="text-[11px] font-mono text-emerald-400 mt-1">
                  Flexible for Remote Worldwide Collaboration
                </p>
              </div>
            </div>

            {/* Social Links */}
            <div
              className={`p-6 rounded-3xl border backdrop-blur-xl ${
                isDark
                  ? "bg-[#161126]/85 border-white/10 shadow-2xl"
                  : "bg-white/85 border-slate-200 shadow-md"
              }`}
            >
              <h3 className={`text-sm font-bold mb-3 ${isDark ? "text-white" : "text-slate-900"}`}>
                Find Me Online
              </h3>
              <div className="space-y-2">
                {socials.map((s, idx) => (
                  <a
                    key={idx}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className={`p-3 rounded-2xl border flex items-center justify-between transition-all group ${
                      isDark
                        ? "bg-white/[0.03] hover:bg-white/[0.08] border-white/5 hover:border-purple-400/30 text-slate-300 hover:text-white"
                        : "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700 hover:text-slate-900"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 text-xs font-semibold">
                      <span className="text-purple-400">{s.icon}</span>
                      <span>{s.label}</span>
                    </div>
                    <span className="text-xs font-mono text-purple-400 group-hover:translate-x-0.5 transition-transform">
                      {s.handle}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Direct Quick Message Form */}
          <div
            className={`p-6 sm:p-8 rounded-3xl border backdrop-blur-xl flex flex-col justify-between ${
              isDark
                ? "bg-[#161126]/85 border-white/10 shadow-2xl"
                : "bg-white/85 border-slate-200 shadow-md"
            }`}
          >
            <div>
              <div className="flex items-center gap-2 mb-2">
                <MessageSquare size={16} className="text-purple-400" />
                <h2 className={`text-lg font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
                  Drop a Note
                </h2>
              </div>
              <p className={`text-xs mb-6 font-light ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                Fill in your details and this form will launch your preferred mail client instantly.
              </p>

              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label className={`block text-xs font-medium mb-1.5 ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="Jane Doe"
                    className={`w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm outline-none transition-all ${
                      isDark
                        ? "bg-black/40 text-slate-100 border border-white/10 focus:border-purple-400 focus:ring-1 focus:ring-purple-400"
                        : "bg-slate-50 text-slate-900 border border-slate-200 focus:border-purple-600 focus:ring-1 focus:ring-purple-600"
                    }`}
                  />
                </div>

                <div>
                  <label className={`block text-xs font-medium mb-1.5 ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                    Your Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    placeholder="jane@company.com"
                    className={`w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm outline-none transition-all ${
                      isDark
                        ? "bg-black/40 text-slate-100 border border-white/10 focus:border-purple-400 focus:ring-1 focus:ring-purple-400"
                        : "bg-slate-50 text-slate-900 border border-slate-200 focus:border-purple-600 focus:ring-1 focus:ring-purple-600"
                    }`}
                  />
                </div>

                <div>
                  <label className={`block text-xs font-medium mb-1.5 ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                    Message / Project Brief
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formMsg}
                    onChange={(e) => setFormMsg(e.target.value)}
                    placeholder="Hi Adan, we'd like to discuss an opportunity..."
                    className={`w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm outline-none transition-all resize-none ${
                      isDark
                        ? "bg-black/40 text-slate-100 border border-white/10 focus:border-purple-400 focus:ring-1 focus:ring-purple-400"
                        : "bg-slate-50 text-slate-900 border border-slate-200 focus:border-purple-600 focus:ring-1 focus:ring-purple-600"
                    }`}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-purple-950/40 transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send size={14} />
                  <span>Send Inquiry</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>

      <footer
        className={`relative z-10 w-full py-6 text-center text-xs transition-colors ${
          isDark ? "text-slate-500" : "text-slate-400"
        }`}
      >
        <p>© 2026 Adan Adeel • Get in Touch.</p>
      </footer>
    </div>
  );
}
