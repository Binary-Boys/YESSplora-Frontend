import React, { useEffect, useState } from 'react';
import { GameProvider, useGame } from './contexts/GameContext';
import { useOrientation } from './hooks/useOrientation';
import { useAutoHide } from './hooks/useAutoHide';
import RotatableContainer from './components/Layout/RotatableContainer';
import Header from './components/Layout/Header';
import ActionBar from './components/Layout/ActionBar';
import TouchZones from './components/Layout/TouchZones';
import RobotSprite from './components/Robot/RobotSprite';
import MinimapPopup from './components/Popups/MinimapPopup';
import ProfilePopup from './components/Popups/ProfilePopup';
import QRScannerPopup from './components/QRScanner/QRScannerPopup';
import VolunteerScoringPopup from './components/Popups/VolunteerScoringPopup';
import LeaderboardPopup from './components/Popups/LeaderboardPopup';
import SupportPopup from './components/Popups/SupportPopup';
import RulesPopup from './components/Popups/RulesPopup';
import AuthPage from './components/Auth/AuthPage';
import './styles/global.css';

// Game component that uses the game context
const GameApp = ({ onLoginSuccess }) => {
  const { actions } = useGame();
  const { dynamicSpacing, isHighHeight, dimensions, effectiveDimensions, shouldRotate, isPortraitMode, alwaysRotated } = useOrientation();
  const { showBars } = useAutoHide(20000);
  const isVisible = true;

  // Initialize authentication from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem('yess_auth');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && parsed.isAuthenticated) {
          // Initialize game context with auth data
          actions.login(parsed.ticketId, parsed.teamCode, parsed.isAdmin || false);
          onLoginSuccess();
        }
      }
    } catch (error) {
      console.error('Error initializing auth:', error);
    }
  }, []); // Remove dependencies to prevent infinite loops

  // Listen for mini-game completion messages
  useEffect(() => {
    const handleMessage = (event) => {
      // Only accept messages from trusted origins
      const trustedOrigins = [
        'https://campuzzle.netlify.app',
        'https://spellb.netlify.app',
        'https://geonerds.netlify.app'
      ];
      
      if (!trustedOrigins.includes(event.origin)) {
        return;
      }
      
      if (event.data && event.data.type === 'MINI_GAME_COMPLETE') {
        const { gameId, score, level } = event.data;
        console.log('Received mini-game completion:', event.data);
        
        // Complete the mini-game in the main app
        actions.completeMiniGame(gameId, score, level);
        
        // Show completion message with more details
        const gameNames = {
          '1': 'Campus Puzzle',
          '2': 'Spell Bee',
          '3': 'Geo Nerd'
        };
        const gameName = gameNames[gameId] || `Game ${gameId}`;
        
        alert(`🎉 ${gameName} completed!\nScore: ${score}/10\nLevel: ${level}\n\nReturning to YESSplora...`);
        
        // Close any open popups to return to main UI
        actions.closeAllPopups();
      }
    };
    
    window.addEventListener('message', handleMessage);
    
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [actions]);

  return (
    <RotatableContainer>
      {/* Main Content Area with all components */}
      <main
        style={{
          minHeight: '100%',
          height: '100%',
          maxHeight: '100vh', // Ensure it doesn't exceed viewport height
          backgroundColor: '#580404',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          minWidth: window.innerWidth <= 768 ? '320px' : '710px', // Responsive min width for mobile
          position: 'relative',
          zIndex: 10, // Ensure content appears above floating dots
          overflow: 'visible', // Allow content to be visible
          padding: '0', // Remove padding since parent container handles it with fixed 20px
          gap: window.innerWidth <= 768 ? '8px' : dynamicSpacing, // Smaller gap for mobile
          boxSizing: 'border-box'
        }}
      >
        {/* Header Bar - with auto-hide functionality */}
        <Header 
          dynamicSpacing={dynamicSpacing} 
          isHighHeight={isHighHeight} 
          isRotated={false}
          isVisible={isVisible}
        />
        
        {/* Robot Character - Center */}
        <RobotSprite dynamicSpacing={dynamicSpacing} isHighHeight={isHighHeight} dimensions={effectiveDimensions} />
        
        {/* Action Bar - with auto-hide functionality */}
        <ActionBar 
          dynamicSpacing={dynamicSpacing} 
          isHighHeight={isHighHeight} 
          dimensions={effectiveDimensions}
          isVisible={isVisible}
        />
      </main>
      
      {/* Touch zones for showing hidden bars */}
      <TouchZones 
        isVisible={isVisible}
        onTopZoneTouch={showBars}
        onBottomZoneTouch={showBars}
      />
      
      {/* Popup Components */}
      <MinimapPopup />
      <ProfilePopup />
      <QRScannerPopup />
      <LeaderboardPopup />
      <VolunteerScoringPopup />
      <SupportPopup />
      <RulesPopup />
    </RotatableContainer>
  );
};

function App() {
  const [currentView, setCurrentView] = useState('auth'); // 'auth', 'game'

  // Restore persisted auth on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem('yess_auth');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && parsed.isAuthenticated) {
          setCurrentView('game');
        }
      }
    } catch {}
  }, []);

  const handleLoginSuccess = () => {
    setCurrentView('game');
  };

  // Handle view routing
  if (currentView === 'auth') {
    return <AuthPage onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <GameProvider>
      <GameApp onLoginSuccess={handleLoginSuccess} />
    </GameProvider>
  );
}

export default App;