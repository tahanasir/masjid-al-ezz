import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  Users,
  Heart,
  BookOpen,
  MapPin,
  CheckCircle2,
  HelpCircle,
  ChevronRight,
} from "lucide-react";
import masjidLogo from "@/assets/masjid-AlEzz-color-h.png";
import boxingImage from "@/assets/image_1746542232184.png";

export function QuickStartGuide() {
  const [open, setOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [hasVisited, setHasVisited] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    // Ensure this runs only in the browser
    if (typeof window !== "undefined") {
      try {
        // Check if it's the first visit using localStorage for persistence across sessions
        const visited = localStorage.getItem("hasVisitedMasjid");
        if (!visited) {
          // Delay the opening slightly for better UX
          const timer = setTimeout(() => {
            setOpen(true);
            localStorage.setItem("hasVisitedMasjid", "true");
            setHasVisited(true);
          }, 1500);

          return () => clearTimeout(timer);
        } else {
          setHasVisited(true);
        }
      } catch (e) {
        // Handle potential security errors with localStorage
        console.error("localStorage error:", e);
        setHasVisited(true);
      }
    }
  }, []);

  const steps = [
    {
      title: "Welcome to Masjid Al-Ezz",
      description:
        "We're glad you're here! This quick guide will help you navigate our website to find exactly what you need. Let's get started!",
      image: masjidLogo,
      content: (
        <div className="flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative w-full mb-4 rounded-xl overflow-hidden shadow-lg bg-gray-50"
          >
            <div className="flex justify-center items-center py-4">
              <img
                src={masjidLogo}
                alt="Masjid Al-Ezz"
                className="w-4/5 max-h-32 object-contain"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex items-end">
              <div className="p-4 text-white">
                <h2 className="text-xl font-serif font-bold">Masjid Al-Ezz</h2>
                <p className="text-amber-200 text-sm">
                  Peel Muslim Community Center
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            onAnimationComplete={() => setAnimationComplete(true)}
            className="p-5 bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl shadow-sm mb-4 w-full"
          >
            <h3 className="font-semibold text-primary text-center mb-3">
              Our mosque services the local community through:
            </h3>
            <ul className="space-y-3">
              <motion.li
                initial={{ opacity: 0, x: -20 }}
                animate={{
                  opacity: animationComplete ? 1 : 0,
                  x: animationComplete ? 0 : -20,
                }}
                transition={{ duration: 0.3, delay: 0.3 }}
                className="flex items-center"
              >
                <div className="bg-green-100 p-2 rounded-full mr-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                </div>
                <span className="text-gray-800">
                  Daily prayers and weekly Jumaa
                </span>
              </motion.li>
              <motion.li
                initial={{ opacity: 0, x: -20 }}
                animate={{
                  opacity: animationComplete ? 1 : 0,
                  x: animationComplete ? 0 : -20,
                }}
                transition={{ duration: 0.3, delay: 0.5 }}
                className="flex items-center"
              >
                <div className="bg-blue-100 p-2 rounded-full mr-3">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                </div>
                <span className="text-gray-800">
                  Educational programs for all ages
                </span>
              </motion.li>
              <motion.li
                initial={{ opacity: 0, x: -20 }}
                animate={{
                  opacity: animationComplete ? 1 : 0,
                  x: animationComplete ? 0 : -20,
                }}
                transition={{ duration: 0.3, delay: 0.7 }}
                className="flex items-center"
              >
                <div className="bg-amber-100 p-2 rounded-full mr-3">
                  <Users className="h-5 w-5 text-amber-600" />
                </div>
                <span className="text-gray-800">
                  Special events and community gatherings
                </span>
              </motion.li>
              <motion.li
                initial={{ opacity: 0, x: -20 }}
                animate={{
                  opacity: animationComplete ? 1 : 0,
                  x: animationComplete ? 0 : -20,
                }}
                transition={{ duration: 0.3, delay: 0.9 }}
                className="flex items-center"
              >
                <div className="bg-rose-100 p-2 rounded-full mr-3">
                  <Heart className="h-5 w-5 text-rose-600" />
                </div>
                <span className="text-gray-800">
                  Charitable activities and support services
                </span>
              </motion.li>
            </ul>
          </motion.div>
        </div>
      ),
    },
    {
      title: "What would you like to do?",
      description:
        "Tell us what you're looking for so we can guide you to the right place.",
      content: (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Tabs defaultValue="prayer" className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-4 shadow-sm">
              <TabsTrigger
                value="prayer"
                className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
              >
                Prayer Times
              </TabsTrigger>
              <TabsTrigger
                value="events"
                className="data-[state=active]:bg-amber-500/10 data-[state=active]:text-amber-600"
              >
                Events
              </TabsTrigger>
              <TabsTrigger
                value="programs"
                className="data-[state=active]:bg-emerald-500/10 data-[state=active]:text-emerald-600"
              >
                Programs
              </TabsTrigger>
              <TabsTrigger
                value="donate"
                className="data-[state=active]:bg-rose-500/10 data-[state=active]:text-rose-600"
              >
                Donate
              </TabsTrigger>
            </TabsList>

            <TabsContent value="prayer" className="p-0 border-0">
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl overflow-hidden shadow-sm"
              >
                <div className="bg-primary/10 px-4 py-3 flex items-center border-b border-primary/10">
                  <Clock className="h-5 w-5 text-primary mr-2" />
                  <h3 className="font-bold text-primary">Prayer Times</h3>
                </div>
                <div className="p-5">
                  <p className="text-gray-700 mb-4">
                    Check today's prayer times and weekly schedule for all five
                    daily prayers and Jumaa.
                  </p>
                  <div className="bg-white p-3 rounded-lg mb-4 shadow-sm">
                    <div className="flex justify-between items-center mb-1 text-sm">
                      <span className="font-medium">Fajr</span>
                      <span className="text-gray-600">5:45 AM</span>
                    </div>
                    <div className="flex justify-between items-center mb-1 text-sm">
                      <span className="font-medium">Dhuhr</span>
                      <span className="text-gray-600">1:30 PM</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-medium">Maghrib</span>
                      <span className="text-gray-600">7:35 PM</span>
                    </div>
                  </div>
                  <a href="/prayer-times" className="w-full block">
                    <Button className="w-full group">
                      View Full Prayer Schedule
                      <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
                    </Button>
                  </a>
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value="events" className="p-0 border-0">
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-gradient-to-br from-amber-500/5 to-amber-500/10 rounded-xl overflow-hidden shadow-sm"
              >
                <div className="bg-amber-500/10 px-4 py-3 flex items-center border-b border-amber-500/10">
                  <Calendar className="h-5 w-5 text-amber-600 mr-2" />
                  <h3 className="font-bold text-amber-600">Upcoming Events</h3>
                </div>
                <div className="p-5">
                  <p className="text-gray-700 mb-4">
                    Find special events, community gatherings, and regular
                    weekly activities.
                  </p>
                  <div className="bg-white p-3 rounded-lg mb-4 shadow-sm">
                    <div className="font-medium mb-1">Friday Night Tafseer</div>
                    <div className="text-sm text-gray-600">
                      Every Friday after Isha Prayer
                    </div>
                  </div>
                  <a href="/events" className="w-full block">
                    <Button className="w-full bg-amber-500 hover:bg-amber-600 group">
                      Browse All Events
                      <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
                    </Button>
                  </a>
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value="programs" className="p-0 border-0">
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-gradient-to-br from-emerald-500/5 to-emerald-500/10 rounded-xl overflow-hidden shadow-sm"
              >
                <div className="bg-emerald-500/10 px-4 py-3 flex items-center border-b border-emerald-500/10">
                  <BookOpen className="h-5 w-5 text-emerald-600 mr-2" />
                  <h3 className="font-bold text-emerald-600">
                    Educational Programs
                  </h3>
                </div>
                <div className="p-5">
                  <p className="text-gray-700 mb-4">
                    Explore our structured programs for children, youth, and
                    adults.
                  </p>
                  <div className="bg-white p-3 rounded-lg mb-4 shadow-sm">
                    <div className="flex items-center gap-3">
                      <img
                        src={boxingImage}
                        alt="PMCC Programs"
                        className="w-1/3 object-contain rounded border border-gray-100"
                      />
                      <div>
                        <div className="font-medium mb-1">
                          Youth Boxing Program
                        </div>
                        <div className="text-sm text-gray-600">
                          Registration open for ages 12-18
                        </div>
                      </div>
                    </div>
                  </div>
                  <a href="/programs" className="w-full block">
                    <Button className="w-full bg-emerald-600 hover:bg-emerald-700 group">
                      Explore All Programs
                      <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
                    </Button>
                  </a>
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value="donate" className="p-0 border-0">
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-gradient-to-br from-rose-500/5 to-rose-500/10 rounded-xl overflow-hidden shadow-sm"
              >
                <div className="bg-rose-500/10 px-4 py-3 flex items-center border-b border-rose-500/10">
                  <Heart className="h-5 w-5 text-rose-600 mr-2" />
                  <h3 className="font-bold text-rose-600">
                    Support Our Masjid
                  </h3>
                </div>
                <div className="p-5">
                  <p className="text-gray-700 mb-4">
                    Contribute through donations to help sustain and grow our
                    community services.
                  </p>
                  <div className="bg-white p-3 rounded-lg mb-4 shadow-sm text-center">
                    <div className="font-semibold mb-1 text-rose-600">
                      Every donation makes a difference
                    </div>
                    <div className="text-sm text-gray-600">
                      Help us serve the community better
                    </div>
                  </div>
                  <a href="/donate" className="w-full block">
                    <Button className="w-full bg-rose-500 hover:bg-rose-600 group">
                      Donate Now
                      <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
                    </Button>
                  </a>
                </div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </motion.div>
      ),
    },
    {
      title: "Need Help?",
      description:
        "If you need any assistance or have questions, we're here to help.",
      content: (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-gradient-to-br from-primary/5 to-primary/10 p-5 rounded-xl shadow-sm flex flex-col md:flex-row items-start gap-4"
          >
            <div className="flex-shrink-0 bg-white p-3 rounded-full shadow-sm">
              <HelpCircle className="h-8 w-8 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-primary text-lg mb-2">
                Can't find what you're looking for?
              </h3>
              <p className="text-gray-700 mb-4">
                Visit our contact page for more ways to reach us, or call us
                directly during office hours.
              </p>
              <a href="/contact">
                <Button
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/5 group"
                >
                  Contact Us{" "}
                  <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
                </Button>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="bg-gradient-to-br from-indigo-500/5 to-indigo-500/10 p-5 rounded-xl shadow-sm flex flex-col md:flex-row items-start gap-4"
          >
            <div className="flex-shrink-0 bg-white p-3 rounded-full shadow-sm">
              <MapPin className="h-8 w-8 text-indigo-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-indigo-600 text-lg mb-2">
                Visit Us In Person
              </h3>
              <div className="bg-white rounded-lg p-4 shadow-sm mb-3">
                <p className="text-gray-700">
                  <span className="block font-medium">Masjid Al-Ezz</span>
                  10 Falconer Dr., Unit 8<br />
                  Mississauga, ON L5N 3L8
                  <br />
                  <span className="font-semibold text-indigo-600">
                    Phone:
                  </span>{" "}
                  (123) 456-7890
                </p>
              </div>

              <div className="flex space-x-3">
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs bg-indigo-100 hover:bg-indigo-200 text-indigo-700 py-1 px-2 rounded flex items-center transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                    />
                  </svg>
                  Get Directions
                </a>
                <a
                  href="tel:1234567890"
                  className="text-xs bg-indigo-100 hover:bg-indigo-200 text-indigo-700 py-1 px-2 rounded flex items-center transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  Call Now
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="text-center mt-2 text-sm text-gray-500"
          >
            <p>Follow us on social media:</p>
            <div className="flex justify-center space-x-4 mt-2">
              <a
                href="https://www.youtube.com/@Masjidalezz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-500 hover:text-red-600 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0C.488 3.45.029 5.804 0 12c.029 6.185.484 8.549 4.385 8.816 3.599.245 11.626.246 15.23 0C23.512 20.55 23.971 18.196 24 12c-.029-6.185-.484-8.549-4.385-8.816zM9 16V8l8 3.993L9 16z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/masjidalezz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-600 hover:text-pink-700 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
            </div>
          </motion.div>
        </motion.div>
      ),
    },
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setOpen(false);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const activeStep = steps[currentStep];

  // Don't render anything if user has already visited
  if (hasVisited && !open) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-[95%] max-w-[500px] p-0 overflow-hidden rounded-xl shadow-xl border-0 max-h-[85vh] overflow-y-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 pointer-events-none" />

        <DialogHeader className="px-4 py-5 pb-3 sm:p-6 sm:pb-3 bg-gradient-to-b from-white to-gray-50/80 relative">
          <button
            onClick={() => setOpen(false)}
            className="absolute right-3 top-3 sm:right-5 sm:top-5 bg-gray-100 hover:bg-gray-200 transition-colors rounded-full p-1.5 text-gray-500"
            aria-label="Close dialog"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6L6 18"></path>
              <path d="M6 6l12 12"></path>
            </svg>
          </button>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <DialogTitle className="text-xl sm:text-2xl font-serif font-bold text-primary">
              {activeStep.title}
            </DialogTitle>
            <DialogDescription className="text-sm sm:text-base mt-1.5">
              {activeStep.description}
            </DialogDescription>
          </motion.div>
        </DialogHeader>

        <div className="px-4 py-4 sm:px-6 sm:py-5">{activeStep.content}</div>

        <DialogFooter className="px-4 py-4 sm:p-6 sm:pt-4 border-t border-gray-100 bg-gray-50/80 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0">
          <div className="flex items-center gap-2">
            {Array.from({ length: steps.length }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{
                  scale: i === currentStep ? 1.2 : 1,
                  opacity: 1,
                }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  i === currentStep
                    ? "bg-primary w-5"
                    : i < currentStep
                      ? "bg-primary/50"
                      : "bg-gray-300"
                }`}
                role="button"
                tabIndex={0}
                onClick={() => setCurrentStep(i)}
                onKeyDown={(e) => e.key === "Enter" && setCurrentStep(i)}
                aria-label={`Go to step ${i + 1}`}
              />
            ))}
          </div>

          <div className="flex gap-2">
            {currentStep > 0 && (
              <Button
                variant="outline"
                onClick={prevStep}
                className="border-gray-300 hover:bg-gray-100 transition-all gap-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="M15 18l-6-6 6-6" />
                </svg>
                Back
              </Button>
            )}

            <Button
              onClick={nextStep}
              className="bg-primary hover:bg-primary/90 transition-all gap-1"
            >
              {currentStep === steps.length - 1 ? (
                <>
                  Get Started
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </>
              ) : (
                <>
                  Next
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </>
              )}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
