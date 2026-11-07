import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, LayoutList, Megaphone, Shuffle } from "lucide-react";
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

import beforeShowcase from "@/assets/aspin-before-showcase.webp";
import beforeCustomer from "@/assets/aspin-before-interior-customer.png";
import beforeClaims from "@/assets/aspin-before-interior-claims.png";
import afterWebsiteHero from "@/assets/aspin-plus/aspin-plus-website-hero.webp";
import afterWebsiteProducts from "@/assets/aspin-plus/aspin-plus-website-products.webp";
import afterScreening from "@/assets/aspin-plus/aspin-plus-policy-screening.webp";
import afterProfile from "@/assets/aspin-plus/aspin-plus-customer-profile.webp";
import afterClaims from "@/assets/aspin-plus/aspin-plus-claims-queue.webp";
import afterKnowledgeBase from "@/assets/aspin-plus/aspin-plus-knowledge-base.webp";
import afterLogin from "@/assets/aspin-plus/aspin-plus-login.webp";

const images = {
  hero: { src: afterWebsiteHero, alt: "ASPIN today: insurance infrastructure for insurers, banks and telcos" },
  before: { src: beforeShowcase, alt: "The original ASPIN on desktop and mobile, before the redesign" },
  screening: { src: afterScreening, alt: "Policy screening: an approval journey showing every stage and the next decision" },
  claims: { src: afterClaims, alt: "Claims as work queues: each tab is a stage operators act on" },
  products: { src: afterWebsiteProducts, alt: "Two operating models, Aspin Simple and Aspin Plus, on one platform" },
  knowledgeBase: { src: afterKnowledgeBase, alt: "Knowledge base: guides that appear on the pages they're tagged for" },
  login: { src: afterLogin, alt: "Sign-in, consistent with the marketing site" },
};
const moreScreens = [images.screening, images.knowledgeBase, images.login];
const lightboxImages = [images.hero, images.before, ...moreScreens];

const FeaturedCaseStudy = () => {
  useDocumentTitle("ASPIN Platform Redesign");
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
            ASPIN · Inclusivity Solutions · 2022–now
          </span>
          <h1 className="text-4xl md:text-6xl font-serif text-foreground leading-[1.1] mb-6">
            ASPIN:<br className="hidden md:block" /> making a complex insurance platform feel simple
          </h1>
          <p className="text-lg md:text-xl font-sans text-muted-foreground leading-relaxed max-w-3xl">
            A powerful insurance platform that felt complex and unclear — rebuilt around the work people
            actually do.
          </p>
        </section>

        <CaseStudySummary
          readingTime="3 min read"
          tldr="ASPIN is the platform banks, telcos and insurers use to launch and run insurance products — but its screens were organised around database tables, not the work people do. I restructured it around operator tasks such as onboarding, policies and claims, built a shared design system, and shipped the frontend myself. It now serves 5M customers across 11 countries, with a 4.0/5 partner CSAT and about 40% less custom work per partner."
          facts={[
            { label: "Role", value: "Senior Product Designer · UX and frontend" },
            { label: "Team", value: "Cross-functional, 6–10 people across Kenya and Cape Town" },
            { label: "Timeline", value: "2022–now" },
            { label: "Status", value: "Shipped, 10+ partners" },
            { label: "Outcome", value: "5M customers · 4.0/5 CSAT" },
          ]}
        />

        <Reveal className="px-6 md:px-12 lg:px-24 max-w-5xl mx-auto">
          <figure>
            <button
              type="button"
              onClick={() => setLightboxIndex(0)}
              className="block w-full rounded-lg border border-border overflow-hidden bg-card hover:border-primary/40 cursor-zoom-in transition-colors"
            >
              <img src={images.hero.src} alt={images.hero.alt} className="w-full h-auto" />
            </button>
            <figcaption className="text-xs font-sans text-muted-foreground mt-2">
              ASPIN today: insurance infrastructure for insurers, banks and telcos.
            </figcaption>
          </figure>
        </Reveal>

        <Chapter
          id="problem"
          number="01"
          eyebrow="The problem"
          title="People had to figure out the system, instead of the system guiding them."
          intro="ASPIN had grown around system logic. A backend tool had become the main interface for partner operations without ever being designed for that role."
        >
          <ProblemCards
            problems={[
              {
                icon: Shuffle,
                title: "Fragmented workflows",
                text: "One task meant jumping between disconnected screens.",
              },
              {
                icon: LayoutList,
                title: "Data-heavy screens",
                text: "Dense tables with no hierarchy, and no clear next step.",
              },
              {
                icon: Megaphone,
                title: "It didn't explain itself",
                text: "No brand, no responsive design, and no clear story of what ASPIN could do.",
              },
            ]}
            image={{ ...images.before, caption: "Before: the original ASPIN." }}
            onImageClick={() => setLightboxIndex(1)}
          />
          <Reveal className="mt-12">
            <blockquote className="border-l-2 border-primary pl-6 max-w-3xl">
              <p className="text-xl md:text-2xl font-serif text-foreground leading-relaxed">
                "The problem wasn't just the interface — it was how the product was structured."
              </p>
            </blockquote>
          </Reveal>
        </Chapter>

        <div className="border-t border-border" />

        <Chapter
          id="approach"
          number="02"
          eyebrow="The approach"
          title="Organise around tasks, not database tables."
          intro="People want to “create a policy” or “check a claim” — not navigate system modules. Click through the steps."
        >
          <ProcessStepper
            caseStudy="aspin"
            steps={[
              {
                title: "Shift the mental model",
                text: "I rebuilt the experience around what people actually do — their tasks, decisions and workflows — instead of how the data is stored.",
              },
              {
                title: "Map the core journeys",
                text: "Profile, policies, claims, payments and quotes, each designed as a self-contained journey with clear entry points and actions.",
                image: images.claims,
              },
              {
                title: "Make it explain itself",
                text: "Clear brand representation and a plain story of what ASPIN can do, including API integrations, so partners see the full value.",
                image: images.products,
              },
              {
                title: "Design for scale",
                text: "Every decision had to flex across partners and markets while staying consistent — backed by a shared design system of 50+ components.",
                image: images.screening,
              },
            ]}
          />
        </Chapter>

        <div className="border-t border-border" />

        <Chapter
          id="decisions"
          number="03"
          eyebrow="Before → after"
          title="Instead of people adapting to the system, the system adapts to them."
          intro="Drag the sliders to compare the original screens with today's."
        >
          <DecisionCards
            decisions={[
              {
                title: "Workflow-driven screens",
                problem: "Screens mirrored database tables.",
                decision: "Organise every screen around a user task.",
                result: "People find what they need and know where they are.",
              },
              {
                title: "Every screen has a next step",
                problem: "Screens showed data but not what to do with it.",
                decision: "Clear actions on every screen: generate policy, create quote, submit claim.",
                result: "Users always know what they can do next.",
              },
              {
                title: "Progressive information",
                problem: "All the complexity was on screen at once.",
                decision: "Structured, progressive, context-aware information.",
                result: "Complex cases feel manageable.",
              },
            ]}
          />

          <div className="grid lg:grid-cols-2 gap-6 mt-10">
            <Reveal>
              <BeforeAfterSlider
                caseStudy="aspin"
                aspect="aspect-[15/8]"
                before={{ src: beforeCustomer, alt: "Original customer details screen", label: "Before" }}
                after={{ src: afterProfile, alt: "Redesigned customer profile with grouped details", label: "After" }}
                caption="Customer screen: a wall of fields becomes grouped, scannable sections."
              />
            </Reveal>
            <Reveal delay={100}>
              <BeforeAfterSlider
                caseStudy="aspin"
                aspect="aspect-[15/8]"
                before={{ src: beforeClaims, alt: "Original claims dashboard", label: "Before" }}
                after={{ src: afterClaims, alt: "Redesigned claims work queues", label: "After" }}
                caption="Claims: one dense table becomes work queues by stage."
              />
            </Reveal>
          </div>
          <p className="text-xs font-sans text-muted-foreground mt-4">Personal and partner details are blurred for privacy.</p>

          <Reveal className="mt-10">
            <p className="text-xs font-sans font-medium tracking-[0.15em] uppercase text-muted-foreground mb-4">More of the platform</p>
            <div className="grid grid-cols-3 gap-3">
              {moreScreens.map((img, i) => (
                <button
                  key={img.alt}
                  type="button"
                  onClick={() => setLightboxIndex(2 + i)}
                  className="group rounded-md border border-border overflow-hidden bg-card hover:border-primary/40 cursor-zoom-in transition-colors"
                  aria-label={`Open: ${img.alt}`}
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={img.src}
                      alt=""
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                </button>
              ))}
            </div>
          </Reveal>
        </Chapter>

        <div className="border-t border-border" />

        <Chapter
          id="results"
          number="04"
          eyebrow="Results"
          title="From confusion to clarity — at scale."
          intro="Design-to-production cycles dropped to about five days, more than 60% faster."
        >
          <StatCounters
            stats={[
              { target: 5, suffix: "M", label: "Customers", note: "on the platform" },
              { target: 11, label: "Countries", note: "10+ partner rollouts" },
              { target: 4, decimals: 1, suffix: "/5", label: "Partner CSAT", note: "across 5 partners" },
              { target: 40, prefix: "~", suffix: "%", label: "Less custom work", note: "per partner" },
            ]}
          />
          <Reveal className="mt-10">
            <div className="grid sm:grid-cols-2 gap-4">
              {["It is easy to use", "Great system"].map((quote) => (
                <figure key={quote} className="rounded-lg border border-border bg-card p-6">
                  <blockquote className="text-xl font-serif text-foreground">"{quote}"</blockquote>
                  <figcaption className="text-xs font-sans text-muted-foreground mt-2">Partner user feedback</figcaption>
                </figure>
              ))}
            </div>
          </Reveal>
        </Chapter>

        <div className="border-t border-border" />

        <Chapter id="learnings" number="05" eyebrow="What I learned" title="Workflows matter more than screens.">
          <Takeaways
            items={[
              {
                title: "Workflows beat screens",
                text: "A beautiful interface means nothing if people can't complete their tasks.",
              },
              {
                title: "Make complexity manageable, not hidden",
                text: "In complex systems the job isn't making things pretty — it's making complexity feel manageable.",
              },
              {
                title: "Design for scale from day one",
                text: "Balancing user needs, business requirements and technical constraints across partners and markets is what makes the work last.",
              },
            ]}
          />
          <Reveal className="mt-12">
            <blockquote className="border-l-2 border-primary pl-6 max-w-3xl">
              <p className="text-xl md:text-2xl font-serif text-foreground leading-relaxed">
                "This wasn't just about improving the UI — it was about redesigning how people interact with
                a complex system."
              </p>
            </blockquote>
          </Reveal>
        </Chapter>

        <div className="border-t border-border" />

        <CaseStudyEnd slug="aspin" />
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

export default FeaturedCaseStudy;
