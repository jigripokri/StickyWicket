import { Link, useLocation } from "wouter";
import { Blocks, BarChart3 } from "lucide-react";

export function SiteHeader() {
  const [location] = useLocation();

  return (
    <header className="bg-white border-b-4 border-lego-red">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-display font-bold text-marker flex items-center gap-3 hover:text-lego-blue transition-colors">
          <span className="text-2xl">🧱</span>
          <span className="text-lg">Sticky Wicket Labs</span>
        </Link>
        <nav className="flex items-center gap-2">
          <Link 
            href="/" 
            className={`px-4 py-2 rounded-lg font-display font-medium text-sm transition-all flex items-center gap-2 ${
              location === "/" 
                ? "bg-lego-red text-white" 
                : "text-marker/60 hover:bg-craft-tan hover:text-marker"
            }`}
          >
            <Blocks className="w-4 h-4" />
            Projects
          </Link>
          <Link 
            href="/analytics" 
            className={`px-4 py-2 rounded-lg font-display font-medium text-sm transition-all flex items-center gap-2 ${
              location === "/analytics" 
                ? "bg-lego-blue text-white" 
                : "text-marker/60 hover:bg-craft-tan hover:text-marker"
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
