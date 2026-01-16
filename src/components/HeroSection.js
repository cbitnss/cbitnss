"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function HeroSection() {
  const router = useRouter();

  return (
    <section
      className="hero-section relative overflow-hidden h-screen w-full flex items-center"
      style={{ marginTop: 0, paddingTop: 0 }}
    >
      {/* Remove any global top spacing */}
      <style jsx global>{`
        html, body, #__next {
          margin: 0 !important;
          padding: 0 !important;
        }
        main {
          margin-top: 0 !important;
          padding-top: 0 !important;
        }
        .hero-section {
          margin-top: 0 !important;
          padding-top: 0 !important;
        }
      `}</style>

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
        className="absolute bottom-0 left-0 h-32 w-full z-10 pointer-events-none"
        aria-hidden
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.85), transparent)",
        }}
      />

      <div className="container mx-auto px-4 md:px-6 relative z-20 w-full text-white h-full flex items-center">
        <div className="max-w-6xl w-full">
          <div className="max-w-3xl">

            <h1 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-3"
              style={{
                textShadow: "3px 3px 8px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.6)",
                lineHeight: "1.1"
              }}
            >
              BE THE REASON FOR
              <br />
              <span className="text-red-500">SOMEONE SMILES</span>
              <br />
              TODAY
            </h1>

            <div className="mb-4">
              <h2 
                className="text-2xl md:text-3xl lg:text-4xl font-black text-white"
                style={{
                  textShadow: "2px 2px 6px rgba(0,0,0,0.8)"
                }}
              >
                CBIT NSS
              </h2>
            </div>

            <div className="max-w-xl">
              <div 
                className="backdrop-blur-sm rounded-lg p-3 md:p-4 mb-4"
                style={{
                  background: "rgba(0,0,0,0.6)",
                  border: "1px solid rgba(255,255,255,0.1)"
                }}
              >
                <p className="text-sm md:text-base leading-relaxed text-white/95">
                  CBIT National Service Scheme (NSS) is a student-driven organisation focused on community service, leadership and social initiatives. We run drives, camps, awareness sessions and community engagement programs throughout the year.
                </p>
              </div>

              {/* CTA BUTTON - Optimized for viewport */}
              <button 
                onClick={() => router.push("/recruitment")}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg text-base transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
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