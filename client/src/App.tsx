import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import EventCalendar from "@/pages/EventCalendar";
import Programs from "@/pages/Programs";
import ProgramDetail from "@/pages/ProgramDetail";
import PrayerTimes from "@/pages/PrayerTimes";
import About from "@/pages/About";
import Donate from "@/pages/Donate";
import Contact from "@/pages/Contact";
import { useEffect } from "react";
import { useLocation } from "wouter";

// This helps simulate browser scrolling behavior between pages
function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/prayer-times" component={PrayerTimes} />
      <Route path="/calendar" component={EventCalendar} />
      <Route path="/calendar" component={EventCalendar} />
      <Route path="/programs/:id" component={ProgramDetail} />
      <Route path="/programs" component={Programs} />
      <Route path="/about" component={About} />
      <Route path="/donate" component={Donate} />
      <Route path="/contact" component={Contact} />
      <Route component={NotFound} />
      <ScrollToTop />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
