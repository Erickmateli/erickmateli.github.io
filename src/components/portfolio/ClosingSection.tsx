const ClosingSection = () => {
  return (
    <section className="py-32 px-6 md:px-12 lg:px-24 max-w-5xl mx-auto text-center">
      <h2 className="text-3xl md:text-5xl font-serif text-foreground leading-tight mb-8">
        Designing for <span className="italic text-primary">scale</span>,<br />
        bridging product &amp; engineering,<br />
        building <span className="italic text-primary">reliable</span> experiences.
      </h2>
      <p className="text-muted-foreground font-sans max-w-xl mx-auto leading-relaxed mb-12">
        I thrive in complex systems — where partner needs, user expectations, and
        engineering reality intersect. If you're building something that needs
        strategic product thinking grounded in technical depth, let's talk.
      </p>
      <a
        href="mailto:hello@example.com"
        className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-primary text-primary-foreground font-sans text-sm font-medium hover:opacity-90 transition-opacity"
      >
        Get in Touch
      </a>
    </section>
  );
};

export default ClosingSection;
