import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const skillGroups = [
  {
    category: "Product & UX Design",
    skills: ["Design thinking & UX strategy", "Information architecture & journey mapping", "Prototyping & usability testing"],
    proof: { label: "See Yellow Pages Kenya", to: "/case-study/yellow-pages" },
  },
  {
    category: "Design Systems",
    skills: ["Token-based component libraries", "50+ standardised components", "Per-partner theming without forks"],
    proof: { label: "See ASPIN", to: "/case-study/aspin" },
  },
  {
    category: "Frontend Engineering",
    skills: ["React, Next.js & TypeScript", "Component architecture", "Taking designs to production"],
    proof: { label: "See ASPIN", to: "/case-study/aspin" },
  },
  {
    category: "Systems Thinking",
    skills: ["Multi-partner, multi-market platforms", "Regulatory & trust design", "Research synthesis"],
    proof: { label: "See ASPIN Marketplace", to: "/case-study/aspin-marketplace" },
  },
];

const SkillsSection = () => {
  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 bg-card relative overflow-hidden">
      {/* Decorative triangle grid */}
      <div className="absolute -bottom-10 -right-10 opacity-[0.03] pointer-events-none hidden md:block">
        <svg width="300" height="300" viewBox="0 0 300 300" fill="none">
          {Array.from({ length: 6 }).map((_, row) =>
            Array.from({ length: 6 }).map((_, col) => (
              <polygon
                key={`${row}-${col}`}
                points={`${col * 50 + 25},${row * 50} ${col * 50 + 50},${row * 50 + 50} ${col * 50},${row * 50 + 50}`}
                fill="none"
                stroke="hsl(var(--foreground))"
                strokeWidth="0.5"
              />
            ))
          )}
        </svg>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <p className="text-sm font-sans font-medium tracking-[0.2em] uppercase text-primary mb-4">
          Capabilities
        </p>
        <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-16">
          Skills & Expertise
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillGroups.map((group) => (
            <div key={group.category} className="flex flex-col">
              <h3 className="text-base font-serif text-foreground mb-3">{group.category}</h3>
              <ul className="space-y-2">
                {group.skills.map((skill) => (
                  <li
                    key={skill}
                    className="text-sm text-muted-foreground font-sans flex items-center gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-primary shrink-0" />
                    {skill}
                  </li>
                ))}
              </ul>
              <Link
                to={group.proof.to}
                className="inline-flex items-center gap-1.5 mt-auto pt-4 text-sm font-sans font-medium text-primary hover:text-foreground transition-colors"
              >
                {group.proof.label}
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
