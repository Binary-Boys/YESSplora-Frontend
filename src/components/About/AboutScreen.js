import React from 'react';
import { motion } from 'framer-motion';
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
  Target
} from 'lucide-react';

const AboutScreen = () => {
  const teamMembers = [
    {
      name: "Frontend Developer",
      role: "React & Three.js",
      description: "PWA Development & 3D Animations"
    },
    {
      name: "Game Designer",
      role: "Level Design & Mechanics",
      description: "Treasure Hunt Logic & Scoring"
    },
    {
      name: "UI/UX Designer",
      role: "Visual Design & UX",
      description: "User Interface & Animations"
    },
    {
      name: "Backend Developer",
      role: "API & Database",
      description: "Server Integration & Data Management"
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
    <div className="h-full overflow-y-auto p-4">
      {/* Header */}
      <motion.div
        className="text-center mb-8"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-center mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center mr-4">
            <Info className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-display font-bold gradient-text">
              About YessPLORA
            </h1>
            <p className="text-sm text-gray-600">NIT Campus Treasure Hunt</p>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm max-w-md mx-auto">
          An interactive treasure hunt game designed to explore the NIT campus through 
          technology, puzzles, and adventure.
        </p>
      </motion.div>

      {/* App Description */}
      <motion.div
        className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-white/20 mb-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-4">About the Game</h2>
        <div className="space-y-3 text-sm text-gray-600">
          <p>
            YessPLORA is a comprehensive Progressive Web Application (PWA) that transforms 
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
        className="mb-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-white/20"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
            >
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center text-white">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Development Team */}
      <motion.div
        className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-white/20 mb-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Development Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-lg p-4 border border-primary-100"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
            >
              <div className="flex items-center space-x-3 mb-2">
                <Users className="w-5 h-5 text-primary-500" />
                <h3 className="font-semibold text-gray-800">{member.name}</h3>
              </div>
              <p className="text-sm font-medium text-primary-600 mb-1">{member.role}</p>
              <p className="text-xs text-gray-600">{member.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Technical Stack */}
      <motion.div
        className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-white/20 mb-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Technical Stack</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Code className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-sm font-medium text-gray-800">React 18+</p>
            <p className="text-xs text-gray-500">Frontend Framework</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Sparkles className="w-6 h-6 text-purple-600" />
            </div>
            <p className="text-sm font-medium text-gray-800">Three.js</p>
            <p className="text-xs text-gray-500">3D Graphics</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Globe className="w-6 h-6 text-green-600" />
            </div>
            <p className="text-sm font-medium text-gray-800">PWA</p>
            <p className="text-xs text-gray-500">Progressive Web App</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Target className="w-6 h-6 text-orange-600" />
            </div>
            <p className="text-sm font-medium text-gray-800">QR Scanner</p>
            <p className="text-xs text-gray-500">Camera Integration</p>
          </div>
        </div>
      </motion.div>

      {/* Game Stats */}
      <motion.div
        className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-xl p-6 mb-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <h2 className="text-xl font-semibold mb-4">Game Statistics</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold">9</div>
            <div className="text-sm opacity-90">Game Levels</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">70</div>
            <div className="text-sm opacity-90">QR Codes</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">30</div>
            <div className="text-sm opacity-90">Teams</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">300</div>
            <div className="text-sm opacity-90">Max Points</div>
          </div>
        </div>
      </motion.div>

      {/* Contact & Links */}
      <motion.div
        className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-white/20 mb-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.9 }}
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Contact & Links</h2>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <Mail className="w-5 h-5 text-primary-500" />
            <span className="text-sm text-gray-600">support@yessplora.com</span>
          </div>
          <div className="flex items-center space-x-3">
            <Github className="w-5 h-5 text-primary-500" />
            <span className="text-sm text-gray-600">github.com/yessplora</span>
          </div>
          <div className="flex items-center space-x-3">
            <Globe className="w-5 h-5 text-primary-500" />
            <span className="text-sm text-gray-600">yessplora.com</span>
          </div>
        </div>
      </motion.div>

      {/* Footer */}
      <motion.div
        className="text-center"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <div className="flex items-center justify-center space-x-2 mb-2">
          <Heart className="w-4 h-4 text-red-500" />
          <span className="text-sm text-gray-600">Made with love for NIT Campus</span>
        </div>
        <p className="text-xs text-gray-500">
          © 2024 YessPLORA. All rights reserved.
        </p>
      </motion.div>
    </div>
  );
};

export default AboutScreen;
