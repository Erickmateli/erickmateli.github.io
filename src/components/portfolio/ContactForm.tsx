import { useId, useRef, useState, type FormEvent } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { capture } from "@/lib/analytics";
import { EMAIL } from "@/lib/links";

const TOPICS = ["Job opportunity", "Freelance project", "Collaboration", "Something else"] as const;

type Fields = { name: string; email: string; company: string; topic: string; message: string };
type Errors = Partial<Record<"name" | "email" | "message", string>>;
type Status = "idle" | "sending" | "sent" | "mailto" | "error";

const empty: Fields = { name: "", email: "", company: "", topic: "", message: "" };

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (!f.name.trim()) e.name = "Enter your name.";
  if (!f.email.trim()) e.email = "Enter your email so I can reply.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) e.email = "That email doesn't look right. Check it and try again.";
  if (f.message.trim().length < 10) e.message = "Add a few words about what you need (at least 10 characters).";
  return e;
}

const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const templateId = import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID;
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const ContactForm = () => {
  const id = useId();
  const [fields, setFields] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [honeypot, setHoneypot] = useState("");
  const startedAt = useRef(Date.now());
  const refs = { name: useRef<HTMLInputElement>(null), email: useRef<HTMLInputElement>(null), message: useRef<HTMLTextAreaElement>(null) };

  const set = (key: keyof Fields) => (value: string) => {
    setFields((f) => ({ ...f, [key]: value }));
    if (key in errors) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const mailtoHref = () => {
    const subject = `${fields.topic || "Enquiry"} from ${fields.name || "your portfolio"}`;
    const body = `${fields.message}\n\n— ${fields.name}${fields.company ? `, ${fields.company}` : ""}\n${fields.email}`;
    return `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const found = validate(fields);
    setErrors(found);
    const first = (["name", "email", "message"] as const).find((k) => found[k]);
    if (first) {
      refs[first].current?.focus();
      return;
    }

    // Bots fill hidden fields or submit instantly; pretend it worked and send nothing.
    if (honeypot || Date.now() - startedAt.current < 2500) {
      setStatus("sent");
      return;
    }

    const topic = fields.topic || "Something else";
    if (!serviceId || !templateId || !publicKey) {
      window.location.href = mailtoHref();
      setStatus("mailto");
      capture("contact_form_submitted", { topic, via: "mailto" });
      return;
    }

    setStatus("sending");
    try {
      const { default: emailjs } = await import("@emailjs/browser");
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: fields.name.trim(),
          reply_to: fields.email.trim(),
          company: fields.company.trim() || "—",
          enquiry_type: topic,
          message: fields.message.trim(),
          page: window.location.href,
          time: new Date().toLocaleString("en-GB", { timeZone: "Africa/Nairobi" }),
        },
        publicKey,
      );
      setStatus("sent");
      capture("contact_form_submitted", { topic, via: "emailjs" });
    } catch {
      setStatus("error");
      capture("contact_form_failed", { topic });
    }
  };

  if (status === "sent" || status === "mailto") {
    return (
      <div role="status" className="rounded-lg border border-primary/30 bg-primary/5 p-8 text-left">
        <CheckCircle2 className="w-8 h-8 text-primary mb-4" aria-hidden="true" />
        <p className="text-xl font-serif text-foreground mb-2">
          {status === "sent" ? "Thanks — your message is on its way." : "Your email app should have opened."}
        </p>
        <p className="text-sm font-sans text-muted-foreground leading-relaxed mb-6">
          {status === "sent"
            ? "I'll reply to the email you gave me as soon as I can."
            : `If it didn't, email me directly at ${EMAIL}.`}
        </p>
        <button
          type="button"
          onClick={() => {
            setFields(empty);
            setStatus("idle");
            startedAt.current = Date.now();
          }}
          className="text-sm font-sans font-medium text-primary hover:text-foreground transition-colors"
        >
          Send another message
        </button>
      </div>
    );
  }

  const input =
    "w-full rounded-md border bg-background px-3.5 py-2.5 text-sm font-sans text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors";
  const label = "block text-sm font-sans font-medium text-foreground mb-1.5";
  const errorText = "text-xs font-sans text-destructive mt-1.5";
  const border = (key: keyof Errors) => (errors[key] ? "border-destructive" : "border-border");

  return (
    <form onSubmit={onSubmit} noValidate className="relative rounded-lg border border-border bg-card p-6 md:p-8 text-left space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor={`${id}-name`} className={label}>
            Name
          </label>
          <input
            ref={refs.name}
            id={`${id}-name`}
            autoComplete="name"
            value={fields.name}
            onChange={(e) => set("name")(e.target.value)}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? `${id}-name-error` : undefined}
            placeholder="Jane Wanjiru"
            className={`${input} ${border("name")}`}
          />
          {errors.name && <p id={`${id}-name-error`} className={errorText}>{errors.name}</p>}
        </div>
        <div>
          <label htmlFor={`${id}-email`} className={label}>
            Email
          </label>
          <input
            ref={refs.email}
            id={`${id}-email`}
            type="email"
            autoComplete="email"
            value={fields.email}
            onChange={(e) => set("email")(e.target.value)}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? `${id}-email-error` : undefined}
            placeholder="jane@company.com"
            className={`${input} ${border("email")}`}
          />
          {errors.email && <p id={`${id}-email-error`} className={errorText}>{errors.email}</p>}
        </div>
      </div>

      <div>
        <label htmlFor={`${id}-company`} className={label}>
          Company <span className="font-normal text-muted-foreground">(optional)</span>
        </label>
        <input
          id={`${id}-company`}
          autoComplete="organization"
          value={fields.company}
          onChange={(e) => set("company")(e.target.value)}
          placeholder="Acme Insurance"
          className={`${input} border-border`}
        />
      </div>

      <fieldset>
        <legend className={label}>
          What's it about? <span className="font-normal text-muted-foreground">(optional)</span>
        </legend>
        <div className="flex flex-wrap gap-2">
          {TOPICS.map((t) => {
            const selected = fields.topic === t;
            return (
              <label
                key={t}
                className={`cursor-pointer rounded-full border px-3.5 py-1.5 text-sm font-sans transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-primary/40 ${
                  selected ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:text-foreground hover:border-primary/40"
                }`}
              >
                <input
                  type="radio"
                  name={`${id}-topic`}
                  value={t}
                  checked={selected}
                  onChange={() => set("topic")(t)}
                  className="sr-only"
                />
                {t}
              </label>
            );
          })}
        </div>
      </fieldset>

      <div>
        <label htmlFor={`${id}-message`} className={label}>
          Message
        </label>
        <textarea
          ref={refs.message}
          id={`${id}-message`}
          rows={5}
          maxLength={2000}
          value={fields.message}
          onChange={(e) => set("message")(e.target.value)}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? `${id}-message-error` : undefined}
          placeholder="Tell me about the role, project or question."
          className={`${input} ${border("message")} resize-y`}
        />
        {errors.message && <p id={`${id}-message-error`} className={errorText}>{errors.message}</p>}
      </div>

      {/* Hidden from people; bots tend to fill it in. */}
      <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
        <label htmlFor={`${id}-website`}>Website</label>
        <input id={`${id}-website`} tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
      </div>

      {status === "error" && (
        <p role="alert" className="text-sm font-sans text-destructive">
          Your message didn't send. Try again, or{" "}
          <a href={mailtoHref()} className="underline underline-offset-2">
            email me instead
          </a>
          .
        </p>
      )}

      <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
        <p className="text-xs font-sans text-muted-foreground">I'll reply to the email you enter above.</p>
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-sans text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-70"
        >
          {status === "sending" ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
              Sending…
            </>
          ) : (
            <>
              Send message
              <Send className="w-4 h-4" aria-hidden="true" />
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
