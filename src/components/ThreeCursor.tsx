"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { useTheme } from "@/context/ThemeContext";

export default function ThreeCursor() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    // Only run on desktop / pointer-fine devices
    if (typeof window === "undefined") return;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    // 1. Three.js Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(
      -width / 2,
      width / 2,
      height / 2,
      -height / 2,
      0.1,
      1000
    );
    camera.position.z = 100;

    // Cap devicePixelRatio to 1.5 for maximum 120fps performance on Retina displays
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));

    // Coordinates: target (instant raw pointer) vs core (fast sync) vs aura (silky float)
    const target = { x: 0, y: 0 };
    const corePos = { x: 0, y: 0 };
    const auraPos = { x: 0, y: 0 };

    let isVisible = false;
    let isHovered = false;
    let isClicked = false;
    let isPaused = false;

    // 2. Cursor Groups: Separate Instant Core Pointer from Inertial Aura
    const coreGroup = new THREE.Group();
    const auraGroup = new THREE.Group();
    scene.add(auraGroup);
    scene.add(coreGroup);

    // Dynamic colors based on theme
    const primaryColor = isDark ? 0xa855f7 : 0x7c3aed; // Violet / Purple
    const secondaryColor = isDark ? 0xec4899 : 0xdb2777; // Pink / Fuchsia
    const accentColor = isDark ? 0x38bdf8 : 0x2563eb; // Cyan / Blue
    const coreColor = isDark ? 0xffffff : 0x0f172a;

    // A. Instant Core Precision Dot (Zero perceived lag)
    const coreGeo = new THREE.SphereGeometry(2.5, 16, 16);
    const coreMat = new THREE.MeshBasicMaterial({
      color: coreColor,
      transparent: true,
      opacity: 0.95,
    });
    const coreDot = new THREE.Mesh(coreGeo, coreMat);
    coreGroup.add(coreDot);

    // B. Outer 3D Torus Ring (Floating on aura group)
    const outerGeo = new THREE.TorusGeometry(14, 1.1, 14, 40);
    const outerMat = new THREE.MeshBasicMaterial({
      color: primaryColor,
      transparent: true,
      opacity: 0.8,
      wireframe: false,
    });
    const outerRing = new THREE.Mesh(outerGeo, outerMat);
    auraGroup.add(outerRing);

    // C. Inner Counter-Rotating Ring
    const innerGeo = new THREE.TorusGeometry(7, 0.85, 14, 28);
    const innerMat = new THREE.MeshBasicMaterial({
      color: secondaryColor,
      transparent: true,
      opacity: 0.85,
      wireframe: false,
    });
    const innerRing = new THREE.Mesh(innerGeo, innerMat);
    auraGroup.add(innerRing);

    // D. Lightweight Trailing Stardust Ribbon (16 particles for max 120fps smoothness)
    const TRAIL_COUNT = 16;
    const trailPositions: { x: number; y: number }[] = [];
    for (let i = 0; i < TRAIL_COUNT; i++) {
      trailPositions.push({ x: 0, y: 0 });
    }

    const trailMeshes: THREE.Mesh[] = [];
    const trailGeo = new THREE.SphereGeometry(1.6, 8, 8);

    for (let i = 0; i < TRAIL_COUNT; i++) {
      const progress = i / TRAIL_COUNT;
      const col = new THREE.Color(primaryColor).lerp(
        new THREE.Color(accentColor),
        progress
      );
      const trailMat = new THREE.MeshBasicMaterial({
        color: col,
        transparent: true,
        opacity: Math.max(0, 0.7 * (1 - progress)),
      });
      const tMesh = new THREE.Mesh(trailGeo, trailMat);
      scene.add(tMesh);
      trailMeshes.push(tMesh);
    }

    // E. Click Shockwaves
    const shockwaves: { mesh: THREE.Mesh; scale: number; opacity: number }[] = [];
    const shockwaveGeo = new THREE.RingGeometry(2, 3.5, 28);

    const triggerShockwave = (x: number, y: number) => {
      if (shockwaves.length > 4) return; // Prevent excess draw calls
      const shockMat = new THREE.MeshBasicMaterial({
        color: secondaryColor,
        transparent: true,
        opacity: 0.85,
        side: THREE.DoubleSide,
      });
      const shockMesh = new THREE.Mesh(shockwaveGeo, shockMat);
      shockMesh.position.set(x, y, 10);
      scene.add(shockMesh);
      shockwaves.push({ mesh: shockMesh, scale: 1, opacity: 0.85 });
    };

    // 3. Fast Pointer Event Handlers (Zero DOM layout thrashing)
    const onPointerMove = (e: PointerEvent) => {
      isVisible = true;
      target.x = e.clientX - window.innerWidth / 2;
      target.y = -(e.clientY - window.innerHeight / 2);

      // FAST selector check without expensive window.getComputedStyle!
      const targetEl = e.target as HTMLElement | null;
      if (targetEl) {
        const interactive =
          targetEl.closest(
            'a, button, input, textarea, select, [role="button"], .cursor-pointer, [data-interactive="true"]'
          ) !== null;
        isHovered = interactive;
      }
    };

    const onPointerDown = () => {
      isClicked = true;
      triggerShockwave(target.x, target.y);
    };

    const onPointerUp = () => {
      isClicked = false;
    };

    const onMouseLeave = () => {
      isVisible = false;
    };

    const onResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.left = -width / 2;
      camera.right = width / 2;
      camera.top = height / 2;
      camera.bottom = -height / 2;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    const onVisibilityChange = () => {
      isPaused = document.hidden;
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointerup", onPointerUp, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("resize", onResize, { passive: true });
    document.addEventListener("visibilitychange", onVisibilityChange);

    document.body.classList.add("custom-three-cursor");

    // 4. Smooth Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (isPaused || !isVisible) return;

      const delta = Math.min(clock.getDelta(), 0.1);

      // Instant / Ultra-high responsiveness for the core precision pointer (0.92 ease)
      // This eliminates ANY feeling of cursor delay or latency
      corePos.x += (target.x - corePos.x) * 0.92;
      corePos.y += (target.y - corePos.y) * 0.92;
      coreGroup.position.set(corePos.x, corePos.y, 15);
      coreGroup.visible = isVisible;

      // Silky inertia for the outer 3D aura and rings (0.38 ease for smooth floating)
      const auraEase = isHovered ? 0.45 : 0.38;
      auraPos.x += (target.x - auraPos.x) * auraEase;
      auraPos.y += (target.y - auraPos.y) * auraEase;
      auraGroup.position.set(auraPos.x, auraPos.y, 5);
      auraGroup.visible = isVisible;

      // 3D rotations for the rings
      const rotSpeed = isHovered ? 3.2 : 1.6;
      outerRing.rotation.x += delta * rotSpeed * 0.8;
      outerRing.rotation.y += delta * rotSpeed * 1.2;
      outerRing.rotation.z += delta * rotSpeed * 0.4;

      innerRing.rotation.x -= delta * rotSpeed * 1.3;
      innerRing.rotation.y -= delta * rotSpeed * 0.8;
      innerRing.rotation.z += delta * rotSpeed * 1.0;

      // Dynamic scale
      const targetScale = isClicked ? 0.75 : isHovered ? 1.6 : 1.0;
      const currentScale = auraGroup.scale.x;
      const nextScale = currentScale + (targetScale - currentScale) * 0.22;
      auraGroup.scale.set(nextScale, nextScale, nextScale);

      // Trailing stardust logic
      trailPositions.unshift({ x: auraPos.x, y: auraPos.y });
      if (trailPositions.length > TRAIL_COUNT) {
        trailPositions.pop();
      }

      for (let i = 0; i < TRAIL_COUNT; i++) {
        const mesh = trailMeshes[i];
        if (mesh) {
          const pos = trailPositions[i] || auraPos;
          mesh.position.set(pos.x, pos.y, 0);
          mesh.visible = isVisible;
          const s = Math.max(0.08, (1 - i / TRAIL_COUNT) * (isHovered ? 1.3 : 0.95));
          mesh.scale.set(s, s, s);
        }
      }

      // Update shockwaves
      for (let i = shockwaves.length - 1; i >= 0; i--) {
        const sw = shockwaves[i];
        sw.scale += delta * 40;
        sw.opacity -= delta * 2.4;
        sw.mesh.scale.set(sw.scale, sw.scale, sw.scale);
        (sw.mesh.material as THREE.MeshBasicMaterial).opacity = Math.max(0, sw.opacity);

        if (sw.opacity <= 0) {
          scene.remove(sw.mesh);
          sw.mesh.geometry.dispose();
          (sw.mesh.material as THREE.Material).dispose();
          shockwaves.splice(i, 1);
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // 5. Clean teardown on unmount
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      document.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      document.body.classList.remove("custom-three-cursor");

      outerGeo.dispose();
      outerMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      trailGeo.dispose();
      shockwaveGeo.dispose();

      trailMeshes.forEach((m) => {
        (m.material as THREE.Material).dispose();
        scene.remove(m);
      });

      shockwaves.forEach((sw) => {
        sw.mesh.geometry.dispose();
        (sw.mesh.material as THREE.Material).dispose();
        scene.remove(sw.mesh);
      });

      renderer.dispose();
    };
  }, [isDark]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block pointer-events-none"
      />
    </div>
  );
}
