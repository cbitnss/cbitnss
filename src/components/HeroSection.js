
"use client";
import React from "react";
import Silk from "./Silk";

export default function HeroSection() {
  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">
      {/* Silk background */}
      <div className="absolute inset-0 z-0">
        <Silk />
      </div>

      {/* Hero content */}
      <div className="relative z-10 flex items-center justify-center h-full text-center">
        <div className="px-4">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white drop-shadow-lg">
            CBIT NSS
          </h1>
          <p className="mt-4 text-lg md:text-2xl text-gray-200">
            Not Me, But You.
          </p>
        </div>
      </div>

      {/* Optional dark overlay for contrast */}
      <div className="absolute inset-0 bg-black/30 z-[5] pointer-events-none" />
    </section>
  );
}