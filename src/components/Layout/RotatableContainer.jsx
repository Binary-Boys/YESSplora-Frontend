import React from 'react';
import { useOrientation } from '../../hooks/useOrientation';
import { theme } from '../../styles/theme';

const RotatableContainer = ({ children }) => {
  const { shouldRotate, dimensions, effectiveDimensions, isPortraitMode, alwaysRotated } = useOrientation();

  const containerStyle = {
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
    backgroundColor: theme.colors.primary,
    position: 'relative',
    display: 'flex',
    flexDirection: 'column'
  };

  // Always apply rotation since we're forcing tilt mode
  if (alwaysRotated) {
    // Calculate responsive scaling based on screen size
    const scale = Math.min(1, Math.min(window.innerWidth / 800, window.innerHeight / 600));
    
    // When rotated, we need to swap width/height and adjust positioning
    Object.assign(containerStyle, {
      width: '100vh', // Use viewport height as width
      height: '100vw', // Use viewport width as height
      position: 'fixed', // Use fixed positioning for better control
      top: '50%',
      left: '50%',
      transform: `translate(-50%, -50%) rotate(-90deg) scale(${scale})`,
      transformOrigin: 'center center',
      zIndex: 1000, // Ensure it stays on top
      maxWidth: '100vh', // Ensure it doesn't exceed viewport bounds
      maxHeight: '100vw' // Ensure it doesn't exceed viewport bounds
    });
  }

  return (
    <div style={containerStyle}>
      {/* Add a wrapper div to help with content scaling when rotated */}
      <div 
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between', // Change from center to space-between
          padding: alwaysRotated ? '5px' : '0', // Reduced padding for more space
          boxSizing: 'border-box',
          minHeight: '100%' // Ensure it takes full height
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default RotatableContainer;
