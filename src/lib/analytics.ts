import type { PostHog } from "posthog-js";

// PostHog is loaded after the page is interactive so it doesn't slow down the first paint.
// Events captured before it loads are queued on the promise and sent once it's ready.
let client: Promise<PostHog | null> | null = null;

function isBot() {
  return typeof navigator !== "undefined" && (navigator.webdriver || /bot|crawl|spider|preview/i.test(navigator.userAgent));
}

export function initAnalytics() {
  if (client) return client;
  if (isBot()) {
    client = Promise.resolve(null);
    return client;
  }
  client = new Promise((resolve) => {
    const load = () =>
      import("posthog-js")
        .then(({ default: posthog }) => {
          posthog.init("phc_U9lkFqEKSn43vJQFi7NdMuA2uO5xxAUb1nQW7FCL8yL", {
            api_host: "https://us.i.posthog.com",
            defaults: "2026-01-30",
          });
          resolve(posthog);
        })
        .catch(() => resolve(null));
    if ("requestIdleCallback" in window) window.requestIdleCallback(load, { timeout: 3000 });
    else setTimeout(load, 1500);
  });
  return client;
}

export function capture(event: string, properties?: Record<string, unknown>) {
  initAnalytics().then((posthog) => posthog?.capture(event, properties));
}
