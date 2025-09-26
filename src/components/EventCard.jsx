"use client";
import React, { useState, useRef, useEffect } from 'react';

export function EventCard({ images }) {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrent(prev => (prev + 1) % images.length);
    }, 3000); // Shortened interval for more dynamic feel
    return () => clearInterval(timerRef.current);
  }, [images.length]);

  return (
    <div 
      className="relative w-full aspect-square max-w-lg mx-auto overflow-hidden rounded-lg"
      style={{ 
        border: '1px solid var(--glow-color-alpha)',
        boxShadow: '0 0 15px var(--glow-color-alpha)'
      }}
    >
      {images.map((image, index) => (
        <img
          key={index}
          src={image.url}
          alt={image.alt}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${index === current ? 'opacity-100' : 'opacity-0'}`}
        />
      ))}
      <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded-full">
        {current + 1} / {images.length}
      </div>
    </div>
  );
}

