import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Html5QrcodeScanner, Html5QrcodeScanType } from 'html5-qrcode';
import { useAuthStore } from '../../hooks/useAuthStore';
import { useGameStore } from '../../hooks/useGameStore';
import NeonHalo from '../Animation/NeonHalo';
import { 
  QrCode, 
  Camera, 
  CheckCircle, 
  AlertCircle,
  ArrowLeft
} from 'lucide-react';

const QRScannerScreen = () => {
  const { team, isQRScanned } = useAuthStore();
  const { scanQRCode } = useGameStore();
  const [scanner, setScanner] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [error, setError] = useState(null);
  const scannerRef = useRef(null);
  const scannerInstanceRef = useRef(null);

  const processQRCode = useCallback((qrData) => {
    const qrId = qrData.id;
    
    // Check if already scanned
    if (isQRScanned(qrId)) {
      setError('This QR code has already been scanned by your team!');
      return;
    }

    // Validate and process QR code
    const success = scanQRCode(qrId);
    
    if (success) {
      setScanResult({
        type: 'success',
        message: 'QR Code scanned successfully!',
        points: qrData.points || 5,
        qrData
      });
    } else {
      setError('Invalid QR code or scanning failed.');
    }
  }, [isQRScanned, scanQRCode]);

  const onScanSuccess = useCallback((decodedText, decodedResult) => {
    console.log('QR Code scanned:', decodedText);
    
    // Stop scanning
    if (scannerInstanceRef.current) {
      scannerInstanceRef.current.clear();
      setIsScanning(false);
    }

    // Process the QR code
    try {
      const qrData = JSON.parse(decodedText);
      processQRCode(qrData);
    } catch (error) {
      // If not JSON, treat as simple QR ID
      processQRCode({ id: decodedText });
    }
  }, [processQRCode]);

  const onScanFailure = useCallback((error) => {
    // Handle scan failure silently
    console.warn('QR scan failed:', error);
  }, []);

  // Initialize scanner only once
  useEffect(() => {
    if (scannerRef.current && !scannerInstanceRef.current) {
      const html5QrcodeScanner = new Html5QrcodeScanner(
        "qr-reader",
        { 
          fps: 10, 
          qrbox: { width: 250, height: 250 },
          aspectRatio: 1.0,
          supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA]
        },
        false
      );

      html5QrcodeScanner.render(onScanSuccess, onScanFailure);
      scannerInstanceRef.current = html5QrcodeScanner;
      setScanner(html5QrcodeScanner);
      setIsScanning(true);
    }

    // Cleanup on unmount
    return () => {
      if (scannerInstanceRef.current) {
        scannerInstanceRef.current.clear();
        scannerInstanceRef.current = null;
        setScanner(null);
        setIsScanning(false);
      }
    };
  }, [onScanSuccess, onScanFailure]);

  const handleRetry = () => {
    setScanResult(null);
    setError(null);
    
    // Clear existing scanner
    if (scannerInstanceRef.current) {
      scannerInstanceRef.current.clear();
      scannerInstanceRef.current = null;
      setScanner(null);
      setIsScanning(false);
    }
    
    // Recreate scanner after cleanup
    setTimeout(() => {
      if (scannerRef.current && !scannerInstanceRef.current) {
        const html5QrcodeScanner = new Html5QrcodeScanner(
          "qr-reader",
          { 
            fps: 10, 
            qrbox: { width: 250, height: 250 },
            aspectRatio: 1.0,
            supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA]
          },
          false
        );

        html5QrcodeScanner.render(onScanSuccess, onScanFailure);
        scannerInstanceRef.current = html5QrcodeScanner;
        setScanner(html5QrcodeScanner);
        setIsScanning(true);
      }
    }, 300);
  };

  const handleClose = () => {
    setScanResult(null);
    setError(null);
    handleRetry();
  };

  return (
    <div className="min-h-screen bg-gradient-bg-dark flex items-center justify-center p-4 relative">
      <div className="w-full max-w-2xl relative z-10 px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <NeonHalo intensity={1.2}>
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-bg-primary rounded-2xl flex items-center justify-center mr-4">
                <QrCode className="w-8 h-8 text-neutral-light" />
              </div>
              <div>
                <h1 className="text-3xl font-bold gradient-text">
                  QR Scanner
                </h1>
                <p className="text-sm text-neutral-light text-opacity-80">Scan QR Codes</p>
              </div>
            </div>
          </NeonHalo>
          
          <p className="text-neutral-light text-opacity-80 text-sm max-w-2xl mx-auto">
            Point your camera at QR codes to scan and earn points
          </p>
        </motion.div>

        {/* Scanner Container */}
        <motion.div
          className="glass-effect rounded-xl p-6 mb-6 max-w-3xl mx-auto"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <div className="text-center mb-4">
            <NeonHalo intensity={0.8}>
              <div className="w-12 h-12 bg-gradient-bg-primary rounded-xl flex items-center justify-center mx-auto mb-3">
                <Camera className="w-6 h-6 text-neutral-light" />
              </div>
            </NeonHalo>
            <h3 className="font-semibold text-neutral-light mb-1">Camera Scanner</h3>
            <p className="text-sm text-neutral-light text-opacity-80">
              Position QR code within the frame
            </p>
          </div>

          {/* QR Scanner */}
          <div 
            id="qr-reader" 
            ref={scannerRef}
            className="w-full max-w-md mx-auto"
          />

          {/* Scanner Status */}
          {isScanning && (
            <motion.div
              className="text-center mt-4 p-3 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="flex items-center justify-center space-x-2">
                <div className="w-3 h-3 bg-primary-accent rounded-full animate-pulse" />
                <span className="text-sm text-neutral-light">Scanning for QR codes...</span>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Instructions */}
        <motion.div
          className="glass-effect rounded-xl p-4 mb-6 max-w-3xl mx-auto"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <h4 className="font-medium text-neutral-light mb-2">How to Scan:</h4>
          <ul className="text-sm text-neutral-light text-opacity-80 space-y-1">
            <li>• Point your camera at a QR code</li>
            <li>• Keep the QR code within the frame</li>
            <li>• Hold steady until scan completes</li>
            <li>• Each QR code can only be scanned once per team</li>
          </ul>
        </motion.div>

        {/* Team Stats */}
        {team && (
          <motion.div
            className="glass-effect rounded-xl p-4 max-w-3xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
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

        {/* Scan Result Modal */}
        {scanResult && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="glass-effect rounded-xl p-6 max-w-sm w-full mx-4"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="text-center mb-4">
                <NeonHalo intensity={0.8}>
                  <div className="w-16 h-16 bg-gradient-bg-primary rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircle className="w-8 h-8 text-neutral-light" />
                  </div>
                </NeonHalo>
                <h3 className="text-xl font-semibold text-neutral-light mb-1">
                  Success!
                </h3>
                <p className="text-sm text-neutral-light text-opacity-80">
                  QR Code scanned successfully
                </p>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-neutral-light text-opacity-80">Points Earned:</span>
                  <span className="font-medium text-primary-accent">
                    +{scanResult.points} pts
                  </span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-neutral-light text-opacity-80">QR Type:</span>
                  <span className="font-medium text-neutral-light">
                    {scanResult.qrData.type || 'Unknown'}
                  </span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-neutral-light text-opacity-80">Total Points:</span>
                  <span className="font-medium text-neutral-light">
                    {team?.points || 0} pts
                  </span>
                </div>
              </div>

              <div className="flex space-x-3">
                <NeonHalo intensity={1}>
                  <motion.button
                    onClick={handleRetry}
                    className="flex-1 bg-gradient-bg-primary text-neutral-light py-3 rounded-lg font-semibold hover:bg-gradient-bg-secondary transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Camera className="w-4 h-4 mr-2" />
                    Scan Another
                  </motion.button>
                </NeonHalo>
                
                <button
                  onClick={handleClose}
                  className="flex-1 bg-white bg-opacity-20 text-neutral-light py-3 rounded-lg font-semibold hover:bg-opacity-30 transition-all duration-300"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Error Modal */}
        {error && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="glass-effect rounded-xl p-6 max-w-sm w-full mx-4"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="text-center mb-4">
                <NeonHalo intensity={0.8}>
                  <div className="w-16 h-16 bg-gradient-bg-primary rounded-full flex items-center justify-center mx-auto mb-3">
                    <AlertCircle className="w-8 h-8 text-neutral-light" />
                  </div>
                </NeonHalo>
                <h3 className="text-xl font-semibold text-neutral-light mb-1">
                  Scan Failed
                </h3>
                <p className="text-sm text-neutral-light text-opacity-80">
                  {error}
                </p>
              </div>

              <div className="flex space-x-3">
                <NeonHalo intensity={1}>
                  <motion.button
                    onClick={handleRetry}
                    className="flex-1 bg-gradient-bg-primary text-neutral-light py-3 rounded-lg font-semibold hover:bg-gradient-bg-secondary transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Camera className="w-4 h-4 mr-2" />
                    Try Again
                  </motion.button>
                </NeonHalo>
                
                <button
                  onClick={handleClose}
                  className="flex-1 bg-white bg-opacity-20 text-neutral-light py-3 rounded-lg font-semibold hover:bg-opacity-30 transition-all duration-300"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default QRScannerScreen;
