import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { capture } from "./lib/analytics";
import { lazyPage } from "./lib/lazy-page";
import PageErrorBoundary from "./components/portfolio/PageErrorBoundary";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import { useVisitNotification } from "./hooks/use-visit-notification.ts";

// Case studies load on demand so the home page ships less JavaScript.
const FeaturedCaseStudy = lazyPage(() => import("./pages/FeaturedCaseStudy.tsx"));
const YellowPagesCaseStudy = lazyPage(() => import("./pages/YellowPagesCaseStudy.tsx"));
const AspinMarketplaceCaseStudy = lazyPage(() => import("./pages/AspinMarketplaceCaseStudy.tsx"));

// Dev-only preview of the case study kit; Vite drops this from production builds.
const CaseStudyKit = import.meta.env.DEV ? lazy(() => import("./pages/dev/CaseStudyKit.tsx")) : null;

function PostHogPageView() {
  const location = useLocation();
  useVisitNotification();
  useEffect(() => {
    capture("$pageview");
  }, [location]);

  useEffect(() => {
    // "instant" overrides the site-wide smooth scrolling so new pages start at the right spot.
    if (location.hash) {
      document.getElementById(location.hash.slice(1))?.scrollIntoView({ behavior: "instant" });
    } else {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [location.pathname, location.hash]);
  return null;
}

const App = () => (
  <BrowserRouter>
    <PostHogPageView />
    <PageErrorBoundary>
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/case-study/aspin" element={<FeaturedCaseStudy />} />
        <Route path="/case-study/yellow-pages" element={<YellowPagesCaseStudy />} />
        <Route path="/case-study/aspin-marketplace" element={<AspinMarketplaceCaseStudy />} />
        {CaseStudyKit && <Route path="/dev/case-study-kit" element={<CaseStudyKit />} />}
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
    </PageErrorBoundary>
  </BrowserRouter>
);

export default App;
