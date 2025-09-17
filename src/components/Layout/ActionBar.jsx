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
        y: isVisible ? 0 : 100, 
        opacity: isVisible ? 1 : 0 
      }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      style={{
        width: '100%', // Always full width
        height: isMobile 
          ? (isRotated ? '63px' : '84px') // 30% reduction for mobile (90*0.7=63, 120*0.7=84)
          : (isRotated ? '90px' : '120px'), // 150% of original size for desktop
        backgroundColor: theme.colors.primary,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between', // Camera on left, support+profile grouped on right
        padding: isNarrowScreen || isRotated ? '0 10px 0 10px' : '0 15px 0 15px', // Minimal padding for closer to edges
        borderRadius: theme.borderRadius.lg,
        marginTop: '2px', // Very minimal margin for all cases
        marginLeft: '0', // No margin left adjustment needed
        boxShadow: theme.shadows.neumorphism.raised,
        border: 'none',
        flexShrink: 0 // Prevent footer from shrinking
      }}
    >
      {/* Camera Button - Left Side - Always show since we're managing layout differently now */}
        <button
          onClick={handleCameraClick}
          className="shimmer-button"
          style={{
            width: isMobile ? '63px' : '90px', // 30% reduction for mobile
            height: isMobile ? '63px' : '90px', // 30% reduction for mobile
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
              fontSize: isMobile ? '25px' : '36px', // 30% reduction for mobile
              lineHeight: 1
            }}
          >
            📷
          </div>
          
          {/* Camera Label */}
          <div
            style={{
              fontSize: isMobile ? '8px' : '12px', // 30% reduction for mobile
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
              ? (isRotated ? '53px' : '63px') // 30% reduction for mobile
              : (isRotated ? '75px' : '90px'), // 150% of original size for desktop
            height: isMobile 
              ? (isRotated ? '53px' : '63px') // 30% reduction for mobile
              : (isRotated ? '75px' : '90px'), // 150% of original size for desktop
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
                ? (isRotated ? '21px' : '25px') // 30% reduction for mobile
                : (isRotated ? '30px' : '36px'), // 150% of original size for desktop
              lineHeight: 1
            }}
          >
            📞
          </div>
          
          {/* Support Label */}
          <div
            style={{
              fontSize: isMobile 
                ? (isRotated ? '6px' : '8px') // 30% reduction for mobile
                : (isRotated ? '9px' : '12px'), // 150% of original size for desktop
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
              ? (isRotated ? '53px' : '63px') // 30% reduction for mobile
              : (isRotated ? '75px' : '90px'), // 150% of original size for desktop
            height: isMobile 
              ? (isRotated ? '53px' : '63px') // 30% reduction for mobile
              : (isRotated ? '75px' : '90px'), // 150% of original size for desktop
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
              ? (isRotated ? '21px' : '25px') // 30% reduction for mobile
              : (isRotated ? '30px' : '36px'), // 150% of original size for desktop
            lineHeight: 1
          }}
        >
          👤
        </div>
        
        {/* Profile Label */}
        <div
          style={{
            fontSize: isMobile 
              ? (isRotated ? '6px' : '8px') // 30% reduction for mobile
              : (isRotated ? '9px' : '12px'), // 150% of original size for desktop
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
