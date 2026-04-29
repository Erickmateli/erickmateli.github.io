import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { trackEvent } from "@/lib/track-event";

interface CaseStudyProps {
  slug: string;
  number: string;
  title: string;
  subtitle: string;
  context: string;
  problem: string;
  role: string;
}

const CaseStudyCard = ({
  slug,
  number,
  title,
  subtitle,
  context,
  problem,
  role,
}: CaseStudyProps) => {
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

          <Link
            to={`/case-study/${slug}`}
            className="inline-flex items-center gap-2 text-sm font-sans font-medium text-primary hover:text-foreground transition-colors"
            onClick={() => trackEvent("read_full_story_clicked", { case_study: slug })}
          >
            Read the full story
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default CaseStudyCard;
