import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Gauge, LayoutGrid, Smartphone } from "lucide-react";
import { useDocumentTitle } from "@/hooks/use-document-title";
import CaseStudySummary from "@/components/portfolio/CaseStudySummary";
import CaseStudyEnd from "@/components/portfolio/CaseStudyEnd";
import ImageLightbox from "@/components/portfolio/ImageLightbox";
import ReadingProgress from "@/components/case-study/ReadingProgress";
import Reveal from "@/components/case-study/Reveal";
import Chapter from "@/components/case-study/Chapter";
import ProblemCards from "@/components/case-study/ProblemCards";
import ProcessStepper from "@/components/case-study/ProcessStepper";
import DecisionCards from "@/components/case-study/DecisionCards";
import StatCounters from "@/components/case-study/StatCounters";
import BeforeAfterSlider from "@/components/case-study/BeforeAfterSlider";
import Takeaways from "@/components/case-study/Takeaways";

import ypBeforeHomepage from "@/assets/yp-before-homepage.jpg";
import ypAfterShowcase from "@/assets/yp-after-showcase.jpg";
import ypWireframes from "@/assets/yp-wireframes-teal.webp";
import ypAnalytics2018 from "@/assets/yp-analytics-2018.webp";
import ypAnalytics2020 from "@/assets/yp-analytics-2020.webp";

const images = {
  after: { src: ypAfterShowcase, alt: "The redesigned Yellow Pages: homepage, search results and business page" },
  before: { src: ypBeforeHomepage, alt: "The original Yellow Pages Kenya homepage (2018)" },
  wireframes: { src: ypWireframes, alt: "Wireframes for the homepage, search results and business page" },
};
const lightboxImages = [images.after, images.before, images.wireframes];

const YellowPagesCaseStudy = () => {
  useDocumentTitle("Yellow Pages Kenya Redesign");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-5xl mx-auto px-6 md:px-12 lg:px-24 h-14 flex items-center justify-between">
          <Link
            to="/#work"
            className="flex items-center gap-2 text-sm font-sans text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Back to portfolio
          </Link>
          <span className="hidden sm:inline text-xs font-sans font-medium tracking-[0.2em] uppercase text-primary">
            Case study · Shipped
          </span>
        </div>
        <ReadingProgress />
      </nav>

      <main className="pt-14">
        {/* ───────── Hero ───────── */}
        <section className="pt-20 md:pt-28 pb-12 px-6 md:px-12 lg:px-24 max-w-5xl mx-auto">
          <span className="text-xs font-sans font-medium tracking-[0.25em] uppercase text-primary block mb-6">
            Yellow Pages Kenya · 2019–2022
          </span>
          <h1 className="text-4xl md:text-6xl font-serif text-foreground leading-[1.1] mb-6">
            Yellow Pages Kenya:<br className="hidden md:block" /> from legacy directory to task‑driven search
          </h1>
          <p className="text-lg md:text-xl font-sans text-muted-foreground leading-relaxed max-w-3xl">
            A business directory used across six countries, rebuilt from a cluttered, slow legacy site
            into fast search that gets people to the business they need.
          </p>
        </section>

        <CaseStudySummary
          readingTime="3 min read"
          tldr="A legacy business directory was slow and cluttered, and people left before finding what they came for. I led a redesign around one task — search, find, contact — prototyped it in code, and rolled it out across six countries. Users grew from 472K to 1.7M and the bounce rate fell from 33.8% to 24.4%."
          facts={[
            { label: "Role", value: "Lead UX Designer, also built the frontend prototype" },
            { label: "Team", value: "4 people, across Kenya and Cape Verde" },
            { label: "Timeline", value: "2019–2022" },
            { label: "Status", value: "Shipped in 6 countries" },
            { label: "Outcome", value: "472K → 1.7M users" },
          ]}
        />

        <Reveal className="px-6 md:px-12 lg:px-24 max-w-5xl mx-auto">
          <figure>
            <button
              type="button"
              onClick={() => setLightboxIndex(0)}
              className="block w-full rounded-lg border border-border overflow-hidden bg-card hover:border-primary/40 cursor-zoom-in transition-colors"
            >
              <img src={images.after.src} alt={images.after.alt} className="w-full h-auto" />
            </button>
            <figcaption className="text-xs font-sans text-muted-foreground mt-2">
              The redesigned Yellow Pages: homepage, search results and business page.
            </figcaption>
          </figure>
        </Reveal>

        <Chapter
          id="problem"
          number="01"
          eyebrow="The problem"
          title="People came to find a business. The site got in the way."
          intro="Users arrived with clear intent, but every step added friction — and the metrics showed it."
        >
          <ProblemCards
            problems={[
              {
                icon: LayoutGrid,
                title: "Cluttered pages",
                text: "Built to display content, not to help people search. The one thing they came for was buried.",
              },
              {
                icon: Gauge,
                title: "Slow to load",
                text: "Heavy pages on slow connections. People left before they found what they needed.",
              },
              {
                icon: Smartphone,
                title: "Poor on mobile",
                text: "As users moved to phones, the mobile experience bordered on unusable.",
              },
            ]}
            image={{ ...images.before, caption: "Before: the original homepage (2018)." }}
            onImageClick={() => setLightboxIndex(1)}
          />
        </Chapter>

        <div className="border-t border-border" />

        <Chapter
          id="approach"
          number="02"
          eyebrow="The approach"
          title="One journey: search → find → contact."
          intro="I distilled the product to the job people hired it for, and tested every decision against it. Click through the steps."
        >
          <ProcessStepper
            caseStudy="yellow-pages"
            steps={[
              {
                title: "Research",
                text: "Competitor products, internal analytics and user feedback — to find where the friction really was, not just what looked dated.",
              },
              {
                title: "Define the journey",
                text: "Search → find → contact. Every design decision had to speed this flow up, not slow it down.",
              },
              {
                title: "Wireframes",
                text: "Wireframes in Figma validated the structure early, with fast stakeholder feedback before any visual design.",
                image: images.wireframes,
              },
              {
                title: "Prototype in code",
                text: "An interactive HTML, CSS, JavaScript and Bootstrap prototype, so stakeholders could feel the experience — not just see it.",
                image: images.after,
              },
            ]}
          />
        </Chapter>

        <div className="border-t border-border" />

        <Chapter
          id="decisions"
          number="03"
          eyebrow="Key decisions"
          title="Three decisions that changed the experience."
        >
          <DecisionCards
            decisions={[
              {
                title: "Put search first",
                problem: "The search people came for competed with everything else on the homepage.",
                decision: "Make search the main element on first load, with quick category links above and below the fold.",
                result: "One clear starting point, with several ways in.",
              },
              {
                title: "Act straight from results",
                problem: "To contact a business, people had to open its page first.",
                decision: "Call, email and website buttons on every result, plus sticky search and location filters.",
                result: "Fewer steps from search to contact.",
              },
              {
                title: "Business pages that answer questions",
                problem: "Business information was hard to scan.",
                decision: "Structured details, several contact numbers, a map and share buttons.",
                result: "People get what they need without hunting for it.",
              },
            ]}
          />
        </Chapter>

        <div className="border-t border-border" />

        <Chapter
          id="results"
          number="04"
          eyebrow="Results"
          title="The numbers told the story."
          intro="Rolled out across Kenya, Tanzania, Mozambique, Angola, Cape Verde and East Timor — so it had to stay fast on slow connections, not just in ideal conditions."
        >
          <StatCounters
            stats={[
              { target: 1.7, decimals: 1, suffix: "M", label: "Users", note: "from 472K (+260%)" },
              { target: 2.3, decimals: 1, suffix: "M", label: "Sessions", note: "from 631K" },
              { target: 24.4, decimals: 1, suffix: "%", label: "Bounce rate", note: "down from 33.8%" },
              { target: 6, label: "Countries", note: "one shared design" },
            ]}
          />
          <Reveal className="mt-10">
            <BeforeAfterSlider
              caseStudy="yellow-pages"
              aspect="aspect-[11/5]"
              before={{ src: ypAnalytics2018, alt: "Google Analytics, 2018, before the redesign", label: "2018" }}
              after={{ src: ypAnalytics2020, alt: "Google Analytics, 2019–2020, after the redesign", label: "2019–2020" }}
              caption="Drag to compare Google Analytics before (2018) and after (2019–2020) the redesign."
            />
          </Reveal>
        </Chapter>

        <div className="border-t border-border" />

        <Chapter id="learnings" number="05" eyebrow="What I learned" title="Less, done well, beats more.">
          <Takeaways
            items={[
              {
                title: "Clarity beats complexity",
                text: "Users don't need more features — they need fewer decisions. A clear search bar beat a page full of options.",
              },
              {
                title: "Speed is a design decision",
                text: "Slow pages aren't only a technical problem; they're a UX problem — especially across six markets with very different connections.",
              },
              {
                title: "Prototype in code",
                text: "A working prototype let stakeholders feel the experience instead of imagining it, which sped up decisions and removed ambiguity.",
              },
            ]}
          />
          <Reveal className="mt-12">
            <blockquote className="border-l-2 border-primary pl-6 max-w-3xl">
              <p className="text-xl md:text-2xl font-serif text-foreground leading-relaxed">
                "Great UX isn't about adding more — it's about removing everything that stands between a
                user and their goal."
              </p>
            </blockquote>
          </Reveal>
        </Chapter>

        <div className="border-t border-border" />

        <CaseStudyEnd slug="yellow-pages" />
      </main>

      {lightboxIndex !== null && (
        <ImageLightbox
          images={lightboxImages}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </div>
  );
};

export default YellowPagesCaseStudy;
