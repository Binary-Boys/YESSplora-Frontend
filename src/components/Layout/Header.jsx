import React from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../../contexts/GameContext';
import { theme } from '../../styles/theme';

const Header = ({ dynamicSpacing, isHighHeight, isRotated }) => {
  const { state, actions } = useGame();
  const { team, ui } = state;

  const handleMinimapClick = () => {
    actions.toggleMinimap();
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{
        width: '100%',
        height: isRotated ? '90px' : '120px', // 150% of original size
        backgroundColor: theme.colors.primary,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: isRotated ? '0 22px' : `0 ${theme.spacing.lg}`, // 150% padding
        borderRadius: theme.borderRadius.lg,
        marginBottom: isRotated ? '1px' : dynamicSpacing, // Minimal margin when rotated
        boxShadow: theme.shadows.neumorphism.raised,
        border: 'none',
        flexShrink: 0 // Prevent header from shrinking
      }}
    >
        {/* App Name - Left Side */}
        <div
          style={{
            fontSize: isRotated ? '24px' : '32px',
            fontWeight: theme.typography.fontWeight.bold,
            color: theme.colors.accent,
            textShadow: `2px 2px 4px rgba(0, 0, 0, 0.3)`,
            letterSpacing: '2px'
          }}
        >
          YESSPLORA
        </div>

        {/* Minimap Icon - Right Side */}
        <motion.button
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleMinimapClick}
          style={{
            width: isRotated ? '75px' : '90px', // 150% of original size
            height: isRotated ? '75px' : '90px', // 150% of original size
            backgroundColor: theme.colors.accent,
            borderRadius: theme.borderRadius.full,
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
            width: isRotated ? '60px' : '75px', // 150% of original size
            height: isRotated ? '60px' : '75px', // 150% of original size
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
    </motion.header>
  );
};

export default Header;
