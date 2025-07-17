import { Link } from "wouter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";
import { FaPaperPlane } from "react-icons/fa";
import logo from "@/assets/logo.png";

export function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="container mx-auto px-6 pt-12 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center mb-4">
              <img
                src={logo}
                alt="Masjid Al-Ezz Logo"
                className="h-10 mr-3 bg-white p-1 rounded"
              />
              <span className="font-serif text-xl">Masjid Al-Ezz</span>
            </div>
            <p className="text-white/80 mb-4">
              Peel Muslim Community Center dedicated to serving the spiritual,
              educational, and social needs of Muslims in our community.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/masjidalezz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-amber-300 transition-colors"
                aria-label="Facebook"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://www.instagram.com/masjidalezz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-amber-300 transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
              <a
                href="https://www.youtube.com/@Masjidalezz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-amber-300 transition-colors"
                aria-label="YouTube"
              >
                <FaYoutube />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-serif text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/programs"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Programs
                </Link>
              </li>
              <li>
                <Link
                  href="/calendar"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Calendar
                </Link>
              </li>
              <li>
                <Link
                  href="/donate"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Donate
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg mb-4">Contact Information</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FaMapMarkerAlt className="mt-1 mr-3 text-white" />
                <span className="text-white/80">
                  10 Falconer Dr., Unit 8<br />
                  Mississauga, ON L5N 3L8
                </span>
              </li>
              <li className="flex items-center">
                <FaPhoneAlt className="mr-3 text-white" />
                <span className="text-white/80">(905) 812-8786</span>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="mr-3 text-white" />
                <span className="text-white/80">info@masjidalezz.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg mb-4">Subscribe to Newsletter</h4>
            <p className="text-white/80 mb-4">
              Receive updates on prayer times, events, and community news.
            </p>
            <form className="flex">
              <Input
                type="email"
                placeholder="Your email"
                className="rounded-r-none focus-visible:ring-0 focus-visible:ring-offset-0 border-0"
              />
              <Button
                type="submit"
                className="bg-white text-primary hover:bg-white/90 rounded-l-none"
              >
                <FaPaperPlane />
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/20 pt-6 mt-8 text-center">
          <p className="text-white/80 text-sm">
            &copy; {new Date().getFullYear()} Masjid Al-Ezz - Peel Muslim
            Community Center. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
