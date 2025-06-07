import Image from "next/image";
import App from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturingSection from "@/components/FeaturingSection";
import { ExecutiveBoard } from "@/components/ExecutiveBoard";
import { VolunteerNAPTable } from "@/components/NAPTable";
import AnimatedGridBackground from "@/components/HeroBackground";
import Footer from "@/components/Footer";
export default function Home() {
  return (
    <div>
      <App />
      <div className="lg:mt-16 hidden lg:block">
        <AnimatedGridBackground />
      </div>
      <div className="mt-14 lg:mt-0">
        <HeroSection />
      </div>
      <FeaturingSection />
      <section id="nap">
        <VolunteerNAPTable />
      </section>
      <section id="eb">
        <ExecutiveBoard />
      </section>
      <Footer />
    </div>
  );
}
