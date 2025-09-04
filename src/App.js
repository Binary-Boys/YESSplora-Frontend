import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

// Import components
import IntroScreen from './components/Animation/IntroScreen';
import BackgroundAnimation from './components/Animation/BackgroundAnimation';
import MouseTrail from './components/Animation/MouseTrail';
import NeonHalo from './components/Animation/NeonHalo';

import AuthScreen from './components/Auth/AuthScreen';
import AdminLogin from './components/Auth/AdminLogin';
import TeamRegistration from './components/Auth/TeamRegistration';
import MainLayout from './components/Layout/MainLayout';
import HomeScreen from './components/Home/HomeScreen';
import GamesScreen from './components/Games/GamesScreen';
import LeaderboardScreen from './components/Leaderboard/LeaderboardScreen';
import QRScannerScreen from './components/QRScanner/QRScannerScreen';
import AboutScreen from './components/About/AboutScreen';
import TutorialScreen from './components/Tutorial/TutorialScreen';

// Import hooks and utilities
import { useAuthStore } from './hooks/useAuthStore';
import { useGameStore } from './hooks/useGameStore';
import { registerServiceWorker } from './utils/pwaUtils';
import { loadGameData } from './utils/gameDataLoader';

// Import styles
import './index.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showIntro, setShowIntro] = useState(true);
  const { isAuthenticated, hasCompletedTutorial } = useAuthStore();
  const { initializeGame } = useGameStore();

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Register service worker for PWA (non-blocking)
        registerServiceWorker().catch(console.error);
        
        // Load game data (non-blocking)
        loadGameData().catch(console.error);
        
        // Initialize game state
        initializeGame();
        
        // Show intro for 2 seconds (reduced from 3)
        setTimeout(() => {
          setShowIntro(false);
          setIsLoading(false);
        }, 2000);
      } catch (error) {
        console.error('Failed to initialize app:', error);
        setIsLoading(false);
      }
    };

    initializeApp();
  }, [initializeGame]);

  // Show loading screen while initializing
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-bg-dark flex items-center justify-center relative overflow-hidden">
        <BackgroundAnimation />
        <MouseTrail />
        <div className="text-center relative z-10">
          <NeonHalo intensity={1.5}>
            <div className="loading-spinner mx-auto mb-4"></div>
          </NeonHalo>
          <h2 className="text-xl font-bold text-neutral-light mb-2 gradient-text">
            Loading YESSplora
          </h2>
          <p className="text-neutral-light text-opacity-80">Preparing your adventure...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
          <div className="App min-h-screen bg-gradient-bg-dark relative overflow-hidden">
      <BackgroundAnimation />
      <MouseTrail />

        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: '#FFFFFF',
            },
          }}
        />
        <AnimatePresence mode="wait">
          {showIntro ? (
            <IntroScreen key="intro" />
          ) : (
            <motion.div
              key="main"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="relative z-10"
            >
              <Routes>
                {/* Public Routes */}
                <Route 
                  path="/" 
                  element={
                    !isAuthenticated ? (
                      <AuthScreen />
                    ) : !hasCompletedTutorial ? (
                      <TutorialScreen />
                    ) : (
                      <Navigate to="/home" replace />
                    )
                  } 
                />
                
                <Route path="/auth" element={<AuthScreen />} />
                <Route path="/admin-login" element={<AdminLogin />} />
                <Route path="/register" element={<TeamRegistration />} />
                <Route path="/tutorial" element={<TutorialScreen />} />

                {/* Protected Routes */}
                <Route 
                  path="/*" 
                  element={
                    isAuthenticated ? (
                      <MainLayout>
                        <Routes>
                          <Route path="/home" element={<HomeScreen />} />
                          <Route path="/games" element={<GamesScreen />} />
                          <Route path="/leaderboard" element={<LeaderboardScreen />} />
                          <Route path="/scanner" element={<QRScannerScreen />} />
                          <Route path="/about" element={<AboutScreen />} />
                          <Route path="*" element={<Navigate to="/home" replace />} />
                        </Routes>
                      </MainLayout>
                    ) : (
                      <Navigate to="/" replace />
                    )
                  } 
                />
              </Routes>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Router>
  );
}

export default App;

