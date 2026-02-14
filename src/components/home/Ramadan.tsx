import { Button } from "@/components/ui/button";
import { Ticket, Heart } from "lucide-react";
import { SITE_URL } from "@/config";

const PDF_PATH = "/ramadan-calendar.pdf";
const PDF_URL = `${SITE_URL}${PDF_PATH}`;
const GOOGLE_VIEWER_URL = `https://docs.google.com/gview?url=${encodeURIComponent(PDF_URL)}&embedded=true`;

export function Ramadan() {
  return (
    <section className="w-full bg-slate-50 min-h-screen flex flex-col justify-center py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-serif text-primary mb-3">
            Ramadan
          </h2>
          <div className="w-24 h-1 bg-amber-400 mx-auto mb-4"></div>
          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
            Join us for a month of blessings, community, and worship.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg border p-4 md:p-8 max-w-5xl mx-auto">
          {/* PDF Viewer */}
          <div className="w-full h-[450px] md:h-[800px] bg-gray-100 rounded-lg overflow-hidden mb-8 border">
            <iframe
              src={GOOGLE_VIEWER_URL}
              className="w-full h-full"
              title="Ramadan Calendar"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <a
              href="https://www.zeffy.com/en-CA/ticketing/sponsor-iftar-at-masjid-al-ezz"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full md:w-auto"
            >
              <Button className="w-full md:w-auto text-lg h-12 px-8 bg-primary hover:bg-primary/90">
                <Heart className="mr-2 h-5 w-5" />
                Sponsor an Iftar
              </Button>
            </a>

            <a
              href="https://api.leadconnectorhq.com/widget/form/jEzwvPrpoaeuPuog4OiN?notrack=true"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full md:w-auto"
            >
              <Button variant="outline" className="w-full md:w-auto text-lg h-12 px-8 border-primary text-primary hover:bg-primary/5">
                <Ticket className="mr-2 h-5 w-5" />
                Purchase Iftar Ticket
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
