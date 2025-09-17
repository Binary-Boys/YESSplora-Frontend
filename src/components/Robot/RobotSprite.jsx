import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../../contexts/GameContext';
import { theme } from '../../styles/theme';

const RobotSprite = ({ dynamicSpacing, isHighHeight, dimensions }) => {
  const { state } = useGame();
  const [currentAnimation, setCurrentAnimation] = useState('idle');
  const [isAnimating, setIsAnimating] = useState(false);

  // Animation states based on game progress
  useEffect(() => {
    const { gameProgress } = state;
    const completedCount = gameProgress.completedLevels.length;
    
    if (completedCount === 0) {
      setCurrentAnimation('idle');
    } else if (completedCount < 5) {
      setCurrentAnimation('excited');
    } else if (completedCount < 9) {
      setCurrentAnimation('determined');
    } else {
      setCurrentAnimation('victory');
    }
  }, [state.gameProgress.completedLevels.length]);

  // Trigger animation on score update
  useEffect(() => {
    if (state.gameProgress.totalScore > 0) {
      setIsAnimating(true);
      setCurrentAnimation('celebrate');
      setTimeout(() => {
        setIsAnimating(false);
      }, 2000);
    }
  }, [state.gameProgress.totalScore]);

  // Calculate responsive dimensions based on screen width
  const getResponsiveDimensions = () => {
    if (!dimensions) return { minHeight: '200px', maxWidth: '300px', maxHeight: '400px' };
    
    const { width } = dimensions;
    const isMobile = width <= 768;
    
    // Mobile-first responsive design
    if (isMobile) {
      return {
        minHeight: '120px', // Much smaller for mobile
        maxWidth: '180px',
        maxHeight: '200px'
      };
    }
    
    // Define responsive breakpoints and corresponding dimensions for desktop
    if (width > 1570) {
      return {
        minHeight: '200px', // Increased height to prevent clipping
        maxWidth: '250px',
        maxHeight: '300px'
      };
    } else if (width > 1400) {
      return {
        minHeight: '220px',
        maxWidth: '280px',
        maxHeight: '350px'
      };
    } else if (width > 1200) {
      return {
        minHeight: '250px',
        maxWidth: '320px',
        maxHeight: '400px'
      };
    } else if (width > 1000) {
      return {
        minHeight: '280px',
        maxWidth: '350px',
        maxHeight: '450px'
      };
    } else if (width > 800) {
      return {
        minHeight: '300px',
        maxWidth: '380px',
        maxHeight: '500px'
      };
    } else {
      return {
        minHeight: '320px',
        maxWidth: '400px',
        maxHeight: '550px'
      };
    }
  };

  const responsiveDimensions = getResponsiveDimensions();

  const getAnimationVariants = () => {
    switch (currentAnimation) {
      case 'idle':
        return {
          initial: { scale: 1, rotate: 0 },
          animate: { 
            scale: [1, 1.02, 1],
            rotate: [0, 1, -1, 0],
            transition: { 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }
        };
      case 'excited':
        return {
          initial: { scale: 1, y: 0 },
          animate: { 
            scale: [1, 1.1, 1],
            y: [0, -5, 0],
            transition: { 
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }
        };
      case 'determined':
        return {
          initial: { scale: 1, rotate: 0 },
          animate: { 
            scale: [1, 1.05, 1],
            rotate: [0, 2, -2, 0],
            transition: { 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }
        };
      case 'victory':
        return {
          initial: { scale: 1, rotate: 0 },
          animate: { 
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 0],
            transition: { 
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }
        };
      case 'celebrate':
        return {
          initial: { scale: 1, rotate: 0 },
          animate: { 
            scale: [1, 1.3, 1],
            rotate: [0, 360],
            transition: { 
              duration: 1,
              ease: "easeOut"
            }
          }
        };
      default:
        return {
          initial: { scale: 1 },
          animate: { scale: 1 }
        };
    }
  };

  const variants = getAnimationVariants();

  return (
    <motion.div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flex: '1 1 0%',
        width: '100%',
        padding: dynamicSpacing,
        minHeight: responsiveDimensions.minHeight, // Responsive minimum height
        maxHeight: 'none', // Remove height constraint to prevent clipping
        overflow: 'hidden' // Prevent content from spilling out
      }}
    >
      {/* Robot Character Image */}
      <motion.div
        initial={variants.initial}
        animate={variants.animate}
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
                <img
                  src="/robot-character.png"
                  alt="Robot Character"
                  style={{
                    maxWidth: responsiveDimensions.maxWidth, // Responsive width based on screen size
                    maxHeight: responsiveDimensions.maxHeight, // Responsive height based on screen size
                    width: '100%',
                    height: 'auto',
                    objectFit: 'contain',
                    filter: 'drop-shadow(8px 8px 16px rgba(0, 0, 0, 0.3)) drop-shadow(-8px -8px 16px rgba(255, 255, 255, 0.1))',
                    border: 'none',
                    borderRadius: theme.borderRadius.lg
                  }}
          onError={(e) => {
            console.error('Failed to load robot image:', e);
            // Fallback to a placeholder if image fails to load
            e.target.style.display = 'none';
          }}
        />
      </motion.div>

    </motion.div>
  );
};

export default RobotSprite;
