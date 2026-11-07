// Development-only preview of the case study building blocks (not routed in production builds).
import { Gauge, LayoutGrid, Smartphone } from "lucide-react";
import ReadingProgress from "@/components/case-study/ReadingProgress";
import Reveal from "@/components/case-study/Reveal";
import StatCounters from "@/components/case-study/StatCounters";
import ProblemCards from "@/components/case-study/ProblemCards";
import ProcessStepper from "@/components/case-study/ProcessStepper";
import DecisionCards from "@/components/case-study/DecisionCards";
import BeforeAfterSlider from "@/components/case-study/BeforeAfterSlider";
import Takeaways from "@/components/case-study/Takeaways";
import CaseStudySummary from "@/components/portfolio/CaseStudySummary";
import ypBefore from "@/assets/yp-before-homepage.jpg";
import ypWireframes from "@/assets/yp-wireframes-teal.webp";
import ypAfter from "@/assets/yp-after-showcase.jpg";
import ypAnalytics2018 from "@/assets/yp-analytics-2018.webp";
import ypAnalytics2020 from "@/assets/yp-analytics-2020.webp";
import aspinBeforeCustomer from "@/assets/aspin-before-interior-customer.png";
import aspinAfterProfile from "@/assets/aspin-plus/aspin-plus-customer-profile.webp";

const Block = ({ name, children }: { name: string; children: React.ReactNode }) => (
  <section className="py-12 md:py-16 border-t border-border">
    <p className="text-xs font-mono text-muted-foreground mb-6">{name}</p>
    {children}
  </section>
);

const CaseStudyKit = () => (
  <div className="min-h-screen bg-background">
    <nav className="fixed top-0 left-0 right-0 z-50 h-14 bg-background/80 backdrop-blur-md border-b border-border flex items-center px-6">
      <span className="text-sm font-sans text-muted-foreground">Case study kit · dev preview</span>
      <ReadingProgress />
    </nav>

    <main className="pt-14 px-6 md:px-12 lg:px-24 max-w-5xl mx-auto pb-24">
      <Block name="CaseStudySummary (with readingTime)">
        <div className="-mx-6 md:-mx-12 lg:-mx-24">
          <CaseStudySummary
            readingTime="3 min read"
            tldr="A legacy business directory was slow and cluttered. I led a redesign around one task — search, find, contact — and users grew from 472K to 1.7M."
            facts={[
              { label: "Role", value: "Lead UX Designer" },
              { label: "Team", value: "4 people" },
              { label: "Timeline", value: "2019–2022" },
              { label: "Status", value: "Shipped in 6 countries" },
              { label: "Outcome", value: "472K → 1.7M users" },
            ]}
          />
        </div>
      </Block>

      <Block name="ProblemCards (with image)">
        <ProblemCards
          problems={[
            { icon: LayoutGrid, title: "Cluttered pages", text: "Ads and categories competed with the search box." },
            { icon: Gauge, title: "Slow to load", text: "Heavy pages on slow mobile connections." },
            { icon: Smartphone, title: "Not mobile-friendly", text: "Most visitors were on phones; the site wasn't." },
          ]}
          image={{ src: ypBefore, alt: "Original Yellow Pages homepage", caption: "Before: the original homepage" }}
        />
      </Block>

      <Block name="ProcessStepper">
        <ProcessStepper
          caseStudy="dev"
          steps={[
            { title: "Research", text: "Analytics and user feedback showed people came for one thing: find a business fast." },
            { title: "Wireframes", text: "Homepage, results and business pages rebuilt around search.", image: { src: ypWireframes, alt: "Wireframes" } },
            { title: "Prototype in code", text: "A working prototype to test real interactions before full development." },
            { title: "Ship and measure", text: "Rolled out across six countries and tracked the results.", image: { src: ypAfter, alt: "Redesigned site" } },
          ]}
        />
      </Block>

      <Block name="DecisionCards">
        <DecisionCards
          decisions={[
            { title: "Search first", problem: "The search box was buried.", decision: "Make search the hero of every page.", result: "Users reach results in one step." },
            { title: "Task-driven results", problem: "Listings hid contact details.", decision: "Call and directions on every result.", result: "Fewer clicks to contact a business." },
            { title: "Mobile-first layout", problem: "Desktop-only pages on phones.", decision: "Design for small screens first.", result: "Bounce rate fell from 33.8% to 24.4%." },
          ]}
        />
      </Block>

      <Block name="BeforeAfterSlider (same-format pair)">
        <BeforeAfterSlider
          caseStudy="dev"
          before={{ src: ypAnalytics2018, alt: "Analytics 2018", label: "2018" }}
          after={{ src: ypAnalytics2020, alt: "Analytics 2020", label: "2020" }}
          caption="Drag to compare analytics before and after the redesign"
        />
      </Block>

      <Block name="BeforeAfterSlider (product screens)">
        <BeforeAfterSlider
          caseStudy="dev"
          before={{ src: aspinBeforeCustomer, alt: "Old customer screen", label: "Before" }}
          after={{ src: aspinAfterProfile, alt: "New customer profile", label: "After" }}
        />
      </Block>

      <Block name="StatCounters">
        <StatCounters
          stats={[
            { target: 1.7, decimals: 1, suffix: "M", label: "Users", note: "from 472K" },
            { target: 260, prefix: "+", suffix: "%", label: "User growth" },
            { target: 2.3, decimals: 1, suffix: "M", label: "Sessions", note: "from 631K" },
            { target: 24.4, decimals: 1, suffix: "%", label: "Bounce rate", note: "down from 33.8%" },
          ]}
        />
      </Block>

      <Block name="Takeaways">
        <Takeaways
          items={[
            { title: "Remove before you add", text: "The biggest wins came from taking things away so the one task stood out." },
            { title: "Prototype in code", text: "Testing real interactions early caught problems static mockups would have hidden." },
            { title: "Measure every market", text: "Rolling out country by country let each launch learn from the last." },
          ]}
        />
      </Block>

      <Block name="Reveal">
        <Reveal>
          <p className="text-lg font-serif text-foreground">This block fades up when it scrolls into view.</p>
        </Reveal>
      </Block>
    </main>
  </div>
);

export default CaseStudyKit;
