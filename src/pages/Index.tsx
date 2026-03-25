import Navbar from "@/components/portfolio/Navbar";
import HeroSection from "@/components/portfolio/HeroSection";
import AboutSection from "@/components/portfolio/AboutSection";
import CaseStudiesSection from "@/components/portfolio/CaseStudiesSection";
import SystemsSection from "@/components/portfolio/SystemsSection";
import EvolutionSection from "@/components/portfolio/EvolutionSection";
import SkillsSection from "@/components/portfolio/SkillsSection";
import ClosingSection from "@/components/portfolio/ClosingSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-14">
        <HeroSection />
        <AboutSection />
        <CaseStudiesSection />
        <SystemsSection />
        <EvolutionSection />
        <SkillsSection />
        <ClosingSection />
      </main>
      <footer className="py-8 px-6 text-center text-xs text-muted-foreground font-sans border-t border-border">
        © {new Date().getFullYear()} — Designed & built with intention.
      </footer>
    </div>
  );
};

export default Index;
