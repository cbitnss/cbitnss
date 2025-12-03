"use client";
import React, { useEffect, useRef } from "react";

/*
  SpotlightGrid
  - Fixed position background
  - Invisible by default (masked)
  - Revelas heavily when hovered (Flashlight effect)
*/
export default function SpotlightGrid() {
  const containerRef = useRef(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const spotlightPos = useRef({ x: 0, y: 0 });
  const rafId = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Track Mouse
    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    // 2. Smooth Follow Animation (Lerp)
    const animate = () => {
      const ease = 0.12; // Controls "magnetic" lag (0.1 = slow, 0.2 = fast)
      
      spotlightPos.current.x += (mousePos.current.x - spotlightPos.current.x) * ease;
      spotlightPos.current.y += (mousePos.current.y - spotlightPos.current.y) * ease;

      container.style.setProperty("--x", `${spotlightPos.current.x}px`);
      container.style.setProperty("--y", `${spotlightPos.current.y}px`);

      rafId.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{
        // Define grid and spotlight variables
        "--grid-size": "75px",// Large architectural grid
        "--grid-color": "rgba(255, 255, 255, 0.3)", // Bright white lines
        "--spotlight-size": "400px",
        "--x": "-1000px", // Init off-screen
        "--y": "-1000px",
      }}
    >
      {/* The Grid Layer - Masked */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          // Grid Pattern
          backgroundImage: `
            linear-gradient(to right, var(--grid-color) 1px, transparent 1px),
            linear-gradient(to bottom, var(--grid-color) 1px, transparent 1px)
          `,
          backgroundSize: "var(--grid-size) var(--grid-size)",
          
          // The Mask: Hides grid everywhere EXCEPT the spotlight circle
          maskImage: `radial-gradient(
            circle var(--spotlight-size) at var(--x) var(--y), 
            black 0%, 
            transparent 70%
          )`,
          WebkitMaskImage: `radial-gradient(
            circle var(--spotlight-size) at var(--x) var(--y), 
            black 0%, 
            transparent 70%
          )`,
        }}
      />
    </div>
  );
}