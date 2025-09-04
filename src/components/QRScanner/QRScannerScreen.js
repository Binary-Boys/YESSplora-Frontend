import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Html5QrcodeScanner, Html5QrcodeScanType } from 'html5-qrcode';
import { useAuthStore } from '../../hooks/useAuthStore';
import { useGameStore } from '../../hooks/useGameStore';
import { 
  QrCode, 
  Camera, 
  CheckCircle, 
  AlertCircle
} from 'lucide-react';

const QRScannerScreen = () => {
  const { team, isQRScanned } = useAuthStore();
  const { scanQRCode } = useGameStore();
  const [scanner, setScanner] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [error, setError] = useState(null);
  const scannerRef = useRef(null);

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
    if (scanner) {
      scanner.clear();
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
  }, [scanner, processQRCode]);

  const onScanFailure = useCallback((error) => {
    // Handle scan failure silently
    console.warn('QR scan failed:', error);
  }, []);

  useEffect(() => {
    if (scannerRef.current && !scanner) {
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
      setScanner(html5QrcodeScanner);
      setIsScanning(true);
    }

    return () => {
      if (scanner) {
        scanner.clear();
      }
    };
  }, [scanner, onScanSuccess, onScanFailure]);

  const handleRetry = () => {
    setScanResult(null);
    setError(null);
    setIsScanning(true);
    
    // Restart scanner
    if (scannerRef.current) {
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
      setScanner(html5QrcodeScanner);
    }
  };

  const handleClose = () => {
    setScanResult(null);
    setError(null);
    setIsScanning(true);
    handleRetry();
  };

  return (
    <div className="h-full overflow-y-auto p-4">
      {/* Header */}
      <motion.div
        className="mb-6"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-display font-bold text-gray-800">QR Scanner</h1>
          <div className="flex items-center space-x-2">
            <QrCode className="w-5 h-5 text-primary-500" />
            <span className="text-sm font-medium text-gray-600">
              Scan QR Codes
            </span>
          </div>
        </div>
        <p className="text-gray-600 text-sm">
          Point your camera at QR codes to scan and earn points
        </p>
      </motion.div>

      {/* Scanner Container */}
      <motion.div
        className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-white/20 mb-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="text-center mb-4">
          <Camera className="w-8 h-8 text-primary-500 mx-auto mb-2" />
          <h3 className="font-semibold text-gray-800 mb-1">Camera Scanner</h3>
          <p className="text-sm text-gray-600">
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
            className="text-center mt-4 p-3 bg-blue-50 rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="flex items-center justify-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
              <span className="text-sm text-blue-600">Scanning for QR codes...</span>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Scan Result Modal */}
      {scanResult && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-xl p-6 max-w-sm w-full"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <div className="text-center mb-4">
              <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-8 h-8 text-success-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-1">
                Success!
              </h3>
              <p className="text-sm text-gray-600">
                QR Code scanned successfully
              </p>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Points Earned:</span>
                <span className="font-medium text-success-600">
                  +{scanResult.points} pts
                </span>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">QR Type:</span>
                <span className="font-medium text-gray-800">
                  {scanResult.qrData.type || 'Unknown'}
                </span>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Total Points:</span>
                <span className="font-medium text-gray-800">
                  {team?.points || 0} pts
                </span>
              </div>
            </div>

            <div className="flex space-x-3">
              <motion.button
                onClick={handleRetry}
                className="flex-1 bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-3 rounded-lg font-medium flex items-center justify-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Camera className="w-4 h-4 mr-2" />
                Scan Another
              </motion.button>
              
              <button
                onClick={handleClose}
                className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
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
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-xl p-6 max-w-sm w-full"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <div className="text-center mb-4">
              <div className="w-16 h-16 bg-error-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <AlertCircle className="w-8 h-8 text-error-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-1">
                Scan Failed
              </h3>
              <p className="text-sm text-gray-600">
                {error}
              </p>
            </div>

            <div className="flex space-x-3">
              <motion.button
                onClick={handleRetry}
                className="flex-1 bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-3 rounded-lg font-medium flex items-center justify-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Camera className="w-4 h-4 mr-2" />
                Try Again
              </motion.button>
              
              <button
                onClick={handleClose}
                className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Instructions */}
      <motion.div
        className="bg-blue-50 rounded-xl p-4"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h4 className="font-medium text-blue-800 mb-2">How to Scan:</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Point your camera at a QR code</li>
          <li>• Keep the QR code within the frame</li>
          <li>• Hold steady until scan completes</li>
          <li>• Each QR code can only be scanned once per team</li>
        </ul>
      </motion.div>

      {/* Team Stats */}
      {team && (
        <motion.div
          className="mt-6 bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-white/20"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-800">{team.name}</h4>
              <p className="text-sm text-gray-600">
                {team.scannedQRs?.length || 0} QR codes scanned
              </p>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-primary-600">
                {team.points || 0} pts
              </div>
              <div className="text-xs text-gray-500">Total Points</div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default QRScannerScreen;
