"use client";

import React, { useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigation } from "@/context/NavigationContext";
import "./styles/grid-menu.css";

// NSS Logo SVG Component
const NSSLogo = () => (
  <svg viewBox="0 0 46 42" fill="currentColor" style={{ width: '60px', height: '60px', color: '#0061FE' }}>
    <path d="M11.5 2L0 9.3L11.5 16.6L23 9.3L34.5 16.6L46 9.3L34.5 2L23 9.3L11.5 2Z" />
    <path d="M11.5 31.2L0 23.9L11.5 16.6L23 23.9L11.5 31.2Z" />
    <path d="M23 23.9L34.5 16.6L46 23.9L34.5 31.2L23 23.9Z" />
    <path d="M23 41L11.5 33.7L23 26.4L34.5 33.7L23 41Z" />
  </svg>
);

// Hamburger Menu Component
const HamburgerMenu = ({ onClick }) => (
  <motion.button
    onClick={onClick}
    className="fixed top-6 left-6 z-50 focus:outline-none"
    style={{
      background: 'transparent',
      border: 'none',
      cursor: 'pointer',
      padding: '8px',
      display: 'flex',
      flexDirection: 'column',
      gap: '6px'
    }}
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    transition={{ duration: 0.3 }}
    whileHover={{ scale: 1.1 }}
    aria-label="Open menu"
  >
    <span style={{ width: '28px', height: '3px', background: '#fff', borderRadius: '2px', display: 'block' }} />
    <span style={{ width: '28px', height: '3px', background: '#fff', borderRadius: '2px', display: 'block' }} />
    <span style={{ width: '28px', height: '3px', background: '#fff', borderRadius: '2px', display: 'block' }} />
  </motion.button>
);

export default function GridMenuV2() {
  const router = useRouter();
  const pathname = usePathname();
  const { isMenuOpen, closeMenu, openMenu, isMounted } = useNavigation();
  const tilesRef = useRef([]);
  const scrollListenerRef = useRef(null);

  // Add scroll detection on home page to close menu
  useEffect(() => {
    // Only add scroll listener on home page when menu is open
    if (pathname !== '/' || !isMenuOpen) return;

    const handleScroll = () => {
      if (window.scrollY > 10) {
        closeMenu();
        window.removeEventListener('scroll', handleScroll);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    scrollListenerRef.current = handleScroll;

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [pathname, isMenuOpen, closeMenu]);

  const menuItems = [
    { name: "Latest Activities", href: "/activities", color: "var(--color--identity--yellow)", icon: "🎯" },
    { name: "Events", href: "/events", color: "var(--color--identity--purple)", icon: "🎪" },
    { name: "Emergency", href: "/emergency", color: "var(--color--identity--red)", icon: "❤️" },
    { name: "Top Volunteers", href: "/volunteers", color: "var(--color--identity--green)", icon: "👥" },
    { name: "Join Us", href: "/recruitment", color: "var(--color--identity--blue)", icon: "🚀" },
  ];

  const handleMenuItemClick = (href) => {
    closeMenu();
    router.push(href);
  };

  const handleLogoClick = () => {
    // On home page: clicking logo closes the menu overlay to reveal HeroSection
    // On other pages: clicking logo navigates to home (menu will auto-open)
    closeMenu();
    
    // Navigate to home
    router.push("/");
    
    // Scroll to top for smooth transition to hero section
    window.scrollTo(0, 0);
  };

  if (!isMounted) return null;

  return (
    <>
      {/* GRID MENU OVERLAY - Animated */}
      <AnimatePresence mode="wait">
        {isMenuOpen && (
          <>
            {/* Dark Overlay Background */}
            <motion.div
              key="overlay"
              className="fixed inset-0 z-30"
              style={{ backgroundColor: "#1E1919" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              aria-hidden="true"
            />

            {/* Grid Menu Container */}
            <motion.div
              key="grid-container"
              className="fixed inset-0 z-40 flex items-center justify-center pointer-events-auto"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {/* Central NSS Logo - Always clickable */}
              <motion.button
                onClick={handleLogoClick}
                className="absolute z-50 focus:outline-none"
                style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Return to home"
              >
                <NSSLogo />
              </motion.button>

              {/* Navigation Grid - 5 items */}
              <div
                className="grid gap-5 md:gap-6 lg:gap-8"
                style={{
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  maxWidth: "900px",
                  padding: "20px",
                  width: "100%"
                }}
              >
                {menuItems.map((item, index) => (
                  <motion.button
                    key={item.href + index}
                    onClick={() => handleMenuItemClick(item.href)}
                    className="relative w-full rounded-lg focus:outline-none"
                    style={{
                      backgroundColor: "#F7F5F2",
                      border: 'none',
                      cursor: 'pointer',
                      padding: '20px',
                      minHeight: '150px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: '0 8px 30px rgba(0,0,0,0.2)'
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div
                      className="text-xl md:text-2xl font-bold"
                      style={{ color: '#1E1919' }}
                    >
                      {item.name}
                    </div>

                    <div
                      style={{
                        fontSize: '48px',
                        color: item.color,
                        opacity: 0.8,
                        textAlign: 'right'
                      }}
                    >
                      {item.icon}
                    </div>

                    {/* Hover overlay background */}
                    <motion.div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: item.color,
                        zIndex: -1
                      }}
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 0.1 }}
                      transition={{ duration: 0.2 }}
                    />
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* HAMBURGER MENU - Visible only when menu is closed */}
      <AnimatePresence>
        {!isMenuOpen && <HamburgerMenu onClick={openMenu} />}
      </AnimatePresence>

      {/* SCROLL HINT - Only show when menu is closed */}
      <AnimatePresence>
        {!isMenuOpen && (
          <motion.div
            className="fixed bottom-6 right-6 z-40"
            style={{
              color: '#0061FE',
              opacity: 0.7,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.7, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <motion.svg
              width="26"
              height="14"
              viewBox="0 0 26 14"
              fill="currentColor"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <path d="M23.2 0.35L13 10.2L2.8 0.35L1 2.2L13 13.7L25 2.2L23.2 0.35Z" />
            </motion.svg>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
