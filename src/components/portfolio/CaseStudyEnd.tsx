import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { trackEvent } from "@/lib/track-event";
import { EMAIL, LINKEDIN_URL, RESUME_URL } from "@/lib/links";
import { nextCaseStudy, type CaseStudySlug } from "@/lib/case-study-meta";

const CaseStudyEnd = ({ slug }: { slug: CaseStudySlug }) => {
  const next = nextCaseStudy(slug);

  return (
    <>
      <section className="py-16 md:py-20 px-6 md:px-12 lg:px-24 max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-4">
          <Link
            to={`/case-study/${next.slug}`}
            className="group rounded-lg border border-border bg-card p-6 md:p-8 hover:border-primary/40 transition-colors"
            onClick={() => trackEvent("next_case_study_clicked", { from: slug, to: next.slug })}
          >
            <p className="text-xs font-sans font-medium tracking-[0.15em] uppercase text-primary mb-3">
              Next case study
            </p>
            <p className="text-sm font-sans text-muted-foreground mb-1">{next.project}</p>
            <p className="text-xl md:text-2xl font-serif text-foreground leading-snug mb-4">{next.outcome}</p>
            <span className="inline-flex items-center gap-2 text-sm font-sans font-medium text-primary">
              Read the case study
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
            </span>
          </Link>

          <div className="rounded-lg bg-primary text-primary-foreground p-6 md:p-8 flex flex-col">
            <p className="text-xs font-sans font-medium tracking-[0.15em] uppercase opacity-80 mb-3">Get in touch</p>
            <p className="text-xl md:text-2xl font-serif leading-snug mb-6">
              Building a complex product that needs to feel simple? Let's talk.
            </p>
            <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-sans font-medium">
              <Link
                to="/#contact"
                className="inline-flex items-center px-4 py-2 rounded-md bg-primary-foreground text-primary hover:opacity-90 transition-opacity"
                onClick={() => trackEvent("get_in_touch_clicked", { from: slug })}
              >
                Send a message
              </Link>
              <a href={`mailto:${EMAIL}`} className="underline underline-offset-4 hover:opacity-80">
                Email
              </a>
              {LINKEDIN_URL && (
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4 hover:opacity-80"
                  onClick={() => trackEvent("linkedin_clicked", { from: slug })}
                >
                  LinkedIn
                </a>
              )}
              {RESUME_URL && (
                <a
                  href={RESUME_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4 hover:opacity-80"
                  onClick={() => trackEvent("resume_clicked", { from: slug })}
                >
                  Resume
                </a>
              )}
            </div>
          </div>
        </div>

        <Link
          to="/#work"
          className="inline-flex items-center gap-2 mt-10 text-sm font-sans font-medium text-primary hover:text-foreground transition-colors"
          onClick={() => trackEvent("back_to_case_studies_clicked", { from: slug })}
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          Back to all case studies
        </Link>
      </section>

      <footer className="py-8 px-6 text-center text-xs text-muted-foreground font-sans border-t border-border">
        <p>© {new Date().getFullYear()} Erick Mateli — Designed &amp; built with intention.</p>
      </footer>
    </>
  );
};

export default CaseStudyEnd;
