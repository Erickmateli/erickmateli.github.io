interface CaseStudySummaryProps {
  tldr: string;
  /** e.g. "3 min read" */
  readingTime?: string;
  facts: { label: string; value: string }[];
}

const CaseStudySummary = ({ tldr, readingTime, facts }: CaseStudySummaryProps) => {
  return (
    <section aria-label="Case study summary" className="px-6 md:px-12 lg:px-24 max-w-5xl mx-auto pb-16 md:pb-20">
      <div className="rounded-lg border border-border bg-card p-6 md:p-8">
        <div className="flex items-center justify-between gap-4 mb-3">
          <p className="text-xs font-sans font-medium tracking-[0.15em] uppercase text-primary">TL;DR</p>
          {readingTime && (
            <span className="text-xs font-sans text-muted-foreground border border-border rounded-full px-2.5 py-0.5">
              {readingTime}
            </span>
          )}
        </div>
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
