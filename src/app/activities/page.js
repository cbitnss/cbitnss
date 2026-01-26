import RecentEventsSection from "@/components/RecentEventsSection";

export const metadata = {
  title: "Latest Activities - CBIT NSS",
  description: "Explore our recent activities and events",
};

export default function ActivitiesPage() {
  return (
    <main className="bg-black text-white min-h-screen">
      <section className="py-12 md:py-20">
        <RecentEventsSection />
      </section>
    </main>
  );
}
