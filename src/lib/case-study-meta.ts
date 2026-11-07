// Order matches the home page cards; "next case study" links follow it and wrap around.
export const caseStudyOrder = [
  {
    slug: "yellow-pages",
    project: "Yellow Pages Kenya",
    outcome: "Grew users from 472K to 1.7M",
  },
  {
    slug: "aspin",
    project: "ASPIN · Inclusivity Solutions",
    outcome: "Serving 5M customers across 11 countries",
  },
  {
    slug: "aspin-marketplace",
    project: "ASPIN Marketplace",
    outcome: "Making 57 insurers comparable in minutes",
  },
] as const;

export type CaseStudySlug = (typeof caseStudyOrder)[number]["slug"];

export function nextCaseStudy(slug: CaseStudySlug) {
  const i = caseStudyOrder.findIndex((c) => c.slug === slug);
  return caseStudyOrder[(i + 1) % caseStudyOrder.length];
}
