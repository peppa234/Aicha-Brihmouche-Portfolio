import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button-variants";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
// Skill logos
import ReactLogo from "@/assets/skills&tools/React.svg";
import JsLogo from "@/assets/skills&tools/js.svg";
import TypeScriptLogo from "@/assets/skills&tools/typescript.svg";
import NodeLogo from "@/assets/skills&tools/nodeJs.svg";
import ExpressLogo from "@/assets/skills&tools/expressJs.svg";
import HtmlLogo from "@/assets/skills&tools/html.svg";
import CssLogo from "@/assets/skills&tools/css.svg";
import PhpLogo from "@/assets/skills&tools/php.svg";
import TailwindLogo from "@/assets/skills&tools/tailwind.svg";
import MongoLogo from "@/assets/skills&tools/MongoDB.svg";
import PostgresLogo from "@/assets/skills&tools/PostgreSQL.svg";
import MysqlLogo from "@/assets/skills&tools/MySQL.svg";
import BootstrapLogo from "@/assets/skills&tools/bootstrap.svg";
import FlaskLogo from "@/assets/skills&tools/Flask.svg";
import FigmaLogo from "@/assets/skills&tools/Figma.svg";
import PhotoshopLogo from "@/assets/skills&tools/photoshop.svg";
import IllustratorLogo from "@/assets/skills&tools/illustrator.svg";
import CanvaLogo from "@/assets/skills&tools/canva.svg";
import PythonLogo from "@/assets/skills&tools/python.svg";
import PandasLogo from "@/assets/skills&tools/pandas.svg";
import NumpyLogo from "@/assets/skills&tools/NumPy.svg";
import SklearnLogo from "@/assets/skills&tools/sickit-learn.svg";
import StatsmodelsLogo from "@/assets/skills&tools/statsmodels.svg";
import MatplotlibLogo from "@/assets/skills&tools/matplotlib.svg";
import SeabornLogo from "@/assets/skills&tools/seaborn.svg";
import PytorchLogo from "@/assets/skills&tools/PyTorch.svg";
import TensorflowLogo from "@/assets/skills&tools/Tenserflow.svg";
import OpencvLogo from "@/assets/skills&tools/OpenCv.svg";
import JupyterLogo from "@/assets/skills&tools/Jupyter.svg";

const SkillsSection = () => {
  // Debug logging - remove in production
  // console.log('SkillsSection: Component rendering');
  
  const sections = [
    {
      title: "Web Development Stack",
      icon: "💻",
      description: "Technologies for building modern web applications and systems",
      tools: [
        { name: "React", level: "Advanced", logo: ReactLogo },
        { name: "JavaScript", level: "Advanced", logo: JsLogo },
        { name: "TypeScript", level: "Intermediate", logo: TypeScriptLogo },
        { name: "Node.js", level: "Advanced", logo: NodeLogo },
        { name: "Express.js", level: "Intermediate", logo: ExpressLogo },
        { name: "HTML", level: "Advanced", logo: HtmlLogo },
        { name: "CSS", level: "Advanced", logo: CssLogo },
        { name: "PHP", level: "Advanced", logo: PhpLogo },
        { name: "Tailwind CSS", level: "Advanced", logo: TailwindLogo },
        { name: "MongoDB", level: "Intermediate", logo: MongoLogo },
        { name: "PostgreSQL", level: "Intermediate", logo: PostgresLogo },
        { name: "MySQL", level: "Advanced", logo: MysqlLogo },
        { name: "Bootstrap", level: "Advanced", logo: BootstrapLogo },
        { name: "Flask", level: "Intermediate", logo: FlaskLogo }
      ]
    },
    {
      title: "Design Tools",
      icon: "🎨",
      description: "Creative tools for visual design and user experience",
      tools: [
        { name: "Figma", level: "Advanced", logo: FigmaLogo },
        { name: "Photoshop", level: "Intermediate", logo: PhotoshopLogo },
        { name: "Illustrator", level: "Intermediate", logo: IllustratorLogo },
        { name: "Canva", level: "Advanced", logo: CanvaLogo }
      ]
    },
   
    {
      title: "Data Science & AI Tools",
      icon: "🤖",
      description: "Comprehensive tools for data analysis, machine learning, and computer vision",
      tools: [
        { name: "Python", level: "Advanced", logo: PythonLogo },
        { name: "Pandas", level: "Advanced", logo: PandasLogo },
        { name: "NumPy", level: "Advanced", logo: NumpyLogo },
        { name: "Scikit-learn", level: "Advanced", logo: SklearnLogo },
        { name: "StatsModels", level: "Intermediate", logo: StatsmodelsLogo },
        { name: "Matplotlib", level: "Advanced", logo: MatplotlibLogo },
        { name: "Seaborn", level: "Advanced", logo: SeabornLogo },
        { name: "PyTorch", level: "Intermediate", logo: PytorchLogo },
        { name: "TensorFlow", level: "Intermediate", logo: TensorflowLogo },
        { name: "OpenCV", level: "Intermediate", logo: OpencvLogo },
        { name: "Jupyter", level: "Advanced", logo: JupyterLogo }
      ]
    }
  ];

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
  };

  const skillRowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut" as const
      }
    }
  };

  const staggerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  return (
    <section className="py-12 md:py-20 px-4 sm:px-6">
      <div className="container mx-auto">
        {/* Debug info - remove in production */}
        {/* <div className="text-white text-xs mb-4 bg-red-500/20 p-2 rounded">
          <div>Skills Section Loaded - {sections.length} sections</div>
          <div>Window width: {window.innerWidth}px</div>
          <div>Is mobile: {window.innerWidth < 768 ? 'Yes' : 'No'}</div>
          <div>User agent: {navigator.userAgent.includes('Mobile') ? 'Mobile' : 'Desktop'}</div>
        </div> */}
        {/* Title & Subheading */}
        <motion.div 
          className="mb-8 md:mb-16 text-center"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl font-orbitron font-bold text-white drop-shadow-[0_0_28.9px_rgba(203,37,195,1)] mb-4"
            animate={{ 
              textShadow: [
                "0 0 28.9px rgba(203,37,195,1)",
                "0 0 35px rgba(203,37,195,1)",
                "0 0 28.9px rgba(203,37,195,1)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Skills & Tools
          </motion.h2>
          <motion.p 
            className="text-base sm:text-lg font-outfit text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            These are the tools I use to turn ideas into experiences whether in code, design, or data.
          </motion.p>
        </motion.div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {sections.map((section, index) => {
            const cardRef = useRef(null);
            const isInView = useInView(cardRef, { 
              once: true, 
              margin: "-20px",
              amount: 0.1  // Trigger when 10% of element is visible
            });
            
            // console.log(`SkillsSection: Section ${index} (${section.title}) - isInView:`, isInView);
            
            return (
              <motion.div 
                key={index} 
                className="flex flex-col items-center"
                ref={cardRef}
                variants={cardVariants}
                initial="hidden"
                animate={isInView ? "visible" : "visible"}  // Always show content
                transition={{ delay: index * 0.2 }}
              >
                {/* Enhanced Card Design */}
                <motion.div
                  className="w-full bg-black/20 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/10 hover:border-[#BF6BB3]/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(203,37,195,0.3)] group"
                  whileHover={{ 
                    scale: 1.02,
                    y: -5
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Card Header */}
                  <div className="text-center mb-6">
                    <motion.div 
                      className="text-4xl md:text-5xl mb-3"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      {section.icon}
                    </motion.div>
                    <motion.h3 
                      className="text-xl md:text-2xl font-orbitron font-bold text-white mb-2 drop-shadow-[0_0_15px_rgba(203,37,195,1)]"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      {section.title}
                    </motion.h3>
                    <p className="text-gray-300 font-outfit text-sm">
                      {section.description}
                    </p>
                  </div>

                  {/* Interactive Skill Rows */}
                  <motion.div 
                    className="space-y-3 md:space-y-4"
                    variants={staggerVariants}
                    initial="hidden"
                    animate="visible"  // Always show content
                  >
                    {section.tools.map((tool, i) => (
                      <motion.div
                        key={i}
                        className="group/skill relative overflow-hidden"
                        variants={skillRowVariants}
                        whileHover={{ scale: 1.02, x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        {/* Skill Row Background */}
                        <div className="absolute inset-0 bg-gradient-to-r from-[#BF6BB3]/10 to-transparent opacity-0 group-hover/skill:opacity-100 transition-opacity duration-300 rounded-xl" />
                        
                        {/* Skill Row Content */}
                        <div className="relative w-full min-h-[70px] md:min-h-[80px] bg-[rgba(255,255,255,0.05)] border border-[#BF6BB3]/30 rounded-xl shadow-[0_2px_15px_0_rgba(191,107,179,0.20)] flex items-center justify-between p-3 md:p-4 hover:border-[#BF6BB3] hover:shadow-[0_0_20px_rgba(191,107,179,0.4)] transition-all duration-300">
                          {/* Left: Logo + Name */}
                          <div className="flex items-center gap-3 md:gap-4 min-w-0 flex-shrink">
                            <motion.div
                              whileHover={{ scale: 1.1, rotate: 5 }}
                              transition={{ duration: 0.2 }}
                            >
                              <img 
                                src={tool.logo} 
                                alt={tool.name} 
                                className="w-8 h-8 md:w-10 md:h-10 flex-shrink-0"
                                onError={(e) => {
                                  e.currentTarget.style.display = 'none';
                                }}
                                loading="lazy"
                              />
                            </motion.div>
                            <span className="text-white font-medium text-base md:text-lg truncate group-hover/skill:text-[#BF6BB3] transition-colors duration-300">
                              {tool.name}
                            </span>
                          </div>

                          {/* Right: Skill Level */}
                          <div className="flex-shrink-0 ml-2">
                            <motion.span
                              className={`inline-block whitespace-nowrap px-3 py-1 md:px-4 md:py-1.5 rounded-full text-xs md:text-sm font-medium text-white transition-all duration-300 ${
                                tool.level === "Advanced" 
                                  ? "bg-[#BF6BB3] hover:bg-[#BF6BB3]/80" 
                                  : "bg-[#3B4CCA] hover:bg-[#3B4CCA]/80"
                              }`}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              {tool.level}
                            </motion.span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>

                {/* Enhanced Button */}
                <motion.div 
                  className="mt-6 w-full flex justify-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* <Button
                      className={`${buttonVariants({ variant: "cosmic", size: "lg" })} font-orbitron font-extrabold drop-shadow-[0_0_15px_rgba(203,37,195,1)] hover:shadow-[0_0_25px_rgba(203,37,195,0.8)] transition-all duration-300`}
                    >
                      Discover Projects
                    </Button> */}
                  </motion.div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
