import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/home";
import AnalyticsPage from "@/pages/analytics";
import AboutPage from "@/pages/about";
import { SiteHeader } from "@/components/site-header";
import KaveerCreatePage from "@/pages/kaveer/create";
import KaveerTvPage from "@/pages/kaveer/tv";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/analytics" component={AnalyticsPage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/kaveer/tv" component={KaveerTvPage} />
      <Route path="/kaveer" component={KaveerCreatePage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // The party pages are full-screen kid/TV experiences: no site chrome.
  const [location] = useLocation();
  const isParty = location.startsWith("/kaveer");

  return (
    <QueryClientProvider client={queryClient}>
      {!isParty && <SiteHeader />}
      <main>
        <Router />
      </main>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
