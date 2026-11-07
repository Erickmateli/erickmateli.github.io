import { useId, useRef, useState, type KeyboardEvent } from "react";
import { trackEvent } from "@/lib/track-event";

export interface ProcessStep {
  title: string;
  text: string;
  image?: { src: string; alt: string };
}

interface ProcessStepperProps {
  steps: ProcessStep[];
  /** Used in analytics, e.g. "yellow-pages". */
  caseStudy?: string;
}

/** Clickable process timeline built as an ARIA tab list: arrow keys move between steps. */
const ProcessStepper = ({ steps, caseStudy }: ProcessStepperProps) => {
  const [active, setActive] = useState(0);
  const id = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const select = (i: number) => {
    setActive(i);
    tabRefs.current[i]?.focus();
    if (caseStudy) trackEvent("process_step_viewed", { case_study: caseStudy, step: i + 1 });
  };

  const onKeyDown = (e: KeyboardEvent) => {
    const last = steps.length - 1;
    if (e.key === "ArrowRight") select(active === last ? 0 : active + 1);
    else if (e.key === "ArrowLeft") select(active === 0 ? last : active - 1);
    else if (e.key === "Home") select(0);
    else if (e.key === "End") select(last);
    else return;
    e.preventDefault();
  };

  const step = steps[active];

  return (
    <div>
      <div
        role="tablist"
        aria-label="Process steps"
        onKeyDown={onKeyDown}
        className="relative grid gap-2"
        style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` }}
      >
        {/* The line runs between the first and last circle centres. */}
        <div
          className="absolute top-[19px] h-px bg-border"
          style={{ left: `${50 / steps.length}%`, right: `${50 / steps.length}%` }}
          aria-hidden="true"
        />
        <div
          className="absolute top-[19px] h-px bg-primary transition-all duration-500"
          style={{
            left: `${50 / steps.length}%`,
            width: `${(active / Math.max(steps.length - 1, 1)) * (100 - 100 / steps.length)}%`,
          }}
          aria-hidden="true"
        />
        {steps.map((s, i) => {
          const selected = i === active;
          const done = i < active;
          return (
            <button
              key={s.title}
              ref={(el) => (tabRefs.current[i] = el)}
              role="tab"
              id={`${id}-tab-${i}`}
              aria-selected={selected}
              aria-controls={`${id}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => select(i)}
              className="relative flex flex-col items-center text-center gap-2 group"
            >
              <span
                className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-sm font-sans font-semibold transition-colors ${
                  selected
                    ? "bg-primary border-primary text-primary-foreground"
                    : done
                      ? "bg-background border-primary text-primary"
                      : "bg-background border-border text-muted-foreground group-hover:border-primary/50"
                }`}
              >
                {i + 1}
              </span>
              <span
                className={`text-xs md:text-sm font-sans leading-tight ${selected ? "text-foreground font-semibold" : "text-muted-foreground"}`}
              >
                {s.title}
              </span>
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`${id}-panel`}
        aria-labelledby={`${id}-tab-${active}`}
        className={`mt-8 grid gap-6 rounded-lg border border-border bg-card p-6 md:p-8 ${step.image ? "md:grid-cols-[1fr_1.4fr] items-center" : ""}`}
      >
        <div key={active} className="animate-fade-up">
          <p className="text-xs font-sans font-medium tracking-[0.15em] uppercase text-primary mb-2">
            Step {active + 1} of {steps.length}
          </p>
          <p className="text-xl font-serif text-foreground mb-2">{step.title}</p>
          <p className="text-sm md:text-base font-sans text-muted-foreground leading-relaxed">{step.text}</p>
        </div>
        {step.image && (
          <img
            key={step.image.src}
            src={step.image.src}
            alt={step.image.alt}
            className="w-full h-auto rounded-md border border-border animate-fade-up"
            loading="lazy"
          />
        )}
      </div>
    </div>
  );
};

export default ProcessStepper;
