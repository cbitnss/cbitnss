"use client";
import React, { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import Image from "next/image";

const showcaseItems = [
  {
    id: 1,
    title: "Akhilesh Reddy",
    image: "/akhilesh.png?height=800&width=600",
    logo: "President"
  },
  {
    id: 2,
    title: "Udhit Pujiala",
    image: "/akhilesh.png?height=800&width=600",
    logo: "General Secretary"
  },
  {
    id: 3,
    title: "Ramireddy Golla",
    image: "/akhilesh.png?height=800&width=600",
    logo: "Head of External Affairs"
  },
  {
    id: 4,
    title: "Akhilesh Reddy",
    image: "/akhilesh.png?height=800&width=600",
    logo: "President"
  },
];

export function ExecutiveBoard() {
  const [translateX, setTranslateX] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scroll = () => {
      if (isPaused) return;
      
      setTranslateX((prev) => {
        const newTranslate = prev - 1; // Adjust speed by changing this value
        const containerWidth = container.scrollWidth / 2;
        return newTranslate <= -containerWidth ? 0 : newTranslate;
      });
    };

    const intervalId = setInterval(scroll, 30); // Adjust interval for smoother/faster scrolling

    return () => clearInterval(intervalId);
  }, [isPaused]);

  // Double the items to create seamless infinite scroll
  const allItems = [...showcaseItems, ...showcaseItems];

  return (
    <div>
    <div className="flex justify-center text-center w-full text-xl lg:text-3xl font-bold"> Executive Board 2024-2025</div>
    <div className="w-full overflow-hidden bg-white text-white lg:mt-10">
      <div className="relative py-8">
        <div
          ref={containerRef}
          className="flex"
          style={{
            transform: `translateX(${translateX}px)`,
            transition: translateX === 0 ? 'none' : 'transform 0.1s linear',
          }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {allItems.map((item, index) => (
            <Card
              key={`${item.id}-${index}`}
              className="flex-none mx-4 bg-transparent border-none relative overflow-hidden"
              style={{ width: 'min(400px, 60vw)' }}
            >
              <div className="relative aspect-[3/4]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover rounded-2xl"
                  priority={index < 4}
                />
                <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/60 via-black/40 to-transparent">
                  <div className="flex flex-col gap-2">
                    <span className="text-sm font-medium text-white">{item.logo}</span>
                    <h2 className="text-2xl font-semibold text-white">{item.title}</h2>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
}

