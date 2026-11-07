import type { LucideIcon } from "lucide-react";
import Reveal from "./Reveal";

export interface Problem {
  icon: LucideIcon;
  title: string;
  text: string;
}

interface ProblemCardsProps {
  problems: Problem[];
  image?: { src: string; alt: string; caption?: string };
  onImageClick?: () => void;
}

const ProblemCards = ({ problems, image, onImageClick }: ProblemCardsProps) => (
  <div className={`grid gap-6 ${image ? "lg:grid-cols-[1fr_1.1fr] items-start" : ""}`}>
    <ul className={`grid gap-3 ${image ? "" : "md:grid-cols-3"}`}>
      {problems.map(({ icon: Icon, title, text }, i) => (
        <Reveal key={title} delay={i * 80}>
          <li className="flex gap-4 p-4 md:p-5 rounded-lg border border-border bg-card h-full">
            <span className="shrink-0 w-10 h-10 rounded-md bg-destructive/10 text-destructive flex items-center justify-center">
              <Icon className="w-5 h-5" aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-sans font-semibold text-foreground mb-1">{title}</p>
              <p className="text-sm font-sans text-muted-foreground leading-relaxed">{text}</p>
            </div>
          </li>
        </Reveal>
      ))}
    </ul>

    {image && (
      <Reveal delay={120}>
        <figure>
          <button
            type="button"
            onClick={onImageClick}
            disabled={!onImageClick}
            className="block w-full rounded-lg border border-border overflow-hidden bg-card enabled:hover:border-primary/40 enabled:cursor-zoom-in transition-colors"
          >
            <img src={image.src} alt={image.alt} className="w-full h-auto" loading="lazy" />
          </button>
          {image.caption && (
            <figcaption className="text-xs font-sans text-muted-foreground mt-2">{image.caption}</figcaption>
          )}
        </figure>
      </Reveal>
    )}
  </div>
);

export default ProblemCards;
