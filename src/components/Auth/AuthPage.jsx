import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { theme } from '../../styles/theme';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import GameSpecs from './GameSpecs';

const AuthPage = ({ onLoginSuccess }) => {
  const [currentView, setCurrentView] = useState('specs'); // 'specs', 'login', 'signup'
  const [isVisible, setIsVisible] = useState(true);

  const handleLoginClick = () => {
    setCurrentView('login');
  };

  const handleBackToSpecs = () => {
    setCurrentView('specs');
  };

  const handleSignupClick = () => {
    setCurrentView('signup');
  };

  const handleBackToLogin = () => {
    setCurrentView('login');
  };

  const handleRedirectToLogin = () => {
    setCurrentView('login');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        background: 'linear-gradient(-45deg, #580404, #000000, #580404, #2a0202)',
        backgroundSize: '400% 400%',
        animation: 'gradientShift 15s ease infinite',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Floating dots background */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 1,
          backgroundImage: 
            'radial-gradient(2px 2px at 20px 30px, rgba(255, 255, 255, 0.6), transparent),' +
            'radial-gradient(2px 2px at 40px 70px, rgba(255, 255, 255, 0.4), transparent),' +
            'radial-gradient(1px 1px at 90px 40px, rgba(255, 255, 255, 0.8), transparent),' +
            'radial-gradient(1px 1px at 130px 80px, rgba(255, 255, 255, 0.5), transparent),' +
            'radial-gradient(2px 2px at 160px 30px, rgba(255, 255, 255, 0.3), transparent),' +
            'radial-gradient(1px 1px at 200px 60px, rgba(255, 255, 255, 0.7), transparent)',
          backgroundRepeat: 'repeat',
          backgroundSize: '500px 500px',
          animation: 'floatUp 20s linear infinite'
        }}
      />

      {/* Animated Robot Images */}
      <motion.img
        src="/robot-character.png"
        alt="Robot Character"
        style={{
          position: 'absolute',
          top: '15%',
          left: '5%',
          width: '120px',
          height: 'auto',
          opacity: 0.3,
          zIndex: 1
        }}
        animate={{
          y: [0, -10, 0],
          rotate: [0, 5, 0]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.img
        src="/robot-character.png"
        alt="Robot Character"
        style={{
          position: 'absolute',
          top: '25%',
          right: '8%',
          width: '100px',
          height: 'auto',
          opacity: 0.25,
          zIndex: 1,
          transform: 'scaleX(-1)' // Flip horizontally
        }}
        animate={{
          y: [0, 15, 0],
          rotate: [0, -3, 0]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />

      <motion.img
        src="/robot-character.png"
        alt="Robot Character"
        style={{
          position: 'absolute',
          bottom: '20%',
          left: '10%',
          width: '80px',
          height: 'auto',
          opacity: 0.2,
          zIndex: 1
        }}
        animate={{
          y: [0, -8, 0],
          rotate: [0, 2, 0]
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />

      {/* Top bar removed for all auth views (specs, login, signup) */}

      {/* Main Content */}
      <div
        style={{
          width: '100%',
          maxWidth: '1000px',
          padding: '40px 20px 20px',
          zIndex: 10,
          position: 'relative'
        }}
      >
        <AnimatePresence mode="wait">
          {currentView === 'specs' && (
            <GameSpecs key="specs" onLoginClick={handleLoginClick} />
          )}
          {currentView === 'login' && (
            <LoginForm key="login" onBackClick={handleBackToSpecs} onSignupClick={handleSignupClick} onLoginSuccess={onLoginSuccess} />
          )}
          {currentView === 'signup' && (
            <SignupForm key="signup" onBackClick={handleBackToLogin} onSignupSuccess={onLoginSuccess} onRedirectToLogin={handleRedirectToLogin} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AuthPage;
