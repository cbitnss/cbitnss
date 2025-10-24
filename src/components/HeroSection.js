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

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40 z-[5]" />

      {/* Hero content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
        {/* NSS Logo */}
        <img
          src="/nsslogo.png"
          alt="CBIT NSS Logo"
          className="w-48 h-48 md:w-64 md:h-64 mb-8 rounded-full shadow-lg mx-auto"
        />

        {/* Main heading */}
        <h1 className="text-5xl md:text-7xl font-extrabold text-white drop-shadow-lg">
          CBIT NSS
        </h1>

        {/* Tagline */}
        <p className="mt-4 text-lg md:text-2xl text-gray-200">
          Not Me, But You.
        </p>
      </div>
    </section>
  );
}
