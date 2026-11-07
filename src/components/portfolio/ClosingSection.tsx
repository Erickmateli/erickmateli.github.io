import { FileText, Linkedin, Mail } from "lucide-react";
import { trackEvent } from "@/lib/track-event";
import { EMAIL, LINKEDIN_URL, RESUME_URL } from "@/lib/links";
import ContactForm from "./ContactForm";

const ClosingSection = () => {
  const links = [
    { icon: Mail, label: "Email", text: EMAIL, href: `mailto:${EMAIL}`, event: "get_in_touch_clicked", external: false },
    LINKEDIN_URL && { icon: Linkedin, label: "LinkedIn", text: "Connect on LinkedIn", href: LINKEDIN_URL, event: "linkedin_clicked", external: true },
    RESUME_URL && { icon: FileText, label: "Resume", text: "Download PDF", href: RESUME_URL, event: "resume_clicked", external: true },
  ].filter(Boolean) as { icon: typeof Mail; label: string; text: string; href: string; event: string; external: boolean }[];

  return (
    <section id="contact" className="scroll-mt-14 py-24 md:py-32 px-6 md:px-12 lg:px-24 max-w-5xl mx-auto relative overflow-hidden">
      {/* Decorative concentric circles */}
      <div className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none">
        <svg width="600" height="600" viewBox="0 0 600 600" fill="none">
          <circle cx="300" cy="300" r="280" stroke="hsl(var(--primary))" strokeWidth="0.5" />
          <circle cx="300" cy="300" r="220" stroke="hsl(var(--primary))" strokeWidth="0.5" />
          <circle cx="300" cy="300" r="160" stroke="hsl(var(--primary))" strokeWidth="0.5" />
          <circle cx="300" cy="300" r="100" stroke="hsl(var(--primary))" strokeWidth="0.5" />
          <circle cx="300" cy="300" r="40" stroke="hsl(var(--primary))" strokeWidth="0.5" />
        </svg>
      </div>

      <div className="relative z-10">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-5xl font-serif text-foreground leading-tight mb-8">
            Designing for <span className="italic text-primary">scale</span>,<br />
            bridging product &amp; engineering,<br />
            building <span className="italic text-primary">reliable</span> experiences.
          </h2>
          <p className="text-muted-foreground font-sans max-w-xl mx-auto leading-relaxed">
            Hiring, starting a project, or curious about my work? Send me a message — I read every one.
          </p>
        </div>

        <div className="grid md:grid-cols-[1fr_1.7fr] gap-8 md:gap-12 items-start">
          <ul className="space-y-5">
            {links.map(({ icon: Icon, label, text, href, event, external }) => (
              <li key={label} className="flex items-start gap-4">
                <span className="shrink-0 w-10 h-10 rounded-md bg-primary/10 text-primary flex items-center justify-center">
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-sans uppercase tracking-widest text-muted-foreground mb-0.5">{label}</p>
                  <a
                    href={href}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="font-sans text-foreground hover:text-primary transition-colors break-words"
                    onClick={() => trackEvent(event, { from: "contact" })}
                  >
                    {text}
                  </a>
                </div>
              </li>
            ))}
          </ul>

          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default ClosingSection;
