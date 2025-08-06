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
  MessageCircle as WhatsApp,
  Instagram,
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
        <nav className="flex items-center justify-between lg:justify-between flex-nowrap px-2 md:px-4 max-w-7xl mx-auto">
          {/* Logo - Left */}
          <div className="flex items-center flex-shrink-0 mr-3 md:mr-6">
            <Link href="/" className="flex items-center gap-1 md:gap-2">
              <img
                src={logo}
                alt="Masjid Al-Ezz Logo"
                className="transition-all py-1 h-14 md:h-12"
              />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="block lg:hidden flex items-center gap-2">
            <a
              href="https://app.irm.io/masjidalezz.com"
              target="_blank"
              className="flex items-center justify-center px-3 py-2 bg-primary text-white rounded-lg shadow-lg font-bold text-sm hover:bg-primary/90 transition-colors"
            >
              <HeartHandshake className="mr-1.5 h-4 w-4" /> Donate
            </a>
            <a
              href="https://chat.whatsapp.com/CZs6ol0UR3w4wwDwt5tbge?mode=ac_t"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-8 h-8 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-md transition-colors"
              aria-label="WhatsApp"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
            </a>
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

          {/* Desktop Navigation - Center */}
          <div className="hidden lg:flex lg:items-center lg:flex-1 lg:justify-center">
            <div className="flex items-center">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`inline-flex items-center px-3 py-1.5 mx-2 rounded-md transition-colors text-base ${
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

          {/* Action Buttons - Right */}
          <div className="hidden lg:flex items-center gap-2">
            <a
              href="https://app.irm.io/masjidalezz.com"
              target="_blank"
              className="flex items-center justify-center py-2 px-3 bg-primary text-white rounded-lg shadow-md font-semibold text-base"
            >
              <HeartHandshake className="mr-2 h-4 w-4" /> Donate
            </a>
            <a
              href="https://chat.whatsapp.com/CZs6ol0UR3w4wwDwt5tbge?mode=ac_t"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-md transition-colors"
              aria-label="WhatsApp"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
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
