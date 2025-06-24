import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Event } from '@shared/schema';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  Clock, 
  Users, 
  CalendarCheck,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { Link } from 'wouter';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';

export default function EventsPage() {
  const [currentPage, setCurrentPage] = useState(0);
  const { toast } = useToast();
  const { data: events, isLoading, error } = useQuery<Event[]>({
    queryKey: ['/api/events', { active: true }]
  });

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Helper function to format event date
  const formatEventDate = (date: Date) => {
    const eventDate = new Date(date);
    const month = eventDate.toLocaleString('en-US', { month: 'short' }).toUpperCase();
    const day = eventDate.getDate();
    const weekday = eventDate.toLocaleString('en-US', { weekday: 'long' });
    const year = eventDate.getFullYear();
    
    return { month, day, weekday, year, formattedDate: `${month} ${day}, ${year}` };
  };
  
  // Helper function to format event time
  const formatEventTime = (startDate: Date, endDate: Date) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    const startTime = start.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    const endTime = end.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    
    return `${startTime} - ${endTime}`;
  };

  // Calculate days remaining
  const getDaysRemaining = (eventDate: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const event = new Date(eventDate);
    event.setHours(0, 0, 0, 0);
    
    const diffTime = event.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return "Today!";
    } else if (diffDays === 1) {
      return "Tomorrow!";
    } else if (diffDays < 0) {
      return "Past event";
    } else {
      return `${diffDays} days away`;
    }
  };

  // Pagination logic
  const ITEMS_PER_PAGE = 3;
  const paginatedEvents = events ? 
    events.slice(currentPage * ITEMS_PER_PAGE, (currentPage + 1) * ITEMS_PER_PAGE) : 
    [];
  const totalPages = events ? Math.ceil(events.length / ITEMS_PER_PAGE) : 0;

  return (
    <>
      <Navbar />
      <main className="min-h-screen py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-start justify-between mb-8">
            <div>
              <Link href="/">
                <Button variant="ghost" className="mb-4 text-primary hover:text-primary/90">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Home
                </Button>
              </Link>
              <h1 className="text-3xl font-bold text-primary font-serif mb-2">Community Events</h1>
              <p className="text-gray-600 max-w-2xl mb-6">
                Browse our upcoming events at Masjid Al-Ezz. These events are open to all community members - 
                no registration required! Just show up and participate.
              </p>
            </div>
            <div className="lg:mt-0 mt-4">
              <Link href="/events/calendar">
                <Button className="bg-primary hover:bg-primary/90 text-white rounded-full px-5 py-2 h-auto shadow-md">
                  <CalendarCheck className="mr-2 h-4 w-4" />
                  View Calendar
                </Button>
              </Link>
            </div>
          </div>
          
          {isLoading ? (
            <div className="grid gap-6">
              {Array(2).fill(0).map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <Skeleton className="md:w-1/4 h-40 md:h-auto" />
                    <div className="md:w-3/4 p-6">
                      <Skeleton className="h-8 w-3/4 mb-4" />
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-3/4 mb-4" />
                      <div className="flex gap-3 mt-6">
                        <Skeleton className="h-10 w-24" />
                        <Skeleton className="h-10 w-24" />
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : error ? (
            <div className="text-center text-red-500 p-8 bg-red-50 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Error Loading Events</h3>
              <p>We couldn't load the events information. Please try again later.</p>
            </div>
          ) : events && events.length > 0 ? (
            <>
              <div className="space-y-6">
                {paginatedEvents.map((event) => {
                  const { month, day, weekday, formattedDate } = formatEventDate(event.date);
                  const timeRange = formatEventTime(event.date, event.endDate);
                  const daysRemaining = getDaysRemaining(event.date);
                  const isPastEvent = daysRemaining === "Past event";
                  
                  return (
                    <div key={event.id} className="transition-all duration-300 hover:-translate-y-1">
                      <Card className="overflow-hidden border-transparent shadow-md hover:shadow-xl">
                        <div className="flex flex-col lg:flex-row">
                          <div className="lg:w-1/4 bg-gradient-to-br from-primary to-primary/90 text-white flex flex-col items-center justify-center p-6 text-center">
                            <div className="flex flex-col items-center">
                              <Badge className={`mb-2 ${isPastEvent ? 'bg-gray-400' : 'bg-amber-400'} text-primary`}>
                                {isPastEvent ? 'Past Event' : daysRemaining}
                              </Badge>
                              <span className="text-xl font-bold">{month}</span>
                              <span className="text-4xl font-bold mt-1 mb-1">{day}</span>
                              <span className="text-sm">{weekday}</span>
                            </div>
                            <div className="mt-4 pt-4 border-t border-white/30 w-full">
                              <div className="flex items-center justify-center">
                                <Clock className="mr-2 h-4 w-4" />
                                <span className="text-sm">{timeRange}</span>
                              </div>
                            </div>
                          </div>
                          <div className="lg:w-3/4 p-6">
                            <div className="flex flex-col h-full">
                              <div className="mb-4">
                                <h3 className="text-xl font-bold text-primary mb-3">{event.title}</h3>
                                <div className="border-l-4 border-amber-400 pl-3 mb-4">
                                  <div className="flex items-center gap-2 text-primary font-semibold mb-1">
                                    <Calendar className="h-4 w-4" />
                                    <span className="text-sm">DATE:</span>
                                    <span className="text-sm ml-auto">{formattedDate}</span>
                                  </div>
                                  <div className="flex items-center gap-2 text-primary font-semibold mb-1">
                                    <Clock className="h-4 w-4" />
                                    <span className="text-sm">TIME:</span>
                                    <span className="text-sm ml-auto">{timeRange}</span>
                                  </div>
                                  <div className="flex items-center gap-2 text-primary font-semibold mb-1">
                                    <Users className="h-4 w-4" />
                                    <span className="text-sm">ORGANIZED BY:</span>
                                    <span className="text-sm ml-auto">{event.organizer || "Masjid Al-Ezz"}</span>
                                  </div>
                                  <div className="flex items-center gap-2 text-primary font-semibold">
                                    <MapPin className="h-4 w-4" />
                                    <span className="text-sm">LOCATION:</span>
                                    <span className="text-sm ml-auto">{event.location}</span>
                                  </div>
                                </div>
                                
                                <div className="mb-3">
                                  <h4 className="text-sm uppercase font-semibold text-gray-500 mb-1">DETAILS</h4>
                                  <p className="text-gray-700">{event.description}</p>
                                </div>
                              </div>
                              
                              <div className="mt-auto flex flex-wrap items-center justify-between gap-4">
                                <Link href={`/events/${event.id}`}>
                                  <Button
                                    className={`rounded-full ${
                                      isPastEvent 
                                        ? 'bg-gray-300 text-gray-700 cursor-not-allowed'
                                        : 'bg-primary hover:bg-primary/90 text-white'
                                    }`}
                                    disabled={isPastEvent}
                                  >
                                    {isPastEvent ? 'Event Ended' : 'View Event Details'}
                                  </Button>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </div>
                  );
                })}
              </div>
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-8">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                      disabled={currentPage === 0}
                      className="h-8 w-8 rounded-full"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    
                    {Array.from({ length: totalPages }).map((_, index) => (
                      <Button
                        key={index}
                        variant={currentPage === index ? "default" : "outline"}
                        className={`h-8 w-8 rounded-full ${
                          currentPage === index 
                            ? "bg-primary text-white" 
                            : "text-gray-600 hover:text-primary"
                        }`}
                        onClick={() => setCurrentPage(index)}
                      >
                        {index + 1}
                      </Button>
                    ))}
                    
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))}
                      disabled={currentPage === totalPages - 1}
                      className="h-8 w-8 rounded-full"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center p-12 bg-white rounded-lg shadow">
              <h3 className="text-xl font-semibold text-primary mb-2">No Upcoming Events</h3>
              <p className="text-gray-600 mb-6">Check back soon for new events at Masjid Al-Ezz.</p>
              <Link href="/">
                <Button className="bg-primary hover:bg-primary/90 text-white">
                  Return to Home
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}