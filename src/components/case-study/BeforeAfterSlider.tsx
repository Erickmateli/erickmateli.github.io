import { useState } from "react";
import { ChevronsLeftRight } from "lucide-react";
import { trackEvent } from "@/lib/track-event";

interface Shot {
  src: string;
  alt: string;
  label?: string;
}

interface BeforeAfterSliderProps {
  before: Shot;
  after: Shot;
  caption?: string;
  /** Tailwind aspect class; both images are cropped to it from the top. */
  aspect?: string;
  caseStudy?: string;
}

/**
 * Drag (or use arrow keys) to reveal the "before" image over the "after" one.
 * A transparent range input on top supplies mouse, touch and keyboard support.
 */
const BeforeAfterSlider = ({ before, after, caption, aspect = "aspect-[16/10]", caseStudy }: BeforeAfterSliderProps) => {
  const [pos, setPos] = useState(50);
  const [tracked, setTracked] = useState(false);

  const onChange = (v: number) => {
    setPos(v);
    if (!tracked && caseStudy) {
      setTracked(true);
      trackEvent("before_after_used", { case_study: caseStudy, after: after.label ?? after.alt });
    }
  };

  return (
    <figure>
      <div className={`relative ${aspect} overflow-hidden rounded-lg border border-border bg-muted select-none`}>
        <img src={after.src} alt={after.alt} className="absolute inset-0 w-full h-full object-cover object-top" loading="lazy" />
        <img
          src={before.src}
          alt={before.alt}
          className="absolute inset-0 w-full h-full object-cover object-top"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
          loading="lazy"
        />

        <span className="absolute top-3 left-3 px-2 py-1 rounded bg-foreground/80 text-background text-xs font-sans font-medium">
          {before.label ?? "Before"}
        </span>
        <span className="absolute top-3 right-3 px-2 py-1 rounded bg-primary text-primary-foreground text-xs font-sans font-medium">
          {after.label ?? "After"}
        </span>

        <div className="absolute inset-y-0 w-0.5 bg-background shadow-[0_0_0_1px_hsl(var(--border))] pointer-events-none" style={{ left: `${pos}%` }}>
          <span className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 left-1/2 w-9 h-9 rounded-full bg-background border border-border shadow-md flex items-center justify-center text-primary">
            <ChevronsLeftRight className="w-4 h-4" aria-hidden="true" />
          </span>
        </div>

        <input
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => onChange(Number(e.target.value))}
          aria-label={`Compare ${before.label ?? "before"} and ${after.label ?? "after"}`}
          className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize focus-visible:opacity-0 peer"
        />
        <div className="absolute inset-0 rounded-lg pointer-events-none ring-2 ring-primary ring-offset-2 opacity-0 peer-focus-visible:opacity-100" />
      </div>
      {caption && <figcaption className="text-xs font-sans text-muted-foreground mt-2">{caption}</figcaption>}
    </figure>
  );
};

export default BeforeAfterSlider;
