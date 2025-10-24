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

export default function RecentEventsSection() {
  const [topLeftRef, topLeftVisible] = useIntersectionObserver({ threshold: 0.3 });
  const [topRightRef, topRightVisible] = useIntersectionObserver({ threshold: 0.3 });
  const [bottomRef, bottomVisible] = useIntersectionObserver({ threshold: 0.2 });

  return (
    <section className="relative w-full h-screen bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a] overflow-hidden flex items-center">
      <div className="container mx-auto px-6 md:px-10 lg:px-12 max-w-7xl h-full flex flex-col justify-center py-8">
        
        {/* Section Title */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3">
            Recent Events
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-[#F22232] to-[#F22232]/50 rounded-full mx-auto"></div>
        </div>

        {/* TOP HALF - Two Featured Events with Horizontal Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-8 flex-shrink-0">
          
          {/* LEFT - Arangetra */}
          <div
            ref={topLeftRef}
            className={`transition-all duration-700 ease-in-out ${
              topLeftVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="bg-black/40 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(242,34,50,0.3)] h-full">
              <div className="flex flex-col sm:flex-row h-full">
                {/* Image Section */}
                <div className="relative w-full sm:w-2/5 h-48 sm:h-auto flex-shrink-0 overflow-hidden">
                  <div className="w-full h-full">
                    <EventCard images={eventsData[0].images} />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20"></div>
                </div>
                
                {/* Content Section */}
                <div className="flex-1 p-5 md:p-6 lg:p-8 flex flex-col justify-center">
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-3 md:mb-4">
                    {eventsData[0].title}
                  </h3>
                  <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                    {eventsData[0].description}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT - NSS Summit */}
          <div
            ref={topRightRef}
            className={`transition-all duration-700 ease-in-out delay-200 ${
              topRightVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="bg-black/40 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(242,34,50,0.3)] h-full">
              <div className="flex flex-col sm:flex-row h-full">
                {/* Image Section */}
                <div className="relative w-full sm:w-2/5 h-48 sm:h-auto flex-shrink-0 overflow-hidden">
                  <div className="w-full h-full">
                    <EventCard images={eventsData[1].images} />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20"></div>
                </div>
                
                {/* Content Section */}
                <div className="flex-1 p-5 md:p-6 lg:p-8 flex flex-col justify-center">
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-3 md:mb-4">
                    {eventsData[1].title}
                  </h3>
                  <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                    {eventsData[1].description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM HALF - 5 Small Event Cards */}
        <div
          ref={bottomRef}
          className={`transition-all duration-700 ease-in-out flex-shrink-0 ${
            bottomVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 mb-6">
            {eventsData.slice(2, 7).map((event, idx) => (
              <Link 
                key={event.id}
                href={`/events#${event.id}`}
                className={`transition-all duration-700 ease-in-out ${
                  bottomVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div className="bg-black/40 backdrop-blur-sm rounded-lg overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(242,34,50,0.2)] cursor-pointer group h-full">
                  <div className="relative h-24 md:h-32 lg:h-36 overflow-hidden">
                    <img
                      src={event.images[0].url}
                      alt={event.images[0].alt}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => {
                        e.target.src = '/placeholder-event.jpg';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    
                    {/* Arrow Icon */}
                    <div className="absolute bottom-2 right-2 w-6 h-6 bg-[#F22232] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
                      <ArrowRight className="w-3 h-3 text-white" />
                    </div>
                  </div>
                  <div className="p-2 md:p-3">
                    <h4 className="text-xs md:text-sm font-semibold text-white line-clamp-2">
                      {event.title}
                    </h4>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* View More Button */}
          <div className="flex justify-center">
            <Link href="/events">
              <button className="px-6 py-3 bg-gradient-to-r from-[#F22232] to-[#F22232]/80 text-white font-bold text-sm md:text-base rounded-full shadow-lg hover:shadow-[0_0_30px_rgba(242,34,50,0.5)] transition-all duration-300 hover:scale-105 uppercase tracking-wider">
                View More Events
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#F22232]/10 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl opacity-20"></div>
    </section>
  );
}