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
      <div style={{ width: '100vw', height: '100vh' }}>
      <DomeGallery />
      
      </div>
      <section>
      <RecentEventsSection /></section>

      {/* <section className="scroll-section flex items-center justify-center p-8 md:p-16">
        <FeaturingSection />
      </section> */}
      <section id="eb" className="scroll-section flex flex-col justify-center overflow-hidden py-16">
        <ExecutiveBoard />
      </section>
    </main>
  );
}