import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { trackEvent } from "@/lib/track-event";

export interface OutcomeCaseStudy {
  slug: string;
  project: string;
  meta: string;
  status: string;
  outcome: string;
  summary: string;
  stats: { value: string; label: string }[];
  visual: ReactNode;
}

const OutcomeCaseStudyCard = ({ slug, project, meta, status, outcome, summary, stats, visual }: OutcomeCaseStudy) => {
  return (
    <article className="group border border-primary/20 rounded-lg overflow-hidden bg-card mb-12 hover:border-primary/40 transition-colors">
      <div className="grid md:grid-cols-2 gap-0">
        <div className="aspect-[4/3] md:aspect-auto overflow-hidden bg-muted relative">{visual}</div>

        <div className="p-8 md:p-10 flex flex-col justify-center">
          <p className="text-xs font-sans font-medium tracking-[0.15em] uppercase text-primary mb-1">
            {project}
          </p>
          <p className="text-xs font-sans text-muted-foreground mb-5">
            {meta} · <span className="text-foreground/80">{status}</span>
          </p>

          <h3 className="text-2xl md:text-3xl font-serif text-foreground leading-tight mb-3">
            {outcome}
          </h3>
          <p className="text-sm font-sans text-muted-foreground leading-relaxed mb-6">{summary}</p>

          <dl className="grid grid-cols-3 gap-4 mb-6 pt-5 border-t border-border">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col-reverse justify-end">
                <dt className="text-xs font-sans text-muted-foreground uppercase tracking-wider">{stat.label}</dt>
                <dd className="text-base md:text-lg font-serif text-foreground whitespace-nowrap">{stat.value}</dd>
              </div>
            ))}
          </dl>

          <Link
            to={`/case-study/${slug}`}
            aria-label={`Read the ${project} case study`}
            className="inline-flex items-center gap-2 text-sm font-sans font-medium text-primary hover:text-foreground transition-colors"
            onClick={() => trackEvent("read_full_story_clicked", { case_study: slug })}
          >
            Read the case study
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default OutcomeCaseStudyCard;
