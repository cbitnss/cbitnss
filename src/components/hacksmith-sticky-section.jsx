"use client"

import { useEffect, useRef, useState } from "react"

// ------------------------------
// CONFIG
// ------------------------------

const HERO_IMAGES = [
  { src: "/arang2.jpg", title: "Arangetra" },
  { src: "/sum2.jpg", title: "NSS Summit" },
  { src: "/sis2.JPG", title: "Strength in Solidarity" },
  { src: "/santa2.jpg", title: "Be My Santa" },
  { src: "/bd2.jpg", title: "Blood Donation" },
]

// virtual scroll distance used ONLY for animation
const SCROLL_HEIGHT_PX = 4000

// inertia strength (lower = heavier)
const INERTIA = 0.08

// overlap between cards (0.0 = no overlap, 0.3 = strong overlap)
const OVERLAP = 0.35

// ------------------------------
// EASING (matches reference feel)
// ------------------------------
const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3)

// ------------------------------

export default function HacksmithStickySection() {
  const containerRef = useRef(null)

  const [scrollState, setScrollState] = useState("before")
  const [progress, setProgress] = useState(0)

  // inertia refs
  const targetProgress = useRef(0)
  const smoothProgress = useRef(0)
  const startScroll = useRef(null)
  const rafRef = useRef(null)

  // ------------------------------
  // SCROLL → TARGET PROGRESS
  // ------------------------------
  useEffect(() => {
    const onScroll = () => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()

      // before pin
      if (rect.top > 0) {
        setScrollState("before")
        targetProgress.current = 0
        startScroll.current = null
        return
      }

      if (startScroll.current === null) {
        startScroll.current = window.scrollY
      }

      const delta = window.scrollY - startScroll.current
      const p = delta / SCROLL_HEIGHT_PX

      if (p < 1) {
        setScrollState("fixed")
        targetProgress.current = Math.max(0, Math.min(1, p))
      } else {
        setScrollState("after")
        targetProgress.current = 1
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()

    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // ------------------------------
  // INERTIA / MOMENTUM LOOP
  // ------------------------------
  useEffect(() => {
    const animate = () => {
      smoothProgress.current +=
        (targetProgress.current - smoothProgress.current) * INERTIA

      setProgress(smoothProgress.current)

      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  // ------------------------------
  // IMAGE ANIMATION
  // ------------------------------
  const getImageStyle = (index) => {
    const total = HERO_IMAGES.length

    // overlapping ranges
    const step = 1 / (total - (total - 1) * OVERLAP)
    const start = index * step * (1 - OVERLAP)
    const end = start + step

    let t = (progress - start) / (end - start)
    t = Math.max(0, Math.min(1, t))

    // easing
    const e = easeOutCubic(t)

    const scale = 2.4 - e * 1.4
    const y = (1 - e) * 120
    const opacity = e

    const finalRot = (index % 2 === 0 ? -1 : 1) * (6 + index * 4)
    const startRot = finalRot * 3
    const rot = startRot + (finalRot - startRot) * e

    return {
      opacity,
      transform: `translate(-50%, -50%) translateY(${y}px) rotate(${rot}deg) scale(${scale})`,
      zIndex: 10 + index,
    }
  }

  // ------------------------------
  // CONTAINER POSITION
  // ------------------------------
  let containerStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100vh",
  }

  if (scrollState === "fixed") {
    containerStyle.position = "fixed"
  }

  if (scrollState === "after") {
    containerStyle = {
      position: "absolute",
      top: SCROLL_HEIGHT_PX,
      left: 0,
      width: "100%",
      height: "100vh",
    }
  }

  // ------------------------------
  // RENDER
  // ------------------------------
  return (
    <div className="bg-black relative w-full">
      <div
        ref={containerRef}
        className="relative w-full"
        style={{ height: `${SCROLL_HEIGHT_PX}px` }}
      >
        <div
          className="overflow-hidden flex items-center justify-center"
          style={containerStyle}
        >
          {/* Background Text */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
            <h1
              className="text-white font-black tracking-tighter"
              style={{
                fontSize: "clamp(4rem, 20vw, 15rem)",
                opacity: 0.85,
                textShadow: "0 0 40px rgba(255,255,255,0.12)",
              }}
            >
              CBIT NSS
            </h1>
          </div>

          {/* Images */}
          <div className="relative w-full h-full max-w-[1200px] mx-auto z-10">
            {HERO_IMAGES.map((img, i) => {
              const s = getImageStyle(i)
              return (
                <div
                  key={i}
                  className="absolute top-1/2 left-1/2 w-[300px] md:w-[400px] aspect-[3/4] will-change-transform"
                  style={{
                    opacity: s.opacity,
                    transform: s.transform,
                    zIndex: s.zIndex,
                  }}
                >
                  <div className="w-full h-full bg-white p-3 pb-12 shadow-2xl shadow-black/80">
                    <div className="w-full h-full overflow-hidden bg-gray-200">
                      <img
                        src={img.src}
                        alt={img.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute bottom-4 left-0 w-full text-center">
                      <p className="text-gray-800 text-lg font-bold opacity-80 rotate-[-1deg]">
                        {img.title}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Next Section */}
      <div className="h-screen bg-neutral-900 flex items-center justify-center text-white border-t border-white/10">
        Scroll continues here…
      </div>
    </div>
  )
}
