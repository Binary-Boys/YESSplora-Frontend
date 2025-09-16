import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrowserMultiFormatReader } from '@zxing/browser';
import { useGame } from '../../contexts/GameContext';
import { theme } from '../../styles/theme';

const QRScannerPopup = () => {
  const { state, actions } = useGame();
  const { ui } = state;
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [error, setError] = useState(null);
  const [hasPermission, setHasPermission] = useState(false);
  const videoRef = useRef(null);
  const readerRef = useRef(null);

  useEffect(() => {
    if (ui.showQRScanner) {
      initializeScanner();
    } else {
      stopScanner();
    }

    return () => {
      stopScanner();
    };
  }, [ui.showQRScanner]);

  const initializeScanner = async () => {
    try {
      setError(null);
      readerRef.current = new BrowserMultiFormatReader();
      
      // Request camera permission first
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { 
            facingMode: 'environment', // Prefer back camera on mobile
            width: { ideal: 1280 },
            height: { ideal: 720 }
          } 
        });
        
        // Stop the stream as we'll use it through ZXing
        stream.getTracks().forEach(track => track.stop());
        setHasPermission(true);
      } catch (permissionError) {
        throw new Error('Camera permission denied. Please allow camera access to scan QR codes.');
      }
      
      // Get available devices - use the correct method
      let devices = [];
      try {
        devices = await readerRef.current.listVideoInputDevices();
      } catch (deviceError) {
        // Fallback: try to get devices directly from mediaDevices
        const mediaDevices = await navigator.mediaDevices.enumerateDevices();
        devices = mediaDevices.filter(device => device.kind === 'videoinput');
      }
      
      if (devices.length === 0) {
        throw new Error('No camera devices found');
      }

      // Use the first available camera (usually the back camera on mobile)
      const selectedDevice = devices[0];
      
      await readerRef.current.decodeFromVideoDevice(
        selectedDevice.deviceId || selectedDevice.deviceId,
        videoRef.current,
        (result, error) => {
          if (result) {
            handleScanResult(result.getText());
          }
          if (error && error.name !== 'NotFoundException') {
            console.error('QR scan error:', error);
          }
        }
      );

      setIsScanning(true);
    } catch (err) {
      console.error('Scanner initialization error:', err);
      setError(err.message);
      setHasPermission(false);
    }
  };

  const stopScanner = () => {
    if (readerRef.current) {
      readerRef.current.reset();
      readerRef.current = null;
    }
    setIsScanning(false);
    setScanResult(null);
    setError(null);
  };

  const handleScanResult = (result) => {
    console.log('QR Code scanned:', result);
    setScanResult(result);
    
    // Process the QR code result
    processQRCode(result);
    
    // Stop scanning after successful scan
    stopScanner();
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
      // Stop the scanner first
      stopScanner();
      
      // Close all popups
      actions.closeAllPopups();
      
      // Clear any error states
      setError(null);
      setScanResult(null);
      setHasPermission(false);
      
      // Navigate to home page using browser History API
      console.log('QR Scanner closed - navigating back to home page');
      
      // Method 1: Navigate to home page (root)
      window.location.href = '/';
      
      // Alternative Method 2: Use history API (commented out as backup)
      // window.history.pushState({}, '', '/');
      // window.dispatchEvent(new PopStateEvent('popstate'));
      
      // Alternative Method 3: Reload current page to reset state (commented out)
      // window.location.reload();
      
    } catch (err) {
      console.error('Error closing QR Scanner:', err);
      // Fallback: still try to close the popup and navigate
      actions.closeAllPopups();
      window.location.href = '/';
    }
  };

  const handleRetry = () => {
    setError(null);
    setScanResult(null);
    initializeScanner();
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
              padding: theme.spacing.lg,
              transform: 'rotate(90deg)', // Counter-rotate to show normal orientation
              transformOrigin: 'center center'
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
                  maxWidth: '500px',
                  aspectRatio: '1',
                  backgroundColor: theme.colors.background,
                  borderRadius: theme.borderRadius.lg,
                  border: `2px solid ${theme.colors.border}`,
                  overflow: 'hidden',
                  marginBottom: theme.spacing.md
                }}
              >
              {/* Video Element */}
              <video
                ref={videoRef}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
                playsInline
                muted
              />

              {/* Scanning Overlay */}
              {isScanning && (
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    pointerEvents: 'none'
                  }}
                >
                  {/* Scanning Frame */}
                  <div
                    style={{
                      width: '800px', // 4x larger (200px * 4)
                      height: '800px', // 4x larger (200px * 4)
                      border: `12px solid ${theme.colors.accent}`, // 4x larger border (3px * 4)
                      borderRadius: theme.borderRadius.lg,
                      position: 'relative',
                      boxShadow: `0 0 80px ${theme.colors.primary}` // 4x larger glow (20px * 4)
                    }}
                  >
                    {/* Corner Indicators */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '-12px', // 4x larger (-3px * 4)
                        left: '-12px', // 4x larger (-3px * 4)
                        width: '80px', // 4x larger (20px * 4)
                        height: '80px', // 4x larger (20px * 4)
                        borderTop: `12px solid ${theme.colors.primary}`, // 4x larger (3px * 4)
                        borderLeft: `12px solid ${theme.colors.primary}` // 4x larger (3px * 4)
                      }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        top: '-12px', // 4x larger (-3px * 4)
                        right: '-12px', // 4x larger (-3px * 4)
                        width: '80px', // 4x larger (20px * 4)
                        height: '80px', // 4x larger (20px * 4)
                        borderTop: `12px solid ${theme.colors.primary}`, // 4x larger (3px * 4)
                        borderRight: `12px solid ${theme.colors.primary}` // 4x larger (3px * 4)
                      }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '-12px', // 4x larger (-3px * 4)
                        left: '-12px', // 4x larger (-3px * 4)
                        width: '80px', // 4x larger (20px * 4)
                        height: '80px', // 4x larger (20px * 4)
                        borderBottom: `12px solid ${theme.colors.primary}`, // 4x larger (3px * 4)
                        borderLeft: `12px solid ${theme.colors.primary}` // 4x larger (3px * 4)
                      }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '-12px', // 4x larger (-3px * 4)
                        right: '-12px', // 4x larger (-3px * 4)
                        width: '80px', // 4x larger (20px * 4)
                        height: '80px', // 4x larger (20px * 4)
                        borderBottom: `12px solid ${theme.colors.primary}`, // 4x larger (3px * 4)
                        borderRight: `12px solid ${theme.colors.primary}` // 4x larger (3px * 4)
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Error State */}
              {error && (
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: theme.spacing.lg,
                    textAlign: 'center'
                  }}
                >
                  <div
                    style={{
                      fontSize: '48px',
                      color: theme.colors.error,
                      marginBottom: theme.spacing.md
                    }}
                  >
                    📷
                  </div>
                  <p
                    style={{
                      color: theme.colors.accent,
                      fontSize: theme.typography.fontSize.base,
                      marginBottom: theme.spacing.md
                    }}
                  >
                    {error}
                  </p>
                  <button
                    onClick={handleRetry}
                    style={{
                      backgroundColor: theme.colors.primary,
                      color: theme.colors.accent,
                      border: 'none',
                      borderRadius: theme.borderRadius.md,
                      padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
                      fontSize: theme.typography.fontSize.base,
                      fontWeight: theme.typography.fontWeight.semibold,
                      cursor: 'pointer'
                    }}
                  >
                    Try Again
                  </button>
                </div>
              )}

              {/* Success State */}
              {scanResult && (
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 255, 0, 0.8)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: theme.spacing.lg,
                    textAlign: 'center'
                  }}
                >
                  <div
                    style={{
                      fontSize: '48px',
                      color: theme.colors.accent,
                      marginBottom: theme.spacing.md
                    }}
                  >
                    ✓
                  </div>
                  <p
                    style={{
                      color: theme.colors.accent,
                      fontSize: theme.typography.fontSize.base,
                      fontWeight: theme.typography.fontWeight.semibold
                    }}
                  >
                    QR Code Scanned Successfully!
                  </p>
                </div>
              )}
              </div>

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
