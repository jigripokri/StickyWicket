import { Link, useLocation } from "wouter";

export function SiteHeader() {
  const [location] = useLocation();

  return (
    <header className="border-b border-clay/20 bg-canvas">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-display text-lg font-medium text-ink flex items-center gap-2 hover:text-coral transition-colors">
          <span aria-label="cricket bat and ball" role="img">🏏</span>
          Sticky Wicket Labs
        </Link>
        <nav className="flex gap-6">
          <Link 
            href="/" 
            className={`text-sm transition-colors ${location === "/" ? "text-coral font-medium" : "text-ink/60 hover:text-ink"}`}
          >
            Projects
          </Link>
          <Link 
            href="/analytics" 
            className={`text-sm transition-colors ${location === "/analytics" ? "text-coral font-medium" : "text-ink/60 hover:text-ink"}`}
          >
            Analytics
          </Link>
        </nav>
      </div>
    </header>
  );
}
