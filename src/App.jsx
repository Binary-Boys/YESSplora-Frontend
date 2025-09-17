import React, { useEffect, useState } from 'react';
import { GameProvider } from './contexts/GameContext';
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
import AuthPage from './components/Auth/AuthPage';
import './styles/global.css';

function App() {
  const { dynamicSpacing, isHighHeight, dimensions, effectiveDimensions, shouldRotate, isPortraitMode, alwaysRotated } = useOrientation();
  // Keep bars always visible; keep showBars to satisfy TouchZones props
  const { showBars } = useAutoHide(20000);
  const isVisible = true;
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState('auth'); // 'auth', 'game'

  // Restore persisted auth on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem('yess_auth');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && parsed.isAuthenticated) {
          setCurrentView('game');
          setIsAuthenticated(true);
        }
      }
    } catch {}
  }, []);

  // Handle view routing
  if (currentView === 'auth') {
    return <AuthPage onLoginSuccess={() => setCurrentView('game')} />;
  }

  return (
    <GameProvider>
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
            onLogout={() => {
              try { localStorage.removeItem('yess_auth'); } catch {}
              setIsAuthenticated(false);
              setCurrentView('auth');
            }}
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
      </RotatableContainer>
    </GameProvider>
  );
}

export default App;