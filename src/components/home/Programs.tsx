import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, CircleDollarSign } from "lucide-react";
import { motion } from "framer-motion";

interface ProgramsProps {
  limit?: Number;
  shuffle?: Boolean;
}

export function Programs({ limit, shuffle }: ProgramsProps) {
  let programs = [
    {
      title: "Weekend Islamic School",
      description:
        "Starting Saturday, Sept 6th, children ages 6–14 can spend their weekends attending Qur'an classes, Islamic Studies sessions, and Arabic language classes, while also enjoying fun activities like sports and arts!",
      schedule: "Every Saturday",
      time: "10:00 AM - 2:00 PM",
      image: "https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      cost: "$75/month or $600/year",
      link: "https://bit.ly/toledo-weekend-islamic-school",
    },
    {
      title: "Youth Qur'an Class (Ages 6-16)",
      description:
        "Join our Reading, Hifdh & Tajweed class for children ages 6-16. Taught by qualified male and female instructors.",
      schedule: "Mondays to Thursdays",
      time: "5:00 PM - 7:00 PM",
      image: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae",
      cost: "$75/month",
      link: "http://bit.ly/youth-tajweed",
    },
    // {
    //   title: "Deen & Discovery",
    //   description:
    //     "Join us for a scenic nature walk as we reflect on the signs of Allah's creation. Open to all! Families welcome!",
    //   schedule: "Saturday Bi-weekly",
    //   time: "11:30 AM",
    //   cost: "Free",
    //   image: "https://images.pexels.com/photos/775201/pexels-photo-775201.jpeg",
    // },
    {
      title: "Beginner's Boxing Classes (Brothers 14+)",
      description:
        "A structured boxing program for youth that teaches discipline and self-defense in a safe environment. First two classes are complimentary.",
      schedule: "Every Thursday",
      time: "8:00 PM - 10:00 PM",
      image:
        "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      cost: "$50/month",
      link: "https://api.leadconnectorhq.com/widget/form/U0lkqUnMQLvXeKGojEm4",
    },
    {
      title: "Tafsir & Tea (Sisters)",
      description:
        "Join us weekly for a beautiful evening of sisterhood, reflection, and learning as we connect over the noble verses of the Qur'an with a warm drink in hand.",
      schedule: "Every Wednesday",
      time: "6:30 PM - 7:30 PM",
      image:
        "https://images.unsplash.com/photo-1517685352821-92cf88aee5a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      cost: "Free",
    },
    {
      title: "Brothers Ilm & Chill",
      description:
        "Masjid Al-Ezz invites all high school & university students to come out for our weekly ILM & CHILL session!\n\n📖 This week's topic: 'A Muslim's Vision' – a short and powerful khatira after Maghrib to get us thinking about our direction and goals as Muslims.\n\n🎉 After the talk, stick around for some fun activities, chill vibes, brotherhood and some delicious pizza 🍕",
      schedule: "Every Saturday",
      time: "After Maghrib",
      image: "https://images.pexels.com/photos/220201/pexels-photo-220201.jpeg?auto=compress&cs=tinysrgb&w=800",
      cost: "Free",
      link: "https://tinyurl.com/YouthSNL",
    },
    {
      title: "History of the 5 Caliphs",
      description:
        "Take a step back into Islamic history and reconnect with the roots of our faith. History of the 5 Caliphs is a weekly series exploring the early days of Islam.",
      schedule: "Every Thursday",
      time: "7:00 PM - 8:00 PM",
      image:
        "https://images.pexels.com/photos/31779465/pexels-photo-31779465.jpeg",
      cost: "Free",
    },
    {
      title: "Family Tafsir Night",
      description:
        "Weekly family tafsir night featuring halaqas for youth and adults, children's activities. Tea and dinner will be provided.",
      schedule: "Every Friday",
      time: "7:30 PM - Maghrib",
      image:
        "https://images.pexels.com/photos/31607773/pexels-photo-31607773.jpeg",
      cost: "Free",
      link: "https://api.leadconnectorhq.com/widget/form/pJEMzHOodaksWH2uKr4I",
    },
    {
      title: "Tajweed & Hifdh Class (Sisters)",
      description:
        "Do you listen to Quran reciters and wish you were able to recite the Quran like them? Then you're in the right place! With this program, you'll learn Tajweed and start your Hifth with a teacher of 20+ years of experience and has a sanad.",
      schedule: "Sundays to Thursdays",
      time: "11:00 AM - 3:00 PM",
      image:
        "https://motionarray.imgix.net/motion-array-1512327-E08oh0yQoX-high_0011.jpg",
      cost: "See registration form",
      link: "https://api.leadconnectorhq.com/widget/form/nong0q79d2TaF51IBkCZ",
    },
  ];

  // Define pinned program titles
  const pinnedTitles = [
    "Weekend Islamic School",
    "Youth Qur'an Class (Ages 6-16)",
    "Tajweed & Hifdh Class (Sisters)",
    "Family Tafsir Night",
  ];

  // Pin specific programs at the top
  const pinnedPrograms = programs.filter((program) =>
    pinnedTitles.includes(program.title),
  );

  // Get the rest of the programs
  const otherPrograms = programs.filter(
    (program) => !pinnedTitles.includes(program.title),
  );

  // Shuffle the other programs if shuffle is enabled
  if (shuffle === true) {
    otherPrograms.sort(() => 0.5 - Math.random());
  }

  // Combine pinned programs first, then the rest
  programs = [...pinnedPrograms, ...otherPrograms];

  // Paginate programs
  programs = typeof limit === "number" ? programs.slice(0, limit) : programs;

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
    <motion.div
      className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      {programs?.map((program, index) => (
        <motion.div key={index} variants={cardVariants} whileHover="hover">
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
                  <span className="text-sm ml-auto">{program.schedule}</span>
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
                <p className="text-gray-700 text-sm">{program.description}</p>
              </div>
            </CardContent>
            <CardFooter className="p-6 pt-0 flex justify-between gap-2 flex-wrap">
              {program.link && (
                <a
                  href={program.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-amber-300 transition-colors"
                  aria-label="Instagram"
                >
                  <Button className="bg-primary hover:bg-primary/90 text-white rounded-full w-full sm:w-auto">
                    Register for Program
                  </Button>
                </a>
              )}
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}
