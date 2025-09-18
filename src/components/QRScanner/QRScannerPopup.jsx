import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BarcodeScanner from 'react-qr-barcode-scanner';
import { useGame } from '../../contexts/GameContext';
import { theme } from '../../styles/theme';

const QRScannerPopup = () => {
  const { state, actions } = useGame();
  const { ui } = state;
  const [scanResult, setScanResult] = useState(null);
  const [error, setError] = useState(null);
  const [stopStream, setStopStream] = useState(false);
  const [errorTimeout, setErrorTimeout] = useState(null);
  const [isWaitingForError, setIsWaitingForError] = useState(false);
  const [detectedLink, setDetectedLink] = useState(null);
  const [linkCache, setLinkCache] = useState(null);
  const [linkCacheTimeout, setLinkCacheTimeout] = useState(null);
  const [processingDelay, setProcessingDelay] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [qrCache, setQrCache] = useState(null);
  const [qrCacheTimeout, setQrCacheTimeout] = useState(null);
  
  // Mobile detection
  const isMobile = window.innerWidth <= 768;

  useEffect(() => {
    if (!ui.showQRScanner) {
      // Reset states when scanner is closed
      setScanResult(null);
      setError(null);
      setStopStream(false);
      setIsWaitingForError(false);
      setDetectedLink(null);
      setIsProcessing(false);
      setCountdown(0);
      setQrCache(null);
      // Clear any pending timeouts
      if (errorTimeout) {
        clearTimeout(errorTimeout);
        setErrorTimeout(null);
      }
      if (linkCacheTimeout) {
        clearTimeout(linkCacheTimeout);
        setLinkCacheTimeout(null);
      }
      if (processingDelay) {
        clearTimeout(processingDelay);
        setProcessingDelay(null);
      }
      if (qrCacheTimeout) {
        clearTimeout(qrCacheTimeout);
        setQrCacheTimeout(null);
      }
    }
    
    // Cleanup timeouts on unmount
    return () => {
      if (errorTimeout) {
        clearTimeout(errorTimeout);
      }
      if (linkCacheTimeout) {
        clearTimeout(linkCacheTimeout);
      }
      if (processingDelay) {
        clearTimeout(processingDelay);
      }
      if (qrCacheTimeout) {
        clearTimeout(qrCacheTimeout);
      }
    };
  }, [ui.showQRScanner, errorTimeout, linkCacheTimeout, processingDelay, qrCacheTimeout]);

  // Function to check if a string is a valid URL
  const isValidUrl = (string) => {
    try {
      const url = new URL(string);
      return url.protocol === 'http:' || url.protocol === 'https:';
    } catch (_) {
      return false;
    }
  };

  // Function to cache link for 15 seconds
  const cacheLink = (link) => {
    setLinkCache(link);
    setDetectedLink(link);
    
    // Clear existing cache timeout
    if (linkCacheTimeout) {
      clearTimeout(linkCacheTimeout);
    }
    
    // Set new cache timeout for 15 seconds
    const timeout = setTimeout(() => {
      setLinkCache(null);
      setDetectedLink(null);
      setLinkCacheTimeout(null);
    }, 15000);
    
    setLinkCacheTimeout(timeout);
  };

  const handleScanResult = (result) => {
    console.log('QR Code scanned:', result);
    console.log('Debug Info:');
    console.log('• Scanner Active:', !stopStream ? 'Yes' : 'No');
    console.log('• Processing:', isProcessing ? 'Yes' : 'No');
    console.log('• Countdown:', countdown);
    console.log('• Last Result:', scanResult || 'None');
    
    // Check if this QR code is already cached (prevent duplicate processing)
    if (qrCache === result) {
      console.log('QR code already cached, ignoring duplicate scan');
      return;
    }
    
    // Cache the QR code for 10 seconds to prevent duplicate scans
    setQrCache(result);
    setScanResult(result);
    
    // Clear existing QR cache timeout
    if (qrCacheTimeout) {
      clearTimeout(qrCacheTimeout);
    }
    
    // Set new cache timeout for 10 seconds
    const timeout = setTimeout(() => {
      setQrCache(null);
      setQrCacheTimeout(null);
    }, 10000);
    
    setQrCacheTimeout(timeout);
    
    // Process immediately
    if (isValidUrl(result)) {
      cacheLink(result);
    } else {
      // Process the QR code result for non-URL content
      processQRCode(result);
    }
    
    // Stop scanning after processing
    setStopStream(true);
  };

  const handleScanError = (error) => {
    // Only log critical errors
    if (error.name === "NotAllowedError" || error.name === "NotFoundError" || error.name === "NotReadableError") {
      console.error('QR scan error:', error);
    }
    
    // Clear any existing timeout
    if (errorTimeout) {
      clearTimeout(errorTimeout);
    }
    
    if (error.name === "NotAllowedError") {
      setError('Camera permission denied. Please allow camera access to scan QR codes.');
    } else if (error.name === "NotFoundError") {
      setError('No camera found. Please check your camera connection.');
    } else if (error.name === "NotReadableError") {
      setError('Camera is being used by another application. Please close other apps and try again.');
    } else if (error.name === "OverconstrainedError") {
      setError('Camera constraints could not be satisfied. Trying alternative settings...');
      // Don't show this error immediately, let the scanner try to recover
      return;
    } else if (error.message && error.message.includes('No MultiFormat Readers were able to detect the code')) {
      // Wait 10 seconds before showing the "no code detected" error (increased from 5)
      setIsWaitingForError(true);
      const timeout = setTimeout(() => {
        setError('No QR code detected. Please try again.');
        setErrorTimeout(null);
        setIsWaitingForError(false);
      }, 10000);
      setErrorTimeout(timeout);
    } else {
      // Only show critical errors, ignore common scanning errors
      if (error.name !== 'NotFoundException' && 
          error.name !== 'NoMultiFormatReaderException' &&
          error.name !== 'NotReadableError' &&
          error.name !== 'OverconstrainedError') {
        setError('Camera error: ' + error.message);
      }
    }
  };

  const processQRCode = (qrData) => {
    try {
      // Parse QR code data
      const data = JSON.parse(qrData);
      
      if (data.type === 'software_game') {
        // Redirect to software game
        handleSoftwareGame(data);
      } else if (data.type === 'volunteer') {
        // Open volunteer scoring interface
        handleVolunteerScoring(data);
      } else if (data.type === 'location') {
        // Handle location check-in
        handleLocationCheckIn(data);
      } else {
        throw new Error('Unknown QR code type');
      }
    } catch (parseError) {
      // Handle as simple string or URL
      if (qrData.startsWith('http')) {
        // Open URL
        window.open(qrData, '_blank');
      } else {
        // Check for software game QR codes (yesslvl-1, yesslvl-2, yesslvl-3)
        if (qrData.startsWith('yesslvl-')) {
          const level = qrData.split('-')[1];
          const gameId = level; // Map level to game ID
          handleSoftwareGame({ gameId, level });
        } else {
          // Treat as simple identifier - check for rules mapping
          handleSimpleQR(qrData);
        }
      }
    }
  };

  const handleSoftwareGame = (data) => {
    console.log('Software game QR:', data);
    actions.closeAllPopups();
    
    // Get current team info for parameterization
    const teamInfo = state.team;
    const ticketId = state.auth.ticketId;
    
    // Map game IDs to hosted URLs
    const gameUrls = {
      '1': 'https://campuzzle.netlify.app/',
      '2': 'https://spellb.netlify.app/',
      '3': 'https://geonerds.netlify.app/'
    };
    
    const gameUrl = gameUrls[data.gameId];
    if (gameUrl) {
      // Create parameterized URL with team info and level
      const params = new URLSearchParams({
        ticketId: ticketId || 'unknown',
        teamCode: teamInfo.id || 'unknown',
        level: data.level || '1',
        gameId: data.gameId,
        returnUrl: window.location.origin
      });
      
      const fullUrl = `${gameUrl}?${params.toString()}`;
      console.log('Redirecting to mini-game:', fullUrl);
      
      // Open in new tab
      window.open(fullUrl, '_blank');
    } else {
      alert(`Unknown game ID: ${data.gameId}`);
    }
  };

  const handleVolunteerScoring = (data) => {
    console.log('Volunteer QR:', data);
    actions.closeAllPopups();
    actions.toggleVolunteerScoring();
    // TODO: Pass volunteer data to scoring interface
  };

  const handleLocationCheckIn = (data) => {
    console.log('Location QR:', data);
    // TODO: Implement location validation and check-in
    actions.closeAllPopups();
    alert(`Location Check-in: ${data.locationId}`);
  };

  const handleSimpleQR = (data) => {
    console.log('Simple QR:', data);
    
    // QR Code mappings based on Qractions.txt
    const qrMappings = {
      'yesslvl-1': 1,
      'yesslvl-3': 3,
      'yesslvl-4': 4,
      'yesslvl-5': 5,
      'yesslvl-6': 6,
      'yesslvl-7': 7,
      'yesslvl-8': 8,
      'yesslvl-9': 9,
      'stallyess1': 'stallyess1',
      'stallyess2': 'stallyess2',
      'stallyess3': 'stallyess3',
      'stallyess4': 'stallyess4',
      'stallyess5': 'stallyess5',
      'stallyess6': 'stallyess6',
      'stallyess7': 'stallyess7',
      'stallyess8': 'stallyess8',
      'stallyess9': 'stallyess9',
      'stallyess10': 'stallyess10',
      'stallyess11': 'stallyess11',
      'stallyess12': 'stallyess12',
      'stallyess13': 'stallyess13',
      'stallyess14': 'stallyess14',
      'stallyess15': 'stallyess15',
      'stallyess16': 'stallyess16',
      'stallyess17': 'stallyess17',
      'stallyess18': 'stallyess18',
      'stallyess19': 'stallyess19',
      'stallyess20': 'stallyess20',
      'stallyess21': 'stallyess21',
      'stallyess22': 'stallyess22',
      'stallyess23': 'stallyess23',
      'stallyess24': 'stallyess24',
      'stallyess25': 'stallyess25',
      'stallyess26': 'stallyess26',
      'stallyess27': 'stallyess27',
      'stallyess28': 'stallyess28',
      'stallyess29': 'stallyess29',
      'stallyess30': 'stallyess30',
      'stallyess31': 'stallyess31',
      'stallyess32': 'stallyess32',
      'stallyess33': 'stallyess33',
      'stallyess34': 'stallyess34',
      'stallyess35': 'stallyess35',
      'stallyess36': 'stallyess36',
      'stallyess37': 'stallyess37',
      'stallyess38': 'stallyess38',
      'stallyess39': 'stallyess39',
      'stallyess40': 'stallyess40',
      'stallyess41': 'stallyess41',
      'stallyess42': 'stallyess42',
      'pixprompt': 'pixprompt',
      'googlegsa': 'googlegsa',
      'valaxiapy': 'valaxiapy',
      'treasure': 'treasure'
    };

    // Check if QR code maps to a rules page
    if (qrMappings[data] && typeof qrMappings[data] === 'number') {
      // Set the current rule to the mapped number
      const ruleNumber = qrMappings[data];
      actions.setCurrentRule(ruleNumber);
      actions.setHighestRuleScanned(ruleNumber); // Track highest rule scanned
      // Redirect to rules page
      actions.closeAllPopups();
      actions.toggleRules();
      console.log(`Redirecting to Rule ${ruleNumber}`);
    } else if (qrMappings[data]) {
      // Handle other QR codes (stallyess, pixprompt, etc.)
      handleSpecialQR(data, qrMappings[data]);
    } else {
      // Unknown QR code
      actions.closeAllPopups();
      alert(`Unknown QR Code: ${data}`);
    }
  };

  const handleSpecialQR = (qrCode, type) => {
    console.log(`Special QR Code: ${qrCode}, Type: ${type}`);
    
    if (type.startsWith('stallyess')) {
      // Add 1 point to score
      actions.updateScore(0, 1); // Using location 0 for general points
      actions.closeAllPopups();
      alert(`Stall QR Code detected! +1 point added to your score.`);
    } else if (type === 'pixprompt' || type === 'googlegsa' || type === 'valaxiapy') {
      // Add 3 points to score
      actions.updateScore(0, 3); // Using location 0 for general points
      actions.closeAllPopups();
      alert(`Special QR Code detected! +3 points added to your score.`);
    } else if (type === 'treasure') {
      // Redirect to guardians page (or handle as needed)
      actions.closeAllPopups();
      alert(`Treasure QR Code detected! You found the treasure!`);
    } else {
      actions.closeAllPopups();
      alert(`QR Code: ${qrCode}`);
    }
  };

  const handleClose = () => {
    try {
      // Stop the scanner stream first (fixes browser freeze issue)
      setStopStream(true);
      
      // Close the popup after a short delay
      setTimeout(() => {
        actions.closeAllPopups();
        setError(null);
        setScanResult(null);
        setStopStream(false);
      }, 100);
      
    } catch (err) {
      console.error('Error closing QR Scanner:', err);
      // Fallback: still try to close the popup
      actions.closeAllPopups();
    }
  };

  const handleGoButton = () => {
    if (detectedLink) {
      // Open the link in a new tab
      window.open(detectedLink, '_blank');
      
      // Close the scanner after opening the link
      handleClose();
    }
  };

  const handleRetry = () => {
    setError(null);
    setScanResult(null);
    setStopStream(false);
    setIsWaitingForError(false);
    setDetectedLink(null);
    setIsProcessing(false);
    setCountdown(0);
    setQrCache(null);
    // Clear any pending timeouts
    if (errorTimeout) {
      clearTimeout(errorTimeout);
      setErrorTimeout(null);
    }
    if (linkCacheTimeout) {
      clearTimeout(linkCacheTimeout);
      setLinkCacheTimeout(null);
    }
    if (processingDelay) {
      clearTimeout(processingDelay);
      setProcessingDelay(null);
    }
    if (qrCacheTimeout) {
      clearTimeout(qrCacheTimeout);
      setQrCacheTimeout(null);
    }
  };

  return (
    <AnimatePresence>
      {ui.showQRScanner && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              zIndex: theme.zIndex.overlay,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: theme.spacing.lg
            }}
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                handleClose();
              }
            }}
          >
            {/* Popup Content - Similar wrapper to minimap */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
              style={{
                backgroundColor: theme.colors.surface,
                border: `3px solid ${theme.colors.primary}`,
                borderRadius: theme.borderRadius.xl,
                padding: theme.spacing.xl,
                maxWidth: '90vw',
                maxHeight: '90vh',
                overflow: 'auto',
                position: 'relative',
                boxShadow: theme.shadows['2xl']
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button - Positioned exactly like minimap */}
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleClose();
                }}
                style={{
                  position: 'absolute',
                  top: theme.spacing.md,
                  right: theme.spacing.md,
                  width: '80px', // Increased size
                  height: '80px', // Increased size
                  backgroundColor: theme.colors.primary,
                  color: theme.colors.accent,
                  border: `4px solid ${theme.colors.accent}`, // Added border
                  borderRadius: theme.borderRadius.full,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: `${parseInt(theme.typography.fontSize['2xl']) * 2}px`, // 2x larger font
                  fontWeight: theme.typography.fontWeight.bold,
                  zIndex: 10,
                  boxShadow: theme.shadows.lg // Added shadow
                }}
              >
                ×
              </button>

              {/* Title */}
              <h2
                style={{
                  fontSize: theme.typography.fontSize['2xl'],
                  fontWeight: theme.typography.fontWeight.bold,
                  color: theme.colors.accent,
                  textAlign: 'center',
                  marginBottom: theme.spacing.lg,
                  marginTop: theme.spacing.sm
                }}
              >
                QR Scanner
              </h2>

              {/* Scanner Area */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  maxWidth: isMobile ? '400px' : '600px', // Reduced size for better focus
                  aspectRatio: '1',
                  backgroundColor: theme.colors.background,
                  borderRadius: theme.borderRadius.lg,
                  border: `3px solid ${theme.colors.primary}`, // Use primary color for better visibility
                  overflow: 'hidden',
                  marginBottom: theme.spacing.md,
                  boxShadow: `0 0 20px ${theme.colors.primary}40` // Add subtle glow
                }}
              >
                {/* Barcode Scanner Component */}
                {!stopStream && !scanResult && (
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      transform: 'scaleX(-1)' // Flip camera view horizontally
                    }}
                  >
                    <BarcodeScanner
                      width="100%"
                      height="100%"
                      facingMode="environment" // Always use rear camera for better QR recognition
                      onUpdate={(err, result) => {
                        if (result) {
                          console.log('QR Code detected:', result.getText());
                          handleScanResult(result.getText());
                        } else if (err) {
                          // Only log errors that are not common scanning errors
                          if (err.name !== 'NotFoundException' && 
                              err.name !== 'NoMultiFormatReaderException' &&
                              err.name !== 'NotReadableError' &&
                              err.name !== 'OverconstrainedError') {
                            console.log('QR Scanner error:', err);
                            handleScanError(err);
                          }
                          // Don't log common "no code found" errors to reduce noise
                        }
                      }}
                      onError={(err) => {
                        // Only log and handle critical errors
                        if (err.name === "NotAllowedError" || err.name === "NotFoundError") {
                          console.log('QR Scanner critical error:', err);
                          handleScanError(err);
                        }
                        // Don't log common scanning errors to reduce noise
                      }}
                      delay={100} // Reduced delay for faster recognition
                      stopStream={stopStream}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  </div>
                )}

                {/* Scanning Overlay */}
                {!stopStream && !scanResult && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      pointerEvents: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {/* Corner brackets for scanning area */}
                    <div
                      style={{
                        width: '80%',
                        height: '80%',
                        position: 'relative',
                        border: '2px solid rgba(255, 255, 255, 0.8)',
                        borderRadius: theme.borderRadius.md
                      }}
                    >
                      {/* Top-left corner */}
                      <div
                        style={{
                          position: 'absolute',
                          top: '-2px',
                          left: '-2px',
                          width: '20px',
                          height: '20px',
                          borderTop: '4px solid #00ff00',
                          borderLeft: '4px solid #00ff00'
                        }}
                      />
                      {/* Top-right corner */}
                      <div
                        style={{
                          position: 'absolute',
                          top: '-2px',
                          right: '-2px',
                          width: '20px',
                          height: '20px',
                          borderTop: '4px solid #00ff00',
                          borderRight: '4px solid #00ff00'
                        }}
                      />
                      {/* Bottom-left corner */}
                      <div
                        style={{
                          position: 'absolute',
                          bottom: '-2px',
                          left: '-2px',
                          width: '20px',
                          height: '20px',
                          borderBottom: '4px solid #00ff00',
                          borderLeft: '4px solid #00ff00'
                        }}
                      />
                      {/* Bottom-right corner */}
                      <div
                        style={{
                          position: 'absolute',
                          bottom: '-2px',
                          right: '-2px',
                          width: '20px',
                          height: '20px',
                          borderBottom: '4px solid #00ff00',
                          borderRight: '4px solid #00ff00'
                        }}
                      />
                    </div>
                  </div>
                )}

              </div>


              {/* Simple Link Button - Only show when link is detected */}
              {detectedLink && (
                <button
                  onClick={handleGoButton}
                  style={{
                    backgroundColor: theme.colors.primary,
                    color: theme.colors.accent,
                    border: `2px solid ${theme.colors.accent}`,
                    borderRadius: theme.borderRadius.lg,
                    padding: `${theme.spacing.md} ${theme.spacing.xl}`,
                    fontSize: theme.typography.fontSize.lg,
                    fontWeight: theme.typography.fontWeight.bold,
                    cursor: 'pointer',
                    transition: theme.transitions.fast,
                    boxShadow: theme.shadows.neumorphism.raised,
                    marginBottom: theme.spacing.md,
                    width: '100%'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = theme.colors.accent;
                    e.target.style.color = theme.colors.primary;
                    e.target.style.transform = 'scale(1.02)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = theme.colors.primary;
                    e.target.style.color = theme.colors.accent;
                    e.target.style.transform = 'scale(1)';
                  }}
                >
                  🚀 Go to Link
                </button>
              )}

              {/* Error Retry Button - Only show when there's an error */}
              {error && (
                <button
                  onClick={handleRetry}
                  style={{
                    backgroundColor: theme.colors.primary,
                    color: theme.colors.accent,
                    border: `2px solid ${theme.colors.accent}`,
                    borderRadius: theme.borderRadius.lg,
                    padding: `${theme.spacing.md} ${theme.spacing.xl}`,
                    fontSize: theme.typography.fontSize.lg,
                    fontWeight: theme.typography.fontWeight.bold,
                    cursor: 'pointer',
                    transition: theme.transitions.fast,
                    boxShadow: theme.shadows.neumorphism.raised,
                    marginBottom: theme.spacing.md,
                    width: '100%'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = theme.colors.accent;
                    e.target.style.color = theme.colors.primary;
                    e.target.style.transform = 'scale(1.02)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = theme.colors.primary;
                    e.target.style.color = theme.colors.accent;
                    e.target.style.transform = 'scale(1)';
                  }}
                >
                  🔄 Try Again
                </button>
              )}


              {/* Instructions */}
              <div
                style={{
                  textAlign: 'center',
                  marginTop: theme.spacing.md
                }}
              >
                <p
                  style={{
                    color: theme.colors.textSecondary,
                    fontSize: theme.typography.fontSize.sm,
                    marginBottom: theme.spacing.sm
                  }}
                >
                  Point your camera at a QR code to scan
                </p>
                <p
                  style={{
                    color: theme.colors.textSecondary,
                    fontSize: theme.typography.fontSize.xs,
                    marginBottom: theme.spacing.xs
                  }}
                >
                  Make sure the QR code is within the green frame
                </p>
                <p
                  style={{
                    color: theme.colors.textSecondary,
                    fontSize: theme.typography.fontSize.xs,
                    marginTop: theme.spacing.sm
                  }}
                >
                  💡 Tip: Ensure good lighting and hold the QR code steady
                </p>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default QRScannerPopup;
