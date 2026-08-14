"use client";

import React, { useState, useEffect } from "react";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { Github, Linkedin, Twitter, Instagram, ArrowUpRight, Menu, X, Sparkles, Clock } from "lucide-react";

interface NavbarProps {
  activeSection: string;
}

export default function Navbar({ activeSection }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [pktTime, setPktTime] = useState<string>("");
  const [sessionSeconds, setSessionSeconds] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const updateTimes = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString("en-US", {
        timeZone: "Asia/Karachi",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
      setPktTime(timeStr);
    };

    updateTimes();
    const clockInterval = setInterval(updateTimes, 1000);
    const sessionInterval = setInterval(() => setSessionSeconds((s) => s + 1), 1000);

    return () => {
      clearInterval(clockInterval);
      clearInterval(sessionInterval);
    };
  }, []);

  const formatSessionTime = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const navItems = [
    { id: "about", label: "ABOUT", number: "01" },
    { id: "journey", label: "JOURNEY", number: "02" },
    { id: "work", label: "WORK", number: "03" },
    { id: "stack", label: "STACK", number: "04" },
    { id: "contact", label: "CONTACT", number: "05" },
  ];

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const currentNumber = navItems.find((item) => item.id === activeSection)?.number || "01";

  return (
    <>
      {/* Mobile Top Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-[#0B080C]/90 backdrop-blur-md border-b border-[#1C171E] px-6 py-4 flex items-center justify-between">
        <div>
          <a href="#about" className="font-bold text-lg tracking-wider text-white">
            ADAN<span className="text-[#C4A0F5]">.ADEEL</span>
          </a>
          <div className="text-[10px] font-mono text-[#C4A0F5] flex items-center gap-1 mt-0.5" suppressHydrationWarning>
            <Clock size={10} />
            <span>PKT {mounted ? pktTime : "12:00:00 AM"}</span>
          </div>
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-lg bg-[#19121D] border border-[#2D1B4D] text-[#C4A0F5] hover:text-white transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[65px] z-40 bg-[#0B080C]/95 backdrop-blur-xl p-6 flex flex-col justify-between animate-fadeIn">
          <nav className="flex flex-col gap-6 mt-4">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-xl font-medium tracking-widest transition-colors flex items-center justify-between ${
                  activeSection === item.id ? "text-[#C4A0F5] font-bold" : "text-gray-400 hover:text-white"
                }`}
              >
                <span>{item.label}</span>
                <span className="text-xs font-mono text-gray-600">{item.number}</span>
              </a>
            ))}
          </nav>

          <div className="pt-6 border-t border-[#1C171E] space-y-4">
            <div className="flex items-center justify-between text-xs text-gray-400 font-mono" suppressHydrationWarning>
              <span className="flex items-center gap-1.5 text-[#C4A0F5]">
                <Clock size={12} />
                <span>PKT {mounted ? pktTime : "12:00:00 AM"}</span>
              </span>
              <span>SESSION {mounted ? formatSessionTime(sessionSeconds) : "00:00"}</span>
            </div>

            <div className="flex gap-4 text-gray-400">
              <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="hover:text-[#C4A0F5] transition-colors">
                <Github size={20} />
              </a>
              <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="hover:text-[#C4A0F5] transition-colors">
                <Linkedin size={20} />
              </a>
              <a href={PERSONAL_INFO.twitter} target="_blank" rel="noreferrer" className="hover:text-[#C4A0F5] transition-colors">
                <Twitter size={20} />
              </a>
              <a href={PERSONAL_INFO.instagram} target="_blank" rel="noreferrer" className="hover:text-[#C4A0F5] transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Fixed Left Sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 w-[38%] h-screen flex-col justify-between p-12 xl:p-16 z-20 overflow-hidden border-r border-[#1C171E]">
        {/* Ambient Glow */}
        <div className="absolute -left-32 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-purple-900/20 via-violet-600/10 to-transparent blur-3xl pointer-events-none animate-pulse-glow" />

        <div className="relative my-auto space-y-8 z-10">
          <div>
            {/* Live Time Counter Widget */}
            <div className="inline-flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-[#1A1224] border border-[#371F5E] text-xs font-mono text-[#C4A0F5] mb-4" suppressHydrationWarning>
              <span className="flex items-center gap-1.5">
                <Clock size={13} className="animate-spin-slow text-violet-400" />
                <span>PKT {mounted ? pktTime : "12:00:00 AM"}</span>
              </span>
              <span className="w-[1px] h-3 bg-[#371F5E]" />
              <span className="text-gray-400 text-[11px]">TIME ON SITE: {mounted ? formatSessionTime(sessionSeconds) : "00:00"}</span>
            </div>

            <h1 className="text-5xl xl:text-6xl font-bold uppercase tracking-tight text-white leading-none">
              <span className="block">ADAN</span>
              <span className="block text-gradient">ADEEL</span>
            </h1>
            <p className="mt-4 text-base xl:text-lg text-gray-300 font-light leading-relaxed">
              {PERSONAL_INFO.role}
            </p>
            <div className="mt-3 flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C4A0F5] opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#C4A0F5]" />
              </span>
              <span className="text-xs uppercase tracking-widest text-[#C4A0F5] font-medium">
                {PERSONAL_INFO.status}
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="relative py-4 flex flex-col gap-4">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`group relative flex items-center gap-4 text-xs tracking-widest font-semibold uppercase transition-all duration-300 ${
                    isActive ? "text-white translate-x-3" : "text-gray-500 hover:text-gray-200"
                  }`}
                >
                  <span
                    className={`h-[1px] transition-all duration-300 ${
                      isActive
                        ? "w-10 bg-[#C4A0F5]"
                        : "w-4 bg-gray-700 group-hover:w-8 group-hover:bg-gray-400"
                    }`}
                  />
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="ml-auto font-mono text-[10px] text-[#C4A0F5] bg-[#1E132B] px-2 py-0.5 rounded border border-[#3B1F5E]">
                      {item.number}
                    </span>
                  )}
                </a>
              );
            })}
          </nav>
        </div>

        {/* Footer Socials & Counter */}
        <div className="relative z-10 pt-6 flex flex-col gap-4">
          <div className="flex items-center gap-5 text-gray-500">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub Profile"
              className="hover:text-[#C4A0F5] transition-colors p-2 rounded-lg hover:bg-[#181021]"
            >
              <Github size={18} />
            </a>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn Profile"
              className="hover:text-[#C4A0F5] transition-colors p-2 rounded-lg hover:bg-[#181021]"
            >
              <Linkedin size={18} />
            </a>
            <a
              href={PERSONAL_INFO.twitter}
              target="_blank"
              rel="noreferrer"
              aria-label="X (Twitter) Profile"
              className="hover:text-[#C4A0F5] transition-colors p-2 rounded-lg hover:bg-[#181021]"
            >
              <Twitter size={18} />
            </a>
            <a
              href={PERSONAL_INFO.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram Profile"
              className="hover:text-[#C4A0F5] transition-colors p-2 rounded-lg hover:bg-[#181021]"
            >
              <Instagram size={18} />
            </a>
          </div>

          <div className="flex items-center justify-between text-xs font-mono text-gray-600">
            <button
              onClick={handleCopyEmail}
              className="hover:text-[#C4A0F5] transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span>{PERSONAL_INFO.email}</span>
              {copiedEmail ? (
                <span className="text-[10px] text-emerald-400 font-sans">Copied!</span>
              ) : (
                <ArrowUpRight size={14} />
              )}
            </button>
            <span className="text-gray-500">{currentNumber} / 05</span>
          </div>
        </div>
      </aside>
    </>
  );
}
