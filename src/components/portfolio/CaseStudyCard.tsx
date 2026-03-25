import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface CaseStudyProps {
  number: string;
  title: string;
  subtitle: string;
  context: string;
  problem: string;
  role: string;
  approach: string[];
  solution: string[];
  outcome: string[];
  reflection: string;
}

const CaseStudyCard = ({
  number,
  title,
  subtitle,
  context,
  problem,
  role,
  approach,
  solution,
  outcome,
  reflection,
}: CaseStudyProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <article className="border-t border-border py-12 md:py-16">
      <div className="grid md:grid-cols-[auto_1fr] gap-8 md:gap-16">
        <span className="text-6xl md:text-8xl font-serif text-muted-foreground/30 leading-none">
          {number}
        </span>
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl md:text-3xl font-serif text-foreground leading-tight">
              {title}
            </h3>
            <p className="text-primary font-sans text-sm font-medium mt-2">{subtitle}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 text-sm font-sans">
            <div>
              <p className="font-medium text-foreground mb-1">Context</p>
              <p className="text-muted-foreground leading-relaxed">{context}</p>
            </div>
            <div>
              <p className="font-medium text-foreground mb-1">Problem</p>
              <p className="text-muted-foreground leading-relaxed">{problem}</p>
            </div>
            <div>
              <p className="font-medium text-foreground mb-1">My Role</p>
              <p className="text-muted-foreground leading-relaxed">{role}</p>
            </div>
          </div>

          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-2 text-sm font-sans font-medium text-primary hover:text-foreground transition-colors"
          >
            {expanded ? "Show less" : "Read the full story"}
            {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {expanded && (
            <div className="space-y-8 animate-fade-up">
              <div className="grid md:grid-cols-3 gap-6 text-sm font-sans">
                <div>
                  <p className="font-medium text-foreground mb-2">Approach</p>
                  <ul className="space-y-1 text-muted-foreground">
                    {approach.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-primary mt-1.5 w-1 h-1 rounded-full bg-primary shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-foreground mb-2">Solution</p>
                  <ul className="space-y-1 text-muted-foreground">
                    {solution.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1 h-1 rounded-full bg-primary shrink-0 mt-1.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-foreground mb-2">Outcome</p>
                  <ul className="space-y-1 text-muted-foreground">
                    {outcome.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1 h-1 rounded-full bg-primary shrink-0 mt-1.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-card rounded-lg p-6 border border-border">
                <p className="text-xs font-sans font-medium tracking-[0.15em] uppercase text-primary mb-2">
                  Reflection
                </p>
                <p className="text-sm text-muted-foreground font-sans leading-relaxed italic">
                  "{reflection}"
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

export default CaseStudyCard;
