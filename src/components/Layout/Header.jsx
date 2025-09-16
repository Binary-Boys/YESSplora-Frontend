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
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '100px', // Increased height
        backgroundColor: theme.colors.primary,
        zIndex: theme.zIndex.sticky,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: `0 ${theme.spacing.xl}`,
        borderBottom: `4px solid ${theme.colors.accent}` // Added border for visibility
      }}
    >
      {/* Team Name - Left Side */}
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        style={{
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <h1
          style={{
            fontSize: `${parseInt(theme.typography.fontSize.xl) * 4}px`,
            fontWeight: theme.typography.fontWeight.bold,
            color: theme.colors.accent,
            margin: 0,
            fontFamily: 'sans-serif',
            letterSpacing: '2px'
          }}
        >
          {team.name}
        </h1>
      </motion.div>

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
