"use client";
import React, { useEffect, useRef } from "react";

/*
  Full-viewport grid + magnetic glow overlay.
  - Default grid lines are stronger so they're visible on dark backgrounds.
  - Glow follows cursor with eased motion.
  - pointer-events: none so it doesn't block interactions.
*/
export default function InteractiveGridOverlay({
  gridSize = 36,               // spacing between lines
  lineOpacity = 0.12,         // grid line opacity (increased so visible)
  glowColor = "242,34,50",    // rgb glow color
  glowRadius = 220,           // glow radius in px
  ease = 0.12                 // lerp factor
}) {
  const elRef = useRef(null);
  const targetRef = useRef({ x: -9999, y: -9999 });
  const posRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef(null);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    el.style.setProperty("--mx", "-9999px");
    el.style.setProperty("--my", "-9999px");
    el.style.setProperty("--glow-radius", `${glowRadius}px`);
    el.style.setProperty("--grid-size", `${gridSize}px`);
    el.style.setProperty("--glow-alpha", "0.95");

    const onMove = (e) => {
      targetRef.current.x = e.clientX;
      targetRef.current.y = e.clientY;
      if (!rafRef.current) rafRef.current = window.requestAnimationFrame(step);
    };

    const onTouch = (e) => {
      const t = e.touches && e.touches[0];
      if (t) {
        targetRef.current.x = t.clientX;
        targetRef.current.y = t.clientY;
        if (!rafRef.current) rafRef.current = window.requestAnimationFrame(step);
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });

    const step = () => {
      const t = targetRef.current;
      const p = posRef.current;
      p.x += (t.x - p.x) * ease;
      p.y += (t.y - p.y) * ease;

      el.style.setProperty("--mx", `${Math.round(p.x)}px`);
      el.style.setProperty("--my", `${Math.round(p.y)}px`);

      // speed-driven subtle alpha for liveliness
      const dx = Math.abs(t.x - p.x);
      const dy = Math.abs(t.y - p.y);
      const speed = Math.min(1, Math.sqrt(dx * dx + dy * dy) / 80);
      el.style.setProperty("--glow-alpha", String(0.95 - Math.min(0.6, speed * 0.6)));

      const settled = dx < 0.5 && dy < 0.5;
      rafRef.current = settled ? null : window.requestAnimationFrame(step);
    };

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onTouch);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [gridSize, glowRadius, ease]);

  // Compose background: glow top, vertical & horizontal grid lines below
  const bg = `
    radial-gradient(circle at var(--mx, -9999px) var(--my, -9999px),
      rgba(${glowColor}, calc(var(--glow-alpha, 0.95) * 0.36)) 0%,
      rgba(${glowColor}, calc(var(--glow-alpha, 0.95) * 0.14)) 18%,
      rgba(${glowColor}, 0.06) 40%,
      transparent calc(var(--glow-radius, ${glowRadius}px) * 1)
    ),
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

  return (
    <div
      ref={elRef}
      aria-hidden="true"
      className="interactive-grid-overlay pointer-events-none fixed inset-0"
      style={{
        zIndex: 10, // sits above backgrounds (z-0) and below most UI (Navbar is z-50)
        backgroundImage: bg,
        backgroundRepeat: "no-repeat",
        mixBlendMode: "overlay",
        opacity: 0.9,
        transition: "opacity 140ms linear"
      }}
    />
  );
}
