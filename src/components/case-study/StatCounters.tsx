import { useCounter } from "./motion";

export interface Stat {
  target: number;
  label: string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  /** Small context line under the number, e.g. "from 472K". */
  note?: string;
}

const StatCounter = ({ target, label, prefix = "", suffix = "", decimals = 0, note }: Stat) => {
  const { ref, display } = useCounter(target, decimals);
  return (
    <div className="p-5 md:p-6 rounded-lg border border-border bg-card hover:border-primary/40 transition-colors">
      <p className="text-3xl md:text-4xl font-serif text-primary leading-none mb-2">
        {prefix}
        <span ref={ref}>{display}</span>
        {suffix}
      </p>
      <p className="text-sm font-sans font-medium text-foreground">{label}</p>
      {note && <p className="text-xs font-sans text-muted-foreground mt-1">{note}</p>}
    </div>
  );
};

const StatCounters = ({ stats }: { stats: Stat[] }) => (
  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
    {stats.map((s) => (
      <StatCounter key={s.label} {...s} />
    ))}
  </div>
);

export default StatCounters;
