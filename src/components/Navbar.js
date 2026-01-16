"use client"

import React, { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion"

import SpotlightGrid from "./SpotlightGrid"

const menuItems = [
  { name: "Home", href: "/" },
  { name: "Activities", href: "/events" },
  { name: "NAP", href: "/nap" },
  { name: "Executive Board", href: "/team" },
  { name: "Blood Donation Hub", href: "/emergency" },
]

// ========================================
// MAGNETIC CURVE MENU BUTTON
// ========================================
function MagneticCurveMenu({ isScrolled, isMenuOpen, setIsMenuOpen }) {
  const mouseY = useMotionValue(0)
  const smoothY = useSpring(mouseY, { stiffness: 120, damping: 20, mass: 0.5 })
  
  const [isNearEdge, setIsNearEdge] = useState(false)
  const [centerY, setCenterY] = useState(300) // Default fallback

  // Initialize centerY on client only
  useEffect(() => {
    setCenterY(window.innerHeight / 2)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e
      const windowWidth = window.innerWidth

      // Detect if mouse is within 150px of right edge
      const nearEdge = clientX > windowWidth - 150

      setIsNearEdge(nearEdge && isScrolled)

      if (nearEdge && isScrolled) {
        // Track Y position for magnetic pull
        mouseY.set(clientY)
      } else if (!isScrolled) {
        // Reset to center when not scrolled
        mouseY.set(centerY)
      }
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseY, isScrolled, centerY])

  // Determine visibility
  const shouldShow = !isScrolled || isNearEdge || isMenuOpen

  return (
    <>
      {/* SVG Curve Container */}
      <motion.svg
        className="fixed right-0 top-0 z-40 pointer-events-none"
        width="200"
        height="100vh"
        viewBox="0 0 200 1000"
        preserveAspectRatio="none"
        animate={{
          opacity: shouldShow ? 1 : 0,
          pointerEvents: shouldShow ? "auto" : "none",
        }}
        transition={{ duration: 0.3 }}
      >
        <defs>
          <filter id="softShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
          </filter>
        </defs>

        {/* Soft Parabolic Curve - White */}
        <motion.path
          d="M 200,0 Q 80,500 200,1000"
          fill="white"
          filter="url(#softShadow)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5 }}
        />
      </motion.svg>

      {/* Hamburger Button - Fixed on curve */}
      <motion.button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="fixed right-8 z-50 flex items-center justify-center cursor-pointer"
        animate={{
          y: isScrolled && !isMenuOpen ? smoothY : centerY,
          opacity: shouldShow ? 1 : 0,
          pointerEvents: shouldShow ? "auto" : "none",
        }}
        transition={{
          y: { type: "spring", stiffness: 120, damping: 20 },
          opacity: { duration: 0.3 },
        }}
        style={{
          top: 0,
        }}
      >
        {/* Hamburger Icon - Black */}
        <div className="flex flex-col gap-1.5 w-6 h-6 items-center justify-center">
          <motion.span
            animate={{
              rotate: isMenuOpen ? 45 : 0,
              y: isMenuOpen ? 6 : 0,
            }}
            transition={{ duration: 0.3 }}
            className="block h-0.5 w-6 bg-black rounded-full"
          />
          <motion.span
            animate={{
              opacity: isMenuOpen ? 0 : 1,
            }}
            transition={{ duration: 0.3 }}
            className="block h-0.5 w-6 bg-black rounded-full"
          />
          <motion.span
            animate={{
              rotate: isMenuOpen ? -45 : 0,
              y: isMenuOpen ? -6 : 0,
            }}
            transition={{ duration: 0.3 }}
            className="block h-0.5 w-6 bg-black rounded-full"
          />
        </div>
      </motion.button>
    </>
  )
}

// ========================================
// MAIN NAVBAR COMPONENT
// ========================================
export default function AppNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <SpotlightGrid
        gridSize={36}
        highlightRadius={300}
        gridColor="rgba(255,255,255,0.12)"
      />

      {/* MAGNETIC CURVE MENU */}
      <MagneticCurveMenu
        isScrolled={isScrolled}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />

      {/* FULLSCREEN MENU OVERLAY */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-30 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center"
          >
            <div className="flex flex-col gap-8 text-center">
              {menuItems.map((item, idx) => (
                <motion.div
                  key={item.href}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 + idx * 0.08 }}
                >
                  <a
                    href={item.href}
                    className="text-4xl md:text-5xl font-bold text-white hover:text-gray-400 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}