import { caseStudies } from "@/lib/caseStudies";
import CaseStudyCard from "./CaseStudyCard";
import FeaturedCaseStudyCard from "./FeaturedCaseStudyCard";
import FeaturedYellowPagesCard from "./FeaturedYellowPagesCard";

const CaseStudiesSection = () => {
  return (
    <section id="work" className="py-24 px-6 md:px-12 lg:px-24 max-w-5xl mx-auto relative">
      {/* Decorative vertical dashed accent */}
      <div className="absolute left-0 top-24 bottom-24 opacity-[0.06] pointer-events-none hidden lg:block">
        <svg width="20" height="100%" viewBox="0 0 20 600" preserveAspectRatio="none">
          <line x1="10" y1="0" x2="10" y2="600" stroke="hsl(var(--primary))" strokeWidth="1" strokeDasharray="4 8" />
        </svg>
      </div>

      <p className="text-sm font-sans font-medium tracking-[0.2em] uppercase text-primary mb-4">
        Selected Work
      </p>
      <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-16">
        Case Studies
      </h2>
      <FeaturedCaseStudyCard />
      <FeaturedYellowPagesCard />
      <div>
        {caseStudies.map((cs) => (
          <CaseStudyCard key={cs.number} {...cs} />
        ))}
      </div>
    </section>
  );
};

export default CaseStudiesSection;
