"use client";
import React, { useState, useRef, useEffect } from 'react';

export function EventCard({ title, description, images }) {
  const [current, setCurrent] = useState(0);
  const [hovered, setHovered] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (hovered) {
      timerRef.current = setInterval(() => {
        setCurrent(prev => (prev + 1) % images.length);
      }, 5000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [hovered, images.length]);

  return (
    <div
      className="flex flex-col items-center"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ width: '100%' }}
    >
      <div style={{ position: 'relative', width: '100%', maxWidth: 500, height: 300, overflow: 'hidden', borderRadius: '1rem' }}>
        <img
          src={images[current].url}
          alt={images[current].alt}
          style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '1rem', transition: 'opacity 0.5s' }}
        />
        <div style={{ position: 'absolute', bottom: 10, right: 10, background: 'rgba(0,0,0,0.4)', color: '#fff', borderRadius: 8, padding: '2px 10px', fontSize: 14 }}>
          {current + 1} / {images.length}
        </div>
      </div>
      <h3 className="text-xl font-bold mt-4 mb-2 text-center">{title}</h3>
      <p className="text-base text-center mb-2" style={{ maxWidth: 600 }}>{description}</p>
    </div>
  );
}

