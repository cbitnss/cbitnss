"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function HamburgerMenu({ onBackClick }) {
  const router = useRouter();

  const handleBack = () => {
    // Call the parent callback if provided (for closing hero section)
    if (onBackClick) {
      onBackClick();
    }
    // Navigate back to home
    router.push("/");
  };

  return (
    <>
      {/* Simple Hamburger/Back Button - Fixed Position with High Z-Index */}
      <button
        onClick={handleBack}
        className="fixed top-6 left-6 z-[101] p-2 text-white hover:text-gray-300 transition-colors bg-black/50 rounded-full backdrop-blur-sm hover:bg-black/70"
        aria-label="Back to menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
    </>
  );
}
