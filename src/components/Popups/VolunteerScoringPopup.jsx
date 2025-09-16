import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../../contexts/GameContext';
import { theme } from '../../styles/theme';

const VolunteerScoringPopup = () => {
  const { state, actions } = useGame();
  const { ui, gameProgress } = state;
  const [score, setScore] = useState('');
  const [selectedLevel, setSelectedLevel] = useState(5);
  const [volunteerId, setVolunteerId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Available levels for physical games (5-9)
  const availableLevels = [5, 6, 7, 8, 9];

  useEffect(() => {
    if (ui.showVolunteerScoring) {
      // Reset form when popup opens
      setScore('');
      setSelectedLevel(5);
      setVolunteerId('');
      setSubmitStatus(null);
    }
  }, [ui.showVolunteerScoring]);

  const handleClose = () => {
    actions.closeAllPopups();
    setScore('');
    setSelectedLevel(5);
    setVolunteerId('');
    setSubmitStatus(null);
  };

  const handleScoreChange = (e) => {
    const value = e.target.value;
    // Only allow positive numbers
    if (value === '' || (/^\d+$/.test(value) && parseInt(value) >= 0)) {
      setScore(value);
    }
  };

  const handleLevelChange = (e) => {
    setSelectedLevel(parseInt(e.target.value));
  };

  const handleSubmit = async () => {
    if (!score || score === '0') {
      setSubmitStatus({ type: 'error', message: 'Please enter a valid score' });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Validate score client-side
      const scoreValue = parseInt(score);
      if (scoreValue < 0 || scoreValue > 1000) {
        throw new Error('Score must be between 0 and 1000');
      }

      // Check if level is already completed
      const currentLocation = gameProgress.locationStatus[selectedLevel];
      if (currentLocation && currentLocation.completed) {
        // Update existing score
        actions.updateScore(selectedLevel, scoreValue);
        setSubmitStatus({ 
          type: 'success', 
          message: `Score updated for Level ${selectedLevel}: ${scoreValue} points` 
        });
      } else {
        // Complete new location
        actions.completeLocation(selectedLevel, scoreValue, 'physical');
        setSubmitStatus({ 
          type: 'success', 
          message: `Level ${selectedLevel} completed with ${scoreValue} points!` 
        });
      }

      // TODO: Send to backend
      // await submitScoreToBackend({
      //   level: selectedLevel,
      //   score: scoreValue,
      //   volunteerId: volunteerId,
      //   timestamp: new Date().toISOString()
      // });

      // Reset form after successful submission
      setTimeout(() => {
        setScore('');
        setSelectedLevel(5);
        setVolunteerId('');
        setSubmitStatus(null);
      }, 2000);

    } catch (error) {
      console.error('Score submission error:', error);
      setSubmitStatus({ type: 'error', message: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getLocationStatus = (level) => {
    const location = gameProgress.locationStatus[level];
    return location ? location.completed : false;
  };

  const getLocationScore = (level) => {
    const location = gameProgress.locationStatus[level];
    return location ? location.score : 0;
  };

  return (
    <AnimatePresence>
      {ui.showVolunteerScoring && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              zIndex: theme.zIndex.overlay,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: theme.spacing.lg
            }}
            onClick={handleClose}
          >
            {/* Popup Content */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
              style={{
                backgroundColor: theme.colors.surface,
                border: `3px solid ${theme.colors.primary}`,
                borderRadius: theme.borderRadius.xl,
                padding: theme.spacing.xl,
                maxWidth: '90vw',
                maxHeight: '90vh',
                overflow: 'auto',
                position: 'relative',
                boxShadow: theme.shadows['2xl'],
                minWidth: '400px'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={handleClose}
                style={{
                  position: 'absolute',
                  top: theme.spacing.md,
                  right: theme.spacing.md,
                  width: '50px',
                  height: '50px',
                  backgroundColor: theme.colors.primary,
                  color: theme.colors.accent,
                  border: 'none',
                  borderRadius: theme.borderRadius.full,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: theme.typography.fontSize['2xl'],
                  fontWeight: theme.typography.fontWeight.bold,
                  zIndex: 10
                }}
              >
                ×
              </button>

              {/* Title */}
              <h2
                style={{
                  fontSize: theme.typography.fontSize['2xl'],
                  fontWeight: theme.typography.fontWeight.bold,
                  color: theme.colors.accent,
                  textAlign: 'center',
                  marginBottom: theme.spacing.lg,
                  marginTop: theme.spacing.sm
                }}
              >
                Physical Game Scoring
              </h2>

              {/* Score Input Section */}
              <div
                style={{
                  backgroundColor: theme.colors.background,
                  padding: theme.spacing.lg,
                  borderRadius: theme.borderRadius.lg,
                  border: `2px solid ${theme.colors.border}`,
                  marginBottom: theme.spacing.lg
                }}
              >
                <h3
                  style={{
                    fontSize: theme.typography.fontSize.lg,
                    fontWeight: theme.typography.fontWeight.semibold,
                    color: theme.colors.accent,
                    marginBottom: theme.spacing.md,
                    textAlign: 'center'
                  }}
                >
                  Score Addition
                </h3>
                
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: theme.spacing.md,
                    marginBottom: theme.spacing.md
                  }}
                >
                  <input
                    type="text"
                    value={score}
                    onChange={handleScoreChange}
                    placeholder="Enter points"
                    style={{
                      flex: 1,
                      backgroundColor: theme.colors.surface,
                      color: theme.colors.text,
                      border: `2px solid ${theme.colors.border}`,
                      borderRadius: theme.borderRadius.md,
                      padding: theme.spacing.md,
                      fontSize: theme.typography.fontSize.lg,
                      fontWeight: theme.typography.fontWeight.semibold,
                      textAlign: 'center',
                      outline: 'none'
                    }}
                  />
                  <span
                    style={{
                      fontSize: theme.typography.fontSize.lg,
                      fontWeight: theme.typography.fontWeight.semibold,
                      color: theme.colors.accent
                    }}
                  >
                    points
                  </span>
                </div>

                <p
                  style={{
                    fontSize: theme.typography.fontSize.sm,
                    color: theme.colors.textSecondary,
                    textAlign: 'center',
                    margin: 0
                  }}
                >
                  Enter the score earned (0-1000 points)
                </p>
              </div>

              {/* Level Selection */}
              <div
                style={{
                  backgroundColor: theme.colors.background,
                  padding: theme.spacing.lg,
                  borderRadius: theme.borderRadius.lg,
                  border: `2px solid ${theme.colors.border}`,
                  marginBottom: theme.spacing.lg
                }}
              >
                <h3
                  style={{
                    fontSize: theme.typography.fontSize.lg,
                    fontWeight: theme.typography.fontWeight.semibold,
                    color: theme.colors.accent,
                    marginBottom: theme.spacing.md,
                    textAlign: 'center'
                  }}
                >
                  Level Selection
                </h3>
                
                <select
                  value={selectedLevel}
                  onChange={handleLevelChange}
                  style={{
                    width: '100%',
                    backgroundColor: theme.colors.surface,
                    color: theme.colors.text,
                    border: `2px solid ${theme.colors.border}`,
                    borderRadius: theme.borderRadius.md,
                    padding: theme.spacing.md,
                    fontSize: theme.typography.fontSize.base,
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                >
                  {availableLevels.map(level => (
                    <option key={level} value={level}>
                      Level {level} {getLocationStatus(level) ? `(Completed: ${getLocationScore(level)} pts)` : '(Not completed)'}
                    </option>
                  ))}
                </select>
              </div>

              {/* Previous Scores Section */}
              <div
                style={{
                  backgroundColor: theme.colors.background,
                  padding: theme.spacing.lg,
                  borderRadius: theme.borderRadius.lg,
                  border: `2px solid ${theme.colors.border}`,
                  marginBottom: theme.spacing.lg
                }}
              >
                <h3
                  style={{
                    fontSize: theme.typography.fontSize.lg,
                    fontWeight: theme.typography.fontWeight.semibold,
                    color: theme.colors.accent,
                    marginBottom: theme.spacing.md,
                    textAlign: 'center'
                  }}
                >
                  Previous Scores
                </h3>
                
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                    gap: theme.spacing.sm
                  }}
                >
                  {availableLevels.map(level => {
                    const isCompleted = getLocationStatus(level);
                    const levelScore = getLocationScore(level);
                    
                    return (
                      <div
                        key={level}
                        style={{
                          backgroundColor: isCompleted ? theme.colors.success : theme.colors.surface,
                          color: isCompleted ? theme.colors.accent : theme.colors.textSecondary,
                          padding: theme.spacing.sm,
                          borderRadius: theme.borderRadius.md,
                          textAlign: 'center',
                          border: `1px solid ${isCompleted ? theme.colors.success : theme.colors.border}`
                        }}
                      >
                        <div
                          style={{
                            fontSize: theme.typography.fontSize.sm,
                            fontWeight: theme.typography.fontWeight.semibold
                          }}
                        >
                          Level {level}
                        </div>
                        <div
                          style={{
                            fontSize: theme.typography.fontSize.xs,
                            marginTop: theme.spacing.xs
                          }}
                        >
                          {isCompleted ? `${levelScore} pts` : 'Not completed'}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Submit Status */}
              {submitStatus && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    backgroundColor: submitStatus.type === 'success' ? theme.colors.success : theme.colors.error,
                    color: theme.colors.accent,
                    padding: theme.spacing.md,
                    borderRadius: theme.borderRadius.md,
                    textAlign: 'center',
                    marginBottom: theme.spacing.lg,
                    fontSize: theme.typography.fontSize.base,
                    fontWeight: theme.typography.fontWeight.medium
                  }}
                >
                  {submitStatus.message}
                </motion.div>
              )}

              {/* Action Buttons */}
              <div
                style={{
                  display: 'flex',
                  gap: theme.spacing.md,
                  justifyContent: 'center'
                }}
              >
                <button
                  onClick={handleClose}
                  disabled={isSubmitting}
                  style={{
                    backgroundColor: 'transparent',
                    color: theme.colors.accent,
                    border: `2px solid ${theme.colors.accent}`,
                    borderRadius: theme.borderRadius.lg,
                    padding: `${theme.spacing.lg} ${theme.spacing.xl}`,
                    fontSize: theme.typography.fontSize.lg,
                    fontWeight: theme.typography.fontWeight.semibold,
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    opacity: isSubmitting ? 0.5 : 1,
                    transition: theme.transitions.fast,
                    minWidth: '120px'
                  }}
                >
                  Cancel
                </button>
                
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting || !score}
                  style={{
                    backgroundColor: isSubmitting || !score ? theme.colors.textSecondary : theme.colors.primary,
                    color: theme.colors.accent,
                    border: `2px solid ${isSubmitting || !score ? theme.colors.textSecondary : theme.colors.primary}`,
                    borderRadius: theme.borderRadius.lg,
                    padding: `${theme.spacing.lg} ${theme.spacing.xl}`,
                    fontSize: theme.typography.fontSize.lg,
                    fontWeight: theme.typography.fontWeight.semibold,
                    cursor: isSubmitting || !score ? 'not-allowed' : 'pointer',
                    transition: theme.transitions.fast,
                    minWidth: '150px'
                  }}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Score'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default VolunteerScoringPopup;
