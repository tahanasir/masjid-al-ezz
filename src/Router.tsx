import React, { useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import EventCalendar from "@/pages/EventCalendar";
import Programs from "@/pages/Programs";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Donate from "@/pages/Donate";

const AppRoutes: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Handle redirects from 404.html
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const redirect = params.get('redirect');
    if (redirect) {
      navigate(redirect, { replace: true });
    }
  }, [navigate]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/calendar" element={<EventCalendar />} />
      <Route path="/programs" element={<Programs />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/donate" element={<Donate />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
