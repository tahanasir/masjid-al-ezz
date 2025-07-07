import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  ArrowRight,
  Clock,
  Users,
  Bell,
  Share2,
  Eye,
} from "lucide-react";
import { Link } from "wouter";
import { Program } from "@shared/schema";
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
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { DollarSign } from "lucide-react";

// Registration form schema
const registrationSchema = z.object({
  name: z.string().min(2, { message: "Please enter your name" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().optional(),
  comments: z.string().optional(),
});

type RegistrationFormValues = z.infer<typeof registrationSchema>;

export function Programs() {
  const {
    data: programs,
    isLoading,
    error,
  } = useQuery<Program[]>({
    queryKey: ["/api/programs", { active: true }],
  });

  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const { toast } = useToast();

  // Filter programs based on selected category
  const filteredPrograms = programs?.filter((program) => {
    if (!activeFilter) return true; // Show all if no filter active

    const categoryMap: Record<string, string[]> = {
      weekly: ["weekly", "regular", "class"],
      youth: ["youth", "teen", "children", "kids"],
      family: ["family", "community", "social"],
      sisters: ["sisters", "women", "ladies"],
    };

    // Check if program title or description contains any of the keywords for the active filter
    const keywords = categoryMap[activeFilter] || [];
    const programTitle = program.title.toLowerCase();
    const programDesc = program.description.toLowerCase();
    const programSchedule = program.schedule.toLowerCase();

    return keywords.some(
      (keyword) =>
        programTitle.includes(keyword) ||
        programDesc.includes(keyword) ||
        programSchedule.includes(keyword),
    );
  });

  // Form handling
  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      comments: "",
    },
  });

  const onSubmit = (data: RegistrationFormValues) => {
    console.log(
      "Registration data:",
      data,
      "for program:",
      selectedProgram?.title,
    );

    // Show success toast
    toast({
      title: "Registration Successful!",
      description: `You've been registered for ${selectedProgram?.title}. We'll contact you with more details soon.`,
    });

    // Reset form
    form.reset();
  };

  // Container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  // Card animation variants
  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
    hover: {
      y: -10,
      boxShadow:
        "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <section
      id="programs"
      className="py-20 bg-gradient-to-b from-white to-primary/5"
    >
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between mb-16">
          <div className="lg:w-1/2 text-center lg:text-left mb-8 lg:mb-0">
            <h2 className="text-4xl font-bold font-serif text-primary mb-4">
              Weekly Programs
            </h2>
            <div className="w-24 h-1 bg-amber-400 lg:mx-0 mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-xl lg:pr-10">
              Enrich your spiritual journey and build meaningful connections.
              Our regular programs are designed to nurture faith, education, and
              community bonds for all ages.
            </p>
          </div>
          <div className="lg:w-1/2 flex flex-col items-center lg:items-end gap-5">
            <Link href="/programs">
              <Button className="bg-primary hover:bg-primary/90 text-white rounded-full px-5 py-2 h-auto shadow-md">
                <Eye className="mr-2 h-4 w-4" />
                View All Programs
              </Button>
            </Link>
            <div className="flex flex-wrap gap-3 justify-center lg:justify-end">
              <Badge
                variant={activeFilter === "weekly" ? "default" : "outline"}
                className={`px-4 py-2 rounded-full ${
                  activeFilter === "weekly"
                    ? "bg-primary text-white"
                    : "border-primary/30 text-primary"
                } font-medium hover:bg-primary/5 cursor-pointer transition-colors`}
                onClick={() =>
                  setActiveFilter(activeFilter === "weekly" ? null : "weekly")
                }
              >
                Weekly Classes
              </Badge>
              <Badge
                variant={activeFilter === "youth" ? "default" : "outline"}
                className={`px-4 py-2 rounded-full ${
                  activeFilter === "youth"
                    ? "bg-primary text-white"
                    : "border-primary/30 text-primary"
                } font-medium hover:bg-primary/5 cursor-pointer transition-colors`}
                onClick={() =>
                  setActiveFilter(activeFilter === "youth" ? null : "youth")
                }
              >
                Youth Programs
              </Badge>
              <Badge
                variant={activeFilter === "family" ? "default" : "outline"}
                className={`px-4 py-2 rounded-full ${
                  activeFilter === "family"
                    ? "bg-primary text-white"
                    : "border-primary/30 text-primary"
                } font-medium hover:bg-primary/5 cursor-pointer transition-colors`}
                onClick={() =>
                  setActiveFilter(activeFilter === "family" ? null : "family")
                }
              >
                Family Events
              </Badge>
              <Badge
                variant={activeFilter === "sisters" ? "default" : "outline"}
                className={`px-4 py-2 rounded-full ${
                  activeFilter === "sisters"
                    ? "bg-primary text-white"
                    : "border-primary/30 text-primary"
                } font-medium hover:bg-primary/5 cursor-pointer transition-colors`}
                onClick={() =>
                  setActiveFilter(activeFilter === "sisters" ? null : "sisters")
                }
              >
                Sisters Activities
              </Badge>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array(3)
              .fill(0)
              .map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <Skeleton className="h-48 w-full" />
                  <CardContent className="p-6">
                    <Skeleton className="h-4 w-1/3 mb-3" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-2/3 mb-4" />
                    <Skeleton className="h-4 w-1/4" />
                  </CardContent>
                </Card>
              ))}
          </div>
        ) : error ? (
          <div className="text-center text-red-500">
            Failed to load programs. Please try again later.
          </div>
        ) : filteredPrograms?.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-primary text-3xl mb-4">
              No matching programs found
            </div>
            <p className="text-gray-600 mb-6">
              Try selecting a different category or clear the filter
            </p>
            <Button
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-white"
              onClick={() => setActiveFilter(null)}
            >
              Show All Programs
            </Button>
          </div>
        ) : (
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {filteredPrograms?.map((program) => (
              <motion.div
                key={program.id}
                variants={cardVariants}
                whileHover="hover"
              >
                <Card className="overflow-hidden h-full flex flex-col border-transparent shadow-md hover:shadow-xl transition-shadow">
                  <div className="h-40 overflow-hidden relative">
                    <img
                      src={
                        program.image ||
                        "https://images.unsplash.com/photo-1584286596588-9d5f4523878c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                      }
                      alt={program.title}
                      className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/60 to-transparent flex flex-col justify-end p-5">
                      <h3 className="text-white text-xl font-serif font-bold">
                        {program.title}
                      </h3>
                    </div>
                  </div>
                  <CardContent className="p-5 flex-grow">
                    <div className="border-l-4 border-amber-400 pl-3 mb-4">
                      <div className="flex items-center gap-2 text-primary font-semibold mb-1">
                        <Calendar className="h-4 w-4" />
                        <span className="text-sm">WHEN:</span>
                        <span className="text-sm ml-auto">
                          {program.schedule}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-primary font-semibold mb-1">
                        <Clock className="h-4 w-4" />
                        <span className="text-sm">TIME:</span>
                        <span className="text-sm ml-auto">{program.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-primary font-semibold mb-1">
                        <Users className="h-4 w-4" />
                        <span className="text-sm">LED BY:</span>
                        <span className="text-sm ml-auto">
                          {program.instructor}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-primary font-semibold">
                        <DollarSign className="h-4 w-4" />
                        <span className="text-sm">COST:</span>
                        <span className="text-sm ml-auto">{program.cost}</span>
                      </div>
                    </div>
                    <div className="mb-3">
                      <h4 className="text-sm uppercase font-semibold text-gray-500 mb-1">
                        DETAILS
                      </h4>
                      <p className="text-gray-700 text-sm">
                        {program.description}
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter className="p-6 pt-0 flex justify-between gap-2 flex-wrap">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          className="bg-primary hover:bg-primary/90 text-white rounded-full w-full sm:w-auto"
                          onClick={() => setSelectedProgram(program)}
                        >
                          Register for Program
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                          <DialogTitle className="text-primary text-2xl font-serif">
                            Register for {selectedProgram?.title}
                          </DialogTitle>
                          <DialogDescription>
                            Please fill out this form to register for this
                            program. We'll add you to our mailing list to keep
                            you informed about this and future events.
                          </DialogDescription>
                        </DialogHeader>
                        <Form {...form}>
                          <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-4 py-4"
                          >
                            <FormField
                              control={form.control}
                              name="name"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Full Name</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="Enter your full name"
                                      {...field}
                                    />
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
                                    <Input
                                      placeholder="your.email@example.com"
                                      type="email"
                                      {...field}
                                    />
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
                                    <Input
                                      placeholder="Your phone number"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="comments"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Comments (optional)</FormLabel>
                                  <FormControl>
                                    <Textarea
                                      placeholder="Any questions or comments about the program?"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <DialogFooter className="mt-6">
                              <Button
                                type="submit"
                                className="w-full bg-primary hover:bg-primary/90"
                              >
                                Complete Registration
                              </Button>
                            </DialogFooter>
                          </form>
                        </Form>
                      </DialogContent>
                    </Dialog>
                    <div className="flex space-x-1">
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full"
                        title="Get notifications"
                        onClick={() => {
                          // Create a dialog to get the user's email for notifications
                          const promptEmail = () => {
                            const email = window.prompt(
                              "Please enter your email to receive notifications:",
                            );
                            if (email) {
                              if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                                toast({
                                  title: "Notification Enabled",
                                  description: `You'll receive notifications for ${program.title}.`,
                                });
                              } else {
                                toast({
                                  title: "Invalid Email",
                                  description:
                                    "Please enter a valid email address.",
                                  variant: "destructive",
                                });
                              }
                            } else {
                              toast({
                                title: "Notification Cancelled",
                                description:
                                  "You need to provide an email to get notifications.",
                                variant: "destructive",
                              });
                            }
                          };
                          promptEmail();
                        }}
                      >
                        <Bell className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full"
                        title="Share program"
                        onClick={() => {
                          // Share functionality
                          if (navigator.share) {
                            navigator
                              .share({
                                title: program.title,
                                text: `Join the ${program.title} program at Masjid Al Ezz`,
                                url: window.location.href,
                              })
                              .catch((error) => {
                                console.error("Error sharing:", error);
                                // Fallback to clipboard copy
                                navigator.clipboard.writeText(
                                  window.location.href,
                                );
                                toast({
                                  title: "Share Link Copied",
                                  description:
                                    "Program link copied to clipboard",
                                });
                              });
                          } else {
                            // Browser doesn't support sharing API, use clipboard
                            navigator.clipboard.writeText(window.location.href);
                            toast({
                              title: "Share Link Copied",
                              description: "Program link copied to clipboard",
                            });
                          }
                        }}
                      >
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}

        <div className="mt-16 text-center">
          <a href="/programs">
            <Button className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 py-2 h-12 text-base shadow-lg">
              View All Programs <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </a>

          <div className="mt-12 p-8 bg-primary/5 rounded-2xl max-w-3xl mx-auto">
            <h3 className="text-xl font-bold text-primary mb-4">
              Want to suggest a program?
            </h3>
            <p className="text-gray-600 mb-4">
              Have an idea for a community program or activity? We value your
              input and would love to hear your suggestions!
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-white"
                >
                  Submit Program Idea
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle className="text-primary text-xl font-serif">
                    Suggest a Program
                  </DialogTitle>
                  <DialogDescription>
                    We welcome your ideas! Fill out this form to suggest a new
                    program for our community.
                  </DialogDescription>
                </DialogHeader>
                <form className="space-y-4 py-4">
                  <div className="space-y-2">
                    <FormLabel htmlFor="idea-name">Your Name</FormLabel>
                    <Input id="idea-name" placeholder="Your full name" />
                  </div>
                  <div className="space-y-2">
                    <FormLabel htmlFor="idea-email">Email</FormLabel>
                    <Input
                      id="idea-email"
                      type="email"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <FormLabel htmlFor="idea-title">Program Title</FormLabel>
                    <Input
                      id="idea-title"
                      placeholder="Proposed program title"
                    />
                  </div>
                  <div className="space-y-2">
                    <FormLabel htmlFor="idea-description">
                      Program Description
                    </FormLabel>
                    <Textarea
                      id="idea-description"
                      placeholder="Please describe your program idea in detail"
                      className="min-h-[100px]"
                    />
                  </div>
                  <DialogFooter className="mt-6">
                    <Button
                      type="button"
                      className="w-full bg-primary hover:bg-primary/90"
                      onClick={() => {
                        const nameInput = document.getElementById(
                          "idea-name",
                        ) as HTMLInputElement;
                        const emailInput = document.getElementById(
                          "idea-email",
                        ) as HTMLInputElement;

                        if (!nameInput?.value || !emailInput?.value) {
                          toast({
                            title: "Missing Information",
                            description: "Please provide your name and email.",
                            variant: "destructive",
                          });
                          return;
                        }

                        if (
                          !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)
                        ) {
                          toast({
                            title: "Invalid Email",
                            description: "Please enter a valid email address.",
                            variant: "destructive",
                          });
                          return;
                        }

                        toast({
                          title: "Thank You!",
                          description:
                            "Your program idea has been submitted. We'll review it soon.",
                        });

                        // Reset inputs
                        const inputs =
                          document.querySelectorAll("input, textarea");
                        inputs.forEach((element) => {
                          if (
                            element instanceof HTMLInputElement ||
                            element instanceof HTMLTextAreaElement
                          ) {
                            element.value = "";
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
          </div>
        </div>
      </div>
    </section>
  );
}
