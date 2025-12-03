"use client";
import React, { useEffect, useRef } from "react";

/*
  InteractiveGridOverlay (updated)
  - Grid is hidden by default using a CSS mask and only revealed where the spotlight is.
  - Spotlight follows the cursor with eased RAF motion to produce a smooth glow.
  - Grid spacing increased (gridSize default 64).
  - Overlay sits behind page content (zIndex: 0).
*/
export default function InteractiveGridOverlay({
  gridSize = 64,             // larger spacing between lines
  lineOpacity = 0.16,        // grid line opacity
  glowColor = "242,34,50",   // rgb glow color (kept for potential coloring)
  glowRadius = 320,          // spotlight radius in px
  ease = 0.14                // lerp factor for magnetic motion
}) {
  const elRef = useRef(null);
  const targetRef = useRef({ x: -9999, y: -9999 });
  const posRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef(null);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    // init css vars
    el.style.setProperty("--mx", "-9999px");
    el.style.setProperty("--my", "-9999px");
    el.style.setProperty("--glow-radius", `${glowRadius}px`);
    el.style.setProperty("--grid-size", `${gridSize}px`);

    const onMove = (e) => {
      const clientX = e.touches?.[0]?.clientX ?? e.clientX;
      const clientY = e.touches?.[0]?.clientY ?? e.clientY;
      targetRef.current.x = clientX;
      targetRef.current.y = clientY;
      if (!rafRef.current) rafRef.current = window.requestAnimationFrame(step);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("touchmove", onMove, { passive: true });

    const step = () => {
      const t = targetRef.current;
      const p = posRef.current;
      p.x += (t.x - p.x) * ease;
      p.y += (t.y - p.y) * ease;

      el.style.setProperty("--mx", `${Math.round(p.x)}px`);
      el.style.setProperty("--my", `${Math.round(p.y)}px`);

      // small speed-driven alpha variation for glow intensity (not required for mask but useful)
      const dx = Math.abs(t.x - p.x);
      const dy = Math.abs(t.y - p.y);
      const speed = Math.min(1, Math.sqrt(dx * dx + dy * dy) / 80);
      el.style.setProperty("--glow-alpha", String(0.9 - Math.min(0.6, speed * 0.6)));

      const settled = dx < 0.5 && dy < 0.5;
      rafRef.current = settled ? null : window.requestAnimationFrame(step);
    };

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [gridSize, glowRadius, ease]);

  // Grid background (larger spacing) - mask will reveal only the spotlight area
  const gridBg = `
    repeating-linear-gradient(0deg,
      rgba(255,255,255, ${lineOpacity}) 0px,
      rgba(255,255,255, ${lineOpacity}) 1px,
      transparent 1px,
      transparent var(--grid-size, ${gridSize}px)
    ),
    repeating-linear-gradient(90deg,
      rgba(255,255,255, ${lineOpacity}) 0px,
      rgba(255,255,255, ${lineOpacity}) 1px,
      transparent 1px,
      transparent var(--grid-size, ${gridSize}px)
    )
  `;

  // Mask: radial gradient centered at --mx/--my that creates a soft spotlight
  const mask = `radial-gradient(circle var(--glow-radius, ${glowRadius}px) at var(--mx) var(--my),
    rgba(0,0,0,1) 0%, rgba(0,0,0,0.18) 60%, rgba(0,0,0,0) 100%)`;

  return (
    <div
      ref={elRef}
      aria-hidden="true"
      className="interactive-grid-overlay pointer-events-none fixed inset-0"
      style={{
        zIndex: 0, // behind main content (make sure page content has z-index > 0)
        backgroundImage: gridBg,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "0 0",
        // Reveal the grid only inside the spotlight using mask
        WebkitMaskImage: mask,
        maskImage: mask,
        opacity: 1,
        transition: "opacity 140ms linear",
        mixBlendMode: "normal"
      }}
    />
  );
}
