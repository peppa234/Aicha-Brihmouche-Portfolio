import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SkillsSection from "@/components/SkillsSection";
import AchievementsSection from "@/components/AchievementsSection";
import ExperienceSection from "@/components/ExperienceSection";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import cosmicBackground from "@/assets/image.png";
import { motion } from "framer-motion";
import { FLOATING_VARIANTS, HOVER_VARIANTS, STAGGER_VARIANTS, STAGGER_ITEM_VARIANTS } from "@/constants/animations";


const Index = () => {

  return (
    <div 
      className="min-h-screen bg-background relative overflow-hidden"
      style={{
        backgroundImage: `url(${cosmicBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Animated Background Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-[#BF6BB3]/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Header />
        
        {/* Hero Section with Enhanced Animations */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <Hero />
        </motion.div>

        {/* Skills Section */}
        <div>
          <SkillsSection />
        </div>

        {/* Achievements Section with Floating Effect */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div
            variants={FLOATING_VARIANTS}
            animate="float"
          >
            <AchievementsSection />
          </motion.div>
        </motion.div>

        {/* Experience Section with Enhanced Animations */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <motion.div
            whileHover="hover"
            variants={HOVER_VARIANTS}
          >
            <ExperienceSection />
          </motion.div>
        </motion.div>

        {/* Footer - No Animation */}
        <Footer />
      </div>
      
      {/* Chatbot - Fixed Position */}
      <Chatbot />
    </div>
  );
};

export default Index;
