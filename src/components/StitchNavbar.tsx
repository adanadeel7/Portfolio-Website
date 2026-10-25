"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sun, Moon, Calendar, Menu, X, Home, Briefcase, User, Code2, Mail, FileText } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { PERSONAL_INFO } from "@/data/portfolioData";

interface StitchNavbarProps {
  theme?: "dark" | "light";
  onToggleTheme?: () => void;
  activeTab?: string;
  onSelectTab?: (tab: string) => void;
  isStandalone?: boolean;
}

export default function StitchNavbar({
  theme: propTheme,
  onToggleTheme: propToggleTheme,
  activeTab: propActiveTab,
  onSelectTab,
}: StitchNavbarProps) {
  const { theme: ctxTheme, toggleTheme: ctxToggleTheme } = useTheme();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const theme = propTheme || ctxTheme;
  const toggleTheme = propToggleTheme || ctxToggleTheme;
  const isDark = theme === "dark";

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { id: "home", label: "Home", href: "/", icon: <Home size={15} /> },
    { id: "work", label: "Work", href: "/work", icon: <Briefcase size={15} /> },
    { id: "about", label: "About", href: "/about", icon: <User size={15} /> },
    { id: "skills", label: "Skills", href: "/skills", icon: <Code2 size={15} /> },
    { id: "contact", label: "Contact", href: "/contact", icon: <Mail size={15} /> },
    { id: "resume", label: "Resume", href: "/resume", icon: <FileText size={15} /> },
  ];

  return (
    <header className="relative z-40 w-full px-3.5 sm:px-6 lg:px-12 pt-4 sm:pt-6 pb-3 max-w-6xl mx-auto flex items-center justify-between">
      {/* Left: Theme toggle icon button */}
      <div className="flex items-center" data-purpose="theme-toggle-container">
        <button
          onClick={toggleTheme}
          type="button"
          aria-label="Toggle theme mode"
          className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all duration-200 active:scale-95 backdrop-blur-md shadow-lg cursor-pointer ${
            isDark
              ? "bg-white/[0.05] border border-white/10 text-slate-300 hover:text-white hover:bg-white/[0.09]"
              : "bg-white/90 border border-slate-200 text-slate-700 hover:text-slate-900 shadow-sm"
          }`}
        >
          {isDark ? (
            <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300/90" />
          ) : (
            <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-slate-700" />
          )}
        </button>
      </div>

      {/* Center: Desktop Floating Pill Navigation Bar (visible md and up) */}
      <nav
        className={`hidden md:flex items-center p-1.5 rounded-full shadow-xl backdrop-blur-xl transition-colors duration-200 ${
          isDark
            ? "bg-white/[0.04] border border-white/10"
            : "bg-white/90 border border-slate-200/90 shadow-sm"
        }`}
        data-purpose="top-navigation"
      >
        {navLinks.map((link) => {
          const isActive = pathname === link.href || propActiveTab === link.id;
          return (
            <Link
              key={link.id}
              href={link.href}
              onClick={() => onSelectTab && onSelectTab(link.id)}
              className={`px-3.5 lg:px-5 py-2 rounded-full text-xs font-medium tracking-wide transition-all duration-150 ${
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
            </Link>
          );
        })}
      </nav>

      {/* Right: Actions on Desktop & Mobile */}
      <div className="flex items-center gap-2" data-purpose="header-cta">
        {/* Book a Call button (desktop & tablet) */}
        <a
          href={`mailto:${PERSONAL_INFO.email}?subject=Booking%20Inquiry%20-%20Adan%20Adeel`}
          className={`inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 active:scale-95 backdrop-blur-md shadow-lg ${
            isDark
              ? "bg-white/[0.05] border border-white/10 hover:border-purple-500/40 text-slate-200 hover:text-white hover:bg-white/[0.09]"
              : "bg-white/95 border border-slate-200 hover:border-slate-300 text-slate-800 hover:bg-slate-50 shadow-sm"
          }`}
          data-purpose="book-call-button"
        >
          <Calendar className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isDark ? "text-purple-300" : "text-purple-600"}`} />
          <span className="hidden sm:inline">Book a Call</span>
          <span className="sm:hidden text-xs">Call</span>
        </a>

        {/* Mobile Hamburger Menu Toggle Button (hidden on md and up) */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          type="button"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          className={`md:hidden w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 active:scale-95 backdrop-blur-md shadow-lg cursor-pointer ${
            isDark
              ? "bg-white/[0.06] border border-white/10 text-slate-200 hover:text-white"
              : "bg-white border border-slate-200 text-slate-800 shadow-sm"
          }`}
        >
          {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile Slide-Down Navigation Overlay & Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-3.5 top-18 z-50 animate-fadeIn">
          <div
            className={`p-4 rounded-3xl border shadow-2xl backdrop-blur-2xl space-y-2 ${
              isDark
                ? "bg-[#161126]/95 border-purple-500/20 text-slate-100 shadow-purple-950/50"
                : "bg-white/95 border-slate-200 text-slate-800 shadow-xl"
            }`}
          >
            <div className="grid grid-cols-2 gap-1.5">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || propActiveTab === link.id;
                return (
                  <Link
                    key={link.id}
                    href={link.href}
                    onClick={() => {
                      if (onSelectTab) onSelectTab(link.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all ${
                      isActive
                        ? isDark
                          ? "bg-purple-600 text-white shadow-md shadow-purple-900/50"
                          : "bg-slate-900 text-white"
                        : isDark
                        ? "bg-white/[0.04] text-slate-300 hover:bg-white/[0.08] hover:text-white"
                        : "bg-slate-100/80 text-slate-700 hover:bg-slate-200 hover:text-slate-900"
                    }`}
                  >
                    <span className={isActive ? "text-white" : isDark ? "text-purple-400" : "text-purple-600"}>
                      {link.icon}
                    </span>
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* Quick status bar in mobile menu */}
            <div
              className={`pt-2.5 mt-2 border-t flex items-center justify-between text-[11px] ${
                isDark ? "border-white/10 text-slate-400" : "border-slate-200 text-slate-500"
              }`}
            >
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Available for freelance &amp; AI roles</span>
              </div>
              <span className="font-mono text-purple-400">PKT (UTC+5)</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
