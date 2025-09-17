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
    flexDirection: 'column',
    minWidth: '750px' // Prevent container from reducing size below 750px
  };

  // No rotation - keep vertical layout

  return (
    <div style={containerStyle}>
      {/* Wrapper div for content layout */}
      <div 
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '25px', // Fixed 25px padding from all edges
          boxSizing: 'border-box',
          minHeight: '100%',
          minWidth: '750px', // Prevent container from reducing size below 750px
          maxWidth: 'none' // Remove any max width restrictions
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default RotatableContainer;
