"use client";

import React from "react";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="hero-section relative overflow-hidden min-h-full flex items-center">
      {/* decorative group image (large circle top-right) */}
      {/* decorative group image (large circle top-right) */}
{/* decorative group image (large circle top-right) */}
<div className="group-arc absolute top-0 right-0 w-1/2 h-full z-10 hidden lg:block" aria-hidden>
  <Image 
    src="/group.jpeg" 
    alt="CBIT NSS Group Photo" 
    fill 
    style={{ 
      objectFit: "cover", 
      objectPosition: "right center" /* <-- CHANGE: Focuses the crop on the right side */
    }} 
    priority 
  />
  {/* fade overlay: subtle black fade from left inside the arc */}
  <div className="group-fade-left" />
</div>

      <div className="container mx-auto px-6 relative z-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center py-6">
          <div className="hero-left relative flex flex-col justify-center text-left">
            <div className="quote-wrap relative w-full max-w-xl">
              
              {/* Visible filled quote (no inline logo) */}
              <h1 className="hero-quote filled">
                <div className="first-line" style={{ display: "flex", alignItems: "center", gap: "0.6rem", flexWrap: "nowrap" }}>
                  <span>BE THE REASON</span>
                </div>
                <div className="second-line">SOMEONE SMILES TODAY</div>
              </h1>
              
            </div>

            <div className="mt-6">
              <h2 className="text-2xl md:text-3xl font-black">CBIT NSS</h2>
            </div>

            <div className="description-wrapper mt-4 max-w-xl text-white/90">
              <p className="mb-4 text-sm md:text-base leading-relaxed">
                CBIT National Service Scheme (NSS) is a student-driven organisation focused on community service, leadership and social initiatives. We run drives, camps, awareness sessions and community engagement programs throughout the year.
              </p>
              <div className="text-left">
                <a href="/join" className="inline-block px-4 py-2 bg-white text-black font-semibold rounded-md shadow hover:brightness-95 transition">
                  Join Us
                </a>
              </div>
            </div>
          </div>

          <div className="hero-right hidden lg:block h-full"></div>
        </div>
      </div>
    </section>
  );
}