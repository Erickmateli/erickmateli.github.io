import { Link } from "react-router-dom";
import { ArrowRight, Star } from "lucide-react";
import posthog from "posthog-js";
import aspinAfterShowcase from "@/assets/aspin-after-showcase.png";

const FeaturedCaseStudyCard = () => {
  return (
    <article className="border border-primary/20 rounded-lg overflow-hidden bg-card mb-12">
      <div className="grid md:grid-cols-2 gap-0">
        {/* Image */}
        <div className="aspect-[4/3] md:aspect-auto overflow-hidden bg-muted">
          <img
            src={aspinAfterShowcase}
            alt="ASPIN Platform Redesign"
            className="w-full h-full object-cover object-top"
            loading="lazy"
          />
        </div>

        {/* Content */}
        <div className="p-8 md:p-10 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-4">
            <Star className="w-3.5 h-3.5 text-primary fill-primary" />
            <span className="text-[10px] font-sans font-medium tracking-[0.2em] uppercase text-primary">
              Featured Case Study
            </span>
          </div>

          <h3 className="text-2xl md:text-3xl font-serif text-foreground leading-tight mb-2">
            Redesigning ASPIN
          </h3>
          <p className="text-primary font-sans text-sm font-medium mb-4">
            Inclusivity Solutions
          </p>
          <p className="text-sm font-sans text-muted-foreground leading-relaxed mb-6">
            A complex insurance platform used across multiple partners — redesigned from
            system-centric data screens to workflow-driven experiences that users describe
            as "easy to use."
          </p>

          <Link
            to="/case-study/aspin"
            className="inline-flex items-center gap-2 text-sm font-sans font-medium text-primary hover:text-foreground transition-colors"
            onClick={() => posthog.capture("read_full_story_clicked", { case_study: "aspin" })}
          >
            Read the full story
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default FeaturedCaseStudyCard;
