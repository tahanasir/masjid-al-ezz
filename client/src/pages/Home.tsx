import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MasjidBoxWidget } from "@/components/home/MasjidBoxWidget";
import { Programs } from "@/components/home/Programs";
import { Donate } from "@/components/home/Donate";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main>
        <section className="relative">
          {/* Background with overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center z-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://images.unsplash.com/photo-1584721284279-d48cf738a3c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70"></div>
          </div>

          {/* Content */}
          <div className="container mx-auto px-4 relative z-10 pt-6 pb-6">
            {/* Hero Content - Centered */}
            <div className="text-center py-4 lg:py-8 mb-6">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 md:mb-4 font-serif">
                Welcome to
                <br />
                Masjid Al-Ezz
              </h1>
              <h2 className="text-xl font-serif mb-3 md:mb-6 text-amber-300 font-semibold">
                Peel Muslim Community Center
              </h2>
              <div className="max-w-md mx-auto">
                <p className="text-white text-base md:text-lg mb-4 md:mb-6">
                  <span className="font-bold text-amber-300">
                    Masjid AlEzz has opened, Alhamdulillah!
                  </span>{" "}
                  Your generous support turned a vision into reality. Join us in
                  building our community.
                </p>
              </div>
            </div>

            {/* Prayer Times - Full Width */}
            <div className="max-w-4xl mx-auto">
              <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden h-full">
                <div className="bg-primary py-2 px-3 text-center">
                  <h2 className="text-base md:text-lg font-serif text-white font-semibold">
                    Today's Prayer Times
                  </h2>
                </div>
                <div className="p-2 md:p-3">
                  <MasjidBoxWidget />
                </div>
              </div>
            </div>
          </div>
        </section>

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
                  Enrich your spiritual journey and build meaningful
                  connections. Our regular programs are designed to nurture
                  faith, education, and community bonds for all ages.
                </p>
              </div>
            </div>

            <Programs />

            <div className="mt-16 text-center">
              <a href="/programs">
                <Button className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 py-2 h-12 text-base shadow-lg">
                  View All Programs <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </div>
          </div>
        </section>
        <Donate />
      </main>
      <Footer />
    </div>
  );
}
