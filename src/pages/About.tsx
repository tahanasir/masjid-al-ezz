import { GraduationCap, Home, ShieldPlus, Sun, Users } from "lucide-react";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { Link } from "wouter";

// Import the masjid logo
import logo from "@assets/logo.png";
import sheikhRasool from "@/assets/sheikh_rasool.jpg";
import sheikhUsta from "@/assets/sheikh_usta.jpg";

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
              More Than a Masjid: A Vision for the Ummah
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section id="mission-vision" className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row gap-12 items-center">
              <div className="lg:w-1/2">
                <div className="bg-primary/5 p-8 rounded-xl shadow-sm">
                  <h2 className="text-3xl font-serif text-primary mb-6">
                    Our Mission
                  </h2>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    Masjid Al-Ezz was founded with the aim of being more than
                    just a place of prayer. Our goal is to support and
                    strengthen our community through programs that helps in the
                    development of all members of the Muslim family.
                  </p>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    Since 2020, the founding members of the Peel Muslim
                    Community Centre have been working to inspire and support
                    individuals in sharing the message of Islam. We envision a
                    community where the values of the deen are embraced and
                    lived.
                  </p>
                </div>
              </div>

              <div className="lg:w-1/2">
                <div className="relative">
                  <img
                    src={logo}
                    alt="Masjid Al-Ezz Logo"
                    className="w-full max-w-md mx-auto"
                  />
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
                Our Goals
              </h2>
              <div className="w-24 h-1 bg-amber-400 mx-auto mb-6"></div>
              <p className="max-w-2xl mx-auto text-gray-600">
                These goals drive our initiatives and efforts as we strive to
                build a community that embodies the best of Islamic teachings.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="bg-primary/10 h-16 w-16 rounded-full flex items-center justify-center mb-6 mx-auto text-primary">
                  <GraduationCap />
                </div>
                <h3 className="text-xl font-bold text-center mb-3 text-primary">
                  Islamic Education
                </h3>
                <p className="text-gray-600 text-center">
                  Teach Islam as a complete way of life, rooted in tradition.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="bg-primary/10 h-16 w-16 rounded-full flex items-center justify-center mb-6 mx-auto text-primary">
                  <Users />
                </div>
                <h3 className="text-xl font-bold text-center mb-3 text-primary">
                  Education & Development
                </h3>
                <p className="text-gray-600 text-center">
                  Provide programs for all ages to support personal and
                  spiritual growth.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="bg-primary/10 h-16 w-16 rounded-full flex items-center justify-center mb-6 mx-auto text-primary">
                  <Sun />
                </div>
                <h3 className="text-xl font-bold text-center mb-3 text-primary">
                  Beacon of Dawah
                </h3>
                <p className="text-gray-600 text-center">
                  Establish the masjid as a leading center for Dawah
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="bg-primary/10 h-16 w-16 rounded-full flex items-center justify-center mb-6 mx-auto text-primary">
                  <ShieldPlus />
                </div>
                <h3 className="text-xl font-bold text-center mb-3 text-primary">
                  Strong Muslim Identity
                </h3>
                <p className="text-gray-600 text-center">
                  Nurture a generation of strong, confident Muslims.
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
                Meet Our Shuyukh
              </h2>
              <div className="w-24 h-1 bg-amber-400 mx-auto mb-6"></div>
              <p className="max-w-2xl mx-auto text-gray-600">
                Our esteemed leaders and scholars who guide and serve our
                community.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 h-80">
                <div className="flex flex-col h-full md:flex-row">
                  <div className="md:w-1/3">
                    <img
                      src={sheikhUsta}
                      alt="Sheikh Mehmet Usta"
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  <div className="md:w-2/3 p-6">
                    <h3 className="text-xl font-bold text-primary mb-4">
                      Sheikh Mehmet Usta
                    </h3>
                    <p className="text-gray-600">
                      Sheikh Usta has been a pillar of the Muslim communities in
                      the US and Canada for over 20 years. With a Bachelor's in
                      Islamic Studies from Mishkah University, a Master's in
                      Business Administration, and currently pursuing a master's
                      in Islamic Studies, Sheikh Mehmet combines deep Islamic
                      knowledge with top-tier business and corporate acumen.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 h-80">
                <div className="flex flex-col h-full md:flex-row">
                  <div className="md:w-2/3 p-6 text-right">
                    <h3 className="text-xl font-bold text-primary mb-4">
                      Sheikh Abdulaziz Rasoul
                    </h3>
                    <p className="text-gray-600">
                      Sheikh Abdulaziz Rasoul, former principal of ISNA High
                      School (2010-2024), has been a leader in Islamic education
                      and community engagement since 2005.
                      <br />
                      <br />
                      He holds a degree in Electrical Engineering from Toronto
                      Metropolitan University, a Bachelor of Education from the
                      University of Toronto, and a Master's in Education from
                      Brock University. He's also completing a Bachelor's in
                      Islamic Studies from Mishkah University.
                    </p>
                  </div>
                  <div className="md:w-1/3">
                    <img
                      src={sheikhRasool}
                      alt="Sheikh Abdulaziz Rasoul"
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
