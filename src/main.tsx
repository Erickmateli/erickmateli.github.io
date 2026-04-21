import { createRoot } from "react-dom/client";
import posthog from "posthog-js";
import App from "./App.tsx";
import "./index.css";

posthog.init("phc_U9lkFqEKSn43vJQFi7NdMuA2uO5xxAUb1nQW7FCL8yL", {
  api_host: "https://us.i.posthog.com",
  defaults: "2026-01-30",
});

createRoot(document.getElementById("root")!).render(<App />);
