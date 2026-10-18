"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { useTheme } from "@/context/ThemeContext";

interface ParticleData {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  maxLife: number;
  life: number;
  mesh: THREE.Mesh;
}

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

    // 1. Scene, Camera, Renderer
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

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Mouse coordinates in screen and Three.js orthographic coordinates
    const mouse = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };
    let isVisible = false;
    let isHovered = false;
    let isClicked = false;

    // 2. 3D Cursor Objects Group
    const cursorGroup = new THREE.Group();
    scene.add(cursorGroup);

    // Color definitions based on theme
    const primaryColor = isDark ? 0xa855f7 : 0x7c3aed; // Violet / Purple
    const secondaryColor = isDark ? 0xec4899 : 0xdb2777; // Pink / Fuchsia
    const accentColor = isDark ? 0x38bdf8 : 0x2563eb; // Sky blue / Royal blue
    const coreColor = isDark ? 0xffffff : 0x1e1b4b;

    // A. Outer 3D Torus Ring
    const outerGeo = new THREE.TorusGeometry(15, 1.2, 16, 48);
    const outerMat = new THREE.MeshBasicMaterial({
      color: primaryColor,
      transparent: true,
      opacity: 0.85,
      wireframe: false,
    });
    const outerRing = new THREE.Mesh(outerGeo, outerMat);
    cursorGroup.add(outerRing);

    // B. Inner 3D Counter-Rotating Ring
    const innerGeo = new THREE.TorusGeometry(7.5, 0.9, 16, 32);
    const innerMat = new THREE.MeshBasicMaterial({
      color: secondaryColor,
      transparent: true,
      opacity: 0.9,
      wireframe: false,
    });
    const innerRing = new THREE.Mesh(innerGeo, innerMat);
    cursorGroup.add(innerRing);

    // C. Center Core Dot (Precise cursor coordinate)
    const coreGeo = new THREE.SphereGeometry(2.5, 16, 16);
    const coreMat = new THREE.MeshBasicMaterial({
      color: coreColor,
      transparent: true,
      opacity: 0.95,
    });
    const coreDot = new THREE.Mesh(coreGeo, coreMat);
    cursorGroup.add(coreDot);

    // D. Trailing Particle Comet Dust (Instanced or array of micro-meshes)
    const TRAIL_COUNT = 24;
    const trailPositions: { x: number; y: number }[] = [];
    for (let i = 0; i < TRAIL_COUNT; i++) {
      trailPositions.push({ x: 0, y: 0 });
    }

    const trailMeshes: THREE.Mesh[] = [];
    const trailGeo = new THREE.SphereGeometry(1.8, 8, 8);

    for (let i = 0; i < TRAIL_COUNT; i++) {
      const progress = i / TRAIL_COUNT;
      const col = new THREE.Color(primaryColor).lerp(
        new THREE.Color(accentColor),
        progress
      );
      const trailMat = new THREE.MeshBasicMaterial({
        color: col,
        transparent: true,
        opacity: Math.max(0, 0.75 * (1 - progress)),
      });
      const tMesh = new THREE.Mesh(trailGeo, trailMat);
      scene.add(tMesh);
      trailMeshes.push(tMesh);
    }

    // E. Click Shockwaves
    const shockwaves: { mesh: THREE.Mesh; scale: number; opacity: number }[] = [];
    const shockwaveGeo = new THREE.RingGeometry(2, 3.5, 32);

    const triggerShockwave = (x: number, y: number) => {
      const shockMat = new THREE.MeshBasicMaterial({
        color: secondaryColor,
        transparent: true,
        opacity: 0.9,
        side: THREE.DoubleSide,
      });
      const shockMesh = new THREE.Mesh(shockwaveGeo, shockMat);
      shockMesh.position.set(x, y, 10);
      scene.add(shockMesh);
      shockwaves.push({ mesh: shockMesh, scale: 1, opacity: 0.9 });
    };

    // 3. Event Handlers
    const onMouseMove = (e: MouseEvent) => {
      isVisible = true;
      // Convert screen client coordinates to Three.js Orthographic space
      target.x = e.clientX - window.innerWidth / 2;
      target.y = -(e.clientY - window.innerHeight / 2);

      // Check if hovering clickable elements
      const targetEl = e.target as HTMLElement | null;
      if (targetEl) {
        const isClickable =
          targetEl.tagName === "BUTTON" ||
          targetEl.tagName === "A" ||
          targetEl.tagName === "INPUT" ||
          targetEl.tagName === "TEXTAREA" ||
          targetEl.getAttribute("role") === "button" ||
          targetEl.closest("button") !== null ||
          targetEl.closest("a") !== null ||
          targetEl.classList.contains("cursor-pointer") ||
          window.getComputedStyle(targetEl).cursor === "pointer";

        isHovered = !!isClickable;
      }
    };

    const onMouseDown = (e: MouseEvent) => {
      isClicked = true;
      triggerShockwave(target.x, target.y);
    };

    const onMouseUp = () => {
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

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("resize", onResize);

    // Apply cursor-none to body for sleek custom cursor integration
    document.body.classList.add("custom-three-cursor");

    // 4. Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Smooth lerp following mouse
      const ease = isHovered ? 0.35 : 0.24;
      mouse.x += (target.x - mouse.x) * ease;
      mouse.y += (target.y - mouse.y) * ease;

      cursorGroup.position.x = mouse.x;
      cursorGroup.position.y = mouse.y;

      // Cursor visibility
      cursorGroup.visible = isVisible;

      // 3D rotations for the rings
      const rotSpeed = isHovered ? 3.5 : 1.8;
      outerRing.rotation.x += delta * rotSpeed * 0.8;
      outerRing.rotation.y += delta * rotSpeed * 1.2;
      outerRing.rotation.z += delta * rotSpeed * 0.5;

      innerRing.rotation.x -= delta * rotSpeed * 1.4;
      innerRing.rotation.y -= delta * rotSpeed * 0.9;
      innerRing.rotation.z += delta * rotSpeed * 1.1;

      // Scale pulse when hovering or clicking
      const targetScale = isClicked ? 0.75 : isHovered ? 1.75 : 1.0;
      const currentScale = cursorGroup.scale.x;
      const nextScale = currentScale + (targetScale - currentScale) * 0.2;
      cursorGroup.scale.set(nextScale, nextScale, nextScale);

      // Trailing stardust / particle ribbon logic
      trailPositions.unshift({ x: mouse.x, y: mouse.y });
      if (trailPositions.length > TRAIL_COUNT) {
        trailPositions.pop();
      }

      for (let i = 0; i < TRAIL_COUNT; i++) {
        const mesh = trailMeshes[i];
        if (mesh) {
          const pos = trailPositions[i] || { x: mouse.x, y: mouse.y };
          mesh.position.set(pos.x, pos.y, 0);
          mesh.visible = isVisible;
          // Scale down down the trail
          const s = Math.max(0.1, (1 - i / TRAIL_COUNT) * (isHovered ? 1.4 : 1.0));
          mesh.scale.set(s, s, s);
        }
      }

      // Update shockwaves
      for (let i = shockwaves.length - 1; i >= 0; i--) {
        const sw = shockwaves[i];
        sw.scale += delta * 45;
        sw.opacity -= delta * 2.2;
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

    // 5. Cleanup on unmount
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("resize", onResize);
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
