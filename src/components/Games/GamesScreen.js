import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../../hooks/useAuthStore';
import { useGameStore } from '../../hooks/useGameStore';
import { 
  Gamepad2, 
  Trophy, 
  Lock, 
  CheckCircle, 
  Play,
  Target,
  QrCode,
  Code,
  Star
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
        return 'bg-success-100 border-success-200 text-success-700';
      case 'available':
        return 'bg-primary-100 border-primary-200 text-primary-700';
      case 'locked':
        return 'bg-gray-100 border-gray-200 text-gray-500';
      default:
        return 'bg-gray-100 border-gray-200 text-gray-500';
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
    <div className="h-full overflow-y-auto p-4">
      {/* Header */}
      <motion.div
        className="mb-6"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-display font-bold text-gray-800">Game Levels</h1>
          <div className="flex items-center space-x-2">
            <Trophy className="w-5 h-5 text-accent-500" />
            <span className="text-sm font-medium text-gray-600">
              {team?.points || 0} pts
            </span>
          </div>
        </div>
        <p className="text-gray-600 text-sm">
          Complete levels to unlock new challenges and earn points
        </p>
      </motion.div>

      {/* Levels Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {levels.map((level, index) => {
          const status = getLevelStatus(level);
          
          return (
            <motion.div
              key={level.id}
              className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-white/20 cursor-pointer transition-all duration-200 hover:shadow-lg"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => handleLevelClick(level)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    status === 'completed' ? 'bg-success-500' :
                    status === 'available' ? 'bg-primary-500' : 'bg-gray-400'
                  }`}>
                    {getLevelIcon(level.type)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{level.name}</h3>
                    <p className="text-xs text-gray-500">Level {level.id}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-1">
                  {status === 'completed' && (
                    <CheckCircle className="w-5 h-5 text-success-500" />
                  )}
                  {status === 'available' && (
                    <Target className="w-5 h-5 text-primary-500" />
                  )}
                  {status === 'locked' && (
                    <Lock className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {level.description}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    getStatusColor(status)
                  }`}>
                    {status}
                  </span>
                  <span className="text-xs text-gray-500">
                    {level.points} pts
                  </span>
                </div>
                
                {status === 'available' && (
                  <motion.button
                    className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-3 py-1 rounded-lg text-xs font-medium flex items-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStartLevel();
                    }}
                  >
                    <Play className="w-3 h-3 mr-1" />
                    Start
                  </motion.button>
                )}
                
                {status === 'completed' && (
                  <motion.button
                    className="bg-success-500 text-white px-3 py-1 rounded-lg text-xs font-medium flex items-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCompleteLevel(level.id);
                    }}
                  >
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Completed
                  </motion.button>
                )}
              </div>

              {/* Progress Indicator */}
              {status === 'available' && (
                <motion.div
                  className="w-full bg-gray-200 rounded-full h-1 mt-3"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <div className="bg-gradient-to-r from-primary-500 to-secondary-500 h-1 rounded-full w-0 animate-pulse" />
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Level Details Modal */}
      {selectedLevel && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedLevel(null)}
        >
          <motion.div
            className="bg-white rounded-xl p-6 max-w-md w-full"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center mb-4">
              <div className={`w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-3 ${
                getLevelStatus(selectedLevel) === 'available' ? 'bg-primary-500' : 'bg-gray-400'
              }`}>
                {getLevelIcon(selectedLevel.type)}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-1">
                {selectedLevel.name}
              </h3>
              <p className="text-sm text-gray-600">
                Level {selectedLevel.id}
              </p>
            </div>

            <div className="space-y-3 mb-6">
              <p className="text-sm text-gray-700">
                {selectedLevel.description}
              </p>
              
              <div className="bg-gray-50 rounded-lg p-3">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Instructions:</h4>
                <ul className="text-xs text-gray-600 space-y-1">
                  {selectedLevel.instructions?.map((instruction, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-1.5 mr-2 flex-shrink-0" />
                      {instruction}
                    </li>
                  ))}
                </ul>
              </div>

              {selectedLevel.hints && (
                <div className="bg-yellow-50 rounded-lg p-3">
                  <h4 className="text-sm font-medium text-yellow-700 mb-2">Hints:</h4>
                  <ul className="text-xs text-yellow-600 space-y-1">
                    {selectedLevel.hints.map((hint, index) => (
                      <li key={index} className="flex items-start">
                        <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-1.5 mr-2 flex-shrink-0" />
                        {hint}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="flex space-x-3">
              <motion.button
                onClick={handleStartLevel}
                className="flex-1 bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-3 rounded-lg font-medium flex items-center justify-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Play className="w-4 h-4 mr-2" />
                Start Level
              </motion.button>
              
              <button
                onClick={() => setSelectedLevel(null)}
                className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default GamesScreen;
