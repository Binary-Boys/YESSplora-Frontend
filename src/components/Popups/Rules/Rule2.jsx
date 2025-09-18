import React from 'react';
import { useGame } from '../../../contexts/GameContext';
import { theme } from '../../../styles/theme';

const Rule2 = () => {
  const { state, actions } = useGame();
  const { auth } = state;

  const handlePlayNow = () => {
    const ticketId = auth.ticketId || 'admin';
    const gameUrl = `/softgame2/spellB/index.html?ticketId=${ticketId}`;
    
    // Open game in new tab
    window.open(gameUrl, '_blank');
    
    // Log the action
    console.log(`Playing Spell Bee with ticket ID: ${ticketId}`);
    
    // Simulate score return (in real implementation, this would come from the game)
    setTimeout(() => {
      const score = 10;
      console.log(`Game completed with score: ${score}`);
      actions.completeLocation(2, score, 'software');
    }, 2000);
  };

  return (
    <div
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))',
        backdropFilter: 'blur(15px)',
        border: `2px solid ${theme.colors.primary}`,
        borderRadius: theme.borderRadius.xl,
        padding: theme.spacing.xl,
        marginBottom: theme.spacing.lg
      }}
    >
      <h3
        style={{
          fontSize: theme.typography.fontSize['2xl'],
          fontWeight: theme.typography.fontWeight.bold,
          color: theme.colors.accent,
          textAlign: 'center',
          marginBottom: theme.spacing.lg
        }}
      >
        Spell Bee Challenge
      </h3>

      <div
        style={{
          marginBottom: theme.spacing.lg
        }}
      >
        <h4
          style={{
            fontSize: theme.typography.fontSize.lg,
            fontWeight: theme.typography.fontWeight.semibold,
            color: theme.colors.accent,
            marginBottom: theme.spacing.md
          }}
        >
          Rules & Regulations:
        </h4>
        
        <ul
          style={{
            listStyle: 'none',
            padding: 0,
            margin: 0
          }}
        >
          <li
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              marginBottom: theme.spacing.md,
              padding: theme.spacing.md,
              backgroundColor: 'rgba(255,255,255,0.05)',
              borderRadius: theme.borderRadius.md,
              border: `1px solid ${theme.colors.border}`
            }}
          >
            <span
              style={{
                color: theme.colors.primary,
                fontWeight: theme.typography.fontWeight.bold,
                marginRight: theme.spacing.sm,
                fontSize: theme.typography.fontSize.lg
              }}
            >
              •
            </span>
            <span
              style={{
                color: theme.colors.text,
                fontSize: theme.typography.fontSize.base,
                lineHeight: theme.typography.lineHeight.relaxed
              }}
            >
              Listen to audio pronunciations and spell the words correctly
            </span>
          </li>
          
          <li
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              marginBottom: theme.spacing.md,
              padding: theme.spacing.md,
              backgroundColor: 'rgba(255,255,255,0.05)',
              borderRadius: theme.borderRadius.md,
              border: `1px solid ${theme.colors.border}`
            }}
          >
            <span
              style={{
                color: theme.colors.primary,
                fontWeight: theme.typography.fontWeight.bold,
                marginRight: theme.spacing.sm,
                fontSize: theme.typography.fontSize.lg
              }}
            >
              •
            </span>
            <span
              style={{
                color: theme.colors.text,
                fontSize: theme.typography.fontSize.base,
                lineHeight: theme.typography.lineHeight.relaxed
              }}
            >
              Complete 20 words to finish the challenge
            </span>
          </li>
          
          <li
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              marginBottom: theme.spacing.md,
              padding: theme.spacing.md,
              backgroundColor: 'rgba(255,255,255,0.05)',
              borderRadius: theme.borderRadius.md,
              border: `1px solid ${theme.colors.border}`
            }}
          >
            <span
              style={{
                color: theme.colors.primary,
                fontWeight: theme.typography.fontWeight.bold,
                marginRight: theme.spacing.sm,
                fontSize: theme.typography.fontSize.lg
              }}
            >
              •
            </span>
            <span
              style={{
                color: theme.colors.text,
                fontSize: theme.typography.fontSize.base,
                lineHeight: theme.typography.lineHeight.relaxed
              }}
            >
              Use headphones for better audio experience
            </span>
          </li>
          
          <li
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              marginBottom: theme.spacing.md,
              padding: theme.spacing.md,
              backgroundColor: 'rgba(255,255,255,0.05)',
              borderRadius: theme.borderRadius.md,
              border: `1px solid ${theme.colors.border}`
            }}
          >
            <span
              style={{
                color: theme.colors.primary,
                fontWeight: theme.typography.fontWeight.bold,
                marginRight: theme.spacing.sm,
                fontSize: theme.typography.fontSize.lg
              }}
            >
              •
            </span>
            <span
              style={{
                color: theme.colors.text,
                fontSize: theme.typography.fontSize.base,
                lineHeight: theme.typography.lineHeight.relaxed
              }}
            >
              Score: 10 points for completion
            </span>
          </li>
        </ul>
      </div>

      {/* Play Now Button */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: theme.spacing.xl
        }}
      >
        <button
          onClick={handlePlayNow}
          className="shimmer-button"
          style={{
            padding: `${theme.spacing.md} ${theme.spacing.xl}`,
            borderRadius: theme.borderRadius.xl,
            border: 'none',
            background: 'linear-gradient(90deg, #580404 0%, #7A0505 50%, #580404 100%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 2s ease-in-out infinite',
            color: theme.colors.accent,
            fontSize: theme.typography.fontSize.lg,
            fontWeight: theme.typography.fontWeight.bold,
            cursor: 'pointer',
            boxShadow: theme.shadows.neumorphism.raised,
            transition: theme.transitions.fast,
            minWidth: '200px'
          }}
        >
          Play Now
        </button>
      </div>
    </div>
  );
};

export default Rule2;
