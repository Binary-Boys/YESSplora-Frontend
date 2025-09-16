import React from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../../contexts/GameContext';
import { theme } from '../../styles/theme';

const ActionBar = () => {
  const { state, actions } = useGame();
  const { ui } = state;

  const handlePlayClick = () => {
    // TODO: Implement game start logic
    console.log('Play button clicked - Start game');
  };

  const handleCameraClick = () => {
    actions.toggleQRScanner();
  };

  const handleProfileClick = () => {
    actions.toggleProfile();
  };

  return (
    <motion.footer
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
      style={{
        width: '100%',
        height: '80px', // Same reduced height as header
        backgroundColor: theme.colors.primary,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: `0 ${theme.spacing.md}`, // Reduced padding
        borderRadius: theme.borderRadius.lg,
        marginTop: '4px', // Reduced margin
        boxShadow: theme.shadows.neumorphism.raised,
        border: 'none'
      }}
    >
      {/* Camera Button - Left Side */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5, type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleCameraClick}
        style={{
          width: '60px', // Smaller to fit reduced footer
          height: '60px', // Smaller to fit reduced footer
          backgroundColor: theme.colors.secondary,
          borderRadius: theme.borderRadius.full,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: theme.transitions.fast,
          boxShadow: ui.showQRScanner ? theme.shadows.neumorphism.pressed : theme.shadows.neumorphism.raised,
          border: 'none',
          flexDirection: 'column',
          gap: '4px' // Further reduced gap
        }}
        onMouseEnter={(e) => {
          e.target.style.boxShadow = theme.shadows.neumorphism.soft;
        }}
        onMouseLeave={(e) => {
          e.target.style.boxShadow = ui.showQRScanner ? theme.shadows.neumorphism.pressed : theme.shadows.neumorphism.raised;
        }}
      >
        {/* Camera Emoji */}
        <div
          style={{
            fontSize: '24px', // Smaller to fit reduced button
            lineHeight: 1
          }}
        >
          📷
        </div>
        
        {/* Camera Label */}
        <div
          style={{
            fontSize: '8px', // Smaller text to fit
            fontWeight: theme.typography.fontWeight.bold,
            color: theme.colors.accent,
            textAlign: 'center',
            textShadow: `1px 1px 2px ${theme.colors.primary}`
          }}
        >
          CAM
        </div>
      </motion.button>

      {/* Profile Button - Right Side */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5, type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleProfileClick}
        style={{
          width: '60px', // Same size as camera button
          height: '60px', // Same size as camera button
          backgroundColor: theme.colors.secondary,
          borderRadius: theme.borderRadius.full,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: theme.transitions.fast,
          boxShadow: ui.showProfile ? theme.shadows.neumorphism.pressed : theme.shadows.neumorphism.raised,
          border: 'none',
          position: 'relative',
          flexDirection: 'column',
          gap: '4px' // Further reduced gap
        }}
        onMouseEnter={(e) => {
          e.target.style.boxShadow = theme.shadows.neumorphism.soft;
        }}
        onMouseLeave={(e) => {
          e.target.style.boxShadow = ui.showProfile ? theme.shadows.neumorphism.pressed : theme.shadows.neumorphism.raised;
        }}
      >
        {/* Profile Icon - Smaller design */}
        <div
          style={{
            fontSize: '24px', // Same as camera emoji
            lineHeight: 1
          }}
        >
          👤
        </div>
        
        {/* Profile Label */}
        <div
          style={{
            fontSize: '8px', // Same as camera text
            fontWeight: theme.typography.fontWeight.bold,
            color: theme.colors.accent,
            textAlign: 'center',
            textShadow: `1px 1px 2px ${theme.colors.primary}`
          }}
        >
          PRO
        </div>
      </motion.button>
    </motion.footer>
  );
};

export default ActionBar;
