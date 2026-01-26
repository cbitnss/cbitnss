"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const NavigationContext = createContext();

export function NavigationProvider({ children }) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  // Auto-open menu on home route, close on other routes
  useEffect(() => {
    setIsMounted(true);
    setIsMenuOpen(pathname === '/');
  }, [pathname]);

  const openMenu = useCallback(() => {
    setIsMenuOpen(true);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  const value = {
    isMenuOpen,
    openMenu,
    closeMenu,
    toggleMenu,
    isMounted
  };

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within NavigationProvider');
  }
  return context;
}
