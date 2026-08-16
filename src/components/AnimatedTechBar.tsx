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
        <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#A78BFA] uppercase">
          <Code2 size={14} />
          <span>TECHNOLOGY STACK MARQUEE</span>
        </div>
        <span className="text-[11px] font-mono text-slate-400 hidden sm:inline">
          (Hover over any technology to inspect)
        </span>
      </div>

      {/* Marquee Container */}
      <div className="relative w-full overflow-hidden py-3.5 glass-panel rounded-xl border border-[#231535] bg-[#120A1A]">
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
                className={`relative px-4 py-2.5 rounded-lg border flex items-center gap-2.5 transition-all duration-200 cursor-pointer select-none ${
                  isHovered
                    ? "bg-[#251838] border-[#A78BFA] text-white"
                    : "bg-[#181122] border-[#251838] text-slate-200"
                }`}
              >
                <span className={`text-xs font-mono font-semibold tracking-wide whitespace-nowrap ${isHovered ? "text-white" : "text-slate-200"}`}>
                  {skill.name}
                </span>

                {/* Level Badge */}
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold ${
                    isHovered
                      ? "bg-[#6D28D9] text-white"
                      : "bg-[#100B17] text-slate-400 border border-[#231535]"
                  }`}
                >
                  {skill.level}%
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Active Hover Card */}
      {hoveredSkill ? (
        <div className="p-4 rounded-xl bg-[#181024] border border-[#A78BFA] flex items-center justify-between text-xs animate-fadeIn">
          <div>
            <span className="font-semibold text-white uppercase tracking-wider">{hoveredSkill.name}</span>
            <span className="ml-2 text-slate-300 font-light">-- {hoveredSkill.description}</span>
          </div>
          <span className="text-xs font-mono text-[#A78BFA] bg-[#100A1A] px-3 py-1 rounded-md border border-[#3B1F60] font-semibold">
            {hoveredSkill.category}
          </span>
        </div>
      ) : (
        <div className="p-3 rounded-xl bg-[#120D17] border border-[#1C1526] text-center text-xs font-mono text-slate-400">
          Hover over any technology badge above to view application context
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
