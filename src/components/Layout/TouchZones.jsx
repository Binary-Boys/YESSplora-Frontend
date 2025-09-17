import React from 'react';

const TouchZones = ({ onTopZoneTouch, onBottomZoneTouch, isVisible }) => {
  const zoneHeight = '60px'; // Height of the touch detection zones
  const isMobile = window.innerWidth <= 768; // Mobile detection

  const zoneStyle = {
    position: 'fixed',
    left: 0,
    right: 0,
    width: '100%',
    height: zoneHeight,
    zIndex: 9999, // High z-index to ensure it's on top
    backgroundColor: 'transparent',
    cursor: 'pointer',
    // Only show touch zones when bars are hidden, and disable bottom zone on mobile
    pointerEvents: isVisible ? 'none' : 'auto',
    opacity: 0 // Invisible but still functional
  };

  return (
    <>
      {/* Top touch zone for header */}
      <div
        style={{
          ...zoneStyle,
          top: 0
        }}
        onClick={onTopZoneTouch}
        onTouchStart={onTopZoneTouch}
        onMouseEnter={onTopZoneTouch}
        aria-label="Touch to show header"
      />

      {/* Bottom touch zone for footer - disabled on mobile since ActionBar is always visible */}
      <div
        style={{
          ...zoneStyle,
          bottom: 0,
          // Disable bottom touch zone on mobile since ActionBar is always visible
          pointerEvents: isMobile ? 'none' : (isVisible ? 'none' : 'auto')
        }}
        onClick={isMobile ? undefined : onBottomZoneTouch}
        onTouchStart={isMobile ? undefined : onBottomZoneTouch}
        onMouseEnter={isMobile ? undefined : onBottomZoneTouch}
        aria-label={isMobile ? "ActionBar always visible on mobile" : "Touch to show footer"}
      />
    </>
  );
};

export default TouchZones;
