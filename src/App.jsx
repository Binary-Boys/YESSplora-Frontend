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
  const { dynamicSpacing, isHighHeight, dimensions, effectiveDimensions, shouldRotate, isPortraitMode, alwaysRotated } = useOrientation();

  return (
    <GameProvider>
      <RotatableContainer>
        {/* Main Content Area with all components */}
        <main
          style={{
            minHeight: '100%',
            height: '100%',
            backgroundColor: '#580404',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            position: 'relative',
            overflow: 'visible', // Allow content to be visible
            padding: `${dynamicSpacing} ${dynamicSpacing} 20px 20px`, // Add 20px bottom and right padding to main container
            gap: alwaysRotated ? '2px' : dynamicSpacing, // Always use tight gap since we're always rotated
            boxSizing: 'border-box'
          }}
        >
          {/* Header Bar */}
          <Header dynamicSpacing={dynamicSpacing} isHighHeight={isHighHeight} isRotated={alwaysRotated} />
          
          {/* Robot Character - Center */}
          <RobotSprite dynamicSpacing={dynamicSpacing} isHighHeight={isHighHeight} dimensions={effectiveDimensions} />
          
          {/* Action Bar */}
          <ActionBar dynamicSpacing={dynamicSpacing} isHighHeight={isHighHeight} dimensions={effectiveDimensions} />
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