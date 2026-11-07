import type { ReactNode } from "react";
import Reveal from "./Reveal";

interface ChapterProps {
  id: string;
  number: string;
  eyebrow: string;
  title: string;
  intro?: string;
  children: ReactNode;
}

/** One numbered chapter of a case study: short heading, one-line intro, then a visual block. */
const Chapter = ({ id, number, eyebrow, title, intro, children }: ChapterProps) => (
  <section id={id} className="scroll-mt-20 py-16 md:py-24 px-6 md:px-12 lg:px-24 max-w-5xl mx-auto">
    <Reveal className="max-w-3xl mb-10">
      <p className="text-xs font-sans font-medium tracking-[0.15em] uppercase text-primary mb-3">
        {number} — {eyebrow}
      </p>
      <h2 className="text-2xl md:text-4xl font-serif text-foreground leading-tight">{title}</h2>
      {intro && <p className="text-base md:text-lg font-sans text-muted-foreground leading-relaxed mt-4">{intro}</p>}
    </Reveal>
    {children}
  </section>
);

export default Chapter;
