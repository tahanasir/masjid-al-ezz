import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  BookOpen,
  Presentation,
  Video,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { motion } from "framer-motion";

export function Resources() {
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
  };

  return (
    <section
      id="resources"
      className="py-20 bg-gradient-to-b from-background to-primary/5"
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold font-serif text-primary mb-2">
            Islamic Resources
          </h2>
          <div className="w-24 h-1 bg-amber-400 mx-auto mb-6"></div>
          <p className="max-w-xl mx-auto text-gray-600">
            Explore our collection of Islamic resources to enhance your
            knowledge and spiritual growth.
          </p>
        </div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div variants={cardVariants}>
            <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg group h-full border-transparent hover:border-primary/20">
              <CardContent className="p-8">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 text-primary text-2xl group-hover:bg-primary group-hover:text-white transition-all">
                  <BookOpen />
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">
                  Quran Resources
                </h3>
                <p className="text-gray-600 mb-5">
                  Access Quran translations, tafsir, and recitations to deepen
                  your understanding of the Holy Quran.
                </p>
                <div className="text-primary hover:text-primary/80 font-semibold flex items-center text-sm transition-colors cursor-pointer">
                  Explore resources <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={cardVariants}>
            <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg group h-full border-transparent hover:border-primary/20">
              <CardContent className="p-8">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 text-primary text-2xl group-hover:bg-primary group-hover:text-white transition-all">
                  <Presentation />
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">
                  Educational Materials
                </h3>
                <p className="text-gray-600 mb-5">
                  Browse through our collection of books, articles, and
                  educational materials on various Islamic topics.
                </p>
                <div className="text-primary hover:text-primary/80 font-semibold flex items-center text-sm transition-colors cursor-pointer">
                  Explore resources <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={cardVariants}>
            <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg group h-full border-transparent hover:border-primary/20">
              <CardContent className="p-8">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 text-primary text-2xl group-hover:bg-primary group-hover:text-white transition-all">
                  <Video />
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">
                  Lecture Recordings
                </h3>
                <p className="text-gray-600 mb-5">
                  Watch recordings of previous lectures, khutbahs, and
                  educational sessions from our masjid.
                </p>
                <div className="text-primary hover:text-primary/80 font-semibold flex items-center text-sm transition-colors cursor-pointer">
                  Explore resources <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-16 bg-primary rounded-2xl overflow-hidden shadow-xl"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="p-10 text-center relative">
            <div className="absolute inset-0 opacity-10"></div>
            <h3 className="text-2xl font-serif text-white mb-5 relative z-10 font-bold">
              Weekly Reminder
            </h3>
            <div className="bg-white text-gray-900 p-8 rounded-xl mb-8 max-w-2xl mx-auto relative z-10 shadow-lg">
              <p
                className="italic text-lg mb-5 text-primary font-medium"
                style={{ fontFamily: '"Scheherazade New", serif' }}
              >
                "إِنَّ اللَّهَ وَمَلَائِكَتَهُ يُصَلُّونَ عَلَى النَّبِيِّ يَا
                أَيُّهَا الَّذِينَ آمَنُوا صَلُّوا عَلَيْهِ وَسَلِّمُوا
                تَسْلِيمًا"
              </p>
              <p className="text-gray-700 leading-relaxed">
                "Indeed, Allah confers blessing upon the Prophet, and His angels
                [ask Him to do so]. O you who have believed, ask [Allah to
                confer] blessing upon him and ask [Allah to grant him] peace."
                [Quran 33:56]
              </p>
            </div>
            <div className="relative z-10">
              <Button className="bg-white text-primary hover:bg-white/90 transition-colors duration-200 rounded-full shadow-md px-6 font-medium">
                More Weekly Reminders <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </motion.div>

        <div className="mt-14 text-center">
          <p className="text-gray-600 mb-4">
            Looking for more resources? Visit these external Islamic websites:
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://quran.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-primary text-sm font-medium transition-colors"
            >
              Quran.com <ExternalLink className="ml-1 h-3 w-3" />
            </a>
            <a
              href="https://sunnah.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-primary text-sm font-medium transition-colors"
            >
              Sunnah.com <ExternalLink className="ml-1 h-3 w-3" />
            </a>
            <a
              href="https://islamqa.info"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-primary text-sm font-medium transition-colors"
            >
              IslamQA <ExternalLink className="ml-1 h-3 w-3" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
