const steps = [
  {
    label: "Frontend Developer",
    description: "Built interfaces, learned the language of engineering constraints.",
  },
  {
    label: "UX Designer",
    description: "Shifted focus to user needs, research, and information architecture.",
  },
  {
    label: "Product Designer",
    description: "Connected business goals, user experience, and technical feasibility.",
  },
  {
    label: "Platform Thinker",
    description: "Designing scalable systems for partners, integrations, and growth.",
  },
];

const EvolutionSection = () => {
  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 max-w-5xl mx-auto">
      <p className="text-sm font-sans font-medium tracking-[0.2em] uppercase text-primary mb-4">
        Evolution
      </p>
      <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-16">
        Growth <span className="italic text-primary">Timeline</span>
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
              <div className="w-4 h-4 rounded-full bg-primary shrink-0 mt-1 z-10 md:absolute md:left-1/2 md:-translate-x-1/2" />
              <div
                className={`md:w-1/2 ${
                  i % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"
                }`}
              >
                <h3 className="text-xl font-serif text-foreground">{step.label}</h3>
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
