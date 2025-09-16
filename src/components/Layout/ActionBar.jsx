import React from 'react';
import { useGame } from '../../contexts/GameContext';
import { useOrientation } from '../../hooks/useOrientation';
import { theme } from '../../styles/theme';

const ActionBar = ({ dynamicSpacing, isHighHeight, dimensions }) => {
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
  
  return (
    <div
      style={{
        width: '100%', // Always full width
        height: isRotated ? '90px' : '120px', // 150% of original size
        backgroundColor: theme.colors.primary,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between', // Always use space-between to align profile to right
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
          style={{
            width: '90px', // 150% of original size
            height: '90px', // 150% of original size
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
              fontSize: '36px', // 150% of original size
              lineHeight: 1
            }}
          >
            📷
          </div>
          
          {/* Camera Label */}
          <div
            style={{
              fontSize: '12px', // 150% of original size
              fontWeight: theme.typography.fontWeight.bold,
              color: theme.colors.accent,
              textAlign: 'center',
              textShadow: `1px 1px 2px ${theme.colors.primary}`
            }}
          >
            CAM
          </div>
        </button>

      {/* Profile Button - Right Side */}
      <button
        onClick={handleProfileClick}
        style={{
          width: isRotated ? '75px' : '90px', // 150% of original size
          height: isRotated ? '75px' : '90px', // 150% of original size
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
            fontSize: isRotated ? '30px' : '36px', // 150% of original size
            lineHeight: 1
          }}
        >
          👤
        </div>
        
        {/* Profile Label */}
        <div
          style={{
            fontSize: isRotated ? '9px' : '12px', // 150% of original size
            fontWeight: theme.typography.fontWeight.bold,
            color: theme.colors.accent,
            textAlign: 'center',
            textShadow: `1px 1px 2px ${theme.colors.primary}`
          }}
        >
          PRO
        </div>
      </button>
    </div>
  );
};

export default ActionBar;
