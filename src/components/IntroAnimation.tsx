"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, Terminal, Code2 } from "lucide-react";

interface IntroAnimationProps {
  onComplete: () => void;
}

export default function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const [phase, setPhase] = useState<"loading" | "fading" | "done">("loading");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Increment loading progress bar
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 5;
      });
    }, 40);

    // Transition out after 1.8 seconds
    const timer = setTimeout(() => {
      setPhase("fading");
      setTimeout(() => {
        setPhase("done");
        onComplete();
      }, 700);
    }, 1800);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(timer);
    };
  }, [onComplete]);

  if (phase === "done") return null;

  return (
    <div
      className={`fixed inset-0 z-[200] bg-[#0B080C] flex flex-col items-center justify-center p-6 transition-all duration-700 ease-in-out ${
        phase === "fading" ? "opacity-0 scale-105 pointer-events-none" : "opacity-100 scale-100"
      }`}
    >
      {/* Background Radial Glow */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-r from-purple-900/30 via-violet-600/20 to-transparent blur-3xl animate-pulse-glow pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center space-y-6 max-w-md">
        {/* Glowing Monogram Logo */}
        <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-tr from-purple-600 via-violet-600 to-indigo-600 p-[2px] shadow-2xl shadow-purple-900/50">
          <div className="w-full h-full rounded-[14px] bg-[#0B080C] flex items-center justify-center">
            <span className="text-2xl font-bold text-gradient font-mono">AA</span>
          </div>
        </div>

        {/* Title */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold uppercase tracking-tight text-white flex items-center justify-center gap-2">
            <span>ADAN</span>
            <span className="text-gradient">ADEEL</span>
          </h1>
          <div className="text-xs font-mono tracking-widest text-[#C4A0F5] uppercase flex items-center justify-center gap-2">
            <Sparkles size={13} className="animate-spin-slow text-violet-400" />
            <span>AI ENGINEER & FULL-STACK</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-64 space-y-2 pt-4">
          <div className="flex items-center justify-between text-[10px] font-mono text-gray-500">
            <span>INITIALIZING PORTFOLIO...</span>
            <span className="text-[#C4A0F5]">{progress}%</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-[#181122] overflow-hidden border border-[#2D1B4D]">
            <div
              className="h-full bg-gradient-to-r from-purple-600 via-violet-500 to-[#C4A0F5] transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Status Prompt */}
        <div className="text-[11px] font-mono text-gray-500 flex items-center gap-1.5">
          <Terminal size={12} className="text-emerald-400" />
          <span>System status: 🟢 Ready in Pakistan (PKT)</span>
        </div>
      </div>
    </div>
  );
}
