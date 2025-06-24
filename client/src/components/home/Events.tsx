import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Users, 
  CalendarCheck, 
  Share2,
  Bell,
  ChevronRight,
  ChevronLeft,
  Eye
} from "lucide-react";
import { Link } from "wouter";
import { Event } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

// Event registration schema
const eventRegistrationSchema = z.object({
  name: z.string().min(2, { message: "Please enter your name" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().optional(),
  additionalGuests: z.number().min(0).default(0),
  specialRequirements: z.string().optional(),
  addToMailingList: z.boolean().default(true),
});

type EventRegistrationValues = z.infer<typeof eventRegistrationSchema>;

export function Events() {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: events, isLoading, error } = useQuery<Event[]>({
    queryKey: ['/api/events', { active: true }]
  });

  // Form handling
  const form = useForm<EventRegistrationValues>({
    resolver: zodResolver(eventRegistrationSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      additionalGuests: 0,
      specialRequirements: "",
      addToMailingList: true,
    },
  });

  // Event registration mutation
  const registerMutation = useMutation({
    mutationFn: async (data: EventRegistrationValues & { eventId: number }) => {
      return await apiRequest(
        'POST',
        '/api/events/register',
        data
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/events'] });
      toast({
        title: "Registration Successful!",
        description: `You've been registered for ${selectedEvent?.title}.`,
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Registration Failed",
        description: "There was an error registering for the event.",
        variant: "destructive",
      });
    }
  });

  const onSubmit = (data: EventRegistrationValues) => {
    if (selectedEvent) {
      registerMutation.mutate({
        ...data,
        eventId: selectedEvent.id,
      });
    }
  };

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

  // Handle share
  const handleShare = (event: Event) => {
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: `Join us for ${event.title} at ${event.location}`,
        url: window.location.href
      }).catch((error) => {
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
  const handleReminder = (event: Event) => {
    // Create a dialog to get the user's email for reminders
    const promptEmail = () => {
      const email = window.prompt("Please enter your email to receive reminders:");
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

  return (
    <section id="events" className="py-16 bg-gradient-to-b from-primary/5 to-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between mb-12">
          <div className="lg:w-1/2 text-center lg:text-left mb-8 lg:mb-0">
            <Badge className="mb-3 px-3 py-1 bg-amber-400 text-primary hover:bg-amber-500">JOIN US</Badge>
            <h2 className="text-3xl font-bold font-serif text-primary mb-3">
              Community Events
            </h2>
            <div className="w-24 h-1 bg-amber-400 lg:mx-0 mx-auto mb-4"></div>
            <p className="text-gray-600 max-w-xl lg:pr-10">
              Connect with our community through these upcoming events. Register now to secure your spot.
            </p>
          </div>
          <div className="lg:w-1/2 flex justify-center lg:justify-end gap-3">
            <Link href="/events">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary/5 rounded-full px-5 py-2 h-auto">
                <Eye className="mr-2 h-4 w-4" />
                View All Events
              </Button>
            </Link>
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
                            {event.isRecurring ? (
                              <Badge className="mb-2 bg-green-400 text-primary">
                                Weekly {event.recurringDay}
                              </Badge>
                            ) : (
                              <Badge className={`mb-2 ${isPastEvent ? 'bg-gray-400' : 'bg-amber-400'} text-primary`}>
                                {isPastEvent ? 'Past Event' : daysRemaining}
                              </Badge>
                            )}
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
                                  <span className="text-sm">LED BY:</span>
                                  <span className="text-sm ml-auto">{event.organizer || "Imam Abdullah"}</span>
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
                              <div className="flex space-x-2">
                                {event.isRecurring ? (
                                  <Button 
                                    className="rounded-full bg-green-500 hover:bg-green-600 text-white"
                                    onClick={() => {
                                      toast({
                                        title: "Regular Weekly Event",
                                        description: "No registration required. Just show up at the scheduled time!",
                                      });
                                    }}
                                  >
                                    No Registration Needed
                                  </Button>
                                ) : (
                                  <Dialog>
                                    <DialogTrigger asChild>
                                      <Button 
                                        className={`rounded-full ${
                                          isPastEvent 
                                            ? 'bg-gray-300 text-gray-700 cursor-not-allowed'
                                            : 'bg-primary hover:bg-primary/90 text-white'
                                        }`}
                                        disabled={isPastEvent}
                                        onClick={() => setSelectedEvent(event)}
                                      >
                                        {isPastEvent ? 'Event Ended' : 'Register Now'}
                                      </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[500px]">
                                      <DialogHeader>
                                        <DialogTitle className="text-primary text-xl font-serif">
                                          Register for {selectedEvent?.title}
                                        </DialogTitle>
                                        <DialogDescription>
                                          Fill out this form to register for the event. We'll send you a confirmation email.
                                        </DialogDescription>
                                      </DialogHeader>
                                      <Form {...form}>
                                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
                                          <FormField
                                            control={form.control}
                                            name="name"
                                            render={({ field }) => (
                                              <FormItem>
                                                <FormLabel>Full Name</FormLabel>
                                                <FormControl>
                                                  <Input placeholder="Your full name" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                              </FormItem>
                                            )}
                                          />
                                          <FormField
                                            control={form.control}
                                            name="email"
                                            render={({ field }) => (
                                              <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                  <Input placeholder="your.email@example.com" type="email" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                              </FormItem>
                                            )}
                                          />
                                          <FormField
                                            control={form.control}
                                            name="phone"
                                            render={({ field }) => (
                                              <FormItem>
                                                <FormLabel>Phone (optional)</FormLabel>
                                                <FormControl>
                                                  <Input placeholder="Your phone number" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                              </FormItem>
                                            )}
                                          />
                                          <FormField
                                            control={form.control}
                                            name="additionalGuests"
                                            render={({ field }) => (
                                              <FormItem>
                                                <FormLabel>Additional Guests</FormLabel>
                                                <FormControl>
                                                  <Input 
                                                    type="number" 
                                                    min="0"
                                                    {...field}
                                                    onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                                                  />
                                                </FormControl>
                                                <FormDescription>
                                                  Number of people attending with you
                                                </FormDescription>
                                                <FormMessage />
                                              </FormItem>
                                            )}
                                          />
                                          <FormField
                                            control={form.control}
                                            name="specialRequirements"
                                            render={({ field }) => (
                                              <FormItem>
                                                <FormLabel>Special Requirements (optional)</FormLabel>
                                                <FormControl>
                                                  <Textarea 
                                                    placeholder="Any dietary restrictions or other requirements?"
                                                    {...field}
                                                  />
                                                </FormControl>
                                                <FormMessage />
                                              </FormItem>
                                            )}
                                          />
                                          <FormField
                                            control={form.control}
                                            name="addToMailingList"
                                            render={({ field }) => (
                                              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-3">
                                                <FormControl>
                                                  <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                  />
                                                </FormControl>
                                                <div className="space-y-1 leading-none">
                                                  <FormLabel>
                                                    Add me to the mailing list
                                                  </FormLabel>
                                                  <FormDescription>
                                                    Receive updates about future events
                                                  </FormDescription>
                                                </div>
                                              </FormItem>
                                            )}
                                          />
                                          <DialogFooter className="mt-4">
                                            <Button 
                                              type="submit" 
                                              className="w-full bg-primary hover:bg-primary/90"
                                              disabled={registerMutation.isPending}
                                            >
                                              {registerMutation.isPending ? "Registering..." : "Complete Registration"}
                                            </Button>
                                          </DialogFooter>
                                        </form>
                                      </Form>
                                    </DialogContent>
                                  </Dialog>
                                )}

                                <Link href={`/events/${event.id}`}>
                                  <Button variant="outline" className="text-primary border-primary hover:bg-primary/10">
                                    Event Details
                                  </Button>
                                </Link>
                              </div>
                              
                              <div className="flex space-x-2">
                                <Button 
                                  variant="outline" 
                                  size="icon" 
                                  className="rounded-full"
                                  title="Get reminders"
                                  onClick={() => handleReminder(event)}
                                >
                                  <Bell className="h-4 w-4" />
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="icon" 
                                  className="rounded-full"
                                  title="Share event"
                                  onClick={() => handleShare(event)}
                                >
                                  <Share2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                );
              })}
            </div>

            {/* Pagination controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center mt-8 space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                  disabled={currentPage === 0}
                  className="rounded-full"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                
                <div className="text-sm text-gray-600">
                  Page {currentPage + 1} of {totalPages}
                </div>
                
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))}
                  disabled={currentPage === totalPages - 1}
                  className="rounded-full"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center bg-gray-50 p-10 rounded-lg border border-gray-100">
            <Calendar className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-bold text-primary mb-2">No Upcoming Events</h3>
            <p className="text-gray-600 max-w-md mx-auto mb-6">
              We don't have any upcoming events scheduled at the moment. Check back soon or sign up for our mailing list to be notified.
            </p>
            <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-2">
              <Input 
                type="email" 
                placeholder="Your email address"
                className="sm:flex-1" 
                id="mailing-list-email"
              />
              <Button 
                className="bg-primary hover:bg-primary/90 text-white"
                onClick={() => {
                  const emailInput = document.getElementById('mailing-list-email') as HTMLInputElement;
                  const email = emailInput?.value;
                  
                  if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                    toast({
                      title: "Subscription Successful",
                      description: "You've been added to our mailing list!",
                    });
                    emailInput.value = '';
                  } else {
                    toast({
                      title: "Invalid Email",
                      description: "Please enter a valid email address.",
                      variant: "destructive",
                    });
                  }
                }}
              >
                Subscribe
              </Button>
            </div>
          </div>
        )}

        {/* Suggestion/Request Section */}
        <div className="mt-16 bg-gray-50 p-6 sm:p-10 rounded-lg">
          <h3 className="text-xl font-bold text-primary mb-3">Have an Event Idea?</h3>
          <p className="text-gray-600 mb-6">
            We welcome suggestions for community events. If you have an idea, please share it with us!
          </p>
          <div className="flex flex-wrap gap-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90 text-white">Suggest an Event</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle className="text-primary text-xl font-serif">Suggest an Event</DialogTitle>
                  <DialogDescription>
                    Fill out this form to suggest an event for our community. We'll review it and get back to you.
                  </DialogDescription>
                </DialogHeader>
                <form className="space-y-4 py-2">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <FormLabel>Your Name</FormLabel>
                      <Input id="event-idea-name" placeholder="Full name" />
                    </div>
                    <div className="space-y-2">
                      <FormLabel>Email</FormLabel>
                      <Input id="event-idea-email" placeholder="Your email address" type="email" />
                    </div>
                    <div className="space-y-2">
                      <FormLabel>Event Title</FormLabel>
                      <Input placeholder="What would you like to call this event?" />
                    </div>
                    <div className="space-y-2">
                      <FormLabel>Event Description</FormLabel>
                      <Textarea placeholder="Please describe the event and its purpose" />
                    </div>
                    <div className="space-y-2">
                      <FormLabel>Suggested Date/Time</FormLabel>
                      <Input placeholder="When do you think would be a good time?" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button 
                      type="button"
                      className="bg-primary hover:bg-primary/90 w-full"
                      onClick={() => {
                        const nameInput = document.getElementById('event-idea-name') as HTMLInputElement;
                        const emailInput = document.getElementById('event-idea-email') as HTMLInputElement;
                        
                        if (!nameInput?.value || !emailInput?.value) {
                          toast({
                            title: "Missing Information",
                            description: "Please provide your name and email.",
                            variant: "destructive",
                          });
                          return;
                        }
                        
                        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
                          toast({
                            title: "Invalid Email",
                            description: "Please enter a valid email address.",
                            variant: "destructive",
                          });
                          return;
                        }
                        
                        toast({
                          title: "Thank You!",
                          description: "Your event idea has been submitted. We'll review it soon.",
                        });
                        
                        // Reset inputs
                        const inputs = document.querySelectorAll('input, textarea');
                        inputs.forEach((element) => {
                          if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) {
                            element.value = '';
                          }
                        });
                      }}
                    >
                      Submit Suggestion
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
              Community Guidelines
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}