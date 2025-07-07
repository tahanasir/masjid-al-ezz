import { MasjidBoxWidget } from "@/components/home/MasjidBoxWidget";
import { ChevronLeft, Calendar } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { formatDate } from "@/lib/utils";
import { Link } from "wouter";

export default function PrayerTimesPage() {
  // Get current date for display
  const today = new Date();
  const formattedDate = formatDate(today);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-primary hover:underline mb-2"
          >
            <ChevronLeft className="h-4 w-4 mr-1" /> Back to home
          </Link>
          <h1 className="text-3xl font-bold text-primary font-serif">
            Prayer Times
          </h1>
          <p className="mt-2 text-gray-600">
            Check the daily prayer times for Masjid Al-Ezz. All times are
            automatically updated based on our location and follow the
            calculation method approved by our scholars.
          </p>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="bg-primary text-white p-4 flex justify-between items-center">
            <h2 className="text-xl font-bold">Prayer Schedule</h2>
            <div className="text-sm flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              <span>{formattedDate}</span>
            </div>
          </div>

          <div className="p-4">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-primary mb-2">
                MasjidBox Prayer Times
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                These prayer times are directly from MasjidBox and always
                display the most up-to-date schedule.
              </p>
            </div>

            <div className="rounded-md border p-4">
              <div className="w-full min-h-[600px]">
                <MasjidBoxWidget />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <h3 className="text-xl font-semibold text-primary mb-4">
            Prayer Time Information
          </h3>

          <div className="w-full">
            <div className="bg-white shadow-md rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-primary mb-3 text-lg">
                    Calculation Method
                  </h4>
                  <p className="text-gray-700 mb-4">
                    We use the North America (ISNA) calculation method for
                    determining prayer times.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-primary mb-3 text-lg">
                    Adjustments
                  </h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Fajr and Isha: 15° twilight angle</li>
                    <li>Dhuhr: +5 minutes from midday</li>
                    <li>Maghrib: 3 minutes after sunset</li>
                    <li>Friday prayer (Jumaa) is always at 1:30 PM</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
