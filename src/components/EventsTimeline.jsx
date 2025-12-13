"use client";
import React, { useEffect, useRef, useState } from "react";

// UPDATED EVENTS
const EVENTS = [
  {
    id: "1",
    title: "Arangetra — Cultural Extravaganza",
    description:
      "Arangetra is our flagship cultural event where students showcase dance, music and theatre. It brings together diverse talents across campus and celebrates community, creativity and cultural pride.",
    images: ["/arang2.jpg", "/arang1.jpg", "/arang3.jpg"]
  },
  {
    id: "2",
    title: "NSS Summit — College Collaboration",
    description:
      "The NSS Summit is an inter-college gathering for volunteer leaders to exchange ideas, run workshops and coordinate large-scale social initiatives. It fosters collaboration and builds networks for impactful community service.",
    images: ["/sum1.jpg", "/sum2.jpg", "/sum3.jpg", "/sum4.jpg"]
  },
  {
    id: "3",
    title: "Strength in Solidarity — Awareness March",
    description:
      "Our Strength in Solidarity march unites students and staff to raise awareness about social justice and community welfare. The march combines peaceful demonstration with outreach and educational talks.",
    images: ["/sis1.JPG", "/sis2.JPG", "/sis3.jpg"]
  },
  {
    id: "5",
    title: "Be My Santa — Festive Giving",
    description:
      "Be My Santa is our holiday outreach program where NSS members collect and fulfill wishes for children in local orphanages. We bring gifts, organize activities and spread joy during the festive season.",
    images: ["/santa1.jpg", "/santa2.jpg", "/santa3.jpg"]
  },
  {
    id: "7",
    title: "Blood Donation Drive — Save Lives",
    description:
      "Our blood donation drives are organized regularly to support hospitals and patients in need. Students and staff volunteer to donate blood, learn about donation safety and promote the lifesaving impact of giving.",
    images: ["/bd1.jpg", "/bd2.jpg", "/bd3.jpg"]
  },
  {
    id: "8",
    title: "Old Age Home Visit — Community Care",
    description:
      "We visit local old age homes to spend time with residents, listen to their stories and organize recreational activities. These visits build empathy, intergenerational bonds and a sense of shared community.",
    images: ["/oldage1.jpg", "/oldage2.jpg", "/oldage3.jpg"]
  },
  {
    id: "9",
    title: "Hydra Walk — Lake Protection Campaign",
    description:
      "Hydra Walk is a lake protection and cleanup campaign focused on raising awareness about encroachment and pollution. Volunteers participate in cleanup, advocacy and community education to preserve local water bodies.",
    images: ["/hydra1.jpg", "/hydra2.jpg", "/hydra3.png", "/hydra4.jpg"]
  }
];

// Hero images for sticky scroll section
const HERO_IMAGES = [
  { src: '/arang2.jpg', title: 'Arangetra' },
  { src: '/sum2.jpg', title: 'NSS Summit' },
  { src: '/sis2.JPG', title: 'Strength in Solidarity' },
  { src: '/santa2.jpg', title: 'Be My Santa' },
  { src: '/bd2.jpg', title: 'Blood Donation' }
];

// Hacksmith-style Sticky Scroll Section
function HacksmithStickySection() {
  const sectionRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionHeight = rect.height;
      
      // Progress from when section enters to when it leaves
      if (rect.top <= 0 && rect.bottom >= windowHeight) {
        const progress = Math.abs(rect.top) / (sectionHeight - windowHeight);
        setScrollProgress(Math.max(0, Math.min(1, progress)));
      } else if (rect.bottom < windowHeight) {
        setScrollProgress(1);
      } else {
        setScrollProgress(0);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getImageTransform = (index) => {
    const totalImages = HERO_IMAGES.length;
    const imageStart = index / totalImages;
    const imageEnd = (index + 1) / totalImages;
    
    if (scrollProgress < imageStart) {
      return { opacity: 0, scale: 0.3, translateY: 100 };
    } else if (scrollProgress >= imageStart && scrollProgress <= imageEnd) {
      const localProgress = (scrollProgress - imageStart) / (1 / totalImages);
      return {
        opacity: localProgress,
        scale: 0.3 + (localProgress * 0.7),
        translateY: (1 - localProgress) * 100
      };
    } else {
      return { opacity: 1, scale: 1, translateY: 0 };
    }
  };

  const imagePositions = [
    { x: -50, y: -30, rotate: -18, z: 10 },
    { x: 40, y: 20, rotate: 12, z: 20 },
    { x: -30, y: 25, rotate: -25, z: 30 },
    { x: 45, y: -20, rotate: 15, z: 40 },
    { x: -15, y: 10, rotate: -10, z: 50 }
  ];

  return (
    <div className="relative bg-black">
      <div ref={sectionRef} style={{ height: '300vh' }}>
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
          {/* HOLLOW TEXT - STICKY */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
            <h1 
              className="font-black leading-none select-none whitespace-nowrap px-4"
              style={{
                fontSize: 'clamp(3rem, 16vw, 14rem)',
                WebkitTextStroke: '4px white',
                WebkitTextFillColor: 'transparent',
                color: 'transparent',
                fontFamily: '"Arial Black", "Arial Bold", Gadget, sans-serif',
                fontWeight: '900',
                letterSpacing: '0.05em'
              }}
            >
              CBIT NSS
            </h1>
          </div>

          {/* STICKY IMAGES that appear and stack */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="relative" style={{ width: '400px', height: '500px' }}>
              {HERO_IMAGES.map((img, idx) => {
                const { opacity, scale, translateY } = getImageTransform(idx);
                const pos = imagePositions[idx];
                
                return (
                  <div
                    key={idx}
                    className="absolute"
                    style={{
                      left: '50%',
                      top: '50%',
                      zIndex: pos.z,
                      opacity,
                      transform: `translate(calc(-50% + ${pos.x}px), calc(-50% + ${pos.y}px + ${translateY}vh)) rotate(${pos.rotate}deg) scale(${scale})`,
                      width: '300px',
                      height: '400px',
                      willChange: 'transform, opacity'
                    }}
                  >
                    <div className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl border-4 border-white">
                      <img
                        src={img.src}
                        alt={img.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                        <span className="text-sm font-bold text-white">{img.title}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main Timeline Component
export default function EventsTimeline() {
  const containerRef = useRef(null);
  const itemRefs = useRef([]);
  const movingDotRef = useRef(null);
  const blueLineRef = useRef(null);
  const targetYRef = useRef(0);
  const currentYRef = useRef(0);
  const rafRef = useRef(null);
  const [activeId, setActiveId] = useState(null);

  const lerp = (start, end, factor) => start + (end - start) * factor;

  const updateTarget = () => {
    if (!containerRef.current) return;

    const viewportCenter = window.innerHeight / 2;
    const containerRect = containerRef.current.getBoundingClientRect();

    let minDiff = Infinity;
    let newTargetY = currentYRef.current;
    let closestId = null;

    itemRefs.current.forEach((ref, index) => {
      if (!ref) return;
      const rect = ref.getBoundingClientRect();
      const itemCenter = rect.top + 24;
      const diff = Math.abs(itemCenter - viewportCenter);

      if (diff < minDiff) {
        minDiff = diff;
        newTargetY = itemCenter - containerRect.top;
        closestId = EVENTS[index].id;
      }
    });

    targetYRef.current = newTargetY;
    if (closestId !== activeId) setActiveId(closestId);
  };

  const animate = () => {
    const ease = 0.1;
    currentYRef.current = lerp(currentYRef.current, targetYRef.current, ease);

    if (movingDotRef.current) {
      movingDotRef.current.style.transform = `translateY(${currentYRef.current}px)`;
    }
    if (blueLineRef.current) {
      blueLineRef.current.style.height = `${currentYRef.current + 12}px`;
    }

    rafRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    rafRef.current = requestAnimationFrame(animate);

    const handleScroll = () => requestAnimationFrame(updateTarget);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    updateTarget();
    currentYRef.current = targetYRef.current;

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [activeId]);

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden font-sans">
      {/* Hacksmith-style Sticky Scroll Section */}
      <HacksmithStickySection />

      {/* Timeline Section */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-24 bg-[#050505]">
        <div className="relative" ref={containerRef}>
          <div className="absolute left-8 md:left-12 top-0 bottom-0 w-[4px] bg-gray-800/60 rounded-full" />
          <div
            ref={blueLineRef}
            className="absolute left-8 md:left-12 top-0 w-[4px] bg-blue-600 rounded-full z-10 transition-all duration-75 ease-out"
            style={{ height: "0px" }}
          />
          <div
            ref={movingDotRef}
            className="absolute left-8 md:left-12 z-30 w-6 h-6 -ml-[10px] -mt-[12px] pointer-events-none"
            style={{ transform: "translateY(0px)" }}
          >
            <div className="w-full h-full bg-blue-500 rounded-full shadow-[0_0_25px_5px_rgba(37,99,235,0.9)] border-[3px] border-[#050505]"></div>
          </div>

          <div className="space-y-32 pb-48 pt-12">
            {EVENTS.map((ev, i) => (
              <div
                key={ev.id}
                ref={el => itemRefs.current[i] = el}
                className="relative flex items-start"
              >
                <div className="flex-shrink-0 w-24 md:w-32 flex flex-col items-end relative pt-[12px]"> 
                  <div className="absolute right-0 top-[23px] w-[calc(100%-32px-12px)] md:w-[calc(100%-48px-12px)] h-[3px] bg-gray-700/80"></div>
                  <div className={`absolute right-[calc(100%-32px-12px)] md:right-[calc(100%-48px-12px)] top-[12px] w-6 h-6 rounded-full border-[3px] transition-colors duration-500 z-20
                    ${activeId === ev.id ? "bg-blue-600 border-blue-950 shadow-[0_0_15px_rgba(37,99,235,0.8)]" : "bg-gray-800 border-[#050505]"}
                  `}></div>
                </div>

                <div className={`flex-1 pl-6 transition-all duration-700 ${activeId === ev.id ? "opacity-100 translate-y-0" : "opacity-50 translate-y-4"}`}>
                  <article className="relative group">
                    <div className="relative z-10 flex flex-col gap-4">
                      <div className="flex-1">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6 uppercase tracking-wide leading-none">{ev.title}</h2>
                        <p className="text-gray-300 text-lg md:text-xl leading-relaxed font-light max-w-4xl">{ev.description}</p>
                      </div>
                      <ImageCarousel images={ev.images} />
                    </div>
                  </article>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

function ImageCarousel({ images }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer || !images || images.length < 2) return;

    let scrollAmount = 0;
    const speed = 1.5;

    const runScroll = () => {
      scrollAmount += speed;
      if (scrollAmount >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
        scrollAmount = 0;
      }
      scrollContainer.scrollTo({ left: scrollAmount, behavior: "auto" });
    };

    const intervalId = setInterval(runScroll, 20);
    return () => clearInterval(intervalId);
  }, [images]);

  if (!images || images.length === 0) return null;

  return (
    <div className="w-full mt-12 relative rounded-xl overflow-hidden">
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#050505] via-[#050505]/80 to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#050505] via-[#050505]/80 to-transparent z-10 pointer-events-none"></div>

      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto py-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {images.map((src, idx) => (
          <div key={idx} className="flex-shrink-0 w-[80%] md:w-[55%] aspect-video relative rounded-xl overflow-hidden border border-gray-800/30 bg-[#111]">
            <img src={src} alt={`Event image ${idx}`} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
          </div>
        ))}
        {images.length > 1 && images.slice(0, 2).map((src, idx) => (
          <div key={`dup-${idx}`} className="flex-shrink-0 w-[80%] md:w-[55%] aspect-video relative rounded-xl overflow-hidden border border-gray-800/30 bg-[#111]" aria-hidden="true">
            <img src={src} alt="duplicated" className="w-full h-full object-cover opacity-90"/>
          </div>
        ))}
      </div>
      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}