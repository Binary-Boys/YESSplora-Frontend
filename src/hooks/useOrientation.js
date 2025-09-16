import { useState, useEffect } from 'react';

export const useOrientation = () => {
  const [isLandscape, setIsLandscape] = useState(false);
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setDimensions({ width, height });
      
      // If height > width, we're in portrait mode and should rotate to landscape
      setIsLandscape(height > width);
    };

    // Initial check
    handleResize();

    // Listen for resize events
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  // Calculate dynamic spacing based on screen height
  const getDynamicSpacing = () => {
    const { height } = dimensions;
    
    // When display height increases (tilted orientation), reduce distance between header and footer
    if (isLandscape) {
      // Tilted orientation - reduce spacing
      if (height < 600) {
        return '1px'; // Very tight spacing when tilted
      } else if (height < 800) {
        return '2px'; // Tight spacing when tilted
      } else if (height < 1000) {
        return '3px'; // Medium spacing when tilted
      } else {
        return '4px'; // Loose spacing when tilted
      }
    } else {
      // Normal orientation - default spacing
      if (height < 600) {
        return '2px'; // Very tight spacing
      } else if (height < 800) {
        return '4px'; // Tight spacing
      } else if (height < 1000) {
        return '8px'; // Medium spacing
      } else if (height < 1200) {
        return '12px'; // Loose spacing
      } else {
        return '16px'; // Very loose spacing for large screens
      }
    }
  };

  // Check if width is below 1600px for footer alignment
  const isNarrowWidth = dimensions.width < 1600;

  return {
    isLandscape,
    dimensions,
    shouldRotate: isLandscape,
    dynamicSpacing: getDynamicSpacing(),
    isHighHeight: dimensions.height > 800,
    isNarrowWidth
  };
};
