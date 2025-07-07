import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Event } from "@shared/schema";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Clock,
  Users,
  Share2,
  Bell,
} from "lucide-react";
import { Link, useRoute } from "wouter";
import { Badge } from "@/components/ui/badge";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { formatDate, formatTime } from "@/lib/utils";

export default function EventDetail() {
  const { toast } = useToast();
  const [, params] = useRoute("/events/:id");
  const eventId = params?.id ? parseInt(params.id, 10) : null;

  const {
    data: event,
    isLoading,
    error,
  } = useQuery<Event>({
    queryKey: ["/api/events", eventId],
    queryFn: async () => {
      if (!eventId) throw new Error("Event ID is required");
      return await apiRequest<Event>("GET", `/api/events/${eventId}`);
    },
    enabled: !!eventId,
  });

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Format event date
  const formatEventDate = (date: Date) => {
    const eventDate = new Date(date);
    const month = eventDate
      .toLocaleString("en-US", { month: "short" })
      .toUpperCase();
    const day = eventDate.getDate();
    const weekday = eventDate.toLocaleString("en-US", { weekday: "long" });
    const year = eventDate.getFullYear();

    return {
      month,
      day,
      weekday,
      year,
      formattedDate: `${month} ${day}, ${year}`,
    };
  };

  // Format event time
  const formatEventTime = (startDate: Date, endDate: Date) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const startTime = start.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    const endTime = end.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

    return `${startTime} - ${endTime}`;
  };

  // Calculate days remaining
  const getDaysRemaining = (eventDate: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const targetDate = new Date(eventDate);
    targetDate.setHours(0, 0, 0, 0);

    const diffTime = targetDate.getTime() - today.getTime();
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

  // Handle share
  const handleShare = () => {
    if (!event) return;

    if (navigator.share) {
      navigator
        .share({
          title: event.title,
          text: `Join us for ${event.title} at ${event.location}`,
          url: window.location.href,
        })
        .catch((error) => {
          console.error("Error sharing:", error);
          // Fallback to clipboard copy
          navigator.clipboard.writeText(window.location.href);
          toast({
            title: "Share Link Copied",
            description: "Event link copied to clipboard",
          });
        });
    } else {
      // Browser doesn't support sharing API, use clipboard
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Share Link Copied",
        description: "Event link copied to clipboard",
      });
    }
  };

  // Handle reminder
  const handleReminder = () => {
    if (!event) return;

    // Create a dialog to get the user's email for reminders
    const promptEmail = () => {
      const email = window.prompt(
        "Please enter your email to receive reminders:",
      );
      if (email) {
        if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          toast({
            title: "Reminder Set",
            description: `We'll send you a reminder before ${event.title}.`,
          });
        } else {
          toast({
            title: "Invalid Email",
            description: "Please enter a valid email address.",
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "Reminder Cancelled",
          description: "You need to provide an email to get reminders.",
          variant: "destructive",
        });
      }
    };

    promptEmail();
  };

  if (isLoading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="flex justify-center items-center h-96">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (error || !event) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-red-500 mb-4">
                Event Not Found
              </h1>
              <p className="text-gray-600 mb-8">
                We couldn't find the event you're looking for.
              </p>
              <Link href="/">
                <Button className="bg-primary hover:bg-primary/90 text-white">
                  Return to Home
                </Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const { month, day, weekday, formattedDate } = formatEventDate(event.date);
  const timeRange =
    event.startTime && event.endTime
      ? `${formatTime(event.startTime)} - ${formatTime(event.endTime)}`
      : "Time not specified";
  const daysRemaining = getDaysRemaining(event.date);
  const isPastEvent = daysRemaining === "Past event";

  return (
    <>
      <Navbar />
      <main className="min-h-screen py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="mb-8">
            <Link href="/events">
              <Button
                variant="ghost"
                className="mb-4 text-primary hover:text-primary/90"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Events
              </Button>
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-primary text-white p-8">
              <div className="flex flex-col md:flex-row md:items-center gap-8">
                <div className="md:w-1/4 flex flex-col items-center justify-center bg-white/10 rounded-lg p-6 text-center">
                  {event.isRecurring ? (
                    <Badge className="mb-2 bg-green-400 text-primary">
                      Weekly {event.recurringDay}
                    </Badge>
                  ) : (
                    <Badge
                      className={`mb-2 ${isPastEvent ? "bg-gray-400" : "bg-amber-400"} text-primary`}
                    >
                      {isPastEvent ? "Past Event" : daysRemaining}
                    </Badge>
                  )}
                  <span className="text-xl font-bold">{month}</span>
                  <span className="text-5xl font-bold mt-1 mb-1">{day}</span>
                  <span className="text-lg">{weekday}</span>
                </div>

                <div className="md:w-3/4">
                  <h1 className="text-3xl font-bold mb-4 font-serif">
                    {event.title}
                  </h1>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 mr-3 text-amber-300" />
                      <span>{formattedDate}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 mr-3 text-amber-300" />
                      <span>{timeRange}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 mr-3 text-amber-300" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-5 w-5 mr-3 text-amber-300" />
                      <span>{event.organizer || "Masjid Al-Ezz"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8">
              <div className="mb-8">
                <h2 className="text-xl font-bold text-primary mb-4">
                  About This Event
                </h2>
                <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                  {event.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                {!isPastEvent && (
                  <Button
                    className="bg-primary hover:bg-primary/90 text-white rounded-full"
                    onClick={() => window.history.back()}
                  >
                    No Registration Required - Just Show Up!
                  </Button>
                )}

                <Button
                  variant="outline"
                  className="rounded-full border-primary text-primary hover:bg-primary/5"
                  onClick={handleReminder}
                >
                  <Bell className="mr-2 h-4 w-4" />
                  Set Reminder
                </Button>

                <Button
                  variant="outline"
                  className="rounded-full border-primary text-primary hover:bg-primary/5"
                  onClick={handleShare}
                >
                  <Share2 className="mr-2 h-4 w-4" />
                  Share Event
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
