import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Program } from "@shared/schema";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Users,
  MapPin,
  Share2,
  Bell,
} from "lucide-react";
import { Link, useRoute } from "wouter";
import { Badge } from "@/components/ui/badge";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
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
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";

// Registration form schema
const registrationSchema = z.object({
  name: z.string().min(2, { message: "Please enter your name" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().optional(),
  age: z.string().optional(),
  experience: z.string().optional(),
  comments: z.string().optional(),
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms to register",
  }),
});

type RegistrationFormValues = z.infer<typeof registrationSchema>;

export default function ProgramDetail() {
  const { toast } = useToast();
  const [, params] = useRoute("/programs/:id");
  const programId = params?.id ? parseInt(params.id, 10) : null;

  const {
    data: program,
    isLoading,
    error,
  } = useQuery<Program>({
    queryKey: ["/api/programs", programId],
    queryFn: async () => {
      if (!programId) throw new Error("Program ID is required");
      return await apiRequest<Program>("GET", `/api/programs/${programId}`);
    },
    enabled: !!programId,
  });

  // Form handling
  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      age: "",
      experience: "",
      comments: "",
      agreeToTerms: false,
    },
  });

  const onSubmit = (data: RegistrationFormValues) => {
    console.log("Registration data:", data);

    toast({
      title: "Registration Successful!",
      description: `You've been registered for ${program?.title}. We'll contact you with more details soon.`,
    });

    form.reset();
  };

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Handle share
  const handleShare = () => {
    if (!program) return;

    if (navigator.share) {
      navigator
        .share({
          title: program.title,
          text: `Check out the ${program.title} program at Masjid Al-Ezz`,
          url: window.location.href,
        })
        .catch((error) => {
          console.error("Error sharing:", error);
          // Fallback to clipboard copy
          navigator.clipboard.writeText(window.location.href);
          toast({
            title: "Share Link Copied",
            description: "Program link copied to clipboard",
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
  };

  // Handle reminder
  const handleReminder = () => {
    if (!program) return;

    // Create a dialog to get the user's email for reminders
    const promptEmail = () => {
      const email = window.prompt(
        "Please enter your email to receive notifications about this program:",
      );
      if (email) {
        if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          toast({
            title: "Notifications Enabled",
            description: `You'll receive updates about ${program.title}.`,
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
          title: "Notification Cancelled",
          description: "You need to provide an email to get notifications.",
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

  if (error || !program) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-red-500 mb-4">
                Program Not Found
              </h1>
              <p className="text-gray-600 mb-8">
                We couldn't find the program you're looking for.
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

  return (
    <>
      <Navbar />
      <main className="min-h-screen py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="mb-8">
            <Link href="/programs">
              <Button
                variant="ghost"
                className="mb-4 text-primary hover:text-primary/90"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to All Programs
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-64 overflow-hidden relative">
                  <img
                    src={
                      program.image ||
                      "https://images.unsplash.com/photo-1584286596588-9d5f4523878c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                    }
                    alt={program.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/60 to-transparent flex flex-col justify-end p-8">
                    <Badge className="mb-3 self-start px-3 py-1 bg-amber-400 text-primary hover:bg-amber-500">
                      PROGRAM
                    </Badge>
                    <h1 className="text-3xl font-bold text-white font-serif">
                      {program.title}
                    </h1>
                  </div>
                </div>

                <div className="p-8">
                  <div className="grid grid-cols-2 gap-4 border-l-4 border-amber-400 pl-4 py-2 mb-8">
                    <div className="flex items-center gap-2 text-primary">
                      <Calendar className="h-5 w-5" />
                      <div>
                        <p className="text-gray-500 text-xs font-medium">
                          SCHEDULE
                        </p>
                        <p className="font-semibold">{program.schedule}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-primary">
                      <Clock className="h-5 w-5" />
                      <div>
                        <p className="text-gray-500 text-xs font-medium">
                          TIME
                        </p>
                        <p className="font-semibold">
                          {program.time || "Contact for details"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-primary">
                      <Users className="h-5 w-5" />
                      <div>
                        <p className="text-gray-500 text-xs font-medium">
                          INSTRUCTOR
                        </p>
                        <p className="font-semibold">
                          {program.instructor || "Masjid Staff"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-primary">
                      <MapPin className="h-5 w-5" />
                      <div>
                        <p className="text-gray-500 text-xs font-medium">
                          LOCATION
                        </p>
                        <p className="font-semibold">Masjid Al-Ezz</p>
                      </div>
                    </div>
                  </div>

                  <div className="mb-8">
                    <h2 className="text-xl font-bold text-primary mb-4">
                      Program Description
                    </h2>
                    <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                      {program.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <Button
                      variant="outline"
                      className="rounded-full border-primary text-primary hover:bg-primary/5"
                      onClick={handleReminder}
                    >
                      <Bell className="mr-2 h-4 w-4" />
                      Get Notifications
                    </Button>

                    <Button
                      variant="outline"
                      className="rounded-full border-primary text-primary hover:bg-primary/5"
                      onClick={handleShare}
                    >
                      <Share2 className="mr-2 h-4 w-4" />
                      Share Program
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <Card className="shadow-md">
                <CardHeader className="bg-primary text-white">
                  <CardTitle className="text-xl font-serif">
                    Program Registration
                  </CardTitle>
                  <CardDescription className="text-white/80">
                    Fill out this form to join this program
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-4"
                    >
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
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="you@example.com"
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
                        name="age"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Age Group (optional)</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="e.g. 18-25, 26-35, etc."
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="experience"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Previous Experience (optional)
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Any relevant experience"
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
                                placeholder="Additional information or questions"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="agreeToTerms"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 mt-4">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>
                                I agree to be contacted about this program
                              </FormLabel>
                              <FormDescription>
                                We'll send you information about the program and
                                add you to our mailing list
                              </FormDescription>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </form>
                  </Form>
                </CardContent>
                <CardFooter className="bg-gray-50 border-t">
                  <Button
                    className="w-full bg-primary hover:bg-primary/90"
                    onClick={form.handleSubmit(onSubmit)}
                  >
                    Register for Program
                  </Button>
                </CardFooter>
              </Card>

              <div className="bg-white rounded-lg shadow-md p-6 mt-6">
                <h3 className="text-lg font-bold text-primary mb-3">
                  Need Help?
                </h3>
                <p className="text-gray-600 mb-4">
                  If you have questions about this program, please contact us:
                </p>
                <div className="text-gray-700">
                  <p>Email: info@masjidalezz.org</p>
                  <p>Phone: (555) 123-4567</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
