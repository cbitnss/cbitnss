import Image from 'next/image'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

export function EventCard({ title, description, images }) {
  return (
    <div className="bg-transparent rounded-3xl overflow-hidden max-w-7xl mx-auto mb-16">
      <div className="flex flex-col-reverse lg:flex-row">
        <div className="p-6 lg:w-2/5 flex items-center flex-col justify-center space-y-4">
          <Image className='hidden lg:block' src="/logo.svg" height={150} width={150} alt="NSS Logo" />
          <h2 className="text-2xl lg:text-3xl text-center font-extrabold">{title}</h2>
          <p className="text-gray-600 text-sm lg:text-base text-center">{description}</p>
        </div>
        <div className="lg:w-3/5 relative m-2 lg:m-10">
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

