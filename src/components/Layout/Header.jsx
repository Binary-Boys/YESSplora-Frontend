import React from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../../contexts/GameContext';
import { theme } from '../../styles/theme';

const Header = () => {
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
        height: '120px', // Increased height
        backgroundColor: theme.colors.primary,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: `0 ${theme.spacing.xl}`,
        borderBottom: `4px solid ${theme.colors.accent}`,
        borderRadius: theme.borderRadius.lg,
        marginBottom: theme.spacing.lg
      }}
    >

        {/* Minimap Icon - Right Side */}
        <motion.button
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleMinimapClick}
          style={{
            width: '500px', // Increased width
            height: '300px', // Increased height
            backgroundColor: theme.colors.accent,
            borderRadius: theme.borderRadius.lg,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: theme.transitions.fast,
            boxShadow: ui.showMinimap ? theme.shadows.glow : theme.shadows.sm,
            border: `6px solid ${theme.colors.primary}`, // Added border for visibility
            position: 'relative'
          }}
        onMouseEnter={(e) => {
          e.target.style.boxShadow = theme.shadows.glow;
        }}
        onMouseLeave={(e) => {
          e.target.style.boxShadow = ui.showMinimap ? theme.shadows.glow : theme.shadows.sm;
        }}
      >
        {/* Campus Map Image */}
        <img
          src="/Campus-Map-Sample-Apartment-Complex-Full-Illustration.jpg"
          alt="Campus Map"
          style={{
            width: '300px', // Increased size
            height: '300px', // Increased size
            borderRadius: theme.borderRadius.full,
            objectFit: 'cover',
            border: `10px solid ${theme.colors.primary}`, // Increased border
            boxShadow: theme.shadows.md
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
