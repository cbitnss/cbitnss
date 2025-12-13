"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function HeroSection() {
  const router = useRouter();

  return (
    <section className="hero-section relative overflow-hidden h-screen flex items-center border-0 outline-none">
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
      
      {/* Dark overlay for better text visibility */}
      <div
        className="absolute inset-0 z-5"
        aria-hidden
        style={{
          background: "linear-gradient(to right, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.2) 100%)",
        }}
      />
      
      <div
        className="absolute bottom-0 left-0 h-96 w-full z-10 pointer-events-none"
        aria-hidden
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.85), transparent)",
        }}
      />

      <div className="container mx-auto px-6 relative z-20 w-full text-white h-full flex items-center">
        <div className="max-w-7xl w-full">
          <div className="max-w-4xl">

            <h1 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight mb-6"
              style={{
                textShadow: "3px 3px 8px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.6)",
                lineHeight: "1.2"
              }}
            >
              BE THE REASON FOR
              <br />
              <span className="text-red-500">SOMEONE SMILES</span>
              <br />
              TODAY
            </h1>

            <div className="mb-5">
              <h2 
                className="text-3xl md:text-4xl lg:text-5xl font-black text-white"
                style={{
                  textShadow: "2px 2px 6px rgba(0,0,0,0.8)"
                }}
              >
                CBIT NSS
              </h2>
            </div>

            <div className="max-w-2xl">
              <div 
                className="backdrop-blur-sm rounded-lg p-5 mb-6"
                style={{
                  background: "rgba(0,0,0,0.6)",
                  border: "1px solid rgba(255,255,255,0.1)"
                }}
              >
                <p className="text-base md:text-lg leading-relaxed text-white/95">
                  CBIT National Service Scheme (NSS) is a student-driven organisation focused on community service, leadership and social initiatives. We run drives, camps, awareness sessions and community engagement programs throughout the year.
                </p>
              </div>

              {/* CTA BUTTON - Now properly visible */}
              <button 
                onClick={() => router.push("/recruitment")}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-10 rounded-lg text-lg transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 mb-8"
                style={{
                  boxShadow: "0 10px 30px rgba(220, 38, 38, 0.4)"
                }}
              >
                Join Us Today
              </button>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}