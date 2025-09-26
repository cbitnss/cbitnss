"use client";
import React, { useEffect, useRef, useState } from 'react';
import { EventCard } from '@/components/EventCard';

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
    description: 'We stood together and united against injustice. Our march, a small but powerful step towards a justice which carried the victim’s story.',
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
  {
    id: '11',
    title: 'Clay Ganesh Making',
    description: 'NSS members visited a primary school and connected with the children and engaged in a fun-filled clay modeling activity and made Ganesh idols.',
    images: [
      { url: "/clayg1.jpg", alt: "Clay Ganesh Making" },
      { url: "/clayg2.jpg", alt: "Clay Ganesh Making" },
      { url: "/clayg3.jpg", alt: "Clay Ganesh Making" },
    ],
    year: 2023
  },
  {
    id: '12',
    title: 'Orientation',
    description: 'CBIT NSS welcomed new volunteers and introduced them to the club\'s mission and activities.',
    images: [
      { url: "/golconda1.jpg", alt: "Golconda Visit" },
      { url: "/golconda2.jpg", alt: "Golconda Visit" },
      { url: "/golconda3.jpg", alt: "Golconda Visit" },
    ],
    year: 2023
  },
  {
  id: '13',
  title: 'Women\'s Day',
  description: 'CBIT NSS celebrated International Women\'s Day by organizing empowering sessions and activities recognizing the achievements of women and promoting gender equality.',
  images: [
    { url: "/womday1.jpg", alt: "Women's Day" },
    { url: "/womday2.jpg", alt: "Women's Day" },
    { url: "/womday3.jpg", alt: "Women's Day" },
  ],
  year: 2023
},
{
  id: '14',
  title: 'Village Camp',
  description: 'NSS volunteers spent a few days in a nearby village, running service drives, awareness sessions and informal classes while bonding with the local community.',
  images: [
    { url: '/vcamp1.jpg', alt: 'Village Camp' },
    { url: '/vcamp2.jpg', alt: 'Village Camp' },
    { url: '/vcamp3.jpg', alt: 'Village Camp' }
  ],
  year: 2023
},

{
  id: '15',
  title: 'YUVA',
  description: 'At the national-level inter-college youth contest YUVA, students burst with energy in leadership and service-oriented events, showcasing leadership spirit.',
  images: [
    { url: '/yuva1.jpg', alt: 'YUVA' },
    { url: '/yuva2.jpg', alt: 'YUVA' },
    { url: '/yuva3.jpg', alt: 'YUVA' }
  ],
  year: 2023
},

{
  id: '16',
  title: "Teacher's Day",
  description: 'On Teacher\’s Day the NSS team honoured faculty with heartfelt speeches, handmade cards and a small felicitation ceremony.',
  images: [
    { url: '/tchr1.jpg', alt: "Teacher's Day" },
    { url: '/tchr2.jpg', alt: "Teacher's Day" }
  ],
  year: 2023
}
];



export default function Events() {
  return (
    <main>
      {eventsData.map((event, idx) => (
        <EventSection key={event.id} event={event} isReversed={idx % 2 !== 0} />
      ))}
    </main>
  );
}

function EventSection({ event, isReversed }) {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.3 });

  return (
    <section
      id={event.id} // Added ID for deep linking
      ref={ref}
      className={`flex items-center justify-center w-full py-16 px-4`}
    >
      <div className={`container mx-auto event-card-section animate-on-scroll ${isVisible ? 'is-visible' : ''}`}>
        <div className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 ${isReversed ? 'md:flex-row-reverse' : ''}`}>
          <div className={`w-full md:w-1/2`}>
            <div className="image-reveal">
              <EventCard images={event.images} />
            </div>
          </div>
          <div className={`w-full md:w-1/2 text-center md:text-left`}>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4" style={{ color: 'var(--glow-color)' }}>{event.title}</h2>
            <p className="text-base lg:text-lg text-gray-300">{event.description}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

