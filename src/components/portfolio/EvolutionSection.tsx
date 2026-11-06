const steps = [
  {
    years: "2017 – 2018",
    label: "Web Designer & Developer",
    company: "Africa 118",
    description: "Designed and built e-commerce sites and web platforms for SMEs — learning to ship real products.",
  },
  {
    years: "2018 – 2019",
    label: "Frontend Developer",
    company: "Isobar (Dentsu Aegis Network)",
    description: "Built responsive interfaces for multiple client brands, using analytics to guide UI improvements.",
  },
  {
    years: "2019 – 2022",
    label: "Lead UX Designer",
    company: "Yellow Pages Kenya",
    description: "Led the platform redesign — growing users from 472K to 1.7M and rolling out across six countries.",
  },
  {
    years: "2022 – Now",
    label: "Senior Product Designer",
    company: "Inclusivity Solutions",
    description: "UX strategy and frontend delivery for ASPIN — 5M customers across 11 countries and 10+ partner rollouts.",
  },
];

const EvolutionSection = () => {
  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 max-w-5xl mx-auto relative">
      {/* Decorative cross-hatch pattern */}
      <div className="absolute top-8 right-0 opacity-[0.04] pointer-events-none hidden md:block">
        <svg width="160" height="160" viewBox="0 0 160 160" fill="none">
          {Array.from({ length: 9 }).map((_, i) => (
            <line key={`h${i}`} x1="0" y1={i * 20} x2="160" y2={i * 20} stroke="hsl(var(--foreground))" strokeWidth="0.5" />
          ))}
          {Array.from({ length: 9 }).map((_, i) => (
            <line key={`v${i}`} x1={i * 20} y1="0" x2={i * 20} y2="160" stroke="hsl(var(--foreground))" strokeWidth="0.5" />
          ))}
        </svg>
      </div>

      <p className="text-sm font-sans font-medium tracking-[0.2em] uppercase text-primary mb-4">
        Career
      </p>
      <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-16">
        Where I've <span className="italic text-primary">worked</span>
      </h2>
      <div className="relative">
        <div className="absolute left-[7px] top-3 bottom-3 w-px bg-border md:left-1/2 md:-translate-x-px" />
        <div className="space-y-12">
          {steps.map((step, i) => (
            <div
              key={step.label}
              className={`relative flex items-start gap-6 md:gap-0 ${
                i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Enhanced timeline dot with ring */}
              <div className="relative shrink-0 mt-1 z-10 md:absolute md:left-1/2 md:-translate-x-1/2">
                <div className="w-4 h-4 rounded-full bg-primary" />
                <div className="absolute -inset-1.5 rounded-full border border-primary/20" />
              </div>
              <div
                className={`md:w-1/2 ${
                  i % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"
                }`}
              >
                <p className="text-xs font-sans font-medium tracking-[0.15em] uppercase text-primary">{step.years}</p>
                <h3 className="text-xl font-serif text-foreground mt-1">{step.label}</h3>
                <p className="text-sm font-sans font-medium text-foreground/80">{step.company}</p>
                <p className="text-sm text-muted-foreground font-sans mt-1 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EvolutionSection;
