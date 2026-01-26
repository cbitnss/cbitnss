import EventsTimeline from "@/components/EventsTimeline";

export const metadata = {
  title: "All Events - CBIT NSS",
  description: "Explore all events organized by CBIT NSS",
};

export default function EventsPage() {
  return (
    <main className="bg-black text-white min-h-screen">
      <section className="py-12 md:py-20">
        <EventsTimeline />
      </section>
    </main>
  );
}