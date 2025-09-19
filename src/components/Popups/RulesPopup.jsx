import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../../contexts/GameContext';
import { theme } from '../../styles/theme';

// Individual rule components
import Rule1 from './Rules/Rule1';
import Rule2 from './Rules/Rule2';
import Rule3 from './Rules/Rule3';
import Rule4 from './Rules/Rule4';
import Rule5 from './Rules/Rule5';
import Rule6 from './Rules/Rule6';
import Rule7 from './Rules/Rule7';
import Rule8 from './Rules/Rule8';
import Rule9 from './Rules/Rule9';

const RulesPopup = () => {
  const { state, actions } = useGame();
  const { ui } = state;
  const currentRule = ui.currentRule;
  const highestRuleScanned = ui.highestRuleScanned;

  const handleClose = () => {
    actions.closeAllPopups();
  };

  const handlePlayNow = () => {
    // Get current team info for parameterization
    const teamInfo = state.team;
    const ticketId = state.auth.ticketId;
    
    // Map game IDs to hosted URLs
    const gameUrls = {
      '1': 'https://campuzzle.netlify.app/',
      '2': 'https://spellb.netlify.app/',
      '3': 'https://geonerds.netlify.app/',
      '4': 'https://unity-game.netlify.app/' // Add Unity game URL
    };
    
    const gameUrl = gameUrls[currentRule.toString()];
    if (gameUrl) {
      // Create parameterized URL with team info and level
      const params = new URLSearchParams({
        ticketId: ticketId || 'unknown',
        teamCode: teamInfo.id || 'unknown',
        level: currentRule.toString(),
        gameId: currentRule.toString(),
        returnUrl: window.location.origin
      });
      
      const fullUrl = `${gameUrl}?${params.toString()}`;
      console.log('Redirecting to mini-game:', fullUrl);
      
      // Close rules popup and open game in new tab
      actions.closeAllPopups();
      window.open(fullUrl, '_blank');
    } else {
      alert(`Game not available for level ${currentRule}`);
    }
  };

  const rules = [
    { id: 1, title: 'Campus Puzzle', component: Rule1 },
    { id: 2, title: 'Spell Bee', component: Rule2 },
    { id: 3, title: 'Geo Nerd', component: Rule3 },
    { id: 4, title: 'Unity Game', component: Rule4 },
    { id: 5, title: 'Physical Challenge 1', component: Rule5 },
    { id: 6, title: 'Physical Challenge 2', component: Rule6 },
    { id: 7, title: 'Physical Challenge 3', component: Rule7 },
    { id: 8, title: 'Physical Challenge 4', component: Rule8 },
    { id: 9, title: 'Special Challenge', component: Rule9 }
  ];

  // Filter rules to only show those up to the highest rule scanned
  const availableRules = rules.filter(rule => rule.id <= highestRuleScanned);

  const CurrentRuleComponent = rules.find(rule => rule.id === currentRule)?.component;

  return (
    <AnimatePresence>
      {ui.showRules && (
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
              padding: theme.spacing.md
            }}
            onClick={handleClose}
          >
            {/* Main Content Container */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
                backdropFilter: 'blur(20px)',
                border: `2px solid ${theme.colors.primary}`,
                borderRadius: theme.borderRadius['2xl'],
                padding: theme.spacing.xl,
                width: '100%',
                maxWidth: '800px',
                maxHeight: '90vh',
                overflow: 'hidden',
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
                  width: '40px',
                  height: '40px',
                  backgroundColor: theme.colors.primary,
                  color: theme.colors.accent,
                  border: 'none',
                  borderRadius: theme.borderRadius.full,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: theme.typography.fontSize.xl,
                  fontWeight: theme.typography.fontWeight.bold,
                  zIndex: 10
                }}
                aria-label="Close rules"
              >
                ×
              </button>

              {/* Header */}
              <div style={{ marginBottom: theme.spacing.lg, paddingRight: '60px' }}>
                <h2
                  style={{
                    fontSize: theme.typography.fontSize['3xl'],
                    fontWeight: theme.typography.fontWeight.bold,
                    color: theme.colors.accent,
                    textAlign: 'center',
                    marginBottom: theme.spacing.md
                  }}
                >
                  Game Rules & Regulations
                </h2>
                
                {/* Rule Navigation */}
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: theme.spacing.sm,
                    justifyContent: 'center'
                  }}
                >
                  {availableRules.map((rule) => (
                    <button
                      key={rule.id}
                      onClick={() => actions.setCurrentRule(rule.id)}
                      style={{
                        backgroundColor: currentRule === rule.id ? theme.colors.primary : 'transparent',
                        color: currentRule === rule.id ? theme.colors.accent : theme.colors.textSecondary,
                        border: `2px solid ${currentRule === rule.id ? theme.colors.primary : theme.colors.border}`,
                        borderRadius: theme.borderRadius.lg,
                        padding: `${theme.spacing.sm} ${theme.spacing.md}`,
                        fontSize: theme.typography.fontSize.sm,
                        fontWeight: theme.typography.fontWeight.medium,
                        cursor: 'pointer',
                        transition: theme.transitions.fast,
                        minWidth: '80px'
                      }}
                    >
                      Rule {rule.id}
                    </button>
                  ))}
                  {rules.length > availableRules.length && (
                    <div style={{
                      backgroundColor: 'rgba(255,255,255,0.05)',
                      color: theme.colors.textSecondary,
                      border: `2px solid rgba(255,255,255,0.1)`,
                      borderRadius: theme.borderRadius.lg,
                      padding: `${theme.spacing.sm} ${theme.spacing.md}`,
                      fontSize: theme.typography.fontSize.sm,
                      fontWeight: theme.typography.fontWeight.medium,
                      minWidth: '80px',
                      opacity: 0.6,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      🔒 {rules.length - availableRules.length} locked
                    </div>
                  )}
                </div>
              </div>

              {/* Rule Content */}
              <div
                style={{
                  height: 'calc(90vh - 200px)',
                  overflow: 'auto',
                  paddingRight: theme.spacing.sm
                }}
              >
                {CurrentRuleComponent && <CurrentRuleComponent />}
              </div>

              {/* Play Now Button - Only show for levels 1-4 */}
              {currentRule >= 1 && currentRule <= 4 && (
                <div
                  style={{
                    marginTop: theme.spacing.lg,
                    display: 'flex',
                    justifyContent: 'center'
                  }}
                >
                  <button
                    onClick={handlePlayNow}
                    style={{
                      backgroundColor: theme.colors.primary,
                      color: theme.colors.accent,
                      border: `2px solid ${theme.colors.accent}`,
                      borderRadius: theme.borderRadius.lg,
                      padding: `${theme.spacing.lg} ${theme.spacing.xl}`,
                      fontSize: theme.typography.fontSize.lg,
                      fontWeight: theme.typography.fontWeight.bold,
                      cursor: 'pointer',
                      transition: theme.transitions.fast,
                      boxShadow: theme.shadows.neumorphism.raised,
                      display: 'flex',
                      alignItems: 'center',
                      gap: theme.spacing.sm
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = theme.colors.accent;
                      e.target.style.color = theme.colors.primary;
                      e.target.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = theme.colors.primary;
                      e.target.style.color = theme.colors.accent;
                      e.target.style.transform = 'scale(1)';
                    }}
                  >
                    🎮 Play Now
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default RulesPopup;
