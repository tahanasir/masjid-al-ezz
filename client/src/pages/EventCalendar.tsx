import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { EventCalendar } from "@/components/home/EventCalendar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function EventCalendarPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen py-20">
        <div className="container mx-auto px-6">
          <div className="mb-8">
            <Link href="/">
              <Button
                variant="ghost"
                className="mb-4 text-primary hover:text-primary/90"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-primary font-serif mb-2">
              Event Calendar
            </h1>
            <p className="text-gray-600">
              Browse all upcoming events at Masjid Al-Ezz. Click on a date to
              see events scheduled for that day.
            </p>
          </div>

          <div className="bg-white rounded-lg">
            <EventCalendar />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
