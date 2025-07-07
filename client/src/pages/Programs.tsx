import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Program } from "@shared/schema";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock, Users } from "lucide-react";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { FuturePrograms } from "@/components/home/FuturePrograms";

export default function ProgramsPage() {
  const {
    data: programs,
    isLoading,
    error,
  } = useQuery<Program[]>({
    queryKey: ["/api/programs", { active: true }],
  });

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
    hover: {
      y: -10,
      boxShadow:
        "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: {
        duration: 0.3,
      },
    },
  };

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

          <div className="mb-12">
            <Badge
              variant="outline"
              className="mb-3 border-primary text-primary px-3 py-0.5"
            >
              Currently Active
            </Badge>
            <h2 className="text-2xl font-bold text-primary font-serif mb-4">
              Active Programs
            </h2>
          </div>

          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array(3)
                .fill(0)
                .map((_, i) => (
                  <Card key={i} className="overflow-hidden">
                    <Skeleton className="h-48 w-full" />
                    <CardContent className="p-6">
                      <Skeleton className="h-4 w-1/3 mb-3" />
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-2/3 mb-4" />
                      <Skeleton className="h-4 w-1/4" />
                    </CardContent>
                  </Card>
                ))}
            </div>
          ) : error ? (
            <div className="text-center text-red-500">
              <h3 className="text-lg font-semibold mb-2">
                Error Loading Programs
              </h3>
              <p>
                We couldn't load the programs information. Please try again
                later.
              </p>
            </div>
          ) : (
            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {programs?.map((program) => (
                <motion.div
                  key={program.id}
                  variants={cardVariants}
                  whileHover="hover"
                >
                  <Link href={`/programs/${program.id}`}>
                    <Card className="overflow-hidden h-full flex flex-col border-transparent shadow-md hover:shadow-xl transition-shadow cursor-pointer">
                      <div className="h-48 overflow-hidden relative">
                        <img
                          src={
                            program.image ||
                            "https://images.unsplash.com/photo-1584286596588-9d5f4523878c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                          }
                          alt={program.title}
                          className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/60 to-transparent flex flex-col justify-end p-5">
                          <Badge className="self-start mb-2 bg-amber-400 text-primary hover:bg-amber-500">
                            PROGRAM
                          </Badge>
                          <h3 className="text-white text-xl font-serif font-bold">
                            {program.title}
                          </h3>
                        </div>
                      </div>
                      <CardContent className="p-5 flex-grow">
                        <div className="border-l-4 border-amber-400 pl-3 mb-4">
                          <div className="flex items-center gap-2 text-primary font-semibold mb-1">
                            <Calendar className="h-4 w-4" />
                            <span className="text-sm">WHEN:</span>
                            <span className="text-sm ml-auto">
                              {program.schedule}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-primary font-semibold mb-1">
                            <Clock className="h-4 w-4" />
                            <span className="text-sm">TIME:</span>
                            <span className="text-sm ml-auto">
                              {program.time || "Contact us"}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-primary font-semibold mb-1">
                            <Users className="h-4 w-4" />
                            <span className="text-sm">LED BY:</span>
                            <span className="text-sm ml-auto">
                              {program.instructor || "Masjid Staff"}
                            </span>
                          </div>
                        </div>
                        <div className="mb-3">
                          <p className="text-gray-700 text-sm line-clamp-3">
                            {program.description}
                          </p>
                        </div>

                        <div className="mt-auto pt-4">
                          <Button className="w-full bg-primary hover:bg-primary/90 text-white rounded-full">
                            Register Now
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Future Programs Roadmap */}
          <FuturePrograms />
        </div>
      </main>
      <Footer />
    </>
  );
}
