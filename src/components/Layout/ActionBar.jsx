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
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: '320px',
        backgroundColor: theme.colors.primary,
        zIndex: theme.zIndex.sticky,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: `0 ${theme.spacing.xl}`
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
          width: '320px', // 4x larger (80px * 4)
          height: '240px', // 4x larger (60px * 4)
          backgroundColor: theme.colors.secondary,
          borderRadius: theme.borderRadius.md,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: theme.transitions.fast,
          boxShadow: ui.showQRScanner ? theme.shadows.glow : theme.shadows.sm,
          border: `4px solid ${theme.colors.primary}`, // Boxed design
          flexDirection: 'column',
          gap: '16px'
        }}
        onMouseEnter={(e) => {
          e.target.style.boxShadow = theme.shadows.glow;
        }}
        onMouseLeave={(e) => {
          e.target.style.boxShadow = ui.showQRScanner ? theme.shadows.glow : theme.shadows.sm;
        }}
      >
        {/* Camera Emoji */}
        <div
          style={{
            fontSize: '120px', // Large camera emoji
            lineHeight: 1
          }}
        >
          📷
        </div>
        
        {/* Camera Label */}
        <div
          style={{
            fontSize: '32px', // 4x larger text
            fontWeight: theme.typography.fontWeight.bold,
            color: theme.colors.accent,
            textAlign: 'center'
          }}
        >
          CAMERA
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
          width: '70px',
          height: '70px',
          backgroundColor: theme.colors.secondary,
          borderRadius: theme.borderRadius.full,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: theme.transitions.fast,
          boxShadow: ui.showProfile ? theme.shadows.glow : theme.shadows.sm,
          border: 'none',
          position: 'relative'
        }}
        onMouseEnter={(e) => {
          e.target.style.boxShadow = theme.shadows.glow;
        }}
        onMouseLeave={(e) => {
          e.target.style.boxShadow = ui.showProfile ? theme.shadows.glow : theme.shadows.sm;
        }}
      >
        {/* Profile Icon - Exact design from image */}
        <div
          style={{
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
          }}
        >
          {/* Person silhouette */}
          <div
            style={{
              width: '30px',
              height: '30px',
              backgroundColor: theme.colors.accent,
              borderRadius: '50%',
              position: 'relative'
            }}
          >
            {/* Head */}
            <div
              style={{
                position: 'absolute',
                top: '3px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '18px',
                height: '18px',
                backgroundColor: theme.colors.accent,
                borderRadius: '50%'
              }}
            />
            {/* Body */}
            <div
              style={{
                position: 'absolute',
                bottom: '3px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '24px',
                height: '12px',
                backgroundColor: theme.colors.accent,
                borderRadius: '12px 12px 0 0'
              }}
            />
          </div>
          
          {/* Three dots indicator */}
          <div
            style={{
              position: 'absolute',
              right: '-12px',
              top: '50%',
              transform: 'translateY(-50%)',
              display: 'flex',
              flexDirection: 'column',
              gap: '3px'
            }}
          >
            <div
              style={{
                width: '4px',
                height: '4px',
                backgroundColor: theme.colors.accent,
                borderRadius: '50%'
              }}
            />
            <div
              style={{
                width: '4px',
                height: '4px',
                backgroundColor: theme.colors.accent,
                borderRadius: '50%'
              }}
            />
            <div
              style={{
                width: '4px',
                height: '4px',
                backgroundColor: theme.colors.accent,
                borderRadius: '50%'
              }}
            />
          </div>
        </div>
      </motion.button>
    </motion.footer>
  );
};

export default ActionBar;
