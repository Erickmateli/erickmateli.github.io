import { ArrowDown } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="min-h-[90vh] flex flex-col justify-center px-6 md:px-12 lg:px-24 max-w-5xl mx-auto">
      <div className="space-y-8 animate-fade-up">
        <p className="text-sm font-sans font-medium tracking-[0.2em] uppercase text-primary">
          Portfolio
        </p>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif leading-[1.1] text-foreground">
          Product Designer with
          <br />
          <span className="text-primary italic">Frontend Engineering</span>
          <br />
          Background
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed font-sans font-light">
          Designing scalable partner-driven platforms. I combine product design,
          UX, and frontend engineering to improve delivery speed, reduce
          complexity, and scale platforms across emerging markets.
        </p>
        <div className="pt-8">
          <a
            href="#about"
            className="inline-flex items-center gap-2 text-sm font-sans font-medium text-primary hover:text-foreground transition-colors"
          >
            Scroll to explore
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
