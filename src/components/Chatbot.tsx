import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, X, Send, Bot, User, Sparkles, ExternalLink, Github } from "lucide-react";

// Simple markdown renderer for chatbot messages
const renderMarkdown = (text: string) => {
  // Split text by **bold** patterns
  const parts = text.split(/(\*\*.*?\*\*)/g);
  
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      // Remove ** and make it bold
      const boldText = part.slice(2, -2);
      return (
        <strong key={index} className="text-white font-semibold">
          {boldText}
        </strong>
      );
    }
    return part;
  });
};

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  suggestions?: string[];
  links?: { text: string; url: string; type: 'github' | 'demo' | 'linkedin' }[];
}

interface ConversationContext {
  topics: string[];
  userInterests: string[];
  askedAbout: string[];
  lastCategory: string;
}

interface KnowledgeChunk {
  id: string;
  title: string;
  content: string;
  category: string;
  subcategory: string;
  keywords: string[];
  entities: string[];
  context: string;
  priority: number;
  embedding: number[];
  similarity?: number;
  data?: any;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm Aicha's AI assistant with comprehensive knowledge about her portfolio. I can tell you about her **15+ projects** across Web Development, AI/ML, and Design, **detailed technical skills** in 30+ technologies, **hackathon victories**, **professional certifications**, and **internship experience**. What would you like to explore?",
      sender: "bot",
      timestamp: new Date(),
      suggestions: [
        "Show me all her projects",
        "What certifications does she have?",
        "Tell me about her technical skills",
        "What hackathons has she won?"
      ]
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [conversationContext, setConversationContext] = useState<ConversationContext>({
    topics: [],
    userInterests: [],
    askedAbout: [],
    lastCategory: ""
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Enhanced Portfolio Knowledge Base with comprehensive data from all project files
  const portfolioData = {
    "profile": {
      "id": "profile-core",
      "title": "Aicha Brihmouche Profile",
      "content": "Aicha Brihmouche is a Graphic Designer, UI/UX Designer, and Web Developer. She is currently a 3rd Year AI and Data Science student at the National Higher School of Artificial Intelligence (ENSIA) in Algiers, Algeria. She combines her technical background in AI with strong creative skills in design and development.",
      "category": "Profile",
      "subcategory": "Core Information",
      "keywords": ["Aicha Brihmouche", "Graphic Designer", "Web Developer", "AI Student", "UI/UX"],
      "entities": ["Aicha Brihmouche", "ENSIA"],
      "context": "General introduction and personal profile",
      "priority": 5,
      "data": {
        "name": "Aicha Brihmouche",
        "title": "Graphic Designer | UI/UX Designer | Web Developer",
        "location": "Algiers, Algeria",
        "education": "3rd Year AI and Data Science student at ENSIA",
        "languages": ["Arabic (Fluent)", "English (Advanced)", "French (Intermediate)", "Turkish (Intermediate)"],
        "contacts": {
          "email": "aichabrihmouche@gmail.com",
          "github": "https://github.com/peppa234",
          "linkedin": "https://www.linkedin.com/in/aicha-brihmouche"
        },
        "traits": ["Easy-going", "Leader", "Public speaker", "Creative", "Collaborative"]
      }
    },
    
    "skills": {
      "id": "technical-skills",
      "title": "Technical Skills & Proficiencies",
      "content": "Aicha has comprehensive technical skills across three main domains: Web Development (React, JavaScript, TypeScript, Node.js, Express, HTML, CSS, PHP, Tailwind CSS, MongoDB, PostgreSQL, MySQL, Bootstrap, Flask), Design Tools (Figma, Photoshop, Illustrator, Canva), and Data Science & AI (Python, Pandas, NumPy, Scikit-learn, StatsModels, Matplotlib, Seaborn, PyTorch, TensorFlow, OpenCV, Jupyter).",
      "category": "Skills",
      "subcategory": "Technical Competencies",
      "keywords": ["Python", "JavaScript", "React", "UI/UX", "Design", "Programming", "Data Science", "Machine Learning"],
      "entities": ["Python", "JavaScript", "React", "Figma", "Photoshop", "Pandas", "TensorFlow"],
      "context": "Technical abilities and proficiency levels",
      "priority": 5,
      "data": {
        "web_development": [
          {"skill": "React", "level": "Advanced", "category": "Frontend Framework"},
          {"skill": "JavaScript", "level": "Advanced", "category": "Programming Language"},
          {"skill": "TypeScript", "level": "Intermediate", "category": "Programming Language"},
          {"skill": "Node.js", "level": "Advanced", "category": "Backend Runtime"},
          {"skill": "Express.js", "level": "Intermediate", "category": "Backend Framework"},
          {"skill": "HTML", "level": "Advanced", "category": "Markup Language"},
          {"skill": "CSS", "level": "Advanced", "category": "Styling Language"},
          {"skill": "PHP", "level": "Advanced", "category": "Backend Language"},
          {"skill": "Tailwind CSS", "level": "Advanced", "category": "CSS Framework"},
          {"skill": "MongoDB", "level": "Intermediate", "category": "Database"},
          {"skill": "PostgreSQL", "level": "Intermediate", "category": "Database"},
          {"skill": "MySQL", "level": "Advanced", "category": "Database"},
          {"skill": "Bootstrap", "level": "Advanced", "category": "CSS Framework"},
          {"skill": "Flask", "level": "Intermediate", "category": "Python Framework"}
        ],
        "design_tools": [
          {"skill": "Figma", "level": "Advanced", "category": "UI/UX Design"},
          {"skill": "Photoshop", "level": "Intermediate", "category": "Image Editing"},
          {"skill": "Illustrator", "level": "Intermediate", "category": "Vector Graphics"},
          {"skill": "Canva", "level": "Advanced", "category": "Graphic Design"}
        ],
        "data_science_ai": [
          {"skill": "Python", "level": "Advanced", "category": "Programming Language"},
          {"skill": "Pandas", "level": "Advanced", "category": "Data Manipulation"},
          {"skill": "NumPy", "level": "Advanced", "category": "Numerical Computing"},
          {"skill": "Scikit-learn", "level": "Advanced", "category": "Machine Learning"},
          {"skill": "StatsModels", "level": "Intermediate", "category": "Statistical Modeling"},
          {"skill": "Matplotlib", "level": "Advanced", "category": "Data Visualization"},
          {"skill": "Seaborn", "level": "Advanced", "category": "Statistical Visualization"},
          {"skill": "PyTorch", "level": "Intermediate", "category": "Deep Learning"},
          {"skill": "TensorFlow", "level": "Intermediate", "category": "Deep Learning"},
          {"skill": "OpenCV", "level": "Intermediate", "category": "Computer Vision"},
          {"skill": "Jupyter", "level": "Advanced", "category": "Development Environment"}
        ]
      }
    },

    "projects_web": {
      "id": "web-projects",
      "title": "Web Development Projects",
      "content": "Aicha has built comprehensive web applications including a Student Portal System with React/TypeScript, Vital Care Clinic Management System, Blog Platform, Weather Application, To-Do List App, and Color Picker App. Her projects demonstrate full-stack capabilities with modern web technologies.",
      "category": "Projects",
      "subcategory": "Web Development",
      "keywords": ["React", "Full-stack", "Web Development", "Portal", "Management System", "JavaScript", "TypeScript"],
      "entities": ["Student Portal", "Vital Care", "Blog Platform", "Weather App", "To-Do List", "Color Picker"],
      "context": "Web development project portfolio",
      "priority": 4,
      "data": [
        {
          "name": "Student Portal System",
          "description": "Student management portal with courses, grades, and authentication",
          "tech": ["React", "TypeScript", "Tailwind CSS", "MongoDB", "Node.js", "Express"],
          "role": "Full-stack developer",
          "duration": "3 months",
          "highlights": ["Secure authentication", "Database schema design", "Grade tracking system"],
          "github": "https://github.com/peppa234/Student-Portal"
        },
        {
          "name": "Vital Care Clinic Management System",
          "description": "Clinic operations app for appointments, patients, and emails",
          "tech": ["HTML&CSS", "Bootstrap", "JQuery", "Php", "MySQL", "JavaScript"],
          "role": "Backend and frontend developer",
          "duration": "2 months",
          "highlights": ["Patient data management", "CRUD operations", "Team collaboration"],
          "teamSize": 3
        },
        {
          "name": "Blog Platform",
          "description": "Content platform with posts (CRUD), login and register",
          "tech": ["Node.js", "Express", "SQLlite", "EJS", "JavaScript", "HTML&CSS"],
          "role": "Full-stack developer",
          "duration": "1 month",
          "highlights": ["Content management", "User authentication", "CRUD operations"],
          "github": "https://github.com/peppa234/Blog-Platfrom"
        },
        {
          "name": "Weather Application",
          "description": "Weather app showing current conditions based on the city using Weather API",
          "tech": ["HTML", "CSS", "JavaScript", "Weather API"],
          "role": "Frontend developer",
          "duration": "2 weeks",
          "highlights": ["API integration", "Real-time data", "Responsive design"],
          "github": "https://github.com/peppa234/Weather-App",
          "demo": "https://peppa234.github.io/Weather-App/"
        },
        {
          "name": "To-Do List App",
          "description": "To do list app with options to add, delete and complete tasks",
          "tech": ["React", "JavaScript", "CSS"],
          "role": "Frontend developer",
          "duration": "1 week",
          "highlights": ["Task management", "Interactive UI", "State management"],
          "github": "https://github.com/peppa234/To-Do-List-App"
        },
        {
          "name": "Color Picker App",
          "description": "Interactive color tool with palette generation and copy-to-clipboard",
          "tech": ["React", "JavaScript", "CSS"],
          "role": "Frontend developer",
          "duration": "1 week",
          "highlights": ["Color theory", "Interactive design", "Utility tool"],
          "github": "https://github.com/peppa234/ColorPickerApp"
        }
      ]
    },

    "projects_ai": {
      "id": "ai-projects",
      "title": "AI & Data Science Projects",
      "content": "Aicha's AI and Data Science projects include 7wess (AI touristic app), Tic Tac Toe with Minimax Agent, Predictive Modeling with Linear Regression, A/B Testing Analysis, and Titanic Classification. She combines theoretical knowledge with practical implementation across machine learning, statistical analysis, and AI algorithms.",
      "category": "Projects",
      "subcategory": "AI/ML",
      "keywords": ["AI", "Machine Learning", "Python", "Algorithms", "Data Science", "Statistics", "Regression", "Classification"],
      "entities": ["7wess", "Minimax", "Titanic Classification", "Linear Regression", "A/B Testing"],
      "context": "AI and machine learning project portfolio",
      "priority": 5,
      "data": [
        {
          "name": "7wess – AI Touristic App",
          "description": "Trip planning assistant using AI Algorithms for 7-day itineraries",
          "tech": ["Python", "A*", "BFS", "DFS", "CSP", "React", "Tailwind CSS", "Flask"],
          "role": "AI engineer and frontend developer",
          "duration": "1 month",
          "highlights": ["AI planning algorithms", "Flask API integration", "Optimized travel routes"],
          "teamSize": 6,
          "github": "https://github.com/Ashreeef/AI-Project-Touristic-Tour-Recommendation"
        },
        {
          "name": "Tic Tac Toe – Minimax Agent",
          "description": "Player vs Computer using Minimax with optimal strategy and Player Vs Player",
          "tech": ["Python", "Flask", "Minimax Algorithm", "HTML&CSS", "JavaScript"],
          "role": "AI developer",
          "duration": "2 weeks",
          "highlights": ["Minimax implementation", "Optimal strategy", "Interactive gameplay"],
          "github": "https://github.com/LyesHADJAR/TicTacToe"
        },
        {
          "name": "Predictive Modeling with Linear Regression",
          "description": "End-to-end regression workflow with evaluation and visualization using Linear Regression",
          "tech": ["Python", "Pandas", "Statistics", "StatsModels", "seaborn", "Matplotlib"],
          "role": "Data scientist",
          "duration": "2 weeks",
          "highlights": ["Statistical modeling", "Data visualization", "Model evaluation"],
          "github": "https://github.com/peppa234/CodeAlpha_Predictive_Modeling_with_Linear_Regression"
        },
        {
          "name": "A/B Testing Analysis",
          "description": "Statistical test design and analysis for product experiments using A/B Testing",
          "tech": ["Python", "Pandas", "scikit-learn", "Matplotlib", "SciPy", "Seaborn"],
          "role": "Data scientist",
          "duration": "2 weeks",
          "highlights": ["Experimental design", "Statistical analysis", "Hypothesis testing"],
          "github": "https://github.com/peppa234/CodeAlpha_AB_Testing_Analysis"
        },
        {
          "name": "Titanic Classification",
          "description": "Supervised learning for survival prediction with feature engineering",
          "tech": ["Python", "Pandas", "scikit-learn", "statsmodel", "Matplotlib", "Seaborn"],
          "role": "Data scientist",
          "duration": "2 weeks",
          "highlights": ["Feature engineering", "Model evaluation", "Data visualization"],
          "github": "https://github.com/peppa234/CodeAlpha_Titanic_Classification"
        }
      ]
    },

    "projects_design": {
      "id": "design-projects",
      "title": "Design & Creative Projects",
      "content": "Aicha's design portfolio includes comprehensive UI/UX projects for K2A rental cars, extensive social media campaigns for K2A and Takhassous platforms, and professional logo design for Strategy Digital. She excels in both digital and print design with strong brand consistency and visual communication skills.",
      "category": "Projects",
      "subcategory": "Design",
      "keywords": ["UI/UX", "Graphic Design", "Branding", "Logo Design", "Social Media", "Marketing", "Visual Design"],
      "entities": ["K2A", "Strategy Digital", "Takhassous", "Figma", "Photoshop", "Illustrator"],
      "context": "Design and creative project portfolio",
      "priority": 4,
      "data": [
        {
          "name": "UI/UX Web Design – K2A Rental Car Business",
          "description": "Website UI/UX for K2A rental cars with brand-consistent components and flows",
          "tech": ["Figma", "Design System", "Prototyping"],
          "role": "UI/UX Designer",
          "duration": "1 month",
          "highlights": ["Wireframes", "Style guides", "Interactive prototypes", "Brand consistency", "User experience optimization"]
        },
        {
          "name": "Social Media Posts – K2A Business",
          "description": "Engaging post series for K2A brand promotions and campaigns",
          "tech": ["Photoshop", "Illustrator", "Branding", "Marketing"],
          "role": "Graphic designer",
          "duration": "2 months",
          "highlights": ["Brand consistency", "Campaign strategy", "Typography systems", "High engagement", "Visual storytelling"]
        },
        {
          "name": "Social Media Posts – Takhassous Platform",
          "description": "Campaign visuals for Takhassous with consistent typography and layout systems",
          "tech": ["Photoshop", "Illustrator", "Content Design"],
          "role": "Graphic designer",
          "duration": "1 month",
          "highlights": ["Visual consistency", "Content strategy", "Typography systems", "Platform optimization"]
        },
        {
          "name": "Logo Design – Strategy Digital",
          "description": "Brand identity and logo design for Strategy Digital, a digital services company",
          "tech": ["Illustrator", "Photoshop", "Branding"],
          "role": "Brand designer",
          "duration": "2 weeks",
          "highlights": ["Brand identity", "Minimal design", "Logo package", "Company values translation", "Professional branding"]
        }
      ]
    },

    "achievements": {
      "id": "achievements",
      "title": "Hackathon Victories & Recognition",
      "content": "Aicha has won major hackathons including 2nd place at Hack&Train (SecAi) leading AI development for satellite image analysis, and 1st place at Data Bounty Hackathon (CSCC) focusing on cybersecurity and CTF challenges. She also holds multiple professional certifications in Data Science, Web Development, and Digital Marketing.",
      "category": "Achievements",
      "subcategory": "Competitions & Certifications",
      "keywords": ["Hackathon", "Winner", "SecAi", "CSCC", "Object Detection", "Cybersecurity", "Certifications", "DataCamp", "Google"],
      "entities": ["Hack&Train", "Data Bounty", "Team MOSAIC", "SecAi", "CSCC", "DataCamp", "Prodigy InfoTech", "John Hopkins", "Google"],
      "context": "Competition achievements and professional certifications",
      "priority": 5,
      "data": {
        "hackathons": [
          {
            "title": "2nd Place – Hack&Train Hackathon",
            "organizer": "SecAi",
            "year": "2024",
            "description": "As part of Team MOSAIC, I joined Hack&Train by SecAi to tackle AI and cybersecurity challenges. I co-led the AI side, developing advanced object detection models for detailed satellite image analysis",
            "skills": ["Object Detection", "Satellite Image Analysis", "Team Leadership", "AI Development"],
            "link": "https://www.linkedin.com/posts/activity-7283204095564279809-5GtM"
          },
          {
            "title": "1st Place – Data Bounty Hackathon",
            "organizer": "CSCC Club",
            "year": "2024",
            "description": "I joined the Data Bounty Hackathon by CSCC Club, where our team tackled AI and cybersecurity tracks. I focused on CTF challenges, solving exploits like JWT attacks, steganography, and remote code execution",
            "skills": ["CTF Challenges", "JWT Attacks", "Steganography", "Remote Code Execution", "Cybersecurity"],
            "link": "https://www.linkedin.com/posts/activity-7337863537010040832-E1_N"
          }
        ],
        "certifications": [
          {
            "title": "Associate Data Scientist",
            "issuer": "DataCamp",
            "type": "Professional Certification",
            "description": "Comprehensive data science certification covering Python, machine learning, and statistical analysis"
          },
          {
            "title": "Web Development Internship",
            "issuer": "Prodigy InfoTech",
            "type": "Professional Internship",
            "description": "Hands-on web development experience with React, JavaScript, and modern web technologies"
          },
          {
            "title": "Web Development Course",
            "issuer": "John Hopkins University",
            "type": "Academic Course",
            "description": "University-level web development course covering full-stack development principles"
          },
          {
            "title": "Foundations of Digital Marketing and E-commerce",
            "issuer": "Google",
            "type": "Professional Certification",
            "description": "Google's comprehensive digital marketing and e-commerce certification program"
          }
        ]
      }
    },

    "experience": {
      "id": "professional-experience",
      "title": "Professional Experience & Internships",
      "content": "Aicha has completed internships at Code Alpha (Data Science) and Prodigy InfoTech (Web Development), gaining practical experience in machine learning, statistical analysis, and modern web development.",
      "category": "Experience",
      "subcategory": "Professional",
      "keywords": ["Internship", "Data Science", "Web Development", "Code Alpha", "Prodigy InfoTech"],
      "entities": ["Code Alpha", "Prodigy InfoTech"],
      "context": "Professional work experience",
      "priority": 4,
      "data": [
        {
          "company": "Code Alpha",
          "position": "Data Science Intern",
          "duration": "August 2024",
          "type": "Remote Internship",
          "responsibilities": ["Developed predictive models", "Conducted statistical analysis", "Created data visualizations"],
          "achievements": ["Delivered regression and classification models", "Built comprehensive analysis reports"],
          "technologies": ["Python", "Pandas", "scikit-learn", "Matplotlib", "Seaborn"]
        },
        {
          "company": "Prodigy InfoTech",
          "position": "Web Development Intern",
          "duration": "July 2024",
          "type": "Remote Internship",
          "responsibilities": ["Built responsive frontend components", "Integrated backend APIs", "Developed full web applications"],
          "achievements": ["Delivered multiple web projects", "Mastered React development"],
          "technologies": ["React", "JavaScript", "CSS", "API Integration"]
        }
      ]
    }
  };

  // Convert portfolio data to knowledge chunks
  const knowledgeBase: KnowledgeChunk[] = Object.values(portfolioData).map(item => ({
    ...item,
    embedding: []
  }));


  const createAdvancedEmbedding = (text: string, metadata: any = {}): number[] => {
    const words = text.toLowerCase().split(/\s+/);
    const embedding: number[] = [];
    
    // Technical skill categories with weights
    const skillCategories = {
      programming: ['python', 'javascript', 'typescript', 'java', 'sql', 'php', 'c++'],
      webdev: ['react', 'html', 'css', 'node', 'express', 'flask', 'api', 'frontend', 'backend', 'fullstack'],
      aiml: ['ai', 'machine', 'learning', 'algorithm', 'data', 'science', 'model', 'neural', 'deep'],
      design: ['ui', 'ux', 'figma', 'photoshop', 'illustrator', 'design', 'graphic', 'branding', 'logo'],
      databases: ['mongodb', 'mysql', 'sqlite', 'database', 'sql'],
      tools: ['git', 'github', 'docker', 'aws', 'bootstrap', 'tailwind', 'jquery']
    };

    // Project categories
    const projectCategories = {
      web: ['portal', 'website', 'app', 'platform', 'system', 'management', 'blog'],
      ai: ['prediction', 'classification', 'regression', 'minimax', 'algorithm', 'model'],
      design: ['logo', 'branding', 'social', 'media', 'campaign', 'visual']
    };

    // Calculate category scores
    [...Object.values(skillCategories), ...Object.values(projectCategories)].forEach(category => {
      const score = category.reduce((sum, keyword) => {
        const matches = words.filter(word => word.includes(keyword) || keyword.includes(word)).length;
        return sum + (matches / words.length);
      }, 0);
      embedding.push(score);
    });

    // Context features
    embedding.push(words.length / 100); // Text length
    embedding.push((text.match(/[A-Z]/g) || []).length / text.length); // Capitalization ratio
    embedding.push((text.match(/\d+/g) || []).length / words.length); // Numbers ratio
    
    // Priority and recency
    embedding.push((metadata.priority || 1) / 5);
    embedding.push(metadata.category === 'Projects' ? 1.2 : 1.0);

    return embedding;
  };

  // Initialize embeddings
  useEffect(() => {
    knowledgeBase.forEach(chunk => {
      chunk.embedding = createAdvancedEmbedding(chunk.content + ' ' + chunk.keywords.join(' '), chunk);
    });
  }, []);

  // Enhanced similarity calculation
  const calculateSimilarity = (a: number[], b: number[]): number => {
    const dotProduct = a.reduce((sum, val, i) => sum + val * (b[i] || 0), 0);
    const magnitudeA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
    const magnitudeB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
    return magnitudeA && magnitudeB ? dotProduct / (magnitudeA * magnitudeB) : 0;
  };

  // Intent recognition system
  const recognizeIntent = (query: string): { intent: string; entities: string[]; confidence: number } => {
    const queryLower = query.toLowerCase();
    const entities: string[] = [];
    
    // Extract entities
    const entityPatterns = {
      skills: ['python', 'javascript', 'react', 'design', 'ui/ux', 'figma', 'photoshop', 'illustrator', 'pandas', 'tensorflow', 'node.js', 'express', 'mongodb', 'mysql'],
      projects: ['7wess', 'student portal', 'weather app', 'titanic', 'blog', 'vital care', 'color picker', 'to-do', 'k2a', 'takhassous', 'strategy digital'],
      companies: ['code alpha', 'prodigy', 'ensia', 'k2a', 'datacamp', 'google', 'john hopkins'],
      achievements: ['hackathon', 'winner', 'award', 'competition', 'certification', 'datacamp', 'google'],
      certifications: ['certification', 'certificate', 'datacamp', 'google', 'john hopkins', 'prodigy', 'associate data scientist', 'digital marketing']
    };

    Object.entries(entityPatterns).forEach(([category, patterns]) => {
      patterns.forEach(pattern => {
        if (queryLower.includes(pattern)) {
          entities.push(pattern);
        }
      });
    });

    // Intent classification
    const intents = {
      skills: ['skill', 'technology', 'programming', 'language', 'tool', 'proficiency'],
      projects: ['project', 'work', 'build', 'create', 'develop', 'portfolio'],
      experience: ['experience', 'internship', 'work', 'job', 'company', 'role'],
      achievements: ['achievement', 'hackathon', 'award', 'win', 'competition', 'success'],
      certifications: ['certification', 'certificate', 'certified', 'credential', 'qualification'],
      contact: ['contact', 'email', 'reach', 'hire', 'connect', 'linkedin'],
      personal: ['about', 'who', 'background', 'story', 'personality', 'interest'],
      education: ['education', 'study', 'student', 'university', 'degree', 'ensia']
    };

    let detectedIntent = 'general';
    let maxScore = 0;

    Object.entries(intents).forEach(([intent, keywords]) => {
      const score = keywords.reduce((sum, keyword) => {
        return sum + (queryLower.includes(keyword) ? 1 : 0);
      }, 0);
      if (score > maxScore) {
        maxScore = score;
        detectedIntent = intent;
      }
    });

    return {
      intent: detectedIntent,
      entities,
      confidence: Math.min(maxScore / 3, 1)
    };
  };

  // Enhanced response generation
  const generateIntelligentResponse = (query: string): { text: string; suggestions: string[]; links: any[] } => {
    const { intent, entities, confidence } = recognizeIntent(query);
    const queryEmbedding = createAdvancedEmbedding(query);
    
    // Find relevant chunks
    const scoredChunks = knowledgeBase.map(chunk => ({
      ...chunk,
      similarity: calculateSimilarity(queryEmbedding, chunk.embedding)
    })).sort((a, b) => b.similarity - a.similarity);

    const topChunks = scoredChunks.slice(0, 2);
    let response = "";
    let suggestions: string[] = [];
    let links: any[] = [];

    // Intent-based responses
    switch (intent) {
      case 'skills':
        const skillsData = portfolioData.skills.data;
        if (entities.length > 0) {
          const relevantSkills = [];
          Object.values(skillsData).forEach(category => {
            category.forEach((skill: any) => {
              if (entities.some(entity => skill.skill.toLowerCase().includes(entity) || entity.includes(skill.skill.toLowerCase()))) {
                relevantSkills.push(skill);
              }
            });
          });
          if (relevantSkills.length > 0) {
            response = `Regarding ${entities.join(' and ')}: ` + relevantSkills.map((skill: any) => `Aicha has ${skill.level} proficiency in ${skill.skill} (${skill.category}).`).join(' ');
          }
        }
        if (!response) {
          response = `Aicha has comprehensive technical skills across three main domains: **Web Development** (React, JavaScript, TypeScript, Node.js, Express, HTML, CSS, PHP, Tailwind CSS, MongoDB, PostgreSQL, MySQL, Bootstrap, Flask), **Design Tools** (Figma, Photoshop, Illustrator, Canva), and **Data Science & AI** (Python, Pandas, NumPy, Scikit-learn, StatsModels, Matplotlib, Seaborn, PyTorch, TensorFlow, OpenCV, Jupyter). She combines technical depth with creative abilities.`;
        }
        suggestions = ["Show me her projects using these skills", "What certifications does she have?", "Tell me about her AI/ML experience"];
        break;

      case 'projects':
        if (entities.some(e => ['web', 'website', 'react'].includes(e))) {
          const webProjects = portfolioData.projects_web.data;
          response = `Aicha's web development projects showcase her full-stack abilities: ${webProjects.map((p: any) => `**${p.name}** - ${p.description} (Built with ${p.tech.slice(0, 3).join(', ')})`).join('. ')}`;
          webProjects.forEach((p: any) => {
            if (p.github) links.push({ text: p.name + ' Code', url: p.github, type: 'github' });
            if (p.demo) links.push({ text: p.name + ' Demo', url: p.demo, type: 'demo' });
          });
        } else if (entities.some(e => ['ai', 'ml', '7wess'].includes(e))) {
          const aiProjects = portfolioData.projects_ai.data;
          response = `Aicha's AI projects demonstrate her machine learning expertise: ${aiProjects.map((p: any) => `**${p.name}** - ${p.description} using ${p.tech.slice(0, 3).join(', ')}`).join('. ')}`;
          aiProjects.forEach((p: any) => {
            if (p.github) links.push({ text: p.name + ' Code', url: p.github, type: 'github' });
          });
        } else if (entities.some(e => ['design', 'ui', 'ux', 'k2a'].includes(e))) {
          const designProjects = portfolioData.projects_design.data;
          response = `Aicha's design projects showcase her creative abilities: ${designProjects.map((p: any) => `**${p.name}** - ${p.description} (Created with ${p.tech.slice(0, 3).join(', ')})`).join('. ')}`;
        } else {
          response = `Aicha has built an impressive portfolio across **Web Development** (6 projects including Student Portal System, Vital Care Clinic Management, Blog Platform, Weather App, To-Do List, Color Picker), **AI/ML** (5 projects including 7wess AI Touristic App, Tic Tac Toe Minimax Agent, Predictive Modeling, A/B Testing Analysis, Titanic Classification), and **Design** (4 projects including K2A UI/UX, K2A Social Media Campaigns, Takhassous Campaigns, Strategy Digital Logo). Each project demonstrates different aspects of her multidisciplinary skills.`;
        }
        suggestions = ["Show me the technical details", "What challenges did she solve?", "See her design projects"];
        break;

      case 'achievements':
        const achievementsData = portfolioData.achievements.data;
        response = `Aicha has impressive achievements in both competitions and certifications: **Hackathon Victories**: 🥈 2nd Place at Hack&Train Hackathon (SecAi) where she co-led AI development for Team MOSAIC, creating advanced object detection models for satellite image analysis. 🥇 1st Place at Data Bounty Hackathon (CSCC) focusing on cybersecurity CTF challenges including JWT attacks and steganography. **Professional Certifications**: Associate Data Scientist (DataCamp), Web Development Internship (Prodigy InfoTech), Web Development Course (John Hopkins University), and Foundations of Digital Marketing and E-commerce (Google).`;
        achievementsData.hackathons.forEach((achievement: any) => {
          if (achievement.link) {
            links.push({ text: `${achievement.title} Details`, url: achievement.link, type: 'linkedin' });
          }
        });
        suggestions = ["What technical skills did she use?", "Tell me about her leadership role", "Show me her certifications"];
        break;

      case 'certifications':
        const certificationsData = portfolioData.achievements.data.certifications;
        response = `Aicha holds multiple professional certifications: **${certificationsData.map((cert: any) => `${cert.title} (${cert.issuer})`).join(', ')}**. These certifications demonstrate her commitment to continuous learning and professional development across Data Science, Web Development, and Digital Marketing domains.`;
        suggestions = ["What skills do these certifications cover?", "Tell me about her hackathon wins", "Show me her projects"];
        break;

      case 'experience':
        response = `Aicha has valuable internship experience: **Data Science Intern at Code Alpha** (August 2024) where she developed predictive models and conducted statistical analysis. **Web Development Intern at Prodigy InfoTech** (July 2024) focusing on React development and API integration. Both were remote internships that enhanced her practical skills.`;
        suggestions = ["What projects did she work on?", "See her technical skills", "What did she learn?"];
        break;

      case 'contact':
        const contactInfo = portfolioData.profile.data.contacts;
        response = `You can reach Aicha at **${contactInfo.email}**. She's based in Algiers, Algeria and is active on professional networks. She's open to opportunities in AI, web development, and design projects.`;
        links = [
          { text: 'LinkedIn Profile', url: contactInfo.linkedin, type: 'linkedin' },
          { text: 'GitHub Portfolio', url: contactInfo.github, type: 'github' }
        ];
        suggestions = ["See her latest projects", "What's her availability?", "Tell me about her skills"];
        break;

      case 'personal':
        const personalData = portfolioData.profile.data;
        response = `Aicha is a ${personalData.traits.join(', ').toLowerCase()} professional from Algeria. She's currently a 3rd-year AI and Data Science student at ENSIA. She speaks ${personalData.languages.join(', ')}. She combines technical expertise with creative talents and strong leadership abilities.`;
        suggestions = ["What are her technical strengths?", "Tell me about her education", "Show me her creative work"];
        break;

      case 'education':
        response = `Aicha is currently a **3rd Year AI and Data Science student** at the National Higher School of Artificial Intelligence (ENSIA) in Algiers, Algeria. She has certifications from DataCamp (Associate Data Scientist), John Hopkins University (Web Development), and Google (Digital Marketing). Her academic focus combines theoretical AI knowledge with practical application.`;
        suggestions = ["What projects has she built?", "See her technical certifications", "Tell me about ENSIA"];
        break;

      default:
        // Use similarity-based response for complex queries
        if (topChunks.length > 0 && topChunks[0].similarity > 0.1) {
          const topChunk = topChunks[0];
          response = `Based on your question: ${topChunk.content}`;
          
          // Add specific data if available
          if (topChunk.data) {
            if (Array.isArray(topChunk.data)) {
              const items = topChunk.data.slice(0, 2);
              response += ` Here are some highlights: ${items.map((item: any) => 
                item.name || item.skill || item.title || 'Item'
              ).join(', ')}.`;
            }
          }
      } else {
          response = "I'd be happy to help you learn more about Aicha! I have comprehensive information about her technical skills (Python, JavaScript, React, AI/ML), creative projects (web apps, AI solutions, UI/UX design), professional achievements (hackathon wins, internships), and personal background. What specific area interests you most?";
        }
        suggestions = ["Tell me about her skills", "Show me her projects", "What hackathons has she won?", "How can I contact her?"];
    }

    // Update conversation context
    setConversationContext(prev => ({
      topics: [...new Set([...prev.topics, intent])],
      userInterests: [...new Set([...prev.userInterests, ...entities])],
      askedAbout: [...new Set([...prev.askedAbout, intent])],
      lastCategory: intent
    }));

    return { text: response, suggestions, links };
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue("");
    setIsTyping(true);

    // Simulate processing time
    setTimeout(() => {
      const { text, suggestions, links } = generateIntelligentResponse(currentInput);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text,
        sender: "bot",
        timestamp: new Date(),
        suggestions: suggestions.length > 0 ? suggestions : undefined,
        links: links.length > 0 ? links : undefined
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 800 + Math.random() * 1200);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="relative"
        >
          <Button
            onClick={toggleChat}
            className="w-16 h-16 rounded-full bg-gradient-to-r from-[#BF6BB3] to-[#3B4CCA] hover:from-[#BF6BB3]/90 hover:to-[#3B4CCA]/90 shadow-[0_0_30px_rgba(203,37,195,0.5)] hover:shadow-[0_0_40px_rgba(203,37,195,0.7)] transition-all duration-300"
          >
            <MessageCircle className="w-6 h-6 text-white" />
          </Button>
          
          {/* Notification Dot */}
          {!isOpen && (
            <motion.div
              className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
        </motion.div>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 z-50 w-80 h-96"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <Card className="w-full h-full bg-black/90 backdrop-blur-md border border-[#BF6BB3]/30 shadow-[0_0_40px_rgba(203,37,195,0.3)] flex flex-col">
              {/* Chat Header */}
              <div className="flex items-center justify-between p-4 border-b border-[#BF6BB3]/20 bg-gradient-to-r from-[#BF6BB3]/10 to-[#3B4CCA]/10">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-[#BF6BB3] to-[#3B4CCA] rounded-full flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-orbitron font-bold text-white">Aicha's AI</h3>
                    <p className="text-xs text-[#BF6BB3]">AI Assistant</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleChat}
                  className="text-gray-400 hover:text-white hover:bg-white/10"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {/* Messages Area */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-6">
                  <AnimatePresence>
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className={`flex gap-3 ${
                          message.sender === "user" ? "justify-end" : "justify-start"
                        }`}
                      >
                        {message.sender === "bot" && (
                          <div className="w-8 h-8 bg-gradient-to-r from-[#BF6BB3] to-[#3B4CCA] rounded-full flex items-center justify-center flex-shrink-0">
                            <Bot className="w-4 h-4 text-white" />
                          </div>
                        )}
                        
                        <div
                          className={`max-w-[80%] p-3 rounded-2xl ${
                            message.sender === "user"
                              ? "bg-gradient-to-r from-[#BF6BB3] to-[#BF6BB3]/80 text-white ml-auto"
                              : "bg-white/10 text-gray-200 border border-white/20"
                          }`}
                        >
                          <p className="text-sm leading-relaxed whitespace-pre-wrap">
                            {message.sender === "bot" ? renderMarkdown(message.text) : message.text}
                          </p>
                          
                          {/* Links */}
                          {message.links && message.links.length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-2">
                              {message.links.map((link: any, index: number) => (
                                <a
                                  key={index}
                                  href={link.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 text-xs bg-[#BF6BB3]/20 hover:bg-[#BF6BB3]/30 px-2 py-1 rounded-full transition-colors"
                                >
                                  {link.type === 'github' && <Github className="w-3 h-3" />}
                                  {link.type === 'demo' && <ExternalLink className="w-3 h-3" />}
                                  {link.type === 'linkedin' && <ExternalLink className="w-3 h-3" />}
                                  {link.text}
                                </a>
                              ))}
                            </div>
                          )}
                          
                          {/* Suggestions */}
                          {message.suggestions && message.suggestions.length > 0 && (
                            <div className="mt-3 space-y-1">
                              <p className="text-xs text-gray-400">You might also ask:</p>
                              {message.suggestions.map((suggestion: string, index: number) => (
                                <button
                                  key={index}
                                  onClick={() => handleSuggestionClick(suggestion)}
                                  className="block text-xs text-[#BF6BB3] hover:text-white bg-white/5 hover:bg-white/10 px-2 py-1 rounded-lg w-full text-left transition-colors"
                                >
                                  {suggestion}
                                </button>
                              ))}
                            </div>
                          )}
                          
                          <p className="text-xs opacity-60 mt-2">
                            {message.timestamp.toLocaleTimeString([], { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </p>
                        </div>

                        {message.sender === "user" && (
                          <div className="w-8 h-8 bg-gradient-to-r from-[#3B4CCA] to-[#BF6BB3] rounded-full flex items-center justify-center flex-shrink-0">
                            <User className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </motion.div>
                    ))}
                    
                    {/* Typing Indicator */}
                    {isTyping && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex gap-3 justify-start"
                      >
                        <div className="w-8 h-8 bg-gradient-to-r from-[#BF6BB3] to-[#3B4CCA] rounded-full flex items-center justify-center">
                          <Bot className="w-4 h-4 text-white" />
                        </div>
                        <div className="bg-white/10 border border-white/20 rounded-2xl p-4">
                          <div className="flex gap-1">
                            <motion.div
                              className="w-2 h-2 bg-[#BF6BB3] rounded-full"
                              animate={{ scale: [1, 1.5, 1] }}
                              transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                            />
                            <motion.div
                              className="w-2 h-2 bg-[#BF6BB3] rounded-full"
                              animate={{ scale: [1, 1.5, 1] }}
                              transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                            />
                            <motion.div
                              className="w-2 h-2 bg-[#BF6BB3] rounded-full"
                              animate={{ scale: [1, 1.5, 1] }}
                              transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              {/* Input Area */}
              <div className="p-4 border-t border-[#BF6BB3]/20">
                <div className="flex gap-2">
                  <Input
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask about Aicha's skills, projects, experience..."
                    className="flex-1 bg-white/10 border-[#BF6BB3]/30 text-white placeholder:text-gray-400 focus:border-[#BF6BB3] focus:ring-[#BF6BB3]/20"
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim()}
                    className="bg-gradient-to-r from-[#BF6BB3] to-[#3B4CCA] hover:from-[#BF6BB3]/90 hover:to-[#3B4CCA]/90 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
