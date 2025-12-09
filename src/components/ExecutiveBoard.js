"use client";
import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

const executives = [
  { name: "Voggu Nikhil", title: "President",id:"NV25001", imageUrl: "/arang1.jpg" },
  { name: "Surya Raghava", title: "Vice President",id:"NV25001", imageUrl: "/akhilesh.png" },
  { name: "Theetla Sunny", title: "General Secretary",id:"NV25001", imageUrl: "/Sunny.jpg" },
  { name: "Kulkarni Nehasri", title: "Joint Secretary - Documentation",id:"NV25001", imageUrl: "/img_neha.jpg" },
  { name: "Hrushikesh Reddy", title: "Joint Secretary - Logistics",id:"NV25001", imageUrl: "/akhilesh.png" },
  { name: "Krishna Sushant", title: "Treasurer",id:"NV25001", imageUrl: "/Sushant.jpg" },
  { name: "Rishitha Tatipelli", title: "Women's Administrator",id:"NV25001", imageUrl: "/akhilesh.png" },
  { name: "Swetha Voliga", title: "Road Safety Coordinator",id:"NV25001", imageUrl: "/Swetha.jpg" },
  { name: "vidhyullatha", title: "Head of EXT. Affairs",id:"NV25001", imageUrl: "/vidhyullatha.jpg" },
  { name: "Shashank T", title: "Events Head",id:"NV25001", imageUrl: "/akhilesh.png" },
  { name: "Tanmayi Nadipalli", title: "Technical Head",id:"NV25001", imageUrl: "/akhilesh.png" },
  { name: "Varshini Kasani", title: "Design Head",id:"NV25001", imageUrl: "/Varshini.jpg" },
  { name: "Pragna T", title: "Publicity & Media Head",id:"NV25001", imageUrl: "/akhilesh.png" }
];

export function ExecutiveBoard() {
  const [api, setApi] = useState();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Add a small delay before showing the content
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!api) return;

    setSelectedIndex(api.selectedScrollSnap());
    api.on("select", () => setSelectedIndex(api.selectedScrollSnap()));
  }, [api]);

  return (
    // raise z-index so grid overlay (fixed background) stays behind this section
    <div className="w-full py-16 relative overflow-hidden z-40">
      {/* Heading */}
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
          Our Core Committee
        </h2>
      </div>

      <Carousel
        opts={{
          align: "center",
          loop: true,
          duration: 25,
          skipSnaps: false,
        }}
        setApi={setApi}
        className={`w-full max-w-6xl mx-auto relative transition-opacity duration-1000 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <CarouselContent className="items-center -ml-4">
          {executives.map((executive, index) => {
            const total = executives.length;
            const prevIndex = (selectedIndex - 1 + total) % total;
            const nextIndex = (selectedIndex + 1) % total;

            let position = "hidden";
            if (index === selectedIndex) position = "center";
            else if (index === prevIndex) position = "left";
            else if (index === nextIndex) position = "right";

            return (
              <CarouselItem
                key={index}
                className="flex justify-center pl-4 basis-full md:basis-1/3"
              >
                <div
                  className={`relative rounded-3xl overflow-hidden transition-all duration-1000 [transition-timing-function:cubic-bezier(0.65,0,0.35,1)] shadow-[0_0_20px_rgba(255,255,255,0.15)]
                    ${
                      position === "center"
                        ? "w-72 h-96 md:w-96 md:h-[32rem] z-20 scale-100 opacity-100 border-2 border-white"
                        : position === "left" || position === "right"
                        ? "w-64 h-80 md:w-72 md:h-96 z-10 opacity-60 scale-90 -mx-10 md:mx-0 border border-gray-700"
                        : "w-64 h-80 md:w-72 md:h-96 opacity-0 scale-75 border border-gray-700"
                    }`}
                >
                  {/* Image */}
                  <Image
                    src={executive.imageUrl}
                    alt={executive.name}
                    fill
                    className="rounded-3xl object-cover transition-transform duration-700 [transition-timing-function:cubic-bezier(0.4,0,0.2,1)]"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent rounded-3xl"></div>

                  {/* Card Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 pb-10 text-center text-white transition-all duration-700 [transition-timing-function:cubic-bezier(0.4,0,0.2,1)]">
                    <h3 className={`font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent drop-shadow-md leading-normal ${
                      position === "center" ? "text-2xl md:text-3xl mb-2" : "text-lg md:text-xl mb-1"
                    }`}>
                      {executive.name}
                    </h3>
                    <p className={`text-gray-300 italic mb-2 leading-relaxed ${
                      position === "center" ? "text-base md:text-lg" : "text-sm md:text-base"
                    }`}>
                      {executive.title}
                    </p>
                    <p className={`text-gray-400 font-mono leading-relaxed ${
                      position === "center" ? "text-sm" : "text-xs"
                    }`}>
                      {executive.id}
                    </p>
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>

        {/* Navigation Buttons */}
        <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 bg-gray-800/70 border border-gray-600 text-white hover:bg-cyan-500 hover:border-cyan-400 transition-all duration-300 rounded-full shadow-lg z-30" />
        <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-800/70 border border-gray-600 text-white hover:bg-cyan-500 hover:border-cyan-400 transition-all duration-300 rounded-full shadow-lg z-30" />
      </Carousel>
    </div>
  );
}