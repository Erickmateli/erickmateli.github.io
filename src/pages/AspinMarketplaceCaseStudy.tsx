import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ExternalLink, ChevronDown, ChevronRight } from "lucide-react";
import { trackEvent } from "@/lib/track-event";

// ─── Scroll-reveal hook ───────────────────────────────────────────────────────
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

// ─── Animated counter hook ────────────────────────────────────────────────────
function useCounter(target: number, suffix: string, decimals = 0, duration = 1400) {
  const [display, setDisplay] = useState("0");
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        obs.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const pct = Math.min((now - start) / duration, 1);
          const ease = 1 - Math.pow(1 - pct, 3);
          const val = ease * target;
          setDisplay(decimals > 0 ? val.toFixed(decimals) : Math.round(val).toString());
          if (pct < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, suffix, decimals, duration]);
  return { ref, display };
}

// ─── Reveal wrapper ───────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ─── Stat card with animated counter ─────────────────────────────────────────
function StatCard({ stat, label, isNumber = false, target = 0, suffix = "", decimals = 0 }: {
  stat: string; label: string; isNumber?: boolean; target?: number; suffix?: string; decimals?: number;
}) {
  const { ref, display } = useCounter(target, suffix, decimals);
  return (
    <div className="p-5 rounded-lg border border-border bg-card hover:border-primary/40 hover:shadow-md transition-all duration-300 group">
      <p className="text-2xl md:text-3xl font-serif text-primary mb-1 group-hover:scale-105 transition-transform origin-left">
        {isNumber ? <span ref={ref}>{display}{suffix}</span> : stat}
      </p>
      <p className="text-xs font-sans text-muted-foreground leading-relaxed">{label}</p>
    </div>
  );
}

// ─── Accordion item ───────────────────────────────────────────────────────────
function AccordionItem({ number, title, text, defaultOpen = false }: {
  number: string; title: string; text: string; defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className={`rounded-lg border transition-all duration-300 ${open ? "border-primary/40 bg-primary/5" : "border-border bg-card hover:border-primary/20"}`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-5 p-5 text-left"
      >
        <span className="text-2xl font-serif text-primary/40 shrink-0 leading-none">{number}</span>
        <span className="text-sm font-sans font-semibold text-foreground flex-1">{title}</span>
        <ChevronDown className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      <div
        style={{
          maxHeight: open ? "400px" : "0px",
          overflow: "hidden",
          transition: "max-height 0.35s ease",
        }}
      >
        <p className="px-5 pb-5 pl-[4.5rem] text-sm font-sans text-muted-foreground leading-relaxed">{text}</p>
      </div>
    </div>
  );
}

// ─── Principle item ───────────────────────────────────────────────────────────
function PrincipleItem({ index, principle, text }: { index: number; principle: string; text: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`border-l-2 pl-6 cursor-pointer transition-all duration-300 ${open ? "border-primary" : "border-primary/30 hover:border-primary/60"}`}
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className={`text-base font-sans font-semibold transition-colors duration-200 ${open ? "text-foreground" : "text-foreground/80"}`}>
          {index}. {principle}
        </h3>
        <ChevronRight className={`w-4 h-4 text-muted-foreground shrink-0 mt-0.5 transition-transform duration-300 ${open ? "rotate-90" : ""}`} />
      </div>
      <div
        style={{
          maxHeight: open ? "300px" : "0px",
          overflow: "hidden",
          transition: "max-height 0.35s ease",
        }}
      >
        <p className="text-sm font-sans text-muted-foreground leading-relaxed mt-3 mb-1">{text}</p>
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
const VERTICALS = [
  {
    key: "motor-tpo",
    label: "Motor TPO",
    price: "KES 7,500–15,000/yr",
    tag: "Mandatory",
    tagColor: "text-primary bg-primary/10",
    text: "Most accessible entry point. Price anchor removes the 'insurance is expensive' assumption before users enter the funnel. Motor TPO is legally mandatory — this creates a captive entry point with known intent.",
    detail: "Cover type selector with plain-language explanation of TPO vs. TPFT vs. Comprehensive. Vehicle make/model/year inputs. Market value tooltip.",
  },
  {
    key: "motor-comp",
    label: "Motor Comp",
    price: "From KES 37,500/yr",
    tag: "3%–7.5% of value",
    tagColor: "text-muted-foreground bg-muted",
    text: "Comprehensive cover built on top of the TPO journey. Users who select this path get a guided value assessment before seeing quotes.",
    detail: "Vehicle valuation tool. Side-by-side TPO vs. Comprehensive cost comparison. Insurer excess and windscreen cover displayed prominently.",
  },
  {
    key: "health",
    label: "Health",
    price: "From KES 1,200/mo",
    tag: "CIC Afya Bora baseline",
    tagColor: "text-muted-foreground bg-muted",
    text: "Family plan builder designed around real Kenyan household structures. SHA context note shown for users already on public cover.",
    detail: "Adults + children count inputs. Inpatient/outpatient toggle. Modular add-ons: dental, optical, maternity. SHA comparison note.",
  },
  {
    key: "home",
    label: "Home",
    price: "Quote required",
    tag: "First to show anchor",
    tagColor: "text-primary bg-primary/10",
    text: "No competitor publicly lists starting prices for home insurance. ASPIN is the first platform to show an approximate starting anchor — resolving the biggest top-of-funnel barrier.",
    detail: "Tenant vs. owner journey split. Contents valuation input. Landlord cover option. Flood/fire exclusion explained in plain language.",
  },
  {
    key: "travel",
    label: "Travel",
    price: "Quote required",
    tag: "First to show anchor",
    tagColor: "text-primary bg-primary/10",
    text: "No competitor publicly lists starting prices for travel insurance. Same first-mover opportunity as Home — showing anchors resolves the 'I have no idea what this costs' barrier.",
    detail: "Africa vs. worldwide toggle. Single trip vs. annual multi-trip. Companion add-on. Medical evacuation coverage shown prominently.",
  },
  {
    key: "business",
    label: "Business",
    price: "From KES 20,000/yr",
    tag: "SME underserved",
    tagColor: "text-muted-foreground bg-muted",
    text: "All four existing competitors underserve SME operators. ASPIN's business vertical is designed specifically for this segment — with WIBA noted as a mandatory employer requirement.",
    detail: "Business type selector. Liability vs. property vs. group cover. Employee count input. WIBA mandatory notice for employers.",
  },
];

const JOURNEY_STEPS = [
  {
    step: "01",
    title: "Tell us what you need",
    subtitle: "~2 minutes · No account required",
    detail: "Structured question set tailored to the chosen product. Contact details captured last — after the quote-generating inputs. This sequencing is deliberate: capturing personal data first signals that the platform wants something from the user before providing value. Reversing it reduces abandonment at the top of the funnel.",
  },
  {
    step: "02",
    title: "Compare real quotes",
    subtitle: "Live pricing · Plain-language exclusions",
    detail: "Live pricing returned from multiple IRA-licensed insurers in a side-by-side view. Motor TPO price spreads between insurers are 15–20% for identical cover — a fact invisible to users who contact insurers separately. Exclusions surfaced clearly in plain language, not buried in a policy document link.",
  },
  {
    step: "03",
    title: "Buy in minutes",
    subtitle: "M-Pesa pre-filled · Instant certificate",
    detail: "M-Pesa payment prompt pre-filled with the phone number collected at step one — removing the re-entry friction that drives measurable drop-off in Kenyan fintech checkout flows. Policy certificate delivered instantly by email. No waiting period. No agent follow-up. Claims process included in confirmation email.",
  },
];

const TRUST_ITEMS = [
  { title: "IRA licence badge — primary placement", text: "Displayed in the hero section, persistent navigation, and checkout — not only the footer. The IRA badge functions as a product feature, not a legal requirement." },
  { title: "Data Protection Act compliance", text: "'Your data is protected under Kenya's Data Protection Act 2019.' Placed on the quote form, citing specific legislation — making it verifiable, not just reassuring." },
  { title: "IRA reform alignment messaging", text: "'We only partner with insurers who comply with IRA claims timeline standards.' Turns a regulatory development into a consumer trust signal." },
  { title: "Expectation setting on every CTA", text: "'This takes about 2 minutes' and 'No payment required yet' appear below every call-to-action — pre-empting the two most common reasons users abandon insurance forms." },
  { title: "Plain-language exclusions", text: "A 'What is not covered' section written in plain English on every product page. Surfacing limitations builds more trust than hiding them." },
  { title: "Verifiable insurer credentials", text: "Each insurer's IRA registration number is linked to the IRA's public register. Users can independently verify every insurer on the platform." },
  { title: "Post-purchase claims information", text: "The confirmation email includes the claims process, emergency contacts, and policy summary — the most under-designed moment in Kenyan insurance." },
];

const AspinMarketplaceCaseStudy = () => {
  // Reading progress
  const [progress, setProgress] = useState(0);
  const handleScroll = useCallback(() => {
    const el = document.documentElement;
    const scrolled = el.scrollTop;
    const total = el.scrollHeight - el.clientHeight;
    setProgress(total > 0 ? (scrolled / total) * 100 : 0);
  }, []);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Active vertical tab
  const [activeVertical, setActiveVertical] = useState(0);

  // Active journey step
  const [activeStep, setActiveStep] = useState(0);

  // Active trust item
  const [activeTrust, setActiveTrust] = useState<number | null>(null);

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
        {/* Reading progress bar */}
        <div
          className="absolute bottom-0 left-0 h-[2px] bg-primary transition-all duration-75"
          style={{ width: `${progress}%` }}
        />
      </nav>

      <main className="pt-14">
        {/* ───────── Hero ───────── */}
        <section className="py-20 md:py-32 px-6 md:px-12 lg:px-24 max-w-5xl mx-auto">
          <Reveal>
            <span className="text-[10px] font-sans font-medium tracking-[0.25em] uppercase text-primary block mb-6">
              Featured · Case Study
            </span>
            <h1 className="text-4xl md:text-6xl font-serif text-foreground leading-[1.1] mb-6">
              ASPIN Marketplace —<br className="hidden md:block" />
              Designing Kenya's Insurance<br className="hidden md:block" />
              Comparison Platform
            </h1>
            <p className="text-lg md:text-xl font-sans text-muted-foreground leading-relaxed max-w-3xl mb-8">
              An AI-assisted research and systems thinking case study. Kenya has 57 IRA-licensed insurers
              but no platform that makes comparing and buying from them simple, transparent, and instant.
              This is how I designed the platform to change that.
            </p>
            <a
              href="https://marketplace.staging.aspin-inclusivity.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-sans font-medium text-primary border border-primary/30 rounded px-4 py-2 hover:bg-primary/5 transition-colors"
              onClick={() => trackEvent("staging_env_clicked", { case_study: "aspin-marketplace" })}
            >
              View Staging Environment
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </Reveal>
        </section>

        {/* Meta strip */}
        <Reveal>
          <div className="px-6 md:px-12 lg:px-24 max-w-5xl mx-auto pb-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-b border-border py-8">
              {[
                { label: "Role", value: "Product Designer & UX Frontend" },
                { label: "Market", value: "Kenya, East Africa" },
                { label: "Stage", value: "Concept — AI Research Phase" },
                { label: "Method", value: "AI Research + Systems Thinking" },
              ].map((item) => (
                <div key={item.label}>
                  <p className="text-[10px] font-sans font-medium tracking-[0.15em] uppercase text-muted-foreground mb-1">{item.label}</p>
                  <p className="text-sm font-sans text-foreground">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="border-t border-border" />

        {/* ───────── 01 Context ───────── */}
        <section className="py-16 md:py-20 px-6 md:px-12 lg:px-24 max-w-5xl mx-auto">
          <Reveal className="max-w-3xl mb-12">
            <p className="text-xs font-sans font-medium tracking-[0.15em] uppercase text-primary mb-4">
              01 — Context & Concept Origin
            </p>
            <h2 className="text-2xl md:text-3xl font-serif text-foreground leading-tight mb-6">
              Why insurance in Kenya needed a new approach
            </h2>
            <div className="space-y-4 text-base font-sans text-muted-foreground leading-relaxed">
              <p>
                Kenya has one of the most dynamic fintech ecosystems in Africa — yet insurance penetration
                fell to <strong className="text-foreground">2.2% of GDP</strong> in H1 2025, against a global average of 7.4%.
                Despite gross premiums growing 9.4% to KES 395 billion in FY 2024, the market is growing in
                volume but <em>shrinking in reach</em>. More Kenyans are being left out, not fewer.
              </p>
              <p>
                The opportunity is not a gap in insurance products — Kenya has 57 IRA-licensed insurers.
                The gap is structural: there is no platform that makes comparing and buying from these
                57 insurers simple, transparent, and instant. That is what ASPIN Marketplace is designed to solve.
              </p>
            </div>
          </Reveal>

          {/* ── Market penetration chart ── */}
          <Reveal className="max-w-4xl mb-12">
            <div className="rounded-lg border border-border bg-card p-6 md:p-8">
              <p className="text-xs font-sans font-medium tracking-[0.15em] uppercase text-muted-foreground mb-6">
                Insurance Penetration — Kenya vs. Global Average (2025)
              </p>
              <div className="space-y-5">
                {[
                  { label: "Kenya H1 2025", pct: 2.2, max: 10, color: "hsl(var(--destructive))", note: "2.2% of GDP" },
                  { label: "Global Average", pct: 7.4, max: 10, color: "hsl(var(--primary))", note: "7.4% of GDP" },
                  { label: "Target range", pct: 5.0, max: 10, color: "hsl(var(--primary))", note: "5%+ — addressable gap", dashed: true },
                ].map((bar) => (
                  <div key={bar.label}>
                    <div className="flex justify-between items-baseline mb-1.5">
                      <span className="text-xs font-sans text-muted-foreground">{bar.label}</span>
                      <span className="text-xs font-sans font-medium text-foreground">{bar.note}</span>
                    </div>
                    <div className="h-7 bg-muted rounded overflow-hidden relative">
                      <div
                        className="h-full rounded flex items-center px-3 transition-all duration-1000"
                        style={{
                          width: `${(bar.pct / bar.max) * 100}%`,
                          background: bar.dashed
                            ? `repeating-linear-gradient(90deg, ${bar.color}33 0px, ${bar.color}33 6px, transparent 6px, transparent 12px)`
                            : `${bar.color}CC`,
                          border: bar.dashed ? `1px dashed ${bar.color}` : "none",
                        }}
                      >
                        <span className="text-[10px] font-sans font-semibold text-white mix-blend-difference whitespace-nowrap">{bar.pct}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-[10px] font-sans text-muted-foreground mt-4">Source: IRA H1 2025 · CBK · Allianz Global Insurance Report 2025</p>
            </div>
          </Reveal>

          {/* Animated stats grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl">
            {[
              { stat: "2.2%", label: "Insurance penetration H1 2025 (IRA + CBK)", isNumber: true, target: 2.2, suffix: "%", decimals: 1 },
              { stat: "7.4%", label: "Global average (Allianz 2025)", isNumber: true, target: 7.4, suffix: "%", decimals: 1 },
              { stat: "57", label: "IRA-licensed insurers in Kenya (March 2025)", isNumber: true, target: 57, suffix: "" },
              { stat: "63.2%", label: "Kenyans who say they can't afford premiums (FinAccess 2024)", isNumber: true, target: 63.2, suffix: "%", decimals: 1 },
              { stat: "1,842", label: "Formal complaints to IRA in 2024", isNumber: true, target: 1842, suffix: "" },
              { stat: "KES 395bn", label: "Gross premiums FY 2024 — growing but penetration falls" },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 80}>
                <StatCard {...item} />
              </Reveal>
            ))}
          </div>

          <Reveal delay={200} className="mt-8 max-w-3xl">
            <div className="p-5 rounded-lg border border-primary/20 bg-primary/5">
              <p className="text-xs font-sans font-medium tracking-[0.1em] uppercase text-primary mb-2">Research Note</p>
              <p className="text-sm font-sans text-muted-foreground leading-relaxed">
                A counterintuitive finding: 63.2% of Kenyans cite unaffordability as the reason they don't have
                insurance — but most don't know that motor TPO starts at KES 7,500/yr and health cover starts at
                KES 1,200/mo. The problem is <strong className="text-foreground">partly informational, not purely economic</strong>.
                Price anchors before the funnel are absent across the entire industry.
              </p>
            </div>
          </Reveal>
        </section>

        <div className="border-t border-border" />

        {/* ───────── 02 AI Research ───────── */}
        <section className="py-16 md:py-20 px-6 md:px-12 lg:px-24 max-w-5xl mx-auto">
          <Reveal className="max-w-3xl mb-10">
            <p className="text-xs font-sans font-medium tracking-[0.15em] uppercase text-primary mb-4">
              02 — AI-Assisted Research Process
            </p>
            <h2 className="text-2xl md:text-3xl font-serif text-foreground leading-tight mb-6">
              How AI was used to think through the system
            </h2>
            <p className="text-base font-sans text-muted-foreground leading-relaxed">
              Rather than conducting traditional primary research in isolation, AI tools were embedded throughout
              the discovery phase — allowing rapid, structured exploration of a complex multi-stakeholder
              system before a single screen was designed. Crucially, AI was used as a{" "}
              <strong className="text-foreground">research instrument for system mapping</strong>, not as a content generator.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-5 max-w-4xl">
            {[
              { title: "Market landscape mapping", text: "Understanding the full roster of 57 IRA-licensed insurers, their product categories, and the market's premium growth trajectory. Verified against the IRA March 2025 published list and Cytonn H1 2025 Insurance Report.", icon: "📊" },
              { title: "User pain point synthesis", text: "Identifying the most consistent, documented friction points. Verified against the 2024 FinAccess Survey, IRA complaints data, and industry analysis from Cytonn, Minet Kenya, and Clyde & Co.", icon: "👥" },
              { title: "Regulatory framing", text: "Understanding the IRA's 2025 reform agenda — regulatory sandboxes, Risk-Based Supervision Phase II, draft claims guidelines, and Data Protection Act enforcement.", icon: "⚖️" },
              { title: "Competitive gap analysis — corrected", text: "Initial AI research incorrectly stated no comparison platforms existed. Further investigation confirmed four active competitors. The framing was revised entirely — and catching the error strengthened the methodology.", icon: "🔍" },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="p-5 rounded-lg border border-border bg-card hover:border-primary/30 hover:shadow-sm transition-all duration-300 space-y-2 h-full">
                  <div className="flex items-start gap-3">
                    <span className="text-xl shrink-0">{item.icon}</span>
                    <div>
                      <h3 className="text-sm font-sans font-semibold text-foreground mb-1">{item.title}</h3>
                      <p className="text-sm font-sans text-muted-foreground leading-relaxed">{item.text}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <div className="border-t border-border" />

        {/* ───────── 03 Problem ───────── */}
        <section className="py-16 md:py-20 px-6 md:px-12 lg:px-24 max-w-5xl mx-auto">
          <Reveal className="max-w-3xl mb-10">
            <p className="text-xs font-sans font-medium tracking-[0.15em] uppercase text-primary mb-4">
              03 — Problem Definition
            </p>
            <h2 className="text-2xl md:text-3xl font-serif text-foreground leading-tight mb-6">
              A system broken at multiple layers
            </h2>
            <p className="text-base font-sans text-muted-foreground leading-relaxed">
              The Kenyan insurance purchase journey fails at three distinct layers:{" "}
              <strong className="text-foreground">discovery</strong> (people don't know what exists or what it costs),{" "}
              <strong className="text-foreground">process</strong> (buying is agent-dependent, slow, and opaque), and{" "}
              <strong className="text-foreground">trust</strong> (claims delays and fraud have damaged confidence industry-wide).
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl">
            <Reveal>
              <p className="text-xs font-sans font-medium tracking-[0.15em] uppercase text-destructive mb-4">Documented System Failures</p>
              <ul className="space-y-3">
                {[
                  "No structured comparison across Kenya's 57+ insurers — all require separate visits or agent calls",
                  "1,842 formal complaints to IRA in 2024 — 76.3% against general insurers",
                  "63.2% of Kenyans cite unaffordability — but many have never seen a starting price",
                  "Claims delays endemic — IRA introduced draft claims guidelines in 2024–25 to address this",
                  "Plain language absent — policy jargon alienates ordinary buyers",
                  "Home and travel pricing not publicly listed anywhere",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm font-sans text-muted-foreground leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-destructive/60 shrink-0 mt-1.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={100}>
              <p className="text-xs font-sans font-medium tracking-[0.15em] uppercase text-primary mb-4">ASPIN Design Responses</p>
              <ul className="space-y-3">
                {[
                  "Live side-by-side comparison from multiple IRA-licensed insurers on one results page",
                  "Transparency-first: inclusions, exclusions, and IRA registration surfaced prominently",
                  "Price anchors shown before the quote funnel — first platform to list home & travel starting prices",
                  "Partner selection includes IRA compliance with new claims guidelines",
                  "Plain-language 'What this covers' and 'What is not covered' on every product page",
                  "M-Pesa pre-filled from phone number captured at quote stage — removing re-entry friction",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm font-sans text-muted-foreground leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        <div className="border-t border-border" />

        {/* ───────── 04 Systems Architecture — Accordion ───────── */}
        <section className="py-16 md:py-20 px-6 md:px-12 lg:px-24 max-w-5xl mx-auto">
          <Reveal className="max-w-3xl mb-10">
            <p className="text-xs font-sans font-medium tracking-[0.15em] uppercase text-primary mb-4">
              04 — Systems Architecture
            </p>
            <h2 className="text-2xl md:text-3xl font-serif text-foreground leading-tight mb-4">
              Mapping the full system before designing screens
            </h2>
            <p className="text-sm font-sans text-muted-foreground leading-relaxed">
              Five distinct layers — each with its own constraints, dependencies, and failure modes.{" "}
              <span className="text-foreground">Click each layer to expand.</span>
            </p>
          </Reveal>

          {/* ── Platform layer stack diagram ── */}
          <Reveal className="max-w-4xl mb-8">
            <div className="rounded-lg border border-border bg-card p-6 overflow-hidden">
              <p className="text-xs font-sans font-medium tracking-[0.15em] uppercase text-muted-foreground mb-6">
                Platform Architecture — Five Layers
              </p>
              <div className="relative">
                {/* Connecting line */}
                <div className="absolute left-[1.75rem] top-4 bottom-4 w-px bg-gradient-to-b from-primary/60 via-primary/30 to-primary/10 hidden md:block" />
                <div className="space-y-2">
                  {[
                    { label: "User Layer", sub: "Vehicle owners · Families · SME operators", width: "100%" },
                    { label: "Product Layer", sub: "Motor · Health · Home · Travel · Business", width: "88%" },
                    { label: "Insurer Network", sub: "57 IRA-licensed insurers · Neutral ordering", width: "76%" },
                    { label: "Regulatory Layer", sub: "IRA sandboxes · DPA 2019 · Claims guidelines", width: "64%" },
                    { label: "Payment Infrastructure", sub: "M-Pesa primary · Card secondary", width: "52%" },
                  ].map((layer, i) => (
                    <div key={layer.label} className="flex items-center gap-4">
                      <div className="w-3.5 h-3.5 rounded-full bg-primary shrink-0 relative z-10 hidden md:block ring-2 ring-background" />
                      <div
                        className="flex-1 flex items-center justify-between px-4 py-3 rounded border border-border/60 bg-muted/30 hover:bg-muted/60 transition-colors duration-200"
                        style={{ maxWidth: layer.width }}
                      >
                        <span className="text-sm font-sans font-medium text-foreground">{layer.label}</span>
                        <span className="text-xs font-sans text-muted-foreground hidden sm:block">{layer.sub}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal className="space-y-3 max-w-4xl">
            {[
              { number: "01", title: "User Layer", defaultOpen: true, text: "Three validated segments: vehicle owners (motor TPO is legally mandatory, creating a captive entry point); families seeking health cover (driven by rising hospital costs and SHA limitations); and SME operators (underserved by all four existing competitors). Core anxieties: data misuse, hidden costs, and whether claims will actually be paid." },
              { number: "02", title: "Product Layer", text: "Five insurance verticals — Motor, Health, Home, Travel, Business — each designed as a distinct journey with its own question set, insurer panel, and comparison dimensions. A single generic form would degrade completion rates across all five categories. Specificity per vertical is a systems constraint, not a UX preference." },
              { number: "03", title: "Insurer Network Layer", text: "57 IRA-licensed general and life insurers, of which ASPIN targets the most consumer-facing. Platform neutrality is structural: no insurer pays for placement. Results are ordered by price and coverage match — this neutrality is both ethically correct and commercially important." },
              { number: "04", title: "Regulatory Layer", text: "The IRA is not just a licensing authority — it is an active reform agenda in 2025, implementing regulatory sandboxes, Risk-Based Supervision Phase II, and draft claims guidelines. ASPIN is designed in alignment with this reform direction, not merely in compliance with existing rules. This is a meaningful positioning difference." },
              { number: "05", title: "Payment Infrastructure Layer", text: "M-Pesa is Kenya's dominant payment rail — treating it as the primary path, not an option, is a systems-level design decision. Phone number captured at the quote stage pre-fills the M-Pesa checkout prompt, eliminating the most common drop-off point in Kenyan fintech checkout flows." },
            ].map((item) => (
              <AccordionItem key={item.number} {...item} />
            ))}
          </Reveal>
        </section>

        <div className="border-t border-border" />

        {/* ───────── 05 Competitive Landscape ───────── */}
        <section className="py-16 md:py-20 px-6 md:px-12 lg:px-24 max-w-5xl mx-auto">
          <Reveal className="max-w-3xl mb-10">
            <p className="text-xs font-sans font-medium tracking-[0.15em] uppercase text-primary mb-4">
              05 — Competitive Landscape
            </p>
            <h2 className="text-2xl md:text-3xl font-serif text-foreground leading-tight mb-4">
              A nascent, agent-heavy market with four real players
            </h2>
            <p className="text-base font-sans text-muted-foreground leading-relaxed">
              Initial AI research incorrectly identified this as a greenfield market. Live research confirmed
              four active digital aggregators. The competitive framing was revised entirely — and the correction
              was part of the methodology.
            </p>
          </Reveal>

          {/* ── Coverage heatmap ── */}
          <Reveal className="max-w-4xl mb-8">
            <div className="rounded-lg border border-border bg-card p-6">
              <p className="text-xs font-sans font-medium tracking-[0.15em] uppercase text-muted-foreground mb-6">
                Vertical Coverage — All Platforms
              </p>
              <div className="grid gap-2">
                {[
                  { name: "mTek / Money254", scores: [1, 1, 0.5, 0, 0, 1, 0.5] },
                  { name: "PesaBazaar", scores: [1, 1, 1, 0, 1, 0.5, 0] },
                  { name: "MTek-Services", scores: [1, 1, 0, 1, 0, 0.5, 0.5] },
                  { name: "Imana / MyKava", scores: [1, 1, 1, 1, 1, 1, 0.8] },
                  { name: "ASPIN (concept)", scores: [1, 1, 1, 1, 1, 1, 1], highlight: true },
                ].map((row) => (
                  <div key={row.name} className={`flex items-center gap-3 rounded px-3 py-2 ${row.highlight ? "bg-primary/5 border border-primary/20" : ""}`}>
                    <span className={`text-xs font-sans w-36 shrink-0 ${row.highlight ? "font-semibold text-foreground" : "text-muted-foreground"}`}>{row.name}</span>
                    <div className="flex gap-1.5 flex-1">
                      {["Motor", "Health", "Home", "Travel", "Business", "M-Pesa", "Cert"].map((label, i) => (
                        <div key={label} className="flex-1 flex flex-col items-center gap-1">
                          <div
                            className="w-full h-5 rounded-sm transition-all duration-300"
                            style={{
                              background: row.scores[i] === 1
                                ? (row.highlight ? "hsl(var(--primary))" : "hsl(var(--primary) / 0.35)")
                                : row.scores[i] === 0.5
                                ? "hsl(var(--primary) / 0.15)"
                                : "hsl(var(--muted))",
                              opacity: row.scores[i] === 0 ? 0.4 : 1,
                            }}
                            title={`${label}: ${row.scores[i] === 1 ? "Full" : row.scores[i] === 0.5 ? "Partial" : "None"}`}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                {/* Legend labels */}
                <div className="flex items-center gap-3 mt-1">
                  <span className="w-36 shrink-0" />
                  <div className="flex gap-1.5 flex-1">
                    {["Motor", "Health", "Home", "Travel", "Biz", "M-Pesa", "Cert"].map((label) => (
                      <div key={label} className="flex-1 text-center">
                        <span className="text-[9px] font-sans text-muted-foreground">{label}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Legend */}
                <div className="flex items-center gap-4 mt-2 pl-[9.5rem]">
                  {[
                    { color: "hsl(var(--primary) / 0.35)", label: "Full" },
                    { color: "hsl(var(--primary) / 0.15)", label: "Partial" },
                    { color: "hsl(var(--muted))", label: "None" },
                  ].map((l) => (
                    <div key={l.label} className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded-sm" style={{ background: l.color }} />
                      <span className="text-[9px] font-sans text-muted-foreground">{l.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal className="overflow-x-auto max-w-4xl mb-10">
            <table className="w-full text-sm font-sans border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 pr-4 text-xs font-medium tracking-[0.1em] uppercase text-muted-foreground">Platform</th>
                  {["Motor", "Health", "Home", "Travel", "Business", "M-Pesa", "Cert"].map((h) => (
                    <th key={h} className="text-center py-3 px-2 text-xs font-medium tracking-[0.1em] uppercase text-muted-foreground">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  { name: "mTek / Money254", values: ["✓", "✓", "~", "—", "—", "✓", "~"], highlight: false },
                  { name: "PesaBazaar", values: ["✓", "✓", "✓", "—", "✓", "~", "—"], highlight: false },
                  { name: "MTek-Services", values: ["✓", "✓", "—", "✓", "—", "~", "~"], highlight: false },
                  { name: "Imana / MyKava", values: ["✓", "✓", "✓", "✓", "✓", "✓", "Fast"], highlight: false },
                  { name: "ASPIN (concept)", values: ["✓", "✓", "✓", "✓", "✓", "Deep", "Instant"], highlight: true },
                ].map((row) => (
                  <tr
                    key={row.name}
                    className={`transition-colors duration-200 ${row.highlight ? "bg-primary/5 font-medium" : "hover:bg-muted/50"}`}
                  >
                    <td className={`py-3 pr-4 ${row.highlight ? "text-foreground" : "text-muted-foreground"}`}>
                      {row.name}
                    </td>
                    {row.values.map((v, i) => (
                      <td key={i} className={`text-center py-3 px-2 ${v === "✓" || v === "Deep" || v === "Instant" || v === "Fast" ? (row.highlight ? "text-primary font-semibold" : "text-foreground") : v === "—" ? "text-muted-foreground/30" : "text-muted-foreground"}`}>
                        {v}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-5 max-w-4xl">
            {[
              { title: "Structured self-serve comparison UI", text: "The most significant gap. Imana/MyKava — the strongest competitor — relies on WhatsApp and agent follow-up for quotes. No competitor has a fully self-serve comparison interface." },
              { title: "All five verticals simultaneously", text: "mTek and MTek-Services each miss two or more verticals. ASPIN is the only platform designed to support all five verticals in a single self-serve product." },
              { title: "Home and travel price anchors", text: "No competitor publicly lists starting prices for home or travel insurance. ASPIN's decision to show starting price anchors for these verticals is a first-mover move within a defined gap." },
              { title: "UX quality as a defensible moat", text: "All existing platforms are functional but none are designed to consumer fintech standards. Motor TPO price spreads between insurers are 15–20% for identical cover — a comparison UI surfaces this value immediately." },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 60}>
                <div className="p-5 rounded-lg border border-border bg-card hover:border-primary/30 hover:shadow-sm transition-all duration-300">
                  <h3 className="text-sm font-sans font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm font-sans text-muted-foreground leading-relaxed">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <div className="border-t border-border" />

        {/* ───────── 06 Product Design — Vertical Tabs ───────── */}
        <section className="py-16 md:py-20 px-6 md:px-12 lg:px-24 max-w-5xl mx-auto">
          <Reveal className="max-w-3xl mb-10">
            <p className="text-xs font-sans font-medium tracking-[0.15em] uppercase text-primary mb-4">
              06 — Product Design
            </p>
            <h2 className="text-2xl md:text-3xl font-serif text-foreground leading-tight mb-4">
              Five verticals. Five tailored journeys.
            </h2>
            <p className="text-sm font-sans text-muted-foreground leading-relaxed">
              Each insurance category is its own experience. A single generic form would degrade completion
              rates across all five categories — vertical specificity is a systems constraint.{" "}
              <span className="text-foreground">Select a vertical to explore its design.</span>
            </p>
          </Reveal>

          <Reveal className="max-w-4xl">
            {/* Tab bar */}
            <div className="flex flex-wrap gap-2 mb-6">
              {VERTICALS.map((v, i) => (
                <button
                  key={v.key}
                  onClick={() => setActiveVertical(i)}
                  className={`px-4 py-2 rounded text-sm font-sans font-medium transition-all duration-200 ${
                    activeVertical === i
                      ? "bg-primary text-primary-foreground"
                      : "border border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
                  }`}
                >
                  {v.label}
                </button>
              ))}
            </div>

            {/* Active vertical panel */}
            {VERTICALS.map((v, i) => (
              <div
                key={v.key}
                style={{
                  opacity: activeVertical === i ? 1 : 0,
                  height: activeVertical === i ? "auto" : 0,
                  overflow: "hidden",
                  transition: "opacity 0.3s ease",
                  pointerEvents: activeVertical === i ? "auto" : "none",
                }}
              >
                <div className="rounded-lg border border-primary/20 bg-card p-6 md:p-8">
                  <div className="flex flex-wrap items-start gap-4 mb-4">
                    <h3 className="text-xl font-serif text-foreground">{v.label}</h3>
                    <span className={`text-[10px] font-sans font-medium tracking-[0.1em] uppercase px-2 py-1 rounded ${v.tagColor}`}>{v.tag}</span>
                    <span className="ml-auto text-lg font-serif text-primary">{v.price}</span>
                  </div>
                  <p className="text-base font-sans text-muted-foreground leading-relaxed mb-4">{v.text}</p>
                  <div className="p-4 rounded bg-muted/50 border border-border">
                    <p className="text-xs font-sans font-medium tracking-[0.1em] uppercase text-muted-foreground mb-1">Form design detail</p>
                    <p className="text-sm font-sans text-foreground leading-relaxed">{v.detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </Reveal>
        </section>

        <div className="border-t border-border" />

        {/* ───────── 07 User Journey — Interactive Steps ───────── */}
        <section className="py-16 md:py-20 px-6 md:px-12 lg:px-24 max-w-5xl mx-auto">
          <Reveal className="max-w-3xl mb-10">
            <p className="text-xs font-sans font-medium tracking-[0.15em] uppercase text-primary mb-4">
              07 — User Journey Design
            </p>
            <h2 className="text-2xl md:text-3xl font-serif text-foreground leading-tight mb-4">
              From curiosity to covered in three steps
            </h2>
            <p className="text-sm font-sans text-muted-foreground leading-relaxed">
              Every design decision at each stage was stress-tested against the documented pain points.{" "}
              <span className="text-foreground">Click a step to see the design thinking behind it.</span>
            </p>
          </Reveal>

          {/* ── Journey funnel diagram ── */}
          <Reveal className="max-w-4xl mb-8">
            <div className="rounded-lg border border-border bg-card p-6 overflow-hidden">
              <p className="text-xs font-sans font-medium tracking-[0.15em] uppercase text-muted-foreground mb-6">
                Purchase Funnel — Curiosity to Covered
              </p>
              <div className="relative flex flex-col items-center gap-0">
                {[
                  { step: "Entry", label: "Choose a product", sub: "Motor · Health · Home · Travel · Business", w: "100%", icon: "🔍" },
                  { step: "Input", label: "Answer a short question set", sub: "~2 min · No account required", w: "80%", icon: "📋" },
                  { step: "Compare", label: "See live quotes side-by-side", sub: "Multiple insurers · Plain-language exclusions", w: "65%", icon: "⚖️" },
                  { step: "Pay", label: "M-Pesa pre-filled & buy", sub: "No re-entry friction · Instant certificate", w: "50%", icon: "✅" },
                ].map((stage, i) => (
                  <div key={stage.step} className="flex flex-col items-center w-full">
                    <div
                      className="flex items-center gap-3 px-5 py-3 rounded-lg border border-border bg-muted/30 hover:bg-muted/50 transition-colors duration-200 mx-auto"
                      style={{ width: stage.w }}
                    >
                      <span className="text-lg shrink-0">{stage.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-sans font-semibold text-foreground leading-tight">{stage.label}</p>
                        <p className="text-xs font-sans text-muted-foreground leading-relaxed">{stage.sub}</p>
                      </div>
                      <span className="text-[10px] font-sans font-medium tracking-[0.1em] uppercase text-primary shrink-0">{stage.step}</span>
                    </div>
                    {i < 3 && (
                      <div className="w-px h-4 bg-border" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal className="max-w-4xl">
            {/* Step selector */}
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              {JOURNEY_STEPS.map((s, i) => (
                <button
                  key={s.step}
                  onClick={() => setActiveStep(i)}
                  className={`p-5 rounded-lg border text-left transition-all duration-200 ${
                    activeStep === i
                      ? "border-primary bg-primary/5"
                      : "border-border bg-card hover:border-primary/30"
                  }`}
                >
                  <p className={`text-2xl font-serif mb-2 transition-colors ${activeStep === i ? "text-primary" : "text-muted-foreground/40"}`}>{s.step}</p>
                  <p className="text-sm font-sans font-semibold text-foreground mb-1">{s.title}</p>
                  <p className="text-xs font-sans text-muted-foreground">{s.subtitle}</p>
                </button>
              ))}
            </div>

            {/* Detail panel */}
            <div className="rounded-lg border border-primary/20 bg-primary/5 p-6">
              {JOURNEY_STEPS.map((s, i) => (
                <div
                  key={s.step}
                  style={{
                    opacity: activeStep === i ? 1 : 0,
                    height: activeStep === i ? "auto" : 0,
                    overflow: "hidden",
                    transition: "opacity 0.3s ease",
                    pointerEvents: activeStep === i ? "auto" : "none",
                  }}
                >
                  <p className="text-[10px] font-sans font-medium tracking-[0.15em] uppercase text-primary mb-2">Step {s.step}</p>
                  <h3 className="text-lg font-serif text-foreground mb-3">{s.title}</h3>
                  <p className="text-sm font-sans text-muted-foreground leading-relaxed">{s.detail}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={200} className="mt-8 max-w-3xl">
            <blockquote className="border-l-2 border-primary pl-6">
              <p className="text-lg md:text-xl font-serif text-foreground/80 italic leading-relaxed">
                "The funnel should feel like a service, not a form. Each step should give the user
                something of value before asking for something in return."
              </p>
            </blockquote>
          </Reveal>
        </section>

        <div className="border-t border-border" />

        {/* ───────── 08 Trust Design — Interactive cards ───────── */}
        <section className="py-16 md:py-20 px-6 md:px-12 lg:px-24 max-w-5xl mx-auto">
          <Reveal className="max-w-3xl mb-10">
            <p className="text-xs font-sans font-medium tracking-[0.15em] uppercase text-primary mb-4">
              08 — Trust Design
            </p>
            <h2 className="text-2xl md:text-3xl font-serif text-foreground leading-tight mb-4">
              Trust is a design problem that starts before the first click
            </h2>
            <p className="text-base font-sans text-muted-foreground leading-relaxed">
              Insurance is the highest-stakes, lowest-trust financial category in Kenya.
              In 2024 alone, the IRA received 1,842 formal complaints against insurers.
              Seven trust mechanisms are embedded in the platform.{" "}
              <span className="text-foreground">Click any card to read the design rationale.</span>
            </p>
          </Reveal>

          {/* ── Trust signal flow diagram ── */}
          <Reveal className="max-w-4xl mb-8">
            <div className="rounded-lg border border-border bg-card p-6">
              <p className="text-xs font-sans font-medium tracking-[0.15em] uppercase text-muted-foreground mb-6">
                Trust Signals — Where Each Appears in the Journey
              </p>
              <div className="overflow-x-auto">
                <div className="min-w-[480px]">
                  <div className="flex gap-0 mb-3">
                    {["Landing page", "Quote form", "Results page", "Checkout", "Post-purchase"].map((stage) => (
                      <div key={stage} className="flex-1 text-center px-1">
                        <span className="text-[10px] font-sans font-medium tracking-[0.05em] uppercase text-muted-foreground leading-tight block">{stage}</span>
                      </div>
                    ))}
                  </div>
                  {[
                    { label: "IRA badge", stages: [true, false, true, true, false] },
                    { label: "DPA messaging", stages: [false, true, false, true, false] },
                    { label: "Price anchors", stages: [true, false, false, false, false] },
                    { label: "Exclusions (plain)", stages: [false, false, true, false, false] },
                    { label: "IRA reg link", stages: [false, false, true, true, false] },
                    { label: "Claims info", stages: [false, false, false, false, true] },
                  ].map((row) => (
                    <div key={row.label} className="flex gap-0 mb-1.5 items-center">
                      {row.stages.map((active, i) => (
                        <div key={i} className="flex-1 flex justify-center px-1">
                          <div
                            className="w-full h-7 rounded flex items-center justify-center text-[10px] font-sans font-medium transition-all"
                            style={{
                              background: active ? "hsl(var(--primary) / 0.15)" : "hsl(var(--muted))",
                              color: active ? "hsl(var(--primary))" : "transparent",
                              border: active ? "1px solid hsl(var(--primary) / 0.3)" : "1px solid transparent",
                            }}
                          >
                            {active ? "✓" : ""}
                          </div>
                        </div>
                      ))}
                      <span className="text-[10px] font-sans text-muted-foreground ml-3 w-24 shrink-0">{row.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-4 max-w-4xl">
            {TRUST_ITEMS.map((item, i) => (
              <Reveal key={i} delay={i * 60}>
                <button
                  onClick={() => setActiveTrust(activeTrust === i ? null : i)}
                  className={`w-full text-left p-5 rounded-lg border transition-all duration-300 ${
                    activeTrust === i
                      ? "border-primary bg-primary/5"
                      : "border-border bg-card hover:border-primary/30 hover:shadow-sm"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-lg font-serif text-primary/30 shrink-0">{String(i + 1).padStart(2, "0")}</span>
                    <div className="flex-1">
                      <p className="text-sm font-sans font-semibold text-foreground mb-0.5">{item.title}</p>
                      <div
                        style={{
                          maxHeight: activeTrust === i ? "200px" : "0px",
                          overflow: "hidden",
                          transition: "max-height 0.3s ease",
                        }}
                      >
                        <p className="text-sm font-sans text-muted-foreground leading-relaxed mt-2">{item.text}</p>
                      </div>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform duration-300 ${activeTrust === i ? "rotate-180" : ""}`} />
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </section>

        <div className="border-t border-border" />

        {/* ───────── 09 Reflections — Expandable principles ───────── */}
        <section className="py-16 md:py-20 px-6 md:px-12 lg:px-24 max-w-5xl mx-auto">
          <Reveal className="max-w-3xl mb-10">
            <p className="text-xs font-sans font-medium tracking-[0.15em] uppercase text-primary mb-4">
              09 — Reflections & Design Principles
            </p>
            <h2 className="text-2xl md:text-3xl font-serif text-foreground leading-tight mb-4">
              What live research and systems thinking revealed
            </h2>
            <p className="text-sm font-sans text-muted-foreground leading-relaxed">
              Six principles that extend beyond this platform to any product operating in a low-trust,
              high-stakes, regulated consumer financial category.{" "}
              <span className="text-foreground">Click each to expand.</span>
            </p>
          </Reveal>

          <Reveal className="space-y-4 max-w-4xl">
            {[
              { principle: "Verify AI outputs — the correction is part of the methodology", text: "The initial AI research produced two significant errors: claiming no comparison platforms existed in Kenya, and understating pricing floors. Both were caught through cross-referencing against live sources. A designer who accepts AI research uncritically is not using AI as a tool — they are outsourcing their thinking to it." },
              { principle: "Map the system before designing the screen", text: "Understanding the five layers of the platform was more valuable than any single screen design decision. Systems mapping revealed that what appears to be a UX problem (drop-off at checkout) is actually a payment infrastructure problem (M-Pesa re-entry), requiring a solution at the data-collection layer, not the checkout layer." },
              { principle: "Transparency is a conversion mechanic, not just an ethical position", text: "Showing exclusions, linking insurer IRA registrations, surfacing claims guidelines alignment, and displaying price anchors before the funnel all reduce uncertainty. In a low-trust category, reducing uncertainty converts. Hiding complexity does not make insurance feel simpler." },
              { principle: "Infrastructure is UX — M-Pesa is not a feature", text: "M-Pesa is Kenya's dominant payment infrastructure. Designing checkout around it as the primary path is a systems decision, not a UX flourish. The seamless interaction is only possible because the system was designed with M-Pesa as a first-class constraint from the beginning." },
              { principle: "Price anchors resolve imagined affordability barriers", text: "63.2% of Kenyans cite unaffordability as the reason they don't have insurance — but most have never seen a starting price before entering a quote funnel. Showing these numbers before the funnel resolves a barrier that is partly informational, not purely economic." },
              { principle: "Regulatory alignment is a product strategy", text: "The IRA's 2025 reform agenda is moving in the same direction as good product design: transparency, consumer protection, and faster resolution. A platform designed in alignment with this agenda is not just compliant — it is positioned ahead of incumbents who are slower to adapt." },
            ].map((item, i) => (
              <PrincipleItem key={i} index={i + 1} {...item} />
            ))}
          </Reveal>
        </section>

        <div className="border-t border-border" />

        {/* ───────── 10 Status ───────── */}
        <section className="py-16 md:py-20 px-6 md:px-12 lg:px-24 max-w-5xl mx-auto">
          <Reveal className="max-w-3xl mb-10">
            <p className="text-xs font-sans font-medium tracking-[0.15em] uppercase text-primary mb-4">
              10 — Concept Status & Next Steps
            </p>
            <h2 className="text-2xl md:text-3xl font-serif text-foreground leading-tight mb-4">
              What exists and what comes next
            </h2>
            <p className="text-base font-sans text-muted-foreground leading-relaxed">
              ASPIN Marketplace exists as a validated concept: a staged environment with five defined product
              verticals, a mapped systems architecture, a live-researched competitive landscape, and a
              corrected pricing framework.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-10 max-w-4xl">
            <Reveal>
              <p className="text-xs font-sans font-medium tracking-[0.15em] uppercase text-primary mb-4">Completed to Date</p>
              <ul className="space-y-3">
                {[
                  "AI-assisted market research across Kenya's 57 IRA-licensed insurers, verified against March 2025 IRA published list",
                  "Competitive analysis of all four real platforms with feature-level accuracy",
                  "Systems mapping of all five platform layers",
                  "Corrected pricing framework verified against live 2025 sources",
                  "Trust design framework with seven documented mechanisms",
                  "Staging environment with live product pages and quote form scaffolding",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm font-sans text-muted-foreground leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={100}>
              <p className="text-xs font-sans font-medium tracking-[0.15em] uppercase text-muted-foreground mb-4">Immediate Next Steps</p>
              <ul className="space-y-3">
                {[
                  "Primary user research — interviews with vehicle owners, urban families, and SME operators",
                  "Insurer API outreach — live pricing integration with CIC, APA, Jubilee, Britam, and AAR",
                  "High-fidelity Figma prototypes across all five verticals",
                  "Usability testing on the quote form, comparison results page, and M-Pesa checkout",
                  "Roadmap scoping for COMESA and WIBA product lines",
                  "IRA licensing application — formalising the regulatory pathway",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm font-sans text-muted-foreground leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-border shrink-0 mt-1.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        {/* ───────── Takeaway ───────── */}
        <section className="py-16 md:py-20 px-6 md:px-12 lg:px-24 max-w-5xl mx-auto bg-muted/30">
          <Reveal className="max-w-3xl mx-auto text-center">
            <p className="text-xs font-sans font-medium tracking-[0.15em] uppercase text-primary mb-6">
              Key Takeaway
            </p>
            <p className="text-lg md:text-xl font-serif text-foreground leading-relaxed mb-8">
              AI compresses discovery. It does not replace the designer's judgement about what matters.
              The systems-level clarity that typically takes months of desk research was achievable
              in days — and the errors it introduced were caught through verification.
            </p>
            <a
              href="https://marketplace.staging.aspin-inclusivity.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-sans font-medium text-primary border border-primary/30 rounded px-4 py-2 hover:bg-primary/5 transition-colors"
              onClick={() => trackEvent("staging_env_clicked_footer", { case_study: "aspin-marketplace" })}
            >
              View the Staging Environment
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </Reveal>
        </section>

        {/* Back */}
        <section className="py-12 px-6 md:px-12 lg:px-24 max-w-5xl mx-auto">
          <Link
            to="/#work"
            className="inline-flex items-center gap-2 text-sm font-sans font-medium text-primary hover:text-foreground transition-colors"
            onClick={() => trackEvent("back_to_case_studies_clicked", { from: "aspin-marketplace" })}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to all case studies
          </Link>
        </section>
      </main>
    </div>
  );
};

export default AspinMarketplaceCaseStudy;
