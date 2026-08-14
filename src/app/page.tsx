"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroAbout from "@/components/HeroAbout";
import JourneyTimeline from "@/components/JourneyTimeline";
import ProjectsSection from "@/components/ProjectsSection";
import TechStack from "@/components/TechStack";
import ContactSection from "@/components/ContactSection";
import SpaceBackground from "@/components/SpaceBackground";
import IntroAnimation from "@/components/IntroAnimation";

export default function Home() {
  const [activeSection, setActiveSection] = useState("about");
  const [introFinished, setIntroFinished] = useState(false);

  useEffect(() => {
    // Disable browser scroll restoration so page always starts at top on refresh/load
    if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // Scroll to top of page on initial mount
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
    setActiveSection("about");

    const handleScroll = () => {
      const sections = ["about", "journey", "work", "stack", "contact"];
      const scrollPosition = window.scrollY + 250;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0B080C] text-gray-300">
      {/* Starting Intro Splash Screen Animation */}
      <IntroAnimation onComplete={() => setIntroFinished(true)} />

      {/* Animated Space Canvas Background */}
      <SpaceBackground />

      {/* Navigation (Fixed Left Sidebar on Desktop / Top Header on Mobile) */}
      <div
        className={`transition-all duration-1000 ease-out ${
          introFinished ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
        }`}
      >
        <Navbar activeSection={activeSection} />
      </div>

      {/* Main Content Stream (Right column on desktop, stacked on mobile) */}
      <main
        className={`lg:ml-[38%] lg:w-[62%] relative z-10 transition-all duration-1000 delay-300 ease-out ${
          introFinished ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
        }`}
      >
        <HeroAbout />
        <JourneyTimeline />
        <ProjectsSection />
        <TechStack />
        <ContactSection />
      </main>
    </div>
  );
}
