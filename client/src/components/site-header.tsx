import { Link, useLocation } from "wouter";
import { BarChart3 } from "lucide-react";

export function SiteHeader() {
  const [location] = useLocation();

  return (
    <header className="bg-white border-b border-neutral-edge">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-display font-bold text-ink flex items-center gap-3 hover:opacity-80 transition-opacity">
          <img 
            src="/images/swl-logo.png" 
            alt="Sticky Wicket Labs" 
            className="h-14 w-auto"
          />
          <span className="text-lg">Sticky Wicket Labs</span>
        </Link>
        <nav className="flex items-center gap-2">
          <Link 
            href="/analytics" 
            className={`p-2 rounded-xl transition-all flex items-center justify-center ${
              location === "/analytics" 
                ? "bg-postit-lavender text-ink" 
                : "text-ink-light hover:bg-neutral-mist hover:text-ink"
            }`}
          >
            <BarChart3 className="w-5 h-5" />
          </Link>
        </nav>
      </div>
    </header>
  );
}
