"use client";
import React, { useState, useRef, useEffect } from 'react';

export function EventCard({ images }) {
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      if (!isHovered) {
        setCurrent(prev => (prev + 1) % images.length);
      }
    }, 5000); // Slightly longer interval for a more professional feel
    return () => clearInterval(timerRef.current);
  }, [images.length, isHovered]);

  const handleNext = () => {
    setCurrent(prev => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrent(prev => (prev - 1 + images.length) % images.length);
  };

  return (
    <div 
      className="relative w-full aspect-square max-w-lg mx-auto overflow-hidden rounded-2xl group"
      style={{ 
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2), 0 0 20px rgba(242, 34, 50, 0.15)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Images with enhanced transitions */}
      {images.map((image, index) => (
        <img
          key={index}
          src={image.url}
          alt={image.alt}
          className={`event-img absolute inset-0 w-full h-full object-cover 
            ${index === current ? 'visible' : 'hidden'}`}
        />
      ))}

      {/* Professional Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-70"></div>

      {/* NSS Badge */}
      <div className="absolute top-4 left-4 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full
        border border-white/20 text-white text-sm font-semibold tracking-wide">
        CBIT NSS
      </div>

      {/* Navigation Arrows - Only visible on hover */}
      <button 
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full
          opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black/70"
        style={{ backdropFilter: 'blur(4px)' }}
      >
        ←
      </button>
      <button 
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full
          opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black/70"
        style={{ backdropFilter: 'blur(4px)' }}
      >
        →
      </button>

      {/* Enhanced Counter with Progress Bar */}
      <div className="absolute bottom-0 inset-x-0 p-4">
        <div className="flex items-center justify-between">
          <div className="text-white/90 text-sm font-medium tracking-wide">
            {current + 1} of {images.length}
          </div>
          <div className="w-24 h-1 bg-white/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white transition-all duration-500 rounded-full"
              style={{ width: `${((current + 1) / images.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

