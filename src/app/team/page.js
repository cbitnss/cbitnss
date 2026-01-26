import { ExecutiveBoard } from "@/components/ExecutiveBoard";

export const metadata = {
  title: "Core Committee - CBIT NSS",
  description: "Meet the core committee members and leaders of CBIT NSS",
};

export default function TeamPage() {
  return (
    <main className="bg-black text-white min-h-screen">
      <section className="py-12 md:py-20">
        <ExecutiveBoard />
      </section>
    </main>
  );
}