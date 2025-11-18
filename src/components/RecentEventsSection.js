"use client";
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { EventCard } from '@/components/EventCard';
import { ArrowRight } from 'lucide-react';

// Intersection Observer Hook
const useIntersectionObserver = (options) => {
  const [entry, setEntry] = useState(null);
  const [node, setNode] = useState(null);

  const observer = useRef(null);

  useEffect(() => {
    if (observer.current) observer.current.disconnect();

    observer.current = new window.IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setEntry(entry);
      }
    }, options);

    const { current: currentObserver } = observer;
    if (node) currentObserver.observe(node);

    return () => currentObserver.disconnect();
  }, [node, options]);

  return [setNode, entry?.isIntersecting];
};

const eventsData = [
  {
    id: '1',
    title: 'Arangetra',
    description: 'Arangetra was conducted by CBIT NSS as part of the annual fest Sudhee and Shruthi, featuring fun and unique games that brought students together to celebrate unity and cultural joy.',
    images: [
      { url: "/arang2.jpg", alt: "Arangetra" },
      { url: "/arang1.jpg", alt: "Arangetra" },
      { url: "/arang3.jpg", alt: "Arangetra" },
    ],
    year: 2024
  },
  {
    id: '2',
    title: 'NSS Summit',
    description: 'CBIT NSS organized an inter college summit and invited all NSS Clubs to come together for an inspiring day of collaboration and innovation where everyone shared their ideas and bonded with passion for social service.',
    images: [
      { url: "/sum1.jpg", alt: "NSS summit" },
      { url: "/sum2.jpg", alt: "NSS summit" },
      { url: "/sum3.jpg", alt: "NSS summit" },
      { url: "/sum4.jpg", alt: "NSS summit" }
    ],
    year: 2024
  },
  {
    id: '3',
    title: 'Strength in Solidarity',
    description: "We stood together and united against injustice. Our march, a small but powerful step towards a justice which carried the victim's story.",
    images: [
      { url: "/sis1.JPG", alt: "Strength in solidarity walk" },
      { url: "/sis2.JPG", alt: "Strength in solidarity walk" },
      { url: "/sis3.jpg", alt: "Strength in solidarity walk" },
    ],
    year: 2024
  },
  {
    id: '5',
    title: 'Be My Santa',
    description: 'The CBIT NSS team collected wishes from children in an orphanage and fulfilled them on Christmas day bringing joy and smiles to their faces.',
    images: [
      { url: "/santa1.jpg", alt: "Be My Santa" },
      { url: "/santa2.jpg", alt: "Be My Santa" },
      { url: "/santa3.jpg", alt: "Be My Santa" },
    ],
    year: 2023
  },
  {
    id: '7',
    title: 'Blood donation',
    description: 'CBIT NSS organized a blood donation camp encouraging students and staff to donate and save lives.',
    images: [
      { url: "/bd1.jpg", alt: "Blood donation" },
      { url: "/bd2.jpg", alt: "Blood donation" },
      { url: "/bd3.jpg", alt: "Blood donation" },
    ],
    year: 2023
  },
  {
    id: '8',
    title: 'Old Age Home Visit',
    description: 'CBIT NSS visited a local old age home and bonded with the elderly, listening to their experiences and playing fun games with them.',
    images: [
      { url: "/oldage1.jpg", alt: "Old Age Home Visit" },
      { url: "/oldage2.jpg", alt: "Old Age Home Visit" },
      { url: "/oldage3.jpg", alt: "Old Age Home Visit" },
    ],
    year: 2023
  },
  {
    id: '9',
    title: 'Hydra Walk',
    description: 'We joined the Telangana government\'s campaign to protect our lakes from illegal land encroachment. At Gandipet Lake, we came together as a community to raise awareness and take action.',
    images: [
      { url: "/hydra1.jpg", alt: "Hydra Walk" },
      { url: "/hydra2.jpg", alt: "Hydra Walk" },
      { url: "/hydra3.png", alt: "Hydra Walk" },
      { url: "/hydra4.jpg", alt: "Hydra Walk" }
    ],
    year: 2023
  },
];

// REPLACED component: full-width list with inline floating preview
export default function RecentEventsSection() {
  const [containerRef, isVisible] = useIntersectionObserver({ threshold: 0.12 });

  // only top 6 events
  const topSix = eventsData.slice(0, 6);

  // refs + hover state
  const listRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, w: 0, h: 0 }); // target (cursor) pos
  const rafRef = useRef(null); // RAF id for animation loop
  const previewPosRef = useRef({ x: 0, y: 0, w: 0, h: 0 }); // mirror of applied state

  const latestLoadRef = useRef(null);

  const [hoveredEvent, setHoveredEvent] = useState(null);
  const [previewPos, setPreviewPos] = useState({ x: 0, y: 0, w: 0, h: 0 });
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);

  // preview image states
  const [displayedSrc, setDisplayedSrc] = useState(null);
  const [displayedAlt, setDisplayedAlt] = useState('');
  const [pendingSrc, setPendingSrc] = useState(null);

  // preview size
  const PREVIEW_W = 360;
  const PREVIEW_H = 220;

  // preload first + others
  useEffect(() => {
    const first = topSix[0];
    const firstSrc = first?.images?.[0]?.url || '/placeholder-event.jpg';
    setDisplayedSrc(firstSrc);
    setDisplayedAlt(first?.title || '');
    topSix.forEach(evt => {
      const url = evt.images?.[0]?.url;
      if (url) {
        const img = new window.Image();
        img.src = url;
      }
    });
  }, []);

  // handle mouse: update the target coordinates only. The RAF animation loop
  // will lerp the preview position toward these coordinates producing a magnetic feel.
  const handleMouseMove = (e) => {
    if (!listRef.current) return;
    const rect = listRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseRef.current = { x, y, w: rect.width, h: rect.height };
    // start RAF loop if not already running (it will keep running until settled)
    if (!rafRef.current) {
      rafRef.current = window.requestAnimationFrame(animateFrame);
    }
  };

  // lerp helper
  const lerp = (a, b, t) => a + (b - a) * t;

  // animation frame loop: smoothly move previewPos toward mouseRef target
  const animateFrame = () => {
    const target = mouseRef.current;
    const current = previewPosRef.current;

    // if target width/height changed, update them immediately
    const w = target.w || current.w;
    const h = target.h || current.h;

    // easing factor: smaller => slower, more "magnetic"
    const ease = 0.18;

    const nextX = lerp(current.x, target.x, ease);
    const nextY = lerp(current.y, target.y, ease);

    // apply clamping similar to previewStyle logic
    const halfW = PREVIEW_W / 2;
    const minCenterX = 8 + halfW;
    const maxCenterX = w - 8 - halfW;
    const clampedX = Math.max(minCenterX, Math.min(maxCenterX, nextX));

    const halfH = PREVIEW_H / 2;
    const minCenterY = 8 + halfH;
    const maxCenterY = h - 8 - halfH;
    const clampedY = Math.max(minCenterY, Math.min(maxCenterY, nextY));

    const newPos = { x: clampedX, y: clampedY, w, h };

    // update refs + state
    previewPosRef.current = newPos;
    setPreviewPos(newPos);

    // decide whether to continue animating:
    const dx = Math.abs(current.x - target.x);
    const dy = Math.abs(current.y - target.y);

    // Continue if not yet settled OR preview visible (keeps slight motion after stop)
    const stillMoving = dx > 0.5 || dy > 0.5 || isPreviewVisible;

    rafRef.current = stillMoving ? window.requestAnimationFrame(animateFrame) : null;
  };

  const loadAndApplyImage = (src, alt, loadId) => {
    const img = new window.Image();
    img.src = src;
    img.onload = () => {
      if (latestLoadRef.current === loadId) {
        setDisplayedSrc(src);
        setDisplayedAlt(alt || '');
        setPendingSrc(null);
      }
    };
    img.onerror = () => {
      if (latestLoadRef.current === loadId) {
        setDisplayedSrc('/placeholder-event.jpg');
        setDisplayedAlt(alt || '');
        setPendingSrc(null);
      }
    };
  };

  const handleEnter = (eventItem, e) => {
    setHoveredEvent(eventItem);
    setIsPreviewVisible(true);
    handleMouseMove(e);
    const src = eventItem.images?.[0]?.url || '/placeholder-event.jpg';
    setPendingSrc(src);
    const loadId = Symbol();
    latestLoadRef.current = loadId;
    loadAndApplyImage(src, eventItem.title, loadId);
  };

  const handleLeave = () => {
    setIsPreviewVisible(false);
    setTimeout(() => setHoveredEvent(null), 160);
    latestLoadRef.current = null;
    setPendingSrc(null);
  };

  // Keep previewPosRef in sync if external code sets previewPos (ensure ref mirrors state)
  useEffect(() => {
    previewPosRef.current = previewPos;
  }, [previewPos]);

  // PREVIEW STYLE: centered on cursor, rectangular, stronger glow & shadow so it matches reference feel
  const previewStyle = (() => {
    const { x, y, w, h } = previewPos;
    if (!w) return { opacity: 0, transform: 'translate(-50%, -50%) translateY(6px)' };

    const halfW = PREVIEW_W / 2;
    const halfH = PREVIEW_H / 2;

    const minCenterX = 8 + halfW;
    const maxCenterX = w - 8 - halfW;
    let centerX = x;
    if (centerX < minCenterX) centerX = minCenterX;
    if (centerX > maxCenterX) centerX = maxCenterX;

    const minCenterY = 8 + halfH;
    const maxCenterY = h - 8 - halfH;
    let centerY = y;
    if (centerY < minCenterY) centerY = minCenterY;
    if (centerY > maxCenterY) centerY = maxCenterY;

    // stronger red rim + ambient shadow, rectangular (no rounding)
    const glow = isPreviewVisible
      ? '0 30px 80px rgba(242,34,50,0.22), 0 10px 40px rgba(0,0,0,0.7)'
      : 'none';

    return {
      left: `${centerX}px`,
      top: `${centerY}px`,
      width: `${PREVIEW_W}px`,
      height: `${PREVIEW_H}px`,
      opacity: isPreviewVisible && (displayedSrc || pendingSrc) ? 1 : 0,
      transform: isPreviewVisible ? 'translate(-50%, -50%) scale(1)' : 'translate(-50%, -50%) scale(0.995)',
      transition: 'transform 120ms ease-out, opacity 120ms ease-out, box-shadow 160ms ease-out',
      boxShadow: glow,
      borderRadius: '0px',
      overflow: 'visible',
      willChange: 'transform, opacity, box-shadow',
      position: 'absolute',
      pointerEvents: 'none',
      zIndex: 30 // image above separators but below text
    };
  })();

  return (
    <section ref={containerRef} className="relative w-full min-h-[72vh] bg-black overflow-hidden flex items-center py-12">
      {/* full-bleed header area */}
      <div className="w-full mx-0 px-0">
        <div className="flex items-center justify-center gap-6 mb-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-0">Recent Activities</h2>
            <div className="h-1 w-20 bg-[#f22232] rounded-full mx-auto mt-3" />
          </div>
          <Link href="/events" className="inline-block px-5 py-2 bg-[#f22232] text-white rounded-full font-semibold hover:brightness-95 transition hidden sm:inline">
            View More Events
          </Link>
        </div>

        {/* full-width list (black background, single separators) */}
        <div
          ref={listRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleLeave}
          className={`relative w-full bg-black p-0 transition-all ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <div className="grid grid-cols-1">
            {topSix.map((event, idx) => {
              const isActive = hoveredEvent?.id === event.id;
              return (
                <div
                  key={event.id}
                  onMouseEnter={(e) => handleEnter(event, e)}
                  onMouseLeave={handleLeave}
                  // no z-index on the item container (prevents it from forming a higher stacking context)
                  // text will be explicitly placed above the preview (z-50) below.
                  className={`relative flex items-center justify-between py-6 px-8 cursor-pointer transition-colors`}
                  style={isActive ? { boxShadow: 'inset 0 0 120px rgba(242,34,50,0.03)', background: 'rgba(255,255,255,0.01)' } : {}}
                >
                  {/* Text block (topmost) */}
                  <div className={`flex items-center gap-6 z-50`}> {/* text above preview */}
                    <div className={`text-sm ${isActive ? 'text-white' : 'text-gray-300'} w-6 text-right`}>{idx + 1}</div>
                    <div className={`text-sm md:text-base font-medium ${isActive ? 'text-white' : 'text-gray-200'} truncate`}>{event.title}</div>
                  </div>
                  <div className={`text-sm ${isActive ? 'text-white/90' : 'text-gray-400'} z-50`}>{event.year}</div>

                  {/* full-width thin white separator at bottom (always visible, lowest layer) */}
                  <div className="absolute left-0 right-0 bottom-0 h-px bg-white z-0" />
                </div>
              );
            })}
          </div>

          {/* Floating preview image centered on cursor (rectangular, sits under text but above separators) */}
          <div style={previewStyle} aria-hidden="true">
            {(displayedSrc || pendingSrc) && (
              <div className="w-full h-full relative" style={{ background: 'transparent' }}>
                <img
                  src={displayedSrc || pendingSrc || '/placeholder-event.jpg'}
                  alt={displayedAlt || (hoveredEvent?.title || '')}
                  className="block object-cover"
                  style={{
                    width: '100%',
                    height: '100%',
                    opacity: 0.92, // slightly dim so the white separators are still perceived underneath
                    transform: isPreviewVisible ? 'scale(1.02)' : 'scale(0.995)',
                    display: 'block'
                  }}
                  onError={(e) => (e.currentTarget.src = '/placeholder-event.jpg')}
                />
                {/* subtle overlay so image is not too bright and separators show through */}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.18), rgba(0,0,0,0.02))', pointerEvents: 'none' }} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* decorative glows (kept subtle) */}
      <div className="absolute -left-24 top-8 w-64 h-64 rounded-full bg-[#F22232]/6 blur-3xl pointer-events-none" />
      <div className="absolute -right-24 bottom-8 w-64 h-64 rounded-full bg-blue-600/6 blur-3xl pointer-events-none" />
    </section>
  );
}