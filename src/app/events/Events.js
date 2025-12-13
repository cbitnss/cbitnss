"use client";
import React, { useState, useEffect, useRef } from 'react';

// ===============================================
// 1. DATA
// ===============================================

const eventsData = [
  {
    id: '1',
    title: 'Arangetra',
    description: 'Arangetra was conducted by CBIT NSS as part of the annual fest Sudhee and Shruthi, featuring fun and unique games that brought students together to celebrate unity and cultural joy.',
    images: ["/arang2.jpg", "/arang1.jpg", "/arang3.jpg"],
    year: 2024
  },
  {
    id: '2',
    title: 'NSS Summit',
    description: 'CBIT NSS organized an inter college summit and invited all NSS Clubs to come together for an inspiring day of collaboration and innovation where everyone shared their ideas and bonded with passion for social service.',
    images: ["/sum1.jpg", "/sum2.jpg", "/sum3.jpg", "/sum4.jpg"],
    year: 2024
  },
  {
    id: '3',
    title: 'Strength in Solidarity',
    description: "We stood together and united against injustice. Our march, a small but powerful step towards a justice which carried the victim's story.",
    images: ["/sis1.JPG", "/sis2.JPG", "/sis3.jpg"],
    year: 2024
  },
  {
    id: '5',
    title: 'Be My Santa',
    description: 'The CBIT NSS team collected wishes from children in an orphanage and fulfilled them on Christmas day bringing joy and smiles to their faces.',
    images: ["/santa1.jpg", "/santa2.jpg", "/santa3.jpg"],
    year: 2023
  },
  {
    id: '7',
    title: 'Blood donation',
    description: 'CBIT NSS organized a blood donation camp encouraging students and staff to donate and save lives.',
    images: ["/bd1.jpg", "/bd2.jpg", "/bd3.jpg"],
    year: 2023
  },
  {
    id: '8',
    title: 'Old Age Home Visit',
    description: 'CBIT NSS visited a local old age home and bonded with the elderly, listening to their experiences and playing fun games with them.',
    images: ["/oldage1.jpg", "/oldage2.jpg", "/oldage3.jpg"],
    year: 2023
  },
  {
    id: '9',
    title: 'Hydra Walk',
    description: 'We joined the Telangana government\'s campaign to protect our lakes from illegal land encroachment. At Gandipet Lake, we came together as a community to raise awareness and take action.',
    images: ["/hydra1.jpg", "/hydra2.jpg", "/hydra3.png", "/hydra4.jpg"],
    year: 2023
  },
  {
    id: '11',
    title: 'Clay Ganesh Making',
    description: 'NSS members visited a primary school and connected with the children and engaged in a fun-filled clay modeling activity and made Ganesh idols.',
    images: ["/clayg1.jpg", "/clayg2.jpg", "/clayg3.jpg"],
    year: 2023
  },
  {
    id: '12',
    title: 'Orientation',
    description: 'CBIT NSS welcomed new volunteers and introduced them to the club\'s mission and activities.',
    images: ["/golconda1.jpg", "/golconda2.jpg", "/golconda3.jpg"],
    year: 2023
  },
  {
    id: '13',
    title: 'Women\'s Day',
    description: 'CBIT NSS celebrated International Women\'s Day by organizing empowering sessions and activities recognizing the achievements of women and promoting gender equality.',
    images: ["/womday1.jpg", "/womday2.jpg", "/womday3.jpg"],
    year: 2023
  },
  {
    id: '14',
    title: 'Village Camp',
    description: 'NSS volunteers spent a few days in a nearby village, running service drives, awareness sessions and informal classes while bonding with the local community.',
    images: ['/vcamp1.jpg', '/vcamp2.jpg', '/vcamp3.jpg'],
    year: 2023
  },
  {
    id: '15',
    title: 'YUVA',
    description: 'At the national-level inter-college youth contest YUVA, students burst with energy in leadership and service-oriented events, showcasing leadership spirit.',
    images: ['/yuva1.jpg', '/yuva2.jpg', '/yuva3.jpg'],
    year: 2023
  },
  {
    id: '16',
    title: "Teacher's Day",
    description: 'On Teacher\'s Day the NSS team honoured faculty with heartfelt speeches, handmade cards and a small felicitation ceremony.',
    images: ['/tchr1.jpg', '/tchr2.jpg'],
    year: 2023
  }
];

const scrollImages = [
  { src: '/arang2.jpg', title: 'Arangetra' },
  { src: '/sum2.jpg', title: 'NSS Summit' },
  { src: '/sis2.JPG', title: 'Strength in Solidarity' },
  { src: '/santa2.jpg', title: 'Be My Santa' },
  { src: '/bd2.jpg', title: 'Blood Donation' }
];

// ===============================================
// 2. STICKY SCROLL CONFIGURATION
// ===============================================

const IMAGE_COUNT = scrollImages.length;
const STEPS_PER_IMAGE_VH = 500; 
const EFFECTIVE_SCROLL_VH = IMAGE_COUNT * STEPS_PER_IMAGE_VH;

// SECTION_HEIGHT_VH is the total height. It determines how far the user must scroll.
// Adding 100vh ensures the sticky content is visible for one full viewport height 
// after the last image transition completes, transitioning directly into the next section.
const SECTION_HEIGHT_VH = EFFECTIVE_SCROLL_VH + 100; 

const imagePositions = [
  { x: -120, y: -80, rotate: -22, z: 10 },
  { x: 100, y: 60, rotate: 18, z: 20 },
  { x: -90, y: 100, rotate: -28, z: 30 },
  { x: 110, y: -70, rotate: 20, z: 40 },
  { x: -40, y: 30, rotate: -12, z: 50 },
];

interface ImageTransform {
  opacity: number;
  scale: number;
  yOffset: number;
}


// ===============================================
// 3. MAIN COMPONENT
// ===============================================

export default function NSSEventsPage() {
  const [scrollProgress, setScrollProgress] = useState<number>(0); 
  const [timelineProgress, setTimelineProgress] = useState<number>(0); 
  const [selectedEvent, setSelectedEvent] = useState<typeof eventsData[0] | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<Record<string, number>>({});
  
  const heroRef = useRef<HTMLDivElement | null>(null);
  const timelineRef = useRef<HTMLDivElement | null>(null);

  // --- Scroll Progress Effect (Hero & Timeline) ---
  useEffect(() => {
    let isMounted = true;

    const handleScroll = () => {
      if (!isMounted) return;

      // 1. Hero Sticky Section Progress
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const sectionHeight = heroRef.current.offsetHeight;

        if (rect.bottom > 0 && rect.top < viewportHeight) {
          const progress = -rect.top / (sectionHeight - viewportHeight);
          setScrollProgress(Math.max(0, Math.min(1, progress)));
        }
      }

      // 2. Timeline Progress
      if (timelineRef.current) {
        const rect = timelineRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const scrolled = Math.max(0, windowHeight - rect.top);
        const progress = Math.min(Math.max(scrolled / rect.height, 0), 1);
        setTimelineProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); 
    return () => {
        isMounted = false;
        window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // --- Auto-Image Cycling for Modal/Timeline Cards ---
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prev => {
        const newIndex = { ...prev };
        eventsData.forEach(event => {
          if (event.images.length > 1) {
            newIndex[event.id] = ((prev[event.id] || 0) + 1) % event.images.length;
          }
        });
        return newIndex;
      });
    }, 2500); 

    return () => clearInterval(interval);
  }, []);

  const handleEventClick = (event: typeof eventsData[0], e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentImageIndex(prev => ({ ...prev, [event.id]: 0 })); 
    setSelectedEvent(event);
  };
  
  useEffect(() => {
    const preventContext = (e: MouseEvent) => {
      if (e.target instanceof Element && e.target.closest('.event-card')) {
        e.preventDefault();
      }
    };
    document.addEventListener('contextmenu', preventContext);
    return () => document.removeEventListener('contextmenu', preventContext);
  }, []);

  // --- Image Transformation Logic (Step-based Reveal) ---
  const getImageTransform = (index: number): ImageTransform => {
    const revealStartNormalized = (index * STEPS_PER_IMAGE_VH) / EFFECTIVE_SCROLL_VH;
    const revealEndNormalized = ((index * STEPS_PER_IMAGE_VH) + STEPS_PER_IMAGE_VH) / EFFECTIVE_SCROLL_VH;

    let opacity = 0;
    let scale = 0.75;
    let yOffset = 40; 

    if (scrollProgress >= revealEndNormalized) {
      // Phase 3: Fully Revealed and Stays
      opacity = 1;
      scale = 1;
      yOffset = 0;
    } else if (scrollProgress > revealStartNormalized) {
      // Phase 2: Revealing 
      const localProgress = (scrollProgress - revealStartNormalized) / (revealEndNormalized - revealStartNormalized);
      
      opacity = localProgress;
      scale = 0.75 + localProgress * 0.25; 
      yOffset = 40 * (1 - localProgress); 
    } else {
      // Phase 1: Not yet visible 
    }

    return { opacity, scale, yOffset };
  };


  // --- JSX Rendering ---
  return (
    <div className="bg-black text-white min-h-screen overflow-x-hidden">
      
      {/* Hero Section - The Scroll Trigger (Scrollable area) */}
      <section 
        ref={heroRef} 
        className="relative w-full"
        // THIS HEIGHT DEFINES THE SCROLLABLE AREA, STARTING THE NEXT SECTION RIGHT AFTERWARD
        style={{ height: `${SECTION_HEIGHT_VH}vh` }} 
      >
        {/* Sticky container that locks the images and text to the center */}
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden bg-black">
          
          {/* CBIT NSS Text - Fixed and large */}
          <div className="absolute z-0 text-center">
            <h1 
              className="text-[16vw] md:text-[20vw] font-black leading-none tracking-tighter select-none whitespace-nowrap"
              style={{
                WebkitTextStroke: '2.5px rgba(255, 255, 255, 0.9)',
                WebkitTextFillColor: 'transparent',
                color: 'transparent',
                paintOrder: 'stroke fill',
                filter: "drop-shadow(0 0 30px rgba(255, 255, 255, 0.05))",
                fontFamily: '"Arial Black", "Arial Bold", Gadget, sans-serif',
              }}
            >
              CBIT NSS
            </h1>
          </div>

          {/* Images Container */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
            <div 
              className="relative" 
              style={{ 
                width: 'clamp(300px, 70vw, 600px)', 
                height: 'clamp(400px, 85vh, 800px)' 
              }}
            >
              {scrollImages.map((img: typeof scrollImages[0], idx: number) => {
                const { opacity, scale, yOffset } = getImageTransform(idx);
                const pos = imagePositions[idx];
                
                return (
                  <div
                    key={idx}
                    className="absolute"
                    style={{
                      left: '50%',
                      top: '50%',
                      zIndex: pos.z,
                      opacity: opacity,
                      // Animation driven entirely by scrollProgress value, no CSS transition
                      transform: `translate(calc(-50% + ${pos.x}px), calc(-50% + ${pos.y}px + ${yOffset}px)) rotate(${pos.rotate}deg) scale(${scale})`,
                      width: 'clamp(200px, 50vw, 360px)',
                      height: 'clamp(280px, 65vh, 480px)'
                    }}
                  >
                    <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white/90 bg-black/50 backdrop-blur-sm">
                      <img
                        src={img.src}
                        alt={img.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                        <span className="text-sm md:text-base font-bold text-white drop-shadow-lg">{img.title}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Event Detail Modal (Unchanged) */}
      {selectedEvent && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-8"
          onClick={() => setSelectedEvent(null)}
        >
          <div 
            className="bg-gray-900 rounded-2xl max-w-5xl w-full p-12 border-2 border-blue-500 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-6 right-6 text-white hover:text-blue-500 text-3xl font-bold"
            >
              ×
            </button>
            <div className="flex flex-col md:flex-row gap-10">
              <div className="md:w-1/2">
                <div className="relative h-80 rounded-xl overflow-hidden shadow-2xl">
                  <img
                    src={selectedEvent.images[currentImageIndex[selectedEvent.id] || 0]}
                    alt={selectedEvent.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex gap-3 mt-6 overflow-x-auto pb-2">
                  {selectedEvent.images.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`${selectedEvent.title} ${idx + 1}`}
                      className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 transition-all ${
                        (currentImageIndex[selectedEvent.id] || 0) === idx
                          ? 'border-blue-500 scale-105'
                          : 'border-gray-700 opacity-60 hover:opacity-100'
                      }`}
                      onClick={() => setCurrentImageIndex(prev => ({
                        ...prev,
                        [selectedEvent.id]: idx
                      }))}
                    />
                  ))}
                </div>
              </div>
              <div className="md:w-1/2 flex flex-col justify-center">
                <h2 className="text-5xl font-black mb-6 text-white">{selectedEvent.title}</h2>
                <p className="text-xl text-gray-300 leading-relaxed mb-8">{selectedEvent.description}</p>
                <div className="inline-block px-6 py-3 bg-blue-500 rounded-lg">
                  <span className="text-white font-bold text-lg">{selectedEvent.year}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Timeline Section (Starts immediately after the Hero section) */}
      <section ref={timelineRef} className="py-24 px-8 relative bg-black">
        <div className="max-w-6xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-white/20 transform -translate-x-1/2">
            <div 
              className="absolute top-0 left-0 w-full bg-blue-500 transition-all duration-100 ease-out"
              style={{
                height: `${timelineProgress * 100}%`
              }}
            />
          </div>

          {/* Years */}
          {[2024, 2023].map((year) => {
            const yearEvents = eventsData.filter(e => e.year === year);
            
            return (
              <div key={year} className="mb-40">
                {/* Year Badge */}
                <div className="flex justify-center mb-32">
                  <div className="bg-blue-500 text-black px-12 py-6 rounded-full text-5xl font-black shadow-lg relative z-10">
                    {year}
                  </div>
                </div>

                {/* Events for Year */}
                <div className="space-y-32">
                  {yearEvents.map((event, idx) => {
                    const isLeft = idx % 2 === 0;
                    
                    return (
                      <div
                        key={event.id}
                        className={`flex items-center ${isLeft ? 'justify-start' : 'justify-end'}`}
                      >
                        <div className={`w-full md:w-5/12 ${isLeft ? 'md:pr-16 text-right' : 'md:pl-16 text-left'}`}>
                          <div 
                            className="event-card bg-gray-900/80 backdrop-blur-sm p-8 rounded-2xl border-2 border-white/10 hover:border-blue-500 transition-all duration-300 cursor-pointer group"
                            onClick={(e) => handleEventClick(event, e)}
                            onContextMenu={(e) => handleEventClick(event, e)}
                          >
                            <div className="relative h-64 rounded-xl overflow-hidden mb-6">
                              <img
                                src={event.images[currentImageIndex[event.id] || 0]}
                                alt={event.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                              />
                            </div>
                            <h3 className="text-3xl font-bold mb-4 text-white group-hover:text-blue-500 transition-colors">
                              {event.title}
                            </h3>
                            <p className="text-gray-400 leading-relaxed">
                              {event.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Footer (Unchanged) */}
      <footer className="py-16 text-center border-t border-gray-800 bg-black">
        <h3 className="text-3xl font-black text-white mb-2">CBIT NSS</h3>
        <p className="text-gray-500 text-lg">Not Me But You</p>
        <p className="text-blue-500 font-bold text-xl mt-4">Making a Difference, One Service at a Time</p>
      </footer>
    </div>
  );
}