interface CaseStudySummaryProps {
  tldr: string;
  facts: { label: string; value: string }[];
}

const CaseStudySummary = ({ tldr, facts }: CaseStudySummaryProps) => {
  return (
    <section aria-label="Case study summary" className="px-6 md:px-12 lg:px-24 max-w-5xl mx-auto pb-16 md:pb-20">
      <div className="rounded-lg border border-border bg-card p-6 md:p-8">
        <p className="text-xs font-sans font-medium tracking-[0.15em] uppercase text-primary mb-3">TL;DR</p>
        <p className="text-base md:text-lg font-sans text-foreground leading-relaxed max-w-3xl">{tldr}</p>

        <dl className="grid grid-cols-2 md:grid-cols-5 gap-x-6 gap-y-5 mt-8 pt-6 border-t border-border">
          {facts.map((fact) => (
            <div key={fact.label}>
              <dt className="text-xs font-sans font-medium tracking-[0.15em] uppercase text-muted-foreground mb-1">
                {fact.label}
              </dt>
              <dd className="text-sm font-sans text-foreground leading-snug">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};

export default CaseStudySummary;
