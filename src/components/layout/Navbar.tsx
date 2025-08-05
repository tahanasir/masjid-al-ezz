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
  Phone,
  HeartHandshake,
} from "lucide-react";
import logo from "@/assets/logo.png";
import { motion, AnimatePresence } from "framer-motion";

// Define navigation items
const navigationItems = [
  { path: "/", label: "Home", icon: <Home size={18} /> },
  { path: "/about", label: "About", icon: <Info size={18} /> },
  { path: "/programs", label: "Programs", icon: <Users size={18} /> },
  { path: "/calendar", label: "Calendar", icon: <Calendar size={18} /> },
  { path: "/contact", label: "Contact", icon: <Phone size={18} /> },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const navRef = useRef<HTMLDivElement>(null);

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

  return (
    <>
      <header
        className="bg-white sticky top-0 z-50 transition-all duration-300 py-1 md:py-2 shadow"
        ref={navRef}
      >
        <nav className="flex items-center justify-between lg:justify-evenly flex-wrap px-2 md:px-4">
          <div className="flex items-center flex-shrink-0 mr-3 md:mr-6">
            <Link href="/" className="flex items-center gap-1 md:gap-2">
              <img
                src={logo}
                alt="Masjid Al-Ezz Logo"
                className="transition-all py-1 h-12 md:h-10"
              />
            </Link>
          </div>

          <div className="block lg:hidden">
            <Button
              variant="secondary"
              size="lg"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`${
                mobileMenuOpen
                  ? "bg-primary text-white hover:bg-primary/90"
                  : "text-primary hover:bg-primary/10 hover:text-primary"
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
                  {mobileMenuOpen ? <X /> : <Menu />}
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
          </div>

          <div className="hidden lg:block">
            <a
              href="https://app.irm.io/masjidalezz.com"
              target="_blank"
              className="flex items-center justify-center w-full py-2 px-3 bg-primary text-white rounded-lg shadow-md font-semibold text-base"
            >
              <HeartHandshake className="mr-2 h-4 w-4" /> Donate
            </a>
          </div>
        </nav>

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
                    <a
                      href="https://app.irm.io/masjidalezz.com"
                      target="_blank"
                      className="flex items-center justify-center w-full py-3 px-3 bg-primary text-white rounded-lg shadow-md font-semibold text-base"
                    >
                      <HeartHandshake className="mr-2 h-4 w-4" /> Donate Now
                    </a>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
