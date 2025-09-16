import React from 'react';
import { GameProvider } from './contexts/GameContext';
import RotatableContainer from './components/Layout/RotatableContainer';
import Header from './components/Layout/Header';
import ActionBar from './components/Layout/ActionBar';
import MinimapPopup from './components/Popups/MinimapPopup';
import ProfilePopup from './components/Popups/ProfilePopup';
import QRScannerPopup from './components/QRScanner/QRScannerPopup';
import VolunteerScoringPopup from './components/Popups/VolunteerScoringPopup';
import './styles/global.css';

function App() {
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
            padding: '20px'
          }}
        >
          {/* Header Bar */}
          <Header />
          
          
          {/* Action Bar */}
          <ActionBar />
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