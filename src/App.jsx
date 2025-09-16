import React from 'react';
import { GameProvider } from './contexts/GameContext';
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
  return (
    <GameProvider>
      <RotatableContainer>
        {/* Header Bar */}
        <Header />
        
        {/* Main Content Area */}
        <main
          style={{
            paddingTop: '200px', // Header height (increased)
            paddingBottom: '320px', // Action bar height
            minHeight: '100vh',
            backgroundColor: '#E8E8E8',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            flex: 1
          }}
        >
          {/* Robot Character */}
          <RobotSprite />
        </main>
        
        {/* Action Bar */}
        <ActionBar />
        
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