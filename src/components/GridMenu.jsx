"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./styles/grid-menu.css";

function cubicBezier(mX1, mY1, mX2, mY2) {
  function calcBezier(t, a1, a2) {
    return (
      ((1.0 - 3.0 * a2 + 3.0 * a1) * t + (3.0 * a2 - 6.0 * a1)) * t + 3.0 * a1
    ) * t;
  }
  function binarySubdivide(x, lowerBound, upperBound, mX1, mX2) {
    let currentX, currentT;
    let i = 0;
    const subdivisionPrecision = 0.0000001;
    const subdivisionMaxIterations = 12;
    do {
      currentT = lowerBound + (upperBound - lowerBound) / 2.0;
      currentX = calcBezier(currentT, mX1, mX2) - x;
      if (currentX > 0.0) {
        upperBound = currentT;
      } else {
        lowerBound = currentT;
      }
    } while (
      Math.abs(currentX) > subdivisionPrecision &&
      ++i < subdivisionMaxIterations
    );
    return currentT;
  }
  if (mX1 === mY1 && mX2 === mY2) return (t) => t;
  return (t) =>
    t === 0 || t === 1
      ? t
      : calcBezier(binarySubdivide(t, 0, 1, mX1, mX2), mY1, mY2);
}

export default function GridMenu() {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);
  const [isLanding, setIsLanding] = useState(false);
  const isLandingRef = useRef(false);
  
  const scrollRef = useRef(null);
  const tilesRef = useRef([]);

  useEffect(() => {
    // Check if we start in Landing Mode (Home Page)
    if (pathname === '/') {
       setIsLanding(true);
       isLandingRef.current = true;
       document.body.style.overflow = "hidden"; // Lock scroll in landing mode
    } else {
       setIsLanding(false);
       isLandingRef.current = false;
       document.body.style.overflow = "auto";
    }
  }, [pathname]);

  useEffect(() => {
    setIsMounted(true);
    // Expand document height to allow scrolling for the animation
    document.body.style.minHeight = "250vh";
    if (!isLandingRef.current) {
        document.body.style.overflowY = "scroll"; 
    }

    const easeFunction = cubicBezier(1, 0.25, 0.85, 1);
    const initialScale = 2;

    const handleScroll = () => {
      // LANDING MODE OVERRIDE: Force Grid Open
      if (isLandingRef.current) {
         tilesRef.current.forEach((tile) => {
            if (tile) tile.style.transform = `translate(0px, 0px) scale(1)`;
         });
         const menuBtn = document.querySelector(".nav-button");
         if (menuBtn) menuBtn.style.transform = `scale(0)`; // Hide central button in Grid Mode
         return;
      }

      // STANDARD SCROLL LOGIC
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      const maxScrollDistance = windowHeight * 1.5; 
      const scrollProgress = Math.min(Math.max(scrollY / maxScrollDistance, 0), 1);
      
      const easedProgress = easeFunction(scrollProgress);

      const scale = initialScale - (initialScale - 1) * easedProgress;

      tilesRef.current.forEach((tile, i) => {
        if (!tile) return;
        
        // Calculate dynamic transformations
        const rect = tile.getBoundingClientRect();
        // Use offset for stable grid calculation
        const tileCenterX = tile.offsetLeft + tile.offsetWidth / 2;
        const tileCenterY = tile.offsetTop + tile.offsetHeight / 2;
        
        const screenCenterX = window.innerWidth / 2;
        const screenCenterY = window.innerHeight / 2;
        
        const vectorX = tileCenterX - screenCenterX;
        const vectorY = tileCenterY - screenCenterY;
        
        const translateX = -vectorX * (1 - easedProgress);
        const translateY = -vectorY * (1 - easedProgress);

        tile.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
      });

      // Central Menu Button Logic
      const menuBtn = document.querySelector(".nav-button");
      if (menuBtn) {
        if (easedProgress < 0.1) {
             menuBtn.style.transform = `scale(1.2)`;
        } else if (easedProgress < 0.5) {
             menuBtn.style.transform = `scale(1)`;
        } else {
             menuBtn.style.transform = `scale(${1 - (easedProgress - 0.5) * 0.5})`;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Trigger once to set initial positions
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.body.style.minHeight = "";
      document.body.style.overflowY = "";
    };
  }, []);

  const handleHomeClick = (e) => {
      if (isLanding) {
          e.preventDefault();
          setIsLanding(false);
          isLandingRef.current = false;
          document.body.style.overflow = "auto";
          // Trigger scroll event to update positions (snapping to Stacked if at top)
          window.dispatchEvent(new Event('scroll'));
      }
  };

  const menuItems = [
    { name: "Home", href: "/", color: "var(--color--identity--blue)", icon: "🏠" },
    { name: "Activities", href: "/events", color: "var(--color--identity--yellow)", icon: "🎯" },
    { name: "NAP", href: "/nap", color: "var(--color--identity--green)", icon: "📋" },
    { name: "Executive Board", href: "/team", color: "var(--color--identity--red)", icon: "👥" },
    { name: "Blood Donation Hub", href: "/emergency", color: "var(--color--identity--orange)", icon: "❤️" },
    { name: "Lost & Found", href: "/lost-found", color: "var(--color--identity--cyan)", icon: "🔍" },
    { name: "Gallery", href: "/gallery", color: "var(--color--identity--purple)", icon: "🖼️" },
    { name: "Contact", href: "/contact", color: "var(--color--identity--pink)", icon: "📞" },
  ];

  return (
    <div className={`grid-menu-container nav-container ${isLanding ? 'landing-mode' : ''}`}>
      {/* Landing Overlay Background */}
      {isLanding && (
        <div style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: '#1E1919', // Dark background to hide Hero Section
            zIndex: 90 // Below tiles (z100) but above content
        }} />
      )}

      {/* Central Menu Button */}
      <div className="menu">
        <div className="nav-button">
          <div className="home-logo-container" style={{ width: '40px', height: '40px' }}>
             <svg viewBox="0 0 46 42" fill="currentColor" style={{color: 'var(--accent--tab)'}}>
               <path d="M11.5 2L0 9.3L11.5 16.6L23 9.3L34.5 16.6L46 9.3L34.5 2L23 9.3L11.5 2Z" />
               <path d="M11.5 31.2L0 23.9L11.5 16.6L23 23.9L11.5 31.2Z" />
               <path d="M23 23.9L34.5 16.6L46 23.9L34.5 31.2L23 23.9Z" />
               <path d="M23 41L11.5 33.7L23 26.4L34.5 33.7L23 41Z" />
             </svg>
          </div>
        </div>
      </div>

      <nav className="nav">
        {menuItems.map((item, index) => (
          <div
            key={item.href}
            ref={(el) => (tilesRef.current[index] = el)}
            className={`nav-tile nav-tile-${index + 1}`}
            style={{ 
              backgroundColor: "transparent", 
              zIndex: 100
            }} 
          >
            <Link
              href={item.href}
              onClick={item.href === '/' ? handleHomeClick : undefined}
              className="tile"
              style={{ backgroundColor: "#F7F5F2", position: 'relative', overflow: 'hidden' }}
            >
              <div className="tile-title">{item.name}</div>
              
              <div 
                className="visual-container" 
                style={{
                    position: 'absolute',
                    right: '10px',
                    bottom: '10px',
                    fontSize: '48px',
                    color: item.color
                }}
              >
                {item.icon}
              </div>
              
              <div className="tile-hover-overlay" style={{
                  position: 'absolute',
                  inset: 0,
                  background: item.color,
                  opacity: 0,
                  transition: 'opacity 0.3s'
              }} />
            </Link>
          </div>
        ))}
      </nav>

      {/* Scroll indicator - hide in Landing Mode since we want them to click, not scroll? */}
      {!isLanding && (
      <div className="scroll-chevrons" style={{position:'fixed', bottom: 20, right: 20, zIndex: 100, color: '#0061FE'}}>
         <svg width="26" height="14" viewBox="0 0 26 14" fill="currentColor">
           <path d="M23.2 0.35L13 10.2L2.8 0.35L1 2.2L13 13.7L25 2.2L23.2 0.35Z"/>
         </svg>
      </div>
      )}
      
      {!isLanding && (
      <div style={{
          position: 'absolute', 
          top: '120vh', 
          width: '100%', 
          textAlign: 'center', 
          padding: '50px',
          opacity: 0.5,
          color: 'white'
      }}>
          <h2 style={{fontSize: '2rem'}}>Keep Scrolling to Explore</h2>
      </div>
      )}

    </div>
  );
}
