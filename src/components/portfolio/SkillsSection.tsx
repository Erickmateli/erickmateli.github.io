const skillGroups = [
  {
    category: "Product Design",
    skills: ["User flows & journey mapping", "Systems thinking", "Usability & accessibility", "Interaction design"],
  },
  {
    category: "UX Research & Validation",
    skills: ["Stakeholder interviews", "Usability testing", "Data-informed design", "Partner feedback loops"],
  },
  {
    category: "Frontend Engineering",
    skills: ["React & Next.js", "TypeScript", "Component architecture", "Performance optimization"],
  },
  {
    category: "Design Systems",
    skills: ["Token-based systems", "Component libraries", "Documentation", "Cross-team adoption"],
  },
  {
    category: "Platform Strategy",
    skills: ["Embeddable architectures", "Partner integrations", "API-first design", "Multi-market scaling"],
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
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillGroups.map((group) => (
            <div key={group.category}>
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
