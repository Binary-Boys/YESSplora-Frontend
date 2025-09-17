import React from 'react';
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
import SupportPopup from './components/Popups/SupportPopup';
import './styles/global.css';

function App() {
  const { dynamicSpacing, isHighHeight, dimensions, effectiveDimensions, shouldRotate, isPortraitMode, alwaysRotated } = useOrientation();
  const { isVisible, showBars } = useAutoHide(20000); // 20 seconds delay

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
            minWidth: '710px', // Support parent container's 750px with 20px padding on each side
            position: 'relative',
            zIndex: 10, // Ensure content appears above floating dots
            overflow: 'visible', // Allow content to be visible
            padding: '0', // Remove padding since parent container handles it with fixed 20px
            gap: dynamicSpacing, // Use dynamic spacing for vertical layout
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
        <VolunteerScoringPopup />
        <SupportPopup />
      </RotatableContainer>
    </GameProvider>
  );
}

export default App;