'use client'

import Image from 'next/image'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

export function ResponsiveCard({ title, description, images }) {
  return (
    <div className="bg-white rounded-3xl shadow-lg overflow-hidden max-w-6xl mx-auto">
      <div className="flex flex-col-reverse lg:flex-row-reverse">
        <div className="p-6 lg:w-3/5 flex flex-col justify-center space-y-4">
          <h2 className="text-2xl lg:text-3xl font-bold">{title}</h2>
          <p className="text-gray-600 text-sm lg:text-base">{description}</p>
        </div>
        <div className="lg:w-2/5 relative">
          <Carousel className="w-full">
            <CarouselContent>
              {images.map((image, index) => (
                <CarouselItem key={index}>
                  <Image
                    src={image.url}
                    alt={image.alt}
                    width={1200}
                    height={800}
                    className="w-full h-80 lg:h-[500px] object-cover rounded-3xl"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-4 top-1/2 transform -translate-y-1/2" />
            <CarouselNext className="absolute right-4 top-1/2 transform -translate-y-1/2" />
          </Carousel>
        </div>
      </div>
    </div>
  )
}

