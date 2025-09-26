"use client";
import React, { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import Image from "next/image";

const executives = [
  {
    name: "Nikhil",
    title: "President",
    imageUrl: "/akhilesh.png",
  },
  {
    name: "Surya",
    title: "Vice President",
    imageUrl: "/akhilesh.png",
  },
  {
    name: "Akhilesh Reddy",
    title: "General Secretary",
    imageUrl: "/akhilesh.png",
  },
  {
    name: "Person 4",
    title: "Treasurer",
    imageUrl: "/akhilesh.png",
  },
  {
    name: "Person 5",
    title: "Events Lead",
    imageUrl: "/akhilesh.png",
  },
  {
    name: "Person 6",
    title: "PR Lead",
    imageUrl: "/akhilesh.png",
  },
];

export function ExecutiveBoard() {
  return (
    <div className="w-full">
      <h2 className="text-3xl md:text-5xl font-bold text-center mb-12 md:mb-20 animate-on-scroll">
        Executive Board 2024-2025
      </h2>
      <div className="flex overflow-x-auto space-x-8 pb-8 px-8 md:px-16 scrollbar-hide">
        {executives.map((executive, index) => (
          <div
            key={index}
            className="group relative flex-shrink-0 w-64 h-80 md:w-80 md:h-96 overflow-hidden rounded-lg shadow-lg"
          >
            <Image
              src={executive.imageUrl}
              alt={executive.name}
              fill
              className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h3 className="text-xl font-bold flex items-center">
                {executive.name}
                <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:translate-x-1">
                  →
                </span>
              </h3>
              <p className="text-md opacity-80">{executive.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

