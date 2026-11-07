import { lazy, type ComponentType } from "react";

// After a deploy, file names change. A tab (or a cached copy of index.html, which GitHub Pages
// keeps for up to 10 minutes) can still ask for the old ones, which now 404 and leave a blank page.
// When that happens, reload once to pick up the new version. The timestamp stops reload loops.
const RELOAD_KEY = "chunk_reload_at";

export function reloadForNewVersion(): boolean {
  try {
    const last = Number(sessionStorage.getItem(RELOAD_KEY) || 0);
    if (Date.now() - last < 30_000) return false;
    sessionStorage.setItem(RELOAD_KEY, String(Date.now()));
  } catch {
    // Storage unavailable: still try one reload.
  }
  window.location.reload();
  return true;
}

export function lazyPage<T extends ComponentType<unknown>>(load: () => Promise<{ default: T }>) {
  return lazy(() =>
    load().catch((error) => {
      if (reloadForNewVersion()) {
        // Keep Suspense showing its fallback while the page reloads.
        return new Promise<{ default: T }>(() => {});
      }
      throw error;
    }),
  );
}
