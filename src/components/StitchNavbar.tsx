"use client";

import React from "react";
import Link from "next/link";
import { Sun, Moon, Calendar } from "lucide-react";
import { PERSONAL_INFO } from "@/data/portfolioData";

interface StitchNavbarProps {
  theme: "dark" | "light";
  onToggleTheme: () => void;
  activeTab?: string;
  onSelectTab?: (tab: string) => void;
  isStandalone?: boolean;
}

export default function StitchNavbar({
  theme,
  onToggleTheme,
  activeTab = "home",
  onSelectTab,
  isStandalone = false,
}: StitchNavbarProps) {
  const isDark = theme === "dark";

  const navLinks = [
    { id: "home", label: "Home", href: "#" },
    { id: "work", label: "Work", href: "#" },
    { id: "about", label: "About", href: "#" },
    { id: "skills", label: "Skills", href: "#" },
    { id: "contact", label: "Contact", href: "#" },
    { id: "resume", label: "Resume", href: "#" },
  ];

  return (
    <header className="relative z-30 w-full px-4 sm:px-6 lg:px-12 pt-6 pb-4 max-w-6xl mx-auto flex items-center justify-between">
      {/* Left: Theme toggle icon button */}
      <div className="flex items-center" data-purpose="theme-toggle-container">
        <button
          onClick={onToggleTheme}
          type="button"
          aria-label="Toggle theme mode"
          className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 active:scale-95 backdrop-blur-md shadow-lg cursor-pointer ${
            isDark
              ? "bg-white/[0.05] border border-white/10 text-slate-300 hover:text-white hover:bg-white/[0.09]"
              : "bg-white/90 border border-slate-200 text-slate-700 hover:text-slate-900 shadow-sm"
          }`}
        >
          {isDark ? (
            <Sun className="w-5 h-5 text-amber-300/90" />
          ) : (
            <Moon className="w-5 h-5 text-slate-700" />
          )}
        </button>
      </div>

      {/* Center: Floating Pill Navigation Bar */}
      <nav
        className={`hidden md:flex items-center p-1.5 rounded-full shadow-xl backdrop-blur-xl transition-colors duration-200 ${
          isDark
            ? "bg-white/[0.04] border border-white/10"
            : "bg-white/90 border border-slate-200/90 shadow-sm"
        }`}
        data-purpose="top-navigation"
      >
        {navLinks.map((link) => {
          const isActive = activeTab === link.id;
          return (
            <a
              key={link.id}
              href={link.href}
              onClick={() => onSelectTab && onSelectTab(link.id)}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs font-medium tracking-wide transition-all duration-150 ${
                isActive
                  ? isDark
                    ? "bg-[#241a3e] text-white border border-purple-500/30 shadow-md shadow-purple-900/40"
                    : "bg-slate-900 text-white shadow-sm"
                  : isDark
                  ? "text-slate-300 hover:text-white hover:bg-white/[0.07]"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              {link.label}
            </a>
          );
        })}
      </nav>

      {/* Right: Book a Call action button */}
      <div className="flex items-center" data-purpose="header-cta">
        <a
          href={`mailto:${PERSONAL_INFO.email}?subject=Booking%20Inquiry%20-%20Adan%20Adeel`}
          className={`inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 active:scale-95 backdrop-blur-md shadow-lg ${
            isDark
              ? "bg-white/[0.05] border border-white/10 hover:border-purple-500/40 text-slate-200 hover:text-white hover:bg-white/[0.09]"
              : "bg-white/95 border border-slate-200 hover:border-slate-300 text-slate-800 hover:bg-slate-50 shadow-sm"
          }`}
          data-purpose="book-call-button"
        >
          <Calendar className={`w-4 h-4 ${isDark ? "text-purple-300" : "text-purple-600"}`} />
          <span>Book a Call</span>
        </a>
      </div>
    </header>
  );
}
