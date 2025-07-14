import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { Programs } from "@/components/home/Programs";

export default function ProgramsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="mb-8">
            <Link href="/">
              <Button
                variant="ghost"
                className="mb-4 text-primary hover:text-primary/90"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-primary font-serif mb-2">
              Our Programs
            </h1>
            <p className="text-gray-600 max-w-2xl">
              Enrich your spiritual journey and build meaningful connections
              with our regular programs. Unlike events, our programs require
              registration and offer ongoing learning opportunities.
            </p>
          </div>

          <Programs />
        </div>
      </main>
      <Footer />
    </>
  );
}
