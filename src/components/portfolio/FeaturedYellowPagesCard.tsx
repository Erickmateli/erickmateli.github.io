import { Link } from "react-router-dom";
import { ArrowRight, Star } from "lucide-react";
import ypAfterShowcase from "@/assets/yp-after-showcase.jpg";

const FeaturedYellowPagesCard = () => {
  return (
    <article className="border border-primary/20 rounded-lg overflow-hidden bg-card mb-12">
      <div className="grid md:grid-cols-2 gap-0">
        {/* Image */}
        <div className="aspect-[4/3] md:aspect-auto overflow-hidden bg-muted">
          <img
            src={ypAfterShowcase}
            alt="Yellow Pages Redesigned Platform"
            className="w-full h-full object-cover object-center"
            loading="lazy"
          />
        </div>

        {/* Content */}
        <div className="p-8 md:p-10 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-4">
            <Star className="w-3.5 h-3.5 text-primary fill-primary" />
            <span className="text-[10px] font-sans font-medium tracking-[0.2em] uppercase text-primary">
              Featured Case Study
            </span>
          </div>

          <h3 className="text-2xl md:text-3xl font-serif text-foreground leading-tight mb-2">
            Redesigning Yellow Pages Kenya
          </h3>
          <p className="text-primary font-sans text-sm font-medium mb-4">
            Directory Services · 6 Countries
          </p>
          <p className="text-sm font-sans text-muted-foreground leading-relaxed mb-4">
            A legacy business directory platform transformed into a modern, task-driven
            search experience — growing users from 472K to 1.7M and rolling out
            across six countries.
          </p>

          <div className="flex gap-6 mb-6">
            <div>
              <p className="text-lg font-serif text-foreground font-medium">260%</p>
              <p className="text-[10px] font-sans text-muted-foreground uppercase tracking-wider">User Growth</p>
            </div>
            <div>
              <p className="text-lg font-serif text-foreground font-medium">-9.35%</p>
              <p className="text-[10px] font-sans text-muted-foreground uppercase tracking-wider">Bounce Rate</p>
            </div>
            <div>
              <p className="text-lg font-serif text-foreground font-medium">6</p>
              <p className="text-[10px] font-sans text-muted-foreground uppercase tracking-wider">Countries</p>
            </div>
          </div>

          <Link
            to="/case-study/yellow-pages"
            className="inline-flex items-center gap-2 text-sm font-sans font-medium text-primary hover:text-foreground transition-colors"
          >
            Read the full story
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default FeaturedYellowPagesCard;
