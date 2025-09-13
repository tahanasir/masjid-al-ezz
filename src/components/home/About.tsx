import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BookOpen, HandHelping, HeartHandshake, Handshake } from "lucide-react";

export function About() {
  return (
    <section id="about" className="py-16 bg-muted">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-serif text-primary mb-2">
            About Masjid Al-Ezz
          </h2>
          <div className="w-24 h-1 bg-secondary mx-auto mb-6"></div>
          <p className="max-w-xl mx-auto text-gray-600">
            Learn about our history, mission, and vision for serving the Muslim
            community in Mississauga, Ontario.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="lg:w-1/2">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1564996841506-b5127290e10d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Masjid Al-Ezz"
                className="rounded-lg shadow-lg w-full"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg w-36 h-36 flex items-center justify-center">
                <div className="text-center">
                  <span className="block text-primary font-bold text-lg">
                    Established
                  </span>
                  <span className="block text-secondary text-3xl font-serif">
                    2025
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2">
            <h3 className="text-2xl font-serif text-primary mb-4">
              Our Vision
            </h3>
            <p className="text-gray-600 mb-6">
              Opened in 2025, Masjid Al-Ezz is dedicated to:
            </p>
            <ul className="list-disc pl-5 text-gray-600 mb-6 space-y-2">
              <li>
                <span className="font-semibold">Raising Leaders:</span>{" "}
                Nurturing strong Islamic identities and producing future Muslim
                leaders.
              </li>
              <li>
                <span className="font-semibold">More Than Prayers:</span> Not
                just for daily prayers and spiritual growth, but a center for
                unity projects and collaboration among skilled professionals.
              </li>
              <li>
                <span className="font-semibold">Empowering Muslims:</span>{" "}
                Promoting political and financial literacy to help Muslims
                thrive, not just survive.
              </li>
            </ul>

            <h3 className="text-2xl font-serif text-primary mb-4">
              Our Mission
            </h3>
            <p className="text-gray-600 mb-6">
              We are dedicated to serving the spiritual, educational, and social
              needs of Muslims in Mississauga while fostering a better
              understanding of Islam among our neighbors of other faiths.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white p-5 rounded-lg shadow-md">
                <div className="text-secondary text-2xl mb-2">
                  <BookOpen />
                </div>
                <h4 className="font-bold text-primary mb-2">Education</h4>
                <p className="text-sm text-gray-600">
                  Providing Islamic education for all age groups, from children
                  to adults.
                </p>
              </div>

              <div className="bg-white p-5 rounded-lg shadow-md">
                <div className="text-secondary text-2xl mb-2">
                  <HandHelping />
                </div>
                <h4 className="font-bold text-primary mb-2">Community</h4>
                <p className="text-sm text-gray-600">
                  Building a strong, supportive community based on Islamic
                  values.
                </p>
              </div>

              <div className="bg-white p-5 rounded-lg shadow-md">
                <div className="text-secondary text-2xl mb-2">
                  <HeartHandshake />
                </div>
                <h4 className="font-bold text-primary mb-2">Worship</h4>
                <p className="text-sm text-gray-600">
                  Providing a peaceful space for daily prayers and spiritual
                  growth.
                </p>
              </div>

              <div className="bg-white p-5 rounded-lg shadow-md">
                <div className="text-secondary text-2xl mb-2">
                  <Handshake />
                </div>
                <h4 className="font-bold text-primary mb-2">Outreach</h4>
                <p className="text-sm text-gray-600">
                  Engaging with the broader community to promote understanding
                  and cooperation.
                </p>
              </div>
            </div>

            <Link href="/about">
              <Button className="bg-primary hover:bg-primary/80 text-white rounded-full">
                Learn More About Us
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
