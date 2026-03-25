const AboutSection = () => {
  return (
    <section id="about" className="py-24 px-6 md:px-12 lg:px-24 max-w-5xl mx-auto relative">
      {/* Decorative corner bracket */}
      <div className="absolute top-16 right-6 md:right-12 lg:right-24 opacity-[0.08] pointer-events-none hidden md:block">
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
          <path d="M0 0 H80 V20 H20 V80 H0 Z" fill="hsl(var(--primary))" />
        </svg>
      </div>

      <div className="grid md:grid-cols-[1fr_2fr] gap-12 md:gap-16">
        <div>
          <p className="text-sm font-sans font-medium tracking-[0.2em] uppercase text-primary mb-4">
            About Me
          </p>
          <h2 className="text-3xl md:text-4xl font-serif text-foreground">
            From Code to
            <br />
            <span className="italic text-primary">Product Strategy</span>
          </h2>

          {/* Small abstract visual */}
          <div className="mt-8 hidden md:block">
            <svg width="120" height="60" viewBox="0 0 120 60" fill="none" className="opacity-20">
              <rect x="0" y="0" width="24" height="24" fill="hsl(var(--primary))" />
              <rect x="32" y="0" width="24" height="24" stroke="hsl(var(--primary))" strokeWidth="1" fill="none" />
              <rect x="64" y="0" width="24" height="24" fill="hsl(var(--primary))" opacity="0.3" />
              <rect x="0" y="32" width="24" height="24" stroke="hsl(var(--primary))" strokeWidth="1" fill="none" />
              <rect x="32" y="32" width="24" height="24" fill="hsl(var(--primary))" opacity="0.5" />
              <rect x="64" y="32" width="24" height="24" stroke="hsl(var(--primary))" strokeWidth="1" fill="none" />
            </svg>
          </div>
        </div>
        <div className="space-y-6 text-muted-foreground font-sans leading-relaxed">
          <p>
            My career has been a deliberate evolution — from frontend developer to UX
            designer, then product designer, and now a platform thinker. Each phase
            built on the last, giving me a rare ability to bridge engineering
            constraints with user needs and business strategy.
          </p>
          <p>
            I've spent years working across multiple African markets, navigating the
            complexity of partner integrations in fintech and insurtech. This
            experience taught me that great product design isn't just about
            interfaces — it's about understanding systems, stakeholders, and the
            real-world friction that users face.
          </p>
          <p>
            Today, I focus on designing scalable platforms that serve partners and
            end-users alike, always grounding my work in data, feasibility, and
            measurable impact.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
