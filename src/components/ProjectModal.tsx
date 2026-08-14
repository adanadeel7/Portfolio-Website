"use client";

import React, { useEffect } from "react";
import { Project } from "@/data/portfolioData";
import { X, ExternalLink, Github, CheckCircle2, Cpu, BarChart2 } from "lucide-react";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    // Only lock scroll when project modal is active/open
    if (!project) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-[#0B080C]/90 backdrop-blur-xl animate-fadeIn overflow-y-auto"
      onClick={onClose}
    >
      {/* Opaque Solid Dark Modal Card (Prevents Background Bleed-Through) */}
      <div
        className="relative w-full max-w-3xl my-auto bg-[#140D1C] border border-[#3B1F60] rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6 text-gray-300 overflow-hidden z-[101]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2.5 rounded-xl bg-[#21142F] border border-[#43236C] text-gray-300 hover:text-white hover:border-[#C4A0F5] transition-colors cursor-pointer z-20"
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div className="space-y-3 pr-10">
          <div className="flex flex-wrap items-center gap-3">
            <span
              className="text-xs font-mono font-semibold px-3 py-1 rounded-full uppercase tracking-wider text-white"
              style={{ backgroundColor: `${project.color}33`, borderColor: project.color, borderWidth: 1 }}
            >
              {project.category}
            </span>
            {project.metrics && (
              <span className="text-xs font-mono font-medium text-emerald-400 bg-emerald-950/60 border border-emerald-500/40 px-3 py-1 rounded-full flex items-center gap-1.5">
                <BarChart2 size={13} />
                <span>{project.metrics}</span>
              </span>
            )}
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold uppercase text-white tracking-tight leading-tight break-words">
            {project.title}
          </h2>
          <p className="text-sm sm:text-base text-[#C4A0F5] font-medium leading-normal">{project.subtitle}</p>
        </div>

        {/* Mock Graphic Visual */}
        <div
          className="relative w-full h-44 sm:h-56 rounded-xl overflow-hidden border border-[#2B1948] p-5 flex flex-col justify-between"
          style={{
            background: `radial-gradient(circle at top right, ${project.color}30, #0B080C 85%)`,
          }}
        >
          <div className="flex items-center justify-between text-xs font-mono text-gray-400">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <span className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <span className="truncate max-w-[220px]">{project.id}.app / production</span>
          </div>

          <div className="my-auto space-y-1.5">
            <div className="text-xl sm:text-2xl font-bold text-white tracking-wide leading-tight">{project.title}</div>
            <div className="text-xs text-gray-300 max-w-md line-clamp-2 leading-relaxed">{project.description}</div>
          </div>

          <div className="flex flex-wrap gap-1.5 pt-2">
            {project.tags.map((t, idx) => (
              <span key={idx} className="text-[10px] font-mono px-2.5 py-0.5 rounded bg-black/70 text-gray-200 border border-white/10">
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Overview */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-white">Project Overview</h3>
          <p className="text-xs sm:text-sm leading-relaxed text-gray-300 font-light break-words">{project.longDescription}</p>
        </div>

        {/* Features & Architecture Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-[#231535]">
          {/* Key Features */}
          <div className="space-y-2.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#C4A0F5] flex items-center gap-2">
              <CheckCircle2 size={14} />
              <span>Key Features</span>
            </h3>
            <ul className="space-y-2">
              {project.features.map((feat, idx) => (
                <li key={idx} className="text-xs text-gray-300 flex items-start gap-2 leading-relaxed break-words">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C4A0F5] mt-1.5 shrink-0" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technical Architecture */}
          <div className="space-y-2.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#C4A0F5] flex items-center gap-2">
              <Cpu size={14} />
              <span>Technical Architecture</span>
            </h3>
            <ul className="space-y-2">
              {project.architecture.map((arch, idx) => (
                <li key={idx} className="text-xs text-gray-300 flex items-start gap-2 leading-relaxed break-words">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-1.5 shrink-0" />
                  <span>{arch}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Action Links */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-5 border-t border-[#231535]">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2.5 rounded-xl bg-[#1D132B] border border-[#3A1F5E] text-gray-300 hover:text-white font-medium text-xs tracking-wide flex items-center gap-2 hover:border-[#C4A0F5] transition-colors"
          >
            <Github size={16} />
            <span className="truncate">{project.githubUrl.replace("https://github.com/", "")}</span>
          </a>

          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 text-white font-medium text-xs tracking-wide flex items-center gap-2 hover:from-purple-500 hover:to-violet-500 transition-all shadow-lg shadow-purple-900/40"
          >
            <span>Repository & Demo</span>
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </div>
  );
}
