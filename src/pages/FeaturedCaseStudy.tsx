import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import ImageLightbox from "@/components/portfolio/ImageLightbox";

import aspinBeforeMobile from "@/assets/aspin-before-mobile.png";
import aspinBeforeShowcase from "@/assets/aspin-before-showcase.png";
import aspinBeforeDesktop from "@/assets/aspin-before-desktop.png";
import aspinAfterShowcase from "@/assets/aspin-after-showcase.png";
import aspinBeforeInteriorCustomer from "@/assets/aspin-before-interior-customer.png";
import aspinBeforeInteriorClaims from "@/assets/aspin-before-interior-claims.png";
import aspinAfterInteriorProfile from "@/assets/aspin-after-interior-profile.png";
import aspinAfterInteriorPolicies from "@/assets/aspin-after-interior-policies.png";
import aspinAfterInteriorClaims from "@/assets/aspin-after-interior-claims.png";

const beforeImages = [
  { src: aspinBeforeDesktop, alt: "ASPIN Desktop — Before Redesign" },
  { src: aspinBeforeMobile, alt: "ASPIN Mobile — Before Redesign" },
  { src: aspinBeforeShowcase, alt: "ASPIN Multi-Device — Before Redesign" },
];

const beforeInteriorImages = [
  { src: aspinBeforeInteriorCustomer, alt: "Customer Details — Before Redesign" },
  { src: aspinBeforeInteriorClaims, alt: "Claims Dashboard — Before Redesign" },
];

const afterImages = [
  { src: aspinAfterShowcase, alt: "ASPIN Redesigned Landing Page — Multi-Device" },
];

const afterInteriorImages = [
  { src: aspinAfterInteriorProfile, alt: "Customer Profile — After Redesign" },
  { src: aspinAfterInteriorPolicies, alt: "Customer Policies — After Redesign" },
  { src: aspinAfterInteriorClaims, alt: "Claims Dashboard — After Redesign" },
];

const allImages = [...beforeImages, ...beforeInteriorImages, ...afterImages, ...afterInteriorImages];

const FeaturedCaseStudy = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-5xl mx-auto px-6 md:px-12 lg:px-24 h-14 flex items-center justify-between">
          <Link
            to="/#work"
            className="flex items-center gap-2 text-sm font-sans text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to portfolio
          </Link>
          <span className="text-[10px] font-sans font-medium tracking-[0.2em] uppercase text-primary">
            Featured Case Study
          </span>
        </div>
      </nav>

      <main className="pt-14">
        {/* ───────── Hero ───────── */}
        <section className="py-20 md:py-32 px-6 md:px-12 lg:px-24 max-w-5xl mx-auto">
          <span className="text-[10px] font-sans font-medium tracking-[0.25em] uppercase text-primary block mb-6">
            Featured · Case Study
          </span>
          <h1 className="text-4xl md:text-6xl font-serif text-foreground leading-[1.1] mb-6">
            Redesigning ASPIN —<br className="hidden md:block" />
            Making a Complex Insurance<br className="hidden md:block" />
            Platform Feel Simple
          </h1>
          <p className="text-lg md:text-xl font-sans text-muted-foreground leading-relaxed max-w-3xl">
            ASPIN was a powerful insurance platform — but using it felt complex and unclear.
            This is the story of how I rethought workflows, simplified communication,
            and restored clarity for users across multiple partners.
          </p>
        </section>

        <div className="border-t border-border" />

        {/* ───────── 1. Opening ───────── */}
        <section className="py-16 md:py-20 px-6 md:px-12 lg:px-24 max-w-5xl mx-auto">
          <div className="max-w-3xl">
            <p className="text-xs font-sans font-medium tracking-[0.15em] uppercase text-primary mb-4">
              The Platform
            </p>
            <p className="text-base md:text-lg font-sans text-muted-foreground leading-relaxed mb-6">
              ASPIN is the core insurance administration platform built by Inclusivity Solutions.
              It powers onboarding, policy management, claims, and payments across multiple
              insurance partners in emerging markets — serving millions of users who often
              interact with insurance for the first time.
            </p>
            <p className="text-base md:text-lg font-sans text-muted-foreground leading-relaxed">
              The platform is critical infrastructure — but over time, it had grown around
              system logic rather than user needs. What started as a functional backend tool
              had become the primary interface for partner operations, without being designed for that role.
            </p>
          </div>
        </section>

        <div className="border-t border-border" />

        {/* ───────── 2. The Problem ───────── */}
        <section className="py-16 md:py-20 px-6 md:px-12 lg:px-24 max-w-5xl mx-auto">
          <div className="max-w-3xl mb-12">
            <p className="text-xs font-sans font-medium tracking-[0.15em] uppercase text-primary mb-4">
              The Problem
            </p>
            <h2 className="text-2xl md:text-3xl font-serif text-foreground leading-tight mb-6">
              Users had to figure out the system —
              instead of the system guiding them.
            </h2>
            <div className="space-y-4 text-base font-sans text-muted-foreground leading-relaxed">
              <p>
                The interface was cluttered and data-heavy. Workflows were fragmented across
                disconnected screens. Users couldn't easily find what they needed or understand
                what to do next.
              </p>
              <p>
                There was no brand representation, no responsive design, and no clear communication
                of what ASPIN could actually do. The platform felt like a database with a login screen —
                not a product.
              </p>
            </div>
          </div>

          {/* Problem bullets */}
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl">
            {[
              "No brand representation or visual identity",
              "Not responsive — unusable on mobile devices",
              "No communication of platform capabilities",
              "No cross-selling (e.g., API integrations)",
              "Design not appealing or user-friendly",
              "User experience not considered in the architecture",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-destructive shrink-0 mt-2" />
                <span className="text-sm font-sans text-muted-foreground leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ───────── Before Screenshots ───────── */}
        <section className="py-12 px-6 md:px-12 lg:px-24 max-w-5xl mx-auto">
          <p className="text-xs font-sans font-medium tracking-[0.15em] uppercase text-muted-foreground mb-6">
            Before — The Existing Experience
          </p>
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {beforeImages.map((img, i) => (
              <button
                key={i}
                onClick={() => setLightboxIndex(i)}
                className="group relative rounded-lg border border-border overflow-hidden bg-card hover:border-primary/40 transition-all hover:shadow-lg cursor-pointer text-left"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <p className="text-xs font-sans text-muted-foreground px-3 py-2 bg-card border-t border-border">
                  {img.alt}
                </p>
              </button>
            ))}
          </div>

          <p className="text-xs font-sans font-medium tracking-[0.15em] uppercase text-muted-foreground mb-6">
            Before — Inside the Platform
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {beforeInteriorImages.map((img, i) => (
              <button
                key={i}
                onClick={() => setLightboxIndex(beforeImages.length + i)}
                className="group relative rounded-lg border border-border overflow-hidden bg-card hover:border-primary/40 transition-all hover:shadow-lg cursor-pointer text-left"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <p className="text-xs font-sans text-muted-foreground px-3 py-2 bg-card border-t border-border">
                  {img.alt}
                </p>
              </button>
            ))}
          </div>
        </section>

        <div className="border-t border-border" />

        {/* ───────── 3. The Realization ───────── */}
        <section className="py-16 md:py-20 px-6 md:px-12 lg:px-24 max-w-5xl mx-auto">
          <div className="max-w-3xl">
            <p className="text-xs font-sans font-medium tracking-[0.15em] uppercase text-primary mb-4">
              The Turning Point
            </p>
            <blockquote className="text-xl md:text-2xl font-serif text-foreground/90 leading-relaxed italic mb-8">
              "The problem wasn't just the interface — it was how the product was structured."
            </blockquote>
            <div className="space-y-4 text-base font-sans text-muted-foreground leading-relaxed">
              <p>
                Users think in tasks — not system modules. They want to "create a policy" or
                "check a claim," not navigate a taxonomy of database tables.
                The platform had no concept of user workflows. Complexity wasn't managed — it was exposed.
              </p>
              <p>
                This realization shifted the entire framing: from fixing the UI layer to
                rethinking how users interact with the system at a structural level.
              </p>
            </div>
          </div>
        </section>

        <div className="border-t border-border" />

        {/* ───────── 4. My Role ───────── */}
        <section className="py-16 md:py-20 px-6 md:px-12 lg:px-24 max-w-5xl mx-auto">
          <div className="max-w-3xl">
            <p className="text-xs font-sans font-medium tracking-[0.15em] uppercase text-primary mb-4">
              My Role
            </p>
            <p className="text-base md:text-lg font-sans text-muted-foreground leading-relaxed">
              I stepped in as <span className="text-foreground font-medium">Frontend Tech Lead</span>,
              working across UX and product design. I was responsible for improving the experience
              end-to-end — from understanding what was broken, to redesigning workflows, to
              implementing changes in code. This wasn't a handoff role — I owned the thinking
              and the execution.
            </p>
          </div>
        </section>

        <div className="border-t border-border" />

        {/* ───────── 5. The Approach ───────── */}
        <section className="py-16 md:py-20 px-6 md:px-12 lg:px-24 max-w-5xl mx-auto">
          <div className="max-w-3xl mb-12">
            <p className="text-xs font-sans font-medium tracking-[0.15em] uppercase text-primary mb-4">
              The Approach
            </p>
            <h2 className="text-2xl md:text-3xl font-serif text-foreground leading-tight mb-6">
              From system-centric to workflow-driven design
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl">
            {[
              {
                title: "Shifting the mental model",
                text: "Instead of organizing screens around data structures, I restructured the experience around what users actually do — their tasks, decisions, and workflows.",
              },
              {
                title: "Simplifying product communication",
                text: "The platform needed to explain itself. I introduced clear brand representation and communicated ASPIN's capabilities — including API integrations — so partners could understand the full value.",
              },
              {
                title: "Structuring user journeys",
                text: "I mapped out the core flows — Profile, Policies, Claims, Payments, Quotes — and designed each as a self-contained journey with clear entry points and actions.",
              },
              {
                title: "Designing for scale",
                text: "ASPIN serves multiple partners across different markets. Every design decision needed to flex across different contexts while remaining consistent and predictable.",
              },
            ].map((item, i) => (
              <div key={i} className="space-y-2">
                <h3 className="text-sm font-sans font-semibold text-foreground">{item.title}</h3>
                <p className="text-sm font-sans text-muted-foreground leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="border-t border-border" />

        {/* ───────── 6. The Transformation ───────── */}
        <section className="py-16 md:py-20 px-6 md:px-12 lg:px-24 max-w-5xl mx-auto">
          <div className="max-w-3xl mb-12">
            <p className="text-xs font-sans font-medium tracking-[0.15em] uppercase text-primary mb-4">
              The Transformation
            </p>
            <h2 className="text-2xl md:text-3xl font-serif text-foreground leading-tight mb-8">
              Instead of users adapting to the system,<br className="hidden md:block" />
              the system now adapts to how users work.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-4xl">
            {/* Before */}
            <div>
              <p className="text-xs font-sans font-medium tracking-[0.15em] uppercase text-muted-foreground mb-4">Before</p>
              <ul className="space-y-3">
                {[
                  "Fragmented workflows across disconnected screens",
                  "Dense tables with no hierarchy or guidance",
                  "Unclear actions — users didn't know what to do next",
                  "No responsive design or brand identity",
                  "System designed around data, not users",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm font-sans text-muted-foreground leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-destructive/60 shrink-0 mt-1.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* After */}
            <div>
              <p className="text-xs font-sans font-medium tracking-[0.15em] uppercase text-primary mb-4">After</p>
              <ul className="space-y-3">
                {[
                  "Structured flows: Profile, Policies, Claims, Payments, Quotes",
                  "Clear actions: Generate Policy, Create Quote, Submit Claim",
                  "Better hierarchy, navigation, and visual structure",
                  "Fully responsive across devices",
                  "Strong brand representation and capability communication",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm font-sans text-muted-foreground leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ───────── After Screenshot ───────── */}
        <section className="py-12 px-6 md:px-12 lg:px-24 max-w-5xl mx-auto">
          <p className="text-xs font-sans font-medium tracking-[0.15em] uppercase text-primary mb-6">
            After — The Redesigned Experience
          </p>
          <button
            onClick={() => setLightboxIndex(beforeImages.length)}
            className="group relative rounded-lg border border-border overflow-hidden bg-card hover:border-primary/40 transition-all hover:shadow-lg cursor-pointer text-left w-full max-w-3xl"
          >
            <div className="aspect-[16/10] overflow-hidden">
              <img
                src={aspinAfterShowcase}
                alt="ASPIN Redesigned Landing Page"
                className="w-full h-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-300"
                loading="lazy"
              />
            </div>
            <p className="text-xs font-sans text-muted-foreground px-3 py-2 bg-card border-t border-border">
              ASPIN Redesigned Landing Page — Multi-Device Preview
            </p>
          </button>
        </section>

        <div className="border-t border-border" />

        {/* ───────── 7. The Product Shift ───────── */}
        <section className="py-16 md:py-20 px-6 md:px-12 lg:px-24 max-w-5xl mx-auto">
          <div className="max-w-3xl mb-10">
            <p className="text-xs font-sans font-medium tracking-[0.15em] uppercase text-primary mb-4">
              The Deeper Change
            </p>
            <h2 className="text-2xl md:text-3xl font-serif text-foreground leading-tight mb-6">
              This wasn't a redesign — it was a product shift.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl">
            {[
              { from: "Data-driven UI", to: "Workflow-driven experience", description: "Screens organized around user tasks, not database tables." },
              { from: "Passive screens", to: "Actionable system", description: "Every screen now tells users what they can do next." },
              { from: "Complexity", to: "Clarity", description: "Information is structured, progressive, and context-aware." },
            ].map((shift, i) => (
              <div key={i} className="space-y-3">
                <div className="text-sm font-sans">
                  <span className="text-muted-foreground line-through">{shift.from}</span>
                  <span className="text-foreground mx-2">→</span>
                  <span className="text-foreground font-medium">{shift.to}</span>
                </div>
                <p className="text-sm font-sans text-muted-foreground leading-relaxed">{shift.description}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="border-t border-border" />

        {/* ───────── 8. Validation ───────── */}
        <section className="py-16 md:py-20 px-6 md:px-12 lg:px-24 max-w-5xl mx-auto">
          <div className="max-w-3xl">
            <p className="text-xs font-sans font-medium tracking-[0.15em] uppercase text-primary mb-4">
              Validation
            </p>
            <div className="space-y-6 mb-8">
              <blockquote className="border-l-2 border-primary pl-6">
                <p className="text-lg md:text-xl font-serif text-foreground/80 italic">"It is easy to use"</p>
              </blockquote>
              <blockquote className="border-l-2 border-primary pl-6">
                <p className="text-lg md:text-xl font-serif text-foreground/80 italic">"Great system"</p>
              </blockquote>
            </div>
            <p className="text-base font-sans text-muted-foreground leading-relaxed">
              These aren't just compliments — they're signals. When users describe a complex
              insurance platform as "easy to use," it validates that the redesign reduced friction
              and improved usability at a fundamental level.
            </p>
          </div>
        </section>

        <div className="border-t border-border" />

        {/* ───────── 9. Impact ───────── */}
        <section className="py-16 md:py-20 px-6 md:px-12 lg:px-24 max-w-5xl mx-auto">
          <div className="max-w-3xl mb-10">
            <p className="text-xs font-sans font-medium tracking-[0.15em] uppercase text-primary mb-4">
              Impact
            </p>
            <h2 className="text-2xl md:text-3xl font-serif text-foreground leading-tight mb-8">
              From confusion to clarity — across the entire platform.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-3xl">
            {[
              { label: "Usability", detail: "Significantly improved — users navigate with confidence" },
              { label: "Workflows", detail: "Clearer, structured, and aligned with real user tasks" },
              { label: "Product Understanding", detail: "Partners and users now understand what ASPIN can do" },
              { label: "Scalability", detail: "Stronger foundation for serving multiple partners across markets" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2" />
                <div>
                  <span className="text-sm font-sans font-medium text-foreground">{item.label}</span>
                  <p className="text-sm font-sans text-muted-foreground leading-relaxed">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="border-t border-border" />

        {/* ───────── 10. Reflection ───────── */}
        <section className="py-16 md:py-20 px-6 md:px-12 lg:px-24 max-w-5xl mx-auto">
          <div className="max-w-3xl">
            <p className="text-xs font-sans font-medium tracking-[0.15em] uppercase text-primary mb-4">
              Reflection
            </p>
            <blockquote className="text-xl md:text-2xl font-serif text-foreground/80 leading-relaxed italic mb-8">
              "This project was not just about improving UI — it was about redesigning
              how users interact with a complex system."
            </blockquote>
            <div className="space-y-4 text-base font-sans text-muted-foreground leading-relaxed">
              <p>
                The most important lesson was that <span className="text-foreground font-medium">workflows matter
                more than screens</span>. A beautiful interface means nothing if users can't
                complete their tasks. And in complex systems, the design challenge isn't
                making things pretty — it's making complexity feel manageable.
              </p>
              <p>
                Balancing user needs, business requirements, and technical constraints
                is where real product design happens. And designing for scalability —
                across partners, markets, and evolving requirements — is what makes
                the work lasting.
              </p>
            </div>
          </div>
        </section>

        {/* ───────── Key Takeaway ───────── */}
        <section className="py-16 md:py-20 px-6 md:px-12 lg:px-24 max-w-5xl mx-auto bg-muted/30">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xs font-sans font-medium tracking-[0.15em] uppercase text-primary mb-6">
              Key Takeaway
            </p>
            <p className="text-lg md:text-xl font-serif text-foreground leading-relaxed">
              I don't just design or build features — I step into complex product environments,
              identify what's breaking trust, and realign delivery, UX, and engineering
              to restore momentum.
            </p>
          </div>
        </section>

        {/* Back link */}
        <section className="py-12 px-6 md:px-12 lg:px-24 max-w-5xl mx-auto">
          <Link
            to="/#work"
            className="inline-flex items-center gap-2 text-sm font-sans font-medium text-primary hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to all case studies
          </Link>
        </section>
      </main>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <ImageLightbox
          images={allImages}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </div>
  );
};

export default FeaturedCaseStudy;
