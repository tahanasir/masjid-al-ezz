import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

export function Contact() {
  const { toast } = useToast();
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "General Inquiry",
    message: "",
  });

  const contactMutation = useMutation({
    mutationFn: async (contactData: any) => {
      const response = await apiRequest("POST", "/api/contact", contactData);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Message Sent",
        description:
          "Thank you for your message. We will get back to you soon.",
      });
      setContactForm({
        name: "",
        email: "",
        subject: "General Inquiry",
        message: "",
      });
    },
    onError: (error) => {
      toast({
        title: "Message Failed",
        description:
          error.message || "There was an error sending your message.",
        variant: "destructive",
      });
    },
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setContactForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (value: string) => {
    setContactForm((prev) => ({
      ...prev,
      subject: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      toast({
        title: "Missing Information",
        description: "Please fill out all required fields.",
        variant: "destructive",
      });
      return;
    }

    contactMutation.mutate(contactForm);
  };

  return (
    <section
      id="contact"
      className="py-16 bg-muted"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231a6348' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }}
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-serif text-primary mb-2">
            Contact Us
          </h2>
          <div className="w-24 h-1 bg-secondary mx-auto mb-6"></div>
          <p className="max-w-xl mx-auto text-gray-600">
            Have questions or need assistance? Get in touch with us.
          </p>
        </div>

        <Card className="overflow-hidden max-w-5xl mx-auto shadow-xl">
          <div className="grid md:grid-cols-2">
            <CardContent className="p-8">
              <h3 className="text-xl font-bold text-primary mb-6">
                Send Us a Message
              </h3>

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <Label
                    htmlFor="name"
                    className="text-gray-600 text-sm font-semibold"
                  >
                    Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={contactForm.name}
                    onChange={handleInputChange}
                    type="text"
                    placeholder="Your name"
                  />
                </div>

                <div className="mb-4">
                  <Label
                    htmlFor="email"
                    className="text-gray-600 text-sm font-semibold"
                  >
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    value={contactForm.email}
                    onChange={handleInputChange}
                    type="email"
                    placeholder="Your email"
                  />
                </div>

                <div className="mb-4">
                  <Label
                    htmlFor="subject"
                    className="text-gray-600 text-sm font-semibold"
                  >
                    Subject
                  </Label>
                  <Select
                    value={contactForm.subject}
                    onValueChange={handleSelectChange}
                  >
                    <SelectTrigger id="subject">
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="General Inquiry">
                        General Inquiry
                      </SelectItem>
                      <SelectItem value="Prayer Times">Prayer Times</SelectItem>
                      <SelectItem value="Programs & Events">
                        Programs & Events
                      </SelectItem>
                      <SelectItem value="Donations">Donations</SelectItem>
                      <SelectItem value="Volunteer Opportunities">
                        Volunteer Opportunities
                      </SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="mb-6">
                  <Label
                    htmlFor="message"
                    className="text-gray-600 text-sm font-semibold"
                  >
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={contactForm.message}
                    onChange={handleInputChange}
                    placeholder="Your message"
                    className="h-32"
                  />
                </div>

                <Button
                  type="submit"
                  className="bg-primary hover:bg-primary/80 text-white font-bold"
                  disabled={contactMutation.isPending}
                >
                  {contactMutation.isPending ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </CardContent>

            <div className="bg-muted p-8">
              <h3 className="text-xl font-bold text-primary mb-6">
                Contact Information
              </h3>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="text-secondary text-xl mr-4 mt-1">
                    <MapPin />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary">Address</h4>
                    <p className="text-gray-600">
                      10 Falconer Dr., Unit 8<br />
                      Mississauga, ON L5N 3L8, Canada
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="text-secondary text-xl mr-4 mt-1">
                    <Phone />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary">Phone</h4>
                    <p className="text-gray-600">(805) 543-3990</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="text-secondary text-xl mr-4 mt-1">
                    <Mail />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary">Email</h4>
                    <p className="text-gray-600">info@masjidalezz.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="text-secondary text-xl mr-4 mt-1">
                    <Clock />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary">Office Hours</h4>
                    <p className="text-gray-600">
                      Monday - Friday: 10:00 AM - 4:00 PM
                      <br />
                      Saturday - Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="font-bold text-primary mb-4">Follow Us</h4>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="bg-primary hover:bg-primary/80 text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                  >
                    <FaFacebookF />
                  </a>
                  <a
                    href="#"
                    className="bg-primary hover:bg-primary/80 text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                  >
                    <FaTwitter />
                  </a>
                  <a
                    href="#"
                    className="bg-primary hover:bg-primary/80 text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                  >
                    <FaInstagram />
                  </a>
                  <a
                    href="#"
                    className="bg-primary hover:bg-primary/80 text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                  >
                    <FaYoutube />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <div className="mt-12">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden h-96">
            {/* Google Maps iframe would go here in a real implementation */}
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <div className="text-center p-6">
                <MapPin className="h-16 w-16 text-primary mx-auto mb-4" />
                <p className="text-gray-600">Map loading...</p>
                <p className="text-xs text-gray-600 mt-2">
                  10 Falconer Dr., Unit 8, Mississauga, ON L5N 3L8, Canada
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
