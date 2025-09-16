import React from 'react';
import { GameProvider } from './contexts/GameContext';
import { useOrientation } from './hooks/useOrientation';
import RotatableContainer from './components/Layout/RotatableContainer';
import Header from './components/Layout/Header';
import ActionBar from './components/Layout/ActionBar';
import RobotSprite from './components/Robot/RobotSprite';
import MinimapPopup from './components/Popups/MinimapPopup';
import ProfilePopup from './components/Popups/ProfilePopup';
import QRScannerPopup from './components/QRScanner/QRScannerPopup';
import VolunteerScoringPopup from './components/Popups/VolunteerScoringPopup';
import './styles/global.css';

function App() {
  const { dynamicSpacing, isHighHeight, isNarrowWidth } = useOrientation();

  return (
    <GameProvider>
      <RotatableContainer>
        {/* Main Content Area with all components */}
        <main
          style={{
            minHeight: '100vh',
            backgroundColor: '#580404',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            height: '100%',
            position: 'relative',
            overflow: 'hidden',
            padding: dynamicSpacing, // Dynamic padding based on screen height
            gap: dynamicSpacing // Dynamic gap between components
          }}
        >
          {/* Header Bar */}
          <Header dynamicSpacing={dynamicSpacing} isHighHeight={isHighHeight} />
          
          {/* Robot Character - Center */}
          <RobotSprite dynamicSpacing={dynamicSpacing} isHighHeight={isHighHeight} />
          
          {/* Action Bar */}
          <ActionBar dynamicSpacing={dynamicSpacing} isHighHeight={isHighHeight} isNarrowWidth={isNarrowWidth} />
        </main>
        
        {/* Popup Components */}
        <MinimapPopup />
        <ProfilePopup />
        <QRScannerPopup />
        <VolunteerScoringPopup />
      </RotatableContainer>
    </GameProvider>
  );
}

export default App;