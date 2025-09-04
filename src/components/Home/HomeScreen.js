import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../hooks/useAuthStore';
import { useGameStore } from '../../hooks/useGameStore';
import { campusMapData } from '../../utils/gameDataLoader';
import NeonHalo from '../Animation/NeonHalo';
import { 
  MapPin, 
  Trophy, 
  QrCode, 
  Play, 
  Target,
  CheckCircle,
  Lock,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Award
} from 'lucide-react';

const HomeScreen = () => {
  const navigate = useNavigate();
  const { team } = useAuthStore();
  const { levels, getGameProgress } = useGameStore();
  const [selectedHotspot, setSelectedHotspot] = useState(null);
  const [showHotspotModal, setShowHotspotModal] = useState(false);
  const [gameProgress, setGameProgress] = useState(null);

  useEffect(() => {
    const progress = getGameProgress();
    setGameProgress(progress);
  }, [getGameProgress]);

  const handleHotspotClick = (hotspot) => {
    setSelectedHotspot(hotspot);
    setShowHotspotModal(true);
  };

  const handleStartLevel = (levelId) => {
    setShowHotspotModal(false);
    navigate(`/games?level=${levelId}`);
  };

  const getHotspotStatus = (hotspot) => {
    if (!team) return 'locked';
    
    const level = levels.find(l => l.id === hotspot.level);
    if (!level) return 'locked';
    
    if (team.completedLevels?.includes(level.id)) {
      return 'completed';
    } else if (level.isUnlocked) {
      return 'available';
    } else {
      return 'locked';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-success-500" />;
      case 'available':
        return <Target className="w-4 h-4 text-primary-500" />;
      case 'locked':
        return <Lock className="w-4 h-4 text-gray-400" />;
      default:
        return <MapPin className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500 border-green-400 text-neutral-light';
      case 'available':
        return 'bg-primary-accent border-primary-accent text-neutral-light';
      case 'locked':
        return 'bg-white bg-opacity-20 border-white border-opacity-30 text-neutral-light text-opacity-60';
      default:
        return 'bg-white bg-opacity-20 border-white border-opacity-30 text-neutral-light text-opacity-60';
    }
  };

  return (
    <div className="h-full overflow-y-auto bg-gradient-bg-dark pt-20">
      {/* Welcome Header */}
      <motion.div
        className="px-4 pb-4"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <NeonHalo intensity={1.2}>
          <div className="text-center mb-6">
            <div className="flex items-center justify-center mb-3">
              <div className="w-12 h-12 bg-gradient-bg-primary rounded-xl flex items-center justify-center mr-3">
                <Sparkles className="w-6 h-6 text-neutral-light" />
              </div>
              <div>
                <h1 className="text-2xl font-bold gradient-text">
                  Welcome Back!
                </h1>
                <p className="text-sm text-neutral-light text-opacity-80">
                  {team?.name || 'Team'}
                </p>
              </div>
            </div>
          </div>
        </NeonHalo>
      </motion.div>

      {/* Progress Overview */}
      <motion.div
        className="px-4 mb-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <NeonHalo intensity={0.8}>
          <div className="glass-effect rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-neutral-light">Your Progress</h2>
              <div className="flex items-center space-x-2">
                <Trophy className="w-5 h-5 text-primary-accent" />
                <span className="text-sm font-medium text-neutral-light">
                  {team?.points || 0} pts
                </span>
              </div>
            </div>
          
          <div className="grid grid-cols-3 gap-4 mb-4">
            <NeonHalo intensity={0.6}>
              <div className="text-center p-3 glass-effect rounded-lg">
                <div className="text-2xl font-bold text-primary-accent">
                  {gameProgress?.levels?.completed || 0}
                </div>
                <div className="text-xs text-neutral-light text-opacity-80">Levels</div>
              </div>
            </NeonHalo>
            <NeonHalo intensity={0.6}>
              <div className="text-center p-3 glass-effect rounded-lg">
                <div className="text-2xl font-bold text-primary-accent">
                  {gameProgress?.qrCodes?.scanned || 0}
                </div>
                <div className="text-xs text-neutral-light text-opacity-80">QR Scanned</div>
              </div>
            </NeonHalo>
            <NeonHalo intensity={0.6}>
              <div className="text-center p-3 glass-effect rounded-lg">
                <div className="text-2xl font-bold text-primary-accent">
                  {gameProgress?.levels?.percentage || 0}%
                </div>
                <div className="text-xs text-neutral-light text-opacity-80">Complete</div>
              </div>
            </NeonHalo>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-white bg-opacity-20 rounded-full h-3">
            <motion.div
              className="bg-gradient-bg-primary h-3 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${gameProgress?.levels?.percentage || 0}%` }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </div>
        </div>
      </NeonHalo>
      </motion.div>

      {/* Campus Map */}
      <motion.div
        className="px-4 mb-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <NeonHalo intensity={0.8}>
          <div className="glass-effect rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-neutral-light">Campus Map</h2>
              <MapPin className="w-5 h-5 text-primary-accent" />
            </div>
          
          {/* Map Container */}
          <div className="relative w-full h-64 bg-gradient-to-br from-primary-dark to-primary-accent rounded-lg overflow-hidden border-2 border-white border-opacity-20">
            {/* Map Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-dark via-primary-accent to-primary-dark opacity-80" />
            
            {/* Hotspots */}
            {campusMapData.hotspots.map((hotspot) => {
              const status = getHotspotStatus(hotspot);
              
              return (
                <motion.button
                  key={hotspot.id}
                  className={`absolute w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-200 hover:scale-110 ${
                    getStatusColor(status)
                  }`}
                  style={{
                    left: `${hotspot.coordinates.x}%`,
                    top: `${hotspot.coordinates.y}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                  onClick={() => handleHotspotClick(hotspot)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {getStatusIcon(status)}
                  
                  {/* Pulse Animation for Available Hotspots */}
                  {status === 'available' && (
                    <motion.div
                      className="absolute inset-0 rounded-full bg-primary-400"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.6, 0, 0.6],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  )}
                </motion.button>
              );
            })}
            
            {/* Map Labels */}
            <div className="absolute bottom-2 left-2 text-xs text-neutral-light font-medium">
              NIT Campus
            </div>
          </div>
          
          {/* Legend */}
          <div className="flex items-center justify-center space-x-4 mt-3 text-xs">
            <div className="flex items-center space-x-1">
              <CheckCircle className="w-3 h-3 text-green-400" />
              <span className="text-neutral-light text-opacity-80">Completed</span>
            </div>
            <div className="flex items-center space-x-1">
              <Target className="w-3 h-3 text-primary-accent" />
              <span className="text-neutral-light text-opacity-80">Available</span>
            </div>
            <div className="flex items-center space-x-1">
              <Lock className="w-3 h-3 text-neutral-light text-opacity-60" />
              <span className="text-neutral-light text-opacity-80">Locked</span>
            </div>
          </div>
        </div>
      </NeonHalo>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        className="px-4 mb-4"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="grid grid-cols-2 gap-3">
          <motion.button
            onClick={() => navigate('/scanner')}
            className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white p-4 rounded-xl flex flex-col items-center space-y-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <QrCode className="w-6 h-6" />
            <span className="font-medium">Scan QR</span>
          </motion.button>
          
          <motion.button
            onClick={() => navigate('/games')}
            className="bg-gradient-to-r from-accent-500 to-warning-500 text-white p-4 rounded-xl flex flex-col items-center space-y-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Play className="w-6 h-6" />
            <span className="font-medium">Play Games</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Hotspot Modal */}
      <AnimatePresence>
        {showHotspotModal && selectedHotspot && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowHotspotModal(false)}
          >
            <motion.div
              className="bg-white rounded-xl p-6 max-w-sm w-full"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-1">
                  {selectedHotspot.name}
                </h3>
                <p className="text-sm text-gray-600">
                  {selectedHotspot.description}
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Level:</span>
                  <span className="font-medium text-gray-800">
                    Level {selectedHotspot.level}
                  </span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Status:</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    getStatusColor(getHotspotStatus(selectedHotspot))
                  }`}>
                    {getHotspotStatus(selectedHotspot)}
                  </span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Points:</span>
                  <span className="font-medium text-gray-800">
                    {selectedHotspot.level * 10} pts
                  </span>
                </div>
              </div>
              
              <div className="mt-6 space-y-2">
                {getHotspotStatus(selectedHotspot) === 'available' && (
                  <motion.button
                    onClick={() => handleStartLevel(selectedHotspot.level)}
                    className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-3 rounded-lg font-medium flex items-center justify-center"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Start Level {selectedHotspot.level}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </motion.button>
                )}
                
                <button
                  onClick={() => setShowHotspotModal(false)}
                  className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HomeScreen;
