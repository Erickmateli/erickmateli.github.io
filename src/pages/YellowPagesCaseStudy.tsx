import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import ImageLightbox from "@/components/portfolio/ImageLightbox";

import ypBeforeHomepage from "@/assets/yp-before-homepage.jpg";
import ypAfterShowcase from "@/assets/yp-after-showcase.jpg";
import ypWireframes from "@/assets/yp-wireframes.png";
import ypAnalytics2018 from "@/assets/yp-analytics-2018.jpg";
import ypAnalytics2020 from "@/assets/yp-analytics-2020.jpg";

const beforeImages = [
  { src: ypBeforeHomepage, alt: "Yellow Pages Kenya — Original Homepage" },
];

const afterImages = [
  { src: ypAfterShowcase, alt: "Yellow Pages — Redesigned Platform Overview" },
];

const processImages = [
  { src: ypWireframes, alt: "Wireframes — Homepage, Search Results & Business Detail" },
];

const analyticsImages = [
  { src: ypAnalytics2018, alt: "Google Analytics — 2018 (Before Redesign)" },
  { src: ypAnalytics2020, alt: "Google Analytics — 2019–2020 (After Redesign)" },
];

const allImages = [...beforeImages, ...afterImages, ...processImages, ...analyticsImages];

const YellowPagesCaseStudy = () => {
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
            Case Study
          </span>
        </div>
      </nav>

      <main className="pt-14">
        {/* ───────── Hero ───────── */}
        <section className="py-20 md:py-32 px-6 md:px-12 lg:px-24 max-w-5xl mx-auto">
          <span className="text-[10px] font-sans font-medium tracking-[0.25em] uppercase text-primary block mb-6">
            Case Study · Yellow Pages
          </span>
          <h1 className="text-4xl md:text-6xl font-serif text-foreground leading-[1.1] mb-6">
            Redesigning Yellow Pages Kenya —<br className="hidden md:block" />
            Transforming a Legacy Directory<br className="hidden md:block" />
            into a Modern Search Experience
          </h1>
          <p className="text-lg md:text-xl font-sans text-muted-foreground leading-relaxed max-w-3xl">
            Yellow Pages is a business directory platform used across six countries.
            The product needed to evolve from a cluttered, slow legacy site into a fast,
            task-driven search experience — and the redesign delivered measurable results
            across every market it launched in.
          </p>
        </section>

        <div className="border-t border-border" />

        {/* ───────── Context ───────── */}
        <section className="py-16 md:py-20 px-6 md:px-12 lg:px-24 max-w-5xl mx-auto">
          <div className="max-w-3xl">
            <p className="text-xs font-sans font-medium tracking-[0.15em] uppercase text-primary mb-4">
              Context
            </p>
            <p className="text-base md:text-lg font-sans text-muted-foreground leading-relaxed mb-6">
              Yellow Pages is a business directory platform connecting users to local businesses
              across Kenya, Tanzania, Mozambique, Angola, Cape Verde, and East Timor.
              It's a simple premise — help people find and contact businesses — but the platform
              had been built in an era of different expectations.
            </p>
            <p className="text-base md:text-lg font-sans text-muted-foreground leading-relaxed">
              As user behavior shifted toward mobile-first, fast search experiences,
              Yellow Pages needed to evolve. The gap between what users expected and
              what the platform delivered was widening — and the metrics showed it.
            </p>
          </div>
        </section>

        <div className="border-t border-border" />

        {/* ───────── The Problem ───────── */}
        <section className="py-16 md:py-20 px-6 md:px-12 lg:px-24 max-w-5xl mx-auto">
          <div className="max-w-3xl mb-12">
            <p className="text-xs font-sans font-medium tracking-[0.15em] uppercase text-primary mb-4">
              The Problem
            </p>
            <h2 className="text-2xl md:text-3xl font-serif text-foreground leading-tight mb-6">
              Users came with clear intent — find a business fast.
              But the product created friction at every step.
            </h2>
            <div className="space-y-4 text-base font-sans text-muted-foreground leading-relaxed">
              <p>
                The existing site was cluttered and outdated. Load times were slow.
                The mobile experience was poor — bordering on unusable. Bounce rates were high,
                engagement was low, and users struggled to complete the most basic task:
                finding a business and contacting them.
              </p>
              <p>
                The platform wasn't designed around user intent — it was designed around
                content display. And the result was a product that actively worked against
                the people trying to use it.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl">
            {[
              "Cluttered, outdated interface with no visual hierarchy",
              "Slow load times frustrating users before they even searched",
              "Poor mobile experience — not responsive",
              "High bounce rate and low session engagement",
              "Search was buried and unclear",
              "No clear path from search to contact",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-destructive shrink-0 mt-2" />
                <span className="text-sm font-sans text-muted-foreground leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ───────── Before Screenshot ───────── */}
        <section className="py-12 px-6 md:px-12 lg:px-24 max-w-5xl mx-auto">
          <p className="text-xs font-sans font-medium tracking-[0.15em] uppercase text-muted-foreground mb-6">
            Before — The Original Experience
          </p>
          <button
            onClick={() => setLightboxIndex(0)}
            className="group relative rounded-lg border border-border overflow-hidden bg-card hover:border-primary/40 transition-all hover:shadow-lg cursor-pointer text-left w-full max-w-2xl"
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={ypBeforeHomepage}
                alt="Yellow Pages Kenya — Original Homepage"
                className="w-full h-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-300"
                loading="lazy"
              />
            </div>
            <p className="text-xs font-sans text-muted-foreground px-3 py-2 bg-card border-t border-border">
              Yellow Pages Kenya — Original Homepage (2018)
            </p>
          </button>
        </section>

        <div className="border-t border-border" />

        {/* ───────── My Role ───────── */}
        <section className="py-16 md:py-20 px-6 md:px-12 lg:px-24 max-w-5xl mx-auto">
          <div className="max-w-3xl">
            <p className="text-xs font-sans font-medium tracking-[0.15em] uppercase text-primary mb-4">
              My Role
            </p>
            <p className="text-base md:text-lg font-sans text-muted-foreground leading-relaxed">
              I led this project as <span className="text-foreground font-medium">UX Design Lead and Frontend Developer</span>,
              working with a cross-functional team spanning design, development, and content.
              I was responsible for rethinking the core user journeys, redesigning the interface,
              and building a code-based prototype that could be tested with real interactions
              before full development began.
            </p>
          </div>
        </section>

        <div className="border-t border-border" />

        {/* ───────── The Approach ───────── */}
        <section className="py-16 md:py-20 px-6 md:px-12 lg:px-24 max-w-5xl mx-auto">
          <div className="max-w-3xl mb-12">
            <p className="text-xs font-sans font-medium tracking-[0.15em] uppercase text-primary mb-4">
              The Approach
            </p>
            <h2 className="text-2xl md:text-3xl font-serif text-foreground leading-tight mb-6">
              Understanding the problem before designing the solution
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-10 max-w-4xl">
            {[
              {
                title: "Understanding the problem",
                text: "I started with secondary research — analyzing competitor products, internal analytics, and existing user feedback. The goal was to identify where the friction points were, not just what looked outdated.",
              },
              {
                title: "Defining the core journey",
                text: "The product's purpose distilled into three steps: Search → Find → Contact. Every design decision was measured against whether it accelerated or hindered this flow.",
              },
              {
                title: "Rapid iteration",
                text: "Wireframes were created in Figma early to validate structure before investing in visual design. Fast feedback loops with stakeholders ensured alignment before development.",
              },
              {
                title: "Code-based prototyping",
                text: "Instead of static mockups, I built an interactive prototype using HTML, CSS, JavaScript, and Bootstrap — realistic enough to feel like the real product. This accelerated decision-making and reduced ambiguity.",
              },
            ].map((item, i) => (
              <div key={i} className="space-y-2">
                <h3 className="text-sm font-sans font-semibold text-foreground">{item.title}</h3>
                <p className="text-sm font-sans text-muted-foreground leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ───────── Wireframes ───────── */}
        <section className="py-12 px-6 md:px-12 lg:px-24 max-w-5xl mx-auto">
          <p className="text-xs font-sans font-medium tracking-[0.15em] uppercase text-muted-foreground mb-6">
            Process — Wireframes (Figma)
          </p>
          <button
            onClick={() => setLightboxIndex(beforeImages.length + afterImages.length)}
            className="group relative rounded-lg border border-border overflow-hidden bg-card hover:border-primary/40 transition-all hover:shadow-lg cursor-pointer text-left w-full max-w-3xl"
          >
            <div className="aspect-[16/10] overflow-hidden">
              <img
                src={ypWireframes}
                alt="Wireframes"
                className="w-full h-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-300"
                loading="lazy"
              />
            </div>
            <p className="text-xs font-sans text-muted-foreground px-3 py-2 bg-card border-t border-border">
              Wireframes — Homepage, Search Results & Business Detail Page
            </p>
          </button>
        </section>

        <div className="border-t border-border" />

        {/* ───────── Before vs After ───────── */}
        <section className="py-16 md:py-20 px-6 md:px-12 lg:px-24 max-w-5xl mx-auto">
          <div className="max-w-3xl mb-12">
            <p className="text-xs font-sans font-medium tracking-[0.15em] uppercase text-primary mb-4">
              The Transformation
            </p>
            <h2 className="text-2xl md:text-3xl font-serif text-foreground leading-tight mb-8">
              From a cluttered directory to a clear, task-driven experience.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-4xl">
            <div>
              <p className="text-xs font-sans font-medium tracking-[0.15em] uppercase text-muted-foreground mb-4">Before</p>
              <ul className="space-y-3">
                {[
                  "Cluttered homepage with competing elements",
                  "Search buried below banners and promotions",
                  "Poor navigation and information hierarchy",
                  "Slow, non-responsive experience",
                  "No clear user journey or call-to-action",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm font-sans text-muted-foreground leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-destructive/60 shrink-0 mt-1.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-sans font-medium tracking-[0.15em] uppercase text-primary mb-4">After</p>
              <ul className="space-y-3">
                {[
                  "Clear, prominent search as the hero element",
                  "Improved layout with strong visual hierarchy",
                  "Fully responsive design across all devices",
                  "Action-oriented UX: Search → Find → Contact",
                  "Add Business CTA and quick-click categories",
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
            <div className="aspect-[16/9] overflow-hidden">
              <img
                src={ypAfterShowcase}
                alt="Yellow Pages — Redesigned Platform"
                className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-300"
                loading="lazy"
              />
            </div>
            <p className="text-xs font-sans text-muted-foreground px-3 py-2 bg-card border-t border-border">
              Yellow Pages — Redesigned Homepage, Search Results & Business Detail
            </p>
          </button>
        </section>

        <div className="border-t border-border" />

        {/* ───────── Key Design Improvements ───────── */}
        <section className="py-16 md:py-20 px-6 md:px-12 lg:px-24 max-w-5xl mx-auto">
          <div className="max-w-3xl mb-12">
            <p className="text-xs font-sans font-medium tracking-[0.15em] uppercase text-primary mb-4">
              Key Design Improvements
            </p>
            <h2 className="text-2xl md:text-3xl font-serif text-foreground leading-tight mb-6">
              Three core areas of transformation
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl">
            <div className="space-y-3">
              <h3 className="text-sm font-sans font-semibold text-foreground">Homepage Redesign</h3>
              <p className="text-sm font-sans text-muted-foreground leading-relaxed">
                Clear search as the primary element on first load. Added "Add Your Business"
                CTA for business owners. Quick-click categories both above and below the fold
                to give users multiple entry points.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="text-sm font-sans font-semibold text-foreground">Search Experience</h3>
              <p className="text-sm font-sans text-muted-foreground leading-relaxed">
                Sticky navigation for easy re-search when results weren't relevant.
                Category and location filters for faster filtering.
                Business CTAs (Call, Email, Website) directly on result cards for immediate action.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="text-sm font-sans font-semibold text-foreground">Business Detail Page</h3>
              <p className="text-sm font-sans text-muted-foreground leading-relaxed">
                Well-structured general information section for readability.
                Multiple contact numbers giving users options. Social share buttons
                for easier information spread. Map integration for location context.
              </p>
            </div>
          </div>
        </section>

        <div className="border-t border-border" />

        {/* ───────── Product Thinking ───────── */}
        <section className="py-16 md:py-20 px-6 md:px-12 lg:px-24 max-w-5xl mx-auto">
          <div className="max-w-3xl mb-10">
            <p className="text-xs font-sans font-medium tracking-[0.15em] uppercase text-primary mb-4">
              Product Thinking
            </p>
            <h2 className="text-2xl md:text-3xl font-serif text-foreground leading-tight mb-6">
              From browsing-heavy to task-driven.
            </h2>
            <p className="text-base font-sans text-muted-foreground leading-relaxed mb-8">
              The deeper shift wasn't visual — it was structural. The product evolved from
              a directory you browse to a tool you use. Every decision was oriented around
              helping users find and contact businesses faster.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl">
            {[
              { from: "Browsing-heavy", to: "Task-driven", description: "Users don't browse directories — they search with intent. The product was restructured around that reality." },
              { from: "Content display", to: "Actionable results", description: "Every search result now includes direct contact options — call, email, or visit — reducing steps to conversion." },
              { from: "Desktop-first", to: "Responsive everywhere", description: "A fully responsive design ensured the experience worked across devices and markets." },
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

        {/* ───────── Impact ───────── */}
        <section className="py-16 md:py-20 px-6 md:px-12 lg:px-24 max-w-5xl mx-auto">
          <div className="max-w-3xl mb-10">
            <p className="text-xs font-sans font-medium tracking-[0.15em] uppercase text-primary mb-4">
              Impact
            </p>
            <h2 className="text-2xl md:text-3xl font-serif text-foreground leading-tight mb-8">
              The numbers told the story.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mb-12">
            <div>
              <p className="text-xs font-sans font-medium tracking-[0.15em] uppercase text-muted-foreground mb-4">2018 — Before Redesign</p>
              <div className="space-y-4">
                {[
                  { metric: "Users", value: "472K", note: "Low user base due to cluttered experience" },
                  { metric: "Sessions", value: "631K", note: "Low engagement per visit" },
                  { metric: "Bounce Rate", value: "33.78%", note: "High — slow loads drove users away" },
                  { metric: "Session Duration", value: "1m 57s", note: "Users left before finding what they needed" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-destructive/60 shrink-0 mt-2" />
                    <div>
                      <span className="text-sm font-sans font-medium text-foreground">{item.metric}: {item.value}</span>
                      <p className="text-xs font-sans text-muted-foreground">{item.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-sans font-medium tracking-[0.15em] uppercase text-primary mb-4">2019–2020 — After Redesign</p>
              <div className="space-y-4">
                {[
                  { metric: "Users", value: "1.7M", note: "260% increase — mobile usability unlocked new audiences" },
                  { metric: "Sessions", value: "2.3M", note: "264% increase in total sessions" },
                  { metric: "Bounce Rate", value: "24.43%", note: "Dropped 9.35 points — users found what they needed" },
                  { metric: "Session Duration", value: "1m 52s", note: "Maintained despite 3.6× more users" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2" />
                    <div>
                      <span className="text-sm font-sans font-medium text-foreground">{item.metric}: {item.value}</span>
                      <p className="text-xs font-sans text-muted-foreground">{item.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Analytics screenshots */}
          <p className="text-xs font-sans font-medium tracking-[0.15em] uppercase text-muted-foreground mb-6">
            Google Analytics — Before & After Comparison
          </p>
          <div className="grid md:grid-cols-2 gap-4 max-w-4xl">
            {analyticsImages.map((img, i) => (
              <button
                key={i}
                onClick={() => setLightboxIndex(beforeImages.length + afterImages.length + processImages.length + i)}
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

        {/* ───────── Scale ───────── */}
        <section className="py-16 md:py-20 px-6 md:px-12 lg:px-24 max-w-5xl mx-auto">
          <div className="max-w-3xl">
            <p className="text-xs font-sans font-medium tracking-[0.15em] uppercase text-primary mb-4">
              Scale
            </p>
            <h2 className="text-2xl md:text-3xl font-serif text-foreground leading-tight mb-6">
              One solution, six countries.
            </h2>
            <p className="text-base font-sans text-muted-foreground leading-relaxed mb-6">
              The redesigned platform was rolled out across Kenya, Tanzania, Mozambique, Angola,
              Cape Verde, and East Timor. Each market has different user behaviors and connectivity
              constraints — the design needed to work everywhere, not just in ideal conditions.
            </p>
            <p className="text-base font-sans text-muted-foreground leading-relaxed">
              This meant prioritizing performance, simplicity, and clarity over visual complexity.
              A fast, usable experience in Nairobi needed to be equally fast and usable in Maputo.
            </p>
          </div>
        </section>

        <div className="border-t border-border" />

        {/* ───────── Key Learnings ───────── */}
        <section className="py-16 md:py-20 px-6 md:px-12 lg:px-24 max-w-5xl mx-auto">
          <div className="max-w-3xl mb-10">
            <p className="text-xs font-sans font-medium tracking-[0.15em] uppercase text-primary mb-4">
              Key Learnings
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl">
            {[
              {
                title: "Clarity beats complexity",
                text: "Users don't need more features — they need fewer decisions. A clear search bar beat a page full of options.",
              },
              {
                title: "Performance impacts retention",
                text: "Slow load times aren't just a technical problem — they're a UX problem. Speed is a design decision.",
              },
              {
                title: "Design should align with user intent",
                text: "Users came to find a business and contact them. Every design element that didn't serve that intent was friction.",
              },
              {
                title: "Early prototyping accelerates decisions",
                text: "Building a code-based prototype instead of static mockups meant stakeholders could feel the experience — not just see it.",
              },
              {
                title: "Scale requires simplicity",
                text: "Designing for six countries with different connectivity and behaviors means the core experience must be simple, fast, and resilient.",
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

        {/* ───────── Reflection ───────── */}
        <section className="py-16 md:py-20 px-6 md:px-12 lg:px-24 max-w-5xl mx-auto">
          <div className="max-w-3xl">
            <p className="text-xs font-sans font-medium tracking-[0.15em] uppercase text-primary mb-4">
              Reflection
            </p>
            <blockquote className="text-xl md:text-2xl font-serif text-foreground/80 leading-relaxed italic mb-8">
              "This project taught me that great UX isn't about adding more —
              it's about removing everything that stands between a user and their goal."
            </blockquote>
            <div className="space-y-4 text-base font-sans text-muted-foreground leading-relaxed">
              <p>
                Yellow Pages reinforced something I carry into every project:
                <span className="text-foreground font-medium"> design should be invisible</span>.
                When users describe a product as "easy" — when they find what they need
                without thinking about the interface — that's the highest form of design success.
              </p>
              <p>
                This project shaped how I think about product design at scale.
                It's not about one market or one screen — it's about building experiences
                that work across contexts, devices, and user expectations.
                Business impact follows when you get the fundamentals right.
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
              I don't just redesign interfaces — I rethink how products serve their users.
              From 472K to 1.7M users, this project proved that clarity, speed, and user-centered
              thinking drive measurable business impact.
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

export default YellowPagesCaseStudy;
