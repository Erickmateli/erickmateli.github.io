import { useDocumentTitle } from "@/hooks/use-document-title";
import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, ExternalLink, ChevronDown, ChevronRight, Hourglass, SearchX, ShieldAlert } from "lucide-react";
import { trackEvent } from "@/lib/track-event";
import Reveal from "@/components/case-study/Reveal";
import ReadingProgress from "@/components/case-study/ReadingProgress";
import CaseStudySummary from "@/components/portfolio/CaseStudySummary";
import CaseStudyEnd from "@/components/portfolio/CaseStudyEnd";
import ImageLightbox from "@/components/portfolio/ImageLightbox";
import ProblemCards from "@/components/case-study/ProblemCards";
import DecisionCards from "@/components/case-study/DecisionCards";
import StatCounters from "@/components/case-study/StatCounters";
import Takeaways from "@/components/case-study/Takeaways";
import marketplaceHero from "@/assets/marketplace/marketplace-card.webp";
import mp01 from "@/assets/marketplace/marketplace-01-home.webp";
import mp02 from "@/assets/marketplace/marketplace-02-product.webp";
import mp03 from "@/assets/marketplace/marketplace-03-vehicle-form.webp";
import mp04 from "@/assets/marketplace/marketplace-04-quotes.webp";
import mp05 from "@/assets/marketplace/marketplace-05-payment-plan.webp";
import mp06 from "@/assets/marketplace/marketplace-06-sign-in.webp";
import mp07 from "@/assets/marketplace/marketplace-07-otp.webp";
import mp08 from "@/assets/marketplace/marketplace-08-documents.webp";
import mp09 from "@/assets/marketplace/marketplace-09-payment.webp";
import mp10 from "@/assets/marketplace/marketplace-10-confirmation.webp";

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

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "research", label: "Research" },
  { id: "system", label: "System" },
  { id: "design", label: "Design" },
  { id: "staging", label: "Walkthrough" },
  { id: "learnings", label: "Learnings" },
] as const;
type TabId = (typeof tabs)[number]["id"];

// Old section links (from the previous scroll menu) still land on the right tab.
const legacyHash: Record<string, TabId> = {
  context: "overview", problem: "overview", competitors: "research", products: "design",
  journey: "design", trust: "design", reflections: "learnings", "next-steps": "learnings",
};

function tabFromHash(hash: string): TabId {
  const key = hash.replace("#", "");
  return tabs.find((t) => t.id === key)?.id ?? legacyHash[key] ?? "overview";
}

function CaseStudyTabs({ activeTab, onSelect }: { activeTab: TabId; onSelect: (id: TabId) => void }) {
  const refs = useRef<Record<string, HTMLButtonElement | null>>({});
  const listRef = useRef<HTMLDivElement>(null);

  // Keep the active tab visible in the horizontally scrolling bar on small screens.
  useEffect(() => {
    const list = listRef.current;
    const tab = refs.current[activeTab];
    if (list && tab) list.scrollTo({ left: tab.offsetLeft - list.clientWidth / 2 + tab.clientWidth / 2 });
  }, [activeTab]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    const i = tabs.findIndex((t) => t.id === activeTab);
    const last = tabs.length - 1;
    const next =
      e.key === "ArrowRight" ? (i === last ? 0 : i + 1)
      : e.key === "ArrowLeft" ? (i === 0 ? last : i - 1)
      : e.key === "Home" ? 0
      : e.key === "End" ? last
      : null;
    if (next === null) return;
    e.preventDefault();
    onSelect(tabs[next].id);
    refs.current[tabs[next].id]?.focus();
  };

  return (
    <div className="sticky top-14 z-40 bg-background/90 backdrop-blur-md border-y border-border">
      <div
        ref={listRef}
        role="tablist"
        aria-label="Case study chapters"
        onKeyDown={onKeyDown}
        className="max-w-5xl mx-auto px-6 md:px-12 lg:px-24 flex gap-1 overflow-x-auto py-2 [scrollbar-width:none]"
      >
        {tabs.map((t, i) => {
          const selected = t.id === activeTab;
          return (
            <button
              key={t.id}
              ref={(el) => (refs.current[t.id] = el)}
              role="tab"
              id={`tab-${t.id}`}
              aria-selected={selected}
              aria-controls={t.id}
              tabIndex={selected ? 0 : -1}
              onClick={() => onSelect(t.id)}
              className={`shrink-0 flex items-center gap-2 px-3.5 py-2 rounded-full text-sm font-sans font-medium transition-colors ${
                selected ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <span className={`text-xs ${selected ? "opacity-80" : "opacity-60"}`}>{String(i + 1).padStart(2, "0")}</span>
              {t.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function NextTabButton({ activeTab, onSelect }: { activeTab: TabId; onSelect: (id: TabId) => void }) {
  const i = tabs.findIndex((t) => t.id === activeTab);
  const next = tabs[i + 1];
  if (!next) return null;
  return (
    <div className="px-6 md:px-12 lg:px-24 max-w-5xl mx-auto pb-16 md:pb-20 flex justify-end">
      <button
        type="button"
        onClick={() => onSelect(next.id)}
        className="group inline-flex items-center gap-3 rounded-lg border border-border bg-card px-5 py-4 text-left hover:border-primary/40 transition-colors"
      >
        <span>
          <span className="block text-xs font-sans text-muted-foreground">Next chapter</span>
          <span className="block text-base font-serif text-foreground">{next.label}</span>
        </span>
        <ChevronRight className="w-5 h-5 text-primary group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
      </button>
    </div>
  );
}

const walkthrough = [
  { src: mp01, alt: "Landing page — five product lines, plus cover offered inside everyday banking moments" },
  { src: mp02, alt: "Product page — what's covered, what isn't, and real price anchors before any form" },
  { src: mp03, alt: "Vehicle form — usage and cover type first, contact details last" },
  { src: mp04, alt: "Quotes — insurers side by side on the same sum insured, add-ons visible" },
  { src: mp05, alt: "Payment plan — pay in full, by instalment, or with premium financing" },
  { src: mp06, alt: "Sign-in — the customer's existing bank identity, no new password" },
  { src: mp07, alt: "Verification — masked identity details confirm the right account" },
  { src: mp08, alt: "Documents — three uploads, each one explained" },
  { src: mp09, alt: "Payment — M-Pesa, Airtel Money, card or bank account" },
  { src: mp10, alt: "Confirmation — policy number, documents and what happens next" },
];

const AspinMarketplaceCaseStudy = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const activeTab = tabFromHash(location.hash);
  const selectTab = (id: TabId) => {
    if (id === activeTab) return;
    trackEvent("marketplace_tab_viewed", { tab: id });
    navigate({ hash: id });
  };
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  useDocumentTitle("ASPIN Marketplace");
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
          <span className="hidden sm:inline text-xs font-sans font-medium tracking-[0.2em] uppercase text-primary">
            Case study · Live
          </span>
        </div>
        <ReadingProgress />
      </nav>

      <main className="pt-14">
        {/* ───────── Hero ───────── */}
        <section className="py-20 md:py-32 px-6 md:px-12 lg:px-24 max-w-5xl mx-auto">
          <Reveal>
            <span className="text-xs font-sans font-medium tracking-[0.25em] uppercase text-primary block mb-6">
              ASPIN Marketplace · 2026
            </span>
            <h1 className="text-4xl md:text-6xl font-serif text-foreground leading-[1.1] mb-6">
              ASPIN Marketplace —<br className="hidden md:block" />
              Designing Kenya's Insurance<br className="hidden md:block" />
              Comparison Platform
            </h1>
            <p className="text-lg md:text-xl font-sans text-muted-foreground leading-relaxed max-w-3xl mb-8">
              A systems design case study. Kenya has 57 IRA-licensed insurers but no platform that
              makes comparing and buying from them simple, transparent, and instant. I mapped the whole
              system — customers, insurers, regulation and payments — then designed and built the
              platform to change that.
            </p>
            <a
              href="https://marketplace.staging.aspin-inclusivity.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-sans font-medium text-primary border border-primary/30 rounded px-4 py-2 hover:bg-primary/5 transition-colors"
              onClick={() => trackEvent("staging_env_clicked", { case_study: "aspin-marketplace" })}
            >
              View the live demo
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </Reveal>
        </section>

        <CaseStudySummary
          readingTime="4 min read"
          tldr="Buying insurance in Kenya means hidden prices, agents and paperwork. I mapped the full system — customers, 57 licensed insurers, regulation and payments — then designed and built a self-serve platform for comparing and buying cover across five product lines. It's now live and being pitched to partners across Africa."
          facts={[
            { label: "Role", value: "Senior Product Designer · UX and frontend" },
            { label: "Team", value: "Me on design and frontend, with the actuarial lead on research" },
            { label: "Timeline", value: "2026" },
            { label: "Status", value: "Live · pitching to partners across Africa" },
            { label: "Outcome", value: "Full motor journey live, from quote to policy" },
          ]}
        />

        <Reveal className="px-6 md:px-12 lg:px-24 max-w-5xl mx-auto pb-16">
          <figure>
            <button
              type="button"
              onClick={() => setLightboxIndex(0)}
              className="block w-full rounded-lg border border-border overflow-hidden bg-card hover:border-primary/40 cursor-zoom-in transition-colors"
            >
              <img src={marketplaceHero} alt="ASPIN Marketplace home page with five product lines to compare" className="w-full h-auto" />
            </button>
            <figcaption className="text-xs font-sans text-muted-foreground mt-2">
              The live marketplace: five product lines, prices shown up front.
            </figcaption>
          </figure>
        </Reveal>

        <CaseStudyTabs activeTab={activeTab} onSelect={selectTab} />

        <div
          role="tabpanel"
          id={activeTab}
          aria-labelledby={`tab-${activeTab}`}
          tabIndex={-1}
          className="scroll-mt-28 focus:outline-none"
        >

          {activeTab === "overview" && (
            <>
        {/* ───────── 01 Context ───────── */}
        <section id="context" className="scroll-mt-28 py-16 md:py-20 px-6 md:px-12 lg:px-24 max-w-5xl mx-auto">
          <Reveal className="max-w-3xl mb-12">
            <p className="text-xs font-sans font-medium tracking-[0.15em] uppercase text-primary mb-4">
              Context & origin
            </p>
            <h2 className="text-2xl md:text-4xl font-serif text-foreground leading-tight mb-6">
              Why insurance in Kenya needed a new approach
            </h2>
            <div className="space-y-4 text-base font-sans text-muted-foreground leading-relaxed">
              <p>
                Insurance reached just <strong className="text-foreground">2.2% of GDP</strong> in H1 2025, against a
                7.4% global average — premiums are growing, but reach is shrinking. The gap isn't products: Kenya has
                57 licensed insurers. It's that nothing makes comparing and buying from them simple.
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
                        <span className="text-xs font-sans font-semibold text-white mix-blend-difference whitespace-nowrap">{bar.pct}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs font-sans text-muted-foreground mt-4">Source: IRA H1 2025 · CBK · Allianz Global Insurance Report 2025</p>
            </div>
          </Reveal>

          <div className="max-w-4xl">
            <StatCounters
              stats={[
                { target: 57, label: "Licensed insurers", note: "IRA list, March 2025" },
                { target: 63.2, decimals: 1, suffix: "%", label: "Say cover is unaffordable", note: "FinAccess 2024" },
                { target: 1842, label: "Complaints to the IRA", note: "in 2024" },
                { target: 395, prefix: "KES ", suffix: "bn", label: "Gross premiums", note: "FY 2024, yet reach is falling" },
              ]}
            />
          </div>

          <Reveal delay={200} className="mt-8 max-w-3xl">
            <div className="p-5 rounded-lg border border-primary/20 bg-primary/5">
              <p className="text-xs font-sans font-medium tracking-[0.1em] uppercase text-primary mb-2">Research Note</p>
              <p className="text-sm font-sans text-muted-foreground leading-relaxed">
                63.2% of Kenyans say insurance is unaffordable — yet most don't know motor cover starts at
                KES 7,500/yr. The barrier is <strong className="text-foreground">partly informational, not purely economic</strong>,
                and no one shows prices before the form.
              </p>
            </div>
          </Reveal>
        </section>

        <div className="border-t border-border" />

        {/* ───────── 03 Problem ───────── */}
        <section id="problem" className="scroll-mt-28 py-16 md:py-20 px-6 md:px-12 lg:px-24 max-w-5xl mx-auto">
          <Reveal className="max-w-3xl mb-10">
            <p className="text-xs font-sans font-medium tracking-[0.15em] uppercase text-primary mb-4">
              Problem Definition
            </p>
            <h2 className="text-2xl md:text-4xl font-serif text-foreground leading-tight mb-6">
              A system broken at multiple layers
            </h2>
            <p className="text-base font-sans text-muted-foreground leading-relaxed">
              Buying insurance in Kenya breaks down at three layers, one after another.
            </p>
          </Reveal>

          <ProblemCards
            problems={[
              {
                icon: SearchX,
                title: "Discovery",
                text: "People don't know what exists or what it costs. 63.2% say cover is unaffordable, yet most have never seen a starting price.",
              },
              {
                icon: Hourglass,
                title: "Process",
                text: "Buying means agent calls or separate visits to each of 57 insurers — slow, opaque and full of jargon.",
              },
              {
                icon: ShieldAlert,
                title: "Trust",
                text: "1,842 complaints to the IRA in 2024 and long claims delays have damaged confidence across the industry.",
              },
            ]}
          />
        </section>
            </>
          )}

          {activeTab === "research" && (
            <>
        {/* ───────── 02 AI Research ───────── */}
        <section id="ai-research" className="scroll-mt-28 py-16 md:py-20 px-6 md:px-12 lg:px-24 max-w-5xl mx-auto">
          <Reveal className="max-w-3xl mb-10">
            <p className="text-xs font-sans font-medium tracking-[0.15em] uppercase text-primary mb-4">
              AI-Assisted Research Process
            </p>
            <h2 className="text-2xl md:text-4xl font-serif text-foreground leading-tight mb-6">
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

        {/* ───────── 05 Competitive Landscape ───────── */}
        <section id="competitors" className="scroll-mt-28 py-16 md:py-20 px-6 md:px-12 lg:px-24 max-w-5xl mx-auto">
          <Reveal className="max-w-3xl mb-10">
            <p className="text-xs font-sans font-medium tracking-[0.15em] uppercase text-primary mb-4">
              Competitive Landscape
            </p>
            <h2 className="text-2xl md:text-4xl font-serif text-foreground leading-tight mb-4">
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
                  { name: "ASPIN Marketplace", scores: [1, 1, 1, 1, 1, 1, 1], highlight: true },
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
                        <span className="text-[11px] font-sans text-muted-foreground">{label}</span>
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
                      <span className="text-[11px] font-sans text-muted-foreground">{l.label}</span>
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
                  { name: "ASPIN Marketplace", values: ["✓", "✓", "✓", "✓", "✓", "Deep", "Instant"], highlight: true },
                ].map((row) => (
                  <tr
                    key={row.name}
                    className={`transition-colors duration-200 ${row.highlight ? "bg-primary/5 font-medium" : "hover:bg-muted/50"}`}
                  >
                    <td className={`py-3 pr-4 ${row.highlight ? "text-foreground" : "text-muted-foreground"}`}>
                      {row.name}
                    </td>
                    {row.values.map((v, i) => (
                      <td key={i} className={`text-center py-3 px-2 ${v === "✓" || v === "Deep" || v === "Instant" || v === "Fast" ? (row.highlight ? "text-primary font-semibold" : "text-foreground") : "text-muted-foreground"}`}>
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
            </>
          )}

          {activeTab === "system" && (
            <>
        {/* ───────── 04 Systems Architecture — Accordion ───────── */}
        <section id="system-map" className="scroll-mt-28 py-16 md:py-20 px-6 md:px-12 lg:px-24 max-w-5xl mx-auto">
          <Reveal className="max-w-3xl mb-10">
            <p className="text-xs font-sans font-medium tracking-[0.15em] uppercase text-primary mb-4">
              Systems Architecture
            </p>
            <h2 className="text-2xl md:text-4xl font-serif text-foreground leading-tight mb-4">
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
              { number: "01", title: "User Layer", defaultOpen: true, text: "Three segments: vehicle owners (motor cover is mandatory), families seeking health cover, and SME operators no competitor serves well. Their shared fears: data misuse, hidden costs, and unpaid claims." },
              { number: "02", title: "Product Layer", text: "Five product lines, each its own journey with its own questions, insurers and comparison points. One generic form would hurt completion across all five." },
              { number: "03", title: "Insurer Network Layer", text: "57 licensed insurers, with no paid placement: results are ordered by price and coverage match. Neutrality is both the ethical and the commercial choice." },
              { number: "04", title: "Regulatory Layer", text: "The IRA is actively reforming in 2025 — sandboxes, risk-based supervision and new claims guidelines. ASPIN is designed to align with that direction, not just comply with today's rules." },
              { number: "05", title: "Payment Infrastructure Layer", text: "M-Pesa is the primary path, not an option. The phone number from the quote pre-fills checkout, removing the most common drop-off point in Kenyan fintech." },
            ].map((item) => (
              <AccordionItem key={item.number} {...item} />
            ))}
          </Reveal>
        </section>
            </>
          )}

          {activeTab === "design" && (
            <>
        {/* ───────── Key decisions ───────── */}
        <section id="decisions" className="scroll-mt-28 py-16 md:py-20 px-6 md:px-12 lg:px-24 max-w-5xl mx-auto">
          <Reveal className="max-w-3xl mb-10">
            <p className="text-xs font-sans font-medium tracking-[0.15em] uppercase text-primary mb-4">
              Key decisions
            </p>
            <h2 className="text-2xl md:text-4xl font-serif text-foreground leading-tight">
              Three decisions that shape the experience
            </h2>
          </Reveal>
          <DecisionCards
            decisions={[
              {
                title: "Show prices before the form",
                problem: "Prices stay hidden until after a long form, so people assume cover is unaffordable.",
                decision: "Starting prices on every product card and page, before any questions.",
                result: "People see what cover costs before they commit any time.",
              },
              {
                title: "Compare side by side, neutrally",
                problem: "Comparing meant calling agents or visiting insurers one by one.",
                decision: "Quotes from several licensed insurers on one page, ranked by price and cover, with no paid placement.",
                result: "Comparison in minutes, without an agent.",
              },
              {
                title: "M-Pesa first, no retyping",
                problem: "Re-entering payment details is the most common checkout drop-off.",
                decision: "The quote's phone number pre-fills M-Pesa, and bank sign-in pre-fills the form.",
                result: "Fewer steps from quote to active policy.",
              },
            ]}
          />
        </section>

        <div className="border-t border-border" />

        {/* ───────── 06 Product Design — Vertical Tabs ───────── */}
        <section id="products" className="scroll-mt-28 py-16 md:py-20 px-6 md:px-12 lg:px-24 max-w-5xl mx-auto">
          <Reveal className="max-w-3xl mb-10">
            <p className="text-xs font-sans font-medium tracking-[0.15em] uppercase text-primary mb-4">
              Product Design
            </p>
            <h2 className="text-2xl md:text-4xl font-serif text-foreground leading-tight mb-4">
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
                    <span className={`text-xs font-sans font-medium tracking-[0.1em] uppercase px-2 py-1 rounded ${v.tagColor}`}>{v.tag}</span>
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
        <section id="journey" className="scroll-mt-28 py-16 md:py-20 px-6 md:px-12 lg:px-24 max-w-5xl mx-auto">
          <Reveal className="max-w-3xl mb-10">
            <p className="text-xs font-sans font-medium tracking-[0.15em] uppercase text-primary mb-4">
              User Journey Design
            </p>
            <h2 className="text-2xl md:text-4xl font-serif text-foreground leading-tight mb-4">
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
                      <span className="text-xs font-sans font-medium tracking-[0.1em] uppercase text-primary shrink-0">{stage.step}</span>
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
                  <p className={`text-2xl font-serif mb-2 transition-colors ${activeStep === i ? "text-primary" : "text-muted-foreground/70"}`}>{s.step}</p>
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
                  <p className="text-xs font-sans font-medium tracking-[0.15em] uppercase text-primary mb-2">Step {s.step}</p>
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
        <section id="trust" className="scroll-mt-28 py-16 md:py-20 px-6 md:px-12 lg:px-24 max-w-5xl mx-auto">
          <Reveal className="max-w-3xl mb-10">
            <p className="text-xs font-sans font-medium tracking-[0.15em] uppercase text-primary mb-4">
              Trust Design
            </p>
            <h2 className="text-2xl md:text-4xl font-serif text-foreground leading-tight mb-4">
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
                        <span className="text-xs font-sans font-medium tracking-[0.05em] uppercase text-muted-foreground leading-tight block">{stage}</span>
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
                            className="w-full h-7 rounded flex items-center justify-center text-xs font-sans font-medium transition-all"
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
                      <span className="text-xs font-sans text-muted-foreground ml-3 w-24 shrink-0">{row.label}</span>
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
            </>
          )}

          {activeTab === "staging" && (
            <>
        {/* ───────── Staging walkthrough ───────── */}
        <section id="staging-build" className="scroll-mt-28 py-16 md:py-20 px-6 md:px-12 lg:px-24 max-w-5xl mx-auto">
          <Reveal className="max-w-3xl mb-10">
            <p className="text-xs font-sans font-medium tracking-[0.15em] uppercase text-primary mb-4">
              The product
            </p>
            <h2 className="text-2xl md:text-3xl font-serif text-foreground leading-snug mb-4">
              From landing page to active policy, in ten screens.
            </h2>
            <p className="text-base md:text-lg font-sans text-muted-foreground leading-relaxed">
              The live motor journey — the funnel from the Design chapter, built: price
              anchors before the form, quotes side by side, bank sign-in to skip retyping, and
              mobile money at checkout.
            </p>
            <p className="text-xs font-sans text-muted-foreground mt-4">
              Screens with sample data. Personal details are blurred for privacy.
            </p>
          </Reveal>

          <div className="grid sm:grid-cols-2 gap-4">
            {walkthrough.map((img, i) => (
              <button
                key={img.alt}
                onClick={() => {
                  setLightboxIndex(i);
                  trackEvent("walkthrough_screen_opened", { case_study: "aspin-marketplace", screen: i + 1 });
                }}
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
                  <span className="font-medium text-primary mr-1.5">{String(i + 1).padStart(2, "0")}</span>
                  {img.alt}
                </p>
              </button>
            ))}
          </div>
        </section>
            </>
          )}

          {activeTab === "learnings" && (
            <>
        {/* ───────── 09 Reflections — Expandable principles ───────── */}
        <section id="reflections" className="scroll-mt-28 py-16 md:py-20 px-6 md:px-12 lg:px-24 max-w-5xl mx-auto">
          <Reveal className="max-w-3xl mb-10">
            <p className="text-xs font-sans font-medium tracking-[0.15em] uppercase text-primary mb-4">
              Reflections & Design Principles
            </p>
            <h2 className="text-2xl md:text-4xl font-serif text-foreground leading-tight mb-4">
              What live research and systems thinking revealed
            </h2>
            <p className="text-sm font-sans text-muted-foreground leading-relaxed">
              Six principles for any product in a low-trust, regulated financial category.
            </p>
          </Reveal>

          <div className="max-w-4xl">
            <Takeaways
              items={[
              { title: "Verify AI outputs — the correction is part of the methodology", text: "The first AI research claimed no comparison platforms existed and understated prices. Checking live sources caught both errors." },
              { title: "Map the system before designing the screen", text: "What looked like a checkout UX problem was really a payments problem (re-entering M-Pesa details), solved earlier, at the quote stage." },
              { title: "Transparency is a conversion mechanic, not just an ethical position", text: "Showing exclusions, licences and prices up front reduces uncertainty — and in a low-trust category, less uncertainty converts." },
              { title: "Infrastructure is UX — M-Pesa is not a feature", text: "A smooth M-Pesa checkout is only possible because the system treated M-Pesa as a first-class constraint from day one." },
              { title: "Price anchors resolve imagined affordability barriers", text: "Most people who say insurance is unaffordable have never seen a starting price. Showing one first removes a barrier that's partly imagined." },
              { title: "Regulatory alignment is a product strategy", text: "Regulation is moving toward transparency and faster claims — the same direction as good design. Aligning early puts the product ahead of slower incumbents." },
              ]}
            />
          </div>
        </section>

        <div className="border-t border-border" />

        {/* ───────── 10 Status ───────── */}
        <section id="next-steps" className="scroll-mt-28 py-16 md:py-20 px-6 md:px-12 lg:px-24 max-w-5xl mx-auto">
          <Reveal className="max-w-3xl mb-10">
            <p className="text-xs font-sans font-medium tracking-[0.15em] uppercase text-primary mb-4">
              Where it is now
            </p>
            <h2 className="text-2xl md:text-4xl font-serif text-foreground leading-tight mb-4">
              Live, and in front of partners across Africa
            </h2>
            <p className="text-base font-sans text-muted-foreground leading-relaxed">
              The marketplace is built and running, and is now being pitched to partners across Africa.
              The research, system map and trust framework behind it are what make it adaptable to new markets.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-10 max-w-4xl">
            <Reveal>
              <p className="text-xs font-sans font-medium tracking-[0.15em] uppercase text-primary mb-4">Built</p>
              <ul className="space-y-3">
                {[
                  "AI-assisted market research across Kenya's 57 IRA-licensed insurers, verified against March 2025 IRA published list",
                  "Competitive analysis of all four real platforms with feature-level accuracy",
                  "Systems mapping of all five platform layers",
                  "Corrected pricing framework verified against live 2025 sources",
                  "Trust design framework with seven documented mechanisms",
                  "Live motor journey: product pages, quotes, payment plans, documents, payment and policy issuance",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm font-sans text-muted-foreground leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={100}>
              <p className="text-xs font-sans font-medium tracking-[0.15em] uppercase text-muted-foreground mb-4">Next</p>
              <ul className="space-y-3">
                {[
                  "Partner pilots in new African markets",
                  "Usability testing with real customers on quotes, comparison and checkout",
                  "Live pricing integrations with more insurers",
                  "Roadmap for COMESA and WIBA product lines",
                  "Regulatory pathway with the IRA",
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

        <div className="border-t border-border" />

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
              View the live demo
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </Reveal>
        </section>
            </>
          )}

          <NextTabButton activeTab={activeTab} onSelect={selectTab} />
        </div>

        <div className="border-t border-border" />

        <CaseStudyEnd slug="aspin-marketplace" />
      </main>

      {lightboxIndex !== null && (
        <ImageLightbox
          images={walkthrough}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </div>
  );
};

export default AspinMarketplaceCaseStudy;
