import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { caseStudies } from "@/lib/caseStudies";
import ImageLightbox from "@/components/portfolio/ImageLightbox";

const CaseStudyDetail = () => {
  const { slug } = useParams();
  const study = caseStudies.find((cs) => cs.slug === slug);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (!study) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-muted-foreground font-sans">Case study not found.</p>
          <Link to="/" className="text-primary font-sans text-sm hover:underline">
            ← Back to portfolio
          </Link>
        </div>
      </div>
    );
  }

  const ListSection = ({ title, items }: { title: string; items: string[] }) => (
    <div>
      <p className="text-xs font-sans font-medium tracking-[0.15em] uppercase text-primary mb-3">
        {title}
      </p>
      <ul className="space-y-2 text-sm text-muted-foreground font-sans">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
            <span className="leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-5xl mx-auto px-6 md:px-12 lg:px-24 h-14 flex items-center">
          <Link
            to="/#work"
            className="flex items-center gap-2 text-sm font-sans text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to portfolio
          </Link>
        </div>
      </nav>

      <main className="pt-14">
        {/* Hero */}
        <section className="py-16 md:py-24 px-6 md:px-12 lg:px-24 max-w-5xl mx-auto">
          <span className="text-8xl md:text-9xl font-serif text-muted-foreground/20 leading-none block mb-6">
            {study.number}
          </span>
          <h1 className="text-3xl md:text-5xl font-serif text-foreground leading-tight mb-3">
            {study.title}
          </h1>
          <p className="text-primary font-sans text-sm font-medium tracking-wide">{study.subtitle}</p>
        </section>

        {/* Context / Problem / Role */}
        <section className="px-6 md:px-12 lg:px-24 max-w-5xl mx-auto pb-16">
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            <div>
              <p className="text-xs font-sans font-medium tracking-[0.15em] uppercase text-primary mb-3">Context</p>
              <p className="text-sm text-muted-foreground font-sans leading-relaxed">{study.context}</p>
            </div>
            <div>
              <p className="text-xs font-sans font-medium tracking-[0.15em] uppercase text-primary mb-3">Problem</p>
              <p className="text-sm text-muted-foreground font-sans leading-relaxed">{study.problem}</p>
            </div>
            <div>
              <p className="text-xs font-sans font-medium tracking-[0.15em] uppercase text-primary mb-3">My Role</p>
              <p className="text-sm text-muted-foreground font-sans leading-relaxed">{study.role}</p>
            </div>
          </div>
        </section>

        <div className="border-t border-border" />

        {/* Approach / Solution / Outcome */}
        <section className="py-16 px-6 md:px-12 lg:px-24 max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            <ListSection title="Approach" items={study.approach} />
            <ListSection title="Solution" items={study.solution} />
            <ListSection title="Outcome" items={study.outcome} />
          </div>
        </section>

        {/* Screenshots */}
        {study.images && study.images.length > 0 && (
          <>
            <div className="border-t border-border" />
            <section className="py-16 px-6 md:px-12 lg:px-24 max-w-5xl mx-auto">
              <p className="text-xs font-sans font-medium tracking-[0.15em] uppercase text-primary mb-8">
                Project Screenshots
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {study.images.map((img, i) => (
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
                    <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors" />
                    <p className="text-xs font-sans text-muted-foreground px-3 py-2 bg-card border-t border-border">
                      {img.alt}
                    </p>
                  </button>
                ))}
              </div>
            </section>
          </>
        )}

        <div className="border-t border-border" />

        {/* Reflection */}
        <section className="py-16 px-6 md:px-12 lg:px-24 max-w-5xl mx-auto">
          <div className="max-w-3xl">
            <p className="text-xs font-sans font-medium tracking-[0.15em] uppercase text-primary mb-4">
              Reflection
            </p>
            <blockquote className="text-lg md:text-xl font-serif text-foreground/80 leading-relaxed italic">
              "{study.reflection}"
            </blockquote>
          </div>
        </section>

        {/* Back link */}
        <section className="pb-16 px-6 md:px-12 lg:px-24 max-w-5xl mx-auto">
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
      {lightboxIndex !== null && study.images && (
        <ImageLightbox
          images={study.images}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </div>
  );
};

export default CaseStudyDetail;
