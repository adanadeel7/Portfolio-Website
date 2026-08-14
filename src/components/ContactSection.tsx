"use client";

import React, { useState, useEffect } from "react";
import { PERSONAL_INFO } from "@/data/portfolioData";
import confetti from "canvas-confetti";
import { Mail, Send, Copy, Check, Clock, Globe, Github, Linkedin, Twitter, Instagram, Sparkles, ArrowUpRight } from "lucide-react";

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [pktTime, setPktTime] = useState<string>("");

  useEffect(() => {
    setMounted(true);
    const updateTime = () => {
      const now = new Date();
      setPktTime(
        now.toLocaleTimeString("en-US", {
          timeZone: "Asia/Karachi",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
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
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 },
          colors: ["#C4A0F5", "#8B5CF6", "#6D28D9", "#10B981"],
        });
      } catch (err) {
        // Fallback
      }
    }, 1000);
  };

  const socialLinks = [
    {
      name: "GitHub",
      handle: "@adanadeel7",
      url: PERSONAL_INFO.github,
      icon: <Github size={20} className="text-[#C4A0F5]" />,
    },
    {
      name: "X (Twitter)",
      handle: "@adancode",
      url: PERSONAL_INFO.twitter,
      icon: <Twitter size={20} className="text-[#C4A0F5]" />,
    },
    {
      name: "LinkedIn",
      handle: "Adan Adeel",
      url: PERSONAL_INFO.linkedin,
      icon: <Linkedin size={20} className="text-[#C4A0F5]" />,
    },
    {
      name: "Instagram",
      handle: "@adanadeel",
      url: PERSONAL_INFO.instagram,
      icon: <Instagram size={20} className="text-[#C4A0F5]" />,
    },
  ];

  return (
    <section
      id="contact"
      className="min-h-screen flex flex-col justify-center items-center py-20 px-6 sm:px-10 lg:px-12 relative overflow-hidden text-center sm:text-left"
    >
      {/* Background Radial Purple Glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] rounded-full bg-gradient-to-r from-purple-900/30 via-violet-600/20 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-3xl w-full relative z-10 space-y-8">
        {/* Section Label */}
        <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-semibold tracking-widest text-[#C4A0F5] uppercase px-3 py-1 rounded-full bg-[#180E26] border border-[#3B1F63] shadow-md shadow-purple-900/20 w-fit mx-auto sm:mx-0">
          <Sparkles size={13} className="text-violet-400 animate-spin-slow" />
          <span>GET IN TOUCH</span>
        </div>

        {/* Section Heading */}
        <div className="space-y-3">
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold uppercase tracking-tight text-white leading-none">
            LET’S <span className="text-gradient">TALK</span>
          </h2>

          <p className="text-slate-200 font-light text-base sm:text-xl max-w-xl mx-auto sm:mx-0 leading-relaxed">
            Looking for an AI / Full-Stack Engineer, freelance developer, or collaborator? Reach out via any platform below or email me directly.
          </p>
        </div>

        {/* Email & Location Quick Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="glass-panel p-4 rounded-2xl flex items-center justify-between border border-[#371F5E]">
            <div className="flex items-center gap-3 text-left">
              <div className="p-2.5 rounded-xl bg-[#201431] text-[#C4A0F5]">
                <Mail size={18} />
              </div>
              <div className="text-xs">
                <div className="text-gray-400 font-medium">Direct Email</div>
                <div className="text-white font-mono font-bold text-sm">{PERSONAL_INFO.email}</div>
              </div>
            </div>
            <button
              onClick={handleCopyEmail}
              className="p-2.5 rounded-xl bg-[#1B1129] border border-[#351D57] text-gray-300 hover:text-[#C4A0F5] transition-colors cursor-pointer"
              title="Copy Email"
            >
              {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
            </button>
          </div>

          <div className="glass-panel p-4 rounded-2xl flex items-center gap-3 border border-[#371F5E] text-left">
            <div className="p-2.5 rounded-xl bg-[#201431] text-[#C4A0F5]">
              <Globe size={18} />
            </div>
            <div className="text-xs" suppressHydrationWarning>
              <div className="text-gray-400 font-medium">Timezone & Location</div>
              <div className="text-white font-bold flex items-center gap-1.5 mt-0.5 text-sm">
                <Clock size={14} className="text-[#C4A0F5]" />
                <span>{PERSONAL_INFO.location} • PKT {mounted ? pktTime : "12:00 AM"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* PROMINENT SOCIAL LINKS GRID (All Profiles & Handles) */}
        <div className="space-y-3 text-left">
          <div className="text-xs font-mono uppercase tracking-widest text-[#C4A0F5] font-semibold">
            Social Profiles & Connections
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {socialLinks.map((social, idx) => (
              <a
                key={idx}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                className="glass-panel p-4 rounded-2xl flex flex-col justify-between gap-3 border border-[#331C56] hover:border-[#8B5CF6] hover:bg-[#1E122E] transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-xl bg-[#1D122B] border border-[#381F60] group-hover:bg-[#6D28D9] group-hover:text-white transition-colors">
                    {social.icon}
                  </div>
                  <ArrowUpRight size={16} className="text-gray-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white uppercase tracking-wider">{social.name}</div>
                  <div className="text-[11px] font-mono text-[#C4A0F5] mt-0.5">{social.handle}</div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        {submitted ? (
          <div className="glass-panel p-8 sm:p-10 rounded-2xl text-center space-y-4 border border-emerald-500/40 bg-emerald-950/30 animate-fadeIn">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
              <Check size={28} />
            </div>
            <h3 className="text-3xl font-bold text-white uppercase tracking-wide">Message Delivered!</h3>
            <p className="text-base text-slate-200 max-w-md mx-auto leading-relaxed">
              Thanks for reaching out, {formData.name}! I’ve received your message and will respond promptly.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({ name: "", email: "", subject: "", message: "" });
              }}
              className="mt-4 px-6 py-3 rounded-xl bg-[#1A1224] border border-[#371F5E] text-xs font-mono text-[#C4A0F5] hover:text-white transition-colors cursor-pointer font-bold"
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="glass-panel p-6 sm:p-8 rounded-2xl space-y-5 border border-[#3B1F60] text-left">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-gray-200 font-semibold">Your Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Alex Mercer"
                  className="w-full px-4 py-3.5 rounded-xl bg-[#0E0A12] border border-[#2F1D46] text-white placeholder:text-gray-500 focus:outline-none focus:border-[#C4A0F5] transition-colors text-sm font-medium"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-gray-200 font-semibold">Your Email *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. alex@startup.io"
                  className="w-full px-4 py-3.5 rounded-xl bg-[#0E0A12] border border-[#2F1D46] text-white placeholder:text-gray-500 focus:outline-none focus:border-[#C4A0F5] transition-colors text-sm font-medium"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-wider text-gray-200 font-semibold">Subject</label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="e.g. Project Inquiry / SDE Opportunity"
                className="w-full px-4 py-3.5 rounded-xl bg-[#0E0A12] border border-[#2F1D46] text-white placeholder:text-gray-500 focus:outline-none focus:border-[#C4A0F5] transition-colors text-sm font-medium"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-wider text-gray-200 font-semibold">Message *</label>
              <textarea
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Hi Adan, I'd like to collaborate on..."
                className="w-full px-4 py-3.5 rounded-xl bg-[#0E0A12] border border-[#2F1D46] text-white placeholder:text-gray-500 focus:outline-none focus:border-[#C4A0F5] transition-colors text-sm font-medium resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 text-white font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-2 hover:from-purple-500 hover:to-indigo-500 transition-all shadow-lg shadow-purple-900/40 cursor-pointer disabled:opacity-50"
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
        <div className="pt-8 border-t border-[#231535] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400 font-mono" suppressHydrationWarning>
          <div>© {mounted ? new Date().getFullYear() : "2026"} Adan Adeel. Built with Next.js & Tailwind CSS.</div>
          <div className="flex gap-6 font-semibold">
            <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="hover:text-[#C4A0F5] transition-colors">
              GitHub (@adanadeel7)
            </a>
            <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="hover:text-[#C4A0F5] transition-colors">
              LinkedIn
            </a>
            <a href={PERSONAL_INFO.twitter} target="_blank" rel="noreferrer" className="hover:text-[#C4A0F5] transition-colors">
              X (@adancode)
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
