import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import cosmicBackground from "@/assets/image.png";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

// Import all project images
import studentPortalImg from "@/assets/projects/student-portal.png";
import vitalCareImg from "@/assets/projects/VitalCare.png";
import blogPlatformImg from "@/assets/projects/Blog-Platform.png";
import weatherAppImg from "@/assets/projects/weather-app.png";
import toDoListImg from "@/assets/projects/To-Do-List.png";
import colorPickerImg from "@/assets/projects/ColorPicker.png";
import ticTacToeImg from "@/assets/projects/TicTacToe.png";

// Design project images
import k2aUIUX1 from "@/assets/projects/K2AUIUX1.png";
import k2aUIUX2 from "@/assets/projects/K2AUIUX2.png";
import k2aUIUX3 from "@/assets/projects/K2AUIUX3.png";
import postK2A1 from "@/assets/projects/POSTK2A1.png";
import postK2A2 from "@/assets/projects/POSTK2A2.png";
import postK2A3 from "@/assets/projects/POSTK2A3.png";
import postK2A4 from "@/assets/projects/POSTK2A4.png";
import postK2A5 from "@/assets/projects/POSTK2A5.png";
import postK2A6 from "@/assets/projects/POSTK2A6.png";
import postK2A7 from "@/assets/projects/POSTK2A7.png";
import postK2A from "@/assets/projects/POSTK2A.png";
import takhassous1 from "@/assets/projects/takhassous1.png";
import takhassous2 from "@/assets/projects/takhassous2.png";
import takhassous3 from "@/assets/projects/takhassous3.png";
import takhassous4 from "@/assets/projects/takhassous4.png";
import sd1 from "@/assets/projects/SD1.png";
import sd2 from "@/assets/projects/SD2.png";
import sd3 from "@/assets/projects/SD3.png";

// Local carousel for design cards with arrows and dots
const DesignImagesCarousel = ({ images, title }: { images: string[]; title: string }) => {
  const [api, setApi] = React.useState<any>(null);
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <div className="relative">
      <Carousel setApi={setApi} className="w-full">
        <CarouselContent>
          {images.map((img, i) => (
            <CarouselItem key={i}>
              <motion.img
                src={img}
                alt={`${title} ${i + 1}`}
                className="h-40 w-auto md:h-48 mx-auto rounded-lg object-cover mt-4"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="-left-6 bg-black/40 border-0 text-white hover:bg-black/60" />
        <CarouselNext className="-right-6 bg-black/40 border-0 text-white hover:bg-black/60" />
      </Carousel>
      <div className="mt-3 flex items-center justify-center gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2 w-2 rounded-full transition-all ${
              i === current ? "w-4 bg-[#BF6BB3]" : "bg-white/40"
            }`}
            onClick={() => api?.scrollTo(i)}
          />
        ))}
      </div>
    </div>
  );
};

const Projects = () => {
  // Grouped by categories
  const categories = [
    {
      id: "design",
      title: "Graphic Design & UI/UX",
      projects: [
        {
          id: 101,
          title: "UI/UX Web Design – K2A Rental Car Business",
          description: "Website UI/UX for K2A rental cars with brand-consistent components and flows.",
          technologies: ["Figma", "Design System", "Prototyping"],
          images: [
            k2aUIUX1,
            k2aUIUX3,
            k2aUIUX2
          ],
          github: "#",
          live: "#"
        },
        {
          id: 102,
          title: "Social Media Posts – K2A Business",
          description: "Engaging post series for K2A brand promotions and campaigns.",
          technologies: ["Photoshop", "Illustrator", "Branding" , "Marketing"],
          images: [
            postK2A2,
            postK2A1,
            postK2A3,
            postK2A7,
            postK2A,
            postK2A4,
            postK2A5,
            postK2A6
          ],
          github: "#",
          live: "#"
        },
                {
          id: 103,
          title: "Social Media Posts – Takhassous Platform",
          description: "Campaign visuals for Takhassous with consistent typography and layout systems.",
          technologies: ["Photoshop", "Illustrator", "Content Design"],
          images: [
            takhassous1,
            takhassous2,
            takhassous3,
            takhassous4
          ],
          github: "#",
          live: "#"
        },
        {
          id: 104,
          title: "Logo Design – Strategy Digital",
          description: "Brand identity and logo design for Strategy Digital, a digital services company.",
          technologies: ["Illustrator", "Photoshop", "Branding"],
          images: [
            sd1,
            sd2,
            sd3
          ],
          github: "#",
          live: "#"
        }
      ]
    },
    {
      id: "web",
      title: "Web Development",
      projects: [
        {
          id: 201,
          title: "Student Portal System",
          description: "Student management portal with courses, grades, and authentication.",
          technologies: ["React", "TypeScript", "Tailwind CSS" , "MongoDB" , "Node.js" , "Express"],
          image: studentPortalImg,
          github: "https://github.com/peppa234/Student-Portal",
          live: "#"
        },
        {
          id: 202,
          title: "Vital Care Clinic Management System",
          description: "Clinic operations app for appointments, patients, and Emails.",
          technologies: ["HTML&CSS", "Bootstrap", "JQuery" , "Php" , "MySQL" , "JavaScript"],
          image: vitalCareImg,
          github: "#",
          live: "#"
        },
        {
          id: 203,
          title: "Blog Platform",
          description: "Content platform with posts (CRUD), login and register.",
          technologies: ["Node.js", "Express", "SQLlite" , "EJS" , "JavaScript" , "HTML&CSS"],
          image: blogPlatformImg,
          github: "https://github.com/peppa234/Blog-Platfrom",
          live: "#"
        },
        {
          id: 204,
          title: "Weather Application",
          description: "Weather app showing current conditions based on the city using Weather API.",
          technologies: ["HTML", "CSS", "JavaScript" , "Weather API"],
          image: weatherAppImg,
          github: "https://github.com/peppa234/Weather-App",
          live: "https://peppa234.github.io/Weather-App/"
        },
        {
          id: 205,
          title: "To-Do List App",
          description: "To do list app with options to add, delete and complete tasks",
          technologies: ["React", "JavaScript", "CSS"],
          image: toDoListImg,
          github: "https://github.com/peppa234/To-Do-List-App",
          live: "#"
        },
        {
          id: 206,
          title: "Color Picker App",
          description: "Interactive color tool with palette generation and copy-to-clipboard.",
          technologies: ["React", "JavaScript", "CSS"],
          image: colorPickerImg,
          github: "https://github.com/peppa234/ColorPickerApp",
          live: "#"
        }
      ]
    },
    {
      id: "mlai",
      title: "ML & AI",
      projects: [
        {
          id: 301,
          title: "7wess – AI Touristic App",
          description: "Trip planning assistant using AI Algorithms for 7-day itineraries.",
          technologies: ["Python", "A*", "BFS", "DFS", "CSP" , "React" , "Tailwind CSS" , "Flask"],
          image: "https://globallycool.nl/cms2022/wp-content/uploads/2021/07/vecteezy_couple-of-tourist-come-to-visit-at-wat-phra-si-sanphet_14325932-scaled.jpg",
          github: "https://github.com/Ashreeef/AI-Project-Touristic-Tour-Recommendation",
          live: "#"
        },
        {
          id: 302,
          title: "Tic Tac Toe – Minimax Agent",
          description: "Player vs Computer using Minimax with optimal strategy and Player Vs Player.",
          technologies: ["Python", "Flask","Minimax Algorithm", "HTML&CSS" , "JavaScript"],
          image: ticTacToeImg,
          github: "https://github.com/LyesHADJAR/TicTacToe",
          live: "#"
        },
        {
          id: 303,
          title: "Predictive Modeling with Linear Regression",
          description: "End-to-end regression workflow with evaluation and visualization using Linear Regression.",
          technologies: ["Python", "Pandas", "Statistics" , "StatsModels" , "seaborn" , "Matplotlib"],
          image: "https://assets.qlik.com/image/upload/w_1408/q_auto/qlik/glossary/predictive-analytics/seo-hero-predictive-analytics_l3hjxg.jpg",
          github: "https://github.com/peppa234/CodeAlpha_Predictive_Modeling_with_Linear_Regression"
        },
        {
          id: 304,
          title: "A/B Testing Analysis",
          description: "Statistical test design and analysis for product experiments using A/B Testing.",
          technologies: ["Python", "Pandas", "scikit-learn" , "Matplotlib" , "SciPy" , "Seaborn"],
          image: "https://lh5.googleusercontent.com/proxy/3mQ3nMBVtnIXEDkAYl9aL4y8Ey_d9xTy8m62ywSU04BCXPEytX4bHhwQwUaTuoL_ZJXGe7IiJ7XyfCjXejViQ09XPCC-Ww4SK_fa8aU",
          github: "https://github.com/peppa234/CodeAlpha_AB_Testing_Analysis"
        },
        {
          id: 305,
          title: "Titanic Classification",
          description: "Supervised learning for survival prediction with feature engineering.",
          technologies: ["Python", "Pandas", "scikit-learn" , "statsmodel" , "Matplotlib" , "Seaborn"],
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnfPsfgQ-g0sHtowqfP2LHp0skXAjzbXJdtA&s",
          github: "https://github.com/peppa234/CodeAlpha_Titanic_Classification"
        }
      ]
    }
  ];

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

  // Hover animation variants for project cards
  const cardHoverVariants = {
    hover: {
      scale: 1.02,
      y: -5,
      boxShadow: "0 0 30px rgba(191, 107, 179, 0.4)",
      transition: {
        duration: 0.3,
        ease: "easeOut" as const
      }
    },
    tap: {
      scale: 0.98
    }
  };

  // Stagger animation variants for project cards
  const staggerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        duration: 0.6
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  };

  // Technology tag hover variants
  const tagHoverVariants = {
    hover: {
      scale: 1.1,
      backgroundColor: "rgba(191, 107, 179, 0.4)",
      transition: { duration: 0.2 }
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
        
        {/* Projects Section */}
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
                My Projects
              </motion.h1>
              <motion.p 
                className="text-xl md:text-2xl font-outfit text-gray-300 max-w-3xl mx-0 text-left margin-top-32"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                During My 1st and 2nd year of ENSIA , I worked on various projects in the domains of design , Development and Data science & Machine Learning . 
              </motion.p>
            </motion.div>

            {categories.map((category, idx) => (
              <div key={category.id} className={idx > 0 ? "mt-20" : ""}>
                <motion.h2
                  className="text-3xl md:text-4xl font-orbitron text-white mb-8 drop-shadow-[0_0_20px_rgba(203,37,195,0.8)] text-left"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6 }}
                >
                  {category.title}
                </motion.h2>

                <motion.div 
                  className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                  variants={staggerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: 0.2 }}
                >
                  {category.projects.map((project) => (
                    <motion.div 
                      key={project.id} 
                      className="group"
                      variants={itemVariants}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      <motion.div 
                        className="bg-black/20 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-[#BF6BB3]/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(203,37,195,0.3)]"
                        variants={cardHoverVariants}
                      >
                        {/* Project Image(s) */}
                        <div className="relative overflow-hidden">
                          {Array.isArray((project as any).images) ? (
                            <DesignImagesCarousel images={(project as any).images} title={project.title} />
                          ) : (
                            <>
                              <motion.img 
                                src={(project as any).image} 
                                alt={project.title}
                                className="w-full h-48 object-cover object-top"
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                            </>
                          )}
                        </div>

                        {/* Project Content */}
                        <div className="p-6">
                          <motion.h3 
                            className="text-2xl font-orbitron text-white mb-3 drop-shadow-[0_0_15px_rgba(203,37,195,1)]"
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.2 }}
                          >
                            {project.title}
                          </motion.h3>
                          <motion.p 
                            className="text-gray-300 text-sm leading-relaxed mb-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                          >
                            {project.description}
                          </motion.p>

                          {/* Technologies */}
                          <motion.div 
                            className="flex flex-wrap gap-2 mb-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                          >
                            {project.technologies.map((tech, index) => (
                              <motion.span 
                                key={index}
                                className="px-3 py-1 bg-[#BF6BB3]/20 text-[#BF6BB3] text-xs rounded-full border border-[#BF6BB3]/30 cursor-pointer"
                                variants={tagHoverVariants}
                                whileHover="hover"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.5 + index * 0.1 }}
                              >
                                {tech}
                              </motion.span>
                            ))}
                          </motion.div>

                          {/* Project Links - Only show for non-design projects */}
                          {category.id !== "design" && (
                            <motion.div 
                              className="flex gap-3"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.6 }}
                            >
                              <motion.a 
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 bg-[#BF6BB3] hover:bg-[#BF6BB3]/80 text-white text-center py-2 px-4 rounded-lg transition-all duration-300 font-medium"
                                whileHover={{ 
                                  scale: 1.05,
                                  boxShadow: "0 0 15px rgba(191, 107, 179, 0.6)"
                                }}
                                whileTap={{ scale: 0.95 }}
                              >
                                GitHub
                              </motion.a>
                              {/* Only show Live Demo for weather app */}
                              {project.id === 204 && (
                                <motion.a 
                                  href={project.live}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex-1 bg-transparent border border-[#BF6BB3] text-[#BF6BB3] hover:bg-[#BF6BB3] hover:text-white text-center py-2 px-4 rounded-lg transition-all duration-300 font-medium"
                                  whileHover={{ 
                                    scale: 1.05,
                                    boxShadow: "0 0 15px rgba(191, 107, 179, 0.6)"
                                  }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  Live Demo
                                </motion.a>
                              )}
                            </motion.div>
                          )}
                        </div>
                      </motion.div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        <Footer />
      </div>
      
      {/* Chatbot - Fixed Position */}
      <Chatbot />
    </div>
  );
};

export default Projects;
