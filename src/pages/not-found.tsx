import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
        <Card className="max-w-md w-full text-center">
          <CardContent className="py-10">
            <AlertCircle className="mx-auto mb-4 h-12 w-12 text-red-500 animate-pulse" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              404 - Page Not Found
            </h1>
            <p className="text-gray-600 mb-6">
              Sorry, we couldn't find the page you're looking for.
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/">
                <Button>Go Home</Button>
              </Link>
              <Button variant="outline" onClick={() => window.history.back()}>
                Go Back
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </>
  );
}
