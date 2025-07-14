import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { PrayerTimes } from "@/components/home/PrayerTimes";
import { MasjidBoxWidget } from "@/components/home/MasjidBoxWidget";
import { Programs } from "@/components/home/Programs";
import { Events } from "@/components/home/Events";
import { Donate } from "@/components/home/Donate";
import { FeedbackForm } from "@/components/home/FeedbackForm";
import { UserIntentGuide } from "@/components/home/UserIntentGuide";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ArrowRight, Calendar, Users, X } from "lucide-react";

export default function Home() {
  const [isPrayerTimesOpen, setIsPrayerTimesOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main>
        <section className="relative">
          {/* Background with overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center z-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://images.unsplash.com/photo-1584721284279-d48cf738a3c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70"></div>
          </div>

          {/* Content */}
          <div className="container mx-auto px-4 relative z-10 pt-6 pb-6">
            {/* Hero Content - Centered */}
            <div className="text-center py-4 lg:py-8 mb-6">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 md:mb-4 font-serif">
                Welcome to
                <br />
                Masjid Al-Ezz
              </h1>
              <h2 className="text-xl font-serif mb-3 md:mb-6 text-amber-300 font-semibold">
                Peel Muslim Community Center
              </h2>
              <div className="max-w-md mx-auto">
                <p className="text-white text-base md:text-lg mb-4 md:mb-6">
                  <span className="font-bold text-amber-300">
                    Masjid AlEzz has opened, Alhamdulillah!
                  </span>{" "}
                  Your generous support turned a vision into reality. Join us in
                  building our community.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 justify-center mt-2">
                <Button
                  onClick={() => setIsPrayerTimesOpen(true)}
                  className="bg-amber-400 hover:bg-amber-500 text-primary rounded-full text-xs md:text-sm px-3 py-1 h-8 md:h-auto"
                >
                  <Calendar className="mr-1 md:mr-2 h-3 w-3 md:h-4 md:w-4" />{" "}
                  Prayer Times
                </Button>
                <a href="/programs">
                  <Button className="bg-primary hover:bg-primary/90 text-white rounded-full text-xs md:text-sm px-3 py-1 h-8 md:h-auto">
                    <Users className="mr-1 md:mr-2 h-3 w-3 md:h-4 md:w-4" />{" "}
                    Programs
                  </Button>
                </a>
                <a href="/donate">
                  <Button className="bg-white text-primary hover:bg-gray-100 rounded-full text-xs md:text-sm px-3 py-1 h-8 md:h-auto">
                    Support Us
                  </Button>
                </a>
              </div>
            </div>

            {/* Prayer Times - Full Width */}
            <div className="max-w-4xl mx-auto">
              <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden h-full">
                <div className="bg-primary py-2 px-3 text-center">
                  <h2 className="text-base md:text-lg font-serif text-white font-semibold">
                    Today's Prayer Times
                  </h2>
                </div>
                <div className="p-2 md:p-3">
                  <MasjidBoxWidget />
                </div>
              </div>
            </div>
          </div>
        </section>

        <Programs />

        {/* Events section with "View Full Calendar" button */}
        <div className="pb-8">
          <Events />
          <div className="text-center mt-8">
            <Link href="/events">
              <Button className="bg-amber-500 hover:bg-amber-600 text-white mr-4">
                Browse All Events <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/calendar">
              <Button
                variant="outline"
                className="border-primary text-primary hover:bg-primary/5"
              >
                View Full Calendar <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        <Donate />

        {/* User intent guide - helps users find what they need */}
        <UserIntentGuide />

        {/* Feedback Form section */}
        <div className="bg-gray-50">
          <div className="container mx-auto px-6 py-12">
            <div className="max-w-2xl mx-auto">
              <FeedbackForm />
              <div className="mt-8 text-center">
                <Link href="/about" className="mr-4">
                  <Button
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary/5 mb-3 sm:mb-0"
                  >
                    Learn About Us <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary/5"
                  >
                    Contact Details <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />

      {/* Prayer Times Popup */}
      <Dialog open={isPrayerTimesOpen} onOpenChange={setIsPrayerTimesOpen}>
        <DialogContent className="max-w-2xl w-full mx-auto p-0 overflow-hidden">
          <DialogHeader className="p-6 pb-4">
            <DialogTitle className="text-xl font-serif text-primary">
              Prayer Times
            </DialogTitle>
          </DialogHeader>
          <div className="px-6 pb-6">
            <div className="w-full min-h-[500px] rounded-lg overflow-hidden">
              <MasjidBoxWidget />
            </div>
            <div className="mt-4 text-center">
              <Link href="/prayer-times">
                <Button
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/5"
                  onClick={() => setIsPrayerTimesOpen(false)}
                >
                  View Full Prayer Times Page
                </Button>
              </Link>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
