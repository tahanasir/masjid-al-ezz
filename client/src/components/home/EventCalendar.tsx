import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar as CalendarIcon } from "lucide-react";

export function EventCalendar() {

  return (
    <section id="event-calendar" className="py-16 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-serif text-primary mb-2">Community Calendar</h2>
          <div className="w-24 h-1 bg-secondary mx-auto mb-6"></div>
          <p className="max-w-xl mx-auto text-gray-600">
            Stay updated with events and activities happening at Masjid Al-Ezz.
          </p>
        </div>
        
        {/* Embedded Outlook Calendar */}
        <div className="max-w-6xl mx-auto">
          <Card className="overflow-hidden shadow-lg">
            <CardHeader className="bg-primary text-white">
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5" />
                <span>Masjid Al-Ezz Calendar</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="w-full" style={{ minHeight: '600px' }}>
                <iframe
                  src="https://outlook.office365.com/calendar/published/126d26d7c13d4efd91358276b548d523@masjidalezz.com/a336e9735d984f609c5b066cd425afb312828042222603164614/calendar.html"
                  width="100%"
                  height="600"
                  frameBorder="0"
                  scrolling="yes"
                  title="Masjid Al-Ezz Community Calendar"
                  className="w-full"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}