import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../../hooks/useAuthStore';
import { useGameStore } from '../../hooks/useGameStore';
import NeonHalo from '../Animation/NeonHalo';
import { 
  Gamepad2, 
  Trophy, 
  Lock, 
  CheckCircle, 
  Play,
  Target,
  QrCode,
  Code,
  Star,
  Sparkles
} from 'lucide-react';

const GamesScreen = () => {
  const { team } = useAuthStore();
  const { levels, completeLevel } = useGameStore();
  const [selectedLevel, setSelectedLevel] = useState(null);

  const getLevelIcon = (type) => {
    switch (type) {
      case 'physical':
        return <QrCode className="w-6 h-6" />;
      case 'software':
        return <Code className="w-6 h-6" />;
      case 'treasure':
        return <Star className="w-6 h-6" />;
      default:
        return <Gamepad2 className="w-6 h-6" />;
    }
  };

  const getLevelStatus = (level) => {
    if (!team) return 'locked';
    
    if (team.completedLevels?.includes(level.id)) {
      return 'completed';
    } else if (level.isUnlocked) {
      return 'available';
    } else {
      return 'locked';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-white bg-opacity-10 border border-white border-opacity-20 text-neutral-light';
      case 'available':
        return 'bg-primary-accent border-primary-accent text-neutral-light';
      case 'locked':
        return 'bg-white bg-opacity-5 border border-white border-opacity-10 text-neutral-light text-opacity-60';
      default:
        return 'bg-white bg-opacity-5 border border-white border-opacity-10 text-neutral-light text-opacity-60';
    }
  };

  const handleLevelClick = (level) => {
    const status = getLevelStatus(level);
    if (status === 'available') {
      setSelectedLevel(level);
    }
  };

  const handleStartLevel = () => {
    if (selectedLevel) {
      // Navigate to specific level game
      console.log('Starting level:', selectedLevel.id);
      setSelectedLevel(null);
    }
  };

  const handleCompleteLevel = (levelId) => {
    completeLevel(levelId);
  };

  return (
    <div className="min-h-screen bg-gradient-bg-dark flex items-center justify-center p-4 relative">
      <div className="w-full max-w-4xl relative z-10">
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
                <Gamepad2 className="w-8 h-8 text-neutral-light" />
              </div>
              <div>
                <h1 className="text-3xl font-bold gradient-text">
                  Game Levels
                </h1>
                <p className="text-sm text-neutral-light text-opacity-80">Complete challenges</p>
              </div>
            </div>
          </NeonHalo>
          
          <p className="text-neutral-light text-opacity-80 text-sm">
            Complete levels to unlock new challenges and earn points
          </p>
        </motion.div>

        {/* Levels Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {levels.map((level, index) => {
            const status = getLevelStatus(level);
            return (
              <NeonHalo key={level.id} intensity={0.8}>
                <motion.div
                  className={`glass-effect rounded-xl p-6 cursor-pointer transition-all duration-300 ${
                    status === 'available' ? 'hover:bg-white hover:bg-opacity-10' : ''
                  }`}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                  onClick={() => handleLevelClick(level)}
                  whileHover={status === 'available' ? { scale: 1.02 } : {}}
                  whileTap={status === 'available' ? { scale: 0.98 } : {}}
                >
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-bg-primary rounded-xl flex items-center justify-center mx-auto mb-3">
                      {getLevelIcon(level.type)}
                    </div>
                    
                    <h3 className="font-semibold text-neutral-light mb-2">
                      Level {level.id}: {level.name}
                    </h3>
                    
                    <p className="text-sm text-neutral-light text-opacity-80 mb-3">
                      {level.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs mb-3">
                      <span className="text-neutral-light text-opacity-60">Type:</span>
                      <span className="text-neutral-light capitalize">{level.type}</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs mb-4">
                      <span className="text-neutral-light text-opacity-60">Points:</span>
                      <span className="text-primary-accent font-medium">{level.points} pts</span>
                    </div>
                    
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
                      {status === 'completed' && <CheckCircle className="w-3 h-3 mr-1" />}
                      {status === 'available' && <Target className="w-3 h-3 mr-1" />}
                      {status === 'locked' && <Lock className="w-3 h-3 mr-1" />}
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </div>
                  </div>
                </motion.div>
              </NeonHalo>
            );
          })}
        </motion.div>

        {/* Level Details Modal */}
        {selectedLevel && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="glass-effect rounded-xl p-6 max-w-md w-full"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="text-center mb-4">
                <NeonHalo intensity={0.8}>
                  <div className="w-16 h-16 bg-gradient-bg-primary rounded-2xl flex items-center justify-center mx-auto mb-3">
                    {getLevelIcon(selectedLevel.type)}
                  </div>
                </NeonHalo>
                <h3 className="text-xl font-semibold text-neutral-light mb-1">
                  Level {selectedLevel.id}: {selectedLevel.name}
                </h3>
                <p className="text-sm text-neutral-light text-opacity-80">
                  {selectedLevel.description}
                </p>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-neutral-light text-opacity-80">Type:</span>
                  <span className="font-medium text-neutral-light capitalize">
                    {selectedLevel.type}
                  </span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-neutral-light text-opacity-80">Points:</span>
                  <span className="font-medium text-primary-accent">
                    {selectedLevel.points} pts
                  </span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-neutral-light text-opacity-80">Required:</span>
                  <span className="font-medium text-neutral-light">
                    {selectedLevel.required}
                  </span>
                </div>
              </div>

              <div className="flex space-x-3">
                <NeonHalo intensity={1}>
                  <motion.button
                    onClick={handleStartLevel}
                    className="flex-1 bg-gradient-bg-primary text-neutral-light py-3 rounded-lg font-semibold hover:bg-gradient-bg-secondary transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Start Level
                  </motion.button>
                </NeonHalo>
                
                <button
                  onClick={() => setSelectedLevel(null)}
                  className="flex-1 bg-white bg-opacity-20 text-neutral-light py-3 rounded-lg font-semibold hover:bg-opacity-30 transition-all duration-300"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default GamesScreen;
