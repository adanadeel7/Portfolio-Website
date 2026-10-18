"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";
import { PERSONAL_INFO, PROJECTS, TECH_SKILLS, EXPERIENCE } from "@/data/portfolioData";
import {
  Send,
  Sparkles,
  Code2,
  Briefcase,
  User,
  Mail,
  FileText,
  ExternalLink,
  Github,
} from "lucide-react";

interface StitchAIConsoleProps {
  theme?: "dark" | "light";
  onThemeToggle?: () => void;
  showFullHeader?: boolean;
}

interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  badges?: string[];
  links?: { label: string; href: string }[];
}

export default function StitchAIConsole({
  theme = "dark",
  onThemeToggle,
  showFullHeader = true,
}: StitchAIConsoleProps) {
  const isDark = theme === "dark";
  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [activePromptLabel, setActivePromptLabel] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const chatScrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll inside chat when messages update
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Exact 3D Cursor-Following Dynamics for the Avatar
  const avatarRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const cursorDist = useMotionValue(1);

  // Smooth, reactive organic spring physics
  const springConfig = { damping: 22, stiffness: 150, mass: 0.65 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);
  const smoothDist = useSpring(cursorDist, springConfig);

  // 3D rotations directly following cursor coordinate
  // Cursor to right -> head turns right (rotateY positive)
  const rotateY = useTransform(smoothX, [-1, 1], [-30, 30]);
  // Cursor below avatar -> head tilts down (rotateX negative)
  const rotateX = useTransform(smoothY, [-1, 1], [24, -24]);
  // Organic head roll tilt when looking sideways
  const rotateZ = useTransform(smoothX, [-1, 1], [-7, 7]);

  // Head physically translates towards cursor (leaning in)
  const headTranslateX = useTransform(smoothX, [-1, 1], [-16, 16]);
  const headTranslateY = useTransform(smoothY, [-1, 1], [-10, 10]);

  // Dynamic 3D depth shadow that shifts opposite to the head's angle
  const shadowOffsetX = useTransform(smoothX, [-1, 1], [16, -16]);
  const shadowOffsetY = useTransform(smoothY, [-1, 1], [24, 10]);
  const avatarShadow = useMotionTemplate`drop-shadow(${shadowOffsetX}px ${shadowOffsetY}px 26px rgba(0, 0, 0, 0.42))`;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!avatarRef.current) return;
      const rect = avatarRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Vector from avatar center to cursor
      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;

      // Sensitive viewport threshold for natural responsive tracking
      const maxDistX = Math.max(window.innerWidth / 2, 450);
      const maxDistY = Math.max(window.innerHeight / 2, 450);

      const normX = Math.max(-1, Math.min(1, dx / maxDistX));
      const normY = Math.max(-1, Math.min(1, dy / maxDistY));

      mouseX.set(normX);
      mouseY.set(normY);

      const dist = Math.sqrt(dx * dx + dy * dy);
      cursorDist.set(Math.min(1, dist / 500));
    };

    const handleMouseLeave = () => {
      // Smoothly return gaze to center when cursor leaves window
      mouseX.set(0);
      mouseY.set(0);
      cursorDist.set(1);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [mouseX, mouseY, cursorDist]);

  const presetQueries = [
    {
      label: "Work",
      icon: <Briefcase size={13} />,
      query: "Show me all of Adan's featured projects and work",
      answer: `Here are all 5 of Adan's core engineering projects:

1. HyperCode — Real-time collaborative code editor with live cursor sync & multi-language execution.
2. Equinox — Freelance invoicing tool & automated billing SaaS for freelancers.
3. CraveReels — Short-video culinary discovery app with vertical feed & interactive recipe overlays.
4. EduPulse LMS — Student learning management portal with role-based auth & PostgreSQL records.
5. Question Bank — Centralized academic & exam repository for course question management & practice.`,
      badges: [
        "HyperCode",
        "Equinox",
        "CraveReels",
        "EduPulse LMS",
        "Question Bank",
      ],
      links: [
        { label: "HyperCode (Live)", href: "https://hyper-code.vercel.app/" },
        { label: "Equinox (Live)", href: "https://saas-app-ekj6.onrender.com/" },
        { label: "Question Bank (GitHub)", href: "https://github.com/adanadeel7/Question-Bank" },
        { label: "CraveReels (GitHub)", href: "https://github.com/adanadeel7/Reels-Project" },
        { label: "EduPulse LMS (GitHub)", href: "https://github.com/adanadeel7/LMS-Project-" },
      ],
    },
    {
      label: "About me",
      icon: <User size={13} />,
      query: "Who is Adan Adeel and what is his background?",
      answer: `Adan Adeel is an AI Engineer and Full-Stack Developer with 1+ year of freelance engineering experience. Currently pursuing his Bachelor of Science in Computer Science in Pakistan (Class of 2029).

Adan bridges modern web applications (MERN stack, real-time WebSockets, PostgreSQL) with Artificial Intelligence engineering and resilient DevOps pipelines. Over the past year, he has shipped production SaaS tools, collaborative workspaces, educational LMS platforms, and video discovery apps. He is dedicated to creating high-performance, intelligent software architectures.`,
      badges: ["AI Engineer", "Full-Stack Dev", "1+ Yr Freelance", "Pakistan (UTC+5)", "Class of 2029"],
      links: [
        { label: "LinkedIn Profile", href: PERSONAL_INFO.linkedin },
        { label: "GitHub Profile", href: PERSONAL_INFO.github },
      ],
    },
    {
      label: "Skills",
      icon: <Code2 size={13} />,
      query: "What technologies and skills do you excel at?",
      answer: `Adan's core technical stack and competencies:

• Frontend: React.js, Next.js, Tailwind CSS, TypeScript, Framer Motion
• Backend & Real-time: Node.js, Express, WebSockets (Socket.io), REST APIs
• Databases: MongoDB (Mongoose), PostgreSQL (Prisma ORM)
• AI & Languages: Python, AI Engineering fundamentals, C++
• DevOps & Tooling: Docker, Git & GitHub, CI/CD basics`,
      badges: [
        "React & Next.js",
        "Node.js & Express",
        "WebSockets",
        "PostgreSQL & Prisma",
        "MongoDB",
        "Python & AI",
        "Docker",
        "TypeScript",
      ],
      links: [
        { label: "View GitHub Repos", href: PERSONAL_INFO.github },
      ],
    },
    {
      label: "Contact",
      icon: <Mail size={13} />,
      query: "How can I contact Adan or collaborate?",
      answer: `You can reach Adan directly for full-stack contracts, AI engineering internships, or engineering collaborations:

• Email: adanadeel903@gmail.com
• Location: Pakistan (PKT / UTC+5)
• GitHub: github.com/adanadeel7
• LinkedIn: linkedin.com/in/adanadeel
• Twitter/X: @adancode`,
      badges: ["Open for Work", "Pakistan (PKT / UTC+5)", "Fast Response"],
      links: [
        { label: "Email Directly", href: `mailto:${PERSONAL_INFO.email}` },
        { label: "GitHub Profile", href: PERSONAL_INFO.github },
        { label: "LinkedIn Profile", href: PERSONAL_INFO.linkedin },
        { label: "Twitter / X", href: PERSONAL_INFO.twitter },
      ],
    },
    {
      label: "Resume",
      icon: <FileText size={13} />,
      query: "Can I view or download Adan's resume?",
      answer: `Adan Adeel's resume highlights his 1+ year of freelance full-stack engineering, production projects (HyperCode, Equinox, CraveReels, Question Bank, EduPulse LMS), complete technology stack (MERN, PostgreSQL, WebSockets, Python, Docker), and Computer Science degree coursework.`,
      badges: ["Resume Ready", "Full-Stack & AI", "PDF Document"],
      links: [
        { label: "Download Resume (PDF)", href: "/resume.pdf" },
        { label: "Request via Email", href: `mailto:${PERSONAL_INFO.email}?subject=Resume%20Request%20-%20Adan%20Adeel` },
      ],
    },
  ];

  const handleQuery = (queryText: string, preset?: (typeof presetQueries)[0]) => {
    // Rate limit: Allow only 1 query at a time until the previous is fully completed
    if (isTyping || !queryText.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      text: queryText,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal("");
    setIsTyping(true);
    setActivePromptLabel(preset?.label || null);

    setTimeout(() => {
      let aiText = "";
      let badges: string[] | undefined = undefined;
      let links: { label: string; href: string }[] | undefined = undefined;

      const lower = queryText.toLowerCase();

      if (preset) {
        aiText = preset.answer;
        badges = preset.badges;
        links = preset.links;
      } else if (lower.includes("question") || lower.includes("bank") || lower.includes("exam")) {
        aiText = "Question Bank is Adan's centralized academic repository and question management system enabling students to search, practice, and review categorized course questions and past papers.";
        badges = ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"];
        links = [{ label: "Question Bank Repo", href: "https://github.com/adanadeel7/Question-Bank" }];
      } else if (lower.includes("hypercode") || lower.includes("editor") || lower.includes("collab")) {
        aiText = "HyperCode is Adan's real-time collaborative workspace featuring concurrent code editing via WebSockets, multi-language execution (JS, Python, C++), and active cursor sync.";
        badges = ["MERN Stack", "WebSockets", "Monaco Editor"];
        links = [{ label: "HyperCode Demo", href: "https://hyper-code.vercel.app/" }];
      } else if (lower.includes("equinox") || lower.includes("invoice") || lower.includes("billing")) {
        aiText = "Equinox is an invoicing and client billing tool built for freelancers, featuring automated PDF invoice generation, CRM tracking, and earnings analytics.";
        badges = ["MERN", "PDFKit", "SaaS"];
        links = [{ label: "Equinox Demo", href: "https://saas-app-ekj6.onrender.com/" }];
      } else if (lower.includes("cravereels") || lower.includes("reels") || lower.includes("food")) {
        aiText = "CraveReels is a short-video culinary app featuring vertical food reels, step-by-step interactive recipe overlays, and Cloudinary video streaming.";
        badges = ["MERN", "Cloudinary", "IntersectionObserver"];
        links = [{ label: "CraveReels Repo", href: "https://github.com/adanadeel7/Reels-Project" }];
      } else if (lower.includes("edupulse") || lower.includes("lms") || lower.includes("student")) {
        aiText = "EduPulse LMS is a comprehensive student learning management portal featuring course tracking, assignment submissions, and PostgreSQL relational records with Prisma ORM.";
        badges = ["MERN", "PostgreSQL", "Prisma ORM"];
        links = [{ label: "EduPulse LMS Repo", href: "https://github.com/adanadeel7/LMS-Project-" }];
      } else if (lower.includes("resume") || lower.includes("cv")) {
        aiText = "You can download Adan's resume directly or request an updated copy via email.";
        badges = ["Resume", "PDF"];
        links = [
          { label: "Download Resume (PDF)", href: "/resume.pdf" },
          { label: "Request via Email", href: `mailto:${PERSONAL_INFO.email}?subject=Resume%20Request%20-%20Adan%20Adeel` },
        ];
      } else if (lower.includes("hire") || lower.includes("job") || lower.includes("internship") || lower.includes("work with")) {
        aiText = "Adan is currently open to AI engineering internships, full-stack contracts, and freelance projects! Reach out at adanadeel903@gmail.com.";
        badges = ["Available Now", "Internship", "Freelance"];
        links = [{ label: "Email Adan", href: `mailto:${PERSONAL_INFO.email}` }];
      } else if (lower.includes("education") || lower.includes("university") || lower.includes("graduate") || lower.includes("degree")) {
        aiText = "Adan is currently pursuing his Bachelor of Science in Computer Science (2025–2029), with a focus on AI Engineering, Distributed Systems, and DevOps pipelines.";
        badges = ["B.S. Computer Science", "Graduation: 2029", "Pakistan"];
      } else if (lower.includes("skill") || lower.includes("stack") || lower.includes("tech")) {
        aiText = "Adan works across the modern stack: React, Next.js, Node.js, Express, MongoDB, PostgreSQL, WebSockets, Python, and Docker.";
        badges = ["Full-Stack", "Real-Time", "AI & DevOps"];
        links = [{ label: "View GitHub Repos", href: PERSONAL_INFO.github }];
      } else {
        aiText = `Thanks for asking! Adan is an AI Engineer and Full-Stack Developer with 1+ year freelance experience building real-time platforms. Feel free to explore his Work or reach out via email!`;
        badges = ["AI Engineer", "Full-Stack Dev"];
        links = [{ label: "View GitHub", href: PERSONAL_INFO.github }];
      }

      // Create placeholder AI message for streaming
      const msgId = (Date.now() + 1).toString();
      setMessages((prev) => [
        ...prev,
        {
          id: msgId,
          sender: "ai",
          text: "",
          badges: undefined,
          links: undefined,
        },
      ]);

      // Stream words progressively
      const words = aiText.split(" ");
      let currentWordIndex = 0;
      let accumulatedText = "";

      const streamInterval = setInterval(() => {
        if (currentWordIndex < words.length) {
          accumulatedText += (currentWordIndex === 0 ? "" : " ") + words[currentWordIndex];
          const textSnapshot = accumulatedText;
          currentWordIndex++;

          setMessages((prev) =>
            prev.map((m) => (m.id === msgId ? { ...m, text: textSnapshot } : m))
          );
        } else {
          clearInterval(streamInterval);
          setMessages((prev) =>
            prev.map((m) => (m.id === msgId ? { ...m, badges, links } : m))
          );
          setIsTyping(false);
        }
      }, 30);
    }, 1400); // Realistic 1.4s thinking & preparation delay
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isTyping || !inputVal.trim()) return;
    handleQuery(inputVal);
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Hero Avatar & Identity Section */}
      <section className="flex flex-col items-center text-center mt-2 mb-6" data-purpose="hero-identity">
        {/* Animated 3D Face Model Following Cursor */}
        <div
          ref={avatarRef}
          className="relative w-40 h-40 sm:w-48 sm:h-48 mx-auto flex items-center justify-center mb-2 cursor-pointer select-none"
          style={{ perspective: 1000 }}
          onClick={() => {
            if (isTyping) return;
            handleQuery("Who is Adan and what is his background?");
          }}
          title={isTyping ? "Adan is speaking..." : "Click to interact with Adan!"}
        >
          {/* Outer 3D Cursor-Tracking Layer */}
          <motion.div
            style={{
              rotateX,
              rotateY,
              rotateZ,
              x: headTranslateX,
              y: headTranslateY,
              transformStyle: "preserve-3d",
            }}
            whileHover={{ scale: 1.1, transition: { duration: 0.25 } }}
            whileTap={{ scale: 0.93, transition: { duration: 0.1 } }}
            className="w-full h-full flex items-center justify-center relative"
          >
            {/* Inner Breathing & Speaking Animation Layer */}
            <motion.div
              animate={
                isTyping
                  ? {
                      y: [0, -5, 0, -3, 0],
                      scale: [1, 1.04, 0.99, 1.02, 1],
                      transition: { repeat: Infinity, duration: 1.2, ease: "easeInOut" },
                    }
                  : {
                      y: [0, -7, 0],
                      transition: { repeat: Infinity, duration: 3.8, ease: "easeInOut" },
                    }
              }
              className="w-full h-full flex items-center justify-center relative"
            >
              {/* Dynamic 3D depth-shadow that shifts opposite to head angle */}
              <motion.div
                style={{
                  filter: avatarShadow,
                }}
                className="w-full h-full flex items-center justify-center"
              >
                <Image
                  src="/avatar.png"
                  alt="Adan Adeel 3D Memoji Avatar"
                  width={192}
                  height={192}
                  className="w-full h-full object-contain pointer-events-none"
                  priority
                />
              </motion.div>

              {/* Speaking voice ripple when AI is answering */}
              {isTyping && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: [0.5, 0.9, 0], scale: [1, 1.35, 1.5] }}
                  transition={{ repeat: Infinity, duration: 1.2, ease: "easeOut" }}
                  className="absolute inset-0 rounded-full border-2 border-purple-400/50 pointer-events-none"
                />
              )}
            </motion.div>
          </motion.div>
        </div>

        {/* Hero Headline with dual-color gradients */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight flex items-center justify-center flex-wrap gap-2.5">
          <span className={isDark ? "text-slate-100" : "text-slate-800"}>Hi, I&apos;m</span>
          <span
            className={
              isDark
                ? "bg-gradient-to-r from-violet-400 via-purple-300 to-pink-400 bg-clip-text text-transparent"
                : "bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent"
            }
          >
            Adan
          </span>
          <span
            className={
              isDark
                ? "bg-gradient-to-r from-pink-400 via-rose-300 to-fuchsia-400 bg-clip-text text-transparent"
                : "bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent"
            }
          >
            Adeel
          </span>
        </h1>

        <p
          className={`mt-2 text-xs sm:text-sm font-medium tracking-wide uppercase ${
            isDark ? "text-purple-300/80" : "text-purple-700/80"
          }`}
        >
          AI Engineer &amp; Full-Stack Developer
        </p>
      </section>

      {/* AI Interactive Chat Console Card in Glassmorphism */}
      <section className="w-full max-w-3xl" data-purpose="interactive-chat-card">
        <div
          className={`relative w-full rounded-3xl backdrop-blur-2xl transition-all duration-300 overflow-hidden flex flex-col min-h-[380px] sm:min-h-[420px] ${
            isDark
              ? "bg-[#161126]/85 border border-white/10 shadow-2xl ring-1 ring-white/5 text-slate-100"
              : "bg-white/80 border border-slate-200/90 shadow-xl ring-1 ring-slate-900/5 text-slate-800"
          }`}
        >
          {/* Subtle radial spotlight inside the card */}
          <div
            className={`absolute inset-0 pointer-events-none ${
              isDark
                ? "bg-[radial-gradient(ellipse_at_top,_rgba(168,85,247,0.15),transparent_65%)]"
                : "bg-[radial-gradient(ellipse_at_top,_rgba(147,197,253,0.3),transparent_65%)]"
            }`}
          />

          {/* Center Stage: Interactive Output / Conversation Log */}
          <div
            ref={chatScrollRef}
            className="relative z-10 flex-1 flex flex-col justify-start p-6 sm:p-8 overflow-y-auto max-h-[340px] space-y-4"
          >
            {messages.length === 0 ? (
              <div className="h-full flex-1 flex flex-col items-center justify-center text-center py-8 select-none">
                <div
                  className={`w-12 h-12 rounded-full mb-3 flex items-center justify-center transition-colors ${
                    isDark ? "bg-purple-900/30 text-purple-300" : "bg-purple-100 text-purple-600"
                  }`}
                >
                  <Sparkles size={22} className="animate-pulse" />
                </div>
                <p
                  className={`text-base sm:text-lg font-normal tracking-wide ${
                    isDark ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  Ask me anything about Adan...
                </p>
                <p className={`text-xs mt-1.5 ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                  Click a quick topic below or type your question
                </p>
              </div>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    msg.sender === "user" ? "items-end" : "items-start"
                  } animate-fadeIn`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-line ${
                      msg.sender === "user"
                        ? isDark
                          ? "bg-purple-600 text-white shadow-md shadow-purple-900/40"
                          : "bg-slate-900 text-white shadow-md"
                        : isDark
                        ? "bg-white/[0.06] border border-white/10 text-slate-200 backdrop-blur-sm"
                        : "bg-slate-100 border border-slate-200/80 text-slate-800"
                    }`}
                  >
                    <p>{msg.text}</p>

                    {/* Optional Badges */}
                    {msg.badges && msg.badges.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2.5">
                        {msg.badges.map((b, i) => (
                          <span
                            key={i}
                            className={`text-[11px] font-mono px-2 py-0.5 rounded-full ${
                              isDark
                                ? "bg-purple-500/20 text-purple-200 border border-purple-400/20"
                                : "bg-purple-50 text-purple-700 border border-purple-200"
                            }`}
                          >
                            {b}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Optional Action Links */}
                    {msg.links && msg.links.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3 pt-2 border-t border-white/10">
                        {msg.links.map((link, i) => (
                          <a
                            key={i}
                            href={link.href}
                            target={link.href.startsWith("http") ? "_blank" : undefined}
                            rel="noreferrer"
                            className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg transition-colors ${
                              isDark
                                ? "bg-purple-900/50 hover:bg-purple-800 text-purple-200"
                                : "bg-slate-200 hover:bg-slate-300 text-slate-900"
                            }`}
                          >
                            <span>{link.label}</span>
                            <ExternalLink size={11} />
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-2 text-xs text-purple-400 font-mono animate-pulse">
                <span className="w-2 h-2 rounded-full bg-purple-400 animate-bounce" />
                <span>Adan AI is typing...</span>
              </div>
            )}
          </div>

          {/* Card Bottom: Query Pills & Input Container */}
          <div className="relative z-10 p-4 sm:p-6 pt-0 flex flex-col gap-3.5">
            {/* Quick query filter pills row with strict 1-query rate limiting */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5" data-purpose="quick-queries">
              {presetQueries.map((pq) => {
                const isActive = activePromptLabel === pq.label;
                return (
                  <button
                    key={pq.label}
                    type="button"
                    disabled={isTyping}
                    onClick={() => handleQuery(pq.query, pq)}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 backdrop-blur-sm ${
                      isTyping
                        ? isActive
                          ? isDark
                            ? "bg-purple-600/90 text-white border border-purple-400 cursor-wait shadow-md"
                            : "bg-slate-900 text-white border border-slate-900 cursor-wait shadow-md"
                          : "opacity-35 cursor-not-allowed pointer-events-none border border-transparent"
                        : "cursor-pointer active:scale-95"
                    } ${
                      !isTyping && isActive
                        ? isDark
                          ? "bg-purple-600 text-white border border-purple-400 shadow-md shadow-purple-900/50"
                          : "bg-slate-900 text-white border border-slate-900 shadow-md"
                        : !isTyping && isDark
                        ? "bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 hover:text-white border border-white/10 hover:border-purple-400/40"
                        : !isTyping
                        ? "bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 border border-slate-200"
                        : ""
                    }`}
                  >
                    {pq.icon}
                    <span>{pq.label}</span>
                    {isTyping && isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping ml-0.5" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Bottom Full-Width Rounded Pill Search/Chat Input */}
            <form
              onSubmit={handleSubmit}
              className="relative flex items-center w-full"
              data-purpose="chat-input-form"
            >
              <div className="relative w-full">
                <input
                  type="text"
                  value={inputVal}
                  disabled={isTyping}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder={
                    isTyping
                      ? "Adan is responding, please wait..."
                      : "Ask anything about Adan..."
                  }
                  className={`w-full pl-5 pr-12 py-3.5 sm:py-4 rounded-full text-sm sm:text-base outline-none transition-all duration-200 shadow-inner ${
                    isTyping ? "opacity-50 cursor-not-allowed" : ""
                  } ${
                    isDark
                      ? "bg-black/40 hover:bg-black/50 focus:bg-black/60 text-slate-100 placeholder-slate-500 border border-white/10 focus:border-purple-400/80 focus:ring-2 focus:ring-purple-500/20"
                      : "bg-white hover:bg-slate-50 focus:bg-white text-slate-900 placeholder-slate-400 border border-slate-300 focus:border-purple-600 focus:ring-2 focus:ring-purple-600/20"
                  }`}
                />
                <button
                  type="submit"
                  disabled={isTyping || !inputVal.trim()}
                  aria-label="Send query"
                  className={`absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all duration-200 active:scale-90 ${
                    isTyping || !inputVal.trim()
                      ? "opacity-30 cursor-not-allowed pointer-events-none"
                      : "cursor-pointer"
                  } ${
                    isDark
                      ? "bg-white/10 hover:bg-purple-600 text-slate-200 hover:text-white"
                      : "bg-slate-900 hover:bg-purple-600 text-white"
                  }`}
                >
                  <Send size={14} />
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
