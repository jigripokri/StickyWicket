import { Link, useLocation } from "wouter";

export function SiteHeader() {
  const [location] = useLocation();

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/">
          <a className="text-xl font-bold">Sticky Wicket Labs</a>
        </Link>
        <nav className="flex gap-6">
          <Link href="/">
            <a className={location === "/" ? "font-semibold" : ""}>Projects</a>
          </Link>
          <Link href="/analytics">
            <a className={location === "/analytics" ? "font-semibold" : ""}>Analytics</a>
          </Link>
        </nav>
      </div>
    </header>
  );
}
