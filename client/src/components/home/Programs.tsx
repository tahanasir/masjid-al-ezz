import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight, Clock, CircleDollarSign } from "lucide-react";
import { motion } from "framer-motion";

export function Programs() {
  const programs = [
    {
      title: "Beginner's Boxing Classes (Brothers 14+)",
      description:
        "Sports program promoting health and unity. A structured boxing program for youth that teaches discipline, fitness, and self-defense in a safe, Islamic environment. First two classes are complimentary. Only open to brothers aged 14 and above.",
      schedule: "Every Saturday",
      time: "4:00 PM - 5:30 PM",
      image:
        "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      cost: "$50/month",
    },
    {
      title: "Qur'an Reading Program for Non-Arabic Speakers",
      description:
        "A comprehensive Qur'an reading course for non-Arabic speakers, focusing on correct pronunciation. Open to both brothers and sisters. Level 1: Al-Nooraniyah (books provided). Level 2: common words and root meanings.",
      schedule: "Every Saturday",
      time: "4:00 PM - 5:00 PM",
      image:
        "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      cost: "$35/month",
    },
    {
      title: "Tajweed & Hifdh Class (Sisters Only)",
      description:
        "Quran tajweed and memorization instruction led by a certified teacher with a sanad and over 20 years of experience.",
      schedule: "Sundays to Thursdays",
      time: "11:00 AM - 3:00 PM",
      image:
        "https://motionarray.imgix.net/motion-array-1512327-E08oh0yQoX-high_0011.jpg",
      cost: "See registration form",
    },
  ];

  // Container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  // Card animation variants
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
    <section
      id="programs"
      className="py-20 bg-gradient-to-b from-white to-primary/5"
    >
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between mb-16">
          <div className="lg:w-1/2 text-center lg:text-left mb-8 lg:mb-0">
            <h2 className="text-4xl font-bold font-serif text-primary mb-4">
              Weekly Programs
            </h2>
            <div className="w-24 h-1 bg-amber-400 lg:mx-0 mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-xl lg:pr-10">
              Enrich your spiritual journey and build meaningful connections.
              Our regular programs are designed to nurture faith, education, and
              community bonds for all ages.
            </p>
          </div>
        </div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {programs?.map((program, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover="hover"
            >
              <Card className="overflow-hidden h-full flex flex-col border-transparent shadow-md hover:shadow-xl transition-shadow">
                <div className="h-40 overflow-hidden relative">
                  <img
                    src={program.image}
                    alt={program.title}
                    className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/60 to-transparent flex flex-col justify-end p-5">
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
                      <span className="text-sm ml-auto">{program.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-primary font-semibold">
                      <CircleDollarSign className="h-4 w-4" />
                      <span className="text-sm">COST:</span>
                      <span className="text-sm ml-auto">{program.cost}</span>
                    </div>
                  </div>
                  <div className="mb-3">
                    <h4 className="text-sm uppercase font-semibold text-gray-500 mb-1">
                      DETAILS
                    </h4>
                    <p className="text-gray-700 text-sm">
                      {program.description}
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="p-6 pt-0 flex justify-between gap-2 flex-wrap">
                  <Button className="bg-primary hover:bg-primary/90 text-white rounded-full w-full sm:w-auto">
                    Register for Program
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-16 text-center">
          <a href="/programs">
            <Button className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 py-2 h-12 text-base shadow-lg">
              View All Programs <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
