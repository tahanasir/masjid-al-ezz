import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar as CalendarIcon } from "lucide-react";

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
            <Card className="overflow-hidden">
              <CardHeader className="bg-primary text-white">
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5" />
                  <span>Masjid Al-Ezz Calendar</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="w-full" style={{ minHeight: "600px" }}>
                  <iframe
                    src="https://outlook.office365.com/calendar/published/126d26d7c13d4efd91358276b548d523@masjidalezz.com/a336e9735d984f609c5b066cd425afb312828042222603164614/calendar.html"
                    width="100%"
                    height="600"
                    title="Masjid Al-Ezz Community Calendar"
                    className="w-full"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
