import { ArrowDown } from "lucide-react";
import { trackEvent } from "@/lib/track-event";

const HeroSection = () => {
  return (
    <section className="min-h-[90vh] flex flex-col justify-center px-6 md:px-12 lg:px-24 max-w-5xl mx-auto relative overflow-hidden">
      {/* Decorative grid dots */}
      <div className="absolute top-12 right-0 opacity-[0.08] pointer-events-none hidden md:block">
        <svg width="240" height="240" viewBox="0 0 240 240" fill="none">
          {Array.from({ length: 100 }).map((_, i) => (
            <circle
              key={i}
              cx={(i % 10) * 24 + 12}
              cy={Math.floor(i / 10) * 24 + 12}
              r="2"
              fill="hsl(var(--foreground))"
            />
          ))}
        </svg>
      </div>

      {/* Decorative diagonal line */}
      <div className="absolute -bottom-20 -left-20 opacity-[0.06] pointer-events-none hidden md:block">
        <svg width="400" height="400" viewBox="0 0 400 400" fill="none">
          <line x1="0" y1="400" x2="400" y2="0" stroke="hsl(var(--primary))" strokeWidth="1" />
          <line x1="40" y1="400" x2="400" y2="40" stroke="hsl(var(--primary))" strokeWidth="0.5" />
          <line x1="80" y1="400" x2="400" y2="80" stroke="hsl(var(--primary))" strokeWidth="0.5" />
        </svg>
      </div>

      {/* Abstract teal ring */}
      <div className="absolute top-1/4 -right-32 opacity-[0.05] pointer-events-none hidden lg:block">
        <svg width="320" height="320" viewBox="0 0 320 320" fill="none">
          <circle cx="160" cy="160" r="140" stroke="hsl(var(--primary))" strokeWidth="1" />
          <circle cx="160" cy="160" r="120" stroke="hsl(var(--primary))" strokeWidth="0.5" />
          <circle cx="160" cy="160" r="80" stroke="hsl(var(--primary))" strokeWidth="0.5" />
        </svg>
      </div>

      <div className="space-y-8 animate-fade-up relative z-10">
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
            onClick={() => trackEvent("scroll_to_explore_clicked")}
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
