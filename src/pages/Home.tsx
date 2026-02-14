import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Programs } from "@/components/home/Programs";
import { Donate } from "@/components/home/Donate";
import { Button } from "@/components/ui/button";
import { ArrowRight, Instagram, Video } from "lucide-react";
import { Link } from "react-router-dom";
import { MasjidBoxWidget } from "@/components/home/MasjidBoxWidget";
import { InstagramEvents } from "@/components/home/InstagramEvents";
import { VideoReels } from "@/components/home/VideoReels";
import { FeaturedEvent } from "@/components/home/FeaturedEvent";
import Gallery from "@/components/home/Gallery";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { Ramadan } from "@/components/home/Ramadan";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex flex-col items-center w-full">
        {/* Hero Section */}
        <section className="w-full bg-primary flex flex-col lg:overflow-hidden min-h-[calc(100vh-3.5rem)] lg:h-[calc(100vh-3.5rem)]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        >
          <div className="container mx-auto px-10 h-full flex flex-col py-12">
            {/* Welcome Section - Moved Top */}
            <div className="text-center mb-8 flex-none">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 font-serif">
                Welcome to Masjid Al-Ezz!
              </h1>
              <div className="text-white/90 space-y-1 text-sm sm:text-base">
                <p>
                  <span className="font-bold text-amber-300 text-lg sm:text-xl block mb-1">
                    Masjid Al-Ezz has opened, Alhamdulillah
                  </span>
                  Your generous support turned a vision into reality.
                </p>
              </div>
            </div>

            <div className="flex-1 min-h-0 w-full flex flex-col lg:flex-row gap-8 lg:gap-12 xl:gap-16 items-stretch justify-center pb-2">
              {/* Left Column - Prayer Times */}
              <div className="w-full h-[500px] lg:h-full lg:flex-1 min-h-0">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden h-full border border-white/20">
                  <div className="p-4 h-full">
                    <MasjidBoxWidget />
                  </div>
                </div>
              </div>

              {/* Right Column - Featured Event */}
              <div className="w-full h-[500px] lg:h-full lg:flex-1 min-h-0">
                <FeaturedEvent />
              </div>
            </div>
          </div>
        </section>

        {/* Ramadan Section */}
        <Ramadan />

        {/* Video Reels Section - Only show if there are videos */}
        <VideoReels>
          {({ hasVideos }) => (
            hasVideos && (
              <div className="w-full bg-gradient-to-b from-white to-primary/5 min-h-screen flex flex-col justify-center">
                <div className="container mx-auto px-4 py-12">
                  <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                      <Video className="w-8 h-8" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 font-serif">
                      Explore Our Video Content
                    </h2>
                    <div className="w-24 h-1 bg-amber-400 mx-auto mb-4"></div>
                    <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
                      Stay updated with the latest videos from Masjid Al-Ezz
                    </p>
                  </div>
                  <VideoReels />
                  <div className="mt-12">
                    <SectionDivider />
                  </div>
                </div>
              </div>
            )
          )}
        </VideoReels>

        {/* Events Section */}
        <section id="events" className="w-full bg-gradient-to-b from-primary/5 to-white h-screen flex flex-col overflow-hidden">
          <div className="container mx-auto px-4 pt-8 md:pt-12 flex-none">
            <div className="mb-8 text-center">
              <h2 className="text-3xl md:text-4xl font-bold font-serif text-primary mb-3">
                Our Events
              </h2>
              <div className="w-24 h-1 bg-amber-400 mx-auto mb-4"></div>
              <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
                Stay connected with our community through our latest events and
                programs. <br />
                Follow us on Instagram for more updates.
              </p>
            </div>
          </div>
          <div className="w-full flex-1 min-h-0 pb-8">
            <InstagramEvents />
          </div>
        </section>

        {/* Instagram Gallery Section */}
        <div
          className="w-full min-h-screen flex flex-col justify-center bg-primary"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        >
          <div className="container mx-auto px-4 py-12">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 text-white mb-4">
                <Instagram className="w-8 h-8" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 font-serif">
                Photo Gallery
              </h2>
              <div className="w-24 h-1 bg-amber-400 mx-auto mb-4"></div>
              <p className="text-white/90 text-base md:text-lg max-w-2xl mx-auto">
                Browse through our collection of photos from recent events and activities
              </p>
            </div>
            <Gallery />
          </div>
        </div>

        {/* Programs Section */}
        <section className="w-full bg-gray-50 min-h-screen flex flex-col justify-center">
          <div className="w-full max-w-7xl mx-auto px-6 py-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-serif text-primary mb-3">
                Weekly Programs
              </h2>
              <div className="w-24 h-1 bg-amber-400 mx-auto mb-4"></div>
              <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
                Enrich your spiritual journey and build meaningful connections
                with our weekly programs.
              </p>
            </div>

            <Programs limit={6} shuffle />

            <div className="mt-12 text-center">
              <Link to="/programs">
                <Button className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 py-2 h-12 text-base shadow-lg">
                  View All Programs <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <div className="hidden md:block relative z-10 w-full bg-primary min-h-screen py-12 md:py-16 flex items-center"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        >
          <div className="container mx-auto px-4 flex justify-center">
            <div className="w-full max-w-4xl">
              <Donate />
            </div>
          </div>
        </div>
      </main>
      <Footer className="relative z-0" />
    </div>
  );
}
