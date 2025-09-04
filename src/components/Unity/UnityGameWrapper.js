import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { X, Play, CheckCircle, Loader } from 'lucide-react';

const UnityGameWrapper = ({ gameId, gameName, onGameComplete }) => {
  const unityRef = useRef();
  const [isLoading, setIsLoading] = useState(true);
  const [gameScore, setGameScore] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Initialize Unity WebGL build
    window.unityInstance = null;
    
    const script = document.createElement('script');
    script.src = `/unity-games/${gameId}/Build/UnityLoader.js`;
    script.onload = () => {
      window.unityInstance = UnityLoader.instantiate(
        unityRef.current,
        `/unity-games/${gameId}/Build/${gameId}.json`,
        {
          onProgress: (gameInstance, progress) => {
            setProgress(progress);
            if (progress === 1) {
              setIsLoading(false);
            }
          }
        }
      );
    };
    
    document.body.appendChild(script);
    
    // Set up Unity to React communication
    window.ReactUnityBridge = {
      gameComplete: (score) => {
        setGameScore(score);
        onGameComplete(gameId, score);
      },
      updateProgress: (progress) => {
        // Update game progress in React
        console.log('Unity progress:', progress);
      },
      sendScore: (score) => {
        setGameScore(score);
      }
    };

    return () => {
      if (window.unityInstance) {
        window.unityInstance.Quit();
      }
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [gameId, onGameComplete]);

  const sendToUnity = (methodName, data) => {
    if (window.unityInstance) {
      window.unityInstance.SendMessage('ReactBridge', methodName, JSON.stringify(data));
    }
  };

  return (
    <div className="relative w-full h-full bg-neutral-dark rounded-2xl overflow-hidden">
      {isLoading && (
        <motion.div 
          className="absolute inset-0 flex items-center justify-center bg-gradient-bg-dark"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="text-center text-neutral-light">
            <div className="relative mb-6">
              <div className="loading-spinner mx-auto mb-4"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Play className="w-6 h-6 text-primary-accent" />
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-2 gradient-text">{gameName}</h3>
            <p className="opacity-80 mb-4">Preparing your adventure...</p>
            <div className="w-64 bg-white bg-opacity-20 rounded-full h-2 mx-auto">
              <div 
                className="bg-gradient-bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress * 100}%` }}
              ></div>
            </div>
            <p className="text-sm opacity-60 mt-2">{Math.round(progress * 100)}% loaded</p>
          </div>
        </motion.div>
      )}
      
      <div
        ref={unityRef}
        className="w-full h-full"
        style={{ display: isLoading ? 'none' : 'block' }}
      />
      
      {/* Game UI Overlay */}
      <motion.div 
        className="absolute top-4 right-4 glass-effect rounded-xl p-3"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="text-primary-accent font-bold text-lg">Score: {gameScore}</div>
      </motion.div>

      {/* Game Controls */}
      <motion.div 
        className="absolute bottom-4 left-4 flex space-x-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <button
          onClick={() => sendToUnity('RestartGame', {})}
          className="glass-effect rounded-lg p-2 text-primary-accent hover:bg-primary-accent hover:text-neutral-light transition-all duration-300"
        >
          <Play className="w-5 h-5" />
        </button>
        <button
          onClick={() => sendToUnity('PauseGame', {})}
          className="glass-effect rounded-lg p-2 text-primary-accent hover:bg-primary-accent hover:text-neutral-light transition-all duration-300"
        >
          <Loader className="w-5 h-5" />
        </button>
      </motion.div>
    </div>
  );
};

export default UnityGameWrapper;
