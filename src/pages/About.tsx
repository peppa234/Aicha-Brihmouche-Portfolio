import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import cosmicBackground from "@/assets/image.png";
import AboutMeImage from "../assets/AboutMeImage.jpg";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const About = () => {
  const [selectedStop, setSelectedStop] = useState(0);
  const [hoveredStop, setHoveredStop] = useState<number | null>(null);

  const journeyStops = [
    {
      id: 0,
      year: "2023",
      title: "High School Graduation",
      location: "Jijel, Algeria",
      description: "Completed high school with a focus on mathematics and sciences. Alongside studies, managed marketing & design for several Baccalaureate-support accounts, growing some to 2K+ followers in a month and one to 5K+ followers.",
      type: "education",
      icon: "🎓"
    },
    {
      id: 1,
      year: "2023-2024",
      title: "ENSIA 1st Year",
      location: "National Higher School of Artificial Intelligence",
      description: "Started academic journey in computer science & AI, while applying fundamentals through projects.",
      type: "education",
      icon: "🏛️"
    },
    {
      id: 2,
      year: "2024 Summer",
      title: "2K24 Projects",
      location: "Algiers, Algeria",
      description: "Worked on ML & DS projects through Datacamp tracks and completed a Data Science internship at CodeAlpha, while also doing Web Development work.",
      type: "project",
      icon: "💻"
    },
    {
      id: 3,
      year: "2024-2025",
      title: "ENSIA 2nd Year",
      location: "National Higher School of Artificial Intelligence",
      description: "Worked on academic projects such as VitalCare and 7wess, integrating web development and AI solutions.",
      type: "education",
      icon: "🌟"
    },
    {
      id: 4,
      year: "2025",
      title: "Roles at ETC",
      location: "ENSIA Tech Community",
      description: "Served as Marketing Manager, Community Manager, and External Relations Manager for the school's scientific club.",
      type: "extracurricular",
      icon: "🎯"
    },
    {
      id: 5,
      year: "2025 Summer",
      title: "2K25 Projects",
      location: "Algiers, Algeria",
      description: "Worked as Designer & Marketing Manager for K2A Auto (UI/UX design, social media, flyers, branding) and as designer for multiple businesses. Also developed personal projects in AI & Web Dev, including full-stack management systems and backend solutions.",
      type: "project",
      icon: "🚀"
    }
  ];

  const getStopColor = (type: string) => {
    switch (type) {
      case 'education': return 'from-blue-500 to-cyan-500';
      case 'project': return 'from-purple-500 to-pink-500';
      case 'extracurricular': return 'from-orange-500 to-yellow-500';
      case 'future': return 'from-green-500 to-emerald-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getStopBorderColor = (type: string) => {
    switch (type) {
      case 'education': return 'border-blue-400';
      case 'project': return 'border-purple-400';
      case 'extracurricular': return 'border-orange-400';
      case 'future': return 'border-green-400';
      default: return 'border-gray-400';
    }
  };

  // Function to handle stop click and scroll to description
  const handleStopClick = (stopId: number) => {
    setSelectedStop(stopId);
    
    // Smooth scroll to the description section
    setTimeout(() => {
      const descriptionSection = document.getElementById('stop-description');
      if (descriptionSection) {
        descriptionSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest'
        });
      }
    }, 100); // Small delay to ensure state update and animation start
  };

  // Floating animation variants
  const floatingVariants = {
    float: {
      y: [-10, 10, -10],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut" as const
      }
    }
  };

  // Hover animation variants
  const hoverVariants = {
    hover: {
      scale: 1.05,
      rotateY: 5,
      transition: {
        duration: 0.3,
        ease: "easeOut" as const
      }
    },
    tap: {
      scale: 0.95
    }
  };

  // Timeline dot animation variants
  const dotVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const
      }
    },
    hover: { 
      scale: 1.5,
      boxShadow: "0 0 20px rgba(191, 107, 179, 0.8)",
      transition: {
        duration: 0.2
      }
    }
  };

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
        {[...Array(20)].map((_, i) => (
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
        
        {/* About Section */}
        <div className="pt-32 pb-16 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.h1 
                className="text-5xl md:text-7xl font-orbitron text-white mb-6 drop-shadow-[0_0_25.2px_rgba(203,37,195,1)] text-left"
                animate={{ 
                  textShadow: [
                    "0 0 25.2px rgba(203,37,195,1)",
                    "0 0 35px rgba(203,37,195,1)",
                    "0 0 25.2px rgba(203,37,195,1)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                My Journey
              </motion.h1>
              <motion.p  
                className="text-xl md:text-2xl font-outfit text-gray-300 max-w-3xl mx-0 text-left"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                Discover my journey and the roles I've held in clubs and companies
              </motion.p>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-12 items-start">
              {/* Profile Section */}
              <motion.div 
                className="lg:col-span-1"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <motion.div 
                  className="bg-black/20 backdrop-blur-sm rounded-2xl p-8 border border-white/10 sticky top-32"
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 0 30px rgba(191, 107, 179, 0.3)"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-center mb-6">
                    <motion.div 
                      className="relative inline-block"
                      variants={floatingVariants}
                      animate="float"
                    >
                      <img 
                        src={AboutMeImage} 
                        alt="Profile" 
                        className="w-48 h-48 rounded-full object-cover border-4 border-[#BF6BB3] shadow-[0_0_50px_rgba(203,37,195,0.5)]"
                      />
                      <motion.div 
                        className="absolute inset-0 rounded-full border-4 border-transparent bg-gradient-to-r from-[#BF6BB3] to-[#8B5CF6] opacity-20"
                        animate={{ 
                          rotate: 360,
                          scale: [1, 1.1, 1]
                        }}
                        transition={{ 
                          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                          scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                        }}
                      />
                    </motion.div>
                    <motion.h2 
                      className="text-2xl font-orbitron text-white mt-4 drop-shadow-[0_0_15px_rgba(203,37,195,1)]"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      Aicha Brihmouche
                    </motion.h2>
                    <p className="text-gray-300 font-outfit text-lg">AI & Data Science Student</p>
                  </div>

                  <div className="space-y-4">
                    <motion.div 
                      className="text-center"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      <h3 className="text-lg font-orbitron text-white mb-2">Current Status</h3>
                      <p className="text-gray-300 font-outfit">3rd Year ENSIA Student</p>
                    </motion.div>
                    <motion.div 
                      className="text-center"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      <h3 className="text-lg font-orbitron text-white mb-2">Focus Areas</h3>
                      <div className="flex flex-wrap justify-center gap-2">
                        {["Development", "Data Science", "ML/AI" , "Design" , "Cyber Security"].map((area, index) => (
                          <motion.span 
                            key={area}
                            className="px-3 py-1 bg-[#BF6BB3]/20 text-[#BF6BB3] text-sm rounded-full border border-[#BF6BB3]/30"
                            whileHover={{ 
                              scale: 1.1,
                              backgroundColor: "rgba(191, 107, 179, 0.4)"
                            }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2, delay: 0.8 + index * 0.1 }}
                          >
                            {area}
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Interactive Timeline */}
              <motion.div 
                className="lg:col-span-2"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <div className="relative">
                  {/* Animated Timeline Line */}
                  <motion.div 
                    className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-[#BF6BB3] via-purple-500 to-green-500"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 1.5, delay: 1 }}
                    style={{ transformOrigin: "top" }}
                  />

                  {/* Timeline Stops */}
                  <div className="space-y-8">
                    {journeyStops.map((stop, index) => (
                      <motion.div
                        key={stop.id}
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.2 + index * 0.2 }}
                        className="relative group cursor-pointer"
                        onHoverStart={() => setHoveredStop(stop.id)}
                        onHoverEnd={() => setHoveredStop(null)}
                        onClick={() => handleStopClick(stop.id)}
                      >
                        {/* Animated Timeline Dot */}
                        <motion.div 
                          className={`absolute left-6 w-4 h-4 rounded-full bg-gradient-to-r ${getStopColor(stop.type)} border-2 ${getStopBorderColor(stop.type)} transform -translate-x-1/2 z-10`}
                          variants={dotVariants}
                          initial="initial"
                          animate="animate"
                          whileHover="hover"
                          whileTap="tap"
                        />

                        {/* Content Card */}
                        <motion.div 
                          className={`ml-16 p-6 rounded-2xl border transition-all duration-300 ${
                            hoveredStop === stop.id 
                              ? 'bg-[#BF6BB3]/20 border-[#BF6BB3] shadow-[0_0_30px_rgba(203,37,195,0.3)]' 
                              : 'bg-black/20 border-white/10'
                          }`}
                          variants={hoverVariants}
                          whileHover="hover"
                          whileTap="tap"
                          animate={{
                            y: hoveredStop === stop.id ? -5 : 0,
                            rotateY: hoveredStop === stop.id ? 2 : 0
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center space-x-3">
                              <motion.span 
                                className="text-3xl"
                                animate={{ 
                                  rotate: hoveredStop === stop.id ? [0, -10, 10, 0] : 0,
                                  scale: hoveredStop === stop.id ? 1.2 : 1
                                }}
                                transition={{ duration: 0.3 }}
                              >
                                {stop.icon}
                              </motion.span>
                              <div>
                                <h3 className="text-xl font-orbitron text-white drop-shadow-[0_0_10px_rgba(203,37,195,1)]">
                                  {stop.title}
                                </h3>
                                <p className="text-[#BF6BB3] font-medium">{stop.location}</p>
                              </div>
                            </div>
                            <motion.span 
                              className="text-2xl font-orbitron text-white/60 bg-black/30 px-3 py-1 rounded-lg"
                              whileHover={{ scale: 1.1, backgroundColor: "rgba(0,0,0,0.5)" }}
                              transition={{ duration: 0.2 }}
                            >
                              {stop.year}
                            </motion.span>
                          </div>
                          
                          <p className="text-gray-300 font-outfit leading-relaxed">
                            {stop.description}
                          </p>

                          {/* Type Badge */}
                          <motion.div 
                            className="mt-4"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.2 }}
                          >
                                                         <span className={`px-3 py-1 text-xs rounded-full capitalize ${
                               stop.type === 'education' ? 'bg-blue-500/20 text-blue-300 border border-blue-400/30' :
                               stop.type === 'project' ? 'bg-purple-500/20 text-purple-300 border border-purple-400/30' :
                               stop.type === 'extracurricular' ? 'bg-orange-500/20 text-orange-300 border border-orange-400/30' :
                               'bg-green-500/20 text-green-300 border border-green-400/30'
                             }`}>
                               {stop.type}
                             </span>
                          </motion.div>
                        </motion.div>

                        {/* Animated Connection Line */}
                        {index < journeyStops.length - 1 && (
                          <motion.div 
                            className="absolute left-8 w-1 h-8 bg-gradient-to-b from-[#BF6BB3] to-purple-500 transform -translate-x-1/2 top-full"
                            initial={{ scaleY: 0 }}
                            animate={{ scaleY: 1 }}
                            transition={{ delay: 1.5 + index * 0.2, duration: 0.5 }}
                            style={{ transformOrigin: "top" }}
                          />
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Selected Stop Details */}
            <AnimatePresence mode="wait">
              {selectedStop !== null && (
                <motion.div
                  id="stop-description"
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="mt-16 bg-black/30 backdrop-blur-sm rounded-2xl p-8 border border-[#BF6BB3]/30"
                >
                  <motion.div 
                    className="text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h3 className="text-3xl font-orbitron text-white mb-4 drop-shadow-[0_0_15px_rgba(203,37,195,1)]">
                      {journeyStops[selectedStop].title}
                    </h3>
                    <p className="text-xl text-gray-300 font-outfit mb-6">
                      {journeyStops[selectedStop].description}
                    </p>
                    
                                         {/* Additional details based on stop type */}
                     <AnimatePresence mode="wait">
                       {/* High School Graduation */}
                       {selectedStop === 0 && (
                         <motion.div 
                           className="grid md:grid-cols-2 gap-12"
                           initial={{ opacity: 0, y: 20 }}
                           animate={{ opacity: 1, y: 0 }}
                           transition={{ delay: 0.3 }}
                         >
                           <motion.div 
                             className="bg-black/20 rounded-xl p-6 border border-white/10"
                             whileHover={{ scale: 1.02, borderColor: "rgba(191, 107, 179, 0.5)" }}
                             transition={{ duration: 0.3 }}
                           >
                             <h4 className="text-xl font-orbitron font-bold text-white mb-3 drop-shadow-[0_0_10px_rgba(203,37,195,1)]">What I Gained</h4>
                             <ul className="text-gray-300 font-outfit space-y-2">
                               <li>• Strong foundation in analytical thinking and problem-solving</li>
                               <li>• First-hand experience in digital marketing & content growth</li>
                               <li>• Confidence in balancing academics with real-world projects</li>
                             </ul>
                           </motion.div>
                           <motion.div 
                             className="bg-black/20 rounded-xl p-6 border border-white/10"
                             whileHover={{ scale: 1.02, borderColor: "rgba(191, 107, 179, 0.5)" }}
                             transition={{ duration: 0.3 }}
                           >
                             <h4 className="text-xl font-orbitron font-bold text-white mb-3 drop-shadow-[0_0_10px_rgba(203,37,195,1)]">Skills Strengthened</h4>
                             <ul className="text-gray-300 font-outfit space-y-2">
                               <li>• Social media growth strategy</li>
                               <li>• Graphic design & visual branding</li>
                               <li>• Community engagement</li>
                             </ul>
                           </motion.div>
                         </motion.div>
                       )}

                       {/* ENSIA 1st Year */}
                       {selectedStop === 1 && (
                         <motion.div 
                           className="grid md:grid-cols-2 gap-12"
                           initial={{ opacity: 0, y: 20 }}
                           animate={{ opacity: 1, y: 0 }}
                           transition={{ delay: 0.3 }}
                         >
                           <motion.div 
                             className="bg-black/20 rounded-xl p-6 border border-white/10"
                             whileHover={{ scale: 1.02, borderColor: "rgba(191, 107, 179, 0.5)" }}
                             transition={{ duration: 0.3 }}
                           >
                             <h4 className="text-xl font-orbitron font-bold text-white mb-3 drop-shadow-[0_0_10px_rgba(203,37,195,1)]">What I Gained</h4>
                             <ul className="text-gray-300 font-outfit space-y-2">
                               <li>• Understanding of programming, algorithms, and AI concepts</li>
                               <li>• First experience in building a basic web development project</li>
                               <li>• Teamwork and technical collaboration at an academic level</li>
                             </ul>
                           </motion.div>
                           <motion.div 
                             className="bg-black/20 rounded-xl p-6 border border-white/10"
                             whileHover={{ scale: 1.02, borderColor: "rgba(191, 107, 179, 0.5)" }}
                             transition={{ duration: 0.3 }}
                           >
                             <h4 className="text-xl font-orbitron font-bold text-white mb-3 drop-shadow-[0_0_10px_rgba(203,37,195,1)]">Skills Strengthened</h4>
                             <ul className="text-gray-300 font-outfit space-y-2">
                               <li>• Python & C programming basics</li>
                               <li>• Web development fundamentals (HTML, CSS, JS)</li>
                               <li>• Academic research methods</li>
                             </ul>
                           </motion.div>
                         </motion.div>
                       )}

                       {/* 2K24 Projects */}
                       {selectedStop === 2 && (
                         <motion.div 
                           className="grid md:grid-cols-2 gap-x-12 gap-y-8"
                           initial={{ opacity: 0, y: 20 }}
                           animate={{ opacity: 1, y: 0 }}
                           transition={{ delay: 0.3 }}
                         >
                           <motion.div 
                             className="bg-black/20 rounded-xl p-6 border border-white/10"
                             whileHover={{ scale: 1.02, borderColor: "rgba(191, 107, 179, 0.5)" }}
                             transition={{ duration: 0.3 }}
                           >
                             <h4 className="text-xl font-orbitron font-bold text-white mb-3 drop-shadow-[0_0_10px_rgba(203,37,195,1)]">What I Gained</h4>
                             <ul className="text-gray-300 font-outfit space-y-2">
                               <li>• Hands-on practice with machine learning workflows & data analysis</li>
                               <li>• Exposure to real-world DS projects during internship</li>
                               <li>• Confidence in combining self-learning with applied practice</li>
                             </ul>
                           </motion.div>
                           <motion.div 
                             className="bg-black/20 rounded-xl p-6 border border-white/10"
                             whileHover={{ scale: 1.02, borderColor: "rgba(191, 107, 179, 0.5)" }}
                             transition={{ duration: 0.3 }}
                           >
                             <h4 className="text-xl font-orbitron font-bold text-white mb-3 drop-shadow-[0_0_10px_rgba(203,37,195,1)]">Skills Strengthened</h4>
                             <ul className="text-gray-300 font-outfit space-y-2">
                               <li>• Python for ML/DS (Pandas, NumPy, Scikit-learn)</li>
                               <li>• Data cleaning & visualization</li>
                               <li>• Web development basics</li>
                             </ul>
                           </motion.div>
                           <motion.div 
                             className="bg-black/20 rounded-xl p-6 border border-white/10"
                             whileHover={{ scale: 1.02, borderColor: "rgba(191, 107, 179, 0.5)" }}
                             transition={{ duration: 0.3 }}
                           >
                             <h4 className="text-xl font-orbitron font-bold text-white mb-3 drop-shadow-[0_0_10px_rgba(203,37,195,1)]">Technologies Used</h4>
                             <ul className="text-gray-300 font-outfit space-y-2">
                               <li>• Python libraries (Pandas, NumPy, Scikit-learn)</li>
                               <li>• Data Science tools and platforms</li>
                               <li>• Web development frameworks</li>
                             </ul>
                           </motion.div>
                           <motion.div 
                             className="bg-black/20 rounded-xl p-6 border border-white/10"
                             whileHover={{ scale: 1.02, borderColor: "rgba(191, 107, 179, 0.5)" }}
                             transition={{ duration: 0.3 }}
                           >
                             <h4 className="text-xl font-orbitron font-bold text-white mb-3 drop-shadow-[0_0_10px_rgba(203,37,195,1)]">Outcomes</h4>
                             <ul className="text-gray-2">
                               <li>• Completed ML/DS projects and internship</li>
                               <li>• Gained practical experience in data analysis</li>
                               <li>• Developed web development skills</li>
                             </ul>
                           </motion.div>
                         </motion.div>
                       )}

                       {/* ENSIA 2nd Year */}
                       {selectedStop === 3 && (
                         <motion.div 
                           className="grid md:grid-cols-2 gap-12"
                           initial={{ opacity: 0, y: 20 }}
                           animate={{ opacity: 1, y: 0 }}
                           transition={{ delay: 0.3 }}
                         >
                           <motion.div 
                             className="bg-black/20 rounded-xl p-6 border border-white/10"
                             whileHover={{ scale: 1.02, borderColor: "rgba(191, 107, 179, 0.5)" }}
                             transition={{ duration: 0.3 }}
                           >
                             <h4 className="text-xl font-orbitron font-bold text-white mb-3 drop-shadow-[0_0_10px_rgba(203,37,195,1)]">What I Gained</h4>
                             <ul className="text-gray-300 font-outfit space-y-2">
                               <li>• Practical experience in applying AI & Web Dev concepts to real projects</li>
                               <li>• Deeper understanding of teamwork & project collaboration</li>
                               <li>• Skills in presenting technical solutions effectively</li>
                             </ul>
                           </motion.div>
                           <motion.div 
                             className="bg-black/20 rounded-xl p-6 border border-white/10"
                             whileHover={{ scale: 1.02, borderColor: "rgba(191, 107, 179, 0.5)" }}
                             transition={{ duration: 0.3 }}
                           >
                             <h4 className="text-xl font-orbitron font-bold text-white mb-3 drop-shadow-[0_0_10px_rgba(203,37,195,1)]">Skills Strengthened</h4>
                             <ul className="text-gray-300 font-outfit space-y-2">
                               <li>• Full-stack development (frontend + backend basics)</li>
                               <li>• AI model integration into applications</li>
                               <li>• Project collaboration & communication</li>
                             </ul>
                           </motion.div>
                         </motion.div>
                       )}

                       {/* Roles at ETC */}
                       {selectedStop === 4 && (
                         <motion.div 
                           className="grid md:grid-cols-2 gap-x-12 gap-y-8"
                           initial={{ opacity: 0, y: 20 }}
                           animate={{ opacity: 1, y: 0 }}
                           transition={{ delay: 0.3 }}
                         >
                           <motion.div 
                             className="bg-black/20 rounded-xl p-6 border border-white/10"
                             whileHover={{ scale: 1.02, borderColor: "rgba(191, 107, 179, 0.5)" }}
                             transition={{ duration: 0.3 }}
                           >
                             <h4 className="text-xl font-orbitron font-bold text-white mb-3 drop-shadow-[0_0_10px_rgba(203,37,195,1)]">What I Gained</h4>
                             <ul className="text-gray-300 font-outfit space-y-2">
                               <li>• Leadership in managing teams and external partnerships</li>
                               <li>• Experience organizing and promoting tech events</li>
                               <li>• Networking with industry and academic partners</li>
                             </ul>
                           </motion.div>
                           <motion.div 
                             className="bg-black/20 rounded-xl p-6 border border-white/10"
                             whileHover={{ scale: 1.02, borderColor: "rgba(191, 107, 179, 0.5)" }}
                             transition={{ duration: 0.3 }}
                           >
                             <h4 className="text-xl font-orbitron font-bold text-white mb-3 drop-shadow-[0_0_10px_rgba(203,37,195,1)]">Skills Strengthened</h4>
                             <ul className="text-gray-300 font-outfit space-y-2">
                               <li>• Marketing strategy & event promotion</li>
                               <li>• External relations & sponsorship management</li>
                               <li>• Community growth & member engagement</li>
                             </ul>
                           </motion.div>
                           <motion.div 
                            className="bg-black/20 rounded-xl p-6 border border-white/10"
                            whileHover={{ scale: 1.02, borderColor: "rgba(191, 107, 179, 0.5)" }}
                            transition={{ duration: 0.3 }}
                          >
                            <h4 className="text-xl font-orbitron font-bold text-white mb-3 drop-shadow-[0_0_10px_rgba(203,37,195,1)]">Roles Held</h4>
                            <ul className="text-gray-300 font-outfit space-y-2">
                              <li>• Marketing Manager</li>
                              <li>• Community Manager</li>
                              <li>• External Relations Manager</li>
                            </ul>
                          </motion.div>
                          <motion.div 
                            className="bg-black/20 rounded-xl p-6 border border-white/10"
                            whileHover={{ scale: 1.02, borderColor: "rgba(191, 107, 179, 0.5)" }}
                            transition={{ duration: 0.3 }}
                          >
                            <h4 className="text-xl font-orbitron font-bold text-white mb-3 drop-shadow-[0_0_10px_rgba(203,37,195,1)]">Achievements</h4>
                            <ul className="text-gray-300 font-outfit space-y-2">
                              <li>• Successfully managed marketing campaigns</li>
                              <li>• Built and maintained strong community connections</li>
                              <li>• Established effective external relations</li>
                            </ul>
                          </motion.div>
                         </motion.div>
                       )}

                       {/* 2K25 Projects */}
                       {selectedStop === 5 && (
                         <motion.div 
                           className="grid md:grid-cols-2 gap-12"
                           initial={{ opacity: 0, y: 20 }}
                           animate={{ opacity: 1, y: 0 }}
                           transition={{ delay: 0.3 }}
                         >
                           <motion.div 
                             className="bg-black/20 rounded-xl p-6 border border-white/10"
                             whileHover={{ scale: 1.02, borderColor: "rgba(191, 107, 179, 0.5)" }}
                             transition={{ duration: 0.3 }}
                           >
                             <h4 className="text-xl font-orbitron font-bold text-white mb-3 drop-shadow-[0_0_10px_rgba(203,37,195,1)]">What I Gained</h4>
                             <ul className="text-gray-300 font-outfit space-y-2">
                               <li>• Experience blending technical dev with design & marketing</li>
                               <li>• Deeper practice in professional branding & UI/UX</li>
                               <li>• Independence in building and managing full projects end-to-end</li>
                             </ul>
                           </motion.div>
                           <motion.div 
                             className="bg-black/20 rounded-xl p-6 border border-white/10"
                             whileHover={{ scale: 1.02, borderColor: "rgba(191, 107, 179, 0.5)" }}
                             transition={{ duration: 0.3 }}
                           >
                             <h4 className="text-xl font-orbitron font-bold text-white mb-3 drop-shadow-[0_0_10px_rgba(203,37,195,1)]">Skills Strengthened</h4>
                             <ul className="text-gray-300 font-outfit space-y-2">
                               <li>• UI/UX design (Figma, prototypes, user flows)</li>
                               <li>• Social media & marketing content design</li>
                               <li>• Full-stack web development & backend systems</li>
                               <li>• AI project experimentation</li>
                             </ul>
                           </motion.div>
                         </motion.div>
                       )}

                     

                      
                    </AnimatePresence>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <Footer />
      </div>
      
      {/* Chatbot - Fixed Position */}
      <Chatbot />
    </div>
  );
};

export default About;
