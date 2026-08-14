"use client";

import React, { useState } from "react";
import { TECH_SKILLS, SkillItem } from "@/data/portfolioData";
import { Code2 } from "lucide-react";

export default function AnimatedTechBar() {
  const [hoveredSkill, setHoveredSkill] = useState<SkillItem | null>(null);

  // Duplicate items for continuous infinite marquee loop
  const marqueeItems = [...TECH_SKILLS, ...TECH_SKILLS, ...TECH_SKILLS];

  return (
    <div className="w-full space-y-4 my-8">
      {/* Section Subhead */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#C4A0F5] uppercase">
          <Code2 size={14} />
          <span>TECHNOLOGY STACK MARQUEE</span>
        </div>
        <span className="text-[11px] font-mono text-gray-400 hidden sm:inline">
          (Hover over any tech to inspect)
        </span>
      </div>

      {/* Marquee Container */}
      <div className="relative w-full overflow-hidden py-3.5 glass-panel rounded-2xl border border-[#3A1F60] bg-[#120A1A]/90">
        {/* Left/Right Fade Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#0B080C] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#0B080C] to-transparent z-10 pointer-events-none" />

        {/* Scrolling Track */}
        <div className="flex gap-4 w-max animate-marquee hover:[animation-play-state:paused]">
          {marqueeItems.map((skill, index) => {
            const isHovered = hoveredSkill?.name === skill.name;

            return (
              <div
                key={`${skill.name}-${index}`}
                onMouseEnter={() => setHoveredSkill(skill)}
                onMouseLeave={() => setHoveredSkill(null)}
                className={`relative px-4 py-2.5 rounded-xl border flex items-center gap-2.5 transition-all duration-300 cursor-pointer select-none ${
                  isHovered
                    ? "bg-[#6D28D9] border-[#C4A0F5] scale-110 shadow-lg shadow-purple-900/60 z-20"
                    : "bg-[#1C1228] border-[#311C54] hover:border-[#8B5CF6] text-white"
                }`}
              >
                <span className="text-base">{skill.icon}</span>
                <span className={`text-xs font-mono font-bold tracking-wide whitespace-nowrap ${isHovered ? "text-white" : "text-slate-100"}`}>
                  {skill.name}
                </span>

                {/* Level Badge */}
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-bold ${
                    isHovered
                      ? "bg-white/20 text-white"
                      : "bg-[#291A3D] text-[#C4A0F5]"
                  }`}
                >
                  {skill.level}%
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Active Hover Card / Details Footer */}
      {hoveredSkill ? (
        <div className="p-4 rounded-xl bg-gradient-to-r from-[#1D112D] via-[#2A1544] to-[#1D112D] border border-[#8B5CF6] flex items-center justify-between text-xs animate-fadeIn">
          <div className="flex items-center gap-3">
            <span className="text-xl">{hoveredSkill.icon}</span>
            <div>
              <span className="font-bold text-white uppercase tracking-wider">{hoveredSkill.name}</span>
              <span className="ml-2 text-slate-200 font-light">— {hoveredSkill.description}</span>
            </div>
          </div>
          <span className="text-xs font-mono text-[#C4A0F5] bg-[#140C20] px-3 py-1 rounded-full border border-[#48257E] font-semibold">
            {hoveredSkill.category}
          </span>
        </div>
      ) : (
        <div className="p-3 rounded-xl bg-[#130E1A]/80 border border-[#21162E] text-center text-xs font-mono text-gray-400">
          Hover over any tech pill above to view proficiency breakdown & application context
        </div>
      )}

      {/* Marquee Animation Keyframes */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
      `}</style>
    </div>
  );
}
