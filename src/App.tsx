import { Switch, Router, Route } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import EventCalendar from "@/pages/EventCalendar";
import Programs from "@/pages/Programs";
import About from "@/pages/About";
import Contact from "@/pages/Contact";

function App() {
  return (
    <Router hook={useHashLocation}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/calendar" component={EventCalendar} />
        <Route path="/programs" component={Programs} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
