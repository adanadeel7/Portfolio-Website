"use client";

import React, { useState } from "react";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { Download, ArrowRight, CheckCircle2, Code2, Award, Terminal, Copy, Cpu, MapPin, GraduationCap, Github, Sparkles } from "lucide-react";

export default function HeroAbout() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenGithub = () => {
    window.open(PERSONAL_INFO.github, "_blank");
  };

  return (
    <section
      id="about"
      className="min-h-screen flex flex-col justify-center py-20 px-6 sm:px-10 lg:px-12 border-b border-[#1C171E] relative overflow-hidden"
    >
      <div className="max-w-2xl relative z-10 animate-fadeIn">
        {/* Site Entry Badge */}
        <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-[#C4A0F5] uppercase mb-6 px-3 py-1 rounded-full bg-[#180E26] border border-[#3B1F63] shadow-md shadow-purple-900/20">
          <Sparkles size={13} className="animate-spin-slow text-violet-400" />
          <span>AI ENGINEER & FULL-STACK DEVELOPER</span>
        </div>

        {/* Section Heading with Staggered Entrance Reveal */}
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-white mb-8 leading-tight">
          WHO <span className="text-gradient">I AM</span>
        </h2>

        {/* Main Bio Paragraphs */}
        <div className="space-y-5 text-gray-300 text-base sm:text-lg font-light leading-relaxed">
          <p>
            Hi! I&apos;m <strong className="text-white font-medium">Adan Adeel</strong>, a Computer Science undergraduate based in <strong className="text-white font-medium">Pakistan</strong> (expected graduation <span className="text-[#C4A0F5] font-mono">2029</span>). I am working towards becoming an <strong className="text-white font-medium">AI Engineer</strong> — bridging modern Web Engineering, Artificial Intelligence, and DevOps pipelines.
          </p>
          <p className="text-gray-400">
            Over the past <strong className="text-gray-200 font-medium">1 year of freelance experience</strong>, I&apos;ve engineered production web applications with the MERN Stack, real-time WebSockets, and PostgreSQL. From collaborative real-time code spaces like <strong className="text-gray-200 font-medium">HyperCode</strong> to food reels media apps, student LMS portals, and invoicing products, I enjoy shipping robust software.
          </p>
        </div>

        {/* Quick Location & Univ Meta */}
        <div className="flex flex-wrap items-center gap-4 mt-6 text-xs text-gray-400 font-mono">
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#181122] border border-[#2B1B48]">
            <MapPin size={14} className="text-[#C4A0F5]" />
            <span>{PERSONAL_INFO.location}</span>
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#181122] border border-[#2B1B48]">
            <GraduationCap size={14} className="text-[#C4A0F5]" />
            <span>Class of 2029 (Joined 2025)</span>
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-4 mt-8">
          <a
            href="#work"
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 text-white font-medium text-sm tracking-wide flex items-center gap-2 hover:from-purple-500 hover:to-violet-500 transition-all duration-300 shadow-lg shadow-purple-900/30 group"
          >
            <span>Explore Projects</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>

          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3.5 rounded-xl bg-[#17101E] border border-[#331C56] text-gray-200 hover:text-white font-medium text-sm tracking-wide flex items-center gap-2 hover:border-[#C4A0F5]/50 hover:bg-[#20152B] transition-all duration-300"
          >
            <Github size={16} className="text-[#C4A0F5]" />
            <span>GitHub (@adanadeel7)</span>
          </a>

          <button
            onClick={handleCopyEmail}
            className="px-4 py-3.5 rounded-xl bg-[#120E16] border border-[#21172B] text-gray-400 hover:text-[#C4A0F5] text-xs font-mono flex items-center gap-2 hover:border-[#C4A0F5]/30 transition-all duration-300 cursor-pointer"
            title="Copy Email"
          >
            {copied ? <CheckCircle2 size={14} className="text-emerald-400" /> : <Copy size={14} />}
            <span>{copied ? "Copied!" : "Copy Email"}</span>
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12 pt-10 border-t border-[#1C171E]">
          {PERSONAL_INFO.stats.map((stat, idx) => (
            <div key={idx} className="glass-panel p-4 rounded-xl relative group">
              <div className="text-3xl sm:text-4xl font-bold text-white tracking-tight flex items-baseline gap-1">
                <span>{stat.value}</span>
              </div>
              <div className="text-xs text-gray-400 font-medium mt-1 uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Focus Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          <div className="p-4 rounded-xl bg-[#120D17]/80 border border-[#241738] flex items-start gap-3">
            <div className="p-2.5 rounded-lg bg-[#211336] text-[#C4A0F5]">
              <Cpu size={18} />
            </div>
            <div>
              <div className="text-xs font-semibold text-white uppercase tracking-wider">AI Engineering & DevOps</div>
              <div className="text-xs text-gray-400 mt-1 leading-relaxed">
                Integrating AI models, WebSockets, Python, and containerized Docker environments into modern web apps.
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#120D17]/80 border border-[#241738] flex items-start gap-3">
            <div className="p-2.5 rounded-lg bg-[#211336] text-[#C4A0F5]">
              <Code2 size={18} />
            </div>
            <div>
              <div className="text-xs font-semibold text-white uppercase tracking-wider">Freelance Engineering</div>
              <div className="text-xs text-gray-400 mt-1 leading-relaxed">
                1 year shipping MERN & PostgreSQL applications for clients with fast turnaround and responsive interfaces.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
