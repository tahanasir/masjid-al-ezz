import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Event } from "@shared/schema";
import { EventCalendar } from "@/components/home/EventCalendar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function EventCalendarPage() {
  const { data: events, isLoading } = useQuery<Event[]>({
    queryKey: ["/api/events", { active: true }],
  });

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <main className="min-h-screen py-20 bg-gray-50">
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
            <p className="text-gray-600 max-w-2xl">
              Browse all upcoming events at Masjid Al-Ezz. Click on a date to
              see events scheduled for that day.
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-96">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <EventCalendar />
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
