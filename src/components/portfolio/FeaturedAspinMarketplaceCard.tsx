import { Link } from "react-router-dom";
import { ArrowRight, Star } from "lucide-react";
import { trackEvent } from "@/lib/track-event";

const FeaturedAspinMarketplaceCard = () => {
  return (
    <article className="border border-primary/20 rounded-lg overflow-hidden bg-card mb-12">
      <div className="grid md:grid-cols-2 gap-0">
        {/* Visual panel */}
        <div className="aspect-[4/3] md:aspect-auto overflow-hidden bg-muted relative flex items-center justify-center p-10">
          {/* Abstract data-driven pattern */}
          <svg viewBox="0 0 400 300" className="w-full h-full opacity-20 absolute inset-0" preserveAspectRatio="xMidYMid slice">
            {Array.from({ length: 6 }).map((_, i) => (
              <rect key={`r${i}`} x={i * 66} y={0} width={60} height={300} fill="hsl(var(--primary))" opacity={0.05 + i * 0.04} />
            ))}
            {Array.from({ length: 5 }).map((_, i) => (
              <line key={`l${i}`} x1={0} y1={i * 60 + 30} x2={400} y2={i * 60 + 30} stroke="hsl(var(--primary))" strokeWidth="0.5" opacity={0.4} />
            ))}
            {[
              [50, 220], [116, 160], [182, 100], [248, 130], [314, 80], [380, 50],
            ].map(([x, y], i, arr) => (
              <g key={`p${i}`}>
                {i < arr.length - 1 && (
                  <line x1={x} y1={y} x2={arr[i + 1][0]} y2={arr[i + 1][1]} stroke="hsl(var(--primary))" strokeWidth="1.5" opacity={0.6} />
                )}
                <circle cx={x} cy={y} r={4} fill="hsl(var(--primary))" opacity={0.8} />
              </g>
            ))}
          </svg>
          <div className="relative z-10 text-center">
            <p className="text-4xl font-serif text-primary mb-2">57</p>
            <p className="text-xs font-sans font-medium tracking-[0.15em] uppercase text-muted-foreground">IRA-Licensed Insurers</p>
            <p className="text-xs font-sans text-muted-foreground mt-1">One platform to compare them all</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 md:p-10 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-4">
            <Star className="w-3.5 h-3.5 text-primary fill-primary" />
            <span className="text-[10px] font-sans font-medium tracking-[0.2em] uppercase text-primary">
              Featured Case Study
            </span>
          </div>

          <h3 className="text-2xl md:text-3xl font-serif text-foreground leading-tight mb-2">
            ASPIN Marketplace
          </h3>
          <p className="text-primary font-sans text-sm font-medium mb-4">
            Kenya's Insurance Comparison Platform
          </p>
          <p className="text-sm font-sans text-muted-foreground leading-relaxed mb-6">
            An AI-assisted research and systems thinking case study. Designing Kenya's first fully
            self-serve insurance comparison platform across 5 verticals — Motor, Health, Home,
            Travel, and Business — with trust design built into every step.
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {["Systems Thinking", "AI Research", "UX Design", "Fintech"].map((tag) => (
              <span key={tag} className="text-[10px] font-sans font-medium tracking-[0.1em] uppercase text-muted-foreground border border-border rounded px-2 py-1">
                {tag}
              </span>
            ))}
          </div>

          <Link
            to="/case-study/aspin-marketplace"
            className="inline-flex items-center gap-2 text-sm font-sans font-medium text-primary hover:text-foreground transition-colors"
            onClick={() => trackEvent("read_full_story_clicked", { case_study: "aspin-marketplace" })}
          >
            Read the full story
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default FeaturedAspinMarketplaceCard;
