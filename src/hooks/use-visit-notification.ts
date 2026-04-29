import { useEffect } from "react";
import emailjs from "@emailjs/browser";

const SESSION_KEY = "portfolio_visit_notified";
export const GEO_CACHE_KEY = "portfolio_geo";

export function useVisitNotification() {
  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) return;

    const notify = async () => {
      try {
        const geo = await fetch("https://ipapi.co/json/").then((r) => r.json());

        // Cache geo for reuse by event notifications
        sessionStorage.setItem(
          GEO_CACHE_KEY,
          JSON.stringify({
            country_name: geo.country_name || "Unknown",
            city: geo.city || "Unknown",
            region: geo.region || "Unknown",
          }),
        );

        await emailjs.send(
          import.meta.env.VITE_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
          {
            country: geo.country_name || "Unknown",
            city: geo.city || "Unknown",
            region: geo.region || "Unknown",
            time: new Date().toLocaleString("en-GB", { timeZone: "Africa/Nairobi" }),
            page: window.location.href,
            referrer: document.referrer || "Direct",
          },
          import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
        );

        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        // Silent fail — never affects visitor UX
      }
    };

    notify();
  }, []);
}
