import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../../contexts/GameContext';
import { theme } from '../../styles/theme';

const RobotSprite = () => {
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
        flex: 1,
        width: '100%',
        padding: theme.spacing.xl
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
                    maxWidth: '500px', // Increased size
                    maxHeight: '600px', // Increased size
                    width: 'auto',
                    height: 'auto',
                    objectFit: 'contain',
                    filter: 'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.5))', // Enhanced shadow
                    border: `6px solid ${theme.colors.accent}`, // Added border
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
