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
  Sparkles,
  TrendingUp
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
    <div className="min-h-screen bg-gradient-bg-dark flex items-center justify-center p-4 relative">
      <div className="w-full max-w-4xl relative z-10 px-4">
        {/* Welcome Header */}
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
                  Welcome to YESSplora
                </h1>
                <p className="text-sm text-neutral-light text-opacity-80">Campus Treasure Hunt</p>
              </div>
            </div>
          </NeonHalo>
          
          <p className="text-neutral-light text-opacity-80 text-sm max-w-2xl mx-auto">
            Ready to explore the campus and discover hidden treasures?
          </p>
        </motion.div>

        {/* Game Progress */}
        {gameProgress && (
          <motion.div
            className="glass-effect rounded-xl p-6 mb-8 max-w-3xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-neutral-light">{gameProgress.completedLevels}</div>
                <div className="text-sm text-neutral-light text-opacity-80">Levels Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-neutral-light">{gameProgress.scannedQRs}</div>
                <div className="text-sm text-neutral-light text-opacity-80">QR Codes Scanned</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-accent">{gameProgress.totalPoints}</div>
                <div className="text-sm text-neutral-light text-opacity-80">Total Points</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-neutral-light">{gameProgress.rank || 'N/A'}</div>
                <div className="text-sm text-neutral-light text-opacity-80">Team Rank</div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Campus Map */}
        <motion.div
          className="glass-effect rounded-xl p-6 mb-8 max-w-4xl mx-auto"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <div className="text-center mb-6">
            <NeonHalo intensity={0.8}>
              <div className="w-12 h-12 bg-gradient-bg-primary rounded-xl flex items-center justify-center mx-auto mb-3">
                <MapPin className="w-6 h-6 text-neutral-light" />
              </div>
            </NeonHalo>
            <h2 className="text-xl font-semibold text-neutral-light mb-2">Interactive Campus Map</h2>
            <p className="text-sm text-neutral-light text-opacity-80 max-w-2xl mx-auto">
              Click on hotspots to start levels and challenges
            </p>
          </div>

          {/* Map Container */}
          <div className="relative bg-white bg-opacity-10 rounded-lg p-4 border border-white border-opacity-20 max-w-3xl mx-auto">
            <div className="relative w-full h-64 md:h-80 bg-gradient-bg-primary bg-opacity-20 rounded-lg overflow-hidden">
              {/* Map Background */}
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${campusMapData.background})` }}
              />
              
              {/* Hotspots */}
              {campusMapData.hotspots.map((hotspot, index) => {
                const status = getHotspotStatus(hotspot);
                return (
                  <motion.button
                    key={hotspot.id}
                    className={`absolute w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
                      getStatusColor(status)
                    }`}
                    style={{
                      left: `${hotspot.coordinates.x}%`,
                      top: `${hotspot.coordinates.y}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                    onClick={() => handleHotspotClick(hotspot)}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {getStatusIcon(status)}
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Status Legend */}
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mt-6">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-full flex items-center justify-center">
                <CheckCircle className="w-2 h-2 text-neutral-light" />
              </div>
              <span className="text-xs text-neutral-light text-opacity-80">Completed</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-primary-accent rounded-full flex items-center justify-center">
                <Target className="w-2 h-2 text-neutral-light" />
              </div>
              <span className="text-xs text-neutral-light text-opacity-80">Available</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-white bg-opacity-5 border border-white border-opacity-10 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-neutral-light bg-opacity-40 rounded-full" />
              </div>
              <span className="text-xs text-neutral-light text-opacity-60">Locked</span>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8 max-w-5xl mx-auto"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <NeonHalo intensity={0.8}>
            <motion.button
              onClick={() => navigate('/scanner')}
              className="glass-effect rounded-xl p-6 text-center hover:bg-white hover:bg-opacity-10 transition-all duration-300 h-full flex flex-col items-center justify-center"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <QrCode className="w-8 h-8 text-primary-accent mb-3" />
              <h3 className="font-semibold text-neutral-light mb-1">QR Scanner</h3>
              <p className="text-sm text-neutral-light text-opacity-80">Scan QR codes to earn points</p>
            </motion.button>
          </NeonHalo>

          <NeonHalo intensity={0.8}>
            <motion.button
              onClick={() => navigate('/games')}
              className="glass-effect rounded-xl p-6 text-center hover:bg-white hover:bg-opacity-10 transition-all duration-300 h-full flex flex-col items-center justify-center"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Trophy className="w-8 h-8 text-primary-accent mb-3" />
              <h3 className="font-semibold text-neutral-light mb-1">Games</h3>
              <p className="text-sm text-neutral-light text-opacity-80">Play interactive challenges</p>
            </motion.button>
          </NeonHalo>

          <NeonHalo intensity={0.8}>
            <motion.button
              onClick={() => navigate('/leaderboard')}
              className="glass-effect rounded-xl p-6 text-center hover:bg-white hover:bg-opacity-10 transition-all duration-300 h-full flex flex-col items-center justify-center sm:col-span-2 lg:col-span-1"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <TrendingUp className="w-8 h-8 text-primary-accent mb-3" />
              <h3 className="font-semibold text-neutral-light mb-1">Leaderboard</h3>
              <p className="text-sm text-neutral-light text-opacity-80">Check team rankings</p>
            </motion.button>
          </NeonHalo>
        </motion.div>

        {/* Hotspot Modal */}
        <AnimatePresence>
          {showHotspotModal && selectedHotspot && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="glass-effect rounded-xl p-6 max-w-md w-full mx-4"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
              >
                <div className="text-center mb-6">
                  <NeonHalo intensity={0.8}>
                    <div className="w-12 h-12 bg-gradient-bg-primary rounded-xl flex items-center justify-center mx-auto mb-3">
                      <MapPin className="w-6 h-6 text-neutral-light" />
                    </div>
                  </NeonHalo>
                  <h3 className="text-xl font-semibold text-neutral-light mb-2">
                    {selectedHotspot.name}
                  </h3>
                  <p className="text-sm text-neutral-light text-opacity-80">
                    {selectedHotspot.description}
                  </p>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-neutral-light text-opacity-80">Level:</span>
                    <span className="font-medium text-neutral-light">
                      Level {selectedHotspot.level}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-neutral-light text-opacity-80">Type:</span>
                    <span className="font-medium text-neutral-light capitalize">
                      {selectedHotspot.type}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-neutral-light text-opacity-80">Status:</span>
                    <span className={`font-medium ${
                      getHotspotStatus(selectedHotspot) === 'completed' 
                        ? 'text-neutral-light' 
                        : getHotspotStatus(selectedHotspot) === 'available'
                        ? 'text-primary-accent'
                        : 'text-neutral-light text-opacity-60'
                    }`}>
                      {getHotspotStatus(selectedHotspot).charAt(0).toUpperCase() + getHotspotStatus(selectedHotspot).slice(1)}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <NeonHalo intensity={1}>
                    <motion.button
                      onClick={() => handleStartLevel(selectedHotspot.level)}
                      disabled={getHotspotStatus(selectedHotspot) === 'locked'}
                      className="flex-1 bg-gradient-bg-primary text-neutral-light py-3 rounded-lg font-semibold hover:bg-gradient-bg-secondary transition-all duration-300 transform hover:scale-105 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Start Level
                    </motion.button>
                  </NeonHalo>
                  
                  <button
                    onClick={() => setShowHotspotModal(false)}
                    className="flex-1 bg-white bg-opacity-20 text-neutral-light py-3 rounded-lg font-semibold hover:bg-opacity-30 transition-all duration-300"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default HomeScreen;
