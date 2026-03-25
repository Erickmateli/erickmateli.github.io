import { Code, Layers, Zap } from "lucide-react";

const items = [
  {
    icon: Layers,
    title: "Embeddables Architecture",
    description:
      "Designing modular, embeddable components that partners can integrate into their own platforms — reducing integration time and maintaining brand consistency.",
    pattern: (
      <svg width="100%" height="100%" className="absolute inset-0 opacity-[0.03] pointer-events-none" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice">
        {Array.from({ length: 5 }).map((_, i) => (
          <rect key={i} x={i * 40} y={i * 40} width={200 - i * 40} height={200 - i * 40} fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" />
        ))}
      </svg>
    ),
  },
  {
    icon: Code,
    title: "Reusable Component Systems",
    description:
      "Building design systems grounded in engineering reality — components that are both beautiful and technically efficient, reducing frontend complexity.",
    pattern: (
      <svg width="100%" height="100%" className="absolute inset-0 opacity-[0.03] pointer-events-none" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice">
        {Array.from({ length: 36 }).map((_, i) => (
          <circle key={i} cx={(i % 6) * 36 + 18} cy={Math.floor(i / 6) * 36 + 18} r="8" fill="none" stroke="hsl(var(--foreground))" strokeWidth="0.5" />
        ))}
      </svg>
    ),
  },
  {
    icon: Zap,
    title: "API-Aware Design",
    description:
      "Designing interfaces that respect API constraints and data structures, minimizing back-and-forth between design and engineering teams.",
    pattern: (
      <svg width="100%" height="100%" className="absolute inset-0 opacity-[0.03] pointer-events-none" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice">
        {Array.from({ length: 8 }).map((_, i) => (
          <line key={i} x1="0" y1={i * 28} x2="200" y2={i * 28 + 60} stroke="hsl(var(--primary))" strokeWidth="0.5" />
        ))}
      </svg>
    ),
  },
];

const SystemsSection = () => {
  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 bg-card relative overflow-hidden">
      {/* Large background geometric accent */}
      <div className="absolute -right-40 top-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none hidden lg:block">
        <svg width="500" height="500" viewBox="0 0 500 500" fill="none">
          <polygon points="250,0 500,250 250,500 0,250" stroke="hsl(var(--foreground))" strokeWidth="1" fill="none" />
          <polygon points="250,50 450,250 250,450 50,250" stroke="hsl(var(--foreground))" strokeWidth="0.5" fill="none" />
          <polygon points="250,100 400,250 250,400 100,250" stroke="hsl(var(--foreground))" strokeWidth="0.5" fill="none" />
        </svg>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <p className="text-sm font-sans font-medium tracking-[0.2em] uppercase text-primary mb-4">
          Systems & Engineering Thinking
        </p>
        <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-6">
          Where Design Meets <span className="italic text-primary">Engineering</span>
        </h2>
        <p className="text-muted-foreground font-sans max-w-2xl mb-16 leading-relaxed">
          My frontend engineering background isn't just context — it's a tool. I
          use it to design feasible systems, reduce engineering complexity, and
          improve delivery speed.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {items.map((item) => (
            <div
              key={item.title}
              className="relative space-y-4 p-6 rounded-lg border border-border bg-background overflow-hidden"
            >
              {item.pattern}
              <item.icon className="w-6 h-6 text-primary relative z-10" />
              <h3 className="text-lg font-serif text-foreground relative z-10">{item.title}</h3>
              <p className="text-sm text-muted-foreground font-sans leading-relaxed relative z-10">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SystemsSection;
