import { Link, useLocation } from "wouter";
import { Radio } from "lucide-react";

export function SiteHeader() {
  const [location] = useLocation();

  return (
    <header className="bg-studio-dark border-b border-studio-steel">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-display font-semibold text-tungsten-soft flex items-center gap-3 hover:text-neon-pink transition-colors">
          <span className="text-xl">🏏</span>
          <span>Sticky Wicket Labs</span>
        </Link>
        <nav className="flex items-center gap-6">
          <Link 
            href="/" 
            className={`text-sm font-medium transition-colors flex items-center gap-2 ${
              location === "/" 
                ? "text-neon-cyan" 
                : "text-tungsten-warm/60 hover:text-tungsten-soft"
            }`}
          >
            <Radio className="w-4 h-4" />
            Programs
          </Link>
          <Link 
            href="/analytics" 
            className={`text-sm font-medium transition-colors ${
              location === "/analytics" 
                ? "text-neon-cyan" 
                : "text-tungsten-warm/60 hover:text-tungsten-soft"
            }`}
          >
            Telemetry
          </Link>
        </nav>
      </div>
    </header>
  );
}
