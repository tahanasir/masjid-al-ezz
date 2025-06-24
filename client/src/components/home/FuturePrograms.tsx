import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Globe, Star, Plus, Heart, Users, Mountain } from "lucide-react";

// Define the future programs from the roadmap
const futurePrograms = [
  {
    id: "future-leaders",
    icon: <Mountain className="h-8 w-8 mb-3 text-primary" />,
    title: "Future Leaders Academy",
    description: "Equipping youth with practical skills, confidence, and purpose.",
    status: "coming-soon",
    color: "bg-gradient-to-br from-indigo-50 to-white"
  },
  {
    id: "flourish",
    icon: <Plus className="h-8 w-8 mb-3 text-primary" />,
    title: "Flourish with Purpose",
    description: "Empowering prosperity through Islamic principles.",
    status: "coming-soon",
    color: "bg-gradient-to-br from-emerald-50 to-white"
  },
  {
    id: "partnerships",
    icon: <Globe className="h-8 w-8 mb-3 text-primary" />,
    title: "Partnerships for Progress",
    description: "PMCC is expanding its impact and fostering unity across Peel.",
    status: "planning",
    color: "bg-gradient-to-br from-blue-50 to-white"
  },
  {
    id: "youth-counseling",
    icon: <Users className="h-8 w-8 mb-3 text-primary" />,
    title: "Youth Counseling",
    description: "A safe, supportive counseling service for youth to navigate personal challenges.",
    status: "planning",
    color: "bg-gradient-to-br from-amber-50 to-white"
  },
  {
    id: "marriage-support",
    icon: <Heart className="h-8 w-8 mb-3 text-primary" />,
    title: "Marriage Support Services",
    description: "Premarital workshops & marital counseling.",
    status: "planning",
    color: "bg-gradient-to-br from-rose-50 to-white"
  }
];

export function FuturePrograms() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="mb-10 text-center">
          <Badge variant="outline" className="mb-2 border-primary text-primary px-3 py-0.5">
            Roadmap
          </Badge>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">Future Programs</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            As our community grows, we're planning to launch these additional programs. 
            Subscribe to our newsletter to get updates on launch dates.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {futurePrograms.map((program) => (
            <motion.div
              key={program.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <Card className={`p-6 h-full flex flex-col border-transparent shadow-sm ${program.color} hover:shadow-md transition-all duration-300`}>
                <div className="text-center mb-4">
                  {program.icon}
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{program.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{program.description}</p>
                  
                  {program.status === "coming-soon" ? (
                    <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200 px-3">
                      Coming Soon
                    </Badge>
                  ) : (
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 px-3">
                      In Planning
                    </Badge>
                  )}
                </div>
                
                <div className="mt-auto pt-4 text-center">
                  <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
                    Get Notified <Star className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}