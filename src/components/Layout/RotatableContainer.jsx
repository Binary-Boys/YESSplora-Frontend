import React from 'react';
import { useOrientation } from '../../hooks/useOrientation';
import { theme } from '../../styles/theme';

const RotatableContainer = ({ children }) => {
  const { shouldRotate, dimensions } = useOrientation();

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        backgroundColor: theme.colors.primary,
        position: 'relative',
        transform: shouldRotate ? 'rotate(-90deg)' : 'none',
        transformOrigin: 'center center',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {children}
    </div>
  );
};

export default RotatableContainer;
