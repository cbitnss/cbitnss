import Image from "next/image";
import App from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturingSection from "@/components/FeaturingSection";
import { ExecutiveBoard } from "@/components/ExecutiveBoard";

export default function Home() {
  return (
    <main className="bg-black text-white">
      <App />
      <section className="scroll-section">
        <HeroSection />
      </section>
      <section className="scroll-section flex items-center justify-center p-8 md:p-16">
        <FeaturingSection />
      </section>
      <section id="eb" className="scroll-section flex flex-col justify-center overflow-hidden py-16">
        <ExecutiveBoard />
      </section>
    </main>
  );
}