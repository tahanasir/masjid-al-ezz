import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import {
  ChevronLeft,
  Home,
  MapPin,
  Phone,
  Mail,
  Clock,
  Calendar,
  User,
  MessageSquare,
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { apiRequest } from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// Form validation schema
const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().optional(),
  subject: z
    .string()
    .min(3, { message: "Subject must be at least 3 characters" }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters" }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function Contact() {
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Initialize form
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  // API mutation for submitting form
  const mutation = useMutation({
    mutationFn: async (data: ContactFormValues) => {
      return await apiRequest<any>("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: "Message Sent!",
        description:
          "We have received your message and will get back to you soon.",
        variant: "default",
      });
      setFormSubmitted(true);
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description:
          "There was a problem sending your message. Please try again.",
        variant: "destructive",
      });
      console.error(error);
    },
  });

  // Submit handler
  const onSubmit = (data: ContactFormValues) => {
    mutation.mutate(data);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Back to Home button - visible on mobile and tablets */}
        <div className="container mx-auto px-6 pt-4 md:pt-6 lg:hidden">
          <Link href="/">
            <Button
              variant="outline"
              className="border-primary text-primary hover:bg-primary/5 flex items-center rounded-full"
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary to-primary/80 text-white py-16 md:py-24">
          <div className="container mx-auto px-6 text-center">
            {/* Desktop navigation breadcrumb - hidden on mobile */}
            <div className="hidden lg:flex items-center justify-center mb-6 text-white/80">
              <Link href="/" className="hover:text-white flex items-center">
                <Home className="h-4 w-4 mr-1" />
                Home
              </Link>
              <span className="mx-2">›</span>
              <span>Contact</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
              Contact Masjid Al-Ezz
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto opacity-90">
              Get in touch with us for inquiries, feedback, or to learn more
              about our community.
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                {/* Contact Information */}
                <div className="lg:col-span-2">
                  <div className="bg-gray-50 p-8 rounded-lg shadow-sm h-full">
                    <h2 className="text-2xl font-serif text-primary mb-6">
                      Contact Information
                    </h2>

                    <div className="space-y-8">
                      <div className="flex items-start">
                        <div className="bg-primary/10 h-12 w-12 rounded-full flex items-center justify-center mr-4 text-primary flex-shrink-0">
                          <MapPin className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-800 mb-1">
                            Address
                          </h3>
                          <p className="text-gray-600 mb-1">
                            10 Falconer Dr., Unit 8
                          </p>
                          <p className="text-gray-600">
                            Mississauga, ON L5N 3L8
                          </p>
                          <p className="text-gray-600">Canada</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="bg-primary/10 h-12 w-12 rounded-full flex items-center justify-center mr-4 text-primary flex-shrink-0">
                          <Phone className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-800 mb-1">
                            Phone
                          </h3>
                          <p className="text-gray-600">(905) 555-1234</p>
                          <p className="text-sm text-gray-500 mt-1">
                            Office hours: 10 AM - 6 PM
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="bg-primary/10 h-12 w-12 rounded-full flex items-center justify-center mr-4 text-primary flex-shrink-0">
                          <Mail className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-800 mb-1">
                            Email
                          </h3>
                          <p className="text-gray-600">info@masjidalezz.ca</p>
                          <p className="text-gray-600 mt-1">
                            imam@masjidalezz.ca
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-10 border-t border-gray-200 pt-6">
                      <h3 className="font-bold text-gray-800 mb-3">
                        Key Contacts
                      </h3>

                      <div className="space-y-4">
                        <div className="flex items-center">
                          <div className="bg-amber-400/20 h-10 w-10 rounded-full flex items-center justify-center mr-3 text-amber-700 flex-shrink-0">
                            <User className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">
                              Imam Mohammed Abdullah
                            </p>
                            <p className="text-sm text-gray-500">
                              imam@masjidalezz.ca
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center">
                          <div className="bg-amber-400/20 h-10 w-10 rounded-full flex items-center justify-center mr-3 text-amber-700 flex-shrink-0">
                            <Calendar className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">
                              Events Coordinator
                            </p>
                            <p className="text-sm text-gray-500">
                              events@masjidalezz.ca
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Form */}
                <div className="lg:col-span-3">
                  <div className="bg-white p-8 rounded-lg shadow-sm border">
                    <h2 className="text-2xl font-serif text-primary mb-2">
                      Send us a Message
                    </h2>
                    <p className="text-gray-600 mb-6">
                      Fill out the form below and we'll get back to you as soon
                      as possible.
                    </p>

                    {formSubmitted ? (
                      <div className="bg-green-50 p-6 rounded-lg border border-green-100 text-center">
                        <div className="text-green-600 mb-2 flex justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-12 w-12"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                        <h3 className="text-xl font-bold text-green-800 mb-2">
                          Thank You!
                        </h3>
                        <p className="text-green-700">
                          Your message has been received. We'll get back to you
                          soon.
                        </p>
                        <Button
                          className="mt-4 bg-primary hover:bg-primary/90"
                          onClick={() => setFormSubmitted(false)}
                        >
                          Send Another Message
                        </Button>
                      </div>
                    ) : (
                      <Form {...form}>
                        <form
                          onSubmit={form.handleSubmit(onSubmit)}
                          className="space-y-6"
                        >
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                              control={form.control}
                              name="name"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Name</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Your Name" {...field} />
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
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                              control={form.control}
                              name="phone"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Phone (Optional)</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="(123) 456-7890"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="subject"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Subject</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="How can we help you?"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Message</FormLabel>
                                <FormControl>
                                  <Textarea
                                    placeholder="Please provide details about your inquiry..."
                                    className="min-h-[150px]"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <div className="flex justify-end">
                            <Button
                              type="submit"
                              className="bg-primary hover:bg-primary/90 w-full md:w-auto px-8"
                              disabled={mutation.isPending}
                            >
                              {mutation.isPending ? (
                                <div className="flex items-center">
                                  <svg
                                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                  >
                                    <circle
                                      className="opacity-25"
                                      cx="12"
                                      cy="12"
                                      r="10"
                                      stroke="currentColor"
                                      strokeWidth="4"
                                    ></circle>
                                    <path
                                      className="opacity-75"
                                      fill="currentColor"
                                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                  </svg>
                                  Sending...
                                </div>
                              ) : (
                                <div className="flex items-center">
                                  <MessageSquare className="mr-2 h-4 w-4" />{" "}
                                  Send Message
                                </div>
                              )}
                            </Button>
                          </div>
                        </form>
                      </Form>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl font-serif text-primary mb-6 text-center">
                Find Us
              </h2>
              <div className="rounded-lg overflow-hidden shadow-md">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2887.2635273475147!2d-79.7563!3d43.6372!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b41a05cba7d61%3A0xb8abc21b3e54a366!2s10%20Falconer%20Dr%20Unit%208%2C%20Mississauga%2C%20ON%20L5N%203L8%2C%20Canada!5e0!3m2!1sen!2sus!4v1654862911071!5m2!1sen!2sus"
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Masjid Al-Ezz Location"
                ></iframe>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
