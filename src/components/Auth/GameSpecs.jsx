import React from 'react';
import { motion } from 'framer-motion';
import { theme } from '../../styles/theme';

const GameSpecs = ({ onLoginClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.6 }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '40px',
        width: '100%',
        maxWidth: '800px'
      }}
    >
      {/* Main Title */}
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
          className="distorted-text"
          style={{
            fontSize: 'clamp(2.5rem, 8vw, 4rem)',
            fontWeight: theme.typography.fontWeight.bold,
            color: theme.colors.accent,
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
            letterSpacing: '3px',
            marginBottom: '20px',
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden'
          }}
        >
          YESSPLORA
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
          The Ultimate Campus Exploration Adventure
        </p>
      </motion.div>

      {/* Featured Robot Character */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        style={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '40px 0'
        }}
      >
        <motion.img
          src="/robot-character.png"
          alt="YESSPLORA Robot Character"
          style={{
            width: 'clamp(200px, 30vw, 350px)',
            height: 'auto',
            filter: 'drop-shadow(0 10px 30px rgba(0, 0, 0, 0.3))',
            zIndex: 10
          }}
          animate={{
            y: [0, -10, 0],
            rotate: [0, 2, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Glow effect behind robot */}
        <motion.div
          style={{
            position: 'absolute',
            width: 'clamp(250px, 35vw, 400px)',
            height: 'clamp(250px, 35vw, 400px)',
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%)',
            borderRadius: '50%',
            zIndex: 1
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>

      {/* Call to Action FIRST */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        style={{ textAlign: 'center' }}
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onLoginClick}
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
            letterSpacing: '1px'
          }}
        >
          🚀 START YOUR ADVENTURE
        </motion.button>
        <p
          style={{
            fontSize: '0.9rem',
            color: theme.colors.textSecondary,
            marginTop: '15px',
            opacity: 0.8
          }}
        >
          Join thousands of students in the ultimate campus exploration experience
        </p>
      </motion.div>

      {/* Simple Description and Badges AFTER */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        style={{
          textAlign: 'center',
          maxWidth: '600px',
          marginBottom: '20px'
        }}
      >
        <p
          style={{
            fontSize: 'clamp(1.1rem, 3vw, 1.4rem)',
            color: theme.colors.text,
            lineHeight: 1.6,
            opacity: 0.9,
            marginBottom: '20px'
          }}
        >
          Embark on an epic adventure across the campus with your team. 
          Solve challenges, discover secrets, and compete for the top spot on the leaderboard!
        </p>
        
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '30px',
            flexWrap: 'wrap',
            marginTop: '30px'
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: '8px' }}>🎯</div>
            <div style={{ fontSize: '0.9rem', color: theme.colors.textSecondary }}>9 Locations</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: '8px' }}>💻</div>
            <div style={{ fontSize: '0.9rem', color: theme.colors.textSecondary }}>4 Software Stations</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: '8px' }}>🏃</div>
            <div style={{ fontSize: '0.9rem', color: theme.colors.textSecondary }}>4 Physical Stations</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: '8px' }}>🏆</div>
            <div style={{ fontSize: '0.9rem', color: theme.colors.textSecondary }}>ELO Rating</div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default GameSpecs;