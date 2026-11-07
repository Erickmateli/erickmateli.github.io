import erickPhoto from "@/assets/erick-mateli.webp";

const AboutSection = () => {
  return (
    <section id="about" className="py-24 px-6 md:px-12 lg:px-24 max-w-5xl mx-auto relative">
      {/* Decorative corner bracket */}
      <div className="absolute top-16 right-6 md:right-12 lg:right-24 opacity-[0.08] pointer-events-none hidden md:block">
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
          <path d="M0 0 H80 V20 H20 V80 H0 Z" fill="hsl(var(--primary))" />
        </svg>
      </div>

      <div className="grid md:grid-cols-[1fr_2fr] gap-12 md:gap-16">
        <div>
          <p className="text-sm font-sans font-medium tracking-[0.2em] uppercase text-primary mb-4">
            About Me
          </p>
          <h2 className="text-3xl md:text-4xl font-serif text-foreground">
            From Code to
            <br />
            <span className="italic text-primary">Product Strategy</span>
          </h2>

          <figure className="mt-8 relative w-48 md:w-full max-w-[260px]">
            <div className="absolute -bottom-3 -right-3 w-full h-full rounded-lg border border-primary/30" aria-hidden="true" />
            <img
              src={erickPhoto}
              alt="Portrait of Erick Mateli"
              width={800}
              height={800}
              loading="lazy"
              className="relative w-full aspect-square object-cover rounded-lg bg-muted"
            />
          </figure>
        </div>
        <div className="space-y-6 text-muted-foreground font-sans leading-relaxed">
          <p>
            I started as a frontend developer, moved into UX, and grew into product design — so I
            design with an engineer's understanding of what it takes to build and ship.
          </p>
          <p>
            Over 7+ years I've worked on products used across 11 countries: a business directory that
            grew from 472K to 1.7M users, and an insurance platform now serving 5M customers through
            banks, telcos and insurers. The common thread is complexity — many users, many partners,
            and real-world constraints like slow connections and strict regulation.
          </p>
          <p>
            I'm at my best turning messy systems into products people find easy, and staying close
            enough to the code to make sure what ships matches what was designed. I'm looking for
            teams building ambitious products where design and engineering work as one.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
