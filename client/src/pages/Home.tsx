import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { PrayerTimes } from "@/components/home/PrayerTimes";
import { MasjidBoxWidget } from "@/components/home/MasjidBoxWidget";
import { Programs } from "@/components/home/Programs";
import { Events } from "@/components/home/Events";
import { Donate } from "@/components/home/Donate";
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
        <Events />
        <Donate />
      </main>
      <Footer />
    </div>
  );
}
