"use client";

import React, { useState } from "react";
import { PROJECTS, Project } from "@/data/portfolioData";
import ProjectModal from "./ProjectModal";
import { ArrowUpRight, Filter, ExternalLink, Github } from "lucide-react";

interface ProjectsSectionProps {
  onOpenModal?: (project: Project) => void;
}

export default function ProjectsSection({ onOpenModal }: ProjectsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [internalModalProject, setInternalModalProject] = useState<Project | null>(null);

  const categories = ["All", "Full-Stack", "Real-time", "Web Apps"];

  const filteredProjects =
    selectedCategory === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === selectedCategory);

  const handleCardClick = (project: Project) => {
    if (onOpenModal) {
      onOpenModal(project);
    } else {
      setInternalModalProject(project);
    }
  };

  return (
    <>
      <section
        id="work"
        className="min-h-screen flex flex-col justify-center py-20 px-6 sm:px-10 lg:px-12 border-b border-[#1C171E] relative"
      >
        <div className="max-w-2xl w-full relative z-10">
          {/* Section Label */}
          <div className="flex items-center gap-2 text-xs font-semibold tracking-widest text-[#C4A0F5] uppercase mb-6">
            <span className="w-8 h-[1px] bg-[#C4A0F5]" />
            <span>FEATURED PROJECTS</span>
          </div>

          {/* Section Heading */}
          <h2 className="text-4xl sm:text-5xl font-bold uppercase tracking-tight text-white mb-8 leading-tight">
            WHAT I’VE <span className="text-gradient">BUILT</span>
          </h2>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 mb-8">
            <span className="text-xs text-gray-400 flex items-center gap-1 mr-2">
              <Filter size={12} />
              <span>Filter:</span>
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono tracking-wider transition-all duration-300 cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-[#6D28D9] text-white font-semibold shadow-md shadow-purple-900/40"
                    : "bg-[#140E1A] text-gray-400 border border-[#231533] hover:text-white hover:border-[#C4A0F5]/30"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Projects List */}
          <div className="space-y-5">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => handleCardClick(project)}
                className="glass-panel p-6 rounded-2xl group cursor-pointer relative overflow-hidden transition-all duration-300 border border-[#2B1B48] hover:border-[#8B5CF6]"
              >
                {/* Accent Highlight Bar */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ backgroundColor: project.color }}
                />

                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="space-y-2 max-w-lg">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono uppercase font-bold tracking-widest px-2.5 py-0.5 rounded bg-[#1C1227] text-[#C4A0F5] border border-[#3A1F5E]">
                        {project.category}
                      </span>
                      {project.metrics && (
                        <span className="text-[10px] text-emerald-400 font-medium font-mono">
                          {project.metrics}
                        </span>
                      )}
                    </div>

                    <h3 className="text-2xl font-bold text-white uppercase tracking-tight group-hover:text-[#C4A0F5] transition-colors flex items-center gap-2">
                      <span>{project.title}</span>
                    </h3>

                    <p className="text-sm text-gray-300 font-light leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tech Pills */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#17101E] text-gray-300 border border-[#27183A]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions & Buttons */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-3 shrink-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-[#1C171E]">
                    <div className="flex items-center gap-2">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-2 rounded-xl bg-[#1D1429] border border-[#351D57] text-gray-300 hover:text-white hover:border-[#C4A0F5] transition-all cursor-pointer"
                        title="View GitHub Repository"
                      >
                        <Github size={16} />
                      </a>
                      <div className="p-2 rounded-xl bg-[#1D1429] border border-[#351D57] text-[#C4A0F5] group-hover:bg-[#6D28D9] group-hover:text-white transition-all duration-300">
                        <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                    </div>

                    <span className="text-[11px] font-mono text-gray-400 group-hover:text-[#C4A0F5] transition-colors font-semibold">
                      Inspect Project &rarr;
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Internal Modal fallback if not controlled by parent */}
      {!onOpenModal && (
        <ProjectModal
          project={internalModalProject}
          onClose={() => setInternalModalProject(null)}
        />
      )}
    </>
  );
}
