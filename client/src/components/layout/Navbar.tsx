import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  ChevronUp,
  ChevronRight,
  Home,
  Calendar,
  Users,
  Info,
  MessageSquare,
  Phone,
  Clock,
  HeartHandshake,
} from "lucide-react";
import { FaYoutube, FaInstagram } from "react-icons/fa";
import logo from "@/assets/masjid-AlEzz-color-h.png";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion, AnimatePresence } from "framer-motion";

// Define navigation items
const navigationItems = [
  { path: "/", label: "Home", icon: <Home size={18} /> },
  { path: "/prayer-times", label: "Prayer Times", icon: <Clock size={18} /> },
  { path: "/programs", label: "Programs", icon: <Users size={18} /> },
  { path: "/calendar", label: "Calendar", icon: <Calendar size={18} /> },
  { path: "/about", label: "About", icon: <Info size={18} /> },
  { path: "/donate", label: "Donate", icon: <HeartHandshake size={18} /> },
  { path: "/contact", label: "Contact", icon: <Phone size={18} /> },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const isMobile = useIsMobile();
  const [location] = useLocation();
  const navRef = useRef<HTMLDivElement>(null);

  // Handle scroll events for sticky header styling and scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrolled(scrollPosition > 100);
      setShowScrollTop(scrollPosition > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        navRef.current &&
        !navRef.current.contains(event.target as Node) &&
        mobileMenuOpen
      ) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mobileMenuOpen]);

  // Close mobile menu when navigating
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  // Close mobile menu when window resizes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mobileMenuOpen]);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mobileMenuOpen]);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Smooth scroll to top when needed
  const scrollToSmooth = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string,
  ) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      // Calculate offset to account for fixed header
      const headerOffset = scrolled ? 70 : 90;
      const elementPosition = section.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <header
        className={`bg-white sticky top-0 z-50 transition-all duration-300 ${
          scrolled ? "shadow-md py-1" : "py-1 md:py-2"
        }`}
        ref={navRef}
      >
        <div className="container mx-auto">
          <nav className="flex items-center justify-between flex-wrap px-2 md:px-4">
            <div className="flex items-center flex-shrink-0 mr-3 md:mr-6">
              <Link href="/" className="flex items-center gap-1 md:gap-2">
                <img
                  src={logo}
                  alt="Masjid Al-Ezz Logo"
                  className={`transition-all ${scrolled ? "h-6 md:h-8" : "h-7 md:h-10"}`}
                />
                <div>
                  <span
                    className={`font-serif tracking-tight text-primary transition-all ${
                      scrolled ? "text-base md:text-lg" : "text-lg md:text-xl"
                    }`}
                  >
                    Masjid Al-Ezz
                  </span>
                  <span className="block text-[10px] md:text-xs text-amber-500 font-medium">
                    Peel Muslim Community Center
                  </span>
                </div>
              </Link>
            </div>

            <div className="block lg:hidden">
              <Button
                variant={mobileMenuOpen ? "default" : "outline"}
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`${
                  mobileMenuOpen
                    ? "bg-primary text-white hover:bg-primary/90"
                    : "text-primary border-primary hover:bg-primary/10 hover:text-primary hover:border-primary"
                } transition-all duration-300 h-8 w-8 p-0`}
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={mobileMenuOpen ? "close" : "open"}
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
                  </motion.div>
                </AnimatePresence>
              </Button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex lg:items-center lg:w-auto">
              <div className="lg:flex-grow flex items-center">
                {navigationItems.map((item) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={`inline-flex items-center px-2 py-1.5 mx-1 rounded-md transition-colors text-sm ${
                      location === item.path
                        ? "text-primary font-semibold bg-primary/5"
                        : "text-gray-700 hover:text-primary hover:bg-primary/5"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              <div className="lg:ml-3 flex items-center">
                <div className="hidden lg:flex mr-4 space-x-3">
                  <a
                    href="https://www.instagram.com/masjidalezz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-amber-500 transition-colors text-lg"
                    aria-label="Instagram"
                  >
                    <FaInstagram />
                  </a>
                  <a
                    href="https://www.youtube.com/@Masjidalezz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-amber-500 transition-colors text-lg"
                    aria-label="YouTube"
                  >
                    <FaYoutube />
                  </a>
                </div>

                <Link href="/donate" className="inline-block">
                  <Button className="bg-primary hover:bg-primary/90 text-white rounded-full font-medium px-4 py-1.5 h-auto text-sm shadow-sm">
                    <HeartHandshake className="mr-1.5 h-3.5 w-3.5" /> Donate
                  </Button>
                </Link>
              </div>
            </div>
          </nav>
        </div>

        {/* Mobile Navigation Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="lg:hidden fixed inset-0 top-[48px] bg-white/95 backdrop-blur-sm z-30 overflow-y-auto pb-16"
              style={{ maxHeight: "calc(100vh - 48px)" }}
            >
              <div className="container mx-auto px-4 py-3">
                <div className="flex flex-col">
                  {navigationItems.map((item, index) => (
                    <motion.div
                      key={item.path}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={item.path}
                        className={`flex items-center px-3 py-2.5 mb-1.5 rounded-lg transition-colors ${
                          location === item.path
                            ? "bg-primary/10 text-primary font-semibold"
                            : "hover:bg-primary/5 text-gray-800"
                        }`}
                      >
                        <div className="mr-2.5 text-primary">{item.icon}</div>
                        <span className="text-base">{item.label}</span>
                        <ChevronRight className="ml-auto h-4 w-4 text-gray-400" />
                      </Link>
                    </motion.div>
                  ))}

                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: navigationItems.length * 0.05 }}
                    className="mt-4"
                  >
                    <Link
                      href="/donate"
                      className="flex items-center justify-center w-full py-3 px-3 bg-primary text-white rounded-lg shadow-md font-semibold text-base"
                    >
                      <HeartHandshake className="mr-2 h-4 w-4" /> Donate Now
                    </Link>
                  </motion.div>

                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{
                      delay: (navigationItems.length + 1) * 0.05 + 0.1,
                    }}
                    className="mt-4 flex justify-center space-x-8"
                  >
                    <a
                      href="https://www.instagram.com/masjidalezz"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center text-primary hover:text-amber-500 transition-colors"
                      aria-label="Instagram"
                    >
                      <FaInstagram className="text-2xl mb-1" />
                      <span className="text-xs">Instagram</span>
                    </a>
                    <a
                      href="https://www.youtube.com/@Masjidalezz"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center text-primary hover:text-amber-500 transition-colors"
                      aria-label="YouTube"
                    >
                      <FaYoutube className="text-2xl mb-1" />
                      <span className="text-xs">YouTube</span>
                    </a>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      delay: (navigationItems.length + 1) * 0.05 + 0.2,
                    }}
                    className="mt-6 pt-4 border-t border-gray-200 text-center text-gray-500 text-xs"
                  >
                    <p>10 Falconer Dr., Unit 8</p>
                    <p>Mississauga, ON L5N 3L8</p>
                    <p className="mt-2">© 2025 Masjid Al-Ezz</p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* News Ticker will be placed immediately below the navbar */}

      {/* Scroll to top button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            onClick={scrollToTop}
            className="fixed bottom-4 right-4 z-50 p-2 rounded-full bg-primary text-white shadow-lg hover:bg-primary/90 transition-all"
            aria-label="Scroll to top"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            whileHover={{ y: -3 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronUp size={18} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
