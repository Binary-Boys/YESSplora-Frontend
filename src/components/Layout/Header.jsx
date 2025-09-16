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
        height: '200px', // Increased height to accommodate larger text
        backgroundColor: theme.colors.background,
        zIndex: theme.zIndex.sticky,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: `0 ${theme.spacing.xl}`,
        boxShadow: `0 4px 8px ${theme.colors.shadowDark}, 0 -4px 8px ${theme.colors.shadowLight}`
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
            fontSize: `${parseInt(theme.typography.fontSize.xl) * 80}px`, // 10x larger (was 8x, now 80x)
            fontWeight: theme.typography.fontWeight.bold,
            color: theme.colors.textPrimary,
            margin: 0,
            fontFamily: 'sans-serif',
            letterSpacing: '8px', // Increased letter spacing for larger text
            textShadow: `2px 2px 4px ${theme.colors.shadowDark}, -2px -2px 4px ${theme.colors.shadowLight}`
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
            width: '400px',
            height: '240px',
            backgroundColor: theme.colors.surface,
            borderRadius: theme.borderRadius.lg,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: theme.transitions.fast,
            boxShadow: ui.showMinimap 
              ? `inset 8px 8px 16px ${theme.colors.shadowDark}, inset -8px -8px 16px ${theme.colors.shadowLight}`
              : `8px 8px 16px ${theme.colors.shadowDark}, -8px -8px 16px ${theme.colors.shadowLight}`,
            border: 'none'
          }}
        onMouseEnter={(e) => {
          e.target.style.boxShadow = `12px 12px 24px ${theme.colors.shadowDark}, -12px -12px 24px ${theme.colors.shadowLight}`;
        }}
        onMouseLeave={(e) => {
          e.target.style.boxShadow = ui.showMinimap 
            ? `inset 8px 8px 16px ${theme.colors.shadowDark}, inset -8px -8px 16px ${theme.colors.shadowLight}`
            : `8px 8px 16px ${theme.colors.shadowDark}, -8px -8px 16px ${theme.colors.shadowLight}`;
        }}
      >
        {/* Campus Map Image */}
        <img
          src="/Campus-Map-Sample-Apartment-Complex-Full-Illustration.jpg"
          alt="Campus Map"
          style={{
            width: '240px',
            height: '240px',
            borderRadius: theme.borderRadius.full,
            objectFit: 'cover',
            border: `8px solid ${theme.colors.surface}`,
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
