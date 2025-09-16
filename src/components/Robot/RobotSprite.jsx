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
        height: '100%',
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

      {/* Game Status Text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        style={{
          textAlign: 'center',
          marginTop: theme.spacing.lg
        }}
      >
                <h2
                  style={{
                    fontSize: `${parseInt(theme.typography.fontSize.xl) * 2}px`, // 2x larger
                    fontWeight: theme.typography.fontWeight.bold,
                    color: theme.colors.accent,
                    marginBottom: theme.spacing.sm,
                    textShadow: `2px 2px 4px ${theme.colors.primary}` // Added text shadow
                  }}
                >
          {currentAnimation === 'victory' ? 'Mission Complete!' : 
           currentAnimation === 'celebrate' ? 'Great Job!' :
           currentAnimation === 'determined' ? 'Keep Going!' :
           currentAnimation === 'excited' ? 'You\'re Doing Great!' :
           'Ready to Explore!'}
        </h2>
                <p
                  style={{
                    fontSize: `${parseInt(theme.typography.fontSize.base) * 1.5}px`, // 1.5x larger
                    color: theme.colors.textSecondary,
                    marginBottom: theme.spacing.sm,
                    textShadow: `1px 1px 2px ${theme.colors.primary}` // Added text shadow
                  }}
                >
                  Completed: {state.gameProgress.completedLevels.length}/9 locations
                </p>
                <p
                  style={{
                    fontSize: `${parseInt(theme.typography.fontSize.lg) * 1.5}px`, // 1.5x larger
                    fontWeight: theme.typography.fontWeight.semibold,
                    color: theme.colors.accent,
                    textShadow: `2px 2px 4px ${theme.colors.primary}` // Added text shadow
                  }}
                >
                  Score: {state.gameProgress.totalScore} points
                </p>
      </motion.div>
    </motion.div>
  );
};

export default RobotSprite;
