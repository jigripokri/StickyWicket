import { Link, useLocation } from "wouter";
import { BarChart3 } from "lucide-react";

export function SiteHeader() {
  const [location] = useLocation();

  return (
    <header className="bg-white border-b border-sketch-border">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-display font-bold text-ink flex items-center gap-3 hover:opacity-70 transition-opacity">
          <img 
            src="/images/swl-logo.png" 
            alt="Sticky Wicket Labs" 
            className="h-12 w-auto"
          />
        </Link>
        <nav className="flex items-center gap-2">
          <Link 
            href="/analytics" 
            className={`px-4 py-2 font-display font-medium text-sm transition-all flex items-center gap-2 ${
              location === "/analytics" 
                ? "text-ink" 
                : "text-sketch-muted hover:text-ink"
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            Progress
          </Link>
        </nav>
      </div>
    </header>
  );
}
