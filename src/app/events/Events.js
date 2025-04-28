import { EventCard } from '@/components/EventCard'

const eventsData = [
  {
    id: '1',
    title: 'Tech Innovation Summit 2024',
    description: 'Exploring cutting-edge technologies shaping our future.',
    images: [
      { url: "/image.png?height=800&width=1200&text=Tech+Summit+2024+Photo+1", alt: "Keynote speaker presenting latest tech trends" },
      { url: "/placeholder.svg?height=800&width=1200&text=Tech+Summit+2024+Photo+2", alt: "Attendees engaging with VR demonstrations" },
      { url: "/placeholder.svg?height=800&width=1200&text=Tech+Summit+2024+Photo+3", alt: "Panel discussion on AI ethics" },
    ],
    year: 2024
  },
  {
    id: '2',
    title: 'Green Energy Expo 2024',
    description: 'Showcasing sustainable energy solutions for a greener tomorrow.',
    images: [
      { url: "/placeholder.svg?height=800&width=1200&text=Green+Energy+Expo+2024+Photo+1", alt: "Solar panel installation demonstration" },
      { url: "/placeholder.svg?height=800&width=1200&text=Green+Energy+Expo+2024+Photo+2", alt: "Electric vehicle showcase" },
      { url: "/placeholder.svg?height=800&width=1200&text=Green+Energy+Expo+2024+Photo+3", alt: "Wind turbine technology presentation" },
    ],
    year: 2024
  },
  {
    id: '3',
    title: 'Annual Charity Gala 2023',
    description: 'Our flagship event raising funds for local charities.',
    images: [
      { url: "/placeholder.svg?height=800&width=1200&text=Gala+2023+Photo+1", alt: "Gala attendees enjoying the evening" },
      { url: "/placeholder.svg?height=800&width=1200&text=Gala+2023+Photo+2", alt: "Silent auction items on display" },
      { url: "/placeholder.svg?height=800&width=1200&text=Gala+2023+Photo+3", alt: "Keynote speaker addressing the audience" },
    ],
    year: 2023
  },
  {
    id: '4',
    title: 'Summer Volunteer Drive 2023',
    description: 'A month-long initiative to boost community engagement.',
    images: [
      { url: "/placeholder.svg?height=800&width=1200&text=Volunteer+Drive+2023+Photo+1", alt: "Volunteers cleaning up a local park" },
      { url: "/placeholder.svg?height=800&width=1200&text=Volunteer+Drive+2023+Photo+2", alt: "Group photo of volunteers" },
      { url: "/placeholder.svg?height=800&width=1200&text=Volunteer+Drive+2023+Photo+3", alt: "Volunteers painting a community center" },
    ],
    year: 2023
  }
];

export default function Events() {
  const groupedEvents = eventsData.reduce((acc, event) => {
    if (!acc[event.year]) {
      acc[event.year] = [];
    }
    acc[event.year].push(event);
    return acc;
  }, {});

  const sortedYears = Object.keys(groupedEvents).sort((a, b) => b - a);

  return (
    <main className="container mx-auto px-4 py-8">
      {sortedYears.map(year => (
        <div key={year} className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">{year} Events</h2>
          {groupedEvents[year].map(event => (
            <EventCard
              key={event.id}
              title={event.title}
              description={event.description}
              images={event.images}
            />
          ))}
        </div>
      ))}
    </main>
  )
}

