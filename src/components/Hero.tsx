import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button-variants";
import { motion } from "framer-motion";
import Group8 from "../assets/HeroSectionImage.png";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 px-4 sm:px-6">
      <div className="container mx-auto grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Profile Image */}
        <motion.div
          className="flex justify-center lg:order-1 order-2 mt-8 lg:mt-0"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.img 
            src={Group8} 
            alt="Aicha Brihmouche - AI and Data Science student, Graphic Designer, and Web Developer" 
            className="w-full max-w-[500px] lg:max-w-[750px] lg:-ml-8"
            animate={{
              y: [-15, 15, -15],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>

        {/* Text Content */}
        <div className="lg:order-2 order-1 space-y-6 md:space-y-8">
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-orbitron font-extrabold text-white drop-shadow-[0_0_28.9px_rgba(203,37,195,0.79)] text-center lg:text-left"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
          >
            Hi, I'm Aicha!
          </motion.h1>

          <motion.div
            className="space-y-6 md:space-y-8 font-outfit text-xl sm:text-2xl md:text-3xl lg:text-[43px] text-center lg:text-left"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
          >
            <p className="text-foreground leading-[1] md:leading-[1.2]">
              <span className="font-bold">Graphic and UI/UX Designer</span>, Web{" "}
              <span className="font-bold">Developer</span>, and Associate{" "}
              <span className="font-bold">Data Scientist</span>. I'm currently
              studying Artificial Intelligence at{" "}
              <span className="font-bold">ENSIA</span>.
            </p>
          </motion.div>

          {/* Buttons */}
          <motion.div
            className="flex flex-wrap justify-center lg:justify-start gap-4 sm:gap-6 pt-6 md:pt-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8, ease: "easeOut" }}
            role="group"
            aria-label="Action buttons"
          >
            <a
              href="/contact"
              className="flex justify-center items-center w-full sm:w-[220px] md:w-[250px] lg:w-[274px] h-[60px] md:h-[70px] lg:h-[79px] px-4 md:px-[74px] py-2 md:py-[29px] rounded-[61px] bg-[#BF6BB3] shadow-[0_4px_37.1px_0_rgba(222,8,212,0.79)] transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-[0_4px_45px_0_rgba(222,8,212,0.9)] focus:outline-none focus:ring-2 focus:ring-[#BF6BB3] focus:ring-offset-2 focus:ring-offset-transparent"
              aria-label="Contact Aicha Brihmouche"
            >
              <span className="whitespace-nowrap text-white font-orbitron text-lg sm:text-xl md:text-2xl lg:text-[32px] font-extrabold leading-normal opacity-[0.94] drop-shadow-[0_4px_4px_rgba(222,8,212,0.79)]">
                Contact Me
              </span>
            </a>

            <a
              href="/projects"
              className="flex justify-center items-center w-full sm:w-[220px] md:w-[250px] lg:w-[285px] h-[60px] md:h-[70px] lg:h-[79px] px-4 md:px-[74px] py-2 md:py-[29px] rounded-[61px] border-2 border-[#BF6BB3] bg-transparent shadow-[0_4px_107.9px_0_rgba(222,8,212,0.79)] cursor-pointer transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-[0_4px_120px_0_rgba(222,8,212,0.9)] focus:outline-none focus:ring-2 focus:ring-[#BF6BB3] focus:ring-offset-2 focus:ring-offset-transparent"
              aria-label="View Aicha's projects portfolio"
            >
              <span className="text-white font-orbitron text-lg sm:text-xl md:text-2xl lg:text-[32px] font-extrabold leading-normal opacity-[0.94] drop-shadow-[0_4px_4px_rgba(222,8,212,0.79)]">
                Projects
              </span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;