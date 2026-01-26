"use client"

import { useEffect, useRef } from "react"

const HERO_IMAGES = [
  { src: "/arang2.jpg", title: "Arangetra" },
  { src: "/sum2.jpg", title: "NSS Summit" },
  { src: "/sis2.JPG", title: "Strength in Solidarity" },
  { src: "/santa2.jpg", title: "Be My Santa" },
  { src: "/bd1.jpg", title: "Blood Donation" },
]

const clamp = (v, min = 0, max = 1) => Math.min(max, Math.max(min, v))
const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3)

export default function HacksmithStickySection() {
  const sectionRef = useRef(null)
  const pinRef = useRef(null)
  const progressRef = useRef(0)
  const rafRef = useRef(null)
  const doneRef = useRef(false)

  // --------------------------------------
  // Scroll → smooth progress
  // --------------------------------------
  useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current || doneRef.current) return

      const rect = sectionRef.current.getBoundingClientRect()
      const total = rect.height - window.innerHeight
      const raw = clamp(-rect.top / total)

      progressRef.current += (raw - progressRef.current) * 0.12

      if (progressRef.current >= 0.999) {
        progressRef.current = 1
        doneRef.current = true
      }
    }

    const loop = () => {
      updateImages()
      rafRef.current = requestAnimationFrame(loop)
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    rafRef.current = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener("scroll", onScroll)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  // --------------------------------------
  // Update images + pin logic
  // --------------------------------------
  const updateImages = () => {
    const p = progressRef.current

    // PIN / UNPIN EXACTLY
    if (pinRef.current) {
      if (p < 1) {
        pinRef.current.style.position = "fixed"
        pinRef.current.style.top = "0"
        pinRef.current.style.left = "0"
        pinRef.current.style.width = "100%"
      } else {
        pinRef.current.style.position = "sticky"
      }
    }

    HERO_IMAGES.forEach((_, i) => {
      const el = document.getElementById(`hero-card-${i}`)
      if (!el) return

      const total = HERO_IMAGES.length
      const overlap = 0.35
      const step = 1 / (total - (total - 1) * overlap)
      const start = i * step * (1 - overlap)
      const end = start + step

      let t = clamp((p - start) / (end - start))
      const eased = easeOutCubic(t)

      const y = (1 - eased) * 60
      const scale = 1.12 - eased * 0.12
      const rot = (i % 2 === 0 ? -1 : 1) * 3

      el.style.opacity = eased
      el.style.transform = `
        translate(-50%, -50%)
        translateY(${y}px)
        rotate(${rot}deg)
        scale(${scale})
      `
      el.style.zIndex = 10 + i
    })
  }

  return (
    <section
      ref={sectionRef}
      className="relative bg-black"
      style={{ height: "500vh" }}
    >
      <div
        ref={pinRef}
        className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center"
      >
        {/* Background text */}
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

        {/* Cards */}
        <div className="relative w-full h-full max-w-[1200px] mx-auto z-10">
          {HERO_IMAGES.map((img, i) => (
            <div
              key={i}
              id={`hero-card-${i}`}
              className="absolute top-1/2 left-1/2 will-change-transform"
              style={{
                width: "360px",
                height: "520px",
                opacity: 0,
                transform:
                  "translate(-50%, -50%) translateY(120px) scale(1.12)",
              }}
            >
              {/* CARD */}
              <div className="w-full h-full bg-white border border-gray-300 shadow-2xl shadow-black/70 flex flex-col">
                
                {/* IMAGE AREA (controlled crop, no white gaps) */}
                <div
                  className="w-full"
                  style={{ height: "440px", overflow: "hidden" }}
                >
                  <img
                    src={img.src}
                    alt={img.title}
                    className="w-full h-full object-cover object-center"
                    draggable={false}
                  />
                </div>

                {/* TITLE */}
                <div className="h-[80px] flex items-center justify-center border-t border-gray-300">
                  <p className="text-gray-800 font-semibold text-base text-center px-2">
                    {img.title}
                  </p>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}