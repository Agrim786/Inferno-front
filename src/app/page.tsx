import Navigation from "@/components/sections/navigation";
import HeroSection from "@/components/sections/hero-section";
import CompanyLogos from "@/components/sections/company-logos";
import Advantages from "@/components/sections/advantages";
// import Features from "@/components/sections/features";
// import IntegrationsSection from "@/components/sections/integrations-section";
// import LanguagesSection from "@/components/sections/languages-section";
// import ProductsSection from "@/components/sections/products-section";
// import TestimonialsSection from "@/components/sections/testimonials-section";
// import ResearchSection from "@/components/sections/research-section";
// import SecuritySection from "@/components/sections/security-section";
// import MissionSection from "@/components/sections/mission-section";
import Footer from "@/components/sections/footer";
// import CookieBanner from "@/components/sections/cookie-banner";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#1a1a1a]">
      <Navigation />
      <HeroSection />
      {/* <CompanyLogos /> */}
      <Advantages />
      {/* <Features />
      <IntegrationsSection />
      <LanguagesSection />
      <ProductsSection />
      <TestimonialsSection />
      <ResearchSection />
      <SecuritySection />
      <MissionSection /> */}
      <Footer />
      {/* <CookieBanner /> */}
    </main>
  );
}