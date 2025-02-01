import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/home";
import AnalyticsPage from "@/pages/analytics";
import { SiteHeader } from "@/components/site-header";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/analytics" component={AnalyticsPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SiteHeader />
      <main>
        <Router />
      </main>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
