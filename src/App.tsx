import { lazy, Suspense, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import posthog from "posthog-js";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import { useVisitNotification } from "./hooks/use-visit-notification.ts";

// Case studies load on demand so the home page ships less JavaScript.
const CaseStudyDetail = lazy(() => import("./pages/CaseStudyDetail.tsx"));
const FeaturedCaseStudy = lazy(() => import("./pages/FeaturedCaseStudy.tsx"));
const YellowPagesCaseStudy = lazy(() => import("./pages/YellowPagesCaseStudy.tsx"));
const AspinMarketplaceCaseStudy = lazy(() => import("./pages/AspinMarketplaceCaseStudy.tsx"));

const queryClient = new QueryClient();

function PostHogPageView() {
  const location = useLocation();
  useVisitNotification();
  useEffect(() => {
    posthog.capture("$pageview");
  }, [location]);
  return null;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <PostHogPageView />
        <Suspense fallback={<div className="min-h-screen bg-background" />}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/case-study/aspin" element={<FeaturedCaseStudy />} />
          <Route path="/case-study/yellow-pages" element={<YellowPagesCaseStudy />} />
          <Route path="/case-study/aspin-marketplace" element={<AspinMarketplaceCaseStudy />} />
          <Route path="/case-study/:slug" element={<CaseStudyDetail />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
