import posthog from "posthog-js";
import emailjs from "@emailjs/browser";
import { GEO_CACHE_KEY } from "@/hooks/use-visit-notification";

export function trackEvent(name: string, properties?: Record<string, any>) {
  posthog.capture(name, properties);

  try {
    const geo = JSON.parse(sessionStorage.getItem(GEO_CACHE_KEY) || "{}");

    const details =
      properties && Object.keys(properties).length > 0
        ? Object.entries(properties)
            .map(([k, v]) => `${k}: ${v}`)
            .join("\n")
        : "—";

    emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_EVENT_TEMPLATE_ID,
      {
        event_name: name,
        details,
        page: window.location.href,
        country: geo.country_name || "Unknown",
        city: geo.city || "Unknown",
        time: new Date().toLocaleString("en-GB", { timeZone: "Africa/Nairobi" }),
      },
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
    );
  } catch {
    // Silent fail
  }
}
