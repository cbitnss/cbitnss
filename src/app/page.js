import Image from "next/image";
// import App from "@/components/Navbar"; // removed
import HeroSection from "@/components/HeroSection";
import FeaturingSection from "@/components/FeaturingSection";
import { ExecutiveBoard } from "@/components/ExecutiveBoard";
import DomeGallery from "@/components/ui/DomeGallery";
import RecentEventsSection from '@/components/RecentEventsSection';

export default function Home() {
  return (
    <main className="bg-black text-white">
      {/* Navbar is provided by layout */}
      <section className="scroll-section">
        <HeroSection />
      </section>

      {/* Dome gallery — make it a normal section in the flow so it can't overlap neighbors */}
      <section className="page-section relative z-0 min-h-screen">
        <DomeGallery />
      </section>

      {/* Recent events — ensure it has its own section and some safe padding so headings/buttons are never cut off */}
      <section className="page-section relative z-0 min-h-screen py-8">
        <RecentEventsSection />
      </section>

      {/* <section className="scroll-section flex items-center justify-center p-8 md:p-16">
        <FeaturingSection />
      </section> */}
      <section id="eb" className="scroll-section flex flex-col justify-center overflow-hidden py-16">
        <ExecutiveBoard />
      </section>
    </main>
  );
}