"use client";

import React, { useState, useEffect } from "react";
import { PERSONAL_INFO } from "@/data/portfolioData";
import confetti from "canvas-confetti";
import { Mail, Send, Copy, Check, Clock, Globe, Github, Linkedin, Twitter, Instagram, Sparkles } from "lucide-react";

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#C4A0F5", "#8B5CF6", "#6D28D9", "#10B981"],
        });
      } catch (err) {
        // Fallback
      }
    }, 1000);
  };

  return (
    <section
      id="contact"
      className="min-h-screen flex flex-col justify-center py-20 px-6 sm:px-10 lg:px-12 relative overflow-hidden"
    >
      {/* Background Radial Purple Glow */}
      <div className="absolute -left-32 top-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-gradient-to-r from-purple-900/25 via-violet-600/15 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-2xl w-full relative z-10">
        {/* Section Label */}
        <div className="flex items-center gap-2 text-xs font-semibold tracking-widest text-[#C4A0F5] uppercase mb-6">
          <span className="w-8 h-[1px] bg-[#C4A0F5]" />
          <span>GET IN TOUCH</span>
        </div>

        {/* Section Heading */}
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-white mb-6 leading-tight">
          LET’S <span className="text-gradient">TALK</span>
        </h2>

        <p className="text-gray-400 font-light text-base sm:text-lg mb-8 leading-relaxed">
          Looking for an AI / Full-Stack Engineer, freelance developer, or collaborator? Send a message below or email me directly.
        </p>

        {/* Quick Email Copy & Availability Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          <div className="glass-panel p-4 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[#201431] text-[#C4A0F5]">
                <Mail size={18} />
              </div>
              <div className="text-xs">
                <div className="text-gray-400">Direct Email</div>
                <div className="text-white font-mono font-medium">{PERSONAL_INFO.email}</div>
              </div>
            </div>
            <button
              onClick={handleCopyEmail}
              className="p-2 rounded-lg bg-[#1B1129] border border-[#351D57] text-gray-400 hover:text-[#C4A0F5] transition-colors cursor-pointer"
              title="Copy Email"
            >
              {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
            </button>
          </div>

          <div className="glass-panel p-4 rounded-xl flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#201431] text-[#C4A0F5]">
              <Globe size={18} />
            </div>
            <div className="text-xs">
              <div className="text-gray-400">Timezone & Location</div>
              <div className="text-white font-medium flex items-center gap-1.5 mt-0.5">
                <Clock size={12} className="text-[#C4A0F5]" />
                <span>{PERSONAL_INFO.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        {submitted ? (
          <div className="glass-panel p-8 rounded-2xl text-center space-y-4 border border-emerald-500/40 bg-emerald-950/20 animate-fadeIn">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
              <Check size={24} />
            </div>
            <h3 className="text-2xl font-bold text-white uppercase tracking-wide">Message Delivered!</h3>
            <p className="text-sm text-gray-300 max-w-md mx-auto leading-relaxed">
              Thanks for reaching out, {formData.name}! I’ve received your message and will respond promptly.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({ name: "", email: "", subject: "", message: "" });
              }}
              className="mt-4 px-6 py-2.5 rounded-xl bg-[#1A1224] border border-[#371F5E] text-xs font-mono text-[#C4A0F5] hover:text-white transition-colors cursor-pointer"
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="glass-panel p-6 sm:p-8 rounded-2xl space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-gray-400">Your Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Alex Mercer"
                  className="w-full px-4 py-3 rounded-xl bg-[#0E0A12] border border-[#231535] text-white placeholder:text-gray-600 focus:outline-none focus:border-[#C4A0F5] transition-colors text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-gray-400">Your Email *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. alex@startup.io"
                  className="w-full px-4 py-3 rounded-xl bg-[#0E0A12] border border-[#231535] text-white placeholder:text-gray-600 focus:outline-none focus:border-[#C4A0F5] transition-colors text-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-wider text-gray-400">Subject</label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="e.g. Project Inquiry / SDE Opportunity"
                className="w-full px-4 py-3 rounded-xl bg-[#0E0A12] border border-[#231535] text-white placeholder:text-gray-600 focus:outline-none focus:border-[#C4A0F5] transition-colors text-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-wider text-gray-400">Message *</label>
              <textarea
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Hi Adan, I'd like to collaborate on..."
                className="w-full px-4 py-3 rounded-xl bg-[#0E0A12] border border-[#231535] text-white placeholder:text-gray-600 focus:outline-none focus:border-[#C4A0F5] transition-colors text-sm resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 text-white font-medium text-sm tracking-wider uppercase flex items-center justify-center gap-2 hover:from-purple-500 hover:to-indigo-500 transition-all shadow-lg shadow-purple-900/40 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <span>Sending...</span>
              ) : (
                <>
                  <span>Send Message</span>
                  <Send size={16} />
                </>
              )}
            </button>
          </form>
        )}

        {/* Footer Social Links */}
        <div className="mt-12 pt-8 border-t border-[#1C171E] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500" suppressHydrationWarning>
          <div>© {mounted ? new Date().getFullYear() : "2026"} Adan Adeel. Built with Next.js & Tailwind CSS.</div>
          <div className="flex gap-6">
            <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="hover:text-[#C4A0F5] transition-colors">
              GitHub (@adanadeel7)
            </a>
            <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="hover:text-[#C4A0F5] transition-colors">
              LinkedIn
            </a>
            <a href={PERSONAL_INFO.twitter} target="_blank" rel="noreferrer" className="hover:text-[#C4A0F5] transition-colors">
              X (Twitter)
            </a>
            <a href={PERSONAL_INFO.instagram} target="_blank" rel="noreferrer" className="hover:text-[#C4A0F5] transition-colors">
              Instagram
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
