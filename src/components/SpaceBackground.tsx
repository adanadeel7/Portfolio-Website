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

    const colors = ["#FFFFFF", "#C4A0F5", "#8B5CF6", "#A78BFA", "#38BDF8", "#F472B6"];
    const stars: Star[] = [];
    const numStars = Math.floor((width * height) / 3000);

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.8 + 0.3,
        alpha: Math.random() * 0.8 + 0.2,
        speed: Math.random() * 0.2 + 0.05,
        color: colors[Math.floor(Math.random() * colors.length)],
        twinkleSpeed: Math.random() * 0.02 + 0.005,
      });
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX - width / 2) * 0.015,
        y: (e.clientY - height / 2) * 0.015,
      };
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;
      scrollRef.current.speed = delta * 0.25;
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

      // Cosmic background gradient shifting with scroll
      const scrollRatio = Math.min(scrollRef.current.y / (document.body.scrollHeight || 1), 1);
      const bgGrad = ctx.createRadialGradient(
        width / 2 + mouseRef.current.x * 6,
        height / 2 + mouseRef.current.y * 6 + scrollRef.current.speed * 2,
        50,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.85
      );

      // Shift color glow subtly as user scrolls deeper into space
      const glowR = Math.floor(20 + scrollRatio * 25);
      const glowG = Math.floor(12 + scrollRatio * 15);
      const glowB = Math.floor(30 + scrollRatio * 40);

      bgGrad.addColorStop(0, `rgba(${glowR}, ${glowG}, ${glowB}, 0.65)`);
      bgGrad.addColorStop(0.5, "rgba(14, 9, 20, 0.85)");
      bgGrad.addColorStop(1, "rgba(11, 8, 12, 1)");

      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Render & animate stars with scroll acceleration
      stars.forEach((star) => {
        // Twinkle
        star.alpha += star.twinkleSpeed;
        if (star.alpha > 0.95 || star.alpha < 0.15) {
          star.twinkleSpeed = -star.twinkleSpeed;
        }

        // Float up + scroll movement effect
        const totalSpeed = star.speed + scrollRef.current.speed * star.size * 0.5;
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

        // If scrolling fast, draw star streak / warp effect
        if (Math.abs(scrollRef.current.speed) > 2) {
          const streakLength = scrollRef.current.speed * star.size * 1.2;
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

        // Glow for larger stars
        if (star.size > 1.2) {
          ctx.shadowBlur = 8;
          ctx.shadowColor = star.color;
        } else {
          ctx.shadowBlur = 0;
        }
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
      style={{ opacity: 0.95 }}
    />
  );
}
