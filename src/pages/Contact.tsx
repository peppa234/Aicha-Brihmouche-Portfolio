import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import cosmicBackground from "@/assets/image.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from '@emailjs/browser';
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { EMAILJS_CONFIG, createEmailTemplate } from '@/config/emailjs';


const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      // Check if EmailJS is properly configured
      if (!EMAILJS_CONFIG.PUBLIC_KEY) {
        throw new Error('EmailJS not properly configured');
      }

      // Send actual email using EmailJS
      const templateParams = createEmailTemplate(formData);
      
      const result = await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        templateParams,
        EMAILJS_CONFIG.PUBLIC_KEY
      );
      
      if (result.status === 200) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error('Email service returned error status');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus('error');
      setErrorMessage('Failed to send message. Please try again or contact me directly at aichabrihmouche@gmail.com');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
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
      scale: 1.02,
      boxShadow: "0 0 30px rgba(191, 107, 179, 0.3)",
      transition: {
        duration: 0.3,
        ease: "easeOut" as const
      }
    },
    tap: {
      scale: 0.98
    }
  };

  // Stagger animation variants for form fields
  const staggerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        duration: 0.5
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
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
        
        {/* Contact Section */}
        <div className="pt-32 pb-16 px-4">
          <div className="max-w-6xl mx-auto">
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
                Get In Touch
              </motion.h1>
              <motion.p 
                className="font-outfit text-white text-lg md:text-xl font-regular text-gray-300 text-left max-w-3xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                Let's work together on your next project !
              </motion.p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <motion.div 
                className="bg-black/20 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                variants={hoverVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <motion.h2 
                  className="text-3xl font-orbitron text-white mb-6 drop-shadow-[0_0_15px_rgba(203,37,195,1)]"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  Send Message
                </motion.h2>
                
                <motion.form 
                  onSubmit={handleSubmit} 
                  className="space-y-6"
                  variants={staggerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.div className="grid md:grid-cols-2 gap-4" variants={itemVariants}>
                    <div>
                      <label htmlFor="name" className="block text-white text-sm font-medium mb-2">
                        Name
                      </label>
                      <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="bg-black/30 border-white/20 text-white placeholder:text-gray-400 focus:border-[#BF6BB3] focus:ring-[#BF6BB3] transition-all duration-300"
                          placeholder="Your name"
                        />
                      </motion.div>
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-white text-sm font-medium mb-2">
                        Email
                      </label>
                      <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="bg-black/30 border-white/20 text-white placeholder:text-gray-400 focus:border-[#BF6BB3] focus:ring-[#BF6BB3] transition-all duration-300"
                          placeholder="your@email.com"
                        />
                      </motion.div>
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label htmlFor="subject" className="block text-white text-sm font-medium mb-2">
                      Subject
                    </label>
                    <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="bg-black/30 border-white/20 text-white placeholder:text-gray-400 focus:border-[#BF6BB3] focus:ring-[#BF6BB3] transition-all duration-300"
                        placeholder="Project inquiry"
                      />
                    </motion.div>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label htmlFor="message" className="block text-white text-sm font-medium mb-2">
                      Message
                    </label>
                    <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="bg-black/30 border-white/20 text-white placeholder:text-gray-400 focus:border-[#BF6BB3] focus:ring-[#BF6BB3] resize-none transition-all duration-300"
                        placeholder="Tell me about your project..."
                      />
                    </motion.div>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <motion.div
                      whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                      whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Button 
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-[#BF6BB3] hover:bg-[#BF6BB3]/80 disabled:bg-[#BF6BB3]/50 text-white py-3 text-lg font-medium transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(191,107,179,0.5)] disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center gap-2">
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Sending...
                          </div>
                        ) : (
                          'Send Message'
                        )}
                      </Button>
                    </motion.div>
                  </motion.div>

                  {/* Success/Error Messages */}
                  <AnimatePresence>
                    {submitStatus === 'success' && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="flex items-center gap-3 p-4 bg-green-500/20 border border-green-500/30 rounded-lg"
                      >
                        <CheckCircle className="w-6 h-6 text-green-400" />
                        <div>
                          <p className="text-green-400 font-medium">Message sent successfully!</p>
                          <p className="text-green-300 text-sm">I'll get back to you within 24 hours.</p>
                        </div>
                      </motion.div>
                    )}

                    {submitStatus === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="flex items-center gap-3 p-4 bg-red-500/20 border border-red-500/30 rounded-lg"
                      >
                        <XCircle className="w-6 h-6 text-red-400" />
                        <div>
                          <p className="text-red-400 font-medium">Failed to send message</p>
                          <p className="text-red-300 text-sm">{errorMessage}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.form>
              </motion.div>

              {/* Contact Information */}
              <motion.div 
                className="space-y-8"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <motion.div 
                  className="bg-black/20 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
                  variants={hoverVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <motion.h3 
                    className="text-2xl font-orbitron text-white mb-6 drop-shadow-[0_0_15px_rgba(203,37,195,1)]"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                  >
                    Contact Information
                  </motion.h3>
                  
                  <motion.div 
                    className="space-y-4"
                    variants={staggerVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 1.0 }}
                  >
                                         <motion.div 
                       className="flex items-center space-x-4"
                       variants={itemVariants}
                       whileHover={{ x: 5 }}
                       transition={{ duration: 0.2 }}
                     >
                       <div className="w-12 h-12 bg-[#BF6BB3]/20 rounded-full flex items-center justify-center">
                         <svg className="w-6 h-6 text-[#BF6BB3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                         </svg>
                       </div>
                       <div>
                         <p className="text-white font-medium">Email</p>
                         <p className="text-gray-300">aichabrihmouche@gmail.com</p>
                       </div>
                     </motion.div>

                     <motion.div 
                       className="flex items-center space-x-4"
                       variants={itemVariants}
                       whileHover={{ x: 5 }}
                       transition={{ duration: 0.2 }}
                     >
                       <div className="w-12 h-12 bg-[#BF6BB3]/20 rounded-full flex items-center justify-center">
                         <svg className="w-6 h-6 text-[#BF6BB3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                         </svg>
                       </div>
                       <div>
                         <p className="text-white font-medium">Location</p>
                         <p className="text-gray-300">Algiers, Algeria</p>
                       </div>
                     </motion.div>

                     <motion.div 
                       className="flex items-center space-x-4"
                       variants={itemVariants}
                       whileHover={{ x: 5 }}
                       transition={{ duration: 0.2 }}
                     >
                       <div className="w-12 h-12 bg-[#BF6BB3]/20 rounded-full flex items-center justify-center">
                         <svg className="w-6 h-6 text-[#BF6BB3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                         </svg>
                       </div>
                       <div>
                         <p className="text-white font-medium">Response Time</p>
                         <p className="text-gray-300">Within 24 hours</p>
                       </div>
                     </motion.div>
                  </motion.div>
                </motion.div>

                <motion.div 
                  className="bg-black/20 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
                  variants={hoverVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <motion.h3 
                    className="text-2xl font-orbitron text-white mb-6 drop-shadow-[0_0_15px_rgba(203,37,195,1)]"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.5 }}
                  >
                    Let's Connect
                  </motion.h3>
                  <motion.p 
                    className="text-gray-300 mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.4, duration: 0.5 }}
                  >
                    I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
                  </motion.p>
                  
                  <motion.div 
                    className="flex space-x-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.6, duration: 0.5 }}
                  >
                    <motion.a 
                      href="https://www.linkedin.com/in/aicha-brihmouche-a51730300/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-[#BF6BB3] hover:bg-[#BF6BB3]/80 rounded-full flex items-center justify-center transition-all duration-300"
                      whileHover={{ 
                        scale: 1.1, 
                        boxShadow: "0 0 20px rgba(191, 107, 179, 0.8)",
                        rotate: -5
                      }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </motion.a>
                    <motion.a 
                      href="https://github.com/peppa234"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-[#BF6BB3] hover:bg-[#BF6BB3]/80 rounded-full flex items-center justify-center transition-all duration-300"
                      whileHover={{ 
                        scale: 1.1, 
                        boxShadow: "0 0 20px rgba(191, 107, 179, 0.8)",
                        rotate: 5
                      }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </motion.a>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
      
      {/* Chatbot - Fixed Position */}
      <Chatbot />
    </div>
  );
};

export default Contact;
