import { Card, CardContent } from "@/components/ui/card";

export function Donate() {
  return (
    <section id="donate" className="py-16 bg-primary" style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
    }}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-serif text-white mb-2">Support Our Masjid</h2>
          <div className="w-24 h-1 bg-secondary mx-auto mb-6"></div>
          <p className="max-w-xl mx-auto text-white/80">
            Your generous donations help maintain our masjid, support our programs, and serve the community.
          </p>
        </div>
        
        <Card className="overflow-hidden max-w-4xl mx-auto shadow-xl">
          <CardContent className="p-0">
            <div className="p-6">
              <h3 className="text-xl font-bold text-primary mb-3 text-center">Help Pay Off Our Masjid Loan</h3>
              <p className="text-gray-600 mb-6 text-center">
                Your contribution helps secure the future of our community center and supports our ongoing programs.
              </p>
              
              {/* Embedded IRM form with appropriate styling */}
              <div className="w-full border rounded-lg overflow-hidden bg-white shadow-sm">
                <div className="relative overflow-hidden pb-[100%] md:pb-[75%]">
                  <iframe 
                    src="https://app.irm.io/masjidalezz.com/payoffmasjidloan" 
                    className="absolute top-0 left-0 w-full h-full border-0" 
                    title="Masjid Al-Ezz Loan Payment"
                    style={{
                      colorScheme: "light",
                      accentColor: "#620043"
                    }}
                  ></iframe>
                </div>
              </div>
              
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-500">
                  Masjid Al-Ezz is a registered charitable organization. All donations are tax-deductible.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}