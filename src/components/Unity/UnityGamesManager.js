import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, CheckCircle, Trophy, TrendingUp, Clock, Target } from 'lucide-react';
import UnityGameWrapper from './UnityGameWrapper';
import { useGameStore } from '../../hooks/useGameStore';
import { useAuthStore } from '../../hooks/useAuthStore';

const unityGames = [
  {
    id: 'code-breaker',
    name: 'Code Breaker Challenge',
    description: 'Solve programming puzzles and crack the code',
    level: 5,
    estimatedTime: '10 minutes',
    skills: ['Logic', 'Problem Solving'],
    buildPath: '/unity-games/code-breaker/',
    icon: '🧩',
    difficulty: 'Medium'
  },
  {
    id: 'logic-puzzle',
    name: 'Logic Puzzle Master',
    description: 'Navigate through complex logic mazes',
    level: 6,
    estimatedTime: '8 minutes',
    skills: ['Critical Thinking', 'Pattern Recognition'],
    buildPath: '/unity-games/logic-puzzle/',
    icon: '🎯',
    difficulty: 'Hard'
  },
  {
    id: 'algorithm-race',
    name: 'Algorithm Racing',
    description: 'Race against time implementing algorithms',
    level: 7,
    estimatedTime: '12 minutes',
    skills: ['Algorithm Design', 'Speed Coding'],
    buildPath: '/unity-games/algorithm-race/',
    icon: '🏁',
    difficulty: 'Expert'
  },
  {
    id: 'data-detective',
    name: 'Data Detective',
    description: 'Analyze data patterns and solve mysteries',
    level: 8,
    estimatedTime: '15 minutes',
    skills: ['Data Analysis', 'Investigation'],
    buildPath: '/unity-games/data-detective/',
    icon: '🔍',
    difficulty: 'Master'
  }
];

const UnityGamesManager = () => {
  const [activeGame, setActiveGame] = useState(null);
  const [completedGames, setCompletedGames] = useState(new Set());
  const [gameProgress, setGameProgress] = useState({});
  const { team } = useAuthStore();
  const { completeLevel, updateGameProgress } = useGameStore();

  useEffect(() => {
    // Load completed games from localStorage
    const saved = localStorage.getItem('yessplora-unity-games');
    if (saved) {
      const data = JSON.parse(saved);
      setCompletedGames(new Set(data.completedGames));
      setGameProgress(data.gameProgress || {});
    }
  }, []);

  const handleGameComplete = (gameId, score) => {
    setCompletedGames(prev => new Set([...prev, gameId]));
    setGameProgress(prev => ({
      ...prev,
      [gameId]: { 
        completed: true, 
        score, 
        completedAt: new Date().toISOString(),
        attempts: (prev[gameId]?.attempts || 0) + 1
      }
    }));
    
    // Update global game state
    completeLevel(gameId, 10); // 10 points for completing software game
    
    // Save to localStorage
    const data = {
      completedGames: [...completedGames, gameId],
      gameProgress: {
        ...gameProgress,
        [gameId]: { 
          completed: true, 
          score, 
          completedAt: new Date().toISOString(),
          attempts: (gameProgress[gameId]?.attempts || 0) + 1
        }
      }
    };
    localStorage.setItem('yessplora-unity-games', JSON.stringify(data));
    
    // Show completion animation
    showGameCompletionAnimation(gameId, score);
    
    // Close game after delay
    setTimeout(() => setActiveGame(null), 3000);
  };

  const showGameCompletionAnimation = (gameId, score) => {
    // Celebration animation
    const celebration = document.createElement('div');
    celebration.innerHTML = `
      <div class="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
        <div class="glass-effect rounded-2xl p-8 shadow-2xl transform animate-bounce">
          <div class="text-6xl mb-4 text-center">🎉</div>
          <h2 class="text-2xl font-bold gradient-text text-center mb-2">Game Complete!</h2>
          <p class="text-primary-accent text-center text-xl">Score: ${score}</p>
          <p class="text-neutral-light text-center">+10 Points Earned</p>
        </div>
      </div>
    `;
    document.body.appendChild(celebration);
    
    setTimeout(() => {
      if (celebration.parentNode) {
        document.body.removeChild(celebration);
      }
    }, 3000);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-400';
      case 'Medium': return 'text-yellow-400';
      case 'Hard': return 'text-orange-400';
      case 'Expert': return 'text-red-400';
      case 'Master': return 'text-purple-400';
      default: return 'text-neutral-light';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-bg-dark">
      <AnimatePresence mode="wait">
        {activeGame ? (
          <motion.div 
            className="fixed inset-0 z-50 bg-neutral-dark"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="h-full flex flex-col">
              {/* Game Header */}
              <motion.div 
                className="bg-gradient-bg-primary text-neutral-light p-4 flex items-center justify-between"
                initial={{ y: -50 }}
                animate={{ y: 0 }}
              >
                <div>
                  <h2 className="text-xl font-bold">{activeGame.name}</h2>
                  <p className="text-primary-accent text-sm">{activeGame.description}</p>
                </div>
                <button
                  onClick={() => setActiveGame(null)}
                  className="text-primary-accent hover:text-neutral-light transition-colors p-2 rounded-lg hover:bg-primary-accent hover:bg-opacity-20"
                >
                  <X className="w-6 h-6" />
                </button>
              </motion.div>
              
              {/* Unity Game Container */}
              <div className="flex-1">
                <UnityGameWrapper
                  gameId={activeGame.id}
                  gameName={activeGame.name}
                  onGameComplete={handleGameComplete}
                />
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            className="p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Header */}
            <motion.div 
              className="bg-gradient-bg-primary rounded-2xl p-6 mb-6 text-neutral-light"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <h1 className="text-3xl font-bold flex items-center">
                <Play className="w-8 h-8 mr-3" />
                Software Games
              </h1>
              <p className="opacity-90 mt-2">Complete all 4 games to advance to the treasure hunt</p>
            </motion.div>

            {/* Progress Overview */}
            <motion.div 
              className="glass-effect rounded-2xl p-6 mb-6"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-neutral-light">Progress Overview</h3>
                <span className="text-primary-accent font-bold">
                  {completedGames.size}/4 Games Complete
                </span>
              </div>
              <div className="w-full bg-white bg-opacity-20 rounded-full h-4">
                <motion.div
                  className="bg-gradient-bg-primary h-4 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(completedGames.size / 4) * 100}%` }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                ></motion.div>
              </div>
            </motion.div>

            {/* Games Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {unityGames.map((game, index) => (
                <motion.div
                  key={game.id}
                  className={`glass-effect rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 ${
                    completedGames.has(game.id) 
                      ? 'border-2 border-primary-accent' 
                      : 'border border-white border-opacity-20'
                  }`}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-4xl">{game.icon}</div>
                    {completedGames.has(game.id) && (
                      <div className="bg-primary-accent text-neutral-light rounded-full p-2">
                        <CheckCircle className="w-6 h-6" />
                      </div>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-bold text-neutral-light mb-2">{game.name}</h3>
                  <p className="text-neutral-light text-opacity-80 mb-4">{game.description}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-sm font-medium ${getDifficultyColor(game.difficulty)}`}>
                      {game.difficulty}
                    </span>
                    <span className="text-sm text-neutral-light text-opacity-60">
                      ⏱️ {game.estimatedTime}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {game.skills.map(skill => (
                      <span
                        key={skill}
                        className="bg-primary-accent bg-opacity-20 text-primary-accent px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-neutral-light text-opacity-60">Level {game.level}</span>
                    {completedGames.has(game.id) ? (
                      <button
                        onClick={() => setActiveGame(game)}
                        className="bg-white bg-opacity-20 text-neutral-light px-4 py-2 rounded-full font-medium hover:bg-opacity-30 transition-colors"
                      >
                        Play Again
                      </button>
                    ) : (
                      <button
                        onClick={() => setActiveGame(game)}
                        className="bg-gradient-bg-primary text-neutral-light px-6 py-2 rounded-full font-medium hover:bg-gradient-bg-secondary transition-all duration-300 transform hover:scale-105"
                      >
                        Start Game
                      </button>
                    )}
                  </div>

                  {/* Score Display for Completed Games */}
                  {completedGames.has(game.id) && gameProgress[game.id] && (
                    <motion.div 
                      className="mt-4 bg-primary-accent bg-opacity-20 rounded-lg p-3"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-neutral-light font-medium">Best Score:</span>
                        <span className="text-primary-accent font-bold">
                          {gameProgress[game.id].score}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-neutral-light text-opacity-60 text-sm">Attempts:</span>
                        <span className="text-primary-accent text-sm">
                          {gameProgress[game.id].attempts}
                        </span>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Next Step Indicator */}
            {completedGames.size === 4 && (
              <motion.div 
                className="mt-8 bg-gradient-bg-secondary text-neutral-light rounded-2xl p-6 text-center"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="text-4xl mb-4">🏆</div>
                <h3 className="text-2xl font-bold mb-2">All Software Games Complete!</h3>
                <p className="mb-4">You can now proceed to the final Treasure Hunt</p>
                <button className="bg-neutral-light text-primary-dark px-8 py-3 rounded-full font-bold hover:bg-opacity-90 transition-colors">
                  Start Treasure Hunt
                </button>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UnityGamesManager;
