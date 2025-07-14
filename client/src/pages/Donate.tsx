import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ChevronLeft, Home, ExternalLink } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Donate() {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState("loan");

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Back to Home button - visible on mobile and tablets */}
        <div className="container mx-auto px-6 pt-4 md:pt-6 lg:hidden">
          <Link href="/">
            <Button
              variant="outline"
              className="border-primary text-primary hover:bg-primary/5 flex items-center rounded-full"
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>

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
              <span>Donate</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
              Support Masjid Al-Ezz
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto opacity-90">
              Your generosity helps us maintain our mosque and support our
              community programs.
            </p>
          </div>
        </section>

        {/* Donation Options */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-serif text-primary mb-3">
                  How You Can Help
                </h2>
                <div className="w-24 h-1 bg-amber-400 mx-auto mb-6"></div>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Your donations make a significant impact on our community.
                  Choose an option below to contribute.
                </p>
              </div>

              <Tabs
                defaultValue="loan"
                className="w-full"
                value={activeTab}
                onValueChange={setActiveTab}
              >
                <TabsList className="grid w-full grid-cols-2 mb-8">
                  <TabsTrigger
                    value="loan"
                    className={`text-base py-3 ${activeTab === "loan" ? "bg-primary text-white" : ""}`}
                  >
                    Help Pay Masjid Loan
                  </TabsTrigger>
                  <TabsTrigger
                    value="expenses"
                    className={`text-base py-3 ${activeTab === "expenses" ? "bg-primary text-white" : ""}`}
                  >
                    Help With Other Masjid Expenses
                  </TabsTrigger>
                </TabsList>

                <TabsContent
                  value="loan"
                  className="border rounded-lg p-6 bg-white shadow-sm"
                >
                  <div className="mb-6">
                    <h3 className="text-2xl font-serif text-primary mb-3">
                      Pay Off Masjid Loan
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Help us pay off our masjid loan and secure the future of
                      our community center.
                    </p>
                  </div>

                  {/* Embedded IRM form with our color scheme */}
                  <div className="w-full border rounded-lg overflow-hidden bg-white shadow-md">
                    <div className="relative overflow-hidden pb-[110%] md:pb-[80%]">
                      <iframe
                        src="https://app.irm.io/masjidalezz.com/payoffmasjidloan"
                        className="absolute top-0 left-0 w-full h-full border-0"
                        title="Masjid Al-Ezz Loan Payment"
                        style={{
                          colorScheme: "light",
                          accentColor: "#620043",
                        }}
                      ></iframe>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent
                  value="expenses"
                  className="border rounded-lg p-6 bg-white shadow-sm"
                >
                  <div className="text-center py-10">
                    <h3 className="text-2xl font-serif text-primary mb-3">
                      Help With Other Masjid Expenses
                    </h3>
                    <p className="text-gray-600 mb-8 max-w-xl mx-auto">
                      Please click on the link below to be redirected to IRM
                      website and continue there.
                    </p>

                    <a
                      href="https://app.irm.io/masjidalezz.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex"
                    >
                      <Button className="bg-primary hover:bg-primary/90 text-white py-6 px-8 rounded-md font-medium text-lg shadow-sm flex items-center gap-2">
                        IRM Website
                        <ExternalLink className="h-5 w-5" />
                      </Button>
                    </a>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>

        {/* Tax Benefits Information */}
        <section className="py-8 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="p-4 bg-primary/5 rounded-lg border border-primary/10 shadow-sm">
                <h4 className="font-bold text-primary mb-2">Tax Benefits</h4>
                <p className="text-gray-600">
                  Peel Muslim Community Center is a charitable organization. All
                  donations are eligible for tax receipts, which can be used to
                  claim deductions on your income tax return.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
