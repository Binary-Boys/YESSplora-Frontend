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
  const [cacheTimeout, setCacheTimeout] = useState(null);
  
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
      // Clear any pending timeouts
      if (errorTimeout) {
        clearTimeout(errorTimeout);
        setErrorTimeout(null);
      }
      if (cacheTimeout) {
        clearTimeout(cacheTimeout);
        setCacheTimeout(null);
      }
    }
    
    // Cleanup timeouts on unmount
    return () => {
      if (errorTimeout) {
        clearTimeout(errorTimeout);
      }
      if (cacheTimeout) {
        clearTimeout(cacheTimeout);
      }
    };
  }, [ui.showQRScanner, errorTimeout, cacheTimeout]);

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
    if (cacheTimeout) {
      clearTimeout(cacheTimeout);
    }
    
    // Set new cache timeout for 15 seconds
    const timeout = setTimeout(() => {
      setLinkCache(null);
      setDetectedLink(null);
      setCacheTimeout(null);
    }, 15000);
    
    setCacheTimeout(timeout);
  };

  const handleScanResult = (result) => {
    console.log('QR Code scanned:', result);
    setScanResult(result);
    
    // Check if the result is a valid URL
    if (isValidUrl(result)) {
      cacheLink(result);
    } else {
      // Process the QR code result for non-URL content
      processQRCode(result);
    }
    
    // Stop scanning after successful scan
    setStopStream(true);
  };

  const handleScanError = (error) => {
    console.error('QR scan error:', error);
    
    // Clear any existing timeout
    if (errorTimeout) {
      clearTimeout(errorTimeout);
    }
    
    if (error.name === "NotAllowedError") {
      setError('Camera permission denied. Please allow camera access to scan QR codes.');
    } else if (error.name === "NotFoundError") {
      setError('No camera found. Please check your camera connection.');
    } else if (error.message && error.message.includes('No MultiFormat Readers were able to detect the code')) {
      // Wait 5 seconds before showing the "no code detected" error
      setIsWaitingForError(true);
      const timeout = setTimeout(() => {
        setError('No QR code detected. Please try again.');
        setErrorTimeout(null);
        setIsWaitingForError(false);
      }, 5000);
      setErrorTimeout(timeout);
    } else {
      setError('Camera error: ' + error.message);
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
        // Treat as simple identifier
        handleSimpleQR(qrData);
      }
    }
  };

  const handleSoftwareGame = (data) => {
    console.log('Software game QR:', data);
    // TODO: Implement software game redirection
    actions.closeAllPopups();
    // For now, just show an alert
    alert(`Software Game: ${data.gameId}\nLevel: ${data.level}`);
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
    // TODO: Handle simple QR codes
    actions.closeAllPopups();
    alert(`QR Code: ${data}`);
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
    // Clear any pending timeouts
    if (errorTimeout) {
      clearTimeout(errorTimeout);
      setErrorTimeout(null);
    }
    if (cacheTimeout) {
      clearTimeout(cacheTimeout);
      setCacheTimeout(null);
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
                  maxWidth: isMobile ? '600px' : '1000px', // 200% increase: 300px->600px, 500px->1000px
                  aspectRatio: '1',
                  backgroundColor: theme.colors.background,
                  borderRadius: theme.borderRadius.lg,
                  border: `4px solid ${theme.colors.border}`, // Always use regular border color
                  overflow: 'hidden',
                  marginBottom: theme.spacing.md,
                  boxShadow: 'none' // No glow effect
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
                      facingMode={isMobile ? "environment" : "environment"} // Rear camera on mobile, environment on desktop
                      onUpdate={(err, result) => {
                        if (result) {
                          handleScanResult(result.getText());
                        } else if (err && err.name !== 'NotFoundException' && err.name !== 'NoMultiFormatReaderException') {
                          handleScanError(err);
                        } else if (err && err.name === 'NoMultiFormatReaderException') {
                          // Handle the specific "No MultiFormat Readers" error with delay
                          handleScanError(err);
                        }
                      }}
                      onError={handleScanError}
                      delay={300}
                      stopStream={stopStream}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
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
                    fontSize: theme.typography.fontSize.xs
                  }}
                >
                  Make sure the QR code is within the frame
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
