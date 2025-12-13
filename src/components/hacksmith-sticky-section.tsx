"use client"
import { useEffect, useRef, useState } from "react"

// ------------------------------
// 1. CONFIGURATION
// ------------------------------

// Hero images for sticky scroll section
const HERO_IMAGES = [
  { src: "/arang2.jpg", title: "Arangetra" },
  { src: "/sum2.jpg", title: "NSS Summit" },
  { src: "/sis2.JPG", title: "Strength in Solidarity" },
  { src: "/santa2.jpg", title: "Be My Santa" },
  { src: "/bd2.jpg", title: "Blood Donation" },
]

// Configuration for the scroll steps
const IMAGE_COUNT = HERO_IMAGES.length

// Number of Viewport Height (vh) units required to fully reveal one image.
// Increasing this number makes the scroll slower/longer.
const STEPS_PER_IMAGE_VH = 300 

// Total height of the scroll section.
// (IMAGE_COUNT * STEPS_PER_IMAGE_VH) is the effective reveal range.
// + 100vh ensures the sticky container stays on screen for the final image.
const SECTION_HEIGHT_VH = IMAGE_COUNT * STEPS_PER_IMAGE_VH + 100 
const EFFECTIVE_SCROLL_VH = IMAGE_COUNT * STEPS_PER_IMAGE_VH

// Image positions and z-index (for the scattered look)
const imagePositions = [
  { x: -120, y: -80, rotate: -22, z: 10 },
  { x: 100, y: 60, rotate: 18, z: 20 },
  { x: -90, y: 100, rotate: -28, z: 30 },
  { x: 110, y: -70, rotate: 20, z: 40 },
  { x: -40, y: 30, rotate: -12, z: 50 },
]

// ------------------------------
// 2. COMPONENT
// ------------------------------

export function HacksmithStickySection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const isMountedRef = useRef(true)

  // --- Scroll Progress Calculation ---
  useEffect(() => {
    isMountedRef.current = true

    const handleScroll = () => {
      if (!sectionRef.current || !isMountedRef.current) return

      const rect = sectionRef.current.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      const sectionHeight = sectionRef.current.offsetHeight

      // Check if the section is in or near the viewport
      if (rect.bottom > 0 && rect.top < viewportHeight) {
        // Calculate progress: 0 when top enters, 1 when bottom leaves
        const progress = -rect.top / (sectionHeight - viewportHeight)

        if (isMountedRef.current) {
          // Clamp progress between 0 and 1
          setScrollProgress(Math.max(0, Math.min(1, progress)))
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // Initial calculation

    return () => {
      isMountedRef.current = false
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // --- Image Transformation Logic (The Core) ---
  const getImageTransform = (index: number) => {
    // Determine the scroll window for this specific image
    const revealStartNormalized = (index * STEPS_PER_IMAGE_VH) / EFFECTIVE_SCROLL_VH
    const revealEndNormalized = ((index * STEPS_PER_IMAGE_VH) + STEPS_PER_IMAGE_VH) / EFFECTIVE_SCROLL_VH

    let opacity = 0
    let scale = 0.75
    let yOffset = 40 // Starting vertical offset (px)

    if (scrollProgress >= revealEndNormalized) {
      // Phase 3: Fully Revealed (Scroll progress is past this image's window)
      opacity = 1
      scale = 1
      yOffset = 0
    } else if (scrollProgress > revealStartNormalized) {
      // Phase 2: Revealing (Scroll progress is within this image's window)
      
      // Local progress goes from 0 to 1 during this image's specific reveal phase
      const localProgress = (scrollProgress - revealStartNormalized) / (revealEndNormalized - revealStartNormalized)
      
      opacity = localProgress
      scale = 0.75 + localProgress * 0.25 // Scale from 0.75 to 1.0
      yOffset = 40 * (1 - localProgress) // Y-offset from 40 to 0
    } else {
      // Phase 1: Not yet visible (Scroll progress is before this image's window)
      // Stays at initial values (opacity=0, scale=0.75, yOffset=40)
    }

    return { opacity, scale, yOffset }
  }

  // --- JSX Rendering ---
  return (
    <div className="relative w-full bg-black overflow-hidden">
      {/* Scroll-triggering section with calculated height */}
      <div 
        ref={sectionRef} 
        className="relative w-full" 
        style={{ height: `${SECTION_HEIGHT_VH}vh` }}
      >
        {/* Sticky container that holds the visible content */}
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden bg-black">
          <div className="relative w-full h-full flex items-center justify-center">
            
            {/* Background Text: CBIT NSS */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
              <h1
                className="font-black leading-none select-none whitespace-nowrap px-4 text-center"
                style={{
                  fontSize: "clamp(3rem, 18vw, 20rem)",
                  WebkitTextStroke: "2.5px rgba(255, 255, 255, 0.9)",
                  WebkitTextFillColor: "transparent",
                  color: "transparent",
                  fontFamily: '"Arial Black", "Arial Bold", Gadget, sans-serif',
                  fontWeight: "900",
                  letterSpacing: "0.03em",
                  textShadow: "0 0 60px rgba(255, 255, 255, 0.1)",
                  filter: "drop-shadow(0 0 30px rgba(255, 255, 255, 0.05))",
                }}
              >
                CBIT NSS
              </h1>
            </div>

            {/* Images Container */}
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div
                className="relative"
                style={{
                  width: "clamp(300px, 70vw, 600px)",
                  height: "clamp(400px, 85vh, 800px)",
                  maxWidth: "600px",
                  maxHeight: "800px",
                }}
              >
                {HERO_IMAGES.map((img, idx) => {
                  const { opacity, scale, yOffset } = getImageTransform(idx)
                  const pos = imagePositions[idx]

                  return (
                    <div
                      key={idx}
                      className="absolute"
                      style={{
                        left: "50%",
                        top: "50%",
                        zIndex: pos.z,
                        opacity,
                        // This complex transform line must be correct for the animation
                        transform: `translate(calc(-50% + ${pos.x}px), calc(-50% + ${pos.y}px + ${yOffset}px)) rotate(${pos.rotate}deg) scale(${scale})`,
                        width: "clamp(200px, 50vw, 360px)",
                        height: "clamp(280px, 65vh, 480px)",
                        transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                      }}
                    >
                      <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white/90 bg-black/50 backdrop-blur-sm">
                        <img
                          src={img.src || "/placeholder.svg?height=480&width=360&query=nss+event"}
                          alt={img.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          crossOrigin="anonymous"
                          onError={(e) => {
                            console.log(`[v0] Image failed to load: ${img.src}`)
                            // Fallback image source in case original fails
                            ;(e.target as HTMLImageElement).src = "/nss-event.jpg" 
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-5">
                          <span className="text-sm md:text-base font-bold text-white drop-shadow-lg">{img.title}</span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}