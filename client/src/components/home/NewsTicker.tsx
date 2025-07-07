import {
  Calendar,
  Award,
  Users,
  Megaphone,
  Clock,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function NewsTicker() {
  // Upcoming events for news ticker
  const upcomingEvents = [
    {
      id: 1,
      title: "Masjid AlEzz has opened!",
      date: "Join us for daily prayers",
      icon: <Megaphone className="h-5 w-5" />,
    },
    {
      id: 2,
      title: "Friday Night Tafseer Family Night",
      date: "Every Friday after Isha Prayer",
      icon: <Users className="h-5 w-5" />,
    },
    {
      id: 3,
      title: "Quran Recitation Classes",
      date: "Every Saturday, 10:00 AM",
      icon: <Clock className="h-5 w-5" />,
    },
    {
      id: 4,
      title: "Boxing Classes Coming Soon",
      date: "Stay tuned for details",
      icon: <Award className="h-5 w-5" />,
    },
  ];

  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto rotate events in the ticker
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentEventIndex((prevIndex) =>
          prevIndex === upcomingEvents.length - 1 ? 0 : prevIndex + 1,
        );
      }, 6000);
    }

    return () => clearInterval(interval);
  }, [upcomingEvents.length, isAutoPlaying]);

  // Go to previous announcement
  const goToPrev = () => {
    setIsAutoPlaying(false);
    setCurrentEventIndex((prevIndex) =>
      prevIndex === 0 ? upcomingEvents.length - 1 : prevIndex - 1,
    );
  };

  // Go to next announcement
  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentEventIndex((prevIndex) =>
      prevIndex === upcomingEvents.length - 1 ? 0 : prevIndex + 1,
    );
  };

  // Resume auto rotation when user is inactive
  useEffect(() => {
    if (!isAutoPlaying) {
      const timer = setTimeout(() => {
        setIsAutoPlaying(true);
      }, 10000); // Resume auto-playing after 10 seconds of inactivity

      return () => clearTimeout(timer);
    }
  }, [currentEventIndex, isAutoPlaying]);

  return (
    <div className="bg-primary border-b border-primary/20 py-3 sm:py-2 shadow-md">
      <div className="container mx-auto px-4">
        <div className="overflow-hidden">
          <div className="flex items-center">
            <div className="bg-white rounded-full p-1.5 text-primary mr-3 flex-shrink-0">
              <Megaphone className="h-5 w-5" />
            </div>

            <div className="hidden sm:flex text-white font-bold mr-2">
              Announcements:
            </div>

            <div className="overflow-hidden relative w-full h-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentEventIndex}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 flex items-center"
                >
                  <div className="flex items-center text-white whitespace-nowrap overflow-hidden text-ellipsis w-full">
                    <div className="mr-2 text-amber-300">
                      {upcomingEvents[currentEventIndex].icon}
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center">
                      <span className="font-semibold">
                        {upcomingEvents[currentEventIndex].title}
                      </span>
                      <span className="text-white/80 sm:ml-2 text-sm sm:text-base">
                        - {upcomingEvents[currentEventIndex].date}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex items-center ml-3 space-x-1">
              <button
                onClick={goToPrev}
                className="bg-white/10 hover:bg-white/20 rounded-full p-1 text-white transition-colors"
                aria-label="Previous announcement"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <div className="text-white/80 text-xs">
                {currentEventIndex + 1}/{upcomingEvents.length}
              </div>
              <button
                onClick={goToNext}
                className="bg-white/10 hover:bg-white/20 rounded-full p-1 text-white transition-colors"
                aria-label="Next announcement"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
