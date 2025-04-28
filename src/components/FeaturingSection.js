'use client'

import { ArrowUpRight } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"

import { Card, CardContent } from "@/components/ui/card"

export default function FeaturingSection() {
  const stories = [
    {
      category: "Chinna Shapur",
      date: "AUG 10, 2022",
      title: "WHAT STREET FASHION WAS LIKE A DECADE AGO",
      author: "Anna Wojcik",
      image: "/villagecamp.png?height=400&width=600",
      href: "#"
    },
    {
      category: "FASHION",
      date: "AUG 11, 2022",
      title: "MEN, PROMISE, SKIRTS AREN'T THAT SCARY!",
      author: "Eleni Papadopoulos",
      image: "/villagecamp.png?height=400&width=600",
      href: "#"
    },
    {
      category: "FASHION",
      date: "AUG 11, 2022",
      title: "ALL THE COOL KIDS ARE WEARING BALACLAVAS",
      author: "Anna Wojcik",
      image: "/villagecamp.png?height=400&width=600",
      href: "#"
    },
  ]

  const featuredStory = {
    category: "FASHION",
    date: "AUG 09, 2022",
    title: "THE BEST COPENHAGEN STREET STYLE PHOTOS FROM THE FALL 2023 SEASON",
    author: "Nikola Kovac",
    image: "/villagecamp.png?height=800&width=600",
    href: "#"
  }

  return (
    <div className="w-full bg-background text-foreground p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-center mb-8">
          <h2 className="text-xl lg:text-4xl text-center font-bold">Recent Activities</h2>
          <Link 
            href="#" 
            className="flex items-center gap-2 text-sm hover:opacity-70 transition-opacity"
          >
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-6">

          <Link href={featuredStory.href} className="block group">
            <Card className="border-0 h-full transition-transform">
              <CardContent className="p-0 space-y-4">
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden m-2">
                  <Image
                    src={featuredStory.image}
                    alt={featuredStory.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="space-y-2 p-2">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>{featuredStory.category}</span>
                    <span>{featuredStory.date}</span>
                  </div>
                  <h3 className="text-2xl font-medium leading-tight">
                    {featuredStory.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Written by {featuredStory.author}
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>
          <div className="space-y-6">
            {stories.map((story, index) => (
              <Link key={index} href={story.href} className="block group">
                <Card className="border-0 hover:opacity-70 transition-opacity">
                  <CardContent className="p-0 grid md:grid-cols-2 gap-4">
                    <div className="relative aspect-[4/3] rounded-xl overflow-hidden m-2">
                      <Image
                        src={story.image}
                        alt={story.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="space-y-2 p-2">
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>{story.category}</span>
                        <span>{story.date}</span>
                      </div>
                      <h3 className="text-xl font-medium leading-tight">
                        {story.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Written by {story.author}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          
        </div>
      </div>
    </div>
  )
}

