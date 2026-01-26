import { TopVolunteers } from "@/components/TopVolunteers";

export const metadata = {
  title: "Top Volunteers - CBIT NSS",
  description: "Meet our top volunteers and their achievements",
};

export default function VolunteersPage() {
  return (
    <main className="bg-black text-white min-h-screen">
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-black mb-12 text-center">
            Top Volunteers
          </h1>
        </div>
        <TopVolunteers />
      </section>
    </main>
  );
}
