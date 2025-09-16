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
      
      // Always force landscape mode (always rotate)
      setIsLandscape(true);
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
  // When display height increases, spacing decreases to bring header and footer closer
  // If rotated, use the effective height (which would be the original width)
  const getDynamicSpacing = () => {
    const { height, width } = dimensions;
    const effectiveHeight = isLandscape ? width : height; // Use width as height when rotated
    
    // When rotated (portrait mode), use even tighter spacing to fit all components
    if (isLandscape) {
      if (effectiveHeight < 400) {
        return '1px'; // Very tight for small rotated screens
      } else if (effectiveHeight < 600) {
        return '2px'; // Tight spacing
      } else {
        return '3px'; // Minimal spacing for larger rotated screens
      }
    }
    
    // Normal spacing for landscape orientation
    // Inverse relationship: higher screens get tighter spacing
    if (effectiveHeight < 600) {
      return '8px'; // More spacing for small screens
    } else if (effectiveHeight < 800) {
      return '6px'; // Medium spacing
    } else if (effectiveHeight < 1000) {
      return '4px'; // Tighter spacing
    } else if (effectiveHeight < 1200) {
      return '2px'; // Very tight spacing
    } else {
      return '1px'; // Minimal spacing for very large screens
    }
  };

  // Calculate effective dimensions for rotated viewport
  const getEffectiveDimensions = () => {
    if (isLandscape) {
      // When rotated, width becomes height and height becomes width
      return {
        width: dimensions.height,
        height: dimensions.width
      };
    }
    return dimensions;
  };

  const effectiveDimensions = getEffectiveDimensions();

  return {
    isLandscape,
    dimensions,
    effectiveDimensions,
    shouldRotate: true, // Always rotate
    dynamicSpacing: getDynamicSpacing(),
    isHighHeight: effectiveDimensions.height > 800,
    isPortraitMode: true, // Always treat as portrait to force rotation
    alwaysRotated: true // New flag to indicate forced rotation
  };
};

