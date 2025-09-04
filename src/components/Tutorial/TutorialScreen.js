import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../hooks/useAuthStore';
import NeonHalo from '../Animation/NeonHalo';
import { 
  Play, 
  QrCode, 
  MapPin, 
  Trophy, 
  Target,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Star,
  Sparkles
} from 'lucide-react';

const TutorialScreen = () => {
  const navigate = useNavigate();
  const { completeTutorial } = useAuthStore();
  const [currentStep, setCurrentStep] = useState(0);

  const tutorialSteps = [
    {
      title: "Welcome to YESSplora!",
      description: "Get ready for an exciting treasure hunt adventure across the NIT campus.",
      icon: <Star className="w-8 h-8 text-primary-accent" />,
      content: (
        <div className="space-y-3">
          <p className="text-sm text-neutral-light text-opacity-80">
            You're about to embark on a journey through 9 challenging levels, 
            combining physical exploration with digital problem-solving.
          </p>
          <div className="bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg p-3">
            <p className="text-sm text-neutral-light">
              <strong>Objective:</strong> Complete all levels, scan QR codes, 
              and earn points to become the ultimate treasure hunter!
            </p>
          </div>
        </div>
      )
    },
    {
      title: "Interactive Campus Map",
      description: "Navigate through the campus using our interactive map with hotspots.",
      icon: <MapPin className="w-8 h-8 text-primary-accent" />,
      content: (
        <div className="space-y-3">
          <p className="text-sm text-neutral-light text-opacity-80">
            The campus map shows different locations with interactive hotspots. 
            Each hotspot represents a level or challenge you need to complete.
          </p>
                      <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="text-center">
                <div className="w-6 h-6 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-full flex items-center justify-center mx-auto mb-1">
                  <CheckCircle className="w-3 h-3 text-neutral-light" />
                </div>
                <span className="text-neutral-light text-opacity-80">Completed</span>
              </div>
              <div className="text-center">
                <div className="w-6 h-6 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-full flex items-center justify-center mx-auto mb-1">
                  <Target className="w-3 h-3 text-neutral-light" />
                </div>
                <span className="text-neutral-light text-opacity-80">Available</span>
              </div>
              <div className="text-center">
                <div className="w-6 h-6 bg-white bg-opacity-5 border border-white border-opacity-10 rounded-full flex items-center justify-center mx-auto mb-1">
                  <div className="w-3 h-3 bg-neutral-light bg-opacity-40 rounded-full" />
                </div>
                <span className="text-neutral-light text-opacity-60">Locked</span>
              </div>
            </div>
        </div>
      )
    },
    {
      title: "QR Code Scanning",
      description: "Use your camera to scan QR codes and earn points.",
      icon: <QrCode className="w-8 h-8 text-primary-accent" />,
      content: (
        <div className="space-y-3">
          <p className="text-sm text-neutral-light text-opacity-80">
            QR codes are scattered throughout the campus. Each scan earns you points 
            and helps you progress through the game.
          </p>
          <div className="bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg p-3">
            <h4 className="text-sm font-medium text-neutral-light mb-2">QR Code Types:</h4>
            <ul className="text-xs text-neutral-light text-opacity-80 space-y-1">
              <li>• <strong>Stall QR:</strong> 5 points each</li>
              <li>• <strong>Team QR:</strong> 3 points each</li>
              <li>• <strong>Treasure QR:</strong> 10 points each</li>
            </ul>
          </div>
          <p className="text-xs text-neutral-light text-opacity-60">
            <strong>Note:</strong> Each QR code can only be scanned once per team.
          </p>
        </div>
      )
    },
    {
      title: "Game Levels",
      description: "Complete 9 levels with different types of challenges.",
      icon: <Trophy className="w-8 h-8 text-primary-accent" />,
      content: (
        <div className="space-y-3">
          <p className="text-sm text-neutral-light text-opacity-80">
            The game consists of 9 levels with different types of challenges:
          </p>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-white bg-opacity-10 border border-white border-opacity-20 rounded flex items-center justify-center">
                <QrCode className="w-2 h-2 text-neutral-light" />
              </div>
              <span className="text-sm text-neutral-light text-opacity-80">4 Physical Games (QR scanning)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-white bg-opacity-10 border border-white border-opacity-20 rounded flex items-center justify-center">
                <div className="w-2 h-2 bg-neutral-light rounded" />
              </div>
              <span className="text-sm text-neutral-light text-opacity-80">4 Software Games (puzzles)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-white bg-opacity-10 border border-white border-opacity-20 rounded flex items-center justify-center">
                <Star className="w-2 h-2 text-neutral-light" />
              </div>
              <span className="text-sm text-neutral-light text-opacity-80">1 Treasure Hunt Finale</span>
            </div>
          </div>
          <div className="bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg p-3">
            <p className="text-sm text-neutral-light">
              <strong>Tip:</strong> Complete all 8 regular levels to unlock the final treasure hunt!
            </p>
          </div>
        </div>
      )
    },
    {
      title: "Point System",
      description: "Understand how to earn and track your points.",
      icon: <Target className="w-8 h-8 text-primary-accent" />,
      content: (
        <div className="space-y-3">
          <p className="text-sm text-neutral-light text-opacity-80">
            Points are earned through various activities in the game:
          </p>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-neutral-light text-opacity-80">QR Code Scans:</span>
              <span className="font-medium text-neutral-light">3-10 points each</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-neutral-light text-opacity-80">Level Completion:</span>
              <span className="font-medium text-neutral-light">10 points each</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-neutral-light text-opacity-80">Treasure Hunt:</span>
              <span className="font-medium text-neutral-light">50 points</span>
            </div>
          </div>
          <div className="bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg p-3">
            <p className="text-sm text-neutral-light">
              <strong>Goal:</strong> Reach the maximum of 300 points to become the champion!
            </p>
          </div>
        </div>
      )
    },
    {
      title: "Leaderboard",
      description: "Compete with other teams and track your progress.",
      icon: <Trophy className="w-8 h-8 text-primary-accent" />,
      content: (
        <div className="space-y-3">
          <p className="text-sm text-neutral-light text-opacity-80">
            The leaderboard shows real-time rankings of all participating teams. 
            Your team's position is updated as you earn points.
          </p>
          <div className="bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg p-3">
            <h4 className="text-sm font-medium text-neutral-light mb-2">Top 3 Rewards:</h4>
            <ul className="text-xs text-neutral-light text-opacity-80 space-y-1">
              <li>🥇 1st Place: Ultimate Champion</li>
              <li>🥈 2nd Place: Silver Medalist</li>
              <li>🥉 3rd Place: Bronze Medalist</li>
            </ul>
          </div>
          <p className="text-xs text-neutral-light text-opacity-60">
            <strong>Note:</strong> Leaderboard updates every 30 seconds.
          </p>
        </div>
      )
    },
    {
      title: "You're Ready!",
      description: "Start your adventure and become the ultimate treasure hunter.",
      icon: <Play className="w-8 h-8 text-primary-accent" />,
      content: (
        <div className="space-y-3">
          <p className="text-sm text-neutral-light text-opacity-80">
            You now have all the knowledge needed to succeed in YESSplora! 
            Remember to work as a team and have fun exploring the campus.
          </p>
          <div className="bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg p-4">
            <h4 className="text-sm font-medium text-neutral-light mb-2">Final Tips:</h4>
            <ul className="text-xs text-neutral-light text-opacity-80 space-y-1">
              <li>• Work together as a team</li>
              <li>• Plan your route efficiently</li>
              <li>• Don't forget to scan all QR codes</li>
              <li>• Complete levels in order</li>
              <li>• Have fun and enjoy the adventure!</li>
            </ul>
          </div>
        </div>
      )
    }
  ];

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      completeTutorial();
      // Navigate to home page after completing tutorial
      setTimeout(() => {
        navigate('/home');
      }, 1000);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    completeTutorial();
    // Navigate to home page after skipping tutorial
    setTimeout(() => {
      navigate('/home');
    }, 1000);
  };

  const currentStepData = tutorialSteps[currentStep];

  return (
    <div className="min-h-screen bg-gradient-bg-dark flex items-center justify-center p-4 relative">
      <div className="w-full max-w-2xl relative z-10">
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
                <Sparkles className="w-8 h-8 text-neutral-light" />
              </div>
              <div>
                <h1 className="text-3xl font-bold gradient-text">
                  YESSplora
                </h1>
                <p className="text-sm text-neutral-light text-opacity-80">Tutorial Guide</p>
              </div>
            </div>
          </NeonHalo>
          
          <p className="text-neutral-light text-opacity-80 text-sm">
            Learn how to navigate and succeed in the treasure hunt!
          </p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          className="mb-8"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-neutral-light text-opacity-80">
              Step {currentStep + 1} of {tutorialSteps.length}
            </span>
            <button
              onClick={handleSkip}
              className="text-sm text-primary-accent hover:text-primary-accent hover:opacity-80 transition-opacity"
            >
              Skip Tutorial
            </button>
          </div>
          <div className="w-full bg-white bg-opacity-30 rounded-full h-2">
            <motion.div
              className="bg-primary-accent h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + 1) / tutorialSteps.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </motion.div>

        {/* Tutorial Content */}
        <motion.div
          className="glass-effect rounded-xl p-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <div className="text-center mb-6">
            <NeonHalo intensity={0.8}>
              <div className="w-16 h-16 bg-gradient-bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                {currentStepData.icon}
              </div>
            </NeonHalo>
            <h2 className="text-2xl font-bold text-neutral-light mb-2">
              {currentStepData.title}
            </h2>
            <p className="text-neutral-light text-opacity-80">
              {currentStepData.description}
            </p>
          </div>

          <div className="mb-6">
            {currentStepData.content}
          </div>
        </motion.div>

        {/* Navigation */}
        <motion.div
          className="flex items-center justify-between pt-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <NeonHalo intensity={0.6}>
            <motion.button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className={`flex items-center px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                currentStep === 0
                  ? 'text-neutral-light text-opacity-40 cursor-not-allowed'
                  : 'text-neutral-light text-opacity-80 hover:text-neutral-light hover:bg-white hover:bg-opacity-10'
              }`}
              whileHover={currentStep > 0 ? { scale: 1.02 } : {}}
              whileTap={currentStep > 0 ? { scale: 0.98 } : {}}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </motion.button>
          </NeonHalo>

          <NeonHalo intensity={1.5}>
            <motion.button
              onClick={handleNext}
              className="flex items-center bg-gradient-bg-primary text-neutral-light px-6 py-3 rounded-lg font-semibold hover:bg-gradient-bg-secondary transition-all duration-300 transform hover:scale-105"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {currentStep === tutorialSteps.length - 1 ? 'Start Adventure' : 'Next'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </motion.button>
          </NeonHalo>
        </motion.div>

        {/* Step Indicators */}
        <motion.div
          className="flex items-center justify-center space-x-2 mt-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          {tutorialSteps.map((_, index) => (
            <motion.div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                index === currentStep
                  ? 'bg-primary-accent scale-125'
                  : index < currentStep
                  ? 'bg-success-400'
                  : 'bg-neutral-light bg-opacity-30'
              }`}
              whileHover={{ scale: 1.2 }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default TutorialScreen;
