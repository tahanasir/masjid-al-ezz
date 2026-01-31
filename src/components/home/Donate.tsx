import { Card, CardContent } from "@/components/ui/card";

export function Donate() {
  return (
    <div className="w-full">
      <div className="w-full max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-serif text-white mb-3">
            Support Our Masjid
          </h2>
          <div className="w-24 h-1 bg-amber-400 mx-auto mb-4"></div>
          <p className="max-w-2xl mx-auto text-white/90 text-base md:text-lg">
            Your generous donations help maintain our masjid, support our
            programs, and serve the community. All donations are tax deductible.
          </p>
        </div>

        <Card className="overflow-hidden max-w-5xl mx-auto shadow-2xl">
          <CardContent className="p-0">
            <div className="p-4 sm:p-6">
              <div className="w-full rounded-lg overflow-hidden">
                <div className="relative overflow-hidden pb-[200%] md:pb-[100%]">
                  <iframe
                    src="https://app.irm.io/masjidalezz.com/where-most-needed"
                    className="absolute top-0 left-0 w-full h-full"
                    title="Masjid Al-Ezz Donation"
                    style={{
                      colorScheme: "light",
                      accentColor: "#620043",
                      border: 0,
                    }}
                  ></iframe>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
