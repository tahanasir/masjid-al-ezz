import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Programs } from "@/components/home/Programs";
import { Donate } from "@/components/home/Donate";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { MasjidBoxWidget } from "@/components/home/MasjidBoxWidget";
import { InstagramEvents } from "@/components/home/InstagramEvents";
import { FeaturedEvent } from "@/components/home/FeaturedEvent";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex flex-col items-center w-full">
        {/* Hero Section */}
        <section className="w-full bg-primary min-h-[80vh] flex items-center pt-8 pb-12 md:pt-12 md:pb-16"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        >
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row lg:gap-12 xl:gap-16 items-center justify-center">
              {/* Left Column - Welcome and Prayer Times */}
              <div className="w-full lg:w-5/12 space-y-8">
                {/* Welcome Section */}
                <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20">
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 font-serif text-center lg:text-left">
                    Welcome to Masjid Al-Ezz!
                  </h1>
                  <div className="text-white/90 space-y-6 text-lg text-center lg:text-left">
                    <p>
                      <span className="font-bold text-amber-300 text-xl">
                        Masjid Al-Ezz has opened, Alhamdulillah
                      </span>
                      <br />
                      Your generous support turned a vision into reality.
                    </p>
                  </div>
                </div>

                {/* Prayer Times */}
                <div className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden border border-white/20">
                  <div className="p-4">
                    <MasjidBoxWidget />
                  </div>
                </div>
              </div>

              {/* Right Column - Featured Event */}
              <div className="w-full lg:w-5/12">
                <FeaturedEvent />
              </div>
            </div>
          </div>
        </section>

        {/* Events Section */}
        <section id="events" className="w-full py-20 bg-gradient-to-b from-primary/5 to-white">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold font-serif text-primary mb-4">
                Our Events
              </h2>
              <div className="w-24 h-1 bg-amber-400 mx-auto mb-6"></div>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                Stay connected with our community through our latest events and programs.
                <br />
                Follow us on Instagram for more updates.
              </p>
            </div>

            <div className="flex justify-center">
              <InstagramEvents />
            </div>
          </div>
        </section>

        {/* Programs Section */}
        <section id="programs" className="w-full py-20 bg-gradient-to-b from-white to-primary/5">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold font-serif text-primary mb-4">
                Weekly Programs
              </h2>
              <div className="w-24 h-1 bg-amber-400 mx-auto mb-6"></div>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg mb-8">
                Enrich your spiritual journey and build meaningful connections
                with our weekly programs.
              </p>
            </div>

            <div className="flex justify-center">
              <Programs limit={6} shuffle />
            </div>

            <div className="mt-16 text-center">
              <Link to="/programs">
                <Button className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 py-3 h-14 text-lg shadow-lg transform transition-transform hover:scale-105">
                  View All Programs <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
        <Donate />
      </main>
      <Footer />
    </div>
  );
}
