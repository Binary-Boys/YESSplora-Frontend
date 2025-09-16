import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../../contexts/GameContext';
import { theme } from '../../styles/theme';

const MinimapPopup = () => {
  const { state, actions } = useGame();
  const { ui, gameProgress } = state;

  const handleClose = () => {
    actions.closeAllPopups();
  };

  const handleLocationClick = (locationId) => {
    const location = gameProgress.locationStatus[locationId];
    if (location.completed) {
      // Show location details or completion status
      console.log(`Location ${locationId} completed with score: ${location.score}`);
    } else {
      // Show location info or start navigation
      console.log(`Navigate to location ${locationId}`);
    }
  };

  const getLocationStatus = (locationId) => {
    const location = gameProgress.locationStatus[locationId];
    if (location.completed) {
      return { color: theme.colors.success, icon: '✓' };
    } else {
      return { color: theme.colors.textSecondary, icon: '○' };
    }
  };

  const getLocationType = (locationId) => {
    const location = gameProgress.locationStatus[locationId];
    return location.type;
  };

  return (
    <AnimatePresence>
      {ui.showMinimap && (
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
                boxShadow: theme.shadows['2xl']
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
                  width: '80px', // Increased size
                  height: '80px', // Increased size
                  backgroundColor: theme.colors.primary,
                  color: theme.colors.accent,
                  border: `4px solid ${theme.colors.accent}`, // Added border
                  borderRadius: theme.borderRadius.full,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: `${parseInt(theme.typography.fontSize['2xl']) * 2}px`, // 2x larger font
                  fontWeight: theme.typography.fontWeight.bold,
                  zIndex: 10,
                  boxShadow: theme.shadows.lg // Added shadow
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
                CAMPUS MAP
              </h2>

              {/* Campus Map Image */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  maxWidth: '800px',
                  aspectRatio: '4/3',
                  backgroundColor: theme.colors.background,
                  borderRadius: theme.borderRadius.lg,
                  border: `4px solid ${theme.colors.border}`,
                  overflow: 'hidden',
                  marginBottom: theme.spacing.lg,
                  margin: '0 auto'
                }}
              >
                <img
                  src="/Campus-Map-Sample-Apartment-Complex-Full-Illustration.jpg"
                  alt="Campus Map"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: theme.borderRadius.lg
                  }}
                  onError={(e) => {
                    console.error('Failed to load campus map image:', e);
                    e.target.style.display = 'none';
                  }}
                />
                
                {/* Location Markers Overlay */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    pointerEvents: 'none'
                  }}
                >
                  {/* Software Game Locations (1-4) */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '15%',
                      left: '20%',
                      width: '40px',
                      height: '40px',
                      backgroundColor: getLocationStatus(1).color,
                      borderRadius: '50%',
                      border: '4px solid #FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '20px',
                      fontWeight: 'bold',
                      color: '#FFFFFF',
                      cursor: 'pointer',
                      pointerEvents: 'auto'
                    }}
                    onClick={() => handleLocationClick(1)}
                  >
                    1
                  </div>
                  <div
                    style={{
                      position: 'absolute',
                      top: '15%',
                      right: '20%',
                      width: '40px',
                      height: '40px',
                      backgroundColor: getLocationStatus(2).color,
                      borderRadius: '50%',
                      border: '4px solid #FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '20px',
                      fontWeight: 'bold',
                      color: '#FFFFFF',
                      cursor: 'pointer',
                      pointerEvents: 'auto'
                    }}
                    onClick={() => handleLocationClick(2)}
                  >
                    2
                  </div>
                  <div
                    style={{
                      position: 'absolute',
                      top: '35%',
                      left: '20%',
                      width: '40px',
                      height: '40px',
                      backgroundColor: getLocationStatus(3).color,
                      borderRadius: '50%',
                      border: '4px solid #FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '20px',
                      fontWeight: 'bold',
                      color: '#FFFFFF',
                      cursor: 'pointer',
                      pointerEvents: 'auto'
                    }}
                    onClick={() => handleLocationClick(3)}
                  >
                    3
                  </div>
                  <div
                    style={{
                      position: 'absolute',
                      top: '35%',
                      right: '20%',
                      width: '40px',
                      height: '40px',
                      backgroundColor: getLocationStatus(4).color,
                      borderRadius: '50%',
                      border: '4px solid #FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '20px',
                      fontWeight: 'bold',
                      color: '#FFFFFF',
                      cursor: 'pointer',
                      pointerEvents: 'auto'
                    }}
                    onClick={() => handleLocationClick(4)}
                  >
                    4
                  </div>
                  
                  {/* Physical Game Locations (5-8) */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '40px',
                      height: '40px',
                      backgroundColor: getLocationStatus(5).color,
                      borderRadius: '50%',
                      border: '4px solid #FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '20px',
                      fontWeight: 'bold',
                      color: '#FFFFFF',
                      cursor: 'pointer',
                      pointerEvents: 'auto'
                    }}
                    onClick={() => handleLocationClick(5)}
                  >
                    5
                  </div>
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '25%',
                      left: '20%',
                      width: '40px',
                      height: '40px',
                      backgroundColor: getLocationStatus(6).color,
                      borderRadius: '50%',
                      border: '4px solid #FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '20px',
                      fontWeight: 'bold',
                      color: '#FFFFFF',
                      cursor: 'pointer',
                      pointerEvents: 'auto'
                    }}
                    onClick={() => handleLocationClick(6)}
                  >
                    6
                  </div>
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '25%',
                      right: '20%',
                      width: '40px',
                      height: '40px',
                      backgroundColor: getLocationStatus(7).color,
                      borderRadius: '50%',
                      border: '4px solid #FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '20px',
                      fontWeight: 'bold',
                      color: '#FFFFFF',
                      cursor: 'pointer',
                      pointerEvents: 'auto'
                    }}
                    onClick={() => handleLocationClick(7)}
                  >
                    7
                  </div>
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '10%',
                      left: '20%',
                      width: '40px',
                      height: '40px',
                      backgroundColor: getLocationStatus(8).color,
                      borderRadius: '50%',
                      border: '4px solid #FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '20px',
                      fontWeight: 'bold',
                      color: '#FFFFFF',
                      cursor: 'pointer',
                      pointerEvents: 'auto'
                    }}
                    onClick={() => handleLocationClick(8)}
                  >
                    8
                  </div>
                  
                  {/* Special Location (9) */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '10%',
                      right: '20%',
                      width: '40px',
                      height: '40px',
                      backgroundColor: getLocationStatus(9).color,
                      borderRadius: '50%',
                      border: '4px solid #FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '20px',
                      fontWeight: 'bold',
                      color: '#FFFFFF',
                      cursor: 'pointer',
                      pointerEvents: 'auto'
                    }}
                    onClick={() => handleLocationClick(9)}
                  >
                    9
                  </div>
                </div>
              </div>


              {/* Progress Summary */}
              <div
                style={{
                  backgroundColor: theme.colors.background,
                  padding: theme.spacing.md,
                  borderRadius: theme.borderRadius.md,
                  border: `1px solid ${theme.colors.border}`,
                  textAlign: 'center'
                }}
              >
                <p
                  style={{
                    color: theme.colors.accent,
                    fontSize: theme.typography.fontSize.lg,
                    fontWeight: theme.typography.fontWeight.semibold,
                    marginBottom: theme.spacing.sm
                  }}
                >
                  Progress: {gameProgress.completedLevels.length}/9 locations completed
                </p>
                <p
                  style={{
                    color: theme.colors.textSecondary,
                    fontSize: theme.typography.fontSize.base
                  }}
                >
                  Total Score: {gameProgress.totalScore} points
                </p>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MinimapPopup;
