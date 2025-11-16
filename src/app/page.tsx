import Navigation from "@/components/sections/navigation";
import HeroSection from "@/components/sections/hero-section";
import Advantages from "@/components/sections/advantages";
import Footer from "@/components/sections/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#1a1a1a]">
      <Navigation />
      <HeroSection />
      <Advantages />
      <Footer />
    </main>
  );
}