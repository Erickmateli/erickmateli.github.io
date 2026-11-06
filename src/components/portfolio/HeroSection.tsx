import { ArrowDown } from "lucide-react";
import { trackEvent } from "@/lib/track-event";
import { RESUME_URL } from "@/lib/links";

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
          Erick Mateli<span className="hidden sm:inline"> · Senior Product Designer</span>
        </p>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif leading-[1.1] text-foreground">
          Product Designer with
          <br />
          <span className="text-primary italic">Frontend Engineering</span>
          <br />
          Background
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed font-sans font-light">
          I design complex, multi-partner platforms — from fintech and insurance to
          search — combining product design, UX, and frontend engineering to reduce
          complexity and ship faster.
        </p>
        <dl className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl pt-2">
          {[
            { value: "7+", label: "Years in product design" },
            { value: "5M+", label: "End users reached" },
            { value: "11", label: "Countries" },
            { value: "10+", label: "Partners launched" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col-reverse border-l-2 border-primary/30 pl-4">
              <dt className="text-xs font-sans text-muted-foreground uppercase tracking-wider mt-1">
                {stat.label}
              </dt>
              <dd className="text-2xl md:text-3xl font-serif text-foreground">{stat.value}</dd>
            </div>
          ))}
        </dl>
        <div className="pt-8 flex flex-wrap items-center gap-6">
          <a
            href="#work"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground text-sm font-sans font-medium hover:opacity-90 transition-opacity"
            onClick={() => trackEvent("view_work_clicked")}
          >
            View work
            <ArrowDown className="w-4 h-4" aria-hidden="true" />
          </a>
          {RESUME_URL && (
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-sans font-medium text-primary hover:text-foreground transition-colors"
              onClick={() => trackEvent("resume_clicked", { from: "hero" })}
            >
              Resume →
            </a>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
