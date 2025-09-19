import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../../contexts/GameContext';
import { theme } from '../../styles/theme';

const MinimapPopup = () => {
  const { state, actions } = useGame();
  const { ui, gameProgress } = state;

  const handleClose = () => {
    actions.closeAllPopups();
    // Navigate back to home page for consistency
    console.log('Minimap closed - navigating back to home page');
    window.location.href = '/';
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
                padding: theme.spacing.lg,
                width: 'auto', // Auto width to fit content
                maxWidth: '98vw', // Increased to use more viewport width
                height: 'auto', // Auto height to fit content
                maxHeight: '95vh', // Increased height allowance
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
                  width: '90px', // Further increased size
                  height: '90px', // Further increased size
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
                  marginBottom: theme.spacing.sm,
                  marginTop: theme.spacing.sm
                }}
              >
                YESSPLORA CAMPUS MAP
              </h2>

              {/* YESSplora Isometric Map */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  maxWidth: '1400px', // Further increased for larger view
                  aspectRatio: '4/3', // Better for isometric maps
                  backgroundColor: theme.colors.background,
                  borderRadius: theme.borderRadius.lg,
                  border: `4px solid ${theme.colors.border}`,
                  overflow: 'hidden',
                  marginBottom: theme.spacing.sm,
                  margin: '0 auto',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)' // Enhanced shadow for 3D effect
                }}
              >
                <img
                  src="/yessplora-isometric-map.png"
                  alt="YESSplora Campus Map"
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
                  {/* Blue Cluster - Main Campus Hub (Location 1) */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '25%',
                      left: '45%',
                      width: '60px',
                      height: '60px',
                      backgroundColor: getLocationStatus(1).color,
                      borderRadius: '50%',
                      border: '4px solid #FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '28px',
                      fontWeight: 'bold',
                      color: '#FFFFFF',
                      cursor: 'pointer',
                      pointerEvents: 'auto',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
                      zIndex: 10
                    }}
                    onClick={() => handleLocationClick(1)}
                    title="Main Campus Hub - Blue Building Complex"
                  >
                    1
                  </div>

                  {/* Green Complex - Innovation Center (Location 2) */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '20%',
                      right: '15%',
                      width: '60px',
                      height: '60px',
                      backgroundColor: getLocationStatus(2).color,
                      borderRadius: '50%',
                      border: '4px solid #FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '28px',
                      fontWeight: 'bold',
                      color: '#FFFFFF',
                      cursor: 'pointer',
                      pointerEvents: 'auto',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
                      zIndex: 10
                    }}
                    onClick={() => handleLocationClick(2)}
                    title="Innovation Center - Green Complex"
                  >
                    2
                  </div>

                  {/* Curved Green - Amphitheater (Location 3) */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '15%',
                      left: '15%',
                      width: '60px',
                      height: '60px',
                      backgroundColor: getLocationStatus(3).color,
                      borderRadius: '50%',
                      border: '4px solid #FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '28px',
                      fontWeight: 'bold',
                      color: '#FFFFFF',
                      cursor: 'pointer',
                      pointerEvents: 'auto',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
                      zIndex: 10
                    }}
                    onClick={() => handleLocationClick(3)}
                    title="Amphitheater - Curved Green Structure"
                  >
                    3
                  </div>

                  {/* Large Gray - Central Plaza (Location 4) */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '60%',
                      left: '40%',
                      width: '60px',
                      height: '60px',
                      backgroundColor: getLocationStatus(4).color,
                      borderRadius: '50%',
                      border: '4px solid #FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '28px',
                      fontWeight: 'bold',
                      color: '#FFFFFF',
                      cursor: 'pointer',
                      pointerEvents: 'auto',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
                      zIndex: 10
                    }}
                    onClick={() => handleLocationClick(4)}
                    title="Central Plaza - Large Gray Building"
                  >
                    4
                  </div>
                  
                  {/* Orange Cube - Tech Lab (Location 5) */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '20%',
                      left: '25%',
                      width: '60px',
                      height: '60px',
                      backgroundColor: getLocationStatus(5).color,
                      borderRadius: '50%',
                      border: '4px solid #FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '28px',
                      fontWeight: 'bold',
                      color: '#FFFFFF',
                      cursor: 'pointer',
                      pointerEvents: 'auto',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
                      zIndex: 10
                    }}
                    onClick={() => handleLocationClick(5)}
                    title="Tech Lab - Orange Cube Building"
                  >
                    5
                  </div>

                  {/* Pink Building - Creative Studio (Location 6) */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '70%',
                      left: '25%',
                      width: '60px',
                      height: '60px',
                      backgroundColor: getLocationStatus(6).color,
                      borderRadius: '50%',
                      border: '4px solid #FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '28px',
                      fontWeight: 'bold',
                      color: '#FFFFFF',
                      cursor: 'pointer',
                      pointerEvents: 'auto',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
                      zIndex: 10
                    }}
                    onClick={() => handleLocationClick(6)}
                    title="Creative Studio - Pink Building"
                  >
                    6
                  </div>

                  {/* Irregular Gray - Research Center (Location 7) */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '25%',
                      right: '25%',
                      width: '60px',
                      height: '60px',
                      backgroundColor: getLocationStatus(7).color,
                      borderRadius: '50%',
                      border: '4px solid #FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '28px',
                      fontWeight: 'bold',
                      color: '#FFFFFF',
                      cursor: 'pointer',
                      pointerEvents: 'auto',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
                      zIndex: 10
                    }}
                    onClick={() => handleLocationClick(7)}
                    title="Research Center - Irregular Gray Building"
                  >
                    7
                  </div>
                  {/* Yellow/Light Gray - Workshop (Location 8) */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '35%',
                      right: '35%',
                      width: '60px',
                      height: '60px',
                      backgroundColor: getLocationStatus(8).color,
                      borderRadius: '50%',
                      border: '4px solid #FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '28px',
                      fontWeight: 'bold',
                      color: '#FFFFFF',
                      cursor: 'pointer',
                      pointerEvents: 'auto',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
                      zIndex: 10
                    }}
                    onClick={() => handleLocationClick(8)}
                    title="Workshop - Yellow/Light Gray Building"
                  >
                    8
                  </div>
                  
                  {/* Main Road/Pathway - Checkpoint (Location 9) */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '15%',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '60px',
                      height: '60px',
                      backgroundColor: getLocationStatus(9).color,
                      borderRadius: '50%',
                      border: '4px solid #FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '28px',
                      fontWeight: 'bold',
                      color: '#FFFFFF',
                      cursor: 'pointer',
                      pointerEvents: 'auto',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
                      zIndex: 10
                    }}
                    onClick={() => handleLocationClick(9)}
                    title="Main Checkpoint - Central Pathway"
                  >
                    9
                  </div>
                </div>
              </div>


              {/* Progress Summary */}
              <div
                style={{
                  backgroundColor: theme.colors.background,
                  padding: theme.spacing.sm, // Reduced padding for more compact appearance
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
