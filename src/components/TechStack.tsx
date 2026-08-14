"use client";

import React from "react";
import { TECH_SKILLS } from "@/data/portfolioData";
import AnimatedTechBar from "./AnimatedTechBar";
import TerminalWidget from "./TerminalWidget";
import { Layout, Server, Cpu, Code } from "lucide-react";

export default function TechStack() {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "MERN & Web":
        return <Layout size={18} className="text-[#C4A0F5]" />;
      case "AI & Languages":
        return <Cpu size={18} className="text-[#C4A0F5]" />;
      case "DevOps & Databases":
        return <Server size={18} className="text-[#C4A0F5]" />;
      default:
        return <Code size={18} className="text-[#C4A0F5]" />;
    }
  };

  const categories = ["MERN & Web", "AI & Languages", "DevOps & Databases"] as const;

  return (
    <section
      id="stack"
      className="min-h-screen flex flex-col justify-center py-20 px-6 sm:px-10 lg:px-12 relative"
    >
      <div className="max-w-2xl w-full relative z-10">
        {/* Section Label */}
        <div className="flex items-center gap-2 text-xs font-semibold tracking-widest text-[#C4A0F5] uppercase mb-6 px-3 py-1 rounded-full bg-[#180E26] border border-[#3B1F63] shadow-md shadow-purple-900/20 w-fit">
          <span>SKILLS & STACK</span>
        </div>

        {/* Section Heading */}
        <h2 className="text-4xl sm:text-5xl font-bold uppercase tracking-tight text-white mb-8 leading-tight">
          WHAT I <span className="text-gradient">USE</span>
        </h2>

        {/* ANIMATED HOVER TECH BAR */}
        <AnimatedTechBar />

        {/* Skill Categories Breakdown */}
        <div className="space-y-6 mt-8">
          {categories.map((catName, cIdx) => {
            const catSkills = TECH_SKILLS.filter((s) => s.category === catName);
            return (
              <div key={cIdx} className="glass-panel p-6 rounded-2xl space-y-4 border border-[#2D1C48]">
                <div className="flex items-center gap-3 pb-3 border-b border-[#231535]">
                  <div className="p-2 rounded-lg bg-[#1D122B] border border-[#351D59]">
                    {getCategoryIcon(catName)}
                  </div>
                  <h3 className="text-lg font-bold text-white uppercase tracking-wide">
                    {catName}
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {catSkills.map((skill, sIdx) => (
                    <div key={sIdx} className="space-y-1.5 p-2 rounded-lg hover:bg-[#1C1228] transition-colors">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-white flex items-center gap-1.5">
                          <span>{skill.icon}</span>
                          <span>{skill.name}</span>
                        </span>
                        <span className="font-mono text-[#C4A0F5] font-semibold">{skill.level}%</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-[#160F1F] overflow-hidden border border-[#2B1944]">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-purple-600 via-violet-500 to-[#C4A0F5] transition-all duration-500"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                      <div className="text-[11px] text-gray-300 font-light truncate">
                        {skill.description}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Developer Terminal Widget */}
        <div className="mt-10">
          <div className="text-xs font-semibold tracking-widest text-gray-300 uppercase mb-2">
            Try the Developer Terminal:
          </div>
          <TerminalWidget />
        </div>
      </div>
    </section>
  );
}
