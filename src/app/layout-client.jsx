"use client";

import { usePathname } from "next/navigation";
import HamburgerMenu from "@/components/HamburgerMenu";
import { NextUIProvider } from '@nextui-org/react'
import Footer from "@/components/Footer";
import { NavigationProvider } from "@/context/NavigationContext";

export default function RootLayoutClient({ children, fonts }) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    <html lang="en">
      <body
        className={fonts}
        style={{ margin: 0, padding: 0, backgroundColor: '#000000' }}
      >
        <NavigationProvider>
          <NextUIProvider>
            <div 
              style={{ 
                position: 'relative',
                backgroundColor: '#000000',
                color: '#ffffff'
              }}
            >
              {/* Show hamburger menu only on non-home pages */}
              {!isHomePage && <HamburgerMenu />}
              {children}
              {/* Show footer only on non-home pages */}
              {!isHomePage && <Footer />}
            </div>
          </NextUIProvider>
        </NavigationProvider>
      </body>
    </html>
  );
}
