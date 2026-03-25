import { Code, Layers, Zap } from "lucide-react";

const items = [
  {
    icon: Layers,
    title: "Embeddables Architecture",
    description:
      "Designing modular, embeddable components that partners can integrate into their own platforms — reducing integration time and maintaining brand consistency.",
  },
  {
    icon: Code,
    title: "Reusable Component Systems",
    description:
      "Building design systems grounded in engineering reality — components that are both beautiful and technically efficient, reducing frontend complexity.",
  },
  {
    icon: Zap,
    title: "API-Aware Design",
    description:
      "Designing interfaces that respect API constraints and data structures, minimizing back-and-forth between design and engineering teams.",
  },
];

const SystemsSection = () => {
  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 bg-card">
      <div className="max-w-5xl mx-auto">
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
              className="space-y-4 p-6 rounded-lg border border-border bg-background"
            >
              <item.icon className="w-6 h-6 text-primary" />
              <h3 className="text-lg font-serif text-foreground">{item.title}</h3>
              <p className="text-sm text-muted-foreground font-sans leading-relaxed">
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
