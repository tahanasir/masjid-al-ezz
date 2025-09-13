import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronLeft, Home, MapPin, Phone, Mail } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
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
            <div className="max-w-4xl mx-auto">
              <div className="bg-gray-50 p-8 rounded-lg shadow-sm">
                <h2 className="text-2xl font-serif text-primary mb-6 text-center">
                  Contact Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="bg-primary/10 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <h3 className="font-bold text-gray-800 mb-2">Address</h3>
                    <a
                      href="https://maps.app.goo.gl/ybXXUJPneiZbreGG8"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <p>10 Falconer Dr., Unit 8, Mississauga, ON L5N 3L8</p>
                    </a>
                  </div>

                  <div className="text-center">
                    <div className="bg-primary/10 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                      <Phone className="h-6 w-6" />
                    </div>
                    <h3 className="font-bold text-gray-800 mb-2">Phone</h3>
                    <p>
                      <a href="tel:+16478933049">(647) 893-3049</a>
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="bg-primary/10 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                      <Mail className="h-6 w-6" />
                    </div>
                    <h3 className="font-bold text-gray-800 mb-2">Email</h3>
                    <p>
                      <a href="mailto:info@masjidalezz.com">
                        info@masjidalezz.com
                      </a>
                    </p>
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
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1826.7358356675502!2d-79.7261052!3d43.5926609!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b41c148b3ae11%3A0xf38028f30b005519!2sMasjid%20Al-Ezz!5e1!3m2!1sen!2sca!4v1754365890061!5m2!1sen!2sca"
                  width="100%"
                  height="450"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Masjid Al-Ezz"
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
