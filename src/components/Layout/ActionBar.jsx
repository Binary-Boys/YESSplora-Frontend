import React from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../../contexts/GameContext';
import { useOrientation } from '../../hooks/useOrientation';
import { theme } from '../../styles/theme';

const ActionBar = ({ dynamicSpacing, isHighHeight, dimensions, isVisible = true }) => {
  const { state, actions } = useGame();
  const { ui } = state;
  const { isPortraitMode, shouldRotate, alwaysRotated } = useOrientation();

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


  // Determine if we should use responsive layout for narrow screens or when rotated
  const isNarrowScreen = dimensions && dimensions.width < 1600;
  const isRotated = alwaysRotated; // Always rotated now
  
  // Mobile detection based on viewport width
  const isMobile = window.innerWidth <= 768;
  
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ 
        y: isMobile ? 0 : (isVisible ? 0 : 100), // Always visible on mobile, auto-hide on desktop
        opacity: isMobile ? 1 : (isVisible ? 1 : 0) // Always visible on mobile, auto-hide on desktop
      }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      style={{
        width: '100%', // Always full width
        height: isMobile 
          ? (isRotated ? '45px' : '60px') // 50% reduction for mobile for better fit
          : (isRotated ? '90px' : '120px'), // Desktop size unchanged
        // Glassmorphic background
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between', // Camera on left, support+profile grouped on right
        padding: isNarrowScreen || isRotated ? '0 10px 0 10px' : '0 15px 0 15px', // Minimal padding for closer to edges
        borderRadius: theme.borderRadius.lg,
        marginTop: '2px', // Very minimal margin for all cases
        marginLeft: '0', // No margin left adjustment needed
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
        flexShrink: 0, // Prevent footer from shrinking
        // Mobile-specific positioning to ensure visibility
        position: isMobile ? 'sticky' : 'relative',
        bottom: isMobile ? '0' : 'auto',
        zIndex: isMobile ? 1000 : 'auto' // Higher z-index on mobile to stay on top
      }}
    >
      {/* Camera Button - Left Side - Always show since we're managing layout differently now */}
        <button
          onClick={handleCameraClick}
          className="shimmer-button"
          style={{
            width: isMobile ? '45px' : '90px', // 50% reduction for mobile
            height: isMobile ? '45px' : '90px', // 50% reduction for mobile
            borderRadius: '12px', // Squaricle - square with rounded corners
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: theme.transitions.fast,
            boxShadow: ui.showQRScanner ? theme.shadows.neumorphism.pressed : theme.shadows.neumorphism.raised,
            border: 'none',
            flexDirection: 'column',
            gap: '6px', // 150% of original gap
            marginRight: '0' // No margin needed with space-between layout
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
              fontSize: isMobile ? '18px' : '36px', // 50% reduction for mobile
              lineHeight: 1
            }}
          >
            📷
          </div>
          
          {/* Camera Label */}
          <div
            style={{
              fontSize: isMobile ? '6px' : '12px', // 50% reduction for mobile
              fontWeight: theme.typography.fontWeight.bold,
              color: theme.colors.accent,
              textAlign: 'center',
              textShadow: `1px 1px 2px ${theme.colors.primary}`
            }}
          >
            CAM
          </div>
        </button>


      {/* Right Side Button Group - Support and Profile */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px' // Small gap between support and profile buttons
        }}
      >
        {/* Support Button */}
        <button
          onClick={() => {
            actions.toggleSupport();
          }}
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
            boxShadow: theme.shadows.neumorphism.raised,
            border: 'none',
            position: 'relative',
            flexDirection: 'column',
            gap: '6px' // 150% of original gap
          }}
          onMouseEnter={(e) => {
            e.target.style.boxShadow = theme.shadows.neumorphism.soft;
          }}
          onMouseLeave={(e) => {
            e.target.style.boxShadow = theme.shadows.neumorphism.raised;
          }}
        >
          {/* Support Icon */}
          <div
            style={{
              fontSize: isMobile 
                ? (isRotated ? '15px' : '18px') // 50% reduction for mobile
                : (isRotated ? '30px' : '36px'), // Desktop size unchanged
              lineHeight: 1
            }}
          >
            📞
          </div>
          
          {/* Support Label */}
          <div
            style={{
              fontSize: isMobile 
                ? (isRotated ? '4px' : '6px') // 50% reduction for mobile
                : (isRotated ? '9px' : '12px'), // Desktop size unchanged
              fontWeight: theme.typography.fontWeight.bold,
              color: theme.colors.accent,
              textAlign: 'center',
              textShadow: `1px 1px 2px ${theme.colors.primary}`
            }}
          >
            SUPPORT
          </div>
        </button>

        {/* Profile Button */}
      <button
        onClick={handleProfileClick}
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
          boxShadow: ui.showProfile ? theme.shadows.neumorphism.pressed : theme.shadows.neumorphism.raised,
          border: 'none',
          position: 'relative',
          flexDirection: 'column',
          gap: '6px' // 150% of original gap
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
            fontSize: isMobile 
              ? (isRotated ? '15px' : '18px') // 50% reduction for mobile
              : (isRotated ? '30px' : '36px'), // Desktop size unchanged
            lineHeight: 1
          }}
        >
          👤
        </div>
        
        {/* Profile Label */}
        <div
          style={{
            fontSize: isMobile 
              ? (isRotated ? '4px' : '6px') // 50% reduction for mobile
              : (isRotated ? '9px' : '12px'), // Desktop size unchanged
            fontWeight: theme.typography.fontWeight.bold,
            color: theme.colors.accent,
            textAlign: 'center',
            textShadow: `1px 1px 2px ${theme.colors.primary}`
          }}
        >
          PRO
        </div>
      </button>
      </div> {/* End of Right Side Button Group */}
    </motion.div>
  );
};

export default ActionBar;
