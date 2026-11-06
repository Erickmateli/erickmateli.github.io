import { trackEvent } from "@/lib/track-event";
import { EMAIL, LINKEDIN_URL, RESUME_URL } from "@/lib/links";

const ClosingSection = () => {
  return (
    <section id="contact" className="py-32 px-6 md:px-12 lg:px-24 max-w-5xl mx-auto text-center relative overflow-hidden">
      {/* Decorative concentric circles */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none">
        <svg width="600" height="600" viewBox="0 0 600 600" fill="none">
          <circle cx="300" cy="300" r="280" stroke="hsl(var(--primary))" strokeWidth="0.5" />
          <circle cx="300" cy="300" r="220" stroke="hsl(var(--primary))" strokeWidth="0.5" />
          <circle cx="300" cy="300" r="160" stroke="hsl(var(--primary))" strokeWidth="0.5" />
          <circle cx="300" cy="300" r="100" stroke="hsl(var(--primary))" strokeWidth="0.5" />
          <circle cx="300" cy="300" r="40" stroke="hsl(var(--primary))" strokeWidth="0.5" />
        </svg>
      </div>

      <div className="relative z-10">
        <h2 className="text-3xl md:text-5xl font-serif text-foreground leading-tight mb-8">
          Designing for <span className="italic text-primary">scale</span>,<br />
          bridging product &amp; engineering,<br />
          building <span className="italic text-primary">reliable</span> experiences.
        </h2>
        <p className="text-muted-foreground font-sans max-w-xl mx-auto leading-relaxed mb-12">
          I thrive in complex systems — where partner needs, user expectations, and
          engineering reality intersect. If you're building something that needs
          strategic product thinking grounded in technical depth, let's talk.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-12">
          <div className="text-center sm:text-left">
            <p className="text-xs font-sans uppercase tracking-widest text-muted-foreground mb-1">Email</p>
            <a href={`mailto:${EMAIL}`} className="font-sans text-foreground hover:text-primary transition-colors">
              {EMAIL}
            </a>
          </div>
          {LINKEDIN_URL && (
            <>
              <div className="hidden sm:block w-px h-8 bg-border" />
              <div className="text-center sm:text-left">
                <p className="text-xs font-sans uppercase tracking-widest text-muted-foreground mb-1">LinkedIn</p>
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-foreground hover:text-primary transition-colors"
                  onClick={() => trackEvent("linkedin_clicked")}
                >
                  Connect on LinkedIn
                </a>
              </div>
            </>
          )}
          {RESUME_URL && (
            <>
              <div className="hidden sm:block w-px h-8 bg-border" />
              <div className="text-center sm:text-left">
                <p className="text-xs font-sans uppercase tracking-widest text-muted-foreground mb-1">Resume</p>
                <a
                  href={RESUME_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-foreground hover:text-primary transition-colors"
                  onClick={() => trackEvent("resume_clicked", { from: "contact" })}
                >
                  Download PDF
                </a>
              </div>
            </>
          )}
        </div>
        <a
          href={`mailto:${EMAIL}`}
          className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-primary text-primary-foreground font-sans text-sm font-medium hover:opacity-90 transition-opacity"
          onClick={() => trackEvent("get_in_touch_clicked")}
        >
          Get in Touch
        </a>
      </div>
    </section>
  );
};

export default ClosingSection;
