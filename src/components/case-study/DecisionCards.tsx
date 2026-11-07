import Reveal from "./Reveal";

export interface Decision {
  title: string;
  problem: string;
  decision: string;
  result: string;
}

const rows = [
  { key: "problem", label: "Problem", tone: "text-destructive" },
  { key: "decision", label: "Decision", tone: "text-primary" },
  { key: "result", label: "Result", tone: "text-foreground" },
] as const;

const DecisionCards = ({ decisions }: { decisions: Decision[] }) => (
  <div className="grid md:grid-cols-3 gap-4">
    {decisions.map((d, i) => (
      <Reveal key={d.title} delay={i * 90}>
        <article className="h-full rounded-lg border border-border bg-card p-5 md:p-6 hover:border-primary/40 transition-colors">
          <p className="text-xs font-sans text-muted-foreground mb-1">Decision {String(i + 1).padStart(2, "0")}</p>
          <h3 className="text-lg font-serif text-foreground leading-snug mb-4">{d.title}</h3>
          <dl className="space-y-3">
            {rows.map((r) => (
              <div key={r.key}>
                <dt className={`text-xs font-sans font-medium tracking-[0.12em] uppercase ${r.tone}`}>{r.label}</dt>
                <dd className="text-sm font-sans text-muted-foreground leading-relaxed">{d[r.key]}</dd>
              </div>
            ))}
          </dl>
        </article>
      </Reveal>
    ))}
  </div>
);

export default DecisionCards;
