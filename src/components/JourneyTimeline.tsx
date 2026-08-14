"use client";

import React from "react";
import { EXPERIENCE } from "@/data/portfolioData";
import { Briefcase, Calendar, ChevronRight, Check } from "lucide-react";

export default function JourneyTimeline() {
  return (
    <section
      id="journey"
      className="min-h-screen flex flex-col justify-center py-20 px-6 sm:px-10 lg:px-12 border-b border-[#1C171E] relative"
    >
      <div className="max-w-2xl relative z-10">
        {/* Section Label */}
        <div className="flex items-center gap-2 text-xs font-semibold tracking-widest text-[#C4A0F5] uppercase mb-6">
          <span className="w-8 h-[1px] bg-[#C4A0F5]" />
          <span>JOURNEY & EXPERIENCE</span>
        </div>

        {/* Section Heading */}
        <h2 className="text-4xl sm:text-5xl font-bold uppercase tracking-tight text-white mb-10 leading-tight">
          MY <span className="text-gradient">TIMELINE</span>
        </h2>

        {/* Timeline Container */}
        <div className="relative pl-6 sm:pl-8 space-y-8">
          {/* Timeline Line */}
          <div className="absolute left-[11px] sm:left-[15px] top-3 bottom-3 w-[2px] bg-gradient-to-b from-purple-600 via-violet-900 to-[#1C171E]" />

          {EXPERIENCE.map((item, index) => (
            <div key={index} className="relative group">
              {/* Timeline Dot Node */}
              <div
                className={`absolute -left-[31px] sm:-left-[37px] top-1.5 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                  item.current
                    ? "bg-[#6D28D9] border-[#C4A0F5] shadow-lg shadow-purple-500/50 scale-110"
                    : "bg-[#0B080C] border-gray-700 group-hover:border-[#C4A0F5] group-hover:bg-[#1C1029]"
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    item.current ? "bg-white" : "bg-gray-500 group-hover:bg-[#C4A0F5]"
                  }`}
                />
              </div>

              {/* Experience Card */}
              <div className="glass-panel p-5 sm:p-6 rounded-2xl space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-[#C4A0F5] font-semibold px-2.5 py-1 rounded-md bg-[#1F1430] border border-[#3A1F5E]">
                      {item.year}
                    </span>
                    {item.current && (
                      <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        Active
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-gray-500 flex items-center gap-1">
                    <Briefcase size={13} className="text-[#C4A0F5]" />
                    <span>{item.company}</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white uppercase tracking-wide flex items-center gap-2">
                    <span>{item.role}</span>
                  </h3>
                  <p className="text-sm text-gray-400 font-light mt-1.5 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Bullet Highlights */}
                {item.highlights && item.highlights.length > 0 && (
                  <ul className="pt-2 space-y-1.5 border-t border-[#1C171E]">
                    {item.highlights.map((highlight, hIdx) => (
                      <li key={hIdx} className="text-xs text-gray-400 flex items-start gap-2 leading-relaxed">
                        <ChevronRight size={14} className="text-[#C4A0F5] shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
