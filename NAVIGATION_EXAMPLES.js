/**
 * QUICK START GUIDE
 * 
 * This file demonstrates how the new navigation system works
 * and provides code examples for common customizations.
 */

// ============================================================================
// 1. BASIC USAGE - Using Navigation Context
// ============================================================================

import { useNavigation } from "@/context/NavigationContext";

export default function MyComponent() {
  const { showGridMenu, openGridMenu, closeGridMenu, toggleGridMenu } = useNavigation();

  return (
    <div>
      {/* Check if grid menu is visible */}
      {showGridMenu ? <p>Grid menu is open</p> : <p>Grid menu is closed</p>}

      {/* Open grid menu */}
      <button onClick={openGridMenu}>Open Menu</button>

      {/* Close grid menu */}
      <button onClick={closeGridMenu}>Close Menu</button>

      {/* Toggle grid menu */}
      <button onClick={toggleGridMenu}>Toggle Menu</button>
    </div>
  );
}

// ============================================================================
// 2. CUSTOMIZING MENU ITEMS
// ============================================================================

// In src/components/GridMenuV2.jsx, find the menuItems array and modify:

const menuItems = [
  // Original:
  { name: "Latest Activities", href: "/events", color: "var(--color--identity--yellow)", icon: "🎯" },
  
  // Custom example:
  { name: "Join Us", href: "/recruitment", color: "#FF6B6B", icon: "🚀" },
  { name: "Gallery", href: "/gallery", color: "#4ECDC4", icon: "📸" },
  { name: "FAQ", href: "/faq", color: "#95E1D3", icon: "❓" },
];

// ============================================================================
// 3. CHANGING THE CENTRAL LOGO
// ============================================================================

// In src/components/GridMenuV2.jsx, replace the NSSLogo component:

const CustomLogo = () => (
  <img
    src="/your-logo.png"
    alt="Logo"
    style={{ width: '60px', height: '60px' }}
  />
);

// Or use a different SVG:
const CustomLogo = () => (
  <svg viewBox="0 0 100 100" fill="currentColor" style={{ width: '60px', height: '60px' }}>
    {/* Your SVG paths */}
  </svg>
);

// ============================================================================
// 4. STYLING CUSTOMIZATION
// ============================================================================

// Grid Menu Colors (in grid-menu.css or GridMenuV2.jsx inline styles)

// Change tile background:
backgroundColor: "#F7F5F2" // Light background

// Change tile text color:
color: "#1E1919" // Dark text

// Change overlay background (landing state):
backgroundColor: "#1E1919" // Dark overlay

// Change hamburger icon color:
style={{ color: "#0061FE" }} // Blue

// ============================================================================
// 5. ANIMATION CUSTOMIZATION
// ============================================================================

// In GridMenuV2.jsx, modify these properties:

// Fade transition speed (default 0.3s)
transition: 'opacity 0.3s ease-in-out'

// Change to faster:
transition: 'opacity 0.2s ease-in-out'

// Or slower:
transition: 'opacity 0.5s ease-in-out'

// Easing functions (in handleScroll):
const easeFunction = cubicBezier(1, 0.25, 0.85, 1);

// Smoother easing:
const easeFunction = cubicBezier(0.4, 0, 0.2, 1);

// Snappier easing:
const easeFunction = cubicBezier(0.6, 0, 0.4, 1);

// ============================================================================
// 6. PROGRAMMATIC NAVIGATION CONTROL
// ============================================================================

// Example: Auto-close menu when user scrolls
import { useNavigation } from "@/context/NavigationContext";
import { useEffect } from "react";

export default function PageWithAutoCloseMenu() {
  const { closeGridMenu } = useNavigation();

  useEffect(() => {
    const handleScroll = () => {
      closeGridMenu();
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [closeGridMenu]);

  return <div>Content here</div>;
}

// ============================================================================
// 7. RESPONSIVE ADJUSTMENTS
// ============================================================================

// The grid is responsive via grid-menu.css media queries
// To add custom responsive behavior:

import { useEffect, useState } from "react";

export default function ResponsiveExample() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div>
      {isMobile ? <p>Mobile view</p> : <p>Desktop view</p>}
    </div>
  );
}

// ============================================================================
// 8. CONDITIONAL MENU VISIBILITY
// ============================================================================

// Example: Hide menu on specific routes
import { usePathname } from "next/navigation";
import { useNavigation } from "@/context/NavigationContext";
import { useEffect } from "react";

export default function ConditionalMenuPage() {
  const pathname = usePathname();
  const { closeGridMenu } = useNavigation();

  useEffect(() => {
    if (pathname === '/admin' || pathname === '/settings') {
      closeGridMenu();
    }
  }, [pathname, closeGridMenu]);

  return <div>This page doesn't show the grid menu</div>;
}

// ============================================================================
// 9. INTEGRATION WITH OTHER COMPONENTS
// ============================================================================

// Example: Update Navbar to use navigation context
import { useNavigation } from "@/context/NavigationContext";

export default function Navbar() {
  const { toggleGridMenu } = useNavigation();

  return (
    <nav>
      <button onClick={toggleGridMenu}>Menu</button>
    </nav>
  );
}

// ============================================================================
// 10. TROUBLESHOOTING & DEBUGGING
// ============================================================================

// Add console logging to debug navigation state:
import { useNavigation } from "@/context/NavigationContext";
import { useEffect } from "react";

export default function DebugNavigation() {
  const { showGridMenu } = useNavigation();

  useEffect(() => {
    console.log('Grid menu state:', showGridMenu);
  }, [showGridMenu]);

  return <div>Check console for navigation state</div>;
}

// ============================================================================
// COMMON PATTERNS
// ============================================================================

// Pattern 1: Open menu when user visits a certain page
import { useNavigation } from "@/context/NavigationContext";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function PatternOpenMenuOnRoute({ openRoute = '/special' }) {
  const pathname = usePathname();
  const { openGridMenu } = useNavigation();

  useEffect(() => {
    if (pathname === openRoute) {
      openGridMenu();
    }
  }, [pathname, openRoute, openGridMenu]);

  return null;
}

// Pattern 2: Custom button that opens menu
export function MenuButton() {
  const { openGridMenu } = useNavigation();

  return (
    <button 
      onClick={openGridMenu}
      className="px-4 py-2 bg-blue-600 text-white rounded"
    >
      Open Navigation
    </button>
  );
}

// Pattern 3: Track menu visibility with analytics
import { useNavigation } from "@/context/NavigationContext";
import { useEffect } from "react";

export function AnalyticsTracker() {
  const { showGridMenu } = useNavigation();

  useEffect(() => {
    if (showGridMenu) {
      // Track grid menu opened
      console.log('Analytics: Grid menu opened');
    } else {
      // Track grid menu closed
      console.log('Analytics: Grid menu closed');
    }
  }, [showGridMenu]);

  return null;
}

// ============================================================================
// NEXT STEPS
// ============================================================================

/*
1. Test the navigation on different routes
2. Customize menu items to match your needs
3. Adjust colors and styling to match your brand
4. Update menu item hrefs to your actual routes
5. Consider adding animations or transitions
6. Test on mobile devices
7. Monitor performance and optimize if needed
8. Add analytics tracking for user interaction
*/
