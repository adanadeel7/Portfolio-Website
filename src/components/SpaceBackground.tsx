"use client";

import React, { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  alpha: number;
  speed: number;
  color: string;
  twinkleSpeed: number;
}

export default function SpaceBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const scrollRef = useRef<{ y: number; speed: number }>({ y: 0, speed: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let lastScrollY = window.scrollY;

    const colors = ["#FFFFFF", "#E2E8F0", "#CBD5E1", "#94A3B8", "#A78BFA"];
    const stars: Star[] = [];
    const numStars = Math.floor((width * height) / 3200);

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.5 + 0.4,
        alpha: Math.random() * 0.7 + 0.2,
        speed: Math.random() * 0.15 + 0.05,
        color: colors[Math.floor(Math.random() * colors.length)],
        twinkleSpeed: Math.random() * 0.015 + 0.005,
      });
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX - width / 2) * 0.01,
        y: (e.clientY - height / 2) * 0.01,
      };
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;
      scrollRef.current.speed = delta * 0.2;
      scrollRef.current.y = currentScrollY;
      lastScrollY = currentScrollY;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Decelerate scroll velocity inertia
      scrollRef.current.speed *= 0.92;

      // Clean solid midnight background without heavy radial gradient bloom
      ctx.fillStyle = "#0B080C";
      ctx.fillRect(0, 0, width, height);

      // Render & animate stars with subtle scroll acceleration
      stars.forEach((star) => {
        // Twinkle
        star.alpha += star.twinkleSpeed;
        if (star.alpha > 0.85 || star.alpha < 0.15) {
          star.twinkleSpeed = -star.twinkleSpeed;
        }

        // Float up + scroll movement effect
        const totalSpeed = star.speed + scrollRef.current.speed * star.size * 0.4;
        star.y -= totalSpeed;

        if (star.y < 0) {
          star.y = height;
          star.x = Math.random() * width;
        } else if (star.y > height) {
          star.y = 0;
          star.x = Math.random() * width;
        }

        // Parallax offset (mouse + scroll)
        const parallaxX = star.x + mouseRef.current.x * star.size;
        const parallaxY = star.y + mouseRef.current.y * star.size;

        ctx.beginPath();

        // If scrolling fast, draw subtle star streak
        if (Math.abs(scrollRef.current.speed) > 2.5) {
          const streakLength = scrollRef.current.speed * star.size;
          ctx.moveTo(parallaxX, parallaxY);
          ctx.lineTo(parallaxX, parallaxY - streakLength);
          ctx.strokeStyle = star.color;
          ctx.lineWidth = star.size;
          ctx.stroke();
        } else {
          ctx.arc(parallaxX, parallaxY, star.size, 0, Math.PI * 2);
          ctx.fillStyle = star.color;
          ctx.fill();
        }

        ctx.globalAlpha = Math.abs(star.alpha);
        ctx.shadowBlur = 0;
      });

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.9 }}
    />
  );
}
