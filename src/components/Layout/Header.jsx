import React from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../../contexts/GameContext';
import { theme } from '../../styles/theme';

const Header = ({ dynamicSpacing, isHighHeight, isRotated, isVisible = true }) => {
  const { state, actions } = useGame();
  const { team, ui } = state;

  // Mobile detection based on viewport width
  const isMobile = window.innerWidth <= 768;

  const handleMinimapClick = () => {
    actions.toggleMinimap();
  };

  const handleLeaderboardClick = () => {
    actions.toggleLeaderboard();
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ 
        y: isVisible ? 0 : -100, 
        opacity: isVisible ? 1 : 0 
      }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      style={{
        width: '100%',
        height: isMobile 
          ? (isRotated ? '45px' : '60px') // 50% reduction for mobile for better fit
          : (isRotated ? '90px' : '120px'), // Desktop size unchanged
        backgroundColor: theme.colors.primary,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: isRotated ? '0 10px' : '0 15px', // Minimal padding for closer to edges
         borderRadius: '20px', // Increased corner radius for more rounded appearance
        marginBottom: '2px', // Very minimal margin for all cases
        boxShadow: theme.shadows.neumorphism.raised,
        border: 'none',
        flexShrink: 0 // Prevent header from shrinking
      }}
    >
        {/* App Name - Left Side */}
        <div
          className="distorted-text"
          style={{
            fontSize: isMobile 
              ? (isRotated ? '17px' : '22px') // 30% reduction for mobile
              : (isRotated ? '24px' : '32px'),
            fontWeight: theme.typography.fontWeight.bold,
            color: theme.colors.accent,
            textShadow: `2px 2px 4px rgba(0, 0, 0, 0.3)`,
            letterSpacing: '2px',
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden'
          }}
        >
          YESSPLORA
        </div>

        {/* Right Side Button Group - Leaderboard and Minimap */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px' // Small gap between leaderboard and minimap buttons
          }}
        >
          {/* Leaderboard Button */}
          <motion.button
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLeaderboardClick}
            className="shimmer-button"
            style={{
              width: isMobile 
                ? (isRotated ? '35px' : '45px') // 50% reduction for mobile
                : (isRotated ? '75px' : '90px'), // Desktop size unchanged
              height: isMobile 
                ? (isRotated ? '35px' : '45px') // 50% reduction for mobile
                : (isRotated ? '75px' : '90px'), // Desktop size unchanged
              borderRadius: '12px', // Squaricle - square with rounded corners
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: theme.transitions.fast,
              boxShadow: ui.showLeaderboard ? theme.shadows.neumorphism.pressed : theme.shadows.neumorphism.raised,
              border: 'none',
              position: 'relative'
            }}
            onMouseEnter={(e) => {
              e.target.style.boxShadow = theme.shadows.neumorphism.soft;
            }}
            onMouseLeave={(e) => {
              e.target.style.boxShadow = ui.showLeaderboard ? theme.shadows.neumorphism.pressed : theme.shadows.neumorphism.raised;
            }}
          >
            {/* Trophy/Ranking Icon */}
            <div
              style={{
                fontSize: isMobile 
                  ? (isRotated ? '18px' : '22px') // 50% smaller for mobile
                  : (isRotated ? '24px' : '30px'),
                lineHeight: 1,
                color: theme.colors.primary
              }}
            >
              🏆
            </div>
          </motion.button>

          {/* Minimap Button */}
          <motion.button
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleMinimapClick}
          className="shimmer-button"
          style={{
            width: isMobile 
              ? (isRotated ? '35px' : '45px') // 50% reduction for mobile
              : (isRotated ? '75px' : '90px'), // Desktop size unchanged
            height: isMobile 
              ? (isRotated ? '35px' : '45px') // 50% reduction for mobile
              : (isRotated ? '75px' : '90px'), // Desktop size unchanged
            borderRadius: '12px', // Squaricle - square with rounded corners
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: theme.transitions.fast,
            boxShadow: ui.showMinimap ? theme.shadows.neumorphism.pressed : theme.shadows.neumorphism.raised,
            border: 'none',
            position: 'relative'
          }}
        onMouseEnter={(e) => {
          e.target.style.boxShadow = theme.shadows.neumorphism.soft;
        }}
        onMouseLeave={(e) => {
          e.target.style.boxShadow = ui.showMinimap ? theme.shadows.neumorphism.pressed : theme.shadows.neumorphism.raised;
        }}
      >
        {/* Campus Map Image */}
        <img
          src="/Campus-Map-Sample-Apartment-Complex-Full-Illustration.jpg"
          alt="Campus Map"
          style={{
              width: isMobile 
                ? (isRotated ? '28px' : '35px') // 50% reduction for mobile
                : (isRotated ? '60px' : '75px'), // Desktop size unchanged
              height: isMobile 
                ? (isRotated ? '28px' : '35px') // 50% reduction for mobile
                : (isRotated ? '60px' : '75px'), // Desktop size unchanged
            borderRadius: theme.borderRadius.full,
            objectFit: 'cover',
            border: 'none',
            boxShadow: theme.shadows.neumorphism.inner
          }}
          onError={(e) => {
            console.error('Failed to load campus map image:', e);
            // Fallback to a simple colored circle
            e.target.style.display = 'none';
            e.target.parentElement.style.backgroundColor = '#2D5016';
          }}
        />
      </motion.button>
        </div> {/* End of Right Side Button Group */}
    </motion.header>
  );
};

export default Header;
