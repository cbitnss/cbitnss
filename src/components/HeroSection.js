"use client";

import React from "react";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="hero-section relative overflow-hidden min-h-screen flex items-center border-0 outline-none">
      {/* full-bleed background image */}
      <div className="absolute inset-0 z-0 border-0" aria-hidden>
        <Image
          src="/group.jpeg"
          alt="CBIT NSS Group Photo"
          fill
          className="object-cover object-center"
          style={{ border: "none", display: "block" }}
          priority
        />
      </div>
      {/* bottom gradient overlay spanning full width */}
      <div
        className="absolute bottom-0 left-0 h-[27rem] w-full z-10 pointer-events-none"
        aria-hidden
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0))",
        }}
      />

      <div className="container mx-auto px-6 relative z-20 w-full text-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center py-12 mx-auto max-w-6xl px-6">
          <div className="hero-left relative flex flex-col justify-center text-left">
            <div className="quote-wrap relative w-full max-w-xl">
              
              {/* Single-line heading */}
              <h1 className="hero-quote filled whitespace-nowrap text-3xl md:text-5xl leading-tight font-extrabold">
                BE THE REASON SOMEONE SMILES TODAY
              </h1>
              
            </div>

            <div className="mt-6">
              <h2 className="text-2xl md:text-3xl font-black">CBIT NSS</h2>
            </div>

            <div className="description-wrapper mt-4 max-w-xl text-white/90">
              <p className="mb-4 text-sm md:text-base leading-relaxed">
                CBIT National Service Scheme (NSS) is a student-driven organisation focused on community service, leadership and social initiatives. We run drives, camps, awareness sessions and community engagement programs throughout the year.
              </p>
              {/* Join button moved to bottom-left corner */}
            </div>
          </div>

          <div className="hero-right hidden lg:block h-full"></div>
        </div>
      </div>
    </section>
  );
}