"use client";

import React, { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import HeroSection from "./HeroSection";
import HamburgerMenu from "./HamburgerMenu";
import "./styles/scroll-expand-grid.css";

// Animation duration in seconds
const ANIMATION_DURATION = 2.5;

// Grid Item Component with strict CSS Grid positioning
const GridItem = ({ item, isAnimationComplete, showHero }) => {
  const router = useRouter();

  // Animation: Start at scale 0.5 (centered), expand to scale 1 over ANIMATION_DURATION
  const animationVariants = {
    initial: { scale: 0.5, opacity: 0, x: -200, y: -150 },
    animate: { scale: 1, opacity: 1, x: 0, y: 0 },
  };

  const transitionConfig = {
    duration: ANIMATION_DURATION,
    ease: "easeInOut",
  };

  return (
    <motion.div
      className={`grid-item ${item.gridClass}`}
      initial="initial"
      animate="animate"
      variants={animationVariants}
      transition={transitionConfig}
      onClick={() => !showHero && isAnimationComplete && router.push(item.href)}
      whileHover={!showHero && isAnimationComplete ? { scale: 1.08 } : {}}
      whileTap={!showHero && isAnimationComplete ? { scale: 0.95 } : {}}
    >
      <div className={`grid-item-content ${item.bgColor}`}>
        <div className="grid-item-icon">{item.icon}</div>
        <div className="grid-item-title">{item.name}</div>
      </div>
    </motion.div>
  );
};

export default function ScrollExpandGrid() {
  const containerRef = useRef(null);
  const [showHero, setShowHero] = useState(false);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);

  // Lock/unlock scroll based on animation state
  useEffect(() => {
    if (!isAnimationComplete) {
      // Lock scroll
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      // Unlock scroll
      document.body.style.overflow = "unset";
      document.documentElement.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      document.documentElement.style.overflow = "unset";
    };
  }, [isAnimationComplete]);

  // Start animation on component mount, complete after ANIMATION_DURATION
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimationComplete(true);
    }, ANIMATION_DURATION * 1000);

    return () => clearTimeout(timer);
  }, []);

  const menuItems = [
    {
      id: 1,
      name: "Latest Activities",
      href: "/activities",
      icon: "🎯",
      bgColor: "bg-gradient-to-br from-blue-900 to-blue-700",
      gridClass: "col-span-1 row-span-1",
    },
    {
      id: 2,
      name: "Events",
      href: "/events",
      icon: "🎪",
      bgColor: "bg-gradient-to-br from-orange-500 to-orange-400",
      gridClass: "col-span-1 row-span-1",
    },
    {
      id: 3,
      name: "Emergency",
      href: "/emergency",
      icon: "❤️",
      bgColor: "bg-gradient-to-br from-red-600 to-red-500",
      gridClass: "col-span-1 row-span-1",
    },
    {
      id: 4,
      name: "Top Volunteers",
      href: "/volunteers",
      icon: "👥",
      bgColor: "bg-gradient-to-br from-purple-600 to-purple-500",
      gridClass: "col-span-1 row-span-1",
    },
    {
      id: 5,
      name: "Core Committee",
      href: "/team",
      icon: "⭐",
      bgColor: "bg-gradient-to-br from-teal-600 to-teal-500",
      gridClass: "col-span-1 row-span-1",
    },
    {
      id: 6,
      name: "Join Us",
      href: "/recruitment",
      icon: "🚀",
      bgColor: "bg-gradient-to-br from-yellow-500 to-yellow-400",
      gridClass: "col-span-1 row-span-1",
    },
  ];

  return (
    <>
      {/* Hamburger Button - Always visible, including in hero section */}
      <HamburgerMenu onBackClick={() => setShowHero(false)} />

      {/* Hero Section Overlay - Only when clicked */}
      {showHero && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/95 overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Hero Content */}
          <div className="relative">
            <HeroSection />
          </div>
        </motion.div>
      )}

      {/* Landing Page Container - Fixed height (no scroll track needed) */}
      <div
        ref={containerRef}
        className="relative w-screen h-screen bg-black flex items-center justify-center"
      >
        {/* Bento Menu Grid - Centered container */}
        <div className="w-screen h-screen bg-black overflow-hidden flex items-center justify-center">
          {/* Strict Bento CSS Grid Layout - 3x2 centered around logo */}
          <div className="grid grid-cols-3 grid-rows-2 gap-4 bg-black relative" style={{ width: "90vw", height: "85vh", maxWidth: "1000px", maxHeight: "700px" }}>
            {menuItems.map((item) => (
              <GridItem
                key={item.id}
                item={item}
                isAnimationComplete={isAnimationComplete}
                showHero={showHero}
              />
            ))}

            {/* Central Logo Button - Positioned in the middle */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center z-40 pointer-events-none"
            >
              <motion.button
                onClick={() => setShowHero(true)}
                className="pointer-events-auto hover:scale-110 transition-transform rounded-full"
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
              >
                <Image
                  src="/nsslogo.png"
                  alt="NSS Logo"
                  width={140}
                  height={140}
                  priority
                />
              </motion.button>
            </motion.div>
          </div>
        </div>

        {/* No content below - page ends at menu grid */}
      </div>
    </>
  );
}
