import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { initAnalytics } from "./lib/analytics";
import { reloadForNewVersion } from "./lib/lazy-page";
import "./index.css";

// Vite fires this when a file it was asked to preload is gone (usually right after a deploy).
window.addEventListener("vite:preloadError", (event) => {
  if (reloadForNewVersion()) event.preventDefault();
});

createRoot(document.getElementById("root")!).render(<App />);
initAnalytics();
