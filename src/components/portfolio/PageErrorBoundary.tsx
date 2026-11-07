import { Component, type ReactNode } from "react";
import { capture } from "@/lib/analytics";

interface State {
  failed: boolean;
}

/** Shows a way out instead of a blank page if a page can't load or crashes. */
class PageErrorBoundary extends Component<{ children: ReactNode }, State> {
  state: State = { failed: false };

  static getDerivedStateFromError(): State {
    return { failed: true };
  }

  componentDidCatch(error: Error) {
    capture("page_error", { message: error.message, path: window.location.pathname });
  }

  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <main className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <p className="text-xs font-sans font-medium tracking-[0.15em] uppercase text-primary mb-4">Something went wrong</p>
          <h1 className="text-3xl font-serif text-foreground mb-4">This page didn't load.</h1>
          <p className="text-sm font-sans text-muted-foreground leading-relaxed mb-8">
            The site may have just been updated. Reloading usually fixes it.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-sans text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Reload the page
            </button>
            <a href="/" className="text-sm font-sans font-medium text-primary hover:text-foreground transition-colors">
              Go to the home page
            </a>
          </div>
        </div>
      </main>
    );
  }
}

export default PageErrorBoundary;
