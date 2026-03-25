const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-5xl mx-auto px-6 md:px-12 lg:px-24 h-14 flex items-center justify-between">
        <span className="font-serif text-lg text-foreground">PD.</span>
        <div className="flex items-center gap-6 text-sm font-sans text-muted-foreground">
          <a href="#about" className="hover:text-foreground transition-colors hidden sm:block">About</a>
          <a href="#work" className="hover:text-foreground transition-colors hidden sm:block">Work</a>
          <a
            href="mailto:hello@example.com"
            className="px-4 py-1.5 rounded-md bg-primary text-primary-foreground text-xs font-medium hover:opacity-90 transition-opacity"
          >
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
