"use client";
import React, { useEffect, useRef, useState } from "react";

// UPDATED EVENTS: improved titles, full descriptions, and image lists from public/
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
    id: "5",
    title: "Strength in Solidarity — Awareness March",
    description:
      "Our Strength in Solidarity march unites students and staff to raise awareness about social justice and community welfare. The march combines peaceful demonstration with outreach and educational talks.",
    images: ["/sis1.JPG", "/sis2.JPG", "/sis3.jpg"]
  },
  {
    id: "3",
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
  },
  {
    id: "11",
    title: "Clay Ganesh Making — Creative Engagement (school)",
    description:
      "NSS members visited a primary school and connected with the children through a fun-filled clay modeling activity where everyone made beautiful Ganesh idols together.",
    images: ["/clayg1.jpg", "/clayg2.jpg", "/clayg3.jpg"]
  },
  {
    id: "12",
    title: "Orientation — Welcome to NSS",
    description:
      "CBIT NSS welcomed new volunteers and introduced them to the club's mission, values and activities. Orientation sessions help new members understand how they can contribute to our social service initiatives.",
    images: ["/golconda1.jpg", "/golconda2.jpg", "/golconda3.jpg"]
  },
  {
    id: "13",
    title: "Women's Day — Celebrating Empowerment",
    description:
      "CBIT NSS celebrated International Women's Day by organizing empowering sessions and activities recognizing the achievements of women and promoting gender equality in our community.",
    images: ["/womday1.jpg", "/womday2.jpg", "/womday3.jpg"]
  },
  {
    id: "14",
    title: "Village Camp — Community Connection",
    description:
      "NSS volunteers spent a few days in a nearby village, running service drives, awareness sessions and informal classes while bonding with the local community and understanding their needs.",
    images: ["/vcamp1.jpg", "/vcamp2.jpg", "/vcamp3.jpg"]
  },
  {
    id: "15",
    title: "YUVA — National Youth Contest",
    description:
      "At the national-level inter-college youth contest YUVA, students burst with energy in leadership and service-oriented events, showcasing our club's leadership spirit and dedication to social service.",
    images: ["/yuva1.jpg", "/yuva2.jpg", "/yuva3.jpg"]
  },
  {
    id: "16",
    title: "Teacher's Day 2025 — Honoring Mentors",
    description:
      "On Teacher's Day the NSS team honoured faculty with heartfelt speeches, handmade cards and a small felicitation ceremony to express gratitude for their guidance and support.",
    images: ["/tchr1.jpg", "/tchr2.jpg"]
  },
  {
    id: "17",
    title: "Blanket Donation",
    description: 'This winter, we the CBIT NSS Unit organized a heartfelt Blanket Donation Drive, where volunteers stepped out onto the streets at night to distribute warm blankets to individuals sleeping outdoors. This initiative aimed to provide comfort during the cold weather while fostering compassion and social responsibility among students.The drive was not only impactful, bringing immediate relief to those in need, but also an enriching and uplifting experience for the volunteers. Working together, the students witnessed firsthand the difference a small act of kindness can make, reinforcing the true spirit of service that NSS stands for. Seeing the smiles, sharing small conversations, and knowing we made someone’s night a little warmer reminded us why service matters. Grateful to be part of a team that turns compassion into action..',
      
    images: ["/Blanket2.jpg", "/Blanket3.jpg"]
  },
  {
    id: "41",
    title: "Food donation drive",
    description:
      "Add event description here. This is a placeholder event that you can customize with your own details, images and information.",
    images: ["/placeholder1.jpg", "/placeholder2.jpg"]
  },
  {
    id: "42",
    title: "TFT Chandippa",
    description:
      "Add event description here. This is a placeholder event that you can customize with your own details, images and information.",
    images: ["/placeholder1.jpg", "/placeholder2.jpg"]
  },
  {
    id: "43",
    title: "Girl child day",
    description:
      "Add event description here. This is a placeholder event that you can customize with your own details, images and information.",
    images: ["/placeholder1.jpg", "/placeholder2.jpg"]
  },
  {
    id: "18",
    title: "Food donation drive",
    description:
      "Add event description here. This is a placeholder event that you can customize with your own details, images and information.",
    images: ["/placeholder1.jpg", "/placeholder2.jpg"]
  },
  {
    id: "19",
    title: "Teachers day-2026",
    description:
      "Add event description here. This is a placeholder event that you can customize with your own details, images and information.",
    images: ["/Copy of 25TeachersDay1.jpg", "/Copy of 25TeachersDay2.jpg","/Copy of 25TeachersDay3.jpg","/Copy of 25TeachersDay4.jpg"]
  },
  {
    id: "20",
    title: "Pcos",
    description:
      "Add event description here. This is a placeholder event that you can customize with your own details, images and information.",
    images: ["/placeholder1.jpg", "/placeholder2.jpg"]
  },
  {
    id: "21",
    title: "Clay ganesh orphanage",
    description:
      "Add event description here. This is a placeholder event that you can customize with your own details, images and information.",
    images: ["/placeholder1.jpg", "/placeholder2.jpg"]
  },
  {
    id: "22",
    title: "Anti ragging walk ",
    description:
      "Add event description here. This is a placeholder event that you can customize with your own details, images and information.",
    images: ["/placeholder1.jpg", "/placeholder2.jpg"]
  },
  {
    id: "23",
    title: "Tft shilparamam",
    description:
      "Add event description here. This is a placeholder event that you can customize with your own details, images and information.",
    images: ["/placeholder1.jpg", "/placeholder2.jpg"]
  },
  {
    id: "24",
    title: "Anti Drug drive",
    description:
      "Add event description here. This is a placeholder event that you can customize with your own details, images and information.",
    images: ["/placeholder1.jpg", "/placeholder2.jpg"]
  },
  {
    id: "25",
    title: "Euphoria ",
    description:
      "Add event description here. This is a placeholder event that you can customize with your own details, images and information.",
    images: ["/placeholder1.jpg", "/placeholder2.jpg"]
  },
  {
    id: "26",
    title: "Women's Day",
    description:
      "Add event description here. This is a placeholder event that you can customize with your own details, images and information.",
    images: ["/placeholder1.jpg", "/placeholder2.jpg"]
  },
  {
    id: "27",
    title: "TFT Charminar",
    description:
      "Add event description here. This is a placeholder event that you can customize with your own details, images and information.",
    images: ["/placeholder1.jpg", "/placeholder2.jpg"]
  },
  {
    id: "28",
    title: "Khadi",
    description:
      "Add event description here. This is a placeholder event that you can customize with your own details, images and information.",
    images: ["/placeholder1.jpg", "/placeholder2.jpg"]
  },
  {
    id: "31",
    title: "Watch for cause ",
    description:
      "Add event description here. This is a placeholder event that you can customize with your own details, images and information.",
    images: ["/placeholder1.jpg", "/placeholder2.jpg"]
  },
  {
    id: "33",
    title: "Cleanliness drive",
    description:
      "Add event description here. This is a placeholder event that you can customize with your own details, images and information.",
    images: ["/Copy of Cleanliness2.heif", "/Copy of Cleanliness1.heif","/Copy of Cleanliness3.heif","/Copy of Cleanliness4.heif","/Copy of Cleanliness5.heif"]
  },
  {
    id: "34",
    title: "Girl child day",
    description:
      "Add event description here. This is a placeholder event that you can customize with your own details, images and information.",
    images: ["/placeholder1.jpg", "/placeholder2.jpg"]
  },
  {
    id: "37",
    title: "Orphanage visit ",
    description:
      "Add event description here. This is a placeholder event that you can customize with your own details, images and information.",
    images: ["/placeholder1.jpg", "/placeholder2.jpg"]
  },
  {
    id: "38",
    title: "Hydra walk",
    description:
      "Add event description here. This is a placeholder event that you can customize with your own details, images and information.",
    images: ["/placeholder1.jpg", "/placeholder2.jpg"]
  },
  {
    id: "39",
    title: "Strength in solidarity ",
    description:
      "Add event description here. This is a placeholder event that you can customize with your own details, images and information.",
    images: ["/Copy of Soliditary4.jpeg", "/Copy of Solidarity2.jpeg","/Copy of Solidarity3.jpeg","/Copy of Solidarity1.jpeg","/Copy of Solidarity1.jpeg"]
  },
  {
    id: "40",
    title: "Oldage Home visit",
    description:
      "Add event description here. This is a placeholder event that you can customize with your own details, images and information.",
    images: ["/placeholder1.jpg", "/placeholder2.jpg"]
  }
];

export default function EventsTimeline() {
  const containerRef = useRef(null);
  const itemRefs = useRef([]);

  // Refs for the animated elements
  const movingDotRef = useRef(null);
  const blueLineRef = useRef(null);

  // State for animation logic
  const targetYRef = useRef(0);
  const currentYRef = useRef(0);
  const rafRef = useRef(null);

  // To highlight the active connector
  const [activeId, setActiveId] = useState(null);

  // Helper: Linear Interpolation
  const lerp = (start, end, factor) => start + (end - start) * factor;

  // 1. Calculate the Target Y
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

      // Calculate center relative to the specific layout structure
      // Offset by top padding (approx 12px) + half dot height (12px) = 24px down
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

  // 2. Animation Loop
  const animate = () => {
    const ease = 0.1;
    currentYRef.current = lerp(currentYRef.current, targetYRef.current, ease);

    if (movingDotRef.current) {
      movingDotRef.current.style.transform = `translateY(${currentYRef.current}px)`;
    }
    if (blueLineRef.current) {
      // Add offset to align line tip with dot center
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
    // Initial jump to prevent sliding on load
    currentYRef.current = targetYRef.current;

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <main className="min-h-screen bg-[#050505] text-white overflow-hidden font-sans">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-24">

        <div className="relative" ref={containerRef}>

          {/* --- THE RAIL SYSTEM (Left Side) --- */}
          {/* 1. Static Dark Line */}
          <div className="absolute left-8 md:left-12 top-0 bottom-0 w-[4px] bg-gray-800/60 rounded-full" />

          {/* 2. Dynamic Blue Fill Line */}
          <div
            ref={blueLineRef}
            className="absolute left-8 md:left-12 top-0 w-[4px] bg-blue-600 rounded-full z-10 transition-all duration-75 ease-out"
            style={{ height: "0px" }}
          />

          {/* 3. The BIG Moving Dot (Size: w-6 h-6 = 24px) */}
          <div
            ref={movingDotRef}
            className="absolute left-8 md:left-12 z-30 w-6 h-6 -ml-[10px] -mt-[12px] pointer-events-none"
            style={{ transform: "translateY(0px)" }}
          >
             <div className="w-full h-full bg-blue-500 rounded-full shadow-[0_0_25px_5px_rgba(37,99,235,0.9)] border-[3px] border-[#050505]"></div>
          </div>


          {/* --- EVENTS LIST --- */}
          <div className="space-y-32 pb-48 pt-12">
            {EVENTS.map((ev, i) => (
              <div
                key={ev.id}
                ref={el => itemRefs.current[i] = el}
                className="relative flex items-start"
              >

                {/* CONNECTOR MECHANISM */}
                <div className="flex-shrink-0 w-24 md:w-32 flex flex-col items-end relative pt-[12px]"> 
                  
                  {/* Horizontal Line */}
                  <div className="absolute right-0 top-[23px] w-[calc(100%-32px-12px)] md:w-[calc(100%-48px-12px)] h-[3px] bg-gray-700/80"></div>

                  {/* Static Dot on Rail - INCREASED SIZE to match moving dot (w-6 h-6) */}
                  <div className={`absolute right-[calc(100%-32px-12px)] md:right-[calc(100%-48px-12px)] top-[12px] w-6 h-6 rounded-full border-[3px] transition-colors duration-500 z-20
                    ${activeId === ev.id ? "bg-blue-600 border-blue-950 shadow-[0_0_15px_rgba(37,99,235,0.8)]" : "bg-gray-800 border-[#050505]"}
                  `}></div>
                </div>

                {/* THE CONTENT (No Box outlines) */}
                <div className={`flex-1 pl-6 transition-all duration-700 ${activeId === ev.id ? "opacity-100 translate-y-0" : "opacity-50 translate-y-4"}`}>
                  <article className="relative group">
                    <div className="relative z-10 flex flex-col gap-4">
                      <div className="flex-1">
                        {/* Typography updated to match reference: Uppercase, bold title. Lighter description. */}
                        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6 uppercase tracking-wide leading-none">{ev.title}</h2>
                        <p className="text-gray-300 text-lg md:text-xl leading-relaxed font-light max-w-4xl">{ev.description}</p>
                      </div>

                      {/* NEW IMAGE CAROUSEL COMPONENT */}
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


/**
 * Sub-component for automatic horizontal image scrolling
 */
function ImageCarousel({ images }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer || !images || images.length < 2) return;

    let scrollAmount = 0;
    // Speed of auto-scroll (pixels per interval)
    const speed = 1.5; 

    const runScroll = () => {
        scrollAmount += speed;
        // If reached the end (minus viewport width), reset to start for loop effect
        if (scrollAmount >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
            scrollAmount = 0;
        }
        scrollContainer.scrollTo({ left: scrollAmount, behavior: "auto" });
    };

    // Use interval for continuous smooth scrolling
    const intervalId = setInterval(runScroll, 20); // Runs every 20ms

    return () => clearInterval(intervalId);
  }, [images]);

  if (!images || images.length === 0) return null;

  return (
    <div className="w-full mt-12 relative rounded-xl overflow-hidden">
      
       {/* Gradient Fade Overlays for smooth edges */}
       <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#050505] via-[#050505]/80 to-transparent z-10 pointer-events-none"></div>
       <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#050505] via-[#050505]/80 to-transparent z-10 pointer-events-none"></div>

      {/* The Scroll Container */}
      <div
        ref={scrollRef}
        // "no-scrollbar" requires custom CSS or Tailwind plugin.
        // Using inline style to hide scrollbars for simplicity here.
        className="flex gap-6 overflow-x-auto py-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {images.map((src, idx) => (
          <div key={idx} className="flex-shrink-0 w-[80%] md:w-[55%] aspect-video relative rounded-xl overflow-hidden border border-gray-800/30 bg-[#111]">
            <img src={src} alt={`Event image ${idx}`} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
          </div>
        ))}
        {/* Duplicate some images at the end to make the looping smoother if needed */}
         {images.length > 1 && images.slice(0, 2).map((src, idx) => (
             <div key={`dup-${idx}`} className="flex-shrink-0 w-[80%] md:w-[55%] aspect-video relative rounded-xl overflow-hidden border border-gray-800/30 bg-[#111]" aria-hidden="true">
                 <img src={src} alt="duplicated" className="w-full h-full object-cover opacity-90"/>
             </div>
         ))}
      </div>
      {/* Add custom CSS to hide webkit scrollbars if not using tailwind plugin */}
      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}