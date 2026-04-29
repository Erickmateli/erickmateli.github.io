import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import posthog from "posthog-js";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import CaseStudyDetail from "./pages/CaseStudyDetail.tsx";
import FeaturedCaseStudy from "./pages/FeaturedCaseStudy.tsx";
import YellowPagesCaseStudy from "./pages/YellowPagesCaseStudy.tsx";
import NotFound from "./pages/NotFound.tsx";
import { useVisitNotification } from "./hooks/use-visit-notification.ts";

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
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/case-study/aspin" element={<FeaturedCaseStudy />} />
          <Route path="/case-study/yellow-pages" element={<YellowPagesCaseStudy />} />
          <Route path="/case-study/:slug" element={<CaseStudyDetail />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
