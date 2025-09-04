import React from 'react';
import { motion } from 'framer-motion';
import NeonHalo from '../Animation/NeonHalo';
import { 
  Info, 
  Users, 
  Code, 
  Heart, 
  Github, 
  Mail, 
  Globe,
  Sparkles,
  Trophy,
  Target,
  Linkedin
} from 'lucide-react';

const AboutScreen = () => {
  const developers = [
    {
      name: "Alex Johnson",
      role: "Frontend Developer",
      image: "/images/team/alex.jpg",
      linkedin: "https://linkedin.com/in/alexjohnson",
      github: "https://github.com/alexjohnson",
      description: "React & Three.js Expert"
    },
    {
      name: "Sarah Chen",
      role: "UI/UX Designer",
      image: "/images/team/sarah.jpg",
      linkedin: "https://linkedin.com/in/sarahchen",
      github: "https://github.com/sarahchen",
      description: "Visual Design & UX"
    },
    {
      name: "Mike Rodriguez",
      role: "Backend Developer",
      image: "/images/team/mike.jpg",
      linkedin: "https://linkedin.com/in/mikerodriguez",
      github: "https://github.com/mikerodriguez",
      description: "API & Database"
    },
    {
      name: "Emily Watson",
      role: "Game Designer",
      image: "/images/team/emily.jpg",
      linkedin: "https://linkedin.com/in/emilywatson",
      github: "https://github.com/emilywatson",
      description: "Level Design & Mechanics"
    },
    {
      name: "David Kim",
      role: "Full Stack Developer",
      image: "/images/team/david.jpg",
      linkedin: "https://linkedin.com/in/davidkim",
      github: "https://github.com/davidkim",
      description: "React & Node.js"
    },
    {
      name: "Lisa Park",
      role: "DevOps Engineer",
      image: "/images/team/lisa.jpg",
      linkedin: "https://linkedin.com/in/lisapark",
      github: "https://github.com/lisapark",
      description: "Deployment & CI/CD"
    },
    {
      name: "Tom Wilson",
      role: "3D Artist",
      image: "/images/team/tom.jpg",
      linkedin: "https://linkedin.com/in/tomwilson",
      github: "https://github.com/tomwilson",
      description: "Three.js & Blender"
    },
    {
      name: "Anna Garcia",
      role: "QA Engineer",
      image: "/images/team/anna.jpg",
      linkedin: "https://linkedin.com/in/annagarcia",
      github: "https://github.com/annagarcia",
      description: "Testing & Quality"
    },
    {
      name: "Chris Lee",
      role: "Mobile Developer",
      image: "/images/team/chris.jpg",
      linkedin: "https://linkedin.com/in/chrislee",
      github: "https://github.com/chrislee",
      description: "React Native"
    },
    {
      name: "Maria Silva",
      role: "Data Analyst",
      image: "/images/team/maria.jpg",
      linkedin: "https://linkedin.com/in/mariasilva",
      github: "https://github.com/mariasilva",
      description: "Analytics & Insights"
    },
    {
      name: "James Brown",
      role: "Security Engineer",
      image: "/images/team/james.jpg",
      linkedin: "https://linkedin.com/in/jamesbrown",
      github: "https://github.com/jamesbrown",
      description: "Security & Authentication"
    },
    {
      name: "Rachel Green",
      role: "Product Manager",
      image: "/images/team/rachel.jpg",
      linkedin: "https://linkedin.com/in/rachelgreen",
      github: "https://github.com/rachelgreen",
      description: "Product Strategy"
    },
    {
      name: "Kevin Martinez",
      role: "Frontend Developer",
      image: "/images/team/kevin.jpg",
      linkedin: "https://linkedin.com/in/kevinmartinez",
      github: "https://github.com/kevinmartinez",
      description: "Vue.js & TypeScript"
    },
    {
      name: "Sophie Turner",
      role: "UX Researcher",
      image: "/images/team/sophie.jpg",
      linkedin: "https://linkedin.com/in/sophieturner",
      github: "https://github.com/sophieturner",
      description: "User Research"
    },
    {
      name: "Ryan Cooper",
      role: "Backend Developer",
      image: "/images/team/ryan.jpg",
      linkedin: "https://linkedin.com/in/ryancooper",
      github: "https://github.com/ryancooper",
      description: "Python & Django"
    },
    {
      name: "Zoe Anderson",
      role: "Creative Director",
      image: "/images/team/zoe.jpg",
      linkedin: "https://linkedin.com/in/zoeanderson",
      github: "https://github.com/zoeanderson",
      description: "Creative Strategy"
    }
  ];

  const features = [
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "3D Animations",
      description: "Immersive Three.js mascot and visual effects"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Interactive Map",
      description: "Campus map with clickable hotspots"
    },
    {
      icon: <Trophy className="w-6 h-6" />,
      title: "9 Game Levels",
      description: "Physical and software challenges"
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: "QR Integration",
      description: "Built-in camera QR scanning"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-bg-dark flex items-center justify-center p-4 relative">
      <div className="w-full max-w-6xl relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <NeonHalo intensity={1.2}>
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-bg-primary rounded-2xl flex items-center justify-center mr-4">
                <Info className="w-8 h-8 text-neutral-light" />
              </div>
              <div>
                <h1 className="text-3xl font-bold gradient-text">
                  About YESSplora
                </h1>
                <p className="text-sm text-neutral-light text-opacity-80">NIT Campus Treasure Hunt</p>
              </div>
            </div>
          </NeonHalo>
          
          <p className="text-neutral-light text-opacity-80 text-sm">
            An interactive treasure hunt game designed to explore the NIT campus through 
            technology, puzzles, and adventure.
          </p>
        </motion.div>

        {/* App Description */}
        <motion.div
          className="glass-effect rounded-xl p-6 mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <h2 className="text-xl font-semibold text-neutral-light mb-4">About the Game</h2>
          <div className="space-y-3 text-sm text-neutral-light text-opacity-80">
            <p>
              YESSplora is a comprehensive Progressive Web Application (PWA) that transforms 
              the NIT campus into an interactive treasure hunt experience. Teams navigate 
              through 9 challenging levels, combining physical exploration with digital 
              problem-solving.
            </p>
            <p>
              The game features 70 unique QR codes, interactive 3D animations, and a 
              real-time leaderboard system. Players must work together to solve puzzles, 
              scan QR codes, and complete challenges to earn points and unlock new levels.
            </p>
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          className="mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <h2 className="text-xl font-semibold text-neutral-light mb-4">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <NeonHalo key={index} intensity={0.6}>
                <motion.div
                  className="glass-effect rounded-xl p-4"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-gradient-bg-primary rounded-lg flex items-center justify-center text-neutral-light">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-light mb-1">{feature.title}</h3>
                      <p className="text-sm text-neutral-light text-opacity-80">{feature.description}</p>
                    </div>
                  </div>
                </motion.div>
              </NeonHalo>
            ))}
          </div>
        </motion.div>

        {/* Development Team */}
        <motion.div
          className="mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <h2 className="text-xl font-semibold text-neutral-light mb-6">Development Team</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {developers.map((developer, index) => (
              <NeonHalo key={index} intensity={0.8}>
                <motion.div
                  className="glass-effect rounded-xl p-4 relative group cursor-pointer"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                >
                  {/* Profile Image */}
                  <div className="w-16 h-16 bg-gradient-bg-primary rounded-full flex items-center justify-center mx-auto mb-3">
                    <Users className="w-8 h-8 text-neutral-light" />
                  </div>
                  
                  {/* Developer Info */}
                  <div className="text-center mb-3">
                    <h3 className="font-semibold text-neutral-light text-sm mb-1">{developer.name}</h3>
                    <p className="text-xs text-primary-accent font-medium mb-1">{developer.role}</p>
                    <p className="text-xs text-neutral-light text-opacity-60">{developer.description}</p>
                  </div>
                  
                  {/* Hover Overlay with Social Links */}
                  <div className="absolute inset-0 bg-gradient-bg-primary bg-opacity-90 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex space-x-3">
                      <motion.a
                        href={developer.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Linkedin className="w-5 h-5 text-neutral-light" />
                      </motion.a>
                      <motion.a
                        href={developer.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Github className="w-5 h-5 text-neutral-light" />
                      </motion.a>
                    </div>
                  </div>
                </motion.div>
              </NeonHalo>
            ))}
          </div>
        </motion.div>

        {/* Game Stats */}
        <motion.div
          className="glass-effect rounded-xl p-6 mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.6 }}
        >
          <h2 className="text-xl font-semibold text-neutral-light mb-4">Game Statistics</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-neutral-light">9</div>
              <div className="text-sm text-neutral-light text-opacity-80">Game Levels</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-neutral-light">70</div>
              <div className="text-sm text-neutral-light text-opacity-80">QR Codes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-neutral-light">30</div>
              <div className="text-sm text-neutral-light text-opacity-80">Teams</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-neutral-light">300</div>
              <div className="text-sm text-neutral-light text-opacity-80">Max Points</div>
            </div>
          </div>
        </motion.div>

        {/* Contact & Links */}
        <motion.div
          className="glass-effect rounded-xl p-6 mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.7 }}
        >
          <h2 className="text-xl font-semibold text-neutral-light mb-4">Contact & Links</h2>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-primary-accent" />
              <span className="text-sm text-neutral-light text-opacity-80">support@yessplora.com</span>
            </div>
            <div className="flex items-center space-x-3">
              <Github className="w-5 h-5 text-primary-accent" />
              <span className="text-sm text-neutral-light text-opacity-80">github.com/yessplora</span>
            </div>
            <div className="flex items-center space-x-3">
              <Globe className="w-5 h-5 text-primary-accent" />
              <span className="text-sm text-neutral-light text-opacity-80">yessplora.com</span>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          className="text-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.8 }}
        >
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Heart className="w-4 h-4 text-primary-accent" />
            <span className="text-sm text-neutral-light text-opacity-80">Made with love for NIT Campus</span>
          </div>
          <p className="text-xs text-neutral-light text-opacity-60">
            © 2024 YESSplora. All rights reserved.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutScreen;
