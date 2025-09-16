import React from 'react';
import { useOrientation } from '../../hooks/useOrientation';
import { theme } from '../../styles/theme';

const RotatableContainer = ({ children }) => {
  const { shouldRotate, dimensions } = useOrientation();

  const containerStyle = {
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
    backgroundColor: theme.colors.primary,
    position: 'relative',
    display: 'flex',
    flexDirection: 'column'
  };

  // If we need to rotate, we need to adjust the container
  if (shouldRotate) {
    // When rotated, we need to swap width/height and adjust positioning
    Object.assign(containerStyle, {
      width: '100vh', // Swap dimensions
      height: '100vw', // Swap dimensions
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%) rotate(-90deg)',
      transformOrigin: 'center center'
    });
  }

  return (
    <div style={containerStyle}>
      {children}
    </div>
  );
};

export default RotatableContainer;
