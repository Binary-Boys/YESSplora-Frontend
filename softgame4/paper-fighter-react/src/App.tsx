import React, { useState, useEffect } from 'react';
import './App.css';

interface GameStats {
  score: number;
  hits: number;
  misses: number;
  time: number;
}

function App() {
  const [gameState, setGameState] = useState<'start' | 'playing' | 'finished'>('start');
  const [stats, setStats] = useState<GameStats>({ score: 0, hits: 0, misses: 0, time: 0 });
  const [targets, setTargets] = useState<Array<{id: number, x: number, y: number, hit: boolean}>>([]);
  const [gameTimer, setGameTimer] = useState<NodeJS.Timeout | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(30);

  const startGame = () => {
    setGameState('playing');
    setStats({ score: 0, hits: 0, misses: 0, time: 0 });
    setTargets([]);
    setTimeLeft(30);
    
    // Start game timer
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          endGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    setGameTimer(timer);
    
    // Start spawning targets
    spawnTarget();
  };

  const spawnTarget = () => {
    if (gameState !== 'playing') return;
    
    const newTarget = {
      id: Date.now(),
      x: Math.random() * 80 + 10, // 10-90%
      y: Math.random() * 60 + 20, // 20-80%
      hit: false
    };
    
    setTargets(prev => [...prev, newTarget]);
    
    // Remove target after 2 seconds if not hit
    setTimeout(() => {
      setTargets(prev => prev.filter(t => t.id !== newTarget.id));
      if (gameState === 'playing') {
        setStats(prev => ({ ...prev, misses: prev.misses + 1 }));
      }
    }, 2000);
    
    // Spawn next target after random delay
    if (gameState === 'playing') {
      setTimeout(spawnTarget, Math.random() * 1000 + 500);
    }
  };

  const hitTarget = (id: number) => {
    if (gameState !== 'playing') return;
    
    setTargets(prev => prev.map(t => t.id === id ? { ...t, hit: true } : t));
    setStats(prev => ({
      ...prev,
      hits: prev.hits + 1,
      score: prev.score + 10
    }));
    
    // Remove hit target after short delay
    setTimeout(() => {
      setTargets(prev => prev.filter(t => t.id !== id));
    }, 300);
  };

  const endGame = () => {
    if (gameTimer) {
      clearInterval(gameTimer);
      setGameTimer(null);
    }
    setGameState('finished');
    
    // Calculate final score out of 10
    const maxPossibleScore = 30 * 10; // 30 seconds * 10 points per hit
    const normalizedScore = Math.min(10, Math.round((stats.score / maxPossibleScore) * 10));
    
    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const ticketId = urlParams.get('ticketId');
    const teamCode = urlParams.get('teamCode');
    const gameId = urlParams.get('gameId') || '4';
    const level = urlParams.get('level') || '1';
    const returnUrl = urlParams.get('returnUrl');
    
    // Log completion to console
    console.log('Mini-game completed:', {
      yessticketId: ticketId,
      teamCode: teamCode,
      gameId: gameId,
      level: level,
      score: normalizedScore,
      rawScore: stats.score,
      hits: stats.hits,
      misses: stats.misses,
      timestamp: new Date().toISOString()
    });
    
    // Send completion message to parent window if in iframe
    if (window.parent !== window) {
      window.parent.postMessage({
        type: 'MINI_GAME_COMPLETE',
        gameId: gameId,
        score: normalizedScore,
        level: level,
        ticketId: ticketId
      }, '*');
    }
    
    // If returnUrl is provided, redirect after 5 seconds
    if (returnUrl) {
      setTimeout(() => {
        window.location.href = returnUrl;
      }, 5000);
    }
  };

  const resetGame = () => {
    setGameState('start');
  };

  useEffect(() => {
    return () => {
      if (gameTimer) {
        clearInterval(gameTimer);
      }
    };
  }, [gameTimer]);

  return (
    <div className="app">
      {gameState === 'start' && (
        <div className="start-screen">
          <h1>Paper Fighter</h1>
          <p>Click on the paper targets as they appear!</p>
          <button onClick={startGame} className="start-button">
            Start Game
          </button>
        </div>
      )}

      {gameState === 'playing' && (
        <div className="game-screen">
          <div className="game-header">
            <div>Time: {timeLeft}s</div>
            <div>Score: {stats.score}</div>
            <div>Hits: {stats.hits}</div>
          </div>
          
          <div className="game-area" onClick={(e) => {
            // Check if click was on a target (handled by target elements)
            if ((e.target as HTMLElement).className !== 'target') {
              setStats(prev => ({ ...prev, misses: prev.misses + 1 }));
            }
          }}>
            {targets.map(target => (
              <div
                key={target.id}
                className={`target ${target.hit ? 'hit' : ''}`}
                style={{ left: `${target.x}%`, top: `${target.y}%` }}
                onClick={() => hitTarget(target.id)}
              />
            ))}
          </div>
        </div>
      )}

      {gameState === 'finished' && (
        <div className="end-screen">
          <h2>Game Over!</h2>
          <div className="stats">
            <p>Final Score: {stats.score}</p>
            <p>Hits: {stats.hits}</p>
            <p>Misses: {stats.misses}</p>
          </div>
          <button onClick={resetGame} className="restart-button">
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
