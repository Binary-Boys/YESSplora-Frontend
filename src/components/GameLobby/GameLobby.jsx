import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { theme } from '../../styles/theme';

const GameLobby = ({ onStartGame }) => {
  const [isReady, setIsReady] = useState(false);

  const handleStartGame = () => {
    if (onStartGame) {
      onStartGame();
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        height: '100vh',
        backgroundColor: theme.colors.background,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
        padding: '0',
        boxSizing: 'border-box'
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
          transform: 'scaleX(-1)'
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

      {/* Glassmorphic Top Bar */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{
          position: 'fixed',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '90%',
          maxWidth: '800px',
          minWidth: '320px',
          height: 'clamp(60px, 12vw, 80px)',
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: 'clamp(15px, 3vw, 20px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 clamp(15px, 4vw, 25px)',
          boxShadow: 'rgba(0, 0, 0, 0.3) 0px 8px 32px, rgba(255, 255, 255, 0.2) 0px 1px 0px inset',
          zIndex: 1000,
          opacity: 1
        }}
      >
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="distorted-text"
          style={{
            fontSize: 'clamp(20px, 5vw, 32px)',
            fontWeight: theme.typography.fontWeight.bold,
            color: theme.colors.accent,
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
            letterSpacing: 'clamp(1px, 0.5vw, 2px)',
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden',
            whiteSpace: 'nowrap'
          }}
        >
          YESSPLORA
        </motion.div>
      </motion.div>

      {/* Main Content */}
      <div
        style={{
          width: '100%',
          maxWidth: '1000px',
          padding: '120px 20px 20px',
          zIndex: 10,
          position: 'relative'
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '40px'
          }}
        >
          {/* Welcome Message */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8, type: "spring", stiffness: 200 }}
            style={{
              textAlign: 'center',
              marginBottom: '20px'
            }}
          >
            <h1
              style={{
                fontSize: 'clamp(2.5rem, 8vw, 4rem)',
                fontWeight: theme.typography.fontWeight.bold,
                color: theme.colors.accent,
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
                letterSpacing: '3px',
                marginBottom: '20px'
              }}
            >
              Welcome to the Game Lobby!
            </h1>
            <p
              style={{
                fontSize: 'clamp(1.2rem, 4vw, 1.8rem)',
                color: theme.colors.text,
                fontWeight: theme.typography.fontWeight.medium,
                opacity: 0.9,
                maxWidth: '600px',
                lineHeight: 1.4
              }}
            >
              Your team is ready to begin the ultimate campus exploration adventure
            </p>
          </motion.div>

          {/* Game Status Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '25px',
              padding: '40px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
              textAlign: 'center',
              maxWidth: '600px',
              width: '100%'
            }}
          >
            <div style={{ marginBottom: '30px' }}>
              <div
                style={{
                  fontSize: '4rem',
                  marginBottom: '20px'
                }}
              >
                🎮
              </div>
              <h2
                style={{
                  fontSize: '2rem',
                  fontWeight: theme.typography.fontWeight.bold,
                  color: theme.colors.accent,
                  marginBottom: '15px'
                }}
              >
                Game Ready!
              </h2>
              <p
                style={{
                  fontSize: '1.1rem',
                  color: theme.colors.text,
                  opacity: 0.9,
                  lineHeight: 1.6
                }}
              >
                All systems are operational. Your team can now start exploring the campus and solving challenges.
              </p>
            </div>

            {/* Game Stats */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                gap: '20px',
                marginBottom: '30px'
              }}
            >
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', marginBottom: '8px' }}>🎯</div>
                <div style={{ fontSize: '0.9rem', color: theme.colors.textSecondary }}>9 Locations</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', marginBottom: '8px' }}>💻</div>
                <div style={{ fontSize: '0.9rem', color: theme.colors.textSecondary }}>4 Software</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', marginBottom: '8px' }}>🏃</div>
                <div style={{ fontSize: '0.9rem', color: theme.colors.textSecondary }}>4 Physical</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', marginBottom: '8px' }}>🏆</div>
                <div style={{ fontSize: '0.9rem', color: theme.colors.textSecondary }}>ELO Rating</div>
              </div>
            </div>

            {/* Start Game Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStartGame}
              className="shimmer-button"
              style={{
                padding: '18px 40px',
                borderRadius: '15px',
                border: 'none',
                background: 'linear-gradient(90deg, #c0c0c0 0%, #e8e8e8 25%, #f0f0f0 50%, #e8e8e8 75%, #c0c0c0 100%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 2s ease-in-out infinite',
                color: theme.colors.primary,
                fontSize: '1.2rem',
                fontWeight: theme.typography.fontWeight.bold,
                cursor: 'pointer',
                transition: theme.transitions.fast,
                boxShadow: theme.shadows.neumorphism.raised,
                letterSpacing: '1px',
                width: '100%'
              }}
            >
              🚀 START GAME
            </motion.button>
          </motion.div>

          {/* Help Text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            style={{
              textAlign: 'center'
            }}
          >
            <p
              style={{
                fontSize: '0.9rem',
                color: theme.colors.textSecondary,
                opacity: 0.8
              }}
            >
              Use QR codes to navigate between locations and complete challenges
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default GameLobby;
