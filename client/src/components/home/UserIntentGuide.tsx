import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Heart, 
  HelpCircle, 
  BookOpen,
  CalendarClock,
  HeartHandshake,
  Megaphone,
  UserPlus
} from "lucide-react";

// Define the different user intent options
const userIntents = [
  {
    id: "prayer-times",
    title: "Prayer Times",
    description: "Check today's prayer times and weekly schedule",
    icon: <Clock className="h-8 w-8 mb-2 text-primary" />,
    path: "/prayer-times",
    color: "bg-gradient-to-br from-primary/10 to-primary/5",
    hover: "hover:bg-primary/10"
  },
  {
    id: "attend-event",
    title: "Attend an Event",
    description: "Browse upcoming events and register to attend",
    icon: <Calendar className="h-8 w-8 mb-2 text-amber-500" />,
    path: "/events",
    color: "bg-gradient-to-br from-amber-100/50 to-amber-50/50",
    hover: "hover:bg-amber-100/50"
  },
  {
    id: "register-program",
    title: "Register for a Program",
    description: "Explore our structured programs for all ages",
    icon: <BookOpen className="h-8 w-8 mb-2 text-emerald-600" />,
    path: "/programs",
    color: "bg-gradient-to-br from-emerald-100/50 to-emerald-50/50",
    hover: "hover:bg-emerald-100/50"
  },
  {
    id: "donate",
    title: "Support Our Masjid",
    description: "Contribute to our community through donations",
    icon: <HeartHandshake className="h-8 w-8 mb-2 text-rose-500" />,
    path: "/donate",
    color: "bg-gradient-to-br from-rose-100/50 to-rose-50/50",
    hover: "hover:bg-rose-100/50"
  },
  {
    id: "join",
    title: "Join the Community",
    description: "Learn how you can get involved and volunteer",
    icon: <UserPlus className="h-8 w-8 mb-2 text-blue-500" />,
    path: "/about#volunteer",
    color: "bg-gradient-to-br from-blue-100/50 to-blue-50/50",
    hover: "hover:bg-blue-100/50"
  },
  {
    id: "directions",
    title: "Find Our Location",
    description: "Get directions to the mosque and prayer hall",
    icon: <MapPin className="h-8 w-8 mb-2 text-indigo-500" />,
    path: "/contact#location",
    color: "bg-gradient-to-br from-indigo-100/50 to-indigo-50/50",
    hover: "hover:bg-indigo-100/50"
  }
];

// The intent guide question UI to help lead users to the right content
export function UserIntentGuide() {
  const [selectedIntent, setSelectedIntent] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(true);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const handleIntentSelect = (id: string) => {
    setSelectedIntent(id);
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-3">How Can We Help You Today?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Select what you're looking for to get to the right information quickly</p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {userIntents.map((intent) => (
            <motion.div 
              key={intent.id}
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <Link href={intent.path}>
                <Card 
                  className={`h-full p-6 flex flex-col items-center text-center cursor-pointer border-transparent shadow-sm transition-all duration-300 hover:shadow-md ${intent.color} ${intent.hover}`}
                >
                  {intent.icon}
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{intent.title}</h3>
                  <p className="text-gray-600 text-sm">{intent.description}</p>
                  
                  <div className="mt-auto pt-4">
                    <Button 
                      variant="ghost" 
                      className="text-primary hover:text-primary hover:bg-primary/5"
                    >
                      Learn More <span className="ml-1">→</span>
                    </Button>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="flex justify-center mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <div className="bg-amber-50 max-w-lg mx-auto p-4 rounded-lg border border-amber-200 flex items-center">
            <HelpCircle className="h-5 w-5 text-amber-500 mr-3 flex-shrink-0" />
            <p className="text-sm text-amber-800">
              <span className="font-semibold">Need something else?</span> Visit our <Link href="/contact" className="underline text-primary hover:text-primary/80">contact page</Link> or call us during office hours at <span className="font-semibold">(123) 456-7890</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}