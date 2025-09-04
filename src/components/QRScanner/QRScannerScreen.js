import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Camera, ArrowLeft, AlertCircle, CheckCircle, X } from 'lucide-react';
import { Html5QrcodeScanner, Html5QrcodeScanType } from 'html5-qrcode';
import { useAuthStore } from '../../hooks/useAuthStore';
import NeonHalo from '../Animation/NeonHalo';

const QRScannerScreen = () => {
  const navigate = useNavigate();
  const { team, updateTeamPoints, updateTeamScannedQRs } = useAuthStore();
  
  // State management
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [error, setError] = useState(null);
  const [permissionStatus, setPermissionStatus] = useState('unknown');
  const [isInitializing, setIsInitializing] = useState(false);
  
  // Refs
  const scannerRef = useRef(null);
  const scannerInstanceRef = useRef(null);
  const mountedRef = useRef(true);

  // Cleanup function
  const cleanupScanner = useCallback(() => {
    if (scannerInstanceRef.current) {
      try {
        console.log('Cleaning up scanner instance...');
        scannerInstanceRef.current.clear();
        scannerInstanceRef.current = null;
      } catch (err) {
        console.warn('Error during scanner cleanup:', err);
      }
    }
    setIsScanning(false);
    setIsInitializing(false);
  }, []);

  // Check camera permissions
  const checkCameraPermission = useCallback(async () => {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setPermissionStatus('not-supported');
        return false;
      }

      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      });
      
      // Stop the test stream immediately
      stream.getTracks().forEach(track => track.stop());
      
      setPermissionStatus('granted');
      return true;
    } catch (err) {
      console.error('Camera permission check failed:', err);
      
      if (err.name === 'NotAllowedError') {
        setPermissionStatus('denied');
        setError('Camera access denied. Please allow camera permissions.');
      } else if (err.name === 'NotFoundError') {
        setPermissionStatus('no-camera');
        setError('No camera found on this device.');
      } else {
        setPermissionStatus('error');
        setError('Camera access error. Please check your camera.');
      }
      return false;
    }
  }, []);

  // Initialize scanner
  const initializeScanner = useCallback(async () => {
    if (!mountedRef.current || scannerInstanceRef.current || isInitializing) {
      return;
    }

    setIsInitializing(true);
    setError(null);
    console.log('Starting scanner initialization...');

    // Check permissions first
    const hasPermission = await checkCameraPermission();
    if (!hasPermission) {
      setIsInitializing(false);
      return;
    }

    // Wait for DOM element
    const qrReaderElement = document.getElementById('qr-reader');
    if (!qrReaderElement) {
      console.log('QR reader element not found, retrying...');
      setTimeout(() => {
        if (mountedRef.current) {
          initializeScanner();
        }
      }, 1000);
      return;
    }

    try {
      // Clear any existing content
      qrReaderElement.innerHTML = '';
      
      console.log('Creating QR scanner...');
      const scanner = new Html5QrcodeScanner(
        "qr-reader",
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
          aspectRatio: 1.0,
          supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
          showTorchButtonIfSupported: true,
          showZoomSliderIfSupported: true
        },
        false
      );

      // Success callback
      const onScanSuccess = (decodedText, decodedResult) => {
        console.log('QR Code scanned:', decodedText);
        
        if (!mountedRef.current) return;
        
        // Stop scanning
        cleanupScanner();
        
        // Process the QR code
        try {
          const qrData = JSON.parse(decodedText);
          setScanResult({
            success: true,
            data: qrData,
            message: 'QR Code scanned successfully!'
          });
          
          // Update team data
          if (team) {
            const newPoints = (team.points || 0) + (qrData.points || 10);
            const newScannedQRs = [...(team.scannedQRs || []), qrData];
            
            updateTeamPoints(newPoints);
            updateTeamScannedQRs(newScannedQRs);
          }
        } catch (parseError) {
          console.error('Failed to parse QR data:', parseError);
          setScanResult({
            success: false,
            data: decodedText,
            message: 'Invalid QR code format'
          });
        }
      };

      // Error callback
      const onScanFailure = (errorMessage) => {
        console.log('QR scan failed:', errorMessage);
        // Don't set error for normal scan failures
      };

      // Render scanner
      console.log('Rendering scanner...');
      scanner.render(onScanSuccess, onScanFailure);
      
      if (mountedRef.current) {
        scannerInstanceRef.current = scanner;
        setIsScanning(true);
        setIsInitializing(false);
        console.log('Scanner initialized successfully');
      }
    } catch (err) {
      console.error('Scanner initialization failed:', err);
      if (mountedRef.current) {
        setError('Failed to initialize camera. Please try again.');
        setIsInitializing(false);
      }
    }
  }, [checkCameraPermission, cleanupScanner, team, updateTeamPoints, updateTeamScannedQRs]);

  // Retry function
  const handleRetry = useCallback(() => {
    setScanResult(null);
    setError(null);
    setPermissionStatus('unknown');
    cleanupScanner();
    
    setTimeout(() => {
      if (mountedRef.current) {
        initializeScanner();
      }
    }, 500);
  }, [cleanupScanner, initializeScanner]);

  // Close result
  const handleClose = useCallback(() => {
    setScanResult(null);
    handleRetry();
  }, [handleRetry]);

  // Request permission manually
  const handleRequestPermission = useCallback(async () => {
    setError(null);
    const success = await checkCameraPermission();
    if (success) {
      initializeScanner();
    }
  }, [checkCameraPermission, initializeScanner]);

  // Initialize on mount
  useEffect(() => {
    mountedRef.current = true;
    const timer = setTimeout(() => {
      if (mountedRef.current) {
        initializeScanner();
      }
    }, 500);

    return () => {
      mountedRef.current = false;
      clearTimeout(timer);
      cleanupScanner();
    };
  }, [initializeScanner, cleanupScanner]);

  return (
    <div className="min-h-screen bg-gradient-bg-dark flex items-center justify-center p-4 relative">
      <div className="w-full max-w-2xl relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-6"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <NeonHalo intensity={0.8}>
            <h1 className="text-3xl font-bold text-neutral-light mb-2">
              QR Scanner
            </h1>
          </NeonHalo>
          <p className="text-neutral-light text-opacity-80">
            Scan QR codes to earn points and progress
          </p>
        </motion.div>

        {/* Back Button */}
        <motion.div
          className="mb-6"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <NeonHalo intensity={0.6}>
            <motion.button
              onClick={() => navigate('/home')}
              className="flex items-center text-neutral-light hover:text-primary-accent transition-colors duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </motion.button>
          </NeonHalo>
        </motion.div>

        {/* Team Stats */}
        {team && (
          <motion.div
            className="glass-effect rounded-xl p-4 mb-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-neutral-light">{team.name}</h4>
                <p className="text-sm text-neutral-light text-opacity-80">
                  {team.scannedQRs?.length || 0} QR codes scanned
                </p>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-primary-accent">
                  {team.points || 0} pts
                </div>
                <div className="text-xs text-neutral-light text-opacity-60">Total Points</div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Scanner Container */}
        <motion.div
          className="glass-effect rounded-xl p-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          {/* Scanner Element */}
          <div id="qr-reader" className="w-full" ref={scannerRef} />

          {/* Loading State */}
          {isInitializing && (
            <motion.div
              className="text-center mt-4 p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="flex items-center justify-center space-x-3 mb-3">
                <div className="w-6 h-6 bg-primary-accent rounded-full animate-spin" />
                <span className="text-neutral-light font-medium">
                  {permissionStatus === 'unknown' && 'Initializing camera...'}
                  {permissionStatus === 'granted' && 'Setting up scanner...'}
                </span>
              </div>
              <p className="text-sm text-neutral-light text-opacity-60">
                Please allow camera permissions when prompted
              </p>
            </motion.div>
          )}

          {/* Error State */}
          {error && (
            <motion.div
              className="text-center mt-4 p-4 bg-red-500 bg-opacity-20 border border-red-500 border-opacity-30 rounded-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="flex items-center justify-center space-x-2 mb-3">
                <AlertCircle className="w-5 h-5 text-red-400" />
                <span className="text-red-400 font-medium">Camera Error</span>
              </div>
              <p className="text-sm text-red-400 text-opacity-80 mb-4">
                {error}
              </p>
              <div className="flex flex-col sm:flex-row gap-2 justify-center">
                <NeonHalo intensity={1}>
                  <motion.button
                    onClick={handleRetry}
                    className="bg-gradient-bg-primary text-neutral-light px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gradient-bg-secondary transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Camera className="w-4 h-4 mr-2 inline" />
                    Retry Camera
                  </motion.button>
                </NeonHalo>
                
                {permissionStatus === 'denied' && (
                  <NeonHalo intensity={1}>
                    <motion.button
                      onClick={handleRequestPermission}
                      className="bg-gradient-bg-primary text-neutral-light px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gradient-bg-secondary transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Request Permission
                    </motion.button>
                  </NeonHalo>
                )}
              </div>
            </motion.div>
          )}

          {/* Manual Retry Button */}
          {!isScanning && !error && !isInitializing && (
            <div className="mt-4 pt-4 border-t border-white border-opacity-20">
              <p className="text-xs text-neutral-light text-opacity-60 mb-3 text-center">
                Camera not working? Try refreshing the scanner:
              </p>
              <div className="flex justify-center">
                <NeonHalo intensity={0.8}>
                  <motion.button
                    onClick={handleRetry}
                    className="bg-gradient-bg-primary text-neutral-light px-6 py-2 rounded-lg text-sm font-semibold hover:bg-gradient-bg-secondary transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Camera className="w-4 h-4 mr-2 inline" />
                    Refresh Scanner
                  </motion.button>
                </NeonHalo>
              </div>
            </div>
          )}
        </motion.div>

        {/* Scan Result Modal */}
        {scanResult && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="glass-effect rounded-xl p-6 max-w-md w-full"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  {scanResult.success ? (
                    <CheckCircle className="w-12 h-12 text-green-400" />
                  ) : (
                    <X className="w-12 h-12 text-red-400" />
                  )}
                </div>
                
                <h3 className="text-xl font-bold text-neutral-light mb-2">
                  {scanResult.success ? 'Success!' : 'Error'}
                </h3>
                
                <p className="text-neutral-light text-opacity-80 mb-4">
                  {scanResult.message}
                </p>
                
                {scanResult.success && scanResult.data && (
                  <div className="bg-white bg-opacity-10 rounded-lg p-3 mb-4">
                    <p className="text-sm text-neutral-light">
                      <span className="font-medium">Points earned:</span> {scanResult.data.points || 10}
                    </p>
                    {scanResult.data.message && (
                      <p className="text-sm text-neutral-light text-opacity-80 mt-1">
                        {scanResult.data.message}
                      </p>
                    )}
                  </div>
                )}
                
                <NeonHalo intensity={0.8}>
                  <motion.button
                    onClick={handleClose}
                    className="bg-gradient-bg-primary text-neutral-light px-6 py-2 rounded-lg font-semibold hover:bg-gradient-bg-secondary transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {scanResult.success ? 'Scan Another' : 'Try Again'}
                  </motion.button>
                </NeonHalo>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default QRScannerScreen;
