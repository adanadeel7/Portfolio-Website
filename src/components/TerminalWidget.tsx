"use client";

import React, { useState, useRef, useEffect } from "react";
import { TERMINAL_COMMANDS, PERSONAL_INFO } from "@/data/portfolioData";
import { Terminal as TerminalIcon, CornerDownLeft, RotateCcw } from "lucide-react";

export default function TerminalWidget() {
  const [history, setHistory] = useState<
    { command: string; output: string | string[] }[]
  >([
    {
      command: "welcome",
      output: [
        "Interactive Developer Terminal v1.0.4",
        "Type 'help' to view available commands.",
        "------------------------------------",
      ],
    },
  ]);
  const [inputVal, setInputVal] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim().toLowerCase();
    if (!cmd) return;

    if (cmd === "clear") {
      setHistory([]);
      setInputVal("");
      return;
    }

    let output: string | string[];
    if (cmd === "time") {
      const pktTime = new Date().toLocaleTimeString("en-US", { timeZone: "Asia/Karachi" });
      output = `Current Pakistan Local Time: ${pktTime} PKT (UTC+5:00)`;
    } else {
      output =
        TERMINAL_COMMANDS[cmd] ||
        `Command not recognized: '${cmd}'. Type 'help' for available commands.`;
    }

    setHistory((prev) => [...prev, { command: inputVal, output }]);
    setInputVal("");
  };

  const handleQuickCmd = (cmd: string) => {
    setInputVal(cmd);
    setTimeout(() => {
      if (inputRef.current) inputRef.current.focus();
    }, 50);
  };

  return (
    <div className="glass-panel rounded-2xl border border-[#3A1F60] overflow-hidden my-8 shadow-2xl">
      {/* Terminal Title Bar */}
      <div className="bg-[#160E1E] px-4 py-3 border-b border-[#2C1744] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/90" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/90" />
          <div className="w-3 h-3 rounded-full bg-green-500/90" />
          <span className="ml-2 text-xs font-mono text-[#DDD6FE] font-medium flex items-center gap-1.5">
            <TerminalIcon size={14} className="text-[#C4A0F5]" />
            <span>adan@portfolio:~</span>
          </span>
        </div>

        <button
          onClick={() => {
            setHistory([]);
            setInputVal("");
          }}
          className="text-gray-400 hover:text-white p-1 rounded transition-colors cursor-pointer"
          title="Clear terminal"
        >
          <RotateCcw size={14} />
        </button>
      </div>

      {/* Quick Action Chips */}
      <div className="bg-[#0F0816] px-4 py-2.5 border-b border-[#231238] flex flex-wrap items-center gap-2">
        <span className="text-[11px] font-mono text-gray-400 font-medium">Quick CLI:</span>
        {["help", "whoami", "skills", "projects", "contact", "time", "status"].map((cmd) => (
          <button
            key={cmd}
            onClick={() => handleQuickCmd(cmd)}
            className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-[#221338] text-[#C4A0F5] border border-[#3B1F60] hover:bg-[#6D28D9] hover:text-white transition-colors cursor-pointer font-semibold"
          >
            {cmd}
          </button>
        ))}
      </div>

      {/* Terminal Window Output - Ultra Crisp Legibility */}
      <div className="p-4 sm:p-5 font-mono text-xs sm:text-sm max-h-72 overflow-y-auto space-y-3 bg-[#0B0711]/95 text-slate-100">
        {history.map((item, idx) => (
          <div key={idx} className="space-y-1">
            {item.command !== "welcome" && (
              <div className="flex items-center gap-2 text-[#C4A0F5]">
                <span className="text-[#4ADE80] font-bold">adan@portfolio:~$</span>
                <span className="text-white font-semibold">{item.command}</span>
              </div>
            )}
            <div className="text-slate-200 font-normal leading-relaxed pl-3 border-l-2 border-[#6D28D9] bg-[#140D1F]/50 py-1 rounded-r-md">
              {Array.isArray(item.output) ? (
                item.output.map((line, lIdx) => <div key={lIdx}>{line}</div>)
              ) : (
                <div>{item.output}</div>
              )}
            </div>
          </div>
        ))}

        {/* Input Prompt Form */}
        <form onSubmit={handleSubmit} className="flex items-center gap-2 pt-2">
          <span className="text-[#4ADE80] font-bold shrink-0">adan@portfolio:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="type 'help' or 'whoami'..."
            className="w-full bg-transparent text-white font-semibold focus:outline-none font-mono text-xs sm:text-sm placeholder:text-gray-500"
          />
          <button type="submit" className="text-gray-400 hover:text-[#C4A0F5] p-1">
            <CornerDownLeft size={15} />
          </button>
        </form>
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
