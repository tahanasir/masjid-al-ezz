import { Button } from "@/components/ui/button";
import { Calendar, Mail, MapPin, Phone, ChevronLeft, Home } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { Link } from "wouter";

// Import the masjid logo
import logo from "@assets/masjid-AlEzz-color-h.png";

// Imam data
const imams = [
  {
    id: 1,
    name: "Imam Abdullah Khan",
    role: "Head Imam",
    bio: "Imam Abdullah Khan has been serving the Muslim community for over 15 years. He completed his Islamic studies in Saudi Arabia and has a master's degree in Islamic Theology from Al-Azhar University.",
    specialties: [
      "Quranic Recitation",
      "Islamic Jurisprudence",
      "Youth Counseling",
    ],
    image:
      "https://images.unsplash.com/photo-1541855492-581f618f69a0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "Shaykh Muhammad Ali",
    role: "Associate Imam",
    bio: "Shaykh Muhammad Ali joined Masjid Al-Ezz in 2023. He specializes in contemporary fiqh issues and has a background in psychology, allowing him to provide valuable counseling to the community.",
    specialties: [
      "Contemporary Fiqh",
      "Marriage Counseling",
      "Interfaith Dialogue",
    ],
    image:
      "https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
];

export default function About() {
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
              <span>About</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
              About Masjid Al-Ezz
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto opacity-90">
              Peel Muslim Community Center - Building bridges and strengthening
              our community through faith, education, and service.
            </p>
          </div>
        </section>

        {/* Page Navigation Menu */}
        <section className="py-8 bg-white border-b border-gray-100">
          <div className="container mx-auto px-6">
            <nav className="flex flex-wrap justify-center gap-2 md:gap-4">
              <a
                href="#mission-vision"
                className="px-4 py-2 text-primary hover:bg-primary/5 rounded-full transition-colors font-medium text-sm"
              >
                Mission & Vision
              </a>
              <a
                href="#core-values"
                className="px-4 py-2 text-primary hover:bg-primary/5 rounded-full transition-colors font-medium text-sm"
              >
                Core Values
              </a>
              <a
                href="#imams"
                className="px-4 py-2 text-primary hover:bg-primary/5 rounded-full transition-colors font-medium text-sm"
              >
                Our Imams
              </a>
              <a
                href="#location"
                className="px-4 py-2 text-primary hover:bg-primary/5 rounded-full transition-colors font-medium text-sm"
              >
                Location & Contact
              </a>
            </nav>
          </div>
        </section>

        {/* Mission & Vision */}
        <section id="mission-vision" className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row gap-12 items-center">
              <div className="lg:w-1/2">
                <div className="relative">
                  <img
                    src={logo}
                    alt="Masjid Al-Ezz Logo"
                    className="w-full max-w-md mx-auto"
                  />
                  <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg w-36 h-36 hidden lg:flex items-center justify-center">
                    <div className="text-center">
                      <span className="block text-primary font-bold text-lg">
                        Established
                      </span>
                      <span className="block text-amber-400 text-3xl font-serif">
                        2025
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:w-1/2">
                <div className="bg-primary/5 p-8 rounded-xl shadow-sm">
                  <h2 className="text-3xl font-serif text-primary mb-6">
                    Our Mission
                  </h2>
                  <p className="text-gray-700 mb-8 leading-relaxed">
                    At Masjid Al-Ezz, we are dedicated to serving the spiritual,
                    educational, and social needs of Muslims in Mississauga
                    while fostering a better understanding of Islam among our
                    neighbors of other faiths. Our mission is to provide a
                    welcoming space for worship, learning, and community
                    building based on the teachings of the Quran and Sunnah.
                  </p>

                  <h2 className="text-3xl font-serif text-primary mb-6">
                    Our Vision
                  </h2>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    Opened in 2025, Masjid Al-Ezz is dedicated to creating a
                    vibrant Muslim community that contributes positively to
                    Canadian society while preserving Islamic values and
                    traditions.
                  </p>

                  <ul className="list-disc pl-5 text-gray-700 mb-6 space-y-4">
                    <li>
                      <span className="font-semibold text-primary">
                        Raising Leaders:
                      </span>
                      <p className="mt-1">
                        Nurturing strong Islamic identities and producing future
                        Muslim leaders who are grounded in their faith and ready
                        to contribute to society.
                      </p>
                    </li>
                    <li>
                      <span className="font-semibold text-primary">
                        More Than Prayers:
                      </span>
                      <p className="mt-1">
                        Creating a space that goes beyond daily prayers and
                        spiritual growth, becoming a center for unity projects
                        and collaboration among skilled professionals.
                      </p>
                    </li>
                    <li>
                      <span className="font-semibold text-primary">
                        Empowering Muslims:
                      </span>
                      <p className="mt-1">
                        Promoting political and financial literacy to help
                        Muslims thrive, not just survive, in contemporary
                        society.
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section id="core-values" className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-serif text-primary mb-3">
                Our Core Values
              </h2>
              <div className="w-24 h-1 bg-amber-400 mx-auto mb-6"></div>
              <p className="max-w-2xl mx-auto text-gray-600">
                These values guide our work and interactions as we strive to
                build a community that embodies the best of Islamic teachings.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="bg-primary/10 h-16 w-16 rounded-full flex items-center justify-center mb-6 mx-auto text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-center mb-3 text-primary">
                  Excellence
                </h3>
                <p className="text-gray-600 text-center">
                  Striving for excellence in all we do, from worship to
                  community service.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="bg-primary/10 h-16 w-16 rounded-full flex items-center justify-center mb-6 mx-auto text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-center mb-3 text-primary">
                  Inclusivity
                </h3>
                <p className="text-gray-600 text-center">
                  Welcoming all Muslims regardless of background, ethnicity, or
                  school of thought.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="bg-primary/10 h-16 w-16 rounded-full flex items-center justify-center mb-6 mx-auto text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-center mb-3 text-primary">
                  Compassion
                </h3>
                <p className="text-gray-600 text-center">
                  Showing care and empathy for all members of our community and
                  beyond.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="bg-primary/10 h-16 w-16 rounded-full flex items-center justify-center mb-6 mx-auto text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-center mb-3 text-primary">
                  Education
                </h3>
                <p className="text-gray-600 text-center">
                  Commitment to lifelong learning and sharing knowledge with
                  others.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Imams */}
        <section id="imams" className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-serif text-primary mb-3">
                Meet Our Imams
              </h2>
              <div className="w-24 h-1 bg-amber-400 mx-auto mb-6"></div>
              <p className="max-w-2xl mx-auto text-gray-600">
                Our dedicated religious leaders provide spiritual guidance,
                education, and support to our community.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {imams.map((imam) => (
                <div
                  key={imam.id}
                  className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100"
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3">
                      <img
                        src={imam.image}
                        alt={imam.name}
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                    <div className="md:w-2/3 p-6">
                      <div className="mb-4">
                        <h3 className="text-xl font-bold text-primary">
                          {imam.name}
                        </h3>
                        <p className="text-amber-400 font-medium">
                          {imam.role}
                        </p>
                      </div>
                      <p className="text-gray-600 mb-4">{imam.bio}</p>
                      <div>
                        <h4 className="font-semibold text-primary mb-2">
                          Specialties:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {imam.specialties.map((specialty, index) => (
                            <span
                              key={index}
                              className="bg-primary/10 text-primary text-sm px-3 py-1 rounded-full"
                            >
                              {specialty}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
