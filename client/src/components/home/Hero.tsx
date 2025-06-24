import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { usePrayerTimes } from "@/hooks/usePrayerTimes";
import { getHijriDate, getNextPrayer } from "@/lib/utils";
import { motion } from "framer-motion";
import { Clock, Moon, Sun, Sunrise, Sunset, Users } from "lucide-react";

export function Hero() {
  const { data: prayerTimes, isLoading, error } = usePrayerTimes();
  
  // Format the current date
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  // Get the Hijri date
  const hijriDate = getHijriDate();
  
  // Get the next prayer
  const nextPrayer = prayerTimes ? getNextPrayer(prayerTimes) : null;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  // Prayer time icons
  const prayerIcons = {
    Fajr: <Sunrise className="h-5 w-5 text-amber-500" />,
    Dhuhr: <Sun className="h-5 w-5 text-amber-500" />,
    Asr: <Sun className="h-5 w-5 text-amber-400" />,
    Maghrib: <Sunset className="h-5 w-5 text-amber-600" />,
    Isha: <Moon className="h-5 w-5 text-indigo-400" />,
  };

  return (
    <section 
      id="hero" 
      className="relative bg-cover bg-center overflow-hidden min-h-[60vh] md:min-h-[70vh] flex items-center"
      style={{ 
        backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://images.unsplash.com/photo-1584721284279-d48cf738a3c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')"
      }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70"></div>
      
      <div className="container mx-auto px-6 relative z-10 py-8 lg:py-12">
        <motion.div 
          className="flex flex-col lg:flex-row items-center justify-between gap-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            className="w-full lg:w-1/2 text-center lg:text-left mb-10 lg:mb-0"
            variants={itemVariants}
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 font-serif leading-tight">
              Welcome to<br />Masjid Al-Ezz
            </h1>
            
            <motion.h2 
              className="text-xl md:text-2xl font-serif mb-8 text-amber-300 font-semibold"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              Peel Muslim Community Center
            </motion.h2>
            
            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.8 }}
            >
              <div className="absolute left-0 w-2 h-full bg-amber-400 rounded-lg"></div>
              <p className="text-white text-lg mb-10 max-w-xl mx-auto lg:mx-0 pl-6 leading-relaxed">
                <span className="font-bold text-amber-300">Masjid AlEzz has opened, Alhamdulillah!</span> Your generous support turned a vision into reality. Now, we enter a new phase — building programs, developing leaders, and uniting hearts. Be part of this next chapter.
              </p>
            </motion.div>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start w-full sm:w-auto"
              variants={itemVariants}
            >
              <a href="#prayer-times" onClick={(e) => {
                e.preventDefault();
                document.getElementById("prayer-times")?.scrollIntoView({ behavior: "smooth" });
              }}
                className="w-full sm:w-auto"
              >
                <Button className="bg-amber-400 hover:bg-amber-500 text-primary hover:text-primary rounded-full text-sm sm:text-base px-4 sm:px-6 shadow-lg w-full sm:w-auto">
                  <Clock className="mr-2 h-4 w-4" />
                  Prayer Times
                </Button>
              </a>
              <a href="#programs" onClick={(e) => {
                e.preventDefault();
                document.getElementById("programs")?.scrollIntoView({ behavior: "smooth" });
              }}
                className="w-full sm:w-auto"
              >
                <Button className="bg-primary hover:bg-primary/90 text-white rounded-full text-sm sm:text-base px-4 sm:px-6 shadow-lg w-full sm:w-auto">
                  <Users className="mr-2 h-4 w-4" />
                  Our Programs
                </Button>
              </a>
              <a href="#donate" onClick={(e) => {
                e.preventDefault();
                document.getElementById("donate")?.scrollIntoView({ behavior: "smooth" });
              }}
                className="w-full sm:w-auto"
              >
                <Button className="bg-white text-primary hover:bg-gray-100 hover:text-primary/90 font-semibold rounded-full text-sm sm:text-base px-4 sm:px-6 shadow-lg w-full sm:w-auto">
                  Support Our Masjid
                </Button>
              </a>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="w-full lg:w-5/12 flex justify-center"
            variants={itemVariants}
          >
            {/* Today's Prayer Times Card */}
            <Card className="w-full max-w-md shadow-2xl bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden">
              <div className="bg-primary py-4 px-6 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-primary-800/20 opacity-10">
                  <img src="/attached_assets/masjid-AlEzz-color-h.png" alt="" className="w-full h-full object-contain opacity-5" />
                </div>
                <h3 className="text-2xl font-serif text-white font-bold relative z-10">Today's Prayer Times</h3>
                <p className="text-amber-300 text-sm font-medium">{hijriDate}</p>
                <p className="text-white/90 text-sm">{formattedDate}</p>
              </div>
              
              {isLoading ? (
                <div className="p-8 text-center">
                  <div className="animate-pulse flex flex-col items-center">
                    <div className="h-8 w-8 bg-gray-200 rounded-full mb-4"></div>
                    <div className="h-4 w-32 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 w-40 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ) : error ? (
                <div className="p-8 text-center text-red-500">
                  <p className="font-semibold">Failed to load prayer times.</p>
                  <p className="text-sm mt-2">Please try again later or check your connection.</p>
                </div>
              ) : (
                <CardContent className="p-0">
                  <div className="divide-y divide-gray-100">
                    {/* Fajr */}
                    <div className="py-4 px-6 flex justify-between items-center relative hover:bg-gray-50 transition-colors">
                      <div className="flex items-center">
                        {prayerIcons.Fajr}
                        <span className="font-semibold text-gray-900 ml-2">Fajr</span>
                      </div>
                      <div className="text-primary font-bold text-lg">{prayerTimes?.fajr}</div>
                      {nextPrayer?.name === "Fajr" && (
                        <div className="absolute right-0 top-0 bottom-0 w-1 bg-amber-500"></div>
                      )}
                    </div>
                    
                    {/* Dhuhr */}
                    <div className="py-4 px-6 flex justify-between items-center relative hover:bg-gray-50 transition-colors">
                      <div className="flex items-center">
                        {prayerIcons.Dhuhr}
                        <span className="font-semibold text-gray-900 ml-2">Dhuhr</span>
                      </div>
                      <div className="text-primary font-bold text-lg">{prayerTimes?.dhuhr}</div>
                      {nextPrayer?.name === "Dhuhr" && (
                        <div className="absolute right-0 top-0 bottom-0 w-1 bg-amber-500"></div>
                      )}
                    </div>
                    
                    {/* Asr */}
                    <div className="py-4 px-6 flex justify-between items-center relative hover:bg-gray-50 transition-colors">
                      <div className="flex items-center">
                        {prayerIcons.Asr}
                        <span className="font-semibold text-gray-900 ml-2">Asr</span>
                      </div>
                      <div className="text-primary font-bold text-lg">{prayerTimes?.asr}</div>
                      {nextPrayer?.name === "Asr" && (
                        <div className="absolute right-0 top-0 bottom-0 w-1 bg-amber-500"></div>
                      )}
                    </div>
                    
                    {/* Maghrib */}
                    <div className="py-4 px-6 flex justify-between items-center relative hover:bg-gray-50 transition-colors">
                      <div className="flex items-center">
                        {prayerIcons.Maghrib}
                        <span className="font-semibold text-gray-900 ml-2">Maghrib</span>
                      </div>
                      <div className="text-primary font-bold text-lg">{prayerTimes?.maghrib}</div>
                      {nextPrayer?.name === "Maghrib" && (
                        <div className="absolute right-0 top-0 bottom-0 w-1 bg-amber-500"></div>
                      )}
                    </div>
                    
                    {/* Isha */}
                    <div className="py-4 px-6 flex justify-between items-center relative hover:bg-gray-50 transition-colors">
                      <div className="flex items-center">
                        {prayerIcons.Isha}
                        <span className="font-semibold text-gray-900 ml-2">Isha</span>
                      </div>
                      <div className="text-primary font-bold text-lg">{prayerTimes?.isha}</div>
                      {nextPrayer?.name === "Isha" && (
                        <div className="absolute right-0 top-0 bottom-0 w-1 bg-amber-500"></div>
                      )}
                    </div>
                  </div>
                  
                  <div className="py-4 px-6 bg-gray-50 text-center">
                    {nextPrayer && (
                      <motion.div 
                        className="mb-2 bg-primary/5 py-2 px-4 rounded-full inline-block"
                        initial={{ scale: 0.95 }}
                        animate={{ scale: 1 }}
                        transition={{ 
                          repeat: Infinity, 
                          repeatType: "reverse", 
                          duration: 2 
                        }}
                      >
                        <span className="text-primary font-bold">Next Prayer:</span>
                        <span className="font-semibold ml-1 text-gray-700">{nextPrayer.name} in {nextPrayer.timeLeft}</span>
                      </motion.div>
                    )}
                    <a 
                      href="#prayer-times" 
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById("prayer-times")?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="text-primary hover:text-primary/80 text-sm inline-flex items-center transition-colors duration-200 font-medium"
                    >
                      View weekly schedule 
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </div>
                </CardContent>
              )}
            </Card>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Decorative element */}
      <div className="hidden lg:block absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white/10 to-transparent"></div>
    </section>
  );
}
