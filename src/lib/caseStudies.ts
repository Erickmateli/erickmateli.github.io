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

export const caseStudies: CaseStudy[] = [];
