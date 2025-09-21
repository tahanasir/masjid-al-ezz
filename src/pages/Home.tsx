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
      <main>
        <section
          className="relative min-h-screen bg-primary"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        >
          {/* Content */}
          <div className="container mx-auto px-4 relative z-10 pt-12 pb-12">
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              {/* Left Column - Welcome and Prayer Times */}
              <div className="w-full lg:w-1/2 space-y-8">
                {/* Welcome Section */}
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 font-serif">
                    Welcome to Masjid Al-Ezz!
                  </h1>
                  <div className="text-white/90 space-y-4">
                    <p className="text-lg">
                      <span className="font-bold text-amber-300">
                        Masjid Al-Ezz has opened, Alhamdulillah
                      </span>
                      <br />
                      Your generous support turned a vision into reality.
                    </p>
                  </div>
                </div>

                {/* Prayer Times */}
                <div className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden border border-white/20">
                  <div className="bg-primary/90 py-3 px-4">
                    <h2 className="text-lg font-serif text-white font-semibold">
                      Today's Prayer Times
                    </h2>
                  </div>
                  <div className="p-4">
                    <MasjidBoxWidget />
                  </div>
                </div>
              </div>

              {/* Right Column - Featured Event */}
              <div className="w-full lg:w-1/2">
                <FeaturedEvent />
              </div>
            </div>
          </div>
        </section>

        <section
          id="events"
          className="pt-20 bg-gradient-to-b from-primary/5 to-white"
        >
          <div className="container mx-auto px-6">
            <div className="mb-8">
              <h2 className="text-4xl font-bold font-serif text-primary mb-4">
                Our Events
              </h2>
              <div className="w-24 h-1 bg-amber-400 mb-6"></div>
              <p className="text-gray-600 max-w-2xl">
                Stay connected with our community through our latest events and
                programs. <br />
                Follow us on Instagram for more updates.
              </p>
            </div>

            <InstagramEvents />
          </div>
        </section>

        <section
          id="programs"
          className="py-20 bg-gradient-to-b from-white to-primary/5"
        >
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row items-center justify-between mb-8">
              <div className="lg:w-1/2 lg:text-left mb-8 lg:mb-0">
                <h2 className="text-4xl font-bold font-serif text-primary mb-4">
                  Weekly Programs
                </h2>
                <div className="w-24 h-1 bg-amber-400 lg:mx-0 mb-6"></div>
                <p className="text-gray-600 max-w-xl lg:pr-10">
                  Enrich your spiritual journey and build meaningful connections
                  with our weekly programs.
                </p>
              </div>
            </div>

            <Programs limit={6} shuffle />

            <div className="mt-16 text-center">
              <Link href="/programs">
                <Button className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 py-2 h-12 text-base shadow-lg">
                  View All Programs <ArrowRight className="ml-2 h-4 w-4" />
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
