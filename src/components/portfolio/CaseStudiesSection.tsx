import CaseStudyCard from "./CaseStudyCard";

const caseStudies = [
  {
    number: "01",
    title: "Stabilizing a High-Risk Partner Platform",
    subtitle: "Old Mutual Uganda",
    context:
      "An onboarding platform with significant usability and delivery issues threatening the partnership.",
    problem:
      "Declining partner confidence, lack of visibility into platform performance, and risk of losing a key partner.",
    role: "Frontend tech lead + product/UX contributor",
    approach: [
      "Introduced monitoring with PostHog for data visibility",
      "Simplified onboarding journeys based on real usage",
      "Aligned design decisions with actual user behavior patterns",
    ],
    solution: [
      "Redesigned and improved core onboarding flows",
      "Implemented comprehensive tracking and monitoring",
      "Created feedback loops for continuous improvement",
    ],
    outcome: [
      "Stabilized the platform and restored reliability",
      "Restored partner trust and confidence",
      "Prevented loss of a critical business partner",
    ],
    reflection:
      "This project reinforced the importance of early monitoring and data visibility. You can't fix what you can't see — and by the time stakeholders notice problems, trust has already eroded.",
  },
  {
    number: "02",
    title: "Recovering a Failing Product & Restoring Trust",
    subtitle: "CoverLink",
    context:
      "Live insurance products (medical + legal) with critical bugs and unmet partner expectations.",
    problem:
      "Partner dissatisfaction, broken user flows, and significant gaps between what was promised and what was delivered.",
    role: "Led recovery across UX, frontend, and delivery",
    approach: [
      "Prioritized fixing production-critical issues first",
      "Redesigned critical user journeys for clarity",
      "Introduced faster feedback loops with the partner",
    ],
    solution: [
      "Stabilized the system and resolved critical bugs",
      "Delivered a commercially viable product rapidly",
      "Established regular partner check-ins and demos",
    ],
    outcome: [
      "Partner regained confidence in the team and product",
      "Improved external perception of delivery capability",
      "Accelerated product rollout to end users",
    ],
    reflection:
      "Recovery isn't just about fixing bugs — it's about aligning delivery with real user and partner expectations. The fastest path to trust is showing consistent, visible progress.",
  },
  {
    number: "03",
    title: "Improving Delivery Efficiency Through Design Collaboration",
    subtitle: "Mzanu",
    context: "A partner onboarding platform facing typical development delays.",
    problem:
      "Recurring delays and misalignment during development cycles, causing frustration for both internal teams and partners.",
    role: "Product designer leading collaborative design process",
    approach: [
      'Introduced a "design-with-client" workflow',
      "Validated flows with stakeholders before development began",
      "Created shared understanding of requirements upfront",
    ],
    solution: [
      "Co-designed flows with the partner in real-time",
      "Established validation checkpoints before handoff",
      "Documented decisions to reduce ambiguity",
    ],
    outcome: [
      "Significantly reduced UAT issues and rework",
      "Faster delivery — approximately 1.5 weeks saved",
      "Improved partner satisfaction and collaboration",
    ],
    reflection:
      "The best way to reduce development friction is to bring clients into the design process early. When everyone sees the same thing before a single line of code is written, delivery becomes predictable.",
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
      <div>
        {caseStudies.map((cs) => (
          <CaseStudyCard key={cs.number} {...cs} />
        ))}
      </div>
    </section>
  );
};

export default CaseStudiesSection;
