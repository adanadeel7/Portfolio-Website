"use client";

import React, { useState, useEffect } from "react";
import { Terminal } from "lucide-react";

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
    }, 35);

    // Transition out after 1.6 seconds
    const timer = setTimeout(() => {
      setPhase("fading");
      setTimeout(() => {
        setPhase("done");
        onComplete();
      }, 500);
    }, 1600);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(timer);
    };
  }, [onComplete]);

  if (phase === "done") return null;

  return (
    <div
      className={`fixed inset-0 z-[200] bg-[#0B080C] flex flex-col items-center justify-center p-6 transition-opacity duration-500 ease-out ${
        phase === "fading" ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="relative z-10 flex flex-col items-center text-center space-y-6 max-w-md">
        {/* Monogram Logo */}
        <div className="w-16 h-16 rounded-xl bg-[#1A1126] border border-[#3B1F60] flex items-center justify-center">
          <span className="text-xl font-bold text-white font-mono">AA</span>
        </div>

        {/* Title */}
        <div className="space-y-1.5">
          <h1 className="text-3xl font-bold uppercase tracking-tight text-white flex items-center justify-center gap-2">
            <span>ADAN</span>
            <span className="text-[#A78BFA]">ADEEL</span>
          </h1>
          <div className="text-xs font-mono tracking-widest text-[#A78BFA] uppercase">
            AI ENGINEER & FULL-STACK DEVELOPER
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-64 space-y-2 pt-2">
          <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
            <span>LOADING PORTFOLIO...</span>
            <span className="text-[#A78BFA] font-semibold">{progress}%</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-[#181122] overflow-hidden border border-[#2D1B4D]">
            <div
              className="h-full bg-gradient-to-r from-purple-600 via-violet-500 to-[#A78BFA] transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Status Prompt */}
        <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
          <Terminal size={13} className="text-emerald-400" />
          <span>System status: Ready in Pakistan (PKT)</span>
        </div>
      </div>
    </div>
  );
}
