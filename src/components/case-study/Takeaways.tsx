import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";

export interface Takeaway {
  title: string;
  text: string;
}

const TakeawayItem = ({ index, title, text, defaultOpen }: Takeaway & { index: number; defaultOpen: boolean }) => {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();
  return (
    <li
      className={`rounded-lg border transition-colors ${open ? "border-primary/40 bg-primary/5" : "border-border bg-card hover:border-primary/20"}`}
    >
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen(!open)}
          className="w-full flex items-center gap-4 p-5 text-left"
        >
          <span className="text-2xl font-serif text-primary/60 leading-none shrink-0">{String(index + 1).padStart(2, "0")}</span>
          <span className="flex-1 text-base font-sans font-semibold text-foreground">{title}</span>
          <ChevronDown
            className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
            aria-hidden="true"
          />
        </button>
      </h3>
      <div id={id} hidden={!open}>
        <p className="px-5 pb-5 pl-[4.25rem] text-sm font-sans text-muted-foreground leading-relaxed">{text}</p>
      </div>
    </li>
  );
};

/** Short lessons; the first is open so readers see the pattern. */
const Takeaways = ({ items }: { items: Takeaway[] }) => (
  <ol className="space-y-3">
    {items.map((t, i) => (
      <TakeawayItem key={t.title} index={i} defaultOpen={i === 0} {...t} />
    ))}
  </ol>
);

export default Takeaways;
