import ypAfterShowcase from "@/assets/yp-after-showcase.jpg";
import marketplaceHome from "@/assets/marketplace/marketplace-card.webp";
import aspinApprovalJourney from "@/assets/aspin-plus/aspin-plus-card-approval-journey.webp";
import OutcomeCaseStudyCard, { type OutcomeCaseStudy } from "./OutcomeCaseStudyCard";

const caseStudies: OutcomeCaseStudy[] = [
  {
    slug: "yellow-pages",
    project: "Yellow Pages Kenya",
    meta: "Lead UX Designer · 2019–2022",
    status: "Shipped in 6 countries",
    outcome: "Grew users from 472K to 1.7M",
    summary:
      "People came to find a business, not browse a directory. I redesigned the platform around that one task — search, find, contact — and rolled it out across six African countries.",
    stats: [
      { value: "+260%", label: "Users" },
      { value: "3.6×", label: "Sessions" },
      { value: "−28%", label: "Bounce rate" },
    ],
    visual: (
      <img
        src={ypAfterShowcase}
        alt="Redesigned Yellow Pages Kenya search experience on a laptop"
        className="w-full h-full object-cover object-center"
        loading="eager"
      />
    ),
  },
  {
    slug: "aspin",
    project: "ASPIN · Inclusivity Solutions",
    meta: "Senior Product Designer · 2022–now",
    status: "Shipped",
    outcome: "Serving 5M customers across 11 countries",
    summary:
      "ASPIN is the platform banks, telcos and insurers use to launch and run insurance products. I restructured it from data-heavy screens into clear workflows for onboarding, policies and claims.",
    stats: [
      { value: "4.0/5", label: "Partner CSAT" },
      { value: "~40%", label: "Less custom work" },
      { value: "10+", label: "Partners" },
    ],
    visual: (
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={aspinApprovalJourney}
          alt="ASPIN policy screening: an approval journey showing each stage and the next decision"
          className="absolute left-6 md:left-8 top-1/2 -translate-y-1/2 w-[115%] md:w-[155%] max-w-none rounded-md border border-border shadow-xl bg-white"
          loading="lazy"
        />
      </div>
    ),
  },
  {
    slug: "aspin-marketplace",
    project: "ASPIN Marketplace",
    meta: "Senior Product Designer · 2026",
    status: "Concept with live staging",
    outcome: "Making 57 insurers comparable in minutes",
    summary:
      "A self-serve insurance comparison platform for Kenya across five product lines — mapped as a full system before a single screen, with trust designed into every step.",
    stats: [
      { value: "57", label: "Insurers mapped" },
      { value: "5", label: "Product lines" },
      { value: "3", label: "Steps to cover" },
    ],
    visual: (
      <img
        src={marketplaceHome}
        alt="Insurance marketplace home page with five product lines to compare"
        className="w-full h-full object-cover object-left-top"
        loading="lazy"
      />
    ),
  },
];

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
      {caseStudies.map((cs) => (
        <OutcomeCaseStudyCard key={cs.slug} {...cs} />
      ))}
    </section>
  );
};

export default CaseStudiesSection;
