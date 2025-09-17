import React from 'react';

const TouchZones = ({ onTopZoneTouch, onBottomZoneTouch, isVisible }) => {
  const zoneHeight = '60px'; // Height of the touch detection zones

  const zoneStyle = {
    position: 'fixed',
    left: 0,
    right: 0,
    width: '100%',
    height: zoneHeight,
    zIndex: 9999, // High z-index to ensure it's on top
    backgroundColor: 'transparent',
    cursor: 'pointer',
    // Only show touch zones when bars are hidden
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

      {/* Bottom touch zone for footer */}
      <div
        style={{
          ...zoneStyle,
          bottom: 0
        }}
        onClick={onBottomZoneTouch}
        onTouchStart={onBottomZoneTouch}
        onMouseEnter={onBottomZoneTouch}
        aria-label="Touch to show footer"
      />
    </>
  );
};

export default TouchZones;
