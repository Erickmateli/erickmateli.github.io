import coverlinkProductPep from "@/assets/coverlink-product-pep.png";
import coverlinkPaymentPlan from "@/assets/coverlink-payment-plan.png";
import coverlinkAddCover from "@/assets/coverlink-add-cover.png";
import coverlinkCoverBar from "@/assets/coverlink-cover-details-bar.png";
import coverlinkCoverMotor from "@/assets/coverlink-cover-details-motor.png";
import coverlinkCoverLiability from "@/assets/coverlink-cover-details-liability.png";
import coverlinkPaymentDetails from "@/assets/coverlink-payment-details.png";
import coverlinkDocs from "@/assets/coverlink-docs.png";
import coverlinkSummary from "@/assets/coverlink-summary.png";
import coverlinkSuccess from "@/assets/coverlink-success.png";

export interface CaseStudy {
  slug: string;
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
  images?: { src: string; alt: string }[];
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "coverlink",
    number: "01",
    title: "Recovering a Failing Product & Restoring Partner Trust",
    subtitle: "CoverLink",
    context:
      "CoverLink is a partner-driven insurance platform offering medical, legal, and commercial products. The platform had gone live but was experiencing significant delivery and usability challenges, affecting both internal teams and the partner's confidence.",
    problem:
      "Key user journeys were broken or inconsistent. Production bugs affected live insurance products. Promised features remained undelivered. The partner had developed low confidence in delivery reliability, and slow feedback cycles led to misalignment and frustration — risking partner trust and the company's delivery reputation.",
    role: "Frontend Tech Lead with strong involvement in product and UX decisions — owning frontend stabilization, critical UX improvements, partner feedback coordination, and accelerating delivery of the commercial product. This was not just an engineering problem — it required product thinking, prioritization, and fast iteration.",
    approach: [
      "Prioritized stability over new features — fixed production issues and identified critical flow breakpoints first",
      "Redesigned critical user journeys — simplified areas causing friction and aligned flows with real user behavior",
      "Introduced faster feedback loops — partner feedback implemented and redeployed within ~2 hours",
      "Accelerated delivery of commercial product to restore partner confidence and demonstrate improved capability",
    ],
    solution: [
      "Stabilized frontend flows across medical, legal, and commercial products",
      "Fixed production bugs affecting critical user journeys",
      "Delivered the commercial product to staging environment",
      "Improved responsiveness to partner feedback with ~2-hour turnaround",
      "Established a more iterative and collaborative delivery process",
    ],
    outcome: [
      "Partner confidence restored after demo of improved product",
      "Partner requested faster rollout — indicating renewed trust",
      "Significant reduction in critical user flow issues",
      "Improved perception of delivery capability",
      "Commercial product successfully prepared for UAT phase",
    ],
    reflection:
      "Delivery issues are often product issues — fixing bugs alone isn't enough. You need to understand user flows, align with real usage, and prioritize experience over feature volume. The ~2-hour turnaround on partner feedback had more impact than weeks of prior delivery. Stability is a feature — a stable, predictable experience is what restores confidence.",
    images: [
      { src: coverlinkProductPep, alt: "Product & PEP Selection" },
      { src: coverlinkPaymentPlan, alt: "Payment Plan & Policy Dates" },
      { src: coverlinkAddCover, alt: "Select Cover Type" },
      { src: coverlinkCoverBar, alt: "Business All Risk Details" },
      { src: coverlinkCoverMotor, alt: "Motor Comprehensive Details" },
      { src: coverlinkCoverLiability, alt: "Public Liability Details" },
      { src: coverlinkPaymentDetails, alt: "Payment Details" },
      { src: coverlinkDocs, alt: "Required Documents" },
      { src: coverlinkSummary, alt: "Order Summary" },
      { src: coverlinkSuccess, alt: "Application Success" },
    ],
  },
];
