import React from "react"
import Image from "next/image"

const executives = [
  {
    name: "Akhilesh Reddy",
    title: "President",
    imageUrl: "/akhilesh.png?height=200&width=150",
  },
  {
    name: "Akhilesh Reddy",
    title: "President",
    imageUrl: "/placeholder.svg?height=400&width=300",
  },
  // Add more...
]

export default function ExecutivePage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center mb-12">
        Executive Board 2024-2025
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {executives.map((executive, index) => (
          <div
            key={index}
            className="group relative aspect-square overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            <Image
              src={executive.imageUrl}
              alt={executive.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#2e3191] to-transparent p-4 text-white">
              <h3 className="text-xl font-semibold">{executive.title}</h3>
              <p className="text-lg">{executive.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}