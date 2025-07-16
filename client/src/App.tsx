import { Switch, Route } from "wouter";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import EventCalendar from "@/pages/EventCalendar";
import Programs from "@/pages/Programs";
import About from "@/pages/About";
import Donate from "@/pages/Donate";
import Contact from "@/pages/Contact";

function App() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/calendar" component={EventCalendar} />
      <Route path="/programs" component={Programs} />
      <Route path="/about" component={About} />
      <Route path="/donate" component={Donate} />
      <Route path="/contact" component={Contact} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default App;
